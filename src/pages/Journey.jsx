import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Diamond, Hexagon, Cross, Church, CheckCircle, Lock, LogOut, ArrowLeft, ChevronDown } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { getCurrentUser, getProgress, completePart, logout } from "../store";

const PARTS = [
  { id: "creation", num: "I", latin: "Creatio", title: "Creation", subtitle: "The Original Design of the Human Person", Icon: Sparkles, color: "#C9A84C",
    summary: "The Theology of the Body reveals that the human body is a revelation of the person, made for self-giving love. We begin where God begins\u2009\u2014\u2009with the original design.",
    reflection: "How do you see the people you serve in ministry? Do you see them as images of God\u2009\u2014\u2009or have you allowed yourself to see anyone as less than fully human?" },
  { id: "fall", num: "II", latin: "Lapsus", title: "The Fall", subtitle: "What the John Jay Studies Revealed", Icon: Diamond, color: "#8B4553",
    summary: "The John Jay studies documented 10,667 allegations and found that the crisis peaked in the 1970s. The data rules out celibacy and points to inadequate human formation as the key factor.",
    reflection: "These are not abstract numbers. Each allegation represents a real person whose trust was violated. Allow yourself to feel the weight of this." },
  { id: "formation", num: "III", latin: "Formatio Populi Sancti", title: "Formation of a Holy People", subtitle: "Connecting Data to Doctrine", Icon: Hexagon, color: "#4A7C59",
    summary: "Paul VI\u2019s prophetic warnings in Humanae Vitae converge with the John Jay timeline. The Church\u2019s own teaching diagnoses the crisis and points toward the cure: formation of the whole person.",
    reflection: "Where do Paul VI\u2019s predictions show up in your own experience? In your community? In the broader culture?" },
  { id: "messiah", num: "IV", latin: "Messias", title: "The Messiah", subtitle: "The Five Wounds and the Path of Healing", Icon: Cross, color: "#9B2335",
    summary: "At the center stands the Cross. Christ reveals that the human person is made for self-gift. The five wounds correspond to five dimensions of healing the Church must undertake.",
    reflection: "Which of the five wounds speaks most to your own experience? Where do you see the need for healing in your community?" },
  { id: "ecclesia", num: "V", latin: "Ecclesia", title: "The Church", subtitle: "From Vision to Action", Icon: Church, color: "#2E5E8E",
    summary: "From the wounded side of Christ flows the Church, sent to protect, heal, and serve. Vision becomes action: structures of accountability, transparency, and care for survivors.",
    reflection: "What one concrete action will you take to build a culture of protection in your community?" },
];

export default function Journey() {
  const nav = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [progress, setProgress] = useState(getProgress());
  const [activePart, setActivePart] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => { if (!user) nav("/start"); }, [user, nav]);

  const done = Object.keys(progress).length;
  const allDone = done >= 5;

  const handleComplete = (partId) => {
    completePart(partId);
    setProgress(getProgress());
    setActivePart(null);
    setConfirmed(false);
  };

  const handleLogout = () => { logout(); nav("/"); };

  if (!user) return null;

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PelicanLogo size={32} color={brown} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: stone }}>{user.name}</span>
          <button onClick={handleLogout} style={{ background: "none", border: "none", fontFamily: font, color: stone, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </nav>

      <div style={{ ...sectionStyle, maxWidth: 700, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ ...heading, fontSize: 28 }}>Iter Formationis</h1>
            <p style={{ color: stone, fontSize: 15, fontStyle: "italic", marginTop: 4 }}>The Formation Journey</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              {PARTS.map(p => (
                <div key={p.id} style={{ width: 40, height: 6, borderRadius: 3, background: progress[p.id] ? "#4A7C59" : borderC }} />
              ))}
            </div>
            <p style={{ color: muted, fontSize: 13, marginTop: 8 }}>{done} of 5 parts completed</p>
          </div>
        </FadeIn>

        {allDone && (
          <FadeIn>
            <div style={{ background: "#4A7C5915", border: "1px solid #4A7C5940", borderRadius: 8, padding: 24, textAlign: "center", marginBottom: 32 }}>
              <CheckCircle size={32} color="#4A7C59" style={{ margin: "0 auto", display: "block" }} />
              <h2 style={{ ...heading, color: "#4A7C59", fontSize: 22, marginTop: 12 }}>Formation Complete</h2>
              <p style={{ color: stone, fontSize: 15, marginTop: 8 }}>Deo Gratias! You have completed all five parts of the Drama Salutis.</p>
            </div>
          </FadeIn>
        )}

        {/* Parts */}
        {PARTS.map((part, i) => {
          const isComplete = !!progress[part.id];
          const isActive = activePart === part.id;
          return (
            <FadeIn key={part.id} delay={i * 0.08}>
              <div style={{ background: cream, border: `1px solid ${isComplete ? "#4A7C5940" : `${part.color}25`}`, borderRadius: 8, marginBottom: 12, overflow: "hidden", transition: "all 0.3s" }}>
                <div onClick={() => setActivePart(isActive ? null : part.id)}
                  style={{ padding: "20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  {isComplete ? <CheckCircle size={22} color="#4A7C59" /> : <part.Icon size={22} color={part.color} strokeWidth={1.5} />}
                  <div style={{ flex: 1 }}>
                    <span style={{ color: isComplete ? "#4A7C59" : part.color, fontWeight: 700, fontSize: 12, letterSpacing: 2 }}>PART {part.num}</span>
                    <span style={{ fontSize: 18, fontWeight: 600, color: isComplete ? stone : ink, display: "block", marginTop: 2 }}>{part.title}</span>
                    <span style={{ color: red, fontSize: 13, fontStyle: "italic" }}>{part.latin}</span>
                  </div>
                  <ChevronDown size={18} color={muted} style={{ transition: "transform 0.3s", transform: isActive ? "rotate(180deg)" : "rotate(0)" }} />
                </div>

                {isActive && (
                  <div style={{ padding: "0 20px 24px", borderTop: `1px solid ${borderC}` }}>
                    <p style={{ fontWeight: 600, color: brown, fontSize: 15, marginTop: 16 }}>{part.subtitle}</p>
                    <p style={{ ...prose, fontSize: 15, marginTop: 12 }}>{part.summary}</p>
                    <div style={{ background: `${bg}`, border: `1px solid ${borderC}`, borderRadius: 6, padding: 16, marginTop: 16 }}>
                      <p style={{ fontSize: 13, color: red, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>REFLECTION</p>
                      <p style={{ ...prose, fontSize: 15, fontStyle: "italic" }}>{part.reflection}</p>
                    </div>

                    {!isComplete && (
                      <div style={{ marginTop: 20 }}>
                        {!confirmed ? (
                          <button onClick={() => setConfirmed(true)} style={{ background: brown, color: cream, border: "none", padding: "12px 32px", borderRadius: 6, fontFamily: font, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                            I have read and reflected on this part
                          </button>
                        ) : (
                          <div style={{ background: `${red}08`, border: `1px solid ${red}25`, borderRadius: 6, padding: 16 }}>
                            <p style={{ fontSize: 14, color: ink, marginBottom: 12 }}>By marking this complete, you confirm you have read this material and spent time in prayerful reflection.</p>
                            <div style={{ display: "flex", gap: 12 }}>
                              <button onClick={() => handleComplete(part.id)} style={{ background: "#4A7C59", color: cream, border: "none", padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                                Confirm Complete
                              </button>
                              <button onClick={() => setConfirmed(false)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, color: stone, cursor: "pointer" }}>
                                Go Back
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {isComplete && <p style={{ color: "#4A7C59", fontSize: 14, marginTop: 16, fontWeight: 600 }}>Completed {new Date(progress[part.id]).toLocaleDateString()}</p>}
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
