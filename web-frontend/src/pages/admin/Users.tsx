import { useState } from 'react';
import { getUsers, saveUsers } from '../../services/authService';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import type { User } from '../../types';

const FONT = "'Press Start 2P', monospace";
const BANNED_KEY = 'diffy-banned-users';

function getBannedEmails(): string[] {
  try { return JSON.parse(localStorage.getItem(BANNED_KEY) || '[]'); } catch { return []; }
}
function saveBannedEmails(emails: string[]) {
  localStorage.setItem(BANNED_KEY, JSON.stringify(emails));
}

type FilterRole   = 'all' | 'admin' | 'user';
type FilterStatus = 'all' | 'active' | 'banned';
type DialogState  = { type: 'ban' | 'unban' | 'delete' | 'role'; user: User } | null;

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

const roleBadgeStyle = (role: User['role']): React.CSSProperties => ({
  display: 'inline-block',
  padding: '3px 10px',
  fontFamily: FONT,
  fontSize: '0.38rem',
  letterSpacing: '0.04em',
  border: `2px solid ${role === 'admin' ? 'var(--arcade-accent)' : 'var(--arcade-border)'}`,
  color: role === 'admin' ? 'var(--arcade-accent)' : 'var(--arcade-muted)',
});

const statusBadgeStyle = (banned: boolean): React.CSSProperties => ({
  display: 'inline-block',
  padding: '3px 10px',
  fontFamily: FONT,
  fontSize: '0.38rem',
  letterSpacing: '0.04em',
  border: `2px solid ${banned ? '#ef4444' : '#22c55e'}`,
  color: banned ? '#ef4444' : '#22c55e',
});

const actionBtn = (color: string, shadow: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: '0.38rem',
  padding: '5px 12px',
  border: `2px solid ${color}`,
  background: 'transparent',
  color,
  cursor: 'pointer',
  letterSpacing: '0.04em',
  boxShadow: `2px 2px 0 ${shadow}`,
});

const UsersAdmin: React.FC = () => {
  const [users, setUsers]               = useState<User[]>(() => getUsers());
  const [banned, setBanned]             = useState<string[]>(() => getBannedEmails());
  const [search, setSearch]             = useState('');
  const [filterRole, setFilterRole]     = useState<FilterRole>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [dialog, setDialog]             = useState<DialogState>(null);

  const isBanned = (u: User) => banned.includes(u.email.toLowerCase());

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch  = u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole    = filterRole   === 'all' || u.role === filterRole;
    const matchStatus  = filterStatus === 'all' || (filterStatus === 'banned' ? isBanned(u) : !isBanned(u));
    return matchSearch && matchRole && matchStatus;
  });

  function confirmBanToggle() {
    if (!dialog) return;
    const email = dialog.user.email.toLowerCase();
    const next = dialog.type === 'ban'
      ? [...banned, email]
      : banned.filter(e => e !== email);
    saveBannedEmails(next);
    setBanned(next);
    setDialog(null);
  }

  function confirmDelete() {
    if (!dialog) return;
    const next = users.filter(u => u.email !== dialog.user.email);
    saveUsers(next);
    setUsers(next);
    const nextBanned = banned.filter(e => e !== dialog.user.email.toLowerCase());
    saveBannedEmails(nextBanned);
    setBanned(nextBanned);
    setDialog(null);
  }

  function confirmRoleToggle() {
    if (!dialog) return;
    const next = users.map(u =>
      u.email === dialog.user.email
        ? { ...u, role: (u.role === 'admin' ? 'user' : 'admin') as User['role'] }
        : u
    );
    saveUsers(next);
    setUsers(next);
    setDialog(null);
  }

  return (
    <div style={{ fontFamily: FONT }}>

      <h1 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '28px' }}>
        USER MANAGEMENT
      </h1>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="SEARCH USERNAME OR EMAIL..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputBase, flex: 1, minWidth: '200px', padding: '10px 14px', fontSize: '0.42rem' }}
        />
        <select value={filterRole} onChange={e => setFilterRole(e.target.value as FilterRole)}
          style={{ ...inputBase, padding: '10px 14px', fontSize: '0.42rem', cursor: 'pointer' }}>
          <option value="all">ALL ROLES</option>
          <option value="admin">ADMIN</option>
          <option value="user">USER</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as FilterStatus)}
          style={{ ...inputBase, padding: '10px 14px', fontSize: '0.42rem', cursor: 'pointer' }}>
          <option value="all">ALL STATUS</option>
          <option value="active">ACTIVE</option>
          <option value="banned">BANNED</option>
        </select>
        <span style={{ fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {filtered.length} / {users.length} USERS
        </span>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr>
              {['#', 'USERNAME', 'EMAIL', 'ROLE', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '60px', fontSize: '0.5rem', color: 'var(--arcade-muted)', letterSpacing: '0.06em' }}>
                  NO USERS FOUND...
                </td>
              </tr>
            ) : (
              filtered.map((user, i) => {
                const banned_ = isBanned(user);
                return (
                  <tr key={user.email}>
                    <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>{i + 1}</td>
                    <td style={{ ...cell, fontSize: '0.42rem', color: 'var(--arcade-text)' }}>{user.username}</td>
                    <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>{user.email}</td>
                    <td style={{ ...cell }}>
                      <span style={roleBadgeStyle(user.role)}>{user.role.toUpperCase()}</span>
                    </td>
                    <td style={{ ...cell }}>
                      <span style={statusBadgeStyle(banned_)}>{banned_ ? 'BANNED' : 'ACTIVE'}</span>
                    </td>
                    <td style={{ ...cell }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setDialog({ type: banned_ ? 'unban' : 'ban', user })}
                          style={banned_ ? actionBtn('#22c55e', '#14532d') : actionBtn('#ef4444', '#7f1d1d')}
                        >
                          {banned_ ? 'UNBAN' : 'BAN'}
                        </button>
                        <button
                          onClick={() => setDialog({ type: 'role', user })}
                          style={actionBtn('var(--arcade-accent)', 'var(--arcade-accent-dark)')}
                        >
                          {user.role === 'admin' ? 'DEMOTE' : 'PROMOTE'}
                        </button>
                        <button
                          onClick={() => setDialog({ type: 'delete', user })}
                          style={actionBtn('#ef4444', '#7f1d1d')}
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm dialogs */}
      <ConfirmDialog
        open={dialog?.type === 'ban'}
        title="BAN USER?"
        message={`BAN ${dialog?.user.username.toUpperCase() ?? ''}? THEY WON'T BE ABLE TO LOG IN.`}
        confirmLabel="YES, BAN"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={confirmBanToggle}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog?.type === 'unban'}
        title="UNBAN USER?"
        message={`RESTORE ACCESS FOR ${dialog?.user.username.toUpperCase() ?? ''}?`}
        confirmLabel="YES, UNBAN"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={confirmBanToggle}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog?.type === 'delete'}
        title="DELETE USER?"
        message={`PERMANENTLY DELETE ${dialog?.user.username.toUpperCase() ?? ''}? THIS CANNOT BE UNDONE.`}
        confirmLabel="YES, DELETE"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={confirmDelete}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog?.type === 'role'}
        title={dialog?.user.role === 'admin' ? 'DEMOTE TO USER?' : 'PROMOTE TO ADMIN?'}
        message={`CHANGE ROLE FOR ${dialog?.user.username.toUpperCase() ?? ''}?`}
        confirmLabel="YES, CHANGE"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={confirmRoleToggle}
        onCancel={() => setDialog(null)}
      />
    </div>
  );
};

export default UsersAdmin;
