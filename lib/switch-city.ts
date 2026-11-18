let latest: ViewTransition | undefined;

// The new city grows out of `origin` (viewport px). Without View Transitions, or with reduced motion, it just switches.
// `sync` runs inside the transition callback so React state (e.g. the pressed pill) lands in the "new" snapshot.
export function switchCity(id: string, origin: { x: number; y: number }, sync?: () => void) {
  const html = document.documentElement;
  const apply = () => { sync?.(); html.dataset.tenant = id; };
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
  html.style.setProperty("--vt-x", `${origin.x}px`);
  html.style.setProperty("--vt-y", `${origin.y}px`);
  html.classList.add("vt");
  const vt = (latest = document.startViewTransition(apply));
  vt.ready.catch(() => {}); // skipped transitions (hidden tab, rapid second click) reject; the switch still applied
  // only the newest transition may drop the guard class
  vt.finished.catch(() => {}).finally(() => { if (latest === vt) html.classList.remove("vt"); });
}
