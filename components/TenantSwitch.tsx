"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { switchCity } from "@/lib/switch-city";

export default function TenantSwitch({ labels }: { labels: { group: string; vn: string; us: string } }) {
  const [tenant, setTenant] = useState<string>("vn");

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.tenant = tenant;
    // the scroll story also changes the theme, so follow the page
    const mo = new MutationObserver(() => setTenant(html.dataset.tenant ?? "vn"));
    mo.observe(html, { attributes: true, attributeFilter: ["data-tenant"] });
    return () => mo.disconnect();
  }, [tenant]);

  return (
    <div role="group" aria-label={labels.group} className="inline-flex rounded-full bg-mist/15 p-1 backdrop-blur">
      {(["vn", "us"] as const).map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={tenant === id}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            // flushSync so the pressed pill is already in the transition's "new" snapshot
            switchCity(id, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, () => flushSync(() => setTenant(id)));
          }}
          className="relative cursor-pointer rounded-full px-4 py-2 after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] font-[family-name:var(--font-display)] text-sm font-medium transition-colors aria-pressed:bg-sun aria-pressed:text-bark"
        >
          {labels[id]}
        </button>
      ))}
    </div>
  );
}
