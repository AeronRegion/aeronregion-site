# aeronregion.net

Community website for the Aeron Region Minecraft server (Cobblemon / Cobbleverse).
Loosely modeled on hermitcraft.com: world downloads, tournaments, server info, news, store links.

## Stack
- Repo: AeronRegion/aeronregion-site, Astro site
- Hosting: Cloudflare Pages (auto-deploys on push to main)
- World downloads: Cloudflare R2
- Build: `npm run build` (astro build)

## Working rules (READ FIRST)
- git pull before any change.
- EDIT existing files. Never rewrite a whole file from scratch.
- Check the rules below before changing anything. If a request conflicts with one, ask first.
- After every change: add a line to docs/changelog.md; record design decisions here.
- Before pushing any visual change: `npm run build && npm run check:mobile` (390px phone check, screenshots in .cache/mobile/). Also look at 360px: the header must keep the name, dark-mode, ARdex and Discord on row 1 and all tabs on row 2.

## Design rules
- Font: Rubik. Do not switch to Bungee, Chakra Petch, or other "gamer" display fonts.
- The site must NOT look AI-built. Avoid generic gradients, emoji headers, templated hero sections.
- A human designer helps with graphics. Don't replace their assets without asking.

## Content rules
- Main server IP: ar.minecraft.best (src/config/site.ts)
- Experimental server: ar-2.minecraft.best. Request access via Discord only.
  Not whitelisted, not publicly advertised. Keep it low-key on the site.
- Stores are SEPARATE links, never merged:
  - hmac.craftingstore.net (main Aeron Region)
  - ar-2.craftingstore.net (experimental server)
- Discord: discord.gg/zC4YKx5sDx
- YouTube: @AeronRegion
- Tournaments: Challonge community "ARsmp"

## Related
- ARdex lives in its own repo (aeronregion-dex) at dex.aeronregion.net. The main site only links to it (menu label: "ARdex").

## Docs index (read when relevant)
- docs/decisions.md: why things are the way they are
- docs/changelog.md: dated list of changes
