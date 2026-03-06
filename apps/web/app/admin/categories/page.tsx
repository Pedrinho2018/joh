import { ProductType } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { deleteCategoryAction, upsertCategoryAction } from "@/app/admin/actions";

export default async function AdminCategoriesPage() {
  requireAdmin();
  const categories = await prisma.productCategory.findMany({ orderBy: [{ type: "asc" }, { name: "asc" }] });

  return (
    <AdminShell title="Categorias">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form action={upsertCategoryAction} className="panel space-y-3 p-5">
          <h2 className="text-lg font-semibold">Nova categoria</h2>
          <input className="hidden" name="id" />
          <input className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" name="name" placeholder="Nome" required />
          <input className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" name="slug" placeholder="Slug (opcional)" />
          <select className="w-full rounded-xl border border-line bg-panel px-3 py-2 text-sm" name="type" defaultValue={ProductType.EQUIPMENT}>
            <option value="EQUIPMENT">EQUIPMENT</option>
            <option value="PART">PART</option>
          </select>
          <textarea className="w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm" name="description" placeholder="Descrição" rows={4} />
          <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black" type="submit">Salvar categoria</button>
        </form>

        <div className="panel overflow-x-auto p-5">
          <table className="w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Nome</th>
                <th className="py-2">Slug</th>
                <th className="py-2">Tipo</th>
                <th className="py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-white/5 align-top">
                  <td className="py-2">{category.id}</td>
                  <td className="py-2">{category.name}</td>
                  <td className="py-2">{category.slug}</td>
                  <td className="py-2">{category.type}</td>
                  <td className="py-2">
                    <details>
                      <summary className="cursor-pointer text-accent">Editar</summary>
                      <form action={upsertCategoryAction} className="mt-2 grid gap-2">
                        <input type="hidden" name="id" value={category.id} />
                        <input className="rounded-xl border border-line bg-white/5 px-3 py-2" name="name" defaultValue={category.name} />
                        <input className="rounded-xl border border-line bg-white/5 px-3 py-2" name="slug" defaultValue={category.slug} />
                        <select className="rounded-xl border border-line bg-panel px-3 py-2" name="type" defaultValue={category.type}>
                          <option value="EQUIPMENT">EQUIPMENT</option>
                          <option value="PART">PART</option>
                        </select>
                        <textarea className="rounded-xl border border-line bg-white/5 px-3 py-2" name="description" defaultValue={category.description} rows={3} />
                        <button className="rounded-xl bg-accent px-3 py-2 text-black" type="submit">Atualizar</button>
                      </form>
                      <form action={deleteCategoryAction} className="mt-2">
                        <input type="hidden" name="id" value={category.id} />
                        <button className="rounded-xl border border-red-500/50 px-3 py-2 text-red-300" type="submit">Excluir</button>
                      </form>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
