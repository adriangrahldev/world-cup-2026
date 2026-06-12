// Generates sitemap.xml + sitemap-images.xml from match + venue data.
// Run via `node scripts/gen-sitemap.mjs` or as part of the build.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const BASE = 'https://worldcup.adriangrahl.com';
const today = new Date().toISOString().split('T')[0];

// Import TS data by reading the source directly (lightweight parser).
// We avoid bundling the full TS toolchain; the file is plain TS with simple const/array shapes.
const matchesPath = path.join(ROOT, 'src', 'data', 'matches.ts');
const venuesPath = path.join(ROOT, 'src', 'data', 'venues.ts');
const groupsPath = path.join(ROOT, 'src', 'data', 'groups.ts');

async function readModule(p) {
  const raw = await fs.readFile(p, 'utf8');
  return raw;
}

function extractWorldCupMatches(src) {
  const startIdx = src.indexOf('export const worldCupMatches');
  if (startIdx < 0) return [];
  // Find the first '[' that opens the array (the one not in a type like 'Match[]').
  // Easiest: find the line containing "worldCupMatches" then look for `[` after `=`.
  const afterDecl = src.slice(startIdx);
  const eqIdx = afterDecl.indexOf('= [');
  if (eqIdx < 0) return [];
  const arrStart = startIdx + eqIdx + 2; // position of the `[` after `=`
  // Walk brackets to find matching `]`
  let depth = 0;
  let arrEnd = -1;
  for (let i = arrStart; i < src.length; i++) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) { arrEnd = i; break; }
    }
  }
  if (arrEnd < 0) return [];
  const body = src.slice(arrStart + 1, arrEnd);
  // Split body into objects by finding every `{ id:` … `}` pair.
  // Each match object is on a single line, so we can use a regex on each line.
  const records = [];
  const lines = body.split('\n');
  let current = '';
  for (const line of lines) {
    if (line.includes('{ id:') || current.includes('{ id:')) {
      current += line + '\n';
      if (line.includes('},')) {
        records.push(parseMatchObject(current));
        current = '';
      } else if (line.trim().endsWith('}')) {
        records.push(parseMatchObject(current));
        current = '';
      }
    }
  }
  if (current.trim()) records.push(parseMatchObject(current));
  return records.filter(r => r && r.id);
}

function parseMatchObject(text) {
  const get = (k) => {
    const m = text.match(new RegExp(`${k}:\\s*'([^']*)'`));
    return m ? m[1] : '';
  };
  const getNum = (k) => {
    const m = text.match(new RegExp(`${k}:\\s*(\\d+)`));
    return m ? parseInt(m[1], 10) : 0;
  };
  return {
    id: getNum('id'),
    homeTeam: get('homeTeam'),
    awayTeam: get('awayTeam'),
    date: get('date'),
    time: get('time'),
    venue: get('venue'),
    city: get('city'),
    country: get('country'),
    group: get('group'),
    stage: get('stage'),
  };
}

function extractGroups(src) {
  const startIdx = src.indexOf('export const groupsByLetter');
  if (startIdx < 0) return [];
  const arrStart = src.indexOf('[', startIdx);
  const arrEnd = src.indexOf('];', arrStart);
  const body = src.slice(arrStart + 1, arrEnd);
  const letters = [];
  const re = /letter:\s*'([A-Z])'[\s\S]*?teams:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const teams = m[2]
      .split(',')
      .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
    letters.push({ letter: m[1], teams });
  }
  return letters;
}

function extractVenues(src) {
  const startIdx = src.indexOf('export const venues');
  if (startIdx < 0) return [];
  const arrStart = src.indexOf('[', startIdx);
  const arrEnd = src.indexOf('];', arrStart);
  const body = src.slice(arrStart + 1, arrEnd);
  const records = [];
  const re = /name:\s*'([^']+)'[\s\S]*?city:\s*'([^']+)'[\s\S]*?country:\s*'([A-Z]+)'/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    records.push({ name: m[1], city: m[2], country: m[3] });
  }
  return records;
}

function urlEntry(loc, changefreq, priority, alternates = []) {
  const xhtml = alternates
    .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
    .join('\n');
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${xhtml}
  </url>`;
}

async function main() {
  const [matchesSrc, groupsSrc, venuesSrc] = await Promise.all([
    readModule(matchesPath),
    readModule(groupsPath),
    readModule(venuesPath),
  ]);

  let matches;
  try {
    matches = extractWorldCupMatches(matchesSrc);
  } catch (e) {
    console.error('extract error:', e.message);
    matches = [];
  }
  const groups = extractGroups(groupsSrc);
  const venues = extractVenues(venuesSrc);

  const urls = [];
  // Home
  urls.push(urlEntry(
    `${BASE}/`,
    'daily', '1.0',
    [
      { lang: 'es', href: `${BASE}/?lang=es` },
      { lang: 'en', href: `${BASE}/?lang=en` },
      { lang: 'x-default', href: `${BASE}/` },
    ]
  ));

  // Section pages (hash anchors)
  const sections = [
    { id: 'matches', pri: '0.9', freq: 'daily' },
    { id: 'groups', pri: '0.8', freq: 'weekly' },
    { id: 'venues', pri: '0.8', freq: 'weekly' },
  ];
  for (const s of sections) {
    urls.push(urlEntry(
      `${BASE}/#${s.id}`,
      s.freq, s.pri,
      [
        { lang: 'es', href: `${BASE}/?lang=es#${s.id}` },
        { lang: 'en', href: `${BASE}/?lang=en#${s.id}` },
        { lang: 'x-default', href: `${BASE}/#${s.id}` },
      ]
    ));
  }

  // Group pages
  for (const g of groups) {
    urls.push(urlEntry(
      `${BASE}/#group-${g.letter}`,
      'weekly', '0.7',
      [
        { lang: 'es', href: `${BASE}/?lang=es#group-${g.letter}` },
        { lang: 'en', href: `${BASE}/?lang=en#group-${g.letter}` },
      ]
    ));
  }

  // Venue pages
  for (const v of venues) {
    const slug = `${v.country}-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    urls.push(urlEntry(
      `${BASE}/#venue-${slug}`,
      'monthly', '0.6',
      [
        { lang: 'es', href: `${BASE}/?lang=es#venue-${slug}` },
        { lang: 'en', href: `${BASE}/?lang=en#venue-${slug}` },
      ]
    ));
  }

  // Match pages
  for (const m of matches) {
    if (!m.id) continue;
    const matchDate = m.date || today;
    urls.push(urlEntry(
      `${BASE}/#match-${m.id}`,
      'weekly', '0.5',
      [
        { lang: 'es', href: `${BASE}/?lang=es#match-${m.id}` },
        { lang: 'en', href: `${BASE}/?lang=en#match-${m.id}` },
      ]
    ));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;

  // Image sitemap
  const imageEntries = [];
  for (const v of venues) {
    const slug = `${v.country}-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    imageEntries.push(`  <url>
    <loc>${BASE}/#venue-${slug}</loc>
    <image:image>
      <image:loc>${BASE}/icons/icon-512.png</image:loc>
      <image:title>${v.name} · ${v.city}</image:title>
      <image:caption>Sede del Mundial 2026 en ${v.city}, ${v.country}</image:caption>
    </image:image>
  </url>`);
  }

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.join('\n')}
</urlset>
`;

  await fs.writeFile(path.join(PUBLIC, 'sitemap.xml'), sitemap, 'utf8');
  await fs.writeFile(path.join(PUBLIC, 'sitemap-images.xml'), imageSitemap, 'utf8');

  console.log(`✓ sitemap.xml (${urls.length} URLs)`);
  console.log(`✓ sitemap-images.xml (${imageEntries.length} venues)`);
}

main().catch(e => { console.error(e); process.exit(1); });
