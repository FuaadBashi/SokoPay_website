# SOKOPAY

[![CI](https://github.com/FuaadBashi/SokoPay_website/actions/workflows/ci.yml/badge.svg)](https://github.com/FuaadBashi/SokoPay_website/actions/workflows/ci.yml)

A front-end prototype for a cross-border payments product connecting East Africa and the Gulf,
built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Framer Motion. It includes a
marketing site, an account dashboard, and an animated four-step send-money flow.

**Live demo:** [fuaadbashi.github.io/SokoPay_website](https://fuaadbashi.github.io/SokoPay_website/). It's a static
build published to GitHub Pages on every push to `main`, and all its data is sample data.

<p align="center"><img src="docs/screenshot.png" alt="SOKOPAY landing page" width="760"></p>

## What's in it

| Route | What it shows |
| --- | --- |
| `/` | Landing page: live-rate send widget, animated corridor map, how it works, testimonials |
| `/products`, `/corridors`, `/pricing`, `/about` | Product, market-coverage, pricing and company pages |
| `/signup`, `/login` | Multi-step account creation (account type, details, verification, corridor) and sign-in |
| `/dashboard` | Balance, FX ticker, quick actions, recent and scheduled transfers, monthly chart |
| `/dashboard/send` | Recipient → amount → review → animated transfer with a receipt |

All data is mocked in the components; there is no backend. Dashboard sections outside the send
flow show a "not built yet" placeholder rather than a 404.

## Technical notes

- **App Router layouts.** A root layout provides metadata and fonts, and a nested dashboard
  layout adds the sidebar and page transitions around every dashboard route.
- **Self-hosted fonts.** Plus Jakarta Sans and DM Sans are loaded with `next/font`, exposed as CSS
  variables, and used through the `--font-display` and `--font-body` theme tokens.
- **Render purity.** Values that must stay stable, such as receipt numbers and confetti positions,
  are created in event handlers or derived deterministically, never with `Math.random()` during
  render. That avoids hydration mismatches and flicker.
- **Static output.** Every route, including the dashboard placeholders via `generateStaticParams`,
  is prerendered at build time.
- **CI.** ESLint (Next.js and React Hooks rules), a TypeScript check and a production build run on
  every push.

## Run locally

Requires Node.js 20+.

```bash
git clone https://github.com/FuaadBashi/SokoPay_website.git
cd SokoPay_website
npm ci
npm run dev        # http://localhost:3000
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run build`, `npm start`.

## Project structure

```
src/app/            routes, layouts and page-level components
src/app/dashboard/  dashboard layout, overview, send flow, placeholder sections
src/components/     landing-page sections, navbar, dashboard sidebar
```
