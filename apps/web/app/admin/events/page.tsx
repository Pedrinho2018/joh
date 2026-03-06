import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { deleteEventAction, upsertEventAction } from "@/app/admin/actions";

export default async function AdminEventsPage() {
  requireAdmin();
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });

  return (
    <AdminShell title="Eventos">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form action={upsertEventAction} className="panel space-y-3 p-5">
          <h2 className="text-lg font-semibold">Novo evento</h2>
          <input name="title" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2" placeholder="Título" required />
          <input name="slug" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2" placeholder="Slug (opcional)" />
          <input name="date" type="datetime-local" className="w-full rounded-xl border border-line bg-panel px-3 py-2" required />
          <input name="location" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2" placeholder="Local" required />
          <input name="coverImage" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2" placeholder="/images/placeholders/event-1.svg" />
          <textarea name="content" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2" rows={5} placeholder="Conteúdo" />
          <button className="rounded-xl bg-accent px-4 py-2 text-black" type="submit">Salvar evento</button>
        </form>
        <div className="space-y-4">
          {events.map((event) => (
            <details key={event.id} className="panel p-5">
              <summary className="cursor-pointer">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold">{event.title}</span>
                  <span className="text-xs text-muted">{new Date(event.date).toLocaleDateString("pt-BR")} • {event.location}</span>
                </div>
              </summary>
              <div className="mt-4 space-y-2">
                <form action={upsertEventAction} className="grid gap-2">
                  <input type="hidden" name="id" value={event.id} />
                  <input name="title" defaultValue={event.title} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <input name="slug" defaultValue={event.slug} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <input
                    name="date"
                    type="datetime-local"
                    defaultValue={new Date(event.date).toISOString().slice(0, 16)}
                    className="rounded-xl border border-line bg-panel px-3 py-2"
                  />
                  <input name="location" defaultValue={event.location} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <input name="coverImage" defaultValue={event.coverImage} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <textarea name="content" defaultValue={event.content} rows={4} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <button className="rounded-xl bg-accent px-4 py-2 text-black" type="submit">Atualizar</button>
                </form>
                <form action={deleteEventAction}>
                  <input type="hidden" name="id" value={event.id} />
                  <button className="rounded-xl border border-red-500/50 px-4 py-2 text-red-300" type="submit">Excluir</button>
                </form>
              </div>
            </details>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
