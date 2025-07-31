import React from "react";
import { useNavigate } from "react-router-dom";

const pointBlue = "#2563eb"; // tailwind blue-600

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: 40,
        borderRadius: 24,
        boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
        background: "#fff",
        minWidth: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24
      }}>
        <h1 style={{
          color: pointBlue,
          fontWeight: 800,
          fontSize: 36,
          marginBottom: 8
        }}>Welcome!</h1>
        <div style={{
          color: "#222",
          fontSize: 18,
          textAlign: "center",
          marginBottom: 24
        }}>
          <b>배달의민족</b> 같은 서비스의 <br />
          <span style={{ color: pointBlue }}>메인 페이지</span> 예시입니다.<br />
          지금 바로 회원가입하거나 로그인해서 <br />
          다양한 서비스를 경험해보세요!
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#fff",
              color: pointBlue,
              border: `2px solid ${pointBlue}`,
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "none",
              transition: "all 0.15s"
            }}
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/join")}
            style={{
              background: pointBlue,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "none",
              transition: "all 0.15s"
            }}
          >
            회원가입
          </button>
        </div>
        <div style={{
          fontSize: 14,
          color: "#888",
          textAlign: "center"
        }}>
          <b>서비스 소개</b>: <br />
          안전하고 빠른 음식 배달, 간편한 주문, <br />
          다양한 할인 혜택을 제공합니다.<br />
          <span style={{ color: pointBlue, fontWeight: 500 }}>포인트 컬러는 blue!</span>
        </div>
      </div>
    </div>
  );
}

export default MainPage;