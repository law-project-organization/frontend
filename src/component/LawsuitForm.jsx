import React, { useState } from "react";
import "@/css/LawsuitForm.css";

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
    <div className="law-suit-form-container">
      <form onSubmit={handleSubmit} className="law-suit-form">
        <div className="law-suit-input">
          <label className="law-suit-label">
            사건유형
            <input
              name="caseType"
              value={form.caseType}
              onChange={handleChange}
              placeholder="예: 대여금, 손해배상(기)"
              className="law-suit-input-field"
            />
          </label>

          <label className="law-suit-label">
            사실관계
            <textarea
              name="facts"
              value={form.facts}
              onChange={handleChange}
              rows={6}
              placeholder="사실관계를 자세히 작성해 주세요."
              className="law-suit-textarea"
            />
          </label>

          <label className="law-suit-label">
            청구취지
            <textarea
              name="claims"
              value={form.claims}
              onChange={handleChange}
              rows={4}
              placeholder="예: 피고는 원고에게 금 ○○원을 지급하라 등"
              className="law-suit-textarea"
            />
          </label>

          <label className="law-suit-label">
            첨부문서
            <input
              name="attachments"
              value={form.attachments}
              onChange={handleChange}
              placeholder="예: 차용증 사본, 계좌이체내역"
              className="law-suit-input-field"
            />
          </label>
        </div>
        <button type="submit" className="law-suit-submit-btn">AI로 소장 작성</button>
      </form>
    </div>
  );
}
