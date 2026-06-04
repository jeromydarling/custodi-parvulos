-- Custodi Parvulos D1 Schema

CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'parish',
  diocese TEXT,
  city TEXT,
  state TEXT,
  admin_name TEXT,
  admin_email TEXT,
  admin_password_hash TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  org_id TEXT REFERENCES organizations(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL DEFAULT 'individual',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  part_id TEXT NOT NULL,
  completed_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, part_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  participant_name TEXT NOT NULL,
  parish_name TEXT,
  serial_number TEXT NOT NULL UNIQUE,
  issued_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS retreat_requests (
  id TEXT PRIMARY KEY,
  parish TEXT NOT NULL,
  diocese TEXT,
  city TEXT,
  state TEXT,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  participants INTEGER,
  chapel TEXT DEFAULT 'yes',
  start_time TEXT DEFAULT '8:00 AM',
  selected_dates TEXT, -- JSON array
  prefer_other TEXT,
  contribution TEXT,
  meal_needs TEXT,
  notes TEXT,
  status TEXT DEFAULT 'inquiry',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS scheduled_emails (
  id TEXT PRIMARY KEY,
  retreat_id TEXT REFERENCES retreat_requests(id),
  type TEXT NOT NULL,
  to_email TEXT NOT NULL,
  parish TEXT,
  contact TEXT,
  event_date TEXT,
  send_date TEXT NOT NULL,
  sent INTEGER DEFAULT 0,
  sent_at TEXT
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT DEFAULT 'manual',
  subscribed_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS newsletters (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  audience TEXT DEFAULT 'all',
  recipient_count INTEGER DEFAULT 0,
  sent_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parish TEXT,
  diocese TEXT,
  role TEXT,
  type TEXT DEFAULT 'retreat',
  rating INTEGER DEFAULT 5,
  text TEXT NOT NULL,
  approved INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  mode TEXT DEFAULT 'drive',
  origin TEXT,
  destination TEXT,
  parish TEXT,
  date TEXT,
  miles REAL DEFAULT 0,
  mileage_value REAL DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  category TEXT DEFAULT 'other',
  amount REAL DEFAULT 0,
  description TEXT,
  date TEXT,
  trip_id TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS host_homes (
  id TEXT PRIMARY KEY,
  host_name TEXT NOT NULL,
  parish TEXT,
  city TEXT,
  state TEXT,
  contact TEXT,
  capacity INTEGER DEFAULT 1,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bishops (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  diocese TEXT,
  status TEXT,
  next_step TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS benefactors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  amount REAL DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  referred TEXT NOT NULL,
  date TEXT,
  outcome TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS facilitators (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  region TEXT,
  status TEXT DEFAULT 'training',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prayer_intentions (
  id TEXT PRIMARY KEY,
  parish TEXT,
  intention TEXT NOT NULL,
  submitted_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  parish TEXT,
  summary TEXT,
  outcome TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS waitlist (
  id TEXT PRIMARY KEY,
  parish TEXT NOT NULL,
  contact TEXT,
  preferred_season TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
