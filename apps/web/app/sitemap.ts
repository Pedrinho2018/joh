import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, events] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, type: true, createdAt: true } }),
    prisma.event.findMany({ select: { slug: true, createdAt: true } }),
  ]);

  const staticRoutes = [
    "/",
    "/empresa",
    "/equipamentos",
    "/pecas-acessorios",
    "/eventos",
    "/contato",
    "/pos-venda",
    "/catalogo",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...products.map((product) => ({
      url: `${siteConfig.url}${product.type === "EQUIPMENT" ? "/equipamentos" : "/pecas-acessorios"}/${product.slug}`,
      lastModified: product.createdAt,
    })),
    ...events.map((event) => ({
      url: `${siteConfig.url}/eventos/${event.slug}`,
      lastModified: event.createdAt,
    })),
  ];
}
