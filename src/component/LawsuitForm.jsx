import React, { useMemo, useState } from "react";
import "@/css/LawSuitForm.css"; 

/**
 * 문서 유형별 동적 폼 스키마
 * - 각 필드는 id/label/type/placeholder/required 로 구성
 * - 공통 필드는 공통 스키마로 관리하고, 문서별로 추가/대체 가능
 */
const DOC_TYPES = [
  { value: "소장", label: "소장" },
  { value: "고소장", label: "고소장" },
  { value: "고발장", label: "고발장" },
  { value: "답변서", label: "답변서" },
  { value: "항소장", label: "항소장" },
  { value: "준비서면", label: "준비서면" },
];

const COMMON_FIELDS = [
  {
    id: "caseType",
    label: "사건 유형 (자유 입력)",
    type: "input",
    placeholder: "예: 대여금, 손해배상, 사기, 폭행 등",
    required: true,
  },
  {
    id: "facts",
    label: "사실관계",
    type: "textarea",
    placeholder:     "사건의 경위와 사실을 날짜 순으로 구체적으로 작성하세요.\n" +
    "- 언제, 어디서, 누가, 무엇을, 어떻게 했는지\n" +
    "- 계약 내용 또는 약정 사항(있다면)\n" +
    "- 피해 내용 및 피해 규모",
    required: true,
  },
  {
    id: "claims",
    label: "청구취지",
    type: "textarea",
    placeholder: "예: 피고는 원고에게 금 00원을 지급하라 등",
    required: true,
  },
  {
    id: "attachments",
    label: "첨부문서",
    type: "input",
    placeholder: "예: 차용증 사본, 계좌이체내역",
    required: false,
  },
];

// 문서별로 필드 가감/레이블 변경
const SCHEMAS = {
  소장: COMMON_FIELDS,
  고소장: [
    {
      id: "suspectInfo",
      label: "피고소인 및 범죄 개요",
      type: "textarea",
      placeholder: "피고소인 이름/관계, 범죄 일시·장소",
      required: true,
    },
    {
      id: "facts",
      label: "범죄 경위 및 피해 내용",
      type: "textarea",
      placeholder: "수단·지속시간·위력, 피해 정도",
      required: true,
    },
    {
      id: "evidenceClaim",
      label: "증거 및 요청 사항",
      type: "textarea",
      placeholder: "증거·목격자, 처벌 의사·합의 여부",
      required: true,
    },
    {
      id: "attachments",
      label: "첨부문서",
      type: "textarea",
      placeholder: "예: 사진, 녹취록, 진단서 등",
      required: false,
    },
  ],

  고발장: [
    {
      id: "accusedInfo",
      label: "피고발인 및 사건 개요",
      type: "textarea",
      placeholder: "피고발인 이름/직위/소속, 위법행위 일시·장소",
      required: true,
    },
    {
      id: "facts",
      label: "위법행위 내용",
      type: "textarea",
      placeholder: "구체적인 행위 경위, 위법성 판단 근거",
      required: true,
    },
    {
      id: "evidenceClaim",
      label: "증거 및 요청 사항",
      type: "textarea",
      placeholder: "증거·참고인, 처벌·수사 요청",
      required: true,
    },
    {
      id: "attachments",
      label: "첨부문서",
      type: "textarea",
      placeholder: "예: 계약서 사본, 거래내역, 녹취록 등",
      required: false,
    },
  ],

  답변서: [
    {
      id: "caseSummary",
      label: "사건 개요",
      type: "textarea",
      placeholder: "사건번호, 당사자, 원고 주장 요약",
      required: true,
    },
    {
      id: "rebuttal",
      label: "반박 내용",
      type: "textarea",
      placeholder: "원고 주장에 대한 사실·법리 반박, 증거 근거 포함",
      required: true,
    },
    {
      id: "claims",
      label: "결론 및 신청 취지",
      type: "textarea",
      placeholder: "원고 청구 기각, 소송비용 원고 부담 등",
      required: true,
    },
    {
      id: "attachments",
      label: "첨부문서",
      type: "textarea",
      placeholder: "예: 거래내역, 사진, 녹취록 등",
      required: false,
    },
  ],

  항소장: [
    {
      id: "trialSummary",
      label: "원심 판결 요지",
      type: "textarea",
      placeholder: "사건번호, 선고일, 재판부, 결론 요약",
      required: true,
    },
    {
      id: "appealRelief",
      label: "항소 취지",
      type: "textarea",
      placeholder: "예: 원심 판결 전부 취소, 피고는 원고에게 금 ○○원 지급",
      required: true,
    },
    {
      id: "appealReasons",
      label: "항소 이유 요지",
      type: "textarea",
      placeholder: "사실오인, 법리오해, 증거채택 오류 등 간단히",
      required: true,
    },
  ],

  준비서면: [
    {
      id: "issues",
      label: "쟁점 및 사건 개요",
      type: "textarea",
      placeholder: "사건번호, 당사자, 주요 쟁점 및 사건 배경",
      required: true,
    },
    {
      id: "argument",
      label: "주장 요지 및 근거",
      type: "textarea",
      placeholder: "청구원인 사실, 법리·판례, 손해액·증거계획 등",
      required: true,
    },
    {
      id: "claims",
      label: "결론 및 신청 취지",
      type: "textarea",
      placeholder: "예: 원고 청구 인용/기각, 소송비용 부담 등",
      required: true,
    },
    {
      id: "attachments",
      label: "첨부문서",
      type: "textarea",
      placeholder: "예: 증거 목록, 참고자료 등",
      required: false,
    },
  ],

};

export default function LawsuitForm({ onSubmit, submitting = false }) {
  const [docType, setDocType] = useState("소장");

  // 현재 선택된 문서 형식의 스키마
  const fields = useMemo(() => SCHEMAS[docType] || COMMON_FIELDS, [docType]);

  // 폼 상태
  const [form, setForm] = useState(() => {
    const base = { docType };
    fields.forEach((f) => (base[f.id] = ""));
    return base;
  });

  // 문서 형식 변경 시 필드 초기화
  const handleDocTypeChange = (e) => {
    const nextType = e.target.value;
    setDocType(nextType);
    const nextFields = SCHEMAS[nextType] || COMMON_FIELDS;
    const nextForm = { docType: nextType };
    nextFields.forEach((f) => (nextForm[f.id] = ""));
    setForm(nextForm);
  };

  const handleChange = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="lawsuit-form" onSubmit={handleSubmit}>
      {/* 문서 형식 */}
      <label className="label">문서 형식</label>
      <select
        className="select"
        value={docType}
        onChange={handleDocTypeChange}
        disabled={submitting}
      >
        {DOC_TYPES.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 동적 필드 렌더링 */}
      {fields.map((f) => (
        <div className="field" key={f.id}>
          <label className="label">{f.label}</label>
          {f.type === "textarea" ? (
            <textarea
              className="textarea"
              placeholder={f.placeholder}
              required={f.required}
              value={form[f.id] || ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              disabled={submitting}
              rows={6}
            />
          ) : (
            <input
              className="input"
              type="text"
              placeholder={f.placeholder}
              required={f.required}
              value={form[f.id] || ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              disabled={submitting}
            />
          )}
        </div>
      ))}

      <button className="submit-btn" type="submit" disabled={submitting}>
        {submitting ? "생성 중..." : "AI로 초안 작성"}
      </button>
    </form>
  );
}
