import Image from "next/image";
import CityRoute from "@/components/CityRoute";
import ContactForm from "@/components/ContactForm";
import JobQueue from "@/components/JobQueue";
import CityChapters from "@/components/CityChapters";
import TenantSwitch from "@/components/TenantSwitch";
import Trees from "@/components/Trees";
import { cases, jobs, profile, tutoring } from "@/lib/content";

const h2 = "text-4xl font-bold md:text-5xl";


export default function Home() {
  return (
    <main>
      {/* Canopy: what people see */}
      <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-bark text-mist">
        <Image src="/photos/hero-vn.jpg" alt="Boats with glowing lanterns on the river at night in Hoi An" fill priority sizes="100vw" className="hero-photo hero-vn object-cover" />
        <Image src="/photos/hero-us.jpg" alt="Downtown Pittsburgh and its yellow bridges at golden hour, seen from Mount Washington" fill priority sizes="100vw" className="hero-photo hero-us object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-bark/80 via-bark/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bark/70 to-transparent" />
        <header className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
            <span className="font-[family-name:var(--font-display)] text-xl font-bold">{profile.name}</span>
            <nav aria-label="Contact" className="flex gap-6 font-[family-name:var(--font-display)] text-sm font-medium">
              <a className="underline decoration-1 underline-offset-4" href={profile.linkedin}>LinkedIn</a>
              <a className="underline decoration-1 underline-offset-4" href="#contact">Contact</a>
            </nav>
          </div>
        </header>
        <Trees silhouette className="pointer-events-none absolute bottom-0 right-4 hidden aspect-[300/520] h-[84%] md:block" />
        <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-32 md:pb-24">
          <h1 className="max-w-3xl text-balance text-5xl font-extrabold sm:text-6xl md:text-7xl"><span className="sr-only">{profile.name}, {profile.role}. </span>{profile.headline}</h1>
          <p className="mt-6 max-w-xl text-xl text-mist [text-shadow:0_1px_14px_rgba(15,11,8,0.7)]">{profile.intro}</p>
          <div className="mt-10 space-y-6">
            <TenantSwitch />
            <CityRoute />
          </div>
        </div>
      </section>

      <CityChapters />

      {/* Experience */}
      <section className="relative mx-auto max-w-5xl px-6 pb-24">
        <h2 className={h2}>Where I have worked</h2>
        <ul className="mt-12 space-y-10">
          {jobs.map((j) => (
            <li key={j.when + j.where} className="grid gap-2 border-t border-bark/20 pt-5 md:grid-cols-[13rem_1fr] md:gap-8">
              <div>
                <p className="font-[family-name:var(--font-display)] font-semibold">{j.where}</p>
                <p className="text-sm">{j.when}</p>
              </div>
              <p className="max-w-xl">{j.what}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Trunk: the work itself */}
      <section className="bg-surface pt-24">
       <div className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className={h2}>Problems I solved</h2>
        <p className="mt-3 max-w-xl">The code is private, so these are told without names or numbers beyond what is already public.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title} className="border-t-4 border-accent pt-5">
              <h3 className="text-2xl font-bold">{c.title}</h3>
              <dl className="mt-4 space-y-3">
                <div><dt className="font-[family-name:var(--font-display)] font-semibold">The problem</dt><dd>{c.problem}</dd></div>
                <div><dt className="font-[family-name:var(--font-display)] font-semibold">What I did</dt><dd>{c.decision}</dd></div>
                <div><dt className="font-[family-name:var(--font-display)] font-semibold">What changed</dt><dd>{c.result}</dd></div>
              </dl>
            </article>
          ))}
        </div>
       </div>
      </section>

      {/* Ground line: a row of trees standing on the soil */}
      <div aria-hidden="true" className="bg-surface"><div className="mx-auto flex max-w-6xl items-end justify-around px-4">
        {[90, 140, 105, 170, 100, 150, 95].map((w, i) => (
          <div key={i} style={{ width: w }} className={`shrink-0 ${i > 2 ? "hidden md:block" : ""}`}>
            <Trees className="aspect-[300/520] w-full" />
          </div>
        ))}
      </div></div>

      {/* Roots: under the hood */}
      <section className="relative overflow-hidden bg-bark text-mist">
        <svg aria-hidden="true" viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-48 w-full" fill="none">
          {["M500 0 C500 80 300 90 180 190 S60 290 20 300", "M500 0 C500 90 700 100 820 200 S940 280 980 300", "M500 0 C490 100 520 190 470 300", "M500 40 C420 70 380 130 300 160"].map((d) => (
            <path key={d} d={d} pathLength={1} className="root-line" stroke="var(--moss)" strokeWidth="6" strokeLinecap="round" />
          ))}
        </svg>
        <div className="relative mx-auto grid max-w-5xl gap-10 px-6 pb-24 pt-44 md:grid-cols-2">
          <div>
            <h2 className={h2}>Under the hood</h2>
            <p className="mt-4 max-w-md">
              Most of my work happens below the surface: queues, retries and replays that keep a sync honest. This is a small picture of that job lifecycle.
            </p>
          </div>
          <JobQueue />
        </div>
      </section>

      {/* People and contact */}
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className={h2}>Beyond code</h2>
          <p className="mt-4 max-w-md">{tutoring}</p>
          <p className="mt-4 max-w-md">{profile.school}.</p>
          <p className="mt-4">
            <a className="underline decoration-2 underline-offset-4" href={profile.linkedin}>LinkedIn</a>
            {" or "}
            <a className="underline decoration-2 underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
        <div id="contact" className="scroll-mt-8">
          <h2 className={h2}>Say hello</h2>
          <p className="mb-6 mt-4 max-w-md">I am open to software engineering, full-stack and backend roles.</p>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-bark/20 px-6 py-8 text-sm">
        <div className="mx-auto max-w-5xl">
          Photos from Wikimedia Commons:{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Saigon_at_Blue_Hour.jpg">Radek Kucharski</a> (CC BY 2.0),{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Pittsburgh_Skyline.JPG">Robpinion</a> (CC BY-SA 3.0),{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Point_State_Park_in_Fall.jpg">John</a> (CC BY-SA 2.0),{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Through_Riverfront_Trail_in_fall_foliage_(30346899375).jpg">daveynin</a> (CC BY 2.0), and CC0 views of Hoi An and Saigon.
        </div>
      </footer>
    </main>
  );
}
