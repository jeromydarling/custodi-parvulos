import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, UtensilsCrossed, Music, Cross, Church, Sun, Heart, Users, Mail, Phone, ArrowLeft, HandHeart, BookOpen, Flame, Calendar } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { saveRetreatRequest, addNewsletterSubscriber } from "../store";
import MetBackground from "../components/MetArt";
import Nav from "../components/Nav";

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

function getNextSaturdays(count = 12) {
  const dates = [];
  const d = new Date();
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
  for (let i = 0; i < count; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

function fmt(d) { return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }

export default function RetreatPortal() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ parish: "", diocese: "", city: "", state: "", contact: "", email: "", phone: "", participants: "", chapel: "yes", selectedDates: [], preferOther: "", notes: "", contribution: "", mealNeeds: "", startTime: "8:00 AM" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const saturdays = getNextSaturdays(12);
  const toggleDate = (d) => {
    const key = d.toISOString();
    const has = form.selectedDates.includes(key);
    setForm({ ...form, selectedDates: has ? form.selectedDates.filter(x => x !== key) : [...form.selectedDates, key] });
  };

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav />

      {/* HERO */}
      <MetBackground mapKey="retreat_hero" opacity={0.1} style={{ zIndex: 1 }}>
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
      </MetBackground>

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

      {/* REGISTRATION — MULTI-STEP */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={{ ...sectionStyle, maxWidth: 640 }}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>GET STARTED</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 16 }}>Register Your Parish</h2>
          </FadeIn>

          {/* Step indicator */}
          {!submitted && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
              {["Parish Info", "Select Dates", "Logistics", "Review"].map((label, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", background: step > i + 1 ? "#4A7C59" : step === i + 1 ? brown : borderC, color: step >= i + 1 ? cream : stone, fontSize: 14, fontWeight: 700, fontFamily: font }}>{i + 1}</div>
                  <span style={{ fontSize: 11, color: step === i + 1 ? brown : muted, fontFamily: font }}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {submitted ? (
            <FadeIn>
              <div style={{ textAlign: "center", padding: 48 }}>
                <Cross size={40} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                <h3 style={{ ...heading, fontSize: 24, marginTop: 16 }}>Deo Gratias!</h3>
                <p style={{ ...prose, marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>Your retreat request has been received. We will contact you within 48 hours to confirm your date and discuss details.</p>
                <div style={{ background: bg, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginTop: 24, textAlign: "left", maxWidth: 400, margin: "24px auto 0" }}>
                  <p style={{ fontWeight: 700, color: brown, fontSize: 14, marginBottom: 8 }}>Your selected date(s):</p>
                  {form.selectedDates.map(d => <p key={d} style={{ fontSize: 15, color: ink, marginBottom: 4 }}>{fmt(new Date(d))}</p>)}
                  {form.preferOther && <p style={{ fontSize: 14, color: stone, fontStyle: "italic", marginTop: 8 }}>Also noted: {form.preferOther}</p>}
                </div>
                <Link to="/" style={{ display: "inline-block", marginTop: 32, color: brown, fontFamily: font, fontSize: 15, textDecoration: "underline" }}>Return Home</Link>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              {/* STEP 1: Parish Info */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                    <button onClick={() => { if (form.parish && form.contact && form.email) setStep(2); }} style={{ background: brown, color: cream, border: "none", padding: "14px 36px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Next: Select Dates →</button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date Selection */}
              {step === 2 && (
                <div>
                  <p style={{ ...prose, fontSize: 15, marginBottom: 8 }}>Select one or more Saturdays that would work for your parish. We will confirm availability.</p>
                  <p style={{ fontSize: 13, color: muted, marginBottom: 24 }}>Retreats are held on Saturdays, typically 8:00 AM – 4:00 PM. Select all dates that could work.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 24 }}>
                    {saturdays.map(d => {
                      const key = d.toISOString();
                      const selected = form.selectedDates.includes(key);
                      return (
                        <button key={key} onClick={() => toggleDate(d)} style={{ background: selected ? `${brown}15` : bg, border: `2px solid ${selected ? brown : borderC}`, borderRadius: 8, padding: "14px 16px", fontFamily: font, fontSize: 15, color: selected ? brown : ink, cursor: "pointer", textAlign: "left", fontWeight: selected ? 700 : 400, transition: "all 0.2s" }}>
                          <Clock size={14} color={selected ? brown : muted} style={{ verticalAlign: "middle", marginRight: 8 }} />
                          {fmt(d)}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Other dates or notes about scheduling</label>
                    <textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={form.preferOther} onChange={set("preferOther")} placeholder="e.g. We could also do a Friday, or any Saturday in Lent..." />
                  </div>
                  {form.selectedDates.length > 0 && (
                    <div style={{ background: bg, border: `1px solid ${borderC}`, borderRadius: 8, padding: 16, marginBottom: 24 }}>
                      <p style={{ fontSize: 13, color: brown, fontWeight: 700, marginBottom: 8 }}>Selected ({form.selectedDates.length}):</p>
                      {form.selectedDates.map(d => <p key={d} style={{ fontSize: 14, color: ink, marginBottom: 4 }}>{fmt(new Date(d))}</p>)}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <button onClick={() => setStep(1)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "14px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, color: stone, cursor: "pointer" }}>← Back</button>
                    <button onClick={() => { if (form.selectedDates.length > 0 || form.preferOther) setStep(3); }} style={{ background: brown, color: cream, border: "none", padding: "14px 36px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Next: Logistics →</button>
                  </div>
                </div>
              )}

              {/* STEP 3: Logistics */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Preferred Start Time</label>
                    <select style={inputStyle} value={form.startTime} onChange={set("startTime")}>
                      <option value="7:30 AM">7:30 AM</option>
                      <option value="8:00 AM">8:00 AM (recommended)</option>
                      <option value="8:30 AM">8:30 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Dietary needs or meal notes</label>
                    <textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={form.mealNeeds} onChange={set("mealNeeds")} placeholder="e.g. We have 5 gluten-free, vegetarian options needed..." />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>What your parish can contribute</label>
                    <input style={inputStyle} value={form.contribution} onChange={set("contribution")} placeholder="Any amount, including $0" />
                    <p style={{ fontSize: 13, color: muted, marginTop: 6 }}>This is not a fee — it's a free-will offering to help cover travel and materials.</p>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: font, fontSize: 14, color: brown, fontWeight: 600, marginBottom: 6 }}>Anything else we should know?</label>
                    <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.notes} onChange={set("notes")} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <button onClick={() => setStep(2)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "14px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, color: stone, cursor: "pointer" }}>← Back</button>
                    <button onClick={() => setStep(4)} style={{ background: brown, color: cream, border: "none", padding: "14px 36px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Next: Review →</button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Submit */}
              {step === 4 && (
                <div>
                  <p style={{ ...prose, fontSize: 15, marginBottom: 24 }}>Please review your information before submitting.</p>
                  <div style={{ background: bg, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>PARISH</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.parish}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>DIOCESE</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.diocese}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>LOCATION</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.city}, {form.state}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>CONTACT</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.contact}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>EMAIL</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.email}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>PHONE</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.phone || "—"}</p></div>
                    </div>
                    <div style={{ borderTop: `1px solid ${borderC}`, paddingTop: 16, marginBottom: 16 }}>
                      <p style={{ fontSize: 12, color: muted, fontWeight: 700, marginBottom: 8 }}>PREFERRED DATES</p>
                      {form.selectedDates.map(d => <p key={d} style={{ fontSize: 15, color: ink, marginBottom: 4 }}>{fmt(new Date(d))}</p>)}
                      {form.preferOther && <p style={{ fontSize: 14, color: stone, fontStyle: "italic", marginTop: 4 }}>{form.preferOther}</p>}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>PARTICIPANTS</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.participants || "TBD"}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>CHAPEL</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.chapel === "yes" ? "Yes" : "Needs arrangement"}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>START TIME</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.startTime}</p></div>
                      <div><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>CONTRIBUTION</p><p style={{ fontSize: 16, color: ink, marginTop: 4 }}>{form.contribution || "To be discussed"}</p></div>
                    </div>
                    {form.mealNeeds && <div style={{ borderTop: `1px solid ${borderC}`, paddingTop: 16, marginTop: 16 }}><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>MEAL NOTES</p><p style={{ fontSize: 15, color: ink, marginTop: 4 }}>{form.mealNeeds}</p></div>}
                    {form.notes && <div style={{ borderTop: `1px solid ${borderC}`, paddingTop: 16, marginTop: 16 }}><p style={{ fontSize: 12, color: muted, fontWeight: 700 }}>ADDITIONAL NOTES</p><p style={{ fontSize: 15, color: ink, marginTop: 4 }}>{form.notes}</p></div>}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => setStep(3)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "14px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, color: stone, cursor: "pointer" }}>← Back</button>
                    <button onClick={async () => { await saveRetreatRequest(form); await addNewsletterSubscriber(form.email, form.contact, "retreat"); setSubmitted(true); }} style={{ background: brown, color: cream, border: "none", padding: "16px 48px", borderRadius: 6, fontFamily: font, fontSize: 17, fontWeight: 600, letterSpacing: 1, cursor: "pointer" }}>Submit Request</button>
                  </div>
                </div>
              )}
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
