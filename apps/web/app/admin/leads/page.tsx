import { LeadSource, LeadStatus } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { updateLeadCrmAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

function labelStatus(status: LeadStatus) {
  return (
    {
      NEW: "Novo",
      IN_CONTACT: "Em contato",
      PROPOSAL: "Proposta",
      WON: "Fechado",
      LOST: "Perdido",
    }[status] || status
  );
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { source?: LeadSource; status?: LeadStatus; q?: string };
}) {
  requireAdmin();
  const source = Object.values(LeadSource).includes(searchParams.source as LeadSource)
    ? (searchParams.source as LeadSource)
    : undefined;
  const status = Object.values(LeadStatus).includes(searchParams.status as LeadStatus)
    ? (searchParams.status as LeadStatus)
    : undefined;
  const q = searchParams.q || "";

  const leads = await prisma.lead.findMany({
    where: {
      ...(source ? { source } : {}),
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { email: { contains: q } },
              { phone: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell title="Leads / CRM">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <form method="GET" className="panel grid gap-3 p-4 md:grid-cols-[1fr_180px_180px_auto] md:items-end">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Busca</label>
            <input name="q" defaultValue={q} className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" placeholder="Nome, email, telefone" />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Origem</label>
            <select name="source" defaultValue={source || ""} className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm">
              <option value="">Todas</option>
              {Object.values(LeadSource).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Status</label>
            <select name="status" defaultValue={status || ""} className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm">
              <option value="">Todos</option>
              {Object.values(LeadStatus).map((item) => (
                <option key={item} value={item}>{labelStatus(item)}</option>
              ))}
            </select>
          </div>
          <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black" type="submit">Filtrar</button>
        </form>

        <a href="/api/admin/leads/export" className="inline-flex rounded-xl border border-line bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
          Exportar CSV
        </a>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => {
          const isNew = lead.status === "NEW";
          const isRecent = Date.now() - new Date(lead.createdAt).getTime() < 1000 * 60 * 60; // 1 hour
          return (
          <div
            key={lead.id}
            className={`panel p-5 transition-all duration-300 ${isNew ? "ring-2 ring-accent/40 bg-accent/5" : ""} ${isNew && isRecent ? "animate-pulse" : ""}`}
          >
            <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest">
                  <span className="rounded-full border border-line bg-white/5 px-2 py-1 text-accent">{lead.source}</span>
                  <span className={`rounded-full px-2 py-1 font-medium ${
                    isNew
                      ? "border-2 border-accent bg-accent/20 text-accent"
                      : "border border-line bg-white/5"
                  }`}>
                    {isNew && isRecent ? "🔴 " : ""}{labelStatus(lead.status)}
                  </span>
                  <span className="text-muted">{new Date(lead.createdAt).toLocaleString("pt-BR")}</span>
                  {isNew && isRecent && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-black animate-bounce">
                      RECÉM RECEBIDO
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{lead.name}</h3>
                <p className="mt-1 text-sm text-muted">{lead.email} • {lead.phone}</p>
                <p className="mt-3 text-sm text-muted">{lead.message || "Sem mensagem"}</p>
              </div>

              <form action={updateLeadCrmAction} className="grid gap-3">
                <input type="hidden" name="id" value={lead.id} />
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Status CRM</label>
                  <select name="status" defaultValue={lead.status} className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm">
                    {Object.values(LeadStatus).map((item) => (
                      <option key={item} value={item}>{labelStatus(item)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Observações internas</label>
                  <textarea
                    name="notes"
                    defaultValue={lead.notes || ""}
                    rows={4}
                    className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm"
                    placeholder="Ex.: retorno agendado, proposta enviada, decisor..."
                  />
                </div>
                <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black" type="submit">
                  Salvar CRM
                </button>
              </form>
            </div>
          </div>
          );
        })}
        {leads.length === 0 ? <div className="panel p-5 text-sm text-muted">Nenhum lead encontrado com os filtros atuais.</div> : null}
      </div>
    </AdminShell>
  );
}
