import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				// Drafts build locally but are excluded from production, the feed, and the sitemap.
				draft: z.boolean().default(false),
				// Header image. Lives in src/assets/, referenced relatively from the post,
				// e.g. heroImage: ../../assets/loki.webp
				// It renders at the top of the post AND becomes the post's social/OG image.
				heroImage: image().optional(),
				// Alt text for heroImage. Required whenever heroImage is set.
				heroAlt: z.string().optional(),
				// Escape hatch: a pre-made social image (path under /public, e.g.
				// "/og/my-post.png"). Overrides the heroImage-derived one.
				ogImage: z.string().optional(),
			})
			.refine((data) => !data.heroImage || data.heroAlt, {
				message: 'heroAlt is required when heroImage is set',
				path: ['heroAlt'],
			}),
});

export const collections = { posts };
