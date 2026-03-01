import { ProfilePanel } from "../../components/arcade/ProfilePanel";
import { PixelInput } from "../../components/arcade/PixelInput";
import { PixelSelect } from "../../components/arcade/PixelSelect";
import { PixelActionBtn } from "../../components/arcade/PixelActionBtn";
import { StatusMsg } from "../../components/arcade/StatusMsg";
import type { PcSpecs } from "../../contexts/AuthContext";

const PS_VERSIONS = ["PS3", "PS4", "PS5"];
const XBOX_VERSIONS = ["Xbox 360", "Xbox One", "Xbox Series S", "Xbox Series X"];
const OS_OPTIONS = ["Windows 10", "Windows 11", "Linux", "macOS"];

function PlatformChip({
  label, icon, active, onClick,
}: {
  label: string; icon: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "[background:var(--arcade-cta)] border-solid [border-color:var(--arcade-h)] text-white [box-shadow:3px_3px_0px_var(--arcade-shadow)] transition-all duration-[100ms]"
          : "bg-transparent border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-text)] hover:[background:rgba(139,92,246,0.15)] hover:[border-color:var(--arcade-border)] hover:[color:var(--arcade-h)] transition-all duration-[100ms]"
      }
      style={{
        borderWidth: "3px",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.4rem",
        padding: "10px 16px",
        cursor: "pointer",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

interface Props {
  platform: "playstation" | "xbox" | "pc" | "";
  platformVersion: string;
  pcSpecs: PcSpecs;
  onPlatformChange: (p: "playstation" | "xbox" | "pc") => void;
  setPlatformVersion: (v: string) => void;
  setPcSpecs: (specs: PcSpecs) => void;
  onSave: () => void;
  msg: { text: string; type: "success" | "error" } | null;
}

export function PlatformSection({
  platform, platformVersion, pcSpecs,
  onPlatformChange, setPlatformVersion, setPcSpecs,
  onSave, msg,
}: Props) {
  return (
    <ProfilePanel title="▸ GAMING PLATFORM">
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.35rem",
          color: "var(--arcade-muted)",
          marginBottom: "14px",
          letterSpacing: "0.04em",
        }}
      >
        SELECT YOUR PRIMARY GAMING PLATFORM
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
        <PlatformChip icon="🎮" label="PLAYSTATION" active={platform === "playstation"} onClick={() => onPlatformChange("playstation")} />
        <PlatformChip icon="🟩" label="XBOX" active={platform === "xbox"} onClick={() => onPlatformChange("xbox")} />
        <PlatformChip icon="💻" label="PC" active={platform === "pc"} onClick={() => onPlatformChange("pc")} />
      </div>

      {platform === "playstation" && (
        <PixelSelect label="CONSOLE VERSION" value={platformVersion} onChange={setPlatformVersion} options={PS_VERSIONS} />
      )}
      {platform === "xbox" && (
        <PixelSelect label="CONSOLE VERSION" value={platformVersion} onChange={setPlatformVersion} options={XBOX_VERSIONS} />
      )}

      {platform === "pc" && (
        <div style={{ padding: "16px", border: "2px dashed var(--arcade-border)", marginBottom: "14px" }}>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
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

      {platform && <PixelActionBtn onClick={onSave}>💾 SAVE PLATFORM</PixelActionBtn>}
      {msg && <StatusMsg text={msg.text} type={msg.type} />}
    </ProfilePanel>
  );
}
