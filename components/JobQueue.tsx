"use client";

import { useEffect, useRef, useState } from "react";

type Status = "queued" | "active" | "failed" | "replayed" | "done";
type Job = { id: number; status: Status };

// Illustration of a job lifecycle (queue, run, fail, replay, finish). Not live data.
function step(j: Job): Job {
  switch (j.status) {
    case "queued": return { ...j, status: "active" };
    case "active": return { ...j, status: j.id % 4 === 0 ? "failed" : "done" };
    case "failed": return { ...j, status: "replayed" };
    case "replayed": return { ...j, status: "done" };
    default: return j;
  }
}

export default function JobQueue({ dict }: { dict: { aria: string; job: string; status: Record<Status, string> } }) {
  const [jobs, setJobs] = useState<Job[]>(() => [3, 2, 1].map((id) => ({ id, status: "done" as Status })));
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    // Decorative loop: don't churn the DOM when it's off-screen or when the visitor asked for reduced motion.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tick = () =>
      setJobs((prev) => {
        const next = prev.map(step);
        const id = (prev[0]?.id ?? 0) + 1;
        return [{ id, status: "queued" as Status }, ...next].slice(0, 7);
      });
    let t: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t);
      if (e.isIntersecting) t = setInterval(tick, 1300);
    });
    if (ref.current) io.observe(ref.current);
    return () => { clearInterval(t); io.disconnect(); };
  }, []);

  return (
    <ol ref={ref} className="space-y-2" aria-label={dict.aria} aria-live="off">
      {jobs.map((j) => (
        <li key={j.id} className="flex items-center justify-between rounded-lg bg-mist/10 px-4 py-2 font-[family-name:var(--font-display)] text-sm">
          <span>{dict.job} {j.id}</span>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
              j.status === "failed" ? "bg-accent text-mist" : j.status === "done" ? "bg-canopy text-mist" : "bg-sun text-bark"
            }`}
          >
            {dict.status[j.status]}
          </span>
        </li>
      ))}
    </ol>
  );
}
