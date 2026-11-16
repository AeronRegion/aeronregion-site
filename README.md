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

The look borrows from Minecraft's own UI: nametag plates (the title in the hero), bevelled block buttons, and the singleplayer world-select list on the Worlds page.

- **Colors, fonts, the "pixel" size:** `src/styles/tokens.css`. Change values there and the whole site follows.
- **Fonts:** Pixelify Sans (headings, buttons, labels) and Nunito (body), both bundled from npm (`@fontsource-variable/*`). To swap one, install the new package, import it in `src/styles/global.css`, and update `--font-pixel` / `--font-body`.
- **Shared pieces** (`.block` buttons, `.nametag`, `.pixel-corners`, `.band`) are in `src/styles/global.css`. Each component keeps its own styles at the bottom of its file.
- **Logo:** `src/components/Header.astro`. Swap the brand text for an `<img>`. Favicon is `public/favicon.svg`.
- **Hero image:** `public/images/hero.webp`, cropped with `object-position: center 65%` in `src/pages/index.astro`.
- **World icons:** set `image` on a world in `src/config/worlds.ts` (square crops look best).
- **Social preview image:** `public/images/og.jpg` (1200×630 ideal).

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
