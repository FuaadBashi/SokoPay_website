"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const products = [
  {
    tag: "For Businesses",
    id: "b2b",
    title: "SOKOPAY Business",
    subtitle: "Power your trade finance",
    description:
      "Built for SMEs, importers, and exporters operating across the East Africa ↔ GCC corridor. Batch payments, API integrations, multi-currency wallets, and dedicated compliance support.",
    color: "#0B3C5D",
    accent: "#4DA8DA",
    gradient: "linear-gradient(135deg, #0B3C5D 0%, #0e4a73 100%)",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=600&q=80",
    features: [
      "Bulk payment disbursements",
      "Live FX with rate lock",
      "API & ERP integration",
      "Multi-currency treasury",
      "Dedicated account manager",
      "AML/KYB compliance tools",
    ],
    cta: "Open Business Account",
    stat: "$500K+ average monthly volume",
    cities: ["Nairobi", "Dubai", "Riyadh", "Kampala"],
    cityImages: [
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=80&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=80&q=80",
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=80&q=80",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80",
    ],
  },
  {
    tag: "For Individuals",
    id: "b2c",
    title: "SOKOPAY Personal",
    subtitle: "Send money home, instantly",
    description:
      "Perfect for workers, families, and freelancers sending money between East Africa and the Gulf. Lock in great rates, track in real time, and arrive in minutes.",
    color: "#00A86B",
    accent: "#7ED957",
    gradient: "linear-gradient(135deg, #00A86B 0%, #009e65 100%)",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    features: [
      "Send from $5 with low fees",
      "M-Pesa, Airtel Money support",
      "Live exchange rate tracker",
      "Scheduled & recurring sends",
      "24/7 multilingual support",
      "Instant delivery receipts",
    ],
    cta: "Send Money Now",
    stat: "2M+ transfers completed",
    cities: ["Dar es Salaam", "Abu Dhabi", "Mombasa", "Doha"],
    cityImages: [
      "https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?w=80&q=80",
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=80&q=80",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=80&q=80",
      "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=80&q=80",
    ],
  },
];

function ProductCard({ product, index, isInView }: { product: typeof products[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isB2B = product.id === "b2b";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: isB2B ? -8 : 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.15 + index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -12, boxShadow: `0 32px 80px ${product.color}30` }}
      style={{
        borderRadius: "28px",
        overflow: "hidden",
        background: "#fff",
        border: `1px solid ${product.color}18`,
        position: "relative",
        cursor: "default",
        boxShadow: "0 8px 40px rgba(11,60,93,0.1)",
      }}
    >
      {/* Tag */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 10,
        background: product.gradient,
        color: "#fff",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "5px 14px",
        borderRadius: "100px",
        fontFamily: "var(--font-body)",
      }}>
        {product.tag}
      </div>

      {/* Hero image */}
      <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
        <motion.img
          src={product.image}
          alt={product.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(0deg, ${product.color}cc 0%, transparent 55%)`,
        }} />

        {/* City thumbnails */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          display: "flex",
          gap: "8px",
        }}>
          {product.cityImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.2 + i * 0.07 }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.6)",
              }}
              title={product.cities[i]}
            >
              <img src={img} alt={product.cities[i]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 28px 32px" }}>
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "26px",
              fontWeight: "800",
              color: "#0B3C5D",
              margin: "0 0 4px",
              lineHeight: 1.2,
            }}>
              {product.title}
            </h3>
            <p style={{
              color: product.color,
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "var(--font-body)",
              margin: 0,
            }}>
              {product.subtitle}
            </p>
          </div>
          <div style={{
            background: `${product.color}14`,
            borderRadius: "12px",
            padding: "8px 14px",
            textAlign: "right",
          }}>
            <div style={{
              fontSize: "11px",
              color: product.color,
              fontFamily: "var(--font-body)",
              fontWeight: "600",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}>
              {product.stat}
            </div>
          </div>
        </div>

        <p style={{
          color: "#6B7A8D",
          fontSize: "15px",
          fontFamily: "var(--font-body)",
          lineHeight: 1.65,
          margin: "16px 0 24px",
        }}>
          {product.description}
        </p>

        {/* Features grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "28px",
        }}>
          {product.features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2 + i * 0.06 }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "13px",
                color: "#374a60",
                fontFamily: "var(--font-body)",
                lineHeight: 1.4,
              }}
            >
              <span style={{ color: product.color, flexShrink: 0, marginTop: "1px" }}>✓</span>
              {f}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${product.color}40` }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "100%",
            background: product.gradient,
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            padding: "16px 24px",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "var(--font-display)",
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
        >
          {product.cta} →
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 24px",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #0B3C5D, #4DA8DA, #00A86B, #7ED957)",
      }} />

      <div style={{
        position: "absolute",
        bottom: "-300px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(77,168,218,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span style={{
            display: "inline-block",
            background: "rgba(77,168,218,0.1)",
            color: "#4DA8DA",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "100px",
            marginBottom: "16px",
            fontFamily: "var(--font-body)",
          }}>
            Our Products
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "800",
            color: "#0B3C5D",
            lineHeight: 1.15,
            margin: "0 0 20px",
          }}>
            One platform,<br />
            <span style={{
              background: "linear-gradient(135deg, #0B3C5D, #4DA8DA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              two powerful solutions
            </span>
          </h2>
          <p style={{
            color: "#6B7A8D",
            fontSize: "18px",
            fontFamily: "var(--font-body)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Whether you run a business or support your family — SOKOPAY has a product built exactly for you.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "32px",
        }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
