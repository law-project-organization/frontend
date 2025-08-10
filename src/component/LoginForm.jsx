import React, { useState } from "react";
import api from "@/api/BaseApi";
import "@/css/LoginPage.css";

export default function LoginForm() {
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
      await api.post("/api/v1/auth/login", {
        username: form.username,
        password: form.password,
      });
      setMsg("로그인 성공!");
      // 로그인 성공 후 리다이렉트 등 추가 구현 가능
    } catch (err) {
      setMsg("로그인 실패: " + (err?.message || "에러"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">로그인</h2>
        <input
          name="username"
          type="text"
          placeholder="아이디"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          className="login-input"
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          className="login-input"
          disabled={loading}
        />
        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {msg && (
          <div
            className={
              "login-msg " +
              (msg.includes("성공") ? "success" : "error")
            }
          >
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
