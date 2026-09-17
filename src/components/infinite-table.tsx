"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, getCategory, tableProducts } from "@/lib/catalog";
import { clamp, lerp } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media";

type Point = { x: number; y: number };

export function InfiniteTable() {
  const root = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const pointer = useRef<Point>({ x: 0.5, y: 0.42 });
  const current = useRef<Point>({ x: 0.5, y: 0.42 });
  const [hover, setHover] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);
  const reduced = usePrefersReducedMotion();
  const router = useRouter();
  const objects = useMemo(() => tableProducts, []);

  useEffect(() => {
    const enter = window.setTimeout(() => setReady(true), 80);
    const leaveIntro = window.setTimeout(
      () => setIntro(false),
      reduced ? 0 : 1800,
    );
    return () => {
      window.clearTimeout(enter);
      window.clearTimeout(leaveIntro);
    };
  }, [reduced]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      current.current.x = lerp(current.current.x, pointer.current.x, 0.08);
      current.current.y = lerp(current.current.y, pointer.current.y, 0.08);
      const px = current.current.x;
      const py = current.current.y;
      if (plane.current) {
        const rotX = 14 + (py - 0.5) * -5;
        const rotY = (px - 0.5) * 6;
        const tx = (px - 0.5) * -36;
        const ty = (py - 0.5) * -22;
        plane.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      if (light.current) {
        light.current.style.background = `radial-gradient(42% 34% at ${px * 100}% ${py * 100}%, rgba(243,236,225,0.1) 0%, transparent 52%), radial-gradient(120% 90% at 18% 12%, rgba(255,214,160,0.08) 0%, transparent 46%), radial-gradient(120% 90% at 50% 40%, transparent 42%, rgba(8,6,4,0.38) 100%)`;
      }
      const node = root.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const mx = current.current.x * rect.width;
        const my = current.current.y * rect.height;
        const radius = Math.max(rect.width, rect.height) * 0.2;
        node.querySelectorAll<HTMLElement>("[data-slot]").forEach((slot) => {
          const ox = Number(slot.dataset.x);
          const oy = Number(slot.dataset.y);
          const cx = (ox / 100) * rect.width;
          const cy = (oy / 100) * rect.height;
          const dist = Math.hypot(mx - cx, my - cy);
          const t = clamp(1 - dist / radius, 0, 1);
          const ease = t * t * (3 - 2 * t);
          const scale = 1 + 0.38 * ease;
          const lift = -22 * ease;
          const depth = 36 * ease;
          const tiltX = ((my - cy) / radius) * -5 * ease;
          const tiltY = ((mx - cx) / radius) * 7 * ease;
          const card = slot.querySelector<HTMLElement>("[data-object]");
          const photo = slot.querySelector<HTMLElement>("[data-photo]");
          const contact = slot.querySelector<HTMLElement>("[data-contact]");
          const ambient = slot.querySelector<HTMLElement>("[data-ambient]");
          if (card) {
            card.style.transform = `translate3d(0, ${lift}px, ${depth}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
            card.style.zIndex = String(10 + Math.round(ease * 40));
          }
          const shadowX = 10 + ease * 26;
          const shadowY = 8 + ease * 18;
          if (contact) {
            contact.style.opacity = String(0.78 - ease * 0.34);
            contact.style.filter = `blur(${5 + ease * 12}px)`;
            contact.style.transform = `translate(${shadowX * 0.45}px, ${shadowY * 0.35}px) scale(${1.04 + ease * 0.32}, ${0.38 + ease * 0.2})`;
          }
          if (ambient) {
            ambient.style.opacity = String(0.3 + ease * 0.12);
            ambient.style.filter = `blur(${12 + ease * 22}px)`;
            ambient.style.transform = `translate(${shadowX}px, ${shadowY}px) scale(${1.22 + ease * 0.5}, ${0.48 + ease * 0.26})`;
          }
          if (photo) {
            photo.style.filter = `drop-shadow(${shadowX * 0.55}px ${shadowY * 0.7}px ${7 + ease * 16}px rgba(10,6,3,${0.42 - ease * 0.1}))`;
          }
          slot.style.zIndex = String(8 + Math.round(ease * 40));
        });
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const onPointer = (event: React.PointerEvent) => {
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    pointer.current = {
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
    };
  };

  const onTouchOpen = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") return;
    if ((event.target as HTMLElement | null)?.closest?.("[data-object]")) return;
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    let nearest = objects[0];
    let best = 999;
    for (const product of objects) {
      const place = product.table!;
      const dist = Math.hypot(x - place.x, y - place.y);
      if (dist < best) {
        best = dist;
        nearest = product;
      }
    }
    if (nearest && best < 22) router.push(`/exhibit/${nearest.slug}`);
  };

  const hovered = objects.find((item) => item.slug === hover);
  const hoveredCategory = hovered ? getCategory(hovered.category) : null;

  return (
    <div
      ref={root}
      onPointerMove={onPointer}
      onPointerUp={onTouchOpen}
      onPointerLeave={() => {
        pointer.current = { x: 0.5, y: 0.42 };
        setHover(null);
      }}
      className="desktop-hide-cursor relative h-[100dvh] w-full overflow-hidden bg-ink"
    >
      <div
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          backgroundImage: "url('/world/table-composed.jpg')",
          opacity: intro ? 1 : 0,
          transform: intro ? "scale(1.03)" : "scale(1.1)",
          filter: intro ? "saturate(1.05)" : "blur(10px)",
        }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/25" />
        <div className="absolute bottom-10 left-8 right-8 sm:left-12">
          <p className="font-mono text-[10px] tracking-[0.42em] text-brass uppercase">
            Man Singh Gurjar
          </p>
          <p className="font-serif text-5xl text-ivory sm:text-7xl">
            The Private Table
          </p>
        </div>
      </div>

      <div className="table-stage absolute inset-0">
        <div
          ref={plane}
          className="table-plane absolute -inset-[7%]"
          style={{
            transform: "rotateX(14deg)",
            transition: ready ? undefined : "transform 1.4s var(--ease-out)",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-[2px] shadow-[0_50px_120px_rgba(0,0,0,0.55)]"
            style={{
              backgroundImage: "url('/world/table-desktop.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {objects.map((product) => {
            const place = product.table!;
            return (
              <div
                key={product.slug}
                className="object-slot"
                data-slot
                data-x={place.x}
                data-y={place.y}
                style={{
                  left: `${place.x}%`,
                  top: `${place.y}%`,
                  width: `${place.w}%`,
                  rotate: `${place.rotate ?? 0}deg`,
                }}
              >
                <span className="object-shadow object-shadow-ambient" data-ambient />
                <span className="object-shadow object-shadow-contact" data-contact />
                <button
                  type="button"
                  data-object
                  data-hot
                  onPointerEnter={() => setHover(product.slug)}
                  onFocus={() => setHover(product.slug)}
                  onClick={() => router.push(`/exhibit/${product.slug}`)}
                  className="object-card appearance-none border-0 p-0"
                  aria-label={`${product.name}, ${product.category}`}
                >
                  <img
                    data-photo
                    src={product.objectImage}
                    alt=""
                    draggable={false}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        ref={light}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
        style={{ opacity: intro ? 0 : 1 }}
      />

      <div
        className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 px-6 pb-7 sm:px-10"
        style={{ opacity: intro ? 0 : 1, transition: "opacity 700ms ease" }}
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.42em] text-brass uppercase">
            {hoveredCategory
              ? `${hoveredCategory.index}  /  ${hoveredCategory.latin}`
              : "Approach an object"}
          </p>
          <h1 className="font-serif text-4xl leading-none text-ivory sm:text-6xl">
            {hovered ? hovered.name : "The table is the map."}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/70">
            {hovered
              ? hovered.note
              : "Five worlds, laid as still life. Finance, business, lifestyle, tech, software — not as menus, as things."}
          </p>
          {hovered ? (
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href={`/exhibit/${hovered.slug}`}
                className="font-mono text-[10px] tracking-[0.28em] text-brass uppercase"
              >
                Open exhibit
              </Link>
              <Link
                href={`/world/${hovered.category}`}
                className="font-mono text-[10px] tracking-[0.28em] text-ivory/70 uppercase"
              >
                Enter {hoveredCategory?.label}
              </Link>
            </div>
          ) : null}
        </div>
        <ol className="hidden gap-3 text-right lg:block">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/world/${category.id}`}
                className="font-mono text-[10px] tracking-[0.32em] text-ivory/55 uppercase transition-colors hover:text-ivory"
              >
                {category.index}  {category.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
