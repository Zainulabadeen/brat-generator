import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const stalePaths = [
  'app/page.js',
  'app/layout.js',
  'app/about/page.js',
  'app/contact/page.js',
  'app/contact/ContactForm.js',
  'app/divisions',
  'app/fleet',
  'app/industries',
  'components/PageHero.js',
  'components/Footer.js',
  'data/site.js',
  'public/images/rt-movers-logo.png',
  'public/images/rt-hero-generated.webp',
  'public/images/rt-moving-authentic.webp',
];

let removed = 0;
for (const rel of stalePaths) {
  const target = path.join(root, rel);
  if (!fs.existsSync(target)) continue;
  fs.rmSync(target, { recursive: true, force: true });
  removed += 1;
  console.log(`REMOVED ${rel}`);
}

const dataDir = path.join(root, 'data');
if (fs.existsSync(dataDir) && fs.readdirSync(dataDir).length === 0) {
  fs.rmdirSync(dataDir);
  console.log('REMOVED empty data/ directory');
}

console.log(`Legacy project cleanup complete. Removed ${removed} stale path(s).`);
