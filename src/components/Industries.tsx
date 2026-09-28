"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const industries = [
  {
    label: "Remittances",
    description: "Send money home to family across East Africa and the GCC in seconds.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    overlay: "rgba(0,168,107,0.72)",
    shadowColor: "rgba(0,168,107,0.4)",
  },
  {
    label: "Trade Finance",
    description: "Finance cross-border goods, invoices, and supply chains at scale.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600&q=80",
    overlay: "rgba(11,60,93,0.78)",
    shadowColor: "rgba(11,60,93,0.4)",
  },
  {
    label: "E-Commerce",
    description: "Accept and pay out globally with multi-currency checkout flows.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    overlay: "rgba(77,168,218,0.72)",
    shadowColor: "rgba(77,168,218,0.4)",
  },
  {
    label: "FinTech",
    description: "Embed payments, FX, and compliance APIs into your product stack.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    overlay: "rgba(30,30,60,0.82)",
    shadowColor: "rgba(30,30,60,0.4)",
  },
  {
    label: "Payroll & HR",
    description: "Disburse salaries across borders in local currencies, on time.",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=600&q=80",
    overlay: "rgba(126,217,87,0.68)",
    shadowColor: "rgba(126,217,87,0.35)",
  },
  {
    label: "Digital Goods",
    description: "Monetise software, media, and subscriptions across 50+ countries.",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    overlay: "rgba(220,90,40,0.72)",
    shadowColor: "rgba(220,90,40,0.4)",
  },
];

export default function Industries() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{
        background: "#F4F6F8",
        padding: "100px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "56px" }}
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
            Industries
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4.5vw, 50px)",
              fontWeight: "800",
              color: "#0B3C5D",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "600px",
            }}>
              Our solutions resonate with<br />
              your industry’s specific needs
            </h2>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#00A86B",
                fontSize: "15px",
                fontWeight: "700",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View all use cases
              <span style={{ fontSize: "18px" }}>↗</span>
            </motion.a>
          </div>
        </motion.div>

        {/* 3×2 Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 340px)",
          gap: "16px",
        }}>
          {industries.map((ind, i) => (
            <IndustryCard key={ind.label} ind={ind} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
}

function IndustryCard({
  ind,
  index,
  isInView,
}: {
  ind: typeof industries[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover="hovered"
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Background photo */}
      <motion.div
        variants={{ hovered: { scale: 1.06 } }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${ind.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Duotone color overlay */}
      <motion.div
        variants={{ hovered: { opacity: 0.85 } }}
        style={{
          position: "absolute",
          inset: 0,
          background: ind.overlay,
          opacity: 0.78,
          transition: "opacity 0.3s",
          mixBlendMode: "multiply",
        }}
      />

      {/* Grain texture for depth */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        pointerEvents: "none",
        opacity: 0.3,
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.35) 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute",
        inset: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Top: Label */}
        <div style={{
          fontSize: "18px",
          fontWeight: "800",
          color: "#fff",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.01em",
          textShadow: "0 1px 6px rgba(0,0,0,0.2)",
        }}>
          {ind.label}
        </div>

        {/* Bottom row: description + arrow */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
          <motion.p
            variants={{ hovered: { opacity: 1, y: 0 } }}
            initial={{ opacity: 0, y: 8 }}
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "13px",
              fontFamily: "var(--font-body)",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "200px",
            }}
          >
            {ind.description}
          </motion.p>

          {/* Arrow button */}
          <motion.div
            variants={{ hovered: { scale: 1.12, background: "rgba(255,255,255,0.25)" } }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "16px",
              flexShrink: 0,
              transition: "all 0.25s",
            }}
          >
            ↗
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
