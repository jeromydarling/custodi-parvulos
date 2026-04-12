# Custodi Parvulos — Terminology Reference
## The vocabulary of formation, not compliance

---

## Guiding Principle

Every word in Custodi Parvulos should belong to the same world as *Pie Pelicane*, *Drama Salutis*, and *Hebdomada Creationis*. The language of the platform is the language of Catholic formation — not HR, not corporate compliance, not SaaS.

This document is the authoritative reference for all naming across the platform. When any spec document, code, or UI text conflicts with this document, this document governs.

---

## Role Names

| Internal/Database Key | Display Name (UI) | Latin | Description |
|---|---|---|---|
| `platform_admin` | **Custos** | *Custos* (Guardian) | Top-level administrator. Guardian of the entire program. Can edit all content, manage all organizations, view all analytics. |
| `diocesan_admin` | **Diocesan Custos** | *Custos Dioecesanus* | Oversees all parishes within a diocese. Views aggregate data, generates compliance reports, manages parish accounts. |
| `parish_admin` | **Custodian** | — (English, echoing *Custodi*) | Parish-level guardian. Manages their community's *fideles*, tracks progress, issues certificates. Typically the pastor, DRE, or safe environment coordinator. |
| `participant` | **Fidelis** (pl: **Fideles**) | *Fidelis* (one of the Faithful) | A member of the faithful undertaking the formation journey. Clergy, religious, staff, volunteer, teacher, catechist. |

### Usage in UI

- Dashboard greeting: "Welcome, Custos" / "Welcome, Custodian"
- Participant list header: "Your Fideles" (not "Your Participants")
- Progress view: "[Name], Fidelis" (not "[Name], Participant")
- Invitation email: "You are invited to join the fideles of [Parish Name]"
- Certificate: "This certifies that [Name], fidelis of [Parish Name]..."

### Usage in Code

Database columns and API keys retain technical names (`role = 'participant'`, `participant_count`, etc.) for clarity. The display layer maps these to the Catholic terminology. A mapping constant:

```typescript
export const ROLE_DISPLAY = {
  platform_admin: { label: 'Custos', latin: 'Custos' },
  diocesan_admin: { label: 'Diocesan Custos', latin: 'Custos Dioecesanus' },
  parish_admin: { label: 'Custodian', latin: null },
  participant: { label: 'Fidelis', latinPlural: 'Fideles' },
} as const;
```

---

## Content Structure Names

| Old Term | New Term (UI) | Latin | Context |
|---|---|---|---|
| Module | **Statio** (pl: **Stationes**) | *Statio* (Station) | The seven stations of formation, mapped to the days of Creation. Like the Stations of the Cross — a journey with stops for prayer and reflection. |
| Part | **Part** | *Pars* (pl: *Partes*) | The five parts of the Drama of Salvation. "Part" is acceptable in English because it's neutral and already used liturgically (e.g., "the Liturgy of the Word is the first part of the Mass"). |
| Section | **Reading** | *Lectio* | Individual reading sections within a Part. |
| Phase | **Movement** | *Motus* | The progression within a Statio or Part (e.g., Opening → Formation → Discernment → Examen). Echoes the "movements" of the Spiritual Exercises. |

### Usage in UI

- Home page section header: "The Seven Stationes — *Hebdomada Creationis*" (not "The Seven Modules")
- Individual station: "Statio I: Lux" / "Station I: Light"
- Navigation: "Enter Statio IV" (not "Enter Module 4")
- Progress: "5 Partes and 7 Stationes" (not "5 Parts and 7 Modules")
- Completion: "Complete Statio III →" (not "Complete Module 3")
- Admin dashboard: "Stationes Progress" column (not "Modules Progress")

### Usage in Code

Internal variable names can use `station` / `stations` for clarity:

```typescript
// Content data
export const STATIONS = [...]; // was MODULES

// Database tables remain as-is for migration simplicity
// station_progress (or keep module_progress and map in display layer)

// Route structure
/journey/statio/:stationIndex  // (or /journey/station/:index)
```

---

## Section-Level Terminology

| Old Term | New Term | Context |
|---|---|---|
| Key Content (bullet points) | **Formation Points** | The numbered teaching points within a Statio |
| Discussion Questions | **Questions for Reflection** | Can be used solo or in group — "discussion" implies group only |
| Scenario Exercises | **Exercises in Discernment** | Emphasizes the Ignatian practice of discerning interior movements |
| Examen | **Examen** (unchanged) | Already Latin, already Ignatian — perfect as is |
| Lectio Divina | **Lectio Divina** (unchanged) | Already Latin, universally understood in Catholic formation |
| Reflection Pause | **Pause for Recollection** | *Recollectio* — the practice of gathering one's interior life before God |
| Journal | **Personal Reflection** | Or simply "Your Reflection" — "journal" sounds like a diary |
| Certificate of Completion | **Testimonium Formationis** | "Testimony of Formation" — or simply *Testimonium* |

### UI Labels

```
"Key Content"              → "Formation Points"
"Discussion Questions"     → "Questions for Reflection"  
"Scenario Exercises"       → "Exercises in Discernment"
"Your Journal"             → "Your Reflection"
"Save Journal"             → "Save Reflection"
"Your Examen Journal"      → "Your Examen"
"Certificate of Completion"→ "Testimonium Formationis"
"Closing Prayer"           → "Closing Prayer" (unchanged — already sacred)
"Begin Formation →"        → "Begin Formation →" (unchanged — already good)
"Enter Discernment →"      → "Enter Discernment →" (unchanged)
"Enter Examen →"           → "Enter Examen →" (unchanged)
"Complete Day 3"           → "Complete Statio III"
"Module 4"                 → "Statio IV"
"YOUR JOURNEY"             → "YOUR JOURNEY" or "ITER VESTRUM" (your journey)
"completed"                → "completed" (English is fine for functional labels)
```

---

## Navigation and Section Headers

| Location | Old Text | New Text |
|---|---|---|
| Home — Modules section header | THE SEVEN MODULES — *Hebdomada Creationis* | THE SEVEN STATIONES — *Hebdomada Creationis* |
| Home — Module card label | DIES I | STATIO I (with DIES I as subtitle) |
| Module opening page header | DIES IV · LUMINARIA | STATIO IV · LUMINARIA |
| Module content phase header | DIES IV · LUMINARIA | STATIO IV · LUMINARIA |
| Module complete button | Complete Dies IV → | Complete Statio IV → |
| Admin participant table column | Modules (0-7) | Stationes (0-7) |
| Admin progress view | Module Progress | Stationes Progress |
| Certificate body text | "Seven Modules (Hebdomada Creationis)" | "Seven Stationes (Hebdomada Creationis)" |
| Phase 1 spec throughout | "module" | "statio/station" |
| Landing page | "7 Modules" | "7 Stationes" |

---

## Certificate Terminology

The certificate is a *Testimonium Formationis* — a Testimony of Formation.

Updated certificate body text:
```
This certifies that

[PARTICIPANT FULL NAME]
Fidelis of [ORGANIZATION NAME]

has completed the Custodi Parvulos formation program,
a journey through the Drama of Salvation rooted in
the Theology of the Body, Humanae Vitae, and
the findings of the John Jay College Studies.

Comprising Five Partes (Drama Salutis) and
Seven Stationes (Hebdomada Creationis)

Issued [date]
Testimonium No. CP-[YEAR]-[SEQUENTIAL]

Pie Pelicane, custodi parvulos
```

---

## Email Terminology

| Old | New |
|---|---|
| "You've been invited to Custodi Parvulos" | "You are invited to join the fideles of [Parish Name]" |
| "Your formation journey continues" | "Your formation journey continues" (unchanged — already good) |
| "X participants have not completed" | "X fideles have not yet completed their formation" |
| "Participant Weekly Digest" | "Custodian's Weekly Report" |

---

## Words to Avoid

These words should never appear in the participant-facing UI:

| Avoid | Use Instead |
|---|---|
| Module | Statio / Station |
| Training | Formation |
| Program | Journey / Formation |
| Test / Quiz / Assessment | Reflection / Discernment / Examen |
| Pass / Fail | Complete |
| Score | (nothing — there are no scores) |
| User | Fidelis / Custodian / Custos |
| Admin / Administrator | Custos / Custodian |
| Dashboard | (acceptable in admin context, but prefer "Overview") |
| Portal | (acceptable in footer only as "Safe Environment Training Portal" for compliance labeling) |
| Compliance | Formation (except in USCCB audit context where "compliance" is the required term) |
| HR | (never) |
| Onboarding | Welcome / Beginning the Journey |
| Enrolled | Joined / Received |

---

## Summary

The vocabulary of Custodi Parvulos is:

**Roles:** Custos, Custodian, Fidelis
**Structure:** Partes and Stationes
**Process:** Formation, Discernment, Examen, Lectio Divina, Recollection
**Outcome:** Testimonium Formationis
**Spirit:** A journey, not a task. A formation, not a training. A community of fideles, not a list of users.

*Pie Pelicane, custodi parvulos.*
