# Custodi Parvulos — Lovable Build Addendum
## Critical additions for Phase 1 that were identified after the initial specs

**This addendum should be applied AFTER the Phase 0 and Phase 1 specs are implemented. It covers features and requirements that must be present at launch for diocesan adoption.**

---

## 1. StoneBridge Audit Export (CRITICAL — Phase 1)

Every Catholic diocese in the United States is audited annually by StoneBridge Business Partners against the USCCB Charter for the Protection of Children and Young People. If Custodi Parvulos cannot generate audit-ready data, no diocese will adopt it. This is the single most important feature for adoption.

### What StoneBridge Needs (Articles 12 & 13)

The Custodian dashboard must include a "Generate Audit Report" feature that produces:

**Article 12 Data — Safe Environment Training:**
- Total number of clergy (bishops, priests, deacons) who completed formation in the audit period
- Total number of paid employees who completed formation
- Total number of volunteers who completed formation  
- Total number of children/youth (grades 6-12) who completed formation
- Completion dates for each individual
- Names and contact information of safe environment coordinators (Custodians)

**Article 13 Data — Background Evaluations:**
- Total number of background checks conducted on clergy
- Total number of background checks conducted on employees
- Total number of background checks conducted on volunteers
- Background check completion dates
- Background check provider name
- Background check status (clear, pending, flagged)

### Database Additions

```sql
-- Background check tracking (add to Phase 1 schema)
CREATE TABLE background_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  provider TEXT DEFAULT 'manual',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'clear', 'flagged', 'expired', 'not_submitted')),
  submitted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  reference_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Code of conduct acknowledgments
CREATE TABLE conduct_acknowledgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  acknowledged_at TIMESTAMPTZ DEFAULT now(),
  version TEXT NOT NULL DEFAULT '1.0'
);
```

### Audit Report UI

**Location:** Custodian dashboard → "Audit Report" tab

**Controls:**
- Audit period selector (defaults to current USCCB audit year: July 1 – June 30)
- Export as PDF (formatted report with diocese letterhead area)
- Export as CSV (for StoneBridge data collection instrument)
- Export as Excel (for diocese internal use)

**Report Contents:**

```
CUSTODI PARVULOS — SAFE ENVIRONMENT AUDIT REPORT
Audit Period: July 1, [YEAR] – June 30, [YEAR]
Organization: [Name]
Diocese: [Diocese Name]
Custodian: [Name, Email, Phone]

ARTICLE 12 — SAFE ENVIRONMENT FORMATION
═══════════════════════════════════════

Category              | Total | Completed | Completion Rate
─────────────────────-|───────|───────────|────────────────
Clergy (Bishops)      |     1 |         1 | 100%
Clergy (Priests)      |     4 |         4 | 100%
Clergy (Deacons)      |     3 |         3 | 100%
Paid Employees        |    22 |        21 | 95%
Volunteers            |   145 |       138 | 95%
Youth (Grades 6-12)   |   210 |       195 | 93%
─────────────────────-|───────|───────────|────────────────
TOTAL                 |   385 |       362 | 94%

[Individual completion records available in CSV attachment]

ARTICLE 13 — BACKGROUND EVALUATIONS
════════════════════════════════════

Category              | Required | Completed | Status
─────────────────────-|──────────|───────────|───────
Clergy                |        8 |         8 | All clear
Paid Employees        |       22 |        22 | All clear
Volunteers            |      145 |       142 | 3 pending

[Individual background check records available in CSV attachment]

CODE OF CONDUCT
═══════════════
Acknowledged: 362 of 385 (94%)

FORMATION PROGRAM DETAILS
═════════════════════════
Program: Custodi Parvulos (Testimonium Formationis)
Structure: 5 Partes (Drama Salutis) + 7 Stationes (Hebdomada Creationis)
Average completion time: [X] hours
Theological foundation: Theology of the Body, Humanae Vitae, John Jay Studies
Languages available: English, Spanish, Polish
Nihil Obstat: [Censor name, date]
Imprimatur: [Bishop name, diocese, date]
```

### Background Check Tracking UI

**Location:** Custodian dashboard → each Fidelis profile

The Custodian can manually enter background check information:
- Provider (dropdown: Sterling Volunteers, state police, FBI, diocesan provider, other)
- Date submitted
- Date completed
- Status (pending, clear, flagged)
- Reference number
- Expiration date

This is manual entry for Phase 1. Phase 5 adds Sterling Volunteers API integration.

---

## 2. State-Specific Mandatory Reporting

### Database

```sql
CREATE TABLE state_reporting_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code TEXT NOT NULL UNIQUE,  -- 'CA', 'NY', 'TX', etc.
  state_name TEXT NOT NULL,
  who_must_report TEXT NOT NULL,     -- description of mandatory reporters
  report_to TEXT NOT NULL,           -- agency name(s)
  hotline_number TEXT,
  online_report_url TEXT,
  timeframe TEXT,                    -- e.g., "Immediately" or "Within 48 hours"
  penalties TEXT,                    -- consequences of failure to report
  special_notes TEXT,                -- clergy privilege exceptions, etc.
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### How It Works

- When an organization registers, their state is captured
- In Statio IV (Luminaria — Recognizing, Responding, Reporting), a state-specific panel is dynamically inserted after the general reporting content
- The panel displays:
  - "In [State Name], you are required to..."
  - Who must report
  - Where to report (with clickable phone number and link)
  - Timeframe
  - Penalties for failure to report
- A printable one-page state reporting summary is generated as part of the Testimonium Formationis packet
- The Custos can update state requirements through the Platform Admin

### Phase 1 Launch States

Populate data for these 15 states at launch (covers ~65% of US Catholic population):
California, New York, Texas, Illinois, Pennsylvania, New Jersey, Massachusetts, Florida, Ohio, Michigan, Connecticut, Maryland, Louisiana, Wisconsin, Minnesota

All other states display a generic message: "Please consult your diocesan safe environment coordinator for your state's specific reporting requirements" with a link to the Child Welfare Information Gateway state statutes page.

---

## 3. Vulnerable Adults Integration

### Content Changes

The formation content should be updated to include vulnerable adults wherever child protection is discussed. Specific additions:

**In Statio IV (Luminaria):** Add a formation point:
"Vulnerable adults — the elderly, persons with intellectual or developmental disabilities, and adults in relationships of spiritual or counseling dependency — are also protected. The same dynamics of power, trust, grooming, and exploitation that enable the abuse of children can enable the abuse of vulnerable adults. The 'lights to govern' must illuminate these relationships as well."

**Add a scenario to Statio IV:**
```
Title: "The Spiritual Director"
Text: "A woman in your parish has been in spiritual direction with a priest for two years. She recently confided to you that 'Father has been asking very personal questions about my marriage that make me uncomfortable' and that 'he wants to meet at his rectory in the evenings instead of the parish office.' She says she feels confused because 'he's a priest, so it must be okay.' What are the warning signs here? What do you do? Notice: the dynamics of trust, authority, and gradual boundary erosion apply to adults as well as children."
```

**In the Testimonium Formationis:** Add: "...including the protection of vulnerable adults" to the certification language.

**Database:** Add to profiles:
```sql
ALTER TABLE profiles ADD COLUMN serves_vulnerable_adults BOOLEAN DEFAULT false;
```
This allows Custodians to track which fideles work with vulnerable populations, ensuring appropriate formation.

---

## 4. Accessibility — Phase 1 Requirements

### Color Contrast Audit

The warm parchment palette needs verification. Specifically test:
- `#B8A080` (muted stone) on `#F5EDE0` (parchment) — this likely FAILS AA contrast for normal text
- `#8B7355` (warm stone) on `#F5EDE0` — borderline, test carefully
- `#D4C4A8` (light border) used as text anywhere — will fail

**Fix:** Ensure all body text uses `#4A3828` or darker. Reserve lighter colors (`#8B7355`, `#B8A080`) for large text only (18px+ or 14px+ bold). Never use `#D4C4A8` or lighter as text color.

### Required Accessibility Features

- [ ] All Lucide icons have `aria-label` or are marked `aria-hidden="true"` if decorative
- [ ] All form inputs have associated `<label>` elements
- [ ] Focus indicators visible on all interactive elements (use `outline: 2px solid #6B3A2A` on `:focus-visible`)
- [ ] Skip-to-content link at top of every page
- [ ] Page titles update on navigation (`document.title` reflects current Pars/Statio)
- [ ] Error messages associated with form fields via `aria-describedby`
- [ ] Loading states announced to screen readers via `aria-live="polite"`
- [ ] Minimum touch target: 44x44px on all buttons and interactive elements
- [ ] `prefers-reduced-motion` media query disables all scroll animations and transitions
- [ ] Language attribute set on `<html>` tag matching user's selected language
- [ ] Journal textareas have proper `aria-label`: "Your personal reflection on [section name]"

### Testing

Add to Playwright E2E tests:
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('formation journey has no accessibility violations', async ({ page }) => {
  // Login as fidelis
  // Navigate to Part I meditation page
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

---

## 5. PWA / Offline Basics (Phase 1 Minimum)

### Service Worker

Register a service worker that caches:
- All static assets (JS, CSS, fonts, SVGs)
- All formation content (the content data file)
- The Pelican logo SVG

This ensures the formation content loads instantly after first visit, even on slow connections. Full offline journal sync is Phase 2, but content availability offline is Phase 1.

### Manifest

```json
{
  "name": "Custodi Parvulos",
  "short_name": "Custodi",
  "description": "Guard the Little Ones — Safe Environment Formation",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5EDE0",
  "theme_color": "#6B3A2A",
  "icons": [
    { "src": "/pelican-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/pelican-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 6. Code of Conduct Acknowledgment

The Charter requires that all personnel acknowledge a code of conduct. Custodi Parvulos should include this as a step in the formation journey.

### Implementation

- After registration and before beginning the first Pars, the Fidelis is presented with the organization's code of conduct
- The code of conduct text is configurable per organization (the Custodian uploads or pastes it)
- The Fidelis must scroll to the bottom and check "I have read and agree to abide by this code of conduct"
- Acknowledgment is timestamped and stored in `conduct_acknowledgments`
- The acknowledgment date appears in the StoneBridge audit export
- If the code of conduct is updated (new version), all fideles are prompted to re-acknowledge

---

## 7. Grade 6-12 Youth Access

The existing formation content is appropriate for grades 6 through adult. However, youth access requires special handling:

### Parental Consent

- When a Custodian adds a Fidelis under age 18, the system requires a parent/guardian email
- A consent form is sent to the parent/guardian email with:
  - Overview of the formation content
  - Link to preview all content
  - Digital signature / checkbox consent
  - Option to opt out
- The youth Fidelis cannot begin formation until parental consent is received
- Parental consent is logged and included in StoneBridge audit data

### Youth-Specific Adjustments

- Journal/reflection entries for minors are accessible to their parent/guardian (unlike adult journals which are private). This is clearly stated to the youth at the beginning.
- Scenarios involving adult situations (e.g., the Spiritual Director scenario about a married woman) are flagged as "Adult Context" and either adapted or skipped for youth
- The Testimonium Formationis for youth includes the parent/guardian name

### Database

```sql
ALTER TABLE profiles ADD COLUMN date_of_birth DATE;
ALTER TABLE profiles ADD COLUMN is_minor BOOLEAN GENERATED ALWAYS AS (
  date_of_birth > CURRENT_DATE - INTERVAL '18 years'
) STORED;
ALTER TABLE profiles ADD COLUMN parent_guardian_email TEXT;
ALTER TABLE profiles ADD COLUMN parental_consent_at TIMESTAMPTZ;
```

---

## 8. Data Export for Custodians (Phase 1)

Beyond the StoneBridge audit export, Custodians need general data export:

- **Fidelis roster:** CSV with name, email, role/title, start date, completion date, testimonium number, background check status
- **Progress detail:** CSV with each Fidelis's completion status per Pars and Statio
- **Overdue report:** List of fideles who started more than 90 days ago and have not completed
- **Expiring testimonium report:** (Phase 3, but the data structure should support it from Phase 1)

---

## 9. Welcome Flow and Onboarding

When a new Fidelis first logs in, they should experience:

1. **Welcome screen** with the Pelican, the motto, and a brief (2-paragraph) introduction to what Custodi Parvulos is and why it matters. Not a wall of text — a warm, brief, personal welcome.

2. **Code of conduct acknowledgment** (see item 6 above)

3. **Language selection** (English, Español, Polski) with the note that Latin titles remain in Latin regardless of language choice

4. **A brief orientation** (30 seconds, skippable):
   - "Your journey has 5 Partes and 7 Stationes"
   - "Each includes Scripture meditation, reading, reflection, and prayer"
   - "Your reflections are private and are never shared with anyone"
   - "Take your time. This is formation, not a test."

5. **Arrive at the journey home screen** ready to begin Pars I

---

## 10. Terminology Enforcement

**CRITICAL:** The Terminology Reference document (`Custodi_Parvulos_Terminology.md`) governs all user-facing text. During the Lovable build:

- Never use "module" — use "Statio" (pl. "Stationes")
- Never use "participant" in UI — use "Fidelis" (pl. "Fideles")
- Never use "admin" in participant-facing UI — use "Custos" or "Custodian"
- Never use "training" — use "formation"
- Never use "test," "quiz," or "assessment" — use "reflection," "discernment," "examen"
- Never use "journal" — use "reflection" or "your reflection"
- Never use "certificate" in formal contexts — use "Testimonium Formationis" or simply "Testimonium"
- The word "portal" appears only in the footer: "Safe Environment Training Portal"

Database columns and code variables can use technical English (`participant`, `module_index`, etc.) — the display layer maps to the Catholic terminology via the `ROLE_DISPLAY` and related constants.

---

## Summary of Phase 1 Scope Changes

These items are **added to Phase 1** (moved from later phases or newly identified):

| Addition | Reason |
|----------|--------|
| StoneBridge audit export | No diocese adopts without it |
| Background check tracking (manual) | Required for Article 13 audit data |
| Code of conduct acknowledgment | Required by the Charter |
| State-specific reporting (top 15 states) | Statio IV needs concrete, actionable information |
| Vulnerable adult scenario + content | Charter and Vos Estis require it |
| WCAG 2.1 AA accessibility | Cannot launch a nationwide program inaccessibly |
| PWA manifest + content caching | Rural parishes and retreat centers need it |
| Youth parental consent flow | Grades 6-12 need parental gate |
| CSV data export for Custodians | Basic operational need |
| Welcome/onboarding flow | First impression matters |
| Terminology enforcement throughout | Coherent Catholic identity |

---

*Pie Pelicane, custodi parvulos.*
