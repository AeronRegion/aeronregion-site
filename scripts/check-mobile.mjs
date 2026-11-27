// Phone check: opens the built site at iPhone size (390x844) in headless Chrome and fails if anything
// runs off the side of the screen or a table/chart needs sideways scrolling. Screenshots go to .cache/mobile/.
// Usage: npm run build && npm run check:mobile [-- /extra/page/ ...]
// Needs Google Chrome or Chromium installed (set CHROME=/path/to/chrome if it isn't found).
import { spawn, execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const PAGES = ['/', '/news/', '/tournaments/', '/league/', '/worlds/', '/experimental/', ...process.argv.slice(2)];
const W = 390, H = 844, PORT = 4499, DBG = 9399;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

if (!existsSync('dist')) { console.error('No dist/ folder: run npm run build first.'); process.exit(1); }
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join('dist', p)); res.writeHead(200, { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end(); }
}).listen(PORT);

const chrome = process.env.CHROME ?? ['google-chrome', 'chromium', 'chromium-browser', 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
  .find((c) => { try { if (c.includes('/')) return existsSync(c); execSync(`command -v ${c}`, { stdio: 'ignore' }); return true; } catch { return false; } });
if (!chrome) { console.error('Chrome not found. Set CHROME=/path/to/chrome.'); process.exit(1); }
const proc = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${DBG}`, '--user-data-dir=.cache/mobile-profile', 'about:blank'], { stdio: 'ignore' });
let ver; for (let i = 0; i < 50 && !ver; i++) { await new Promise((r) => setTimeout(r, 200)); try { ver = await (await fetch(`http://127.0.0.1:${DBG}/json/version`)).json(); } catch {} }

// What counts as a problem: anything wider than the screen, and any scroll box that has to scroll sideways
const PROBE = `(() => {
  const W = document.documentElement.clientWidth, bad = [];
  const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '');
  if (document.documentElement.scrollWidth > W + 1) bad.push('page is ' + document.documentElement.scrollWidth + 'px wide (screen ' + W + 'px)');
  for (const el of document.querySelectorAll('main *')) {
    if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
    const cs = getComputedStyle(el);
    if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2 && el.tagName !== 'TEXTAREA' && !el.closest('[data-scroll-ok]'))
      bad.push(name(el) + ' scrolls sideways (' + el.scrollWidth + ' > ' + el.clientWidth + ')');
  }
  return [...new Set(bad)].slice(0, 8);
})()`;

await mkdir('.cache/mobile', { recursive: true });
let failed = 0;
for (const path of PAGES) {
  const t = await (await fetch(`http://127.0.0.1:${DBG}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = {}; ws.onmessage = (e) => { const m = JSON.parse(e.data); pend[m.id]?.(m.result); };
  const send = (method, params = {}) => new Promise((r) => { pend[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: true });
  await send('Page.enable'); await send('Page.navigate', { url: `http://localhost:${PORT}${path}` });
  await new Promise((r) => setTimeout(r, 2500));
  // Pokémon pages: also open the Moves tab
  if (false) { await send('Runtime.evaluate', { expression: "document.querySelectorAll('.tabs button')[1]?.click()" }); await new Promise((r) => setTimeout(r, 600)); }
  const res = await send('Runtime.evaluate', { returnByValue: true, expression: PROBE });
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const file = `.cache/mobile/${path.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'home'}.png`;
  await writeFile(file, Buffer.from(shot.data, 'base64'));
  const bad = res.result?.value ?? ['could not check'];
  if (bad.length) failed++;
  console.log(`${bad.length ? 'FAIL' : 'ok  '} ${path}${bad.length ? '\n       ' + bad.join('\n       ') : ''}`);
  ws.close();
}
console.log(failed ? `\n${failed} page(s) don't fit a phone screen. Screenshots: .cache/mobile/` : '\nAll pages fit a phone screen. Screenshots: .cache/mobile/');
proc.kill(); server.close(); process.exit(failed ? 1 : 0);
