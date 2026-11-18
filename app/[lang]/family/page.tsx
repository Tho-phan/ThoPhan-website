import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Fx from "@/components/Fx";
import LangSwitch from "@/components/LangSwitch";
import { dictionaries, profile, type Dict } from "@/lib/dict";
import { photoSize, type CaptionId } from "@/lib/family";
import { hasLocale } from "@/lib/i18n";

const display = "font-[family-name:var(--font-display)]";
const h2 = "text-4xl font-bold md:text-5xl";
const tilts = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.4];

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
      style={{ "--i": i % 3, "--r": `${tilts[i % tilts.length]}deg`, maxWidth: row ? undefined : w } as React.CSSProperties}
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
    <main>
      {/* Hero: the whole family, and a thank-you */}
      <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-bark text-mist">
        <Image src="/photos/family/hero.jpg" alt={f.hero.alt} fill priority sizes="100vw" className="drift object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-bark/85 via-bark/35 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bark/80 to-transparent" />
        <Fx />
        <header className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-bark/55 to-transparent">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-6">
            <Link href={`/${lang}`} className={`${display} py-3 text-xl font-bold`}>{profile.name}</Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <LangSwitch lang={lang} label={d.nav.language} path="/family" />
              <Link href={`/${lang}`} className={`${display} py-3 text-sm font-medium underline decoration-1 underline-offset-4`}>{f.back}</Link>
            </div>
          </div>
        </header>
        <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-32 md:pb-24">
          <h1 className="text-6xl font-extrabold [text-shadow:0_2px_24px_rgba(15,11,8,0.55)] md:text-8xl">
            {f.hero.title.split(" ").map((w, i) => (
              <span key={i}><span className="word" style={{ "--i": i } as React.CSSProperties}>{w}</span>{" "}</span>
            ))}
          </h1>
          <p className="hero-in mt-6 max-w-xl text-xl [text-shadow:0_1px_14px_rgba(15,11,8,0.7)]" style={{ "--d": "600ms" } as React.CSSProperties}>{f.hero.intro}</p>
        </div>
      </section>

      {/* Roots: one chapter per person, hanging off a trunk that grows as you scroll */}
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <h2 className={h2}>{f.roots.title}</h2>
        <p className="mt-3 max-w-xl">{f.roots.lead}</p>
      </section>
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
      <section className="bg-bark text-mist">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className={h2}>{f.growing.title}</h2>
          <p className="mt-3 max-w-xl">{f.growing.lead}</p>
          <div className="mt-14 grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-14">
            {growing.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i} />)}
          </div>
        </div>
      </section>

      {/* Airports: a strip to scroll sideways */}
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <h2 className={h2}>{f.airports.title}</h2>
        <p className="mt-3 max-w-xl">{f.airports.lead}</p>
      </section>
      <div role="region" aria-label={f.airports.scroller} tabIndex={0} className="mt-12 flex snap-x gap-8 overflow-x-auto px-6 pb-12 pt-2 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        {airports.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i} row />)}
      </div>

      {/* Everything else */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <h2 className={h2}>{f.more.title}</h2>
        <div className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-8 [&>*]:break-inside-avoid">
          {more.map((id, i) => <Print key={id} id={id} caps={f.captions} i={i} />)}
        </div>
      </section>

      <section className="bg-bark text-mist">
        <div className="mx-auto max-w-5xl px-6 py-32 text-center md:py-44">
          <p className={`${display} mx-auto max-w-3xl text-balance text-4xl font-extrabold md:text-6xl`}>{f.closing}</p>
          <Link href={`/${lang}`} className={`${display} mt-12 inline-block rounded-full bg-sun px-6 py-3 font-semibold text-bark`}>{f.back}</Link>
        </div>
      </section>
    </main>
  );
}
