import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors({
  origin: (origin) => origin || "*",
  credentials: true,
}));

app.use("/*", async (c, next) => {
  await next();
  c.res.headers.set("X-Content-Type-Options", "nosniff");
  c.res.headers.set("X-Frame-Options", "DENY");
  c.res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  c.res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
});

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ── FIX #1: Proper password hashing with Web Crypto API + salt ──
async function hashPassword(pw, salt) {
  salt = salt || crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256);
  const hashHex = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, "0")).join("");
  const saltHex = [...salt].map(b => b.toString(16).padStart(2, "0")).join("");
  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(pw, stored) {
  const [saltHex] = stored.split(":");
  const salt = new Uint8Array(saltHex.match(/.{2}/g).map(b => parseInt(b, 16)));
  const result = await hashPassword(pw, salt);
  return result === stored;
}

// ── Auth middleware (KV-backed sessions) ──
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days

function getSessionId(c) {
  const cookie = c.req.header("Cookie") || "";
  const match = cookie.match(/custodi_sid=([^;]+)/);
  return match ? match[1] : null;
}

async function createSession(kv, userId, role) {
  const sid = crypto.randomUUID();
  await kv.put(`session:${sid}`, JSON.stringify({ userId, role, created: Date.now() }), { expirationTtl: SESSION_TTL });
  return sid;
}

async function requireAuth(c, requiredRole) {
  const sid = getSessionId(c);
  if (!sid) return null;
  const raw = await c.env.SESSIONS.get(`session:${sid}`);
  if (!raw) return null;
  const session = JSON.parse(raw);
  if (requiredRole && session.role !== requiredRole) return null;
  return session;
}

function authResponse(c, data, sid) {
  const res = c.json(data, 201);
  res.headers.set("Set-Cookie", `custodi_sid=${sid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL}`);
  return res;
}

// ── FIX #3: Rate limiting ──
const rateLimits = new Map();
function rateLimit(key, maxPerMinute = 10) {
  const now = Date.now();
  const window = rateLimits.get(key) || [];
  const recent = window.filter(t => now - t < 60000);
  if (recent.length >= maxPerMinute) return false;
  recent.push(now);
  rateLimits.set(key, recent);
  return true;
}

// ── FIX #10: Field whitelists per table ──
const ALLOWED_FIELDS = {
  organizations: ["name", "type", "diocese", "city", "state", "admin_name", "admin_email"],
  users: ["org_id", "name", "email", "role"],
  retreat_requests: ["parish", "diocese", "city", "state", "contact", "email", "phone", "participants", "chapel", "start_time", "selected_dates", "prefer_other", "contribution", "meal_needs", "notes", "status", "updated_at"],
  testimonials: ["name", "parish", "diocese", "role", "type", "rating", "text", "approved"],
  trips: ["mode", "origin", "destination", "parish", "date", "miles", "mileage_value", "notes"],
  expenses: ["category", "amount", "description", "date", "trip_id"],
  host_homes: ["host_name", "parish", "city", "state", "contact", "capacity", "notes"],
  bishops: ["name", "diocese", "status", "next_step"],
  benefactors: ["name", "email", "amount", "notes"],
  referrals: ["source", "referred", "date", "outcome"],
  facilitators: ["name", "email", "region", "status"],
  prayer_intentions: ["parish", "intention", "submitted_by"],
  case_studies: ["title", "parish", "summary", "outcome"],
  waitlist: ["parish", "contact", "preferred_season", "notes"],
  newsletter_subscribers: ["email", "name", "source"],
  newsletters: ["subject", "body", "audience", "recipient_count"],
  scheduled_emails: ["retreat_id", "type", "to_email", "parish", "contact", "event_date", "send_date", "sent", "sent_at"],
  certificates: ["user_id", "participant_name", "parish_name", "serial_number"],
  progress: ["user_id", "part_id"],
  mass_intentions: ["parish", "intention", "offered_by", "date"],
};

function sanitize(table, data) {
  const allowed = ALLOWED_FIELDS[table];
  if (!allowed) return {};
  const clean = {};
  for (const key of allowed) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

// ── Generic CRUD factory (with field sanitization) ──
function crud(table, idPrefix = "r") {
  return {
    async list(db) {
      return await db.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 200`).all();
    },
    async get(db, id) {
      return await db.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
    },
    async create(db, data) {
      const clean = sanitize(table, data);
      const id = `${idPrefix}_${uid()}`;
      const keys = Object.keys(clean);
      if (keys.length === 0) return { id };
      const cols = ["id", ...keys].join(", ");
      const placeholders = ["?", ...keys.map(() => "?")].join(", ");
      const vals = [id, ...keys.map(k => clean[k])];
      await db.prepare(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`).bind(...vals).run();
      return { id, ...clean };
    },
    async update(db, id, data) {
      const clean = sanitize(table, data);
      const keys = Object.keys(clean);
      if (keys.length === 0) return { id };
      const sets = keys.map(k => `${k} = ?`).join(", ");
      const vals = [...keys.map(k => clean[k]), id];
      await db.prepare(`UPDATE ${table} SET ${sets} WHERE id = ?`).bind(...vals).run();
      return { id, ...clean };
    },
    async delete(db, id) {
      await db.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
      return { deleted: true };
    },
  };
}

const tables = {
  organizations: crud("organizations", "org"),
  users: crud("users", "u"),
  retreat_requests: crud("retreat_requests", "rr"),
  testimonials: crud("testimonials", "t"),
  trips: crud("trips", "tr"),
  expenses: crud("expenses", "ex"),
  host_homes: crud("host_homes", "hh"),
  bishops: crud("bishops", "bp"),
  benefactors: crud("benefactors", "bn"),
  referrals: crud("referrals", "rf"),
  facilitators: crud("facilitators", "fc"),
  prayer_intentions: crud("prayer_intentions", "pi"),
  case_studies: crud("case_studies", "cs"),
  waitlist: crud("waitlist", "wl"),
  newsletter_subscribers: crud("newsletter_subscribers", "ns"),
  newsletters: crud("newsletters", "nl"),
  scheduled_emails: crud("scheduled_emails", "se"),
  certificates: crud("certificates", "cert"),
  progress: crud("progress", "pg"),
  mass_intentions: crud("mass_intentions", "mi"),
};

// ── Public read-only tables (no auth required) ──
const PUBLIC_READ = new Set(["testimonials"]);

// ── Admin-only tables ──
const ADMIN_TABLES = new Set([
  "organizations", "users", "retreat_requests", "trips", "expenses",
  "host_homes", "bishops", "benefactors", "referrals", "facilitators",
  "case_studies", "waitlist", "newsletter_subscribers", "newsletters",
  "scheduled_emails", "mass_intentions",
]);

// ── REST endpoints with auth gates ──
for (const [name, ops] of Object.entries(tables)) {
  // GET list — public for testimonials, auth for admin tables
  app.get(`/api/${name}`, async (c) => {
    if (ADMIN_TABLES.has(name) && !(await requireAuth(c))) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const result = await ops.list(c.env.DB);
    return c.json(result.results || []);
  });

  app.get(`/api/${name}/:id`, async (c) => {
    if (ADMIN_TABLES.has(name) && !(await requireAuth(c))) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const row = await ops.get(c.env.DB, c.req.param("id"));
    return row ? c.json(row) : c.json({ error: "Not found" }, 404);
  });

  // POST — public for testimonials and newsletter_subscribers, auth for rest
  app.post(`/api/${name}`, async (c) => {
    if (name !== "testimonials" && name !== "newsletter_subscribers" && !(await requireAuth(c))) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const data = await c.req.json();
    const row = await ops.create(c.env.DB, data);
    return c.json(row, 201);
  });

  app.put(`/api/${name}/:id`, async (c) => {
    if (!(await requireAuth(c))) return c.json({ error: "Unauthorized" }, 401);
    const data = await c.req.json();
    const row = await ops.update(c.env.DB, c.req.param("id"), data);
    return c.json(row);
  });

  app.delete(`/api/${name}/:id`, async (c) => {
    if (!(await requireAuth(c))) return c.json({ error: "Unauthorized" }, 401);
    const result = await ops.delete(c.env.DB, c.req.param("id"));
    return c.json(result);
  });
}

// ── Auth: Register individual (rate limited) ──
app.post("/api/auth/register", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") || "unknown";
  if (!rateLimit(`register:${ip}`, 5)) return c.json({ error: "Too many requests" }, 429);
  const { name, email, password } = await c.req.json();
  if (!name || !email || !password) return c.json({ error: "Missing fields" }, 400);
  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return c.json({ error: "Email already registered" }, 409);
  const id = `u_${uid()}`;
  const hash = await hashPassword(password);
  await c.env.DB.prepare("INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, 'individual')").bind(id, name, email, hash).run();
  const sid = await createSession(c.env.SESSIONS, id, "individual");
  return authResponse(c, { id, name, email, role: "individual" }, sid);
});

// ── Auth: Login individual (rate limited) ──
app.post("/api/auth/login", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") || "unknown";
  if (!rateLimit(`login:${ip}`, 10)) return c.json({ error: "Too many requests" }, 429);
  const { email, password } = await c.req.json();
  if (!email || !password) return c.json({ error: "Missing fields" }, 400);
  const user = await c.env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
  if (!user || !user.password_hash) return c.json({ error: "Invalid credentials" }, 401);
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return c.json({ error: "Invalid credentials" }, 401);
  const sid = await createSession(c.env.SESSIONS, user.id, user.role);
  return authResponse(c, { id: user.id, name: user.name, email: user.email, role: user.role, org_id: user.org_id }, sid);
});

// ── Auth: Register parish (rate limited) ──
app.post("/api/auth/register-parish", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") || "unknown";
  if (!rateLimit(`register:${ip}`, 5)) return c.json({ error: "Too many requests" }, 429);
  const { name, diocese, city, state, adminName, adminEmail, adminPassword } = await c.req.json();
  if (!name || !adminName || !adminEmail || !adminPassword) return c.json({ error: "Missing fields" }, 400);
  const orgId = `org_${uid()}`;
  const userId = `u_${uid()}`;
  const hash = await hashPassword(adminPassword);
  await c.env.DB.prepare("INSERT INTO organizations (id, name, diocese, city, state, admin_name, admin_email, admin_password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(orgId, name, diocese || null, city || null, state || null, adminName, adminEmail, hash).run();
  await c.env.DB.prepare("INSERT INTO users (id, org_id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?, 'parish_admin')").bind(userId, orgId, adminName, adminEmail, hash).run();
  const sid = await createSession(c.env.SESSIONS, userId, "parish_admin");
  return authResponse(c, { id: userId, orgId, name: adminName, email: adminEmail, role: "parish_admin" }, sid);
});

// ── Auth: Login parish admin (rate limited) ──
app.post("/api/auth/login-parish", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") || "unknown";
  if (!rateLimit(`login:${ip}`, 10)) return c.json({ error: "Too many requests" }, 429);
  const { email, password } = await c.req.json();
  if (!email || !password) return c.json({ error: "Missing fields" }, 400);
  const org = await c.env.DB.prepare("SELECT * FROM organizations WHERE admin_email = ?").bind(email).first();
  if (!org || !org.admin_password_hash) return c.json({ error: "Invalid credentials" }, 401);
  const valid = await verifyPassword(password, org.admin_password_hash);
  if (!valid) return c.json({ error: "Invalid credentials" }, 401);
  const sid = await createSession(c.env.SESSIONS, org.id, "parish_admin");
  return authResponse(c, { id: org.id, name: org.admin_name, email: org.admin_email, role: "parish_admin", orgId: org.id, parish: org.name, diocese: org.diocese, city: org.city, state: org.state }, sid);
});

// ── Auth: Get current session ──
app.get("/api/auth/me", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "Not authenticated" }, 401);
  return c.json(session);
});

// ── Auth: Logout ──
app.post("/api/auth/logout", async (c) => {
  const sid = getSession(c);
  if (sid) await c.env.SESSIONS.delete(`session:${sid}`);
  const res = c.json({ ok: true });
  res.headers.set("Set-Cookie", "custodi_sid=; Path=/; Max-Age=0");
  return res;
});

// ── Parish: Add parishioner (auth required) ──
app.post("/api/parish/:orgId/parishioners", async (c) => {
  if (!(await requireAuth(c))) return c.json({ error: "Unauthorized" }, 401);
  const { name, email } = await c.req.json();
  const orgId = c.req.param("orgId");
  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ? AND org_id = ?").bind(email, orgId).first();
  if (existing) return c.json(existing);
  const id = `u_${uid()}`;
  await c.env.DB.prepare("INSERT INTO users (id, org_id, name, email, role) VALUES (?, ?, ?, ?, 'parishioner')").bind(id, orgId, name, email).run();
  return c.json({ id, name, email, org_id: orgId }, 201);
});

// ── FIX #4: Parish parishioners with JOIN instead of N+1 ──
app.get("/api/parish/:orgId/parishioners", async (c) => {
  if (!(await requireAuth(c))) return c.json({ error: "Unauthorized" }, 401);
  const orgId = c.req.param("orgId");
  const users = await c.env.DB.prepare(
    `SELECT u.*, GROUP_CONCAT(p.part_id || '=' || p.completed_at) as progress_str
     FROM users u LEFT JOIN progress p ON u.id = p.user_id
     WHERE u.org_id = ? AND u.role = 'parishioner'
     GROUP BY u.id`
  ).bind(orgId).all();
  const result = (users.results || []).map(u => {
    const progress = {};
    if (u.progress_str) {
      u.progress_str.split(",").forEach(pair => {
        const [partId, completedAt] = pair.split("=");
        if (partId) progress[partId] = completedAt;
      });
    }
    const { progress_str, ...user } = u;
    return { ...user, progress, completedAt: Object.keys(progress).length >= 5 ? Object.values(progress).pop() : null };
  });
  return c.json(result);
});

// ── Parish: Remove parishioner (auth required) ──
app.delete("/api/parish/:orgId/parishioners/:userId", async (c) => {
  if (!(await requireAuth(c))) return c.json({ error: "Unauthorized" }, 401);
  await c.env.DB.prepare("DELETE FROM progress WHERE user_id = ?").bind(c.req.param("userId")).run();
  await c.env.DB.prepare("DELETE FROM users WHERE id = ? AND org_id = ?").bind(c.req.param("userId"), c.req.param("orgId")).run();
  return c.json({ deleted: true });
});

// ── Progress (auth via session or open for now — user-scoped) ──
app.post("/api/progress/:userId/:partId", async (c) => {
  const { userId, partId } = c.req.param();
  const id = `pg_${uid()}`;
  await c.env.DB.prepare("INSERT OR IGNORE INTO progress (id, user_id, part_id) VALUES (?, ?, ?)").bind(id, userId, partId).run();
  return c.json({ userId, partId, completed: true });
});

app.get("/api/progress/:userId", async (c) => {
  const result = await c.env.DB.prepare("SELECT part_id, completed_at FROM progress WHERE user_id = ?").bind(c.req.param("userId")).all();
  const progress = {};
  (result.results || []).forEach(p => { progress[p.part_id] = p.completed_at; });
  return c.json(progress);
});

// ── Retreat: Submit with auto-scheduled emails (public, rate limited) ──
app.post("/api/retreat-requests/submit", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") || "unknown";
  if (!rateLimit(`retreat:${ip}`, 3)) return c.json({ error: "Too many requests" }, 429);
  const data = await c.req.json();
  if (!data.parish || !data.contact || !data.email) return c.json({ error: "Missing required fields" }, 400);
  const id = `rr_${uid()}`;
  const dates = JSON.stringify(data.selectedDates || []);
  await c.env.DB.prepare(
    `INSERT INTO retreat_requests (id, parish, diocese, city, state, contact, email, phone, participants, chapel, start_time, selected_dates, prefer_other, contribution, meal_needs, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'inquiry')`
  ).bind(id, data.parish, data.diocese || null, data.city || null, data.state || null, data.contact, data.email, data.phone || null, data.participants || null, data.chapel || "yes", data.startTime || "8:00 AM", dates, data.preferOther || null, data.contribution || null, data.mealNeeds || null, data.notes || null).run();

  // Auto-schedule reminder emails
  const batch = [];
  for (const dateStr of (data.selectedDates || [])) {
    const eventDate = new Date(dateStr);
    for (const offset of [-7, -3, -1]) {
      const sendDate = new Date(eventDate);
      sendDate.setDate(sendDate.getDate() + offset);
      const type = offset === -7 ? "reminder_7d" : offset === -3 ? "reminder_3d" : "reminder_1d";
      batch.push(c.env.DB.prepare("INSERT INTO scheduled_emails (id, retreat_id, type, to_email, parish, contact, event_date, send_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(`se_${uid()}`, id, type, data.email, data.parish, data.contact, dateStr, sendDate.toISOString()));
    }
    const followDate = new Date(eventDate);
    followDate.setDate(followDate.getDate() + 1);
    batch.push(c.env.DB.prepare("INSERT INTO scheduled_emails (id, retreat_id, type, to_email, parish, contact, event_date, send_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(`se_${uid()}`, id, "followup_parish", data.email, data.parish, data.contact, dateStr, followDate.toISOString()));
  }
  if (batch.length) await c.env.DB.batch(batch);

  // Auto-add to newsletter
  await c.env.DB.prepare("INSERT OR IGNORE INTO newsletter_subscribers (id, email, name, source) VALUES (?, ?, ?, 'retreat')").bind(`ns_${uid()}`, data.email, data.contact).run();

  return c.json({ id, status: "inquiry" }, 201);
});

// ── FIX #4: StoneBridge export with JOIN instead of N+1 ──
app.get("/api/parish/:orgId/stonebridge-export", async (c) => {
  if (!(await requireAuth(c))) return c.json({ error: "Unauthorized" }, 401);
  const orgId = c.req.param("orgId");
  const org = await c.env.DB.prepare("SELECT * FROM organizations WHERE id = ?").bind(orgId).first();
  const users = await c.env.DB.prepare(
    `SELECT u.name, u.email, COUNT(p.part_id) as parts_done,
            MAX(p.completed_at) as last_completed
     FROM users u LEFT JOIN progress p ON u.id = p.user_id
     WHERE u.org_id = ? AND u.role = 'parishioner'
     GROUP BY u.id`
  ).bind(orgId).all();
  const rows = [["Participant Name", "Email", "Role", "Formation Completed", "Completion Date", "Parts Completed", "Organization", "Diocese"]];
  for (const u of users.results || []) {
    rows.push([u.name, u.email, "Volunteer", u.parts_done >= 5 ? "Yes" : "No", u.parts_done >= 5 ? u.last_completed : "", u.parts_done, org?.name || "", org?.diocese || ""]);
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="stonebridge-export.csv"` } });
});

// ── Serve static assets (SPA fallback) ──
app.get("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
