import { Link } from "react-router-dom";
import { Sparkles, Diamond, Hexagon, Cross, Church, Sun, Circle, Leaf, Star, Bird, Crown, Flame } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";

const parts = [
  { latin: "Creatio", english: "Creation", Icon: Sparkles },
  { latin: "Lapsus", english: "The Fall", Icon: Diamond },
  { latin: "Formatio Populi Sancti", english: "Formation of a Holy People", Icon: Hexagon },
  { latin: "Messias", english: "The Messiah", Icon: Cross },
  { latin: "Ecclesia", english: "The Church", Icon: Church },
];

const stations = [
  { latin: "Lux", english: "Light", Icon: Sun },
  { latin: "Firmamentum", english: "The Firmament", Icon: Circle },
  { latin: "Terra et Herba", english: "Land and Vegetation", Icon: Leaf },
  { latin: "Luminaria", english: "The Luminaries", Icon: Star },
  { latin: "Vita Abundans", english: "Abundant Life", Icon: Bird },
  { latin: "Imago Dei", english: "Image of God", Icon: Crown },
  { latin: "Sabbatum", english: "Sabbath Rest", Icon: Flame },
];

const navLink = { color: stone, textDecoration: "none", fontFamily: font, fontSize: 14, letterSpacing: 1 };
const cardStyle = {
  background: cream, border: `1px solid ${borderC}`, borderRadius: 12,
  padding: "28px 20px", textAlign: "center", minWidth: 140, flex: "1 1 140px",
};

export default function FormationPortal() {
  return (
    <div style={{ background: bg, minHeight: "100vh", color: ink, fontFamily: font, position: "relative" }}>
      <style>{globalCSS}</style>
      <div style={textureOverlay} />

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: `1px solid ${borderC}`, background: cream, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <PelicanLogo size={32} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 16 }}>Custodi Parvulos</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/retreat" style={navLink}>Parish Retreat</Link>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ textAlign: "center", padding: "72px 24px 48px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <PelicanLogo size={120} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <h1 style={{ ...heading, fontSize: 42, marginTop: 28, letterSpacing: 2 }}>Iter Formationis</h1>
          <p style={{ fontFamily: font, color: stone, fontSize: 18, fontStyle: "italic", marginTop: 8 }}>The Formation Journey</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ ...prose, marginTop: 20, color: muted, fontSize: 16 }}>
            The free online formation — coming soon
          </p>
        </FadeIn>
        <Divider />
      </header>

      {/* The 5 Parts */}
      <section style={{ ...sectionStyle, maxWidth: 840, paddingBottom: 48, position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h2 style={{ ...heading, fontSize: 26, textAlign: "center", marginBottom: 8 }}>The Five Parts</h2>
          <p style={{ ...prose, textAlign: "center", color: stone, fontSize: 15, marginBottom: 32 }}>
            The grand narrative of salvation history
          </p>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {parts.map((p, i) => (
            <FadeIn key={p.latin} delay={0.1 * i}>
              <div style={cardStyle}>
                <p.Icon size={32} color={red} strokeWidth={1.4} style={{ marginBottom: 12 }} />
                <h3 style={{ ...heading, fontSize: 16, marginBottom: 4 }}>{p.latin}</h3>
                <p style={{ fontFamily: font, fontSize: 13, color: stone, margin: 0 }}>{p.english}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* The 7 Stations */}
      <section style={{ ...sectionStyle, maxWidth: 880, paddingBottom: 48, position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h2 style={{ ...heading, fontSize: 26, textAlign: "center", marginBottom: 8 }}>The Seven Stations</h2>
          <p style={{ ...prose, textAlign: "center", color: stone, fontSize: 15, marginBottom: 32 }}>
            Days of creation as a journey of formation
          </p>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {stations.map((s, i) => (
            <FadeIn key={s.latin} delay={0.08 * i}>
              <div style={cardStyle}>
                <s.Icon size={28} color={brown} strokeWidth={1.4} style={{ marginBottom: 12 }} />
                <h3 style={{ ...heading, fontSize: 15, marginBottom: 4 }}>{s.latin}</h3>
                <p style={{ fontFamily: font, fontSize: 13, color: stone, margin: 0 }}>{s.english}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* Coming Soon */}
      <section style={{ ...sectionStyle, textAlign: "center", padding: "48px 24px 64px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h2 style={{ ...heading, fontSize: 24, marginBottom: 16 }}>Coming Soon</h2>
          <p style={{ ...prose, maxWidth: 520, margin: "0 auto 32px" }}>
            The free online formation is being prepared with care. In the meantime, consider bringing a Custodi Parvulos retreat to your parish.
          </p>
          <Link
            to="/retreat"
            style={{
              display: "inline-block", background: brown, color: cream,
              fontFamily: font, fontSize: 16, fontWeight: 600,
              padding: "14px 36px", borderRadius: 8, textDecoration: "none",
              letterSpacing: 0.5, border: "none", cursor: "pointer",
            }}
          >
            Register for a Parish Retreat
          </Link>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${borderC}`, padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <PelicanLogo size={40} />
        <p style={{ fontFamily: font, fontSize: 13, color: muted, marginTop: 12, fontStyle: "italic" }}>
          Custodi Parvulos — Guard the little ones
        </p>
      </footer>
    </div>
  );
}
