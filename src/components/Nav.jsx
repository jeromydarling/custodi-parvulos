import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import PelicanLogo from "./PelicanLogo";
import { font, bg, brown, red, stone, borderC } from "../theme";
import { useLang } from "../i18n";

const LINKS = [
  { to: "/start", label: "Start", color: red, bold: true },
  { to: "/formation", label: "Formation", color: stone },
  { to: "/retreat", label: "Parish Retreat", color: stone },
  { to: "/resources", label: "Resources", color: stone },
  { to: "/readings", label: "Readings", color: stone },
];

const LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function Nav({ extra = [], rightSlot = null }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const allLinks = [...LINKS, ...extra];

  const langToggle = (
    <div style={{ position: "relative" }}>
      <button onClick={() => setLangOpen(!langOpen)} style={{ background: "none", border: `1px solid ${borderC}`, borderRadius: 4, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: font, fontSize: 12, color: stone }}>
        <Globe size={12} /> {lang.toUpperCase()}
      </button>
      {langOpen && (
        <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 4, background: "#FFFDF7", border: `1px solid ${borderC}`, borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 30, overflow: "hidden" }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
              style={{ display: "block", width: "100%", padding: "8px 16px", border: "none", background: lang === l.code ? `${brown}12` : "transparent", fontFamily: font, fontSize: 13, color: lang === l.code ? brown : stone, fontWeight: lang === l.code ? 700 : 400, cursor: "pointer", textAlign: "left", whiteSpace: "nowrap" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 16px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }} onClick={() => setOpen(false)}>
            <PelicanLogo size={28} color={brown} />
            <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 14 }}>Custodi Parvulos</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {allLinks.map(l => (
              <Link key={l.to} to={l.to} style={{ fontFamily: font, color: l.color || stone, textDecoration: "none", fontSize: 13, fontWeight: l.bold ? 600 : 400 }}>{l.label}</Link>
            ))}
            {langToggle}
            {rightSlot}
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile-btn" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: brown, padding: 4 }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="nav-mobile-menu" style={{ display: "none", flexDirection: "column", gap: 4, paddingTop: 12, paddingBottom: 8 }}>
            {allLinks.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                style={{ fontFamily: font, color: l.color || stone, textDecoration: "none", fontSize: 15, fontWeight: l.bold ? 600 : 400, padding: "10px 8px", borderRadius: 4, display: "block" }}>
                {l.label}
              </Link>
            ))}
            <div style={{ padding: "10px 8px", borderTop: `1px solid ${borderC}`, marginTop: 4, display: "flex", gap: 8 }}>
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
                  style={{ padding: "6px 14px", border: `1px solid ${l.code === lang ? brown : borderC}`, borderRadius: 4, background: l.code === lang ? `${brown}12` : "transparent", fontFamily: font, fontSize: 13, color: l.code === lang ? brown : stone, fontWeight: l.code === lang ? 700 : 400, cursor: "pointer" }}>
                  {l.label}
                </button>
              ))}
            </div>
            {rightSlot && <div style={{ padding: "10px 8px", borderTop: `1px solid ${borderC}`, marginTop: 4 }}>{rightSlot}</div>}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .nav-mobile-menu { display: flex !important; }
        }
        @media (min-width: 641px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
