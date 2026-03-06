"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CatalogLeadForm } from "@/components/public-forms";
import { Button, type ButtonProps } from "@/components/ui/button";

type CatalogModalContextValue = {
  open: () => void;
  close: () => void;
};

const CatalogModalContext = createContext<CatalogModalContextValue | null>(null);

export function CatalogModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [],
  );

  return (
    <CatalogModalContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} title="Baixar Catálogo">
        <p className="mb-4 text-sm text-muted">
          Preencha seus dados para liberar o download e registrar o lead no painel/admin.
        </p>
        <CatalogLeadForm />
      </Dialog>
    </CatalogModalContext.Provider>
  );
}

export function useCatalogModal() {
  const ctx = useContext(CatalogModalContext);
  if (!ctx) throw new Error("useCatalogModal deve ser usado dentro de CatalogModalProvider");
  return ctx;
}

export function CatalogTriggerButton(props: ButtonProps) {
  const { open } = useCatalogModal();
  return (
    <Button {...props} type="button" onClick={open}>
      {props.children || "Baixar Catálogo"}
    </Button>
  );
}
