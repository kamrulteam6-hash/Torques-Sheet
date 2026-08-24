"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { remainingClearance } from "../fitment-math";
import { round } from "../tire-math";

const DEFAULTS = { baseline: "1.5", movement: "0.75" };

export function FenderClearanceCalculator() {
  const { values, set, reset } = useToolState("fender-clearance", DEFAULTS);
  const baselineIn = Number(values.baseline ?? DEFAULTS.baseline) || 0;
  const movementIn = Number(values.movement ?? DEFAULTS.movement) || 0;

  const remaining = useMemo(() => remainingClearance(baselineIn, movementIn), [baselineIn, movementIn]);

  const tone = remaining < 0.25 ? "bad" : remaining < 0.5 ? "warn" : "good";

  const summary = [
    `Baseline clearance: ${baselineIn}"`,
    `Outward movement: ${movementIn}"`,
    `Remaining clearance: ${round(remaining, 2)}"`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FROM A MEASURED BASELINE</span>
        <h2 id="calculator-title">Remaining outer clearance after a change</h2>
        <p>
          Measure the current gap between the tire and the fender lip yourself — that measured baseline
          is the only trustworthy starting point. This subtracts however far the new setup moves the
          tire&apos;s outer edge, giving what is actually left.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Measured baseline clearance" value={values.baseline ?? DEFAULTS.baseline} onChange={(v) => set("baseline", v)} step={0.125} min={0} max={4} suffix="in" hint="Current gap, tire to fender lip, at rest" />
        <StepField label="Outward movement" value={values.movement ?? DEFAULTS.movement} onChange={(v) => set("movement", v)} step={0.05} min={-2} max={3} suffix="in" hint="From the wheel fitment or tire comparison calculators" />
      </div>

      <Verdict
        tone={tone}
        headline={`${round(remaining, 2)}" remaining clearance`}
        detail={
          tone === "good"
            ? "A comfortable margin at rest. Still check at full steering lock and full suspension compression, where clearance is always tighter than the static measurement."
            : tone === "warn"
              ? "Getting tight. Check physically at full steering lock and full compression before committing — this static figure is the most generous clearance you will see."
              : "Very little or negative margin at rest, which almost certainly means contact at full lock or full compression. Reconsider the fitment before proceeding."
        }
      />

      <div className="tool-metrics wide">
        <Metric label="Remaining clearance" value={`${round(remaining, 2)}"`} note="At rest — check dynamic clearance too" tone={tone} />
        <Metric label="Baseline" value={`${baselineIn}"`} note="Measured before the change" />
        <Metric label="Movement" value={`${movementIn}"`} note="Outward is positive" />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <div className="safety-note safety-note-tight">
        <span>!</span>
        <p>
          <strong>This is a static calculation.</strong> Real clearance is always tighter at full
          steering lock and full suspension compression than it is with the vehicle sitting still.
          Confirm physically before finalising any tight fitment.
        </p>
      </div>
    </section>
  );
}
