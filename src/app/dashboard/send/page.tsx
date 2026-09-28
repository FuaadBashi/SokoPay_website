"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
const recentRecipients = [
  { id: 1, name: "Amara Osei", location: "Nairobi, KE 🇰🇪", method: "M-Pesa", avatar: "https://i.pravatar.cc/56?img=3" },
  { id: 2, name: "Fatima Al-Rashid", location: "Dubai, UAE 🇦🇪", method: "Bank", avatar: "https://i.pravatar.cc/56?img=5" },
  { id: 3, name: "David Kimani", location: "Kampala, UG 🇺🇬", method: "Airtel Money", avatar: "https://i.pravatar.cc/56?img=8" },
];

const quickAmounts = [50, 100, 250, 500];
const deliveryMethods = [
  { id: "instant", label: "Instant", time: "< 1 min", fee: "$1.99", icon: "⚡" },
  { id: "standard", label: "Standard", time: "1–3 hrs", fee: "Free", icon: "🕐" },
  { id: "bank", label: "Bank Wire", time: "1–2 days", fee: "$0.99", icon: "🏦" },
];

const statusMessages = [
  "Initiating transfer...",
  "Verifying identity...",
  "Locking exchange rate...",
  "Contacting recipient network...",
  "Processing payment...",
  "Transfer complete! 🎉",
];

// ── Step indicator ────────────────────────────────────────────────────────────
const STEPS = ["Recipient", "Amount", "Review", "Transfer"];

function StepBar({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "48px" }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <motion.div
              animate={{
                background: i < step ? "#00A86B" : i === step ? "#0B3C5D" : "rgba(11,60,93,0.1)",
                color: i <= step ? "#fff" : "#9AAAB8",
                scale: i === step ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "14px",
                fontFamily: "var(--font-display)",
                margin: "0 auto 6px",
              }}
            >
              {i < step ? "✓" : i + 1}
            </motion.div>
            <div style={{
              fontSize: "11px",
              fontWeight: i === step ? "700" : "400",
              color: i === step ? "#0B3C5D" : "#9AAAB8",
              fontFamily: "var(--font-body)",
            }}>{s}</div>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              width: "60px",
              height: "2px",
              background: i < step ? "#00A86B" : "rgba(11,60,93,0.1)",
              margin: "0 4px 20px",
              transition: "background 0.4s",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Circular progress ─────────────────────────────────────────────────────────
function CircleProgress({ pct }: { pct: number }) {
  const r = 72;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - pct / 100);

  return (
    <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(11,60,93,0.08)" strokeWidth="10" />
      <motion.circle
        cx="90" cy="90" r={r}
        fill="none"
        stroke="url(#pg)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: dash }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A86B" />
          <stop offset="100%" stopColor="#7ED957" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SendPage() {
  const [step, setStep] = useState(0);
  const [selectedRecipient, setSelectedRecipient] = useState<typeof recentRecipients[0] | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [delivery, setDelivery] = useState("instant");
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop the simulated transfer if the user leaves the page part-way through.
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const fxRate = 132.45;
  const fee = deliveryMethods.find(d => d.id === delivery)?.fee || "$1.99";
  const received = amount ? (Number(amount) * fxRate).toFixed(2) : "0.00";

  function startTransfer() {
    setStep(3);
    // Generated here, in the event handler: generated during render, it changed on every
    // re-render of the receipt.
    setReceiptId(Math.random().toString(36).slice(2, 10).toUpperCase());
    let pct = 0;
    let si = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 14 + 4;
      if (pct >= 100) { pct = 100; clearInterval(iv); setDone(true); }
      setProgress(Math.min(pct, 100));
      si = Math.min(si + 1, statusMessages.length - 1);
      setStatusIdx(si);
    }, 900);
    timer.current = iv;
  }

  const canProceedStep1 = !!selectedRecipient;
  const canProceedStep2 = !!amount && Number(amount) >= 5;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4F6F8",
      fontFamily: "var(--font-body)",
    }}>

      {/* Nav */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid rgba(11,60,93,0.08)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        height: "64px",
        gap: "16px",
      }}>
        <Link href="/dashboard" style={{ color: "#9AAAB8", fontSize: "14px", textDecoration: "none" }}>← Dashboard</Link>
        <div style={{ width: "1px", height: "20px", background: "rgba(11,60,93,0.1)" }} />
        <span style={{ color: "#0B3C5D", fontWeight: "700", fontSize: "16px", fontFamily: "var(--font-display)" }}>Send Money</span>
      </div>

      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "48px 24px" }}>

        <StepBar step={step} />

        <AnimatePresence mode="wait">

          {/* STEP 0 — Pick recipient ─────────────────────────────────────── */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 6px" }}>
                Who are you sending to?
              </h2>
              <p style={{ color: "#6B7A8D", fontSize: "15px", margin: "0 0 28px" }}>Pick a recent recipient or add someone new.</p>

              {/* Recent */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#9AAAB8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Recent recipients
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {recentRecipients.map(r => (
                    <motion.div
                      key={r.id}
                      onClick={() => setSelectedRecipient(r)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px 18px",
                        borderRadius: "16px",
                        background: "#fff",
                        border: `2px solid ${selectedRecipient?.id === r.id ? "#00A86B" : "rgba(11,60,93,0.08)"}`,
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                        boxShadow: selectedRecipient?.id === r.id ? "0 0 0 4px rgba(0,168,107,0.1)" : "none",
                      }}
                    >
                      <img src={r.avatar} alt={r.name} style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "700", color: "#0B3C5D", fontSize: "15px", fontFamily: "var(--font-display)" }}>{r.name}</div>
                        <div style={{ color: "#9AAAB8", fontSize: "13px" }}>{r.location} · {r.method}</div>
                      </div>
                      {selectedRecipient?.id === r.id && (
                        <div style={{ color: "#00A86B", fontSize: "20px" }}>✓</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Add new */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "2px dashed rgba(11,60,93,0.15)",
                  background: "transparent",
                  color: "#4DA8DA",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  marginBottom: "28px",
                }}
              >
                + Add new recipient
              </motion.button>

              <motion.button
                onClick={() => canProceedStep1 && setStep(1)}
                whileHover={canProceedStep1 ? { scale: 1.02, boxShadow: "0 8px 32px rgba(0,168,107,0.3)" } : {}}
                whileTap={canProceedStep1 ? { scale: 0.97 } : {}}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "14px",
                  background: canProceedStep1 ? "linear-gradient(135deg, #00A86B, #009e65)" : "rgba(11,60,93,0.08)",
                  color: canProceedStep1 ? "#fff" : "#9AAAB8",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "var(--font-display)",
                  cursor: canProceedStep1 ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {/* STEP 1 — Amount ─────────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 6px" }}>
                How much to send?
              </h2>
              <p style={{ color: "#6B7A8D", fontSize: "15px", margin: "0 0 28px" }}>
                Sending to <strong style={{ color: "#0B3C5D" }}>{selectedRecipient?.name}</strong> in {selectedRecipient?.location}
              </p>

              {/* Quick picks */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {quickAmounts.map(q => (
                  <motion.button
                    key={q}
                    onClick={() => setAmount(q)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: "10px",
                      border: `2px solid ${amount === q ? "#00A86B" : "rgba(11,60,93,0.12)"}`,
                      background: amount === q ? "rgba(0,168,107,0.08)" : "#fff",
                      color: amount === q ? "#00A86B" : "#374a60",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontFamily: "var(--font-display)",
                      transition: "all 0.15s",
                    }}
                  >
                    ${q}
                  </motion.button>
                ))}
              </div>

              {/* Custom amount */}
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <span style={{
                  position: "absolute",
                  left: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#9AAAB8",
                  fontFamily: "var(--font-display)",
                }}>$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0.00"
                  min="5"
                  style={{
                    width: "100%",
                    padding: "20px 20px 20px 42px",
                    borderRadius: "16px",
                    border: "2px solid rgba(11,60,93,0.12)",
                    background: "#fff",
                    fontSize: "32px",
                    fontWeight: "800",
                    color: "#0B3C5D",
                    fontFamily: "var(--font-display)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* FX preview */}
              {amount && Number(amount) >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "16px 18px",
                    borderRadius: "14px",
                    background: "rgba(0,168,107,0.07)",
                    border: "1px solid rgba(0,168,107,0.15)",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ color: "#6B7A8D", fontSize: "12px", marginBottom: "2px" }}>Recipient gets</div>
                    <div style={{ color: "#0B3C5D", fontWeight: "800", fontSize: "22px", fontFamily: "var(--font-display)" }}>
                      KSh {received}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#6B7A8D", fontSize: "12px", marginBottom: "2px" }}>Rate</div>
                    <div style={{ color: "#00A86B", fontWeight: "700", fontSize: "15px" }}>1 USD = {fxRate} KES</div>
                  </div>
                </motion.div>
              )}

              {/* Delivery method */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#9AAAB8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Delivery method
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {deliveryMethods.map(d => (
                    <motion.button
                      key={d.id}
                      onClick={() => setDelivery(d.id)}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        flex: 1,
                        padding: "14px 10px",
                        borderRadius: "14px",
                        border: `2px solid ${delivery === d.id ? "#0B3C5D" : "rgba(11,60,93,0.1)"}`,
                        background: delivery === d.id ? "rgba(11,60,93,0.04)" : "#fff",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.15s",
                      }}
                    >
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>{d.icon}</div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>{d.label}</div>
                      <div style={{ fontSize: "11px", color: "#9AAAB8" }}>{d.time}</div>
                      <div style={{ fontSize: "12px", color: d.fee === "Free" ? "#00A86B" : "#374a60", fontWeight: "600", marginTop: "2px" }}>{d.fee}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button
                  onClick={() => setStep(0)}
                  whileHover={{ scale: 1.02 }}
                  style={{ flex: "0 0 auto", padding: "16px 24px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.12)", background: "#fff", color: "#374a60", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "var(--font-body)" }}
                >
                  ←
                </motion.button>
                <motion.button
                  onClick={() => canProceedStep2 && setStep(2)}
                  whileHover={canProceedStep2 ? { scale: 1.02, boxShadow: "0 8px 32px rgba(0,168,107,0.3)" } : {}}
                  style={{
                    flex: 1,
                    padding: "16px",
                    borderRadius: "14px",
                    background: canProceedStep2 ? "linear-gradient(135deg, #00A86B, #009e65)" : "rgba(11,60,93,0.08)",
                    color: canProceedStep2 ? "#fff" : "#9AAAB8",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "var(--font-display)",
                    cursor: canProceedStep2 ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                  }}
                >
                  Review →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Review ─────────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 6px" }}>
                Review & Confirm
              </h2>
              <p style={{ color: "#6B7A8D", fontSize: "15px", margin: "0 0 28px" }}>Double-check before sending.</p>

              {/* Summary card */}
              <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", marginBottom: "16px", border: "1px solid rgba(11,60,93,0.08)", boxShadow: "0 4px 20px rgba(11,60,93,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingBottom: "20px", borderBottom: "1px solid rgba(11,60,93,0.06)", marginBottom: "20px" }}>
                  <img src={selectedRecipient?.avatar} alt="" style={{ width: "52px", height: "52px", borderRadius: "50%" }} />
                  <div>
                    <div style={{ fontWeight: "700", color: "#0B3C5D", fontSize: "17px", fontFamily: "var(--font-display)" }}>{selectedRecipient?.name}</div>
                    <div style={{ color: "#9AAAB8", fontSize: "13px" }}>{selectedRecipient?.location} · {selectedRecipient?.method}</div>
                  </div>
                </div>

                {[
                  ["You send", `$${amount} USD`],
                  ["Recipient gets", `KSh ${received}`],
                  ["Exchange rate", `1 USD = ${fxRate} KES`],
                  ["Fee", fee],
                  ["Delivery", deliveryMethods.find(d => d.id === delivery)?.time || ""],
                  ["Total charged", `$${(Number(amount) + (fee === "Free" ? 0 : parseFloat(fee.replace("$", "")))).toFixed(2)}`],
                ].map(([label, val], i, arr) => (
                  <div key={label} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(11,60,93,0.05)" : "none",
                  }}>
                    <span style={{ color: "#6B7A8D", fontSize: "14px" }}>{label}</span>
                    <span style={{
                      fontWeight: i === arr.length - 1 ? "800" : "600",
                      fontSize: i === arr.length - 1 ? "18px" : "14px",
                      color: i === 1 ? "#00A86B" : "#0B3C5D",
                      fontFamily: i === arr.length - 1 ? "var(--font-display)" : "var(--font-body)",
                    }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.02 }}
                  style={{ flex: "0 0 auto", padding: "16px 24px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.12)", background: "#fff", color: "#374a60", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "var(--font-body)" }}
                >
                  ←
                </motion.button>
                <motion.button
                  onClick={startTransfer}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,168,107,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, padding: "16px", borderRadius: "14px",
                    background: "linear-gradient(135deg, #00A86B, #009e65)",
                    color: "#fff", border: "none", fontSize: "16px", fontWeight: "700",
                    fontFamily: "var(--font-display)", cursor: "pointer",
                  }}
                >
                  Send ${amount} Now →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Transfer progress ──────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ textAlign: "center" }}>

              {!done ? (
                <>
                  <div style={{ position: "relative", display: "inline-block", marginBottom: "24px" }}>
                    <CircleProgress pct={progress} />
                    <div style={{
                      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ fontSize: "28px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>
                        {Math.round(progress)}%
                      </div>
                      <div style={{ fontSize: "11px", color: "#9AAAB8" }}>processing</div>
                    </div>
                  </div>

                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 8px" }}>
                    Sending ${amount} to {selectedRecipient?.name}
                  </h2>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={statusIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: "#6B7A8D", fontSize: "15px", margin: "0" }}
                    >
                      {statusMessages[statusIdx]}
                    </motion.p>
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Success state */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    style={{
                      width: "90px", height: "90px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #00A86B, #7ED957)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 24px", fontSize: "40px",
                    }}
                  >
                    ✓
                  </motion.div>

                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: "800", color: "#0B3C5D", margin: "0 0 8px" }}>
                    Transfer complete!
                  </h2>
                  <p style={{ color: "#6B7A8D", fontSize: "15px", marginBottom: "28px", lineHeight: 1.6 }}>
                    <strong style={{ color: "#0B3C5D" }}>{selectedRecipient?.name}</strong> has received <strong style={{ color: "#00A86B" }}>KSh {received}</strong> via {selectedRecipient?.method}.
                  </p>

                  {/* Receipt card */}
                  <div style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    textAlign: "left",
                    border: "1px solid rgba(11,60,93,0.08)",
                    boxShadow: "0 4px 20px rgba(11,60,93,0.06)",
                    marginBottom: "24px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ color: "#9AAAB8", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Receipt</span>
                      <span style={{ color: "#9AAAB8", fontSize: "12px" }}>#{receiptId}</span>
                    </div>
                    {[
                      ["Amount sent", `$${amount}`],
                      ["Received", `KSh ${received}`],
                      ["Delivery", "Completed ✓"],
                      ["Date", new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
                    ].map(([l, v]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(11,60,93,0.05)" }}>
                        <span style={{ color: "#6B7A8D", fontSize: "13px" }}>{l}</span>
                        <span style={{ fontWeight: "700", color: "#0B3C5D", fontSize: "13px" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.12)", background: "#fff", color: "#374a60", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "var(--font-body)" }}
                    >
                      Download Receipt
                    </motion.button>
                    <motion.button
                      onClick={() => { setStep(0); setAmount(""); setSelectedRecipient(null); setProgress(0); setStatusIdx(0); setDone(false); }}
                      whileHover={{ scale: 1.02, boxShadow: "0 6px 24px rgba(0,168,107,0.3)" }}
                      style={{ flex: 1, padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #009e65)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "var(--font-display)" }}
                    >
                      Send Again →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
