"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from "framer-motion";
import Link from "next/link";

// ── Animated counter ───────────────────────────────────────────────────────────
function Counter({ from = 0, to, decimals = 2, prefix = "", suffix = "", duration = 1.6 }: {
  from?: number; to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(from);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(from.toFixed(decimals));

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => spring.on("change", v => setDisplay(v.toFixed(decimals))), [spring, decimals]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ── Sparkline ──────────────────────────────────────────────────────────────────
function Sparkline({ data, color, height = 56 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 220;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / (max - min || 1)) * (height - 8) - 4;
    return `${x},${y}`;
  });
  const path = `M ${pts.join(" L ")}`;
  const fill = `M 0,${height} L ${pts.join(" L ")} L ${w},${height} Z`;
  const lastPt = pts[pts.length - 1].split(",");

  return (
    <svg width={w} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sf-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <motion.path d={fill} fill={`url(#sf-${color.replace("#","")})`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}/>
      <motion.path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}/>
      <motion.circle cx={lastPt[0]} cy={lastPt[1]} r="4.5" fill={color}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9, type: "spring", stiffness: 300 }}/>
      <motion.circle cx={lastPt[0]} cy={lastPt[1]} r="4.5" fill="none" stroke={color} strokeWidth="1.5"
        animate={{ r: [4.5, 12, 4.5], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}/>
    </svg>
  );
}

// ── Bar chart ──────────────────────────────────────────────────────────────────
const monthlyData = [320, 480, 290, 670, 520, 810, 620, 750, 890, 720, 1050, 970];
const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];

function BarChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const max = Math.max(...monthlyData);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
      {monthlyData.map((v, i) => {
        const pct = v / max;
        const isLast = i === monthlyData.length - 1;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "bottom" }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                width: "100%",
                height: `${pct * 72}px`,
                borderRadius: "4px 4px 2px 2px",
                background: isLast
                  ? "linear-gradient(180deg, #00A86B, #7ED957)"
                  : "rgba(11,60,93,0.12)",
                transformOrigin: "bottom",
              }}
            />
            <span style={{ fontSize: "9px", color: isLast ? "#00A86B" : "#9AAAB8", fontFamily: "var(--font-body)", fontWeight: isLast ? "700" : "400" }}>
              {months[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    completed:  { bg: "rgba(0,168,107,0.1)",  color: "#00A86B", label: "Completed" },
    processing: { bg: "rgba(77,168,218,0.12)", color: "#4DA8DA", label: "Processing" },
    failed:     { bg: "rgba(220,50,50,0.1)",   color: "#DC3232", label: "Failed" },
  };
  const s = map[status] || map.completed;
  return (
    <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 9px", borderRadius: "100px", background: s.bg, color: s.color, fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
      {status === "processing" && (
        <motion.span animate={{ opacity: [1,0.2,1] }} transition={{ duration: 1, repeat: Infinity }}
          style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: s.color }}
        />
      )}
      {s.label}
    </span>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
const wallets = [
  { currency: "USD", symbol: "$",   balance: 4280.50, flag: "🇺🇸", trend: "+12.4%", positive: true },
  { currency: "KES", symbol: "KSh", balance: 142800,  flag: "🇰🇪", trend: "+2.1%",  positive: true },
  { currency: "AED", symbol: "د.إ", balance: 3200,    flag: "🇦🇪", trend: "0.0%",   positive: true },
  { currency: "SAR", symbol: "﷼",   balance: 8750,    flag: "🇸🇦", trend: "-0.3%",  positive: false },
];

const quickActions = [
  { label: "Send",    href: "/dashboard/send",     icon: "↗", color: "#00A86B", bg: "rgba(0,168,107,0.1)"  },
  { label: "Receive", href: "/dashboard/receive",  icon: "↙", color: "#4DA8DA", bg: "rgba(77,168,218,0.1)" },
  { label: "Convert", href: "/dashboard/exchange", icon: "⇄", color: "#7ED957", bg: "rgba(126,217,87,0.1)" },
  { label: "Top Up",  href: "/dashboard/topup",    icon: "+", color: "#FFB800", bg: "rgba(255,184,0,0.1)"  },
];

const recentTransfers = [
  { id: "T001", name: "Amara Osei",          avatar: "https://i.pravatar.cc/40?img=3",  direction: "sent",     amount: -320,  received: "KSh 42,384", method: "M-Pesa",       status: "completed",  date: "Today, 10:42 AM", flag: "🇰🇪" },
  { id: "T002", name: "Salary — BuildRight", avatar: null, initials: "BR",              direction: "received", amount: +2400, received: null,          method: "Bank Wire",    status: "completed",  date: "Today, 08:00 AM", flag: "🇦🇪" },
  { id: "T003", name: "Fatima Al-Rashid",    avatar: "https://i.pravatar.cc/40?img=5",  direction: "sent",     amount: -850,  received: "SAR 3,188",  method: "Bank",         status: "completed",  date: "Yesterday",       flag: "🇸🇦" },
  { id: "T004", name: "David Kimani",        avatar: "https://i.pravatar.cc/40?img=8",  direction: "sent",     amount: -175,  received: "UGX 651K",   method: "Airtel Money", status: "processing", date: "Yesterday",       flag: "🇺🇬" },
  { id: "T005", name: "Top-Up via Visa",     avatar: null, initials: "💳",             direction: "received", amount: +1000, received: null,          method: "Card",         status: "completed",  date: "Mar 5",           flag: "💳" },
];

const fxRates = [
  { pair: "USD/KES", rate: "132.45", change: "+0.32", pos: true  },
  { pair: "USD/AED", rate: "3.6725", change: "0.00",  pos: true  },
  { pair: "USD/UGX", rate: "3,720",  change: "-12.3", pos: false },
  { pair: "USD/TZS", rate: "2,510",  change: "+5.2",  pos: true  },
  { pair: "USD/SAR", rate: "3.7505", change: "+0.01", pos: true  },
  { pair: "USD/QAR", rate: "3.6401", change: "-0.00", pos: false },
  { pair: "AED/KES", rate: "36.07",  change: "+0.08", pos: true  },
];

const notifications = [
  { text: "Transfer to Amara complete",    time: "2m ago",  icon: "✓", color: "#00A86B" },
  { text: "KES rate improved — lock now",  time: "14m ago", icon: "⚡", color: "#FFB800" },
  { text: "New recipient: D. Kimani",      time: "1h ago",  icon: "👤", color: "#4DA8DA" },
];

const spendLine = [420, 380, 650, 480, 720, 590, 840, 750, 920, 880, 1050, 970];

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [walletIdx,      setWalletIdx]      = useState(0);
  const [showNotifs,     setShowNotifs]     = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const activeWallet = wallets[walletIdx];

  // stagger helper
  const s = (i: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.48, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#EEF1F5" }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          background: "#fff", borderBottom: "1px solid rgba(11,60,93,0.07)",
          padding: "0 32px", display: "flex", alignItems: "center",
          justifyContent: "space-between", height: "64px", flexShrink: 0,
          position: "sticky", top: 0, zIndex: 30,
          boxShadow: "0 2px 20px rgba(11,60,93,0.04)",
        }}
      >
        <div>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", lineHeight: 1.2 }}>
            Good morning, Hassan 👋
          </div>
          <div style={{ fontSize: "12px", color: "#9AAAB8", fontFamily: "var(--font-body)" }}>
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Notification bell */}
          <div style={{ position: "relative" }}>
            <motion.button
              whileHover={{ background: "#F4F6F8", scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowNotifs(v => !v)}
              style={{ width: "40px", height: "40px", borderRadius: "11px", border: "1.5px solid rgba(11,60,93,0.1)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", position: "relative" }}
            >
              🔔
              <motion.span
                animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", background: "#00A86B", border: "2px solid #fff" }}
              />
            </motion.button>

            <AnimatePresence>
              {showNotifs && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }}
                  style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: "300px", background: "#fff", borderRadius: "16px", boxShadow: "0 20px 60px rgba(11,60,93,0.18)", border: "1px solid rgba(11,60,93,0.07)", overflow: "hidden", zIndex: 50 }}
                >
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(11,60,93,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>Notifications</span>
                    <span style={{ fontSize: "11px", color: "#00A86B", fontWeight: "700", cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {notifications.map((n, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 16px", borderBottom: i < notifications.length - 1 ? "1px solid rgba(11,60,93,0.05)" : "none" }}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: `${n.color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{n.icon}</div>
                      <div>
                        <div style={{ fontSize: "13px", color: "#374a60", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>{n.text}</div>
                        <div style={{ fontSize: "11px", color: "#9AAAB8", marginTop: "2px" }}>{n.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <motion.div whileHover={{ scale: 1.03 }} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="https://i.pravatar.cc/40?img=12" alt="Hassan"
              style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(0,168,107,0.35)" }}/>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>Hassan A.</div>
              <div style={{ fontSize: "11px", color: "#9AAAB8" }}>Personal ✦</div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* ── FX TICKER ─────────────────────────────────────────────────────────── */}
      <div style={{ background: "#0B3C5D", overflow: "hidden", height: "36px", display: "flex", alignItems: "center", position: "relative" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {[...fxRates, ...fxRates].map((fx, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "0 28px", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", fontFamily: "var(--font-body)", fontWeight: "600", letterSpacing: "0.06em" }}>{fx.pair}</span>
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-display)" }}>{fx.rate}</span>
              <span style={{ fontSize: "11px", color: fx.pos ? "#7ED957" : "#FF6B6B", fontWeight: "600" }}>
                {fx.pos ? "▲" : "▼"} {fx.change}
              </span>
            </div>
          ))}
        </motion.div>
        <div style={{ position: "absolute", right: 0, background: "#0B3C5D", padding: "0 14px", height: "36px", display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
          <motion.div animate={{ opacity: [1,0.15,1] }} transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00A86B" }}/>
          <span style={{ color: "#00A86B", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", fontFamily: "var(--font-body)" }}>LIVE</span>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: "28px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Row 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: "20px" }}>

          {/* WALLET CARD */}
          <motion.div {...s(0)} style={{
            background: "linear-gradient(145deg, #0B3C5D 0%, #0f5080 55%, #082a44 100%)",
            borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden", minHeight: "220px",
          }}>
            {/* Animated grid */}
            <motion.div
              animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.1) 1px, transparent 0)`, backgroundSize: "28px 28px", pointerEvents: "none" }}
            />
            {/* Glow orbs */}
            <motion.div
              animate={{ scale: [1,1.2,1], opacity: [0.2,0.35,0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ position: "absolute", top: "-60px", right: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.3) 0%, transparent 70%)", pointerEvents: "none" }}
            />
            <motion.div
              animate={{ scale: [1,1.15,1], opacity: [0.15,0.28,0.15] }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
              style={{ position: "absolute", bottom: "-80px", left: "25%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(77,168,218,0.25) 0%, transparent 70%)", pointerEvents: "none" }}
            />

            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: "6px" }}>Total Balance</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={walletIdx}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.28 }}
                        style={{ display: "flex", alignItems: "baseline", gap: "4px" }}
                      >
                        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: "700" }}>
                          {activeWallet.symbol}
                        </span>
                        <span style={{
                          fontSize: "50px", fontWeight: "800", color: "#fff",
                          fontFamily: "var(--font-display)", lineHeight: 1, letterSpacing: "-0.02em",
                          filter: balanceVisible ? "none" : "blur(14px)",
                          transition: "filter 0.3s",
                          userSelect: balanceVisible ? "auto" : "none",
                        }}>
                          {balanceVisible
                            ? <Counter to={activeWallet.balance} decimals={2} duration={1.4}/>
                            : "••••••"
                          }
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    <button onClick={() => setBalanceVisible(v=>!v)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "17px", padding: "0 4px", lineHeight: 1 }}>
                      {balanceVisible ? "👁" : "🙈"}
                    </button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}
                  >
                    <span style={{ fontSize: "13px", color: activeWallet.positive ? "#7ED957" : "#FF6B6B", fontWeight: "700" }}>
                      {activeWallet.positive ? "▲" : "▼"} {activeWallet.trend}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.32)", fontSize: "12px" }}>this month</span>
                  </motion.div>
                </div>

                {/* Currency tabs */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {wallets.map((w, i) => (
                    <motion.button key={w.currency}
                      onClick={() => setWalletIdx(i)}
                      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
                      style={{
                        padding: "5px 12px", borderRadius: "8px",
                        border: `1.5px solid ${walletIdx===i ? "rgba(0,168,107,0.6)" : "rgba(255,255,255,0.1)"}`,
                        background: walletIdx===i ? "rgba(0,168,107,0.18)" : "rgba(255,255,255,0.05)",
                        color: walletIdx===i ? "#7ED957" : "rgba(255,255,255,0.4)",
                        fontSize: "12px", fontWeight: "700", cursor: "pointer",
                        fontFamily: "var(--font-display)", transition: "all 0.15s",
                      }}
                    >{w.flag} {w.currency}</motion.button>
                  ))}
                </div>
              </div>

              {/* Sparkline + monthly avg */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "6px", fontFamily: "var(--font-body)" }}>Sent this year</div>
                  <Sparkline data={spendLine} color="#00A86B"/>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "4px", fontFamily: "var(--font-body)" }}>Monthly avg</div>
                  <div style={{ color: "#fff", fontSize: "22px", fontWeight: "800", fontFamily: "var(--font-display)" }}>
                    <Counter to={780} decimals={0} prefix="$"/>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QUICK ACTIONS + MINI STATS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <motion.div {...s(1)} style={{ background: "#fff", borderRadius: "20px", padding: "20px", boxShadow: "0 2px 16px rgba(11,60,93,0.06)", border: "1px solid rgba(11,60,93,0.06)" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#9AAAB8", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: "14px" }}>Quick Actions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {quickActions.map((a, i) => (
                  <Link key={a.label} href={a.href} style={{ textDecoration: "none" }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 260, damping: 14 }}
                      whileHover={{ y: -4, boxShadow: `0 8px 24px ${a.color}25` }}
                      whileTap={{ scale: 0.94 }}
                      style={{ padding: "14px 12px", borderRadius: "14px", background: a.bg, border: `1px solid ${a.color}22`, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer" }}
                    >
                      <span style={{ fontSize: "22px", color: a.color, fontWeight: "700" }}>{a.icon}</span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#374a60", fontFamily: "var(--font-display)" }}>{a.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Mini stats */}
            <motion.div {...s(2)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Sent (Mar)",  value: 1345,  prefix: "$", color: "#00A86B", icon: "↗", decimals: 0 },
                { label: "Received",    value: 3400,  prefix: "$", color: "#4DA8DA", icon: "↙", decimals: 0 },
                { label: "Transfers",   value: 12,    prefix: "",  color: "#7ED957", icon: "⇄", decimals: 0 },
                { label: "Fees saved",  value: 48.20, prefix: "$", color: "#FFB800", icon: "💰", decimals: 2 },
              ].map((s2, i) => (
                <motion.div key={s2.label}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  whileHover={{ y: -3, boxShadow: `0 6px 20px ${s2.color}18` }}
                  style={{ background: "#fff", borderRadius: "14px", padding: "14px", boxShadow: "0 2px 12px rgba(11,60,93,0.05)", border: "1px solid rgba(11,60,93,0.06)" }}
                >
                  <div style={{ fontSize: "16px", marginBottom: "4px" }}>{s2.icon}</div>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                    <Counter to={s2.value} decimals={s2.decimals} prefix={s2.prefix}/>
                  </div>
                  <div style={{ fontSize: "11px", color: "#9AAAB8", fontFamily: "var(--font-body)", marginTop: "3px" }}>{s2.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: "20px" }}>

          {/* RECENT TRANSFERS */}
          <motion.div {...s(3)} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 16px rgba(11,60,93,0.06)", border: "1px solid rgba(11,60,93,0.06)" }}>
            <div style={{ padding: "18px 22px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(11,60,93,0.06)" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>Recent Transfers</div>
              <Link href="/dashboard/transactions" style={{ textDecoration: "none" }}>
                <motion.span whileHover={{ color: "#00A86B", x: 2 }} style={{ fontSize: "12px", fontWeight: "600", color: "#9AAAB8", fontFamily: "var(--font-body)", cursor: "pointer", display: "inline-block", transition: "color 0.2s" }}>
                  View all →
                </motion.span>
              </Link>
            </div>
            {recentTransfers.map((tx, i) => (
              <motion.div key={tx.id}
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.07 }}
                whileHover={{ background: "#FAFBFC", x: 2 }}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 22px", borderBottom: i < recentTransfers.length - 1 ? "1px solid rgba(11,60,93,0.04)" : "none", transition: "background 0.15s" }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {tx.avatar ? (
                    <img src={tx.avatar} alt={tx.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}/>
                  ) : (
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: tx.direction==="received" ? "rgba(0,168,107,0.12)" : "rgba(77,168,218,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                      {tx.initials}
                    </div>
                  )}
                  <span style={{ position: "absolute", bottom: "-2px", right: "-2px", fontSize: "11px" }}>{tx.flag}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: "600", color: "#0B3C5D", fontSize: "13px", fontFamily: "var(--font-display)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.name}</div>
                  <div style={{ color: "#9AAAB8", fontSize: "11px" }}>{tx.method} · {tx.date}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: "800", fontSize: "14px", color: tx.direction==="received" ? "#00A86B" : "#0B3C5D", fontFamily: "var(--font-display)" }}>
                    {tx.direction==="received" ? "+" : ""}{tx.amount < 0 ? "-" : ""}${Math.abs(tx.amount).toLocaleString()}
                  </div>
                  <StatusBadge status={tx.status}/>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* BAR CHART */}
          <motion.div {...s(4)} style={{ background: "#fff", borderRadius: "20px", padding: "20px 22px", boxShadow: "0 2px 16px rgba(11,60,93,0.06)", border: "1px solid rgba(11,60,93,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)", marginBottom: "2px" }}>Monthly Sent</div>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>
                  <Counter to={9380} decimals={0} prefix="$"/>
                </div>
                <div style={{ fontSize: "12px", color: "#00A86B", fontWeight: "600", marginTop: "2px" }}>▲ 28.4% vs last year</div>
              </div>
              <div style={{ padding: "6px 12px", borderRadius: "9px", background: "rgba(0,168,107,0.08)", border: "1px solid rgba(0,168,107,0.15)" }}>
                <span style={{ fontSize: "12px", color: "#00A86B", fontWeight: "700" }}>2025</span>
              </div>
            </div>
            <BarChart/>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Rate alert */}
            <motion.div {...s(5)} style={{ background: "linear-gradient(135deg, rgba(0,168,107,0.09), rgba(126,217,87,0.05))", borderRadius: "18px", padding: "18px", border: "1px solid rgba(0,168,107,0.22)" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  style={{ fontSize: "22px" }}>⚡</motion.div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)", marginBottom: "3px" }}>Best rate now</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#00A86B", fontFamily: "var(--font-display)", marginBottom: "3px" }}>
                    1 USD = 132.45 KES
                  </div>
                  <div style={{ fontSize: "11px", color: "#6B7A8D", marginBottom: "12px" }}>▲ 0.32 from yesterday</div>
                  <motion.button whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(0,168,107,0.3)" }} whileTap={{ scale: 0.96 }}
                    style={{ background: "linear-gradient(135deg, #00A86B, #009e65)", color: "#fff", border: "none", borderRadius: "10px", padding: "9px 18px", fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: "pointer" }}>
                    Send Now →
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Scheduled */}
            <motion.div {...s(6)} style={{ background: "#fff", borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 12px rgba(11,60,93,0.05)", border: "1px solid rgba(11,60,93,0.06)" }}>
              <div style={{ padding: "14px 16px 10px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(11,60,93,0.05)" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>Scheduled</div>
                <span style={{ fontSize: "12px", color: "#00A86B", fontWeight: "600", cursor: "pointer" }}>+ Add</span>
              </div>
              {[
                { name: "Amara Osei",    avatar: "https://i.pravatar.cc/40?img=3", flag: "🇰🇪", amount: 320,  date: "Mar 15", repeat: "Weekly"  },
                { name: "Dubai Rent",    avatar: null, initials: "🏠",             flag: "🇦🇪", amount: 1200, date: "Apr 1",  repeat: "Monthly" },
              ].map((sch, i) => (
                <motion.div key={sch.name}
                  whileHover={{ background: "#FAFBFC" }}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 16px", borderBottom: i === 0 ? "1px solid rgba(11,60,93,0.04)" : "none", transition: "background 0.15s" }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    {sch.avatar ? <img src={sch.avatar} alt={sch.name} style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }}/> :
                      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(11,60,93,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{sch.initials}</div>}
                    <span style={{ position: "absolute", bottom: "-2px", right: "-2px", fontSize: "10px" }}>{sch.flag}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", color: "#0B3C5D", fontSize: "12px", fontFamily: "var(--font-display)" }}>{sch.name}</div>
                    <div style={{ fontSize: "10px", color: "#9AAAB8" }}>{sch.repeat} · {sch.date}</div>
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "#374a60", fontFamily: "var(--font-display)" }}>${sch.amount}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* KYC prompt */}
            <motion.div {...s(7)}
              whileHover={{ scale: 1.01 }}
              style={{ background: "linear-gradient(135deg, #0B3C5D, #0e4878)", borderRadius: "18px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px" }}
            >
              <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                🛡️
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#fff", fontFamily: "var(--font-display)", marginBottom: "2px" }}>Verify to unlock more</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>Higher limits & business features</div>
              </div>
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "9px", padding: "7px 13px", color: "#fff", fontSize: "11px", fontWeight: "700", cursor: "pointer", fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
                Verify →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
