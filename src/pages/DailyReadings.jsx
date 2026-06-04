import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sun, Moon, ExternalLink } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import Nav from "../components/Nav";

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

function usccbUrl(d) {
  // USCCB daily reading URL format: MMDDYY
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `https://bible.usccb.org/bible/readings/${mm}${dd}${yy}.cfm`;
}

// Fetch from a public Catholic readings API
async function fetchReadings(date) {
  try {
    const r = await fetch(`https://catholicsaintsapi.vercel.app/api/readings?date=${ymd(date)}`);
    if (r.ok) return await r.json();
  } catch {}
  return null;
}

export default function DailyReadings() {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [readings, setReadings] = useState(null);
  const [hours, setHours] = useState("readings"); // readings | lauds | vespers

  useEffect(() => {
    setLoading(true);
    fetchReadings(date).then(r => {
      setReadings(r);
      setLoading(false);
    });
  }, [date]);

  const today = new Date();
  const isToday = ymd(date) === ymd(today);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const shift = (days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d);
  };

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav />

      <div style={{ ...sectionStyle, maxWidth: 700, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <BookOpen size={32} color={brown} strokeWidth={1.3} style={{ display: "block", margin: "0 auto" }} />
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginTop: 12 }}>LITURGIA HORARUM</p>
            <h1 style={{ ...heading, fontSize: 32, marginTop: 8 }}>Daily Readings</h1>
            <p style={{ color: stone, fontSize: 15, fontStyle: "italic", marginTop: 8 }}>From the USCCB Lectionary and the Liturgy of the Hours</p>
          </div>
        </FadeIn>

        {/* Date navigator */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button onClick={() => shift(-1)} style={{ background: cream, border: `1px solid ${borderC}`, padding: "8px 14px", borderRadius: 4, fontFamily: font, fontSize: 13, color: brown, cursor: "pointer" }}>← Previous</button>
          <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "8px 20px", textAlign: "center", minWidth: 260 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: ink }}>{dayName}</p>
            {!isToday && <button onClick={() => setDate(new Date())} style={{ fontSize: 11, color: red, background: "none", border: "none", cursor: "pointer", marginTop: 2 }}>Today</button>}
          </div>
          <button onClick={() => shift(1)} style={{ background: cream, border: `1px solid ${borderC}`, padding: "8px 14px", borderRadius: 4, fontFamily: font, fontSize: 13, color: brown, cursor: "pointer" }}>Next →</button>
        </div>

        {/* Hour toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          {[
            { key: "lauds", label: "Lauds", icon: Sun },
            { key: "readings", label: "Mass Readings", icon: BookOpen },
            { key: "vespers", label: "Vespers", icon: Moon },
          ].map(h => (
            <button key={h.key} onClick={() => setHours(h.key)}
              style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${hours === h.key ? brown : borderC}`, background: hours === h.key ? `${brown}12` : cream, fontFamily: font, fontSize: 13, color: hours === h.key ? brown : stone, cursor: "pointer", fontWeight: hours === h.key ? 700 : 400, display: "flex", alignItems: "center", gap: 6 }}>
              <h.icon size={13} /> {h.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: muted, fontStyle: "italic" }}>Loading readings...</p>
        ) : (
          <div>
            {hours === "readings" && (
              <>
                {readings && readings.readings ? (
                  <div>
                    {readings.readings.map((r, i) => (
                      <FadeIn key={i} delay={i * 0.05}>
                        <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24, marginBottom: 16 }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: red, letterSpacing: 1, marginBottom: 6 }}>{(r.type || "Reading").toUpperCase()}</p>
                          <p style={{ fontSize: 14, color: brown, fontWeight: 600, marginBottom: 12 }}>{r.reference}</p>
                          <p style={{ ...prose, fontSize: 15, whiteSpace: "pre-wrap" }}>{r.text}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                ) : (
                  <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
                    <BookOpen size={28} color={muted} style={{ display: "block", margin: "0 auto" }} />
                    <p style={{ ...prose, fontSize: 15, marginTop: 16 }}>Readings for this day are available from the USCCB.</p>
                    <a href={usccbUrl(date)} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, background: brown, color: cream, padding: "12px 28px", borderRadius: 6, textDecoration: "none", fontFamily: font, fontSize: 15, fontWeight: 600 }}>
                      Read at USCCB.org <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </>
            )}

            {hours === "lauds" && (
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24 }}>
                <h3 style={{ ...heading, fontSize: 18, marginBottom: 12 }}>Morning Prayer (Lauds)</h3>
                <p style={{ ...prose, fontSize: 15 }}>Lauds is the first great hour of the Divine Office, prayed at daybreak. It includes the Invitatory, a morning hymn, psalms, a reading, the Canticle of Zechariah (Benedictus), intercessions, and the Our Father.</p>
                <p style={{ ...prose, fontSize: 15, marginTop: 12 }}>The full Liturgy of the Hours is available from approved Catholic sources:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                  <a href="https://www.ibreviary.com/m2/breviario.php" target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 14, textDecoration: "underline" }}>iBreviary (free, approved)</a>
                  <a href="https://divineoffice.org/" target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 14, textDecoration: "underline" }}>DivineOffice.org</a>
                  <a href="https://universalis.com/lauds.htm" target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 14, textDecoration: "underline" }}>Universalis</a>
                </div>
              </div>
            )}

            {hours === "vespers" && (
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 24 }}>
                <h3 style={{ ...heading, fontSize: 18, marginBottom: 12 }}>Evening Prayer (Vespers)</h3>
                <p style={{ ...prose, fontSize: 15 }}>Vespers is prayed at day's end, as the Church gives thanks for the day and commits the coming night to God. It includes an evening hymn, psalms, the Canticle of Mary (Magnificat), intercessions, and the Our Father.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                  <a href="https://www.ibreviary.com/m2/breviario.php" target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 14, textDecoration: "underline" }}>iBreviary (free, approved)</a>
                  <a href="https://divineoffice.org/" target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 14, textDecoration: "underline" }}>DivineOffice.org</a>
                  <a href="https://universalis.com/vespers.htm" target="_blank" rel="noopener noreferrer" style={{ color: brown, fontSize: 14, textDecoration: "underline" }}>Universalis</a>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 20, borderTop: `1px solid ${borderC}` }}>
          <a href={usccbUrl(date)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: muted, textDecoration: "none" }}>
            Full readings at USCCB.org <ExternalLink size={11} style={{ verticalAlign: "middle" }} />
          </a>
        </div>
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
