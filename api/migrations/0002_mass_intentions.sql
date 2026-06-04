CREATE TABLE IF NOT EXISTS mass_intentions (
  id TEXT PRIMARY KEY,
  parish TEXT,
  intention TEXT NOT NULL,
  offered_by TEXT,
  date TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
