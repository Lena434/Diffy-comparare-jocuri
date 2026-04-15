import { useState } from 'react';

const FONT = "'Press Start 2P', monospace";

interface ComparisonLog {
  id: number;
  user: string;
  game1: string;
  game2: string;
  winner: string;
  date: string;
  time: string;
}

// Static mock comparison log
const COMPARISONS: ComparisonLog[] = [
  { id:  1, user: 'ShadowNinja42', game1: 'Cyberpunk 2077',       game2: 'Counter-Strike 2',    winner: 'Cyberpunk 2077',       date: '2026-03-04', time: '14:22' },
  { id:  2, user: 'PixelHunter99', game1: 'Elden Ring',            game2: 'Dark Souls III',       winner: 'Elden Ring',            date: '2026-03-04', time: '13:50' },
  { id:  3, user: 'NeonRacer',     game1: 'Minecraft',              game2: 'Terraria',             winner: 'Minecraft',             date: '2026-03-04', time: '12:11' },
  { id:  4, user: 'VoxelWizard',   game1: 'The Witcher 3',          game2: 'Hollow Knight',        winner: 'The Witcher 3',         date: '2026-03-04', time: '11:03' },
  { id:  5, user: 'RetroKing',     game1: 'Counter-Strike 2',       game2: 'Valorant',             winner: 'Counter-Strike 2',     date: '2026-03-03', time: '22:47' },
  { id:  6, user: 'GameMaster7',   game1: 'Red Dead Redemption 2',  game2: 'Cyberpunk 2077',       winner: 'Red Dead Redemption 2', date: '2026-03-03', time: '20:30' },
  { id:  7, user: 'PixelHunter99', game1: 'Hollow Knight',          game2: 'Celeste',              winner: 'Hollow Knight',         date: '2026-03-03', time: '18:55' },
  { id:  8, user: 'NeonRacer',     game1: 'Hades',                  game2: 'Stardew Valley',       winner: 'Hades',                 date: '2026-03-03', time: '17:20' },
  { id:  9, user: 'VoxelWizard',   game1: 'Apex Legends',           game2: 'Overwatch 2',          winner: 'Apex Legends',          date: '2026-03-02', time: '16:05' },
  { id: 10, user: 'ShadowNinja42', game1: 'Stardew Valley',         game2: 'Minecraft',            winner: 'Minecraft',             date: '2026-03-02', time: '14:40' },
  { id: 11, user: 'RetroKing',     game1: 'Hades',                  game2: 'Portal 2',             winner: 'Hades',                 date: '2026-03-02', time: '12:22' },
  { id: 12, user: 'ShadowNinja42', game1: 'Elden Ring',             game2: 'Hollow Knight',        winner: 'Elden Ring',            date: '2026-03-01', time: '21:10' },
];

const TODAY_DATE = '2026-03-04';
const TODAY = COMPARISONS.filter(c => c.date === TODAY_DATE);

const inputBase: React.CSSProperties = {
  fontFamily: FONT,
  background: 'var(--arcade-input-bg, rgba(124,77,255,0.08))',
  border: '3px solid var(--arcade-border)',
  boxShadow: '3px 3px 0 var(--arcade-shadow)',
  color: 'var(--arcade-text)',
  outline: 'none',
  letterSpacing: '0.03em',
};

const cell: React.CSSProperties = {
  padding: '12px 14px',
  borderBottom: '2px solid var(--arcade-shadow)',
  letterSpacing: '0.02em',
};

const AdminComparisons: React.FC = () => {
  const [search, setSearch]         = useState('');
  const [filterDate, setFilterDate] = useState('all');

  const uniqueDates = Array.from(new Set(COMPARISONS.map(c => c.date))).sort().reverse();

  const filtered = COMPARISONS.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.user.toLowerCase().includes(q) || c.game1.toLowerCase().includes(q) || c.game2.toLowerCase().includes(q);
    const matchDate   = filterDate === 'all' || c.date === filterDate;
    return matchSearch && matchDate;
  });

  return (
    <div style={{ fontFamily: FONT }}>

      <h1 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '28px' }}>
        COMPARISON LOG
      </h1>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'TOTAL', value: String(COMPARISONS.length) },
          { label: 'TODAY', value: String(TODAY.length) },
          { label: 'USERS', value: String(new Set(COMPARISONS.map(c => c.user)).size) },
          { label: 'GAMES', value: String(new Set(COMPARISONS.flatMap(c => [c.game1, c.game2])).size) },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '4px 4px 0 var(--arcade-shadow)', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.08em', marginBottom: '10px' }}>{s.label}</div>
            <div style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-accent)', textShadow: '2px 2px 0 var(--arcade-accent-dark)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="SEARCH USER OR GAME..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputBase, flex: 1, minWidth: '200px', padding: '10px 14px', fontSize: '0.42rem' }}
        />
        <select value={filterDate} onChange={e => setFilterDate(e.target.value)}
          style={{ ...inputBase, padding: '10px 14px', fontSize: '0.42rem', cursor: 'pointer' }}>
          <option value="all">ALL DATES</option>
          {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <span style={{ fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {filtered.length} / {COMPARISONS.length} ENTRIES
        </span>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px' }}>
          <thead>
            <tr>
              {['#', 'USER', 'GAME 1', 'GAME 2', 'WINNER', 'DATE', 'TIME'].map(h => (
                <th key={h} style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '60px', fontSize: '0.5rem', color: 'var(--arcade-muted)', letterSpacing: '0.06em' }}>
                  NO COMPARISONS FOUND...
                </td>
              </tr>
            ) : (
              filtered.map(row => (
                <tr key={row.id}>
                  <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>{row.id}</td>
                  <td style={{ ...cell, fontSize: '0.42rem', color: 'var(--arcade-text)' }}>{row.user}</td>
                  <td style={{ ...cell, fontSize: '0.4rem',  color: 'var(--arcade-text)' }}>{row.game1}</td>
                  <td style={{ ...cell, fontSize: '0.4rem',  color: 'var(--arcade-text)' }}>{row.game2}</td>
                  <td style={{ ...cell, fontSize: '0.4rem',  color: 'var(--arcade-accent)' }}>{row.winner}</td>
                  <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>{row.date}</td>
                  <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>{row.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComparisons;
