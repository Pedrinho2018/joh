import json
import logging
import os
import smtplib
from contextlib import asynccontextmanager
from dataclasses import dataclass
from datetime import datetime
from email.message import EmailMessage
from pathlib import Path
from typing import Any, Literal
from zoneinfo import ZoneInfo

from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parents[1]
LOG_DIR = BASE_DIR / "logs"
REPORT_DIR = BASE_DIR / "reports"
DATA_DIR = BASE_DIR / "data"
for p in (LOG_DIR, REPORT_DIR, DATA_DIR):
    p.mkdir(parents=True, exist_ok=True)


def env(name: str, default: str = "") -> str:
    return os.getenv(name, default)


TIMEZONE = env("TIMEZONE", "America/Sao_Paulo")
TZ = ZoneInfo(TIMEZONE)


class LeadWebhook(BaseModel):
    id: int | None = None
    name: str
    email: str
    phone: str
    source: str
    message: str | None = None
    createdAt: str | None = None


class TicketWebhook(BaseModel):
    id: int | None = None
    protocol: str
    name: str
    email: str
    phone: str
    subject: str
    message: str
    status: str = "OPEN"
    attachments: list[str] = Field(default_factory=list)
    createdAt: str | None = None


@dataclass
class AppConfig:
    smtp_host: str = env("SMTP_HOST", "localhost")
    smtp_port: int = int(env("SMTP_PORT", "25"))
    smtp_user: str = env("SMTP_USER", "")
    smtp_pass: str = env("SMTP_PASS", "")
    smtp_to: str = env("SMTP_TO", "contato@jhonrob.com.br")
    smtp_from: str = env("SMTP_FROM", "no-reply@jhonrob.local")
    report_cron_hour: int = int(env("REPORT_CRON_HOUR", "18"))


cfg = AppConfig()
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("jhonrob-automation")
scheduler = BackgroundScheduler(timezone=TIMEZONE)


def now_local() -> datetime:
    return datetime.now(TZ)


def day_key(dt: datetime | None = None) -> str:
    return (dt or now_local()).strftime("%Y-%m-%d")


def log_file_path(date_key: str | None = None) -> Path:
    return LOG_DIR / f"{date_key or day_key()}.log"


def events_file_path(date_key: str | None = None) -> Path:
    return DATA_DIR / f"{date_key or day_key()}.jsonl"


def report_md_path(date_key: str | None = None) -> Path:
    return REPORT_DIR / f"{date_key or day_key()}.md"


def report_html_path(date_key: str | None = None) -> Path:
    return REPORT_DIR / f"{date_key or day_key()}.html"


def append_line(path: Path, text: str) -> None:
    with path.open("a", encoding="utf-8") as f:
      f.write(text + "\n")


def append_event(kind: Literal["lead", "ticket"], payload: dict[str, Any]) -> None:
    ts = now_local().isoformat()
    append_line(log_file_path(), f"[{ts}] {kind.upper()} {json.dumps(payload, ensure_ascii=False)}")
    append_line(events_file_path(), json.dumps({"ts": ts, "kind": kind, "payload": payload}, ensure_ascii=False))


def send_email(subject: str, body: str) -> None:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = cfg.smtp_from
    msg["To"] = cfg.smtp_to
    msg.set_content(body)
    try:
        with smtplib.SMTP(cfg.smtp_host, cfg.smtp_port, timeout=10) as server:
            if cfg.smtp_user:
                server.starttls()
                server.login(cfg.smtp_user, cfg.smtp_pass)
            server.send_message(msg)
        logger.info("Email enviado: %s", subject)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Falha no envio SMTP: %s", exc)
        append_line(log_file_path(), f"[{now_local().isoformat()}] EMAIL_ERROR {exc}")


def read_events_for_day(date_key: str | None = None) -> list[dict[str, Any]]:
    fp = events_file_path(date_key)
    if not fp.exists():
        return []
    rows: list[dict[str, Any]] = []
    for line in fp.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return rows


def build_summary(date_key: str | None = None) -> dict[str, Any]:
    key = date_key or day_key()
    events = read_events_for_day(key)
    lead_by_source: dict[str, int] = {}
    tickets_by_status: dict[str, int] = {}
    total_leads = 0
    total_tickets = 0

    for item in events:
        kind = item.get("kind")
        payload = item.get("payload", {})
        if kind == "lead":
            total_leads += 1
            source = str(payload.get("source", "UNKNOWN"))
            lead_by_source[source] = lead_by_source.get(source, 0) + 1
        if kind == "ticket":
            total_tickets += 1
            status = str(payload.get("status", "UNKNOWN"))
            tickets_by_status[status] = tickets_by_status.get(status, 0) + 1

    return {
        "date": key,
        "generatedAt": now_local().isoformat(),
        "totals": {"leads": total_leads, "tickets": total_tickets},
        "leadBySource": dict(sorted(lead_by_source.items())),
        "ticketsByStatus": dict(sorted(tickets_by_status.items())),
        "eventsCount": len(events),
    }


def render_markdown_report(summary: dict[str, Any]) -> str:
    lines = [
        f"# Relatório Diário JHONROB - {summary['date']}",
        "",
        f"Gerado em: {summary['generatedAt']}",
        "",
        "## Totais",
        f"- Leads: {summary['totals']['leads']}",
        f"- Tickets: {summary['totals']['tickets']}",
        f"- Eventos processados: {summary['eventsCount']}",
        "",
        "## Leads por origem",
    ]
    if summary["leadBySource"]:
        lines.extend([f"- {k}: {v}" for k, v in summary["leadBySource"].items()])
    else:
        lines.append("- Nenhum lead processado")

    lines.extend(["", "## Tickets por status"])
    if summary["ticketsByStatus"]:
        lines.extend([f"- {k}: {v}" for k, v in summary["ticketsByStatus"].items()])
    else:
        lines.append("- Nenhum ticket processado")
    lines.append("")
    return "\n".join(lines)


def render_html_report(summary: dict[str, Any]) -> str:
    def list_items(data: dict[str, int]) -> str:
        if not data:
            return "<li>Nenhum registro</li>"
        return "".join([f"<li><strong>{k}</strong>: {v}</li>" for k, v in data.items()])

    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Relatório {summary['date']}</title>
<style>body{{font-family:Inter,Arial,sans-serif;background:#0d1116;color:#fff;padding:24px}} .card{{background:#151b22;border:1px solid #26303b;border-radius:16px;padding:16px;margin-bottom:16px}} h1{{margin-top:0}} li{{margin:6px 0}} .muted{{color:#93a0b0}}</style>
</head><body>
<h1>Relatório Diário JHONROB - {summary['date']}</h1>
<p class="muted">Gerado em {summary['generatedAt']}</p>
<div class="card"><h2>Totais</h2><p>Leads: {summary['totals']['leads']} | Tickets: {summary['totals']['tickets']} | Eventos processados: {summary['eventsCount']}</p></div>
<div class="card"><h2>Leads por origem</h2><ul>{list_items(summary['leadBySource'])}</ul></div>
<div class="card"><h2>Tickets por status</h2><ul>{list_items(summary['ticketsByStatus'])}</ul></div>
</body></html>"""


def generate_daily_report(date_key: str | None = None, send_report_email: bool = False) -> dict[str, Any]:
    summary = build_summary(date_key)
    key = summary["date"]
    md = render_markdown_report(summary)
    html = render_html_report(summary)
    report_md_path(key).write_text(md, encoding="utf-8")
    report_html_path(key).write_text(html, encoding="utf-8")
    append_line(log_file_path(key), f"[{now_local().isoformat()}] REPORT generated")
    if send_report_email:
        send_email(f"[JHONROB] Relatório diário {key}", md)
    return summary


def schedule_jobs() -> None:
    if scheduler.running:
        return
    scheduler.add_job(
        lambda: generate_daily_report(send_report_email=True),
        "cron",
        hour=cfg.report_cron_hour,
        minute=0,
        id="daily_report",
        replace_existing=True,
    )
    scheduler.start()
    logger.info("Scheduler iniciado. Relatório diário às %sh (%s)", cfg.report_cron_hour, TIMEZONE)


@asynccontextmanager
async def lifespan(_: FastAPI):
    schedule_jobs()
    yield
    if scheduler.running:
        scheduler.shutdown(wait=False)


app = FastAPI(
    title="JHONROB Automation",
    version="1.0.0",
    description="API de automação para processamento de leads, tickets e geração de relatórios diários.",
    lifespan=lifespan,
)


@app.get("/health", tags=["Sistema"])
def health() -> dict[str, str]:
    """Verifica se o serviço está funcionando."""
    return {"status": "ok", "time": now_local().isoformat()}


@app.get("/status", tags=["Sistema"])
def status() -> dict[str, Any]:
    """Retorna informações detalhadas do sistema."""
    today = day_key()
    events = read_events_for_day(today)
    return {
        "status": "ok",
        "time": now_local().isoformat(),
        "timezone": TIMEZONE,
        "scheduler_running": scheduler.running,
        "today_events": len(events),
        "smtp_configured": bool(cfg.smtp_host),
        "report_hour": cfg.report_cron_hour,
    }


@app.post("/webhook/lead", tags=["Webhooks"])
def webhook_lead(payload: LeadWebhook) -> dict[str, Any]:
    """Recebe notificação de novo lead do sistema web."""
    data = payload.model_dump()
    append_event("lead", data)
    send_email(
        subject=f"[JHONROB] Novo lead ({data.get('source')}) - {data.get('name')}",
        body=json.dumps(data, ensure_ascii=False, indent=2),
    )
    summary = generate_daily_report()
    return {"ok": True, "summary": summary}


@app.post("/webhook/ticket", tags=["Webhooks"])
def webhook_ticket(payload: TicketWebhook) -> dict[str, Any]:
    """Recebe notificação de novo ticket de pós-venda."""
    data = payload.model_dump()
    append_event("ticket", data)
    send_email(
        subject=f"[JHONROB] Novo ticket {data.get('protocol')} - {data.get('subject')}",
        body=json.dumps(data, ensure_ascii=False, indent=2),
    )
    summary = generate_daily_report()
    return {"ok": True, "summary": summary}


@app.post("/jobs/report", tags=["Jobs"])
def trigger_report() -> dict[str, Any]:
    """Gera e envia manualmente o relatório diário."""
    summary = generate_daily_report(send_report_email=True)
    return {"ok": True, "summary": summary}
