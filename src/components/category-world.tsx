"use client";

import Link from "next/link";
import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";
import { SiteFrame } from "@/components/site-frame";
import {
  categories,
  productsIn,
  type Category,
} from "@/lib/catalog";

export function CategoryWorld({ category }: { category: Category }) {
  const items = productsIn(category.id);
  const others = categories.filter((item) => item.id !== category.id);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-ink">
      <SiteFrame />
      <Grain />
      <Cursor />

      <section className="relative min-h-[58vh] overflow-hidden pt-28 sm:min-h-[72vh]">
        <img
          src="/world/gallery.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative flex min-h-[58vh] flex-col justify-end px-5 pb-10 sm:min-h-[72vh] sm:px-10 sm:pb-16 lg:px-16">
          <p className="font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
            {category.index}  ·  {category.latin}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-balance text-ivory sm:text-5xl sm:leading-[0.92] lg:text-7xl">
            {category.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75">
            {category.statement}
          </p>
        </div>
      </section>

      {category.id === "software" ? (
        <section className="border-y border-ivory/10 bg-ivory/[0.03] px-5 py-12 sm:px-10 lg:px-16">
          <p className="font-mono text-[10px] tracking-[0.32em] text-brass uppercase">
            The launch pad
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl text-ivory sm:text-4xl">
            Recommended tools now. Original Mac software next.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/65">
            This room is built to grow from taste, to instruments, to products
            that leave this table and live on someone else’s.
          </p>
        </section>
      ) : null}

      <section className="px-5 py-16 sm:px-10 lg:px-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-ivory/50 uppercase">
              The {category.label} room
            </p>
            <h2 className="font-serif text-3xl text-ivory">On view</h2>
          </div>
          <Link
            href="/"
            className="shrink-0 font-mono text-[10px] tracking-[0.22em] text-brass uppercase"
          >
            The table
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <Link
              key={product.slug}
              href={`/exhibit/${product.slug}`}
              className="group w-full"
            >
              <div className="exhibit-hero relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.exhibitImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent p-5">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-brass uppercase">
                    {product.status}  ·  {product.kind}
                  </p>
                  <h3 className="font-serif text-2xl leading-tight text-ivory sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-ivory/70">{product.maker}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-ivory/10 px-5 py-12 sm:px-10 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.32em] text-ivory/50 uppercase">
          Other rooms
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <Link key={item.id} href={`/world/${item.id}`} className="group">
              <p className="font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
                {item.index}
              </p>
              <h3 className="font-serif text-3xl text-ivory group-hover:text-brass-soft">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                {item.headline}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
