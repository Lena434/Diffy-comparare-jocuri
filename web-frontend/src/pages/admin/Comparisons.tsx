import { useState } from 'react';
import { getAllGames } from '../../services/gameService';

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

const USERS = ['ShadowNinja42', 'PixelHunter99', 'NeonRacer', 'VoxelWizard', 'RetroKing', 'GameMaster7', 'PixelHunter99', 'NeonRacer', 'VoxelWizard', 'ShadowNinja42', 'RetroKing', 'ShadowNinja42'];
const DATES = ['2026-03-04', '2026-03-04', '2026-03-04', '2026-03-04', '2026-03-03', '2026-03-03', '2026-03-03', '2026-03-03', '2026-03-02', '2026-03-02', '2026-03-02', '2026-03-01'];
const TIMES = ['14:22', '13:50', '12:11', '11:03', '22:47', '20:30', '18:55', '17:20', '16:05', '14:40', '12:22', '21:10'];

// Pairs as [indexA, indexB] into getAllGames()
const PAIRS: [number, number][] = [
  [0,  2],  // Cyberpunk 2077      vs Counter-Strike 2
  [6,  11], // Elden Ring          vs Dark Souls III
  [5,  13], // Minecraft           vs Terraria
  [4,  3],  // The Witcher 3       vs Hollow Knight
  [2,  9],  // Counter-Strike 2    vs Valorant
  [8,  0],  // Red Dead Redemption 2 vs Cyberpunk 2077
  [3,  14], // Hollow Knight       vs Celeste
  [16, 1],  // Hades               vs Stardew Valley
  [17, 12], // Apex Legends        vs Overwatch 2
  [1,  5],  // Stardew Valley      vs Minecraft
  [16, 18], // Hades               vs Portal 2
  [6,  3],  // Elden Ring          vs Hollow Knight
];

function buildComparisons(): ComparisonLog[] {
  const games = getAllGames();
  return PAIRS.map(([a, b], i) => {
    const ga = games[a];
    const gb = games[b];
    if (!ga || !gb) return null;
    const winner = ga.rating >= gb.rating ? ga.title : gb.title;
    return { id: i + 1, user: USERS[i], game1: ga.title, game2: gb.title, winner, date: DATES[i], time: TIMES[i] };
  }).filter((c): c is ComparisonLog => c !== null);
}

const COMPARISONS = buildComparisons();
const TODAY = COMPARISONS.filter(c => c.date === DATES[0]);

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
