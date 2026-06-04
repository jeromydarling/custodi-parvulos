export const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";
export const bg = "#F5EDE0";
export const ink = "#3B2A1A";
export const brown = "#6B3A2A";
export const red = "#8B2500";
export const stone = "#8B7355";
export const muted = "#B8A080";
export const cream = "#FFFDF7";
export const borderC = "#E8DCC8";
export const success = "#4A7C59";
export const partColors = {
  creation: "#C9A84C",
  fall: "#8B4553",
  formation: "#4A7C59",
  messiah: "#9B2335",
  ecclesia: "#2E5E8E",
};

export const sectionStyle = { maxWidth: 760, margin: "0 auto", padding: "0 24px" };
export const prose = { fontFamily: font, fontSize: 18, lineHeight: 1.9, color: "#4A3828" };
export const heading = { fontFamily: font, color: brown, fontWeight: 700, margin: 0 };

export const textureOverlay = {
  position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 0,
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
};

export const globalCSS = `
  @keyframes gentleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  * { box-sizing: border-box; margin: 0; }
  html { scroll-behavior: smooth; }
  body { margin: 0; padding: 0; }
  ::selection { background: #6B3A2A20; }
`;
