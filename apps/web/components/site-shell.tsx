import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CatalogModalProvider } from "@/components/catalog-modal";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CatalogModalProvider>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </CatalogModalProvider>
  );
}
