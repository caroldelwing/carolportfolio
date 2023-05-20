import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		schema: z.object({
			title: z.string(),
			publishDate: z.coerce.date(),
			img: z.string(),
			img_alt: z.string().optional(),
			link_to_redirect: z.string(),	
		}),
	}),
};
