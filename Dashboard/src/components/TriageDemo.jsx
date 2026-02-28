import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ITEMS = [
  { label: "URGENT REFERRAL", color: "#f43f5e", bg: "rgba(244,63,94,0.12)",  border: "rgba(244,63,94,0.3)",  pct: 82, icon: "🚨" },
  { label: "HIGH RISK",       color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)", pct: 64, icon: "⚠️" },
  { label: "MODERATE RISK",   color: "#a855f7", bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.25)", pct: 38, icon: "🟣" },
  { label: "LOW RISK",        color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)",  pct: 14, icon: "✅" },
];

export default function TriageDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px",
            background: item.bg,
            border: `1px solid ${item.border}`,
            borderRadius: 12,
          }}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          <span style={{
            fontSize: 12, fontWeight: 700, color: item.color,
            letterSpacing: 0.5, flex: 1, fontFamily: "Outfit, sans-serif",
          }}>
            {item.label}
          </span>
          <div style={{ width: 80, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: item.color, borderRadius: 3 }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${item.pct}%` } : {}}
              transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>
          <span style={{
            fontFamily: "Space Mono, monospace", fontSize: 11,
            color: item.color, width: 32, textAlign: "right",
          }}>
            {item.pct}%
          </span>
        </motion.div>
      ))}
    </div>
  );
}