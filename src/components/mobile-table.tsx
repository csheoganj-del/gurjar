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
      { threshold: [0.45, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scroller} className="mobile-snap h-[100dvh] overflow-y-auto bg-ink">
      <section
        data-index={0}
        className="relative flex min-h-[100dvh] flex-col justify-end px-5 pb-24 pt-28"
        style={{
          backgroundImage: "url('/world/table-mobile.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
        <div className="relative">
          <p className="font-mono text-[10px] tracking-[0.42em] text-brass uppercase">
            {house.line}
          </p>
          <h1 className="mt-3 font-serif text-[56px] leading-[0.9] text-ivory">
            The table
            <br />
            is the map.
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ivory/75">
            Scroll through the objects. Each one is a door — into finance, business,
            lifestyle, tech, or the software atelier.
          </p>
          <p className="mt-8 font-mono text-[10px] tracking-[0.32em] text-ivory/55 uppercase">
            Slide  ·  01 / {tableProducts.length + 1}
          </p>
        </div>
      </section>

      {tableProducts.map((product, index) => (
        <section
          key={product.slug}
          data-index={index + 1}
          className="relative flex min-h-[100dvh] flex-col justify-end px-5 pb-24 pt-24"
        >
          <div className="absolute inset-0 bg-ink-soft" />
          <img
            src={product.objectImage}
            alt=""
            className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[58vh] w-auto object-contain transition-transform duration-700"
            style={{
              transform: active === index + 1 ? "scale(1.04) translateY(-8px)" : "scale(0.92)",
              filter:
                active === index + 1
                  ? "drop-shadow(0 28px 40px rgba(0,0,0,0.55))"
                  : "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
            }}
          />
          <div className="relative">
            <p className="font-mono text-[10px] tracking-[0.36em] text-brass uppercase">
              {String(index + 1).padStart(2, "0")}  /  {product.category}
            </p>
            <h2 className="mt-2 font-serif text-4xl leading-none text-ivory">
              {product.name}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/70">
              {product.note}
            </p>
            <div className="mt-6 flex gap-5">
              <Link
                href={`/exhibit/${product.slug}`}
                className="border-b border-brass pb-1 font-mono text-[10px] tracking-[0.28em] text-brass uppercase"
              >
                Open exhibit
              </Link>
              <Link
                href={`/world/${product.category}`}
                className="font-mono text-[10px] tracking-[0.28em] text-ivory/70 uppercase"
              >
                The {product.category} room
              </Link>
            </div>
          </div>
        </section>
      ))}

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center gap-2 px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-3">
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-ivory/10 bg-ink/70 px-3 py-2 backdrop-blur-md">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/world/${category.id}`}
              className="whitespace-nowrap px-2 font-mono text-[9px] tracking-[0.22em] text-ivory/80 uppercase"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
