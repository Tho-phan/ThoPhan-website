"use client";

import { useEffect, useState } from "react";

const cities = [
  { id: "vn", label: "Ho Chi Minh City" },
  { id: "us", label: "Pittsburgh" },
] as const;

export default function TenantSwitch() {
  const [tenant, setTenant] = useState<string>("vn");

  useEffect(() => {
    document.documentElement.dataset.tenant = tenant;
  }, [tenant]);

  return (
    <div role="group" aria-label="Choose a city theme" className="inline-flex rounded-full bg-bark/10 p-1">
      {cities.map((c) => (
        <button
          key={c.id}
          type="button"
          aria-pressed={tenant === c.id}
          onClick={() => setTenant(c.id)}
          className="cursor-pointer rounded-full px-4 py-2 font-[family-name:var(--font-display)] text-sm font-medium transition-colors aria-pressed:bg-canopy aria-pressed:text-mist"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
