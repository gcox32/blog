# Working in this repo

**Read `ETHOS.md` first.** Every decision here answers to it: lean bundles, fast
builds, near-zero client JS, static output, whimsy only via CSS. If a change
can't be justified against the ethos or breaks a budget in it, don't make it.

## Stack

- **Astro** (v7), static output, deployed to Vercel at `blog.grantcox.net`.
- No database. Content is Markdown/MDX in `src/content/posts/`.
- No client framework. The only JavaScript on the site is two small
  `is:inline` scripts (theme init in `BaseHead.astro`, toggle in
  `ThemeToggle.astro`). Keep it that way.
- Page transitions are native CSS (`@view-transition`). Do not add
  `<ClientRouter />` or any hydrated component without a discussion.

## Layout

- `src/content.config.ts` — post frontmatter schema.
- `src/lib/posts.ts` — `getPosts()` (drafts excluded in prod), `readingMinutes()`.
- `src/layouts/Base.astro` — html shell, header, footer.
- `src/layouts/Post.astro` — single-post chrome.
- `src/styles/global.css` — the whole design system: tokens, dark mode, prose,
  motion. One file on purpose.
- `scripts/make-og.mjs` — regenerates `public/og-default.png`. Per-post images
  go in `public/og/` and are referenced by a post's `ogImage` field.

## Commands

```
npm run dev      # local dev (drafts visible)
npm run build    # static build to dist/
npm run preview  # serve the build
npm run check    # astro check (types + templates)
```

## Adding a post

Create `src/content/posts/<slug>.md` with frontmatter: `title`, `description`,
`pubDate` (required); `updatedDate`, `draft`, `heroImage`, `heroAlt`, `ogImage`
(optional). The URL is `/posts/<slug>/`.

`heroImage` is a relative path into `src/assets/` (e.g. `../../assets/x.webp`).
`Post.astro` renders it full-width at the top of the post AND runs it through
`getImage()` to emit a 1200×630 JPEG for the `og:image` / `twitter:image` tags.
`heroAlt` is required whenever `heroImage` is set (enforced in the schema).
`ogImage` (a path under `/public`) overrides the derived social image.
Image-handling docs for authors live in the `prose-and-code` reference post.
