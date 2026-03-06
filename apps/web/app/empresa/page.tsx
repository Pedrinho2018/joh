import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { Users, Package, Clock, Award } from "lucide-react";
import { unsplashImages } from "@/lib/images";

const values = [
  { title: "Missão", text: "Entregar soluções e atendimento que aumentem confiabilidade operacional em ambientes agroindustriais." },
  { title: "Visão", text: "Ser referência em experiência comercial e pós-venda para projetos de armazenagem e movimentação." },
  { title: "Valores", text: "Compromisso técnico, transparência, agilidade, segurança e relacionamento de longo prazo." },
];

const indicators = [
  { value: "15+", label: "Anos de experiência", icon: Award },
  { value: "500+", label: "Projetos entregues", icon: Package },
  { value: "24h", label: "Tempo de resposta", icon: Clock },
  { value: "2", label: "Unidades no Brasil", icon: Users },
];

export default function EmpresaPage() {
  return (
    <SiteShell>
      {/* Hero com imagem */}
      <section className="container-shell py-10">
        <div className="panel relative overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src={unsplashImages.field1} 
              alt="Campo agrícola" 
              fill 
              className="object-cover opacity-30" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          </div>
          <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Sobre a JHONROB</p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                Soluções industriais e agro com foco em performance
              </h1>
              <p className="mt-4 text-base text-muted">
                Mais de 15 anos conectando projeto, fornecimento e suporte para operações que exigem previsibilidade e alta resposta.
              </p>
            </div>
            <div className="relative hidden aspect-video overflow-hidden rounded-2xl lg:block">
              <Image 
                src={unsplashImages.warehouse} 
                alt="Armazém industrial" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Indicadores numéricos */}
      <section className="container-shell py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {indicators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="panel p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-3xl font-bold text-accent">{item.value}</p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-shell py-6">
        <div className="panel p-6 sm:p-8">
          <SectionHeading title="Empresa" subtitle="Propósito, posicionamento e diferenciais da JHONROB em uma apresentação direta e moderna." />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div className="space-y-4 text-sm leading-7 text-muted">
              <p>
                A JHONROB atua no suporte a operações industriais e agro com foco em equipamentos, peças, integração comercial e atendimento pós-venda. Nossa proposta é simplificar decisões técnicas e reduzir fricção entre necessidade, proposta e execução.
              </p>
              <p>
                O posicionamento da marca combina visão de campo, resposta rápida e organização de portfólio. Neste novo site, cada etapa foi pensada para facilitar contato comercial, consulta de catálogo e abertura de chamados com rastreabilidade.
              </p>
            </div>
            <div className="grid gap-4">
              {["Atendimento consultivo", "Portfólio organizado", "Fluxo de orçamento ágil", "Pós-venda com protocolo", "Base para automações comerciais"].map((item, idx) => (
                <div key={item} className={`rounded-2xl border border-line bg-white/5 p-4 text-sm transition-all duration-300 hover:bg-white/10 ${idx === 0 ? "ring-1 ring-accent/20" : ""}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="panel p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-6">
        <div className="panel p-6 sm:p-8">
          <SectionHeading title="Diferenciais" subtitle="Blocos de valor para argumentação comercial e apresentação institucional." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Agilidade comercial", "Formulários estruturados e captura de leads por origem."],
              ["Portfólio modular", "Categorias de equipamentos, peças e páginas de detalhe prontas para expansão."],
              ["Pós-venda digital", "Abertura de chamado com anexo e acompanhamento por protocolo."],
              ["Automação demonstrável", "Webhook + logs + e-mail + relatório diário para vender serviço."],
            ].map(([title, text], idx) => (
              <div key={title} className={`rounded-2xl border border-line bg-white/5 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 ${idx === 0 ? "ring-1 ring-accent/20" : ""}`}>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
