// Flat route between the two cities with one data packet travelling along it.

export default function CityRoute() {
  return (
    <figure className="max-w-xl" aria-label="Data travelling between Ho Chi Minh City and Pittsburgh">
      <div className="relative" style={{ aspectRatio: "600 / 130" }}>
        <svg viewBox="0 0 600 130" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <path d="M 40 80 C 180 -10, 420 -10, 560 80" stroke="var(--canopy)" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
          <circle cx="40" cy="80" r="7" fill="var(--canopy)" />
          <circle cx="560" cy="80" r="7" fill="var(--accent)" />
        </svg>
        <span
          aria-hidden="true"
          className="packet absolute left-0 top-0 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun"
          style={{ boxShadow: "0 0 0 4px color-mix(in srgb, var(--sun) 35%, transparent)" }}
        />
      </div>
      <figcaption className="flex justify-between text-sm">
        <span>Ho Chi Minh City</span>
        <span>Pittsburgh</span>
      </figcaption>
    </figure>
  );
}
