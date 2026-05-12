// MET Museum public domain art — searches by keyword at runtime
// so we always get relevant religious/sacred art, not random portraits.

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";
const cache = {};
const searchCache = {};

export async function fetchMetArt(objectId) {
  if (cache[objectId]) return cache[objectId];
  try {
    const r = await fetch(`${MET_BASE}/objects/${objectId}`);
    if (!r.ok) return null;
    const data = await r.json();
    if (!data.isPublicDomain || !data.primaryImageSmall) return null;
    const result = {
      id: data.objectID,
      title: data.title,
      artist: data.artistDisplayName,
      date: data.objectDate,
      medium: data.medium,
      image: data.primaryImageSmall,
      imageLarge: data.primaryImage,
      credit: data.creditLine,
      url: data.objectURL,
    };
    cache[objectId] = result;
    return result;
  } catch {
    return null;
  }
}

// Search MET API by keyword, find a public domain painting with an image
export async function searchMetArt(query, index = 0) {
  const cacheKey = `${query}_${index}`;
  if (searchCache[cacheKey]) return searchCache[cacheKey];
  try {
    const r = await fetch(`${MET_BASE}/search?q=${encodeURIComponent(query)}&hasImages=true&isPublicDomain=true&departmentId=11`);
    if (!r.ok) return null;
    const data = await r.json();
    if (!data.objectIDs || data.objectIDs.length === 0) return null;
    // Pick the object at the given index (wrapping around)
    const id = data.objectIDs[index % data.objectIDs.length];
    const art = await fetchMetArt(id);
    if (art) {
      searchCache[cacheKey] = art;
      return art;
    }
    // If first pick has no image, try next few
    for (let i = 1; i < Math.min(5, data.objectIDs.length); i++) {
      const fallback = await fetchMetArt(data.objectIDs[(index + i) % data.objectIDs.length]);
      if (fallback) {
        searchCache[cacheKey] = fallback;
        return fallback;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Keyword-based mapping: each section searches for specific religious art
export const ART_SEARCHES = {
  // Part I: Creation
  creation_header: { q: "creation adam genesis", i: 0 },
  creation_section_0: { q: "annunciation virgin mary angel", i: 0 },
  creation_section_1: { q: "madonna child enthroned", i: 0 },
  creation_section_2: { q: "annunciation", i: 2 },
  creation_section_3: { q: "eucharist last supper", i: 0 },

  // Part II: The Fall
  fall_header: { q: "expulsion paradise adam eve", i: 0 },
  fall_section_0: { q: "agony garden gethsemane", i: 0 },
  fall_section_1: { q: "crucifixion christ", i: 1 },
  fall_section_2: { q: "lamentation christ dead", i: 0 },
  fall_section_3: { q: "penitent magdalene", i: 0 },

  // Part III: Formation
  formation_header: { q: "moses tablets commandments", i: 0 },
  formation_section_0: { q: "holy family", i: 0 },
  formation_section_1: { q: "denial saint peter", i: 0 },
  formation_section_2: { q: "prophets saints", i: 0 },
  formation_section_3: { q: "baptism christ", i: 0 },

  // Part IV: The Messiah
  messiah_header: { q: "crucifixion christ calvary", i: 0 },
  messiah_section_0: { q: "pieta", i: 0 },
  messiah_section_1: { q: "resurrection christ", i: 0 },
  messiah_section_2: { q: "christ healing", i: 0 },
  messiah_section_3: { q: "last judgment", i: 0 },

  // Part V: The Church
  ecclesia_header: { q: "pentecost holy spirit apostles", i: 0 },
  ecclesia_section_0: { q: "madonna child", i: 1 },
  ecclesia_section_1: { q: "saints communion", i: 0 },
  ecclesia_section_2: { q: "christ glory majesty", i: 0 },
  ecclesia_section_3: { q: "ascension christ", i: 0 },

  // Marketing
  landing_hero: { q: "creation world genesis", i: 0 },
  landing_pillars: { q: "crucifixion last judgment", i: 0 },
  retreat_hero: { q: "adoration blessed sacrament monstrance", i: 0 },
  retreat_schedule: { q: "madonna child", i: 2 },
  formation_hero: { q: "annunciation virgin", i: 0 },
  readings_hero: { q: "saint reading book scripture", i: 0 },
};

export function artKey(partId, sectionIndex) {
  if (sectionIndex === undefined || sectionIndex === null) return `${partId}_header`;
  return `${partId}_section_${sectionIndex}`;
}
