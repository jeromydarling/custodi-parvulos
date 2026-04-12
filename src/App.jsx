import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RetreatPortal from "./pages/RetreatPortal";
import FormationPortal from "./pages/FormationPortal";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/retreat" element={<RetreatPortal />} />
      <Route path="/formation" element={<FormationPortal />} />
    </Routes>
  );
}
