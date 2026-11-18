// Player skins, drawn from each player's real Mojang skin file at build time.
//
// Outside render services (mc-heads, Minotar) sometimes return the default
// Steve instead of the player's skin, so the site downloads the skin texture
// straight from Mojang and draws the face and body itself. The images are
// embedded in the page, so visitors never wait on another service.
//
// Set SKIP_SKINS=1 to skip downloading (offline local builds); a plain
// placeholder is used instead.

import { PNG } from 'pngjs';
import { uuids } from '../data/uuids';

type Skin = { png: PNG; slim: boolean };

const cache = new Map<string, Promise<Skin | null>>();
const MAX_AT_ONCE = 4;
let running = 0;
const waiting: (() => void)[] = [];

async function slot<T>(fn: () => Promise<T>): Promise<T> {
  if (running >= MAX_AT_ONCE) await new Promise<void>((r) => waiting.push(r));
  running++;
  try {
    return await fn();
  } finally {
    running--;
    waiting.shift()?.();
  }
}

async function getJson(url: string) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (r.ok) return await r.json();
      if (r.status === 404 || r.status === 204) return null;
    } catch {}
    await new Promise((res) => setTimeout(res, 1500 * (attempt + 1)));
  }
  return null;
}

async function getBytes(url: string) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
    } catch {}
    await new Promise((res) => setTimeout(res, 1500 * (attempt + 1)));
  }
  return null;
}

const idFor = (ign: string) =>
  uuids[ign] ?? Object.entries(uuids).find(([k]) => k.toLowerCase() === ign.toLowerCase())?.[1];

async function loadSkin(ign: string): Promise<Skin | null> {
  if (process.env.SKIP_SKINS) return null;
  let id = idFor(ign);
  if (!id) {
    const p = await getJson(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(ign)}`);
    id = p?.id;
  }
  if (!id) {
    const p = await getJson(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(ign)}`);
    id = p?.data?.player?.raw_id;
  }
  if (!id) return null;
  let profile = await getJson(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`);
  if (!profile?.properties) {
    // Mojang can refuse requests from cloud build servers; PlayerDB mirrors the same profile data
    const p = await getJson(`https://playerdb.co/api/player/minecraft/${id}`);
    profile = p?.data?.player;
  }
  const prop = profile?.properties?.find((p: any) => p.name === 'textures');
  if (!prop) return null;
  const tex = JSON.parse(Buffer.from(prop.value, 'base64').toString()).textures?.SKIN;
  if (!tex?.url) return null;
  const bytes = await getBytes(tex.url.replace('http://', 'https://'));
  if (!bytes) return null;
  try {
    return { png: PNG.sync.read(bytes), slim: tex.metadata?.model === 'slim' };
  } catch {
    return null;
  }
}

function skinOf(ign: string) {
  const key = ign.toLowerCase();
  if (!cache.has(key)) {
    cache.set(key, slot(() => loadSkin(ign)).then((s) => {
      if (!s && !process.env.SKIP_SKINS) console.warn(`[skins] could not load the skin for ${ign}`);
      return s;
    }));
  }
  return cache.get(key)!;
}

// ── drawing ──────────────────────────────────────────────────────────────

type Px = [number, number, number, number];
const px = (p: PNG, x: number, y: number): Px => {
  const i = (p.width * y + x) << 2;
  return [p.data[i], p.data[i + 1], p.data[i + 2], p.data[i + 3]];
};

// copy a w×h block from the skin onto a small canvas (overlay = only opaque-ish pixels)
function blit(src: PNG, dst: PNG, sx: number, sy: number, w: number, h: number, dx: number, dy: number, overlay = false, mirror = false) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = px(src, sx + (mirror ? w - 1 - x : x), sy + y);
      if (overlay && a < 128) continue;
      const i = (dst.width * (dy + y) + dx + x) << 2;
      dst.data[i] = r; dst.data[i + 1] = g; dst.data[i + 2] = b; dst.data[i + 3] = 255;
    }
  }
}

// Old 64×32 skins sometimes fill the hat layer with a solid color; Minecraft ignores it then.
function hatIsUsable(src: PNG) {
  if (src.height === 64) return true;
  const first = px(src, 40, 8);
  for (let y = 8; y < 16; y++) for (let x = 40; x < 48; x++) {
    const p = px(src, x, y);
    if (p[3] < 128 || p.some((v, k) => v !== first[k])) return true;
  }
  return false;
}

function scaleUp(small: PNG, k: number) {
  const out = new PNG({ width: small.width * k, height: small.height * k });
  for (let y = 0; y < out.height; y++) for (let x = 0; x < out.width; x++) {
    const s = (small.width * Math.floor(y / k) + Math.floor(x / k)) << 2;
    const d = (out.width * y + x) << 2;
    small.data.copy(out.data, d, s, s + 4);
  }
  return `data:image/png;base64,${PNG.sync.write(out).toString('base64')}`;
}

export function drawFace({ png }: Skin, size: number) {
  const c = new PNG({ width: 8, height: 8 });
  blit(png, c, 8, 8, 8, 8, 0, 0);
  if (hatIsUsable(png)) blit(png, c, 40, 8, 8, 8, 0, 0, true);
  return scaleUp(c, Math.max(1, Math.round(size / 8)));
}

// flat front view, 16×32: head, body, both arms, both legs, with their outer layers
export function drawBody({ png, slim }: Skin, width: number) {
  const c = new PNG({ width: 16, height: 32 }); // starts fully transparent
  const modern = png.height === 64;
  const aw = slim ? 3 : 4;
  blit(png, c, 8, 8, 8, 8, 4, 0);                               // head
  if (hatIsUsable(png)) blit(png, c, 40, 8, 8, 8, 4, 0, true);  // hat
  blit(png, c, 20, 20, 8, 12, 4, 8);                            // body
  blit(png, c, 44, 20, aw, 12, 4 - aw, 8);                      // right arm (viewer's left)
  blit(png, c, 4, 20, 4, 12, 4, 20);                            // right leg
  if (modern) {
    blit(png, c, 36, 52, aw, 12, 12, 8);                        // left arm
    blit(png, c, 20, 52, 4, 12, 8, 20);                         // left leg
    blit(png, c, 20, 36, 8, 12, 4, 8, true);                    // jacket
    blit(png, c, 44, 36, aw, 12, 4 - aw, 8, true);              // right sleeve
    blit(png, c, 52, 52, aw, 12, 12, 8, true);                  // left sleeve
    blit(png, c, 4, 36, 4, 12, 4, 20, true);                    // right pants
    blit(png, c, 4, 52, 4, 12, 8, 20, true);                    // left pants
  } else {
    blit(png, c, 44, 20, aw, 12, 12, 8, false, true);           // old skins mirror the arm
    blit(png, c, 4, 20, 4, 12, 8, 20, false, true);             // and the leg
  }
  return scaleUp(c, Math.max(1, Math.round(width / 16)));
}

const placeholder = (w: number, h: number) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#c9b0a8"/></svg>`)}`;

export async function face(ign: string, size = 48) {
  const s = await skinOf(ign);
  return s ? drawFace(s, size) : placeholder(size, size);
}

export async function body(ign: string, width = 80) {
  const s = await skinOf(ign);
  return s ? drawBody(s, width) : placeholder(width, width * 2);
}
