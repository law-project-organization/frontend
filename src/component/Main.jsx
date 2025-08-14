import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import '@/css/Main.css'
import Cookies from 'js-cookie'


const Main = () => {
    const navigate = useNavigate();

    // 로그인 되지 않은 유저는 /welcome 으로 => 임시 보류, 로그인 되지 않은 유저도 일일 횟수만큼 이용 가능 
    // useEffect(() => {
    //     const refreshToken = Cookies.get("refreshToken");
    //     if (!refreshToken) {
    //         navigate("/welcome");
    //     }
    // }, [navigate]);

    return (
        <div className="main-container">
            <div className="main-card">
                <h1 className="main-title">AI 소장 자동 작성 서비스</h1>
                <p className="main-description">
                    사건 정보를 입력하면 AI가 자동으로 소장을 작성해 드립니다.
                </p>
                <button
                    onClick={() => navigate("/lawsuit")}
                    className="main-button"
                >
                    소장 작성하러 가기
                </button>
            </div>
        </div>
    );
}

export default Main;