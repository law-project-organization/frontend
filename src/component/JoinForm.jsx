import React, { useState } from "react";
import api from "@/api/BaseApi";
import "@/css/JoinPage.css";

export default function JoinForm() {
  const [form, setForm] = useState({
    email: "",
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

    if (!form.email || !form.password || !form.passwordCheck) {
      setMsg("모든 항목을 입력하세요.");
      return;
    }
    if (form.password !== form.passwordCheck) {
      setMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/join", {
        email: form.email,
        password: form.password,
        passwordCheck : form.passwordCheck
      });
      setMsg("회원가입이 완료되었습니다!");
      setForm({ email: "", password: "", passwordCheck: "" });
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
          name="email"
          type="text"
          placeholder="이메일"
          autoComplete="email"
          value={form.email}
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
