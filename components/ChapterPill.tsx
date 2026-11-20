"use client";
import { useEffect, useState } from "react";

// Fixed "01 / 04 Roots" pill: shows the last [data-chapter] heading that has reached mid-screen. Decorative, so hidden from screen readers.
export default function ChapterPill() {
  const [cur, setCur] = useState<{ n: number; total: number; label: string } | null>(null);
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      const passed = els.filter((e) => e.getBoundingClientRect().top <= mid);
      const last = passed[passed.length - 1];
      setCur(last ? { n: els.indexOf(last) + 1, total: els.length, label: last.dataset.label ?? "" } : null);
    };
    const onScroll = () => { raf ||= requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" className={`pill ${cur ? "pill-on" : ""}`}>
      <span className="opacity-60">{String(cur?.n ?? 1).padStart(2, "0")} / {String(cur?.total ?? 0).padStart(2, "0")}</span>
      <span className="rounded-full bg-[#fbf8f1] px-4 py-2 uppercase tracking-wide">{cur?.label}</span>
    </div>
  );
}
