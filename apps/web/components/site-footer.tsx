import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold tracking-wide">JHONROB</h3>
          <p className="mt-2 text-sm text-muted">
            Soluções em equipamentos, peças e atendimento pós-venda com foco em desempenho operacional.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contato</h4>
          <p className="mt-2 text-sm text-muted">{siteConfig.email}</p>
          {siteConfig.units.map((unit) => (
            <p key={unit.city} className="text-sm text-muted">
              {unit.city}: {unit.phone}
            </p>
          ))}
        </div>
        <div>
          <h4 className="text-sm font-semibold">Links</h4>
          <div className="mt-2 flex flex-col text-sm text-muted">
            <Link href="/empresa">Empresa</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/pos-venda">Pós-venda</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
