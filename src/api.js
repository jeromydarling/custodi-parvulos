// API client — talks to Cloudflare Worker backend
// Falls back to localStorage if API is unavailable (local dev)

const BASE = "/api";

async function request(path, options = {}) {
  try {
    const r = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({ error: r.statusText }));
      throw new Error(err.error || r.statusText);
    }
    if (r.headers.get("content-type")?.includes("text/csv")) return r;
    return await r.json();
  } catch (e) {
    console.warn("API unavailable, using localStorage fallback:", e.message);
    return null;
  }
}

export const api = {
  // Auth
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  registerParish: (data) => request("/auth/register-parish", { method: "POST", body: JSON.stringify(data) }),
  loginParish: (data) => request("/auth/login-parish", { method: "POST", body: JSON.stringify(data) }),

  // Progress
  getProgress: (userId) => request(`/progress/${userId}`),
  completePart: (userId, partId) => request(`/progress/${userId}/${partId}`, { method: "POST" }),

  // Parish
  getParishioners: (orgId) => request(`/parish/${orgId}/parishioners`),
  addParishioner: (orgId, data) => request(`/parish/${orgId}/parishioners`, { method: "POST", body: JSON.stringify(data) }),
  removeParishioner: (orgId, userId) => request(`/parish/${orgId}/parishioners/${userId}`, { method: "DELETE" }),
  stonebridgeExport: (orgId) => request(`/parish/${orgId}/stonebridge-export`),

  // Retreats
  submitRetreat: (data) => request("/retreat-requests/submit", { method: "POST", body: JSON.stringify(data) }),

  // Generic CRUD for any table
  list: (table) => request(`/${table}`),
  get: (table, id) => request(`/${table}/${id}`),
  create: (table, data) => request(`/${table}`, { method: "POST", body: JSON.stringify(data) }),
  update: (table, id, data) => request(`/${table}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (table, id) => request(`/${table}/${id}`, { method: "DELETE" }),
};
