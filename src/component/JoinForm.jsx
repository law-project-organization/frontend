import React, { useState } from "react";
import api from "@/api/BaseApi";
import "@/css/JoinPage.css";

export default function JoinForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setMsg("");

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
      await api.post("/api/v1/auth/join", {
        username: form.username,
        password: form.password,
      });
      setMsg("회원가입이 완료되었습니다!");
      setForm({ username: "", password: "", passwordCheck: "" });
    } catch (err) {
      setMsg(err?.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-bg">
      <form className="join-form" onSubmit={handleJoin}>
        <h2 className="join-title">회원가입</h2>
        <input
          name="username"
          type="text"
          placeholder="아이디"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          className="join-input"
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          className="join-input"
          disabled={loading}
        />
        <input
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          value={form.passwordCheck}
          onChange={handleChange}
          className="join-input"
          disabled={loading}
        />
        <button
          type="submit"
          className="join-btn"
          disabled={loading}
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
        {msg && (
          <div
            className={
              "join-msg " +
              (msg.includes("완료") ? "success" : "error")
            }
          >
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
