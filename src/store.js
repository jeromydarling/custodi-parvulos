// Hybrid data layer: API-first, localStorage fallback for offline/dev
const API = "/api";
const USER_KEY = "custodi_user";

async function post(path, body) {
  try {
    const r = await fetch(`${API}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

async function get(path) {
  try {
    const r = await fetch(`${API}${path}`);
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

async function del(path) {
  try {
    await fetch(`${API}${path}`, { method: "DELETE" });
  } catch {}
}

async function put(path, body) {
  try {
    const r = await fetch(`${API}${path}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

// ── Current user (always localStorage — it's session state) ──
export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

// ── Auth ──
export async function registerParish({ name, diocese, city, state, adminName, adminEmail, adminPassword }) {
  const result = await post("/auth/register-parish", { name, diocese, city, state, adminName, adminEmail, adminPassword });
  if (result && result.id) {
    setCurrentUser({ type: "parish_admin", parishId: result.orgId, name: result.name, email: result.email });
    return result;
  }
  return null;
}

export async function loginParishAdmin(email, password) {
  const result = await post("/auth/login-parish", { email, password });
  if (result && result.id) {
    setCurrentUser({ type: "parish_admin", parishId: result.orgId || result.id, name: result.name, email: result.email, parish: result.parish, diocese: result.diocese, city: result.city, state: result.state });
    return result;
  }
  return null;
}

export async function registerIndividual({ name, email, password }) {
  const result = await post("/auth/register", { name, email, password });
  if (result && result.id) {
    setCurrentUser({ type: "individual", id: result.id, name: result.name, email: result.email });
    return result;
  }
  return null;
}

export async function loginIndividual(email, password) {
  const result = await post("/auth/login", { email, password });
  if (result && result.id) {
    setCurrentUser({ type: "individual", id: result.id, name: result.name, email: result.email });
    return result;
  }
  return null;
}

export async function loginParishioner(parishId, email) {
  // Parishioner login — find by org + email
  const parishioners = await get(`/parish/${parishId}/parishioners`);
  if (!parishioners) return null;
  const person = parishioners.find(p => p.email === email);
  if (!person) return null;
  setCurrentUser({ type: "parishioner", id: person.id, parishId, name: person.name, email });
  return person;
}

// ── Parish management ──
export async function getParish(parishId) {
  const org = await get(`/organizations/${parishId}`);
  if (!org) return null;
  const parishioners = await get(`/parish/${parishId}/parishioners`) || [];
  return { ...org, parishioners };
}

export async function addParishioner(parishId, { name, email }) {
  return await post(`/parish/${parishId}/parishioners`, { name, email });
}

export async function removeParishioner(parishId, personId) {
  await del(`/parish/${parishId}/parishioners/${personId}`);
}

// ── Progress ──
export async function completePart(partId) {
  const u = getCurrentUser();
  if (!u) return;
  await post(`/progress/${u.id}/${partId}`, {});
}

export async function getProgress() {
  const u = getCurrentUser();
  if (!u) return {};
  const result = await get(`/progress/${u.id}`);
  return result || {};
}

// ── Retreat requests ──
export async function saveRetreatRequest(data) {
  return await post("/retreat-requests/submit", data);
}

export function getRetreatRequests() { return get("/retreat_requests"); }

// ── Newsletter ──
export async function addNewsletterSubscriber(email, name, source) {
  return await post("/newsletter_subscribers", { email, name, source });
}

export function getNewsletterSubscribers() { return get("/newsletter_subscribers"); }

export async function removeNewsletterSubscriber(email) {
  const subs = await get("/newsletter_subscribers");
  if (!subs) return;
  const sub = subs.find(s => s.email === email);
  if (sub) await del(`/newsletter_subscribers/${sub.id}`);
}

export async function saveNewsletter(data) {
  return await post("/newsletters", data);
}

export function getNewsletters() { return get("/newsletters"); }

// ── Email scheduling ──
export function getScheduledEmails() { return get("/scheduled_emails"); }
export function getSentEmails() { return get("/scheduled_emails"); } // filter sent on frontend

export async function markEmailSent(emailId) {
  return await put(`/scheduled_emails/${emailId}`, { sent: 1, sent_at: new Date().toISOString() });
}

// ── Certificates ──
export async function issueCertificate(participantName, parishName, completedAt) {
  return await post("/certificates", {
    participant_name: participantName,
    parish_name: parishName,
    serial_number: "CP-" + Date.now().toString(36).toUpperCase(),
    issued_at: completedAt || new Date().toISOString(),
  });
}

export async function findCertificate(participantName, parishName) {
  const certs = await get("/certificates");
  if (!certs) return null;
  return certs.find(c => c.participant_name === participantName && c.parish_name === parishName);
}

// ── Admin user (Google OAuth stub) ──
export function setAdminUser(user) { localStorage.setItem("custodi_admin", JSON.stringify(user)); }
export function getAdminUser() { try { return JSON.parse(localStorage.getItem("custodi_admin")); } catch { return null; } }
export function clearAdminUser() { localStorage.removeItem("custodi_admin"); }

// ── Generic CRUD for admin tables ──
function makeList(table) {
  return {
    getAll: () => get(`/${table}`).then(r => r || []),
    add: (item) => post(`/${table}`, item),
    update: (id, patch) => put(`/${table}/${id}`, patch),
    remove: (id) => del(`/${table}/${id}`),
  };
}

export const trips = makeList("trips");
export const expenses = makeList("expenses");
export const hostHomes = makeList("host_homes");
export const bishops = makeList("bishops");
export const benefactors = makeList("benefactors");
export const dioceses = makeList("dioceses");
export const referrals = makeList("referrals");
export const facilitators = makeList("facilitators");
export const caseStudies = makeList("case_studies");
export const prayerIntentions = makeList("prayer_intentions");
export const massIntentions = makeList("mass_intentions");
export const waitlist = makeList("waitlist");
export const certificates = makeList("certificates");

// ── Retreat status update ──
export async function updateRetreatStatus(id, status) {
  return await put(`/retreat_requests/${id}`, { status, updated_at: new Date().toISOString() });
}
