import type { TroubleCodeGuide } from "./trouble-code-data";

/**
 * Diagnostic-path diagram for a trouble-code page.
 *
 * Built from the record's own `causes` array — each cause paired with the
 * first test that separates it. Nothing here is invented: the diagram is a
 * visual index of the cause matrix already published on the page, which is
 * what a reader actually needs at the top of a diagnosis.
 *
 * Deliberately not drawn: cylinder layouts, sensor locations or wiring
 * positions. Those are engine-specific geometry the records do not carry.
 */

const C = {
  bg: "#0c1418",
  grid: "#19252b",
  line: "#40515a",
  panel: "#101b21",
  muted: "#71858f",
  text: "#dbe3e6",
  dim: "#9aa6ad",
  orange: "#ff6b00",
  blue: "#34a3ff",
};
const MONO = "'Cascadia Code','SFMono-Regular',Consolas,monospace";
const W = 640;
const ROW_H = 62;
const TOP = 96;

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const round = (n: number) => Math.round(n * 100) / 100;

/** Greedy wrap for a monospace run of roughly `cpl` characters per line. */
function wrap(text: string, cpl: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > cpl && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = next;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines) {
    const consumed = lines.join(" ").length;
    if (consumed < text.length - 1) {
      lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[,;:.\s]+$/, "")}…`;
    }
  }
  return lines;
}

const label = (
  x: number,
  y: number,
  text: string,
  size = 10,
  fill = C.muted,
  anchor = "middle",
  weight = 700,
) =>
  `<text x="${round(x)}" y="${round(y)}" fill="${fill}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="0.6">${esc(text)}</text>`;

export type TroubleCodeDiagram = { svg: string; alt: string };

export function buildTroubleCodeSvg(guide: TroubleCodeGuide): TroubleCodeDiagram | null {
  const causes = guide.causes.slice(0, 5);
  if (causes.length < 2) return null;

  const height = TOP + causes.length * ROW_H + 46;
  const codeX = 78;
  const causeX = 168;
  const causeW = 196;
  const testX = 392;
  const testW = 224;

  const rows = causes
    .map((item, i) => {
      const y = TOP + i * ROW_H;
      const mid = y + ROW_H / 2 - 6;
      const causeLines = wrap(item.cause, 30, 2);
      const testLines = wrap(item.firstTest, 34, 3);
      const causeText = causeLines
        .map((line, k) => label(causeX + 12, mid - (causeLines.length - 1) * 6 + k * 12 + 4, line, 9.5, C.text, "start", 600))
        .join("");
      const testText = testLines
        .map((line, k) => label(testX + 12, mid - (testLines.length - 1) * 6 + k * 11 + 4, line, 9, C.dim, "start", 500))
        .join("");
      return `<g>
<rect x="${causeX}" y="${round(y + 6)}" width="${causeW}" height="${ROW_H - 14}" rx="5" fill="${C.panel}" stroke="${i === 0 ? C.orange : "#466170"}" stroke-width="${i === 0 ? 2 : 1.4}"/>
<circle cx="${causeX - 14}" cy="${round(mid)}" r="10" fill="${C.bg}" stroke="${i === 0 ? C.orange : "#466170"}" stroke-width="1.6"/>
${label(causeX - 14, round(mid) + 4, String(i + 1), 10, i === 0 ? C.orange : C.blue)}
${causeText}
<path d="M${causeX + causeW + 6} ${round(mid)} H${testX - 8}" stroke="#3a4c56" stroke-width="1.4" marker-end="url(#arrow)"/>
<rect x="${testX}" y="${round(y + 6)}" width="${testW}" height="${ROW_H - 14}" rx="5" fill="rgba(16,27,33,.55)" stroke="#2f3f48" stroke-width="1"/>
${testText}
</g>`;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="${W}" height="${height}" role="img" aria-labelledby="tcTitle tcDesc" preserveAspectRatio="xMidYMid meet"><title id="tcTitle">${esc(`${guide.code} diagnostic path`)}</title><desc id="tcDesc">${esc(`${guide.code} on the Ford F-150 5.0L: ${causes.length} candidate causes, each paired with the first test that separates it.`)}</desc><defs><pattern id="g" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern><marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 1L7 4L0 7z" fill="#3a4c56"/></marker></defs>
<rect width="${W}" height="${height}" fill="${C.bg}"/><rect width="${W}" height="${height}" fill="url(#g)"/>
${label(W / 2, 32, `${guide.code} — WHERE TO START`, 11, C.orange)}
${label(W / 2, 50, "EACH CANDIDATE CAUSE WITH THE TEST THAT RULES IT IN OR OUT", 8, C.muted)}
${label(causeX + 12, 78, "CANDIDATE CAUSE", 8.5, C.muted, "start")}
${label(testX + 12, 78, "FIRST USEFUL TEST", 8.5, C.muted, "start")}
<line x1="${causeX - 30}" y1="86" x2="${W - 24}" y2="86" stroke="${C.line}" stroke-width="1"/>
<rect x="24" y="${TOP + 6}" width="${codeX - 34}" height="${causes.length * ROW_H - 14}" rx="6" fill="${C.panel}" stroke="${C.orange}" stroke-width="1.6"/>
${label(24 + (codeX - 34) / 2, TOP + (causes.length * ROW_H) / 2, guide.code, 13, C.orange, "middle", 800)}
${rows}
${label(W / 2, height - 16, "Order is evidence-driven, not a probability ranking — start from freeze-frame data", 8, C.dim)}
</svg>`;

  return {
    svg,
    alt: `${guide.code} diagnostic path for the Ford F-150 5.0L: ${causes
      .map((c) => c.cause)
      .join("; ")} — each paired with its first useful test.`,
  };
}
