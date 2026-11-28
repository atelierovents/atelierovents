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

// Un bloc de la page Atelier (Bois, Cuivres) : titre, sous-titre, contenu Markdown.
// Il vit dans le fichier de la page pour que l'admin tienne sur un seul écran.
const atelierBlock = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  photo: z.string().optional(),
  photoAlt: z.string().optional(),
  body: z.string().optional(),
});

// Collection pour les pages fixes (accueil, atelier, contact, mentions légales, occasions)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    // Phrase d'accroche facultative, affichée sous le filet du bandeau.
    tagline: z.string().optional(),
    sections: z.array(homeSection).optional(),
    bois: atelierBlock.optional(),
    cuivres: atelierBlock.optional(),
  }),
});

// Collection pour les instruments d'occasion
const occasions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/occasions' }),
  schema: z.object({
    title: z.string(),
    prix: z.number().optional(),
    etat: z.string().optional(),
    // Un instrument vendu garde sa fiche — elle documente l'atelier — mais sort
    // de la liste des occasions disponibles.
    vendu: z.boolean().optional(),
    photo: z.string().optional(),
    // Decap écrit une liste de chemins ; la forme { image } reste tolérée.
    galerie: z.array(z.union([z.string(), z.object({ image: z.string() })])).optional(),
  }),
});

// Instruments proposés à la location : une entrée par instrument, sans page
// dédiée — le tableau de la page Location suffit tant que la flotte reste petite.
const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    title: z.string(),
    famille: z.string(),
    modele: z.string().optional(),
    mensualite: z.number().optional(),
    caution: z.number().optional(),
    etat: z.string().optional(),
    disponible: z.boolean().optional(),
    photo: z.string().optional(),
  }),
});

export const collections = { pages, occasions, locations };
