"use client";

// Resizes + re-encodes an image in the browser before it's uploaded, so a
// multi-megabyte phone/camera photo doesn't eat into Supabase's 1GB free
// storage tier. The site never displays a gallery image larger than
// 1000x1280 (see the Img component in SiteClient.tsx), so anything beyond
// ~2x that for retina screens is wasted storage.
const MAX_DIMENSION = 2000;
const QUALITY = 0.82;
const OUTPUT_TYPE = "image/webp";
const SKIP_BELOW_BYTES = 150_000;

export async function compressImage(file: File): Promise<File> {
  if (file.size < SKIP_BELOW_BYTES || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, OUTPUT_TYPE, QUALITY),
    );

    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^./\\]+$/, "") + ".webp";
    return new File([blob], newName, { type: OUTPUT_TYPE });
  } catch {
    return file;
  }
}
