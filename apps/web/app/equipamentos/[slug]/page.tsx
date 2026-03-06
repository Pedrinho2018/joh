import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { QuoteForm } from "@/components/public-forms";
import { getProductBySlug } from "@/lib/data";

export default async function EquipmentDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product || product.type !== "EQUIPMENT") notFound();
  const images = (product.images as string[]) || [];
  const specs = (product.specs as Record<string, string>) || {};

  return (
    <SiteShell>
      <section className="container-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-4">
            <div className="panel relative h-72 overflow-hidden sm:h-96">
              <Image src={images[0] || "/images/placeholders/product-1.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {images.slice(1).map((src, index) => (
                <div key={`${src}-${index}`} className="panel relative h-40 overflow-hidden">
                  <Image src={src} alt={`${product.name} ${index + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="panel p-6">
              <p className="text-xs uppercase tracking-widest text-accent">{product.category.name}</p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{product.name}</h1>
              <p className="mt-3 text-sm leading-7 text-muted">{product.longDesc}</p>
            </div>
            <div className="panel p-6">
              <h2 className="text-lg font-semibold">Aplicações</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Processos de armazenagem e movimentação em operação agroindustrial.</li>
                <li>Projetos novos, retrofit e expansão de layout produtivo.</li>
                <li>Integração com plano de manutenção e suporte pós-venda.</li>
              </ul>
            </div>
            <div className="panel p-6">
              <h2 className="text-lg font-semibold">Destaques técnicos</h2>
              <div className="mt-3 grid gap-3">
                {Object.entries(specs).map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-line bg-white/5 px-3 py-2 text-sm">
                    <span className="font-medium capitalize">{k}:</span> <span className="text-muted">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-shell pb-10">
        <h2 className="mb-4 text-xl font-semibold">Solicitar orçamento</h2>
        <QuoteForm productName={product.name} sourceLabel="equipamento" />
      </section>
    </SiteShell>
  );
}
