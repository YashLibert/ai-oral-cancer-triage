import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["Features", "How It Works", "Statistics", "Triage"];

export default function Nav({ onLaunch }) {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        background: navScrolled ? "rgba(7,8,15,0.9)" : "transparent",
        borderBottom: navScrolled ? "1px solid rgba(30,36,64,0.8)" : "1px solid transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
      }}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div
          style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #a855f7, #00e5ff)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 0 20px rgba(168,85,247,0.4)",
          }}
          whileHover={{ rotate: 8, scale: 1.05 }}
        >
          🧬
        </motion.div>
        <span style={{
          fontFamily: "Space Mono, monospace", fontSize: 16, fontWeight: 700,
          background: "linear-gradient(90deg, #d8b4fe, #00e5ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          OralAI
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase().replace(/ /g, "-")}`}
            style={{
              fontSize: 13.5, fontWeight: 500,
              color: "#94a3b8", textDecoration: "none",
              transition: "color 0.2s",
            }}
            whileHover={{ color: "#eef2ff" }}
          >
            {link}
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        style={{
          padding: "8px 20px",
          background: "linear-gradient(135deg, #a855f7, #7c3aed)",
          border: "none", borderRadius: 10,
          fontSize: 13, fontWeight: 700,
          color: "#fff", fontFamily: "Outfit, sans-serif",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(168,85,247,0.3)",
        }}
        onClick={onLaunch}
        whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}
        whileTap={{ scale: 0.97 }}
      >
        Launch Dashboard →
      </motion.button>
    </motion.nav>
  );
}