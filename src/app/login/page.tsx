"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Live transfer feed data ──────────────────────────────────────────────────
const transfers = [
  { from: "Nairobi, KE 🇰🇪", to: "Dubai, UAE 🇦🇪", amount: "$320", time: "2s ago", avatar: "https://i.pravatar.cc/40?img=1" },
  { from: "Kampala, UG 🇺🇬", to: "Riyadh, SA 🇸🇦", amount: "$850", time: "8s ago", avatar: "https://i.pravatar.cc/40?img=2" },
  { from: "Dar es Salaam, TZ 🇹🇿", to: "Abu Dhabi, UAE 🇦🇪", amount: "$175", time: "15s ago", avatar: "https://i.pravatar.cc/40?img=5" },
  { from: "Addis Ababa, ET 🇪🇹", to: "Dubai, UAE 🇦🇪", amount: "$1,200", time: "22s ago", avatar: "https://i.pravatar.cc/40?img=7" },
  { from: "Lagos, NG 🇳🇬", to: "Doha, QA 🇶🇦", amount: "$450", time: "31s ago", avatar: "https://i.pravatar.cc/40?img=9" },
  { from: "Nairobi, KE 🇰🇪", to: "Sharjah, UAE 🇦🇪", amount: "$680", time: "45s ago", avatar: "https://i.pravatar.cc/40?img=11" },
];

// ── Loading dots ─────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", justifyContent: "center" }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.6, delay: i * 0.12, repeat: Infinity }}
          style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }}
        />
      ))}
    </div>
  );
}

// ── Transfer card ─────────────────────────────────────────────────────────────
function TransferCard({ t, delay }: { t: typeof transfers[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        marginBottom: "10px",
      }}
    >
      <img src={t.avatar} alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", fontFamily: "var(--font-body)" }}>{t.from}</span>
          <span style={{ color: "#00A86B", fontSize: "12px" }}>→</span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", fontFamily: "var(--font-body)" }}>{t.to}</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-body)" }}>{t.time}</div>
      </div>
      <div style={{
        color: "#7ED957",
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "var(--font-display)",
      }}>{t.amount}</div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [view, setView] = useState<"login" | "forgot" | "forgot-success">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [activeTransfers, setActiveTransfers] = useState(transfers.slice(0, 4));

  // Cycle new transfer every 3s
  useEffect(() => {
    let idx = 4;
    const interval = setInterval(() => {
      setActiveTransfers(prev => {
        const next = [...prev.slice(1), transfers[idx % transfers.length]];
        idx++;
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleLogin(e: React.MouseEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  }

  function handleForgot(e: React.MouseEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setView("forgot-success"); }, 1800);
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "var(--font-body)",
    }}>

      {/* ── LEFT PANEL — Live feed ──────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: "0 0 480px",
        background: "linear-gradient(155deg, #0B3C5D 0%, #082a44 60%, #051d30 100%)",
        padding: "48px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.1) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,168,107,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px", position: "relative" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: "linear-gradient(135deg, #00A86B, #7ED957)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: "18px", fontWeight: "800", fontFamily: "var(--font-display)" }}>S</span>
          </div>
          <span style={{ color: "#fff", fontSize: "22px", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
            SOKO<span style={{ color: "#00A86B" }}>PAY</span>
          </span>
        </div>

        {/* Headline */}
        <div style={{ position: "relative", marginBottom: "40px" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "30px",
            fontWeight: "800",
            color: "#fff",
            lineHeight: 1.25,
            margin: "0 0 12px",
          }}>
            Money moving<br />across borders,<br />
            <span style={{ color: "#00A86B" }}>right now.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
            Live transfers happening across the SOKOPAY network.
          </p>
        </div>

        {/* Live transfers */}
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00A86B" }}
            />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Live network
            </span>
          </div>
          <AnimatePresence mode="popLayout">
            {activeTransfers.map((t, i) => (
              <TransferCard key={t.from + t.time + i} t={t} delay={i * 0.05} />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom stats */}
        <div style={{
          display: "flex",
          gap: "24px",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}>
          {[["$2B+", "Processed"], ["50+", "Countries"], ["200ms", "Avg speed"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ color: "#fff", fontSize: "18px", fontWeight: "700", fontFamily: "var(--font-display)" }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ──────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F4F6F8",
        padding: "40px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          <AnimatePresence mode="wait">

            {/* LOGIN */}
            {view === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h1 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "30px",
                  fontWeight: "800",
                  color: "#0B3C5D",
                  margin: "0 0 8px",
                }}>Welcome back</h1>
                <p style={{ color: "#6B7A8D", fontSize: "15px", margin: "0 0 32px" }}>
                  Sign in to your SOKOPAY account
                </p>

                {/* Social buttons */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
                  {[
                    { label: "Continue with Google", icon: "https://www.svgrepo.com/show/475656/google-color.svg" },
                    { label: "Continue with Apple", icon: "https://www.svgrepo.com/show/452247/apple.svg" },
                  ].map(b => (
                    <motion.button
                      key={b.label}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 16px rgba(11,60,93,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        background: "#fff",
                        border: "1.5px solid rgba(11,60,93,0.12)",
                        borderRadius: "12px",
                        padding: "12px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#374a60",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <img src={b.icon} alt="" style={{ width: "18px", height: "18px" }} />
                      {b.label.replace("Continue with ", "")}
                    </motion.button>
                  ))}
                </div>

                <div style={{
                  display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px",
                }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(11,60,93,0.1)" }} />
                  <span style={{ color: "#9AAAB8", fontSize: "13px" }}>or email</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(11,60,93,0.1)" }} />
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374a60", marginBottom: "6px" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid rgba(11,60,93,0.14)",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#0B3C5D",
                      outline: "none",
                      fontFamily: "var(--font-body)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374a60", marginBottom: "6px" }}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        padding: "13px 48px 13px 16px",
                        borderRadius: "12px",
                        border: "1.5px solid rgba(11,60,93,0.14)",
                        background: "#fff",
                        fontSize: "15px",
                        color: "#0B3C5D",
                        outline: "none",
                        fontFamily: "var(--font-body)",
                        boxSizing: "border-box",
                      }}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9AAAB8",
                        padding: 0,
                        fontSize: "16px",
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <div
                      onClick={() => setRemember(!remember)}
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "5px",
                        border: `2px solid ${remember ? "#00A86B" : "rgba(11,60,93,0.2)"}`,
                        background: remember ? "#00A86B" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      {remember && <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>}
                    </div>
                    <span style={{ fontSize: "13px", color: "#6B7A8D", fontFamily: "var(--font-body)" }}>Remember me</span>
                  </label>
                  <button
                    onClick={() => setView("forgot")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00A86B",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  onClick={handleLogin}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,168,107,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #00A86B, #009e65)",
                    color: "#fff",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                    marginBottom: "20px",
                  }}
                >
                  {loading ? <LoadingDots /> : "Sign In →"}
                </motion.button>

                <p style={{ textAlign: "center", color: "#9AAAB8", fontSize: "14px" }}>
                  Don’t have an account?{" "}
                  <a href="#" style={{ color: "#00A86B", fontWeight: "600", textDecoration: "none" }}>Create one</a>
                </p>
              </motion.div>
            )}

            {/* FORGOT PASSWORD */}
            {view === "forgot" && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={() => setView("login")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7A8D", fontSize: "14px", marginBottom: "24px", padding: 0, fontFamily: "var(--font-body)" }}
                >
                  ← Back to login
                </button>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 8px" }}>
                  Reset your password
                </h1>
                <p style={{ color: "#6B7A8D", fontSize: "15px", margin: "0 0 32px", lineHeight: 1.6 }}>
                  Enter your email and we’ll send a reset link within 60 seconds.
                </p>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374a60", marginBottom: "6px" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid rgba(11,60,93,0.14)",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#0B3C5D",
                      outline: "none",
                      fontFamily: "var(--font-body)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <motion.button
                  onClick={handleForgot}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,168,107,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #00A86B, #009e65)",
                    color: "#fff",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                  }}
                >
                  {loading ? <LoadingDots /> : "Send Reset Link →"}
                </motion.button>
              </motion.div>
            )}

            {/* FORGOT SUCCESS */}
            {view === "forgot-success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ textAlign: "center" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00A86B, #7ED957)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "36px",
                  }}
                >
                  ✉️
                </motion.div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 12px" }}>
                  Check your inbox!
                </h1>
                <p style={{ color: "#6B7A8D", fontSize: "15px", lineHeight: 1.65, margin: "0 0 32px" }}>
                  We’ve sent a reset link to <strong style={{ color: "#0B3C5D" }}>{forgotEmail || "your email"}</strong>. Check spam if you don’t see it within 60 seconds.
                </p>
                <motion.button
                  onClick={() => setView("login")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "none",
                    border: "2px solid rgba(11,60,93,0.15)",
                    borderRadius: "14px",
                    padding: "14px 32px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#0B3C5D",
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  ← Back to login
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
