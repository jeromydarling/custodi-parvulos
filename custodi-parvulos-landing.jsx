import { useState, useEffect, useRef } from "react";
import { Sparkles, Diamond, Hexagon, Cross, Church, Sun, Circle, Leaf, Star, Bird, Crown, Flame, ArrowDown, BookOpen, Heart, Shield, Users, ChevronDown } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   CUSTODI PARVULOS — Landing Page
   "The crisis didn't happen because we lacked compliance.
    It happened because we lacked formation."
   ═══════════════════════════════════════════════════════ */

const PelicanLogo = ({ size = 48, color = "#6B3A2A" }) => {
  const r = "#8B2500";
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"block",margin:"0 auto"}}>
      <circle cx="80" cy="28" r="14" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <ellipse cx="80" cy="28" rx="7" ry="8" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="82" cy="26" r="1.4" fill={color} />
      <path d="M80 34 L83 38 L80 58" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 34 L77 38 L80 58" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 35 C74 42, 72 48, 72 56" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M84 35 C86 42, 88 48, 88 56" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M72 56 C64 48, 50 40, 34 36 C26 34, 20 36, 18 40" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 40 C22 38, 28 40, 32 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M26 38 C30 36, 36 38, 40 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M34 36 C38 34, 44 37, 48 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M44 38 C48 36, 52 39, 56 46" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M20 42 C20 56, 22 74, 26 92" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M28 40 C27 54, 28 72, 32 88" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M36 38 C34 52, 34 70, 38 86" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M44 40 C42 52, 42 68, 44 84" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M52 44 C50 56, 49 68, 50 82" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M58 48 C56 58, 55 68, 56 80" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M26 92 C30 90, 34 88, 38 86 C42 84, 46 83, 50 82 C53 81, 55 80, 56 80" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M88 56 C96 48, 110 40, 126 36 C134 34, 140 36, 142 40" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M142 40 C138 38, 132 40, 128 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M134 38 C130 36, 124 38, 120 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M126 36 C122 34, 116 37, 112 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M116 38 C112 36, 108 39, 104 46" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M140 42 C140 56, 138 74, 134 92" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M132 40 C133 54, 132 72, 128 88" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M124 38 C126 52, 126 70, 122 86" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M116 40 C118 52, 118 68, 116 84" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M108 44 C110 56, 111 68, 110 82" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M102 48 C104 58, 105 68, 104 80" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M134 92 C130 90, 126 88, 122 86 C118 84, 114 83, 110 82 C107 81, 105 80, 104 80" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="74" rx="16" ry="14" stroke={color} strokeWidth="2" fill="none" />
      <path d="M78 62 C79 64, 81 64, 82 62" stroke={r} strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="68" r="2" fill={r} />
      <circle cx="76" cy="72" r="1.6" fill={r} />
      <circle cx="84" cy="72" r="1.6" fill={r} />
      <ellipse cx="68" cy="104" rx="7" ry="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M70 98 C69 94, 74 89, 77 86" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="102" r="1" fill={color} />
      <ellipse cx="80" cy="106" rx="7" ry="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M80 100 C80 96, 80 92, 80 86" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="82" cy="104" r="1" fill={color} />
      <ellipse cx="92" cy="104" rx="7" ry="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M90 98 C91 94, 86 89, 83 86" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="90" cy="102" r="1" fill={color} />
      <path d="M52 110 C58 120, 68 126, 80 126 C92 126, 102 120, 108 110" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M56 112 C62 118, 70 122, 80 122 C90 122, 98 118, 104 112" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
};

const Divider = () => <div style={{width:80,height:1,background:"linear-gradient(90deg, transparent, #B8A080, transparent)",margin:"32px auto"}} />;

const FadeIn = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [expandedPart, setExpandedPart] = useState(null);

  const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";
  const bg = "#F5EDE0";
  const ink = "#3B2A1A";
  const brown = "#6B3A2A";
  const red = "#8B2500";
  const stone = "#8B7355";
  const muted = "#B8A080";
  const cream = "#FFFDF7";
  const borderC = "#E8DCC8";

  const sectionStyle = { maxWidth: 760, margin: "0 auto", padding: "0 24px" };
  const prose = { fontFamily: font, fontSize: 18, lineHeight: 1.9, color: "#4A3828" };
  const heading = { fontFamily: font, color: brown, fontWeight: 700, margin: 0 };

  const parts = [
    { num: "I", latin: "Creatio", title: "Creation", Icon: Sparkles, color: "#C9A84C",
      desc: "We begin where God begins: with the original design of the human person. The Theology of the Body reveals that the body is not merely biological — it is a revelation of the person, made for self-giving love. Before we can understand what went wrong, we must recover the vision of what was intended." },
    { num: "II", latin: "Lapsus", title: "The Fall", Icon: Diamond, color: "#8B4553",
      desc: "The John Jay College studies documented what happened: 10,667 allegations, a crisis that peaked in the 1970s, and a constellation of causes including inadequate human formation, psychosexual immaturity, and institutional failure. This is the Church's examination of conscience — unflinching, data-driven, necessary." },
    { num: "III", latin: "Formatio Populi Sancti", title: "The Formation of a Holy People", Icon: Hexagon, color: "#4A7C59",
      desc: "God does not abandon His people after the Fall. Here, the empirical data meets the theological doctrine. Paul VI's prophetic warnings converge with the John Jay timeline. The Church's own teaching diagnoses the crisis and points toward the cure: formation of the whole person." },
    { num: "IV", latin: "Messias", title: "The Messiah", Icon: Cross, color: "#9B2335",
      desc: "At the center stands the Cross. Christ reveals that the human person is made for self-gift. The five wounds of Christ correspond to five dimensions of the Church's healing. The redemption of the body is real — not a slogan, but a lived transformation through grace, sacrament, and community." },
    { num: "V", latin: "Ecclesia", title: "The Church", Icon: Church, color: "#2E5E8E",
      desc: "From the wounded side of Christ flows the Church, sent into the world to protect, heal, and serve. This is where vision becomes action: structures of accountability, cultures of transparency, care for survivors, and the ongoing mission of safeguarding — empowered by the Holy Spirit." },
  ];

  const days = [
    { day: "I", latin: "Lux", title: "Light", Icon: Sun, sub: "The Truth About the Human Person" },
    { day: "II", latin: "Firmamentum", title: "The Firmament", Icon: Circle, sub: "The Language of the Body" },
    { day: "III", latin: "Terra et Herba", title: "Dry Land & Vegetation", Icon: Leaf, sub: "Concupiscence & Self-Mastery" },
    { day: "IV", latin: "Luminaria", title: "Lights to Govern", Icon: Star, sub: "Recognizing, Responding, Reporting" },
    { day: "V", latin: "Vita Abundans", title: "Teeming Life", Icon: Bird, sub: "Building a Culture of Protection" },
    { day: "VI", latin: "Imago Dei", title: "Image of God", Icon: Crown, sub: "Living the Truth — A Vocation for All" },
    { day: "VII", latin: "Sabbatum", title: "Sabbath Rest", Icon: Flame, sub: "Eucharistic Holy Hour & Commitment" },
  ];

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      {/* Texture */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", pointerEvents: "none", zIndex: 0 }} />

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "60px 24px 60px" }}>
        <FadeIn>
          <div className="hero-pelican">
            <PelicanLogo size={160} color={brown} />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginTop: 12, letterSpacing: 1 }}>Pie Pelicane, custodi parvulos</p>
          <p style={{ color: muted, fontSize: 12, fontStyle: "italic", marginBottom: 24 }}>O loving Pelican, guard the little ones</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <h1 style={{ ...heading, fontSize: "clamp(32px, 7vw, 48px)", letterSpacing: 4, textTransform: "uppercase" }}>Custodi Parvulos</h1>
          <p style={{ fontSize: 17, color: stone, fontStyle: "italic", marginTop: 8 }}>Guard the Little Ones</p>
        </FadeIn>
        <FadeIn delay={0.6}>
          <p style={{ ...prose, maxWidth: 560, margin: "32px auto 0", fontSize: 17 }}>
            How the Drama of Salvation Leads to Renewal
          </p>
        </FadeIn>
        <FadeIn delay={0.8}>
          <div style={{ marginTop: 40 }}>
            <ArrowDown size={20} color={muted} style={{ margin: "0 auto", animation: "gentleBounce 2s infinite" }} />
          </div>
        </FadeIn>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 24px 80px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <Divider />
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
              The abuse crisis did not happen because the Church lacked a compliance program.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "24px auto 0" }}>
              It happened because men who were ordained to be spiritual fathers had never been formed in the truth about the human person — the truth about the body, about love, about the self-mastery that makes authentic love possible.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "24px auto 0" }}>
              The John Jay College of Criminal Justice confirmed this. Their landmark studies found that the single factor most strongly associated with the sustained decline in abuse was not policy, not background checks, not zero-tolerance rules — it was <em>human formation</em>.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "24px auto 0", fontStyle: "italic", color: red }}>
              Formation works. Compliance alone does not.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WHAT THIS IS ═══ */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>WHAT IS CUSTODI PARVULOS</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 32 }}>Not a Training. A Formation.</h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ ...prose, marginBottom: 24 }}>
              Custodi Parvulos is a comprehensive safe environment formation program rooted in two of the Catholic Church's most profound documents — St. John Paul II's <em>Theology of the Body</em> and Pope St. Paul VI's <em>Humanae Vitae</em> — and informed by the empirical findings of the John Jay College studies on the causes and context of clergy sexual abuse.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p style={{ ...prose, marginBottom: 24 }}>
              It is structured around the Drama of Salvation — the great narrative arc of Scripture from Creation through the Fall, the Formation of a Holy People, the coming of the Messiah, and the life of the Church. This is not an arbitrary framework. It is the way God Himself teaches: through story, through history, through progressive revelation.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p style={prose}>
              Instead of tests to pass, participants engage in Lectio Divina, examinations of conscience, scenario-based discernment, and private journaling. Instead of clicking through slides, they journey through a contemplative experience shaped by Ignatian spirituality. The goal is not a checkbox — it is a conversion of heart.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="features-grid" style={{ display: "grid", gap: 24, marginTop: 48 }}>
              {[
                { Icon: BookOpen, label: "5 Parts", sub: "Drama Salutis", desc: "A journey through salvation history" },
                { Icon: Sun, label: "7 Modules", sub: "Hebdomada Creationis", desc: "Following the days of Creation" },
                { Icon: Heart, label: "Ignatian Rhythm", sub: "Lectio · Examen · Discernment", desc: "Formation, not information" },
                { Icon: Shield, label: "John Jay Informed", sub: "Empirical foundation", desc: "Data-driven, theologically grounded" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
                  <item.Icon size={28} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                  <p style={{ fontWeight: 700, color: brown, marginTop: 12, fontSize: 15 }}>{item.label}</p>
                  <p style={{ color: red, fontSize: 13, fontStyle: "italic", marginTop: 2 }}>{item.sub}</p>
                  <p style={{ color: stone, fontSize: 14, marginTop: 6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ THE FIVE PARTS ═══ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>THE FIVE PARTS</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center" }}>Drama Salutis</h2>
            <p style={{ color: stone, fontSize: 16, textAlign: "center", fontStyle: "italic", marginTop: 8, marginBottom: 48 }}>Each part is accompanied by meditations on the Five Wounds of Christ, the five senses, the mysteries of the Rosary, the Precepts of the Church, and the books of the Pentateuch.</p>
          </FadeIn>

          {parts.map((part, i) => (
            <FadeIn key={part.num} delay={i * 0.1}>
              <div
                onClick={() => setExpandedPart(expandedPart === i ? null : i)}
                style={{ background: cream, border: `1px solid ${part.color}25`, borderRadius: 8, padding: "20px 20px", marginBottom: 16, cursor: "pointer", transition: "all 0.3s", boxShadow: "0 1px 4px rgba(107,58,42,0.06)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <part.Icon size={22} color={part.color} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ color: part.color, fontWeight: 700, fontSize: 12, letterSpacing: 2, display: "block" }}>PART {part.num}</span>
                    <span style={{ fontSize: 19, fontWeight: 600, color: ink, display: "block", marginTop: 2 }}>{part.title}</span>
                    <span style={{ color: red, fontSize: 13, fontStyle: "italic", display: "block", marginTop: 2 }}>{part.latin}</span>
                  </div>
                  <ChevronDown size={18} color={muted} style={{ flexShrink: 0, transition: "transform 0.3s", transform: expandedPart === i ? "rotate(180deg)" : "rotate(0)", marginTop: 4 }} />
                </div>
                {expandedPart === i && (
                  <p style={{ ...prose, fontSize: 16, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${borderC}` }}>
                    {part.desc}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ THE SEVEN MODULES ═══ */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>THE SEVEN MODULES</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center" }}>Hebdomada Creationis</h2>
            <p style={{ color: stone, fontSize: 16, textAlign: "center", fontStyle: "italic", marginTop: 8, marginBottom: 48 }}>Each module follows a day of Creation, moving from light to rest — from the first act of seeing to the Eucharistic encounter that is the goal of all formation.</p>
          </FadeIn>

          <div className="days-grid" style={{ display: "grid", gap: 16 }}>
            {days.map((d, i) => (
              <FadeIn key={d.day} delay={i * 0.08}>
                <div style={{ background: bg, border: `1px solid ${borderC}`, borderRadius: 8, padding: "20px 24px", textAlign: "center" }}>
                  <d.Icon size={20} color={brown} strokeWidth={1.5} style={{ margin: "0 auto 8px", display: "block" }} />
                  <span style={{ color: brown, fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>DIES {d.day}</span>
                  <p style={{ fontSize: 18, fontWeight: 600, color: ink, margin: "6px 0 2px" }}>{d.title}</p>
                  <p style={{ color: red, fontSize: 13, fontStyle: "italic", margin: "0 0 6px" }}>{d.latin}</p>
                  <p style={{ color: stone, fontSize: 14, margin: 0 }}>{d.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p style={{ ...prose, fontSize: 15, fontStyle: "italic", maxWidth: 480, margin: "0 auto" }}>
                The seventh day is not an afterthought. It is the purpose of the entire week. The six days of formation lead to the Eucharistic encounter where Christ speaks the words at the heart of the Theology of the Body:
              </p>
              <p style={{ color: red, fontSize: 18, fontStyle: "italic", marginTop: 16, fontWeight: 600 }}>
                "This is my body, given for you."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ THE DIFFERENCE ═══ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>FROM COMPLIANCE TO CONVERSION</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 48 }}>What Makes This Different</h2>
          </FadeIn>

          <div className="comparison-grid" style={{ maxWidth: 640, margin: "0 auto" }}>
            <FadeIn>
              <div className="comparison-col" style={{ padding: "24px 20px" }}>
                <p style={{ color: muted, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 16, textAlign: "center" }}>TYPICAL TRAINING</p>
                {["Watch a video", "Answer quiz questions", "Print a certificate", "Repeat annually", "Check a box", "Forget by next week"].map((t, i) => (
                  <p key={i} style={{ color: muted, fontSize: 15, marginBottom: 8, lineHeight: 1.6, textAlign: "center" }}>{t}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ padding: "24px 20px" }}>
                <p style={{ color: brown, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 16, textAlign: "center" }}>CUSTODI PARVULOS</p>
                {[
                  "Journey through salvation history",
                  "Pray with Scripture (Lectio Divina)",
                  "Examine your conscience (Ignatian Examen)",
                  "Discern through real scenarios",
                  "Reflect in a private journal",
                  "Encounter Christ in the Eucharist"
                ].map((t, i) => (
                  <p key={i} style={{ color: ink, fontSize: 15, marginBottom: 8, lineHeight: 1.6, fontWeight: 500, textAlign: "center" }}>{t}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ WHO IT'S FOR ═══ */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>WHO THIS IS FOR</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 16 }}>For Every Parish, Free of Charge</h2>
            <p style={{ ...prose, textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
              Custodi Parvulos is free for all parishes, schools, and religious communities. It is designed to supplement existing safe environment compliance requirements — not replace them — by providing the theological depth that current programs lack.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="audience-grid" style={{ display: "grid", gap: 24 }}>
              {[
                { Icon: Cross, label: "Clergy", desc: "Priests, deacons, and seminarians" },
                { Icon: Users, label: "Staff & Volunteers", desc: "Teachers, catechists, coaches, ministers" },
                { Icon: Church, label: "Parish Leaders", desc: "DREs, safe environment coordinators" },
                { Icon: Shield, label: "Diocesan Officials", desc: "Multi-parish oversight and reporting" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center", padding: "16px" }}>
                  <item.Icon size={24} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                  <p style={{ fontWeight: 700, color: brown, marginTop: 10, fontSize: 15 }}>{item.label}</p>
                  <p style={{ color: stone, fontSize: 14, marginTop: 4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ THEOLOGICAL FOUNDATION ═══ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>BUILT ON</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 48 }}>Three Pillars of Truth</h2>
          </FadeIn>

          {[
            { title: "The Theology of the Body", author: "St. John Paul II, 1979–1984", desc: "129 catechetical addresses revealing that the human body is not merely biological — it is a revelation of the person, made for self-giving love. The body makes visible what is invisible: the spiritual and the divine. This is the positive vision that makes abuse unthinkable." },
            { title: "Humanae Vitae", author: "Pope St. Paul VI, 1968", desc: "The prophetic encyclical that warned what would happen when sexuality was severed from its true meaning — a general lowering of moral standards, a loss of respect for the person, and the conditions in which the abuse crisis emerged. Its predictions have been confirmed by the John Jay timeline." },
            { title: "The John Jay Studies", author: "John Jay College of Criminal Justice, 2004 & 2011", desc: "The most comprehensive empirical examination of the clergy abuse crisis ever undertaken. Their critical finding: the development of human formation curricula in seminaries is directly associated with the sustained decline in abuse. Formation works." },
          ].map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ ...heading, fontSize: 22, marginBottom: 4 }}>{pillar.title}</h3>
                <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginBottom: 12 }}>{pillar.author}</p>
                <p style={prose}>{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, padding: "80px 24px 60px" }}>
        <div style={{ ...sectionStyle, textAlign: "center" }}>
          <FadeIn>
            <PelicanLogo size={100} color={brown} />
            <h2 style={{ ...heading, fontSize: 28, marginTop: 20 }}>From Compliance to Conversion</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ ...prose, maxWidth: 560, margin: "20px auto 0", textAlign: "center" }}>
              The John Jay studies showed that human formation works. The Theology of the Body provides the content and vision for that formation. Humanae Vitae provides the prophetic framework for understanding what happens when that vision is abandoned.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ ...prose, maxWidth: 560, margin: "20px auto 0", textAlign: "center" }}>
              Together, they offer the Church a path that protects the innocent, heals the wounded, holds the guilty accountable, and renews the Church's witness to the world.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ marginTop: 40 }}>
              <button style={{ background: `${brown}10`, border: `1px solid ${brown}40`, color: brown, padding: "16px 48px", borderRadius: 6, cursor: "pointer", fontFamily: font, fontSize: 17, letterSpacing: 1, fontWeight: 600 }}>
                Begin the Journey
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.55}>
            <Divider />
            <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginTop: 8 }}>Pie Pelicane, custodi parvulos</p>
            <p style={{ color: muted, fontSize: 12, fontStyle: "italic", marginTop: 2 }}>O loving Pelican, guard the little ones</p>
            <p style={{ color: muted, fontSize: 11, marginTop: 24, letterSpacing: 2, textTransform: "uppercase" }}>Safe Environment Training Portal</p>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #6B3A2A20; }

        /* Grid defaults - desktop */
        .features-grid { grid-template-columns: repeat(4, 1fr); }
        .audience-grid { grid-template-columns: repeat(4, 1fr); }
        .days-grid { grid-template-columns: repeat(3, 1fr); }
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .comparison-col {
          border-right: 1px solid #E8DCC8;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .audience-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .days-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Mobile */
        @media (max-width: 520px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .audience-grid { grid-template-columns: 1fr !important; }
          .days-grid { grid-template-columns: 1fr !important; }
          .comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .comparison-col {
            border-right: none !important;
            border-bottom: 1px solid #E8DCC8;
            padding-bottom: 24px !important;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}
