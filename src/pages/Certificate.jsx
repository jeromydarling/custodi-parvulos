import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import PelicanLogo from "../components/PelicanLogo";
import { font, bg, ink, brown, red, stone, muted, cream, borderC, globalCSS } from "../theme";
import { issueCertificate, findCertificate, getCurrentUser, getProgress } from "../store";

export default function Certificate() {
  const [params] = useSearchParams();
  const [cert, setCert] = useState(null);
  const [manual, setManual] = useState({ name: "", parish: "" });

  useEffect(() => {
    (async () => {
      const user = getCurrentUser();
      const progress = await getProgress();
      const allDone = Object.keys(progress || {}).length >= 5;
      if (user && allDone) {
        const parishName = user.parishId ? "Custodi Parvulos Online" : "Individual Formation";
        let existing = await findCertificate(user.name, parishName);
        if (!existing) existing = await issueCertificate(user.name, parishName);
        setCert(existing);
      } else if (params.get("name") && params.get("parish")) {
        setCert({
          participantName: params.get("name"),
          parishName: params.get("parish"),
          issueDate: new Date().toISOString(),
          serialNumber: "CP-DEMO",
        });
      }
    })();
  }, [params]);

  const issueManual = async () => {
    if (!manual.name || !manual.parish) return;
    const c = await issueCertificate(manual.name, manual.parish);
    if (c) setCert(c);
  };

  const print = () => window.print();

  if (!cert) {
    return (
      <div style={{ fontFamily: font, background: bg, color: ink, minHeight: "100vh", padding: 48 }}>
        <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
          <PelicanLogo size={80} color={brown} />
          <h1 style={{ fontFamily: font, color: brown, fontSize: 26, marginTop: 16, fontWeight: 700 }}>Certificate of Completion</h1>
          <p style={{ color: stone, fontSize: 15, marginTop: 12 }}>Complete all 5 Parts of the formation to receive your Testimonium Formationis, or enter participant details below.</p>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            <input placeholder="Participant Name" value={manual.name} onChange={e => setManual({ ...manual, name: e.target.value })}
              style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 15, color: ink }} />
            <input placeholder="Parish Name" value={manual.parish} onChange={e => setManual({ ...manual, parish: e.target.value })}
              style={{ background: cream, border: `1px solid ${borderC}`, borderRadius: 6, padding: "12px 16px", fontFamily: font, fontSize: 15, color: ink }} />
            <button onClick={issueManual} style={{ background: brown, color: cream, border: "none", padding: "12px 28px", borderRadius: 6, fontFamily: font, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Generate Certificate
            </button>
          </div>
          <p style={{ marginTop: 24 }}><Link to="/" style={{ color: stone, fontSize: 14 }}>← Back to Home</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, background: "#fff", minHeight: "100vh", padding: 24 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="no-print" style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ fontFamily: font, color: stone, textDecoration: "none", fontSize: 14 }}>← Back</Link>
          <button onClick={print} style={{ background: brown, color: cream, border: "none", padding: "10px 20px", borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            <Printer size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> Print / Save PDF
          </button>
        </div>

        {/* Certificate */}
        <div className="certificate" style={{ background: "#FFFDF7", border: "8px double #6B3A2A", borderRadius: 4, padding: "60px 60px", textAlign: "center", position: "relative", aspectRatio: "1.414 / 1", fontFamily: font }}>
          <div style={{ border: "1px solid #8B7355", padding: "40px 40px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <PelicanLogo size={80} color={brown} />
              <p style={{ color: red, fontSize: 11, fontStyle: "italic", letterSpacing: 2, marginTop: 8 }}>PIE PELICANE, CUSTODI PARVULOS</p>
            </div>

            <div>
              <h1 style={{ fontSize: 14, color: brown, letterSpacing: 6, fontWeight: 400, marginBottom: 4 }}>TESTIMONIUM</h1>
              <h1 style={{ fontSize: 28, color: brown, letterSpacing: 3, fontWeight: 700, marginBottom: 24 }}>FORMATIONIS</h1>
              <p style={{ fontSize: 14, color: stone, fontStyle: "italic", marginBottom: 16 }}>This testifies that</p>
              <p style={{ fontSize: 36, color: ink, fontWeight: 700, marginBottom: 16, borderBottom: `1px solid #8B7355`, paddingBottom: 12, display: "inline-block", padding: "0 40px 12px" }}>
                {cert.participantName}
              </p>
              <p style={{ fontSize: 14, color: stone, marginTop: 16, lineHeight: 1.8 }}>
                has faithfully completed the full formation of<br/>
                <strong style={{ color: brown }}>Custodi Parvulos</strong> — Guard the Little Ones<br/>
                a journey through the Drama of Salvation in five parts<br/>
                rooted in the Theology of the Body, Humanae Vitae,<br/>
                and the findings of the John Jay College studies
              </p>
              {cert.parishName && cert.parishName !== "Individual Formation" && (
                <p style={{ fontSize: 13, color: muted, fontStyle: "italic", marginTop: 16 }}>{cert.parishName}</p>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 32 }}>
              <div style={{ textAlign: "left", fontSize: 11, color: muted }}>
                <p style={{ borderTop: "1px solid #8B7355", paddingTop: 4, minWidth: 140 }}>Date of Completion</p>
                <p style={{ marginTop: 4 }}>{new Date(cert.issueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
              <div style={{ textAlign: "center", fontSize: 11, color: muted }}>
                <p style={{ fontStyle: "italic" }}>Serial: {cert.serialNumber}</p>
              </div>
              <div style={{ textAlign: "right", fontSize: 11, color: muted }}>
                <p style={{ borderTop: "1px solid #8B7355", paddingTop: 4, minWidth: 140 }}>Issued by</p>
                <p style={{ marginTop: 4 }}>Custodi Parvulos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ${globalCSS}
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          .certificate { border-color: #6B3A2A !important; }
        }
      `}</style>
    </div>
  );
}
