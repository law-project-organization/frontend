import React from "react";
import { useNavigate } from "react-router-dom";
import "@/css/MainPage.css"; // css 파일 import

const videoUrl = "/mainBackgroundVideo.mp4"; // 비디오 파일 경로 추후 추가 가능

function WelcomePage() {
  const navigate = useNavigate();

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
        <div className="mainpage-info">
          <b>서비스 소개</b>: <br />
          어쏘 변호사 월급 주기 아까우시죠? <br />
          저희 서비스를 사용하시면 통장이 두꺼워집니다. <br />
          <span className="mainpage-point">포인트 컬러는 블루!</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
