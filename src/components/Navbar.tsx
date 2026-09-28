"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 40px", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(11,60,93,0.08)" : "none",
      }}
    >
      {/* Logo → home */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #00A86B, #7ED957)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", color: "white", fontFamily: "var(--font-display)" }}>S</div>
        <span style={{ fontWeight: "800", fontSize: "20px", color: scrolled ? "#0B3C5D" : "white", letterSpacing: "-0.5px", fontFamily: "var(--font-display)" }}>
          SOKO<span style={{ color: "#00A86B" }}>PAY</span>
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {[
          // Dedicated pages; the old "/#products"-style anchors pointed at sections the home
          // page doesn't have, so those links did nothing.
          { label: "Products",  href: "/products" },
          { label: "Corridors", href: "/corridors" },
          { label: "Pricing",   href: "/pricing" },
          { label: "About",     href: "/about" },
        ].map((link) => (
          <Link key={link.label} href={link.href} style={{ color: scrolled ? "#0B3C5D" : "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "15px", fontWeight: "500", fontFamily: "var(--font-body)", transition: "color 0.2s ease" }}>
            {link.label}
          </Link>
        ))}

        {/* Log in → dashboard */}
        <a href="/dashboard" style={{ color: scrolled ? "#0B3C5D" : "white", textDecoration: "none", fontSize: "15px", fontWeight: "500", fontFamily: "var(--font-body)", transition: "color 0.2s ease" }}>
          Log in
        </a>

        {/* Get Started → signup */}
        <a href="/signup"
          style={{ padding: "10px 22px", borderRadius: "10px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", textDecoration: "none", fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-display)", boxShadow: "0 4px 16px rgba(0,168,107,0.35)", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,168,107,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,168,107,0.35)"; }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
