// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — edit this file to change links, IPs, packs.
//  Nothing else needs to change for routine updates.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Aeron Region',
  tagline: 'A Minecraft community',
  url: 'https://aeronregion.net',
};

// Base URL for world downloads (Cloudflare R2 bucket on a custom domain)
export const downloadsBase = 'https://downloads.aeronregion.net';

export const socials = [
  { label: 'Discord', href: 'https://discord.gg/zC4YKx5sDx', icon: 'discord' },
  { label: 'YouTube', href: 'https://www.youtube.com/@AeronRegion', icon: 'youtube' },
  { label: 'Challonge', href: 'https://challonge.com/communities/ARsmp', icon: 'trophy' },
] as const;

export const stores = [
  { label: 'Aeron Region Store', href: 'https://hmac.craftingstore.net/' },
  { label: 'Experimental Store', href: 'https://ar-2.craftingstore.net/' },
];

// Main server (home page)
export const mainServer = {
  name: 'Aeron Region',
  ip: 'ar.minecraft.best',        // address shown to players
  statusHost: 'ar.minecraft.best', // address the live player count checks (must resolve publicly)
  pack: 'Cobbleverse',
  packVersion: '1.8.0',
  loader: 'Fabric 1.21.1',
  modrinth: 'https://modrinth.com/modpack/cobbleverse',
  curseforge: 'https://www.curseforge.com/minecraft/modpacks/cobbleverse-cobblemon',
  trailer: 'https://www.youtube.com/embed/2RsB5djp1go',
};

// Second server — the pack rotates roughly monthly by community poll.
// When the pack changes: update `current`, and move the old one into `history`.
export const experimental = {
  name: 'Experimental',
  ip: 'ar-2.minecraft.best',
  statusHost: '',                 // add a publicly resolvable address/IP to show the player count
  requestAccess: true,            // shows "Request access" wording; set false if it opens to everyone
  accessLink: 'https://discord.gg/zC4YKx5sDx',
  current: {
    name: 'Prominence™ II: Hasturian Era',
    version: '4.1.6',
    loader: 'Fabric 1.20.1',
    modrinth: 'https://modrinth.com/modpack/prominence-2-fabric',
    curseforge: 'https://www.curseforge.com/minecraft/modpacks/prominence-2-hasturian-era',
    banner: '/images/packs/prominence-banner.webp',
    since: '2026-11',
  },
  pollLink: 'https://discord.gg/zC4YKx5sDx',
  history: [
    // { name: 'Example Pack', version: '1.0', from: '2026-10', to: '2026-11' },
  ],
};

// Top navigation — order here is the order shown.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Gym League', href: '/league/' },
  { label: 'Tournaments', href: '/tournaments/' },
  { label: 'Experimental', href: '/experimental/' },
  { label: 'Worlds', href: '/worlds/' },
  { label: 'News', href: '/news/' },
  { label: 'ARdex', href: 'https://dex.aeronregion.net' },
];
