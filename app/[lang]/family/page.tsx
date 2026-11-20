import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChapterPill from "@/components/ChapterPill";
import LangSwitch from "@/components/LangSwitch";
import { dictionaries, profile, type Dict } from "@/lib/dict";
import { photoSize, type CaptionId } from "@/lib/family";
import { hasLocale } from "@/lib/i18n";

// Latin + vietnamese: the Vietnamese title needs the diacritics.
const playfair = Playfair_Display({ variable: "--font-serif", subsets: ["latin", "vietnamese"] });
const display = "font-[family-name:var(--font-display)]";
const serif = playfair.variable;
// Positions in % of the hero; the centre photo (hero) sits over the headline, the rest scatter around it.
const collage = [
  { id: "mom-1", x: 6, y: 22, w: 13, z: 5 },
  { id: "grow-2", x: 74, y: 12, w: 9, z: 5 },
  { id: "dad-1", x: 74, y: 52, w: 16, z: 5 },
  { id: "leave-1", x: 11, y: 62, w: 12, z: 5 },
  { id: "sister-1", x: 3, y: 84, w: 7, z: 5 },
  { id: "brother-1", x: 86, y: 80, w: 8, z: 5 },
  { id: "hero", x: 37, y: 34, w: 26, z: 15 },
] as const;
// Chapter interlude: [0N], one centred serif line with its last word in italics, and photos floating past at different speeds.
const floats: Record<number, { id: string; x: number; y: number; w: number; s: number }[]> = {
  1: [{ id: "grow-1", x: 8, y: 14, w: 11, s: 1 }, { id: "leave-2", x: 80, y: 20, w: 9, s: -1 }, { id: "more-1", x: 14, y: 72, w: 8, s: -1.5 }, { id: "grow-5", x: 78, y: 70, w: 12, s: 1.5 }],
  2: [{ id: "mom-2", x: 6, y: 20, w: 10, s: 1.5 }, { id: "dad-2", x: 82, y: 12, w: 8, s: -1 }, { id: "sister-2", x: 12, y: 74, w: 9, s: -1 }, { id: "brother-2", x: 76, y: 66, w: 11, s: 1 }],
  3: [{ id: "grow-3", x: 7, y: 66, w: 12, s: 1 }, { id: "more-3", x: 80, y: 18, w: 10, s: -1.5 }, { id: "grow-6", x: 16, y: 12, w: 8, s: -1 }, { id: "leave-5", x: 74, y: 74, w: 9, s: 1.5 }],
  4: [{ id: "more-2", x: 8, y: 18, w: 10, s: 1 }, { id: "more-4", x: 80, y: 62, w: 12, s: -1 }, { id: "more-5", x: 72, y: 12, w: 8, s: 1.5 }, { id: "leave-3", x: 14, y: 74, w: 9, s: -1.5 }],
};
function Chapter({ n, title, lead }: { n: number; title: string; lead?: string }) {
  const words = title.split(" ");
  return (
    <section data-chapter data-label={title} className="relative flex min-h-[85svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {floats[n].map(({ id, x, y, w, s }) => (
        <div key={id} aria-hidden="true" className="float absolute hidden sm:block" style={{ left: `${x}%`, top: `${y}%`, width: `${w}vw`, "--s": s } as React.CSSProperties}>
          <Image src={`/photos/family/${id}.jpg`} alt="" width={480} height={480} sizes={`${w}vw`} className="h-auto w-full" />
        </div>
      ))}
      <span className="text-sm tracking-widest">[{String(n).padStart(2, "0")}]</span>
      <h2 style={{ fontFamily: "var(--font-serif), serif" }} className="mt-4 text-balance text-5xl leading-tight md:text-7xl">
        {words.slice(0, -1).join(" ")} <em>{words[words.length - 1]}</em>
      </h2>
      {lead && <p className="mt-4 max-w-md text-lg">{lead}</p>}
    </section>
  );
}

const people = [
  { key: "mom", ids: ["mom-1", "mom-2"] },
  { key: "dad", ids: ["dad-1", "dad-2"] },
  { key: "sister", ids: ["sister-1", "sister-2"] },
  { key: "brother", ids: ["brother-1", "brother-2"] },
] as const;
const growing: CaptionId[] = ["grow-1", "grow-2", "grow-3", "grow-4", "grow-5", "grow-6"];
const airports: CaptionId[] = ["leave-1", "leave-2", "leave-3", "leave-4", "leave-5"];
const more: CaptionId[] = ["more-1", "more-2", "more-3", "more-4", "more-5"];

export async function generateMetadata({ params }: PageProps<"/[lang]/family">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { title, description } = dictionaries[lang].family.meta;
  return { title, description, alternates: { languages: { en: "/en/family", vi: "/vi/family" } } };
}

// A photograph as a print. The caption describes it, so the image itself adds nothing for a screen reader.
function Print({ id, caps, i = 0, row = false, className = "" }: { id: CaptionId; caps: Dict["family"]["captions"]; i?: number; row?: boolean; className?: string }) {
  const [w, h] = photoSize[id];
  return (
    <figure
      className={`frame ${row ? "shrink-0 snap-center" : "reveal-card"} ${className}`}
      style={{ "--i": i % 3, maxWidth: row ? undefined : w } as React.CSSProperties}
    >
      <Image
        src={`/photos/family/${id}.jpg`}
        alt=""
        width={w}
        height={h}
        sizes={row ? "512px" : "(min-width: 1024px) 456px, (min-width: 768px) 45vw, 90vw"}
        className={row ? "h-72 w-auto max-w-none md:h-96" : "h-auto w-full"}
      />
      {/* In the row the photo sets the frame's width; w-0 + min-w-full lets the caption wrap instead of widening it. */}
      <figcaption className={row ? "w-0 min-w-full" : undefined}>{caps[id]}</figcaption>
    </figure>
  );
}

export default async function Family({ params }: PageProps<"/[lang]/family">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = dictionaries[lang];
  const f = d.family;

  return (
    <main className={`paper ${serif}`}>
      {/* Hero: a huge serif headline with photos collaged over the letters */}
      <section className="paper relative isolate min-h-svh overflow-hidden">
        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-6">
            <Link href={`/${lang}`} className={`${display} py-3 text-xl font-bold`}>{profile.name}</Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <LangSwitch lang={lang} label={d.nav.language} path="/family" />
              <Link href={`/${lang}`} className={`${display} py-3 text-sm font-medium underline decoration-1 underline-offset-4`}>{f.back}</Link>
            </div>
          </div>
        </header>
        <h1 style={{ fontFamily: "var(--font-serif), serif" }} className={`${serif} relative z-10 flex min-h-svh flex-col items-center justify-center text-center text-[clamp(5rem,24vw,19rem)] font-normal uppercase leading-[0.85] tracking-tight`}>
          {f.hero.title.split(" ").map((w, i) => (
            <span key={i} className={`word ${i % 2 ? "italic" : ""}`} style={{ "--i": i } as React.CSSProperties}>{w}</span>
          ))}
        </h1>
        {collage.map(({ id, x, y, w, z }, i) => (
          <div
            key={id}
            className={`collage absolute ${id === "hero" ? "" : "hidden sm:block"}`}
            style={{ left: `${x}%`, top: `${y}%`, width: `${w}vw`, zIndex: z, "--i": i } as React.CSSProperties}
          >
            <Image src={`/photos/family/${id}.jpg`} alt={id === "hero" ? f.hero.alt : ""} width={640} height={640} priority={id === "hero"} sizes={`${w}vw`} className="h-auto w-full" />
          </div>
        ))}
        <p className="hero-in absolute inset-x-6 bottom-8 z-20 mx-auto max-w-md text-center text-lg" style={{ "--d": "700ms" } as React.CSSProperties}>{f.hero.intro}</p>
      </section>

      {/* Roots: one chapter per person, hanging off a trunk that grows as you scroll */}
      <Chapter n={1} title={f.roots.title} lead={f.roots.lead} />
      <section className="relative mx-auto max-w-6xl space-y-28 px-6 pb-32 pt-16 md:space-y-40">
        <svg aria-hidden="true" viewBox="0 0 40 1000" preserveAspectRatio="none" className="absolute inset-y-0 left-10 h-full w-10 -translate-x-1/2 md:left-1/2" fill="none">
          <path d="M20 0 C 4 160, 36 330, 20 500 S 4 840, 20 1000" pathLength={1} className="trunk-line" stroke="var(--moss)" strokeWidth="6" strokeLinecap="round" />
        </svg>
        {people.map((p, n) => (
          <article key={p.key} className="relative grid items-center gap-8 pl-16 md:grid-cols-2 md:gap-24 md:pl-0">
            <span aria-hidden="true" className="absolute left-10 top-4 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-bark bg-sun md:left-1/2" />
            <h3 className={`${display} text-5xl font-extrabold md:text-7xl ${n % 2 ? "md:order-2" : "md:text-right"}`}>{f.people[p.key]}</h3>
            <div className={`space-y-10 ${n % 2 ? "md:order-1" : ""}`}>
              {p.ids.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i + n} className={i % 2 ? "md:ml-12" : "md:mr-12"} />)}
            </div>
          </article>
        ))}
      </section>

      {/* Growing up: prints on a dark table */}
      <Chapter n={2} title={f.growing.title} lead={f.growing.lead} />
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-14">
            {growing.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i} />)}
          </div>
        </div>
      </section>

      {/* Airports: a strip to scroll sideways */}
      <Chapter n={3} title={f.airports.title} lead={f.airports.lead} />
      <div role="region" aria-label={f.airports.scroller} tabIndex={0} className="flex snap-x gap-8 overflow-x-auto px-6 pb-12 pt-2 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        {airports.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i} row />)}
      </div>

      {/* Everything else */}
      <Chapter n={4} title={f.more.title} />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-8 [&>*]:break-inside-avoid">
          {more.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i} />)}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-32 text-center md:py-44">
          <p style={{ fontFamily: "var(--font-serif), serif" }} className="mx-auto max-w-3xl text-balance text-4xl md:text-6xl">{f.closing}</p>
          <Link href={`/${lang}`} className={`${display} mt-12 inline-block rounded-full bg-sun px-6 py-3 font-semibold text-bark`}>{f.back}</Link>
        </div>
      </section>
      <ChapterPill />
    </main>
  );
}
