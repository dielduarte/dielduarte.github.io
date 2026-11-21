import { defineCollection, z } from 'astro:content';

const localized = z.object({ en: z.string(), 'pt-br': z.string() });

const photos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: localized.optional(),
      alt: localized,
      image: image(),
      date: z.coerce.date(),
      /** Optional until the place is known; the photo is then labelled by its number. */
      place: localized.optional(),
      camera: z.string().optional(),
      lens: z.string().optional(),
      settings: z.string().optional(),
    }),
});

export const collections = { photos };
