"use client";

import { useState } from "react";
import type { Comparison } from "./compare-data";

export function ComparisonDecisionTool({ comparison }: { comparison: Comparison }) {
  const [selected, setSelected] = useState(comparison.priorities[0].key);
  const result = comparison.priorities.find((item) => item.key === selected)!;
  return (
    <section className="decision-tool" aria-labelledby="decision-tool-title">
      <div className="content-panel-head">
        <span className="kicker">INTERACTIVE BUYER TOOL</span>
        <h2 id="decision-tool-title">What matters most to you?</h2>
        <p>Choose a priority to see which direction the evidence points. This is a shortlist tool, not a substitute for checking the label on a specific truck.</p>
      </div>
      <div className="decision-options" role="group" aria-label="Choose a truck-buying priority">
        {comparison.priorities.map((item) => (
          <button key={item.key} className={selected === item.key ? "active" : ""} onClick={() => setSelected(item.key)} type="button">
            {item.label}
          </button>
        ))}
      </div>
      <div className="decision-result" aria-live="polite">
        <small>BEST ANSWER FOR THIS PRIORITY</small>
        <strong>{result.winner}</strong>
        <p>{result.reason}</p>
      </div>
    </section>
  );
}
