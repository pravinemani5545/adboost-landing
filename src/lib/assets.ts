// Build-time cache busting for public/ assets served under long-lived
// Cache-Control headers (vercel.json). The URL carries a content hash, so
// replacing the file changes the URL and every browser refetches immediately.
import { createHash } from 'node:crypto';
import fs from 'node:fs';

export function versioned(publicPath: string): string {
  const file = `./public${publicPath}`;
  if (!fs.existsSync(file)) return publicPath;
  const hash = createHash('md5').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
  return `${publicPath}?v=${hash}`;
}
