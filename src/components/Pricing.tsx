"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const plans = {
  personal: [
    {
      name: "Starter",
      price: "Free",
      sub: "Forever",
      description: "Perfect for first-time senders and occasional transfers.",
      cta: "Get Started",
      highlight: false,
      features: [
        { label: "Send up to $500/month", included: true },
        { label: "M-Pesa & Airtel payouts", included: true },
        { label: "Live FX rates", included: true },
        { label: "24/7 chat support", included: true },
        { label: "Scheduled transfers", included: false },
        { label: "Priority FX desk", included: false },
        { label: "Dedicated agent", included: false },
      ],
    },
    {
      name: "Plus",
      price: "$4.99",
      sub: "per month",
      description: "For frequent senders who want better rates and more control.",
      cta: "Start Free Trial",
      highlight: true,
      badge: "Most Popular",
      features: [
        { label: "Send up to $5,000/month", included: true },
        { label: "M-Pesa, Airtel & Bank payouts", included: true },
        { label: "Live FX + rate alerts", included: true },
        { label: "Priority 24/7 support", included: true },
        { label: "Scheduled transfers", included: true },
        { label: "Priority FX desk", included: false },
        { label: "Dedicated agent", included: false },
      ],
    },
    {
      name: "Premium",
      price: "$14.99",
      sub: "per month",
      description: "Unlimited transfers, locked rates, and a dedicated support agent.",
      cta: "Contact Sales",
      highlight: false,
      features: [
        { label: "Unlimited transfer volume", included: true },
        { label: "All payout methods", included: true },
        { label: "Live FX + rate alerts", included: true },
        { label: "24/7 VIP support", included: true },
        { label: "Scheduled transfers", included: true },
        { label: "Priority FX desk", included: true },
        { label: "Dedicated agent", included: true },
      ],
    },
  ],
  business: [
    {
      name: "Growth",
      price: "Free",
      sub: "to start",
      description: "Explore SOKOPAY Business with no commitment.",
      cta: "Open Business Account",
      highlight: false,
      features: [
        { label: "Up to $50K/month volume", included: true },
        { label: "Batch payments (up to 50)", included: true },
        { label: "Basic API access", included: true },
        { label: "Email support", included: true },
        { label: "Multi-currency wallet", included: false },
        { label: "ERP integration", included: false },
        { label: "AML/KYB compliance tools", included: false },
      ],
    },
    {
      name: "Business",
      price: "$99",
      sub: "per month",
      description: "For growing companies with regular cross-border trade.",
      cta: "Start Free Trial",
      highlight: true,
      badge: "Best Value",
      features: [
        { label: "Up to $500K/month volume", included: true },
        { label: "Unlimited batch payments", included: true },
        { label: "Full API access", included: true },
        { label: "Priority support + SLA", included: true },
        { label: "Multi-currency wallet", included: true },
        { label: "ERP integration", included: false },
        { label: "AML/KYB compliance tools", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      sub: "pricing",
      description: "High-volume, white-glove service for large organisations.",
      cta: "Talk to Sales",
      highlight: false,
      features: [
        { label: "Unlimited volume", included: true },
        { label: "Unlimited batch payments", included: true },
        { label: "Full API + webhooks", included: true },
        { label: "Dedicated account team", included: true },
        { label: "Multi-currency wallet", included: true },
        { label: "ERP integration", included: true },
        { label: "AML/KYB compliance tools", included: true },
      ],
    },
  ],
};

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [mode, setMode] = useState<"personal" | "business">("personal");

  const active = plans[mode];

  return (
    <section
      style={{
        background: "#fff",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg, #0B3C5D, #4DA8DA, #00A86B, #7ED957)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <span style={{
            display: "inline-block",
            background: "rgba(0,168,107,0.1)",
            color: "#00A86B",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "100px",
            marginBottom: "16px",
            fontFamily: "var(--font-body)",
          }}>
            Pricing
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4.5vw, 50px)",
            fontWeight: "800",
            color: "#0B3C5D",
            lineHeight: 1.15,
            margin: "0 0 20px",
          }}>
            Transparent pricing,<br />
            <span style={{
              background: "linear-gradient(135deg, #00A86B, #4DA8DA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              zero surprises
            </span>
          </h2>
          <p style={{
            color: "#6B7A8D",
            fontSize: "18px",
            fontFamily: "var(--font-body)",
            maxWidth: "480px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}>
            No hidden FX markups. No surprise fees. Start free, scale when you’re ready.
          </p>

          {/* Toggle */}
          <div style={{
            display: "inline-flex",
            background: "#F4F6F8",
            borderRadius: "14px",
            padding: "4px",
            gap: "4px",
          }}>
            {(["personal", "business"] as const).map(m => (
              <motion.button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "10px 28px",
                  borderRadius: "10px",
                  border: "none",
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#0B3C5D" : "#9AAAB8",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                  boxShadow: mode === m ? "0 2px 12px rgba(11,60,93,0.1)" : "none",
                  transition: "all 0.25s",
                }}
              >
                {m === "personal" ? "Personal" : "Business"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              alignItems: "stretch",
            }}
          >
            {active.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: plan.highlight ? -4 : -6 }}
                style={{
                  borderRadius: "24px",
                  padding: plan.highlight ? "32px 28px" : "28px",
                  border: plan.highlight ? "none" : "1.5px solid rgba(11,60,93,0.09)",
                  background: plan.highlight
                    ? "linear-gradient(155deg, #0B3C5D 0%, #0e4a73 100%)"
                    : "#fff",
                  boxShadow: plan.highlight
                    ? "0 20px 60px rgba(11,60,93,0.25)"
                    : "0 4px 20px rgba(11,60,93,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Highlight card shimmer */}
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                    background: "linear-gradient(90deg, #00A86B, #7ED957)",
                  }} />
                )}

                {/* Badge */}
                {"badge" in plan && plan.badge && (
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "linear-gradient(135deg, #00A86B, #7ED957)",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "800",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    fontFamily: "var(--font-body)",
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{ marginBottom: "24px" }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: plan.highlight ? "rgba(255,255,255,0.6)" : "#9AAAB8",
                    fontFamily: "var(--font-body)",
                    marginBottom: "4px",
                  }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{
                      fontSize: "40px",
                      fontWeight: "800",
                      color: plan.highlight ? "#fff" : "#0B3C5D",
                      fontFamily: "var(--font-display)",
                      lineHeight: 1,
                    }}>{plan.price}</span>
                    <span style={{
                      fontSize: "13px",
                      color: plan.highlight ? "rgba(255,255,255,0.5)" : "#9AAAB8",
                      fontFamily: "var(--font-body)",
                    }}>{plan.sub}</span>
                  </div>
                  <p style={{
                    fontSize: "13px",
                    color: plan.highlight ? "rgba(255,255,255,0.6)" : "#6B7A8D",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.55,
                    marginTop: "10px",
                    marginBottom: 0,
                  }}>{plan.description}</p>
                </div>

                {/* Features */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                  {plan.features.map(f => (
                    <div key={f.label} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "13px",
                      color: f.included
                        ? (plan.highlight ? "rgba(255,255,255,0.85)" : "#374a60")
                        : (plan.highlight ? "rgba(255,255,255,0.25)" : "#C5CDD8"),
                      fontFamily: "var(--font-body)",
                    }}>
                      <span style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: f.included
                          ? "rgba(0,168,107,0.15)"
                          : (plan.highlight ? "rgba(255,255,255,0.06)" : "rgba(11,60,93,0.05)"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        flexShrink: 0,
                        color: f.included ? "#00A86B" : (plan.highlight ? "rgba(255,255,255,0.2)" : "#C5CDD8"),
                      }}>
                        {f.included ? "✓" : "×"}
                      </span>
                      {f.label}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: plan.highlight ? "none" : "1.5px solid rgba(11,60,93,0.15)",
                    background: plan.highlight
                      ? "linear-gradient(135deg, #00A86B, #009e65)"
                      : "transparent",
                    color: plan.highlight ? "#fff" : "#0B3C5D",
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                  }}
                >
                  {plan.cta} →
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: "center",
            color: "#9AAAB8",
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            marginTop: "32px",
          }}
        >
          All plans include bank-level encryption and FCA/CBK regulatory compliance. No contracts. Cancel anytime.
        </motion.p>

      </div>
    </section>
  );
}
