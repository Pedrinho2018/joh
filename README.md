# JHONROB - Site Institucional + Catálogo + Admin + Automação

Projeto demo completo para repaginar o site da JHONROB com:

- `apps/web`: Next.js 14 (App Router) + TypeScript + Tailwind + Prisma
- `apps/automation`: FastAPI (Python 3.13) para webhooks/log/e-mail/relatórios
- `prisma`: schema + seed fake
- `docker-compose.yml`: web + automation + mailhog + `db` opcional (Postgres profile)

## Stack

- Frontend: Next.js 14+, TailwindCSS, Framer Motion
- Backend Node: Next Route Handlers (API routes)
- ORM/DB: Prisma + SQLite (dev), estrutura pronta para Postgres em produção
- Automação: FastAPI + APScheduler + SMTP

## Estrutura

```txt
apps/
  web/          # Site + admin + APIs
  automation/   # FastAPI webhooks + relatórios
prisma/         # schema.prisma + seed.js
docker-compose.yml
.env.example
```

## Como rodar (Docker)

1. Copie `.env.example` para `.env` e ajuste se quiser.
2. Suba os serviços:

```bash
docker compose up
```

3. Acesse:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin` (senha: `ADMIN_PASSWORD`, padrão `demo123`)
- Automação FastAPI: `http://localhost:8000/health`
- Mailhog (caixa SMTP demo): `http://localhost:8025`

Observação: o container web já executa `prisma generate`, `prisma db push` e `seed` ao subir.

## Como seedar manualmente (sem Docker)

```bash
npm install
npx prisma generate
npx prisma db push
node prisma/seed.js
```

Depois:

```bash
npm --workspace apps/web run dev
```

E, em outro terminal:

```bash
cd apps/automation
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Se rodar local (sem Docker), ajuste `AUTOMATION_WEBHOOK_URL=http://localhost:8000`.

## Fluxos implementados

- `Contato` -> cria `Lead (CONTACT)` -> webhook Python -> log/e-mail/relatório
- `Baixar Catálogo` -> cria `Lead (CATALOG)` -> libera `/files/catalogo.pdf` -> webhook
- `Solicitar orçamento/cotação` -> cria `Lead (QUOTE)` -> webhook
- `Pós-venda` -> cria `Ticket` com anexos locais (`apps/web/public/uploads/tickets`) -> webhook
- Admin:
  - Dashboard (métricas)
  - CRUD de categorias, produtos e eventos
  - Leads + export CSV
  - Tickets + mudança de status

## Testar webhook (curl)

### Lead

```bash
curl -X POST http://localhost:8000/webhook/lead \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Lead Teste\",\"email\":\"lead@teste.com\",\"phone\":\"(11)99999-9999\",\"source\":\"CATALOG\"}"
```

### Ticket

```bash
curl -X POST http://localhost:8000/webhook/ticket \
  -H "Content-Type: application/json" \
  -d "{\"protocol\":\"JHR-2026-9999\",\"name\":\"Cliente Teste\",\"email\":\"cliente@teste.com\",\"phone\":\"(11)98888-8888\",\"subject\":\"Teste\",\"message\":\"Teste webhook\",\"status\":\"OPEN\",\"attachments\":[]}"
```

### Job de relatório manual

```bash
curl -X POST http://localhost:8000/jobs/report
```

## Onde verificar a automação

- Logs: `apps/automation/logs/YYYY-MM-DD.log`
- Eventos processados (jsonl): `apps/automation/data/YYYY-MM-DD.jsonl`
- Relatórios:
  - `apps/automation/reports/YYYY-MM-DD.md`
  - `apps/automation/reports/YYYY-MM-DD.html`

## Deploy (passos curtos)

### Web (Vercel)

1. Importar repositório no Vercel.
2. Definir root directory como `apps/web` (ou monorepo com build command custom).
3. Configurar envs (`DATABASE_URL`, `ADMIN_PASSWORD`, `AUTOMATION_WEBHOOK_URL`, `PUBLIC_SITE_URL`).
4. Rodar Prisma em build/deploy (migrar para Postgres recomendado).

### Automação (Render)

1. Criar Web Service apontando para `apps/automation`.
2. Runtime Python 3.13.
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
4. Configurar SMTP/envs (`SMTP_*`, `REPORT_CRON_HOUR`, `TIMEZONE`).

### Banco (produção)

- Migrar `DATABASE_URL` para Postgres e ajustar `schema.prisma` provider para `postgresql` (ambiente de produção).
- No `docker-compose`, o serviço `db` está disponível via profile `postgres`:

```bash
docker compose --profile postgres up -d db
```

## Roteiro rápido para vídeo de venda

1. Abrir `/catalogo`, enviar lead, baixar PDF.
2. Mostrar `/admin/leads` com lead novo + export CSV.
3. Mostrar `Mailhog` recebendo e-mail da automação.
4. Mostrar `apps/automation/logs` e relatório `.md/.html`.
5. Abrir `/pos-venda`, criar ticket com anexo.
6. Mostrar `/admin/tickets` alterando status.
