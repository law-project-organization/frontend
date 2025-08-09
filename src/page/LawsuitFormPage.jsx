import React, { useState } from "react";
import LawsuitForm from "./LawsuitForm";

export default function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [refs, setRefs] = useState([]);

  const handleFormSubmit = async (form) => {
    setLoading(true);
    setResult("");
    setRefs([]);
    try {
      const resp = await fetch("http://localhost:8000/generate-complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${resp.status}`);
      }
      const data = await resp.json();
      setResult(data.result);
      setRefs(data.references || []);
    } catch (e) {
      setResult(`에러: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>AI 소장 자동 작성 서비스</h2>
      <LawsuitForm onSubmit={handleFormSubmit} />
      {loading && <div style={{ marginTop: 16 }}>생성 중입니다...</div>}

      {result && (
        <div style={{ marginTop: 24, padding: 18, background: "#f8f8f8", borderRadius: 8 }}>
          <h3>▶️ [AI 자동 소장 결과]</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>

          {refs.length > 0 && (
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.8 }}>
              <div>참고한 양식 (Top-{refs.length})</div>
              <ul>
                {refs.map((r) => (
                  <li key={r.id}>
                    #{r.id} • {r.filename || "unknown"} • score={r.score.toFixed(3)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
