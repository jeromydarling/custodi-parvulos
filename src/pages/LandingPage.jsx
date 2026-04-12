import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Diamond, Hexagon, Cross, Church, Sun, Circle, Leaf, Star, Bird, Crown, Flame, ArrowDown, BookOpen, Heart, Shield, Users, ChevronDown, Music, HandHeart, UtensilsCrossed } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { TestimonialCard } from "./Testimonials";

export default function LandingPage() {
  const [expandedPart, setExpandedPart] = useState(null);

  const parts = [
    { num: "I", latin: "Creatio", title: "Creation", Icon: Sparkles, color: "#C9A84C",
      desc: "We begin where God begins: with the original design of the human person. The Theology of the Body reveals that the body is not merely biological — it is a revelation of the person, made for self-giving love." },
    { num: "II", latin: "Lapsus", title: "The Fall", Icon: Diamond, color: "#8B4553",
      desc: "The John Jay College studies documented what happened: 10,667 allegations, a crisis that peaked in the 1970s, and a constellation of causes including inadequate human formation, psychosexual immaturity, and institutional failure." },
    { num: "III", latin: "Formatio Populi Sancti", title: "The Formation of a Holy People", Icon: Hexagon, color: "#4A7C59",
      desc: "God does not abandon His people after the Fall. The empirical data meets the theological doctrine. Paul VI's prophetic warnings converge with the John Jay timeline." },
    { num: "IV", latin: "Messias", title: "The Messiah", Icon: Cross, color: "#9B2335",
      desc: "At the center stands the Cross. Christ reveals that the human person is made for self-gift. The five wounds of Christ correspond to five dimensions of the Church's healing." },
    { num: "V", latin: "Ecclesia", title: "The Church", Icon: Church, color: "#2E5E8E",
      desc: "From the wounded side of Christ flows the Church, sent into the world to protect, heal, and serve. Vision becomes action: structures of accountability, cultures of transparency, care for survivors." },
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
      <div style={textureOverlay} />
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PelicanLogo size={32} color={brown} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
        </Link>
        <div style={{ display: "flex", gap: 20 }}>
          <Link to="/formation" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Formation</Link>
          <Link to="/retreat" style={{ fontFamily: font, color: red, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Parish Retreat</Link>
          <Link to="/resources" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Resources</Link>
          <Link to="/readings" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Readings</Link>
          <Link to="/testimonials" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>Testimonies</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "60px 24px" }}>
        <FadeIn><PelicanLogo size={160} color={brown} /></FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginTop: 12, letterSpacing: 1 }}>Pie Pelicane, custodi parvulos</p>
          <p style={{ color: muted, fontSize: 12, fontStyle: "italic", marginBottom: 24 }}>O loving Pelican, guard the little ones</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <h1 style={{ ...heading, fontSize: "clamp(32px, 7vw, 48px)", letterSpacing: 4, textTransform: "uppercase" }}>Custodi Parvulos</h1>
          <p style={{ fontSize: 17, color: stone, fontStyle: "italic", marginTop: 8 }}>Guard the Little Ones</p>
        </FadeIn>
        <FadeIn delay={0.6}>
          <p style={{ ...prose, maxWidth: 560, margin: "32px auto 0", fontSize: 17 }}>How the Drama of Salvation Leads to Renewal</p>
        </FadeIn>
        <FadeIn delay={0.8}>
          <ArrowDown size={20} color={muted} style={{ margin: "40px auto 0", display: "block", animation: "gentleBounce 2s infinite" }} />
        </FadeIn>
      </section>

      {/* THE PROBLEM */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 24px 80px" }}>
        <div style={sectionStyle}>
          <FadeIn><Divider />
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "0 auto" }}>The abuse crisis did not happen because the Church lacked a compliance program.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "24px auto 0" }}>It happened because men who were ordained to be spiritual fathers had never been formed in the truth about the human person — the truth about the body, about love, about the self-mastery that makes authentic love possible.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "24px auto 0" }}>The John Jay College of Criminal Justice confirmed this. Their landmark studies found that the single factor most strongly associated with the sustained decline in abuse was not policy, not background checks, not zero-tolerance rules — it was <em>human formation</em>.</p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <p style={{ ...prose, textAlign: "center", maxWidth: 620, margin: "24px auto 0", fontStyle: "italic", color: red }}>Formation works. Compliance alone does not.</p>
          </FadeIn>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>WHAT IS CUSTODI PARVULOS</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 32 }}>Not a Training. A Formation.</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ ...prose, marginBottom: 24 }}>Custodi Parvulos is a comprehensive safe environment formation program rooted in St. John Paul II's <em>Theology of the Body</em> and Pope St. Paul VI's <em>Humanae Vitae</em> — and informed by the empirical findings of the John Jay College studies on clergy sexual abuse.</p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p style={{ ...prose, marginBottom: 24 }}>It is structured around the Drama of Salvation — the great narrative arc of Scripture from Creation through the Fall, the Formation of a Holy People, the coming of the Messiah, and the life of the Church.</p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p style={prose}>Instead of tests to pass, participants engage in Lectio Divina, examinations of conscience, scenario-based discernment, and private journaling. The goal is not a checkbox — it is a conversion of heart.</p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, marginTop: 48 }}>
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

      {/* FIVE PARTS */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>THE FIVE PARTS</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center" }}>Drama Salutis</h2>
            <p style={{ color: stone, fontSize: 16, textAlign: "center", fontStyle: "italic", marginTop: 8, marginBottom: 48 }}>Each part is accompanied by meditations on the Five Wounds of Christ, the five senses, the mysteries of the Rosary, the Precepts of the Church, and the books of the Pentateuch.</p>
          </FadeIn>
          {parts.map((part, i) => (
            <FadeIn key={part.num} delay={i * 0.1}>
              <div onClick={() => setExpandedPart(expandedPart === i ? null : i)} style={{ background: cream, border: `1px solid ${part.color}25`, borderRadius: 8, padding: "20px", marginBottom: 16, cursor: "pointer", transition: "all 0.3s", boxShadow: "0 1px 4px rgba(107,58,42,0.06)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <part.Icon size={22} color={part.color} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ color: part.color, fontWeight: 700, fontSize: 12, letterSpacing: 2, display: "block" }}>PART {part.num}</span>
                    <span style={{ fontSize: 19, fontWeight: 600, color: ink, display: "block", marginTop: 2 }}>{part.title}</span>
                    <span style={{ color: red, fontSize: 13, fontStyle: "italic", display: "block", marginTop: 2 }}>{part.latin}</span>
                  </div>
                  <ChevronDown size={18} color={muted} style={{ flexShrink: 0, transition: "transform 0.3s", transform: expandedPart === i ? "rotate(180deg)" : "rotate(0)", marginTop: 4 }} />
                </div>
                {expandedPart === i && (
                  <p style={{ ...prose, fontSize: 16, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${borderC}` }}>{part.desc}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SEVEN MODULES */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>THE SEVEN MODULES</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center" }}>Hebdomada Creationis</h2>
            <p style={{ color: stone, fontSize: 16, textAlign: "center", fontStyle: "italic", marginTop: 8, marginBottom: 48 }}>Each module follows a day of Creation, moving from light to rest.</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
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
              <p style={{ ...prose, fontSize: 15, fontStyle: "italic", maxWidth: 480, margin: "0 auto" }}>The seventh day is not an afterthought. It is the purpose of the entire week. The six days of formation lead to the Eucharistic encounter:</p>
              <p style={{ color: red, fontSize: 18, fontStyle: "italic", marginTop: 16, fontWeight: 600 }}>"This is my body, given for you."</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE DIFFERENCE */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>FROM COMPLIANCE TO CONVERSION</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 48 }}>What Makes This Different</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 640, margin: "0 auto", gap: 0 }}>
            <FadeIn>
              <div style={{ padding: "24px 20px", borderRight: `1px solid ${borderC}` }}>
                <p style={{ color: muted, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 16, textAlign: "center" }}>TYPICAL TRAINING</p>
                {["Watch a video", "Answer quiz questions", "Print a certificate", "Repeat annually", "Check a box", "Forget by next week"].map((t, i) => (
                  <p key={i} style={{ color: muted, fontSize: 15, marginBottom: 8, lineHeight: 1.6, textAlign: "center" }}>{t}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ padding: "24px 20px" }}>
                <p style={{ color: brown, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 16, textAlign: "center" }}>CUSTODI PARVULOS</p>
                {["Journey through salvation history", "Pray with Scripture (Lectio Divina)", "Examine your conscience (Ignatian Examen)", "Discern through real scenarios", "Reflect in a private journal", "Encounter Christ in the Eucharist"].map((t, i) => (
                  <p key={i} style={{ color: ink, fontSize: 15, marginBottom: 8, lineHeight: 1.6, fontWeight: 500, textAlign: "center" }}>{t}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>WHO THIS IS FOR</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 16 }}>For Every Parish, Free of Charge</h2>
            <p style={{ ...prose, textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>Custodi Parvulos is free for all parishes, schools, and religious communities. It supplements existing safe environment compliance by providing the theological depth that current programs lack.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
              {[
                { Icon: Cross, label: "Clergy", desc: "Priests, deacons, and seminarians" },
                { Icon: Users, label: "Staff & Volunteers", desc: "Teachers, catechists, coaches, ministers" },
                { Icon: Church, label: "Parish Leaders", desc: "DREs, safe environment coordinators" },
                { Icon: Shield, label: "Diocesan Officials", desc: "Multi-parish oversight and reporting" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center", padding: 16 }}>
                  <item.Icon size={24} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                  <p style={{ fontWeight: 700, color: brown, marginTop: 10, fontSize: 15 }}>{item.label}</p>
                  <p style={{ color: stone, fontSize: 14, marginTop: 4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>BUILT ON</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 48 }}>Three Pillars of Truth</h2>
          </FadeIn>
          {[
            { title: "The Theology of the Body", author: "St. John Paul II, 1979–1984", desc: "129 catechetical addresses revealing that the human body is not merely biological — it is a revelation of the person, made for self-giving love." },
            { title: "Humanae Vitae", author: "Pope St. Paul VI, 1968", desc: "The prophetic encyclical that warned what would happen when sexuality was severed from its true meaning — predictions confirmed by the John Jay timeline." },
            { title: "The John Jay Studies", author: "John Jay College of Criminal Justice, 2004 & 2011", desc: "The most comprehensive empirical examination of the clergy abuse crisis. Their critical finding: human formation is directly associated with the sustained decline in abuse." },
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ ...heading, fontSize: 22, marginBottom: 4 }}>{p.title}</h3>
                <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginBottom: 12 }}>{p.author}</p>
                <p style={prose}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PARISH RETREAT CTA */}
      <section style={{ position: "relative", zIndex: 1, background: cream, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>BRING IT TO YOUR PARISH</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 16 }}>A Day of Formation in Adoration</h2>
            <p style={{ ...prose, textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>Gather your parish for a one-day retreat where the entire Custodi Parvulos formation unfolds in the presence of the Blessed Sacrament — with Mass, Adoration, music, meals, and time for reflection. Pay what your parish can afford.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginBottom: 48 }}>
              {[
                { Icon: Cross, label: "Mass & Adoration", desc: "All formation happens IN Eucharistic Adoration" },
                { Icon: UtensilsCrossed, label: "Meals Included", desc: "Breakfast and lunch together as community" },
                { Icon: HandHeart, label: "Pay What You Can", desc: "No parish turned away — contribute what you're able" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center", padding: "24px 16px", background: bg, borderRadius: 8, border: `1px solid ${borderC}` }}>
                  <item.Icon size={28} color={brown} strokeWidth={1.3} style={{ margin: "0 auto", display: "block" }} />
                  <p style={{ fontWeight: 700, color: brown, marginTop: 12, fontSize: 15 }}>{item.label}</p>
                  <p style={{ color: stone, fontSize: 14, marginTop: 6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center" }}>
              <Link to="/retreat" style={{ display: "inline-block", background: brown, color: cream, padding: "16px 48px", borderRadius: 6, textDecoration: "none", fontFamily: font, fontSize: 17, letterSpacing: 1, fontWeight: 600 }}>Register Your Parish</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={sectionStyle}>
          <FadeIn>
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, textAlign: "center", fontWeight: 700, marginBottom: 8 }}>TESTIMONIES</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 5vw, 30px)", textAlign: "center", marginBottom: 16 }}>Voices of the Faithful</h2>
            <p style={{ color: stone, fontSize: 16, textAlign: "center", fontStyle: "italic", marginBottom: 40 }}>What parishes are saying about their experience</p>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { id: 1, name: "Fr. Michael Torres", parish: "St. Thomas More", diocese: "Diocese of Austin", role: "Pastor", type: "retreat", rating: 5, text: "In twenty years of priesthood, this is the first safe environment program that felt like prayer instead of paperwork. My entire staff was moved.", date: "2026-03-15T00:00:00.000Z" },
              { id: 2, name: "Maria Gonzalez", parish: "Our Lady of Guadalupe", diocese: "Archdiocese of San Antonio", role: "DRE / Safe Environment Coordinator", type: "retreat", rating: 5, text: "I have been the safe environment coordinator for eight years and have watched people click through VIRTUS with glazed eyes. At our retreat, people were weeping during the Lectio Divina.", date: "2026-02-20T00:00:00.000Z" },
              { id: 4, name: "Catherine Park", parish: "St. Elizabeth Ann Seton", diocese: "Diocese of Arlington", role: "Volunteer Catechist", type: "retreat", rating: 5, text: "I came expecting another training day. I left having encountered Christ. The Chaplet of Divine Mercy at 3 PM, after spending the whole day in His presence \u2014 I will never forget it.", date: "2026-03-01T00:00:00.000Z" },
            ].map(t => (
              <FadeIn key={t.id}><TestimonialCard t={t} /></FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link to="/testimonials" style={{ color: brown, fontFamily: font, fontSize: 15, fontWeight: 600 }}>Read all testimonies & share yours →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px 60px" }}>
        <div style={{ ...sectionStyle, textAlign: "center" }}>
          <FadeIn><PelicanLogo size={100} color={brown} />
            <h2 style={{ ...heading, fontSize: 28, marginTop: 20 }}>From Compliance to Conversion</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ ...prose, maxWidth: 560, margin: "20px auto 0", textAlign: "center" }}>The John Jay studies showed that human formation works. The Theology of the Body provides the content. Humanae Vitae provides the prophetic framework.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ ...prose, maxWidth: 560, margin: "20px auto 0", textAlign: "center" }}>Together, they offer the Church a path that protects the innocent, heals the wounded, holds the guilty accountable, and renews the Church's witness.</p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ marginTop: 40 }}>
              <Link to="/formation" style={{ display: "inline-block", background: `${brown}10`, border: `1px solid ${brown}40`, color: brown, padding: "16px 48px", borderRadius: 6, textDecoration: "none", fontFamily: font, fontSize: 17, letterSpacing: 1, fontWeight: 600 }}>Begin the Journey</Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.55}>
            <Divider />
            <p style={{ color: red, fontSize: 14, fontStyle: "italic", marginTop: 8 }}>Pie Pelicane, custodi parvulos</p>
            <p style={{ color: muted, fontSize: 12, fontStyle: "italic", marginTop: 2 }}>O loving Pelican, guard the little ones</p>
          </FadeIn>
        </div>
      </section>
      <style>{globalCSS}</style>
    </div>
  );
}
