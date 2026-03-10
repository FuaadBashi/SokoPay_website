"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const s = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as any },
});

const milestones = [
  { year: "2021", title: "Founded in UAE", body: "Three engineers left large banks to solve the remittance problem they saw hurting migrant families every day." },
  { year: "2022", title: "First $1M transferred", body: "Launched beta with M-Pesa integration. First $1M moved in 47 days. 4.9★ App Store rating from day one." },
  { year: "2023", title: "GCC corridor opens", body: "Added UAE, Saudi Arabia, Qatar rails. Regulated by the Central Bank of Kenya and UAE CBUAE." },
  { year: "2024", title: "Series A — $18M raised", body: "Led by Partech Africa and STV Partners. Expanded to 50+ countries and launched Business accounts." },
  { year: "2025", title: "$2B processed", body: "Crossed $2B in annualised transfer volume. Launched API platform. 1M+ active users across 12 countries." },
];

const team = [
  { name: "Abdisamed Tahir",  role: "CEO & founder",     origin: "Somalia/Ethiopia 🇸🇴",  img: "https://i.pravatar.cc/120?img=51", bio: "Ex-Equity Bank VP. Built KES payment rails for 5M customers."       },
  { name: "Bashi Ebar",   role: "CTO",     origin: "United Kingdom/Somalia 🇬🇧/🇸🇴",    img: "https://i.pravatar.cc/120?img=68", bio: "Ex-Stripe infrastructure eng. Led GCC payment integrations."          },
  { name: "James Njoroge",    role: "CFO",                  origin: "London 🇬🇧",   img: "https://i.pravatar.cc/120?img=11", bio: "Ex-Goldman Sachs. Structured the Series A and regulatory compliance." },
  { name: "Fatuma Wanjiku",   role: "Head of Compliance",   origin: "Nairobi 🇰🇪",  img: "https://i.pravatar.cc/120?img=25", bio: "Regulatory lead for FCA & CBK licences. 12 years in FinTech law."     },
  { name: "Tariq Al-Rashidi", role: "Head of GCC Markets",  origin: "Riyadh 🇸🇦",   img: "https://i.pravatar.cc/120?img=47", bio: "Grew UAE/KSA corridors from 0 to $500M ARR in 18 months."             },
  { name: "Priya Menon",      role: "Head of Product",      origin: "Bangalore 🇮🇳", img: "https://i.pravatar.cc/120?img=44", bio: "Ex-PayPal PM. Redesigned the send flow that cut drop-off by 60%."     },
];

const values = [
  { icon: "🤝", title: "Radical Inclusion",  body: "Every person moving money deserves fast, fair, dignified service — whether they're sending $20 or $20M." },
  { icon: "⚡", title: "Speed as Respect",    body: "Waiting 3 days for money is not acceptable. We treat transfer speed as a form of respect for our users." },
  { icon: "🔍", title: "Full Transparency",   body: "No hidden FX markups. No mystery fees. You see exactly what you pay, what they get, before you hit send." },
  { icon: "🛡️", title: "Security First",     body: "Bank-level encryption, real-time fraud detection, and regulatory licences in every market we operate in." },
];

const investors = [
  { name: "Partech Africa", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png" },
  { name: "STV Partners",   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
  { name: "Visa Ventures",  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png" },
  { name: "AfricInvest",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/320px-Mastercard-logo.svg.png" },
];

export default function AboutPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(155deg, #0B3C5D 0%, #082a44 60%, #051d30 100%)", padding: "120px 24px 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.08) 1px, transparent 0)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <motion.div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.18) 0%, transparent 65%)", pointerEvents: "none" }}
          animate={{ scale: [1,1.1,1] }} transition={{ duration: 8, repeat: Infinity }}/>

        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{ display: "inline-block", background: "rgba(0,168,107,0.15)", color: "#00A86B", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "20px", fontFamily: "'DM Sans',sans-serif" }}>
              Our Story
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(34px,6vw,62px)", fontWeight: "800", color: "#fff", lineHeight: 1.12, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            Built by Africans,<br/>
            <span style={{ background: "linear-gradient(135deg, #00A86B, #7ED957)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              for the world's corridors
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "19px", lineHeight: 1.65, margin: "0 auto 40px", maxWidth: "620px" }}>
            We started SOKOPAY because we watched friends and family lose 10–15% of their hard-earned wages to legacy banks and money transfer operators. There's a better way.
          </motion.p>

          {/* Hero stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: "inline-flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
            {[["$2B+","Processed"], ["1M+","Users"], ["50+","Countries"], ["2021","Founded"]].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: "800", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{val}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <motion.div {...s(0)}>
              <span style={{ display: "inline-block", background: "rgba(0,168,107,0.1)", color: "#00A86B", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", fontFamily: "'DM Sans',sans-serif" }}>
                Our Mission
              </span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "38px", fontWeight: "800", color: "#0B3C5D", lineHeight: 1.2, margin: "0 0 20px" }}>
                To make the world's money move as freely as its people
              </h2>
              <p style={{ color: "#6B7A8D", fontSize: "16px", lineHeight: 1.7, margin: "0 0 20px" }}>
                The East Africa–GCC corridor is home to 23 million people who send money across borders every month. Yet the average fee is still 7–10%. That's $1.8 billion in fees drained from families and small businesses every year.
              </p>
              <p style={{ color: "#6B7A8D", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
                SOKOPAY exists to end that. We use modern infrastructure, smart FX routing, and mobile money rails to move money faster, cheaper, and with complete transparency.
              </p>
            </motion.div>

            <motion.div {...s(1)}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { num: "7–10%", label: "Industry avg fee", sub: "We charge < 1%" },
                  { num: "3 days", label: "Avg bank transfer", sub: "We do it in < 3 min" },
                  { num: "$1.8B", label: "Fees lost yearly", sub: "We're fixing that" },
                  { num: "2031", label: "Goal: zero fees", sub: "For sub-$200 sends" },
                ].map((c, i) => (
                  <motion.div key={c.label}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }}
                    whileHover={{ y: -4 }}
                    style={{ padding: "20px", borderRadius: "16px", background: i === 0 ? "linear-gradient(135deg, #0B3C5D, #0e4878)" : "#F4F6F8", border: i === 0 ? "none" : "1px solid rgba(11,60,93,0.08)" }}
                  >
                    <div style={{ fontSize: "28px", fontWeight: "800", color: i === 0 ? "#7ED957" : "#0B3C5D", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "4px" }}>{c.num}</div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: i === 0 ? "rgba(255,255,255,0.7)" : "#374a60", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "2px" }}>{c.label}</div>
                    <div style={{ fontSize: "12px", color: i === 0 ? "rgba(255,255,255,0.4)" : "#9AAAB8", fontFamily: "'DM Sans',sans-serif" }}>{c.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#F4F6F8", padding: "100px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div {...s(0)} style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ display: "inline-block", background: "rgba(77,168,218,0.1)", color: "#4DA8DA", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", fontFamily: "'DM Sans',sans-serif" }}>
              Milestones
            </span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "38px", fontWeight: "800", color: "#0B3C5D", lineHeight: 1.2, margin: 0 }}>
              How we got here
            </h2>
          </motion.div>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "rgba(11,60,93,0.08)", transform: "translateX(-50%)" }}/>

            {milestones.map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity: 0, x: i%2===0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{ display: "flex", justifyContent: i%2===0 ? "flex-end" : "flex-start", marginBottom: "40px", position: "relative" }}
              >
                {/* Dot */}
                <div style={{ position: "absolute", left: "50%", top: "22px", width: "14px", height: "14px", borderRadius: "50%", background: "#00A86B", border: "3px solid #fff", transform: "translateX(-50%)", boxShadow: "0 0 0 4px rgba(0,168,107,0.2)", zIndex: 2 }}/>

                <div style={{ width: "calc(50% - 32px)", padding: "20px", borderRadius: "16px", background: "#fff", boxShadow: "0 4px 20px rgba(11,60,93,0.07)", border: "1px solid rgba(11,60,93,0.07)", [i%2===0 ? "marginRight" : "marginLeft"]: "0" as any }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#00A86B", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.06em", marginBottom: "4px" }}>{m.year}</div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#0B3C5D", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "6px" }}>{m.title}</div>
                  <div style={{ fontSize: "13px", color: "#6B7A8D", lineHeight: 1.6 }}>{m.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...s(0)} style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ display: "inline-block", background: "rgba(0,168,107,0.1)", color: "#00A86B", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", fontFamily: "'DM Sans',sans-serif" }}>Values</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "38px", fontWeight: "800", color: "#0B3C5D", lineHeight: 1.2, margin: 0 }}>What we stand for</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(11,60,93,0.1)" }}
                style={{ padding: "28px 24px", borderRadius: "20px", background: "#F4F6F8", border: "1px solid rgba(11,60,93,0.06)" }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>{v.icon}</div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#0B3C5D", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "10px" }}>{v.title}</div>
                <div style={{ fontSize: "14px", color: "#6B7A8D", lineHeight: 1.65 }}>{v.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "#F4F6F8", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...s(0)} style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ display: "inline-block", background: "rgba(11,60,93,0.08)", color: "#0B3C5D", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", fontFamily: "'DM Sans',sans-serif" }}>Team</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "38px", fontWeight: "800", color: "#0B3C5D", lineHeight: 1.2, margin: 0 }}>The people behind SOKOPAY</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {team.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(11,60,93,0.07)", border: "1px solid rgba(11,60,93,0.06)" }}
              >
                <div style={{ height: "120px", background: "linear-gradient(135deg, #0B3C5D, #0e4878)", position: "relative", display: "flex", alignItems: "flex-end", padding: "0 20px" }}>
                  <img src={t.img} alt={t.name} style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", marginBottom: "-36px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}/>
                </div>
                <div style={{ padding: "44px 20px 22px" }}>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#0B3C5D", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: "13px", color: "#00A86B", fontWeight: "600", marginBottom: "4px" }}>{t.role}</div>
                  <div style={{ fontSize: "12px", color: "#9AAAB8", marginBottom: "10px" }}>{t.origin}</div>
                  <div style={{ fontSize: "13px", color: "#6B7A8D", lineHeight: 1.6 }}>{t.bio}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTORS ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#0B3C5D", padding: "72px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <motion.p {...s(0)} style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "32px" }}>
            Backed by world-class investors
          </motion.p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
            {investors.map((inv, i) => (
              <motion.div key={inv.name}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.06 }}
                style={{ height: "28px", opacity: 0.35, filter: "brightness(0) invert(1)", transition: "opacity 0.3s" }}
              >
                <img src={inv.logo} alt={inv.name} style={{ height: "100%", width: "auto", objectFit: "contain" }}
                  onError={e => { const el = e.currentTarget.parentElement!; el.innerHTML = `<span style="color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700">${inv.name}</span>`; }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
