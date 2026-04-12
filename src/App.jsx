import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RetreatPortal from "./pages/RetreatPortal";
import FormationPortal from "./pages/FormationPortal";
import ParishAdmin from "./pages/ParishAdmin";
import IndividualAuth from "./pages/IndividualAuth";
import Journey from "./pages/Journey";
import Testimonials from "./pages/Testimonials";
import AdminEmail from "./pages/AdminEmail";
import AdminDashboard from "./pages/AdminDashboard";
import TravelTracker from "./pages/TravelTracker";
import Resources from "./pages/Resources";
import DailyReadings from "./pages/DailyReadings";
import Certificate from "./pages/Certificate";
import PressKit from "./pages/PressKit";

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
      <Route path="/admin-email" element={<AdminEmail />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-travel" element={<TravelTracker />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/readings" element={<DailyReadings />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/press" element={<PressKit />} />
    </Routes>
  );
}
