import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FeatureCard({ icon, title, desc, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "#0e1120",
        border: `1px solid ${color}22`,
        borderRadius: 20,
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{
        borderColor: `${color}55`,
        boxShadow: `0 0 40px ${color}10`,
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: "absolute", bottom: -30, right: -30,
        width: 100, height: 100,
        borderRadius: "50%",
        background: color, opacity: 0.05,
        filter: "blur(20px)", pointerEvents: "none",
      }} />

      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${color}15`,
        border: `1px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, marginBottom: 16,
      }}>
        {icon}
      </div>

      <div style={{
        fontSize: 16, fontWeight: 700,
        color: "#eef2ff", marginBottom: 8,
        fontFamily: "Outfit, sans-serif", letterSpacing: "-0.3px",
      }}>
        {title}
      </div>

      <div style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>
        {desc}
      </div>
    </motion.div>
  );
}