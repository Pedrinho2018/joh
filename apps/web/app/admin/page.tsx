import { LeadSource } from "@prisma/client";
import { endOfDay, startOfDay, subDays } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminShell } from "@/components/admin-shell";

function maxValue(values: number[]) {
  return Math.max(1, ...values);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { period?: string; source?: LeadSource };
}) {
  const authed = isAdminAuthenticated();
  if (!authed) {
    return (
      <div className="container-shell py-16">
        <AdminLoginForm />
      </div>
    );
  }

  const periodDays = Number(searchParams.period || 7);
  const period = [7, 30, 90].includes(periodDays) ? periodDays : 7;
  const sourceFilter = Object.values(LeadSource).includes(searchParams.source as LeadSource)
    ? (searchParams.source as LeadSource)
    : undefined;

  const now = new Date();
  const periodStart = subDays(startOfDay(now), period - 1);
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const [leadsToday, leadsPeriod, ticketsOpen, recentLeads, leadsGroup, ticketsGroup] = await Promise.all([
    prisma.lead.count({
      where: {
        createdAt: { gte: todayStart, lte: todayEnd },
        ...(sourceFilter ? { source: sourceFilter } : {}),
      },
    }),
    prisma.lead.count({
      where: {
        createdAt: { gte: periodStart, lte: todayEnd },
        ...(sourceFilter ? { source: sourceFilter } : {}),
      },
    }),
    prisma.ticket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    prisma.lead.findMany({
      take: 8,
      where: sourceFilter ? { source: sourceFilter } : undefined,
      orderBy: { createdAt: "desc" },
    }),
    prisma.lead.groupBy({
      by: ["source"],
      _count: { _all: true },
      where: {
        createdAt: { gte: periodStart, lte: todayEnd },
        ...(sourceFilter ? { source: sourceFilter } : {}),
      },
    }),
    prisma.ticket.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const leadBars = Object.values(LeadSource).map((source) => ({
    label: source,
    value: leadsGroup.find((x) => x.source === source)?._count._all || 0,
  }));
  const ticketBars = ["OPEN", "IN_PROGRESS", "DONE"].map((status) => ({
    label: status,
    value: ticketsGroup.find((x) => x.status === status)?._count._all || 0,
  }));

  const leadMax = maxValue(leadBars.map((x) => x.value));
  const ticketMax = maxValue(ticketBars.map((x) => x.value));

  return (
    <AdminShell title="Dashboard">
      <form method="GET" className="panel mb-6 grid gap-3 p-4 md:grid-cols-[180px_180px_auto] md:items-end">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Período</label>
          <select name="period" defaultValue={String(period)} className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm">
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Origem</label>
          <select name="source" defaultValue={sourceFilter || ""} className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm">
            <option value="">Todas</option>
            {Object.values(LeadSource).map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black">
          Aplicar
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <p className="text-sm text-muted">Leads hoje</p>
          <p className="mt-2 text-3xl font-bold">{leadsToday}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-muted">Leads ({period}d)</p>
          <p className="mt-2 text-3xl font-bold">{leadsPeriod}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-muted">Tickets abertos</p>
          <p className="mt-2 text-3xl font-bold">{ticketsOpen}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="panel p-5">
          <h2 className="text-lg font-semibold">Leads por origem ({period}d)</h2>
          <div className="mt-4 space-y-3">
            {leadBars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{bar.label}</span>
                  <span className="text-muted">{bar.value}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${(bar.value / leadMax) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-lg font-semibold">Tickets por status</h2>
          <div className="mt-4 space-y-3">
            {ticketBars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{bar.label}</span>
                  <span className="text-muted">{bar.value}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div className="h-2 rounded-full bg-amber" style={{ width: `${(bar.value / ticketMax) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel mt-6 p-5">
        <h2 className="text-lg font-semibold">Leads recentes</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-2">Data</th>
                <th className="py-2">Nome</th>
                <th className="py-2">Origem</th>
                <th className="py-2">Status</th>
                <th className="py-2">Contato</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-white/5">
                  <td className="py-2">{new Date(lead.createdAt).toLocaleString("pt-BR")}</td>
                  <td className="py-2">{lead.name}</td>
                  <td className="py-2">{lead.source}</td>
                  <td className="py-2">{lead.status}</td>
                  <td className="py-2">{lead.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
