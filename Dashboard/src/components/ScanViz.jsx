import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RINGS = [
  { r: 28, color: "#00e5ff", delay: 0 },
  { r: 44, color: "#a855f7", delay: 0.3 },
  { r: 60, color: "#f43f5e", delay: 0.6 },
];

const CORNER_STYLES = [
  { top: 12, left: 12,  borderWidth: "2px 0 0 2px", borderRadius: "3px 0 0 0" },
  { top: 12, right: 12, borderWidth: "2px 2px 0 0", borderRadius: "0 3px 0 0" },
  { bottom: 12, left: 12,  borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 3px" },
  { bottom: 12, right: 12, borderWidth: "0 2px 2px 0", borderRadius: "0 0 3px 0" },
];

export default function ScanViz() {
  const [scanPos, setScanPos] = useState(0);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setScanPos((p) => {
        if (p >= 100) {
          setDetected(true);
          setTimeout(() => setDetected(false), 1200);
          return 0;
        }
        return p + 0.6;
      });
    }, 16);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 420,
      aspectRatio: "1", borderRadius: 20, overflow: "hidden",
      background: "#07080f",
      border: "1px solid rgba(0,229,255,0.12)",
      boxShadow: "0 0 80px rgba(168,85,247,0.15), inset 0 0 60px rgba(0,0,0,0.5)",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }} />

      {/* Center crosshair */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: `${ring.r * 2}px`, height: `${ring.r * 2}px`,
              borderRadius: "50%",
              border: `1px solid ${ring.color}22`,
              boxShadow: `0 0 12px ${ring.color}15`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {RINGS.map((ring, i) => (
          <motion.div
            key={`dot-${i}`}
            style={{ position: "absolute", width: `${ring.r * 2}px`, height: `${ring.r * 2}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6 + i * 3, repeat: Infinity, ease: "linear" }}
          >
            <div style={{
              position: "absolute", top: 0, left: "50%",
              transform: "translateX(-50%)",
              width: 5, height: 5, borderRadius: "50%",
              background: ring.color, boxShadow: `0 0 8px ${ring.color}`,
            }} />
          </motion.div>
        ))}

        {/* Core pulse */}
        <motion.div
          style={{
            width: 14, height: 14, borderRadius: "50%",
            background: "#00e5ff",
            boxShadow: "0 0 20px #00e5ff, 0 0 40px rgba(0,229,255,0.4)",
            zIndex: 2,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {[0, 90].map((angle) => (
          <motion.div
            key={angle}
            style={{
              position: "absolute", width: "100px", height: "1px",
              background: `linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)`,
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
      </div>

      {/* Scan line */}
      <motion.div
        style={{
          position: "absolute", left: 0, right: 0,
          top: `${scanPos}%`, height: 2,
          background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
          boxShadow: "0 0 16px #00e5ff, 0 0 32px rgba(0,229,255,0.3)",
          zIndex: 3,
        }}
      />

      {/* Detection flash */}
      <AnimatePresence>
        {detected && (
          <motion.div
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,229,255,0.04)",
              border: "2px solid rgba(0,229,255,0.5)",
              borderRadius: 20, zIndex: 4,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Corner brackets */}
      {CORNER_STYLES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", ...s,
            width: 22, height: 22,
            borderStyle: "solid", borderColor: "#00e5ff",
          }}
        />
      ))}

      {/* Status tags */}
      <div style={{ position: "absolute", top: 16, left: 16, display: "flex", flexDirection: "column", gap: 6, zIndex: 5 }}>
        <motion.div
          style={{
            padding: "3px 10px",
            background: "rgba(0,229,255,0.1)",
            border: "1px solid rgba(0,229,255,0.25)",
            borderRadius: 20, fontSize: 10,
            fontFamily: "Space Mono, monospace",
            color: "#00e5ff", letterSpacing: 1,
          }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCANNING
        </motion.div>
      </div>

      <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 5, textAlign: "right" }}>
        <div style={{ fontSize: 10, fontFamily: "Space Mono, monospace", color: "#475569", marginBottom: 2 }}>CONFIDENCE</div>
        <motion.div
          style={{ fontSize: 18, fontFamily: "Space Mono, monospace", fontWeight: 700, color: "#00e5ff" }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          96.2%
        </motion.div>
      </div>

      {/* Noise overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: "none", opacity: 0.6,
      }} />
    </div>
  );
}