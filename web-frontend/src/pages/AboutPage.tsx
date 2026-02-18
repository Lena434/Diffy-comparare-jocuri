import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import FeatureCard from '../components/FeatureCard';

function PixelBtn({
  children,
  to,
  primary = false,
}: {
  children: React.ReactNode;
  to: string;
  primary?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        background: primary ? (hovered ? "var(--arcade-accent)" : "var(--arcade-cta)") : "transparent",
        border: primary
          ? `3px solid ${hovered ? "var(--arcade-h)" : "var(--arcade-text)"}`
          : `3px solid ${hovered ? "#06b6d4" : "var(--arcade-border)"}`,
        boxShadow: pressed ? "0 0 0 var(--arcade-shadow)" : primary ? "5px 5px 0px var(--arcade-shadow)" : "5px 5px 0px #0e4a5e",
        transform: pressed ? "translate(5px,5px)" : "translate(0,0)",
        color: primary ? "#fff" : hovered ? "#06b6d4" : "var(--arcade-border)",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.55rem",
        padding: "14px 24px",
        cursor: "pointer",
        letterSpacing: "0.08em",
        transition: "background 0.08s, border-color 0.08s, color 0.08s",
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}

const features = [
  { icon: "🎮", title: "GAME LIBRARY", desc: "Browse through a vast collection of games across all platforms and genres." },
  { icon: "⚔", title: "SIDE-BY-SIDE", desc: "Compare multiple games at once with our intelligent comparison table." },
  { icon: "🔍", title: "ADV. FILTERING", desc: "Filter games by genre, platform, game mode, and more." },
  { icon: "⭐", title: "RATINGS & INFO", desc: "Access comprehensive game information including ratings and details." },
];

const steps = [
  { num: "01", title: "BROWSE OR SEARCH", desc: "Explore our game library or use the search feature to find specific titles." },
  { num: "02", title: "SELECT GAMES", desc: "Add games to your comparison list to view them side by side." },
  { num: "03", title: "COMPARE & DECIDE", desc: "Review differences in our comparison table and pick the best game for you." },
];

function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "60px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Blink header */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.4rem",
            color: "var(--arcade-muted)",
            letterSpacing: "0.1em",
            textAlign: "center",
            marginBottom: "24px",
            animation: "pixel-blink 1.2s steps(1) infinite",
          }}
        >
          ★ PLAYER INFO ★
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(1.4rem, 5vw, 2.5rem)",
            color: "var(--arcade-accent)",
            textShadow: "4px 4px 0px var(--arcade-accent-dark), 8px 8px 0px #000",
            letterSpacing: "0.1em",
            textAlign: "center",
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          ABOUT DIFFY
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(0.4rem, 1.2vw, 0.6rem)",
            color: "var(--arcade-h)",
            textShadow: "2px 2px 0px var(--arcade-h-shadow)",
            letterSpacing: "0.1em",
            textAlign: "center",
            margin: "0 0 32px 0",
            lineHeight: 2,
          }}
        >
          YOUR ULTIMATE GAME COMPARISON PLATFORM
        </p>

        {/* Pixel divider */}
        <div
          style={{
            color: "var(--arcade-shadow)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          ★ ════════════════════════ ★
        </div>

        {/* What is Diffy - Panel */}
        <div
          style={{
            background: "var(--arcade-panel)",
            border: "3px solid var(--arcade-border)",
            boxShadow: "5px 5px 0px var(--arcade-shadow), 8px 8px 0px #000",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.08em",
              margin: "0 0 16px 0",
            }}
          >
            ▸ WHAT IS DIFFY?
          </h2>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.45rem",
              color: "var(--arcade-text)",
              lineHeight: 2.4,
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            Diffy is a comprehensive platform designed to help gamers discover,
            explore, and compare video games across different genres, platforms,
            and playstyles. Whether you're searching for your next gaming
            adventure or trying to decide between similar titles, Diffy makes
            the choice easier with side-by-side comparisons and detailed game
            information.
          </p>
        </div>

        {/* Features - Panel */}
        <div
          style={{
            background: "var(--arcade-panel)",
            border: "3px solid var(--arcade-border)",
            boxShadow: "5px 5px 0px var(--arcade-shadow), 8px 8px 0px #000",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.08em",
              margin: "0 0 24px 0",
            }}
          >
            ▸ FEATURES
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "16px",
            }}
          >
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>

        {/* How It Works - Panel */}
        <div
          style={{
            background: "var(--arcade-panel)",
            border: "3px solid var(--arcade-border)",
            boxShadow: "5px 5px 0px var(--arcade-shadow), 8px 8px 0px #000",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.08em",
              margin: "0 0 24px 0",
            }}
          >
            ▸ HOW IT WORKS
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.7rem",
                    color: "var(--arcade-accent)",
                    textShadow: "2px 2px 0px var(--arcade-accent-dark)",
                    minWidth: "36px",
                    lineHeight: 1,
                    paddingTop: "2px",
                  }}
                >
                  {s.num}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.5rem",
                      color: "var(--arcade-h)",
                      marginBottom: "8px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.38rem",
                      color: "var(--arcade-muted)",
                      lineHeight: 2.2,
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission - Panel */}
        <div
          style={{
            background: "var(--arcade-panel)",
            border: "3px solid var(--arcade-border)",
            boxShadow: "5px 5px 0px var(--arcade-shadow), 8px 8px 0px #000",
            padding: "28px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.08em",
              margin: "0 0 16px 0",
            }}
          >
            ▸ OUR MISSION
          </h2>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.45rem",
              color: "var(--arcade-text)",
              lineHeight: 2.4,
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            At Diffy, we believe that choosing the right game should be easy and
            enjoyable. Our mission is to empower gamers with the tools and
            information they need to discover games that match their preferences
            and make confident purchasing decisions. We're passionate about
            gaming and committed to helping you find your next favorite game.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            color: "var(--arcade-shadow)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          ★ ════════════════════════ ★
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.45rem",
              color: "var(--arcade-muted)",
              marginBottom: "24px",
              letterSpacing: "0.05em",
              animation: "pixel-blink 1.4s steps(1) infinite",
            }}
          >
            READY FOR YOUR NEXT ADVENTURE?
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            <PixelBtn to={ROUTES.GAMES} primary>
              ▶ BROWSE GAMES
            </PixelBtn>
            <PixelBtn to={ROUTES.COMPARE}>
              ⚔ START COMPARING
            </PixelBtn>
          </div>

          {/* Bottom blink */}
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.35rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.08em",
              marginTop: "32px",
              animation: "pixel-blink 1.2s steps(1) infinite",
            }}
          >
            — GAME ON —
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
