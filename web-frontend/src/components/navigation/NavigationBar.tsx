import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

function PixelNavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.5rem",
        letterSpacing: "0.06em",
      }}
      className={({ isActive }) =>
        [
          "no-underline px-[10px] py-[6px] border-2 whitespace-nowrap transition-[color,border-color,background,box-shadow] duration-75",
          isActive
            ? "text-[var(--arcade-h)] border-[var(--arcade-h)] [box-shadow:2px_2px_0px_var(--arcade-h-shadow)] bg-[rgba(250,204,21,0.08)]"
            : "text-[var(--arcade-text)] border-transparent bg-transparent hover:text-[var(--arcade-accent)] hover:border-[var(--arcade-border)] hover:[box-shadow:2px_2px_0px_var(--arcade-shadow)] hover:bg-[rgba(139,92,246,0.1)]",
        ].join(" ")
      }
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
