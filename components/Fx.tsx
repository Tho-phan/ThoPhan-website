"use client";

import { useEffect, useRef } from "react";

// Fixed layout per particle so server and client render the same markup (no Math.random).
const particles = Array.from({ length: 12 }, (_, i) => ({
  "--x": `${(i * 53 + 7) % 96}%`,
  "--s": `${4 + (i % 3) * 3}px`,
  "--t": `${9 + (i % 5) * 2}s`,
  "--d": `${-(i * 1.7)}s`,
})) as React.CSSProperties[];

/* Renders the hero's ambient particles and wires the pointer effects that CSS cannot do alone:
   hero tilt (--px/--py), card spotlight (--mx/--my) and pausing the particles when the hero is offscreen. */
export default function Fx() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.parentElement;
    if (!el || !hero) return;

    const io = new IntersectionObserver(([e]) => { el.dataset.live = String(e.isIntersecting); });
    io.observe(hero);

    const fine = matchMedia("(pointer: fine)").matches;
    const move = (e: PointerEvent) => {
      const t = e.target as Element;
      const card = t.closest<HTMLElement>(".glow");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (hero.contains(t)) {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
        hero.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
      }
    };
    if (fine) document.addEventListener("pointermove", move, { passive: true });
    return () => { io.disconnect(); document.removeEventListener("pointermove", move); };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" data-live="true" className="fx pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((s, i) => <span key={i} className="fx-p" style={s} />)}
    </div>
  );
}
