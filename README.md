# SokoPay — Payments Website and Dashboard Prototype

A Next.js/React frontend for a payments product concept, with marketing pages, a dashboard, and an animated multi-step transfer demonstration.

## Run locally

Use Node.js 22 LTS and npm.

```bash
git clone https://github.com/FuaadBashi/SokoPay_website.git
cd SokoPay_website
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Other available commands are `npm run lint`, `npm run build`, and `npm start` (after a build).

## Explore the demo

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/products`, `/pricing`, `/corridors` | Product and market pages |
| `/dashboard` | Dashboard concept |
| `/dashboard/send` | Recipient, amount, review, and transfer animation |
| `/login`, `/signup` | Account UI pages |

## Implementation

- [src/app](src/app): App Router pages and layouts.
- [src/components](src/components): reusable marketing and dashboard components.
- [package.json](package.json): Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Lucide.

## Demo boundary

The send flow uses hard-coded recipients and exchange rates, with a timer to simulate transfer progress. It does not move money or verify identity. Account screens and product copy should be reviewed as frontend demonstrations, not evidence of an operational payment service.
