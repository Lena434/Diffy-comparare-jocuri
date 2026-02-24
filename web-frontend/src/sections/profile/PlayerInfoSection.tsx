import { ProfilePanel } from "../../components/arcade/ProfilePanel";
import { PixelInput } from "../../components/arcade/PixelInput";
import { PixelActionBtn } from "../../components/arcade/PixelActionBtn";
import { StatusMsg } from "../../components/arcade/StatusMsg";

interface Props {
  username: string;
  email: string;
  setUsername: (v: string) => void;
  setEmail: (v: string) => void;
  onSave: () => void;
  msg: { text: string; type: "success" | "error" } | null;
}

export function PlayerInfoSection({ username, email, setUsername, setEmail, onSave, msg }: Props) {
  return (
    <ProfilePanel title="▸ PLAYER INFO">
      <PixelInput label="USERNAME" value={username} onChange={setUsername} placeholder="gamertag" />
      <PixelInput label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="player@example.com" />
      <PixelActionBtn onClick={onSave}>💾 SAVE CHANGES</PixelActionBtn>
      {msg && <StatusMsg text={msg.text} type={msg.type} />}
    </ProfilePanel>
  );
}
