import 'dotenv/config';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

// First start against an empty (persistent) DATA_DIR: seed the approved
// testimonials carried over from the old site. Never overwrites live data.
const dataDir = path.resolve(process.env.DATA_DIR || fileURLToPath(new URL('../data', import.meta.url)));
const seedFile = fileURLToPath(new URL('../seed/testimonials.json', import.meta.url));
const testimonialsFile = path.join(dataDir, 'testimonials.json');
if (!existsSync(testimonialsFile) && existsSync(seedFile)) {
  mkdirSync(dataDir, { recursive: true });
  copyFileSync(seedFile, testimonialsFile);
}

const port = process.env.PORT || 4000;
const app = createApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`bosch-technologies API listening on port ${port}`);
});
