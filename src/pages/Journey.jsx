import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, LogOut, ChevronDown, BookOpen, MessageCircle, Hand } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { getCurrentUser, getProgress, completePart, logout } from "../store";
import { PARTS } from "../custodi-content";

export default function Journey() {
  const nav = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [progress, setProgress] = useState(getProgress());
  const [activePart, setActivePart] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => { if (!user) nav("/start"); }, [user, nav]);
  useEffect(() => { setSectionIndex(0); setConfirmed(false); }, [activePart]);

  const done = Object.keys(progress).length;
  const allDone = done >= 5;
  const handleComplete = (partId) => { completePart(partId); setProgress(getProgress()); setActivePart(null); };
  const handleLogout = () => { logout(); nav("/"); };

  if (!user) return null;

  const active = activePart != null ? PARTS.find(p => p.id === activePart) : null;

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

      <div style={{ ...sectionStyle, maxWidth: 760, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        {/* Header & progress */}
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

        {/* Part list (when no part is active) */}
        {!active && PARTS.map((part, i) => {
          const isComplete = !!progress[part.id];
          return (
            <FadeIn key={part.id} delay={i * 0.08}>
              <div onClick={() => setActivePart(part.id)}
                style={{ background: cream, border: `1px solid ${isComplete ? "#4A7C5940" : `${part.color}25`}`, borderRadius: 8, marginBottom: 12, padding: "20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.3s" }}>
                {isComplete ? <CheckCircle size={22} color="#4A7C59" /> : <part.Icon size={22} color={part.color} strokeWidth={1.5} />}
                <div style={{ flex: 1 }}>
                  <span style={{ color: isComplete ? "#4A7C59" : part.color, fontWeight: 700, fontSize: 12, letterSpacing: 2 }}>PART {part.num}</span>
                  <span style={{ fontSize: 18, fontWeight: 600, color: isComplete ? stone : ink, display: "block", marginTop: 2 }}>{part.title}</span>
                  <span style={{ color: red, fontSize: 13, fontStyle: "italic" }}>{part.latin}</span>
                </div>
                {isComplete && <span style={{ fontSize: 12, color: "#4A7C59" }}>{new Date(progress[part.id]).toLocaleDateString()}</span>}
                <ChevronDown size={18} color={muted} style={{ transform: "rotate(-90deg)" }} />
              </div>
            </FadeIn>
          );
        })}

        {/* Full part content (when a part is active) */}
        {active && (
          <div>
            {/* Back button */}
            <button onClick={() => setActivePart(null)} style={{ background: "none", border: "none", fontFamily: font, color: stone, fontSize: 14, cursor: "pointer", marginBottom: 24, padding: 0 }}>
              ← Back to all parts
            </button>

            {/* Part header */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <active.Icon size={32} color={active.color} strokeWidth={1.3} style={{ display: "block", margin: "0 auto" }} />
              <p style={{ color: active.color, fontWeight: 700, fontSize: 12, letterSpacing: 2, marginTop: 12 }}>PART {active.num}</p>
              <h2 style={{ ...heading, fontSize: 30, marginTop: 4 }}>{active.title}</h2>
              <p style={{ color: red, fontSize: 15, fontStyle: "italic", marginTop: 4 }}>{active.latin}</p>
              <p style={{ color: stone, fontSize: 16, marginTop: 8 }}>{active.subtitle}</p>
            </div>

            {/* Scripture */}
            <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, textAlign: "center", marginBottom: 32 }}>
              <p style={{ ...prose, fontStyle: "italic", fontSize: 17 }}>"{active.scripture.text}"</p>
              <p style={{ color: red, fontSize: 14, marginTop: 8, fontWeight: 600 }}>— {active.scripture.ref}</p>
            </div>

            {/* Meditation framework */}
            <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 32 }}>
              <p style={{ color: red, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>MEDITATION FRAMEWORK</p>
              {Object.values(active.meditation).map((m, i) => (
                <div key={i} style={{ marginBottom: i < 4 ? 12 : 0 }}>
                  <span style={{ fontWeight: 700, color: brown, fontSize: 14 }}>{m.label}: </span>
                  <span style={{ color: ink, fontSize: 14 }}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Introduction */}
            {active.introduction && (
              <div style={{ marginBottom: 32 }}>
                {active.introduction.split("\n\n").map((para, i) => (
                  <p key={i} style={{ ...prose, marginBottom: 16 }}>{para}</p>
                ))}
              </div>
            )}

            {/* Section navigation */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {active.sections.map((s, i) => (
                <button key={i} onClick={() => setSectionIndex(i)}
                  style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${sectionIndex === i ? active.color : borderC}`, background: sectionIndex === i ? `${active.color}12` : cream, fontFamily: font, fontSize: 13, color: sectionIndex === i ? active.color : stone, cursor: "pointer", fontWeight: sectionIndex === i ? 700 : 400 }}>
                  {i + 1}. {s.title.length > 30 ? s.title.slice(0, 30) + "..." : s.title}
                </button>
              ))}
            </div>

            {/* Current section */}
            {active.sections[sectionIndex] && (() => {
              const sec = active.sections[sectionIndex];
              return (
                <div>
                  <h3 style={{ ...heading, fontSize: 22, marginBottom: 16 }}>{sec.title}</h3>
                  {sec.content.split("\n\n").map((para, i) => (
                    <p key={i} style={{ ...prose, marginBottom: 16 }}>{para}</p>
                  ))}

                  {/* Reflection pause */}
                  {sec.reflectionPause && (
                    <div style={{ background: `${red}06`, border: `1px solid ${red}20`, borderRadius: 8, padding: 20, margin: "24px 0" }}>
                      <p style={{ color: red, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                        <Hand size={14} /> PAUSE FOR REFLECTION
                      </p>
                      <p style={{ ...prose, fontSize: 15, fontStyle: "italic" }}>{sec.reflectionPause}</p>
                    </div>
                  )}

                  {/* Discussion questions */}
                  {sec.discussionQuestions && sec.discussionQuestions.length > 0 && (
                    <div style={{ background: `${brown}08`, border: `1px solid ${brown}20`, borderRadius: 8, padding: 20, margin: "24px 0" }}>
                      <p style={{ color: brown, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <MessageCircle size={14} /> DISCUSSION QUESTIONS
                      </p>
                      {sec.discussionQuestions.map((q, qi) => (
                        <p key={qi} style={{ ...prose, fontSize: 15, marginBottom: qi < sec.discussionQuestions.length - 1 ? 12 : 0 }}>
                          {qi + 1}. {q}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Section navigation buttons */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                    {sectionIndex > 0 ? (
                      <button onClick={() => { setSectionIndex(sectionIndex - 1); window.scrollTo(0, 0); }}
                        style={{ background: "none", border: `1px solid ${borderC}`, padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, color: stone, cursor: "pointer" }}>
                        ← Previous
                      </button>
                    ) : <div />}
                    {sectionIndex < active.sections.length - 1 ? (
                      <button onClick={() => { setSectionIndex(sectionIndex + 1); window.scrollTo(0, 0); }}
                        style={{ background: brown, color: cream, border: "none", padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                        Next →
                      </button>
                    ) : (
                      <button onClick={() => { setSectionIndex(-1); window.scrollTo(0, 0); }}
                        style={{ background: brown, color: cream, border: "none", padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                        Continue to Lectio Divina →
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Lectio Divina (shown after all sections) */}
            {sectionIndex === -1 && active.lectio && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <BookOpen size={28} color={brown} strokeWidth={1.3} style={{ display: "block", margin: "0 auto" }} />
                  <p style={{ color: red, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginTop: 12 }}>LECTIO DIVINA</p>
                  <h3 style={{ ...heading, fontSize: 22, marginTop: 8 }}>Sacred Reading</h3>
                </div>

                <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, textAlign: "center", marginBottom: 24 }}>
                  <p style={{ ...prose, fontStyle: "italic", fontSize: 17 }}>"{active.lectio.text}"</p>
                  <p style={{ color: red, fontSize: 14, marginTop: 8, fontWeight: 600 }}>— {active.lectio.ref}</p>
                </div>

                {active.lectio.prompts.map((prompt, i) => (
                  <div key={i} style={{ background: `${brown}06`, border: `1px solid ${brown}15`, borderRadius: 8, padding: 20, marginBottom: 12 }}>
                    <p style={{ color: brown, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                      {["LECTIO", "MEDITATIO", "ORATIO", "CONTEMPLATIO"][i] || `STEP ${i + 1}`}
                    </p>
                    <p style={{ ...prose, fontSize: 15 }}>{prompt}</p>
                  </div>
                ))}

                {/* Final reflection */}
                {active.reflection && (
                  <div style={{ background: `${red}06`, border: `1px solid ${red}20`, borderRadius: 8, padding: 20, margin: "32px 0" }}>
                    <p style={{ color: red, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CLOSING REFLECTION</p>
                    <p style={{ ...prose, fontSize: 15, fontStyle: "italic" }}>{active.reflection}</p>
                  </div>
                )}

                {/* Completion */}
                {!progress[active.id] ? (
                  <div style={{ marginTop: 32, textAlign: "center" }}>
                    {!confirmed ? (
                      <button onClick={() => setConfirmed(true)} style={{ background: brown, color: cream, border: "none", padding: "14px 40px", borderRadius: 6, fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                        I have completed this part
                      </button>
                    ) : (
                      <div style={{ background: `${red}08`, border: `1px solid ${red}25`, borderRadius: 8, padding: 20, maxWidth: 480, margin: "0 auto" }}>
                        <p style={{ fontSize: 15, color: ink, marginBottom: 16, lineHeight: 1.7 }}>By marking this complete, you confirm you have read all sections, reflected on the discussion questions, and prayed through the Lectio Divina.</p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                          <button onClick={() => handleComplete(active.id)} style={{ background: "#4A7C59", color: cream, border: "none", padding: "12px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                            Confirm Complete
                          </button>
                          <button onClick={() => setConfirmed(false)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "12px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, color: stone, cursor: "pointer" }}>
                            Go Back
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ color: "#4A7C59", fontSize: 15, marginTop: 32, fontWeight: 600, textAlign: "center" }}>
                    <CheckCircle size={16} style={{ verticalAlign: "middle", marginRight: 6 }} />
                    Completed {new Date(progress[active.id]).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
