import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/authService';
import { ROUTES } from '../../routes/routes';

const FONT = "'Press Start 2P', monospace";
const BANNED_KEY = 'diffy-banned-users';

function getBannedEmails(): string[] {
  try { return JSON.parse(localStorage.getItem(BANNED_KEY) || '[]'); } catch { return []; }
}

const panel: React.CSSProperties = {
  background: 'var(--arcade-panel)',
  border: '3px solid var(--arcade-border)',
  boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
  padding: '28px',
  marginBottom: '24px',
};

const label: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '0.32rem',
  color: 'var(--arcade-muted)',
  letterSpacing: '0.06em',
  marginBottom: '6px',
};

const value: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '0.42rem',
  color: 'var(--arcade-text)',
  letterSpacing: '0.03em',
};

const AdminUserDetail: React.FC = () => {
  const { email: rawEmail } = useParams<{ email: string }>();
  const navigate = useNavigate();

  const email = decodeURIComponent(rawEmail ?? '');
  const users  = getUsers();
  const banned = getBannedEmails();
  const user   = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return (
      <div style={{ fontFamily: FONT, textAlign: 'center', padding: '80px 0' }}>
        <div style={{ fontSize: '0.6rem', color: '#ef4444', marginBottom: '24px' }}>USER NOT FOUND</div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_USERS)}
          style={{ fontFamily: FONT, fontSize: '0.4rem', padding: '10px 20px', border: '3px solid var(--arcade-accent)', background: 'transparent', color: 'var(--arcade-accent)', cursor: 'pointer', letterSpacing: '0.05em' }}
        >
          ← BACK TO USERS
        </button>
      </div>
    );
  }

  const isBanned   = banned.includes(user.email.toLowerCase());
  const role       = user.role ?? 'user';
  const initials   = user.username.slice(0, 2).toUpperCase();
  const platform   = user.profile?.platform;
  const pcSpecs    = user.profile?.pcSpecs;
  const platVer    = user.profile?.platformVersion;

  return (
    <div style={{ fontFamily: FONT }}>

      {/* Back button */}
      <button
        onClick={() => navigate(ROUTES.ADMIN_USERS)}
        style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '8px 16px', border: '2px solid var(--arcade-border)', background: 'transparent', color: 'var(--arcade-muted)', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '2px 2px 0 var(--arcade-shadow)', marginBottom: '28px' }}
      >
        ← BACK
      </button>

      {/* Header card */}
      <div style={{ ...panel, display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Avatar */}
        <div style={{
          width: '80px', height: '80px', flexShrink: 0,
          background: role === 'admin' ? 'var(--arcade-accent)' : 'rgba(124,77,255,0.3)',
          border: '4px solid var(--arcade-border)',
          boxShadow: '4px 4px 0 #000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT, fontSize: '1.2rem', color: '#fff',
        }}>
          {initials}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontFamily: FONT, fontSize: 'clamp(0.65rem, 2vw, 0.95rem)', color: 'var(--arcade-h)', marginBottom: '10px' }}>
            {user.username}
          </div>
          <div style={{ fontFamily: FONT, fontSize: '0.38rem', color: 'var(--arcade-muted)', marginBottom: '14px', letterSpacing: '0.03em' }}>
            {user.email}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* Role badge */}
            <span style={{
              display: 'inline-block', padding: '4px 12px', fontFamily: FONT, fontSize: '0.36rem', letterSpacing: '0.05em',
              border: `2px solid ${role === 'admin' ? 'var(--arcade-accent)' : 'var(--arcade-border)'}`,
              color: role === 'admin' ? 'var(--arcade-accent)' : 'var(--arcade-muted)',
            }}>
              {role.toUpperCase()}
            </span>
            {/* Status badge */}
            <span style={{
              display: 'inline-block', padding: '4px 12px', fontFamily: FONT, fontSize: '0.36rem', letterSpacing: '0.05em',
              border: `2px solid ${isBanned ? '#ef4444' : '#22c55e'}`,
              color: isBanned ? '#ef4444' : '#22c55e',
            }}>
              {isBanned ? 'BANNED' : 'ACTIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* Account info */}
      <div style={panel}>
        <h2 style={{ fontFamily: FONT, fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)', color: 'var(--arcade-h)', letterSpacing: '0.08em', marginBottom: '20px' }}>
          ▸ ACCOUNT INFO
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { label: 'USERNAME',  val: user.username },
            { label: 'EMAIL',     val: user.email },
            { label: 'ROLE',      val: role.toUpperCase() },
            { label: 'STATUS',    val: isBanned ? 'BANNED' : 'ACTIVE' },
          ].map(row => (
            <div key={row.label} style={{ background: 'rgba(124,77,255,0.06)', border: '2px solid var(--arcade-shadow)', padding: '14px 16px' }}>
              <div style={label}>{row.label}</div>
              <div style={value}>{row.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform / PC Specs */}
      {platform ? (
        <div style={panel}>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)', color: 'var(--arcade-h)', letterSpacing: '0.08em', marginBottom: '20px' }}>
            ▸ PLATFORM
          </h2>
          {platform === 'pc' && pcSpecs ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              {([
                { label: 'PLATFORM', val: 'PC' },
                { label: 'CPU',     val: pcSpecs.cpu     || '—' },
                { label: 'GPU',     val: pcSpecs.gpu     || '—' },
                { label: 'RAM',     val: pcSpecs.ram     || '—' },
                { label: 'OS',      val: pcSpecs.os      || '—' },
                { label: 'STORAGE', val: pcSpecs.storage || '—' },
              ] as { label: string; val: string }[]).map(row => (
                <div key={row.label} style={{ background: 'rgba(124,77,255,0.06)', border: '2px solid var(--arcade-shadow)', padding: '14px 16px' }}>
                  <div style={label}>{row.label}</div>
                  <div style={value}>{row.val}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {([
                { label: 'PLATFORM', val: platform.toUpperCase() },
                ...(platVer ? [{ label: 'VERSION', val: platVer }] : []),
              ] as { label: string; val: string }[]).map(row => (
                <div key={row.label} style={{ background: 'rgba(124,77,255,0.06)', border: '2px solid var(--arcade-shadow)', padding: '14px 16px' }}>
                  <div style={label}>{row.label}</div>
                  <div style={value}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={panel}>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)', color: 'var(--arcade-h)', letterSpacing: '0.08em', marginBottom: '16px' }}>
            ▸ PLATFORM
          </h2>
          <div style={{ fontFamily: FONT, fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em' }}>
            NO PLATFORM SET
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUserDetail;
