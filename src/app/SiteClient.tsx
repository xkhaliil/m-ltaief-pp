"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/types/project";
import type { CvRow, Profile } from "@/types/profile";
import { EMPTY_PROFILE } from "@/types/profile";

type Entry = Project;

type MenuItem =
  | { type: "item"; id: string; label: string; subLines?: string[] }
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
  for (const p of projects) entries[p.id] = p;

  const toItem = (p: Project): MenuItem => ({
    type: "item",
    id: p.id,
    label: p.nav_label ?? p.title,
    subLines: p.sub_lines.length ? p.sub_lines : undefined,
  });

  const navTree: MenuItem[] = [
    ...main.map(toItem),
    ...(motus.length ? [{ type: "category", id: "motus", label: "Motus" } as MenuItem] : []),
    ...motus.map(toItem),
    ...(lecture.length
      ? [{ type: "category", id: "lecture-performance", label: "Lecture Performance / Panel" } as MenuItem]
      : []),
    ...lecture.map(toItem),
    ...(writing.length
      ? [{ type: "category", id: "writing-publishing", label: "Writing / Publishing Practice" } as MenuItem]
      : []),
    ...writing.map(toItem),
    ...(archive.length ? [{ type: "category", id: "archive", label: "Archive أرشيف" } as MenuItem] : []),
    ...archive.map(toItem),
    { type: "item", id: "about", label: "About | CV" },
  ];

  const projectIds = [...main, ...motus, ...lecture, ...writing, ...archive].map((p) => p.id);

  return {
    entries,
    navTree,
    projectIds,
    lectureIds: lecture.map((p) => p.id),
    writingIds: writing.map((p) => p.id),
    archiveIds: archive.map((p) => p.id),
    activeMenuGroups: {
      motus: ["motus", ...motus.map((p) => p.id)],
      "lecture-performance": ["lecture-performance", ...lecture.map((p) => p.id)],
      "writing-publishing": ["writing-publishing", ...writing.map((p) => p.id)],
    },
  };
}

const CV_EXTERNAL_LINKS = [
  ["Mophradat Consortium Commissions", "https://mophradat.org/en/program/consortium-commissions/2023-2025/"],
  ["Mophradat consortium-commissions", "https://mophradat.org/en/program/consortium-commissions/2023-2025/"],
  ["Live Works Summit", "https://www.centralefies.it/liveworks24/"],
  ["Live Works Fellow", "https://www.centralefies.it/liveworks24/"],
  ["Barbican Centre", "https://www.barbican.org.uk/whats-on/2025/event/feel-the-sound"],
  ["TheMuseumsLab", "https://www.museumfuernaturkunde.berlin/en/about/the-museum/themuseumslab"],
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
  const ordered = [...CV_EXTERNAL_LINKS].sort((a, b) => b[0].length - a[0].length);
  const expression = new RegExp(`(${ordered.map(([label]) => label.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")).join("|")})`, "g");
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

function CvCompactList({ rows }: { rows: CvRow[] }) {
  return (
    <ul className="cargo-cv-list mt-[0.45em]">
      {rows.map((row, i) => (
        <li key={`${row.year}-${i}`} className="flex whitespace-nowrap">
          <span className="cargo-cv-year">{row.year}</span>
          <span><CVLinkedText text={row.text} /></span>
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
          <span><CVLinkedText text={row.text} /></span>
        </li>
      ))}
    </ul>
  );
}

function galleryFor(entry: Entry): string[] {
  return entry.gallery ?? [];
}

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="cargo-media" />
      <br />
    </>
  );
}

/* Cargo header block: bold title then plain lines, no gaps (like <br>) */
function Head({ e }: { e: Entry }) {
  return (
    <div>
      <span className="font-bold">{e.title}</span>
      <br />
      {e.lines?.map((l) => (
        <span key={l}>
          {l}
          <br />
        </span>
      ))}
      {e.links?.length ? (
        <span>
          {e.links.map((l, i) => (
            <span key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline underline-offset-2"
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

function EntryPage({ e }: { e: Entry }) {
  const pics = galleryFor(e);

  if (e.id === "i-hear") {
    const [lead, ...gallery] = pics;
    const films = e.videos ?? [];

    return (
      <article>
        <Head e={e} />

        {lead ? (
          <div className="mt-[1.45em]">
            <Img src={lead} alt={e.title} />
          </div>
        ) : null}

        <div className="cargo-reading mt-[1.45em] space-y-[1.45em]">
          {e.paragraphs.map((p, i) => (
            <p key={i} className={i === 3 ? "whitespace-pre-line" : undefined}>
              {p}
            </p>
          ))}
        </div>

        {gallery.length ? (
          <div className="cargo-gallery mt-[1.45em]">
            {gallery.map((src) => (
              <Img key={src} src={src} alt={e.title} />
            ))}
          </div>
        ) : null}

        {films.length ? (
          <div className="cargo-video-grid">
            {films.map((id) => (
              <iframe
                key={id}
                src={`https://player.vimeo.com/video/${id}?color=ff50ff&title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                title={`I Hear The Old Sound of the World's Future — ${id}`}
              />
            ))}
          </div>
        ) : null}

        {e.meta ? <p className="mt-[1.45em]">{e.meta}</p> : null}
      </article>
    );
  }

  return (
    <article>
      <Head e={e} />

      {pics.length ? (
        <div className="mt-[1.45em]">
          <Img src={pics[0]} alt={e.title} />
        </div>
      ) : null}

      <div className="cargo-reading mt-[1.45em] space-y-[1.45em]">
        {e.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {pics.length > 1 ? (
        <div className="mt-[1.45em]">
          {pics.slice(1).map((src) => (
            <Img key={src} src={src} alt={e.title} />
          ))}
        </div>
      ) : null}

      {e.meta ? <p className="mt-[0.5em]">{e.meta}</p> : null}
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
  return (
    <article>
      <div>
        <span className="font-bold">/ˈɪndɛks/</span>
        <br />
        Selected works, 2011 — 2026
      </div>

      <div className="cargo-project-preview-grid mt-[1.45em]">
        {data.projectIds.map((id) => {
          const entry = data.entries[id];
          const lead = galleryFor(entry)[0];
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="cargo-project-preview text-left hover:text-accent transition-colors"
            >
              {lead ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={lead} alt={entry.title} loading="lazy" />
              ) : (
                <span className="cargo-project-placeholder" aria-hidden="true" />
              )}
              <span>{entry.title}</span>
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
  const next = index < data.projectIds.length - 1 ? data.projectIds[index + 1] : null;

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
          The 2011 &gt; 2068 Animale Politico Project is an enlarged and visionary front of observation developed by Motus. Moving between utopias and dystopias, libertarian and catastrophic visions, it gathers performative actions, workshops, residencies, public conferences and urban interventions around encounters with extraordinary women, men and novels.
        </p>
        <p>
          Mohamed-Ali Ltaief collaborated with Motus across the project&apos;s research and performances, including Caliban Cannibal and Call Me X. These works move through temporary shelters, crossed languages, revolution, displacement, and the unstable architectures of an elsewhere.
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
            {galleryFor(caliban)[0] ? (
              <Img src={galleryFor(caliban)[0]} alt="Caliban Cannibal, Motus" />
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
            {galleryFor(callMeX)[0] ? (
              <Img src={galleryFor(callMeX)[0]} alt="Call Me X, Motus" />
            ) : null}
          </>
        ) : null}
      </div>

      <p className="mt-[0.5em]">
        Production Motus 2011 &gt; 2068 AnimalePolitico Project. Within the Ateliers l&apos;Euroméditerranée Marseille Provence 2013.
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
          These lecture performances, workshops, and panels gather the research threads running through the wider practice: early phonographic archives, anticolonial sound histories, translation, listening, and the transformation of archival material into situated performance.
        </p>
        <p>
          The works move between Tunis, Berlin, Venice, and institutional as well as self-organized spaces, bringing sound testimony, fragmented biography, reading, and dialogue into public relation.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {data.lectureIds.map((id) => {
          const entry = data.entries[id];
          const lead = galleryFor(entry)[0];
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
              {lead ? <Img src={lead} alt={entry.title} /> : null}
              <p className="mt-[0.5em]">{entry.paragraphs[0]}</p>
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
          This section gathers publications, writing, exhibition catalogues, archival narratives, and the radio work that extends the practice through listening. These projects move between performance documentation, research publishing, translated testimony, and sound transmission.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {data.writingIds.map((id) => {
          const entry = data.entries[id];
          const lead = galleryFor(entry)[0];
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
              {lead ? <Img src={lead} alt={entry.title} /> : null}
              <p className="mt-[0.5em]">{entry.paragraphs[0]}</p>
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
          Archive gathers projects that work through collective memory, public surfaces, cinema, documents, and the afterlives of political events. The works assemble visual traces from Tunisia and the wider Mediterranean into temporary forms of circulation.
        </p>
      </div>

      <div className="mt-[1.45em] space-y-[1.45em]">
        {data.archiveIds.map((id) => {
          const entry = data.entries[id];
          const lead = galleryFor(entry)[0];
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
              {lead ? <Img src={lead} alt={entry.title} /> : null}
              <p className="mt-[0.5em]">{entry.paragraphs[0]}</p>
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
        <span className="font-bold">{profile.name}</span>
        <br />
        {profile.tagline}
        <br />
        {profile.email ? (
          <>
            email: {profile.email}
            <br />
          </>
        ) : null}
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
          <h2 className="mt-[1.45em] text-[11px] leading-[1.45] font-normal">selected performance / theater &amp; project(s)</h2>
          <CvProjectList rows={profile.works} />
        </>
      ) : null}

      {profile.lectures.length ? (
        <>
          <h2 className="mt-[1.45em] text-[11px] leading-[1.45] font-normal">selected lecture performances</h2>
          <CvCompactList rows={profile.lectures} />
        </>
      ) : null}

      {profile.awards.length ? (
        <>
          <h2 className="mt-[1.45em] text-[11px] leading-[1.45] font-normal">Awards and Grants</h2>
          <CvCompactList rows={profile.awards} />
        </>
      ) : null}

      {profile.residencies.length ? (
        <>
          <h2 className="mt-[1.45em] text-[11px] leading-[1.45] font-normal">Fellowships / Residencies</h2>
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
                sel === "projects" ? "text-accent" : "hover:text-accent"
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
                        ? "text-accent"
                        : "hover:text-accent"
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
                    node.id === "i-hear" || node.id === "path-sun" ? "whitespace-nowrap" : ""
                  } ${sel === node.id ? "text-accent" : "hover:text-accent"}`}
                >
                  {node.label}
                  {node.subLines?.map((line) => (
                    <span key={line} dir="rtl" className="block whitespace-nowrap text-left">
                      {line}
                    </span>
                  ))}
                </button>
              );
            })}

            <div className="mt-[1.35em]">
              <a href="mailto:mdaliltf@gmail.com" className="hover:text-accent transition-colors block">
                email: mdaliltf@gmail.com
              </a>
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
