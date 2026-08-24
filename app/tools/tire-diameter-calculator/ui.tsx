"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { COMMON_RIMS, measure, rimWidthRangeFor, round, signed, sizesForDiameter } from "../tire-math";

const DEFAULTS = { mode: "size", size: "265/70R17", target: "33", rim: "17" };

/** Height comparison against the rim, drawn to scale. */
function HeightBar({ diameter, rim }: { diameter: number; rim: number }) {
  const box = { w: 250, h: 150 };
  const scale = (box.h - 40) / Math.max(diameter, 1);
  const baseline = box.h - 16;
  const tireH = diameter * scale;
  const rimH = rim * scale;
  return (
    <svg
      className="height-drawing"
      viewBox={`0 0 ${box.w} ${box.h}`}
      role="img"
      aria-label={`Overall diameter ${round(diameter, 2)} inches against a ${rim} inch rim, drawn to scale`}
    >
      <line x1={16} y1={baseline} x2={box.w - 16} y2={baseline} className="ground" />
      <rect x={40} y={baseline - tireH} width={64} height={tireH} rx={4} className="tire-bar" />
      <rect x={150} y={baseline - rimH} width={64} height={rimH} rx={4} className="rim-bar" />
      <text x={72} y={baseline - tireH - 6} textAnchor="middle" className="bar-label">
        {round(diameter, 1)}&quot;
      </text>
      <text x={182} y={baseline - rimH - 6} textAnchor="middle" className="bar-label">
        {rim}&quot;
      </text>
      <text x={72} y={baseline + 12} textAnchor="middle" className="axis-label">
        tire
      </text>
      <text x={182} y={baseline + 12} textAnchor="middle" className="axis-label">
        rim
      </text>
    </svg>
  );
}

export function TireDiameterCalculator() {
  const { values, set, reset } = useToolState("tire-diameter", DEFAULTS);
  const mode = values.mode ?? DEFAULTS.mode;
  const sizeInput = values.size ?? DEFAULTS.size;
  const target = Number(values.target ?? DEFAULTS.target) || 0;
  const rim = Number(values.rim ?? DEFAULTS.rim) || 0;

  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);
  const matches = useMemo(
    () => (mode === "target" ? sizesForDiameter({ targetDiameter: target, rim, tolerancePct: 3 }) : []),
    [mode, target, rim],
  );

  const summary =
    mode === "size" && geometry
      ? [
          `${geometry.size.label}`,
          `Overall diameter: ${round(geometry.diameter, 2)} in (${round(geometry.diameter * 25.4, 0)} mm)`,
          `Radius: ${round(geometry.diameter / 2, 2)} in`,
          `Sidewall: ${round(geometry.sidewall, 2)} in per side`,
        ].join("\n")
      : matches.length > 0
        ? [`Sizes near ${target}" on a ${rim}" rim:`, ...matches.slice(0, 6).map((m) => `  ${m.geometry.size.label} — ${round(m.geometry.diameter, 2)}" (${signed(m.diff)}")`)].join("\n")
        : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">DIAMETER, BOTH DIRECTIONS</span>
        <h2 id="calculator-title">From a size, or toward a height</h2>
        <p>
          Most calculators only go one way. The more useful direction is usually the reverse — you know
          you want a 33-inch tire on a 17-inch wheel, and what you actually need is the list of sizes
          that get you there.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose a direction">
        <button type="button" className={mode === "size" ? "active" : ""} onClick={() => set("mode", "size")}>
          I have a size
        </button>
        <button type="button" className={mode === "target" ? "active" : ""} onClick={() => set("mode", "target")}>
          I want a height
        </button>
      </div>

      {mode === "size" ? (
        <>
          <div className="tool-inputs single">
            <Field
              label="Tire size"
              value={sizeInput}
              onChange={(value) => set("size", value)}
              placeholder="265/70R17"
              hint="Metric or flotation — 33x12.50R17 works too"
              invalid={Boolean(sizeInput) && !geometry}
            />
          </div>

          {!geometry && sizeInput && (
            <p className="tool-error" role="alert">
              That size is not readable yet. The expected form is <b>265/70R17</b>.
            </p>
          )}

          {geometry && (
            <div className="tool-result-split">
              <HeightBar diameter={geometry.diameter} rim={geometry.size.rim} />
              <div className="tool-metrics">
                <Metric label="Overall diameter" value={`${round(geometry.diameter, 2)}"`} note={`${round(geometry.diameter * 25.4, 0)} mm`} tone="good" />
                <Metric label="Radius" value={`${round(geometry.diameter / 2, 2)}"`} note="Centre of the axle to the ground, unloaded" />
                <Metric label="Sidewall per side" value={`${round(geometry.sidewall, 2)}"`} note="Two of these sit inside the diameter" />
                <Metric label="Rim diameter" value={`${geometry.size.rim}"`} note={`${round((geometry.size.rim / geometry.diameter) * 100, 0)}% of overall height`} />
                <Metric label="Rubber above the rim" value={`${round(geometry.diameter - geometry.size.rim, 2)}"`} note="Both sidewalls combined" />
                <Metric label="Nearest whole inch" value={`${Math.round(geometry.diameter)}"`} note="How it would be described in flotation terms" />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="tool-inputs pair">
            <StepField
              label="Target diameter"
              value={values.target ?? DEFAULTS.target}
              onChange={(value) => set("target", value)}
              step={0.5}
              min={20}
              max={44}
              suffix="in"
              hint="The height you are aiming for"
            />
            <StepField
              label="Rim diameter"
              value={values.rim ?? DEFAULTS.rim}
              onChange={(value) => set("rim", value)}
              step={1}
              min={13}
              max={24}
              suffix="in"
              hint="The wheel you intend to keep"
            />
          </div>

          <div className="quick-sizes">
            <small>Common rims</small>
            {COMMON_RIMS.map((size) => (
              <button
                type="button"
                key={size}
                className={size === rim ? "active" : ""}
                onClick={() => set("rim", String(size))}
              >
                {size}&quot;
              </button>
            ))}
          </div>

          {matches.length === 0 ? (
            <p className="tool-error" role="alert">
              No manufactured size lands within 3% of {round(target, 1)}&quot; on a {rim}&quot; rim. Try a
              different rim diameter — a target that far from the wheel size may need a taller or shorter
              wheel to reach.
            </p>
          ) : (
            <div className="table-scroll">
              <table className="diagnostic-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Overall diameter</th>
                    <th>Difference</th>
                    <th>Section width</th>
                    <th>Suits rim width</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match, index) => {
                    const band = rimWidthRangeFor(match.geometry.size.width);
                    return (
                      <tr key={match.geometry.size.label} className={index === 0 ? "row-active" : undefined}>
                        <th>{match.geometry.size.label}</th>
                        <td>{round(match.geometry.diameter, 2)}&quot;</td>
                        <td>
                          {signed(match.diff)}&quot; ({signed(match.diffPct, 1)}%)
                        </td>
                        <td>{round(match.geometry.sectionWidth, 2)}&quot;</td>
                        <td>
                          {band.min}&quot;–{band.max}&quot;
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {matches.length > 0 && (
            <p className="tool-next">
              Closest match is <b>{matches[0].geometry.size.label}</b> at{" "}
              {round(matches[0].geometry.diameter, 2)}&quot; — {signed(matches[0].diff)}&quot; from your
              target. Section width matters as much as height, so check the rim-width column against the
              wheel you actually have.
            </p>
          )}
        </>
      )}

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Comparing against what is fitted now?{" "}
        <Link href="/tools/tire-size-comparison">
          The comparison tool shows the clearance and speedometer consequences
        </Link>
        .
      </p>
    </section>
  );
}
