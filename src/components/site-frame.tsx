"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, house } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function SiteFrame({ quiet = false }: { quiet?: boolean }) {
  const path = usePathname();
  const onTable = path === "/";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/80 via-ink/25 to-transparent">
      <div className="pointer-events-auto flex items-start justify-between gap-6 px-5 pt-5 sm:px-8 sm:pt-7">
        <Link href="/" className="group block">
          <p className="font-mono text-[10px] tracking-[0.42em] text-brass uppercase">
            {house.experience}
          </p>
          <p className="font-serif text-[28px] leading-none tracking-[0.18em] text-ivory uppercase sm:text-[32px]">
            {house.name}
          </p>
        </Link>

        <nav
          aria-label="Worlds"
          className={cn(
            "hidden items-center gap-5 pt-2 md:flex",
            quiet && "opacity-80",
          )}
        >
          {categories.map((category) => {
            const href = `/world/${category.id}`;
            const active = path.startsWith(href);
            return (
              <Link
                key={category.id}
                href={href}
                className={cn(
                  "font-mono text-[10px] tracking-[0.28em] uppercase transition-colors duration-500",
                  active ? "text-ivory" : "text-ivory/55 hover:text-ivory",
                )}
              >
                {category.label}
              </Link>
            );
          })}
        </nav>

        <p className="hidden font-mono text-[10px] tracking-[0.28em] text-ivory/50 uppercase sm:block">
          {onTable ? house.line : house.person}
        </p>
      </div>
    </header>
  );
}
