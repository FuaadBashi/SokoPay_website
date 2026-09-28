"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "personal",
    name: "Personal",
    tagline: "For individuals & families",
    monthlyPrice: 0,
    annualPrice: 0,
    priceLabel: "Free",
    priceSuffix: "forever",
    color: "#4DA8DA",
    cta: "Get Started Free",
    ctaHref: "/signup",
    popular: false,
    features: {
      "Transfers": [
        { label: "Monthly transfers", value: "Unlimited" },
        { label: "Max single transfer", value: "$5,000" },
        { label: "Transfer fee", value: "0.8%" },
        { label: "FX markup", value: "Zero" },
        { label: "Transfer speed", value: "< 60 seconds" },
        { label: "Scheduled transfers", value: false },
      ],
      "Supported Methods": [
        { label: "Mobile money (M-Pesa, Airtel)", value: true },
        { label: "Bank transfer", value: true },
        { label: "Card payments", value: true },
        { label: "Crypto (USDC)", value: false },
      ],
      "Support & Security": [
        { label: "24/7 live chat support", value: true },
        { label: "Dedicated account manager", value: false },
        { label: "Two-factor authentication", value: true },
        { label: "Biometric login", value: true },
      ],
      "Business Features": [
        { label: "API access", value: false },
        { label: "Batch transfers", value: false },
        { label: "Payroll automation", value: false },
        { label: "Custom FX rates", value: false },
        { label: "Multi-user access", value: false },
        { label: "Invoice generation", value: false },
      ],
    },
  },
  {
    id: "business",
    name: "Business",
    tagline: "For SMEs & growing companies",
    monthlyPrice: 49,
    annualPrice: 39,
    priceSuffix: "/ month",
    color: "#00A86B",
    cta: "Start 14-Day Free Trial",
    ctaHref: "/signup?plan=business",
    popular: true,
    features: {
      "Transfers": [
        { label: "Monthly transfers", value: "Unlimited" },
        { label: "Max single transfer", value: "$100,000" },
        { label: "Transfer fee", value: "0.5%" },
        { label: "FX markup", value: "Zero" },
        { label: "Transfer speed", value: "< 60 seconds" },
        { label: "Scheduled transfers", value: true },
      ],
      "Supported Methods": [
        { label: "Mobile money (M-Pesa, Airtel)", value: true },
        { label: "Bank transfer", value: true },
        { label: "Card payments", value: true },
        { label: "Crypto (USDC)", value: true },
      ],
      "Support & Security": [
        { label: "24/7 live chat support", value: true },
        { label: "Dedicated account manager", value: false },
        { label: "Two-factor authentication", value: true },
        { label: "Biometric login", value: true },
      ],
      "Business Features": [
        { label: "API access", value: true },
        { label: "Batch transfers", value: "Up to 1,000" },
        { label: "Payroll automation", value: true },
        { label: "Custom FX rates", value: false },
        { label: "Multi-user access", value: "Up to 5 users" },
        { label: "Invoice generation", value: true },
      ],
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large-scale operations",
    monthlyPrice: null,
    annualPrice: null,
    priceLabel: "Custom",
    priceSuffix: "pricing",
    color: "#7ED957",
    cta: "Contact Sales",
    ctaHref: "/contact",
    popular: false,
    features: {
      "Transfers": [
        { label: "Monthly transfers", value: "Unlimited" },
        { label: "Max single transfer", value: "Unlimited" },
        { label: "Transfer fee", value: "Volume-based" },
        { label: "FX markup", value: "Zero" },
        { label: "Transfer speed", value: "< 60 seconds" },
        { label: "Scheduled transfers", value: true },
      ],
      "Supported Methods": [
        { label: "Mobile money (M-Pesa, Airtel)", value: true },
        { label: "Bank transfer", value: true },
        { label: "Card payments", value: true },
        { label: "Crypto (USDC)", value: true },
      ],
      "Support & Security": [
        { label: "24/7 live chat support", value: true },
        { label: "Dedicated account manager", value: true },
        { label: "Two-factor authentication", value: true },
        { label: "Biometric login", value: true },
      ],
      "Business Features": [
        { label: "API access", value: true },
        { label: "Batch transfers", value: "Unlimited" },
        { label: "Payroll automation", value: true },
        { label: "Custom FX rates", value: true },
        { label: "Multi-user access", value: "Unlimited" },
        { label: "Invoice generation", value: true },
      ],
    },
  },
];

const FAQS = [
  { q: "Are there any hidden fees?", a: "Never. SOKOPAY charges a flat percentage on each transfer with zero FX markup. The rate you see is the rate you get. We show all costs upfront before you confirm any transaction." },
  { q: "How does the 14-day free trial work?", a: "For Business and Enterprise plans, you get full access to all features for 14 days — no credit card required. At the end of your trial, you choose whether to subscribe. If you don't, your account reverts to a free Personal plan." },
  { q: "Can I switch plans at any time?", a: "Yes. Upgrade instantly or downgrade at the end of your billing period. All your data, history, and configurations are preserved when switching plans." },
  { q: "What currencies and corridors are supported?", a: "We currently support 15+ corridors across East Africa (Kenya, Uganda, Tanzania, Ethiopia, Rwanda) and the GCC (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain). More corridors are added regularly." },
  { q: "How are exchange rates calculated?", a: "We use the mid-market exchange rate with zero markup. You get the same rate the banks use for interbank transactions — we simply charge a small transparent transfer fee on top." },
  { q: "What compliance standards does SOKOPAY meet?", a: "SOKOPAY is regulated by the Central Bank of Kenya (CBK), the Financial Sector Conduct Authority (FSCA) in South Africa, and the Central Bank of UAE (CBUAE). We are fully AML and FATF compliant in all operating jurisdictions." },
];

const TRANSFER_EXAMPLES = [
  { amount: 500, personal: { fee: "4.00", received: "64,800", currency: "KES" }, business: { fee: "2.50", received: "65,325", currency: "KES" } },
  { amount: 2000, personal: { fee: "16.00", received: "258,400", currency: "KES" }, business: { fee: "10.00", received: "260,700", currency: "KES" } },
  { amount: 10000, personal: { fee: "80.00", received: "1,294,000", currency: "KES" }, business: { fee: "50.00", received: "1,296,500", currency: "KES" } },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(0,168,107,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#00A86B", fontSize: "12px", fontWeight: "900" }}>✓</span>
      </div>
    </div>
  );
  if (value === false) return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={{ color: "#cbd5e1", fontSize: "16px" }}>—</span>
    </div>
  );
  return <div style={{ textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#0B3C5D", fontFamily: "var(--font-body)" }}>{value}</div>;
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);
  const [calcVisible, setCalcVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCalcVisible(true); }, { threshold: 0.2 });
    if (calcRef.current) obs.observe(calcRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* ── Navbar ── */}
      <nav style={{ padding: "0 48px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(11,60,93,0.07)", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #00A86B, #7ED957)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px", color: "white", fontFamily: "var(--font-display)" }}>S</div>
          <span style={{ fontWeight: "800", fontSize: "18px", color: "#0B3C5D", letterSpacing: "-0.5px", fontFamily: "var(--font-display)" }}>SOKO<span style={{ color: "#00A86B" }}>PAY</span></span>
        </Link>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="/login" style={{ padding: "9px 20px", borderRadius: "10px", border: "1.5px solid rgba(11,60,93,0.12)", color: "#0B3C5D", textDecoration: "none", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-body)" }}>Log in</a>
          <a href="/signup" style={{ padding: "9px 20px", borderRadius: "10px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)", boxShadow: "0 3px 12px rgba(0,168,107,0.3)" }}>Get Started Free</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "80px 48px 60px", textAlign: "center", background: "linear-gradient(180deg, #F4F6F8 0%, white 100%)", borderBottom: "1px solid rgba(11,60,93,0.06)" }}>
        <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "100px", background: "rgba(0,168,107,0.08)", border: "1px solid rgba(0,168,107,0.18)", color: "#00A86B", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "20px", opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease" }}>
          Pricing
        </span>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-2px", lineHeight: 1.1, margin: "0 0 18px", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 100ms, transform 0.6s ease 100ms" }}>
          Simple pricing, zero surprises
        </h1>
        <p style={{ fontSize: "19px", color: "#64748b", fontFamily: "var(--font-body)", maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.6, opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 200ms" }}>
          No hidden fees. No FX markup. Just a transparent flat fee per transfer.
        </p>

        {/* Billing toggle */}
        <div style={{ display: "inline-flex", padding: "4px", borderRadius: "14px", background: "white", border: "1.5px solid rgba(11,60,93,0.1)", boxShadow: "0 2px 8px rgba(11,60,93,0.06)", opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 300ms" }}>
          {(["monthly", "annual"] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: billing === b ? "#0B3C5D" : "transparent", color: billing === b ? "white" : "#64748b", fontWeight: billing === b ? "700" : "500", fontSize: "14px", fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: "8px" }}>
              {b === "monthly" ? "Monthly" : "Annual"}
              {b === "annual" && <span style={{ padding: "2px 8px", borderRadius: "100px", background: billing === "annual" ? "rgba(126,217,87,0.2)" : "rgba(0,168,107,0.1)", color: "#00A86B", fontSize: "11px", fontWeight: "700" }}>Save 20%</span>}
            </button>
          ))}
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section style={{ padding: "60px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
          {PLANS.map((plan, i) => {
            const price = billing === "annual" && plan.annualPrice !== null ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div key={plan.id} style={{
                flex: "1", minWidth: "280px",
                borderRadius: "28px",
                padding: "36px 32px",
                border: plan.popular ? `2px solid ${plan.color}` : "2px solid rgba(11,60,93,0.08)",
                background: plan.popular ? "linear-gradient(160deg, #f0fdf8, #ecfdf5)" : "white",
                boxShadow: plan.popular ? `0 8px 40px ${plan.color}20` : "0 2px 12px rgba(11,60,93,0.05)",
                position: "relative",
                opacity: mounted ? 1 : 0,
                transform: mounted ? plan.popular ? "translateY(-8px)" : "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 100 + 200}ms, transform 0.6s ease ${i * 100 + 200}ms`,
              }}>
                {plan.popular && (
                  <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", padding: "5px 18px", borderRadius: "100px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-body)", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,168,107,0.3)" }}>
                    ⭐ Most Popular
                  </div>
                )}

                <div style={{ marginBottom: "28px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: plan.color, fontFamily: "var(--font-body)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" }}>
                    {price !== null ? (
                      <>
                        <span style={{ fontSize: "44px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-2px", lineHeight: 1 }}>
                          {price === 0 ? "Free" : `$${price}`}
                        </span>
                        {price > 0 && <span style={{ color: "#94a3b8", fontSize: "15px", fontFamily: "var(--font-body)" }}>{plan.priceSuffix}</span>}
                      </>
                    ) : (
                      <span style={{ fontSize: "44px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-2px", lineHeight: 1 }}>Custom</span>
                    )}
                  </div>
                  {billing === "annual" && plan.monthlyPrice && plan.monthlyPrice > 0 && (
                    <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "var(--font-body)", textDecoration: "line-through" }}>
                      ${plan.monthlyPrice}/mo billed monthly
                    </div>
                  )}
                  <p style={{ color: "#64748b", fontSize: "14px", fontFamily: "var(--font-body)", margin: "10px 0 0", lineHeight: 1.5 }}>{plan.tagline}</p>
                </div>

                <a href={plan.ctaHref} style={{
                  display: "block", textAlign: "center", padding: "14px",
                  borderRadius: "14px",
                  background: plan.popular ? "linear-gradient(135deg, #00A86B, #7ED957)" : plan.id === "enterprise" ? "transparent" : "transparent",
                  border: plan.popular ? "none" : `2px solid ${plan.color}40`,
                  color: plan.popular ? "white" : plan.color,
                  textDecoration: "none",
                  fontSize: "14px", fontWeight: "700",
                  fontFamily: "var(--font-display)",
                  boxShadow: plan.popular ? "0 4px 16px rgba(0,168,107,0.3)" : "none",
                  marginBottom: "28px",
                  transition: "opacity 0.2s ease",
                }}>
                  {plan.cta}
                </a>

                {/* Feature highlights for this card */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    plan.features["Transfers"][2],
                    plan.features["Transfers"][4],
                    plan.features["Business Features"][0],
                    plan.features["Business Features"][1],
                    plan.features["Support & Security"][1],
                  ].map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: f.value === false ? "#cbd5e1" : plan.color, fontSize: "13px" }}>{f.value === false ? "—" : "✓"}</span>
                      <span style={{ fontSize: "13px", color: f.value === false ? "#cbd5e1" : "#64748b", fontFamily: "var(--font-body)" }}>
                        {f.label}{typeof f.value === "string" && f.value !== "true" ? `: ${f.value}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Full comparison table ── */}
      <section style={{ padding: "40px 48px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-1px", textAlign: "center", marginBottom: "48px" }}>
          Full feature comparison
        </h2>

        <div style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(11,60,93,0.08)", boxShadow: "0 4px 24px rgba(11,60,93,0.06)" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#0B3C5D", padding: "20px 28px" }}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", fontWeight: "600" }}>Features</div>
            {PLANS.map(plan => (
              <div key={plan.id} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: "800", color: plan.popular ? "#7ED957" : "white", fontFamily: "var(--font-display)" }}>{plan.name}</div>
              </div>
            ))}
          </div>

          {/* Table body */}
          {Object.entries(PLANS[0].features).map(([category], catIdx) => (
            <div key={category}>
              {/* Category header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 28px", background: "#F8FAFC", borderTop: catIdx > 0 ? "1px solid rgba(11,60,93,0.08)" : "none" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-body)", letterSpacing: "1px", textTransform: "uppercase" }}>{category}</div>
              </div>

              {PLANS[0].features[category as keyof typeof PLANS[0]["features"]].map((_, rowIdx) => (
                <div key={rowIdx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 28px", borderTop: "1px solid rgba(11,60,93,0.04)", background: rowIdx % 2 === 0 ? "white" : "#FAFBFC" }}>
                  <div style={{ fontSize: "14px", color: "#64748b", fontFamily: "var(--font-body)" }}>
                    {PLANS[0].features[category as keyof typeof PLANS[0]["features"]][rowIdx].label}
                  </div>
                  {PLANS.map(plan => (
                    <FeatureCell key={plan.id} value={plan.features[category as keyof typeof plan["features"]][rowIdx].value} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Transfer fee calculator ── */}
      <section ref={calcRef} style={{ padding: "80px 48px", background: "#F4F6F8" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-1px", margin: "0 0 12px" }}>
              See exactly what you’ll pay
            </h2>
            <p style={{ color: "#64748b", fontSize: "17px", fontFamily: "var(--font-body)" }}>Example transfer costs from USD to KES</p>
          </div>

          <div style={{ borderRadius: "24px", overflow: "hidden", background: "white", border: "1px solid rgba(11,60,93,0.08)", boxShadow: "0 4px 20px rgba(11,60,93,0.06)" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0B3C5D", padding: "18px 32px" }}>
              {["Transfer Amount", "Personal (0.8%)", "Business (0.5%)"].map(h => (
                <div key={h} style={{ textAlign: h !== "Transfer Amount" ? "center" : "left", fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
              ))}
            </div>

            {TRANSFER_EXAMPLES.map((ex, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                padding: "20px 32px",
                borderTop: "1px solid rgba(11,60,93,0.06)",
                background: i % 2 === 0 ? "white" : "#FAFBFC",
                opacity: calcVisible ? 1 : 0,
                transform: calcVisible ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>${ex.amount.toLocaleString()}</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "13px", color: "#ef4444", fontFamily: "var(--font-body)" }}>Fee: <strong>${ex.personal.fee}</strong></div>
                  <div style={{ fontSize: "13px", color: "#00A86B", fontFamily: "var(--font-body)", marginTop: "2px" }}>Received: {ex.personal.currency} {ex.personal.received}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "13px", color: "#00A86B", fontFamily: "var(--font-body)" }}>Fee: <strong>${ex.business.fee}</strong></div>
                  <div style={{ fontSize: "13px", color: "#00A86B", fontFamily: "var(--font-body)", marginTop: "2px", fontWeight: "700" }}>Received: {ex.business.currency} {ex.business.received}</div>
                </div>
              </div>
            ))}

            <div style={{ padding: "16px 32px", background: "rgba(0,168,107,0.04)", borderTop: "1px solid rgba(0,168,107,0.12)", textAlign: "center" }}>
              <span style={{ fontSize: "13px", color: "#64748b", fontFamily: "var(--font-body)" }}>Rate: 1 USD = 130 KES · No FX markup · Real-time rate lock</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 48px", maxWidth: "780px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-1px", textAlign: "center", marginBottom: "48px" }}>
          Frequently asked questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderRadius: "16px", border: `1.5px solid ${openFaq === i ? "rgba(0,168,107,0.3)" : "rgba(11,60,93,0.1)"}`, background: openFaq === i ? "rgba(0,168,107,0.02)" : "white", overflow: "hidden", transition: "border-color 0.2s ease" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", textAlign: "left" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)", lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: "#00A86B", fontSize: "20px", fontWeight: "300", flexShrink: 0, transition: "transform 0.3s ease", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ margin: 0, color: "#64748b", fontSize: "15px", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ padding: "80px 48px", background: "linear-gradient(135deg, #0B3C5D, #0d4a72)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", color: "white", fontFamily: "var(--font-display)", letterSpacing: "-1.5px", margin: "0 0 16px", position: "relative" }}>
          Start moving money today. <span style={{ background: "linear-gradient(135deg, #7ED957, #00A86B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>For free.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", fontFamily: "var(--font-body)", margin: "0 0 36px", position: "relative" }}>No credit card required. Get your first transfer free.</p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <a href="/signup" style={{ padding: "16px 36px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", boxShadow: "0 8px 28px rgba(0,168,107,0.4)" }}>
            Create Free Account →
          </a>
          <a href="/contact" style={{ padding: "16px 36px", borderRadius: "14px", background: "rgba(255,255,255,0.08)", color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "600", fontFamily: "var(--font-display)", border: "1px solid rgba(255,255,255,0.15)" }}>
            Talk to Sales
          </a>
        </div>
      </section>
    </div>
  );
}
