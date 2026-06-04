import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Users, DollarSign, Calendar, Trash2, Plus, ChevronRight, Church, BookOpen, Heart, Award, UserPlus, Clock, TrendingUp, Send } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { getRetreatRequests, updateRetreatStatus, bishops, benefactors, dioceses, referrals, facilitators, caseStudies, prayerIntentions, massIntentions, waitlist, getAdminUser } from "../store";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "10px 14px", fontFamily: font, fontSize: 14, color: ink, outline: "none", boxSizing: "border-box" };
const btnStyle = { background: brown, color: cream, border: "none", padding: "8px 16px", borderRadius: 6, fontFamily: font, fontSize: 13, fontWeight: 600, cursor: "pointer" };
const tabStyle = (active) => ({ padding: "8px 14px", border: `1px solid ${active ? borderC : "transparent"}`, borderBottom: active ? `2px solid ${cream}` : `1px solid ${borderC}`, background: active ? cream : "transparent", fontFamily: font, fontSize: 13, fontWeight: active ? 700 : 400, color: active ? brown : stone, cursor: "pointer", borderRadius: "6px 6px 0 0", marginBottom: -1 });

const STATUSES = ["inquiry", "contacted", "scheduled", "prepared", "completed", "followup"];
const STATUS_LABELS = { inquiry: "Inquiry", contacted: "Contacted", scheduled: "Scheduled", prepared: "Prep Sent", completed: "Completed", followup: "Follow-up" };
const STATUS_COLORS = { inquiry: "#B8A080", contacted: "#C9A84C", scheduled: "#4A7C59", prepared: "#2E5E8E", completed: "#6B3A2A", followup: "#8B4553" };

function MiniList({ items, onAdd, onRemove, fields, title }) {
  const [form, setForm] = useState({});
  const submit = (e) => { e.preventDefault(); onAdd(form); setForm({}); };
  return (
    <div>
      <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginBottom: 16 }}>
        {fields.map(f => (
          <input key={f.key} required={f.required} type={f.type || "text"} style={inputStyle} placeholder={f.label}
            value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
        ))}
        <button type="submit" style={btnStyle}><Plus size={13} /> Add</button>
      </form>
      {items.length === 0 ? <p style={{ color: muted, fontSize: 13, fontStyle: "italic", textAlign: "center", padding: 20 }}>No {title.toLowerCase()} yet</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map(item => (
            <div key={item.id} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                {fields.map(f => item[f.key] && (
                  <span key={f.key} style={{ fontSize: 13, color: f.key === fields[0].key ? ink : muted, marginRight: 12, fontWeight: f.key === fields[0].key ? 600 : 400 }}>
                    {item[f.key]}
                  </span>
                ))}
              </div>
              <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: muted }}><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const admin = getAdminUser();
  const [tab, setTab] = useState("pipeline");
  const [requests, setRequests] = useState([]);
  const [bishopList, setBishopList] = useState([]);
  const [benefactorList, setBenefactorList] = useState([]);
  const [dioceseList, setDioceseList] = useState([]);
  const [referralList, setReferralList] = useState([]);
  const [facilitatorList, setFacilitatorList] = useState([]);
  const [waitlistList, setWaitlistList] = useState([]);
  const [prayerList, setPrayerList] = useState([]);
  const [massList, setMassList] = useState([]);
  const [caseList, setCaseList] = useState([]);

  const refresh = useCallback(async () => {
    setRequests(await getRetreatRequests() || []);
    setBishopList(await bishops.getAll());
    setBenefactorList(await benefactors.getAll());
    setDioceseList(await dioceses.getAll());
    setReferralList(await referrals.getAll());
    setFacilitatorList(await facilitators.getAll());
    setWaitlistList(await waitlist.getAll());
    setPrayerList(await prayerIntentions.getAll());
    setMassList(await massIntentions.getAll());
    setCaseList(await caseStudies.getAll());
  }, []);

  useEffect(refresh, [refresh]);

  // Stats
  const total = requests.length;
  const scheduled = requests.filter(r => r.status === "scheduled" || r.status === "prepared").length;
  const completed = requests.filter(r => r.status === "completed" || r.status === "followup").length;
  const totalContrib = requests.reduce((s, r) => {
    const amt = parseFloat((r.contribution || "").replace(/[^0-9.]/g, "")) || 0;
    return s + amt;
  }, 0);

  if (!admin) {
    return (
      <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", padding: 48, textAlign: "center" }}>
        <PelicanLogo size={60} color={brown} />
        <h1 style={{ ...heading, fontSize: 22, marginTop: 16 }}>Admin Sign-In Required</h1>
        <Link to="/admin-email" style={{ display: "inline-block", marginTop: 16, ...btnStyle, textDecoration: "none", padding: "12px 24px", fontSize: 15 }}>Sign In</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
      <div style={textureOverlay} />
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1000, margin: "0 auto" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PelicanLogo size={32} color={brown} />
          <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
        </Link>
        <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
          <span style={{ color: brown, fontWeight: 600 }}>Dashboard</span>
          <Link to="/admin-email" style={{ color: stone, textDecoration: "none" }}>Email</Link>
          <Link to="/admin-travel" style={{ color: stone, textDecoration: "none" }}>Travel</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>
        <h1 style={{ ...heading, fontSize: 26, marginBottom: 8 }}>Admin Dashboard</h1>
        <p style={{ color: stone, fontSize: 14, marginBottom: 24 }}>Pipeline, relationships, and growth</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total Requests", value: total, Icon: Users },
            { label: "Scheduled", value: scheduled, Icon: Calendar },
            { label: "Completed", value: completed, Icon: Award },
            { label: "Contributions", value: "$" + totalContrib.toLocaleString(), Icon: DollarSign },
          ].map((s, i) => (
            <div key={i} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "16px 14px", textAlign: "center" }}>
              <s.Icon size={18} color={brown} style={{ display: "block", margin: "0 auto 6px" }} />
              <p style={{ fontSize: 22, fontWeight: 700, color: ink, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: muted, marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${borderC}`, marginBottom: 20, flexWrap: "wrap" }}>
          {[
            { key: "pipeline", label: "Pipeline", icon: TrendingUp },
            { key: "calendar", label: "Calendar", icon: Calendar },
            { key: "dioceses", label: "Dioceses", icon: Church },
            { key: "bishops", label: "Bishops", icon: UserPlus },
            { key: "benefactors", label: "Benefactors", icon: DollarSign },
            { key: "referrals", label: "Referrals", icon: Send },
            { key: "facilitators", label: "Facilitators", icon: Users },
            { key: "waitlist", label: "Waitlist", icon: Clock },
            { key: "prayer", label: "Prayer Wall", icon: Heart },
            { key: "cases", label: "Case Studies", icon: BookOpen },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={tabStyle(tab === t.key)}>
              <t.icon size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />{t.label}
            </button>
          ))}
        </div>

        {/* PIPELINE */}
        {tab === "pipeline" && (
          <div>
            <p style={{ ...prose, fontSize: 14, marginBottom: 16 }}>Move parishes through the retreat pipeline from first inquiry to post-retreat follow-up.</p>
            {requests.length === 0 ? (
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 32, textAlign: "center", color: muted }}>
                No retreat requests yet. They will appear here when parishes submit the form.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${STATUSES.length}, 1fr)`, gap: 8, overflowX: "auto" }}>
                {STATUSES.map(status => {
                  const col = requests.filter(r => (r.status || "inquiry") === status);
                  return (
                    <div key={status} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 8, minHeight: 200, minWidth: 140 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLORS[status], letterSpacing: 1, padding: "4px 8px", borderBottom: `2px solid ${STATUS_COLORS[status]}`, marginBottom: 8 }}>
                        {STATUS_LABELS[status].toUpperCase()} ({col.length})
                      </div>
                      {col.map(r => (
                        <div key={r.id} style={{ background: bg, border: `1px solid ${borderC}`, borderRadius: 4, padding: 8, marginBottom: 6, fontSize: 12 }}>
                          <p style={{ fontWeight: 600, color: ink }}>{r.parish}</p>
                          <p style={{ color: muted, fontSize: 11 }}>{r.diocese}</p>
                          <select style={{ width: "100%", marginTop: 6, fontSize: 11, padding: 4, border: `1px solid ${borderC}`, borderRadius: 3, fontFamily: font }}
                            value={r.status || "inquiry"} onChange={e => { updateRetreatStatus(r.id, e.target.value); refresh(); }}>
                            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CALENDAR */}
        {tab === "calendar" && (
          <div>
            <p style={{ ...prose, fontSize: 14, marginBottom: 16 }}>All scheduled retreats in chronological order.</p>
            {(() => {
              const dated = [];
              requests.forEach(r => (JSON.parse(r.selected_dates || "[]") || []).forEach(d => dated.push({ parish: r.parish, diocese: r.diocese, date: new Date(d), status: r.status })));
              dated.sort((a, b) => a.date - b.date);
              if (dated.length === 0) return <p style={{ color: muted, fontStyle: "italic", textAlign: "center" }}>No retreats scheduled</p>;
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {dated.map((d, i) => (
                    <div key={i} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", display: "flex", gap: 16, alignItems: "center" }}>
                      <div style={{ minWidth: 80, textAlign: "center", background: bg, borderRadius: 4, padding: "6px 0" }}>
                        <p style={{ fontSize: 10, color: muted }}>{d.date.toLocaleDateString("en", { month: "short" }).toUpperCase()}</p>
                        <p style={{ fontSize: 22, fontWeight: 700, color: brown }}>{d.date.getDate()}</p>
                        <p style={{ fontSize: 10, color: muted }}>{d.date.getFullYear()}</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, color: ink, fontSize: 15 }}>{d.parish}</p>
                        <p style={{ color: stone, fontSize: 13 }}>{d.diocese}</p>
                        <span style={{ fontSize: 11, color: STATUS_COLORS[d.status] || muted, fontWeight: 600, letterSpacing: 1 }}>{STATUS_LABELS[d.status] || "INQUIRY"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {tab === "dioceses" && <MiniList items={dioceseList} onAdd={d => { dioceses.add(d); refresh(); }} onRemove={id => { dioceses.remove(id); refresh(); }} title="Dioceses" fields={[
          { key: "name", label: "Diocese Name", required: true }, { key: "state", label: "State", required: true },
          { key: "parishes", label: "# Parishes in region", type: "number" }, { key: "notes", label: "Notes" },
        ]} />}

        {tab === "bishops" && <MiniList items={bishopList} onAdd={d => { bishops.add(d); refresh(); }} onRemove={id => { bishops.remove(id); refresh(); }} title="Bishops" fields={[
          { key: "name", label: "Bishop Name", required: true }, { key: "diocese", label: "Diocese", required: true },
          { key: "status", label: "Relationship (introduced/met/endorsed)" }, { key: "nextStep", label: "Next step" },
        ]} />}

        {tab === "benefactors" && <MiniList items={benefactorList} onAdd={d => { benefactors.add({ ...d, amount: parseFloat(d.amount) || 0 }); refresh(); }} onRemove={id => { benefactors.remove(id); refresh(); }} title="Benefactors" fields={[
          { key: "name", label: "Name", required: true }, { key: "email", label: "Email", type: "email" },
          { key: "amount", label: "Amount pledged", type: "number" }, { key: "notes", label: "Notes" },
        ]} />}

        {tab === "referrals" && <MiniList items={referralList} onAdd={d => { referrals.add(d); refresh(); }} onRemove={id => { referrals.remove(id); refresh(); }} title="Referrals" fields={[
          { key: "source", label: "Referring parish/person", required: true }, { key: "referred", label: "Referred parish", required: true },
          { key: "date", label: "Date", type: "date" }, { key: "outcome", label: "Outcome" },
        ]} />}

        {tab === "facilitators" && <MiniList items={facilitatorList} onAdd={d => { facilitators.add(d); refresh(); }} onRemove={id => { facilitators.remove(id); refresh(); }} title="Facilitators" fields={[
          { key: "name", label: "Name", required: true }, { key: "email", label: "Email", type: "email" },
          { key: "region", label: "Region" }, { key: "status", label: "Status (training/certified/active)" },
        ]} />}

        {tab === "waitlist" && <MiniList items={waitlistList} onAdd={d => { waitlist.add(d); refresh(); }} onRemove={id => { waitlist.remove(id); refresh(); }} title="Waitlist" fields={[
          { key: "parish", label: "Parish", required: true }, { key: "contact", label: "Contact email" },
          { key: "preferredSeason", label: "Preferred season" }, { key: "notes", label: "Notes" },
        ]} />}

        {tab === "prayer" && <MiniList items={prayerList} onAdd={d => { prayerIntentions.add(d); refresh(); }} onRemove={id => { prayerIntentions.remove(id); refresh(); }} title="Prayer Intentions" fields={[
          { key: "parish", label: "Parish", required: true }, { key: "intention", label: "Intention", required: true },
          { key: "submittedBy", label: "Submitted by" },
        ]} />}

        {tab === "cases" && <MiniList items={caseList} onAdd={d => { caseStudies.add(d); refresh(); }} onRemove={id => { caseStudies.remove(id); refresh(); }} title="Case Studies" fields={[
          { key: "title", label: "Title", required: true }, { key: "parish", label: "Parish" },
          { key: "summary", label: "Summary" }, { key: "outcome", label: "Outcome" },
        ]} />}
      </div>
      <style>{globalCSS}</style>
    </div>
  );
}
