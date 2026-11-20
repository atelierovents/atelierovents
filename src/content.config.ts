import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection pour les pages fixes (accueil, atelier, contact, mentions légales, occasions)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

// Collection pour les instruments d'occasion
const occasions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/occasions' }),
  schema: z.object({
    title: z.string(),
    marque: z.string().optional(),
    prix: z.number().optional(),
    etat: z.string().optional(),
    photo: z.string().optional(),
    galerie: z.array(z.string()).optional(),
  }),
});

export const collections = { pages, occasions };
