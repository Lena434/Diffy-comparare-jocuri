import { useState, useEffect } from 'react';
import { useAxios } from '../../axios/context';
import { API_ROUTES } from '../../axios/apiRoutes';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

const FONT = "'Press Start 2P', monospace";

const inputStyle: React.CSSProperties = {
  fontFamily: FONT,
  background: 'var(--arcade-input-bg, rgba(124,77,255,0.08))',
  border: '3px solid var(--arcade-border)',
  boxShadow: '3px 3px 0 var(--arcade-shadow)',
  color: 'var(--arcade-text)',
  outline: 'none',
  letterSpacing: '0.03em',
  padding: '10px 14px',
  fontSize: '0.38rem',
  lineHeight: '2',
  boxSizing: 'border-box' as const,
};

interface Meta { id: number; name: string; }

interface SectionProps {
  title: string;
  items: Meta[];
  onAdd: (name: string) => Promise<void>;
  onDelete: (id: number) => void;
}

function CategorySection({ title, items, onAdd, onDelete }: SectionProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Meta | null>(null);

  async function handleAdd() {
    const name = input.trim();
    if (!name) { setError('NAME IS REQUIRED.'); return; }
    if (items.some(i => i.name.toLowerCase() === name.toLowerCase())) {
      setError('ALREADY EXISTS.');
      return;
    }
    setAdding(true);
    try {
      await onAdd(name);
      setInput('');
      setError(null);
    } catch {
      setError('FAILED TO ADD.');
    } finally {
      setAdding(false);
    }
  }

  return (
    <div style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000', padding: '28px' }}>
      <h2 style={{ fontFamily: FONT, fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '24px' }}>
        ▸ {title}
      </h2>

      {/* Add form */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={`ADD NEW ${title.slice(0, -1).toUpperCase()}...`}
          value={input}
          onChange={e => { setInput(e.target.value); setError(null); }}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          style={{ ...inputStyle, flex: 1, minWidth: '180px' }}
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          style={{ fontFamily: FONT, fontSize: '0.42rem', padding: '10px 16px', border: '2px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: adding ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', boxShadow: '2px 2px 0 #14532d', opacity: adding ? 0.6 : 1, whiteSpace: 'nowrap' as const }}
        >
          + ADD
        </button>
      </div>

      {error && (
        <div style={{ fontFamily: FONT, fontSize: '0.38rem', color: '#ef4444', letterSpacing: '0.04em', marginBottom: '14px' }}>
          ⚠ {error}
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <div style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em', padding: '20px 0' }}>
          NO {title.toUpperCase()} YET...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '2px solid var(--arcade-border)', background: 'var(--arcade-panel-dark)' }}>
              <span style={{ fontFamily: FONT, fontSize: '0.42rem', letterSpacing: '0.04em' }}>{item.name}</span>
              <button
                onClick={() => setDeleteTarget(item)}
                style={{ fontFamily: FONT, fontSize: '0.35rem', padding: '4px 10px', border: '2px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '2px 2px 0 #7f1d1d' }}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title={`DELETE ${title.slice(0, -1).toUpperCase()}?`}
        message={`PERMANENTLY DELETE "${deleteTarget?.name.toUpperCase()}"? THIS CANNOT BE UNDONE.`}
        confirmLabel="YES, DELETE"
        cancelLabel="CANCEL"
        confirmColor="yellow"
        onConfirm={() => { if (deleteTarget) { onDelete(deleteTarget.id); setDeleteTarget(null); } }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

const AdminCategories: React.FC = () => {
  const { api } = useAxios();
  const [genres, setGenres]       = useState<Meta[]>([]);
  const [platforms, setPlatforms] = useState<Meta[]>([]);
  const [gameModes, setGameModes] = useState<Meta[]>([]);

  useEffect(() => {
    api.get<Meta[]>(API_ROUTES.GENRES.GET_ALL).then(setGenres).catch(() => {});
    api.get<Meta[]>(API_ROUTES.PLATFORMS.GET_ALL).then(setPlatforms).catch(() => {});
    api.get<Meta[]>(API_ROUTES.GAME_MODES.GET_ALL).then(setGameModes).catch(() => {});
  }, [api]);

  async function addGenre(name: string) {
    await api.post(API_ROUTES.GENRES.CREATE, { name });
    const updated = await api.get<Meta[]>(API_ROUTES.GENRES.GET_ALL);
    setGenres(updated);
  }

  async function deleteGenre(id: number) {
    await api.delete(API_ROUTES.GENRES.DELETE(id));
    setGenres(prev => prev.filter(g => g.id !== id));
  }

  async function addPlatform(name: string) {
    await api.post(API_ROUTES.PLATFORMS.CREATE, { name });
    const updated = await api.get<Meta[]>(API_ROUTES.PLATFORMS.GET_ALL);
    setPlatforms(updated);
  }

  async function deletePlatform(id: number) {
    await api.delete(API_ROUTES.PLATFORMS.DELETE(id));
    setPlatforms(prev => prev.filter(p => p.id !== id));
  }

  async function addGameMode(name: string) {
    await api.post(API_ROUTES.GAME_MODES.CREATE, { name });
    const updated = await api.get<Meta[]>(API_ROUTES.GAME_MODES.GET_ALL);
    setGameModes(updated);
  }

  async function deleteGameMode(id: number) {
    await api.delete(API_ROUTES.GAME_MODES.DELETE(id));
    setGameModes(prev => prev.filter(m => m.id !== id));
  }

  return (
    <div style={{ fontFamily: FONT }}>
      <h1 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '32px' }}>
        CATEGORIES
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <CategorySection title="Genres" items={genres} onAdd={addGenre} onDelete={deleteGenre} />
        <CategorySection title="Platforms" items={platforms} onAdd={addPlatform} onDelete={deletePlatform} />
        <CategorySection title="Game Modes" items={gameModes} onAdd={addGameMode} onDelete={deleteGameMode} />
      </div>
    </div>
  );
};

export default AdminCategories;