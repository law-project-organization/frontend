import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "@/page/MainPage";
import LoginPage from "@/page/LoginPage";
import JoinPage from "@/page/JoinPage";
import LawsuitFormPage from "@/page/LawsuitFormPage";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/law-suit-form" element={<LawsuitFormPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
