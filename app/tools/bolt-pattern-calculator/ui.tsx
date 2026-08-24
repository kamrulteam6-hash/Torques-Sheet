"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { UNIT_EQUIVALENTS, boltPattern, nearbyPatterns, pcdFromChord } from "../bolt-pattern";
import { round } from "../tire-math";

const DEFAULTS = { mode: "pcd", lugs: "5", pcd: "114.3", chord: "67.18" };

/** Stud positions on the pitch circle, drawn to scale. */
function PatternDrawing({ lugs, pcdMm }: { lugs: number; pcdMm: number }) {
  const box = 220;
  const centre = box / 2;
  const radius = box * 0.34;
  const studs = Array.from({ length: Math.max(lugs, 1) }, (_, i) => {
    // Start at the top and work clockwise.
    const angle = (i / lugs) * Math.PI * 2 - Math.PI / 2;
    return { x: centre + Math.cos(angle) * radius, y: centre + Math.sin(angle) * radius, i };
  });

  return (
    <svg
      className="pattern-drawing"
      viewBox={`0 0 ${box} ${box}`}
      role="img"
      aria-label={`${lugs} studs on a ${round(pcdMm, 1)} millimetre pitch circle`}
    >
      <circle cx={centre} cy={centre} r={radius} className="pitch-circle" />
      <circle cx={centre} cy={centre} r={box * 0.11} className="hub-bore" />
      {studs.map((stud) => (
        <circle key={stud.i} cx={stud.x} cy={stud.y} r={7} className="stud" />
      ))}
      {studs.length > 1 && (
        <line x1={studs[0].x} y1={studs[0].y} x2={studs[1].x} y2={studs[1].y} className="chord-line" />
      )}
      <text x={centre} y={centre + 4} textAnchor="middle" className="drawing-rim">
        {lugs}
      </text>
      <text x={centre} y={box - 6} textAnchor="middle" className="axis-label">
        {round(pcdMm, 1)} mm pitch circle
      </text>
    </svg>
  );
}

export function BoltPatternCalculator() {
  const { values, set, reset } = useToolState("bolt-pattern", DEFAULTS);
  const mode = values.mode ?? DEFAULTS.mode;
  const lugs = Math.round(Number(values.lugs ?? DEFAULTS.lugs)) || 5;
  const pcdInput = Number(values.pcd ?? DEFAULTS.pcd) || 0;
  const chordInput = Number(values.chord ?? DEFAULTS.chord) || 0;

  const pcdMm = mode === "chord" ? pcdFromChord(chordInput, lugs) : pcdInput;
  const pattern = useMemo(() => boltPattern(lugs, pcdMm), [lugs, pcdMm]);
  const matches = useMemo(() => nearbyPatterns(lugs, pcdMm), [lugs, pcdMm]);

  const exact = matches.find((match) => match.interchangeable);
  const risky = matches.filter((match) => match.deceptivelyClose);

  const summary = [
    `Bolt pattern: ${pattern.label} (${pattern.labelIn})`,
    `PCD: ${round(pattern.pcdMm, 1)} mm / ${round(pattern.pcdIn, 3)} in`,
    `Adjacent stud spacing: ${round(pattern.chordMm, 2)} mm`,
    exact ? `Matches known pattern: ${exact.pattern.label} — ${exact.used}` : "No exact catalogue match",
    risky.length > 0 ? `Close but NOT compatible: ${risky.map((m) => m.pattern.label).join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">PITCH CIRCLE DIAMETER</span>
        <h2 id="calculator-title">Identify and convert a bolt pattern</h2>
        <p>
          A bolt pattern is a lug count and the diameter of the circle their centres sit on. Enter the
          pattern if you know it, or measure between two adjacent studs and let the tool work backwards.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose an input method">
        <button type="button" className={mode === "pcd" ? "active" : ""} onClick={() => set("mode", "pcd")}>
          I know the pattern
        </button>
        <button type="button" className={mode === "chord" ? "active" : ""} onClick={() => set("mode", "chord")}>
          I measured between studs
        </button>
      </div>

      <div className="tool-inputs pair">
        <StepField
          label="Number of lugs"
          value={values.lugs ?? DEFAULTS.lugs}
          onChange={(value) => set("lugs", value)}
          step={1}
          min={3}
          max={10}
          suffix="lugs"
          hint="Count the studs or bolt holes"
        />
        {mode === "pcd" ? (
          <StepField
            label="Pitch circle diameter"
            value={values.pcd ?? DEFAULTS.pcd}
            onChange={(value) => set("pcd", value)}
            step={0.1}
            min={80}
            max={230}
            suffix="mm"
            hint="The second number, as in 5x114.3"
          />
        ) : (
          <StepField
            label="Adjacent stud centres"
            value={values.chord ?? DEFAULTS.chord}
            onChange={(value) => set("chord", value)}
            step={0.1}
            min={30}
            max={200}
            suffix="mm"
            hint="Centre to centre of two neighbouring studs"
          />
        )}
      </div>

      <Verdict
        tone={exact ? "good" : risky.length > 0 ? "warn" : "warn"}
        headline={
          exact
            ? `${exact.pattern.label} — a standard pattern`
            : `${pattern.label} — no exact catalogue match`
        }
        detail={
          exact
            ? `Also written ${exact.pattern.labelIn} in imperial catalogues. Commonly found on: ${exact.used}. Matching the pattern is necessary but not sufficient — the wheel still has to clear the brakes, match the centre bore and carry a workable offset.${risky.length > 0 ? ` Be careful of ${risky.map((m) => m.pattern.label).join(" and ")}: close enough to thread on, far enough to seat the wheel off-centre.` : ""}`
            : `Nothing in the reference list sits within half a millimetre of ${round(pattern.pcdMm, 1)} mm on ${lugs} lugs. Either the measurement is off — measuring stud centres accurately is genuinely hard on a five-lug hub — or this is an uncommon pattern. Re-measure before ordering anything.`
        }
      />

      <div className="tool-result-split">
        <PatternDrawing lugs={lugs} pcdMm={pcdMm} />
        <div className="tool-metrics">
          <Metric label="Metric designation" value={pattern.label} note="How most catalogues list it" tone="good" />
          <Metric label="Imperial designation" value={pattern.labelIn} note="The same circle in inches" />
          <Metric label="PCD in millimetres" value={`${round(pattern.pcdMm, 2)} mm`} note="Pitch circle diameter" />
          <Metric label="PCD in inches" value={`${round(pattern.pcdIn, 3)}"`} note="Divide by 25.4" />
          <Metric label="Adjacent stud spacing" value={`${round(pattern.chordMm, 2)} mm`} note={`${round(pattern.chordMm / 25.4, 3)}" centre to centre`} />
          <Metric label="Lug count" value={String(lugs)} note="Never interchangeable across counts" />
        </div>
      </div>

      {matches.length > 0 && (
        <div className="table-scroll">
          <table className="diagnostic-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Imperial</th>
                <th>Difference</th>
                <th>Compatible?</th>
                <th>Commonly found on</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.pattern.label} className={match.interchangeable ? "row-active" : undefined}>
                  <th>{match.pattern.label}</th>
                  <td>{match.pattern.labelIn}</td>
                  <td>
                    {match.diffMm === 0
                      ? "—"
                      : `${match.diffMm > 0 ? "+" : "−"}${round(Math.abs(match.diffMm), 1)} mm`}
                  </td>
                  <td>
                    {match.interchangeable ? (
                      <span className="edge-pill">Yes — same circle</span>
                    ) : (
                      <span className="edge-pill rival">No — do not force</span>
                    )}
                  </td>
                  <td>{match.used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Imperial</th>
              <th>Where you see it</th>
            </tr>
          </thead>
          <tbody>
            {UNIT_EQUIVALENTS.map((pair) => (
              <tr key={pair.mm} className={pair.mm === pattern.label ? "row-active" : undefined}>
                <th>{pair.mm}</th>
                <td>{pair.inch}</td>
                <td>{pair.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Pattern confirmed?{" "}
        <Link href="/tools/wheel-offset-calculator">Check the offset next</Link> — a wheel with the right
        pattern still has to sit in the right place. Tightening torque for your vehicle is on its{" "}
        <Link href="/category/torque-specs">lug nut specification page</Link>.
      </p>
    </section>
  );
}
