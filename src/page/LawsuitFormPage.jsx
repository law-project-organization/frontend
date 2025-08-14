import React, { useState } from "react";
import LawsuitForm from "@/page/LawsuitForm";

export default function App() {
    const [result, setResult] = useState("");

    const handleFormSubmit = (form) => {
        setResult(
            `▶️ [AI 자동 소장 예시]
사건유형: ${form.caseType}
사실관계: ${form.facts}
청구취지: ${form.claims}
첨부문서: ${form.attachments}

[AI가 자동 생성한 소장 예시]
[...여기에 소장 내용이 생성되어 표시됩니다...]`
        );
    };

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
            <h2>AI 소장 자동 작성 서비스</h2>
            <LawsuitForm onSubmit={handleFormSubmit} />
            {result && (
                <div style={{ marginTop: 32, padding: 18, background: "#f8f8f8", borderRadius: 8 }}>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    );
}
