import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { val: "96.2%",   label: "Diagnostic Accuracy", sub: "Validated on clinical dataset",  color: "#00e5ff" },
  { val: "< 8s",    label: "Time to Result",       sub: "vs 45 min manual assessment",    color: "#a855f7" },
  { val: "4-Level", label: "Triage System",        sub: "URGENT · HIGH · MODERATE · LOW", color: "#f59e0b" },
  { val: "70/30",   label: "Risk Fusion Model",    sub: "Image + Lifestyle factors",       color: "#f43f5e" },
];

function StatItem({ val, label, sub, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        padding: "24px 36px",
        borderRight: index < 3 ? "1px solid #1e2440" : "none",
        textAlign: "center",
      }}
    >
      <div style={{
        fontFamily: "Space Mono, monospace",
        fontSize: 30, fontWeight: 700,
        color, letterSpacing: -1, marginBottom: 4,
      }}>
        {val}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#eef2ff", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#475569" }}>{sub}</div>
    </motion.div>
  );
}

export default function StatsBand() {
  return (
    <section style={{
      background: "#0e1120",
      borderTop: "1px solid #1e2440",
      borderBottom: "1px solid #1e2440",
      padding: "40px 80px",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
      }}>
        {STATS.map((s, i) => (
          <StatItem key={i} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}