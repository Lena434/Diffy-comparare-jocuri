import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { ROUTES } from "../routes/routes";
import { getGamesByIds } from "../services/gameService";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import type { UserProfile, PcSpecs } from "../contexts/AuthContext";
import { PlayerInfoSection } from "../sections/profile/PlayerInfoSection";
import { PasswordSection } from "../sections/profile/PasswordSection";
import { PlatformSection } from "../sections/profile/PlatformSection";
import { FavoritesSection } from "../sections/profile/FavoritesSection";
import { ComparisonsSection } from "../sections/profile/ComparisonsSection";

const FONT = "'Press Start 2P', monospace";

type Msg = { text: string; type: "success" | "error" } | null;
type PlayerInfoForm = { username: string; email: string };
type PasswordForm = { oldPw: string; newPw: string; confirmPw: string };
type PlatformForm = { platform: "playstation" | "xbox" | "pc" | ""; platformVersion: string; pcSpecs: PcSpecs };
type Dialogs = { logout: boolean; password: boolean };

function ProfilePage() {
  const { currentUser, updateProfile, changePassword, logout } = useAuth();
  const { favoriteGameIds, savedComparisons, removeComparison } = useFavorites();
  const navigate = useNavigate();

  const [dialogs, setDialogs] = useState<Dialogs>({ logout: false, password: false });

  const [playerInfo, setPlayerInfo] = useState<PlayerInfoForm>({
    username: currentUser?.username ?? "",
    email: currentUser?.email ?? "",
  });
  const [infoMsg, setInfoMsg] = useState<Msg>(null);

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({ oldPw: "", newPw: "", confirmPw: "" });
  const [pwMsg, setPwMsg] = useState<Msg>(null);

  const [platformForm, setPlatformForm] = useState<PlatformForm>({
    platform: currentUser?.profile?.platform ?? "",
    platformVersion: currentUser?.profile?.platformVersion ?? "",
    pcSpecs: currentUser?.profile?.pcSpecs ?? { cpu: "", gpu: "", ram: "", os: "", storage: "" },
  });
  const [platMsg, setPlatMsg] = useState<Msg>(null);

  useEffect(() => {
    if (currentUser) {
      setPlayerInfo({ username: currentUser.username, email: currentUser.email });
      setPlatformForm({
        platform: currentUser.profile?.platform ?? "",
        platformVersion: currentUser.profile?.platformVersion ?? "",
        pcSpecs: currentUser.profile?.pcSpecs ?? { cpu: "", gpu: "", ram: "", os: "", storage: "" },
      });
    }
  }, [currentUser]);

  const favoriteGames = getGamesByIds(favoriteGameIds);

  function handleSaveInfo() {
    const validationErr = !playerInfo.username.trim() ? "USERNAME REQUIRED!" : !playerInfo.email.trim() ? "EMAIL REQUIRED!" : null;
    if (validationErr) { setInfoMsg({ text: validationErr, type: "error" }); return; }
    const err = updateProfile({ username: playerInfo.username.trim(), email: playerInfo.email.trim() });
    setInfoMsg(err ? { text: err, type: "error" } : { text: "PROFILE UPDATED!", type: "success" });
  }

  function handleChangePassword() {
    const err = changePassword(passwordForm.oldPw, passwordForm.newPw);
    if (err) { setPwMsg({ text: err, type: "error" }); return; }
    setPwMsg({ text: "PASSWORD CHANGED!", type: "success" });
    setPasswordForm({ oldPw: "", newPw: "", confirmPw: "" });
  }

  function handleSavePlatform() {
    if (!platformForm.platform) { setPlatMsg({ text: "SELECT A PLATFORM!", type: "error" }); return; }
    if ((platformForm.platform === "playstation" || platformForm.platform === "xbox") && !platformForm.platformVersion) {
      setPlatMsg({ text: "SELECT VERSION!", type: "error" }); return;
    }
    const profile: UserProfile = {
      platform: platformForm.platform,
      ...(platformForm.platformVersion ? { platformVersion: platformForm.platformVersion } : {}),
      ...(platformForm.platform === "pc" ? { pcSpecs: platformForm.pcSpecs } : {}),
    };
    const err = updateProfile({ profile });
    setPlatMsg(err ? { text: err, type: "error" } : { text: "PLATFORM SAVED!", type: "success" });
  }

  function handlePlatformChange(p: "playstation" | "xbox" | "pc") {
    setPlatformForm(prev => ({ ...prev, platform: p, platformVersion: "" }));
    setPlatMsg(null);
  }

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

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

        <PlayerInfoSection
          username={playerInfo.username}
          email={playerInfo.email}
          setUsername={v => setPlayerInfo(prev => ({ ...prev, username: v }))}
          setEmail={v => setPlayerInfo(prev => ({ ...prev, email: v }))}
          onSave={handleSaveInfo}
          msg={infoMsg}
        />

        <PasswordSection
          oldPw={passwordForm.oldPw}
          newPw={passwordForm.newPw}
          confirmPw={passwordForm.confirmPw}
          setOldPw={v => setPasswordForm(prev => ({ ...prev, oldPw: v }))}
          setNewPw={v => setPasswordForm(prev => ({ ...prev, newPw: v }))}
          setConfirmPw={v => setPasswordForm(prev => ({ ...prev, confirmPw: v }))}
          onRequestUpdate={() => setDialogs(prev => ({ ...prev, password: true }))}
          msg={pwMsg}
          setMsg={setPwMsg}
          currentUserEmail={currentUser?.email}
        />

        <PlatformSection
          platform={platformForm.platform}
          platformVersion={platformForm.platformVersion}
          pcSpecs={platformForm.pcSpecs}
          onPlatformChange={handlePlatformChange}
          setPlatformVersion={v => setPlatformForm(prev => ({ ...prev, platformVersion: v }))}
          setPcSpecs={v => setPlatformForm(prev => ({ ...prev, pcSpecs: v }))}
          onSave={handleSavePlatform}
          msg={platMsg}
        />

        <FavoritesSection games={favoriteGames} />

        <ComparisonsSection
          savedComparisons={savedComparisons}
          onRemove={removeComparison}
        />

        <div style={{ marginTop: "8px", marginBottom: "48px", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setDialogs(prev => ({ ...prev, logout: true }))}
            className="bg-transparent hover:bg-[#ef4444] text-[#ef4444] hover:text-white border-[3px] border-[#ef4444] [box-shadow:4px_4px_0px_var(--arcade-shadow)] hover:[box-shadow:6px_6px_0px_var(--arcade-shadow)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100"
            style={{
              fontFamily: FONT,
              fontSize: "0.45rem",
              padding: "12px 28px",
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            ⏻ LOG OUT
          </button>
        </div>

        <ConfirmDialog
          open={dialogs.logout}
          title="LOG OUT?"
          message="ARE YOU SURE YOU WANT TO LOG OUT?"
          confirmLabel="YES, LOG OUT"
          cancelLabel="CANCEL"
          confirmColor="yellow"
          onConfirm={() => { setDialogs(prev => ({ ...prev, logout: false })); logout(); navigate(ROUTES.HOME); }}
          onCancel={() => setDialogs(prev => ({ ...prev, logout: false }))}
        />

        <ConfirmDialog
          open={dialogs.password}
          title="CHANGE PASSWORD?"
          message="ARE YOU SURE YOU WANT TO UPDATE YOUR PASSWORD?"
          confirmLabel="YES, CHANGE"
          cancelLabel="CANCEL"
          confirmColor="yellow"
          onConfirm={() => { setDialogs(prev => ({ ...prev, password: false })); handleChangePassword(); }}
          onCancel={() => setDialogs(prev => ({ ...prev, password: false }))}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
