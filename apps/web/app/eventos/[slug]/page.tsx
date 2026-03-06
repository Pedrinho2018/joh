import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { formatDateBR } from "@/lib/utils";
import { getEventBySlug } from "@/lib/data";

export default async function EventoDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <SiteShell>
      <section className="container-shell py-10">
        <div className="panel overflow-hidden">
          <div className="relative h-64 sm:h-96">
            <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-amber">
              {formatDateBR(event.date)} • {event.location}
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-4xl">{event.title}</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted">{event.content}</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
