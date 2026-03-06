import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { TicketForm, TicketStatusLookup } from "@/components/public-forms";

export default function PosVendaPage() {
  return (
    <SiteShell>
      <section className="container-shell py-10">
        <SectionHeading title="Pós-venda" subtitle="Abra chamados com anexo, receba protocolo e acompanhe o status de atendimento." />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <TicketForm />
          <div className="space-y-6">
            <TicketStatusLookup />
            <div className="panel p-6">
              <h3 className="text-lg font-semibold">Fluxo de atendimento</h3>
              <ol className="mt-3 space-y-2 text-sm text-muted">
                <li>1. Registro do chamado e geração de protocolo.</li>
                <li>2. Encaminhamento automático via webhook para automação Python.</li>
                <li>3. Log + e-mail + relatório diário consolidado.</li>
                <li>4. Atualização de status no painel admin.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
