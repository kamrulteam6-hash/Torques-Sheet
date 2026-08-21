"use client";

import { useState } from "react";
import type { TroubleCodeGuide } from "./trouble-code-data";

export function SymptomChecker({ guide }: { guide: TroubleCodeGuide }) {
  const [selected, setSelected] = useState(guide.symptoms[0].key);
  const result = guide.symptoms.find((item) => item.key === selected)!;
  return (
    <section className="symptom-tool" aria-labelledby="symptom-tool-title">
      <div className="content-panel-head">
        <span className="kicker">DIAGNOSTIC ROUTER</span>
        <h2 id="symptom-tool-title">Match the symptom</h2>
        <p>Select the closest observation. The result changes the first test; it does not name a part to replace.</p>
      </div>
      <div className="symptom-options" role="group" aria-label="Choose the closest symptom">
        {guide.symptoms.map((item) => (
          <button key={item.key} className={selected === item.key ? "active" : ""} onClick={() => setSelected(item.key)} type="button">
            {item.label}
          </button>
        ))}
      </div>
      <div className="symptom-result" aria-live="polite">
        <small>START HERE</small>
        <p>{result.response}</p>
      </div>
    </section>
  );
}
