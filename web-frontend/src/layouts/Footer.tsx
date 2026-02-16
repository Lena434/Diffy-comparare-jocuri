const Footer = () => {
  return (
    <footer
      style={{
        background: "var(--arcade-panel-dark)",
        borderTop: "3px solid var(--arcade-border)",
        boxShadow: "0 -3px 0px var(--arcade-shadow)",
        marginLeft: 0,
      }}
    >
      {/* Pixel grid overlay */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1rem" }}>🎮</span>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.7rem",
                color: "var(--arcade-accent)",
                textShadow: "2px 2px 0px var(--arcade-accent-dark)",
              }}
            >
              DIFFY
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              borderTop: "2px dashed var(--arcade-shadow)",
            }}
          />

          {/* Copyright */}
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.38rem",
              color: "var(--arcade-shadow)",
              letterSpacing: "0.06em",
              textAlign: "center",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} DIFFY — COMPARE. DISCOVER. PLAY.
          </p>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.35rem",
              color: "var(--arcade-dim)",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            FRONTEND PROJECT — EDUCATIONAL PURPOSE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
