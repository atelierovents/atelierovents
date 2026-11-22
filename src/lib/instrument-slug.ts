/**
 * URL slug of an `occasions` entry.
 *
 * With the content layer, an entry's `id` still carries the `.md` extension
 * (`exemple.md`), while the route and the links pointing at it must not
 * (`/occasions/exemple`). Both sides derive the slug from here so they cannot
 * drift apart again — a mismatch silently produces a 404 on every instrument
 * page, which is exactly what it used to do.
 */
export const instrumentSlug = (id: string): string => id.replace(/\.md$/, '');
