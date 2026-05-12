import { useState, useEffect } from "react";
import { searchMetArt, ART_SEARCHES, artKey } from "../met-art";

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

// Faded background painting behind a section — atmospheric, not a standalone image
export function MetBackground({ mapKey, partId, sectionIndex, opacity = 0.12, children, style = {} }) {
  const [url, setUrl] = useState(null);

  const key = mapKey || artKey(partId, sectionIndex);
  const search = ART_SEARCHES[key];

  useEffect(() => {
    if (!search) return;
    searchMetArt(search.q, search.i).then(data => {
      if (data) setUrl(data.imageLarge || data.image);
    });
  }, [key]);

  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      {url && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          opacity,
          filter: "saturate(0.3)",
          pointerEvents: "none",
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// Small inline painting with caption — for use within content sections
export function MetInline({ mapKey, partId, sectionIndex, style = {} }) {
  const [art, setArt] = useState(null);

  const key = mapKey || artKey(partId, sectionIndex);
  const search = ART_SEARCHES[key];

  useEffect(() => {
    if (!search) return;
    searchMetArt(search.q, search.i).then(data => {
      if (data) setArt(data);
    });
  }, [key]);

  if (!art) return null;

  return (
    <figure style={{ margin: "32px auto", textAlign: "center", maxWidth: 320, ...style }}>
      <a href={art.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
        <img
          src={art.image}
          alt={`${art.title} by ${art.artist || "Unknown"}`}
          loading="lazy"
          style={{
            maxWidth: "100%",
            maxHeight: 260,
            objectFit: "contain",
            borderRadius: 4,
            border: "1px solid #E8DCC8",
            boxShadow: "0 2px 16px rgba(59,42,26,0.1)",
          }}
        />
      </a>
      <figcaption style={{ fontFamily: font, marginTop: 8, lineHeight: 1.4 }}>
        <span style={{ fontSize: 12, color: "#3B2A1A", fontStyle: "italic" }}>{art.title}</span>
        {art.artist && <span style={{ fontSize: 11, color: "#8B7355", display: "block" }}>{art.artist}{art.date ? `, ${art.date}` : ""}</span>}
      </figcaption>
    </figure>
  );
}

export default MetBackground;
