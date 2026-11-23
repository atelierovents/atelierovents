/**
 * URL d'un instrument, dérivée de son nom affiché.
 *
 * L'adresse d'une fiche se lit donc comme son titre — `/occasions/trombone-
 * complet-selmer-1200-n11948` — et non comme le nom du fichier Markdown, qui
 * n'est qu'un détail d'organisation interne (« exemple.md »).
 *
 * Conséquence à connaître : renommer un instrument change son adresse. Les
 * liens déjà partagés vers l'ancienne adresse cessent alors de fonctionner.
 */
export const instrumentSlug = (title: string): string =>
  title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // é, ô, à… -> e, o, a
    .toLowerCase()
    .replace(/°/g, '') // « n° 12705 » -> « n12705 », sans tiret parasite
    .replace(/[^a-z0-9]+/g, '-') // espaces et ponctuation -> tiret
    .replace(/^-+|-+$/g, '') || 'instrument';

/**
 * Associe chaque entrée à son adresse, en départageant les noms identiques
 * (`-2`, `-3`…). Le calcul vit ici pour que la liste et les routes ne puissent
 * pas diverger — c'est exactement le décalage qui produisait des 404.
 */
export function instrumentSlugs(
  instruments: ReadonlyArray<{ id: string; data: { title: string } }>,
): Map<string, string> {
  const uses = new Map<string, number>();
  const slugs = new Map<string, string>();

  for (const instrument of instruments) {
    const base = instrumentSlug(instrument.data.title);
    const count = (uses.get(base) ?? 0) + 1;
    uses.set(base, count);
    slugs.set(instrument.id, count === 1 ? base : `${base}-${count}`);
  }

  return slugs;
}
