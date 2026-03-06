import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { CatalogLeadForm } from "@/components/public-forms";

export default function CatalogoPage() {
  return (
    <SiteShell>
      <section className="container-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="panel p-6 sm:p-8">
            <SectionHeading title="Baixar Catálogo" subtitle="Preencha os dados para liberar o download e registrar o lead no CRM demo (Prisma + Admin + automação Python)." />
            <div className="space-y-4 text-sm text-muted">
              <p>Após o envio, o sistema:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Registra o lead no banco com origem `CATALOG`.</li>
                <li>Dispara webhook para o serviço Python.</li>
                <li>Gera log diário e atualiza relatório.</li>
                <li>Libera o download de `catalogo.pdf`.</li>
              </ul>
            </div>
          </div>
          <CatalogLeadForm />
        </div>
      </section>
    </SiteShell>
  );
}
