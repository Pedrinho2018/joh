import { ProductType } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { deleteProductAction, upsertProductAction } from "@/app/admin/actions";

export default async function AdminProductsPage() {
  requireAdmin();
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.productCategory.findMany({ orderBy: [{ type: "asc" }, { name: "asc" }] }),
  ]);

  return (
    <AdminShell title="Produtos">
      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
        <form action={upsertProductAction} className="panel space-y-3 p-5">
          <h2 className="text-lg font-semibold">Novo produto</h2>
          <input name="name" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" placeholder="Nome" required />
          <input name="slug" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" placeholder="Slug (opcional)" />
          <select name="type" className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm" defaultValue={ProductType.EQUIPMENT}>
            <option value="EQUIPMENT">EQUIPMENT</option>
            <option value="PART">PART</option>
          </select>
          <select name="categoryId" className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm" required>
            <option value="">Selecione a categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.type} - {category.name}
              </option>
            ))}
          </select>
          <input name="shortDesc" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" placeholder="Resumo" />
          <textarea name="longDesc" className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" placeholder="Descrição longa" rows={4} />
          <textarea
            name="specs"
            className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-xs"
            rows={5}
            defaultValue={'{"capacidade":"Placeholder","dimensoes":"Placeholder","potencia":"Placeholder"}'}
          />
          <textarea
            name="images"
            className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-xs"
            rows={3}
            defaultValue='["/images/placeholders/product-1.svg","/images/placeholders/product-2.svg"]'
          />
          <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black" type="submit">Salvar produto</button>
        </form>

        <div className="space-y-4">
          {products.map((product) => (
            <details key={product.id} className="panel p-5">
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted">{product.type} • {product.category.name}</p>
                    <p className="font-semibold">{product.name}</p>
                  </div>
                  <span className="text-xs text-muted">{product.slug}</span>
                </div>
              </summary>
              <div className="mt-4 grid gap-2">
                <form action={upsertProductAction} className="grid gap-2">
                  <input type="hidden" name="id" value={product.id} />
                  <input name="name" defaultValue={product.name} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <input name="slug" defaultValue={product.slug} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <select name="type" defaultValue={product.type} className="rounded-xl border border-line bg-panel px-3 py-2">
                    <option value="EQUIPMENT">EQUIPMENT</option>
                    <option value="PART">PART</option>
                  </select>
                  <select name="categoryId" defaultValue={product.categoryId} className="rounded-xl border border-line bg-panel px-3 py-2">
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.type} - {category.name}
                      </option>
                    ))}
                  </select>
                  <input name="shortDesc" defaultValue={product.shortDesc} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <textarea name="longDesc" defaultValue={product.longDesc} rows={4} className="rounded-xl border border-line bg-white/5 px-3 py-2" />
                  <textarea name="specs" defaultValue={JSON.stringify(product.specs, null, 2)} rows={6} className="rounded-xl border border-line bg-white/5 px-3 py-2 text-xs" />
                  <textarea name="images" defaultValue={JSON.stringify(product.images, null, 2)} rows={4} className="rounded-xl border border-line bg-white/5 px-3 py-2 text-xs" />
                  <button className="rounded-xl bg-accent px-4 py-2 text-black" type="submit">Atualizar</button>
                </form>
                <form action={deleteProductAction}>
                  <input type="hidden" name="id" value={product.id} />
                  <button className="rounded-xl border border-red-500/50 px-4 py-2 text-red-300" type="submit">Excluir</button>
                </form>
              </div>
            </details>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
