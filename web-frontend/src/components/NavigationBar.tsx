import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes/routes";

function PixelNavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.5rem",
        color: isActive ? "var(--arcade-h)" : hovered ? "var(--arcade-accent)" : "var(--arcade-text)",
        textDecoration: "none",
        letterSpacing: "0.06em",
        padding: "6px 10px",
        border: isActive
          ? "2px solid var(--arcade-h)"
          : hovered
          ? "2px solid var(--arcade-border)"
          : "2px solid transparent",
        boxShadow: isActive
          ? "2px 2px 0px var(--arcade-h-shadow)"
          : hovered
          ? "2px 2px 0px var(--arcade-shadow)"
          : "none",
        background: isActive
          ? "rgba(250,204,21,0.08)"
          : hovered
          ? "rgba(139,92,246,0.1)"
          : "transparent",
        transition: "color 0.08s, border-color 0.08s, background 0.08s",
        whiteSpace: "nowrap",
      })}
    >
      {children}
    </NavLink>
  );
}

function NavigationBar() {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <PixelNavLink to={ROUTES.GAMES}>🎲 GAMES</PixelNavLink>
      <PixelNavLink to={ROUTES.COMPARE}>⚔ COMPARE</PixelNavLink>
      <PixelNavLink to={ROUTES.ABOUT}>ℹ️ ABOUT</PixelNavLink>
    </nav>
  );
}

export default NavigationBar;
