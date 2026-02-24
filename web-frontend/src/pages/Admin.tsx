const STATS = [
  { label: 'TOTAL USERS',      value: '84,291',    trend: '↑ 3.2% THIS WEEK', trendColor: '#22c55e' },
  { label: 'GAMES COMPARED',   value: '1,247,892', trend: '↑ 12% TODAY',      trendColor: '#22c55e' },
  { label: 'ACTIVE SESSIONS',  value: '1,423',     trend: '▲ LIVE NOW',       trendColor: 'var(--arcade-accent)' },
  { label: 'AVG COMPARE TIME', value: '2m 34s',    trend: null,               trendColor: '' },
];

const RECENT = [
  { user: 'ShadowNinja42', game1: 'Cyberpunk 2077', game2: 'CS2',         winner: 'Cyberpunk 2077', time: '2m ago'  },
  { user: 'PixelHunter99', game1: 'Elden Ring',     game2: 'Dark Souls 3', winner: 'Elden Ring',    time: '5m ago'  },
  { user: 'NeonRacer',     game1: 'Minecraft',      game2: 'Terraria',     winner: 'Minecraft',     time: '11m ago' },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>

      {/* Page heading */}
      <div style={{
        fontSize: '0.3rem',
        color: 'var(--arcade-muted)',
        letterSpacing: '0.14em',
        marginBottom: '10px',
        animation: 'pixel-blink 1.2s steps(1) infinite',
      }}>
        ★ SYSTEM STATUS: ONLINE ★
      </div>
      <h1 style={{
        fontSize: 'clamp(0.6rem, 2vw, 0.85rem)',
        color: 'var(--arcade-h)',
        textShadow: '2px 2px 0 var(--arcade-h-shadow)',
        letterSpacing: '0.08em',
        marginBottom: '32px',
      }}>
        DASHBOARD
      </h1>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '18px',
        marginBottom: '40px',
      }}>
        {STATS.map(stat => (
          <div key={stat.label} style={{
            background: 'var(--arcade-panel)',
            border: '3px solid var(--arcade-border)',
            boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
            padding: '24px 18px',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '0.32rem',
              color: 'var(--arcade-muted)',
              letterSpacing: '0.08em',
              marginBottom: '14px',
            }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: 'clamp(0.85rem, 3vw, 1.5rem)',
              color: 'var(--arcade-accent)',
              textShadow: '3px 3px 0 var(--arcade-accent-dark)',
              marginBottom: stat.trend ? '10px' : 0,
            }}>
              {stat.value}
            </div>
            {stat.trend && (
              <div style={{ fontSize: '0.28rem', color: stat.trendColor, letterSpacing: '0.06em' }}>
                {stat.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Latest comparisons */}
      <div style={{
        background: 'var(--arcade-panel)',
        border: '3px solid var(--arcade-border)',
        boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
        padding: '28px',
      }}>
        <h2 style={{
          fontSize: '0.5rem',
          color: 'var(--arcade-h)',
          textShadow: '2px 2px 0 var(--arcade-h-shadow)',
          letterSpacing: '0.08em',
          marginBottom: '24px',
        }}>
          ▸ LATEST COMPARISONS
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['USER', 'GAME 1', 'GAME 2', 'WINNER', 'TIME'].map(h => (
                <th key={h} style={{
                  padding: '12px 14px',
                  textAlign: 'left',
                  fontSize: '0.3rem',
                  color: 'var(--arcade-accent)',
                  letterSpacing: '0.06em',
                  borderBottom: '3px solid var(--arcade-border)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-text)',   borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>{row.user}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-text)',   borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>{row.game1}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-text)',   borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>{row.game2}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-accent)', borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>{row.winner}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.28rem', color: 'var(--arcade-muted)', borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
