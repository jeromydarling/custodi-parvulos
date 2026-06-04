import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, UserPlus, CheckCircle, Clock, Trash2, LogOut, ChevronDown, Download, Award } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import Nav from "../components/Nav";
import { getCurrentUser, getParish, addParishioner, removeParishioner, logout, registerParish, loginParishAdmin, issueCertificate } from "../store";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 16, color: ink, outline: "none", boxSizing: "border-box" };
const btnStyle = { background: brown, color: cream, border: "none", padding: "12px 32px", borderRadius: 6, fontFamily: font, fontSize: 15, fontWeight: 600, cursor: "pointer" };
const PARTS = ["creation", "fall", "formation", "messiah", "ecclesia"];
const PART_NAMES = { creation: "I. Creatio", fall: "II. Lapsus", formation: "III. Formatio", messiah: "IV. Messias", ecclesia: "V. Ecclesia" };

export default function ParishAdmin() {
  const nav = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [parish, setParish] = useState(null);
  const [view, setView] = useState(user?.type === "parish_admin" ? "dashboard" : "auth");
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({});
  const [addForm, setAddForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    if (user?.type === "parish_admin") {
      getParish(user.parishId).then(p => { if (p) setParish(p); });
      setView("dashboard");
    }
  }, [user]);

  const refresh = () => getParish(user.parishId).then(p => { if (p) setParish(p); });

  const handleRegister = async (e) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    const p = await registerParish(form);
    if (!p) { setError("Registration failed"); return; }
    setUser(getCurrentUser()); setView("dashboard"); refresh();
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setError("");
    const p = await loginParishAdmin(form.email, form.password);
    if (!p) { setError("Invalid email or password"); return; }
    setUser(getCurrentUser()); setView("dashboard"); refresh();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email) return;
    await addParishioner(user.parishId, addForm);
    setAddForm({ name: "", email: "" });
    refresh();
  };

  const handleRemove = async (id) => { await removeParishioner(user.parishId, id); refresh(); };

  const handleLogout = () => { logout(); setUser(null); setView("auth"); setParish(null); };

  const completed = parish ? parish.parishioners.filter(p => p.completedAt).length : 0;
  const total = parish ? parish.parishioners.length : 0;

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav rightSlot={user?.type === "parish_admin" ? (
        <button onClick={handleLogout} style={{ background: "none", border: "none", fontFamily: font, color: stone, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <LogOut size={14} /> Sign Out
        </button>
      ) : null} />

      <div style={{ ...sectionStyle, maxWidth: 700, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        {view === "auth" && (
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <PelicanLogo size={80} color={brown} />
              <h1 style={{ ...heading, fontSize: 32, marginTop: 16 }}>Parish Administration</h1>
              <p style={{ color: stone, fontSize: 16, fontStyle: "italic", marginTop: 8 }}>Register your parish and manage your parishioners' formation</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
                <button onClick={() => { setAuthMode("login"); setError(""); }} style={{ ...btnStyle, background: authMode === "login" ? brown : "transparent", color: authMode === "login" ? cream : brown, border: `1px solid ${brown}` }}>Sign In</button>
                <button onClick={() => { setAuthMode("register"); setError(""); }} style={{ ...btnStyle, background: authMode === "register" ? brown : "transparent", color: authMode === "register" ? cream : brown, border: `1px solid ${brown}` }}>Register Parish</button>
              </div>
            </div>

            {authMode === "register" ? (
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480, margin: "0 auto" }}>
                <input required style={inputStyle} placeholder="Parish Name" value={form.name || ""} onChange={set("name")} />
                <input required style={inputStyle} placeholder="Diocese" value={form.diocese || ""} onChange={set("diocese")} />
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
                  <input required style={inputStyle} placeholder="City" value={form.city || ""} onChange={set("city")} />
                  <input required style={inputStyle} placeholder="State" value={form.state || ""} onChange={set("state")} />
                </div>
                <Divider />
                <input required style={inputStyle} placeholder="Your Name (Admin)" value={form.adminName || ""} onChange={set("adminName")} />
                <input required type="email" style={inputStyle} placeholder="Your Email" value={form.adminEmail || ""} onChange={set("adminEmail")} />
                <input required type="password" style={inputStyle} placeholder="Password" value={form.password || ""} onChange={set("password")} />
                <input required type="password" style={inputStyle} placeholder="Confirm Password" value={form.confirm || ""} onChange={set("confirm")} />
                {error && <p style={{ color: red, fontSize: 14 }}>{error}</p>}
                <button type="submit" style={btnStyle}>Register Parish</button>
              </form>
            ) : (
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400, margin: "0 auto" }}>
                <input required type="email" style={inputStyle} placeholder="Email" value={form.email || ""} onChange={set("email")} />
                <input required type="password" style={inputStyle} placeholder="Password" value={form.password || ""} onChange={set("password")} />
                {error && <p style={{ color: red, fontSize: 14 }}>{error}</p>}
                <button type="submit" style={btnStyle}>Sign In</button>
              </form>
            )}
          </FadeIn>
        )}

        {view === "dashboard" && parish && (
          <>
            <FadeIn>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h1 style={{ ...heading, fontSize: 28 }}>{parish.name}</h1>
                  <p style={{ color: stone, fontSize: 15, marginTop: 4 }}>{parish.diocese} — {parish.city}, {parish.state}</p>
                </div>
                <button onClick={() => {
                  const rows = [["Participant Name","Email","Role","Formation Completed","Completion Date","Parts Completed","Organization","Diocese"]];
                  parish.parishioners.forEach(p => {
                    rows.push([p.name, p.email, p.role || "Volunteer", p.completedAt ? "Yes" : "No", p.completedAt ? new Date(p.completedAt).toLocaleDateString() : "", Object.keys(p.progress || {}).length, parish.name, parish.diocese]);
                  });
                  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = `stonebridge-audit-${parish.name.replace(/\s+/g,"-")}-${new Date().toISOString().slice(0,10)}.csv`;
                  a.click();
                }} style={{ background: "none", border: `1px solid ${brown}`, color: brown, padding: "10px 16px", borderRadius: 6, fontFamily: font, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Download size={13} /> StoneBridge Audit Export
                </button>
              </div>
            </FadeIn>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, margin: "32px 0" }}>
              {[
                { label: "Registered", value: total, Icon: Users },
                { label: "Completed", value: completed, Icon: CheckCircle },
                { label: "In Progress", value: total - completed, Icon: Clock },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "20px 16px", textAlign: "center" }}>
                    <s.Icon size={24} color={brown} strokeWidth={1.3} style={{ display: "block", margin: "0 auto 8px" }} />
                    <p style={{ fontSize: 28, fontWeight: 700, color: ink, margin: 0 }}>{s.value}</p>
                    <p style={{ fontSize: 13, color: stone, marginTop: 4 }}>{s.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Add parishioner */}
            <FadeIn delay={0.2}>
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 32 }}>
                <h3 style={{ ...heading, fontSize: 18, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <UserPlus size={18} color={brown} /> Add Parishioner
                </h3>
                <form onSubmit={handleAdd} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <input required style={{ ...inputStyle, flex: "1 1 160px" }} placeholder="Full Name" value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} />
                  <input required type="email" style={{ ...inputStyle, flex: "1 1 200px" }} placeholder="Email" value={addForm.email} onChange={e => setAddForm({ ...addForm, email: e.target.value })} />
                  <button type="submit" style={{ ...btnStyle, padding: "12px 24px" }}>Add</button>
                </form>
              </div>
            </FadeIn>

            {/* Parishioner list */}
            <FadeIn delay={0.3}>
              <h3 style={{ ...heading, fontSize: 18, marginBottom: 16 }}>Parishioners ({total})</h3>
              {parish.parishioners.length === 0 ? (
                <p style={{ color: muted, fontSize: 15, fontStyle: "italic" }}>No parishioners registered yet. Add them above.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {parish.parishioners.map(p => {
                    const done = Object.keys(p.progress).length;
                    return (
                      <div key={p.id} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "16px 20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                          <div>
                            <span style={{ fontWeight: 600, color: ink, fontSize: 16 }}>{p.name}</span>
                            <span style={{ color: muted, fontSize: 14, marginLeft: 12 }}>{p.email}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {p.completedAt ? (
                              <>
                                <span style={{ color: "#4A7C59", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                                  <CheckCircle size={14} /> Complete
                                </span>
                                <a href={`#/certificate?name=${encodeURIComponent(p.name)}&parish=${encodeURIComponent(parish.name)}`} target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                  <Award size={13} /> Certificate
                                </a>
                              </>
                            ) : (
                              <span style={{ color: stone, fontSize: 13 }}>{done}/5 parts</span>
                            )}
                            <button onClick={() => handleRemove(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, padding: 4 }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div style={{ marginTop: 10, display: "flex", gap: 4 }}>
                          {PARTS.map(part => (
                            <div key={part} title={PART_NAMES[part]} style={{ flex: 1, height: 6, borderRadius: 3, background: p.progress[part] ? "#4A7C59" : `${borderC}` }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                          {PARTS.map(part => (
                            <span key={part} style={{ fontSize: 10, color: p.progress[part] ? "#4A7C59" : muted, flex: 1, textAlign: "center" }}>
                              {PART_NAMES[part].split(". ")[1]}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </FadeIn>
          </>
        )}
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
