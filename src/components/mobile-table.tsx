"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, house, tableProducts } from "@/lib/catalog";

export function MobileTable() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    const sections = [...node.querySelectorAll<HTMLElement>("section[data-index]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(Number((visible.target as HTMLElement).dataset.index));
        }
      },
      { threshold: [0.55, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scroller} className="mobile-snap h-[100dvh] overflow-y-auto overflow-x-hidden bg-ink">
      <section
        data-index={0}
        className="relative flex h-[100dvh] flex-col overflow-hidden px-5"
        style={{
          paddingTop: "max(5.5rem, calc(env(safe-area-inset-top) + 4.5rem))",
          paddingBottom: "max(5.25rem, calc(env(safe-area-inset-bottom) + 4.25rem))",
          backgroundImage: "url('/world/table-mobile.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
        <div className="relative mt-auto max-w-[22rem]">
          <p className="font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
            {house.line}
          </p>
          <h1 className="mt-3 font-serif text-[42px] leading-[0.95] text-ivory sm:text-5xl">
            The table
            <br />
            is the map.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ivory/75">
            Scroll through the objects. Each one is a door — into finance, business,
            lifestyle, tech, or the software atelier.
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-ivory/55 uppercase">
            Slide  ·  01 / {tableProducts.length + 1}
          </p>
        </div>
      </section>

      {tableProducts.map((product, index) => (
        <section
          key={product.slug}
          data-index={index + 1}
          className="relative flex h-[100dvh] flex-col overflow-hidden px-5"
          style={{
            paddingTop: "max(5.25rem, calc(env(safe-area-inset-top) + 4.25rem))",
            paddingBottom: "max(5.25rem, calc(env(safe-area-inset-bottom) + 4.25rem))",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "url('/world/table-mobile.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/15" />

          <Link
            href={`/exhibit/${product.slug}`}
            className="relative z-20 flex min-h-0 flex-1 items-center justify-center"
            aria-label={`Open ${product.name}`}
          >
            <img
              src={product.objectImage}
              alt={product.name}
              className="max-h-full w-auto max-w-[min(100%,280px)] object-contain"
              style={{
                transform:
                  active === index + 1 ? "scale(1.02)" : "scale(0.96)",
                filter:
                  active === index + 1
                    ? "drop-shadow(12px 22px 18px rgba(12,8,4,0.5))"
                    : "drop-shadow(8px 12px 10px rgba(12,8,4,0.35))",
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
              }}
            />
          </Link>

          <div className="relative z-20 shrink-0 pt-4">
            <p className="font-mono text-[10px] tracking-[0.24em] text-brass uppercase">
              {String(index + 1).padStart(2, "0")}  /  {product.category}
            </p>
            <Link href={`/exhibit/${product.slug}`}>
              <h2 className="mt-1 font-serif text-[28px] leading-tight text-balance text-ivory">
                {product.name}
              </h2>
            </Link>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ivory/70">
              {product.note}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`/exhibit/${product.slug}`}
                className="inline-flex min-h-11 items-center border border-brass px-4 py-2.5 font-mono text-[10px] tracking-[0.22em] text-brass uppercase"
              >
                Open exhibit
              </Link>
              <Link
                href={`/world/${product.category}`}
                className="inline-flex min-h-11 items-center font-mono text-[10px] tracking-[0.22em] text-ivory/70 uppercase"
              >
                {product.category}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-ivory/10 bg-ink/80 px-2 py-2 backdrop-blur-md">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/world/${category.id}`}
              className="whitespace-nowrap px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-ivory/85 uppercase"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
