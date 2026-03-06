import { ProductType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getCategories(type?: ProductType) {
  return prisma.productCategory.findMany({
    where: type ? { type } : undefined,
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });
}

export async function getProducts(params?: {
  type?: ProductType;
  search?: string;
  categorySlug?: string;
}) {
  const { type, search, categorySlug } = params || {};
  return prisma.product.findMany({
    where: {
      ...(type ? { type } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { shortDesc: { contains: search } },
            ],
          }
        : {}),
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getEvents() {
  return prisma.event.findMany({ orderBy: { date: "desc" } });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({ where: { slug } });
}
