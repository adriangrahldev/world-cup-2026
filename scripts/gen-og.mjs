// Generates all social/PWA images from a single SVG source.
// Output (in /public):
//   - og/og-image-1200x630.png
//   - og/twitter-card-1200x675.png
//   - icons/icon-192.png, icon-512.png, icon-maskable-512.png
//   - icons/apple-touch-icon.png
//   - icons/favicon-32.png, favicon-16.png
//
// Uses `sharp` (devDependency) for rasterization.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

async function ensureDirs() {
  await fs.mkdir(path.join(PUBLIC, 'og'), { recursive: true });
  await fs.mkdir(path.join(PUBLIC, 'icons'), { recursive: true });
}

function svg(width, height, opts = {}) {
  const { title = 'WORLD CUP', subtitle = '2026', eyebrow = 'Copa Mundial · FIFA', compact = false } = opts;
  const fontSize = compact ? 56 : 120;
  const subFontSize = compact ? 200 : 260;
  const titleY = compact ? 80 : 200;
  const subY = compact ? 230 : 440;
  const ballSize = compact ? 220 : 360;
  const ballX = width - ballSize / 2 - 80;
  const ballY = height / 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e1c"/>
      <stop offset="55%" stop-color="#0e1a14"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.5" r="0.7">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#22c55e" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ball" cx="0.35" cy="0.32" r="0.85">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#f3f4f6"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#22c55e" stroke-width="0.6" opacity="0.07"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>

  <!-- Subtle pitch lines -->
  <g opacity="0.05" stroke="#4ade80" fill="none" stroke-width="1">
    <ellipse cx="${width / 2}" cy="${height / 2 + 40}" rx="${width * 0.42}" ry="${height * 0.32}"/>
    <line x1="${width * 0.05}" y1="${height / 2 + 40}" x2="${width * 0.95}" y2="${height / 2 + 40}"/>
    <rect x="${width * 0.05}" y="${height / 2 - 60}" width="60" height="120"/>
    <rect x="${width * 0.95 - 60}" y="${height / 2 - 60}" width="60" height="120"/>
  </g>

  <!-- Eyebrow chip -->
  <g transform="translate(80, ${titleY - 110})">
    <rect width="${eyebrow.length * 14 + 60}" height="48" rx="24" fill="#22c55e" fill-opacity="0.12" stroke="#22c55e" stroke-opacity="0.35"/>
    <circle cx="28" cy="24" r="5" fill="#4ade80"/>
    <text x="48" y="32" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="700" fill="#86efac" letter-spacing="3">${eyebrow.toUpperCase()}</text>
  </g>

  <!-- Title -->
  <text x="80" y="${titleY}" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="900" fill="#fef7e6" letter-spacing="-2">${title}</text>
  <text x="80" y="${subY}" font-family="Inter, system-ui, sans-serif" font-size="${subFontSize}" font-weight="900" fill="url(#titleGrad)" letter-spacing="-4">${subtitle}</text>

  <!-- Subtitle line -->
  <text x="80" y="${subY + 60}" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="500" fill="#94a0b8">11 junio — 19 julio 2026 · USA · México · Canadá</text>

  <!-- Ball -->
  <g transform="translate(${ballX} ${ballY})">
    <circle r="${ballSize / 2}" fill="url(#ball)" stroke="#0a0e1c" stroke-width="3"/>
    <g stroke="#0a0e1c" stroke-width="${ballSize / 28}" stroke-linejoin="round" stroke-linecap="round" fill="#0a0e1c">
      <polygon points="0,${-ballSize * 0.27} ${ballSize * 0.14},${-ballSize * 0.12} ${ballSize * 0.09},${ballSize * 0.08} ${-ballSize * 0.09},${ballSize * 0.08} ${-ballSize * 0.14},${-ballSize * 0.12}"/>
      <line x1="0" y1="${-ballSize * 0.27}" x2="0" y2="${-ballSize * 0.45}"/>
      <line x1="${ballSize * 0.09}" y1="${ballSize * 0.08}" x2="${ballSize * 0.27}" y2="${ballSize * 0.18}"/>
      <line x1="${-ballSize * 0.09}" y1="${ballSize * 0.08}" x2="${-ballSize * 0.27}" y2="${ballSize * 0.18}"/>
      <line x1="${-ballSize * 0.14}" y1="${-ballSize * 0.12}" x2="${-ballSize * 0.34}" y2="${-ballSize * 0.16}"/>
      <line x1="${ballSize * 0.14}" y1="${-ballSize * 0.12}" x2="${ballSize * 0.34}" y2="${-ballSize * 0.16}"/>
    </g>
    <ellipse cx="${-ballSize * 0.16}" cy="${-ballSize * 0.16}" rx="${ballSize * 0.18}" ry="${ballSize * 0.08}" fill="url(#shine)" opacity="0.55"/>
  </g>

  <!-- Brand chip bottom-left -->
  <g transform="translate(80, ${height - 70})">
    <text font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" fill="#5e6a85" letter-spacing="2">WORLDCUP.ADRIANGRAHL.COM</text>
  </g>
</svg>`;
}

function maskableSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e1c"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
    <radialGradient id="ball" cx="0.35" cy="0.32" r="0.85">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </radialGradient>
  </defs>
  <!-- Full bleed background for maskable (safe zone is the inner 80% circle) -->
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(256 256)">
    <circle r="160" fill="url(#ball)" stroke="#0a0e1c" stroke-width="6"/>
    <g stroke="#0a0e1c" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" fill="#0a0e1c">
      <polygon points="0,-90 50,-55 30,30 -30,30 -50,-55"/>
      <line x1="0" y1="-90" x2="0" y2="-150"/>
      <line x1="30" y1="30" x2="90" y2="60"/>
      <line x1="-30" y1="30" x2="-90" y2="60"/>
      <line x1="-50" y1="-55" x2="-110" y2="-70"/>
      <line x1="50" y1="-55" x2="110" y2="-70"/>
    </g>
  </g>
</svg>`;
}

async function main() {
  await ensureDirs();

  const tasks = [
    { name: 'og/og-image-1200x630.png', w: 1200, h: 630, svg: svg(1200, 630) },
    { name: 'og/twitter-card-1200x675.png', w: 1200, h: 675, svg: svg(1200, 675, { title: 'WORLD CUP', subtitle: '2026' }) },
    { name: 'icons/icon-192.png', w: 192, h: 192, svg: maskableSvg(), useMask: true },
    { name: 'icons/icon-512.png', w: 512, h: 512, svg: maskableSvg(), useMask: true },
    { name: 'icons/icon-maskable-512.png', w: 512, h: 512, svg: maskableSvg(), useMask: true },
    { name: 'icons/apple-touch-icon.png', w: 180, h: 180, svg: maskableSvg(), useMask: true },
    { name: 'icons/favicon-32.png', w: 32, h: 32, svg: maskableSvg(), useMask: true },
    { name: 'icons/favicon-16.png', w: 16, h: 16, svg: maskableSvg(), useMask: true },
  ];

  for (const t of tasks) {
    const out = path.join(PUBLIC, t.name);
    await sharp(Buffer.from(t.svg))
      .resize(t.w, t.h)
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(out);
    console.log('✓', t.name, `(${t.w}x${t.h})`);
  }

  console.log('\n✅ Imágenes generadas en /public');
}

main().catch(e => { console.error(e); process.exit(1); });
