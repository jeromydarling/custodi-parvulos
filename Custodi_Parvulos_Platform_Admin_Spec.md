# Custodi Parvulos — Platform Admin Specification
## Content Management System for Top-Level Administrators

---

## Overview

The Platform Admin is the top-level administrative role — the person or team responsible for running Custodi Parvulos as a whole. This is distinct from the Parish Admin (who manages their parish's participants) and the Diocesan Admin (who oversees multiple parishes).

The Platform Admin can:
- Edit all text content across all 5 Parts and 7 Modules
- Manage the content in all three languages (English, Spanish, Polish)
- Preview changes before publishing
- Manage dioceses and parish accounts
- View platform-wide analytics
- Configure system settings

---

## Role Hierarchy (Updated)

```
Platform Admin (superadmin)
  └── Diocesan Admin
        └── Parish Admin
              └── Participant
```

### Database Addition

```sql
-- Add 'platform_admin' to the role check constraint
ALTER TABLE profiles DROP CONSTRAINT profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('participant', 'parish_admin', 'diocesan_admin', 'platform_admin'));

-- Content versions table — stores all editable content with version history
CREATE TABLE content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL,        -- e.g., 'part.creation.sections.0.content'
  language TEXT NOT NULL DEFAULT 'en',
  content TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  edited_by UUID REFERENCES profiles(id),
  published_by UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT                        -- editor notes about the change
);

-- Create index for fast lookups
CREATE INDEX idx_content_versions_key_lang_status 
  ON content_versions(content_key, language, status);

-- Content locks — prevent simultaneous editing
CREATE TABLE content_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  locked_by UUID REFERENCES profiles(id),
  locked_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '30 minutes'),
  UNIQUE(content_key, language)
);
```

### Row-Level Security

```sql
-- Only platform admins can read/write content versions
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Platform admins manage content"
  ON content_versions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'platform_admin'
    )
  );

-- All authenticated users can read published content
CREATE POLICY "Anyone can read published content"
  ON content_versions FOR SELECT
  USING (status = 'published');
```

---

## Admin Routes

- `/platform` — Platform dashboard (system-wide stats)
- `/platform/content` — Content editor home (all Parts and Modules listed)
- `/platform/content/part/:partId` — Edit a specific Part
- `/platform/content/part/:partId/section/:sectionIndex` — Edit a specific section
- `/platform/content/module/:moduleIndex` — Edit a specific Module
- `/platform/content/module/:moduleIndex/scenario/:scenarioIndex` — Edit a scenario
- `/platform/content/preview/:type/:id` — Preview content as a participant would see it
- `/platform/organizations` — Manage all organizations (dioceses, parishes)
- `/platform/users` — User management across the platform
- `/platform/analytics` — Platform-wide analytics
- `/platform/settings` — System configuration

---

## Content Editor Design

### Philosophy

The content editor should feel like editing a manuscript, not a CMS. Same warm parchment palette, same serif typography. The editor should display content in a way that closely resembles how participants will see it, so the admin is always editing in context.

### Content Editor Home (`/platform/content`)

Two sections matching the participant view:

**Drama Salutis — The Five Parts**

| Part | Latin | Sections | Last Edited | Status |
|------|-------|----------|-------------|--------|
| I. Creation | Creatio | 4 sections | Mar 15, 2026 | Published |
| II. The Fall | Lapsus | 4 sections | Mar 15, 2026 | Published |
| ... | ... | ... | ... | ... |

Each row is clickable → goes to Part editor.

**Hebdomada Creationis — The Seven Modules**

| Day | Latin | Content Items | Scenarios | Last Edited | Status |
|-----|-------|--------------|-----------|-------------|--------|
| I. Light | Lux | 4 points | 1 scenario | Mar 15, 2026 | Published |
| ... | ... | ... | ... | ... | ... |

Each row is clickable → goes to Module editor.

**Language tabs** at the top: English | Español | Polski
- Switching language shows the content in that language
- Missing translations are highlighted in amber with "Needs Translation" badge
- The editor can toggle a side-by-side view showing English + target language

### Part Editor (`/platform/content/part/:partId`)

Displays the full Part structure as an editable form:

**Header Section (always visible)**
- Title (English) — text input
- Latin title — text input (shown but rarely changed)
- Subtitle — text input
- Tagline — text input

**Meditation Data** (collapsible panel)
- Wound — label + value text inputs
- Sense — label + value text inputs
- Mystery — label + value text inputs
- Precept — label + value text inputs
- Pentateuch — label + value text inputs

**Scripture** (collapsible panel)
- Text — textarea
- Reference — text input

**Introduction** — rich textarea (supports paragraph breaks)

**Sections** (expandable accordion, one per section)

Each section contains:
- **Section title** — text input
- **Content** — rich textarea with paragraph support
  - Live preview panel shows the content as the participant would see it
  - Markdown-like formatting: paragraph breaks respected, no other formatting needed
- **Reflection Pause** — textarea
  - This text appears between sections as a contemplative prompt
- **Discussion Questions** — dynamic list
  - Each question is a textarea
  - "Add Question" button
  - Drag to reorder
  - Delete with confirmation

**Lectio Divina** (collapsible panel)
- Scripture text — textarea
- Reference — text input
- Four prompts (Lectio, Meditatio, Oratio, Contemplatio) — each a textarea

**Final Reflection** — textarea

**Part III Special: Convergence Table**
- Table editor with 7 rows, 3 columns (Finding, Principle, Implication)
- Each cell is a textarea
- "Add Row" / "Delete Row" buttons

**Part IV Special: Five Wounds**
- List editor with 5 entries
- Each entry: Wound name, Meaning, Healing dimension — each a text input

**Action Buttons (sticky footer)**
- "Save Draft" — saves without publishing
- "Preview" — opens preview in new tab showing content as participant would see it
- "Publish" — saves and makes live (with confirmation dialog)
- "Revert to Published" — discards draft, returns to last published version
- "Version History" — shows list of all previous versions with timestamps and editor names

### Module Editor (`/platform/content/module/:moduleIndex`)

Similar structure:

**Header Section**
- Title, Latin title, Subtitle — text inputs
- Genesis verse — textarea
- Reference — text input

**Introduction** — rich textarea

**Formation Content** — dynamic list of content points
- Each point is a textarea
- Drag to reorder
- Add / Delete with confirmation

**Discussion Questions** — dynamic list of textareas

**Scenarios** — accordion of scenario editors
- Each scenario has:
  - Title — text input
  - Text — rich textarea
  - "Add Scenario" button
  - Delete with confirmation

**Lectio Divina** — same structure as Parts
- Scripture text, Reference, 4 prompts

**Examen** — textarea

**Module 7 Special:**
- The content list represents the holy hour structure
- Each item in the list corresponds to a step in the holy hour
- Editing here edits the guided meditation content

### Live Preview

The "Preview" button opens a new tab that renders the content exactly as a participant would see it — same warm parchment design, same Ignatian rhythm flow, same meditation pages, same Lectio Divina layout. But with a banner at the top:

```
⚠ PREVIEW MODE — This is a draft preview. Changes are not yet published.
[Close Preview] [Publish Now]
```

### Version History

Each content edit creates a version record. The version history view shows:

| Version | Editor | Date | Status | Notes | Actions |
|---------|--------|------|--------|-------|---------|
| v12 | Admin Name | Mar 15, 2026 3:42 PM | Published | Updated reflection prompt | View · Restore |
| v11 | Admin Name | Mar 14, 2026 10:15 AM | Archived | Fixed typo in section 2 | View · Restore |
| ... | ... | ... | ... | ... | ... |

"View" shows the content at that version in read-only mode.
"Restore" makes that version the current draft (with confirmation).

### Diff View

When viewing a draft that differs from the published version, the editor can toggle a diff view that highlights:
- Added text in green
- Removed text in red
- Changed text with strikethrough (old) and highlight (new)

---

## Content Architecture for the App

### How Editable Content Integrates with the App

The app currently stores all content as static constants in the content file. To make content editable:

**On app load:**
1. App fetches the latest published content from the `content_versions` table
2. Content is merged with the static defaults (defaults serve as fallback)
3. Participant sees the published version

**Content key structure:**
```
part.{partId}.title
part.{partId}.subtitle
part.{partId}.tagline
part.{partId}.introduction
part.{partId}.sections.{index}.title
part.{partId}.sections.{index}.content
part.{partId}.sections.{index}.reflectionPause
part.{partId}.sections.{index}.discussionQuestions.{index}
part.{partId}.lectio.text
part.{partId}.lectio.ref
part.{partId}.lectio.prompts.{index}
part.{partId}.reflection
part.{partId}.meditation.{key}.value
part.{partId}.scripture.text
part.{partId}.scripture.ref
part.{partId}.convergenceTable.{index}.finding
part.{partId}.convergenceTable.{index}.principle
part.{partId}.convergenceTable.{index}.implication
part.{partId}.fiveWounds.{index}.wound
part.{partId}.fiveWounds.{index}.meaning
part.{partId}.fiveWounds.{index}.healing

module.{index}.title
module.{index}.subtitle
module.{index}.verse
module.{index}.ref
module.{index}.intro
module.{index}.content.{index}
module.{index}.discussionQuestions.{index}
module.{index}.scenarios.{index}.title
module.{index}.scenarios.{index}.text
module.{index}.lectio.text
module.{index}.lectio.ref
module.{index}.lectio.prompts.{index}
module.{index}.examen
```

**Per language:** Each content_key + language combination has its own entry. The app loads the set matching the user's `preferred_language`.

### Caching Strategy

- Published content is cached in the browser (localStorage or React Query cache)
- Cache TTL: 1 hour
- Force refresh available via pull-to-refresh or a "Check for updates" button
- Platform admin publishes → cache-busting signal sent (via Supabase Realtime or a version counter)

---

## Platform Dashboard (`/platform`)

### Top Stats
- Total organizations (parishes + schools + communities)
- Total participants across all organizations
- Total certificates issued (all time)
- Active participants this month
- Content last published (timestamp)

### System Health
- Languages with incomplete translations (e.g., "Polish: 73% complete")
- Content sections in draft (unpublished changes pending)
- Organizations with no activity in 90+ days

### Quick Actions
- "Edit Content" → `/platform/content`
- "Add Organization" → `/platform/organizations/new`
- "View Analytics" → `/platform/analytics`
- "Translation Status" → `/platform/content` with language tab

---

## Platform Admin Authentication

Platform admin accounts are created manually (not self-service). The first platform admin is seeded in the database during deployment:

```sql
-- Seed the initial platform admin (run once during setup)
INSERT INTO profiles (id, first_name, last_name, email, role)
VALUES (
  '[supabase-auth-user-id]',
  'Admin',
  'Name',
  'admin@custodiparvulos.com',
  'platform_admin'
);
```

Additional platform admins can be created by existing platform admins through the user management interface.

### Security Considerations
- Platform admin actions are logged in an audit trail
- Content publishes require confirmation
- Destructive actions (delete organization, delete user) require double confirmation
- Session timeout: 30 minutes of inactivity
- All platform admin routes require `role = 'platform_admin'` check both client-side and in RLS policies

---

## Updated Phase 1 Scope

Phase 1 now includes:
1. Participant experience (with all enriched content from custodi-content.js)
2. Parish Admin dashboard
3. **Platform Admin content editor** (basic version)
4. Certificate generation
5. Authentication with 4 roles

The Phase 1 Platform Admin gets:
- Content editor for all Parts and Modules
- Save draft / publish workflow
- Live preview
- Basic version history (view previous versions, restore)
- Platform dashboard with stats

Phase 2 adds:
- Diff view
- Translation management interface
- Content locks for simultaneous editing
- Audit trail
- Full analytics

---

## Content Editor UI Components

### Rich Textarea
- Supports paragraph breaks (rendered as separate `<p>` elements in the app)
- Character count
- Auto-save (debounced, saves draft every 30 seconds of inactivity)
- "Unsaved changes" indicator

### Dynamic List Editor
- Each item is a textarea
- Drag handle for reordering (drag-and-drop)
- "+" button to add new item
- "×" button to delete (with confirmation if content exists)
- Minimum items enforced where appropriate (e.g., Lectio always has exactly 4 prompts)

### Accordion Section Editor
- Collapsible panels for each section
- Expand/collapse all button
- Visual indicator showing which sections have been modified (draft vs. published)

### Side-by-Side Translation View
- Left panel: source language (English)
- Right panel: target language (editable)
- Matching content keys aligned vertically
- "Copy from English" button for each field (as a starting point for translation)
- "Mark as Reviewed" checkbox for each translated field
- Progress bar showing translation completion percentage

---

## Rendering Updates Required

The app's participant view needs these additions to support the enriched content:

### Parts — New Rendering Elements

1. **Introduction block**: After the meditation page and before sections, display `part.introduction` as prose paragraphs

2. **Reflection pauses**: After each section's content (before the "Continue" button), display `section.reflectionPause` in a distinct contemplative card — different background (slightly warmer), italic text, with a pause icon. Include a minimum dwell time of 60 seconds before "Continue" activates.

3. **Discussion questions**: After each section's reflection pause, display `section.discussionQuestions` as a numbered list in a card labeled "For Reflection and Discussion." These serve both solo contemplation and group settings.

4. **Convergence Table (Part III)**: Render `part.convergenceTable` as an interactive element where users can expand each row to see the full finding → principle → implication mapping. On mobile, each row becomes a card that expands on tap.

5. **Five Wounds Walkthrough (Part IV)**: Render `part.fiveWounds` as a guided sequence — each wound appears one at a time with its meaning and healing dimension. User advances through them with a "Next Wound" button. The final view shows all five together.

### Modules — New Rendering Elements

1. **Discussion questions phase**: After formation content (Phase 1), before scenarios (Phase 2), add a discussion questions phase displaying `module.discussionQuestions`

2. **Lectio Divina phase**: After scenarios/discernment (Phase 2), before Examen (Phase 3), add a Lectio Divina phase — same four-movement structure as in the Parts

3. **Multiple scenarios**: Module 4 has 3 scenarios. Render each as a separate card with its own title, and a journal textarea after all scenarios are presented.

4. **Module 7 rendering**: The content list is the holy hour structure. Render each item as a guided meditation step with generous spacing and contemplative timing. No scenarios or standard discussion questions — the examen replaces them.

### Updated Phase Structure

**Parts: 6 phases** (was 4)
0. Meditation page
1. Introduction
2. Reading sections (with reflection pauses and discussion questions inline)
3. Lectio Divina
4. Final Reflection + Journal
5. Complete

**Modules: 6 phases** (was 4)
0. Opening (Genesis verse + intro)
1. Formation content
2. Discussion questions
3. Scenarios / Discernment (with journal)
4. Lectio Divina
5. Examen + Journal + Complete

---

*Pie Pelicane, custodi parvulos.*
