import ChaptersLoader from "./ChaptersLoader";

/* Markup follows the skill's photo-chapters moment (public/assets/moments/photo-chapters).
   The moment moves these nodes at runtime, so this subtree must stay static (no state, no re-render).
   Plain <img> on purpose: the moment re-parents the figures. */
const chapters = [
  { city: "vn", src: "/photos/vn-bluehour.jpg", alt: "Ho Chi Minh City towers over the Saigon River at dusk", title: "Ho Chi Minh City, evening", text: "This is where I work. The team, the customers and most of the platform's traffic are here, and the day ends when the river turns blue." },
  { city: "us", src: "/photos/us-fall-park.jpg", alt: "A yellow arch bridge and autumn trees along the Pittsburgh riverbank", title: "Pittsburgh, autumn", text: "This is where I study. Duquesne sits on the bluff above the rivers, and the hills turn orange every October." },
  { city: "vn", src: "/photos/vn-saigon.jpg", alt: "Saigon high-rises lit at night and reflected in the river", title: "Saigon, after dark", text: "Saigon runs eleven or twelve hours ahead of Pittsburgh. The platform has to keep both clocks: two markets, two currencies, one codebase." },
  { city: "us", src: "/photos/us-fall-trail.jpg", alt: "A leaf-covered riverside path in Pittsburgh under yellow trees", title: "Pittsburgh, riverside", text: "Classes, tutoring and most of my side projects happen here, a short walk from the water." },
];

export default function CityChapters() {
  return (
    <section data-moment="photo-chapters" aria-labelledby="cities-h">
      <div className="mo-ph mx-auto max-w-5xl px-6 py-24">
        <div className="mo-ph__head">
          <h2 id="cities-h" className="text-3xl font-bold md:text-4xl">Two cities, one workday</h2>
          <p>I work from Ho Chi Minh City and study in Pittsburgh. Scroll, and the site follows.</p>
        </div>
        <ol className="mo-ph__list">
          {chapters.map((c) => (
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
