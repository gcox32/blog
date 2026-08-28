/*
 * Generates public/og-default.png — the fallback social-share image.
 * One-off: run `node scripts/make-og.mjs` and commit the result.
 * Per-post images live in public/og/ and are set via the post's `ogImage`.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-default.png', import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#171613"/>
  <rect x="0" y="0" width="1200" height="8" fill="#e2895f"/>
  <text x="80" y="330" font-family="ui-sans-serif, system-ui, sans-serif"
        font-size="88" font-weight="700" fill="#ece9e2">Grant Cox</text>
  <text x="80" y="400" font-family="ui-sans-serif, system-ui, sans-serif"
        font-size="34" fill="#a3a099">blog.grantcox.net</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote', out);
