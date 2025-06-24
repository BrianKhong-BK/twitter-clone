import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Authpage />} />
        <Route path="*" element={<Authpage />} />
      </Routes>
    </BrowserRouter>
  );
}
