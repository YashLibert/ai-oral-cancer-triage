import { motion } from "framer-motion";
import StepRow from "../components/StepRow";
import TriageDemo from "../components/TriageDemo";

const STEPS = [
  { num: "01", title: "Enter patient details",    color: "#a855f7", desc: "Input age, tobacco and alcohol history, and lesion duration. This feeds the lifestyle risk model alongside the image scan." },
  { num: "02", title: "Upload the oral scan",     color: "#00e5ff", desc: "Drag and drop or capture directly. The EfficientNet preprocessing pipeline normalizes and prepares the image automatically." },
  { num: "03", title: "AI analysis runs",         color: "#f59e0b", desc: "Image probability and lifestyle risk scores are fused (70/30 weighting) to compute a final clinical risk score in under 8 seconds." },
  { num: "04", title: "Act on the triage result", color: "#f43f5e", desc: "URGENT, HIGH, MODERATE or LOW — each level carries a specific recommendation. Flag, refer, or archive with one tap." },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 80px",
        background: "#0e1120",
        borderTop: "1px solid #1e2440",
        borderBottom: "1px solid #1e2440",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, alignItems: "center",
      }}>
        {/* Left: Steps */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-block",
              padding: "5px 14px",
              background: "rgba(0,229,255,0.07)",
              border: "1px solid rgba(0,229,255,0.18)",
              borderRadius: 20, fontSize: 11, fontWeight: 600,
              color: "#00e5ff", letterSpacing: 1.5,
              textTransform: "uppercase",
              fontFamily: "Space Mono, monospace",
              marginBottom: 20,
            }}
          >
            Simple Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 900, letterSpacing: "-1.2px",
              color: "#eef2ff", fontFamily: "Outfit, sans-serif",
              marginBottom: 48, lineHeight: 1.1,
            }}
          >
            From photo to{" "}
            <span style={{
              background: "linear-gradient(90deg, #f43f5e, #f59e0b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              clinical decision
            </span>{" "}
            in 4 steps.
          </motion.h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {STEPS.map((s, i) => <StepRow key={i} {...s} delay={i * 0.1} />)}
          </div>
        </div>

        {/* Right: Triage demo */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              background: "#07080f",
              border: "1px solid #1e2440",
              borderRadius: 20, padding: 28,
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Glow */}
            <div style={{
              position: "absolute", top: -50, right: -50,
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{
              fontSize: 11, fontWeight: 700,
              color: "#475569", letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "Space Mono, monospace",
              marginBottom: 20,
            }}>
              Triage Outcome Examples
            </div>

            <TriageDemo />

            <div style={{
              marginTop: 20, padding: "12px 16px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid #1e2440",
              borderRadius: 10,
              fontSize: 12, color: "#475569", lineHeight: 1.6,
            }}>
              Final risk = <strong style={{ color: "#00e5ff" }}>70%</strong> × Image Score +{" "}
              <strong style={{ color: "#a855f7" }}>30%</strong> × Lifestyle Factors
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}