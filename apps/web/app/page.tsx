import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, Gauge, ShieldCheck, Sparkles, MapPin, Headphones, Zap, CheckCircle, Phone, Navigation } from "lucide-react";
import { ProductType } from "@prisma/client";
import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { MotionReveal } from "@/components/motion-reveal";
import { ProductCard } from "@/components/product-card";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { CatalogTriggerButton } from "@/components/catalog-modal";
import { siteConfig } from "@/lib/site";
import { getCategories, getEvents, getProducts } from "@/lib/data";
import { unsplashImages } from "@/lib/images";

export default async function HomePage() {
  const [equipmentProducts, partProducts, equipmentCategories, partCategories, events] = await Promise.all([
    getProducts({ type: ProductType.EQUIPMENT }),
    getProducts({ type: ProductType.PART }),
    getCategories(ProductType.EQUIPMENT),
    getCategories(ProductType.PART),
    getEvents(),
  ]);

  return (
    <SiteShell>
      <section className="container-shell py-10 sm:py-14">
        <div className="panel relative overflow-hidden p-6 sm:p-10">
          {/* Hero background image */}
          <div className="absolute inset-0">
            <Image 
              src={unsplashImages.hero} 
              alt="Silos agrícolas" 
              fill 
              className="object-cover opacity-15" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
          </div>
          <div className="absolute inset-0 bg-grid-fade bg-[size:24px_24px] opacity-10" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <MotionReveal>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Indústria + Agro Premium</p>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
                  Engenharia comercial para armazenagem, movimentação e pós-venda de alta resposta.
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
                  Portal institucional e catálogo digital com foco em desempenho, atendimento consultivo e experiência rápida em qualquer dispositivo.
                </p>
                
                {/* CTAs melhorados */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/contato">
                    <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-bold shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow">
                      Falar com especialista
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <CatalogTriggerButton size="lg" variant="secondary" className="px-8 py-6 text-base border-2 border-amber/30 hover:border-amber/50 hover:bg-amber/10">
                    Baixar Catálogo Completo
                  </CatalogTriggerButton>
                </div>
                
                {/* Microcopy de confiança */}
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Resposta em até 24h • Sem compromisso • Atendimento personalizado
                </p>
                
                {/* Indicadores rápidos */}
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Nacional</p>
                      <p className="text-xs text-muted">Atendimento em todo Brasil</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <Headphones className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Suporte</p>
                      <p className="text-xs text-muted">Pós-venda especializado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <Zap className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Rápido</p>
                      <p className="text-xs text-muted">Respostas ágeis</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Projetos", value: "Sob demanda", icon: Factory },
                  { label: "Pós-venda", value: "Fluxo digital", icon: ShieldCheck },
                  { label: "Performance", value: "UX rápida", icon: Gauge },
                  { label: "Marca", value: "Visual premium", icon: Sparkles },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-line bg-white/5 p-4 hover:bg-white/10 hover:border-accent/30 transition-colors">
                    <Icon className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-xs uppercase tracking-widest text-muted">{label}</p>
                    <p className="mt-1 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <SectionHeading title="Nossos Equipamentos" subtitle="Categorias e linhas para compor sua operação com configuração por aplicação, capacidade e layout." />
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentCategories.map((category, idx) => (
            <MotionReveal key={category.id} delay={idx * 0.05}>
              <div className={`panel p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-accent/30 ${idx === 0 ? "sm:col-span-2 lg:col-span-1 ring-1 ring-accent/20 bg-accent/5" : ""}`}>
                <div className="flex items-start justify-between">
                  <p className="text-xs uppercase tracking-widest text-accent">{idx === 0 ? "Principal" : "Categoria"}</p>
                  {idx === 0 && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">★</span>}
                </div>
                <h3 className={`mt-2 font-semibold ${idx === 0 ? "text-2xl" : "text-xl"}`}>{category.name}</h3>
                <p className={`mt-2 text-muted ${idx === 0 ? "text-base" : "text-sm"}`}>{category.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {equipmentProducts.slice(0, 3).map((product, idx) => (
            <ProductCard key={product.id} product={product} hrefBase="/equipamentos" featured={idx === 0} index={idx} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/equipamentos" className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10">
            Ver todos os equipamentos <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <SectionHeading title="Peças de Reposição" subtitle="Componentes, kits e acessórios para manutenção planejada e continuidade operacional." />
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partCategories.map((category, idx) => (
            <div key={category.id} className={`panel p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-amber/30 ${idx === 0 ? "ring-1 ring-amber/20 bg-amber/5" : ""}`}>
              <div className="flex items-start justify-between">
                <h3 className={`font-semibold ${idx === 0 ? "text-xl" : "text-lg"}`}>{category.name}</h3>
                {idx === 0 && <span className="rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-bold text-amber">★</span>}
              </div>
              <p className={`mt-2 text-muted ${idx === 0 ? "text-base" : "text-sm"}`}>{category.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {partProducts.slice(0, 3).map((product, idx) => (
            <ProductCard key={product.id} product={product} hrefBase="/pecas-acessorios" featured={idx === 0} index={idx} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/pecas-acessorios" className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10">
            Ver todas as peças e acessórios <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="panel p-6 sm:p-8 transition-all duration-300 hover:shadow-lg">
            <SectionHeading title="Somos a JHONROB" subtitle="Atendimento técnico-comercial com foco em inovação aplicada, qualidade de entrega e confiabilidade no pós-venda." />
            <p className="text-base leading-7 text-muted">
              A JHONROB conecta projeto, fornecimento e suporte para operações industriais e agro que exigem previsibilidade e performance. O novo portal foi pensado para acelerar o contato comercial, organizar catálogo e centralizar solicitações de pós-venda.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Inovação", desc: "Tecnologia aplicada" },
                { name: "Qualidade", desc: "Padrão industrial" },
                { name: "Confiabilidade", desc: "Entrega garantida" },
                { name: "Eficiência", desc: "Processos otimizados" },
              ].map((item, idx) => (
                <div key={item.name} className={`rounded-2xl border border-line bg-white/5 px-4 py-3 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 ${idx === 0 ? "ring-1 ring-accent/20" : ""}`}>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-6 sm:p-8 transition-all duration-300 hover:shadow-lg">
            <SectionHeading title="Unidades" subtitle="Atendimento nacional com bases operacionais em pontos estratégicos." />
            <div className="space-y-4">
              {siteConfig.units.map((unit, idx) => (
                <div key={unit.city} className={`rounded-2xl border border-line bg-white/5 p-4 transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 ${idx === 0 ? "ring-1 ring-accent/20" : ""}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{unit.city}</h3>
                    {idx === 0 && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">Matriz</span>}
                  </div>
                  <p className="mt-2 text-sm text-muted">{unit.address}</p>
                  <p className="mt-2 text-sm font-medium text-white">{unit.phone}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
                    >
                      <Navigation size={14} />
                      Como chegar
                    </a>
                    <a
                      href={`tel:${unit.phone.replace(/\D/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                    >
                      <Phone size={14} />
                      Falar com unidade
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <SectionHeading title="Eventos" subtitle="Agenda de participação, encontros técnicos e ativações comerciais." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.slice(0, 3).map((event, idx) => (
            <EventCard key={event.id} event={event} featured={idx === 0} index={idx} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}



