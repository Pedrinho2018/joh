"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { CatalogTriggerButton } from "@/components/catalog-modal";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/90 backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/5 text-xs font-bold">JR</div>
          <div>
            <p className="text-sm font-semibold tracking-wide">JHONROB</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Agro & Industrial</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CatalogTriggerButton variant="amber" size="sm">Baixar Catálogo</CatalogTriggerButton>
          <Link href="/catalogo" className="hidden xl:block">
            <Button variant="secondary" size="sm">Página Catálogo</Button>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={cn("border-t border-white/10 bg-bg/95 lg:hidden", open ? "block" : "hidden")}>
        <div className="container-shell flex flex-col py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
