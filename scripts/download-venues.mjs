/**
 * Downloads the 16 venue/hero images used by the World Cup 2026 site
 * from images.unsplash.com into /public/venues/ so they ship with
 * the app instead of being fetched cross-origin at runtime.
 *
 * Uses Unsplash's ?w=600&auto=format URL params to get AVIF/WebP.
 *
 * Run with: node scripts/download-venues.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'public', 'venues');

// [venue-name, file-name, unsplash-photo-id]
const VENUES = [
  ['Estadio Azteca',           'estadio-azteca',           '1555664424-778a1e5e1b48'],
  ['Estadio Akron',            'estadio-akron',            '1574629810360-7efbbe195018'],
  ['Estadio Monterrey',        'estadio-monterrey',        '1574629810360-7efbbe195018'], // shares with Akron
  ['SoFi Stadium',             'sofi-stadium',             '1540747913346-19e32dc3e97e'],
  ['MetLife Stadium',          'metlife-stadium',          '1459865264687-595d652de67e'],
  ['AT&T Stadium',             'att-stadium',              '1489944440615-453fc2b6a9a9'],
  ['NRG Stadium',              'nrg-stadium',              '1522778119026-d647f0596c20'],
  ['Hard Rock Stadium',        'hard-rock-stadium',        '1431324155629-1a6deb1dec8d'],
  ['Lumen Field',              'lumen-field',              '1459865264687-595d652de67e'],
  ['Levi\'s Stadium',           'levis-stadium',            '1574629810360-7efbbe195018'],
  ['Gillette Stadium',         'gillette-stadium',         '1459865264687-595d652de67e'],
  ['BC Place',                 'bc-place',                 '1459865264687-595d652de67e'],
  ['BMO Field',                'bmo-field',                '1459865264687-595d652de67e'],
  ['Mercedes-Benz Stadium',    'mercedes-benz-stadium',    '1574629810360-7efbbe195018'],
  ['Arrowhead Stadium',        'arrowhead-stadium',        '1522778119026-d647f0596c20'],
  ['Lincoln Financial Field',  'lincoln-financial-field',  '1459865264687-595d652de67e'],
];

const COMMON = '?w=600&auto=format&q=70&fit=crop';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; WC2026-Site/1.0; +https://worldcup.adriangrahl.com)',
  Accept: 'image/avif,image/webp,image/png,*/*;q=0.5',
};

async function downloadOne(name, photoId) {
  const out = resolve(OUT_DIR, `${name}.avif`);
  if (existsSync(out)) return { name, skipped: true };
  const url = `https://images.unsplash.com/photo-${photoId}${COMMON}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} ${url}`);
  const ct = res.headers.get('content-type') || '';
  const ext = ct.includes('avif') ? 'avif' : ct.includes('webp') ? 'webp' : 'jpg';
  const outExt = resolve(OUT_DIR, `${name}.${ext}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outExt, buf);
  // Remove the .avif placeholder if the server actually returned a different format
  if (ext !== 'avif') {
    try { await import('node:fs/promises').then(fs => fs.unlink(out)); } catch {}
  }
  return { name, ext, bytes: buf.length };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading ${VENUES.length} venues from Unsplash into ${OUT_DIR}\n`);
  const results = [];
  for (const [venue, name, photoId] of VENUES) {
    try {
      const r = await downloadOne(name, photoId);
      const size = r.skipped ? 'cached' : `${(r.bytes/1024).toFixed(1)} KB ${r.ext}`;
      console.log(`  ${venue.padEnd(24)} ${name.padEnd(28)} ${size}`);
      results.push(r);
    } catch (e) {
      console.error(`  FAIL ${venue}: ${e.message}`);
      results.push({ venue, error: e.message });
    }
  }
  console.log(`\nOK: ${results.filter(r => !r.error).length}  FAIL: ${results.filter(r => r.error).length}`);
  if (results.some(r => r.error)) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
