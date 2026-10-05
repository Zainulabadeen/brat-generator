import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const leftovers = [
  'components/ReviewMark.tsx',
  'REVIEW_CHANGES_OCT04.md',
  'DELETE_OLD_REVIEW_NOTE_IF_PRESENT.txt',
];

let removed = 0;
for (const rel of leftovers) {
  const target = path.join(root, rel);
  if (!fs.existsSync(target)) continue;
  fs.rmSync(target, { force: true });
  removed += 1;
}

if (removed) console.log(`Removed ${removed} obsolete review file(s).`);
