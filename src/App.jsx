import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "@/page/MainPage";
import LoginFormPage from "@/page/LoginFormPage";
import JoinFormPage from "@/page/JoinFormPage";
import LawsuitFormPage from "@/page/LawsuitFormPage"; 

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/join" element={<JoinFormPage />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/lawsuit" element={<LawsuitFormPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
