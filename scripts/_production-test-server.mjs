/** Local production server lifecycle for read-only smoke/Lighthouse audits. */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export async function startProductionTestServer(port = 4781) {
  const root = process.cwd();
  if (!existsSync(join(root, 'out', 'index.html'))) {
    throw new Error('Production export is missing: run npm run build first.');
  }
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ['scripts/serve-lighthouse.mjs'], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  child.stdout.on('data', (chunk) => { logs += String(chunk); });
  child.stderr.on('data', (chunk) => { logs += String(chunk); });

  let ready = false;
  for (let n = 0; n < 65; n++) {
    if (child.exitCode !== null) break;
    try {
      const response = await fetch(baseUrl + '/', { signal: AbortSignal.timeout(1200) });
      if (response.ok) { ready = true; break; }
    } catch { /* Server still booting. */ }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  if (!ready) {
    child.kill('SIGTERM');
    throw new Error(`Could not start production server on ${baseUrl}. ${logs.trim()}`);
  }
  const close = async () => {
    if (child.exitCode !== null) return;
    await new Promise((resolve) => {
      child.once('exit', resolve);
      child.kill('SIGTERM');
      setTimeout(resolve, 2500).unref();
    });
  };
  return { baseUrl, close, logs: () => logs };
}
