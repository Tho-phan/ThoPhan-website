import CityRoute from "@/components/CityRoute";
import ContactForm from "@/components/ContactForm";
import JobQueue from "@/components/JobQueue";
import Polaroid from "@/components/Polaroid";
import TenantSwitch from "@/components/TenantSwitch";
import Trees from "@/components/Trees";
import { cases, jobs, profile, tutoring } from "@/lib/content";

const h2 = "text-3xl font-bold md:text-4xl";

export default function Home() {
  return (
    <main>
      {/* Canopy: what people see */}
      <section className="relative overflow-hidden">
        <Trees className="pointer-events-none absolute -right-10 top-8 hidden h-[620px] w-[360px] md:block lg:right-10" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 md:pt-24">
          <p className="mb-4 font-[family-name:var(--font-display)] text-lg">{profile.name}, {profile.role.toLowerCase()}</p>
          <h1 className="max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl md:text-6xl">{profile.headline}</h1>
          <p className="mt-6 max-w-xl text-xl">{profile.intro}</p>
          <div className="mt-8 space-y-6">
            <TenantSwitch />
            <CityRoute />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24" aria-label="Photos of the two cities">
        <div className="grid items-start gap-8 md:grid-cols-3">
          <Polaroid src="/photos/vn-bluehour.jpg" alt="Ho Chi Minh City skyline over the Saigon River at dusk" caption="Ho Chi Minh City, where I work" tilt={-3} />
          <Polaroid src="/photos/us-point.jpg" alt="Pittsburgh downtown towers behind the lawn at Point State Park" caption="Pittsburgh, where I study" tilt={2.5} className="md:mt-12" />
          <Polaroid src="/photos/vn-saigon.jpg" alt="Saigon high-rises lit up at night, reflected in the river" caption="Saigon after dark" tilt={-1.5} />
        </div>
      </section>

      {/* Experience */}
      <section className="relative mx-auto max-w-5xl px-6 pb-24">
        <Trees className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[250px] md:block" />
        <h2 className={h2}>Where I have worked</h2>
        <ul className="mt-10 space-y-8 border-l-2 border-moss/50 pl-6">
          {jobs.map((j) => (
            <li key={j.when + j.where}>
              <p className="font-[family-name:var(--font-display)] font-semibold">{j.where}</p>
              <p className="text-sm">{j.when}</p>
              <p className="mt-2 max-w-2xl">{j.what}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Trunk: the work itself */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className={h2}>Problems I solved</h2>
        <p className="mt-3 max-w-xl">The code is private, so these are told without names or numbers beyond what is already public.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title}>
              <h3 className="text-2xl font-bold">{c.title}</h3>
              <dl className="mt-4 space-y-3">
                <div><dt className="font-[family-name:var(--font-display)] font-semibold">The problem</dt><dd>{c.problem}</dd></div>
                <div><dt className="font-[family-name:var(--font-display)] font-semibold">What I did</dt><dd>{c.decision}</dd></div>
                <div><dt className="font-[family-name:var(--font-display)] font-semibold">What changed</dt><dd>{c.result}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Ground line: a row of trees standing on the soil */}
      <div aria-hidden="true" className="mx-auto flex max-w-6xl items-end justify-around px-4">
        {[90, 140, 105, 170, 100, 150, 95].map((w, i) => (
          <div key={i} style={{ width: w }} className={`shrink-0 ${i > 3 ? "hidden md:block" : ""}`}>
            <Trees className="aspect-[300/520] w-full" />
          </div>
        ))}
      </div>

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
        <div>
          <h2 className={h2}>Say hello</h2>
          <p className="mb-6 mt-4 max-w-md">I am open to software engineering, full-stack and backend roles.</p>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-bark/20 px-6 py-8 text-sm">
        <div className="mx-auto max-w-5xl">
          Photos from Wikimedia Commons: Saigon at Blue Hour by{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Saigon_at_Blue_Hour.jpg">Radek Kucharski</a> (CC BY 2.0); the Saigon night shot and the Pittsburgh skyline are CC0.
        </div>
      </footer>
    </main>
  );
}
