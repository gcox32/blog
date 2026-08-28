import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const isPublished = (post: Post) =>
	import.meta.env.DEV || !post.data.draft;

/** All published posts, newest first. Drafts are included only in dev. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', isPublished);
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/** Rough reading time in minutes from raw Markdown body, floored at 1. */
export function readingMinutes(body: string | undefined): number {
	const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}
