import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "@/page/MainPage";
import LoginPage from "@/page/LoginPage";
import JoinPage from "@/page/JoinPage";

function App() {
  return (
    <div>
      <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </div>
      <div>
        <Link to="/" style={{ position: "fixed", top: 10, right: 10, color: "#2563eb" }} > 메인 | </Link>
        <Link to="/join" style={{ position: "fixed", top: 10, right: 10, color: "#2563eb" }} > 회원가입 | </Link>
        <Link to="/login" style={{ position: "fixed", top: 10, right: 10, color: "#2563eb" }} > 로그인 | </Link>
      </div>
    </div>
  );
}

export default App;
