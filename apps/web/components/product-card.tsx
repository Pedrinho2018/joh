import Image from "next/image";
import Link from "next/link";
import { Product, ProductCategory, ProductType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductImage } from "@/lib/images";

type ProductCardProps = {
  product: Product & { category: ProductCategory };
  hrefBase: "/equipamentos" | "/pecas-acessorios";
  featured?: boolean;
  index?: number;
};

export function ProductCard({ product, hrefBase, featured = false, index = 0 }: ProductCardProps) {
  const images = (product.images as string[]) || [];
  const type = product.type === ProductType.EQUIPMENT ? "equipment" : "part";
  const fallbackImage = getProductImage(index, type);
  
  return (
    <article className={cn(
      "panel overflow-hidden transition-all duration-300 group",
      "hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30",
      featured && "md:col-span-2 md:row-span-2 ring-2 ring-accent/20"
    )}>
      <div className={cn("relative", featured ? "h-64 md:h-80" : "h-44")}>
        <Image src={images[0] || fallbackImage} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {featured && (
          <div className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
            Destaque
          </div>
        )}
      </div>
      <div className={cn("p-5", featured && "p-6 md:p-8")}>
        <p className="text-xs uppercase tracking-widest text-accent">{product.category.name}</p>
        <h3 className={cn("mt-2 font-semibold", featured ? "text-xl md:text-2xl" : "text-lg")}>{product.name}</h3>
        <p className={cn("mt-2 text-muted", featured ? "text-base" : "text-sm")}>{product.shortDesc}</p>
        <Link href={`${hrefBase}/${product.slug}`} className="mt-4 inline-block">
          <Button variant={featured ? "default" : "secondary"} size={featured ? "lg" : "sm"}>
            {featured ? "Ver equipamento" : "Ver detalhe"}
          </Button>
        </Link>
      </div>
    </article>
  );
}
