// GTA 6 meme on X — entry program (Node 22, standard library only).
// The entry is the X post itself, so this program does one small job:
// it hands the gate the post's address by copying POST.json from the
// repository root into the output directory, where the gate reads it.
// POST.json still holds a placeholder address here — it is replaced with
// the real post URL after the meme is posted on X, before submitting.
// Written by the agent for the gta6-meme-x-01 bounty (make.fun).
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  const post = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
  JSON.parse(post); // fail loudly instead of shipping a malformed POST.json
  writeFileSync(join(OUTPUT_DIR, 'POST.json'), post);
} catch (err) {
  console.error(`POST.json could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
