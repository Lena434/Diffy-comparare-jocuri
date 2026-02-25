import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSidebar } from "../../contexts/SidebarContext";
import { useAuth } from "../../contexts/AuthContext";
import PixelCTA from "./PixelCTA";
import NavItem from "./NavItem";
import CollapsibleSection from "./CollapsibleSection";
import SectionLabel from "./SectionLabel";
import PixelSearchInput from "./PixelSearchInput";
import PixelSlider from "./PixelSlider";

export const SIDEBAR_WIDTH = 220;

function Sidebar() {
  const isMobile = useIsMobile();
  const { open, setOpen } = useSidebar();
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

  const { isAuthenticated } = useAuth();

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
        title={open ? "Close sidebar" : "Open sidebar"}
        className="[background:var(--arcade-panel)] border-solid [border-color:var(--arcade-border)] [color:var(--arcade-border)] [box-shadow:3px_3px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] hover:text-white"
        style={{
          position: "fixed",
          top: "72px",
          left: open ? `${SIDEBAR_WIDTH + 8}px` : "8px",
          zIndex: 200,
          borderWidth: "3px",
          borderStyle: "solid",
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
            <PixelSearchInput onSearch={(q) => handleNav(`${ROUTES.GAMES}?search=${encodeURIComponent(q)}`)} />
            <PixelCTA onClick={() => handleNav(ROUTES.COMPARE)}>
              ⚔ START COMPARING
            </PixelCTA>
          </div>

          {isAuthenticated && (
            <>
              <SectionLabel label="▸ DASHBOARD" />
              <NavItem icon="👤" label="MY PROFILE" onClick={() => handleNav(ROUTES.PROFILE)} />
              <NavItem icon="⭐" label="SAVED GAMES" onClick={() => handleNav(ROUTES.FAVORITES)} />
              <NavItem icon="📈" label="RECENT COMPARISONS" onClick={() => handleNav(ROUTES.FAVORITES)} />
              <NavItem icon="🔔" label="NOTIFICATIONS" />
            </>
          )}

          <SectionLabel label="▸ BROWSE" />
          <NavItem icon="🎲" label="ALL GAMES" onClick={() => handleNav(ROUTES.GAMES)} />
          <NavItem icon="🔥" label="TRENDING NOW" onClick={() => handleNav(`${ROUTES.GAMES}?sort=rating`)} />
          <NavItem icon="🆕" label="NEW RELEASES" onClick={() => handleNav(`${ROUTES.GAMES}?sort=year`)} />
          <NavItem icon="🏆" label="TOP RATED" onClick={() => handleNav(`${ROUTES.GAMES}?sort=rating`)} />
          <NavItem icon="💰" label="FREE TO PLAY" onClick={() => handleNav(`${ROUTES.GAMES}?maxPrice=0`)} />
          <NavItem icon="🎯" label="MOST COMPARED" onClick={() => handleNav(ROUTES.COMPARE)} />

          <SectionLabel label="▸ CATEGORIES" />
          <CollapsibleSection icon="🎭" label="BY GENRE">
            <NavItem icon="🔫" label="FPS / SHOOTER" onClick={() => handleNav(`${ROUTES.GAMES}?genre=FPS`)} />
            <NavItem icon="⚔️" label="RPG" onClick={() => handleNav(`${ROUTES.GAMES}?genre=RPG`)} />
            <NavItem icon="🏃" label="ACTION / ADV." onClick={() => handleNav(`${ROUTES.GAMES}?genre=Action`)} />
            <NavItem icon="♟️" label="STRATEGY" onClick={() => handleNav(`${ROUTES.GAMES}?genre=Strategy`)} />
            <NavItem icon="🚜" label="SIMULATION" onClick={() => handleNav(`${ROUTES.GAMES}?genre=Simulation`)} />
            <NavItem icon="🍄" label="PLATFORMER" onClick={() => handleNav(`${ROUTES.GAMES}?genre=Platformer`)} />
            <NavItem icon="👁️" label="HORROR" onClick={() => handleNav(`${ROUTES.GAMES}?genre=Horror`)} />
          </CollapsibleSection>
          <CollapsibleSection icon="🖥️" label="BY PLATFORM">
            <NavItem icon="💻" label="PC" onClick={() => handleNav(`${ROUTES.GAMES}?platform=PC`)} />
            <NavItem icon="🎮" label="PLAYSTATION" onClick={() => handleNav(`${ROUTES.GAMES}?platform=PlayStation`)} />
            <NavItem icon="🟩" label="XBOX" onClick={() => handleNav(`${ROUTES.GAMES}?platform=Xbox`)} />
            <NavItem icon="🔴" label="NINTENDO SWITCH" onClick={() => handleNav(`${ROUTES.GAMES}?platform=Switch`)} />
            <NavItem icon="📱" label="MOBILE" onClick={() => handleNav(`${ROUTES.GAMES}?platform=Mobile`)} />
            <NavItem icon="🌐" label="CROSS-PLATFORM" onClick={() => handleNav(ROUTES.GAMES)} />
          </CollapsibleSection>

          <SectionLabel label="▸ FILTERS" />
          <PixelSlider label="PRICE MAX" onApply={(val) => handleNav(`${ROUTES.GAMES}?maxPrice=${val}`)} />
          <NavItem icon="👥" label="MULTIPLAYER" onClick={() => handleNav(`${ROUTES.GAMES}?mode=multiplayer`)} />
          <NavItem icon="🧍" label="SINGLE-PLAYER" onClick={() => handleNav(`${ROUTES.GAMES}?mode=single`)} />

          <SectionLabel label="▸ RESOURCES" />
          <NavItem icon="📖" label="HOW TO COMPARE" onClick={() => handleNav(ROUTES.COMPARE)} />
          <NavItem icon="📝" label="BLOG & NEWS" onClick={() => handleNav(ROUTES.ABOUT)} />
          <NavItem icon="💬" label="COMMUNITY" onClick={() => handleNav(ROUTES.ABOUT)} />
          <NavItem icon="❓" label="HELP & FAQ" onClick={() => handleNav(ROUTES.ABOUT)} />

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
            © DIFFY 2026
          </span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
