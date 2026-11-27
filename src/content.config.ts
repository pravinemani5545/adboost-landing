import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { diagramsSchema } from './kit/diagram/schema';

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
    // Diagrams of a table or list in the post: id -> spec (src/kit/diagram/types.ts). Each id
    // is placed by a "<!-- diagram: id -->" line directly above its table or list, and every
    // string and number in a spec must already be in the post. Adding one is not a copy
    // change: never bump updatedDate for it.
    diagrams: diagramsSchema.optional(),
  }),
});

export const collections = { blog };
