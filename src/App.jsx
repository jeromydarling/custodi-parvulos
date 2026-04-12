import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RetreatPortal from "./pages/RetreatPortal";
import FormationPortal from "./pages/FormationPortal";
import ParishAdmin from "./pages/ParishAdmin";
import IndividualAuth from "./pages/IndividualAuth";
import Journey from "./pages/Journey";
import Testimonials from "./pages/Testimonials";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/retreat" element={<RetreatPortal />} />
      <Route path="/formation" element={<FormationPortal />} />
      <Route path="/parish-admin" element={<ParishAdmin />} />
      <Route path="/start" element={<IndividualAuth />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/testimonials" element={<Testimonials />} />
    </Routes>
  );
}
