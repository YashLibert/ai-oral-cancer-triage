import { motion } from "framer-motion";
import ParticleField from "../components/ParticleField";

export default function CTA({ onLaunch }) {
  return (
    <section style={{
      padding: "120px 80px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Background glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,229,255,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 80% 20%, rgba(244,63,94,0.04) 0%, transparent 55%)
        `,
      }} />

      <ParticleField />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            display: "inline-block",
            padding: "5px 14px",
            background: "rgba(244,63,94,0.08)",
            border: "1px solid rgba(244,63,94,0.2)",
            borderRadius: 20, fontSize: 11, fontWeight: 600,
            color: "#fda4af", letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: "Space Mono, monospace",
            marginBottom: 24,
          }}>
            Ready to Deploy
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, letterSpacing: "-2px",
            color: "#eef2ff", fontFamily: "Outfit, sans-serif",
            lineHeight: 1.08, marginBottom: 20,
          }}>
            Early detection{" "}
            <span style={{
              background: "linear-gradient(135deg, #f43f5e, #f59e0b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              saves lives.
            </span>
          </h2>

          <p style={{
            fontSize: 17, color: "#64748b",
            lineHeight: 1.7, marginBottom: 40,
            maxWidth: 480, margin: "0 auto 40px",
          }}>
            Every second counts. OralAI puts a world-class diagnostic model in the hands of
            healthcare workers in the most remote corners of Maharashtra — and beyond.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              style={{
                padding: "16px 36px",
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                border: "none", borderRadius: 14,
                fontSize: 16, fontWeight: 700,
                color: "#fff", fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
                boxShadow: "0 4px 32px rgba(168,85,247,0.35)",
                letterSpacing: 0.3,
              }}
              onClick={onLaunch}
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 12px 40px rgba(168,85,247,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              🧬 Open Dashboard
            </motion.button>

            <motion.button
              style={{
                padding: "16px 36px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                fontSize: 16, fontWeight: 600,
                color: "#94a3b8", fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
              }}
              whileHover={{ borderColor: "rgba(255,255,255,0.25)", color: "#eef2ff" }}
              whileTap={{ scale: 0.97 }}
            >
              Read the Docs
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}