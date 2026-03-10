"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ── Variants — choose your transition style ───────────────────────────────────
const variants = {
  // Smooth fade + slight upward drift (default)
  fadeUp: {
    initial: { opacity: 0, y: 16, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit:    { opacity: 0, y: -10, scale: 0.995 },
  },
  // Slide from right (great for wizard flows)
  slideRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -40 },
  },
};

const transition = {
  duration: 0.38,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
}

export default function PageTransition({
  children,
  variant = "fadeUp",
}: PageTransitionProps) {
  const pathname = usePathname();
  const v = variants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={transition}
        style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
