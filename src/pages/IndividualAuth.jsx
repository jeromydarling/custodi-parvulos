import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, heading, textureOverlay, globalCSS } from "../theme";
import { registerIndividual, loginIndividual, loginParishioner, getCurrentUser, addNewsletterSubscriber } from "../store";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 16, color: ink, outline: "none", boxSizing: "border-box" };
const btnStyle = { background: brown, color: cream, border: "none", padding: "14px 32px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer", width: "100%" };

export default function IndividualAuth() {
  const nav = useNavigate();
  const [mode, setMode] = useState("login"); // login | register | parish
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    const p = registerIndividual(form);
    if (!p) { setError("An account with this email already exists"); return; }
    addNewsletterSubscriber(form.email, form.name, "online");
    nav("/journey");
  };

  const handleLogin = (e) => {
    e.preventDefault(); setError("");
    const p = loginIndividual(form.email, form.password);
    if (!p) { setError("Invalid email or password"); return; }
    nav("/journey");
  };

  const handleParishLogin = (e) => {
    e.preventDefault(); setError("");
    const p = loginParishioner(form.parishCode, form.email);
    if (!p) { setError("No matching record found. Check with your parish administrator."); return; }
    nav("/journey");
  };

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PelicanLogo size={32} color={brown} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
        </Link>
        <Link to="/" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Home</Link>
      </nav>

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

          <p style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: muted }}>
            Parish administrator? <Link to="/parish-admin" style={{ color: brown, fontWeight: 600 }}>Manage your parish here</Link>
          </p>
        </FadeIn>
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
