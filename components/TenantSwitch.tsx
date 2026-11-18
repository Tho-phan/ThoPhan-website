"use client";

import { useEffect, useState } from "react";

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
          onClick={() => setTenant(id)}
          className="cursor-pointer rounded-full px-4 py-2 font-[family-name:var(--font-display)] text-sm font-medium transition-colors aria-pressed:bg-sun aria-pressed:text-bark"
        >
          {labels[id]}
        </button>
      ))}
    </div>
  );
}
