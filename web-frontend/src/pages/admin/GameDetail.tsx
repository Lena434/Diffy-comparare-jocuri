import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameById, updateGame, deleteGame } from '../../services/gameService';
import GenreBadge from '../../components/game/GenreBadge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { ROUTES } from '../../routes/routes';
import type { Game } from '../../types';

const FONT = "'Press Start 2P', monospace";

const inputStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '0.42rem',
  padding: '8px 12px',
  background: 'var(--arcade-input-bg, rgba(124,77,255,0.08))',
  border: '3px solid var(--arcade-border)',
  boxShadow: '3px 3px 0 var(--arcade-shadow)',
  color: 'var(--arcade-text)',
  outline: 'none',
  width: '100%',
  letterSpacing: '0.03em',
};

const labelStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '0.38rem',
  color: 'var(--arcade-accent)',
  letterSpacing: '0.06em',
  display: 'block',
  marginBottom: '6px',
};

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function AdminGameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(() => getGameById(Number(id)) ?? null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Game | null>(game);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!game) {
    return (
      <div style={{ minHeight: '100vh', padding: '80px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontFamily: FONT, fontSize: '3rem', color: 'var(--arcade-shadow)', marginBottom: '20px' }}>✖</div>
          <h1 style={{ fontFamily: FONT, fontSize: '0.7rem', color: 'var(--arcade-h)', textShadow: '2px 2px 0px var(--arcade-h-shadow)', marginBottom: '16px', lineHeight: 1.8 }}>
            GAME NOT FOUND
          </h1>
          <button
            onClick={() => navigate(ROUTES.ADMIN_GAMES)}
            style={{ background: 'var(--arcade-cta)', border: '3px solid var(--arcade-text)', boxShadow: '4px 4px 0px var(--arcade-shadow)', color: '#fff', fontFamily: FONT, fontSize: '0.45rem', padding: '12px 24px', cursor: 'pointer', letterSpacing: '0.06em' }}
          >
            ← BACK TO GAMES
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!form) return;
    updateGame(form);
    setGame(form);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteGame(game.id);
    navigate(ROUTES.ADMIN_GAMES);
  };

  const setField = <K extends keyof Game>(key: K, value: Game[K]) =>
    setForm(prev => prev ? { ...prev, [key]: value } : prev);

  const setArrayField = (key: 'genre' | 'platform' | 'gameMode', value: string) =>
    setField(key, value.split(',').map(s => s.trim()).filter(Boolean) as Game[typeof key]);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Back Button */}
        <button
          onClick={() => navigate(ROUTES.ADMIN_GAMES)}
          style={{
            fontFamily: FONT,
            fontSize: '0.45rem',
            cursor: 'pointer',
            marginBottom: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            letterSpacing: '0.06em',
            background: 'transparent',
            border: '2px solid var(--arcade-shadow)',
            color: 'var(--arcade-muted)',
          }}
        >
          <span>◄</span>
          <span>BACK</span>
        </button>

        {/* Hero Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '30px', marginBottom: '50px' }}>

          {/* Image */}
          <div style={{ position: 'relative', border: '3px solid var(--arcade-border)', boxShadow: '6px 6px 0px var(--arcade-shadow)', overflow: 'hidden', aspectRatio: '1', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <img
              src={game.image}
              alt={game.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9) saturate(0.85)' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--arcade-input-bg)', border: '2px solid var(--arcade-h)', boxShadow: '3px 3px 0px var(--arcade-h-shadow)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: FONT, fontSize: '0.5rem', color: 'var(--arcade-h)' }}>
              ★ {game.rating}
            </div>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(0.8rem, 3vw, 1.4rem)', color: 'var(--arcade-h)', textShadow: '3px 3px 0px var(--arcade-h-shadow)', letterSpacing: '0.08em', margin: 0, lineHeight: 1.6 }}>
              {game.title}
            </h1>

            <p style={{ fontFamily: FONT, fontSize: '0.55rem', color: 'var(--arcade-text)', letterSpacing: '0.04em', lineHeight: 2.1, margin: 0 }}>
              {game.description}
            </p>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', padding: '20px', boxShadow: '4px 4px 0px var(--arcade-shadow)' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '10px' }}>GENRE</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {game.genre.map(genre => <GenreBadge key={genre} genre={genre} size="md" />)}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>PLATFORM</p>
                <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.platform.join(', ')}</p>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>MODE</p>
                <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.gameMode.join(', ')}</p>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>YEAR</p>
                <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.releaseYear}</p>
              </div>
              {game.price !== undefined && (
                <div>
                  <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>PRICE</p>
                  <p style={{ fontFamily: FONT, fontSize: '0.58rem', color: 'var(--arcade-h)', margin: 0 }}>{game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}</p>
                </div>
              )}
              {game.developer && (
                <div>
                  <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>DEVELOPER</p>
                  <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.developer}</p>
                </div>
              )}
              {game.publisher && (
                <div>
                  <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>PUBLISHER</p>
                  <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.publisher}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                onClick={() => { setForm(game); setEditing(true); }}
                style={{
                  flex: '1 1 200px',
                  background: 'var(--arcade-cta)',
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: 'var(--arcade-text)',
                  boxShadow: '4px 4px 0px var(--arcade-shadow)',
                  color: '#fff',
                  fontFamily: FONT,
                  fontSize: '0.45rem',
                  padding: '14px 20px',
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>✏️</span>
                <span>EDIT</span>
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                style={{
                  flex: '1 1 200px',
                  background: 'rgba(239,68,68,0.8)',
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: '#ef4444',
                  boxShadow: '4px 4px 0px var(--arcade-shadow)',
                  color: '#fff',
                  fontFamily: FONT,
                  fontSize: '0.45rem',
                  padding: '14px 20px',
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>🗑️</span>
                <span>DELETE</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {editing && form && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--arcade-panel-dark)', border: '4px solid var(--arcade-border)', boxShadow: '8px 8px 0 #000', padding: '28px', width: '100%', maxWidth: '560px', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: FONT, fontSize: '0.7rem', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '24px' }}>
              EDIT GAME
            </h2>
            <FieldRow label="TITLE">
              <input style={inputStyle} value={form.title} onChange={e => setField('title', e.target.value)} />
            </FieldRow>
            <FieldRow label="DESCRIPTION">
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '64px' }} value={form.description} onChange={e => setField('description', e.target.value)} />
            </FieldRow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <FieldRow label="RATING (0-5)">
                <input style={inputStyle} type="number" min={0} max={5} step={0.1} value={form.rating} onChange={e => setField('rating', parseFloat(e.target.value) || 0)} />
              </FieldRow>
              <FieldRow label="YEAR">
                <input style={inputStyle} type="number" value={form.releaseYear} onChange={e => setField('releaseYear', parseInt(e.target.value) || 0)} />
              </FieldRow>
              <FieldRow label="PRICE ($)">
                <input style={inputStyle} type="number" min={0} step={0.01} value={form.price ?? ''} onChange={e => setField('price', e.target.value === '' ? undefined : parseFloat(e.target.value))} />
              </FieldRow>
              <FieldRow label="DEVELOPER">
                <input style={inputStyle} value={form.developer ?? ''} onChange={e => setField('developer', e.target.value || undefined)} />
              </FieldRow>
              <FieldRow label="PUBLISHER">
                <input style={inputStyle} value={form.publisher ?? ''} onChange={e => setField('publisher', e.target.value || undefined)} />
              </FieldRow>
            </div>
            <FieldRow label="GENRE (comma separated)">
              <input style={inputStyle} value={form.genre.join(', ')} onChange={e => setArrayField('genre', e.target.value)} />
            </FieldRow>
            <FieldRow label="PLATFORM (comma separated)">
              <input style={inputStyle} value={form.platform.join(', ')} onChange={e => setArrayField('platform', e.target.value)} />
            </FieldRow>
            <FieldRow label="GAME MODE (comma separated)">
              <input style={inputStyle} value={form.gameMode.join(', ')} onChange={e => setArrayField('gameMode', e.target.value)} />
            </FieldRow>
            <FieldRow label="IMAGE URL">
              <input style={inputStyle} value={form.image} onChange={e => setField('image', e.target.value)} />
            </FieldRow>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setEditing(false)} style={{ fontFamily: FONT, fontSize: '0.45rem', padding: '10px 20px', border: '3px solid var(--arcade-muted)', background: 'transparent', color: 'var(--arcade-muted)', cursor: 'pointer', boxShadow: '3px 3px 0 var(--arcade-shadow)', letterSpacing: '0.05em' }}>CANCEL</button>
              <button onClick={handleSave} style={{ fontFamily: FONT, fontSize: '0.45rem', padding: '10px 20px', border: '3px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: 'pointer', boxShadow: '3px 3px 0 #14532d', letterSpacing: '0.05em' }}>SAVE</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete}
        title="DELETE GAME?"
        message={`PERMANENTLY DELETE "${game.title}"? THIS CANNOT BE UNDONE.`}
        confirmLabel="YES, DELETE"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}

export default AdminGameDetail;
