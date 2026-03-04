import { Link } from 'react-router-dom';
import { getUsers } from '../../services/authService';
import { getAllGames } from '../../services/gameService';
import { ROUTES } from '../../routes/routes';

const FONT = "'Press Start 2P', monospace";
const BANNED_KEY = 'diffy-banned-users';

function getBannedEmails(): string[] {
  try { return JSON.parse(localStorage.getItem(BANNED_KEY) || '[]'); } catch { return []; }
}

const RECENT_USERS = ['ShadowNinja42', 'PixelHunter99', 'NeonRacer', 'VoxelWizard', 'RetroKing'];
const RECENT_TIMES = ['2m ago', '5m ago', '11m ago', '18m ago', '31m ago'];
// Pairs as [indexA, indexB] into getAllGames()
const RECENT_PAIRS: [number, number][] = [
  [0,  2],  // Cyberpunk 2077     vs Counter-Strike 2
  [6,  11], // Elden Ring         vs Dark Souls III
  [5,  13], // Minecraft          vs Terraria
  [4,  3],  // The Witcher 3      vs Hollow Knight
  [2,  9],  // Counter-Strike 2   vs Valorant
];

function buildRecent() {
  const games = getAllGames();
  return RECENT_PAIRS.map(([a, b], i) => {
    const ga = games[a]; const gb = games[b];
    if (!ga || !gb) return null;
    const winner = ga.rating >= gb.rating ? ga.title : gb.title;
    return { user: RECENT_USERS[i], game1: ga.title, game2: gb.title, winner, time: RECENT_TIMES[i] };
  }).filter((r): r is NonNullable<typeof r> => r !== null);
}

const RECENT = buildRecent();

const cell: React.CSSProperties = { padding: '13px 14px', fontSize: '0.42rem', borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' };

const Dashboard: React.FC = () => {
  const users  = getUsers();
  const games  = getAllGames();
  const banned = getBannedEmails();
  const admins = users.filter(u => u.role === 'admin').length;
  const avgRating = (games.reduce((s, g) => s + g.rating, 0) / (games.length || 1)).toFixed(1);

  const STATS = [
    { label: 'TOTAL USERS',  value: String(users.length),  trend: `${admins} ADMIN(S)`,   trendColor: 'var(--arcade-accent)' },
    { label: 'TOTAL GAMES',  value: String(games.length),  trend: 'IN LIBRARY',           trendColor: '#22c55e' },
    { label: 'BANNED USERS', value: String(banned.length), trend: banned.length > 0 ? '⚠ ACTIVE BANS' : '✓ CLEAN', trendColor: banned.length > 0 ? '#ef4444' : '#22c55e' },
    { label: 'AVG RATING',   value: avgRating,             trend: 'OUT OF 10',            trendColor: 'var(--arcade-muted)' },
  ];

  return (
    <div style={{ fontFamily: FONT }}>

      <div style={{ fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.14em', marginBottom: '10px', animation: 'pixel-blink 1.2s steps(1) infinite' }}>
        ★ SYSTEM STATUS: ONLINE ★
      </div>
      <h1 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '32px' }}>
        DASHBOARD
      </h1>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '40px' }}>
        {STATS.map(stat => (
          <div key={stat.label} style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000', padding: '24px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.08em', marginBottom: '14px' }}>{stat.label}</div>
            <div style={{ fontSize: 'clamp(0.85rem, 3vw, 1.5rem)', color: 'var(--arcade-accent)', textShadow: '3px 3px 0 var(--arcade-accent-dark)', marginBottom: '10px' }}>{stat.value}</div>
            <div style={{ fontSize: '0.38rem', color: stat.trendColor, letterSpacing: '0.06em' }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Quick nav */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '40px' }}>
        {[
          { to: ROUTES.ADMIN_USERS,       label: '▸ MANAGE USERS', color: 'var(--arcade-accent)' },
          { to: ROUTES.ADMIN_GAMES,       label: '▸ GAME LIBRARY', color: '#22c55e' },
          { to: ROUTES.ADMIN_COMPARISONS, label: '▸ COMPARISONS',  color: '#06b6d4' },
          { to: ROUTES.ADMIN_SETTINGS,    label: '▸ SETTINGS',     color: 'var(--arcade-muted)' },
        ].map(item => (
          <Link key={item.to} to={item.to} style={{ display: 'block', padding: '14px', border: `3px solid ${item.color}`, background: 'transparent', color: item.color, textDecoration: 'none', fontSize: '0.45rem', letterSpacing: '0.05em', boxShadow: '4px 4px 0 var(--arcade-shadow)', textAlign: 'center', fontFamily: FONT }}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Recent comparisons */}
      <div style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000', padding: '28px' }}>
        <h2 style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '24px' }}>
          ▸ RECENT COMPARISONS
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
            <thead>
              <tr>
                {['USER', 'GAME 1', 'GAME 2', 'WINNER', 'TIME'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((row, i) => (
                <tr key={i}>
                  <td style={{ ...cell, color: 'var(--arcade-text)' }}>{row.user}</td>
                  <td style={{ ...cell, color: 'var(--arcade-text)' }}>{row.game1}</td>
                  <td style={{ ...cell, color: 'var(--arcade-text)' }}>{row.game2}</td>
                  <td style={{ ...cell, color: 'var(--arcade-accent)' }}>{row.winner}</td>
                  <td style={{ ...cell, color: 'var(--arcade-muted)', fontSize: '0.38rem' }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
