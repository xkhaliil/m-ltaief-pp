"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type Props = {
  src: string;
  alt: string;
  /** Classes for the image itself — object-fit/rounding, not sizing/position
      (next/image's `fill` already handles that). */
  className?: string;
  /** Classes for the wrapping <span> — must establish the box (fixed size or
      aspect-ratio) so the skeleton and the filled image have something to
      fill. */
  wrapperClassName?: string;
  loading?: "lazy" | "eager";
  /** How wide this image actually renders at, so next/image doesn't ship a
      full-resolution original for a thumbnail-sized slot. */
  sizes?: string;
};

// Fixed-size image slot (grid thumbnails, admin previews): shows a pulsing
// skeleton sized to the wrapper until the image actually loads, then
// crossfades to it. Uses next/image so the (often several-thousand-pixel,
// several-MB) source gets resized/re-encoded to whatever this slot actually
// needs, instead of the browser decoding the original just to shrink it —
// that decode cost was what made scrolling past a grid of these jank.
export function ImageWithSkeleton({
  src,
  alt,
  className,
  wrapperClassName,
  loading = "lazy",
  sizes = "300px",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    // A cached image can finish loading before this effect even attaches
    // the onLoad handler below — `complete` catches that case, which onLoad
    // alone misses (leaving the skeleton stuck on top of a loaded image).
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <span className={cn("relative block", wrapperClassName)}>
      {!loaded ? <Skeleton className="absolute inset-0 rounded-[inherit]" /> : null}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        className={cn(
          "object-cover transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </span>
  );
}
