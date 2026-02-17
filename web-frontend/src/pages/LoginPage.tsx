import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const err = login(email, password);
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

        {/* Arcade Panel */}
        <div
          style={{
            background: "var(--arcade-panel)",
            border: "4px solid var(--arcade-border)",
            boxShadow: "6px 6px 0px var(--arcade-shadow), 12px 12px 0px #000",
            padding: "2rem",
            position: "relative",
          }}
        >
          {/* Corner bolts */}
          <Bolt top="8px" left="8px" />
          <Bolt top="8px" right="8px" />
          <Bolt bottom="8px" left="8px" />
          <Bolt bottom="8px" right="8px" />

          {/* Title */}
          <h1
            className="text-center mb-8"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "1rem",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.1em",
            }}
          >
            &gt; LOG IN &lt;
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PixelField
              label="EMAIL"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="player@example.com"
            />
            <PixelField
              label="PASSWORD"
              type="password"
              value={password}
              onChange={setPassword}
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

          {/* Divider */}
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
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(ROUTES.HOME)}
          style={{
            display: "block",
            margin: "16px auto 0",
            background: "transparent",
            border: "2px solid var(--arcade-shadow)",
            color: "var(--arcade-muted)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            padding: "8px 16px",
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--arcade-border)";
            e.currentTarget.style.color = "var(--arcade-h)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--arcade-shadow)";
            e.currentTarget.style.color = "var(--arcade-muted)";
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

/* ── helpers ── */

function Bolt({ top, bottom, left, right }: {
  top?: string; bottom?: string; left?: string; right?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top, bottom, left, right,
        width: "12px",
        height: "12px",
        background: "var(--arcade-border)",
        border: "2px solid var(--arcade-shadow)",
        borderRadius: "50%",
        boxShadow: "1px 1px 0 #000",
      }}
    />
  );
}

function PixelField({
  label, type, value, onChange, placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.55rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: "3px solid var(--arcade-border)",
          boxShadow: "3px 3px 0px var(--arcade-shadow)",
          color: "var(--arcade-h)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.55rem",
          padding: "10px 12px",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--arcade-accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--arcade-border)")}
      />
    </div>
  );
}

function PixelButton({ type, label }: { type?: "submit" | "button"; label: string }) {
  return (
    <button
      type={type ?? "button"}
      style={{
        width: "100%",
        background: "var(--arcade-cta)",
        border: "3px solid var(--arcade-text)",
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        color: "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.65rem",
        padding: "14px",
        cursor: "pointer",
        letterSpacing: "0.08em",
        transition: "transform 0.08s, box-shadow 0.08s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--arcade-accent)";
        e.currentTarget.style.borderColor = "var(--arcade-h)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--arcade-cta)";
        e.currentTarget.style.borderColor = "var(--arcade-text)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translate(4px, 4px)";
        e.currentTarget.style.boxShadow = "0px 0px 0px var(--arcade-shadow)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "4px 4px 0px var(--arcade-shadow)";
      }}
    >
      {label}
    </button>
  );
}

export default LoginPage;
