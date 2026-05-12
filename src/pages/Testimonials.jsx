import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Send, MessageSquare, Church, User, BookOpen } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import Nav from "../components/Nav";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 16, color: ink, outline: "none", boxSizing: "border-box" };
const STORAGE_KEY = "custodi_testimonials";

function loadTestimonials() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveTestimonial(t) {
  const all = loadTestimonials();
  all.unshift({ ...t, id: Date.now(), date: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all;
}

function Stars({ count, size = 16, interactive = false, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= count ? "#C9A84C" : "none"} color={i <= count ? "#C9A84C" : borderC}
          strokeWidth={1.5} style={{ cursor: interactive ? "pointer" : "default" }}
          onClick={() => interactive && onChange && onChange(i)} />
      ))}
    </div>
  );
}

export function TestimonialCard({ t }) {
  return (
    <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "20px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <p style={{ fontWeight: 700, color: ink, fontSize: 16 }}>{t.name}</p>
          <p style={{ fontSize: 13, color: muted }}>{t.parish}{t.diocese ? `, ${t.diocese}` : ""}</p>
        </div>
        <Stars count={t.rating} />
      </div>
      <p style={{ fontSize: 13, color: red, fontStyle: "italic", marginBottom: 8 }}>
        {t.type === "retreat" ? "Parish Retreat" : t.type === "online" ? "Online Formation" : "General"}
      </p>
      <p style={{ ...prose, fontSize: 15 }}>"{t.text}"</p>
      {t.role && <p style={{ fontSize: 13, color: stone, marginTop: 8 }}>— {t.role}</p>}
      <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>{new Date(t.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
    </div>
  );
}

// Seed testimonials for demo
const SEED = [
  { id: 1, name: "Fr. Michael Torres", parish: "St. Thomas More", diocese: "Diocese of Austin", role: "Pastor", type: "retreat", rating: 5, text: "In twenty years of priesthood, this is the first safe environment program that felt like prayer instead of paperwork. My entire staff was moved. Doing the formation in Adoration changed everything — the Holy Spirit was the real teacher.", date: "2026-03-15T00:00:00.000Z" },
  { id: 2, name: "Maria Gonzalez", parish: "Our Lady of Guadalupe", diocese: "Archdiocese of San Antonio", role: "DRE / Safe Environment Coordinator", type: "retreat", rating: 5, text: "I have been the safe environment coordinator for eight years and have watched people click through VIRTUS with glazed eyes. At our Custodi Parvulos retreat, people were weeping during the Lectio Divina. They understood WHY we protect children — not just the rules.", date: "2026-02-20T00:00:00.000Z" },
  { id: 3, name: "Deacon James Whitfield", parish: "Sacred Heart", diocese: "Diocese of Fort Worth", role: "Deacon", type: "online", rating: 5, text: "The online formation is beautifully done. The connection between the Theology of the Body and the John Jay findings was something I had never seen before. This should be required reading in every seminary.", date: "2026-01-10T00:00:00.000Z" },
  { id: 4, name: "Catherine Park", parish: "St. Elizabeth Ann Seton", diocese: "Diocese of Arlington", role: "Volunteer Catechist", type: "retreat", rating: 5, text: "I came expecting another training day. I left having encountered Christ. The Chaplet of Divine Mercy at 3 PM, after spending the whole day in His presence learning about these wounds — I will never forget it.", date: "2026-03-01T00:00:00.000Z" },
  { id: 5, name: "Robert Nguyen", parish: "Holy Trinity", diocese: "Diocese of Dallas", role: "Parish Council President", type: "online", rating: 4, text: "Clear, profound, and deeply Catholic. The five-part structure following the Drama of Salvation makes the material stick in a way no compliance video ever could. I wish we had this ten years ago.", date: "2026-02-05T00:00:00.000Z" },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", parish: "", diocese: "", role: "", type: "retreat", rating: 5, text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState("all");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    const stored = loadTestimonials();
    if (stored.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      setTestimonials(SEED);
    } else {
      setTestimonials(stored);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = saveTestimonial(form);
    setTestimonials(all);
    setSubmitted(true);
  };

  const filtered = filter === "all" ? testimonials : testimonials.filter(t => t.type === filter);
  const avg = testimonials.length ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1) : "5.0";

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav />

      <div style={{ ...sectionStyle, maxWidth: 720, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <MessageSquare size={32} color={brown} strokeWidth={1.3} style={{ display: "block", margin: "0 auto" }} />
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginTop: 12 }}>TESTIMONIES</p>
            <h1 style={{ ...heading, fontSize: 32, marginTop: 8 }}>Voices of the Faithful</h1>
            <p style={{ color: stone, fontSize: 16, fontStyle: "italic", marginTop: 8 }}>What parishes and individuals are saying</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 16 }}>
              <Stars count={Math.round(parseFloat(avg))} size={20} />
              <span style={{ fontSize: 18, fontWeight: 700, color: ink }}>{avg}</span>
              <span style={{ fontSize: 14, color: muted }}>({testimonials.length} reviews)</span>
            </div>
          </div>
        </FadeIn>

        {/* Filter */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {[{ key: "all", label: "All" }, { key: "retreat", label: "Retreats" }, { key: "online", label: "Online Formation" }].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              style={{ padding: "8px 20px", borderRadius: 6, border: `1px solid ${filter === f.key ? brown : borderC}`, background: filter === f.key ? `${brown}12` : cream, fontFamily: font, fontSize: 13, color: filter === f.key ? brown : stone, cursor: "pointer", fontWeight: filter === f.key ? 700 : 400 }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Testimonials list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
          {filtered.map(t => (
            <FadeIn key={t.id}>
              <TestimonialCard t={t} />
            </FadeIn>
          ))}
        </div>

        <Divider />

        {/* Submit form */}
        <FadeIn>
          <div style={{ marginTop: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ color: red, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>SHARE YOUR EXPERIENCE</p>
              <h2 style={{ ...heading, fontSize: 24 }}>Leave a Testimony</h2>
              <p style={{ color: stone, fontSize: 15, marginTop: 8 }}>Your words help other parishes discover this formation</p>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: 40, background: cream, border: `1px solid ${borderC}`, borderRadius: 8 }}>
                <Star size={32} color="#C9A84C" fill="#C9A84C" style={{ display: "block", margin: "0 auto" }} />
                <h3 style={{ ...heading, fontSize: 22, marginTop: 12 }}>Thank You</h3>
                <p style={{ color: stone, fontSize: 15, marginTop: 8 }}>Your testimony has been shared. Deo Gratias!</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", parish: "", diocese: "", role: "", type: "retreat", rating: 5, text: "" }); }}
                  style={{ marginTop: 20, background: "none", border: `1px solid ${borderC}`, padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, color: stone, cursor: "pointer" }}>
                  Write Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Your Name</label>
                    <input required style={inputStyle} value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Your Role</label>
                    <input style={inputStyle} value={form.role} onChange={set("role")} placeholder="e.g. Pastor, Volunteer, DRE" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Parish</label>
                    <input required style={inputStyle} value={form.parish} onChange={set("parish")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Diocese</label>
                    <input style={inputStyle} value={form.diocese} onChange={set("diocese")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>What are you reviewing?</label>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[{ v: "retreat", l: "Parish Retreat" }, { v: "online", l: "Online Formation" }, { v: "general", l: "General" }].map(o => (
                      <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: font, fontSize: 14, color: ink, cursor: "pointer" }}>
                        <input type="radio" name="type" value={o.v} checked={form.type === o.v} onChange={set("type")} style={{ accentColor: brown }} />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 6 }}>Rating</label>
                  <Stars count={form.rating} size={24} interactive onChange={(r) => setForm({ ...form, rating: r })} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Your Testimony</label>
                  <textarea required style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} value={form.text} onChange={set("text")} placeholder="Share how this formation impacted you, your parish, or your ministry..." />
                </div>
                <button type="submit" style={{ background: brown, color: cream, border: "none", padding: "14px 32px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Send size={16} /> Share Testimony
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 24px", textAlign: "center" }}>
        <Divider />
        <PelicanLogo size={60} color={brown} />
        <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginTop: 12 }}>Pie Pelicane, custodi parvulos</p>
        <Link to="/" style={{ display: "inline-block", marginTop: 20, color: stone, fontFamily: font, fontSize: 14, textDecoration: "none" }}>← Back to Home</Link>
      </section>
      <style>{globalCSS}</style>
    </div>
  );
}
