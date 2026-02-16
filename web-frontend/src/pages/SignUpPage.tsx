import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";

function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("PASSWORDS DO NOT MATCH!");
      return;
    }
    setError("");
    // TODO: integrate with backend auth
    navigate(ROUTES.HOME);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: "#0a0a0a",
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
              color: "#f97316",
              textShadow: "3px 3px 0px #7c2d12, 6px 6px 0px #000",
            }}
          >
            DIFFY
          </span>
        </div>

        {/* Arcade Panel */}
        <div
          style={{
            background: "#1e1a2e",
            border: "4px solid #8b5cf6",
            boxShadow: "6px 6px 0px #4c1d95, 12px 12px 0px #000",
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
              fontSize: "0.9rem",
              color: "#facc15",
              textShadow: "2px 2px 0px #92400e",
              letterSpacing: "0.08em",
            }}
          >
            &gt; NEW PLAYER &lt;
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <PixelField
              label="USERNAME"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="gamertag"
            />
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
            <PixelField
              label="CONFIRM PASSWORD"
              type="password"
              value={confirm}
              onChange={setConfirm}
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
              <PixelButton type="submit" label="INSERT COIN" />
            </div>
          </form>

          {/* Divider */}
          <div className="my-6" style={{ borderTop: "2px dashed #4c1d95" }} />

          <p
            className="text-center"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.5rem",
              color: "#a78bfa",
              lineHeight: "1.8",
            }}
          >
            HAVE AN ACCOUNT?{" "}
            <Link
              to={ROUTES.LOGIN}
              style={{ color: "#f97316", textDecoration: "none" }}
            >
              LOG IN
            </Link>
          </p>
        </div>

        {/* Flashing hint */}
        <p
          className="text-center mt-6 animate-pulse"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            color: "#6b7280",
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
        background: "#8b5cf6",
        border: "2px solid #4c1d95",
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
          fontSize: "0.5rem",
          color: "#a78bfa",
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
          background: "#0f0f1a",
          border: "3px solid #8b5cf6",
          boxShadow: "3px 3px 0px #4c1d95",
          color: "#facc15",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.55rem",
          padding: "10px 12px",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#f97316")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#8b5cf6")}
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
        background: "#7c3aed",
        border: "3px solid #a78bfa",
        boxShadow: "4px 4px 0px #4c1d95",
        color: "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.65rem",
        padding: "14px",
        cursor: "pointer",
        letterSpacing: "0.08em",
        transition: "transform 0.08s, box-shadow 0.08s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f97316";
        e.currentTarget.style.borderColor = "#facc15";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#7c3aed";
        e.currentTarget.style.borderColor = "#a78bfa";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translate(4px, 4px)";
        e.currentTarget.style.boxShadow = "0px 0px 0px #4c1d95";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "4px 4px 0px #4c1d95";
      }}
    >
      {label}
    </button>
  );
}

export default SignUpPage;
