// The graded stills and loops. Stills live in src/assets/media (astro:assets builds the AVIF/WebP
// sets), clips in public/media as <name>.mp4 (H.264) with an optional <name>.av1.mp4 twin. They are
// looked up rather than imported, so the build passes while a file is still being made: a missing
// still leaves the FRAME gradient its frame paints, a missing clip leaves the still alone.
import type { ImageMetadata } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/media/*.jpg', { eager: true });

/** A still by name (no extension), or undefined while it does not exist yet. */
export function still(name: string): ImageMetadata | undefined {
  return files[`../assets/media/${name}.jpg`]?.default;
}

/** The still under a clip: its first frame when that exists (so the clip fades in without a jump), else the still. */
export function poster(name: string): ImageMetadata | undefined {
  return still(`${name}-poster`) ?? still(name);
}

const pub = (f: string) => fs.existsSync(path.join(process.cwd(), 'public', 'media', f));

/** A clip's base URL ("/media/<name>") and whether it has an AV1 twin, or undefined without its H.264 file. */
export function clip(name: string): { src: string; av1: boolean } | undefined {
  if (!pub(`${name}.mp4`)) return undefined;
  return { src: `/media/${name}`, av1: pub(`${name}.av1.mp4`) };
}
