import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAxios } from '../../axios/context';
import { API_ROUTES } from '../../axios/apiRoutes';
import PixelLoader from '../../components/ui/PixelLoader';
import type { ActivityLog } from '../../types';

const FONT = "'Press Start 2P', monospace";

const ACTIVITY_LABELS: Record<string, { label: string; color: string }> = {
  Login:             { label: '🔑 LOGIN',              color: '#22c55e' },
  FavoriteAdded:     { label: '⭐ FAVORITE ADDED',     color: '#f59e0b' },
  FavoriteRemoved:   { label: '✕ FAVORITE REMOVED',   color: '#ef4444' },
  ComparisonSaved:   { label: '⚔ COMPARISON SAVED',   color: '#a78bfa' },
  ComparisonRemoved: { label: '✕ COMPARISON REMOVED', color: '#ef4444' },
  RatingGiven:       { label: '★ RATING GIVEN',       color: '#06b6d4' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
}

export default function AdminUserActivity() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const username: string = state?.username ?? `#${id}`;
  const { api } = useAxios();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get<ActivityLog[]>(API_ROUTES.ACTIVITY_LOG.GET_BY_USER(Number(id)))
      .then(setLogs)
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [id, api]);

  if (loading) return <PixelLoader message="LOADING ACTIVITY..." />;

  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '8px 14px', border: '2px solid var(--arcade-border)', background: 'transparent', color: 'var(--arcade-muted)', cursor: 'pointer', letterSpacing: '0.04em' }}
        >
          ◄ BACK
        </button>
        <h1 style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', margin: 0 }}>
          ACTIVITY LOG — {username.toUpperCase()}
        </h1>
      </div>

      {logs.length === 0 ? (
        <div style={{ padding: '48px', background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.5rem', color: 'var(--arcade-muted)', letterSpacing: '0.06em' }}>NO ACTIVITY YET</p>
        </div>
      ) : (
        <div style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
            <thead>
              <tr>
                {['#', 'ACTION', 'DETAILS', 'DATE'].map(h => (
                  <th key={h} style={{ padding: '14px', textAlign: 'left', fontSize: '0.38rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const meta = ACTIVITY_LABELS[log.activityType] ?? { label: log.activityType, color: 'var(--arcade-text)' };
                return (
                  <tr key={log.id}>
                    <td style={{ padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)', fontSize: '0.35rem', color: 'var(--arcade-muted)' }}>{i + 1}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)' }}>
                      <span style={{ fontFamily: FONT, fontSize: '0.38rem', color: meta.color, letterSpacing: '0.04em' }}>{meta.label}</span>
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)', fontSize: '0.35rem', color: 'var(--arcade-muted)', letterSpacing: '0.03em' }}>
                      {log.details ?? '—'}
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '2px solid var(--arcade-shadow)', fontSize: '0.35rem', color: 'var(--arcade-muted)', whiteSpace: 'nowrap' }}>
                      {formatDate(log.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}