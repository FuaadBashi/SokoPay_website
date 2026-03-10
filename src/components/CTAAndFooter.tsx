"use client";

import { useEffect, useRef, useState } from "react";

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "linear-gradient(135deg, #0B3C5D 0%, #0d4a72 50%, #083247 100%)", padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-80px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.18) 0%, transparent 70%)", pointerEvents: "none", animation: "float 6s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(126,217,87,0.12) 0%, transparent 70%)", pointerEvents: "none", animation: "float 8s ease-in-out infinite reverse" }} />

      <div style={{ maxWidth: "740px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "100px", background: "rgba(126,217,87,0.12)", border: "1px solid rgba(126,217,87,0.25)", marginBottom: "28px", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7ED957", animation: "blink 1.5s ease infinite" }} />
          <span style={{ color: "#7ED957", fontSize: "13px", fontWeight: "700", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px" }}>Start sending money in under 5 minutes</span>
        </div>

        <h2 style={{ color: "white", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-2px", lineHeight: 1.1, margin: "0 0 20px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 100ms, transform 0.7s ease 100ms" }}>
          Move money across borders.{" "}
          <span style={{ background: "linear-gradient(135deg, #7ED957, #00A86B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Instantly.</span>
        </h2>

        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "20px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: "0 0 48px", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 200ms" }}>
          Join 50,000+ businesses and individuals who trust SOKOPAY for fast, affordable cross-border payments between East Africa and the GCC.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 300ms, transform 0.7s ease 300ms" }}>
          {/* → /signup */}
          <a href="/signup"
            style={{ padding: "16px 36px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", textDecoration: "none", fontSize: "17px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 8px 32px rgba(0,168,107,0.4)", letterSpacing: "-0.3px", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,168,107,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,168,107,0.4)"; }}
          >
            Create Free Account →
          </a>
          {/* → mailto sales */}
          <a href="mailto:sales@sokopay.com"
            style={{ padding: "16px 36px", borderRadius: "14px", background: "rgba(255,255,255,0.08)", color: "white", textDecoration: "none", fontSize: "17px", fontWeight: "600", fontFamily: "'Plus Jakarta Sans', sans-serif", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", letterSpacing: "-0.3px" }}
          >
            Talk to Sales
          </a>
        </div>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 400ms" }}>
          {["🔒 Bank-grade security", "⚡ Under 60 seconds", "💸 Zero FX markup", "🌍 15+ corridors"].map((badge) => (
            <div key={badge} style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: "500" }}>{badge}</div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-20px); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Personal Transfers", href: "/pricing" },
    { label: "Business Payments",  href: "/pricing" },
    { label: "API & Integrations", href: "/pricing" },
    { label: "Pricing",            href: "/pricing" },
    { label: "Changelog",          href: "#" },
  ],
  Company: [
    { label: "About Us",  href: "#" },
    { label: "Careers",   href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Blog",      href: "#" },
    { label: "Contact",   href: "mailto:hello@sokopay.com" },
  ],
  Corridors: [
    { label: "Kenya ↔ UAE",           href: "/#corridors" },
    { label: "Uganda ↔ Saudi Arabia", href: "/#corridors" },
    { label: "Tanzania ↔ Qatar",      href: "/#corridors" },
    { label: "Ethiopia ↔ Kuwait",     href: "/#corridors" },
    { label: "Rwanda ↔ Bahrain",      href: "/#corridors" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "AML Policy",       href: "#" },
    { label: "Cookie Policy",    href: "#" },
    { label: "Licenses",         href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { name: "Twitter / X", icon: "𝕏", href: "https://x.com" },
  { name: "LinkedIn",    icon: "in", href: "https://linkedin.com" },
  { name: "Instagram",   icon: "◉", href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer style={{ background: "#050F18", padding: "72px 40px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,168,107,0.4), rgba(126,217,87,0.4), transparent)" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", marginBottom: "56px" }}>
          {/* Brand */}
          <div style={{ flex: "1.4", minWidth: "240px" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", textDecoration: "none" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #00A86B, #7ED957)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>S</div>
              <span style={{ fontWeight: "800", fontSize: "20px", color: "white", letterSpacing: "-0.5px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                SOKO<span style={{ color: "#00A86B" }}>PAY</span>
              </span>
            </a>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, maxWidth: "280px", margin: "0 0 24px" }}>
              Connecting East Africa and the GCC with fast, secure, and affordable cross-border payments.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIAL_LINKS.map((s) => (
                <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer"
                  style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "700", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,168,107,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,168,107,0.3)"; (e.currentTarget as HTMLElement).style.color = "#00A86B"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} style={{ flex: "1", minWidth: "140px" }}>
              <div style={{ color: "white", fontSize: "13px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.5px", marginBottom: "16px", textTransform: "uppercase" }}>{category}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <a key={link.label} href={link.href}
                    style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00A86B")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "28px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} SOKOPAY Ltd. All rights reserved. Regulated by CBK, FSCA & CBUAE.
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {["🇰🇪","🇹🇿","🇺🇬","🇪🇹","🇷🇼","🇦🇪","🇸🇦","🇶🇦"].map((flag) => (
              <span key={flag} style={{ fontSize: "18px" }}>{flag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
