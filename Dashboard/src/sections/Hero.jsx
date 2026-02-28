import { motion, useScroll, useTransform } from "framer-motion";
import ParticleField from "../components/ParticleField";
import ScanViz from "../components/ScanViz";
import Counter from "../components/Counter";

const TRUST_STATS = [
  { val: <Counter to={1284} />,              label: "Scans processed", color: "#00e5ff" },
  { val: <><Counter to={96} />%</>,           label: "Model accuracy",  color: "#a855f7" },
  { val: <><Counter to={8} suffix="s" /></>,  label: "Avg. response",   color: "#f59e0b" },
  { val: <Counter to={47} />,                label: "Cases flagged",   color: "#f43f5e" },
];

export default function Hero({ onLaunch }) {
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOp = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "100px 80px 80px",
    }}>
      {/* Mesh background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 90% 70% at 5% 0%, rgba(168,85,247,0.1) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 95% 100%, rgba(0,229,255,0.09) 0%, transparent 55%),
          radial-gradient(ellipse 50% 60% at 50% 50%, rgba(244,63,94,0.04) 0%, transparent 60%)
        `,
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }} />

      <ParticleField />

      <div style={{
        maxWidth: 1280, width: "100%", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, alignItems: "center",
        position: "relative", zIndex: 2,
      }}>
        {/* ── Left: Text ── */}
        <motion.div style={{ y: heroY, opacity: heroOp }}>
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px",
              background: "rgba(0,229,255,0.07)",
              border: "1px solid rgba(0,229,255,0.18)",
              borderRadius: 20,
              fontSize: 11, fontWeight: 600,
              color: "#00e5ff", letterSpacing: 1.2,
              textTransform: "uppercase",
              marginBottom: 24,
              fontFamily: "Space Mono, monospace",
            }}
          >
            <motion.div
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e5ff" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            AI-Powered Oral Cancer Screening
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(38px, 5vw, 64px)",
              fontWeight: 900, lineHeight: 1.08,
              letterSpacing: "-2px",
              color: "#eef2ff", marginBottom: 24,
            }}
          >
            Detect oral cancer{" "}
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #00e5ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              before it's
            </span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #f43f5e, #f59e0b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              too late.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              fontSize: 17, color: "#64748b",
              lineHeight: 1.7, marginBottom: 40,
              maxWidth: 480, fontWeight: 400,
            }}
          >
            OralAI brings hospital-grade diagnostics to rural camps. Upload a photo,
            enter patient details, and receive an evidence-based{" "}
            <span style={{ color: "#94a3b8", fontWeight: 500 }}>triage decision in under 8 seconds</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <motion.button
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #00e5ff, #0070f3)",
                border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700,
                color: "#000", fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
                boxShadow: "0 4px 28px rgba(0,229,255,0.3)",
                letterSpacing: 0.2,
              }}
              onClick={onLaunch}
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 8px 36px rgba(0,229,255,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              🔬 Start Screening
            </motion.button>

            <motion.button
              style={{
                padding: "14px 28px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 15, fontWeight: 600,
                color: "#94a3b8", fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
              }}
              whileHover={{ background: "rgba(255,255,255,0.07)", color: "#eef2ff", borderColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
            >
              Watch Demo ▶
            </motion.button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              display: "flex", gap: 28, marginTop: 48,
              paddingTop: 28, borderTop: "1px solid rgba(30,36,64,0.8)",
              flexWrap: "wrap",
            }}
          >
            {TRUST_STATS.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 22, fontWeight: 700,
                  color: s.color, letterSpacing: -1,
                }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 2, fontWeight: 500, letterSpacing: 0.3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Scan visualization ── */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" }}
        >
          {/* Glow ring */}
          <div style={{
            position: "absolute", inset: -40,
            background: "radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <ScanViz />

          {/* Floating triage result card */}
          <motion.div
            style={{
              position: "absolute", bottom: -24, left: -32,
              background: "rgba(14,17,32,0.95)",
              border: "1px solid rgba(244,63,94,0.3)",
              borderRadius: 16, padding: "14px 18px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(244,63,94,0.1)",
              zIndex: 5,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontSize: 10, color: "#64748b", fontFamily: "Space Mono, monospace", letterSpacing: 1, marginBottom: 6 }}>
              TRIAGE RESULT
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px",
              background: "rgba(244,63,94,0.12)",
              border: "1px solid rgba(244,63,94,0.3)",
              borderRadius: 20,
              fontSize: 12, fontWeight: 700,
              color: "#fda4af", letterSpacing: 0.5,
            }}>
              🚨 URGENT REFERRAL
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>
              Specialist consultation required
            </div>
          </motion.div>

          {/* Floating confidence card */}
          <motion.div
            style={{
              position: "absolute", top: -20, right: -32,
              background: "rgba(14,17,32,0.95)",
              border: "1px solid rgba(0,229,255,0.25)",
              borderRadius: 14, padding: "12px 16px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 16px rgba(0,229,255,0.08)",
              zIndex: 5, display: "flex", alignItems: "center", gap: 10,
            }}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>
              🎯
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#475569", fontFamily: "Space Mono, monospace" }}>CANCER PROB.</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "Space Mono, monospace", color: "#f43f5e" }}>
                87.4%
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: "absolute", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          fontSize: 11, color: "#334155",
          fontFamily: "Space Mono, monospace", letterSpacing: 1, textTransform: "uppercase",
        }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        scroll
        <div style={{ width: 1, height: 32, background: "linear-gradient(180deg, #334155, transparent)" }} />
      </motion.div>
    </section>
  );
}