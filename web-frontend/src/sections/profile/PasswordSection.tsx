import { useState } from "react";
import { ProfilePanel } from "../../components/arcade/ProfilePanel";
import { PixelInput } from "../../components/arcade/PixelInput";
import { PixelActionBtn } from "../../components/arcade/PixelActionBtn";
import { StatusMsg } from "../../components/arcade/StatusMsg";

interface Props {
  oldPw: string;
  newPw: string;
  confirmPw: string;
  setOldPw: (v: string) => void;
  setNewPw: (v: string) => void;
  setConfirmPw: (v: string) => void;
  onRequestUpdate: () => void;
  msg: { text: string; type: "success" | "error" } | null;
  setMsg: (msg: { text: string; type: "success" | "error" } | null) => void;
  currentUserEmail?: string;
}

export function PasswordSection({
  oldPw, newPw, confirmPw,
  setOldPw, setNewPw, setConfirmPw,
  onRequestUpdate, msg, setMsg, currentUserEmail,
}: Props) {
  const [showForgot, setShowForgot] = useState(false);

  function handleClick() {
    if (!oldPw) { setMsg({ text: "ENTER OLD PASSWORD!", type: "error" }); return; }
    if (!newPw) { setMsg({ text: "ENTER NEW PASSWORD!", type: "error" }); return; }
    if (newPw !== confirmPw) { setMsg({ text: "PASSWORDS DO NOT MATCH!", type: "error" }); return; }
    if (newPw.length < 4) { setMsg({ text: "PASSWORD TOO SHORT (MIN 4)!", type: "error" }); return; }
    onRequestUpdate();
  }

  return (
    <ProfilePanel title="▸ CHANGE PASSWORD">
      <PixelInput label="OLD PASSWORD" type="password" value={oldPw} onChange={setOldPw} placeholder="••••••••" />
      <PixelInput label="NEW PASSWORD" type="password" value={newPw} onChange={setNewPw} placeholder="••••••••" />
      <PixelInput label="CONFIRM NEW PASSWORD" type="password" value={confirmPw} onChange={setConfirmPw} placeholder="••••••••" />

      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <PixelActionBtn onClick={handleClick}>🔒 UPDATE PASSWORD</PixelActionBtn>
        <button
          onClick={() => setShowForgot(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--arcade-accent)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.35rem",
            cursor: "pointer",
            textDecoration: "underline",
            padding: "8px 0",
          }}
        >
          FORGOT PASSWORD?
        </button>
      </div>

      {msg && <StatusMsg text={msg.text} type={msg.type} />}

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
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.35rem",
              color: "var(--arcade-text)",
              lineHeight: 2,
              margin: 0,
            }}
          >
            📧 A RESET LINK WILL BE SENT TO<br />
            <span style={{ color: "var(--arcade-accent)" }}>{currentUserEmail}</span>
            <br />
            <span style={{ color: "var(--arcade-muted)" }}>(COMING SOON)</span>
          </p>
        </div>
      )}
    </ProfilePanel>
  );
}
