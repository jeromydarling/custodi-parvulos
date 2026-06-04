import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Mail, Send, Clock, CheckCircle, Users, Bell, FileText, Trash2, Plus, LogOut, Calendar, ChevronDown } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import FadeIn from "../components/FadeIn";
import Divider from "../components/Divider";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, sectionStyle, prose, heading, textureOverlay, globalCSS } from "../theme";
import { getRetreatRequests, getScheduledEmails, getSentEmails, markEmailSent, getNewsletterSubscribers, addNewsletterSubscriber, removeNewsletterSubscriber, saveNewsletter, getNewsletters, getAdminUser, setAdminUser, clearAdminUser } from "../store";
import { REMINDER_7_DAY, REMINDER_3_DAY, REMINDER_1_DAY, FOLLOWUP_PARTICIPANT, FOLLOWUP_PARISH } from "../email-templates";

const inputStyle = { width: "100%", background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 16, color: ink, outline: "none", boxSizing: "border-box" };
const btnStyle = { background: brown, color: cream, border: "none", padding: "10px 24px", borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer" };
const tabStyle = (active) => ({ padding: "10px 20px", borderRadius: "6px 6px 0 0", border: `1px solid ${active ? borderC : "transparent"}`, borderBottom: active ? `2px solid ${cream}` : `1px solid ${borderC}`, background: active ? cream : "transparent", fontFamily: font, fontSize: 14, fontWeight: active ? 700 : 400, color: active ? brown : stone, cursor: "pointer", marginBottom: -1 });

const TEMPLATE_MAP = { reminder_7d: REMINDER_7_DAY, reminder_3d: REMINDER_3_DAY, reminder_1d: REMINDER_1_DAY, followup_parish: FOLLOWUP_PARISH };
const TYPE_LABELS = { reminder_7d: "7-Day Reminder", reminder_3d: "3-Day Reminder", reminder_1d: "1-Day Reminder", followup_parish: "Post-Retreat Follow-up" };

export default function AdminEmail() {
  const [admin, setAdmin] = useState(getAdminUser());
  const [tab, setTab] = useState("reminders");
  const [scheduled, setScheduled] = useState([]);
  const [sent, setSent] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [addSub, setAddSub] = useState({ email: "", name: "" });
  const [compose, setCompose] = useState({ subject: "", body: "", audience: "all" });
  const [previewEmail, setPreviewEmail] = useState(null);
  const [composeSent, setComposeSent] = useState(false);

  const refresh = useCallback(async () => {
    const emails = await getScheduledEmails() || [];
    setScheduled(emails.filter(e => !e.sent).sort((a, b) => new Date(a.send_date) - new Date(b.send_date)));
    setSent(emails.filter(e => e.sent).sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)));
    setSubscribers(await getNewsletterSubscribers() || []);
    setNewsletters((await getNewsletters() || []).sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)));
  }, []);

  useEffect(refresh, [refresh]);

  // Google OAuth - in production this would use real Google Identity Services
  const handleGoogleLogin = () => {
    // Simulated for demo — in production, use Google Identity Services
    const mockUser = { email: "admin@custodiParvulos.org", name: "Administrator", picture: null, token: "demo_token" };
    setAdminUser(mockUser);
    setAdmin(mockUser);
  };

  const handleLogout = () => { clearAdminUser(); setAdmin(null); };

  const handleSendEmail = async (emailId) => {
    await markEmailSent(emailId);
    refresh();
  };

  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    if (addSub.email) { await addNewsletterSubscriber(addSub.email, addSub.name, "manual"); setAddSub({ email: "", name: "" }); refresh(); }
  };

  const handleRemoveSubscriber = async (email) => { await removeNewsletterSubscriber(email); refresh(); };

  const handleSendNewsletter = async () => {
    const recipients = compose.audience === "all" ? subscribers : subscribers.filter(s => s.source === compose.audience);
    await saveNewsletter({ ...compose, recipient_count: recipients.length });
    setComposeSent(true);
    refresh();
  };

  // Not logged in
  if (!admin) {
    return (
      <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", position: "relative" }}>
        <div style={textureOverlay} />
        <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${bg}ee`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${borderC}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <PelicanLogo size={32} color={brown} />
            <span style={{ fontFamily: font, fontWeight: 700, color: brown, fontSize: 15 }}>Custodi Parvulos</span>
          </Link>
        </nav>
        <div style={{ maxWidth: 440, margin: "0 auto", padding: "80px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Mail size={48} color={brown} strokeWidth={1.2} style={{ display: "block", margin: "0 auto" }} />
            <h1 style={{ ...heading, fontSize: 28, marginTop: 16 }}>Email Administration</h1>
            <p style={{ color: stone, fontSize: 15, marginTop: 8, marginBottom: 32 }}>Sign in with Google to manage retreat reminders and newsletters</p>
            <button onClick={handleGoogleLogin} style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#fff", border: `1px solid #dadce0`, borderRadius: 6, padding: "12px 24px", fontFamily: font, fontSize: 15, color: "#3c4043", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Sign in with Google
            </button>
            <p style={{ fontSize: 12, color: muted, marginTop: 16 }}>Google OAuth is used to verify admin identity and enable email sending via Gmail API</p>
          </FadeIn>
        </div>
        <style>{globalCSS}</style>
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
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: stone }}>{admin.email}</span>
          <button onClick={handleLogout} style={{ background: "none", border: "none", fontFamily: font, color: stone, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><LogOut size={13} /> Sign Out</button>
        </div>
      </nav>

      <div style={{ ...sectionStyle, maxWidth: 800, padding: "32px 24px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h1 style={{ ...heading, fontSize: 24, marginBottom: 24 }}>Email Dashboard</h1>
        </FadeIn>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${borderC}`, marginBottom: 24 }}>
          {[
            { key: "reminders", label: "Retreat Reminders", icon: Bell },
            { key: "newsletter", label: "Newsletter", icon: Mail },
            { key: "subscribers", label: "Subscribers", icon: Users },
            { key: "history", label: "Sent History", icon: CheckCircle },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={tabStyle(tab === t.key)}>
              <t.icon size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />{t.label}
            </button>
          ))}
        </div>

        {/* REMINDERS TAB */}
        {tab === "reminders" && (
          <div>
            <p style={{ ...prose, fontSize: 15, marginBottom: 24 }}>Automated reminders are scheduled when a parish registers for a retreat. Emails are queued at 7 days, 3 days, and 1 day before the event, plus a follow-up the day after.</p>
            {scheduled.length === 0 ? (
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
                <Clock size={32} color={muted} style={{ display: "block", margin: "0 auto" }} />
                <p style={{ color: muted, fontSize: 15, marginTop: 12 }}>No upcoming emails scheduled. They will appear here when parishes register for retreats.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {scheduled.map(email => {
                  const tmpl = TEMPLATE_MAP[email.type];
                  const isPast = new Date(email.send_date) <= new Date();
                  return (
                    <div key={email.id} style={{ background: cream, border: `1px solid ${isPast ? `${red}40` : borderC}`, borderRadius: 8, padding: "16px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: isPast ? red : brown, letterSpacing: 1 }}>{TYPE_LABELS[email.type]}</span>
                          <p style={{ fontSize: 15, color: ink, fontWeight: 600, marginTop: 4 }}>{email.parish}</p>
                          <p style={{ fontSize: 13, color: stone }}>To: {email.to}</p>
                          <p style={{ fontSize: 13, color: muted }}>
                            <Calendar size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
                            Send: {new Date(email.send_date).toLocaleDateString()} | Event: {new Date(email.event_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setPreviewEmail(previewEmail === email.id ? null : email.id)} style={{ background: "none", border: `1px solid ${borderC}`, padding: "6px 14px", borderRadius: 4, fontFamily: font, fontSize: 12, color: stone, cursor: "pointer" }}>Preview</button>
                          <button onClick={() => handleSendEmail(email.id)} style={{ ...btnStyle, padding: "6px 14px", fontSize: 12, background: isPast ? red : brown }}>
                            {isPast ? "Send Now (overdue)" : "Send"}
                          </button>
                        </div>
                      </div>
                      {previewEmail === email.id && tmpl && (
                        <div style={{ marginTop: 12, borderTop: `1px solid ${borderC}`, paddingTop: 12 }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: brown }}>Subject: {tmpl.subject}</p>
                          <pre style={{ fontFamily: font, fontSize: 13, color: ink, whiteSpace: "pre-wrap", lineHeight: 1.6, marginTop: 8, background: bg, padding: 12, borderRadius: 6, border: `1px solid ${borderC}` }}>
                            {tmpl.body(email.parish, new Date(email.event_date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), email.contact)}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* NEWSLETTER TAB */}
        {tab === "newsletter" && (
          <div>
            {composeSent ? (
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
                <CheckCircle size={32} color="#4A7C59" style={{ display: "block", margin: "0 auto" }} />
                <h3 style={{ ...heading, fontSize: 20, marginTop: 12, color: "#4A7C59" }}>Newsletter Queued</h3>
                <p style={{ color: stone, fontSize: 15, marginTop: 8 }}>Your newsletter will be sent to {compose.recipientCount || subscribers.length} subscribers.</p>
                <button onClick={() => { setComposeSent(false); setCompose({ subject: "", body: "", audience: "all" }); }} style={{ ...btnStyle, marginTop: 16 }}>Compose Another</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Audience</label>
                  <select style={inputStyle} value={compose.audience} onChange={e => setCompose({ ...compose, audience: e.target.value })}>
                    <option value="all">All Subscribers ({subscribers.length})</option>
                    <option value="retreat">Retreat Participants</option>
                    <option value="online">Online Formation Users</option>
                    <option value="manual">Manually Added</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Subject</label>
                  <input style={inputStyle} value={compose.subject} onChange={e => setCompose({ ...compose, subject: e.target.value })} placeholder="e.g. A Word from Custodi Parvulos" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: font, fontSize: 13, color: brown, fontWeight: 600, marginBottom: 4 }}>Message</label>
                  <textarea style={{ ...inputStyle, minHeight: 240, resize: "vertical", lineHeight: 1.7 }} value={compose.body} onChange={e => setCompose({ ...compose, body: e.target.value })} placeholder="Write your newsletter here..." />
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={handleSendNewsletter} disabled={!compose.subject || !compose.body} style={{ ...btnStyle, opacity: compose.subject && compose.body ? 1 : 0.5, display: "flex", alignItems: "center", gap: 6 }}>
                    <Send size={14} /> Send Newsletter
                  </button>
                </div>
              </div>
            )}

            {newsletters.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ ...heading, fontSize: 16, marginBottom: 12 }}>Previous Newsletters</h3>
                {newsletters.map(nl => (
                  <div key={nl.id} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ fontWeight: 600, color: ink, fontSize: 15 }}>{nl.subject}</p>
                      <span style={{ fontSize: 12, color: muted }}>{new Date(nl.sent_at).toLocaleDateString()}</span>
                    </div>
                    <p style={{ fontSize: 13, color: stone }}>Sent to {nl.recipient_count} subscribers</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBSCRIBERS TAB */}
        {tab === "subscribers" && (
          <div>
            <form onSubmit={handleAddSubscriber} style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <input required style={{ ...inputStyle, flex: "1 1 200px" }} placeholder="Email" value={addSub.email} onChange={e => setAddSub({ ...addSub, email: e.target.value })} />
              <input style={{ ...inputStyle, flex: "1 1 160px" }} placeholder="Name (optional)" value={addSub.name} onChange={e => setAddSub({ ...addSub, name: e.target.value })} />
              <button type="submit" style={btnStyle}><Plus size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />Add</button>
            </form>
            <p style={{ fontSize: 13, color: muted, marginBottom: 16 }}>{subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}</p>
            {subscribers.length === 0 ? (
              <p style={{ color: muted, fontSize: 15, fontStyle: "italic" }}>No subscribers yet. Add manually above or they will be added automatically when users register.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {subscribers.map(s => (
                  <div key={s.email} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontWeight: 600, color: ink, fontSize: 15 }}>{s.name || s.email}</span>
                      {s.name && <span style={{ color: muted, fontSize: 13, marginLeft: 8 }}>{s.email}</span>}
                      <span style={{ fontSize: 11, color: stone, marginLeft: 8, background: `${borderC}80`, padding: "2px 6px", borderRadius: 3 }}>{s.source}</span>
                    </div>
                    <button onClick={() => handleRemoveSubscriber(s.email)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, padding: 4 }}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === "history" && (
          <div>
            {sent.length === 0 ? (
              <div style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
                <FileText size={32} color={muted} style={{ display: "block", margin: "0 auto" }} />
                <p style={{ color: muted, fontSize: 15, marginTop: 12 }}>No emails sent yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sent.map(email => (
                  <div key={email.id + email.sent_at} style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#4A7C59", letterSpacing: 1 }}>{TYPE_LABELS[email.type] || "Newsletter"}</span>
                        <p style={{ fontSize: 15, color: ink, marginTop: 2 }}>{email.parish || email.subject}</p>
                        <p style={{ fontSize: 13, color: stone }}>To: {email.to}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <CheckCircle size={14} color="#4A7C59" />
                        <p style={{ fontSize: 12, color: muted, marginTop: 4 }}>{new Date(email.sent_at).toLocaleString()}</p>
                      </div>
                    </div>
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
