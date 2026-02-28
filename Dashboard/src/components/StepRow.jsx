import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function StepRow({ num, title, desc, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: `${color}12`,
        border: `2px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        fontFamily: "Space Mono, monospace",
        fontSize: 14, fontWeight: 700, color,
      }}>
        {num}
      </div>
      <div style={{ paddingTop: 6 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#eef2ff", fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}