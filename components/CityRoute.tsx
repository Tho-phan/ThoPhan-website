"use client";

import { useState, useSyncExternalStore } from "react";
import { switchCity } from "@/lib/switch-city";

/* The route between the two cities as a control: drag the packet (or tap the arc, or use the arrow keys)
   and the page follows. Crossing the middle switches city; the toggle and the scroll story move the packet back. */

type Dict = { aria: string; slider: string; from: string; to: string };

const W = 600;
const H = 130;
const P = [[40, 80], [180, -10], [420, -10], [560, 80]];
const D = "M 40 80 C 180 -10, 420 -10, 560 80";
const STEP = 0.1;

const at = (t: number) => {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((i) => k.reduce((s, w, j) => s + w * P[j][i], 0));
};
// x rises steadily along this arc, so bisect for the t whose x matches the pointer.
const toT = (x: number) => {
  let lo = 0, hi = 1;
  for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; if (at(m)[0] < x) lo = m; else hi = m; }
  return lo;
};

const zones = { vn: "Asia/Ho_Chi_Minh", us: "America/New_York" };
const clock = (tz: string, ms: number) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(ms);

// Both cities' local time, to the minute. The server snapshot is 0 so the first render matches the server's.
const subscribeMinute = (cb: () => void) => { const id = setInterval(cb, 15000); return () => clearInterval(id); };
const minute = () => Math.floor(Date.now() / 60000) * 60000;

const subscribeTenant = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tenant"] });
  return () => mo.disconnect();
};
const tenantNow = () => document.documentElement.dataset.tenant ?? "vn";

export default function CityRoute({ dict }: { dict: Dict }) {
  const [t, setT] = useState(0);
  const [drag, setDrag] = useState(false);
  const [used, setUsed] = useState(false);
  const now = useSyncExternalStore(subscribeMinute, minute, () => 0);
  const tenant = useSyncExternalStore(subscribeTenant, tenantNow, () => "vn");

  // The toggle and the scroll story also change the city: move the packet to match.
  if (!drag && (tenant === "us") !== (t >= 0.5)) setT(tenant === "us" ? 1 : 0);

  const go = (raw: number, origin: { x: number; y: number }) => {
    const next = Math.min(1, Math.max(0, raw));
    if ((t < 0.5) !== (next < 0.5)) switchCity(next < 0.5 ? "vn" : "us", origin);
    setT(next);
    setUsed(true);
  };
  const fromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    go(toT(((e.clientX - r.left) / r.width) * W), { x: e.clientX, y: e.clientY });
  };
  const fromKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const to: Record<string, number> = { ArrowRight: t + STEP, ArrowUp: t + STEP, ArrowLeft: t - STEP, ArrowDown: t - STEP, Home: 0, End: 1 };
    if (!(e.key in to)) return;
    e.preventDefault();
    const r = e.currentTarget.getBoundingClientRect();
    go(to[e.key], { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  const [x, y] = at(t);
  return (
    <figure className="max-w-xl" aria-label={dict.aria}>
      <div
        className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ aspectRatio: `${W} / ${H}` }}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDrag(true); fromPointer(e); }}
        onPointerMove={(e) => { if (drag) fromPointer(e); }}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <path d={D} stroke="var(--mist)" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
          {/* trail: the part of the route already travelled */}
          <path d={D} pathLength={1} className="trail" stroke="var(--sun)" strokeWidth="3" strokeDasharray="1" strokeDashoffset={1 - t} style={{ transition: drag ? "none" : undefined }} />
          <circle cx="40" cy="80" r="7" fill={t < 0.5 ? "var(--sun)" : "var(--mist)"} />
          <circle cx="560" cy="80" r="7" fill={t >= 0.5 ? "var(--sun)" : "var(--mist)"} />
        </svg>
        <div
          role="slider"
          tabIndex={0}
          aria-label={dict.slider}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(t * 100)}
          aria-valuetext={t < 0.5 ? dict.from : dict.to}
          onKeyDown={fromKey}
          className="packet absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-offset-0 focus-visible:outline-sun"
          style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, transition: drag ? "none" : undefined }}
        >
          {!used && <span aria-hidden="true" className="packet-ring absolute h-4 w-4 rounded-full border border-sun" />}
          <span aria-hidden="true" className={`block h-4 w-4 rounded-full border-2 border-mist bg-sun ${drag ? "scale-125" : ""} transition-transform`} />
        </div>
      </div>
      <figcaption className="flex justify-between font-[family-name:var(--font-display)] text-sm font-medium [text-shadow:0_1px_10px_rgba(15,11,8,0.7)]">
        <span>{dict.from}{now > 0 && <time className="ml-2 tabular-nums opacity-80">{clock(zones.vn, now)}</time>}</span>
        <span>{dict.to}{now > 0 && <time className="ml-2 tabular-nums opacity-80">{clock(zones.us, now)}</time>}</span>
      </figcaption>
    </figure>
  );
}
