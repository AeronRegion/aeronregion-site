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
  { label: 'Cobbleverse Store', href: 'https://hmac.craftingstore.net/' },
  { label: 'Experimental Store', href: 'https://ar-2.craftingstore.net/' },
];

// Main server (home page)
export const mainServer = {
  name: 'Cobbleverse',
  ip: 'hmac.minecraft.best',
  pack: 'Cobbleverse',
  packVersion: '1.7.42',
  loader: 'Fabric 1.21.1',
  modrinth: 'https://modrinth.com/modpack/cobbleverse',
  curseforge: '', // add the CurseForge link here if you want it shown
  trailer: 'https://www.youtube.com/embed/2RsB5djp1go',
};

// Second server — the pack rotates roughly monthly by community poll.
// When the pack changes: update `current`, and move the old one into `history`.
export const experimental = {
  name: 'Experimental',
  ip: 'ar-2.minecraft.best',
  // Whitelisted server. Set to false if it ever opens to everyone.
  requestOnly: true,
  current: {
    name: 'Prominence™ II: Hasturian Era',
    version: '4.1.6',
    loader: 'Fabric 1.20.1',
    modrinth: 'https://modrinth.com/modpack/prominence-2-fabric',
    curseforge: 'https://www.curseforge.com/minecraft/modpacks/prominence-2-hasturian-era',
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
  { label: 'Experimental', href: '/experimental/' },
  { label: 'Worlds', href: '/worlds/' },
  { label: 'News', href: '/news/' },
];
