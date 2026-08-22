/**
 * Meta description length control.
 *
 * Descriptions are assembled by ~14 different builders as `${title} with a,
 * b, c and d.` Because titles vary in length, no fixed template can guarantee
 * the result fits, so the limit is enforced here instead.
 *
 * Trimming happens at a clause boundary rather than mid-word, so the result
 * still reads as a sentence — Google truncates around 155–160 characters and
 * a cut-off word looks broken in the SERP.
 */

const LIMIT = 160;
/** Below this, a clause boundary is too aggressive a cut to be worth taking. */
const MIN_USEFUL = 90;

export function clampMetaDescription(text: string, limit = LIMIT): string {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= limit) return value;

  const window = value.slice(0, limit);

  // Prefer ending on a complete sentence.
  const sentence = window.lastIndexOf(". ");
  if (sentence >= MIN_USEFUL) return value.slice(0, sentence + 1);

  // Otherwise end on the last complete clause.
  const clause = Math.max(window.lastIndexOf(", "), window.lastIndexOf("; "));
  if (clause >= MIN_USEFUL) return `${value.slice(0, clause)}.`;

  // Last resort: last whole word.
  const space = window.lastIndexOf(" ");
  const cut = space > MIN_USEFUL ? space : limit - 1;
  return `${value.slice(0, cut).replace(/[,;:\s]+$/, "")}.`;
}
