// ─────────────────────────────────────────────────────────────
//  WORLD ARCHIVE — one entry per downloadable world.
//  1. Upload the zip to R2 (see README).
//  2. Set `file` to its path in the bucket, and `available: true`.
// ─────────────────────────────────────────────────────────────

export type World = {
  label: string;        // shown as the card title
  server: string;       // which server it came from
  pack: string;         // modpack + version needed to open it
  mc: string;           // Minecraft version / loader
  period: string;       // when it ran
  description: string;
  file: string;         // path inside the R2 bucket, e.g. 'worlds/Cobbleverse.zip'
  size?: string;        // e.g. '4.2 GB'
  image?: string;       // e.g. '/images/worlds/cobbleverse.webp' (optional)
  packLink?: string;
  available: boolean;   // false = shows "Coming soon"
};

export const worlds: World[] = [
  {
    label: 'Cobbleverse',
    server: 'Main server',
    pack: 'Cobbleverse 1.8.0',
    mc: 'Fabric',
    period: 'Ongoing',
    description: 'The Aeron Region home world: gyms, tournament arenas, and everything the community has built.',
    file: 'worlds/Cobbleverse.zip',
    image: '/images/worlds/cobbleverse.png',
    packLink: 'https://modrinth.com/modpack/cobbleverse',
    available: false,
  },
  {
    label: 'Prominence™ II: Hasturian Era',
    server: 'Experimental server',
    pack: 'Prominence II: Hasturian Era 4.1.6',
    mc: 'Fabric 1.20.1',
    period: 'Nov 2026',
    description: 'The first pack on the experimental server.',
    file: 'worlds/Prominence-II.zip',
    packLink: 'https://www.curseforge.com/minecraft/modpacks/prominence-2-hasturian-era',
    image: '/images/worlds/prominence.webp',
    available: false,
  },
];
