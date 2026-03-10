"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "50+", label: "Countries Served", icon: "🌍" },
  { value: "$2B+", label: "Processed Annually", icon: "💸" },
  { value: "200ms", label: "Avg Transfer Speed", icon: "⚡" },
  { value: "99.98%", label: "Uptime SLA", icon: "🛡️" },
  { value: "1M+", label: "Active Users", icon: "👥" },
];

const partners = [
  { name: "M-Pesa", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/M-pesa_logo.png/320px-M-pesa_logo.png" },
  { name: "Visa", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png" },
  { name: "Mastercard", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/320px-Mastercard-logo.svg.png" },
  { name: "Western Union", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Western_Union_logo.svg/320px-Western_Union_logo.svg.png" },
  { name: "Flutterwave", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flutterwave_Logo.svg/320px-Flutterwave_Logo.svg.png" },
];

export default function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #0B3C5D 0%, #0a3252 60%, #082a44 100%)",
        padding: "72px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.12) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
          pointerEvents: "none",
        }}
      />

      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: "-60px", left: "-60px", width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(0,168,107,0.18) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-80px", right: "-40px", width: "320px", height: "320px",
        background: "radial-gradient(circle, rgba(77,168,218,0.14) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "32px",
          marginBottom: "64px",
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, scale: 1.03 }}
              style={{
                textAlign: "center",
                padding: "28px 20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
              <div style={{
                fontSize: "36px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #00A86B, #7ED957)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.1,
                marginBottom: "6px",
              }}>{stat.value}</div>
              <div style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(77,168,218,0.4), transparent)",
            marginBottom: "48px",
          }}
        />

        {/* Partners label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: "12px",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Trusted integrations & partners
        </motion.p>

        {/* Partner logos */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}>
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              whileHover={{ opacity: 1, scale: 1.08 }}
              style={{
                height: "32px",
                display: "flex",
                alignItems: "center",
                filter: "brightness(0) invert(1)",
                opacity: 0.4,
                transition: "opacity 0.3s, filter 0.3s",
              }}
            >
              <img
                src={p.url}
                alt={p.name}
                style={{ height: "100%", width: "auto", objectFit: "contain" }}
                onError={(e) => {
                  const el = e.currentTarget.parentElement!;
                  el.innerHTML = `<span style="color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;letter-spacing:0.05em">${p.name}</span>`;
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
