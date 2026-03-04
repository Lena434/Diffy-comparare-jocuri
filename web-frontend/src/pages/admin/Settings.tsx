import { useState } from 'react';
import { getUsers, saveUsers } from '../../services/authService';
import { getAllGames } from '../../services/gameService';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

const FONT = "'Press Start 2P', monospace";
const BANNED_KEY = 'diffy-banned-users';

type DialogType = 'clearUsers' | 'clearBans' | 'clearFavorites' | null;

const panel: React.CSSProperties = {
  background: 'var(--arcade-panel)',
  border: '3px solid var(--arcade-border)',
  boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
  padding: '28px',
  marginBottom: '24px',
};

const sectionTitle: React.CSSProperties = {
  fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
  color: 'var(--arcade-h)',
  textShadow: '2px 2px 0 var(--arcade-h-shadow)',
  letterSpacing: '0.08em',
  marginBottom: '20px',
};

const infoRow = (label: string, value: string | number) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--arcade-shadow)' }}>
    <span style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em' }}>{label}</span>
    <span style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-accent)' }}>{value}</span>
  </div>
);

const dangerBtn = (label: string, onClick: () => void): React.ReactNode => (
  <button
    onClick={onClick}
    className="bg-transparent hover:bg-[#ef4444] text-[#ef4444] hover:text-white border-[3px] border-[#ef4444] [box-shadow:4px_4px_0px_#7f1d1d] hover:[box-shadow:6px_6px_0px_#7f1d1d] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100"
    style={{ fontFamily: FONT, fontSize: '0.45rem', padding: '10px 20px', cursor: 'pointer', letterSpacing: '0.06em' }}
  >
    {label}
  </button>
);

const AdminSettings: React.FC = () => {
  const [dialog, setDialog] = useState<DialogType>(null);
  const [msg, setMsg]       = useState<{ text: string; ok: boolean } | null>(null);

  const users    = getUsers();
  const games    = getAllGames();
  const banned   = (() => { try { return JSON.parse(localStorage.getItem(BANNED_KEY) || '[]') as string[]; } catch { return []; } })();
  const favCount = (() => { try { return JSON.parse(localStorage.getItem('diffy-favorites') || '{}') as Record<string, number[]>; } catch { return {}; } })();

  function flash(text: string, ok = true) {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  }

  function handleClearUsers() {
    const admins = getUsers().filter(u => u.role === 'admin');
    saveUsers(admins);
    setDialog(null);
    flash(`CLEARED ${users.filter(u => u.role !== 'admin').length} NON-ADMIN USER(S).`);
  }

  function handleClearBans() {
    localStorage.removeItem(BANNED_KEY);
    setDialog(null);
    flash(`LIFTED ${banned.length} BAN(S).`);
  }

  function handleClearFavorites() {
    localStorage.removeItem('diffy-favorites');
    setDialog(null);
    flash('ALL FAVORITES CLEARED.');
  }

  return (
    <div style={{ fontFamily: FONT }}>

      <h1 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '28px' }}>
        SETTINGS
      </h1>

      {/* Status message */}
      {msg && (
        <div style={{ background: msg.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `3px solid ${msg.ok ? '#22c55e' : '#ef4444'}`, padding: '14px 20px', marginBottom: '24px', fontFamily: FONT, fontSize: '0.45rem', color: msg.ok ? '#22c55e' : '#ef4444', letterSpacing: '0.06em' }}>
          {msg.ok ? '✓ ' : '✗ '}{msg.text}
        </div>
      )}

      {/* System info */}
      <div style={panel}>
        <h2 style={sectionTitle}>▸ SYSTEM INFO</h2>
        {infoRow('REGISTERED USERS',    users.length)}
        {infoRow('NON-ADMIN USERS',     users.filter(u => u.role !== 'admin').length)}
        {infoRow('ADMIN ACCOUNTS',      users.filter(u => u.role === 'admin').length)}
        {infoRow('BANNED USERS',        banned.length)}
        {infoRow('GAMES IN LIBRARY',    games.length)}
        {infoRow('FAVORITES STORED',    Object.keys(favCount).length + ' USER(S)')}
        {infoRow('STORAGE BACKEND',     'LOCALSTORAGE')}
        {infoRow('ADMIN PANEL VERSION', 'v1.0')}
      </div>

      {/* Danger zone */}
      <div style={{ ...panel, border: '3px solid #ef4444', boxShadow: '5px 5px 0 #7f1d1d, 8px 8px 0 #000' }}>
        <h2 style={{ ...sectionTitle, color: '#ef4444', textShadow: '2px 2px 0 #7f1d1d' }}>▸ DANGER ZONE</h2>
        <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', lineHeight: 2.2, marginBottom: '24px', letterSpacing: '0.04em' }}>
          THESE ACTIONS MODIFY OR DELETE STORED DATA.<br />
          ADMIN ACCOUNTS ARE PRESERVED WHEN CLEARING USERS.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '16px 0', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-text)', marginBottom: '6px' }}>CLEAR ALL USERS</div>
              <div style={{ fontFamily: FONT, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>REMOVES ALL NON-ADMIN ACCOUNTS FROM STORAGE</div>
            </div>
            {dangerBtn('CLEAR USERS', () => setDialog('clearUsers'))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '16px 0', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-text)', marginBottom: '6px' }}>LIFT ALL BANS</div>
              <div style={{ fontFamily: FONT, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>RESTORES ACCESS FOR ALL BANNED USERS ({banned.length} ACTIVE)</div>
            </div>
            {dangerBtn('LIFT ALL BANS', () => setDialog('clearBans'))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '16px 0' }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-text)', marginBottom: '6px' }}>CLEAR ALL FAVORITES</div>
              <div style={{ fontFamily: FONT, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>REMOVES ALL SAVED FAVORITE GAMES FOR ALL USERS</div>
            </div>
            {dangerBtn('CLEAR FAVORITES', () => setDialog('clearFavorites'))}
          </div>

        </div>
      </div>

      {/* Confirm dialogs */}
      <ConfirmDialog
        open={dialog === 'clearUsers'}
        title="CLEAR ALL USERS?"
        message="ALL NON-ADMIN ACCOUNTS WILL BE PERMANENTLY DELETED."
        confirmLabel="YES, CLEAR"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={handleClearUsers}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === 'clearBans'}
        title="LIFT ALL BANS?"
        message="ALL BANNED USERS WILL REGAIN ACCESS TO THE PLATFORM."
        confirmLabel="YES, LIFT"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={handleClearBans}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === 'clearFavorites'}
        title="CLEAR ALL FAVORITES?"
        message="ALL USERS' SAVED FAVORITE GAMES WILL BE DELETED."
        confirmLabel="YES, CLEAR"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={handleClearFavorites}
        onCancel={() => setDialog(null)}
      />
    </div>
  );
};

export default AdminSettings;
