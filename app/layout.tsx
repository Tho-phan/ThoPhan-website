import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const body = Source_Serif_4({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tho Phan, full-stack engineer",
  description:
    "Full-stack engineer building multi-tenant commerce across Vietnam and the US. Flutter, React, TypeScript, Hono, PostgreSQL.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-tenant="vn" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
