---
title: 'Prose and code'
description: 'A reference post that exercises every element the styles need to handle.'
pubDate: 2026-07-15
draft: true
heroImage: ../../assets/loki.webp
heroAlt: 'A black cat lying on a desk beside a keyboard, eyes half closed'
---

This post exists to test the prose styles. It's a draft, so it never reaches
production, the feed, or the sitemap — but it renders in `npm run dev`.

## Headings and text

Body text sits on a comfortable measure with **bold**, *italic*, and
`inline code`. Links in flowing text get an [animated underline](/about) that
retracts on hover.

### A third-level heading

Lists stay tight:

1. First item
2. Second item, with a nested list
   - a sub-point
   - another sub-point
3. Third item

## Code blocks

```ts
type Post = {
  title: string;
  pubDate: Date;
  draft?: boolean;
};

const isPublished = (p: Post): boolean =>
  import.meta.env.DEV || !p.draft;
```

Syntax colors are CSS custom properties, so the block follows the theme toggle.

## Adding images

**Put image files in `src/assets/`**, not `public/`. Astro only optimises the
ones in `src/assets/` — it resizes them, serves modern formats, writes
`width`/`height` onto the tag so nothing shifts as they load, and lazy-loads
anything below the fold. Files in `public/` are shipped byte-for-byte with none
of that.

### Header image (doubles as the share image)

Set it in the frontmatter with a **relative path** from this file:

```yaml
heroImage: ../../assets/loki.webp
heroAlt: 'A black cat lying on a desk beside a keyboard'
```

It renders full-width at the top of the post, and the build also crops a
1200×630 JPEG from it for the Open Graph / Twitter card — so a link to the post
previews with that image in Slack, iMessage, and the rest. `heroAlt` is
required whenever `heroImage` is set.

To use a different image for the share card than the one shown in the post, add
`ogImage: /og/my-post.png` (a file you put in `public/og/`); it overrides the
derived one.

### Inline images in the body

```md
![Alt text describing the image](../../assets/diagram.webp)
```

Same rule — relative path into `src/assets/`. Astro processes it into an
optimised `<img>` automatically.

### An image with a caption

Captions need a `<figure>`, which Markdown can't express — so rename the post to
`.mdx` and use the image component:

```mdx
import { Image } from 'astro:assets';
import diagram from '../../assets/diagram.webp';

<figure>
  <Image src={diagram} alt="Request flow through the cache layer" />
  <figcaption>Where the cache sits.</figcaption>
</figure>
```

## Quotes and rules

> A blockquote for the occasional borrowed thought. It should read as an aside,
> not a shout.

---

## Tables

| Metric        | Budget    |
| ------------- | --------- |
| JS per route  | ≤ 30 KB   |
| LCP (mobile)  | ≤ 1.2s    |
| Lighthouse    | ≥ 98      |

That's everything the stylesheet needs to account for.
