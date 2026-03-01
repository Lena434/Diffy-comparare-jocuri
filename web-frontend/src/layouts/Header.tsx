import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navigation/NavigationBar';
import { ROUTES } from '../routes/routes';
import { useTheme, type Theme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '../hooks/useIsMobile';

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
  return (
    <button
      onClick={onClick}
      className={
        primary
          ? "[background:var(--arcade-cta)] border-2 border-solid [border-color:var(--arcade-text)] text-white [box-shadow:3px_3px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(3px,3px)] transition-[background,border-color,color] duration-[80ms]"
          : "bg-transparent border-2 border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-text)] hover:[background:rgba(139,92,246,0.15)] hover:[border-color:var(--arcade-border)] hover:[color:var(--arcade-h)] active:[transform:translate(3px,3px)] transition-[background,border-color,color] duration-[80ms]"
      }
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "8px 14px",
        cursor: "pointer",
        letterSpacing: "0.06em",
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
  return (
    <button
      onClick={onClick}
      title={`Switch to ${targetTheme} theme`}
      className={
        active
          ? "[background:var(--arcade-border)] border-2 border-solid [border-color:var(--arcade-h)] [color:var(--arcade-h)] [box-shadow:2px_2px_0px_var(--arcade-shadow)] transition-all duration-[80ms]"
          : "bg-transparent border-2 border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-muted)] hover:[background:rgba(139,92,246,0.15)] hover:[border-color:var(--arcade-border)] hover:[color:var(--arcade-text)] transition-all duration-[80ms]"
      }
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.4rem",
        padding: "6px 10px",
        cursor: "pointer",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
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
  const { currentUser, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();

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
          padding: isMobile ? "10px 12px" : "10px 24px",
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
              fontSize: isMobile ? "0.8rem" : "1rem",
              color: "var(--arcade-accent)",
              textShadow: "3px 3px 0px var(--arcade-accent-dark), 5px 5px 0px #000",
              letterSpacing: "0.05em",
            }}
          >
            DIFFY
          </span>
        </div>

        {/* Navigation - hidden on mobile */}
        {!isMobile && <NavigationBar />}

        {/* Right side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "12px", flexShrink: 0 }}>
          {/* Theme Toggle - compact on mobile */}
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
            {isMobile ? (
              /* Single toggle button on mobile */
              <button
                onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--arcade-h)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {theme === "dark" ? "🌙" : "☀"}
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Auth Buttons - hidden on mobile (available in sidebar) */}
          {!isMobile && (
            <div style={{ display: "flex", gap: "8px", flexShrink: 0, alignItems: "center" }}>
              {isAuthenticated ? (
                <>
                  <span
                    onClick={() => navigate(ROUTES.PROFILE)}
                    className="[color:var(--arcade-h)] hover:[color:var(--arcade-accent)] transition-[color] duration-[80ms]"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.4rem",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    🎮 {currentUser?.username.toUpperCase()}
                  </span>
                  <PixelHeaderBtn onClick={logout}>
                    ✕ LOGOUT
                  </PixelHeaderBtn>
                </>
              ) : (
                <>
                  <PixelHeaderBtn onClick={() => navigate(ROUTES.LOGIN)}>
                    ▶ LOGIN
                  </PixelHeaderBtn>
                  <PixelHeaderBtn onClick={() => navigate(ROUTES.SIGNUP)} primary>
                    + SIGN UP
                  </PixelHeaderBtn>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
