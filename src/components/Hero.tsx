"use client";

import { useEffect, useState } from "react";

const TRANSFER_FEED = [
  { flag: "🇰🇪", name: "Nairobi",       amount: "$240", to: "🇦🇪 Dubai",      time: "just now" },
  { flag: "🇺🇬", name: "Kampala",       amount: "$180", to: "🇸🇦 Riyadh",     time: "12s ago" },
  { flag: "🇹🇿", name: "Dar es Salaam", amount: "$95",  to: "🇦🇪 Abu Dhabi",  time: "28s ago" },
  { flag: "🇪🇹", name: "Addis Ababa",   amount: "$310", to: "🇶🇦 Doha",       time: "45s ago" },
  { flag: "🇷🇼", name: "Kigali",        amount: "$120", to: "🇰🇼 Kuwait",      time: "1m ago"  },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setCardVisible(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTickerIndex(p => (p + 1) % TRANSFER_FEED.length), 2800);
    return () => clearInterval(interval);
  }, []);

  const ticker = TRANSFER_FEED[tickerIndex];

  return (
    <section style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0B3C5D 0%, #0d4a72 40%, #0a5c3a 100%)", display: "flex", alignItems: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
      {/* Background layers */}
      <div style={{ position: "absolute", top: "-100px", right: "-80px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.18) 0%, transparent 65%)", pointerEvents: "none", animation: "slowFloat 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(77,168,218,0.12) 0%, transparent 65%)", pointerEvents: "none", animation: "slowFloat 14s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      {[300, 500, 700].map((size, i) => (
        <div key={size} style={{ position: "absolute", top: "50%", right: "5%", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", transform: "translateY(-50%)", pointerEvents: "none", animation: `spin ${20 + i * 8}s linear infinite` }} />
      ))}

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", gap: "60px", alignItems: "center", position: "relative", zIndex: 1 }}>
        {/* Left — copy */}
        <div style={{ flex: "1.1", minWidth: "340px" }}>
          {/* Live ticker badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "100px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", marginBottom: "32px", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7ED957", animation: "pulse 2s ease infinite", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)" }}>
              {ticker.flag} {ticker.name} → {ticker.to} · {ticker.amount} · <span style={{ color: "#7ED957" }}>{ticker.time}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ margin: "0 0 24px", fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-2.5px", lineHeight: 1.08, color: "white", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 100ms, transform 0.7s ease 100ms" }}>
            Move Money<br />Across Borders.<br />
            <span style={{ background: "linear-gradient(135deg, #7ED957 0%, #00A86B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Instantly.</span>
          </h1>

          <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", maxWidth: "480px", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms" }}>
            SOKOPAY connects businesses and individuals across East Africa and the GCC with fast, secure, and affordable cross-border payments.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 300ms, transform 0.7s ease 300ms" }}>
            {/* → /signup */}
            <a href="/signup"
              style={{ padding: "16px 32px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", boxShadow: "0 8px 28px rgba(0,168,107,0.4)", letterSpacing: "-0.3px", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(0,168,107,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,168,107,0.4)"; }}
            >
              Get Started Free
            </a>
            {/* Smooth scroll to how-it-works */}
            <a href="#how-it-works"
              style={{ padding: "16px 32px", borderRadius: "14px", background: "rgba(255,255,255,0.08)", color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "600", fontFamily: "var(--font-display)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", letterSpacing: "-0.3px", transition: "background 0.2s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
            >
              See How It Works →
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "28px", marginTop: "48px", opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 500ms" }}>
            {[{ value: "15+", label: "Corridors" }, { value: "$2B+", label: "Processed" }, { value: "50K+", label: "Businesses" }, { value: "< 60s", label: "Transfer time" }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "white", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — glass card */}
        <div style={{ flex: "1", minWidth: "300px", maxWidth: "440px", opacity: cardVisible ? 1 : 0, transform: cardVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <div style={{ borderRadius: "28px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(24px)", padding: "32px", boxShadow: "0 24px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "white", fontFamily: "var(--font-display)" }}>Send Money</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "100px", background: "rgba(126,217,87,0.15)", border: "1px solid rgba(126,217,87,0.3)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7ED957", animation: "pulse 2s ease infinite" }} />
                <span style={{ color: "#7ED957", fontSize: "11px", fontWeight: "700", fontFamily: "var(--font-body)" }}>LIVE RATE</span>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "8px" }}>You Send</div>
              <div style={{ padding: "16px 18px", borderRadius: "14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: "800", color: "white", fontFamily: "var(--font-display)", letterSpacing: "-1px" }}>$250</span>
                <span style={{ padding: "5px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)" }}>🇺🇸 USD</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,168,107,0.2)", border: "1px solid rgba(0,168,107,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00A86B", fontSize: "14px", cursor: "pointer" }}>⇅</div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "8px" }}>They Receive</div>
              <div style={{ padding: "16px 18px", borderRadius: "14px", background: "rgba(0,168,107,0.1)", border: "1px solid rgba(0,168,107,0.25)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: "800", color: "#7ED957", fontFamily: "var(--font-display)", letterSpacing: "-1px" }}>32,500</span>
                <span style={{ padding: "5px 12px", borderRadius: "8px", background: "rgba(0,168,107,0.15)", color: "#7ED957", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)" }}>🇰🇪 KES</span>
              </div>
            </div>

            <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "var(--font-body)" }}>1 USD = 130 KES</span>
              <span style={{ color: "#7ED957", fontSize: "12px", fontWeight: "600", fontFamily: "var(--font-body)" }}>Zero fees ✓</span>
            </div>

            {/* Send button → /signup */}
            <a href="/signup" style={{ display: "block", textAlign: "center", padding: "15px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,168,107,0.4)", letterSpacing: "-0.2px" }}>
              Send $250 Instantly →
            </a>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", gap: "16px" }}>
              {["⚡ Under 60s", "🔒 Encrypted", "✓ No hidden fees"].map(b => (
                <span key={b} style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Floating notification */}
          <div style={{ marginTop: "16px", padding: "16px 20px", borderRadius: "18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", gap: "14px", animation: "floatCard 4s ease-in-out infinite" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(0,168,107,0.3), rgba(126,217,87,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>✅</div>
            <div>
              <div style={{ color: "white", fontSize: "13px", fontWeight: "700", fontFamily: "var(--font-display)" }}>Transfer delivered</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "var(--font-body)", marginTop: "2px" }}>Mama Wanjiku received KES 31,200</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#7ED957", fontSize: "11px", fontWeight: "600", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>48s</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slowFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-30px); } }
        @keyframes floatCard { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.85); } }
        @keyframes spin { from { transform:translateY(-50%) rotate(0deg); } to { transform:translateY(-50%) rotate(360deg); } }
      `}</style>
    </section>
  );
}
