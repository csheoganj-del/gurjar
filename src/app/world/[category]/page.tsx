import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryWorld } from "@/components/category-world";
import { categories, getCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: id } = await params;
  const category = getCategory(id);
  if (!category) return {};
  return {
    title: `${category.label} · ${category.headline}`,
    description: category.statement,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: id } = await params;
  const category = getCategory(id);
  if (!category) notFound();
  return <CategoryWorld category={category} />;
}
