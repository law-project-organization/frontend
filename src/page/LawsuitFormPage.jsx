import React, { useState } from "react";
import LawsuitForm from "@/component/LawsuitForm";
import LawsuitResultForm from "@/component/LawsuitResultForm";
import "@/css/LawsuitFormPage.css";

export default function LawsuitFormPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [refs, setRefs] = useState([]);
  const [remainCount, setRemainCount] = useState(3); // 오늘 남은 작성 횟수: 예시로 3

  const handleFormSubmit = async (form) => {
    setLoading(true);
    setResult("");
    setRefs([]);
    try {
      const resp = await fetch("http://localhost:8000/generate-complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // form 안에 docType 포함됨
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${resp.status}`);
      }
      const data = await resp.json();
      setResult(data.result);
      setRefs(data.references || []);
      setRemainCount((c) => Math.max(0, c - 1));
    } catch (e) {
      setResult(`에러: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2>AI 법률문서 초안 작성 서비스</h2>

      {/* 안내 배너 */}
      <div className="notice">
        [안내] 본 서비스는 법률 자문이 아니며 생성 결과는 참고용 초안입니다. 사용 전 반드시 변호사 등 전문가의 검토를 받으세요.
      </div>

      {/* 상단 남은 횟수 */}
      <div className="quota">오늘 남은 작성 횟수: {remainCount}/3</div>

      <LawsuitForm onSubmit={handleFormSubmit} submitting={loading} />

      {loading && <div className="loading-text">생성 중입니다...</div>}
      {result && <LawsuitResultForm result={result} refs={refs} />}

      {/* 하단 남은 횟수 */}
      <div className="quota bottom">오늘 남은 작성 횟수: {remainCount}/3</div>
    </div>
  );
}
