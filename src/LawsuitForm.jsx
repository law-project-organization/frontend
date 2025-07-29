import React, { useState } from "react";

export default function LawsuitForm({ onSubmit }) {
  const [form, setForm] = useState({
    caseType: "",
    facts: "",
    claims: "",
    attachments: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 상위 컴포넌트(App)로 결과 전달
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label>
        사건유형/사건명
        <input
          type="text"
          name="caseType"
          value={form.caseType}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
          placeholder="예) 대여금, 손해배상 등"
        />
      </label>
      <label>
        사실관계
        <textarea
          name="facts"
          value={form.facts}
          onChange={handleChange}
          required
          style={{ width: "100%", height: 60 }}
          placeholder="사건의 경위나 사실을 자세히 작성"
        />
      </label>
      <label>
        청구취지
        <textarea
          name="claims"
          value={form.claims}
          onChange={handleChange}
          required
          style={{ width: "100%", height: 40 }}
          placeholder="법원에 요청하는 내용(예: 대여금 500만원 지급)"
        />
      </label>
      <label>
        첨부문서
        <input
          type="text"
          name="attachments"
          value={form.attachments}
          onChange={handleChange}
          style={{ width: "100%" }}
          placeholder="계약서, 영수증 등"
        />
      </label>
      <button type="submit" style={{ padding: "10px 0", fontWeight: "bold" }}>
        AI로 소장 자동 작성
      </button>
    </form>
  );
}
