"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "SOKOPAY cut our payroll processing time from 3 days to under 10 minutes. Paying our Dubai team from Nairobi has never been this smooth.",
    name: "Amara Osei",
    title: "CFO, BuildRight Kenya",
    location: "Nairobi 🇰🇪",
    avatar: "https://i.pravatar.cc/80?img=3",
    stars: 5,
    tag: "Business",
  },
  {
    quote: "I send money to my family in Kampala every week. The rates are always better than what my bank offers, and it arrives in minutes on M-Pesa.",
    name: "Hassan Al-Rashidi",
    title: "Construction Engineer",
    location: "Dubai 🇦🇪",
    avatar: "https://i.pravatar.cc/80?img=12",
    stars: 5,
    tag: "Personal",
  },
  {
    quote: "We integrated SOKOPAY's API into our e-commerce checkout in two days. Our conversion rate in the GCC jumped 18% immediately.",
    name: "Leila Wanjiku",
    title: "Head of Payments, Jaza Commerce",
    location: "Riyadh 🇸🇦",
    avatar: "https://i.pravatar.cc/80?img=47",
    stars: 5,
    tag: "Business",
  },
  {
    quote: "The live FX preview alone saved me from losing $200 on a bad rate. I locked it in, and the money arrived in Dar within minutes.",
    name: "Mohammed Al-Farsi",
    title: "Freelance Designer",
    location: "Abu Dhabi 🇦🇪",
    avatar: "https://i.pravatar.cc/80?img=68",
    stars: 5,
    tag: "Personal",
  },
  {
    quote: "Compliance was our biggest headache with cross-border payments. SOKOPAY's KYB tools made onboarding our 200+ vendors effortless.",
    name: "Fatuma Ndegwa",
    title: "Operations Director, Savanna Imports",
    location: "Kampala 🇺🇬",
    avatar: "https://i.pravatar.cc/80?img=26",
    stars: 5,
    tag: "Business",
  },
  {
    quote: "The receipt comes through instantly and I can share it with my mum to show the money is on the way. Pure peace of mind.",
    name: "Khadija Abdi",
    title: "Nurse",
    location: "Doha 🇶🇦",
    avatar: "https://i.pravatar.cc/80?img=56",
    stars: 5,
    tag: "Personal",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#FFB800", fontSize: "14px" }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const visible = [
    testimonials[active % testimonials.length],
    testimonials[(active + 1) % testimonials.length],
    testimonials[(active + 2) % testimonials.length],
  ];

  return (
    <section
      style={{
        background: "#F4F6F8",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative quote mark */}
      <div style={{
        position: "absolute",
        top: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "220px",
        lineHeight: 1,
        color: "rgba(11,60,93,0.04)",
        fontFamily: "var(--font-display)",
        fontWeight: "900",
        pointerEvents: "none",
        userSelect: "none",
      }}>“</div>

      <div style={{ maxWidth: "1160px", margin: "0 auto", position: "relative" }} ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
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
            Testimonials
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4.5vw, 50px)",
            fontWeight: "800",
            color: "#0B3C5D",
            lineHeight: 1.15,
            margin: "0 0 16px",
          }}>
            Trusted by senders<br />on both sides of the corridor
          </h2>

          {/* Aggregate rating */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Stars count={5} />
            <span style={{ color: "#374a60", fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)" }}>4.9/5</span>
            <span style={{ color: "#9AAAB8", fontSize: "14px", fontFamily: "var(--font-body)" }}>from 12,000+ reviews</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}>
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={t.name + active}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(11,60,93,0.12)" }}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(11,60,93,0.06)",
                  border: "1.5px solid rgba(11,60,93,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  cursor: "default",
                }}
              >
                {/* Tag + Stars */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    background: t.tag === "Business" ? "rgba(11,60,93,0.08)" : "rgba(0,168,107,0.1)",
                    color: t.tag === "Business" ? "#0B3C5D" : "#00A86B",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.06em",
                  }}>
                    {t.tag}
                  </span>
                  <Stars count={t.stars} />
                </div>

                {/* Quote */}
                <p style={{
                  color: "#374a60",
                  fontSize: "15px",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                  fontStyle: "italic",
                }}>
                  “{t.quote}”
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(11,60,93,0.06)" }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontWeight: "700", color: "#0B3C5D", fontSize: "14px", fontFamily: "var(--font-display)" }}>{t.name}</div>
                    <div style={{ color: "#9AAAB8", fontSize: "12px", fontFamily: "var(--font-body)" }}>{t.title} · {t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", alignItems: "center" }}>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setActive(a => (a - 1 + testimonials.length) % testimonials.length)}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: "1.5px solid rgba(11,60,93,0.15)",
              background: "#fff", cursor: "pointer", fontSize: "16px", color: "#374a60",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >←</motion.button>

          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{ width: i === active % testimonials.length ? 24 : 8 }}
              style={{
                height: "8px",
                borderRadius: "4px",
                background: i === active % testimonials.length ? "#00A86B" : "rgba(11,60,93,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                padding: 0,
              }}
            />
          ))}

          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setActive(a => (a + 1) % testimonials.length)}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: "1.5px solid rgba(11,60,93,0.15)",
              background: "#fff", cursor: "pointer", fontSize: "16px", color: "#374a60",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >→</motion.button>
        </div>

      </div>
    </section>
  );
}
