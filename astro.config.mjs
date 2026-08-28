// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.grantcox.net',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/drafts/'),
		}),
	],
	// Motion and page transitions are pure CSS — no client router, no hydration.
	prefetch: false,
	markdown: {
		// Syntax colors come from CSS custom properties we define per theme,
		// so highlighted code follows the light/dark toggle for free.
		shikiConfig: { theme: 'css-variables', wrap: true },
	},
});
