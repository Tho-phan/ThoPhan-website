// Sends the contact form through Resend. Needs RESEND_API_KEY and CONTACT_TO in the environment.
// shortcut: no rate limit beyond the honeypot, add one (e.g. Vercel KV) if spam shows up.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

  const { name, email, message, website } = body as Record<string, unknown>;
  if (website) return Response.json({ ok: true }); // honeypot filled: pretend success

  if (
    typeof name !== "string" || name.trim().length < 1 || name.length > 100 ||
    typeof email !== "string" || !EMAIL.test(email) || email.length > 200 ||
    typeof message !== "string" || message.trim().length < 10 || message.length > 3000
  ) {
    return Response.json({ error: "Please fill in your name, a valid email and a message of at least 10 characters." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return Response.json({ error: "The contact form is not set up yet. Please email directly." }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `Portfolio message from ${name.replace(/[\r\n]/g, " ").slice(0, 100)}`,
      text: message,
    }),
  });
  if (!res.ok) return Response.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  return Response.json({ ok: true });
}
