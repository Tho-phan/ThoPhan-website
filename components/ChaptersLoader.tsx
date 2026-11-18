"use client";

import { useEffect } from "react";

// Mounts the skill's moment loader, then ties the page theme to the chapter in view:
// each chapter carries data-city, and before the section starts the page is back in Ho Chi Minh City.
export default function ChaptersLoader() {
  useEffect(() => {
    const html = document.documentElement;
    const host = document.querySelector<HTMLElement>('[data-moment="photo-chapters"]');
    if (!host) return;

    const setCity = (c: string | undefined) => {
      if (c && html.dataset.tenant !== c) html.dataset.tenant = c;
    };
    const fromChapters = () => setCity(host.querySelector<HTMLElement>(".mo-ph__ch.is-on")?.dataset.city);

    const mo = new MutationObserver(fromChapters);
    mo.observe(host, { attributes: true, attributeFilter: ["class"], subtree: true });

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (host.getBoundingClientRect().top > innerHeight * 0.5) setCity("vn");
        else if (host.classList.contains("is-live")) fromChapters();
      });
    };
    addEventListener("scroll", onScroll, { passive: true });

    // shortcut: loads the kit as a plain file from /public; move it into the bundle if it grows beyond this one moment.
    const kit = "/assets/moments/moments.js";
    import(/* webpackIgnore: true */ kit).catch(() => {});

    return () => {
      mo.disconnect();
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
