import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExhibitRoom } from "@/components/exhibit-room";
import { getProduct, products } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.note,
    openGraph: { images: [product.exhibitImage] },
  };
}

export default async function ExhibitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ExhibitRoom product={product} />;
}
