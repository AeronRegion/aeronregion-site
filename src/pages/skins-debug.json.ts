// Build diagnostics: which skin sources the build server can reach. Safe to delete.
async function probe(url: string) {
  const t = Date.now();
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(10000), headers: { 'user-agent': 'aeronregion.net site build' } });
    const body = await r.text();
    return { url, status: r.status, ms: Date.now() - t, bytes: body.length, start: body.slice(0, 120) };
  } catch (e: any) {
    return { url, error: String(e?.cause?.code ?? e?.message ?? e), ms: Date.now() - t };
  }
}
export async function GET() {
  const id = '060a356a6f0141838a58754b2c56dd69';
  const results = await Promise.all([
    probe(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`),
    probe('https://api.mojang.com/users/profiles/minecraft/monotropics'),
    probe(`https://playerdb.co/api/player/minecraft/${id}`),
    probe('https://textures.minecraft.net/texture/9e6249f110c9dab60484409e8eb58455afd68abc4dcdf91e9c5fabaf36f8d19'),
    probe('https://mc-heads.net/avatar/monotropics/8'),
  ]);
  return new Response(JSON.stringify({ builtAt: new Date().toISOString(), results }, null, 2), { headers: { 'content-type': 'application/json' } });
}
