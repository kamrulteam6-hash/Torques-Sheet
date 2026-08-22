/**
 * Standalone so client components can import it without pulling `data.ts` —
 * and therefore the entire spec corpus — into the browser bundle.
 */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
