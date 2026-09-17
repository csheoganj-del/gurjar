import Link from "next/link";
import { Grain } from "@/components/grain";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col justify-end bg-ink px-6 pb-16">
      <SiteFrame />
      <Grain />
      <p className="font-mono text-[10px] tracking-[0.36em] text-brass uppercase">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl text-ivory">
        This object is not on the table.
      </h1>
      <Link
        href="/"
        className="mt-8 font-mono text-[10px] tracking-[0.28em] text-brass uppercase"
      >
        Return to the table
      </Link>
    </div>
  );
}
