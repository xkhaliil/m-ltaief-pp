"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import Image from "next/image";
import type { ContentRow, Project } from "@/types/project";
import type { CvRow, Profile } from "@/types/profile";
import { EMPTY_PROFILE } from "@/types/profile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ROW_LAYOUTS,
  flattenItems,
  normalizeContent,
  pdfLabel,
  pdfEmbedSrc,
  isWebLink,
} from "@/lib/content-rows";
import { parseVideoEmbed, type VideoEmbed } from "@/lib/video-embed";
import { sanitizeRichText } from "@/lib/sanitize-html";

// `content` is always normalized (legacy flat blocks + the old `videos`
// column folded into rows) by the time a Project becomes an Entry — see
// buildSiteData below. Nothing downstream needs to know the raw DB shape.
type Entry = Omit<Project, "content" | "videos"> & { content: ContentRow[] };

type MenuItem =
  | {
      type: "item";
      id: string;
      label: string;
      labelFont?: string | null;
      subLines?: string[];
      subLinesFont?: string | null;
    }
  | { type: "category"; label: string; id?: string };

type SiteData = {
  entries: Record<string, Entry>;
  navTree: MenuItem[];
  projectIds: string[];
  lectureIds: string[];
  writingIds: string[];
  archiveIds: string[];
  activeMenuGroups: Record<string, string[]>;
};

function buildSiteData(projects: Project[]): SiteData {
  const bySection = (section: Project["section"]) =>
    projects.filter((p) => p.section === section);

  const main = bySection("main");
  const motus = bySection("motus");
  const lecture = bySection("lecture-performance");
  const writing = bySection("writing-publishing");
  const archive = bySection("archive");

  const entries: Record<string, Entry> = {};
  for (const p of projects) {
    entries[p.id] = { ...p, content: normalizeContent(p.content, p.videos) };
  }

  const toItem = (p: Project): MenuItem => ({
    type: "item",
    id: p.id,
    label: p.nav_label ?? p.title,
    labelFont: p.nav_label ? p.nav_label_font : p.title_font,
    subLines: p.sub_lines.length ? p.sub_lines : undefined,
    subLinesFont: p.sub_lines_font,
  });

  const navTree: MenuItem[] = [
    ...main.map(toItem),
    ...(motus.length
      ? [{ type: "category", id: "motus", label: "Motus" } as MenuItem]
      : []),
    ...motus.map(toItem),
    ...(lecture.length
      ? [
          {
            type: "category",
            id: "lecture-performance",
            label: "Lecture Performance / Panel",
          } as MenuItem,
        ]
      : []),
    ...lecture.map(toItem),
    ...(writing.length
      ? [
          {
            type: "category",
            id: "writing-publishing",
            label: "Writing / Publishing Practice",
          } as MenuItem,
        ]
      : []),
    ...writing.map(toItem),
    ...(archive.length
      ? [
          {
            type: "category",
            id: "archive",
            label: "Archive أرشيف",
          } as MenuItem,
        ]
      : []),
    ...archive.map(toItem),
    { type: "item", id: "about", label: "About | CV" },
  ];

  const projectIds = [
    ...main,
    ...motus,
    ...lecture,
    ...writing,
    ...archive,
  ].map((p) => p.id);

  return {
    entries,
    navTree,
    projectIds,
    lectureIds: lecture.map((p) => p.id),
    writingIds: writing.map((p) => p.id),
    archiveIds: archive.map((p) => p.id),
    activeMenuGroups: {
      motus: ["motus", ...motus.map((p) => p.id)],
      "lecture-performance": [
        "lecture-performance",
        ...lecture.map((p) => p.id),
      ],
      "writing-publishing": ["writing-publishing", ...writing.map((p) => p.id)],
    },
  };
}

const CV_EXTERNAL_LINKS = [
  [
    "Mophradat Consortium Commissions",
    "https://mophradat.org/en/program/consortium-commissions/2023-2025/",
  ],
  [
    "Mophradat consortium-commissions",
    "https://mophradat.org/en/program/consortium-commissions/2023-2025/",
  ],
  ["Live Works Summit", "https://www.centralefies.it/liveworks24/"],
  ["Live Works Fellow", "https://www.centralefies.it/liveworks24/"],
  [
    "Barbican Centre",
    "https://www.barbican.org.uk/whats-on/2025/event/feel-the-sound",
  ],
  [
    "TheMuseumsLab",
    "https://www.museumfuernaturkunde.berlin/en/about/the-museum/themuseumslab",
  ],
  ["Centrale Fies", "https://www.centralefies.it/"],
  ["Kaaitheater", "https://kaaitheater.be/"],
  ["Tanzfabrik", "https://www.tanzfabrik-berlin.de/"],
  ["Uferstudios", "https://www.uferstudios.com/"],
  ["Refo", "https://www.refo-moabit.de/"],
  ["Archive Books", "https://www.archivesites.org/"],
  ["Resonance Extra", "https://extra.resonance.fm/"],
  ["Book Works", "https://bookworks.org.uk/"],
  ["L'Art Rue", "https://lartrue.org/"],
  ["Theater Basel", "https://www.theater-basel.ch/"],
  ["silent green Kulturquartier", "https://www.silent-green.net/"],
  ["Bard College Berlin", "https://berlin.bard.edu/"],
  ["Damiani editore", "https://www.damianibooks.com/"],
  ["Camargo Foundation", "https://camargofoundation.org/"],
  ["Festspielhaus Hellerau", "https://www.hellerau.org/"],
  ["Black Box Teater", "https://blackbox.no/"],
  ["Exorma edizioni", "https://www.exormaedizioni.com/"],
  ["MAXXI Museo nazionale delle Arti", "https://www.maxxi.art/"],
  ["La Friche la Belle de Mai", "https://www.lafriche.org/"],
  ["NEXT Arts Festival", "https://nextfestival.eu/"],
  ["Spielart Festival", "https://www.spielart.org/"],
  ["Ateliersi", "https://www.ateliersi.it/"],
  ["Angelo Mai", "https://www.angelomai.org/"],
  ["S.a.L.E. Docks", "http://www.saledocks.org/"],
  ["Jaou encounters", "http://jaou.tn/"],
  ["Ibraaz", "https://www.ibraaz.org/"],
  ["KLF Foundation", "https://www.kamellazaarfoundation.org/"],
  ["DAAD", "https://www.daad.de/en/"],
  ["AFAC", "https://www.arabculturefund.org/"],
  ["Al Mawred Al Thaqafi Foundation", "https://mawred.org/"],
  ["Villa Romana", "https://www.villaromana.org/"],
  ["Ennejma Ezzahra Museum", "https://www.cmam.tn/content/en/4/Museum.html"],
  ["Santarcangelo", "https://www.santarcangelofestival.com/"],
] as const;

function CVLinkedText({ text }: { text: string }) {
  const ordered = [...CV_EXTERNAL_LINKS].sort(
    (a, b) => b[0].length - a[0].length,
  );
  const expression = new RegExp(
    `(${ordered.map(([label]) => label.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  const parts = text.split(expression);

  return (
    <>
      {parts.map((part, index) => {
        const link = ordered.find(([label]) => label === part);
        return link ? (
          <a
            key={`${part}-${index}`}
            href={link[1]}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent underline underline-offset-2 transition-colors"
          >
            {part}
          </a>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        );
      })}
    </>
  );
}

// An explicit link set on the row (via the admin) always wins over the
// automatic org-name matching below — it's a deliberate per-entry choice.
function CvLinkedSpan({ text, url }: { text: string; url?: string }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="hover:text-accent underline underline-offset-2 transition-colors"
      >
        {text}
      </a>
    );
  }
  return <CVLinkedText text={text} />;
}

// Rows added since the location/city/country fields shipped render as
// "text, location, city, country" with only the location clickable. Older
// rows have neither field set — everything lives in `text` as one
// free-text string (optionally linked as a whole via `url`), same as before.
function CvRowText({ row }: { row: CvRow }) {
  if (row.location) {
    return (
      <>
        {row.text}
        {row.text ? ", " : ""}
        <CvLinkedSpan text={row.location} url={row.url} />
        {row.city ? `, ${row.city}` : ""}
        {row.country ? `, ${row.country}` : ""}
      </>
    );
  }
  return <CvLinkedSpan text={row.text} url={row.url} />;
}

function CvCompactList({ rows }: { rows: CvRow[] }) {
  return (
    <ul className="cargo-cv-list mt-[0.45em]">
      {rows.map((row, i) => (
        <li key={`${row.year}-${i}`} className="flex whitespace-nowrap">
          <span className="cargo-cv-year">{row.year}</span>
          <span style={{ fontFamily: row.font }}>
            <CvRowText row={row} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function CvProjectList({ rows }: { rows: CvRow[] }) {
  return (
    <ul className="cargo-cv-project-list mt-[0.45em]">
      {rows.map((row, i) => (
        <li key={`${row.year}-${i}`} className="whitespace-nowrap">
          <span className="cargo-cv-year">{row.year}</span>
          <span style={{ fontFamily: row.font }}>
            <CvRowText row={row} />
          </span>
        </li>
      ))}
    </ul>
  );
}

// The article body is an admin-ordered sequence of rows (each 1-3 items:
// text, image, or video). For places that just need a single representative
// image (index grid, category summaries), prefer the first image actually
// placed in the article; fall back to the upload pool if the article has no
// images placed yet.
function thumbnailFor(entry: Entry): string | undefined {
  if (entry.thumbnail_url) return entry.thumbnail_url;
  const firstImage = flattenItems(entry.content).find(
    (i) => i.type === "image",
  );
  return (
    (firstImage?.type === "image" ? firstImage.src : undefined) ??
    entry.gallery[0]
  );
}

function firstTextFor(entry: Entry): string {
  const firstText = flattenItems(entry.content).find((i) => i.type === "text");
  return firstText?.type === "text" ? firstText.text : "";
}

function RowImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [ratio, setRatio] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    setRatio(null);
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth) {
      setRatio(el.naturalWidth / el.naturalHeight);
      setLoaded(true);
    }
  }, [src]);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.naturalWidth) setRatio(el.naturalWidth / el.naturalHeight);
    setLoaded(true);
  };

  return (
    // Real dimensions aren't known ahead of time, so the box starts
    // at a guessed 3:2 ratio and snaps to the real one (read off the loaded
    // img) in the same update that fades it in, before anything is visible
    // at the wrong shape. Fills whatever width its row/column gives it —
    // 100% of a full-width row is the same 1000px the old fixed cap gave.
    <span
      className="relative block h-full w-full"
      style={{ aspectRatio: ratio ?? 3 / 2 }}
    >
      {!loaded ? <Skeleton className="absolute inset-0" /> : null}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 1000px) 100vw, 1000px"
        className={`object-contain transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={handleLoad}
        onError={() => setLoaded(true)}
      />
    </span>
  );
}

/* Cargo header block: bold title then plain lines, no gaps (like <br>) */
function Head({ e }: { e: Entry }) {
  return (
    <div>
      <span
        className="font-bold"
        style={{ fontFamily: e.title_font ?? undefined }}
      >
        {e.title}
      </span>
      <br />
      {e.lines?.map((l) => (
        <span key={l} style={{ fontFamily: e.lines_font ?? undefined }}>
          {l}
          <br />
        </span>
      ))}
      {e.links?.length ? (
        <span style={{ fontFamily: e.links_font ?? undefined }}>
          {e.links.map((l, i) => (
            <span key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent hover:underline underline-offset-2 transition-colors"
              >
                {l.label}
              </a>
              {i < e.links!.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      ) : null}
    </div>
  );
}

// Vimeo/YouTube's own player letterboxes to the source video's real aspect
// ratio inside whatever frame we give it — a fixed 16:9 box makes a portrait
// or square video render small and centered, with dead grey space around it.
// Fetching the real width/height via oEmbed and sizing the frame to match
// fixes that; 16:9 stays the placeholder guess until it resolves.
function VideoEmbedFrame({
  embed,
  title,
}: {
  embed: VideoEmbed;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [ratio, setRatio] = useState<number | null>(null);
  const isAudio = embed.kind === "audio";

  useEffect(() => {
    if (!embed.oembedUrl) return;
    let cancelled = false;
    fetch(embed.oembedUrl)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.width && data?.height) {
          setRatio(data.width / data.height);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [embed.oembedUrl]);

  return (
    <span
      className={isAudio ? "cargo-audio-frame" : "cargo-video-frame"}
      style={!isAudio && ratio ? { aspectRatio: String(ratio) } : undefined}
    >
      {!loaded ? <Skeleton className="absolute inset-0" /> : null}
      <iframe
        src={embed.src}
        allow={
          isAudio ? "autoplay" : "autoplay; fullscreen; picture-in-picture"
        }
        title={`${title} — ${embed.label}`}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

// A PDF item is always just a link to somewhere the file is already hosted
// (Google Drive/Docs share link, etc.) — never a file we store ourselves —
// but it renders as an actual in-page, page-by-page reader (Drive's own
// /preview viewer for Drive/Docs links, the browser's native PDF viewer for
// a direct .pdf link), not just a link out to click away from the article.
function PdfEmbed({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  // Guards against already-saved bad data (e.g. a "file:///Users/…" path
  // pasted before this validation existed) — a link that can never open for
  // a visitor is worse than no link at all.
  if (!isWebLink(src)) return null;
  const label = pdfLabel(src);
  return (
    <div>
      <span className="cargo-pdf-frame">
        {!loaded ? <Skeleton className="absolute inset-0" /> : null}
        <iframe
          src={pdfEmbedSrc(src)}
          title={label}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </span>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="cargo-pdf-open-link mt-1.5 flex items-center gap-1.5 text-[12px] transition-colors hover:text-accent"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            d="M3.5 1.5h6L12.5 5v9a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M9.5 1.5V5h3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className="truncate underline-offset-2 hover:underline">
          {label} — open in new tab ↗
        </span>
      </a>
    </div>
  );
}

// One row of the article, laid out per its admin-chosen split (full width,
// half+half, 1/3+2/3, etc.) — text, image, video, and PDF items can sit in
// the same row, side by side.
function ContentRowView({ row, title }: { row: ContentRow; title: string }) {
  const fractions = ROW_LAYOUTS[row.layout]?.fractions ?? [1];
  return (
    <div
      className="cargo-content-row"
      style={{ gridTemplateColumns: fractions.map((f) => `${f}fr`).join(" ") }}
    >
      {row.items.map((item, i) => (
        <div key={i} className="cargo-content-cell">
          {item.type === "text" ? (
            <div
              className="cargo-rich-text"
              dangerouslySetInnerHTML={{ __html: sanitizeRichText(item.text) }}
            />
          ) : item.type === "image" ? (
            <RowImage src={item.src} alt={title} />
          ) : item.type === "video" ? (
            (() => {
              const embed = parseVideoEmbed(item.src);
              return embed ? (
                <VideoEmbedFrame embed={embed} title={title} />
              ) : null;
            })()
          ) : (
            <PdfEmbed src={item.src} />
          )}
        </div>
      ))}
    </div>
  );
}

function EntryPage({ e }: { e: Entry }) {
  return (
    <article>
      <Head e={e} />

      <div className="cargo-reading mt-[1.45em]">
        {e.content.map((row) => (
          <ContentRowView key={row.id} row={row} title={e.title} />
        ))}
      </div>

      {e.meta ? (
        <div
          className="cargo-rich-text mt-[1.45em]"
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(e.meta) }}
        />
      ) : null}
    </article>
  );
}

function ProjectsPage({
  data,
  onSelect,
}: {
  data: SiteData;
  onSelect: (id: string) => void;
}) {
  const [columns, setColumns] = useState<2 | 3>(3);

  useEffect(() => {
    const stored = localStorage.getItem("indexColumns");
    if (stored === "2" || stored === "3") setColumns(Number(stored) as 2 | 3);
  }, []);

  const changeColumns = (next: 2 | 3) => {
    setColumns(next);
    localStorage.setItem("indexColumns", String(next));
  };

  return (
    <article>
      <div className="flex items-start justify-end gap-4">
        <div
          className="flex shrink-0 gap-2 pt-px text-[11px]"
          aria-label="Grid columns"
        >
          <button
            type="button"
            onClick={() => changeColumns(2)}
            aria-current={columns === 2}
            aria-label="Show 2 columns"
            className={
              columns === 2
                ? "text-accent"
                : "hover:text-accent transition-colors"
            }
          >
            2
          </button>
          <button
            type="button"
            onClick={() => changeColumns(3)}
            aria-current={columns === 3}
            aria-label="Show 3 columns"
            className={
              columns === 3
                ? "text-accent"
                : "hover:text-accent transition-colors"
            }
          >
            3
          </button>
        </div>
      </div>

      <div
        className={`cargo-project-preview-grid mt-[1.45em] ${columns === 2 ? "cargo-project-preview-grid-2" : ""}`}
      >
        {data.projectIds.map((id) => {
          const entry = data.entries[id];
          const lead = thumbnailFor(entry);
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="cargo-project-preview text-left hover:text-accent transition-colors"
            >
              {lead ? (
                <ImageWithSkeleton
                  src={lead}
                  alt={entry.title}
                  wrapperClassName="cargo-project-preview-media"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                />
              ) : (
                <span
                  className="cargo-project-placeholder"
                  aria-hidden="true"
                />
              )}
              <span className="cargo-project-preview-title">{entry.title}</span>
              <small>{entry.lines?.[0] ?? ""}</small>
            </button>
          );
        })}
      </div>
    </article>
  );
}

function ProjectPager({
  data,
  current,
  onSelect,
}: {
  data: SiteData;
  current: string;
  onSelect: (id: string) => void;
}) {
  const index = data.projectIds.indexOf(current);
  if (index < 0) return null;

  const previous = index > 0 ? data.projectIds[index - 1] : null;
  const next =
    index < data.projectIds.length - 1 ? data.projectIds[index + 1] : null;

  return (
    <nav className="cargo-project-pager" aria-label="Previous and next project">
      <button
        onClick={() => previous && onSelect(previous)}
        disabled={!previous}
        className="cargo-project-pager-button"
      >
        ← Prev
      </button>
      <button
        onClick={() => next && onSelect(next)}
        disabled={!next}
        className="cargo-project-pager-button"
      >
        Next →
      </button>
    </nav>
  );
}

function MotusPage({
  data,
  onSelect,
}: {
  data: SiteData;
  onSelect: (id: string) => void;
}) {
  const caliban = data.entries["caliban"];
  const callMeX = data.entries["call-me-x"];

  return (
    <article>
      <div>
        <span className="font-bold">Motus</span>
        <br />
        2011 &gt; 2068 Animale Politico Project
        <br />
        with Enrico Casagrande and Daniela Nicolò
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        <p>
          The 2011 &gt; 2068 Animale Politico Project is an enlarged and
          visionary front of observation developed by Motus. Moving between
          utopias and dystopias, libertarian and catastrophic visions, it
          gathers performative actions, workshops, residencies, public
          conferences and urban interventions around encounters with
          extraordinary women, men and novels.
        </p>
        <p>
          Mohamed-Ali Ltaief collaborated with Motus across the project&apos;s
          research and performances, including Caliban Cannibal and Call Me X.
          These works move through temporary shelters, crossed languages,
          revolution, displacement, and the unstable architectures of an
          elsewhere.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {caliban ? (
          <>
            <button
              onClick={() => onSelect("caliban")}
              className="block w-fit text-left hover:text-accent transition-colors"
            >
              <span className="font-bold">Caliban Cannibal</span>
            </button>
            {thumbnailFor(caliban) ? (
              <RowImage
                src={thumbnailFor(caliban)!}
                alt="Caliban Cannibal, Motus"
              />
            ) : null}
          </>
        ) : null}

        {callMeX ? (
          <>
            <button
              onClick={() => onSelect("call-me-x")}
              className="block w-fit text-left hover:text-accent transition-colors"
            >
              <span className="font-bold">CALL ME X</span>
            </button>
            {thumbnailFor(callMeX) ? (
              <RowImage src={thumbnailFor(callMeX)!} alt="Call Me X, Motus" />
            ) : null}
          </>
        ) : null}
      </div>

      <p className="mt-[0.5em]">
        Production Motus 2011 &gt; 2068 AnimalePolitico Project. Within the
        Ateliers l&apos;Euroméditerranée Marseille Provence 2013.
      </p>
    </article>
  );
}

function LecturePerformancePage({
  data,
  onSelect,
}: {
  data: SiteData;
  onSelect: (id: string) => void;
}) {
  return (
    <article>
      <div>
        <span className="font-bold">Lecture Performance / Panel</span>
        <br />
        2012 — 2025
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        <p>
          These lecture performances, workshops, and panels gather the research
          threads running through the wider practice: early phonographic
          archives, anticolonial sound histories, translation, listening, and
          the transformation of archival material into situated performance.
        </p>
        <p>
          The works move between Tunis, Berlin, Venice, and institutional as
          well as self-organized spaces, bringing sound testimony, fragmented
          biography, reading, and dialogue into public relation.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {data.lectureIds.map((id) => {
          const entry = data.entries[id];
          const lead = thumbnailFor(entry);
          return (
            <section key={id}>
              <button
                onClick={() => onSelect(id)}
                className="block w-fit text-left hover:text-accent transition-colors"
              >
                <span className="font-bold">{entry.title}</span>
              </button>
              <p className="text-[13px] text-muted">
                {entry.lines?.filter(Boolean).join(" · ")}
              </p>
              {lead ? <RowImage src={lead} alt={entry.title} /> : null}
              <p className="mt-[0.5em]">{firstTextFor(entry)}</p>
            </section>
          );
        })}
      </div>
    </article>
  );
}

function WritingPublishingPage({
  data,
  onSelect,
}: {
  data: SiteData;
  onSelect: (id: string) => void;
}) {
  return (
    <article>
      <div>
        <span className="font-bold">Writing / Publishing Practice</span>
        <br />
        2017 — 2025
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        <p>
          This section gathers publications, writing, exhibition catalogues,
          archival narratives, and the radio work that extends the practice
          through listening. These projects move between performance
          documentation, research publishing, translated testimony, and sound
          transmission.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {data.writingIds.map((id) => {
          const entry = data.entries[id];
          const lead = thumbnailFor(entry);
          return (
            <section key={id}>
              <button
                onClick={() => onSelect(id)}
                className="block w-fit text-left hover:text-accent transition-colors"
              >
                <span className="font-bold">{entry.title}</span>
              </button>
              <p className="text-[13px] text-muted">
                {entry.lines?.filter(Boolean).join(" · ")}
              </p>
              {lead ? <RowImage src={lead} alt={entry.title} /> : null}
              <p className="mt-[0.5em]">{firstTextFor(entry)}</p>
            </section>
          );
        })}
      </div>
    </article>
  );
}

function ArchivePage({
  data,
  onSelect,
}: {
  data: SiteData;
  onSelect: (id: string) => void;
}) {
  return (
    <article>
      <div>
        <span className="font-bold">Archive أرشيف</span>
        <br />
        2012 — 2015
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        <p>
          Archive gathers projects that work through collective memory, public
          surfaces, cinema, documents, and the afterlives of political events.
          The works assemble visual traces from Tunisia and the wider
          Mediterranean into temporary forms of circulation.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {data.archiveIds.map((id) => {
          const entry = data.entries[id];
          const lead = thumbnailFor(entry);
          return (
            <section key={id}>
              <button
                onClick={() => onSelect(id)}
                className="block w-fit text-left hover:text-accent transition-colors"
              >
                <span className="font-bold">{entry.title}</span>
              </button>
              <p className="text-[13px] text-muted">
                {entry.lines?.filter(Boolean).join(" · ")}
              </p>
              {lead ? <RowImage src={lead} alt={entry.title} /> : null}
              <p className="mt-[0.5em]">{firstTextFor(entry)}</p>
            </section>
          );
        })}
      </div>
    </article>
  );
}

function AboutPage({ profile }: { profile: Profile }) {
  return (
    <article>
      <div>
        <span
          className="font-bold"
          style={{ fontFamily: profile.heading_fonts?.name }}
        >
          {profile.name}
        </span>
        <br />
        <span style={{ fontFamily: profile.heading_fonts?.tagline }}>
          {profile.tagline}
        </span>
        <br />
        {profile.bio_pdf_url ? (
          <a
            href={profile.bio_pdf_url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent hover:underline underline-offset-2 transition-colors"
          >
            biography PDF
          </a>
        ) : null}
        {profile.bio_pdf_url && profile.deutsch_url ? " — Auf " : null}
        {profile.deutsch_url ? (
          <a
            href={profile.deutsch_url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent hover:underline underline-offset-2 transition-colors"
          >
            Deutsch
          </a>
        ) : null}
      </div>

      {profile.works.length ? (
        <>
          <h2
            className="mt-[1.45em] text-[12px] leading-[1.45] font-normal"
            style={{ fontFamily: profile.heading_fonts?.works_title }}
          >
            {profile.works_title}
          </h2>
          <CvProjectList rows={profile.works} />
        </>
      ) : null}

      {profile.lectures.length ? (
        <>
          <h2
            className="mt-[1.45em] text-[12px] leading-[1.45] font-normal"
            style={{ fontFamily: profile.heading_fonts?.lectures_title }}
          >
            {profile.lectures_title}
          </h2>
          <CvCompactList rows={profile.lectures} />
        </>
      ) : null}

      {profile.awards.length ? (
        <>
          <h2
            className="mt-[1.45em] text-[12px] leading-[1.45] font-normal"
            style={{ fontFamily: profile.heading_fonts?.awards_title }}
          >
            {profile.awards_title}
          </h2>
          <CvCompactList rows={profile.awards} />
        </>
      ) : null}

      {profile.residencies.length ? (
        <>
          <h2
            className="mt-[1.45em] text-[12px] leading-[1.45] font-normal"
            style={{ fontFamily: profile.heading_fonts?.residencies_title }}
          >
            {profile.residencies_title}
          </h2>
          <CvCompactList rows={profile.residencies} />
        </>
      ) : null}
    </article>
  );
}

export function SiteClient({
  projects,
  profile,
}: {
  projects: Project[];
  profile: Profile | null;
}) {
  const data = useMemo(() => buildSiteData(projects), [projects]);
  const [sel, setSel] = useState("projects");
  const resolvedProfile = profile ?? EMPTY_PROFILE;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash &&
        (hash === "projects" ||
          hash === "about" ||
          hash === "motus" ||
          hash === "lecture-performance" ||
          hash === "writing-publishing" ||
          hash === "archive" ||
          data.entries[hash])
      ) {
        setSel(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [data]);

  const handleSelect = (id: string) => {
    setSel(id);
    window.location.hash = id;
    window.scrollTo(0, 0);
  };

  const entry = data.entries[sel];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <ThemeToggle className="text-ink hover:text-accent transition-colors" />
      <div className="mx-auto max-w-[1440px] px-5 py-6 sm:py-8 flex flex-col sm:flex-row gap-6 sm:gap-10">
        {/* Static Cargo index — permanently positioned on the right */}
        <aside
          aria-label="Project index"
          className="w-full sm:w-[300px] md:w-[320px] shrink-0 sm:order-2 sm:sticky sm:top-8 sm:self-start sm:max-h-[calc(100vh-4rem)] sm:overflow-y-auto text-[12px] leading-[1.5]"
        >
          <nav className="leading-[1.5]">
            <button
              onClick={() => handleSelect("projects")}
              className={`block w-full text-left transition-colors duration-150 ${
                sel === "projects" ? "text-red-600" : "hover:text-red-600"
              }`}
            >
              /ˈɪndɛks/
            </button>
            <div className="h-[1.35em]" aria-hidden="true" />
            {data.navTree.map((node, i) => {
              if (node.type === "category") {
                return node.id ? (
                  <button
                    key={`cat-${node.label}-${i}`}
                    onClick={() => handleSelect(node.id!)}
                    className={`block w-full text-left transition-colors duration-150 ${
                      node.id && data.activeMenuGroups[node.id]?.includes(sel)
                        ? "text-red-600"
                        : "hover:text-red-600"
                    }`}
                  >
                    {node.label}
                  </button>
                ) : (
                  <div key={`cat-${node.label}-${i}`} className="select-none">
                    {node.label}
                  </div>
                );
              }

              return (
                <button
                  key={`item-${node.id}`}
                  onClick={() => handleSelect(node.id)}
                  className={`block w-full text-left transition-colors duration-150 ${
                    node.id === "i-hear" || node.id === "path-sun"
                      ? "whitespace-nowrap"
                      : ""
                  } ${sel === node.id ? "text-red-600" : "hover:text-red-600"}`}
                >
                  <span style={{ fontFamily: node.labelFont ?? undefined }}>
                    {node.label}
                  </span>
                  {node.subLines?.map((line) => (
                    <span
                      key={line}
                      dir="rtl"
                      className="block whitespace-nowrap text-left"
                      style={{ fontFamily: node.subLinesFont ?? undefined }}
                    >
                      {line}
                    </span>
                  ))}
                </button>
              );
            })}

            <div className="mt-[1.35em]">
              <p>
                Email:{" "}
                <a
                  href="mailto:mdaliltf@gmail.com"
                  className="hover:text-accent hover:underline underline-offset-2 transition-colors"
                >
                  mdaliltf@gmail.com
                </a>
              </p>
              <p>2026 © Mohamed-Ali Ltaief</p>
            </div>
            {entry &&
            sel !== "projects" &&
            sel !== "motus" &&
            sel !== "lecture-performance" &&
            sel !== "writing-publishing" &&
            sel !== "archive" ? (
              <ProjectPager data={data} current={sel} onSelect={handleSelect} />
            ) : null}
          </nav>
        </aside>

        {/* Cargo project page */}
        <div className="flex-1 min-w-0 max-w-[1000px] pb-16 sm:order-1">
          {sel === "projects" ? (
            <ProjectsPage data={data} onSelect={handleSelect} />
          ) : sel === "motus" ? (
            <MotusPage data={data} onSelect={handleSelect} />
          ) : sel === "lecture-performance" ? (
            <LecturePerformancePage data={data} onSelect={handleSelect} />
          ) : sel === "writing-publishing" ? (
            <WritingPublishingPage data={data} onSelect={handleSelect} />
          ) : sel === "archive" ? (
            <ArchivePage data={data} onSelect={handleSelect} />
          ) : sel === "about" || !entry ? (
            <AboutPage profile={resolvedProfile} />
          ) : (
            <EntryPage e={entry} />
          )}
        </div>
      </div>
    </div>
  );
}
