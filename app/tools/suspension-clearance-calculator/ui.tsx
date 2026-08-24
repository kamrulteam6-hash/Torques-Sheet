"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { remainingClearance } from "../fitment-math";
import { round } from "../tire-math";

const DEFAULTS = { baseline: "1.0", movement: "0.5" };

export function SuspensionClearanceCalculator() {
  const { values, set, reset } = useToolState("suspension-clearance", DEFAULTS);
  const baselineIn = Number(values.baseline ?? DEFAULTS.baseline) || 0;
  const movementIn = Number(values.movement ?? DEFAULTS.movement) || 0;

  const remaining = useMemo(() => remainingClearance(baselineIn, movementIn), [baselineIn, movementIn]);

  const tone = remaining < 0.15 ? "bad" : remaining < 0.35 ? "warn" : "good";

  const summary = [
    `Baseline inner clearance: ${baselineIn}"`,
    `Inward movement: ${movementIn}"`,
    `Remaining clearance: ${round(remaining, 2)}"`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">THE TIGHTER SIDE, USUALLY</span>
        <h2 id="calculator-title">Remaining clearance to the strut or control arm</h2>
        <p>
          Inner clearance is usually tighter than outer clearance, and harder to inspect. Measure the
          current gap between the tire and the strut body or control arm, then subtract however far the
          new setup moves the tire&apos;s inner edge inward.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Measured baseline clearance" value={values.baseline ?? DEFAULTS.baseline} onChange={(v) => set("baseline", v)} step={0.0625} min={0} max={3} suffix="in" hint="Current gap, tire to strut/control arm, at rest" />
        <StepField label="Inward movement" value={values.movement ?? DEFAULTS.movement} onChange={(v) => set("movement", v)} step={0.05} min={-2} max={2} suffix="in" hint="From the wheel fitment calculator's inner edge figure" />
      </div>

      <Verdict
        tone={tone}
        headline={`${round(remaining, 2)}" remaining clearance`}
        detail={
          tone === "good"
            ? "A workable margin at rest. Turn the wheel to full lock in both directions and check by hand — inner clearance can look fine straight ahead and contact only at lock."
            : tone === "warn"
              ? "Tight enough that full-lock contact is a real possibility. Check physically with the wheel turned fully in both directions before finalising this fitment."
              : "Very little or negative margin at rest. This is very likely to contact the strut or control arm, at minimum at full steering lock — reconsider the fitment."
        }
      />

      <div className="tool-metrics wide">
        <Metric label="Remaining clearance" value={`${round(remaining, 2)}"`} note="At rest, straight ahead" tone={tone} />
        <Metric label="Baseline" value={`${baselineIn}"`} note="Measured before the change" />
        <Metric label="Movement" value={`${movementIn}"`} note="Inward is positive" />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <div className="safety-note safety-note-tight">
        <span>!</span>
        <p>
          <strong>Check at full steering lock, not just straight ahead.</strong> Inner clearance is
          usually at its worst with the wheel turned fully in one direction, which this static
          calculation cannot see.
        </p>
      </div>
    </section>
  );
}
