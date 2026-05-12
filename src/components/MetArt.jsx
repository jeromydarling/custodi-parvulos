import { useState, useEffect } from "react";
import { fetchMetArt, ART_MAP, artKey } from "../met-art";

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

export default function MetArt({ artId, mapKey, partId, sectionIndex, size = "medium", style = {} }) {
  const [art, setArt] = useState(null);
  const [error, setError] = useState(false);

  const objectId = artId || ART_MAP[mapKey] || ART_MAP[artKey(partId, sectionIndex)];

  useEffect(() => {
    if (!objectId) return;
    fetchMetArt(objectId).then(data => {
      if (!data) { setError(true); return; }
      // Filter out secular portraits and non-religious subjects
      const t = (data.title || "").toLowerCase();
      const skip = ["portrait of a woman", "portrait of a man", "portrait of a lady", "portrait of a gentleman"];
      if (skip.some(s => t === s)) { setError(true); return; }
      setArt(data);
    });
  }, [objectId]);

  if (!objectId || error || !art) return null;

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
