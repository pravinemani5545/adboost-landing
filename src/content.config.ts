import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    ctaHeading: z.string().optional(),
    ctaText: z.string().optional(),
    pubDate: z.coerce.date(),
    // draft: true holds a post out of every surface even after its pubDate.
    draft: z.boolean().optional(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Amir Salihovic'),
    authorTitle: z.string().default('Co-Founder, AdBoost Health'),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    // Best-of posts: the agencies in the order listed (alphabetical, never
    // AdBoost Health). Emitted as ItemList JSON-LD by BlogLayout.astro.
    itemList: z.array(z.object({ name: z.string(), url: z.string().url() })).optional(),
  }),
});

export const collections = { blog };
