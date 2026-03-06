import { ProductType } from "@prisma/client";
import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/public-forms";
import { getCategories, getProducts } from "@/lib/data";

export default async function EquipamentosPage({
  searchParams,
}: {
  searchParams: { q?: string; categoria?: string; tipo?: string; capacidade?: string; aplicacao?: string };
}) {
  const [categories, baseProducts] = await Promise.all([
    getCategories(ProductType.EQUIPMENT),
    getProducts({
      type: ProductType.EQUIPMENT,
      search: searchParams.q,
      categorySlug: searchParams.categoria,
    }),
  ]);
  const capacity = (searchParams.capacidade || "").toLowerCase();
  const application = (searchParams.aplicacao || "").toLowerCase();
  const products = baseProducts.filter((product) => {
    const specs = (product.specs as Record<string, unknown>) || {};
    const capText = String(specs.capacidade || "").toLowerCase();
    const appText = String(specs.aplicacao || "").toLowerCase();
    return (!capacity || capText.includes(capacity)) && (!application || appText.includes(application));
  });

  return (
    <SiteShell>
      <section className="container-shell py-10">
        <SectionHeading title="Equipamentos" subtitle="Listagem com busca e filtros por tipo/categoria. Estrutura pronta para filtros técnicos adicionais (capacidade/aplicação)." />
        <ProductFilters
          categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
          currentCategory={searchParams.categoria}
          currentSearch={searchParams.q}
          currentCapacity={searchParams.capacidade}
          currentApplication={searchParams.aplicacao}
          basePath="/equipamentos"
          showTechnicalFilters
        />
        
        {/* Carousel horizontal em mobile */}
        <div className="mt-6 md:hidden">
          <div className="scroll-container -mx-4 px-4">
            {products.map((product, idx) => (
              <div key={product.id} className="scroll-item w-[300px]">
                <ProductCard product={product} hrefBase="/equipamentos" index={idx} />
              </div>
            ))}
          </div>
          {products.length === 0 && <p className="text-sm text-muted">Nenhum equipamento encontrado.</p>}
        </div>
        
        {/* Grid em desktop com featured card */}
        <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} hrefBase="/equipamentos" featured={idx === 0} index={idx} />
          ))}
          {products.length === 0 && <p className="text-sm text-muted">Nenhum equipamento encontrado.</p>}
        </div>
      </section>
    </SiteShell>
  );
}
