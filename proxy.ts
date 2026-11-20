import { NextResponse, type NextRequest } from "next/server";

// "/" goes to /vi when the browser prefers Vietnamese, otherwise /en. Every page lives under /en or /vi.
export function proxy(request: NextRequest) {
  const prefers = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = prefers.startsWith("vi") ? "vi" : "en";
  const res = NextResponse.redirect(new URL(`/${lang}`, request.url));
  res.headers.set("Vary", "Accept-Language"); // the redirect target depends on this header, so caches must not reuse it across languages
  return res;
}

export const config = { matcher: ["/"] };
