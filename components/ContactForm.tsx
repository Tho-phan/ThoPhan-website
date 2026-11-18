"use client";

import { useState } from "react";

type Dict = { name: string; email: string; message: string; send: string; sending: string; ok: string; errors: Record<string, string> };

export default function ContactForm({ dict }: { dict: Dict }) {
  const [state, setState] = useState<{ kind: "idle" | "sending" | "ok" | "error"; msg?: string }>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(dict.errors[data.code] ?? dict.errors.generic);
      form.reset();
      setState({ kind: "ok" });
    } catch (err) {
      setState({ kind: "error", msg: err instanceof Error ? err.message : dict.errors.generic });
    }
  }

  const field = "mt-1 w-full rounded-lg border border-bark/30 bg-white px-4 py-3 text-base";

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <label className="block">
        {dict.name}
        <input name="name" required maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="block">
        {dict.email}
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </label>
      <label className="block">
        {dict.message}
        <textarea name="message" required minLength={10} maxLength={3000} rows={5} className={field} />
      </label>
      {/* Honeypot: hidden from people, bots fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <button
        disabled={state.kind === "sending"}
        className="cursor-pointer rounded-full bg-canopy px-6 py-3 font-[family-name:var(--font-display)] font-semibold text-mist transition-opacity disabled:opacity-60"
      >
        {state.kind === "sending" ? dict.sending : dict.send}
      </button>
      <p role="status" className="min-h-6">
        {state.kind === "ok" && dict.ok}
        {state.kind === "error" && <span className="text-accent">{state.msg}</span>}
      </p>
    </form>
  );
}
