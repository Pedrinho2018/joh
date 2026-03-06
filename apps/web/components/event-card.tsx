import Image from "next/image";
import Link from "next/link";
import { Event } from "@prisma/client";
import { formatDateBR, cn } from "@/lib/utils";
import { Calendar, MapPin, Clock, CheckCircle } from "lucide-react";
import { getEventImage } from "@/lib/images";

function getEventStatus(date: Date): { label: string; color: string; animate?: boolean } {
  const now = new Date();
  const eventDate = new Date(date);
  const diffDays = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { label: "Encerrado", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
  } else if (diffDays === 0) {
    return { label: "Hoje!", color: "bg-red-500/20 text-red-400 border-red-500/30", animate: true };
  } else if (diffDays <= 7) {
    return { label: `Em ${diffDays} dias`, color: "bg-amber/20 text-amber border-amber/30", animate: true };
  } else if (diffDays <= 30) {
    return { label: "Em breve", color: "bg-accent/20 text-accent border-accent/30" };
  }
  return { label: "Agendado", color: "bg-white/10 text-muted border-white/20" };
}

type EventCardProps = {
  event: Event;
  featured?: boolean;
  index?: number;
};

export function EventCard({ event, featured = false, index = 0 }: EventCardProps) {
  const status = getEventStatus(event.date);
  const coverImage = event.coverImage || getEventImage(index);
  
  return (
    <article className={cn(
      "panel overflow-hidden transition-all duration-300 group",
      "hover:scale-[1.02] hover:shadow-xl hover:shadow-amber/10 hover:border-amber/30",
      featured && "md:col-span-2 ring-2 ring-amber/20"
    )}>
      <div className={cn("relative overflow-hidden", featured ? "h-56 md:h-72" : "h-44")}>
        <Image 
          src={coverImage} 
          alt={event.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn(
            "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
            status.color,
            status.animate && "animate-pulse"
          )}>
            {status.label}
          </span>
          {featured && (
            <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Destaque
            </span>
          )}
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-4 text-white/90 text-xs">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDateBR(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {event.location}
          </span>
        </div>
      </div>
      <div className={cn("p-5", featured && "p-6 md:p-8")}>
        <h3 className={cn("font-semibold", featured ? "text-xl md:text-2xl" : "text-lg")}>{event.title}</h3>
        <p className={cn("mt-2 line-clamp-3 text-muted", featured ? "text-base" : "text-sm")}>{event.content}</p>
        <Link 
          href={`/eventos/${event.slug}`} 
          className={cn(
            "mt-4 inline-flex items-center gap-1 font-semibold text-amber hover:underline",
            featured ? "text-base" : "text-sm"
          )}
        >
          Ver evento
        </Link>
      </div>
    </article>
  );
}
