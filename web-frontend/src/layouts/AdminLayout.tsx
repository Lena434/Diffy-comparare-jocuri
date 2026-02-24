import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../routes/routes';

const NAV_LINKS = [
  { to: ROUTES.ADMIN,          label: '▸ DASHBOARD',   end: true  },
  { to: ROUTES.ADMIN_USERS,    label: '▸ USERS',        end: false },
  { to: '/admin/games',        label: '▸ GAMES',        end: false },
  { to: '/admin/comparisons',  label: '▸ COMPARISONS',  end: false },
  { to: '/admin/settings',     label: '▸ SETTINGS',     end: false },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Log out of admin panel?')) {
      logout();
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'Press Start 2P', monospace",
      color: 'var(--arcade-text)',
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: '260px',
        flexShrink: 0,
        background: 'var(--arcade-panel-dark)',
        borderRight: '4px solid var(--arcade-border)',
        boxShadow: '4px 0 0 var(--arcade-shadow)',
        padding: '28px 14px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--arcade-accent)',
            textShadow: '4px 4px 0 var(--arcade-accent-dark), 7px 7px 0 #000',
            letterSpacing: '0.12em',
          }}>
            DIFFY
          </div>
          <div style={{
            fontSize: '0.28rem',
            color: 'var(--arcade-muted)',
            letterSpacing: '0.18em',
            marginTop: '8px',
          }}>
            ADMIN PANEL
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'block',
                padding: '14px 16px',
                border: `3px solid ${isActive ? 'var(--arcade-accent)' : 'var(--arcade-border)'}`,
                background: isActive ? 'rgba(255,122,0,0.12)' : 'transparent',
                color: isActive ? 'var(--arcade-accent)' : 'var(--arcade-muted)',
                textDecoration: 'none',
                fontSize: '0.42rem',
                letterSpacing: '0.05em',
                boxShadow: isActive
                  ? '3px 3px 0 var(--arcade-accent-dark)'
                  : '3px 3px 0 var(--arcade-shadow)',
                transition: 'all 0.08s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer info */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '32px',
          fontSize: '0.27rem',
          color: 'var(--arcade-dim)',
          letterSpacing: '0.06em',
          lineHeight: 2.2,
        }}>
          ADMIN v1.0<br />
          ONLINE: 1423 PLAYERS
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header style={{
          background: 'var(--arcade-panel-dark)',
          borderBottom: '4px solid var(--arcade-border)',
          boxShadow: '0 4px 0 var(--arcade-shadow)',
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: 'clamp(0.42rem, 1.2vw, 0.6rem)',
            color: 'var(--arcade-h)',
            textShadow: '2px 2px 0 var(--arcade-h-shadow)',
            letterSpacing: '0.1em',
            animation: 'pixel-blink 1.4s steps(1) infinite',
          }}>
            ★ ADMIN CONTROL PANEL ★
          </div>

          <button
            onClick={handleLogout}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.36rem',
              padding: '10px 18px',
              background: 'rgba(239,68,68,0.08)',
              border: '3px solid #ef4444',
              color: '#ef4444',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              boxShadow: '3px 3px 0 #7f1d1d',
              transition: 'all 0.08s',
            }}
          >
            LOGOUT
          </button>
        </header>

        {/* Page content via Outlet */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
