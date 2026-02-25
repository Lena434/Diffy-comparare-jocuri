import { useNavigate } from 'react-router-dom';
import HeroSearchBar from '../../components/navigation/HeroSearchBar';
import StatChip from '../../components/game/StatChip';

function PixelBtn({
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
          ? "[background:var(--arcade-cta)] border-solid [border-color:var(--arcade-text)] text-white [box-shadow:5px_5px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(5px,5px)] transition-[background,border-color,color] duration-[80ms]"
          : "bg-transparent border-solid [border-color:var(--arcade-border)] [color:var(--arcade-border)] [box-shadow:5px_5px_0px_#0e4a5e] hover:[border-color:#06b6d4] hover:[color:#06b6d4] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(5px,5px)] transition-[background,border-color,color] duration-[80ms]"
      }
      style={{
        borderWidth: "3px",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.6rem",
        padding: "14px 24px",
        cursor: "pointer",
        letterSpacing: "0.08em",
        minWidth: "140px",
      }}
    >
      {children}
    </button>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingLeft: "16px",
        paddingRight: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* INSERT COIN */}
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          color: "var(--arcade-muted)",
          letterSpacing: "0.1em",
          marginBottom: "28px",
          marginTop: "16px",
          animation: "pixel-blink 1.2s steps(1) infinite",
        }}
      >
        ★ INSERT COIN TO CONTINUE ★
      </div>

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          flex: 1,
          justifyContent: "center",
          paddingBottom: "60px",
        }}
      >
        {/* DIFFY title */}
        <h1
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            color: "var(--arcade-accent)",
            textShadow: "4px 4px 0px var(--arcade-accent-dark), 8px 8px 0px #000",
            letterSpacing: "0.12em",
            margin: 0,
            lineHeight: 1.1,
            animation: "pixel-glow 2.5s ease-in-out infinite",
          }}
        >
          DIFFY
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(0.5rem, 1.5vw, 0.75rem)",
            color: "var(--arcade-h)",
            textShadow: "2px 2px 0px var(--arcade-h-shadow)",
            letterSpacing: "0.1em",
            margin: 0,
            lineHeight: 2,
          }}
        >
          COMPARE . DISCOVER . PLAY
        </p>

        {/* Search Bar */}
        <div style={{ width: "100%", maxWidth: "640px", marginTop: "24px", marginBottom: "24px" }}>
          <HeroSearchBar />
        </div>

        {/* Pixel divider */}
        <div
          style={{
            color: "var(--arcade-shadow)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.05em",
          }}
        >
          ══════════════
        </div>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "🎮", label: "20 GAMES" },
            { icon: "⚔", label: "SIDE-BY-SIDE COMPARISON" },
            { icon: "🏆", label: "FREE TO USE" },
          ].map((chip) => (
            <StatChip key={chip.label} icon={chip.icon} label={chip.label} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px" }}>
          <PixelBtn onClick={() => navigate('/games')} primary>
            ▶ EXPLORE GAMES
          </PixelBtn>
          <PixelBtn onClick={() => navigate('/compare')}>
            ⚔ START COMPARING
          </PixelBtn>
        </div>

        {/* PRESS START */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.4rem",
            color: "var(--arcade-muted)",
            letterSpacing: "0.08em",
            marginTop: "8px",
            animation: "pixel-blink 1.4s steps(1) infinite",
          }}
        >
          — PRESS START —
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
