import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../routes/routes';
import { useTheme, type Theme } from '../contexts/ThemeContext';

// ── Pixel button (auth) ───────────────────────────────────────────────────────
function PixelHeaderBtn({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        background: primary
          ? (hovered ? "var(--arcade-accent)" : "var(--arcade-cta)")
          : (hovered ? "rgba(139,92,246,0.15)" : "transparent"),
        border: primary
          ? `2px solid ${hovered ? "var(--arcade-h)" : "var(--arcade-text)"}`
          : `2px solid ${hovered ? "var(--arcade-border)" : "var(--arcade-shadow)"}`,
        boxShadow: pressed ? "0 0 0 var(--arcade-shadow)" : (primary ? "3px 3px 0px var(--arcade-shadow)" : "none"),
        transform: pressed ? "translate(3px,3px)" : "translate(0,0)",
        color: primary ? "#fff" : (hovered ? "var(--arcade-h)" : "var(--arcade-text)"),
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "8px 14px",
        cursor: "pointer",
        letterSpacing: "0.06em",
        transition: "background 0.08s, border-color 0.08s, color 0.08s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ── Theme toggle chip ─────────────────────────────────────────────────────────
function ThemeChip({
  label,
  icon,
  targetTheme,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  targetTheme: Theme;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`Switch to ${targetTheme} theme`}
      style={{
        background: active ? "var(--arcade-border)" : (hovered ? "rgba(139,92,246,0.15)" : "transparent"),
        border: `2px solid ${active ? "var(--arcade-h)" : hovered ? "var(--arcade-border)" : "var(--arcade-shadow)"}`,
        boxShadow: active ? "2px 2px 0px var(--arcade-shadow)" : "none",
        color: active ? "var(--arcade-h)" : hovered ? "var(--arcade-text)" : "var(--arcade-muted)",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.4rem",
        padding: "6px 10px",
        cursor: "pointer",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        transition: "all 0.08s",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <span style={{ fontSize: "0.75rem" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 200,
        background: "var(--arcade-panel-dark)",
        borderBottom: "3px solid var(--arcade-border)",
        boxShadow: "0 3px 0px var(--arcade-shadow)",
        transition: "left 0.25s cubic-bezier(0.4,0,0.2,1), background 0.2s",
      }}
    >
      {/* Pixel grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}
        >
          <span style={{ fontSize: "1.4rem" }}>🎮</span>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "1rem",
              color: "var(--arcade-accent)",
              textShadow: "3px 3px 0px var(--arcade-accent-dark), 5px 5px 0px #000",
              letterSpacing: "0.05em",
            }}
          >
            DIFFY
          </span>
        </div>

        {/* Navigation */}
        <NavigationBar />

        {/* Theme Toggle */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "var(--arcade-panel)",
            border: "2px solid var(--arcade-shadow)",
            padding: "3px",
            flexShrink: 0,
          }}
        >
          <ThemeChip
            label="DARK"
            icon="🌙"
            targetTheme="dark"
            active={theme === "dark"}
            onClick={() => toggleTheme("dark")}
          />
          <ThemeChip
            label="LIGHT"
            icon="☀"
            targetTheme="light"
            active={theme === "light"}
            onClick={() => toggleTheme("light")}
          />
        </div>

        {/* Auth Buttons */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <PixelHeaderBtn onClick={() => navigate(ROUTES.LOGIN)}>
            ▶ LOGIN
          </PixelHeaderBtn>
          <PixelHeaderBtn onClick={() => navigate(ROUTES.SIGNUP)} primary>
            + SIGN UP
          </PixelHeaderBtn>
        </div>
      </div>
    </header>
  );
}

export default Header;
