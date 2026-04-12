# Custodi Parvulos — Phase 1 Technical Specification
## For Lovable.dev Build

---

## Project Overview

**Name:** Custodi Parvulos ("Guard the Little Ones")
**Purpose:** A Catholic Safe Environment formation platform that replaces compliance-oriented training with a contemplative journey through the Drama of Salvation, rooted in the Theology of the Body, Humanae Vitae, and the findings of the John Jay College studies on clergy abuse.
**Pricing:** Free for all parishes (diocesan-funded)
**Users:** Catholic dioceses, parishes, schools, and religious communities in the United States

---

## Phase 1 Scope

Phase 1 delivers the core formation experience plus parish administration. It includes:

1. **Participant experience** — The full formation journey (5 Parts + 7 Modules) with Ignatian rhythm
2. **Parish Administrator dashboard** — User management, progress tracking, certificate generation
3. **Authentication and authorization** — Role-based access (parish admin, participant)
4. **Certificate system** — Auto-generated PDF certificates of completion

Phase 2 (future) will add: Diocesan admin tier, bulk CSV import, annual recertification tracking, group session scheduling, email invitation system, and reporting for USCCB Charter compliance audits.

---

## Design System

### Visual Identity
- **Aesthetic:** Warm stone and manuscript — monastic scriptorium feel
- **Logo:** Custom SVG Pelican in the "Ad Crucem" pose (pelican piercing her breast to feed her young). The SVG code is provided in the existing React prototype.
- **Motto:** *Pie Pelicane, custodi parvulos* — "O loving Pelican, guard the little ones"
- **Name displayed:** "Custodi Parvulos" (the title) with "Guard the Little Ones" beneath and "Safe Environment Training Portal" only in the footer

### Color Palette
```
Background:         #F5EDE0  (warm parchment)
Card background:    #FFFDF7  (cream vellum)
Primary text:       #3B2A1A  (dark manuscript ink)
Headings:           #6B3A2A  (monastery brown)
Liturgical red:     #8B2500  (for crosses, wounds, sacred markers)
Secondary text:     #8B7355  (warm stone)
Muted text:         #B8A080  (aged parchment)
Borders:            #E8DCC8  (soft stone)
Light borders:      #D4C4A8
Input backgrounds:  #FFFDF7
Hover/active tint:  #F0E8D8
```

### Typography
- **Primary:** Palatino Linotype / Book Antiqua / Palatino / Georgia (serif stack)
- **Headings:** Same family, bold, uppercase with letter-spacing for section headers
- **Latin titles:** Italic, liturgical red (#8B2500)
- **Body prose:** 16px, line-height 1.9, color #4A3828

### Background Texture
Subtle cross-pattern SVG overlay at 3.5% opacity (provided in prototype CSS)

### Iconography
- Lucide React icons throughout (already integrated in prototype)
- Part icons: Sparkles, Diamond, Hexagon, Cross, Church
- Module icons: Sun, Circle, Leaf, Star, Bird, Crown, Flame

---

## Database Schema (Supabase/PostgreSQL)

### Tables

```sql
-- Organizations (parishes, schools, religious communities)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('parish', 'school', 'religious_community', 'diocese')),
  diocese TEXT,
  city TEXT,
  state TEXT,
  pastor_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('participant', 'parish_admin', 'diocesan_admin')),
  title TEXT, -- e.g., "Volunteer", "Teacher", "Deacon", "DRE"
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Progress tracking for Parts (5 parts, 4 phases each)
CREATE TABLE part_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  part_id TEXT NOT NULL, -- 'creation', 'fall', 'formation', 'messiah', 'church'
  phase INTEGER NOT NULL DEFAULT 0, -- 0=meditation, 1=reading, 2=lectio, 3=reflection (complete)
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(user_id, part_id)
);

-- Progress tracking for Modules (7 modules, 4 phases each)
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_index INTEGER NOT NULL, -- 0-6
  phase INTEGER NOT NULL DEFAULT 0, -- 0=opening, 1=formation, 2=discernment, 3=examen (complete)
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(user_id, module_index)
);

-- Journal entries (PRIVATE — row-level security critical)
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  entry_key TEXT NOT NULL, -- e.g., 'part-creation', 'mod-3-scenario', 'mod-3-examen'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ, -- for annual recertification (Phase 2)
  pdf_url TEXT
);

-- Invitations (for parish admins to invite participants)
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  email TEXT NOT NULL,
  invited_by UUID REFERENCES profiles(id),
  role TEXT NOT NULL DEFAULT 'participant',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '30 days')
);
```

### Row-Level Security Policies

```sql
-- Journal entries: ONLY the owner can read/write their own entries
-- This is CRITICAL — journals contain examination of conscience content
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own journal entries"
  ON journal_entries FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Progress: Users can see their own; parish admins can see their org's participants
ALTER TABLE part_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own progress"
  ON part_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Parish admins see org progress"
  ON part_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin
      JOIN profiles participant ON participant.id = part_progress.user_id
      WHERE admin.id = auth.uid()
      AND admin.role IN ('parish_admin', 'diocesan_admin')
      AND admin.organization_id = participant.organization_id
    )
  );

-- Profiles: Users see their own; admins see their org
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins see org profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin
      WHERE admin.id = auth.uid()
      AND admin.role IN ('parish_admin', 'diocesan_admin')
      AND admin.organization_id = profiles.organization_id
    )
  );
```

---

## Page Structure and Routes

### Public Pages
- `/` — Landing page (Pelican, motto, description, login/register buttons)
- `/login` — Email/password login
- `/register` — Registration (with optional invitation token)
- `/join/:token` — Accept invitation and register

### Participant Pages
- `/journey` — Main dashboard (the home screen from our prototype — 5 Parts + 7 Modules with progress)
- `/journey/part/:partId` — Part experience (meditation → reading → lectio → reflection)
- `/journey/module/:moduleIndex` — Module experience (opening → formation → discernment → examen)
- `/certificate` — View/download certificate (only visible when all 12 sections complete)
- `/profile` — Edit profile, view history

### Parish Admin Pages
- `/admin` — Admin dashboard (overview stats, participant list)
- `/admin/participants` — Full participant list with progress details
- `/admin/participants/:id` — Individual participant progress view (NO journal access)
- `/admin/invite` — Invite new participants (single email or bulk)
- `/admin/certificates` — View all issued certificates
- `/admin/settings` — Organization settings, customize welcome message

---

## Participant Experience (Detailed Flow)

### The Journey Dashboard (`/journey`)

Layout matches our prototype: Pelican header, progress indicator, two sections:

**Section 1: "Drama Salutis" — The Five Parts**
Cards for each Part showing:
- Lucide icon + Part number (Roman numeral)
- Title (English) + Latin name in italic red
- Subtitle
- Progress indicator (4 dots for 4 phases)
- "✓ COMPLETE" tag when finished

**Section 2: "Hebdomada Creationis" — The Seven Modules**
Cards for each Module showing:
- Lucide icon + Day number (Latin: DIES I, DIES II, etc.)
- Title + Latin name
- Subtitle
- Progress indicator (4 dots)
- Completion tag

### Part Experience (4 phases per Part)

Each Part follows the Ignatian rhythm:

**Phase 0 — Meditation Page**
- Cross icon
- Part number and Latin title
- Tagline
- Fivefold meditation table (Wound, Sense, Mystery, Precept, Pentateuch book)
- Scripture for meditation
- "Begin Reading →" button
- Minimum 2 minutes on this page before button activates (encourages actual meditation)

**Phase 1 — Reading**
- Paginated sections (3-4 sections per Part)
- Progress bar showing section position
- Prose content in the warm manuscript style
- Previous/Continue navigation
- "Enter Lectio Divina →" at end of final section

**Phase 2 — Lectio Divina**
- Scripture passage in a vellum-style card
- Four movements displayed as expandable/clickable steps:
  - Lectio (Read)
  - Meditatio (Meditate)
  - Oratio (Pray)
  - Contemplatio (Rest)
- Each movement has a guided prompt
- "Enter Reflection →" button

**Phase 3 — Reflection / Examination of Conscience**
- Reflection prompt in a card
- Journal textarea (private, saved to database)
- Previous journal entry shown if exists
- "Save Reflection" + "Complete [Latin name] →" buttons
- Upon completion: progress saved, returned to journey dashboard

### Module Experience (4 phases per Module)

**Phase 0 — Opening**
- Module icon (Lucide) at large size
- Day number in Latin (DIES I, etc.)
- Title + Latin name
- Genesis verse for the day in a scripture card
- Theological introduction paragraph
- "Begin Formation →" button

**Phase 1 — Formation**
- Day + Latin name header
- "Key Formation Points" — numbered list of 4-7 points
- "Enter Discernment →" (or "Enter Meditation →" for Day 7)

**Phase 2 — Scenario-Based Discernment** (Days 1-6)
- "SCENARIO-BASED DISCERNMENT" header
- Scenario text in a card (real-world situation drawn from John Jay patterns)
- "What do you notice in yourself?" — journal textarea
- "Enter Examen →" button

**Phase 2 — Guided Meditation** (Day 7 only)
- "GUIDED MEDITATION" header
- Sabbath meditation content
- Flows directly to Examen

**Phase 3 — Ignatian Examen**
- "IGNATIAN EXAMEN" header with liturgical red
- Examination of conscience prompt specific to the day's theme
- Journal textarea
- Previous examen shown if exists
- "Save Examen" + "Complete Dies [N] →" buttons

---

## Parish Admin Dashboard

### Overview (`/admin`)

Top stats row:
- Total participants
- Completed (all 12 sections)
- In progress
- Not started
- Certificates issued

Progress visualization:
- Horizontal bar chart showing completion rates across the 5 Parts and 7 Modules
- "Most participants are currently on..." indicator

Recent activity feed:
- "[Name] completed Creatio" — timestamped
- "[Name] joined the formation" — timestamped
- "[Name] received their certificate" — timestamped

### Participants List (`/admin/participants`)

Sortable/filterable table:
| Name | Title/Role | Started | Parts (0-5) | Modules (0-7) | Status | Actions |
|------|-----------|---------|-------------|---------------|--------|---------|

Filters: All, Complete, In Progress, Not Started, Overdue (started > 90 days ago, not complete)

Status badges: "Complete" (green), "In Progress" (amber), "Not Started" (gray), "Overdue" (red)

Actions: View progress detail, Send reminder (Phase 2), View certificate

### Individual Progress (`/admin/participants/:id`)

Shows:
- Participant name, title, start date
- Grid of all 12 sections with status for each (Not Started / In Progress / Complete)
- Time spent per section
- Completion dates
- **NO access to journal entries** (explicitly marked: "Journal entries are private to the participant")
- "Issue Certificate" button (if all complete)

### Invite Participants (`/admin/invite`)

Single invite:
- First name, last name, email, title/role dropdown
- "Send Invitation" button

Bulk invite (Phase 1 — simple version):
- Textarea where admin can paste multiple "email, first name, last name" lines
- Preview table before sending
- "Send All Invitations" button

Invitation generates a unique token link. Email contains:
- Parish name
- Personal welcome
- Link to `/join/:token`
- The Pelican logo and "Custodi Parvulos" branding

### Certificates (`/admin/certificates`)

List of all issued certificates:
- Participant name
- Certificate number
- Issue date
- Download PDF link

---

## Certificate Design

The PDF certificate should be beautiful enough to frame. Design elements:

- **Border:** Illuminated manuscript-style border with warm tones
- **Header:** Pelican SVG logo centered
- **Title:** "Custodi Parvulos" in large serif
- **Subtitle:** "Certificate of Completion"
- **Body text:**
  ```
  This certifies that

  [PARTICIPANT FULL NAME]

  of [ORGANIZATION NAME]

  has completed the Custodi Parvulos Safe Environment
  Formation Program, a comprehensive journey through
  the Drama of Salvation rooted in the Theology of the Body,
  Humanae Vitae, and the findings of the John Jay College Studies.

  Comprising Five Parts (Drama Salutis) and
  Seven Modules (Hebdomada Creationis)
  ```
- **Date:** "Issued [date]"
- **Certificate number:** "Certificate No. CP-[YEAR]-[SEQUENTIAL]"
- **Latin motto:** *Pie Pelicane, custodi parvulos*
- **Signature lines:**
  - Parish Administrator: ________________
  - Pastor: ________________
- **Footer:** "Safe Environment Training Portal"

---

## Authentication Flow

### Registration
1. User arrives at `/register` (or `/join/:token` via invitation)
2. If via invitation: organization is pre-set, role is pre-set
3. If direct: user enters email, password, first name, last name
4. After email verification, user is prompted to either:
   - Enter an invitation code (if they have one)
   - Request to join an existing organization (sends request to parish admin)
   - Register a new organization (becomes parish admin)

### Login
- Email/password via Supabase Auth
- Redirect based on role:
  - `participant` → `/journey`
  - `parish_admin` → `/admin`

### Organization Setup (for new parish admins)
After registering as a new organization:
1. Organization name, type, diocese, city, state
2. Pastor name (for certificates)
3. Optional: welcome message for participants
4. Redirected to admin dashboard

---

## Content Data

All formation content (5 Parts with sections, lectio divina passages, reflection prompts, 7 Modules with scenarios, examen prompts, Scripture verses) is provided in the existing React prototype file (`safe-environment-portal.jsx`). This content should be stored as structured constants in the codebase, not in the database — it is the same for all users.

The content includes:
- 5 Parts, each with: title, Latin name, subtitle, tagline, icon, color, meditation data (wound, sense, mystery, precept, pentateuch), scripture, 3-4 reading sections, lectio divina passage with 4 prompts, reflection prompt
- 7 Modules, each with: day number, title, Latin name, subtitle, Genesis verse, introduction, 4-7 formation points, scenario, examen prompt

---

## Completion Logic

A participant is "complete" when:
- All 5 Parts have reached phase 3 (reflection submitted)
- All 7 Modules have reached phase 3 (examen submitted)
- A journal entry exists for each Part reflection and each Module examen (ensuring genuine engagement, not just clicking through)

When complete:
- Journey dashboard shows a completion banner with option to view/download certificate
- Parish admin is notified
- Certificate record is created in the database
- PDF is generated and stored

---

## Minimum Time Requirements

To prevent "clicking through" without genuine engagement:

- Meditation pages: 2-minute minimum before "Begin Reading" activates
- Reading sections: 1-minute minimum per section before "Continue" activates
- Lectio Divina: 3-minute minimum before "Enter Reflection" activates
- Scenario discernment: No time minimum, but journal entry required (minimum 50 characters)
- Examen: No time minimum, but journal entry required (minimum 50 characters)
- Total estimated time: 8-12 hours across all 12 sections

Timers should be gentle — a subtle "Take your time" message, not a countdown clock. The button simply doesn't appear until the minimum time has passed. This should feel like the content is unfolding at a contemplative pace, not like a restriction.

---

## Responsive Design

- Mobile-first (many participants will use phones)
- Breakpoints: 480px (phone), 768px (tablet), 1024px (desktop)
- Admin dashboard: full-width table on desktop, card layout on mobile
- Formation content: max-width 720px centered on all devices
- Certificate PDF: Letter size (8.5" x 11"), landscape orientation

---

## Phase 2 Roadmap (Future)

After Phase 1 launch:
1. **Diocesan admin tier** — Multi-parish oversight, aggregate reporting
2. **Bulk CSV import** — Upload parish rosters
3. **Annual recertification** — Shortened renewal journey, certificate expiration/renewal
4. **Group session scheduling** — Calendar integration for Module holy hours
5. **Email notification system** — Automated reminders, completion congratulations
6. **USCCB audit reporting** — Export compliance data in the format dioceses need
7. **Multi-language support** — Spanish as first additional language
8. **Facilitator guides** — Printable PDFs for each Module for in-person group sessions
9. **Pastor welcome video** — Upload capability for personalized parish welcome
10. **Analytics dashboard** — Time-on-section data, completion trends, engagement metrics

---

## Files Provided

1. **`safe-environment-portal.jsx`** — Complete React prototype with all formation content, Pelican SVG, warm manuscript UI, Ignatian rhythm flow, and persistent storage. This is the participant experience reference implementation.

2. **`Safe_Environment_Training_Guide_Final.docx`** — The complete theological document (Preface, 5 Parts following the Drama of Salvation with fivefold meditations, 7 Modules following the Days of Creation, Conclusion). This is the authoritative content source.

---

## Summary

Custodi Parvulos transforms Catholic Safe Environment training from a compliance checkbox into a genuine formation experience. Phase 1 delivers the complete participant journey, parish administration, and certificate generation — everything a parish needs to run the program. The warm, monastic design and Ignatian spiritual rhythm make this something people will actually want to complete, not something they endure. The Pelican presides over everything: self-sacrificing love that nourishes and protects the vulnerable.

*Pie Pelicane, custodi parvulos.*
