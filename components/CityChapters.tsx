import ChaptersLoader from "./ChaptersLoader";

type Chapters = {
  title: string;
  lead: string;
  items: { city: string; src: string; alt: string; title: string; text: string }[];
};

/* Markup follows the skill's photo-chapters moment (public/assets/moments/photo-chapters).
   The moment moves these nodes at runtime, so this subtree must stay static (no state, no re-render).
   Plain <img> on purpose: the moment re-parents the figures. */
export default function CityChapters({ dict }: { dict: Chapters }) {
  return (
    <section data-moment="photo-chapters" aria-labelledby="cities-h">
      <div className="mo-ph mx-auto max-w-5xl px-6 py-24">
        <div className="mo-ph__head">
          <h2 id="cities-h" className="text-4xl font-bold md:text-5xl">{dict.title}</h2>
          <p>{dict.lead}</p>
        </div>
        <ol className="mo-ph__list">
          {dict.items.map((c) => (
            <li key={c.src} className="mo-ph__ch" data-city={c.city}>
              <figure className="mo-ph__pic">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.alt} width={1800} height={1200} loading="lazy" decoding="async" />
              </figure>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <ChaptersLoader />
    </section>
  );
}
