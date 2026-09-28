"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const s = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const products = [
  {
    id: "personal",
    tag: "Personal",
    name: "SOKOPAY Personal",
    tagline: "Send money home, in seconds",
    description: "Built for workers, families, and freelancers moving money between East Africa and the Gulf. No hidden fees. Great rates. Delivered to M-Pesa, Airtel Money, or any bank account.",
    color: "#00A86B",
    gradient: "linear-gradient(135deg, #00A86B 0%, #009e65 100%)",
    bg: "rgba(0,168,107,0.06)",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=640&q=80",
    features: [
      { icon: "⚡", title: "Instant delivery",        body: "Most transfers arrive in under 60 seconds via M-Pesa, Airtel Money, or Easypaisa." },
      { icon: "💱", title: "Live FX rates",            body: "See the real mid-market rate. Lock it in for 30 minutes before you send." },
      { icon: "📅", title: "Scheduled transfers",      body: "Set up weekly or monthly recurring sends. Never miss a payment to family." },
      { icon: "📱", title: "In-app tracking",          body: "Real-time push notifications and a digital receipt the moment money arrives." },
      { icon: "🌍", title: "50+ countries",            body: "Send from UAE, Saudi Arabia, Qatar, Kuwait — receive anywhere in East Africa." },
      { icon: "💬", title: "Multilingual support",     body: "Support in English, Swahili, Arabic, and Amharic. 24/7 via chat or phone." },
    ],
    cta: "Send Money Now",
    stat1: { val: "1M+", lbl: "Active senders" },
    stat2: { val: "$50", lbl: "Min transfer" },
  },
  {
    id: "business",
    tag: "Business",
    name: "SOKOPAY Business",
    tagline: "Power your trade finance",
    description: "Built for importers, exporters, payroll teams, and FinTech companies operating across the EA↔GCC corridor. Batch payments, multi-currency treasury, and an enterprise-grade API.",
    color: "#0B3C5D",
    gradient: "linear-gradient(135deg, #0B3C5D 0%, #0e4a73 100%)",
    bg: "rgba(11,60,93,0.05)",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=640&q=80",
    features: [
      { icon: "📦", title: "Batch payments",          body: "Disburse to 10,000+ recipients in one click. CSV upload or API-triggered." },
      { icon: "🏦", title: "Multi-currency wallet",   body: "Hold USD, KES, AED, SAR, QAR simultaneously. Convert at best rates." },
      { icon: "🔌", title: "REST API",                body: "Full-featured API with webhooks, idempotency keys, and SDKs for Node, Python, PHP." },
      { icon: "🧾", title: "Invoice financing",       body: "Upload trade invoices. Get advances up to 80% within 24 hours." },
      { icon: "✅", title: "KYB & AML tooling",       body: "Built-in business verification, sanctions screening, and audit trails." },
      { icon: "👔", title: "Dedicated account mgr",   body: "Named account manager, custom SLA, and priority 4-hour response time." },
    ],
    cta: "Open Business Account",
    stat1: { val: "$500K+", lbl: "Avg monthly vol" },
    stat2: { val: "2 days",  lbl: "Onboarding" },
  },
];

const apiSnippet = `// Send money in 3 lines
const sokopay = require('@sokopay/node');
const client = new sokopay.Client(process.env.SOKOPAY_KEY);

const transfer = await client.transfers.create({
  amount: 500,
  currency: 'USD',
  destination: {
    method: 'mpesa',
    phone: '+254712345678',
    country: 'KE',
  },
  note: 'School fees — March',
});

// transfer.status === 'completed' in ~200ms
console.log(transfer.receipt_url);`;

const integrations = [
  { name: "Xero",        icon: "🟦" },
  { name: "QuickBooks",  icon: "🟩" },
  { name: "SAP",         icon: "🔵" },
  { name: "Salesforce",  icon: "☁️" },
  { name: "Zapier",      icon: "⚡" },
  { name: "Slack",       icon: "💬" },
  { name: "Webhooks",    icon: "🔗" },
  { name: "REST API",    icon: "🔌" },
];

export default function ProductsPage() {
  const [active, setActive] = useState<"personal"|"business">("personal");
  const prod = products.find(p => p.id === active)!;

  return (
    <main style={{ fontFamily: "var(--font-body)", overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(155deg, #0B3C5D 0%, #082a44 60%, #051d30 100%)", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.07) 1px, transparent 0)`, backgroundSize: "40px 40px", pointerEvents: "none" }}/>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ display: "inline-block", background: "rgba(0,168,107,0.15)", color: "#00A86B", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "20px", fontFamily: "var(--font-body)" }}>Products</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5.5vw,58px)", fontWeight: "800", color: "#fff", lineHeight: 1.12, margin: "0 0 20px" }}>
            One platform.<br/>
            <span style={{ background: "linear-gradient(135deg, #00A86B, #7ED957)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Two powerful products.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", lineHeight: 1.65, maxWidth: "560px", margin: "0 auto" }}>
            Whether you’re sending $50 home to Nairobi or disbursing payroll to 5,000 workers across the GCC — SOKOPAY has a product built exactly for you.
          </motion.p>
        </div>
      </section>

      {/* TAB SWITCHER */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(11,60,93,0.08)", padding: "0 24px", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "0" }}>
          {products.map(p => (
            <button key={p.id} onClick={() => setActive(p.id as "personal" | "business")}
              style={{
                padding: "18px 32px", border: "none", background: "transparent", cursor: "pointer",
                fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)",
                color: active === p.id ? p.color : "#9AAAB8",
                borderBottom: `3px solid ${active === p.id ? p.color : "transparent"}`,
                transition: "all 0.2s",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT DETAIL */}
      <AnimatePresence mode="wait">
        <motion.section key={active}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          style={{ background: "#F4F6F8", padding: "80px 24px" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", marginBottom: "80px" }}>

              {/* Left */}
              <div>
                <span style={{ display: "inline-block", background: `${prod.color}15`, color: prod.color, fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "16px", fontFamily: "var(--font-body)" }}>
                  {prod.tag}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "38px", fontWeight: "800", color: "#0B3C5D", lineHeight: 1.15, margin: "0 0 16px" }}>{prod.name}</h2>
                <p style={{ color: "#6B7A8D", fontSize: "16px", lineHeight: 1.7, margin: "0 0 28px" }}>{prod.description}</p>

                <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
                  {[prod.stat1, prod.stat2].map(st => (
                    <div key={st.lbl} style={{ padding: "16px 20px", borderRadius: "14px", background: "#fff", border: "1px solid rgba(11,60,93,0.08)", textAlign: "center" }}>
                      <div style={{ fontSize: "24px", fontWeight: "800", color: prod.color, fontFamily: "var(--font-display)" }}>{st.val}</div>
                      <div style={{ fontSize: "12px", color: "#9AAAB8", fontFamily: "var(--font-body)" }}>{st.lbl}</div>
                    </div>
                  ))}
                </div>

                <motion.button whileHover={{ scale: 1.03, boxShadow: `0 10px 36px ${prod.color}40` }} whileTap={{ scale: 0.97 }}
                  style={{ padding: "16px 36px", borderRadius: "14px", background: prod.gradient, color: "#fff", border: "none", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: "pointer" }}>
                  {prod.cta} →
                </motion.button>
              </div>

              {/* Right — image */}
              <motion.div whileHover={{ scale: 1.02 }} style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 64px rgba(11,60,93,0.15)" }}>
                <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }}/>
              </motion.div>
            </div>

            {/* Feature grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {prod.features.map((f, i) => (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: "0 12px 36px rgba(11,60,93,0.1)" }}
                  style={{ padding: "24px", borderRadius: "18px", background: "#fff", border: "1px solid rgba(11,60,93,0.07)" }}
                >
                  <div style={{ fontSize: "26px", marginBottom: "12px" }}>{f.icon}</div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)", marginBottom: "8px" }}>{f.title}</div>
                  <div style={{ fontSize: "13px", color: "#6B7A8D", lineHeight: 1.65 }}>{f.body}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* API PREVIEW (only Business) */}
      <AnimatePresence>
        {active === "business" && (
          <motion.section key="api"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: "#0B3C5D", padding: "100px 24px" }}
          >
            <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
              <div>
                <span style={{ display: "inline-block", background: "rgba(77,168,218,0.15)", color: "#4DA8DA", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", fontFamily: "var(--font-body)" }}>Developer-first</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "38px", fontWeight: "800", color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>
                  Send money with<br/>3 lines of code
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 28px" }}>
                  Our REST API has SDKs for Node.js, Python, PHP, Ruby, and Go. Sandbox environment, idempotency keys, webhooks, and full OpenAPI spec included.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {["Node.js SDK", "Python SDK", "REST API", "Webhooks", "OpenAPI Spec"].map(t => (
                    <span key={t} style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", fontFamily: "var(--font-body)" }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Code block */}
              <div style={{ background: "#020d18", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
                <div style={{ background: "#0a1929", padding: "14px 20px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["#FF5F56","#FFBD2E","#27C93F"].map(c => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}/>)}
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", fontFamily: "var(--font-body)", marginLeft: "6px" }}>transfer.js</span>
                </div>
                <pre style={{ margin: 0, padding: "20px", fontSize: "12px", lineHeight: 1.75, color: "#a8d8ea", fontFamily: "monospace", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                  {apiSnippet.split("\n").map((line, i) => {
                    const colored = line
                      .replace(/(\/\/.*)/g, '<span style="color:#5a6e82">$1</span>')
                      .replace(/('.*?')/g, '<span style="color:#7ed957">$1</span>')
                      .replace(/\b(const|await|require|new|console\.log)\b/g, '<span style="color:#4da8da">$1</span>')
                      .replace(/\b(create|transfers|client)\b/g, '<span style="color:#ffd700">$1</span>');
                    return <div key={i} dangerouslySetInnerHTML={{ __html: colored || "&nbsp;" }}/>;
                  })}
                </pre>
              </div>
            </div>

            {/* Integrations */}
            <div style={{ maxWidth: "1100px", margin: "64px auto 0" }}>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)", textAlign: "center", marginBottom: "28px" }}>
                Integrates with your existing stack
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                {integrations.map((intg, i) => (
                  <motion.div key={intg.name}
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.08, background: "rgba(255,255,255,0.12)" }}
                    style={{ padding: "10px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ fontSize: "16px" }}>{intg.icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)" }}>{intg.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section style={{ background: "#F4F6F8", padding: "80px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <motion.div {...s(0)}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: "800", color: "#0B3C5D", lineHeight: 1.2, margin: "0 0 16px" }}>
              Ready to get started?
            </h2>
            <p style={{ color: "#6B7A8D", fontSize: "16px", lineHeight: 1.7, margin: "0 0 32px" }}>
              Create a free account in 2 minutes. No credit card required.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button whileHover={{ scale: 1.04, boxShadow: "0 10px 36px rgba(0,168,107,0.3)" }} whileTap={{ scale: 0.97 }}
                style={{ padding: "16px 36px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #009e65)", color: "#fff", border: "none", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: "pointer" }}>
                Create Free Account →
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ padding: "16px 36px", borderRadius: "14px", background: "#fff", color: "#0B3C5D", border: "1.5px solid rgba(11,60,93,0.15)", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: "pointer" }}>
                View API Docs
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
