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

async function download(url: string): Promise<string> {
  if (process.env.SKIP_SKINS) return url;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        return `data:${res.headers.get('content-type') ?? 'image/png'};base64,${buf.toString('base64')}`;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
  }
  console.warn(`[skins] could not download ${url}, using live URL`);
  return url;
}

export function skin(url: string): Promise<string> {
  if (!cache.has(url)) cache.set(url, slot(() => download(url)));
  return cache.get(url)!;
}
