"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up in under 2 minutes. Verify your identity with a government ID — KYC is handled seamlessly for both B2B and individual accounts.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 26c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#00A86B",
    bg: "rgba(0,168,107,0.08)",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
  },
  {
    number: "02",
    title: "Add Funds or Invoice",
    description:
      "Top up via M-Pesa, bank transfer, or card. B2B clients can generate instant invoices — funds settle in your SOKOPAY wallet within seconds.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 14h26" stroke="currentColor" strokeWidth="2"/>
        <rect x="7" y="18" width="6" height="4" rx="1" fill="currentColor"/>
      </svg>
    ),
    color: "#4DA8DA",
    bg: "rgba(77,168,218,0.08)",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
  },
  {
    number: "03",
    title: "Send Anywhere, Instantly",
    description:
      "Pick your recipient in East Africa or the GCC. Lock in live FX rates. Hit send — they receive funds in local currency within 200ms average.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16L28 4L20 28L14 18L4 16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 18L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#7ED957",
    bg: "rgba(126,217,87,0.08)",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      style={{
        background: "#F4F6F8",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background circle */}
      <div style={{
        position: "absolute",
        top: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,168,107,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }} ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span style={{
            display: "inline-block",
            background: "rgba(0,168,107,0.1)",
            color: "#00A86B",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "100px",
            marginBottom: "16px",
            fontFamily: "var(--font-body)",
          }}>
            Simple Process
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "800",
            color: "#0B3C5D",
            lineHeight: 1.15,
            margin: "0 0 20px",
          }}>
            Three steps to move<br />
            <span style={{
              background: "linear-gradient(135deg, #00A86B, #4DA8DA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              money across borders
            </span>
          </h2>
          <p style={{
            color: "#6B7A8D",
            fontSize: "18px",
            fontFamily: "var(--font-body)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            No hidden fees. No paperwork. No waiting days. Just fast, secure transfers built for Africa and the Gulf.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
          position: "relative",
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8 }}
              style={{
                background: "#fff",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(11,60,93,0.08)",
                border: "1px solid rgba(11,60,93,0.06)",
                cursor: "default",
                position: "relative",
              }}
            >
              {/* Image */}
              <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Overlay gradient */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 40%, ${step.color}22 100%)`,
                }} />
                {/* Step number badge */}
                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: step.color,
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "800",
                  fontFamily: "var(--font-display)",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  letterSpacing: "0.04em",
                }}>
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "28px 28px 32px" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: step.bg,
                  color: step.color,
                  marginBottom: "18px",
                }}>
                  {step.icon}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#0B3C5D",
                  margin: "0 0 12px",
                  lineHeight: 1.25,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  color: "#6B7A8D",
                  fontSize: "15px",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {step.description}
                </p>

                {/* Progress indicator */}
                <motion.div
                  style={{
                    marginTop: "24px",
                    height: "3px",
                    borderRadius: "2px",
                    background: "rgba(11,60,93,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${step.color}, ${step.color}88)`,
                      transformOrigin: "left",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "56px" }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,168,107,0.35)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "linear-gradient(135deg, #00A86B, #00c47c)",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "700",
              fontFamily: "var(--font-display)",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Start Sending Today →
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
