import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameService } from '../../services/gameService';
import type { GenreMeta, PlatformMeta, GameModeMeta } from '../../services/gameService';
import GenreBadge from '../../components/game/GenreBadge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import PixelLoader from '../../components/ui/PixelLoader';
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

function idsFromNames(names: string[], list: { id: number; name: string }[]): number[] {
  return names
    .map((name) => list.find((x) => x.name.toLowerCase() === name.toLowerCase())?.id)
    .filter((id): id is number => id !== undefined);
}

function AdminGameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, getGenres, getPlatforms, getGameModes, update, remove } = useGameService();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [genres, setGenres] = useState<GenreMeta[]>([]);
  const [platforms, setPlatforms] = useState<PlatformMeta[]>([]);
  const [gameModes, setGameModes] = useState<GameModeMeta[]>([]);

  // Edit form mirrors Game but stores genres/platforms/gameModes as comma-separated strings
  const [form, setForm] = useState({
    title: '',
    description: '',
    developer: '',
    publisher: '',
    releaseYear: 0,
    price: 0,
    imageUrls: [''] as string[],
    genresStr: '',
    platformsStr: '',
    gameModesStr: '',
  });

  useEffect(() => {
    const numId = Number(id);
    if (!numId) { setNotFound(true); setLoading(false); return; }

    Promise.all([getById(numId), getGenres(), getPlatforms(), getGameModes()])
      .then(([g, gList, pList, gmList]) => {
        setGame(g);
        setGenres(gList);
        setPlatforms(pList);
        setGameModes(gmList);
        setForm({
          title: g.title,
          description: g.description,
          developer: g.developer ?? '',
          publisher: g.publisher ?? '',
          releaseYear: g.releaseYear,
          price: g.price ?? 0,
          imageUrls: g.imgs && g.imgs.length > 0 ? g.imgs.map(i => i.url) : [''],
          genresStr: g.genres.join(', '),
          platformsStr: g.platforms.join(', '),
          gameModesStr: g.gameModes.join(', '),
        });
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id, getById, getGenres, getPlatforms, getGameModes]);

  if (loading) return <PixelLoader message="LOADING GAME..." />;

  if (notFound || !game) {
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

  async function handleSave() {
    setSaving(true);
    const genreNames = form.genresStr.split(',').map(s => s.trim()).filter(Boolean);
    const platformNames = form.platformsStr.split(',').map(s => s.trim()).filter(Boolean);
    const gameModeNames = form.gameModesStr.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      title: form.title,
      description: form.description,
      developer: form.developer,
      publisher: form.publisher,
      releaseYear: form.releaseYear,
      price: form.price,
      imgs: form.imageUrls.map(u => u.trim()).filter(Boolean).map(url => ({ url })),
      genreIds: idsFromNames(genreNames, genres),
      platformIds: idsFromNames(platformNames, platforms),
      gameModeIds: idsFromNames(gameModeNames, gameModes),
    };

    try {
      await update(game!.id, payload);
      setGame({
        ...game!,
        title: form.title,
        description: form.description,
        developer: form.developer,
        publisher: form.publisher,
        releaseYear: form.releaseYear,
        price: form.price,
        imgs: form.imageUrls.map(u => u.trim()).filter(Boolean).map(url => ({ id: 0, url, gameId: game!.id })),
        genres: genreNames,
        platforms: platformNames,
        gameModes: gameModeNames,
      });
      setEditing(false);
    } catch {
      // stay in edit mode on error
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    await remove(game!.id);
    navigate(ROUTES.ADMIN_GAMES);
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <button
          onClick={() => navigate(ROUTES.ADMIN_GAMES)}
          style={{ fontFamily: FONT, fontSize: '0.45rem', cursor: 'pointer', marginBottom: '30px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 18px', letterSpacing: '0.06em', background: 'transparent', border: '2px solid var(--arcade-shadow)', color: 'var(--arcade-muted)' }}
        >
          <span>◄</span><span>BACK</span>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '30px', marginBottom: '50px' }}>
          {/* Image / Carousel */}
          {(() => {
            const imgs = game.imgs ?? [];
            const total = imgs.length;
            const prev = () => setCurrentImg(i => (i - 1 + total) % total);
            const next = () => setCurrentImg(i => (i + 1) % total);
            const arrowBtn: React.CSSProperties = { fontFamily: FONT, fontSize: '0.7rem', background: 'var(--arcade-panel-dark)', border: '2px solid var(--arcade-border)', color: 'var(--arcade-text)', padding: '8px 12px', cursor: 'pointer', lineHeight: 1, flexShrink: 0 };
            return (
              <div style={{ maxWidth: '560px', margin: '0 auto', width: '100%', alignSelf: 'start' }}>
                {/* Arrow row + image */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {total > 1 && <button onClick={prev} style={arrowBtn}>◄</button>}
                  <div style={{ flex: 1, border: '3px solid var(--arcade-border)', boxShadow: '6px 6px 0px var(--arcade-shadow)', overflow: 'hidden', position: 'relative' }}>
                    <img src={imgs[currentImg]?.url ?? ''} alt={game.title} style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.9) saturate(0.85)' }} />
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--arcade-input-bg)', border: '2px solid var(--arcade-h)', boxShadow: '3px 3px 0px var(--arcade-h-shadow)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: FONT, fontSize: '0.5rem', color: 'var(--arcade-h)' }}>
                      ★ {game.averageRating.toFixed(1)}
                    </div>
                  </div>
                  {total > 1 && <button onClick={next} style={arrowBtn}>►</button>}
                </div>
                {/* Dots below border */}
                {total > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingTop: '10px' }}>
                    {imgs.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        style={{ width: '10px', height: '10px', padding: 0, border: '2px solid var(--arcade-h)', background: i === currentImg ? 'var(--arcade-h)' : 'transparent', cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(0.8rem, 3vw, 1.4rem)', color: 'var(--arcade-h)', textShadow: '3px 3px 0px var(--arcade-h-shadow)', letterSpacing: '0.08em', margin: 0, lineHeight: 1.6 }}>
              {game.title}
            </h1>
            <p style={{ fontFamily: FONT, fontSize: '0.55rem', color: 'var(--arcade-text)', letterSpacing: '0.04em', lineHeight: 2.1, margin: 0 }}>
              {game.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', padding: '20px', boxShadow: '4px 4px 0px var(--arcade-shadow)' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '10px' }}>GENRE</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {game.genres.map(genre => <GenreBadge key={genre} genre={genre} size="md" />)}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>PLATFORM</p>
                <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.platforms.join(', ')}</p>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: '0.42rem', color: 'var(--arcade-muted)', marginBottom: '8px' }}>MODE</p>
                <p style={{ fontFamily: FONT, fontSize: '0.45rem', color: 'var(--arcade-text)', margin: 0 }}>{game.gameModes.join(', ')}</p>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                onClick={() => setEditing(true)}
                style={{ flex: '1 1 200px', background: 'var(--arcade-cta)', borderWidth: '3px', borderStyle: 'solid', borderColor: 'var(--arcade-text)', boxShadow: '4px 4px 0px var(--arcade-shadow)', color: '#fff', fontFamily: FONT, fontSize: '0.45rem', padding: '14px 20px', cursor: 'pointer', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>✏️</span><span>EDIT</span>
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                style={{ flex: '1 1 200px', background: 'rgba(239,68,68,0.8)', borderWidth: '3px', borderStyle: 'solid', borderColor: '#ef4444', boxShadow: '4px 4px 0px var(--arcade-shadow)', color: '#fff', fontFamily: FONT, fontSize: '0.45rem', padding: '14px 20px', cursor: 'pointer', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>🗑️</span><span>DELETE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--arcade-panel-dark)', border: '4px solid var(--arcade-border)', boxShadow: '8px 8px 0 #000', padding: '28px', width: '100%', maxWidth: '560px', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: FONT, fontSize: '0.7rem', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '24px' }}>
              EDIT GAME
            </h2>
            <FieldRow label="TITLE">
              <input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </FieldRow>
            <FieldRow label="DESCRIPTION">
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '64px' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </FieldRow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <FieldRow label="YEAR">
                <input style={inputStyle} type="number" value={form.releaseYear} onChange={e => setForm(f => ({ ...f, releaseYear: parseInt(e.target.value) || 0 }))} />
              </FieldRow>
              <FieldRow label="PRICE ($)">
                <input style={inputStyle} type="number" min={0} step={0.01} value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} />
              </FieldRow>
              <FieldRow label="DEVELOPER">
                <input style={inputStyle} value={form.developer} onChange={e => setForm(f => ({ ...f, developer: e.target.value }))} />
              </FieldRow>
              <FieldRow label="PUBLISHER">
                <input style={inputStyle} value={form.publisher} onChange={e => setForm(f => ({ ...f, publisher: e.target.value }))} />
              </FieldRow>
            </div>
            <FieldRow label="GENRE (comma separated)">
              <input style={inputStyle} value={form.genresStr} onChange={e => setForm(f => ({ ...f, genresStr: e.target.value }))} />
            </FieldRow>
            <FieldRow label="PLATFORM (comma separated)">
              <input style={inputStyle} value={form.platformsStr} onChange={e => setForm(f => ({ ...f, platformsStr: e.target.value }))} />
            </FieldRow>
            <FieldRow label="GAME MODE (comma separated)">
              <input style={inputStyle} value={form.gameModesStr} onChange={e => setForm(f => ({ ...f, gameModesStr: e.target.value }))} />
            </FieldRow>
            <FieldRow label="IMAGE URLS">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {form.imageUrls.map((url, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      value={url}
                      placeholder="https://..."
                      onChange={e => {
                        const updated = [...form.imageUrls];
                        updated[i] = e.target.value;
                        setForm(f => ({ ...f, imageUrls: updated }));
                      }}
                    />
                    {form.imageUrls.length > 1 && (
                      <button
                        onClick={() => setForm(f => ({ ...f, imageUrls: f.imageUrls.filter((_, j) => j !== i) }))}
                        style={{ fontFamily: FONT, fontSize: '0.42rem', padding: '6px 10px', border: '2px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
                      >×</button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setForm(f => ({ ...f, imageUrls: [...f.imageUrls, ''] }))}
                  style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '7px 12px', border: '2px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: 'pointer', alignSelf: 'flex-start', letterSpacing: '0.04em' }}
                >+ ADD IMAGE</button>
              </div>
            </FieldRow>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setEditing(false)} style={{ fontFamily: FONT, fontSize: '0.45rem', padding: '10px 20px', border: '3px solid var(--arcade-muted)', background: 'transparent', color: 'var(--arcade-muted)', cursor: 'pointer', boxShadow: '3px 3px 0 var(--arcade-shadow)', letterSpacing: '0.05em' }}>CANCEL</button>
              <button onClick={handleSave} disabled={saving} style={{ fontFamily: FONT, fontSize: '0.45rem', padding: '10px 20px', border: '3px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: saving ? 'wait' : 'pointer', boxShadow: '3px 3px 0 #14532d', letterSpacing: '0.05em' }}>
                {saving ? 'SAVING...' : 'SAVE'}
              </button>
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
