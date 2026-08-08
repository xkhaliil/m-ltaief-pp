"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Site-wide inertial scrolling (mouse wheel, trackpad, and touch) — native
// `scroll-behavior: smooth` only affects programmatic jumps like anchor
// links, not regular scrolling, so it can't produce this on its own.
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
