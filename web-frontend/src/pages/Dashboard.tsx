import { useEffect, useState } from 'react';

interface DashboardStats {
  totalUsers: number;
  totalComparisons: number;
  activeSessions: number;
  avgCompareTime: string;
  recentComparisons: Array<{
    user: string;
    game1: string;
    game2: string;
    winner: string;
    time: string;
  }>;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin-token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to load dashboard');
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 'clamp(0.5rem, 2vw, 0.8rem)',
      color: 'var(--arcade-muted)',
      letterSpacing: '0.08em',
      animation: 'pixel-blink 1.2s steps(1) infinite',
    }}>
      LOADING CONTROL PANEL...
    </div>
  );

  if (error) return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <div style={{
        fontSize: 'clamp(0.45rem, 1.5vw, 0.65rem)',
        color: '#ef4444',
        background: 'var(--arcade-panel)',
        border: '3px solid #ef4444',
        boxShadow: '5px 5px 0 var(--arcade-shadow)',
        padding: '24px 32px',
        display: 'inline-block',
        letterSpacing: '0.06em',
        lineHeight: 2,
      }}>
        ⚠ ERROR: {error}
      </div>
    </div>
  );

  const STAT_LABELS = [
    { key: 'totalUsers',       label: 'TOTAL USERS' },
    { key: 'totalComparisons', label: 'GAMES COMPARED' },
    { key: 'activeSessions',   label: 'ACTIVE SESSIONS' },
    { key: 'avgCompareTime',   label: 'AVG COMPARE TIME' },
  ] as const;

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>

      <div style={{
        fontSize: '0.3rem',
        color: 'var(--arcade-muted)',
        letterSpacing: '0.14em',
        marginBottom: '10px',
        animation: 'pixel-blink 1.2s steps(1) infinite',
      }}>
        ★ LIVE DATA ★
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
        {STAT_LABELS.map(({ key, label }) => (
          <div key={key} style={{
            background: 'var(--arcade-panel)',
            border: '3px solid var(--arcade-border)',
            boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
            padding: '24px 18px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.32rem', color: 'var(--arcade-muted)', letterSpacing: '0.08em', marginBottom: '14px' }}>
              {label}
            </div>
            <div style={{
              fontSize: 'clamp(0.85rem, 3vw, 1.5rem)',
              color: 'var(--arcade-accent)',
              textShadow: '3px 3px 0 var(--arcade-accent-dark)',
            }}>
              {typeof stats?.[key] === 'number'
                ? (stats[key] as number).toLocaleString()
                : (stats?.[key] ?? '—')}
            </div>
          </div>
        ))}
      </div>

      {/* Recent comparisons */}
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
            {stats?.recentComparisons.map((comp, idx) => (
              <tr key={idx}>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-text)',   borderBottom: '2px solid var(--arcade-shadow)' }}>{comp.user}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-text)',   borderBottom: '2px solid var(--arcade-shadow)' }}>{comp.game1}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-text)',   borderBottom: '2px solid var(--arcade-shadow)' }}>{comp.game2}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.3rem', color: 'var(--arcade-accent)', borderBottom: '2px solid var(--arcade-shadow)' }}>{comp.winner}</td>
                <td style={{ padding: '13px 14px', fontSize: '0.28rem', color: 'var(--arcade-muted)', borderBottom: '2px solid var(--arcade-shadow)' }}>{comp.time}</td>
              </tr>
            ))}
            {(!stats?.recentComparisons || stats.recentComparisons.length === 0) && (
              <tr>
                <td colSpan={5} style={{
                  textAlign: 'center',
                  padding: '50px',
                  fontSize: '0.4rem',
                  color: 'var(--arcade-muted)',
                  letterSpacing: '0.06em',
                }}>
                  NO COMPARISONS YET...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
