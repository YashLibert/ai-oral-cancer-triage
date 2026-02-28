const FOOTER_LINKS = ["Privacy", "Docs", "GitHub"];

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #1e2440",
      padding: "32px 80px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28,
          background: "linear-gradient(135deg, #a855f7, #00e5ff)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13,
        }}>
          🧬
        </div>
        <span style={{ fontFamily: "Space Mono, monospace", fontSize: 13, color: "#475569" }}>
          OralAI · Detection System
        </span>
      </div>

      <div style={{ fontSize: 12, color: "#334155" }}>
        Built for rural health camps · Maharashtra, India
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {FOOTER_LINKS.map((l) => (
          <a
            key={l}
            href="#"
            style={{ fontSize: 12, color: "#475569", textDecoration: "none" }}
            onMouseOver={(e) => (e.target.style.color = "#94a3b8")}
            onMouseOut={(e) => (e.target.style.color = "#475569")}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}