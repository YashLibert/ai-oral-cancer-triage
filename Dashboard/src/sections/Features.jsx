import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";

const FEATURES = [
  { icon: "🧬", title: "EfficientNet AI Model",      color: "#00e5ff", delay: 0,    desc: "Deep learning model trained on thousands of oral tissue images, achieving 96.2% diagnostic accuracy across malignant and benign classifications." },
  { icon: "⚡", title: "Results in Under 8 Seconds", color: "#a855f7", delay: 0.08, desc: "Replaces 45-minute manual assessments with instant AI analysis. Healthcare workers get actionable triage decisions on the spot." },
  { icon: "🎯", title: "4-Level Triage System",      color: "#f43f5e", delay: 0.16, desc: "Every scan is risk-fused with lifestyle factors — age, tobacco, alcohol, lesion duration — to produce an evidence-based referral priority." },
  { icon: "🌍", title: "Rural Camp Mode",             color: "#f59e0b", delay: 0.24, desc: "Built for low-resource field environments. Works offline-capable, handles high-volume screening queues, and exports camp reports." },
  { icon: "🔒", title: "HIPAA-Ready Architecture",   color: "#10b981", delay: 0.32, desc: "Patient records stay local. No image data leaves the device without explicit export. Designed with clinic-grade data handling in mind." },
  { icon: "📊", title: "Longitudinal Analytics",     color: "#ec4899", delay: 0.40, desc: "Track screening trends across camps, flag recurring high-risk demographics, and generate shareable clinical reports for NGO partners." },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: "100px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              padding: "5px 14px",
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: 20, fontSize: 11, fontWeight: 600,
              color: "#d8b4fe", letterSpacing: 1.5,
              textTransform: "uppercase",
              fontFamily: "Space Mono, monospace",
              marginBottom: 20,
            }}
          >
            Built for the Field
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900, letterSpacing: "-1.5px",
              color: "#eef2ff", fontFamily: "Outfit, sans-serif",
              marginBottom: 14,
            }}
          >
            Everything a screener needs.{" "}
            <span style={{
              background: "linear-gradient(90deg, #a855f7, #00e5ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Nothing they don't.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 16, color: "#64748b", maxWidth: 520, margin: "0 auto" }}
          >
            Designed with community health workers in mind — powerful enough for specialists, simple enough for camps.
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}