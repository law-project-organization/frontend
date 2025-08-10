import { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // js-cookie import
import "@/css/NavBar.css";

export default function NavBar() {

  const navigate = useNavigate();

  const isLoggedIn = !!Cookies.get("isLoggedIn"); // isLoggedIn 쿠키 존재 여부 확인

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/auth/logout", {
        method: "GET",
        credentials: "include", // HttpOnly 쿠키 동봉
      });
    } catch (_) {
      // 네트워크 오류여도 UI는 로그아웃 처리
    } finally {
      // 보조 쿠키 및 클라이언트 상태 정리
      Cookies.remove("logged_in", { path: "/" });
      localStorage.setItem("auth:status", "out");
      setIsLoggedIn(false);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <NavLink to="/" className="nav__brand">
          법률 서비스
        </NavLink>

        <nav className="nav__links">
          {isLoggedIn ? (
            // <NavLink
            //   to="/logout"
            //   className={({ isActive }) =>
            //     `nav__link ${isActive ? "nav__link--active" : ""}`
            //   }
            // >
            //   로그아웃
            // </NavLink>
            // 버튼을 링크처럼 스타일링 (nav__link 클래스 재사용)
            <button
              type="button"
              onClick={handleLogout}
              className="nav__link"
            >
              로그아웃
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link--active" : ""}`
                }
              >
                로그인
              </NavLink>
              <NavLink
                to="/join"
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link--active" : ""}`
                }
              >
                회원가입
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
