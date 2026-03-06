import { TicketStatus } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { updateTicketStatusAction } from "@/app/admin/actions";

export default async function AdminTicketsPage() {
  requireAdmin();
  const tickets = await prisma.ticket.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <AdminShell title="Tickets / Pós-venda">
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="panel p-5">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber">{ticket.protocol}</p>
                <h3 className="mt-1 font-semibold">{ticket.subject}</h3>
                <p className="mt-1 text-sm text-muted">{ticket.name} • {ticket.email} • {ticket.phone}</p>
                <p className="mt-2 text-sm text-muted">{ticket.message}</p>
                <p className="mt-2 text-xs text-muted">
                  Anexos: {((ticket.attachments as string[]) || []).length > 0 ? (ticket.attachments as string[]).join(", ") : "nenhum"}
                </p>
              </div>
              <form action={updateTicketStatusAction} className="flex items-center gap-2">
                <input type="hidden" name="id" value={ticket.id} />
                <select name="status" defaultValue={ticket.status} className="rounded-xl border border-line bg-panel px-3 py-2 text-sm">
                  <option value={TicketStatus.OPEN}>OPEN</option>
                  <option value={TicketStatus.IN_PROGRESS}>IN_PROGRESS</option>
                  <option value={TicketStatus.DONE}>DONE</option>
                </select>
                <button className="rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-black" type="submit">Atualizar</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
