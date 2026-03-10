"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── CTA Section ───────────────────────────────────────────────────────────────
export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "80px 24px",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: "linear-gradient(145deg, #0B3C5D 0%, #0d4878 50%, #0B3C5D 100%)",
            borderRadius: "32px",
            padding: "72px 56px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid background */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.12) 1px, transparent 0)`,
            backgroundSize: "36px 36px", pointerEvents: "none",
          }} />

          {/* Glow orbs */}
          <div style={{
            position: "absolute", top: "-80px", left: "-80px",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,168,107,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-100px", right: "-100px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(77,168,218,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            {/* Live pulse badge */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(0,168,107,0.15)",
                border: "1px solid rgba(0,168,107,0.3)",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00A86B" }}
              />
              <span style={{ color: "#00A86B", fontSize: "12px", fontWeight: "700", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.06em" }}>
                Processing transfers right now
              </span>
            </motion.div>

            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(30px, 5vw, 54px)",
              fontWeight: "800",
              color: "#fff",
              lineHeight: 1.12,
              margin: "0 0 20px",
            }}>
              Ready to move money<br />
              <span style={{
                background: "linear-gradient(135deg, #00A86B, #7ED957)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                across the corridor?
              </span>
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "18px",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: "500px",
              margin: "0 auto 40px",
              lineHeight: 1.65,
            }}>
              Join 1M+ users who trust SOKOPAY for fast, low-cost transfers between East Africa and the GCC. Sign up in 2 minutes.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,168,107,0.45)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "linear-gradient(135deg, #00A86B, #009e65)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "17px 40px",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                }}
              >
                Create Free Account →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  borderRadius: "14px",
                  padding: "17px 40px",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "background 0.2s",
                }}
              >
                Talk to Sales
              </motion.button>
            </div>

            {/* Trust badges */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "28px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}>
              {[
                { icon: "🛡️", label: "Bank-level encryption" },
                { icon: "✅", label: "FCA & CBK regulated" },
                { icon: "⚡", label: "No hidden fees" },
                { icon: "🌍", label: "50+ countries" },
              ].map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "15px" }}>{b.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontFamily: "'DM Sans',sans-serif" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
const footerLinks = {
  Products: ["Send Money", "Receive Payments", "Business Account", "API & Integrations", "FX Exchange", "Multi-currency Wallet"],
  Solutions: ["Remittances", "Trade Finance", "Payroll & HR", "E-Commerce", "FinTech", "Digital Goods"],
  Corridors: ["Kenya → UAE", "Uganda → Saudi Arabia", "Tanzania → Qatar", "Ethiopia → UAE", "East Africa Hub"],
  Company: ["About SOKOPAY", "Careers", "Press", "Blog", "Contact Us", "Legal & Privacy"],
  Resources: ["Help Center", "API Documentation", "Developer Portal", "FX Rate Calculator", "Compliance Guide"],
};

const social = [
  { label: "LinkedIn", icon: "in", href: "#" },
  { label: "Twitter / X", icon: "𝕏", href: "#" },
  { label: "Instagram", icon: "◉", href: "#" },
  { label: "YouTube", icon: "▷", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(180deg, #051d30 0%, #040f1a 100%)",
      padding: "72px 24px 40px",
      position: "relative",
    }}>
      {/* Top gradient accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,168,107,0.4), rgba(77,168,218,0.4), transparent)",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "64px",
          marginBottom: "56px",
          paddingBottom: "56px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "9px",
                background: "linear-gradient(135deg, #00A86B, #7ED957)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#fff", fontSize: "17px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>S</span>
              </div>
              <span style={{ color: "#fff", fontSize: "20px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "0.02em" }}>
                SOKO<span style={{ color: "#00A86B" }}>PAY</span>
              </span>
            </div>

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7, marginBottom: "24px" }}>
              Fast, low-cost payments connecting East Africa and the GCC. Move money like it belongs in the 21st century.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {social.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ y: -3, background: "rgba(255,255,255,0.12)" }}
                  title={s.label}
                  style={{
                    width: "36px", height: "36px", borderRadius: "9px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* App badges */}
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              {["App Store", "Google Play"].map(store => (
                <motion.a
                  key={store}
                  href="#"
                  whileHover={{ y: -2 }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "9px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "'DM Sans',sans-serif",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "transform 0.2s",
                  }}
                >
                  {store === "App Store" ? "🍎" : "▶"} {store}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "32px",
          }}>
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <div style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}>
                  {section}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {links.map(link => (
                    <motion.a
                      key={link}
                      href="#"
                      whileHover={{ x: 3, color: "#00A86B" }}
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "13px",
                        fontFamily: "'DM Sans',sans-serif",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        display: "block",
                        lineHeight: 1.4,
                      }}
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory badges */}
        <div style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "32px",
        }}>
          {[
            "🏦 FCA Authorised (UK)",
            "✅ CBK Licensed (Kenya)",
            "🔒 PCI DSS Compliant",
            "🛡️ ISO 27001 Certified",
            "🌐 SWIFT Member",
          ].map(badge => (
            <div
              key={badge}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
                fontSize: "11px",
                fontFamily: "'DM Sans',sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          paddingTop: "28px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px", fontFamily: "'DM Sans',sans-serif" }}>
            © {new Date().getFullYear()} SOKOPAY Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings", "Accessibility"].map(link => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ color: "#00A86B" }}
                style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", fontFamily: "'DM Sans',sans-serif", textDecoration: "none", transition: "color 0.2s" }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
