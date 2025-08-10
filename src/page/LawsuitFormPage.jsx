import React, { useState } from "react";
import LawsuitForm from "@/component/LawsuitForm";
import LawsuitResultForm from "@/component/LawsuitResultForm";
import "@/css/LawsuitFormPage.css";

export default function LawsuitFormPage() {
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
    <div className="app-container">
      <h2>AI 소장 자동 작성 서비스</h2>
      <LawsuitForm onSubmit={handleFormSubmit} />
      {loading && <div className="loading-text">생성 중입니다...</div>}
      {result && <LawsuitResultForm result={result} refs={refs} />}
    </div>
  );
}
