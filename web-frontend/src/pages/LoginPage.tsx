import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useAuth } from "../contexts/AuthContext";
import { ArcadePanel } from "../components/arcade/ArcadePanel";
import { PixelField } from "../components/arcade/PixelField";
import { PixelButton } from "../components/arcade/PixelButton";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const err = login(credentials.email, credentials.password);
    if (err) {
      setError(err);
      return;
    }
    navigate(ROUTES.HOME);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "var(--arcade-bg)",
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div
          className="flex items-center justify-center space-x-3 mb-10 cursor-pointer"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <span className="text-3xl">🎮</span>
          <span
            className="text-3xl"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: "var(--arcade-accent)",
              textShadow: "3px 3px 0px var(--arcade-accent-dark), 6px 6px 0px #000",
            }}
          >
            DIFFY
          </span>
        </div>

        <ArcadePanel title="> LOG IN <">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PixelField
              label="EMAIL"
              type="email"
              value={credentials.email}
              onChange={v => setCredentials(prev => ({ ...prev, email: v }))}
              placeholder="player@example.com"
            />
            <PixelField
              label="PASSWORD"
              type="password"
              value={credentials.password}
              onChange={v => setCredentials(prev => ({ ...prev, password: v }))}
              placeholder="••••••••"
            />

            {error && (
              <p
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  color: "#f87171",
                  textShadow: "1px 1px 0 #7f1d1d",
                  lineHeight: 1.8,
                }}
              >
                &#9888; {error}
              </p>
            )}

            <div className="pt-2">
              <PixelButton type="submit" label="START GAME" />
            </div>
          </form>

          <div className="my-6" style={{ borderTop: "2px dashed var(--arcade-shadow)" }} />

          <p
            className="text-center"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.5rem",
              color: "var(--arcade-text)",
              lineHeight: "1.8",
            }}
          >
            NO ACCOUNT?{" "}
            <Link
              to={ROUTES.SIGNUP}
              style={{ color: "var(--arcade-accent)", textDecoration: "none" }}
            >
              INSERT COIN
            </Link>
          </p>
        </ArcadePanel>

        {/* Back button */}
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="bg-transparent border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-muted)] hover:[border-color:var(--arcade-border)] hover:[color:var(--arcade-h)] transition-[border-color,color] duration-[80ms]"
          style={{
            display: "block",
            margin: "16px auto 0",
            borderWidth: "2px",
            borderStyle: "solid",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            padding: "8px 16px",
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
        >
          ◀ BACK
        </button>

        {/* Flashing hint */}
        <p
          className="text-center mt-6 animate-pulse"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            color: "var(--arcade-muted)",
          }}
        >
          PRESS ENTER TO CONTINUE
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
