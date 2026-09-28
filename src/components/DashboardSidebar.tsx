"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Overview",
    href: "/dashboard",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3L15 9M15 9L9 15M15 9H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Send Money",
    href: "/dashboard/send",
    badge: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 15L3 9M3 9L9 3M3 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Receive",
    href: "/dashboard/receive",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 9h14M9 2l5 7-5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: "FX Exchange",
    href: "/dashboard/exchange",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M1 13V7a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1 8h16" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="5" cy="11" r="1" fill="currentColor"/>
      </svg>
    ),
    label: "Transactions",
    href: "/dashboard/transactions",
    badge: "3",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Scheduled",
    href: "/dashboard/scheduled",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2a5 5 0 100 10A5 5 0 009 2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3.5 15.5c0-2.5 2.5-4 5.5-4s5.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Recipients",
    href: "/dashboard/recipients",
  },
];

const bottomNav = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 16c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: "linear-gradient(180deg, #0B3C5D 0%, #082a44 100%)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        overflow: "hidden",
        zIndex: 40,
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? "24px 0" : "24px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        minHeight: "72px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "9px",
            background: "linear-gradient(135deg, #00A86B, #7ED957)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: "800", fontFamily: "var(--font-display)" }}>S</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: "#fff",
                  fontSize: "17px",
                  fontWeight: "800",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                SOKO<span style={{ color: "#00A86B" }}>PAY</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {!collapsed && (
          <motion.button
            onClick={() => setCollapsed(true)}
            whileHover={{ background: "rgba(255,255,255,0.1)" }}
            style={{
              width: "28px", height: "28px", borderRadius: "7px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", flexShrink: 0,
            }}
          >
            ‹
          </motion.button>
        )}

        {collapsed && (
          <motion.button
            onClick={() => setCollapsed(false)}
            whileHover={{ background: "rgba(255,255,255,0.1)" }}
            style={{
              position: "absolute",
              right: "-12px",
              top: "24px",
              width: "24px", height: "24px", borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "#0B3C5D",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ›
          </motion.button>
        )}
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ background: active ? undefined : "rgba(255,255,255,0.07)", x: active ? 0 : 2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: collapsed ? "11px 0" : "11px 14px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: "12px",
                  background: active ? "rgba(0,168,107,0.18)" : "transparent",
                  color: active ? "#00A86B" : "rgba(255,255,255,0.5)",
                  transition: "background 0.15s, color 0.15s",
                  position: "relative",
                  cursor: "pointer",
                }}
                title={collapsed ? item.label : undefined}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: "absolute",
                      left: 0, top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "20px",
                      borderRadius: "0 2px 2px 0",
                      background: "#00A86B",
                    }}
                  />
                )}

                <span style={{ flexShrink: 0, display: "flex" }}>{item.icon}</span>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        fontSize: "14px",
                        fontWeight: active ? "700" : "500",
                        fontFamily: "var(--font-display)",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!collapsed && item.badge && (
                  <span style={{
                    background: "#00A86B",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "800",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                  }}>
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ padding: "0 12px 16px", overflow: "hidden" }}
          >
            <div style={{
              background: "linear-gradient(135deg, rgba(0,168,107,0.2), rgba(126,217,87,0.1))",
              border: "1px solid rgba(0,168,107,0.25)",
              borderRadius: "14px",
              padding: "16px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#00A86B", marginBottom: "4px", fontFamily: "var(--font-display)" }}>
                Upgrade to Plus
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", lineHeight: 1.5, marginBottom: "12px" }}>
                Better rates, scheduled transfers & more.
              </div>
              <button style={{
                width: "100%",
                padding: "8px",
                borderRadius: "9px",
                background: "linear-gradient(135deg, #00A86B, #009e65)",
                color: "#fff",
                border: "none",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
              }}>
                Upgrade →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom nav */}
      <div style={{
        padding: "12px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}>
        {bottomNav.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ background: "rgba(255,255,255,0.07)" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: collapsed ? "10px 0" : "10px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "10px",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ flexShrink: 0, display: "flex" }}>{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ fontSize: "13px", fontFamily: "var(--font-display)", fontWeight: "500", whiteSpace: "nowrap" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}
