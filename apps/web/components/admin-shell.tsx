import Link from "next/link";
import { ReactNode } from "react";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/categories", label: "Categorias" },
  { href: "/admin/products", label: "Produtos" },
  { href: "/admin/events", label: "Eventos" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/tickets", label: "Tickets" },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="container-shell py-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Painel Admin</p>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {adminNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl border border-line bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
                {item.label}
              </Link>
            ))}
            <form action="/api/admin/logout" method="post">
              <button className="rounded-xl border border-line bg-white/5 px-3 py-2 text-sm hover:bg-white/10" type="submit">
                Sair
              </button>
            </form>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
