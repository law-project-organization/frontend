import React from "react";
import "@/css/LawsuitResultForm.css";

export default function LawsuitResultForm({ result, refs }) {
  return (
    <div className="result-box">
      <h3 className="result-title">▶️ [AI 자동 소장 결과]</h3>
      <pre className="result-text">{result}</pre>

      {refs?.length > 0 && (
        <div className="ref-list">
          <div className="ref-title">참고한 양식 (Top-{refs.length})</div>
          <ul className="ref-ul">
            {refs.map((r) => (
              <li key={r.id} className="ref-li">
                #{r.id} • {r.filename || "unknown"} • score={r.score.toFixed(3)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
