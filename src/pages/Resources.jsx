import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, CheckSquare, DollarSign, Mail, Users, Download, ExternalLink, Printer, Church } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import Nav from "../components/Nav";

const tabStyle = (active) => ({ padding: "10px 18px", border: `1px solid ${active ? borderC : "transparent"}`, borderBottom: active ? `2px solid ${cream}` : `1px solid ${borderC}`, background: active ? cream : "transparent", fontFamily: font, fontSize: 14, fontWeight: active ? 700 : 400, color: active ? brown : stone, cursor: "pointer", borderRadius: "6px 6px 0 0", marginBottom: -1 });

// Public domain homilies from saints, hosted on New Advent, Vatican.va, and EWTN
const SAINT_HOMILIES = [
  { saint: "St. John Chrysostom", title: "Homilies on the Gospel of Matthew", theme: "The Body as a Temple", url: "https://www.newadvent.org/fathers/2001.htm", source: "New Advent" },
  { saint: "St. Augustine of Hippo", title: "Sermons on the New Testament", theme: "On Love and the Commandments", url: "https://www.newadvent.org/fathers/1603.htm", source: "New Advent" },
  { saint: "St. Augustine of Hippo", title: "Sermon on Psalm 51", theme: "True Repentance and Examination of Conscience", url: "https://www.newadvent.org/fathers/1801051.htm", source: "New Advent" },
  { saint: "St. Gregory the Great", title: "Homilies on the Gospels", theme: "The Good Shepherd and the Care of Souls", url: "https://www.newadvent.org/fathers/360202.htm", source: "New Advent" },
  { saint: "St. Bernard of Clairvaux", title: "Sermons on the Song of Songs", theme: "The Nuptial Meaning of Love", url: "https://www.ccel.org/ccel/bernard/songs.html", source: "Christian Classics Ethereal Library" },
  { saint: "St. Bonaventure", title: "The Soul's Journey into God", theme: "Contemplation and the Five Senses", url: "https://www.ecatholic2000.com/bonaventure/journey/untitled.shtml", source: "eCatholic 2000" },
  { saint: "St. Catherine of Siena", title: "Letters to Clergy", theme: "Reform and Holiness of Life", url: "https://www.newadvent.org/cathen/03447a.htm", source: "New Advent" },
  { saint: "St. John Vianney", title: "Sermons of the Curé d'Ars", theme: "The Priesthood and the Care of Souls", url: "https://www.ewtn.com/catholicism/library/sermons-of-the-cure-dars-15302", source: "EWTN Library" },
  { saint: "St. Thérèse of Lisieux", title: "The Little Way", theme: "Hidden Holiness in Ordinary Life", url: "https://www.newadvent.org/cathen/14517a.htm", source: "New Advent" },
  { saint: "Pope St. John Paul II", title: "Man and Woman He Created Them (Theology of the Body)", theme: "The Original Design of the Human Person", url: "https://www.vatican.va/content/john-paul-ii/en/audiences/1980/index.1.html", source: "Vatican.va" },
  { saint: "Pope St. John Paul II", title: "Letter to Priests (Holy Thursday 2002)", theme: "The Crisis and the Call to Holiness", url: "https://www.vatican.va/content/john-paul-ii/en/letters/2002/documents/hf_jp-ii_let_20020321_priests.html", source: "Vatican.va" },
  { saint: "Pope St. Paul VI", title: "Humanae Vitae", theme: "The Inseparable Connection of Love and Life", url: "https://www.vatican.va/content/paul-vi/en/encyclicals/documents/hf_p-vi_enc_25071968_humanae-vitae.html", source: "Vatican.va" },
];

const FACILITY_CHECKLIST = [
  { section: "Chapel / Worship Space", items: [
    "Chapel available for Eucharistic Exposition from 9:00 AM – 3:30 PM",
    "Monstrance and processional cross",
    "Sufficient hosts consecrated for the day",
    "Altar linens, candles, incense",
    "Kneelers or prayer cushions for all participants",
    "Projector or large screen if visual aids are used (optional)",
  ]},
  { section: "Meal Arrangements", items: [
    "Continental breakfast setup (coffee, tea, pastries, fruit) for 8:00 AM",
    "Lunch arranged for 12:15 PM after Angelus",
    "Dietary restrictions collected in advance (gluten-free, vegetarian)",
    "Tables, chairs, plates, utensils, napkins",
    "Water and refreshments available throughout the day",
  ]},
  { section: "Liturgy & Music", items: [
    "Priest available to celebrate Mass at 9:00 AM",
    "Sacred music planned (organist, cantor, or recorded)",
    "Hymnals or worship aids distributed",
    "Sound system tested",
    "Readings and prayers prepared",
  ]},
  { section: "Logistics", items: [
    "Parking and signage from entrance to chapel",
    "Restrooms accessible near the chapel",
    "Name tags for all participants",
    "Printed schedule distributed at check-in",
    "First aid kit available",
    "Climate control (heat or A/C) tested",
  ]},
];

const FUNDING_TEMPLATE = `TO: [Diocesan Office of Catholic Charities / Local Knights of Columbus / Parish Benefactor]
FROM: [Pastor / Safe Environment Coordinator]
SUBJECT: Request for Funding — Custodi Parvulos Safe Environment Formation Retreat

Dear [Recipient],

[Parish Name] would like to host a Custodi Parvulos retreat — a one-day, in-person safe environment formation rooted in the Theology of the Body, Humanae Vitae, and the findings of the John Jay College studies. Unlike compliance-based programs, this retreat takes place entirely in the presence of the Blessed Sacrament, with Mass, music, meals, and time for reflection.

The program is offered on a "pay what you can" basis. To cover travel, materials, and meals for [# participants] from our parish, we are seeking $[amount] in support.

What your contribution makes possible:
- Full-day formation for all parish volunteers, staff, and clergy
- Mass, Eucharistic Adoration, and the Chaplet of Divine Mercy
- Printed formation materials for every participant
- A catered community meal
- Certificates of completion for USCCB Charter compliance

This is not another compliance video. It is a day of genuine formation and prayer — the kind of formation the John Jay studies identified as the single factor most strongly associated with the decline in abuse.

Thank you for considering this request. I am happy to provide additional information or meet in person.

In Christ,
[Name]
[Title]
[Parish Name]
[Contact]`;

const DIOCESE_LETTER = `TO: [Bishop's Name or Vicar General]
FROM: [Pastor Name], [Parish Name]
SUBJECT: Notification: Custodi Parvulos Formation Retreat

Your Excellency [or: Very Reverend],

I am writing to inform you that [Parish Name] intends to host a Custodi Parvulos formation retreat on [date]. This is a supplement to — not a replacement for — our diocesan safe environment compliance program. All participants will also complete any required compliance training.

About Custodi Parvulos:
Custodi Parvulos ("Guard the Little Ones") is a contemplative formation program rooted in three pillars:
1. The Theology of the Body (St. John Paul II)
2. Humanae Vitae (Pope St. Paul VI)
3. The findings of the John Jay College studies on the causes of the clergy abuse crisis

The retreat is held entirely in the presence of the Blessed Sacrament and includes Mass, the Chaplet of Divine Mercy, Lectio Divina, and examination of conscience. All content is consistent with the Catechism of the Catholic Church and draws only from magisterial sources.

A copy of the formation content is available at [website] for your review. I would welcome any guidance or concerns.

Faithfully in Christ,
[Pastor Signature]`;

const BULLETIN_INSERTS = [
  { title: "Pre-Retreat Announcement", text: `On [date], our parish will host a Custodi Parvulos formation retreat — a one-day journey through the Drama of Salvation held in the presence of the Blessed Sacrament. All staff, volunteers, catechists, and clergy are invited. The day includes Mass, Adoration, meals, and time for reflection. Please contact [name] to register. "Pie Pelicane, custodi parvulos" — O loving Pelican, guard the little ones.` },
  { title: "Week-of Reminder", text: `This Saturday, [date], from 8:00 AM to 4:00 PM, our parish hosts the Custodi Parvulos retreat. Please keep all participants in your prayers. The day begins with breakfast at 8:00, Mass at 9:00, and continues through formation, meals, and the Chaplet of Divine Mercy. All are welcome to attend any portion.` },
  { title: "Post-Retreat Thanks", text: `Thank you to the [#] parishioners who participated in last Saturday's Custodi Parvulos retreat. Please pray for the fruits of this formation in our parish — that we may truly guard the little ones entrusted to our care.` },
];

const FACILITATOR_GUIDE = [
  { title: "Opening (20 min)", description: "Begin with prayer. Each participant introduces themselves briefly. Set the tone: this is a formation, not a training. We are seeking conversion of heart, not information." },
  { title: "Part I — Creatio (45 min)", description: "Read the introduction aloud. Pause. Work through Section 1 (The Body Reveals the Person) — one paragraph at a time. After each section, sit in silence for 2 minutes. Then open the discussion questions." },
  { title: "Part II — Lapsus (45 min)", description: "This part contains difficult material. Acknowledge it. The John Jay data is meant to be uncomfortable. Read slowly, pause often. The reflection pauses are essential, not optional." },
  { title: "Part III — Formatio (45 min)", description: "This is where data meets doctrine. Walk through the convergence between Paul VI's warnings and the John Jay timeline. Let participants sit with the weight of the prophecy fulfilled." },
  { title: "Part IV — Messias (45 min)", description: "The Five Wounds walkthrough. This is the turning point of the day — from diagnosis to hope. Make sure a crucifix is visible. If possible, end this section at the foot of the cross." },
  { title: "Part V — Ecclesia (45 min)", description: "Vision becomes action. Each participant should leave with one concrete commitment — written down. Provide notecards." },
  { title: "Closing Examen & Commitment (30 min)", description: "Ignatian examen over the day. What consoled you? What disturbed you? What is God asking of you? Each participant shares one commitment aloud (optional) and writes it on their Testimonium card." },
];

export default function Resources() {
  const [tab, setTab] = useState("homilies");

  const printCurrent = () => window.print();
  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <Nav />

      <div style={{ ...sectionStyle, maxWidth: 820, padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <BookOpen size={32} color={brown} strokeWidth={1.3} style={{ display: "block", margin: "0 auto" }} />
            <p style={{ color: red, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginTop: 12 }}>PARISH RESOURCES</p>
            <h1 style={{ ...heading, fontSize: 32, marginTop: 8 }}>Scriptorium</h1>
            <p style={{ color: stone, fontSize: 16, fontStyle: "italic", marginTop: 8 }}>Printable resources, templates, and references for parish leaders</p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${borderC}`, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { key: "homilies", label: "Saints' Homilies" },
            { key: "facility", label: "Facility Checklist" },
            { key: "facilitator", label: "Facilitator Guide" },
            { key: "bulletins", label: "Bulletin Inserts" },
            { key: "funding", label: "Funding Template" },
            { key: "diocese", label: "Diocese Letter" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={tabStyle(tab === t.key)}>{t.label}</button>
          ))}
        </div>

        {/* SAINTS' HOMILIES */}
        {tab === "homilies" && (
          <div>
            <p style={{ ...prose, fontSize: 15, marginBottom: 20 }}>Rather than writing new homily material, we point you to the greatest preachers in the Church's tradition. These homilies, sermons, and letters are all in the public domain and freely available from trusted Catholic sources.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SAINT_HOMILIES.map((h, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <a href={h.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "16px 20px", textDecoration: "none", color: "inherit" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 12, color: red, fontWeight: 700, letterSpacing: 1 }}>{h.saint.toUpperCase()}</p>
                        <p style={{ fontSize: 16, fontWeight: 600, color: ink, marginTop: 4 }}>{h.title}</p>
                        <p style={{ fontSize: 13, color: stone, fontStyle: "italic", marginTop: 4 }}>{h.theme}</p>
                        <p style={{ fontSize: 12, color: muted, marginTop: 6 }}>Source: {h.source}</p>
                      </div>
                      <ExternalLink size={16} color={brown} />
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* FACILITY CHECKLIST */}
        {tab === "facility" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ ...prose, fontSize: 15, margin: 0 }}>Everything your parish needs to host a Custodi Parvulos retreat.</p>
              <button onClick={printCurrent} style={{ background: "none", border: `1px solid ${borderC}`, padding: "8px 14px", borderRadius: 4, fontFamily: font, fontSize: 13, color: brown, cursor: "pointer" }}>
                <Printer size={13} style={{ verticalAlign: "middle", marginRight: 4 }} /> Print
              </button>
            </div>
            {FACILITY_CHECKLIST.map((section, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginBottom: 16 }}>
                  <h3 style={{ ...heading, fontSize: 16, marginBottom: 12 }}>{section.section}</h3>
                  {section.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                      <CheckSquare size={14} color={brown} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 3 }} />
                      <p style={{ ...prose, fontSize: 14, margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* FACILITATOR GUIDE */}
        {tab === "facilitator" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ ...prose, fontSize: 15, margin: 0 }}>For small groups doing the formation in person — a guide to pacing and facilitation.</p>
              <button onClick={printCurrent} style={{ background: "none", border: `1px solid ${borderC}`, padding: "8px 14px", borderRadius: 4, fontFamily: font, fontSize: 13, color: brown, cursor: "pointer" }}>
                <Printer size={13} style={{ verticalAlign: "middle", marginRight: 4 }} /> Print
              </button>
            </div>
            {FACILITATOR_GUIDE.map((section, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginBottom: 12 }}>
                  <h3 style={{ ...heading, fontSize: 15, marginBottom: 8 }}>{section.title}</h3>
                  <p style={{ ...prose, fontSize: 14, margin: 0 }}>{section.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* BULLETIN INSERTS */}
        {tab === "bulletins" && (
          <div>
            <p style={{ ...prose, fontSize: 15, marginBottom: 20 }}>Copy-paste these into your Sunday bulletin.</p>
            {BULLETIN_INSERTS.map((b, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <h3 style={{ ...heading, fontSize: 15 }}>{b.title}</h3>
                    <button onClick={() => copy(b.text)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "4px 10px", borderRadius: 4, fontFamily: font, fontSize: 11, color: brown, cursor: "pointer" }}>Copy</button>
                  </div>
                  <p style={{ ...prose, fontSize: 14, margin: 0 }}>{b.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* FUNDING TEMPLATE */}
        {tab === "funding" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ ...prose, fontSize: 15, margin: 0 }}>Template letter for parishes seeking funding to cover retreat costs.</p>
              <button onClick={() => copy(FUNDING_TEMPLATE)} style={{ background: brown, color: cream, border: "none", padding: "8px 16px", borderRadius: 4, fontFamily: font, fontSize: 13, cursor: "pointer" }}>Copy Letter</button>
            </div>
            <pre style={{ fontFamily: font, fontSize: 14, color: ink, whiteSpace: "pre-wrap", lineHeight: 1.7, background: cream, padding: 24, borderRadius: 8, border: `1px solid ${borderC}` }}>{FUNDING_TEMPLATE}</pre>
          </div>
        )}

        {/* DIOCESE LETTER */}
        {tab === "diocese" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ ...prose, fontSize: 15, margin: 0 }}>Notify your bishop or vicar general that your parish plans to host a retreat.</p>
              <button onClick={() => copy(DIOCESE_LETTER)} style={{ background: brown, color: cream, border: "none", padding: "8px 16px", borderRadius: 4, fontFamily: font, fontSize: 13, cursor: "pointer" }}>Copy Letter</button>
            </div>
            <pre style={{ fontFamily: font, fontSize: 14, color: ink, whiteSpace: "pre-wrap", lineHeight: 1.7, background: cream, padding: 24, borderRadius: 8, border: `1px solid ${borderC}` }}>{DIOCESE_LETTER}</pre>
          </div>
        )}
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
