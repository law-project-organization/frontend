import React, { useState } from "react";
import api from "../api/baseApi"; // baseApi 경로에 따라 수정

const pointBlue = "#2563eb"; // tailwind 'blue-600' 계열

export default function Join() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 회원가입 요청
  const handleJoin = async (e) => {
    e.preventDefault();
    setMsg("");

    // 간단한 유효성 검사
    if (!form.username || !form.password || !form.passwordCheck) {
      setMsg("모든 항목을 입력하세요.");
      return;
    }
    if (form.password !== form.passwordCheck) {
      setMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      // 실제 API 주소 맞게 수정 (예시: /auth/join)
      await api.post("/auth/join", {
        username: form.username,
        password: form.password,
      });
      setMsg("회원가입이 완료되었습니다!");
      setForm({ username: "", password: "", passwordCheck: "" });
    } catch (err) {
      // 에러 메시지 세팅
      setMsg(err?.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form onSubmit={handleJoin} style={{
        width: 320,
        padding: 32,
        borderRadius: 16,
        boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}>
        <h2 style={{
          color: pointBlue,
          fontWeight: 700,
          fontSize: 28,
          textAlign: "center"
        }}>회원가입</h2>
        <input
          name="username"
          type="text"
          placeholder="아이디"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          style={{
            padding: "12px 16px",
            border: `1.5px solid ${pointBlue}`,
            borderRadius: 8,
            fontSize: 16,
            outline: "none"
          }}
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          style={{
            padding: "12px 16px",
            border: `1.5px solid ${pointBlue}`,
            borderRadius: 8,
            fontSize: 16,
            outline: "none"
          }}
          disabled={loading}
        />
        <input
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          value={form.passwordCheck}
          onChange={handleChange}
          style={{
            padding: "12px 16px",
            border: `1.5px solid ${pointBlue}`,
            borderRadius: 8,
            fontSize: 16,
            outline: "none"
          }}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            background: pointBlue,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "14px 0",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 1,
            cursor: "pointer",
            opacity: loading ? 0.5 : 1
          }}
          disabled={loading}
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
        {msg && (
          <div style={{
            color: msg.includes("완료") ? pointBlue : "crimson",
            marginTop: 10,
            textAlign: "center",
            fontWeight: 500
          }}>{msg}</div>
        )}
      </form>
    </div>
  );
}
