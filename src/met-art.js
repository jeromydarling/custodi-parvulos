// MET Museum public domain art mapped to Custodi Parvulos formation sections.
// Images are fetched client-side from the MET Collection API at runtime.
// Object IDs reference works in the Metropolitan Museum of Art's Open Access collection.

const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

// Cache fetched images in memory so we don't re-fetch on every render
const cache = {};

export async function fetchMetArt(objectId) {
  if (cache[objectId]) return cache[objectId];
  try {
    const r = await fetch(`${MET_API}/${objectId}`);
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

// Curated mapping: each formation section gets one painting.
// These are all public domain works in the MET's Open Access collection.

export const ART_MAP = {
  // ═══ PART I: CREATION (Creatio) ═══
  creation_header: 437984,       // Giovanni di Paolo, "The Creation of the World and the Expulsion from Paradise"
  creation_section_0: 459093,    // Robert Campin workshop, "The Annunciation Triptych (Mérode Altarpiece)"
  creation_section_1: 438754,    // Raphael, "Madonna and Child Enthroned with Saints"
  creation_section_2: 436524,    // Andrea Mantegna, "The Crucifixion"
  creation_section_3: 436573,    // Georges de La Tour, "The Penitent Magdalen"

  // ═══ PART II: THE FALL (Lapsus) ═══
  fall_header: 437826,           // Jan van Eyck, "The Crucifixion; The Last Judgment"
  fall_section_0: 436002,        // Caravaggio, "The Denial of Saint Peter"
  fall_section_1: 436535,        // Hieronymus Bosch, "The Adoration of the Magi"
  fall_section_2: 437329,        // Bartolomé Esteban Murillo, "The Virgin and Child"
  fall_section_3: 438012,        // Giovanni Bellini, "Madonna and Child"

  // ═══ PART III: FORMATION OF A HOLY PEOPLE (Formatio) ═══
  formation_header: 435882,      // El Greco, "The Vision of Saint John" or Agony in the Garden
  formation_section_0: 437133,   // Duccio di Buoninsegna, "Madonna and Child"
  formation_section_1: 435888,   // El Greco, "View of Toledo"
  formation_section_2: 437869,   // Rogier van der Weyden, "Christ Appearing to His Mother"
  formation_section_3: 459093,   // Robert Campin, "The Annunciation Triptych"

  // ═══ PART IV: THE MESSIAH (Messias) ═══
  messiah_header: 436524,        // Andrea Mantegna, "The Crucifixion"
  messiah_section_0: 437984,     // Giovanni di Paolo, "The Creation of the World"
  messiah_section_1: 438012,     // Giovanni Bellini, "Madonna and Child"
  messiah_section_2: 438722,     // El Greco, "The Vision of Saint John"
  messiah_section_3: 437826,     // Jan van Eyck, "The Crucifixion; The Last Judgment"

  // ═══ PART V: THE CHURCH (Ecclesia) ═══
  ecclesia_header: 438722,       // El Greco, "The Vision of Saint John"
  ecclesia_section_0: 437133,    // Duccio di Buoninsegna, "Madonna and Child"
  ecclesia_section_1: 436573,    // Georges de La Tour, "The Penitent Magdalen"
  ecclesia_section_2: 436002,    // Caravaggio, "The Denial of Saint Peter"
  ecclesia_section_3: 437869,    // Rogier van der Weyden, "Christ Appearing to His Mother"

  // ═══ MARKETING / GENERAL ═══
  landing_hero: 437984,          // Giovanni di Paolo, "The Creation of the World"
  landing_pillars: 437826,       // Jan van Eyck, "The Crucifixion; The Last Judgment"
  retreat_hero: 436573,          // Georges de La Tour, "The Penitent Magdalen"
  retreat_schedule: 437133,      // Duccio, "Madonna and Child"
  formation_hero: 437984,        // Giovanni di Paolo, "The Creation of the World"
  readings_hero: 435888,         // El Greco, "View of Toledo"
};

// Helper: get the art key for a part + section index
export function artKey(partId, sectionIndex) {
  if (sectionIndex === undefined || sectionIndex === null) return `${partId}_header`;
  return `${partId}_section_${sectionIndex}`;
}
