// Flat route between the two cities with one data packet travelling along it.

export default function CityRoute({ dict }: { dict: { aria: string; from: string; to: string } }) {
  return (
    <figure className="max-w-xl" aria-label={dict.aria}>
      <div className="relative" style={{ aspectRatio: "600 / 130" }}>
        <svg viewBox="0 0 600 130" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <path d="M 40 80 C 180 -10, 420 -10, 560 80" stroke="var(--mist)" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
          <circle cx="40" cy="80" r="7" fill="var(--mist)" />
          <circle cx="560" cy="80" r="7" fill="var(--sun)" />
        </svg>
        <span
          aria-hidden="true"
          className="packet absolute left-0 top-0 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mist bg-sun"
        />
      </div>
      <figcaption className="flex justify-between font-[family-name:var(--font-display)] text-sm font-medium">
        <span>{dict.from}</span>
        <span>{dict.to}</span>
      </figcaption>
    </figure>
  );
}
