import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PelicanLogo from "./PelicanLogo";

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";
const bg = "#F5EDE0";
const brown = "#6B3A2A";
const red = "#8B2500";
const stone = "#8B7355";
const borderC = "#E8DCC8";
const cream = "#FFFDF7";

const LINKS = [
  { to: "/formation", label: "Formation", color: stone },
  { to: "/retreat", label: "Parish Retreat", color: red, bold: true },
  { to: "/resources", label: "Resources", color: stone },
  { to: "/readings", label: "Readings", color: stone },
];

export default function Nav({ extra = [], rightSlot = null }) {
  const [open, setOpen] = useState(false);
  const allLinks = [...LINKS, ...extra];

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
