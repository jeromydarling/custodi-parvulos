import { lazy, Suspense, Component } from "react";
import { Routes, Route } from "react-router-dom";
import PelicanLogo from "./components/PelicanLogo";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RetreatPortal = lazy(() => import("./pages/RetreatPortal"));
const FormationPortal = lazy(() => import("./pages/FormationPortal"));
const ParishAdmin = lazy(() => import("./pages/ParishAdmin"));
const IndividualAuth = lazy(() => import("./pages/IndividualAuth"));
const Journey = lazy(() => import("./pages/Journey"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const AdminEmail = lazy(() => import("./pages/AdminEmail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TravelTracker = lazy(() => import("./pages/TravelTracker"));
const Resources = lazy(() => import("./pages/Resources"));
const DailyReadings = lazy(() => import("./pages/DailyReadings"));
const Certificate = lazy(() => import("./pages/Certificate"));
const PressKit = lazy(() => import("./pages/PressKit"));

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontFamily: font }}>
      <div style={{ textAlign: "center" }}>
        <PelicanLogo size={48} color="#6B3A2A" />
        <p style={{ color: "#8B7355", fontSize: 14, marginTop: 12 }}>Loading...</p>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontFamily: font, padding: 24 }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <PelicanLogo size={48} color="#6B3A2A" />
            <h2 style={{ color: "#6B3A2A", fontSize: 22, marginTop: 16 }}>Something went wrong</h2>
            <p style={{ color: "#8B7355", fontSize: 15, marginTop: 8 }}>{this.state.error.message}</p>
            <button onClick={() => { this.setState({ error: null }); window.location.hash = "/"; }}
              style={{ marginTop: 20, background: "#6B3A2A", color: "#FFFDF7", border: "none", padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, cursor: "pointer" }}>
              Return Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </ErrorBoundary>
  );
}
