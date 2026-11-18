// Downloads player skin images once, at build time, and embeds them in the page,
// so visitors never hit the skin service's rate limits. If a download fails,
// the original URL is used instead and the browser loads it live.
// Set SKIP_SKINS=1 to skip downloading (for offline local builds).

const cache = new Map<string, Promise<string>>();
const MAX_AT_ONCE = 4;
let running = 0;
const queue: (() => void)[] = [];

async function slot<T>(fn: () => Promise<T>): Promise<T> {
  if (running >= MAX_AT_ONCE) await new Promise<void>((r) => queue.push(r));
  running++;
  try {
    return await fn();
  } finally {
    running--;
    queue.shift()?.();
  }
}

// The default Steve image for the same render type and size, used to spot
// when the service returns Steve instead of the player's real skin.
const steves = new Map<string, Promise<string | null>>();
function steveFor(url: string) {
  const u = new URL(url);
  const parts = u.pathname.split('/'); // ['', 'avatar' | 'body', id, size]
  if (parts.length < 3 || parts[2] === 'MHF_Steve') return Promise.resolve(null);
  parts[2] = 'MHF_Steve';
  const key = parts.join('/');
  if (!steves.has(key)) {
    steves.set(key, fetch(u.origin + key, { signal: AbortSignal.timeout(10000) })
      .then(async (r) => (r.ok ? Buffer.from(await r.arrayBuffer()).toString('base64') : null))
      .catch(() => null));
  }
  return steves.get(key)!;
}

async function download(url: string): Promise<string> {
  if (process.env.SKIP_SKINS) return url;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const b64 = Buffer.from(await res.arrayBuffer()).toString('base64');
        const steve = await steveFor(url);
        if (!steve || b64 !== steve || attempt === 3) {
          return `data:${res.headers.get('content-type') ?? 'image/png'};base64,${b64}`;
        }
        console.warn(`[skins] got default Steve for ${url}, retrying`);
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }
  console.warn(`[skins] could not download ${url}, using live URL`);
  return url;
}

export function skin(url: string): Promise<string> {
  if (!cache.has(url)) cache.set(url, slot(() => download(url)));
  return cache.get(url)!;
}
