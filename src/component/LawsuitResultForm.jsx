import React, { useMemo, useState } from "react";
import "@/css/LawsuitResultForm.css";

export default function LawsuitResultForm({ result = "", refs = [] }) {
  const [wrap, setWrap] = useState(true);
  const [showRefs, setShowRefs] = useState(true);

  const sortedRefs = useMemo(
    () => [...(refs || [])].sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0)),
    [refs]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result || "");
      alert("결과가 클립보드에 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.href = url;
    a.download = `ai-complaint-${ts}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!result) {
    return null; // 결과 없으면 렌더링 안 함
  }

  return (
    <div className="result-card">
      <div className="result-card__header">
        <h3 className="result-card__title">AI 생성 결과</h3>
        <div className="result-card__actions">
          <button className="btn ghost" onClick={() => setWrap((w) => !w)}>
            {wrap ? "줄바꿈 해제" : "줄바꿈 적용"}
          </button>
          <button className="btn ghost" onClick={handleCopy}>복사</button>
          <button className="btn primary" onClick={handleDownload}>다운로드</button>
        </div>
      </div>

      <div className={`result-card__body ${wrap ? "wrap" : "nowrap"}`}>
        <pre className="result-text">{result}</pre>
      </div>

      {sortedRefs.length > 0 && (
        <div className="result-card__refs">
          <button
            className="ref-toggle"
            onClick={() => setShowRefs((s) => !s)}
            aria-expanded={showRefs}
          >
            참고한 양식 (Top-{sortedRefs.length})
            <span className={`chev ${showRefs ? "open" : ""}`}>▾</span>
          </button>

          {showRefs && (
            <ul className="ref-list">
              {sortedRefs.map((r) => (
                <li key={r.id} className="ref-item">
                  <span className="ref-file">{r.filename || "unknown"}</span>
                  <span className="ref-meta">
                    <span className="ref-id">#{r.id}</span>
                    <span className="ref-score">score {Number(r.score ?? 0).toFixed(3)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
