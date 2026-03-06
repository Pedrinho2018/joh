import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { getEvents } from "@/lib/data";

export default async function EventosPage() {
  const events = await getEvents();
  return (
    <SiteShell>
      <section className="container-shell py-10">
        <SectionHeading title="Eventos" subtitle="Cadastro administrável de eventos, encontros técnicos e presença institucional." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} featured={idx === 0} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
