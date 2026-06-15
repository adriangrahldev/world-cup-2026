/**
 * Downloads the 48 country flags used by the World Cup 2026 site
 * from flagcdn.com (a fast, free, flag-only CDN) into /public/flags/
 * so they ship with the app instead of being fetched cross-origin
 * at runtime. PNG @ 80px wide, ~1-3 KB each.
 *
 * Run with: node scripts/download-flags.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'public', 'flags');

// [teamName, ISO-3166-1 alpha-2 code]
const TEAMS = [
  ['Mexico', 'mx'], ['South Africa', 'za'], ['South Korea', 'kr'], ['Czech Republic', 'cz'],
  ['Canada', 'ca'], ['Bosnia and Herzegovina', 'ba'], ['Qatar', 'qa'], ['Switzerland', 'ch'],
  ['Brazil', 'br'], ['Morocco', 'ma'], ['Haiti', 'ht'], ['Scotland', 'gb-sct'],
  ['United States', 'us'], ['Paraguay', 'py'], ['Australia', 'au'], ['Turkey', 'tr'],
  ['Germany', 'de'], ['Curacao', 'cw'], ["Cote d'Ivoire", 'ci'], ['Ecuador', 'ec'],
  ['Netherlands', 'nl'], ['Japan', 'jp'], ['Sweden', 'se'], ['Tunisia', 'tn'],
  ['Iran', 'ir'], ['New Zealand', 'nz'], ['Belgium', 'be'], ['Egypt', 'eg'],
  ['Saudi Arabia', 'sa'], ['Uruguay', 'uy'], ['Spain', 'es'], ['Cape Verde', 'cv'],
  ['France', 'fr'], ['Senegal', 'sn'], ['Iraq', 'iq'], ['Norway', 'no'],
  ['Argentina', 'ar'], ['Algeria', 'dz'], ['Austria', 'at'], ['Jordan', 'jo'],
  ['Portugal', 'pt'], ['DR Congo', 'cd'], ['Uzbekistan', 'uz'], ['Colombia', 'co'],
  ['Ghana', 'gh'], ['Panama', 'pa'], ['England', 'gb-eng'], ['Croatia', 'hr'],
];

const CONCURRENCY = 2;
const DELAY_MS = 200;
const MAX_RETRIES = 3;
const WIDTH = 'w80'; // 80px wide PNG, ~1-3 KB
const COMMON = '.png';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; WC2026-Site/1.0; +https://worldcup.adriangrahl.com)',
  Accept: 'image/png,*/*;q=0.5',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function downloadOne(code) {
  const fname = `${code}.png`;
  const out = resolve(OUT_DIR, fname);
  if (existsSync(out)) return { code, skipped: true };
  const url = `https://flagcdn.com/${WIDTH}/${code.toLowerCase()}${COMMON}`;
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.status === 429) {
        const wait = 2000 * attempt;
        await sleep(wait);
        continue;
      }
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(out, buf);
      return { code, bytes: buf.length };
    } catch (e) {
      lastErr = e;
      await sleep(1000 * attempt);
    }
  }
  throw lastErr || new Error(`failed after ${MAX_RETRIES} attempts`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading ${TEAMS.length} flags from flagcdn.com into ${OUT_DIR}\n`);
  const results = new Array(TEAMS.length);
  let cursor = 0;
  async function worker(id) {
    while (true) {
      const i = cursor++;
      if (i >= TEAMS.length) return;
      const [, code] = TEAMS[i];
      try {
        const r = await downloadOne(code);
        results[i] = { ...r, i };
        const line = `  [${id}] ${r.skipped ? 'cached' : (r.bytes + 'B').padStart(8)}  ${code}.png`;
        process.stdout.write('\r' + line.padEnd(60));
      } catch (e) {
        results[i] = { error: e.message, code, i };
        console.error(`\n  FAIL ${code}: ${e.message}`);
      }
      await sleep(DELAY_MS);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)));
  process.stdout.write('\n\n');
  const ok = results.filter(r => r && !r.error);
  const fail = results.filter(r => r && r.error);
  console.log(`OK: ${ok.length}  FAIL: ${fail.length}`);
  if (fail.length) {
    console.log('\nFailed:');
    fail.forEach(f => console.log(`  ${f.code}  ${f.error}`));
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
