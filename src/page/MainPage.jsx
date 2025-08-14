import React from "react";
import { useNavigate } from "react-router-dom";
import { SiKakaotalk } from "react-icons/si";
import "@/css/MainPage.css"; // css 파일 import

const videoUrl = "/kovico.mp4"; // 비디오 파일 경로 추후 추가 가능 // mainBackgroundVideo.mp4

function MainPage() {
  const navigate = useNavigate();

  // 카카오톡 소셜 로그인 클릭 핸들러
  const handleKakaoLogin = async () => {
    try {
      // GET 요청: Spring Boot 서버의 소셜 로그인 엔드포인트 (예: /api/v1/oauth2/kakao)
      const res = await fetch("/api/v1/oauth/kakao");
      if (!res.ok) throw new Error("카카오 로그인 요청 실패");
      const data = await res.json();
      // data.url에 리다이렉트할 카카오 인증 URL이 있다고 가정
      if (data?.url) {
        window.location.href = data.url; // 즉시 리다이렉트
      } else {
        alert("카카오 인증 URL이 없습니다.");
      }
    } catch (err) {
      alert("카카오 로그인 중 오류가 발생했습니다: " + err.message);
    }
  };

  return (



    // 배경 비디오
    <div className="mainpage-bg">
      <video
        className="mainpage-bg-video"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="mainpage-card">
        <h1 className="mainpage-title">Welcome!</h1>
        <div className="mainpage-desc">
          <b>법률 서비스 김앤장</b> <br />
          <span className="mainpage-point">메인 페이지입니다.</span> <br />
          지금 바로 회원가입하거나 로그인해서 <br />
          다양한 서비스를 경험해보세요!
        </div>
        <div className="mainpage-btn-group">
          <button
            onClick={() => navigate("/login")}
            className="mainpage-btn mainpage-btn-login"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/join")}
            className="mainpage-btn mainpage-btn-join"
          >
            회원가입
          </button>
        </div>
        <div className="mainpage-info" >
          <span>또는 바로 시작</span>
          <button
            className="mainpage-kakao-btn"
            onClick={handleKakaoLogin}
          >
            {/* <SiKakaotalk size={24} style={{ verticalAlign: "middle" }} /> */}
            <img src="/kakao_login_small.png" alt="kakaoLoginIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
