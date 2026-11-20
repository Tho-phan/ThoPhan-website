// Production origin for absolute URLs (metadata base, sitemap, robots, OG image).
// Set NEXT_PUBLIC_SITE_URL in the environment (e.g. Vercel) to the real domain before launch.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
