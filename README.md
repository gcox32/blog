# blog.grantcox.net

A small, static blog. Astro → static HTML → Vercel. No database, no client
framework, ~0 KB of JavaScript per page.

The project's guiding document is [`ETHOS.md`](./ETHOS.md). Conventions for
working in the repo are in [`AGENTS.md`](./AGENTS.md).

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build      # → dist/
npm run preview
```

## Write a post

Add `src/content/posts/<slug>.md`:

```md
---
title: 'Post title'
description: 'One line for listings, search results, and the RSS feed.'
pubDate: 2026-08-27
# updatedDate: 2026-08-30
# draft: true
# heroImage: ../../assets/my-post.webp
# heroAlt: 'Description of the header image'
# ogImage: /og/my-post.png   # overrides the heroImage-derived social image
---

Body in Markdown.
```

Published at `/posts/<slug>/`. Drafts render in `npm run dev` but are excluded
from the production build, the sitemap, and the RSS feed.

`heroImage` (a path into `src/assets/`) renders at the top of the post and is
also cropped to a 1200×630 JPEG for the social/OG card — one image, both jobs.
Full image guidance is in the `prose-and-code` reference post.

## Deploy

Push to the repo connected to Vercel. Framework preset: Astro. No environment
variables required. Set the custom domain to `blog.grantcox.net` in the Vercel
project.

## Social images

`public/og-default.png` is the fallback. Regenerate it with
`node scripts/make-og.mjs`. For a per-post image, drop a 1200×630 PNG in
`public/og/` and set `ogImage: /og/<name>.png` in the post's frontmatter.
