import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/server";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!product) return jsonError("Produto não encontrado.", 404);
  return Response.json(product);
}
