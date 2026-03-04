import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

// TODO: Replace with real data from your auth context
const MOCK_USER = {
  username: 'ShadowNinja42',
  email: 'shadow@mail.com',
  joined: 'January 15, 2024',
  initials: 'SN',
  comparisons: 47,
  gamesViewed: 312,
  favoriteGenre: 'RPG',
};

const MOCK_HISTORY = [
  { id: 1, game1: 'Cyberpunk 2077', game2: 'The Witcher 3', winner: 'The Witcher 3', date: '2 hours ago' },
  { id: 2, game1: 'Elden Ring',     game2: 'Dark Souls 3',  winner: 'Elden Ring',     date: '1 day ago'  },
  { id: 3, game1: 'CS2',            game2: 'Valorant',      winner: 'CS2',            date: '3 days ago' },
  { id: 4, game1: 'Minecraft',      game2: 'Terraria',      winner: 'Minecraft',      date: '1 week ago' },
];

type Tab = 'info' | 'history' | 'settings';

const panel: React.CSSProperties = {
  background: 'var(--arcade-panel)',
  border: '3px solid var(--arcade-border)',
  boxShadow: '5px 5px 0px var(--arcade-shadow), 8px 8px 0px #000',
  padding: '28px',
  marginBottom: '24px',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
  color: 'var(--arcade-h)',
  letterSpacing: '0.08em',
  margin: '0 0 20px 0',
};

const fieldLabel: React.CSSProperties = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '0.35rem',
  color: 'var(--arcade-muted)',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};

const fieldValue: React.CSSProperties = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '0.48rem',
  color: 'var(--arcade-text)',
  letterSpacing: '0.03em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(124,77,255,0.08)',
  border: '2px solid var(--arcade-border)',
  color: 'var(--arcade-text)',
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '0.4rem',
  letterSpacing: '0.03em',
  outline: 'none',
  boxSizing: 'border-box',
};

function UserPage() {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [form, setForm] = useState({
    username: MOCK_USER.username,
    email: MOCK_USER.email,
    password: '',
    confirm: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call your API to update user data
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabBtn = (tab: Tab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '0.45rem',
        padding: '10px 20px',
        border: '3px solid var(--arcade-border)',
        background: activeTab === tab ? 'var(--arcade-accent)' : 'transparent',
        color: activeTab === tab ? '#fff' : 'var(--arcade-muted)',
        cursor: 'pointer',
        letterSpacing: '0.05em',
        transition: 'background 0.1s, color 0.1s',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', paddingLeft: '16px', paddingRight: '16px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.38rem', color: 'var(--arcade-muted)', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '16px', animation: 'pixel-blink 1.2s steps(1) infinite' }}>
          ★ PLAYER CARD ★
        </div>
        <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(1rem, 4vw, 1.8rem)', color: 'var(--arcade-accent)', textShadow: '4px 4px 0px var(--arcade-accent-dark), 8px 8px 0px #000', letterSpacing: '0.1em', textAlign: 'center', margin: '0 0 32px 0' }}>
          MY PROFILE
        </h1>

        {/* Avatar card */}
        <div style={{ ...panel, display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '88px', height: '88px', flexShrink: 0, background: 'var(--arcade-accent)', border: '4px solid var(--arcade-border)', boxShadow: '4px 4px 0 #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: '1.4rem', color: '#fff' }}>
            {MOCK_USER.initials}
          </div>

          <div style={{ flex: 1, minWidth: '160px' }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(0.65rem, 2vw, 0.95rem)', color: 'var(--arcade-h)', marginBottom: '10px' }}>
              {MOCK_USER.username}
            </div>
            <div style={{ ...fieldValue, opacity: 0.7, marginBottom: '6px' }}>{MOCK_USER.email}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.35rem', color: 'var(--arcade-muted)' }}>JOINED {MOCK_USER.joined}</div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {[
              { label: 'COMPARES',  val: MOCK_USER.comparisons },
              { label: 'VIEWED',    val: MOCK_USER.gamesViewed },
              { label: 'FAV GENRE', val: MOCK_USER.favoriteGenre },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(124,77,255,0.1)', border: '2px solid var(--arcade-shadow)', padding: '14px 18px', textAlign: 'center', minWidth: '88px' }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(0.65rem, 2vw, 1rem)', color: 'var(--arcade-accent)', marginBottom: '8px' }}>{s.val}</div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.3rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {tabBtn('info',     '▸ INFO')}
          {tabBtn('history',  '▸ HISTORY')}
          {tabBtn('settings', '▸ SETTINGS')}
        </div>

        {/* INFO */}
        {activeTab === 'info' && (
          <div style={panel}>
            <h2 style={sectionTitle}>▸ PLAYER INFO</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {[
                { label: 'USERNAME',       val: MOCK_USER.username },
                { label: 'EMAIL',          val: MOCK_USER.email },
                { label: 'MEMBER SINCE',   val: MOCK_USER.joined },
                { label: 'ACCOUNT STATUS', val: 'ACTIVE' },
                { label: 'FAVORITE GENRE', val: MOCK_USER.favoriteGenre },
                { label: 'TOTAL COMPARES', val: String(MOCK_USER.comparisons) },
              ].map(row => (
                <div key={row.label} style={{ background: 'rgba(124,77,255,0.06)', border: '2px solid var(--arcade-shadow)', padding: '14px 18px' }}>
                  <div style={fieldLabel}>{row.label}</div>
                  <div style={fieldValue}>{row.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link to={ROUTES.COMPARE} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', padding: '12px 24px', border: '3px solid var(--arcade-accent)', color: 'var(--arcade-accent)', textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000', display: 'inline-block' }}>
                ⚔ START COMPARING
              </Link>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div style={panel}>
            <h2 style={sectionTitle}>▸ RECENT COMPARISONS</h2>
            {MOCK_HISTORY.length === 0 ? (
              <div style={{ ...fieldValue, textAlign: 'center', padding: '40px 0', color: 'var(--arcade-muted)' }}>NO COMPARISONS YET...</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['GAME 1', 'GAME 2', 'WINNER', 'DATE'].map(h => (
                      <th key={h} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.35rem', color: 'var(--arcade-accent)', padding: '12px 14px', textAlign: 'left', borderBottom: '3px solid var(--arcade-border)', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_HISTORY.map(row => (
                    <tr key={row.id}>
                      <td style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.38rem', color: 'var(--arcade-text)',   padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)' }}>{row.game1}</td>
                      <td style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.38rem', color: 'var(--arcade-text)',   padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)' }}>{row.game2}</td>
                      <td style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.38rem', color: 'var(--arcade-accent)', padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)' }}>{row.winner}</td>
                      <td style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.35rem', color: 'var(--arcade-muted)',  padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)' }}>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div style={panel}>
            <h2 style={sectionTitle}>▸ ACCOUNT SETTINGS</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '460px' }}>
              <div>
                <div style={fieldLabel}>USERNAME</div>
                <input style={inputStyle} value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
              </div>
              <div>
                <div style={fieldLabel}>EMAIL</div>
                <input style={inputStyle} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <div style={fieldLabel}>NEW PASSWORD</div>
                <input style={inputStyle} type="password" placeholder="leave blank to keep current" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              <div>
                <div style={fieldLabel}>CONFIRM PASSWORD</div>
                <input style={inputStyle} type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="submit" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', padding: '12px 24px', background: 'var(--arcade-accent)', border: '3px solid var(--arcade-border)', color: '#fff', cursor: 'pointer', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000' }}>
                  SAVE CHANGES
                </button>
                {saved && (
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.38rem', color: '#22c55e', letterSpacing: '0.05em' }}>
                    ✓ SAVED!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserPage;
