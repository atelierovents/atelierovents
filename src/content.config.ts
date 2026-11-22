import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Une section de l'accueil : bloc texte + photo, affiché en colonnes alternées.
// Les champs facultatifs laissent ajouter la photo et le bouton plus tard sans
// casser le build (une section sans photo passe simplement en pleine largeur).
const homeSection = z.object({
  heading: z.string(),
  text: z.string(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  linkLabel: z.string().optional(),
  linkUrl: z.string().optional(),
});

// Collection pour les pages fixes (accueil, atelier, contact, mentions légales, occasions)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    sections: z.array(homeSection).optional(),
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
    // Decap écrit une liste de chemins ; la forme { image } reste tolérée.
    galerie: z.array(z.union([z.string(), z.object({ image: z.string() })])).optional(),
  }),
});

export const collections = { pages, occasions };
