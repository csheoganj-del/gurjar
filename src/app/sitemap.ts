import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://gurjar.world";
  return [
    { url: origin, priority: 1 },
    ...categories.map((category) => ({
      url: `${origin}/world/${category.id}`,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${origin}/exhibit/${product.slug}`,
      priority: 0.7,
    })),
  ];
}
