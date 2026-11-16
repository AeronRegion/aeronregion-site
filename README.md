# aeronregion.net

Static site built with [Astro](https://astro.build), hosted on Cloudflare Pages.
World downloads are served from Cloudflare R2 at `downloads.aeronregion.net`.

## Routine updates (no coding)

| Task | Edit this |
|---|---|
| Change server IP, socials, store links, trailer | `src/config/site.ts` |
| New experimental modpack | `src/config/site.ts` → `experimental.current` (move the old one into `history`) |
| Add a world download | Upload zip to R2, then add/edit an entry in `src/config/worlds.ts` and set `available: true` |
| Post news | Add a `.md` file to `src/content/news/` (copy `website-launch.md`) |

News post template (wrap text containing a colon in quotes):
```md
---
title: "Gym League Season 2"
date: 2026-12-01
summary: "Short one-line summary for the card."
tag: Event
image: /images/news/gym-s2.webp
---
Post body in markdown.
```
Put images in `public/images/` and reference them as `/images/...`.

## For the designer

- **Colors, fonts, radius, spacing:** `src/styles/tokens.css`. Change values there and the whole site follows.
- **Logo:** `src/components/Header.astro`, replace the `.brand-mark` span with an `<img>`. Favicon is `public/favicon.svg`.
- **Hero image:** `public/images/hero.webp`. Characters sit low in the frame, so the crop is anchored with `object-position: center 62%` in `src/pages/index.astro`.
- **Social preview image:** `public/images/og.jpg` (1200×630 ideal).
- Shared styles (buttons, cards, tags) are in `src/styles/global.css`. Each component keeps its own styles at the bottom of its file.

## Run locally

```
npm install
npm run dev
```
Open http://localhost:4321.

## Deploy

Cloudflare Pages → connect this GitHub repo:
- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` deploys automatically.
