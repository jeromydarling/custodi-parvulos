# Custodi Parvulos — Phase 0: Foundation & Standards
## Architecture, Testing, i18n, and Developer Experience

---

## Overview

Phase 0 establishes the technical foundation before any features are built. Every line of code written in Phases 1–5 should conform to these standards. This phase sets up the project structure, testing framework, internationalization system, CI/CD pipeline, and developer conventions.

**Nothing ships without tests. Nothing ships without i18n keys. No exceptions.**

---

## Tech Stack

```
Framework:        React 18+ (Vite + SWC)
Language:         TypeScript (strict mode)
Runtime:          Deno 2.x (for edge functions and scripts)
Backend:          Supabase (Auth, Database, Storage, Edge Functions)
Styling:          Tailwind CSS 4.x (with custom theme tokens)
Testing:          Vitest + React Testing Library + Playwright
i18n:             react-i18next + i18next
State Management: TanStack Query (server state) + Zustand (client state)
Forms:            React Hook Form + Zod validation
PDF Generation:   @react-pdf/renderer (certificates)
Email:            Resend (transactional email via Supabase Edge Functions)
Deployment:       Lovable.dev managed hosting (or Vercel/Netlify)
Monorepo:         Turborepo (if edge functions warrant separation)
```

---

## Project Structure

```
custodi-parvulos/
├── src/
│   ├── components/
│   │   ├── ui/                    # Base UI components (Button, Card, Input, etc.)
│   │   ├── layout/                # Shell, Header, Footer, Navigation
│   │   ├── formation/             # Part, Module, Lectio, Examen, Journal components
│   │   ├── admin/                 # Dashboard, ParticipantList, ProgressView, etc.
│   │   └── certificate/           # Certificate preview, PDF generation
│   ├── content/
│   │   ├── parts.ts               # All 5 Parts data (typed, i18n-keyed)
│   │   ├── modules.ts             # All 7 Modules data (typed, i18n-keyed)
│   │   └── types.ts               # Content type definitions
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProgress.ts
│   │   ├── useJournal.ts
│   │   ├── useOrganization.ts
│   │   └── useCertificate.ts
│   ├── i18n/
│   │   ├── config.ts              # i18next configuration
│   │   ├── locales/
│   │   │   ├── en/
│   │   │   │   ├── common.json    # UI strings (buttons, labels, nav)
│   │   │   │   ├── formation.json # All formation content
│   │   │   │   ├── admin.json     # Admin dashboard strings
│   │   │   │   └── emails.json    # Email template strings
│   │   │   ├── es/
│   │   │   │   ├── common.json
│   │   │   │   ├── formation.json
│   │   │   │   ├── admin.json
│   │   │   │   └── emails.json
│   │   │   └── pl/
│   │   │       ├── common.json
│   │   │       ├── formation.json
│   │   │       ├── admin.json
│   │   │       └── emails.json
│   │   └── utils.ts               # Helper functions for i18n
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client
│   │   ├── api.ts                 # API helper functions
│   │   └── utils.ts               # General utilities
│   ├── pages/                     # Route-level page components
│   ├── styles/
│   │   ├── theme.ts               # Design tokens (colors, fonts, spacing)
│   │   └── globals.css            # Base styles, Tailwind config
│   ├── test/
│   │   ├── setup.ts               # Vitest global setup
│   │   ├── mocks/                 # Supabase mocks, content mocks
│   │   ├── factories/             # Test data factories
│   │   └── helpers/               # Test utilities
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── migrations/                # Numbered SQL migration files
│   ├── functions/                 # Deno Edge Functions
│   │   ├── send-invitation/
│   │   ├── send-reminder/
│   │   ├── generate-certificate/
│   │   └── daily-cron/
│   └── seed.sql                   # Dev seed data
├── e2e/                           # Playwright end-to-end tests
│   ├── participant-journey.spec.ts
│   ├── admin-dashboard.spec.ts
│   ├── auth-flow.spec.ts
│   └── certificate.spec.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── deno.json                      # Deno config for edge functions
└── .github/
    └── workflows/
        └── ci.yml                 # GitHub Actions CI pipeline
```

---

## Testing Standards

### Philosophy

This platform handles sensitive content (abuse prevention, examination of conscience, private journals). Testing is not optional — it is a moral obligation. A bug in the journal privacy system could expose someone's most vulnerable reflections. A bug in the progress system could issue false certificates. A bug in the admin view could show journal content to someone who shouldn't see it.

**Every feature needs:**
1. Unit tests for business logic
2. Component tests for UI behavior
3. Integration tests for data flow
4. E2E tests for critical user paths

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
      exclude: [
        'src/test/**',
        'src/i18n/locales/**',
        '**/*.d.ts',
        'src/main.tsx',
      ],
    },
    // Deno compat for edge function tests
    alias: {
      '@/': path.resolve(__dirname, './src/'),
    },
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src/'),
    },
  },
});
```

### Test Setup

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Supabase client globally
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      order: vi.fn().mockReturnThis(),
    })),
  },
}));

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      // Return key with interpolated values for test assertions
      if (opts) {
        return Object.entries(opts).reduce(
          (str, [k, v]) => str.replace(`{{${k}}}`, String(v)),
          key
        );
      }
      return key;
    },
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));
```

### Test Factories

```typescript
// src/test/factories/index.ts
import { v4 as uuid } from 'uuid';

export const createProfile = (overrides = {}) => ({
  id: uuid(),
  organization_id: uuid(),
  first_name: 'Maria',
  last_name: 'Santos',
  email: 'maria@example.com',
  role: 'participant' as const,
  title: 'Volunteer',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  preferred_language: 'en',
  ...overrides,
});

export const createOrganization = (overrides = {}) => ({
  id: uuid(),
  name: 'St. Mary Catholic Church',
  type: 'parish' as const,
  diocese: 'Diocese of Springfield',
  city: 'Springfield',
  state: 'IL',
  pastor_name: 'Fr. James Murphy',
  parish_code: 'STMARY-2026',
  default_language: 'en',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createPartProgress = (overrides = {}) => ({
  id: uuid(),
  user_id: uuid(),
  part_id: 'creation',
  phase: 0,
  started_at: new Date().toISOString(),
  completed_at: null,
  time_spent_seconds: 0,
  ...overrides,
});

export const createModuleProgress = (overrides = {}) => ({
  id: uuid(),
  user_id: uuid(),
  module_index: 0,
  phase: 0,
  started_at: new Date().toISOString(),
  completed_at: null,
  time_spent_seconds: 0,
  ...overrides,
});

export const createJournalEntry = (overrides = {}) => ({
  id: uuid(),
  user_id: uuid(),
  entry_key: 'part-creation',
  content: 'This reflection on the dignity of the human person moved me deeply...',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createCertificate = (overrides = {}) => ({
  id: uuid(),
  user_id: uuid(),
  organization_id: uuid(),
  certificate_number: 'CP-2026-00001',
  issued_at: new Date().toISOString(),
  expires_at: null,
  pdf_url: null,
  certificate_type: 'initial' as const,
  ...overrides,
});
```

### Required Test Categories

**1. Journal Privacy Tests (CRITICAL — write these first)**
```typescript
// src/hooks/__tests__/useJournal.test.ts
describe('Journal Privacy', () => {
  it('only returns entries belonging to the authenticated user');
  it('rejects attempts to read another user\'s journal entries');
  it('parish admin cannot access participant journal content');
  it('diocesan admin cannot access participant journal content');
  it('journal entries are excluded from admin progress views');
  it('journal content is never included in certificate data');
  it('journal content is never included in compliance reports');
});
```

**2. Progress Tracking Tests**
```typescript
describe('Progress Tracking', () => {
  it('initializes at phase 0 for new sections');
  it('advances phase only forward, never backward');
  it('records completion timestamp when reaching final phase');
  it('tracks time spent per section');
  it('correctly determines overall completion (5 parts + 7 modules)');
  it('minimum time requirements prevent premature advancement');
  it('journal entry minimum length enforced before completion');
});
```

**3. Certificate Tests**
```typescript
describe('Certificate Generation', () => {
  it('only issues certificate when all 12 sections are complete');
  it('refuses to issue if any journal entries are missing');
  it('generates unique sequential certificate numbers');
  it('includes correct participant and organization data');
  it('PDF renders with Pelican logo and correct layout');
  it('certificate appears in admin dashboard after issuance');
});
```

**4. Auth & Authorization Tests**
```typescript
describe('Authorization', () => {
  it('participants can only access their own journey');
  it('parish admins see only their organization\'s participants');
  it('parish admins cannot modify participant progress');
  it('unauthenticated users are redirected to login');
  it('invitation tokens expire after 30 days');
  it('expired invitation tokens show appropriate message');
  it('role-based routing works correctly after login');
});
```

**5. i18n Tests**
```typescript
describe('Internationalization', () => {
  it('all UI strings use i18n keys, not hardcoded text');
  it('language switcher updates all visible content');
  it('Latin titles remain in Latin regardless of language setting');
  it('formation content loads in the user\'s preferred language');
  it('fallback to English when translation is missing');
  it('date formatting respects locale');
  it('certificate generates in the user\'s preferred language');
});
```

### Playwright E2E Tests

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Critical E2E paths:**
```typescript
// e2e/participant-journey.spec.ts
test('complete participant journey from registration to certificate', async ({ page }) => {
  // Register via invitation link
  // Complete Part I (all 4 phases)
  // Verify journal is saved
  // Complete all Parts and Modules
  // Verify certificate is available
  // Download certificate PDF
});

// e2e/journal-privacy.spec.ts
test('admin cannot see participant journal entries', async ({ page }) => {
  // Login as participant, write journal entry
  // Login as admin, view participant progress
  // Verify journal content is NOT visible
  // Verify progress IS visible
});

// e2e/auth-flow.spec.ts
test('invitation flow end-to-end', async ({ page }) => {
  // Admin creates invitation
  // Navigate to join link
  // Complete registration
  // Verify assigned to correct organization
  // Verify appears in admin participant list
});
```

### CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  edge-function-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v2
        with:
          deno-version: v2.x
      - run: deno test supabase/functions/ --allow-env --allow-net
```

---

## Internationalization (i18n)

### Launch Languages

1. **English** (en) — primary, all content authored in English first
2. **Spanish** (es) — largest non-English Catholic population in the US
3. **Polish** (pl) — large Catholic immigrant community, strong demand

### Architecture

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'pl'],
    ns: ['common', 'formation', 'admin', 'emails'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'custodi-language',
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
```

### Namespace Structure

**`common.json`** — UI chrome (~200 keys)
```json
{
  "nav": {
    "home": "Home",
    "journey": "My Journey",
    "profile": "Profile",
    "admin": "Dashboard",
    "logout": "Sign Out"
  },
  "auth": {
    "login": "Sign In",
    "register": "Create Account",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot your password?",
    "invitation": "Enter invitation code"
  },
  "actions": {
    "save": "Save",
    "continue": "Continue",
    "back": "Back",
    "download": "Download",
    "complete": "Complete"
  },
  "progress": {
    "yourJourney": "Your Journey",
    "completed": "completed",
    "of": "of",
    "complete": "Complete",
    "inProgress": "In Progress",
    "notStarted": "Not Started"
  },
  "header": {
    "title": "Custodi Parvulos",
    "subtitle": "Guard the Little Ones",
    "tagline": "How the Drama of Salvation Leads to Renewal"
  },
  "footer": {
    "portalName": "Safe Environment Training Portal",
    "eucharist": "This is my body, given for you."
  },
  "time": {
    "takeYourTime": "Take your time. There is no rush.",
    "minutesRemaining": "{{minutes}} minutes of reflection remaining"
  }
}
```

**`formation.json`** — All theological content (~25,000 words per language)
```json
{
  "parts": {
    "dramaSalutis": "Drama Salutis",
    "creation": {
      "title": "Creation",
      "latin": "Creatio",
      "subtitle": "The Original Design of the Human Person",
      "tagline": "In the beginning, God spoke the human person into existence as a masterwork of love",
      "meditation": {
        "wound": "The Right Hand — the hand that creates, that shapes, that blesses",
        "sense": "Sight — \"And God saw that it was good\" (Genesis 1:31)",
        "mystery": "The Annunciation — God's creative Word takes flesh",
        "precept": "Attend Mass on Sundays — where we encounter the Creator in the Eucharist",
        "pentateuch": "Genesis — the book of beginnings, of the original design"
      },
      "scripture": {
        "text": "So God created man in his own image, in the image of God he created him; male and female he created them.",
        "ref": "Genesis 1:27"
      },
      "sections": [
        {
          "title": "The Body Reveals the Person",
          "content": "The foundational insight of the Theology of the Body is that..."
        }
      ],
      "lectio": {
        "text": "Then the Lord God formed the man of dust from the ground...",
        "ref": "Genesis 2:7",
        "prompts": [
          "Read the passage slowly, twice. What word or phrase draws your attention?",
          "Imagine being present at this moment. What do you see? What do you feel?",
          "What is God saying to you, personally, through this passage about the dignity of the body?",
          "Rest in silence. What response rises in your heart?"
        ]
      },
      "reflection": "As you consider the truth that the body reveals the person..."
    }
  },
  "modules": {
    "hebdomadaCreationis": "Hebdomada Creationis",
    "day1": {
      "title": "Light",
      "latin": "Lux",
      "subtitle": "The Truth About the Human Person",
      "verse": "And God said, 'Let there be light,' and there was light...",
      "ref": "Genesis 1:3-4",
      "intro": "On the first day, God's first act is to create light...",
      "content": ["..."],
      "scenario": "A new volunteer coach begins spending extra time...",
      "examen": "Where today did I see the image of God in another person?..."
    }
  },
  "lectio": {
    "movements": {
      "lectio": "Lectio",
      "meditatio": "Meditatio",
      "oratio": "Oratio",
      "contemplatio": "Contemplatio"
    },
    "sacredReading": "Sacred Reading"
  },
  "examen": {
    "title": "Ignatian Examen",
    "subtitle": "Examination of Conscience",
    "journalLabel": "Your Examen Journal",
    "journalPlaceholder": "In the silence of your heart, write what God is showing you..."
  },
  "discernment": {
    "title": "Scenario-Based Discernment",
    "subtitle": "Notice Your Interior Movements",
    "journalLabel": "What Do You Notice in Yourself?",
    "journalPlaceholder": "Describe the interior movements you notice: resistance, concern, fear, courage, consolation, desolation..."
  }
}
```

### Latin Invariance Rule

**Latin titles and the motto NEVER get translated.** They remain identical across all languages:
- "Custodi Parvulos" — always
- "Pie Pelicane, custodi parvulos" — always
- "Creatio", "Lapsus", "Formatio Populi Sancti", "Messias", "Ecclesia" — always
- "Lux", "Firmamentum", "Terra et Herba", "Luminaria", "Vita Abundans", "Imago Dei", "Sabbatum" — always
- "Dies I" through "Dies VII" — always
- "Drama Salutis", "Hebdomada Creationis" — always
- "Lectio", "Meditatio", "Oratio", "Contemplatio" — always

These are stored as constants, not in locale files:

```typescript
// src/content/latin.ts
export const LATIN = {
  motto: 'Pie Pelicane, custodi parvulos',
  title: 'Custodi Parvulos',
  parts: {
    sectionTitle: 'Drama Salutis',
    creation: 'Creatio',
    fall: 'Lapsus',
    formation: 'Formatio Populi Sancti',
    messiah: 'Messias',
    church: 'Ecclesia',
  },
  modules: {
    sectionTitle: 'Hebdomada Creationis',
    day1: 'Lux',
    day2: 'Firmamentum',
    day3: 'Terra et Herba',
    day4: 'Luminaria',
    day5: 'Vita Abundans',
    day6: 'Imago Dei',
    day7: 'Sabbatum',
  },
  days: ['Dies I', 'Dies II', 'Dies III', 'Dies IV', 'Dies V', 'Dies VI', 'Dies VII'],
  lectio: ['Lectio', 'Meditatio', 'Oratio', 'Contemplatio'],
} as const;
```

### Translation Workflow

1. All content is authored in English in `en/formation.json`
2. English content is frozen for a translation cycle
3. Professional Catholic theological translators produce `es/formation.json` and `pl/formation.json`
4. Translations are reviewed by a native-speaking Catholic theologian or priest
5. Scripture references use the official approved translations:
   - English: NABRE or RSV-CE
   - Spanish: Biblia de Jerusalén or Biblia de Navarra
   - Polish: Biblia Tysiąclecia
6. UI strings (`common.json`, `admin.json`) can be translated by any competent bilingual person
7. All translations are committed and tested before deployment

### Translation Quality Assurance

```typescript
// src/i18n/__tests__/completeness.test.ts
import en_common from '../locales/en/common.json';
import en_formation from '../locales/en/formation.json';
import es_common from '../locales/es/common.json';
import es_formation from '../locales/es/formation.json';
import pl_common from '../locales/pl/common.json';
import pl_formation from '../locales/pl/formation.json';

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null
      ? getKeys(value as Record<string, unknown>, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );
}

describe('Translation Completeness', () => {
  const enCommonKeys = getKeys(en_common);
  const enFormationKeys = getKeys(en_formation);

  it('Spanish common.json has all English keys', () => {
    const esKeys = getKeys(es_common);
    const missing = enCommonKeys.filter(k => !esKeys.includes(k));
    expect(missing).toEqual([]);
  });

  it('Spanish formation.json has all English keys', () => {
    const esKeys = getKeys(es_formation);
    const missing = enFormationKeys.filter(k => !esKeys.includes(k));
    expect(missing).toEqual([]);
  });

  it('Polish common.json has all English keys', () => {
    const plKeys = getKeys(pl_common);
    const missing = enCommonKeys.filter(k => !plKeys.includes(k));
    expect(missing).toEqual([]);
  });

  it('Polish formation.json has all English keys', () => {
    const plKeys = getKeys(pl_formation);
    const missing = enFormationKeys.filter(k => !plKeys.includes(k));
    expect(missing).toEqual([]);
  });

  it('no English keys have empty string values in Spanish', () => {
    const esValues = getKeys(es_common).map(k => getNestedValue(es_common, k));
    expect(esValues.filter(v => v === '')).toEqual([]);
  });

  it('no English keys have empty string values in Polish', () => {
    const plValues = getKeys(pl_common).map(k => getNestedValue(pl_common, k));
    expect(plValues.filter(v => v === '')).toEqual([]);
  });
});
```

### Language Selector Component

Appears in:
- Registration page (set preferred language)
- Profile settings (change language)
- Footer (quick toggle)

```typescript
// Component renders a simple select with:
// English | Español | Polski
// Switching language:
// 1. Updates i18next language
// 2. Saves to localStorage
// 3. Updates user profile in database (if authenticated)
// 4. Reloads formation content in new language
// Latin titles remain unchanged
```

---

## Deno Edge Functions Standards

### Structure

Each edge function is a self-contained Deno module:

```
supabase/functions/
├── _shared/
│   ├── supabase-client.ts    # Shared Supabase admin client
│   ├── email-templates.ts    # Shared email template rendering
│   ├── types.ts              # Shared type definitions
│   └── cors.ts               # CORS headers
├── send-invitation/
│   ├── index.ts              # Handler
│   └── index.test.ts         # Tests
├── send-reminder/
│   ├── index.ts
│   └── index.test.ts
├── generate-certificate/
│   ├── index.ts
│   └── index.test.ts
└── daily-cron/
    ├── index.ts
    └── index.test.ts
```

### Testing Edge Functions with Deno

```typescript
// supabase/functions/send-invitation/index.test.ts
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.test("send-invitation returns 400 without email", async () => {
  const req = new Request("http://localhost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const { handler } = await import("./index.ts");
  const res = await handler(req);
  assertEquals(res.status, 400);
});

Deno.test("send-invitation returns 200 with valid data", async () => {
  // ... test with mocked Supabase client
});
```

### Deno Configuration

```json
// deno.json
{
  "tasks": {
    "test": "deno test --allow-env --allow-net --allow-read supabase/functions/",
    "test:watch": "deno test --watch --allow-env --allow-net --allow-read supabase/functions/"
  },
  "compilerOptions": {
    "strict": true
  },
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2"
  }
}
```

---

## TypeScript Standards

### Strict Mode

```json
// tsconfig.json (relevant excerpts)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Content Types

```typescript
// src/content/types.ts
export interface MeditationData {
  wound: { label: string; value: string };
  sense: { label: string; value: string };
  mystery: { label: string; value: string };
  precept: { label: string; value: string };
  pentateuch: { label: string; value: string };
}

export interface ScriptureRef {
  text: string;
  ref: string;
}

export interface LectioDivina {
  text: string;
  ref: string;
  prompts: [string, string, string, string]; // exactly 4 movements
}

export interface PartSection {
  titleKey: string; // i18n key
  contentKey: string; // i18n key
}

export interface Part {
  id: 'creation' | 'fall' | 'formation' | 'messiah' | 'church';
  num: 'I' | 'II' | 'III' | 'IV' | 'V';
  latinKey: string; // references LATIN constant
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;
  sectionCount: number;
}

export interface Module {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  latinKey: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  hasScenario: boolean; // false only for day 7
}

export type PartPhase = 0 | 1 | 2 | 3; // meditation, reading, lectio, reflection
export type ModulePhase = 0 | 1 | 2 | 3; // opening, formation, discernment, examen

export type UserRole = 'participant' | 'parish_admin' | 'diocesan_admin';

export type CompletionStatus = 'not_started' | 'in_progress' | 'complete' | 'overdue';
```

---

## Tailwind Custom Theme

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FFFDF7',
          100: '#F5EDE0',
          200: '#F0E8D8',
          300: '#E8DCC8',
          400: '#D4C4A8',
          500: '#B8A080',
          600: '#8B7355',
          700: '#6B3A2A',
          800: '#4A3828',
          900: '#3B2A1A',
        },
        liturgical: {
          red: '#8B2500',
          gold: '#C9A84C',
        },
        monastery: {
          DEFAULT: '#6B3A2A',
          light: '#8B7355',
          dark: '#3B2A1A',
        },
      },
      fontFamily: {
        serif: ['"Palatino Linotype"', '"Book Antiqua"', 'Palatino', 'Georgia', 'serif'],
      },
    },
  },
} satisfies Config;
```

---

## Phase 0 Deliverables Checklist

Before Phase 1 development begins, the following must be in place:

- [ ] Vite + React + TypeScript project initialized
- [ ] Tailwind configured with custom theme tokens
- [ ] Vitest configured with global setup, mocks, and factories
- [ ] Playwright configured for E2E tests
- [ ] i18next configured with English, Spanish, and Polish locale files (UI strings only — formation content can be English-only initially with empty es/pl formation.json files that fail the completeness test, acting as a TODO tracker)
- [ ] Latin constants file created
- [ ] Supabase project created with initial migration (all Phase 1 tables)
- [ ] Deno configured for edge functions with test runner
- [ ] CI pipeline running (lint, type-check, unit tests, e2e tests)
- [ ] Coverage thresholds set at 80%
- [ ] All content type definitions written
- [ ] PelicanLogo SVG component extracted and tested
- [ ] Design system tokens documented and implemented in Tailwind
- [ ] README with setup instructions for new developers

**Estimated time: 2–4 hours in Lovable Max.**

---

*Pie Pelicane, custodi parvulos.*
