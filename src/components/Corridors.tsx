"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const eastAfrica = [
  { city: "Nairobi",       country: "Kenya",     flag: "🇰🇪", pop: "4.7M users", x: 548, y: 292, color: "#00A86B" },
  { city: "Kampala",       country: "Uganda",    flag: "🇺🇬", pop: "1.2M users", x: 532, y: 278, color: "#00A86B" },
  { city: "Dar es Salaam", country: "Tanzania",  flag: "🇹🇿", pop: "890K users",  x: 552, y: 314, color: "#00A86B" },
  { city: "Addis Ababa",   country: "Ethiopia",  flag: "🇪🇹", pop: "2.1M users",  x: 572, y: 262, color: "#00A86B" },
  { city: "Kigali",        country: "Rwanda",    flag: "🇷🇼", pop: "640K users",  x: 524, y: 294, color: "#00A86B" },
];

const gcc = [
  { city: "Dubai",         country: "UAE",           flag: "🇦🇪", pop: "5.9M users", x: 656, y: 228, color: "#4DA8DA" },
  { city: "Riyadh",        country: "Saudi Arabia",  flag: "🇸🇦", pop: "3.2M users", x: 630, y: 216, color: "#4DA8DA" },
  { city: "Doha",          country: "Qatar",         flag: "🇶🇦", pop: "1.8M users", x: 644, y: 234, color: "#4DA8DA" },
  { city: "Abu Dhabi",     country: "UAE",           flag: "🇦🇪", pop: "2.4M users", x: 650, y: 242, color: "#4DA8DA" },
  { city: "Kuwait City",   country: "Kuwait",        flag: "🇰🇼", pop: "980K users", x: 636, y: 208, color: "#4DA8DA" },
];

const connections = [
  [0, 0], [0, 1], [1, 0], [2, 2], [2, 3], [3, 1], [3, 4], [4, 0],
];

const stats = [
  { value: "23M+",    label: "People in corridor" },
  { value: "$18B",    label: "Annual flow" },
  { value: "0.8%",    label: "Avg FX spread" },
  { value: "< 3 min", label: "Avg transfer" },
];

function ArcLine({ x1, y1, x2, y2, delay, idx }: {
  x1: number; y1: number; x2: number; y2: number; delay: number; idx: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (Math.min(y1, y2)) - 35 - (idx % 3) * 8;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const dotId = `dot-${idx}`;

  return (
    <g>
      <path d={d} fill="none" stroke="rgba(0,168,107,0.1)" strokeWidth="1"/>
      <motion.path
        d={d} fill="none"
        stroke="url(#arcGrad)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 1.4, delay, ease: "easeInOut" }}
      />
      {/* Traveling dot */}
      <motion.circle r="2.8" fill="#7ED957" filter="url(#dotGlow)">
        <animateMotion dur={`${2.2 + (idx % 3) * 0.4}s`} begin={`${delay + 0.6}s`} repeatCount="indefinite" path={d}/>
      </motion.circle>
    </g>
  );
}

export default function Corridors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{
      background: "linear-gradient(160deg, #0B3C5D 0%, #082a44 55%, #051d30 100%)",
      padding: "100px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(77,168,218,0.07) 1px, transparent 0)`,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }} ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <span style={{
            display: "inline-block", background: "rgba(0,168,107,0.15)", color: "#00A86B",
            fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif",
          }}>Payment Corridors</span>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: "800", color: "#fff", lineHeight: 1.15, margin: "0 0 16px",
          }}>East Africa ↔ GCC</h2>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "17px", fontFamily: "'DM Sans', sans-serif",
            maxWidth: "500px", margin: "0 auto", lineHeight: 1.65,
          }}>
            The world's fastest-growing remittance corridor. SOKOPAY connects every major hub with real-time rails.
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "190px 1fr 190px", gap: "20px", alignItems: "center" }}>

          {/* EA list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <div style={{ color: "#00A86B", fontSize: "10px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'DM Sans',sans-serif" }}>
              East Africa
            </div>
            {eastAfrica.map((c, i) => (
              <motion.div key={c.city}
                initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.07 }}
                onHoverStart={() => setHovered(c.city)} onHoverEnd={() => setHovered(null)}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "12px",
                  background: hovered === c.city ? "rgba(0,168,107,0.18)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${hovered === c.city ? "rgba(0,168,107,0.45)" : "rgba(255,255,255,0.07)"}`,
                  cursor: "default", transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "18px" }}>{c.flag}</span>
                <div>
                  <div style={{ color: "#fff", fontSize: "12px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.2 }}>{c.city}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>{c.pop}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* SVG MAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              background: "rgba(5,29,48,0.6)", borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden",
            }}
          >
            <svg viewBox="440 150 290 220" style={{ width: "100%", display: "block" }}>
              <defs>
                <filter id="dotGlow">
                  <feGaussianBlur stdDeviation="2" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="cityGlow">
                  <feGaussianBlur stdDeviation="3.5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00A86B"/>
                  <stop offset="100%" stopColor="#4DA8DA"/>
                </linearGradient>
                <radialGradient id="eaHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00A86B" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#00A86B" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="gccHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4DA8DA" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#4DA8DA" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* Grid lines */}
              {[170,200,230,260,290,320,350].map(y=>(
                <line key={y} x1="440" y1={y} x2="730" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
              ))}
              {[460,490,520,550,580,610,640,670,700,730].map(x=>(
                <line key={x} x1={x} y1="150" x2={x} y2="370" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
              ))}

              {/* ── Continent shapes (simplified but geographically correct) ── */}

              {/* African Horn + East Africa */}
              <path d="
                M 490 158 L 502 152 L 516 150 L 530 152 L 542 158 L 552 166 L 558 178
                L 560 192 L 562 208 L 564 224 L 566 240 L 566 256 L 564 270 L 560 284
                L 556 298 L 554 312 L 556 326 L 560 338 L 558 350 L 548 358 L 536 362
                L 524 360 L 514 354 L 506 344 L 500 332 L 494 318 L 490 302 L 488 286
                L 486 270 L 484 254 L 483 238 L 484 222 L 486 206 L 488 190 L 489 174 Z
              " fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" strokeLinejoin="round"/>

              {/* Horn of Africa protrusion */}
              <path d="
                M 564 224 L 574 216 L 588 210 L 600 214 L 606 224 L 600 234 L 588 240
                L 576 240 L 566 240 Z
              " fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" strokeLinejoin="round"/>

              {/* Arabian Peninsula */}
              <path d="
                M 608 174 L 622 168 L 636 165 L 650 168 L 662 176 L 668 188 L 666 202
                L 660 214 L 652 224 L 642 232 L 630 236 L 618 232 L 608 224 L 602 212
                L 600 198 L 604 186 Z
              " fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" strokeLinejoin="round"/>

              {/* Sinai / coastal connection */}
              <path d="M 608 174 L 602 166 L 596 162 L 590 162 L 586 168 L 590 174 L 598 176 Z"
                fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>

              {/* Red Sea — subtle water gap */}
              <path d="M 586 168 Q 594 200 600 232" fill="none" stroke="rgba(77,168,218,0.15)" strokeWidth="6"/>

              {/* Gulf of Aden */}
              <path d="M 566 240 Q 580 236 600 234" fill="none" stroke="rgba(77,168,218,0.12)" strokeWidth="4"/>

              {/* Region halos */}
              <ellipse cx="542" cy="290" rx="42" ry="38" fill="url(#eaHalo)"/>
              <ellipse cx="638" cy="210" rx="36" ry="30" fill="url(#gccHalo)"/>

              {/* ── Arcs ── */}
              {isInView && connections.map(([fi, ti], idx) => (
                <ArcLine
                  key={idx}
                  x1={eastAfrica[fi].x} y1={eastAfrica[fi].y}
                  x2={gcc[ti].x} y2={gcc[ti].y}
                  delay={0.65 + idx * 0.1}
                  idx={idx}
                />
              ))}

              {/* ── EA dots ── */}
              {eastAfrica.map((c, i) => (
                <g key={c.city}>
                  {isInView && (
                    <motion.circle cx={c.x} cy={c.y} r="9" fill="none" stroke="#00A86B" strokeWidth="1"
                      animate={{ r: [9, 20, 9], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.8, delay: 0.4 + i * 0.22, repeat: Infinity }}
                    />
                  )}
                  <motion.circle cx={c.x} cy={c.y} r="5.5" fill="#00A86B" filter="url(#cityGlow)"
                    initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 280, damping: 14 }}
                  />
                  <circle cx={c.x} cy={c.y} r="2.5" fill="#fff" opacity="0.95"/>
                  <motion.text x={c.x - 4} y={c.y + 14} fontSize="6.5"
                    fill="rgba(255,255,255,0.65)" fontFamily="'DM Sans',sans-serif" fontWeight="600"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.85 + i * 0.08 }}
                  >{c.city}</motion.text>
                </g>
              ))}

              {/* ── GCC dots ── */}
              {gcc.map((c, i) => (
                <g key={c.city}>
                  {isInView && (
                    <motion.circle cx={c.x} cy={c.y} r="8" fill="none" stroke="#4DA8DA" strokeWidth="1"
                      animate={{ r: [8, 18, 8], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.8, delay: 0.5 + i * 0.2, repeat: Infinity }}
                    />
                  )}
                  <motion.circle cx={c.x} cy={c.y} r="5.5" fill="#4DA8DA" filter="url(#cityGlow)"
                    initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 280, damping: 14 }}
                  />
                  <circle cx={c.x} cy={c.y} r="2.5" fill="#fff" opacity="0.95"/>
                  <motion.text x={c.x + 8} y={c.y + 4} fontSize="6.5"
                    fill="rgba(255,255,255,0.65)" fontFamily="'DM Sans',sans-serif" fontWeight="600"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.9 + i * 0.08 }}
                  >{c.city}</motion.text>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(450, 358)">
                <rect x="-4" y="-10" width="250" height="18" rx="5" fill="rgba(0,0,0,0.3)"/>
                <circle cx="4" cy="0" r="3.5" fill="#00A86B"/>
                <text x="12" y="4" fontSize="6.5" fill="rgba(255,255,255,0.5)" fontFamily="'DM Sans',sans-serif">East Africa hub</text>
                <circle cx="90" cy="0" r="3.5" fill="#4DA8DA"/>
                <text x="98" y="4" fontSize="6.5" fill="rgba(255,255,255,0.5)" fontFamily="'DM Sans',sans-serif">GCC hub</text>
                <circle cx="150" cy="0" r="3" fill="#7ED957"/>
                <text x="158" y="4" fontSize="6.5" fill="rgba(255,255,255,0.5)" fontFamily="'DM Sans',sans-serif">Live transfer</text>
              </g>

              {/* LIVE badge */}
              <g transform="translate(700, 162)">
                <rect x="-28" y="-10" width="54" height="18" rx="9" fill="rgba(0,168,107,0.18)" stroke="rgba(0,168,107,0.45)" strokeWidth="0.8"/>
                <circle cx="-16" cy="0" r="3" fill="#00A86B">
                  <animate attributeName="opacity" values="1;0.15;1" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <text x="-8" y="4" fontSize="7" fill="#00A86B" fontFamily="'DM Sans',sans-serif" fontWeight="700">LIVE</text>
              </g>
            </svg>
          </motion.div>

          {/* GCC list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <div style={{ color: "#4DA8DA", fontSize: "10px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'DM Sans',sans-serif", textAlign: "right" }}>
              GCC
            </div>
            {gcc.map((c, i) => (
              <motion.div key={c.city}
                initial={{ opacity: 0, x: 16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.07 }}
                onHoverStart={() => setHovered(c.city)} onHoverEnd={() => setHovered(null)}
                whileHover={{ x: -4 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "12px",
                  background: hovered === c.city ? "rgba(77,168,218,0.18)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${hovered === c.city ? "rgba(77,168,218,0.45)" : "rgba(255,255,255,0.07)"}`,
                  cursor: "default", transition: "all 0.2s",
                  flexDirection: "row-reverse", textAlign: "right" as const,
                }}
              >
                <span style={{ fontSize: "18px" }}>{c.flag}</span>
                <div>
                  <div style={{ color: "#fff", fontSize: "12px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.2 }}>{c.city}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>{c.pop}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: "rgba(255,255,255,0.07)",
            borderRadius: "20px", overflow: "hidden", marginTop: "40px",
          }}
        >
          {stats.map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", padding: "28px 24px", textAlign: "center" }}>
              <div style={{
                fontSize: "32px", fontWeight: "800",
                background: "linear-gradient(135deg, #00A86B, #7ED957)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px",
              }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
