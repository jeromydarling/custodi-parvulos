import { useState, useEffect } from "react";
import { searchMetArt, ART_SEARCHES, artKey } from "../met-art";

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

export default function MetArt({ mapKey, partId, sectionIndex, size = "medium", style = {} }) {
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

  const sizes = {
    small: { maxWidth: 200, maxHeight: 160 },
    medium: { maxWidth: 400, maxHeight: 300 },
    large: { maxWidth: 600, maxHeight: 450 },
    hero: { maxWidth: "100%", maxHeight: 400 },
    full: { maxWidth: "100%", maxHeight: 500 },
  };

  const s = sizes[size] || sizes.medium;

  return (
    <figure style={{ margin: "24px auto", textAlign: "center", ...style }}>
      <a href={art.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
        <img
          src={art.image}
          alt={`${art.title} by ${art.artist || "Unknown"}`}
          loading="lazy"
          style={{
            maxWidth: s.maxWidth,
            maxHeight: s.maxHeight,
            width: "100%",
            height: "auto",
            objectFit: "contain",
            borderRadius: 4,
            border: "1px solid #E8DCC8",
            boxShadow: "0 2px 12px rgba(59,42,26,0.08)",
          }}
        />
      </a>
      <figcaption style={{ fontFamily: font, marginTop: 8, lineHeight: 1.5 }}>
        <span style={{ fontSize: 13, color: "#3B2A1A", fontStyle: "italic" }}>{art.title}</span>
        {art.artist && <span style={{ fontSize: 12, color: "#8B7355", display: "block" }}>{art.artist}{art.date ? `, ${art.date}` : ""}</span>}
        <span style={{ fontSize: 10, color: "#B8A080", display: "block" }}>The Metropolitan Museum of Art{art.credit ? ` · ${art.credit}` : ""}</span>
      </figcaption>
    </figure>
  );
}
