"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const s = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const corridors = [
  {
    id: "ke-ae",
    from: { city: "Nairobi", country: "Kenya",       flag: "🇰🇪", currency: "KES", img: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&q=80" },
    to:   { city: "Dubai",   country: "UAE",         flag: "🇦🇪", currency: "AED", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
    rate: "132.45 KES",
    fee: "0.8%",
    time: "< 60 sec",
    volume: "$480M/yr",
    users: "840K",
    methods: ["M-Pesa", "Bank", "Airtel"],
  },
  {
    id: "ug-sa",
    from: { city: "Kampala", country: "Uganda",      flag: "🇺🇬", currency: "UGX", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80" },
    to:   { city: "Riyadh",  country: "Saudi Arabia",flag: "🇸🇦", currency: "SAR", img: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&q=80" },
    rate: "3,720 UGX",
    fee: "0.9%",
    time: "< 2 min",
    volume: "$210M/yr",
    users: "320K",
    methods: ["Airtel Money", "Bank"],
  },
  {
    id: "tz-qa",
    from: { city: "Dar es Salaam", country: "Tanzania", flag: "🇹🇿", currency: "TZS", img: "https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?w=400&q=80" },
    to:   { city: "Doha",          country: "Qatar",    flag: "🇶🇦", currency: "QAR", img: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=400&q=80" },
    rate: "2,510 TZS",
    fee: "0.85%",
    time: "< 90 sec",
    volume: "$145M/yr",
    users: "180K",
    methods: ["M-Pesa TZ", "Bank"],
  },
  {
    id: "et-ae",
    from: { city: "Addis Ababa", country: "Ethiopia", flag: "🇪🇹", currency: "ETB", img: "https://images.unsplash.com/photo-1580746738099-b2d0ba947754?w=400&q=80" },
    to:   { city: "Abu Dhabi",   country: "UAE",      flag: "🇦🇪", currency: "AED", img: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&q=80" },
    rate: "57.20 ETB",
    fee: "1.0%",
    time: "< 5 min",
    volume: "$290M/yr",
    users: "410K",
    methods: ["Telebirr", "Bank"],
  },
];

const fxTable = [
  { pair: "USD → KES", rate: "132.45", change: "+0.32%", vol: "$480M",  flag1: "🇺🇸", flag2: "🇰🇪", pos: true  },
  { pair: "USD → AED", rate: "3.6725", change: "0.00%",  vol: "$920M",  flag1: "🇺🇸", flag2: "🇦🇪", pos: true  },
  { pair: "USD → SAR", rate: "3.7505", change: "+0.01%", vol: "$680M",  flag1: "🇺🇸", flag2: "🇸🇦", pos: true  },
  { pair: "USD → UGX", rate: "3,720",  change: "-0.33%", vol: "$210M",  flag1: "🇺🇸", flag2: "🇺🇬", pos: false },
  { pair: "USD → TZS", rate: "2,510",  change: "+0.21%", vol: "$145M",  flag1: "🇺🇸", flag2: "🇹🇿", pos: true  },
  { pair: "USD → ETB", rate: "57.20",  change: "-0.11%", vol: "$290M",  flag1: "🇺🇸", flag2: "🇪🇹", pos: false },
  { pair: "AED → KES", rate: "36.07",  change: "+0.08%", vol: "$180M",  flag1: "🇦🇪", flag2: "🇰🇪", pos: true  },
  { pair: "SAR → KES", rate: "35.31",  change: "+0.06%", vol: "$95M",   flag1: "🇸🇦", flag2: "🇰🇪", pos: true  },
];

export default function CorridorsPage() {
  const [selected, setSelected] = useState("ke-ae");
  const corridor = corridors.find(c => c.id === selected)!;

  return (
    <main style={{ fontFamily: "var(--font-body)", overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(155deg, #0B3C5D 0%, #082a44 60%, #051d30 100%)", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.07) 1px, transparent 0)`, backgroundSize: "40px 40px", pointerEvents: "none" }}/>
        <motion.div style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.18) 0%, transparent 65%)", pointerEvents: "none" }}
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity }}/>

        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ display: "inline-block", background: "rgba(0,168,107,0.15)", color: "#00A86B", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "20px", fontFamily: "var(--font-body)" }}>Corridors</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5.5vw,58px)", fontWeight: "800", color: "#fff", lineHeight: 1.12, margin: "0 0 20px" }}>
            The East Africa ↔ GCC<br/>
            <span style={{ background: "linear-gradient(135deg, #00A86B, #7ED957)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>payment rails</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", lineHeight: 1.65, maxWidth: "560px", margin: "0 auto 40px" }}>
            SOKOPAY covers every major hub on both sides of the Indian Ocean. Best FX rates. Sub-3-minute delivery. Zero hidden fees.
          </motion.p>

          {/* Hero ticker */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: "inline-flex", gap: "28px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "16px 28px", flexWrap: "wrap", justifyContent: "center" }}>
            {[["4","Corridors covered"], ["$18B","Annual corridor flow"], ["0.8%","Avg fee"], ["< 3 min","Avg delivery"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff", fontFamily: "var(--font-display)" }}>{v}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORRIDOR SELECTOR */}
      <section style={{ background: "#F4F6F8", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...s(0)} style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 6px" }}>Explore corridors</h2>
            <p style={{ color: "#6B7A8D", fontSize: "15px", margin: 0 }}>Click a corridor to see live rates, delivery times, and supported methods.</p>
          </motion.div>

          {/* Corridor tabs */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
            {corridors.map(c => (
              <motion.button key={c.id}
                onClick={() => setSelected(c.id)}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                style={{
                  padding: "10px 20px", borderRadius: "12px",
                  border: `2px solid ${selected === c.id ? "#00A86B" : "rgba(11,60,93,0.1)"}`,
                  background: selected === c.id ? "rgba(0,168,107,0.08)" : "#fff",
                  color: selected === c.id ? "#00A86B" : "#374a60",
                  fontSize: "14px", fontWeight: "700", cursor: "pointer",
                  fontFamily: "var(--font-display)", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                {c.from.flag} {c.from.city} → {c.to.flag} {c.to.city}
              </motion.button>
            ))}
          </div>

          {/* Corridor detail */}
          <AnimatePresence mode="wait">
            <motion.div key={selected}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
            >
              {/* Images */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative" }}>
                  <img src={corridor.from.img} alt={corridor.from.city} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}/>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(11,60,93,0.7) 0%, transparent 50%)" }}/>
                  <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                    <div style={{ fontSize: "18px" }}>{corridor.from.flag}</div>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px", fontFamily: "var(--font-display)" }}>{corridor.from.city}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{corridor.from.country}</div>
                  </div>
                </div>
                <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative" }}>
                  <img src={corridor.to.img} alt={corridor.to.city} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}/>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(11,60,93,0.7) 0%, transparent 50%)" }}/>
                  <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                    <div style={{ fontSize: "18px" }}>{corridor.to.flag}</div>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px", fontFamily: "var(--font-display)" }}>{corridor.to.city}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{corridor.to.country}</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", border: "1px solid rgba(11,60,93,0.08)", boxShadow: "0 4px 20px rgba(11,60,93,0.06)" }}>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)", marginBottom: "20px" }}>
                  {corridor.from.flag} {corridor.from.city} → {corridor.to.flag} {corridor.to.city}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  {[
                    { label: "Exchange Rate",    value: `1 USD = ${corridor.rate}` },
                    { label: "SOKOPAY Fee",      value: corridor.fee              },
                    { label: "Avg Delivery",     value: corridor.time             },
                    { label: "Annual Volume",    value: corridor.volume           },
                    { label: "Active Users",     value: corridor.users            },
                  ].map(r => (
                    <div key={r.label} style={{ padding: "12px", borderRadius: "12px", background: "#F4F6F8" }}>
                      <div style={{ fontSize: "11px", color: "#9AAAB8", fontFamily: "var(--font-body)", marginBottom: "3px" }}>{r.label}</div>
                      <div style={{ fontSize: "16px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>{r.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#9AAAB8", fontFamily: "var(--font-body)", marginBottom: "8px" }}>Supported payout methods</div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {corridor.methods.map(m => (
                      <span key={m} style={{ padding: "4px 12px", borderRadius: "8px", background: "rgba(0,168,107,0.08)", color: "#00A86B", fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-body)" }}>{m}</span>
                    ))}
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(0,168,107,0.3)" }} whileTap={{ scale: 0.97 }}
                  style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #00A86B, #009e65)", color: "#fff", border: "none", fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: "pointer" }}>
                  Send on this corridor →
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FX RATES TABLE */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...s(0)} style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span style={{ display: "inline-block", background: "rgba(0,168,107,0.1)", color: "#00A86B", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "12px", fontFamily: "var(--font-body)" }}>Live FX Rates</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: "800", color: "#0B3C5D", margin: 0 }}>Today’s rates</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <motion.div animate={{ opacity: [1,0.2,1] }} transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00A86B" }}/>
                <span style={{ color: "#9AAAB8", fontSize: "13px", fontFamily: "var(--font-body)" }}>Updated live · {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>

          <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(11,60,93,0.08)", boxShadow: "0 4px 20px rgba(11,60,93,0.06)" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", padding: "14px 24px", background: "#F4F6F8", borderBottom: "1px solid rgba(11,60,93,0.06)" }}>
              {["Currency Pair", "Exchange Rate", "24h Change", "Volume"].map(h => (
                <span key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#9AAAB8", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>{h}</span>
              ))}
            </div>
            {fxTable.map((fx, i) => (
              <motion.div key={fx.pair}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ background: "#FAFBFC" }}
                style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", padding: "16px 24px", borderBottom: i < fxTable.length - 1 ? "1px solid rgba(11,60,93,0.05)" : "none", alignItems: "center", transition: "background 0.15s" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>{fx.flag1}</span>
                  <span style={{ fontSize: "12px", color: "#9AAAB8" }}>→</span>
                  <span style={{ fontSize: "16px" }}>{fx.flag2}</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>{fx.pair}</span>
                </div>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>{fx.rate}</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: fx.pos ? "#00A86B" : "#FF6B6B" }}>
                  {fx.pos ? "▲" : "▼"} {fx.change}
                </span>
                <span style={{ fontSize: "13px", color: "#6B7A8D", fontFamily: "var(--font-body)" }}>{fx.vol}/yr</span>
              </motion.div>
            ))}
          </div>

          <motion.p {...s(0)} style={{ color: "#9AAAB8", fontSize: "12px", fontFamily: "var(--font-body)", marginTop: "12px", textAlign: "center" }}>
            Rates shown are mid-market. SOKOPAY charges a flat 0.8–1.0% fee. No hidden markup.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(155deg, #0B3C5D 0%, #082a44 100%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <motion.div {...s(0)}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: "800", color: "#fff", lineHeight: 1.2, margin: "0 0 16px" }}>
              Ready to move money<br/>across the corridor?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 32px" }}>
              Rates lock for 30 minutes. Transfer completes in under 3 minutes.
            </p>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,168,107,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ padding: "17px 42px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #009e65)", color: "#fff", border: "none", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: "pointer" }}>
              Send Now — Lock Rate →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
