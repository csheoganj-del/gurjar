"use client";

import { useEffect, useState } from "react";

export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMedia("(max-width: 900px), (pointer: coarse)");
}

export function usePrefersReducedMotion() {
  return useMedia("(prefers-reduced-motion: reduce)");
}
