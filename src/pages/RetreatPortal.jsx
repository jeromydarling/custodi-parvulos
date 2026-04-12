import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, UtensilsCrossed, Music, Cross, Church, Sun, Heart, Users, Mail, Phone, ArrowLeft, HandHeart, BookOpen, Flame } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 16, color: ink, outline: "none", boxSizing: "border-box" };

const schedule = [
  { time: "8:00 AM", label: "Gathering & Continental Breakfast", icon: UtensilsCrossed },
  { time: "8:45 AM", label: "Opening Prayer & Welcome", icon: BookOpen },
  { time: "9:00 AM", label: "Holy Mass", icon: Cross },
  { time: "10:00 AM", label: "Exposition & Part I: Creatio — with sacred music", icon: Music },
  { time: "10:45 AM", label: "Part II: Lapsus — with time for reflection", icon: Heart },
  { time: "11:30 AM", label: "Part III: Formatio Populi Sancti — with Lectio Divina", icon: BookOpen },
  { time: "12:15 PM", label: "Angelus, Benediction & Lunch", icon: UtensilsCrossed },
  { time: "1:15 PM", label: "Re-Exposition & Part IV: Messias — with sacred music", icon: Music },
  { time: "2:00 PM", label: "Part V: Ecclesia — with examination of conscience", icon: Church },
  { time: "2:45 PM", label: "Reflection & Small Group Discussion", icon: Users },
  { time: "3:15 PM", label: "Chaplet of Divine Mercy", icon: Flame },
  { time: "3:30 PM", label: "Commitment Ceremony & Benediction", icon: Sun },
  { time: "4:00 PM", label: "Departure", icon: MapPin },
];

export default function RetreatPortal() {
  const [form, setForm] = useState({ parish: "", diocese: "", city: "", state: "", contact: "", email: "", phone: "", participants: "", chapel: "yes", dates: "", notes: "", contribution: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PelicanLogo size={32} color={brown} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
        </Link>
        <div style={{ display: "flex", gap: 20 }}>
          <Link to="/" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Home</Link>
          <Link to="/formation" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Formation</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "60px 24px" }}>
        <FadeIn><PelicanLogo size={120} color={brown} /></FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: red, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginTop: 16 }}>PARISH RETREAT</p>
          <h1 style={{ ...heading, fontSize: "clamp(28px, 6vw, 42px)", letterSpacing: 3, marginTop: 8 }}>Dies Formationis</h1>
          <p style={{ fontSize: 17, color: stone, fontStyle: "italic", marginTop: 8 }}>A Day of Formation</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p style={{ ...prose, maxWidth: 580, margin: "24px auto 0", fontSize: 17 }}>A one-day parish retreat where the entire Custodi Parvulos formation unfolds in the presence of the Blessed Sacrament</p>
        </FadeIn>
      </section>

      {/* WHAT IS IT */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 24px 80px" }}>
        <div style={sectionStyle}>
          <FadeIn><Divider />
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "0 auto" }}>Unlike the free online formation, the retreat gathers your whole parish for an immersive day of prayer, teaching, and encounter. All formation happens IN Eucharistic Adoration, combined with sacred music and generous time for silence and reflection.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginTop: 48 }}>
              {[
                { Icon: Cross, t: "In His Presence", d: "Every part of the formation happens before the Blessed Sacrament. The Adoration IS the context." },
                { Icon: Music, t: "Music & Silence", d: "Sacred music opens each session. Extended silence follows. The rhythm is contemplative, not hurried." },
                { Icon: UtensilsCrossed, t: "Shared Table", d: "Breaking bread together mirrors the Eucharistic meal. We gather as the Body of Christ." },
              ].map((c, i) => (
                <div key={i} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "24px 20px", textAlign: "center" }}>
                  <c.Icon size={28} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                  <p style={{ fontWeight: 700, color: brown, marginTop: 12, fontSize: 16 }}>{c.t}</p>
                  <p style={{ color: stone, fontSize: 14, marginTop: 8, lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SCHEDULE */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>THE DAY</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 8 }}>Ordo Diei</h2>
            <p style={{ color: stone, fontSize: 16, textAlign: "center", fontStyle: "italic", marginBottom: 48 }}>Order of the Day</p>
          </FadeIn>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            {schedule.map((s, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: i < schedule.length - 1 ? `1px solid ${borderC}` : "none" }}>
                  <span style={{ fontFamily: font, fontSize: 14, color: muted, minWidth: 76, fontWeight: 600 }}>{s.time}</span>
                  <s.icon size={16} color={brown} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontFamily: font, fontSize: 16, color: ink, lineHeight: 1.5 }}>{s.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PAY WHAT YOU CAN */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>STEWARDSHIP</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 16 }}>Pay What You Can Afford</h2>
            <p style={{ ...prose, textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>No parish will be turned away. We ask each parish to contribute what they are able — this covers the retreat leader's travel, printed materials, and meals.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 32 }}>
              {[
                { t: "Small Parish", range: "$200 – $500", size: "Up to 30 participants" },
                { t: "Medium Parish", range: "$500 – $1,000", size: "30–75 participants" },
                { t: "Large Parish", range: "$1,000 – $2,000", size: "75+ participants" },
              ].map((tier, i) => (
                <div key={i} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "24px 20px", textAlign: "center" }}>
                  <p style={{ fontWeight: 700, color: brown, fontSize: 16 }}>{tier.t}</p>
                  <p style={{ color: red, fontSize: 20, fontWeight: 700, margin: "8px 0 4px" }}>{tier.range}</p>
                  <p style={{ color: stone, fontSize: 14 }}>{tier.size}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ ...prose, textAlign: "center", fontSize: 15, fontStyle: "italic", maxWidth: 560, margin: "0 auto" }}>These are suggestions, not requirements. If your parish can give more, it helps us serve parishes that can give less. If you can give nothing, come anyway. This is the Lord's work.</p>
          </FadeIn>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={{ ...sectionStyle, maxWidth: 600 }}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>GET STARTED</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 48 }}>Register Your Parish</h2>
          </FadeIn>
          {submitted ? (
            <FadeIn>
              <div style={{ textAlign: "center", padding: 48 }}>
                <Cross size={40} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                <h3 style={{ ...heading, fontSize: 24, marginTop: 16 }}>Deo Gratias!</h3>
                <p style={{ ...prose, marginTop: 16, maxWidth: 440, margin: "16px auto 0" }}>Your request has been received. We will contact you within 48 hours to discuss dates and details for your parish retreat.</p>
                <Link to="/" style={{ display: "inline-block", marginTop: 32, color: brown, fontFamily: font, fontSize: 15, textDecoration: "underline" }}>Return Home</Link>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Parish Name</label>
                  <input required style={inputStyle} value={form.parish} onChange={set("parish")} placeholder="e.g. St. Joseph Catholic Church" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Diocese</label>
                  <input required style={inputStyle} value={form.diocese} onChange={set("diocese")} placeholder="e.g. Diocese of Fort Worth" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>City</label>
                    <input required style={inputStyle} value={form.city} onChange={set("city")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>State</label>
                    <input required style={inputStyle} value={form.state} onChange={set("state")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Contact Name</label>
                  <input required style={inputStyle} value={form.contact} onChange={set("contact")} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Email</label>
                    <input required type="email" style={inputStyle} value={form.email} onChange={set("email")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Phone</label>
                    <input type="tel" style={inputStyle} value={form.phone} onChange={set("phone")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Estimated Number of Participants</label>
                  <input type="number" style={inputStyle} value={form.participants} onChange={set("participants")} placeholder="e.g. 50" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Do you have a chapel suitable for Adoration?</label>
                  <div style={{ display: "flex", gap: 24, marginTop: 4 }}>
                    {["yes", "no"].map((v) => (
                      <label key={v} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: font, fontSize: 16, color: ink, cursor: "pointer" }}>
                        <input type="radio" name="chapel" value={v} checked={form.chapel === v} onChange={set("chapel")} style={{ accentColor: brown }} />
                        {v === "yes" ? "Yes" : "No — but we can arrange one"}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Preferred Date(s)</label>
                  <textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={form.dates} onChange={set("dates")} placeholder="Any Saturdays that work for your parish..." />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>What your parish can contribute</label>
                  <input style={inputStyle} value={form.contribution} onChange={set("contribution")} placeholder="Any amount, including $0" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Anything else we should know?</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.notes} onChange={set("notes")} />
                </div>
                <button type="submit" style={{ background: brown, color: cream, border: "none", padding: "16px 48px", borderRadius: 6, fontFamily: font, fontSize: 17, fontWeight: 600, letterSpacing: 1, cursor: "pointer", marginTop: 8 }}>Request a Retreat</button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 24px", textAlign: "center" }}>
        <Divider />
        <PelicanLogo size={60} color={brown} />
        <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginTop: 12 }}>Pie Pelicane, custodi parvulos</p>
        <p style={{ color: muted, fontSize: 12, fontStyle: "italic", marginTop: 2 }}>O loving Pelican, guard the little ones</p>
        <Link to="/" style={{ display: "inline-block", marginTop: 20, color: stone, fontFamily: font, fontSize: 14, textDecoration: "none" }}>← Back to Home</Link>
      </section>
      <style>{globalCSS}</style>
    </div>
  );
}
