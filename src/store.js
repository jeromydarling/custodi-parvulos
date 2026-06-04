const API = "/api";
const USER_KEY = "custodi_user";

class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

async function request(method, path, body) {
  const opts = { method, headers: { "Content-Type": "application/json" }, credentials: "same-origin" };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${API}${path}`, opts);
  if (!r.ok) {
    const err = await r.json().catch(() => ({ error: r.statusText }));
    throw new ApiError(err.error || r.statusText, r.status);
  }
  if (r.headers.get("content-type")?.includes("text/csv")) return r;
  return await r.json();
}

async function post(path, body) { return request("POST", path, body); }
async function get(path) { return request("GET", path); }
async function put(path, body) { return request("PUT", path, body); }
async function del(path) { return request("DELETE", path); }

// ── Current user (localStorage for session state) ──
export function setCurrentUser(user) { localStorage.setItem(USER_KEY, JSON.stringify(user)); }
export function getCurrentUser() { try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; } }
export function logout() { localStorage.removeItem(USER_KEY); post("/auth/logout").catch(() => {}); }

// ── Auth ──
export async function registerParish({ name, diocese, city, state, adminName, adminEmail, adminPassword }) {
  const result = await post("/auth/register-parish", { name, diocese, city, state, adminName, adminEmail, adminPassword });
  setCurrentUser({ type: "parish_admin", parishId: result.orgId, name: result.name, email: result.email });
  return result;
}

export async function loginParishAdmin(email, password) {
  const result = await post("/auth/login-parish", { email, password });
  setCurrentUser({ type: "parish_admin", parishId: result.orgId || result.id, name: result.name, email: result.email, parish: result.parish, diocese: result.diocese, city: result.city, state: result.state });
  return result;
}

export async function registerIndividual({ name, email, password }) {
  const result = await post("/auth/register", { name, email, password });
  setCurrentUser({ type: "individual", id: result.id, name: result.name, email: result.email });
  return result;
}

export async function loginIndividual(email, password) {
  const result = await post("/auth/login", { email, password });
  setCurrentUser({ type: "individual", id: result.id, name: result.name, email: result.email });
  return result;
}

export async function loginParishioner(parishId, email) {
  const parishioners = await get(`/parish/${parishId}/parishioners`);
  const person = parishioners?.find(p => p.email === email);
  if (!person) return null;
  setCurrentUser({ type: "parishioner", id: person.id, parishId, name: person.name, email });
  return person;
}

// ── Parish management ──
export async function getParish(parishId) {
  const org = await get(`/organizations/${parishId}`);
  const parishioners = await get(`/parish/${parishId}/parishioners`).catch(() => []);
  return { ...org, parishioners: parishioners || [] };
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
  return await get(`/progress/${u.id}`).catch(() => ({}));
}

// ── Retreat requests ──
export async function saveRetreatRequest(data) { return await post("/retreat-requests/submit", data); }
export async function getRetreatRequests() { return await get("/retreat_requests").catch(() => []); }

// ── Newsletter ──
export async function addNewsletterSubscriber(email, name, source) { return await post("/newsletter_subscribers", { email, name, source }); }
export async function getNewsletterSubscribers() { return await get("/newsletter_subscribers").catch(() => []); }
export async function removeNewsletterSubscriber(email) {
  const subs = await getNewsletterSubscribers();
  const sub = subs.find(s => s.email === email);
  if (sub) await del(`/newsletter_subscribers/${sub.id}`);
}
export async function saveNewsletter(data) { return await post("/newsletters", data); }
export async function getNewsletters() { return await get("/newsletters").catch(() => []); }

// ── Email scheduling ──
export async function getScheduledEmails() { return await get("/scheduled_emails").catch(() => []); }
export async function markEmailSent(emailId) { return await put(`/scheduled_emails/${emailId}`, { sent: 1, sent_at: new Date().toISOString() }); }

// ── Certificates ──
export async function issueCertificate(participantName, parishName, completedAt) {
  return await post("/certificates", { participant_name: participantName, parish_name: parishName, serial_number: "CP-" + Date.now().toString(36).toUpperCase(), issued_at: completedAt || new Date().toISOString() });
}
export async function findCertificate(participantName, parishName) {
  const certs = await get("/certificates").catch(() => []);
  return certs.find(c => c.participant_name === participantName && c.parish_name === parishName) || null;
}

// ── Admin user ──
export function setAdminUser(user) { localStorage.setItem("custodi_admin", JSON.stringify(user)); }
export function getAdminUser() { try { return JSON.parse(localStorage.getItem("custodi_admin")); } catch { return null; } }
export function clearAdminUser() { localStorage.removeItem("custodi_admin"); }

// ── Generic CRUD for admin tables ──
function makeList(table) {
  return {
    getAll: () => get(`/${table}`).catch(() => []),
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

export async function updateRetreatStatus(id, status) {
  return await put(`/retreat_requests/${id}`, { status, updated_at: new Date().toISOString() });
}
