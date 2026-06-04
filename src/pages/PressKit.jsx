import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import Nav from "../components/Nav";

const QUICK_FACTS = [
  ["Program name", "Custodi Parvulos (\"Guard the Little Ones\")"],
  ["Motto", "Pie Pelicane, custodi parvulos"],
  ["What it is", "A Catholic safe environment formation program rooted in theology, not compliance"],
  ["Foundations", "Theology of the Body · Humanae Vitae · John Jay College Studies"],
  ["Structure", "5 Parts (Drama Salutis) + 7 Modules (Hebdomada Creationis)"],
  ["Format", "Free online formation OR one-day parish retreat in Eucharistic Adoration"],
  ["Cost", "Free for individuals; pay-what-you-can for parish retreats"],
];

const TALKING_POINTS = [
  "The clergy abuse crisis was not caused by a failure of compliance — it was caused by a failure of formation. The John Jay studies confirmed this empirically.",
  "Custodi Parvulos is the only safe environment formation program that combines the Theology of the Body, Humanae Vitae, and the John Jay findings into a single contemplative journey.",
  "Unlike compliance videos, every part of this formation happens in the presence of the Blessed Sacrament — with Mass, music, meals, and time for reflection.",
  "The program is free for parishes that cannot afford it. No parish is turned away.",
  "This is not a replacement for diocesan compliance requirements. It is a deepening of them.",
];

const BIO = `Custodi Parvulos was founded to answer a simple question: What if safe environment formation looked less like a compliance module and more like a retreat? Rooted in the theological tradition of the Church and the empirical data of the John Jay College studies, the program invites Catholics into a day of prayer, teaching, and encounter in the presence of the Blessed Sacrament. The name comes from the Adoro te devote, the Eucharistic hymn of St. Thomas Aquinas: "Pie Pelicane, Iesu Domine, me immundum munda tuo sanguine" — "O loving Pelican, Lord Jesus, cleanse me, unclean as I am, in your blood."`;

export default function PressKit() {
  const copy = (t) => navigator.clipboard.writeText(t);

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav />

      <div style={{ ...sectionStyle, maxWidth: 760, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <PelicanLogo size={120} color={brown} />
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginTop: 16 }}>PRESS KIT</p>
            <h1 style={{ ...heading, fontSize: 32, marginTop: 8 }}>Media & Press Resources</h1>
            <p style={{ color: stone, fontSize: 15, fontStyle: "italic", marginTop: 8 }}>For journalists, bloggers, diocesan communications, and Catholic media</p>
          </div>
        </FadeIn>

        <Divider />

        <FadeIn>
          <h2 style={{ ...heading, fontSize: 20, marginBottom: 16 }}>Quick Facts</h2>
          <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 32 }}>
            {QUICK_FACTS.map(([label, value], i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 10, fontSize: 14 }}>
                <span style={{ fontWeight: 700, color: brown, minWidth: 140 }}>{label}:</span>
                <span style={{ color: ink, flex: 1 }}>{value}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <h2 style={{ ...heading, fontSize: 20, marginBottom: 16 }}>Talking Points</h2>
          <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 32 }}>
            {TALKING_POINTS.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < TALKING_POINTS.length - 1 ? 12 : 0 }}>
                <span style={{ color: red, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <p style={{ ...prose, fontSize: 14, margin: 0 }}>{p}</p>
              </div>
            ))}
            <button onClick={() => copy(TALKING_POINTS.map((p, i) => `${i + 1}. ${p}`).join("\n\n"))} style={{ marginTop: 16, background: "none", border: `1px solid ${borderC}`, padding: "6px 14px", borderRadius: 4, fontFamily: font, fontSize: 12, color: brown, cursor: "pointer" }}>Copy All</button>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 style={{ ...heading, fontSize: 20, marginBottom: 16 }}>Short Bio</h2>
          <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 32 }}>
            <p style={{ ...prose, fontSize: 15 }}>{BIO}</p>
            <button onClick={() => copy(BIO)} style={{ marginTop: 16, background: "none", border: `1px solid ${borderC}`, padding: "6px 14px", borderRadius: 4, fontFamily: font, fontSize: 12, color: brown, cursor: "pointer" }}>Copy</button>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 style={{ ...heading, fontSize: 20, marginBottom: 16 }}>Logo & Visual Assets</h2>
          <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 32, textAlign: "center" }}>
            <PelicanLogo size={120} color={brown} />
            <p style={{ fontSize: 13, color: muted, fontStyle: "italic", marginTop: 12 }}>The Pelican in Ad Crucem — a traditional Catholic symbol of Christ's self-giving love</p>
            <p style={{ fontSize: 13, color: stone, marginTop: 16 }}>Right-click to save, or contact press@custodiparvulos.org for high-resolution versions in color, monochrome, and transparent PNG/SVG.</p>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 style={{ ...heading, fontSize: 20, marginBottom: 16 }}>Contact</h2>
          <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24 }}>
            <p style={{ ...prose, fontSize: 15, marginBottom: 12 }}>For interviews, speaking requests, or additional resources:</p>
            <p style={{ fontSize: 15, color: brown, fontWeight: 600 }}><Mail size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />press@custodiparvulos.org</p>
          </div>
        </FadeIn>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link to="/testimonials" style={{ color: brown, fontFamily: font, fontSize: 15, fontWeight: 600 }}>Read testimonies →</Link>
        </div>
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
