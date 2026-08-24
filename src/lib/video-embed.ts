export type VideoEmbed = {
  src: string;
  label: string;
  kind: "video" | "audio";
  // Where to fetch the source's real width/height from (Vimeo/YouTube oEmbed).
  // Vimeo and YouTube players letterbox to the actual video's aspect ratio
  // inside whatever box we give them — if we just force every embed into a
  // fixed 16:9 frame, a portrait or square source video renders small and
  // centered with dead space around it. Fetching the real ratio lets the
  // frame match the source instead of guessing.
  oembedUrl?: string;
};

// Accepts a bare Vimeo ID (existing data), a full Vimeo URL, a full YouTube
// URL, or a SoundCloud track/set link, and resolves it to an embeddable
// iframe src. Anything else is passed through as-is, in case someone pastes
// an already-formed embed URL.
export function parseVideoEmbed(raw: string): VideoEmbed | null {
  const value = raw.trim();
  if (!value) return null;

  if (/^\d+$/.test(value)) {
    return {
      src: `https://player.vimeo.com/video/${value}?color=e40014&title=0&byline=0&portrait=0`,
      label: `Vimeo ${value}`,
      kind: "video",
      oembedUrl: `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${value}`)}`,
    };
  }

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean).pop();
      if (id) {
        return {
          src: `https://player.vimeo.com/video/${id}?color=e40014&title=0&byline=0&portrait=0`,
          label: `Vimeo ${id}`,
          kind: "video",
          oembedUrl: `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}`,
        };
      }
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be"
    ) {
      const id =
        url.searchParams.get("v") ??
        url.pathname.split("/").filter(Boolean).pop();
      if (id) {
        return {
          src: `https://www.youtube-nocookie.com/embed/${id}`,
          label: `YouTube ${id}`,
          kind: "video",
          oembedUrl: `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`,
        };
      }
    }

    if (host === "w.soundcloud.com") {
      // Already a full player embed URL — use as-is.
      return { src: value, label: "SoundCloud", kind: "audio" };
    }

    if (host === "soundcloud.com" || host === "on.soundcloud.com") {
      const params = new URLSearchParams({
        url: value,
        color: "#111111",
        auto_play: "false",
        show_artwork: "true",
      });
      return {
        src: `https://w.soundcloud.com/player/?${params.toString()}`,
        label: "SoundCloud",
        kind: "audio",
      };
    }
  } catch {
    // Not a parseable URL — fall through and use it as-is below.
  }

  return { src: value, label: value, kind: "video" };
}
