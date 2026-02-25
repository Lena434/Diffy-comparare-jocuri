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

function ProfilePage() {
  const { currentUser, updateProfile, changePassword, logout } = useAuth();
  const { favoriteGameIds, savedComparisons, removeComparison } = useFavorites();
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [infoMsg, setInfoMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [platform, setPlatform] = useState<"playstation" | "xbox" | "pc" | "">(
    currentUser?.profile?.platform ?? ""
  );
  const [platformVersion, setPlatformVersion] = useState(
    currentUser?.profile?.platformVersion ?? ""
  );
  const [pcSpecs, setPcSpecs] = useState<PcSpecs>(
    currentUser?.profile?.pcSpecs ?? { cpu: "", gpu: "", ram: "", os: "", storage: "" }
  );
  const [platMsg, setPlatMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

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

  function handleSaveInfo() {
    const validationErr = !username.trim() ? "USERNAME REQUIRED!" : !email.trim() ? "EMAIL REQUIRED!" : null;
    if (validationErr) { setInfoMsg({ text: validationErr, type: "error" }); return; }
    const err = updateProfile({ username: username.trim(), email: email.trim() });
    setInfoMsg(err ? { text: err, type: "error" } : { text: "PROFILE UPDATED!", type: "success" });
  }

  function handleChangePassword() {
    const err = changePassword(oldPw, newPw);
    if (err) { setPwMsg({ text: err, type: "error" }); return; }
    setPwMsg({ text: "PASSWORD CHANGED!", type: "success" });
    setOldPw(""); setNewPw(""); setConfirmPw("");
  }

  function handleSavePlatform() {
    if (!platform) { setPlatMsg({ text: "SELECT A PLATFORM!", type: "error" }); return; }
    if ((platform === "playstation" || platform === "xbox") && !platformVersion) {
      setPlatMsg({ text: "SELECT VERSION!", type: "error" }); return;
    }
    const profile: UserProfile = {
      platform,
      ...(platformVersion ? { platformVersion } : {}),
      ...(platform === "pc" ? { pcSpecs } : {}),
    };
    const err = updateProfile({ profile });
    setPlatMsg(err ? { text: err, type: "error" } : { text: "PLATFORM SAVED!", type: "success" });
  }

  function handlePlatformChange(p: "playstation" | "xbox" | "pc") {
    setPlatform(p);
    setPlatformVersion("");
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
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          onSave={handleSaveInfo}
          msg={infoMsg}
        />

        <PasswordSection
          oldPw={oldPw}
          newPw={newPw}
          confirmPw={confirmPw}
          setOldPw={setOldPw}
          setNewPw={setNewPw}
          setConfirmPw={setConfirmPw}
          onRequestUpdate={() => setShowPwConfirm(true)}
          msg={pwMsg}
          setMsg={setPwMsg}
          currentUserEmail={currentUser?.email}
        />

        <PlatformSection
          platform={platform}
          platformVersion={platformVersion}
          pcSpecs={pcSpecs}
          onPlatformChange={handlePlatformChange}
          setPlatformVersion={setPlatformVersion}
          setPcSpecs={setPcSpecs}
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
            onClick={() => setShowLogoutConfirm(true)}
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
          open={showLogoutConfirm}
          title="LOG OUT?"
          message="ARE YOU SURE YOU WANT TO LOG OUT?"
          confirmLabel="YES, LOG OUT"
          cancelLabel="CANCEL"
          confirmColor="yellow"
          onConfirm={() => { setShowLogoutConfirm(false); logout(); navigate(ROUTES.HOME); }}
          onCancel={() => setShowLogoutConfirm(false)}
        />

        <ConfirmDialog
          open={showPwConfirm}
          title="CHANGE PASSWORD?"
          message="ARE YOU SURE YOU WANT TO UPDATE YOUR PASSWORD?"
          confirmLabel="YES, CHANGE"
          cancelLabel="CANCEL"
          confirmColor="yellow"
          onConfirm={() => { setShowPwConfirm(false); handleChangePassword(); }}
          onCancel={() => setShowPwConfirm(false)}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
