import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, heading, textureOverlay, globalCSS } from "../theme";
import Nav from "../components/Nav";
import { registerIndividual, loginIndividual, loginParishioner, getCurrentUser, addNewsletterSubscriber, setCurrentUser } from "../store";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 16, color: ink, outline: "none", boxSizing: "border-box" };
const btnStyle = { background: brown, color: cream, border: "none", padding: "14px 32px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer", width: "100%" };

export default function IndividualAuth() {
  const nav = useNavigate();
  const [mode, setMode] = useState("login"); // login | register | parish
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    try { await registerIndividual(form); } catch(e) { setError(e.message || "An account with this email already exists"); return; }
    addNewsletterSubscriber(form.email, form.name, "online");
    nav("/journey");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setError("");
    try { await loginIndividual(form.email, form.password); } catch(e) { setError(e.message || "Invalid email or password"); return; }
    nav("/journey");
  };

  const handleParishLogin = async (e) => {
    e.preventDefault(); setError("");
    try { await loginParishioner(form.parishCode, form.email); } catch(e) { setError(e.message || "No matching record found. Check with your parish administrator."); return; }
    nav("/journey");
  };

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav />

      <div style={{ maxWidth: 440, margin: "0 auto", padding: "60px 24px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <PelicanLogo size={80} color={brown} />
            <h1 style={{ ...heading, fontSize: 28, marginTop: 16 }}>Begin Your Formation</h1>
            <p style={{ color: stone, fontSize: 15, fontStyle: "italic", marginTop: 8 }}>Free for everyone — no cost, ever</p>
          </div>

          <div style={{ display: "flex", gap: 0, marginBottom: 32, border: `1px solid ${borderC}`, borderRadius: 6, overflow: "hidden" }}>
            {[
              { key: "login", label: "Sign In" },
              { key: "register", label: "New Account" },
              { key: "parish", label: "Parish Member" },
            ].map(t => (
              <button key={t.key} onClick={() => { setMode(t.key); setError(""); setForm({}); }}
                style={{ flex: 1, padding: "10px 8px", fontFamily: font, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
                  background: mode === t.key ? brown : cream, color: mode === t.key ? cream : stone }}>
                {t.label}
              </button>
            ))}
          </div>

          {mode === "register" && (
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input required style={inputStyle} placeholder="Full Name" value={form.name || ""} onChange={set("name")} />
              <input required type="email" style={inputStyle} placeholder="Email" value={form.email || ""} onChange={set("email")} />
              <input required type="password" style={inputStyle} placeholder="Password" value={form.password || ""} onChange={set("password")} />
              <input required type="password" style={inputStyle} placeholder="Confirm Password" value={form.confirm || ""} onChange={set("confirm")} />
              {error && <p style={{ color: red, fontSize: 14 }}>{error}</p>}
              <button type="submit" style={btnStyle}>Create Account</button>
            </form>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input required type="email" style={inputStyle} placeholder="Email" value={form.email || ""} onChange={set("email")} />
              <input required type="password" style={inputStyle} placeholder="Password" value={form.password || ""} onChange={set("password")} />
              {error && <p style={{ color: red, fontSize: 14 }}>{error}</p>}
              <button type="submit" style={btnStyle}>Sign In</button>
            </form>
          )}

          {mode === "parish" && (
            <form onSubmit={handleParishLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ color: stone, fontSize: 14, lineHeight: 1.6 }}>If your parish registered you, enter the parish code and your email address below.</p>
              <input required style={inputStyle} placeholder="Parish Code (from your administrator)" value={form.parishCode || ""} onChange={set("parishCode")} />
              <input required type="email" style={inputStyle} placeholder="Your Email" value={form.email || ""} onChange={set("email")} />
              {error && <p style={{ color: red, fontSize: 14 }}>{error}</p>}
              <button type="submit" style={btnStyle}>Enter Formation</button>
            </form>
          )}

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={async () => {
              const guestEmail = `guest_${Date.now()}@preview.custodiparvulos.org`;
              const result = await registerIndividual({ name: "Guest", email: guestEmail, password: "guest" });
              if (result) nav("/journey");
              else { setCurrentUser({ type: "individual", id: "guest_" + Date.now(), name: "Guest", email: guestEmail }); nav("/journey"); }
            }} style={{ background: "none", border: `1px solid ${borderC}`, padding: "12px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, color: brown, cursor: "pointer", fontWeight: 600, width: "100%", marginBottom: 16 }}>
              Continue as Guest →
            </button>
            <p style={{ fontSize: 14, color: muted }}>
              Parish administrator? <Link to="/parish-admin" style={{ color: brown, fontWeight: 600 }}>Manage your parish here</Link>
            </p>
          </div>
        </FadeIn>
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
