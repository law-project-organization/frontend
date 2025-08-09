import React, { useState } from "react";

export default function LawsuitForm({ onSubmit }) {
  const [form, setForm] = useState({
    caseType: "",
    facts: "",
    claims: "",
    attachments: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 6 }}>
        사건유형
        <input
          name="caseType"
          value={form.caseType}
          onChange={handleChange}
          placeholder="예: 대여금, 손해배상(기)"
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        사실관계
        <textarea
          name="facts"
          value={form.facts}
          onChange={handleChange}
          rows={6}
          placeholder="사실관계를 자세히 작성해 주세요."
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        청구취지
        <textarea
          name="claims"
          value={form.claims}
          onChange={handleChange}
          rows={4}
          placeholder="예: 피고는 원고에게 금 ○○원을 지급하라 등"
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        첨부문서
        <input
          name="attachments"
          value={form.attachments}
          onChange={handleChange}
          placeholder="예: 차용증 사본, 계좌이체내역"
        />
      </label>

      <button type="submit">AI로 소장 작성</button>
    </form>
  );
}
