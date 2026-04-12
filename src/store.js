// Local storage-backed data layer (replaced by Supabase in production)
const KEY = "custodi_data";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || defaultData(); }
  catch { return defaultData(); }
}

function defaultData() {
  return { parishes: [], individuals: [], currentUser: null, retreatRequests: [], scheduledEmails: [], sentEmails: [], newsletterSubscribers: [], newsletters: [], adminUser: null };
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getData() { return load(); }

export function setCurrentUser(user) {
  const d = load(); d.currentUser = user; save(d);
}

export function getCurrentUser() { return load().currentUser; }

export function logout() {
  const d = load(); d.currentUser = null; save(d);
}

// Parish registration
export function registerParish({ name, diocese, city, state, adminName, adminEmail, adminPassword }) {
  const d = load();
  const id = "p_" + Date.now();
  const parish = { id, name, diocese, city, state, adminName, adminEmail, adminPassword, parishioners: [], createdAt: new Date().toISOString() };
  d.parishes.push(parish);
  d.currentUser = { type: "parish_admin", parishId: id, name: adminName, email: adminEmail };
  save(d);
  return parish;
}

// Parish admin login
export function loginParishAdmin(email, password) {
  const d = load();
  const parish = d.parishes.find(p => p.adminEmail === email && p.adminPassword === password);
  if (!parish) return null;
  d.currentUser = { type: "parish_admin", parishId: parish.id, name: parish.adminName, email };
  save(d);
  return parish;
}

// Add parishioner
export function addParishioner(parishId, { name, email }) {
  const d = load();
  const parish = d.parishes.find(p => p.id === parishId);
  if (!parish) return null;
  const existing = parish.parishioners.find(p => p.email === email);
  if (existing) return existing;
  const person = { id: "f_" + Date.now() + Math.random().toString(36).slice(2, 6), name, email, progress: {}, completedAt: null, registeredAt: new Date().toISOString() };
  parish.parishioners.push(person);
  save(d);
  return person;
}

// Remove parishioner
export function removeParishioner(parishId, personId) {
  const d = load();
  const parish = d.parishes.find(p => p.id === parishId);
  if (!parish) return;
  parish.parishioners = parish.parishioners.filter(p => p.id !== personId);
  save(d);
}

// Get parish by id
export function getParish(parishId) {
  return load().parishes.find(p => p.id === parishId) || null;
}

// Individual registration
export function registerIndividual({ name, email, password }) {
  const d = load();
  const existing = d.individuals.find(i => i.email === email);
  if (existing) return null;
  const person = { id: "i_" + Date.now(), name, email, password, progress: {}, completedAt: null, registeredAt: new Date().toISOString() };
  d.individuals.push(person);
  d.currentUser = { type: "individual", id: person.id, name, email };
  save(d);
  return person;
}

// Individual login
export function loginIndividual(email, password) {
  const d = load();
  const person = d.individuals.find(i => i.email === email && i.password === password);
  if (!person) return null;
  d.currentUser = { type: "individual", id: person.id, name: person.name, email };
  save(d);
  return person;
}

// Mark a part as complete for a user
export function completePart(partId) {
  const d = load();
  const u = d.currentUser;
  if (!u) return;
  if (u.type === "individual") {
    const person = d.individuals.find(i => i.id === u.id);
    if (person) {
      person.progress[partId] = new Date().toISOString();
      if (Object.keys(person.progress).length >= 5) person.completedAt = new Date().toISOString();
    }
  } else if (u.type === "parishioner") {
    const parish = d.parishes.find(p => p.id === u.parishId);
    if (parish) {
      const person = parish.parishioners.find(p => p.id === u.id);
      if (person) {
        person.progress[partId] = new Date().toISOString();
        if (Object.keys(person.progress).length >= 5) person.completedAt = new Date().toISOString();
      }
    }
  }
  save(d);
}

// Get progress for current user
export function getProgress() {
  const d = load();
  const u = d.currentUser;
  if (!u) return {};
  if (u.type === "individual") {
    const person = d.individuals.find(i => i.id === u.id);
    return person ? person.progress : {};
  } else if (u.type === "parishioner") {
    const parish = d.parishes.find(p => p.id === u.parishId);
    if (parish) {
      const person = parish.parishioners.find(p => p.id === u.id);
      return person ? person.progress : {};
    }
  }
  return {};
}

// Parishioner login (via link from parish admin)
export function loginParishioner(parishId, email) {
  const d = load();
  const parish = d.parishes.find(p => p.id === parishId);
  if (!parish) return null;
  const person = parish.parishioners.find(p => p.email === email);
  if (!person) return null;
  d.currentUser = { type: "parishioner", id: person.id, parishId, name: person.name, email };
  save(d);
  return person;
}

// ── Retreat requests & email scheduling ──

export function saveRetreatRequest(request) {
  const d = load();
  const id = "rr_" + Date.now();
  const rr = { ...request, id, status: "pending", createdAt: new Date().toISOString() };
  d.retreatRequests.push(rr);
  // Auto-schedule reminder emails for each selected date
  (request.selectedDates || []).forEach(dateStr => {
    const eventDate = new Date(dateStr);
    [-7, -3, -1].forEach(offset => {
      const sendDate = new Date(eventDate);
      sendDate.setDate(sendDate.getDate() + offset);
      d.scheduledEmails.push({
        id: "se_" + Date.now() + Math.random().toString(36).slice(2,6),
        retreatId: id, type: offset === -7 ? "reminder_7d" : offset === -3 ? "reminder_3d" : "reminder_1d",
        to: request.email, parish: request.parish, contact: request.contact,
        eventDate: dateStr, sendDate: sendDate.toISOString(), sent: false,
      });
    });
    // Follow-up emails 1 day after event
    const followDate = new Date(eventDate);
    followDate.setDate(followDate.getDate() + 1);
    d.scheduledEmails.push({
      id: "se_" + Date.now() + Math.random().toString(36).slice(2,6),
      retreatId: id, type: "followup_parish",
      to: request.email, parish: request.parish, contact: request.contact,
      eventDate: dateStr, sendDate: followDate.toISOString(), sent: false,
    });
  });
  save(d);
  return rr;
}

export function getRetreatRequests() { return load().retreatRequests || []; }
export function getScheduledEmails() { return load().scheduledEmails || []; }
export function getSentEmails() { return load().sentEmails || []; }

export function markEmailSent(emailId) {
  const d = load();
  const email = d.scheduledEmails.find(e => e.id === emailId);
  if (email) {
    email.sent = true;
    email.sentAt = new Date().toISOString();
    d.sentEmails.push({ ...email });
  }
  save(d);
}

// ── Newsletter ──

export function addNewsletterSubscriber(email, name, source) {
  const d = load();
  if (d.newsletterSubscribers.find(s => s.email === email)) return;
  d.newsletterSubscribers.push({ email, name, source, subscribedAt: new Date().toISOString() });
  save(d);
}

export function getNewsletterSubscribers() { return load().newsletterSubscribers || []; }

export function removeNewsletterSubscriber(email) {
  const d = load();
  d.newsletterSubscribers = d.newsletterSubscribers.filter(s => s.email !== email);
  save(d);
}

export function saveNewsletter(newsletter) {
  const d = load();
  const id = "nl_" + Date.now();
  const nl = { ...newsletter, id, sentAt: new Date().toISOString() };
  d.newsletters.push(nl);
  save(d);
  return nl;
}

export function getNewsletters() { return load().newsletters || []; }

// ── Admin (Google OAuth) ──

export function setAdminUser(user) {
  const d = load();
  d.adminUser = user;
  save(d);
}

export function getAdminUser() { return load().adminUser || null; }

export function clearAdminUser() {
  const d = load();
  d.adminUser = null;
  save(d);
}
