import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/*", cors());

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ── Auth helpers ──
function hashPassword(pw) {
  // Simple hash for demo — replace with bcrypt/scrypt via Workers crypto in production
  let h = 0;
  for (let i = 0; i < pw.length; i++) h = ((h << 5) - h + pw.charCodeAt(i)) | 0;
  return "h_" + Math.abs(h).toString(36);
}

// ── Generic CRUD factory ──
function crud(table, idPrefix = "r") {
  return {
    async list(db, params = {}) {
      const { limit = 100, offset = 0, orderBy = "created_at DESC" } = params;
      return await db.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy} LIMIT ? OFFSET ?`).bind(limit, offset).all();
    },
    async get(db, id) {
      return await db.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
    },
    async create(db, data) {
      const id = `${idPrefix}_${uid()}`;
      const keys = Object.keys(data);
      const cols = ["id", ...keys].join(", ");
      const placeholders = ["?", ...keys.map(() => "?")].join(", ");
      const vals = [id, ...keys.map(k => data[k])];
      await db.prepare(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`).bind(...vals).run();
      return { id, ...data };
    },
    async update(db, id, data) {
      const keys = Object.keys(data);
      const sets = keys.map(k => `${k} = ?`).join(", ");
      const vals = [...keys.map(k => data[k]), id];
      await db.prepare(`UPDATE ${table} SET ${sets} WHERE id = ?`).bind(...vals).run();
      return { id, ...data };
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
};

// ── REST endpoints for each table ──
for (const [name, ops] of Object.entries(tables)) {
  app.get(`/api/${name}`, async (c) => {
    const result = await ops.list(c.env.DB);
    return c.json(result.results || []);
  });
  app.get(`/api/${name}/:id`, async (c) => {
    const row = await ops.get(c.env.DB, c.params.id);
    return row ? c.json(row) : c.json({ error: "Not found" }, 404);
  });
  app.post(`/api/${name}`, async (c) => {
    const data = await c.req.json();
    const row = await ops.create(c.env.DB, data);
    return c.json(row, 201);
  });
  app.put(`/api/${name}/:id`, async (c) => {
    const data = await c.req.json();
    const row = await ops.update(c.env.DB, c.params.id, data);
    return c.json(row);
  });
  app.delete(`/api/${name}/:id`, async (c) => {
    const result = await ops.delete(c.env.DB, c.params.id);
    return c.json(result);
  });
}

// ── Auth: Register individual ──
app.post("/api/auth/register", async (c) => {
  const { name, email, password } = await c.req.json();
  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return c.json({ error: "Email already registered" }, 409);
  const id = `u_${uid()}`;
  const hash = hashPassword(password);
  await c.env.DB.prepare("INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, 'individual')").bind(id, name, email, hash).run();
  return c.json({ id, name, email, role: "individual" }, 201);
});

// ── Auth: Login individual ──
app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();
  const hash = hashPassword(password);
  const user = await c.env.DB.prepare("SELECT * FROM users WHERE email = ? AND password_hash = ?").bind(email, hash).first();
  if (!user) return c.json({ error: "Invalid credentials" }, 401);
  return c.json({ id: user.id, name: user.name, email: user.email, role: user.role, org_id: user.org_id });
});

// ── Auth: Register parish ──
app.post("/api/auth/register-parish", async (c) => {
  const { name, diocese, city, state, adminName, adminEmail, adminPassword } = await c.req.json();
  const orgId = `org_${uid()}`;
  const userId = `u_${uid()}`;
  const hash = hashPassword(adminPassword);
  await c.env.DB.prepare("INSERT INTO organizations (id, name, diocese, city, state, admin_name, admin_email, admin_password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(orgId, name, diocese || null, city || null, state || null, adminName, adminEmail, hash).run();
  await c.env.DB.prepare("INSERT INTO users (id, org_id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?, 'parish_admin')").bind(userId, orgId, adminName, adminEmail, hash).run();
  return c.json({ id: userId, orgId, name: adminName, email: adminEmail, role: "parish_admin" }, 201);
});

// ── Auth: Login parish admin ──
app.post("/api/auth/login-parish", async (c) => {
  const { email, password } = await c.req.json();
  const hash = hashPassword(password);
  const org = await c.env.DB.prepare("SELECT * FROM organizations WHERE admin_email = ? AND admin_password_hash = ?").bind(email, hash).first();
  if (!org) return c.json({ error: "Invalid credentials" }, 401);
  return c.json({ id: org.id, name: org.admin_name, email: org.admin_email, role: "parish_admin", orgId: org.id, parish: org.name, diocese: org.diocese, city: org.city, state: org.state });
});

// ── Parish: Add parishioner ──
app.post("/api/parish/:orgId/parishioners", async (c) => {
  const { name, email } = await c.req.json();
  const orgId = c.req.param("orgId");
  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ? AND org_id = ?").bind(email, orgId).first();
  if (existing) return c.json(existing);
  const id = `u_${uid()}`;
  await c.env.DB.prepare("INSERT INTO users (id, org_id, name, email, role) VALUES (?, ?, ?, ?, 'parishioner')").bind(id, orgId, name, email).run();
  return c.json({ id, name, email, org_id: orgId }, 201);
});

// ── Parish: List parishioners with progress ──
app.get("/api/parish/:orgId/parishioners", async (c) => {
  const orgId = c.req.param("orgId");
  const users = await c.env.DB.prepare("SELECT * FROM users WHERE org_id = ? AND role = 'parishioner'").bind(orgId).all();
  const result = [];
  for (const u of users.results || []) {
    const prog = await c.env.DB.prepare("SELECT part_id, completed_at FROM progress WHERE user_id = ?").bind(u.id).all();
    const progress = {};
    (prog.results || []).forEach(p => { progress[p.part_id] = p.completed_at; });
    result.push({ ...u, progress, completedAt: Object.keys(progress).length >= 5 ? prog.results[prog.results.length - 1]?.completed_at : null });
  }
  return c.json(result);
});

// ── Parish: Remove parishioner ──
app.delete("/api/parish/:orgId/parishioners/:userId", async (c) => {
  await c.env.DB.prepare("DELETE FROM progress WHERE user_id = ?").bind(c.req.param("userId")).run();
  await c.env.DB.prepare("DELETE FROM users WHERE id = ? AND org_id = ?").bind(c.req.param("userId"), c.req.param("orgId")).run();
  return c.json({ deleted: true });
});

// ── Progress: Complete a part ──
app.post("/api/progress/:userId/:partId", async (c) => {
  const { userId, partId } = c.req.param();
  const id = `pg_${uid()}`;
  await c.env.DB.prepare("INSERT OR IGNORE INTO progress (id, user_id, part_id) VALUES (?, ?, ?)").bind(id, userId, partId).run();
  return c.json({ userId, partId, completed: true });
});

// ── Progress: Get for user ──
app.get("/api/progress/:userId", async (c) => {
  const result = await c.env.DB.prepare("SELECT part_id, completed_at FROM progress WHERE user_id = ?").bind(c.req.param("userId")).all();
  const progress = {};
  (result.results || []).forEach(p => { progress[p.part_id] = p.completed_at; });
  return c.json(progress);
});

// ── Retreat: Submit with auto-scheduled emails ──
app.post("/api/retreat-requests/submit", async (c) => {
  const data = await c.req.json();
  const id = `rr_${uid()}`;
  const dates = JSON.stringify(data.selectedDates || []);
  await c.env.DB.prepare(
    `INSERT INTO retreat_requests (id, parish, diocese, city, state, contact, email, phone, participants, chapel, start_time, selected_dates, prefer_other, contribution, meal_needs, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'inquiry')`
  ).bind(id, data.parish, data.diocese || null, data.city || null, data.state || null, data.contact, data.email, data.phone || null, data.participants || null, data.chapel || "yes", data.startTime || "8:00 AM", dates, data.preferOther || null, data.contribution || null, data.mealNeeds || null, data.notes || null).run();

  // Auto-schedule reminder emails
  for (const dateStr of (data.selectedDates || [])) {
    const eventDate = new Date(dateStr);
    for (const offset of [-7, -3, -1]) {
      const sendDate = new Date(eventDate);
      sendDate.setDate(sendDate.getDate() + offset);
      const type = offset === -7 ? "reminder_7d" : offset === -3 ? "reminder_3d" : "reminder_1d";
      const seId = `se_${uid()}`;
      await c.env.DB.prepare("INSERT INTO scheduled_emails (id, retreat_id, type, to_email, parish, contact, event_date, send_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(seId, id, type, data.email, data.parish, data.contact, dateStr, sendDate.toISOString()).run();
    }
    // Follow-up
    const followDate = new Date(eventDate);
    followDate.setDate(followDate.getDate() + 1);
    const fuId = `se_${uid()}`;
    await c.env.DB.prepare("INSERT INTO scheduled_emails (id, retreat_id, type, to_email, parish, contact, event_date, send_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(fuId, id, "followup_parish", data.email, data.parish, data.contact, dateStr, followDate.toISOString()).run();
  }

  // Auto-add to newsletter
  const nsId = `ns_${uid()}`;
  await c.env.DB.prepare("INSERT OR IGNORE INTO newsletter_subscribers (id, email, name, source) VALUES (?, ?, ?, 'retreat')").bind(nsId, data.email, data.contact).run();

  return c.json({ id, status: "inquiry" }, 201);
});

// ── StoneBridge export ──
app.get("/api/parish/:orgId/stonebridge-export", async (c) => {
  const orgId = c.req.param("orgId");
  const org = await c.env.DB.prepare("SELECT * FROM organizations WHERE id = ?").bind(orgId).first();
  const users = await c.env.DB.prepare("SELECT * FROM users WHERE org_id = ? AND role = 'parishioner'").bind(orgId).all();
  const rows = [["Participant Name", "Email", "Role", "Formation Completed", "Completion Date", "Parts Completed", "Organization", "Diocese"]];
  for (const u of users.results || []) {
    const prog = await c.env.DB.prepare("SELECT part_id, completed_at FROM progress WHERE user_id = ?").bind(u.id).all();
    const count = (prog.results || []).length;
    const completed = count >= 5;
    const lastDate = completed ? prog.results[prog.results.length - 1]?.completed_at : "";
    rows.push([u.name, u.email, "Volunteer", completed ? "Yes" : "No", lastDate, count, org?.name || "", org?.diocese || ""]);
  }
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="stonebridge-export.csv"` } });
});

// ── Serve static assets (SPA fallback) ──
app.get("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
