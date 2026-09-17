"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-media";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();

  useEffect(() => {
    if (mobile) return;
    const onMove = (event: PointerEvent) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      if (ring.current) {
        ring.current.style.left = x;
        ring.current.style.top = y;
      }
      if (dot.current) {
        dot.current.style.left = x;
        dot.current.style.top = y;
      }
    };
    const onOver = (event: PointerEvent) => {
      const hot = (event.target as HTMLElement | null)?.closest?.(
        "a, button, [data-hot]",
      );
      ring.current?.classList.toggle("is-hot", Boolean(hot));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [mobile]);

  if (mobile) return null;

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
