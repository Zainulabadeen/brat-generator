import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { createGzip } from 'node:zlib';

const root = join(process.cwd(), 'out');
const port = Number(process.env.PORT || 3000);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const compressible = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg']);

function resolvePath(urlPath) {
  let pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  if (pathname.endsWith('/')) pathname += 'index.html';
  let candidate = normalize(join(root, pathname));
  if (!candidate.startsWith(root)) return null;
  if (!existsSync(candidate) && !extname(candidate)) {
    const withHtml = `${candidate}.html`;
    const withIndex = join(candidate, 'index.html');
    if (existsSync(withHtml)) candidate = withHtml;
    else if (existsSync(withIndex)) candidate = withIndex;
  }
  return existsSync(candidate) && statSync(candidate).isFile() ? candidate : null;
}

createServer((req, res) => {
  const file = resolvePath(req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const ext = extname(file).toLowerCase();
  const isHashedNextAsset = file.includes(`${join('_next', 'static')}`);
  const isHtml = ext === '.html';
  const cache = isHashedNextAsset
    ? 'public, max-age=31536000, immutable'
    : isHtml
      ? 'no-cache'
      : 'public, max-age=86400';

  res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', cache);
  res.setHeader('Vary', 'Accept-Encoding');

  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (acceptsGzip && compressible.has(ext)) {
    res.setHeader('Content-Encoding', 'gzip');
    res.writeHead(200);
    createReadStream(file).pipe(createGzip({ level: 6 })).pipe(res);
  } else {
    res.writeHead(200);
    createReadStream(file).pipe(res);
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Lighthouse production server: http://localhost:${port}`);
  console.log('Serving ./out with gzip + production-like cache headers.');
});
