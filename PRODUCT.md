# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, deployed on Vercel (free tier). One server route handles the contact form (Resend, needs `RESEND_API_KEY` and `CONTACT_TO`).

## Users

Mostly people who arrive from Tho Phan's CV or GitHub profile: recruiters, hiring managers and engineers. They come to find out who Tho is and what Tho can do. Which market they hire in (US, Vietnam or both) is not confirmed.

## Product Purpose

A personal portfolio site for Tho Phan, a junior full-stack software engineer, readable in English and Vietnamese (Tho's family reads it in Vietnamese). It exists so that someone who has just opened the CV or GitHub can quickly see who Tho is and what Tho can build. Success is a visitor leaving with a clear picture of Tho's skills and a way to get in touch.

## Positioning

A junior engineer with real production experience, not only coursework: a multi-tenant eSIM commerce platform serving Vietnam and the US. Tho lives and works between Ho Chi Minh City and Pittsburgh, and the site is built on that: one person, two cities.

## Operating Context

Visitors reach the site from a CV link or a GitHub profile and decide within seconds whether to read on. Most of the paid and professional work is private (employer code and internal data), so the site cannot show code or live links for it.

## Capabilities and Constraints

- Contact form works only once the Resend environment variables are set; until then it returns a clear "not set up" message.
- Only two names appear publicly: GoHub Inc. and Saola Labs (confirmed by Tho). Saola's client and product are not named on the site, even though the CV names them. Case studies stay generic: no code, URLs, client names or internal numbers.
- Two languages, English and Vietnamese, each on its own page (`/en`, `/vi`) with a visible switch, so Tho's parents can read it. `/` redirects by browser language. All copy lives in `lib/dict.ts` and any new text needs both languages.
- Dates on the CV (for example the end of the Saola Labs internship, April 2026) should be confirmed before launch.

## Brand Commitments

The name is Tho Phan, full-stack software engineer. The site's concept, "Two cities, one codebase" (Ho Chi Minh City and Pittsburgh), was chosen by Tho and is binding.

## Evidence on Hand

- CV text (provided in chat; no CV file in the repo yet).
- The CV also names Saola's client and its product; the site deliberately omits both.
- LinkedIn: https://www.linkedin.com/in/tho-phan-70258132a/
- Photographs of Ho Chi Minh City, Hoi An and Pittsburgh from Wikimedia Commons, credited in the site footer. They are stand-ins; Tho will supply personal photos later.
- Absent, and must not be invented: a GitHub profile URL (not yet given), public demos or repositories, a downloadable CV file, testimonials, and metrics beyond those on the CV.

## Product Principles

- Show what Tho can do, not only claim it. Where work is private, show the thinking instead of the code.
- Only real facts: nothing invented about employers, numbers, projects or reviews.
- Explain plainly what Tho is: a junior engineer with production experience.
- The two cities are the story. Keep the content true to both.
- Make the way to the CV, GitHub and contact obvious.
