import fs from 'node:fs';
import path from 'node:path';

const target = path.join(process.cwd(), 'app', 'blog');

if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log('Removed old app/blog routes. /blog URLs will now be handled only by the existing 301 redirects to /help/.');
} else {
  console.log('Old app/blog routes are already removed. Nothing to clean up.');
}
