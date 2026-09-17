"use client";

import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";
import { InfiniteTable } from "@/components/infinite-table";
import { MobileTable } from "@/components/mobile-table";
import { SiteFrame } from "@/components/site-frame";

export function HomeExperience() {
  return (
    <div className="min-h-[100dvh] bg-ink">
      <SiteFrame />
      <Grain />
      <Cursor />
      <div className="home-desktop">
        <InfiniteTable />
      </div>
      <div className="home-mobile">
        <MobileTable />
      </div>
    </div>
  );
}
