import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plane, Car, Home as HomeIcon, DollarSign, MapPin, Plus, Trash2, Calendar, Fuel, Hotel, LogOut, Download } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { trips, expenses, hostHomes, getAdminUser } from "../store";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "10px 14px", fontFamily: font, fontSize: 15, color: ink, outline: "none", boxSizing: "border-box" };
const btnStyle = { background: brown, color: cream, border: "none", padding: "10px 20px", borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer" };
const tabStyle = (active) => ({ padding: "10px 18px", border: `1px solid ${active ? borderC : "transparent"}`, borderBottom: active ? `2px solid ${cream}` : `1px solid ${borderC}`, background: active ? cream : "transparent", fontFamily: font, fontSize: 14, fontWeight: active ? 700 : 400, color: active ? brown : stone, cursor: "pointer", borderRadius: "6px 6px 0 0", marginBottom: -1 });

const IRS_MILEAGE_RATE = 0.70; // 2025 IRS standard mileage rate

// Rough haversine for quick distance estimate between airports / cities
async function estimateDistance(from, to) {
  // Use free Nominatim geocoding (OpenStreetMap)
  try {
    const geocode = async (q) => {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`);
      const data = await r.json();
      if (!data[0]) return null;
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    };
    const [a, b] = await Promise.all([geocode(from), geocode(to)]);
    if (!a || !b) return null;
    const R = 3958.8; // miles
    const toRad = (x) => x * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(h)));
  } catch { return null; }
}

export default function TravelTracker() {
  const [tab, setTab] = useState("trips");
  const [tripList, setTripList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [homeList, setHomeList] = useState([]);
  const [tripForm, setTripForm] = useState({ mode: "drive", origin: "", destination: "", parish: "", date: "", miles: "", notes: "" });
  const [expForm, setExpForm] = useState({ category: "fuel", amount: "", description: "", date: "", tripId: "" });
  const [homeForm, setHomeForm] = useState({ hostName: "", parish: "", city: "", state: "", contact: "", capacity: "1", notes: "" });
  const [estimating, setEstimating] = useState(false);
  const admin = getAdminUser();

  const refresh = useCallback(() => {
    setTripList(trips.getAll().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)));
    setExpenseList(expenses.getAll().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)));
    setHomeList(hostHomes.getAll());
  }, []);

  useEffect(refresh, [refresh]);

  const handleEstimate = async () => {
    if (!tripForm.origin || !tripForm.destination) return;
    setEstimating(true);
    const miles = await estimateDistance(tripForm.origin, tripForm.destination);
    if (miles) setTripForm({ ...tripForm, miles: String(miles) });
    setEstimating(false);
  };

  const addTrip = (e) => {
    e.preventDefault();
    const miles = parseFloat(tripForm.miles) || 0;
    const mileageValue = tripForm.mode === "drive" ? miles * IRS_MILEAGE_RATE : 0;
    trips.add({ ...tripForm, miles, mileageValue });
    setTripForm({ mode: "drive", origin: "", destination: "", parish: "", date: "", miles: "", notes: "" });
    refresh();
  };

  const addExpense = (e) => {
    e.preventDefault();
    expenses.add({ ...expForm, amount: parseFloat(expForm.amount) || 0 });
    setExpForm({ category: "fuel", amount: "", description: "", date: "", tripId: "" });
    refresh();
  };

  const addHome = (e) => {
    e.preventDefault();
    hostHomes.add(homeForm);
    setHomeForm({ hostName: "", parish: "", city: "", state: "", contact: "", capacity: "1", notes: "" });
    refresh();
  };

  // Totals
  const totalMiles = tripList.filter(t => t.mode === "drive").reduce((s, t) => s + (t.miles || 0), 0);
  const totalFlown = tripList.filter(t => t.mode === "fly").reduce((s, t) => s + (t.miles || 0), 0);
  const totalMileageDeduction = tripList.filter(t => t.mode === "drive").reduce((s, t) => s + (t.mileageValue || 0), 0);
  const totalExpenses = expenseList.reduce((s, e) => s + (e.amount || 0), 0);

  const exportCSV = () => {
    const rows = [["Date", "Mode", "Origin", "Destination", "Parish", "Miles", "Mileage Value", "Notes"]];
    tripList.forEach(t => rows.push([t.date || "", t.mode, t.origin, t.destination, t.parish || "", t.miles || 0, t.mileageValue || 0, t.notes || ""]));
    rows.push([]);
    rows.push(["Expenses"]);
    rows.push(["Date", "Category", "Description", "Amount"]);
    expenseList.forEach(e => rows.push([e.date || "", e.category, e.description || "", e.amount || 0]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `custodi-travel-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  if (!admin) {
    return (
      <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", padding: 48, textAlign: "center" }}>
        <PelicanLogo size={60} color={brown} />
        <h1 style={{ ...heading, fontSize: 22, marginTop: 16 }}>Admin Sign-In Required</h1>
        <Link to="/admin-email" style={{ display: "inline-block", marginTop: 16, ...btnStyle, textDecoration: "none" }}>Sign In</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PelicanLogo size={32} color={brown} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
        </Link>
        <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
          <Link to="/admin" style={{ color: stone, textDecoration: "none" }}>Dashboard</Link>
          <Link to="/admin-email" style={{ color: stone, textDecoration: "none" }}>Email</Link>
          <span style={{ color: brown, fontWeight: 600 }}>Travel</span>
        </div>
      </nav>

      <div style={{ ...sectionStyle, maxWidth: 900, padding: "32px 24px", position: "relative", zIndex: 1 }}>
        <h1 style={{ ...heading, fontSize: 26, marginBottom: 8 }}>Travel & Hosting</h1>
        <p style={{ color: stone, fontSize: 14, marginBottom: 24 }}>Track trips, expenses, and parish host homes</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Miles Driven", value: totalMiles.toLocaleString(), Icon: Car },
            { label: "Miles Flown", value: totalFlown.toLocaleString(), Icon: Plane },
            { label: "Mileage Deduction", value: "$" + totalMileageDeduction.toFixed(0), Icon: DollarSign },
            { label: "Total Expenses", value: "$" + totalExpenses.toFixed(0), Icon: Fuel },
          ].map((s, i) => (
            <div key={i} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "16px 14px", textAlign: "center" }}>
              <s.Icon size={18} color={brown} style={{ display: "block", margin: "0 auto 6px" }} />
              <p style={{ fontSize: 20, fontWeight: 700, color: ink, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: muted, marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${borderC}`, marginBottom: 20 }}>
          {[
            { key: "trips", label: "Trips", icon: Car },
            { key: "expenses", label: "Expenses", icon: DollarSign },
            { key: "homes", label: "Host Homes", icon: HomeIcon },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={tabStyle(tab === t.key)}>
              <t.icon size={13} style={{ verticalAlign: "middle", marginRight: 6 }} />{t.label}
            </button>
          ))}
          <button onClick={exportCSV} style={{ marginLeft: "auto", background: "none", border: `1px solid ${borderC}`, padding: "6px 12px", borderRadius: 4, fontFamily: font, fontSize: 12, color: stone, cursor: "pointer", marginBottom: 4 }}>
            <Download size={12} style={{ verticalAlign: "middle", marginRight: 4 }} /> Export CSV
          </button>
        </div>

        {/* TRIPS TAB */}
        {tab === "trips" && (
          <div>
            <form onSubmit={addTrip} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
              <p style={{ fontWeight: 700, color: brown, fontSize: 14, marginBottom: 12 }}>Log a Trip</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 10 }}>
                <select style={inputStyle} value={tripForm.mode} onChange={e => setTripForm({ ...tripForm, mode: e.target.value })}>
                  <option value="drive">Drive</option>
                  <option value="fly">Fly</option>
                  <option value="train">Train</option>
                </select>
                <input type="date" required style={inputStyle} value={tripForm.date} onChange={e => setTripForm({ ...tripForm, date: e.target.value })} />
                <input required style={inputStyle} placeholder="Origin (city, state)" value={tripForm.origin} onChange={e => setTripForm({ ...tripForm, origin: e.target.value })} />
                <input required style={inputStyle} placeholder="Destination (city, state)" value={tripForm.destination} onChange={e => setTripForm({ ...tripForm, destination: e.target.value })} />
                <input style={inputStyle} placeholder="Parish (optional)" value={tripForm.parish} onChange={e => setTripForm({ ...tripForm, parish: e.target.value })} />
                <div style={{ display: "flex", gap: 6 }}>
                  <input type="number" style={{ ...inputStyle, flex: 1 }} placeholder="Miles" value={tripForm.miles} onChange={e => setTripForm({ ...tripForm, miles: e.target.value })} />
                  <button type="button" onClick={handleEstimate} disabled={estimating || !tripForm.origin || !tripForm.destination} style={{ background: "none", border: `1px solid ${borderC}`, padding: "8px 12px", borderRadius: 4, fontFamily: font, fontSize: 12, color: brown, cursor: "pointer", whiteSpace: "nowrap" }}>{estimating ? "..." : "Estimate"}</button>
                </div>
              </div>
              <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="Notes (optional)" value={tripForm.notes} onChange={e => setTripForm({ ...tripForm, notes: e.target.value })} />
              <button type="submit" style={btnStyle}><Plus size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />Add Trip</button>
              <p style={{ fontSize: 11, color: muted, marginTop: 8 }}>Driving miles multiplied by {IRS_MILEAGE_RATE}/mi IRS standard rate. Estimator uses OpenStreetMap (straight-line distance).</p>
            </form>

            {tripList.length === 0 ? <p style={{ color: muted, fontStyle: "italic", textAlign: "center" }}>No trips logged yet.</p> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tripList.map(t => (
                  <div key={t.id} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {t.mode === "fly" ? <Plane size={14} color={brown} /> : <Car size={14} color={brown} />}
                        <span style={{ fontWeight: 600, color: ink, fontSize: 14 }}>{t.origin} → {t.destination}</span>
                      </div>
                      <p style={{ fontSize: 12, color: muted, marginTop: 2 }}>
                        {t.date && new Date(t.date).toLocaleDateString()} {t.parish && `· ${t.parish}`}
                      </p>
                      {t.notes && <p style={{ fontSize: 12, color: stone, fontStyle: "italic", marginTop: 2 }}>{t.notes}</p>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: ink }}>{t.miles?.toLocaleString() || 0} mi</p>
                      {t.mileageValue > 0 && <p style={{ fontSize: 11, color: "#4A7C59" }}>${t.mileageValue.toFixed(2)} deduction</p>}
                      <button onClick={() => { trips.remove(t.id); refresh(); }} style={{ background: "none", border: "none", cursor: "pointer", color: muted, marginTop: 4 }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXPENSES TAB */}
        {tab === "expenses" && (
          <div>
            <form onSubmit={addExpense} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
              <p style={{ fontWeight: 700, color: brown, fontSize: 14, marginBottom: 12 }}>Log an Expense</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 10 }}>
                <select style={inputStyle} value={expForm.category} onChange={e => setExpForm({ ...expForm, category: e.target.value })}>
                  <option value="fuel">Fuel</option>
                  <option value="airfare">Airfare</option>
                  <option value="lodging">Lodging</option>
                  <option value="meals">Meals</option>
                  <option value="materials">Materials</option>
                  <option value="other">Other</option>
                </select>
                <input type="date" required style={inputStyle} value={expForm.date} onChange={e => setExpForm({ ...expForm, date: e.target.value })} />
                <input type="number" step="0.01" required style={inputStyle} placeholder="Amount ($)" value={expForm.amount} onChange={e => setExpForm({ ...expForm, amount: e.target.value })} />
                <input style={inputStyle} placeholder="Description" value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} />
              </div>
              <button type="submit" style={btnStyle}><Plus size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />Add Expense</button>
            </form>

            {expenseList.length === 0 ? <p style={{ color: muted, fontStyle: "italic", textAlign: "center" }}>No expenses logged yet.</p> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {expenseList.map(e => (
                  <div key={e.id} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: brown, textTransform: "uppercase", letterSpacing: 1 }}>{e.category}</span>
                      <p style={{ fontSize: 14, color: ink, marginTop: 2 }}>{e.description || "—"}</p>
                      <p style={{ fontSize: 12, color: muted }}>{e.date && new Date(e.date).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontWeight: 700, color: ink }}>${e.amount?.toFixed(2)}</span>
                      <button onClick={() => { expenses.remove(e.id); refresh(); }} style={{ background: "none", border: "none", cursor: "pointer", color: muted, marginLeft: 8 }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HOST HOMES TAB */}
        {tab === "homes" && (
          <div>
            <p style={{ ...prose, fontSize: 14, marginBottom: 20 }}>Parishes bringing you from out of town can sign up a host family here. These are parish-offered accommodations for retreat visits.</p>
            <form onSubmit={addHome} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
              <p style={{ fontWeight: 700, color: brown, fontSize: 14, marginBottom: 12 }}>Add Host Home</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
                <input required style={inputStyle} placeholder="Host Family Name" value={homeForm.hostName} onChange={e => setHomeForm({ ...homeForm, hostName: e.target.value })} />
                <input required style={inputStyle} placeholder="Parish" value={homeForm.parish} onChange={e => setHomeForm({ ...homeForm, parish: e.target.value })} />
                <input required style={inputStyle} placeholder="City" value={homeForm.city} onChange={e => setHomeForm({ ...homeForm, city: e.target.value })} />
                <input required style={inputStyle} placeholder="State" value={homeForm.state} onChange={e => setHomeForm({ ...homeForm, state: e.target.value })} />
                <input required style={inputStyle} placeholder="Contact (email or phone)" value={homeForm.contact} onChange={e => setHomeForm({ ...homeForm, contact: e.target.value })} />
                <input type="number" style={inputStyle} placeholder="Capacity" value={homeForm.capacity} onChange={e => setHomeForm({ ...homeForm, capacity: e.target.value })} />
              </div>
              <textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical", marginBottom: 10 }} placeholder="Notes (dietary needs, allergies, pets, room details...)" value={homeForm.notes} onChange={e => setHomeForm({ ...homeForm, notes: e.target.value })} />
              <button type="submit" style={btnStyle}><Plus size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />Add Host Home</button>
            </form>

            {homeList.length === 0 ? <p style={{ color: muted, fontStyle: "italic", textAlign: "center" }}>No host homes registered yet.</p> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                {homeList.map(h => (
                  <div key={h.id} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontWeight: 700, color: ink, fontSize: 15 }}>{h.hostName}</p>
                        <p style={{ fontSize: 13, color: red, fontStyle: "italic" }}>{h.parish}</p>
                        <p style={{ fontSize: 13, color: stone }}>{h.city}, {h.state}</p>
                      </div>
                      <button onClick={() => { hostHomes.remove(h.id); refresh(); }} style={{ background: "none", border: "none", cursor: "pointer", color: muted }}><Trash2 size={12} /></button>
                    </div>
                    <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>{h.contact} · Sleeps {h.capacity}</p>
                    {h.notes && <p style={{ fontSize: 12, color: stone, marginTop: 6, fontStyle: "italic" }}>{h.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
