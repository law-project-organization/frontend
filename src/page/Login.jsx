import React, { useState } from "react";
import api from "../api/baseApi"; // baseApi 경로에 따라 수정  

const pointBlue = "#2563eb"; // tailwind blue-600 계열

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.username || !form.password) {
      setMsg("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      // 실제 엔드포인트 명확히 알면 경로 수정 (예: /auth/login)
      await api.post("/auth/login", {
        username: form.username,
        password: form.password,
      });
      setMsg("로그인 성공!");
      // 로그인 성공 후 리다이렉트, 상태 관리 등 추가 구현 가능
    } catch (err) {
      setMsg("로그인 실패: " + (err?.message || "에러"));
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
      <form onSubmit={handleLogin} style={{
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
        }}>로그인</h2>
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
          autoComplete="current-password"
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
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {msg && (
          <div style={{
            color: msg.includes("성공") ? pointBlue : "crimson",
            marginTop: 10,
            textAlign: "center",
            fontWeight: 500
          }}>{msg}</div>
        )}
      </form>
    </div>
  );
}
