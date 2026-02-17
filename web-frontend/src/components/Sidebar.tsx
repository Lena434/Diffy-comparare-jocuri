import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useIsMobile } from "../hooks/useIsMobile";


// ─── Pixel Button ─────────────────────────────────────────────────────────────
function PixelCTA({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "100%",
        background: hovered ? "var(--arcade-accent)" : "var(--arcade-cta)",
        border: `2px solid ${hovered ? "var(--arcade-h)" : "var(--arcade-text)"}`,
        boxShadow: pressed ? "0px 0px 0px var(--arcade-shadow)" : "3px 3px 0px var(--arcade-shadow)",
        transform: pressed ? "translate(3px,3px)" : "translate(0,0)",
        color: "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.5rem",
        padding: "10px 8px",
        cursor: "pointer",
        letterSpacing: "0.06em",
        transition: "background 0.1s, border-color 0.1s",
        textAlign: "center",
        display: "block",
      }}
    >
      {children}
    </button>
  );
}

// ─── Pixel Nav Item ───────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: hovered ? "rgba(139,92,246,0.15)" : "transparent",
        border: hovered ? "2px solid var(--arcade-border)" : "2px solid transparent",
        boxShadow: hovered ? "2px 2px 0px var(--arcade-shadow)" : "none",
        color: hovered ? "var(--arcade-h)" : "var(--arcade-text)",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "7px 8px",
        cursor: "pointer",
        letterSpacing: "0.04em",
        transition: "all 0.1s",
        textAlign: "left",
        lineHeight: 1.6,
      }}
    >
      <span style={{ fontSize: "0.75rem", minWidth: "16px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ─── Collapsible Section ──────────────────────────────────────────────────────
function CollapsibleSection({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: hovered ? "rgba(139,92,246,0.1)" : "transparent",
          border: "none",
          color: "var(--arcade-border)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.42rem",
          padding: "6px 8px",
          cursor: "pointer",
          letterSpacing: "0.05em",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "0.7rem" }}>{icon}</span>
          <span>{label}</span>
        </span>
        <span
          style={{
            fontSize: "0.55rem",
            color: "var(--arcade-shadow-mid)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
            display: "inline-block",
          }}
        >
          ▶
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingLeft: "12px",
            borderLeft: "2px solid var(--arcade-shadow)",
            marginLeft: "8px",
            marginBottom: "4px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.38rem",
        color: "var(--arcade-shadow-mid)",
        letterSpacing: "0.1em",
        padding: "10px 8px 4px",
        borderBottom: "1px dashed var(--arcade-shadow)",
        marginBottom: "4px",
      }}
    >
      {label}
    </div>
  );
}

// ─── Search Input ─────────────────────────────────────────────────────────────
function PixelSearchInput() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div style={{ padding: "4px 0" }}>
      <input
        type="text"
        placeholder="SEARCH..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: `2px solid ${focused ? "var(--arcade-accent)" : "var(--arcade-border)"}`,
          boxShadow: `2px 2px 0px var(--arcade-shadow)`,
          color: "var(--arcade-h)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          padding: "8px 10px",
          outline: "none",
          boxSizing: "border-box",
          letterSpacing: "0.05em",
        }}
      />
    </div>
  );
}

// ─── Price Slider ─────────────────────────────────────────────────────────────
function PixelSlider({ label }: { label: string }) {
  const [value, setValue] = useState(50);
  return (
    <div style={{ padding: "4px 8px" }}>
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.04em",
        }}
      >
        {label}: {value === 100 ? "ANY" : `$${value}`}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: "var(--arcade-border)",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

// ─── Rating Chip ──────────────────────────────────────────────────────────────
function RatingChip({ label }: { label: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive((v) => !v)}
      style={{
        background: active ? "var(--arcade-cta)" : "transparent",
        border: `2px solid ${active ? "var(--arcade-text)" : "var(--arcade-shadow)"}`,
        boxShadow: active ? "2px 2px 0px var(--arcade-shadow)" : "none",
        color: active ? "var(--arcade-h)" : "var(--arcade-muted)",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.38rem",
        padding: "4px 6px",
        cursor: "pointer",
        transition: "all 0.1s",
      }}
    >
      {label}
    </button>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
export const SIDEBAR_WIDTH = 220;

function Sidebar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);
  const [toggleHovered, setToggleHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) setOpen(false);
  }, [location.pathname, isMobile]);

  // Close sidebar when switching to mobile, open when switching to desktop
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const isAuthenticated = false;

  const handleNav = (route: string) => {
    navigate(route);
  };

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            top: "64px",
            background: "rgba(0,0,0,0.6)",
            zIndex: 99,
          }}
        />
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setToggleHovered(true)}
        onMouseLeave={() => setToggleHovered(false)}
        title={open ? "Close sidebar" : "Open sidebar"}
        style={{
          position: "fixed",
          top: "72px",
          left: open ? `${SIDEBAR_WIDTH + 8}px` : "8px",
          zIndex: 200,
          background: toggleHovered ? "var(--arcade-accent)" : "var(--arcade-panel)",
          border: `3px solid ${toggleHovered ? "var(--arcade-h)" : "var(--arcade-border)"}`,
          boxShadow: "3px 3px 0px var(--arcade-shadow)",
          color: toggleHovered ? "#fff" : "var(--arcade-border)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.7rem",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.25s cubic-bezier(0.4,0,0.2,1), background 0.1s, border-color 0.1s, color 0.1s",
          padding: 0,
        }}
      >
        {open ? "◀" : "▶"}
      </button>

      {/* Sidebar Panel */}
      <aside
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          width: `${SIDEBAR_WIDTH}px`,
          height: "calc(100vh - 64px)",
          background: "var(--arcade-panel-dark)",
          borderRight: "3px solid var(--arcade-border)",
          boxShadow: "4px 0px 0px var(--arcade-shadow)",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          transform: open ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Pixel grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "16px 16px",
            pointerEvents: "none",
          }}
        />

        {/* Sidebar header */}
        <div
          style={{
            padding: "14px 12px 10px",
            borderBottom: "2px dashed var(--arcade-shadow)",
            position: "relative",
          }}
        >
          {[
            { top: 6, left: 6 },
            { top: 6, right: 6 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "6px",
                height: "6px",
                background: "var(--arcade-border)",
                border: "1px solid var(--arcade-shadow)",
                borderRadius: "50%",
                ...pos,
              }}
            />
          ))}

          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.6rem",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            ⚡ DIFFY MENU ⚡
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 16px" }}>

          <SectionLabel label="▸ QUICK ACTIONS" />
          <div style={{ padding: "4px 8px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <PixelSearchInput />
            <PixelCTA onClick={() => handleNav(ROUTES.COMPARE)}>
              ⚔ START COMPARING
            </PixelCTA>
          </div>

          {isAuthenticated && (
            <>
              <SectionLabel label="▸ DASHBOARD" />
              <NavItem icon="🏠" label="MY DASHBOARD" />
              <NavItem icon="⭐" label="SAVED GAMES" />
              <NavItem icon="📈" label="RECENT COMPARISONS" />
              <NavItem icon="🔔" label="NOTIFICATIONS" />
            </>
          )}

          <SectionLabel label="▸ BROWSE" />
          <NavItem icon="🎲" label="ALL GAMES" onClick={() => handleNav(ROUTES.GAMES)} />
          <NavItem icon="🔥" label="TRENDING NOW" />
          <NavItem icon="🆕" label="NEW RELEASES" />
          <NavItem icon="🏆" label="TOP RATED" />
          <NavItem icon="💰" label="FREE TO PLAY" />
          <NavItem icon="🎯" label="MOST COMPARED" onClick={() => handleNav(ROUTES.COMPARE)} />

          <SectionLabel label="▸ CATEGORIES" />
          <CollapsibleSection icon="🎭" label="BY GENRE">
            <NavItem icon="🔫" label="FPS / SHOOTER" />
            <NavItem icon="⚔️" label="RPG" />
            <NavItem icon="🏃" label="ACTION / ADV." />
            <NavItem icon="♟️" label="STRATEGY" />
            <NavItem icon="🚜" label="SIMULATION" />
            <NavItem icon="🍄" label="PLATFORMER" />
            <NavItem icon="👁️" label="HORROR" />
          </CollapsibleSection>
          <CollapsibleSection icon="🖥️" label="BY PLATFORM">
            <NavItem icon="💻" label="PC" />
            <NavItem icon="🎮" label="PLAYSTATION" />
            <NavItem icon="🟩" label="XBOX" />
            <NavItem icon="🔴" label="NINTENDO SWITCH" />
            <NavItem icon="📱" label="MOBILE" />
            <NavItem icon="🌐" label="CROSS-PLATFORM" />
          </CollapsibleSection>

          <SectionLabel label="▸ FILTERS" />
          <PixelSlider label="PRICE MAX" />
          <div style={{ padding: "4px 8px" }}>
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.38rem",
                color: "var(--arcade-text)",
                marginBottom: "6px",
                letterSpacing: "0.04em",
              }}
            >
              MIN RATING
            </div>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {["4+★", "3+★", "ANY"].map((r) => (
                <RatingChip key={r} label={r} />
              ))}
            </div>
          </div>
          <NavItem icon="👥" label="MULTIPLAYER" />
          <NavItem icon="🧍" label="SINGLE-PLAYER" />

          <SectionLabel label="▸ RESOURCES" />
          <NavItem icon="📖" label="HOW TO COMPARE" />
          <NavItem icon="📝" label="BLOG & NEWS" />
          <NavItem icon="💬" label="COMMUNITY" />
          <NavItem icon="❓" label="HELP & FAQ" />

          {!isAuthenticated && (
            <>
              <SectionLabel label="▸ ACCOUNT" />
              <div
                style={{
                  padding: "4px 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <PixelCTA onClick={() => handleNav(ROUTES.LOGIN)}>
                  ▶ LOGIN
                </PixelCTA>
                <PixelCTA onClick={() => handleNav(ROUTES.SIGNUP)}>
                  + NEW PLAYER
                </PixelCTA>
              </div>
            </>
          )}
        </div>

        {/* Sidebar footer */}
        <div
          style={{
            padding: "8px 12px",
            borderTop: "2px dashed var(--arcade-shadow)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.35rem",
              color: "var(--arcade-shadow)",
              letterSpacing: "0.05em",
            }}
          >
            © DIFFY 2025
          </span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
