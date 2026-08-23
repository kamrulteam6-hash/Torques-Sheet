"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { measure, round } from "../tire-math";

const DEFAULTS = { size: "225/65R17" };

const COMMON = [
  "195/65R15",
  "205/55R16",
  "215/60R16",
  "225/45R17",
  "225/65R17",
  "235/55R18",
  "245/70R17",
  "265/70R17",
  "275/60R20",
  "285/70R17",
  "31X10.50R15",
  "33X12.50R15",
  "35X12.50R17",
];

/** Scale drawing of the tire against its rim, so the sidewall is visible. */
function TireDrawing({ diameter, rim, width }: { diameter: number; rim: number; width: number }) {
  const box = 260;
  const pad = 16;
  const scale = (box - pad * 2) / diameter;
  const centre = box / 2;
  const outerR = (diameter / 2) * scale;
  const rimR = (rim / 2) * scale;
  const halfWidth = (width / 2) * scale;

  return (
    <svg
      className="tire-drawing"
      viewBox={`0 0 ${box} ${box}`}
      role="img"
      aria-label={`Scale drawing: ${round(diameter, 1)} inch overall diameter on a ${rim} inch rim, ${round(width, 1)} inch section width`}
    >
      <circle cx={centre} cy={centre} r={outerR} className="tread" />
      <circle cx={centre} cy={centre} r={rimR} className="rim" />
      <line x1={centre} y1={centre - outerR} x2={centre} y2={centre - rimR} className="sidewall-mark" />
      <line
        x1={centre - halfWidth}
        y1={centre + outerR + 6}
        x2={centre + halfWidth}
        y2={centre + outerR + 6}
        className="width-mark"
      />
      <text x={centre + 6} y={centre - rimR - (outerR - rimR) / 2 + 4} className="drawing-label">
        sidewall
      </text>
      <text x={centre} y={centre + outerR + 18} className="drawing-label" textAnchor="middle">
        section width
      </text>
      <text x={centre} y={centre + 4} className="drawing-rim" textAnchor="middle">
        {rim}&quot;
      </text>
    </svg>
  );
}

export function TireSizeCalculator() {
  const { values, set, reset } = useToolState("tire-size", DEFAULTS);
  const input = values.size ?? DEFAULTS.size;
  const geometry = useMemo(() => measure(input), [input]);

  const summary = geometry
    ? [
        `${geometry.size.label}`,
        `Overall diameter: ${round(geometry.diameter, 2)} in`,
        `Sidewall height: ${round(geometry.sidewall, 2)} in`,
        `Section width: ${round(geometry.sectionWidth, 2)} in (${round(geometry.size.width)} mm)`,
        `Circumference: ${round(geometry.circumference, 2)} in`,
        `Revolutions per mile: ${Math.round(geometry.revsPerMile)}`,
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">ENTER A SIZE</span>
        <h2 id="calculator-title">Measure any tire size</h2>
        <p>
          Type the size exactly as it appears on the sidewall. Metric sizes such as 225/65R17 and
          flotation sizes such as 33x12.50R15 both work, and the service prefix (P, LT, ST) is
          optional — it does not change the geometry.
        </p>
      </div>

      <div className="tool-inputs single">
        <Field
          label="Tire size"
          value={input}
          onChange={(value) => set("size", value)}
          placeholder="225/65R17"
          hint="Also accepts 225 65 17, LT265/70R17 and 33x12.50R15"
          invalid={Boolean(input) && !geometry}
          list="common-tire-sizes"
        />
        <datalist id="common-tire-sizes">
          {COMMON.map((size) => (
            <option key={size} value={size} />
          ))}
        </datalist>
      </div>

      <div className="quick-sizes">
        <small>Common sizes</small>
        {COMMON.slice(0, 8).map((size) => (
          <button
            type="button"
            key={size}
            className={size === input.toUpperCase() ? "active" : ""}
            onClick={() => set("size", size)}
          >
            {size}
          </button>
        ))}
      </div>

      {!geometry && input && (
        <p className="tool-error" role="alert">
          That does not look like a tire size yet. Try the format <b>225/65R17</b> — section width in
          millimetres, aspect ratio, then rim diameter in inches.
        </p>
      )}

      {geometry && (
        <>
          <div className="tool-result-split">
            <TireDrawing
              diameter={geometry.diameter}
              rim={geometry.size.rim}
              width={geometry.sectionWidth}
            />
            <div className="tool-metrics">
              <Metric
                label="Overall diameter"
                value={`${round(geometry.diameter, 2)}"`}
                note={`${round(geometry.diameter * 25.4, 0)} mm`}
              />
              <Metric
                label="Sidewall height"
                value={`${round(geometry.sidewall, 2)}"`}
                note={`${round(geometry.size.width * (geometry.size.aspect / 100), 0)} mm per side`}
              />
              <Metric
                label="Section width"
                value={`${round(geometry.sectionWidth, 2)}"`}
                note={`${round(geometry.size.width, 0)} mm`}
              />
              <Metric
                label="Circumference"
                value={`${round(geometry.circumference, 2)}"`}
                note="One full revolution"
              />
              <Metric
                label="Revolutions per mile"
                value={String(Math.round(geometry.revsPerMile))}
                note="Drives the speedometer and odometer"
              />
              <Metric
                label="Rim diameter"
                value={`${geometry.size.rim}"`}
                note="The wheel this tire mounts on"
              />
            </div>
          </div>

          <div className="sidewall-decode">
            <span className="kicker">READING THE SIDEWALL</span>
            <div className="decode-row">
              <div>
                <b>
                  {geometry.size.flotation
                    ? round(geometry.diameter, 1)
                    : round(geometry.size.width, 0)}
                </b>
                <small>{geometry.size.flotation ? "Overall diameter, inches" : "Section width, millimetres"}</small>
              </div>
              <div>
                <b>{round(geometry.size.aspect, 0)}</b>
                <small>
                  {geometry.size.flotation
                    ? "Implied aspect ratio"
                    : "Aspect ratio — sidewall as a % of width"}
                </small>
              </div>
              <div>
                <b>R</b>
                <small>Radial construction</small>
              </div>
              <div>
                <b>{geometry.size.rim}</b>
                <small>Rim diameter, inches</small>
              </div>
            </div>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Changing size rather than replacing like for like?{" "}
            <Link href={`/tools/tire-size-comparison?from=${encodeURIComponent(geometry.size.label)}`}>
              Compare it against another size
            </Link>{" "}
            to see the clearance and speedometer consequences.
          </p>
        </>
      )}
    </section>
  );
}
