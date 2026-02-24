import { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  joined: string;
  status: 'active' | 'banned';
}

const MOCK_USERS: User[] = [
  { id: 1, username: 'ShadowNinja42',  email: 'shadow@mail.com',  role: 'user',  joined: '2024-01-15', status: 'active' },
  { id: 2, username: 'PixelHunter99', email: 'pixel@mail.com',   role: 'user',  joined: '2024-03-08', status: 'active' },
  { id: 3, username: 'GameMaster7',   email: 'gm7@mail.com',     role: 'admin', joined: '2023-11-02', status: 'active' },
  { id: 4, username: 'RetroKing',     email: 'retro@mail.com',   role: 'user',  joined: '2024-05-21', status: 'banned' },
  { id: 5, username: 'NeonRacer',     email: 'neon@mail.com',    role: 'user',  joined: '2024-07-30', status: 'active' },
  { id: 6, username: 'VoxelWizard',   email: 'voxel@mail.com',   role: 'user',  joined: '2024-08-14', status: 'active' },
];

const inputBase: React.CSSProperties = {
  fontFamily: "'Press Start 2P', monospace",
  background: 'var(--arcade-input-bg)',
  border: '3px solid var(--arcade-border)',
  boxShadow: '3px 3px 0 var(--arcade-shadow)',
  color: 'var(--arcade-text)',
  outline: 'none',
  letterSpacing: '0.03em',
};

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'banned'>('all');

  const filtered = users.filter(u => {
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole   === 'all' || u.role   === filterRole;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleBan = (id: number) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
      )
    );
  };

  const roleBadge = (role: User['role']) => ({
    display: 'inline-block' as const,
    padding: '3px 10px',
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '0.28rem',
    letterSpacing: '0.04em',
    border: `2px solid ${role === 'admin' ? 'var(--arcade-accent)' : 'var(--arcade-border)'}`,
    color: role === 'admin' ? 'var(--arcade-accent)' : 'var(--arcade-muted)',
  });

  const statusBadge = (status: User['status']) => ({
    display: 'inline-block' as const,
    padding: '3px 10px',
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '0.28rem',
    letterSpacing: '0.04em',
    border: `2px solid ${status === 'active' ? '#22c55e' : '#ef4444'}`,
    color: status === 'active' ? '#22c55e' : '#ef4444',
  });

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>

      {/* Page heading */}
      <h1 style={{
        fontSize: 'clamp(0.6rem, 2vw, 0.85rem)',
        color: 'var(--arcade-h)',
        textShadow: '2px 2px 0 var(--arcade-h-shadow)',
        letterSpacing: '0.08em',
        marginBottom: '28px',
      }}>
        USER MANAGEMENT
      </h1>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <input
          type="text"
          placeholder="SEARCH USERNAME OR EMAIL..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            ...inputBase,
            flex: 1,
            minWidth: '200px',
            padding: '10px 14px',
            fontSize: '0.35rem',
          }}
        />

        <select
          value={filterRole}
          onChange={e => setFilterRole(e.target.value as typeof filterRole)}
          style={{
            ...inputBase,
            padding: '10px 14px',
            fontSize: '0.35rem',
            cursor: 'pointer',
          }}
        >
          <option value="all">ALL ROLES</option>
          <option value="admin">ADMIN</option>
          <option value="user">USER</option>
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
          style={{
            ...inputBase,
            padding: '10px 14px',
            fontSize: '0.35rem',
            cursor: 'pointer',
          }}
        >
          <option value="all">ALL STATUS</option>
          <option value="active">ACTIVE</option>
          <option value="banned">BANNED</option>
        </select>

        <span style={{
          fontSize: '0.32rem',
          color: 'var(--arcade-muted)',
          letterSpacing: '0.05em',
          marginLeft: 'auto',
          whiteSpace: 'nowrap',
        }}>
          {filtered.length} / {users.length} USERS
        </span>
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--arcade-panel)',
        border: '3px solid var(--arcade-border)',
        boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['#', 'USERNAME', 'EMAIL', 'ROLE', 'JOINED', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={{
                  padding: '14px 16px',
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{
                  textAlign: 'center',
                  padding: '60px',
                  fontSize: '0.4rem',
                  color: 'var(--arcade-muted)',
                  letterSpacing: '0.06em',
                }}>
                  NO USERS FOUND...
                </td>
              </tr>
            ) : (
              filtered.map(user => (
                <tr key={user.id}>
                  <td style={{ padding: '13px 16px', fontSize: '0.3rem', color: 'var(--arcade-muted)', borderBottom: '2px solid var(--arcade-shadow)' }}>
                    {user.id}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '0.32rem', color: 'var(--arcade-text)', borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>
                    {user.username}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '0.28rem', color: 'var(--arcade-muted)', borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '2px solid var(--arcade-shadow)' }}>
                    <span style={roleBadge(user.role)}>{user.role.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '0.28rem', color: 'var(--arcade-muted)', borderBottom: '2px solid var(--arcade-shadow)', letterSpacing: '0.02em' }}>
                    {user.joined}
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '2px solid var(--arcade-shadow)' }}>
                    <span style={statusBadge(user.status)}>{user.status.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '2px solid var(--arcade-shadow)' }}>
                    <button
                      onClick={() => toggleBan(user.id)}
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '0.28rem',
                        padding: '6px 14px',
                        border: `2px solid ${user.status === 'active' ? '#ef4444' : '#22c55e'}`,
                        background: 'transparent',
                        color: user.status === 'active' ? '#ef4444' : '#22c55e',
                        cursor: 'pointer',
                        letterSpacing: '0.04em',
                        boxShadow: `2px 2px 0 ${user.status === 'active' ? '#7f1d1d' : '#14532d'}`,
                        transition: 'all 0.08s',
                      }}
                    >
                      {user.status === 'active' ? 'BAN' : 'UNBAN'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdmin;
