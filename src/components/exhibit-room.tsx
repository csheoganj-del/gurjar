"use client";

import Link from "next/link";
import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";
import { SiteFrame } from "@/components/site-frame";
import {
  getCategory,
  relatedProducts,
  tierLabel,
  type Product,
} from "@/lib/catalog";

export function ExhibitRoom({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const related = relatedProducts(product);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-ink">
      <SiteFrame quiet />
      <Grain />
      <Cursor />

      <article>
        <section className="grid min-h-[100dvh] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="exhibit-hero relative h-[46vh] min-h-[240px] sm:h-[56vh] lg:h-auto lg:min-h-[100dvh]">
            <img
              src={product.exhibitImage}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-contain p-6 lg:object-cover lg:p-0"
            />
          </div>
          <div className="flex flex-col justify-end px-5 pb-10 pt-8 sm:px-10 sm:py-16 lg:px-14 lg:py-28">
            <p className="font-mono text-[10px] tracking-[0.24em] text-brass uppercase">
              {category?.index}  ·  {category?.label}  ·  {product.status}
            </p>
            <p className="mt-4 font-serif text-lg italic text-ivory/70 sm:mt-6 sm:text-xl">
              {product.maker}
            </p>
            <h1 className="mt-2 font-serif text-4xl leading-tight text-balance text-ivory sm:text-5xl lg:text-6xl lg:leading-[0.92]">
              {product.name}
            </h1>
            {product.priceLabel ? (
              <p className="mt-4 font-mono text-[11px] tracking-[0.22em] text-ivory/50 uppercase">
                {product.priceLabel}
              </p>
            ) : null}
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ivory/80 sm:mt-8 sm:text-[17px]">
              {product.note}
            </p>
            {product.recommendation ? (
              <p className="mt-6 max-w-md border-l border-brass/60 pl-4 text-sm leading-relaxed text-ivory/65">
                {product.recommendation}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-5">
              {product.buyUrl ? (
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center border border-brass px-5 py-3 font-mono text-[10px] tracking-[0.28em] text-brass uppercase transition-colors hover:bg-brass hover:text-ink"
                >
                  {product.buyLabel ?? "View"}
                </a>
              ) : null}
              {category ? (
                <Link
                  href={`/world/${category.id}`}
                  className="font-mono text-[10px] tracking-[0.28em] text-ivory/70 uppercase"
                >
                  Back to {category.label}
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        {product.alternatives.length > 0 ? (
          <section className="border-t border-ivory/10 px-5 py-16 sm:px-10 lg:px-16">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[10px] tracking-[0.32em] text-brass uppercase">
                Other rooms in this decision
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ivory sm:text-4xl">
                Alternatives, by commitment.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/65">
                Not a comparison table. Four temperatures of the same choice —
                from the first honest version to the piece on the table.
              </p>
            </div>
            <div className="alt-rail grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {product.alternatives.map((option) => {
                const inner = (
                  <>
                    <p className="font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
                      {tierLabel[option.tier]}  ·  {option.budget}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl leading-tight text-ivory">
                      {option.title}
                    </h3>
                    {option.maker ? (
                      <p className="mt-1 text-sm text-ivory/55">{option.maker}</p>
                    ) : null}
                    <p className="mt-4 text-sm leading-relaxed text-ivory/70">
                      {option.note}
                    </p>
                    {option.current ? (
                      <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-ivory/40 uppercase">
                        On the table
                      </p>
                    ) : null}
                  </>
                );
                const className = `block min-h-[260px] border px-5 py-6 transition-colors ${
                  option.current
                    ? "border-brass bg-ivory/[0.03]"
                    : "border-ivory/10 hover:border-ivory/30"
                }`;
                if (option.productSlug) {
                  return (
                    <Link
                      key={option.title}
                      href={`/exhibit/${option.productSlug}`}
                      className={className}
                    >
                      {inner}
                    </Link>
                  );
                }
                if (option.href) {
                  return (
                    <a
                      key={option.title}
                      href={option.href}
                      target="_blank"
                      rel="noreferrer"
                      className={className}
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <div key={option.title} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="border-t border-ivory/10 px-5 py-16 sm:px-10 lg:px-16">
            <p className="font-mono text-[10px] tracking-[0.32em] text-ivory/50 uppercase">
              Kept nearby
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/exhibit/${item.slug}`} className="group">
                  <div className="exhibit-hero relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.exhibitImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.24em] text-brass uppercase">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-2xl text-ivory">{item.name}</h3>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 px-5 py-8 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.28em] text-brass uppercase"
          >
            Return to the table
          </Link>
          <p className="font-mono text-[10px] tracking-[0.22em] text-ivory/35 uppercase">
            Affiliate links may be used, never invented.
          </p>
        </footer>
      </article>
    </div>
  );
}
