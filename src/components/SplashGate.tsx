"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SiteLoader } from "./SiteLoader";

// The `.site-loader-name` animation-duration in globals.css is 4s; starting
// the fade 300ms early means the reveal overlaps the tail of the fill
// instead of waiting for a dead final beat, so the handoff reads as one
// continuous motion rather than "animation ends, then something happens."
const ANIMATION_MS = 3700;

export function SplashGate({ children }: { children: ReactNode }) {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), ANIMATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      {visible ? (
        <div
          className={`site-loader-overlay ${fading ? "site-loader-overlay-hidden" : ""}`}
          onTransitionEnd={() => {
            if (fading) setVisible(false);
          }}
        >
          <SiteLoader />
        </div>
      ) : null}
    </>
  );
}
