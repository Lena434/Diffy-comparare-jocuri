import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { ROUTES } from "../routes/routes";
import { getGamesByIds } from "../services/gameService";
import GameCard from "../components/GameCard";
import type { UserProfile, PcSpecs } from "../contexts/AuthContext";

/* ── Shared pixel styles ── */
const FONT = "'Press Start 2P', monospace";

const PS_VERSIONS = ["PS3", "PS4", "PS5"];
const XBOX_VERSIONS = ["Xbox 360", "Xbox One", "Xbox Series S", "Xbox Series X"];
const OS_OPTIONS = ["Windows 10", "Windows 11", "Linux", "macOS"];

/* ── Helper Components ── */

function SectionPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "6px 6px 0px var(--arcade-shadow)",
        padding: "24px",
        marginBottom: "32px",
        position: "relative",
      }}
    >
      {/* Corner bolts */}
      {[
        { top: "8px", left: "8px" },
        { top: "8px", right: "8px" },
        { bottom: "8px", left: "8px" },
        { bottom: "8px", right: "8px" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: "10px",
            height: "10px",
            background: "var(--arcade-border)",
            border: "2px solid var(--arcade-shadow)",
            borderRadius: "50%",
            boxShadow: "1px 1px 0 #000",
          }}
        />
      ))}

      <h2
        style={{
          fontFamily: FONT,
          fontSize: "0.6rem",
          color: "var(--arcade-h)",
          textShadow: "2px 2px 0px var(--arcade-h-shadow)",
          letterSpacing: "0.08em",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function PixelInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label
        style={{
          display: "block",
          fontFamily: FONT,
          fontSize: "0.4rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: "3px solid var(--arcade-border)",
          boxShadow: "3px 3px 0px var(--arcade-shadow)",
          color: "var(--arcade-h)",
          fontFamily: FONT,
          fontSize: "0.45rem",
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

function PixelSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label
        style={{
          display: "block",
          fontFamily: FONT,
          fontSize: "0.4rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: "3px solid var(--arcade-border)",
          boxShadow: "3px 3px 0px var(--arcade-shadow)",
          color: "var(--arcade-h)",
          fontFamily: FONT,
          fontSize: "0.45rem",
          padding: "10px 12px",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <option value="">-- SELECT --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function PixelBtn({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}) {
  const bg =
    variant === "primary"
      ? "var(--arcade-cta)"
      : variant === "danger"
      ? "rgba(239,68,68,0.8)"
      : "transparent";
  const borderColor = variant === "secondary" ? "var(--arcade-border)" : "var(--arcade-text)";

  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `3px solid ${borderColor}`,
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        color: variant === "secondary" ? "var(--arcade-text)" : "#fff",
        fontFamily: FONT,
        fontSize: "0.45rem",
        padding: "12px 20px",
        cursor: "pointer",
        letterSpacing: "0.06em",
        transition: "transform 0.08s, box-shadow 0.08s",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translate(4px, 4px)";
        e.currentTarget.style.boxShadow = "0 0 0 var(--arcade-shadow)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "4px 4px 0px var(--arcade-shadow)";
      }}
    >
      {children}
    </button>
  );
}

function PlatformChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: active ? "var(--arcade-cta)" : hovered ? "rgba(139,92,246,0.15)" : "transparent",
        border: `3px solid ${active ? "var(--arcade-h)" : hovered ? "var(--arcade-border)" : "var(--arcade-shadow)"}`,
        boxShadow: active ? "3px 3px 0px var(--arcade-shadow)" : "none",
        color: active ? "#fff" : hovered ? "var(--arcade-h)" : "var(--arcade-text)",
        fontFamily: FONT,
        fontSize: "0.4rem",
        padding: "10px 16px",
        cursor: "pointer",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.1s",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatusMsg({ text, type }: { text: string; type: "success" | "error" }) {
  return (
    <p
      style={{
        fontFamily: FONT,
        fontSize: "0.4rem",
        color: type === "success" ? "#4ade80" : "#f87171",
        textShadow: type === "success" ? "1px 1px 0 #166534" : "1px 1px 0 #7f1d1d",
        lineHeight: 1.8,
        marginTop: "10px",
      }}
    >
      {type === "success" ? "✓" : "⚠"} {text}
    </p>
  );
}

function ComparisonCard({
  gameIds,
  onRemove,
}: {
  gameIds: number[];
  onRemove: () => void;
}) {
  const [removeHovered, setRemoveHovered] = useState(false);
  const games = getGamesByIds(gameIds);

  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          fontFamily: FONT,
          fontSize: "0.38rem",
          color: "var(--arcade-h)",
          letterSpacing: "0.04em",
          margin: 0,
        }}
      >
        ⚔ {games.map((g) => g!.title.toUpperCase()).join(" VS ")}
      </p>
      <button
        onClick={onRemove}
        onMouseEnter={() => setRemoveHovered(true)}
        onMouseLeave={() => setRemoveHovered(false)}
        style={{
          background: removeHovered ? "#dc2626" : "transparent",
          border: `2px solid ${removeHovered ? "#f87171" : "var(--arcade-shadow)"}`,
          color: removeHovered ? "#fff" : "var(--arcade-muted)",
          fontFamily: FONT,
          fontSize: "0.3rem",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        ✕ REMOVE
      </button>
    </div>
  );
}

/* ── Main ProfilePage ── */

function ProfilePage() {
  const { currentUser, updateProfile, changePassword } = useAuth();
  const { favoriteGameIds, savedComparisons, removeComparison } = useFavorites();
  const navigate = useNavigate();

  // Player info
  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [infoMsg, setInfoMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Password
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showForgot, setShowForgot] = useState(false);

  // Platform
  const [platform, setPlatform] = useState<'playstation' | 'xbox' | 'pc' | ''>(
    currentUser?.profile?.platform ?? ""
  );
  const [platformVersion, setPlatformVersion] = useState(
    currentUser?.profile?.platformVersion ?? ""
  );
  const [pcSpecs, setPcSpecs] = useState<PcSpecs>(
    currentUser?.profile?.pcSpecs ?? { cpu: "", gpu: "", ram: "", os: "", storage: "" }
  );
  const [platMsg, setPlatMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Sync state when user changes
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setPlatform(currentUser.profile?.platform ?? "");
      setPlatformVersion(currentUser.profile?.platformVersion ?? "");
      setPcSpecs(currentUser.profile?.pcSpecs ?? { cpu: "", gpu: "", ram: "", os: "", storage: "" });
    }
  }, [currentUser]);

  const favoriteGames = getGamesByIds(favoriteGameIds);

  // Handlers
  function handleSaveInfo() {
    if (!username.trim()) { setInfoMsg({ text: "USERNAME REQUIRED!", type: "error" }); return; }
    if (!email.trim()) { setInfoMsg({ text: "EMAIL REQUIRED!", type: "error" }); return; }
    const err = updateProfile({ username: username.trim(), email: email.trim() });
    setInfoMsg(err ? { text: err, type: "error" } : { text: "PROFILE UPDATED!", type: "success" });
  }

  function handleChangePassword() {
    if (!oldPw) { setPwMsg({ text: "ENTER OLD PASSWORD!", type: "error" }); return; }
    if (!newPw) { setPwMsg({ text: "ENTER NEW PASSWORD!", type: "error" }); return; }
    if (newPw !== confirmPw) { setPwMsg({ text: "PASSWORDS DO NOT MATCH!", type: "error" }); return; }
    if (newPw.length < 4) { setPwMsg({ text: "PASSWORD TOO SHORT (MIN 4)!", type: "error" }); return; }
    const err = changePassword(oldPw, newPw);
    if (err) { setPwMsg({ text: err, type: "error" }); return; }
    setPwMsg({ text: "PASSWORD CHANGED!", type: "success" });
    setOldPw(""); setNewPw(""); setConfirmPw("");
  }

  function handleSavePlatform() {
    if (!platform) { setPlatMsg({ text: "SELECT A PLATFORM!", type: "error" }); return; }
    const profile: UserProfile = { platform };
    if (platform === 'playstation' || platform === 'xbox') {
      if (!platformVersion) { setPlatMsg({ text: "SELECT VERSION!", type: "error" }); return; }
      profile.platformVersion = platformVersion;
    }
    if (platform === 'pc') {
      profile.pcSpecs = pcSpecs;
    }
    const err = updateProfile({ profile });
    setPlatMsg(err ? { text: err, type: "error" } : { text: "PLATFORM SAVED!", type: "success" });
  }

  function handlePlatformChange(p: 'playstation' | 'xbox' | 'pc') {
    setPlatform(p);
    setPlatformVersion("");
    setPlatMsg(null);
  }

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px", marginTop: "24px" }}>
          <h1
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1rem, 3vw, 1.8rem)",
              color: "var(--arcade-h)",
              textShadow: "3px 3px 0px var(--arcade-h-shadow), 6px 6px 0px #000",
              letterSpacing: "0.1em",
              margin: "0 0 12px",
            }}
          >
            👤 PLAYER PROFILE
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "0.4rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.06em",
            }}
          >
            MANAGE YOUR ACCOUNT AND PREFERENCES
          </p>
        </div>

        {/* ── PLAYER INFO ── */}
        <SectionPanel title="▸ PLAYER INFO">
          <PixelInput label="USERNAME" value={username} onChange={setUsername} placeholder="gamertag" />
          <PixelInput label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="player@example.com" />
          <PixelBtn onClick={handleSaveInfo}>💾 SAVE CHANGES</PixelBtn>
          {infoMsg && <StatusMsg text={infoMsg.text} type={infoMsg.type} />}
        </SectionPanel>

        {/* ── CHANGE PASSWORD ── */}
        <SectionPanel title="▸ CHANGE PASSWORD">
          <PixelInput label="OLD PASSWORD" type="password" value={oldPw} onChange={setOldPw} placeholder="••••••••" />
          <PixelInput label="NEW PASSWORD" type="password" value={newPw} onChange={setNewPw} placeholder="••••••••" />
          <PixelInput label="CONFIRM NEW PASSWORD" type="password" value={confirmPw} onChange={setConfirmPw} placeholder="••••••••" />
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <PixelBtn onClick={handleChangePassword}>🔒 UPDATE PASSWORD</PixelBtn>
            <button
              onClick={() => setShowForgot(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--arcade-accent)",
                fontFamily: FONT,
                fontSize: "0.35rem",
                cursor: "pointer",
                textDecoration: "underline",
                padding: "8px 0",
              }}
            >
              FORGOT PASSWORD?
            </button>
          </div>
          {pwMsg && <StatusMsg text={pwMsg.text} type={pwMsg.type} />}
          {showForgot && (
            <div
              style={{
                marginTop: "14px",
                padding: "14px 18px",
                background: "rgba(139,92,246,0.1)",
                border: "2px dashed var(--arcade-border)",
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "0.35rem",
                  color: "var(--arcade-text)",
                  lineHeight: 2,
                  margin: 0,
                }}
              >
                📧 A RESET LINK WILL BE SENT TO<br />
                <span style={{ color: "var(--arcade-accent)" }}>{currentUser?.email}</span>
                <br />
                <span style={{ color: "var(--arcade-muted)" }}>(COMING SOON)</span>
              </p>
            </div>
          )}
        </SectionPanel>

        {/* ── GAMING PLATFORM ── */}
        <SectionPanel title="▸ GAMING PLATFORM">
          <p
            style={{
              fontFamily: FONT,
              fontSize: "0.35rem",
              color: "var(--arcade-muted)",
              marginBottom: "14px",
              letterSpacing: "0.04em",
            }}
          >
            SELECT YOUR PRIMARY GAMING PLATFORM
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
            <PlatformChip icon="🎮" label="PLAYSTATION" active={platform === "playstation"} onClick={() => handlePlatformChange("playstation")} />
            <PlatformChip icon="🟩" label="XBOX" active={platform === "xbox"} onClick={() => handlePlatformChange("xbox")} />
            <PlatformChip icon="💻" label="PC" active={platform === "pc"} onClick={() => handlePlatformChange("pc")} />
          </div>

          {/* Console version sub-select */}
          {platform === "playstation" && (
            <PixelSelect label="CONSOLE VERSION" value={platformVersion} onChange={setPlatformVersion} options={PS_VERSIONS} />
          )}
          {platform === "xbox" && (
            <PixelSelect label="CONSOLE VERSION" value={platformVersion} onChange={setPlatformVersion} options={XBOX_VERSIONS} />
          )}

          {/* PC Specs */}
          {platform === "pc" && (
            <div
              style={{
                padding: "16px",
                border: "2px dashed var(--arcade-border)",
                marginBottom: "14px",
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "0.38rem",
                  color: "var(--arcade-accent)",
                  marginBottom: "14px",
                  letterSpacing: "0.05em",
                }}
              >
                🖥 PC SPECIFICATIONS
              </p>
              <PixelInput label="PROCESSOR (CPU)" value={pcSpecs.cpu} onChange={(v) => setPcSpecs({ ...pcSpecs, cpu: v })} placeholder="e.g. Intel i7-12700K" />
              <PixelInput label="GRAPHICS CARD (GPU)" value={pcSpecs.gpu} onChange={(v) => setPcSpecs({ ...pcSpecs, gpu: v })} placeholder="e.g. RTX 3080" />
              <PixelInput label="RAM" value={pcSpecs.ram} onChange={(v) => setPcSpecs({ ...pcSpecs, ram: v })} placeholder="e.g. 16 GB" />
              <PixelSelect label="OPERATING SYSTEM" value={pcSpecs.os} onChange={(v) => setPcSpecs({ ...pcSpecs, os: v })} options={OS_OPTIONS} />
              <PixelInput label="AVAILABLE STORAGE" value={pcSpecs.storage} onChange={(v) => setPcSpecs({ ...pcSpecs, storage: v })} placeholder="e.g. 500 GB" />
            </div>
          )}

          {platform && <PixelBtn onClick={handleSavePlatform}>💾 SAVE PLATFORM</PixelBtn>}
          {platMsg && <StatusMsg text={platMsg.text} type={platMsg.type} />}
        </SectionPanel>

        {/* ── MY FAVORITES ── */}
        <SectionPanel title="▸ MY FAVORITE GAMES">
          {favoriteGames.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                gap: "16px",
              }}
            >
              {favoriteGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: FONT, fontSize: "0.38rem", color: "var(--arcade-muted)" }}>
              NO FAVORITE GAMES YET
            </p>
          )}
        </SectionPanel>

        <SectionPanel title="▸ SAVED COMPARISONS">
          {savedComparisons.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {savedComparisons.map((comp) => (
                <ComparisonCard
                  key={comp.id}
                  gameIds={comp.gameIds}
                  onRemove={() => removeComparison(comp.id)}
                />
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: FONT, fontSize: "0.38rem", color: "var(--arcade-muted)" }}>
              NO SAVED COMPARISONS YET
            </p>
          )}
        </SectionPanel>
      </div>
    </div>
  );
}

export default ProfilePage;
