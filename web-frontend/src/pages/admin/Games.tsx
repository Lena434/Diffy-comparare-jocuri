import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameService } from '../../services/gameService';
import { useAxios } from '../../axios/context';
import { API_ROUTES } from '../../axios/apiRoutes';
import { ROUTES } from '../../routes/routes';
import PixelLoader from '../../components/ui/PixelLoader';
import type { Game } from '../../types';

const FONT = "'Press Start 2P', monospace";

const inputBase: React.CSSProperties = {
  fontFamily: FONT,
  background: 'var(--arcade-input-bg, rgba(124,77,255,0.08))',
  border: '3px solid var(--arcade-border)',
  boxShadow: '3px 3px 0 var(--arcade-shadow)',
  color: 'var(--arcade-text)',
  outline: 'none',
  letterSpacing: '0.03em',
  lineHeight: '1',
};

const inputStyle: React.CSSProperties = {
  ...inputBase,
  width: '100%',
  padding: '10px 12px',
  fontSize: '0.38rem',
  lineHeight: '2',
  boxSizing: 'border-box' as const,
};

const cell: React.CSSProperties = {
  padding: '12px 14px',
  borderBottom: '2px solid var(--arcade-shadow)',
  letterSpacing: '0.02em',
};

const fieldLabel: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '0.35rem',
  color: 'var(--arcade-muted)',
  letterSpacing: '0.06em',
  marginBottom: '6px',
};

type SortKey = 'title' | 'averageRating' | 'releaseYear' | 'price';

interface GenreMeta { id: number; name: string; }
interface PlatformMeta { id: number; name: string; }
interface GameModeMeta { id: number; name: string; }

interface CreateForm {
  title: string;
  description: string;
  developer: string;
  publisher: string;
  releaseYear: string;
  price: string;
  genres: string;
  platforms: string;
  gameModes: string;
  imageUrls: string[];
}

const emptyForm: CreateForm = {
  title: '', description: '', developer: '', publisher: '',
  releaseYear: '', price: '', genres: '', platforms: '', gameModes: '', imageUrls: [''],
};

function idsFromNames(input: string, meta: { id: number; name: string }[]): number[] {
  return input.split(',')
    .map(s => s.trim().toLowerCase())
    .map(name => meta.find(m => m.name.toLowerCase() === name)?.id)
    .filter((id): id is number => id !== undefined);
}

const AdminGames: React.FC = () => {
  const { getAll } = useGameService();
  const { api } = useAxios();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = () =>
    getAll().then(games => { setAllGames(games); setLoading(false); }).catch(() => setLoading(false));

  useEffect(() => { fetchGames(); }, [getAll]);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    allGames.forEach((g) => g.genres.forEach((genre) => genres.add(genre)));
    return Array.from(genres).sort();
  }, [allGames]);

  const allPlatforms = useMemo(() => {
    const platforms = new Set<string>();
    allGames.forEach((g) => g.platforms.forEach((p) => platforms.add(p)));
    return Array.from(platforms).sort();
  }, [allGames]);

  const [search, setSearch]                 = useState('');
  const [filterGenre, setFilterGenre]       = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [sortBy, setSortBy]                 = useState<SortKey>('title');
  const [sortAsc, setSortAsc]               = useState(true);

  const [showCreate, setShowCreate]         = useState(false);
  const [createForm, setCreateForm]         = useState<CreateForm>(emptyForm);
  const [createError, setCreateError]       = useState<string | null>(null);
  const [creating, setCreating]             = useState(false);
  const [genresMeta, setGenresMeta]         = useState<GenreMeta[]>([]);
  const [platformsMeta, setPlatformsMeta]   = useState<PlatformMeta[]>([]);
  const [gameModesMeta, setGameModesMeta]   = useState<GameModeMeta[]>([]);

  useEffect(() => {
    if (!showCreate) return;
    api.get<GenreMeta[]>(API_ROUTES.GENRES.GET_ALL).then(setGenresMeta).catch(() => {});
    api.get<PlatformMeta[]>(API_ROUTES.PLATFORMS.GET_ALL).then(setPlatformsMeta).catch(() => {});
    api.get<GameModeMeta[]>(API_ROUTES.GAME_MODES.GET_ALL).then(setGameModesMeta).catch(() => {});
  }, [showCreate]);

  function openCreate() {
    setCreateForm(emptyForm);
    setCreateError(null);
    setShowCreate(true);
  }

  function closeCreate() {
    setShowCreate(false);
    setCreateError(null);
  }

  async function handleCreate() {
    if (!createForm.title.trim()) { setCreateError('TITLE IS REQUIRED.'); return; }
    const year = parseInt(createForm.releaseYear);
    if (!createForm.releaseYear || isNaN(year) || year < 1970 || year > 2100) {
      setCreateError('INVALID RELEASE YEAR (1970-2100).');
      return;
    }
    const price = parseFloat(createForm.price);
    if (createForm.price === '' || isNaN(price) || price < 0) {
      setCreateError('INVALID PRICE.');
      return;
    }

    setCreating(true);
    try {
      await api.post(API_ROUTES.GAMES.CREATE, {
        title: createForm.title.trim(),
        description: createForm.description.trim(),
        developer: createForm.developer.trim(),
        publisher: createForm.publisher.trim(),
        releaseYear: year,
        price,
        imgs: createForm.imageUrls.map(u => u.trim()).filter(Boolean).map(url => ({ url })),
        genreIds: idsFromNames(createForm.genres, genresMeta),
        platformIds: idsFromNames(createForm.platforms, platformsMeta),
        gameModeIds: idsFromNames(createForm.gameModes, gameModesMeta),
      });
      await fetchGames();
      closeCreate();
    } catch {
      setCreateError('FAILED TO CREATE GAME.');
    } finally {
      setCreating(false);
    }
  }

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(a => !a);
    else { setSortBy(key); setSortAsc(true); }
  };

  const filtered: Game[] = allGames
    .filter(g => {
      const q = search.toLowerCase();
      const matchSearch   = g.title.toLowerCase().includes(q) || (g.developer ?? '').toLowerCase().includes(q);
      const matchGenre    = filterGenre    === 'all' || g.genres.includes(filterGenre);
      const matchPlatform = filterPlatform === 'all' || g.platforms.includes(filterPlatform);
      return matchSearch && matchGenre && matchPlatform;
    })
    .sort((a, b) => {
      let va: string | number, vb: string | number;
      if (sortBy === 'title')              { va = a.title;            vb = b.title; }
      else if (sortBy === 'averageRating') { va = a.averageRating;    vb = b.averageRating; }
      else if (sortBy === 'price')         { va = a.price ?? 0;       vb = b.price ?? 0; }
      else                                 { va = a.releaseYear;       vb = b.releaseYear; }
      if (va < vb) return sortAsc ? -1 :  1;
      if (va > vb) return sortAsc ?  1 : -1;
      return 0;
    });

  const navigate = useNavigate();
  const sortArrow = (key: SortKey) => sortBy === key ? (sortAsc ? ' ▲' : ' ▼') : '';
  const adminDetailPath = (id: number) => ROUTES.ADMIN_GAME_DETAIL.replace(':id', String(id));

  if (loading) return <PixelLoader message="LOADING GAMES..." />;

  return (
    <div style={{ fontFamily: FONT }}>

      <h1 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '28px' }}>
        GAME LIBRARY
      </h1>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="SEARCH TITLE OR DEVELOPER..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputBase, flex: 1, minWidth: '200px', padding: '10px 14px', fontSize: '0.38rem' }}
        />
        <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)}
          style={{ ...inputBase, padding: '10px 14px', fontSize: '0.42rem', cursor: 'pointer' }}>
          <option value="all">ALL GENRES</option>
          {allGenres.map(g => <option key={g} value={g}>{g.toUpperCase()}</option>)}
        </select>
        <select value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)}
          style={{ ...inputBase, padding: '10px 14px', fontSize: '0.42rem', cursor: 'pointer' }}>
          <option value="all">ALL PLATFORMS</option>
          {allPlatforms.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
        </select>
        <span style={{ fontSize: '0.4rem', color: 'var(--arcade-muted)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {filtered.length} / {allGames.length} GAMES
        </span>
        <button
          onClick={openCreate}
          style={{ fontFamily: FONT, fontSize: '0.42rem', padding: '10px 16px', border: '2px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '2px 2px 0 #14532d', whiteSpace: 'nowrap' }}
        >
          + CREATE GAME
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--arcade-panel)', border: '3px solid var(--arcade-border)', boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)', cursor: 'pointer' }} onClick={() => toggleSort('title')}>
                TITLE{sortArrow('title')}
              </th>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>GENRE</th>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>PLATFORM</th>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)', cursor: 'pointer' }} onClick={() => toggleSort('averageRating')}>
                RATING{sortArrow('averageRating')}
              </th>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)', cursor: 'pointer' }} onClick={() => toggleSort('releaseYear')}>
                YEAR{sortArrow('releaseYear')}
              </th>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)', cursor: 'pointer' }} onClick={() => toggleSort('price')}>
                PRICE{sortArrow('price')}
              </th>
              <th style={{ padding: '14px 14px', textAlign: 'left', fontSize: '0.42rem', color: 'var(--arcade-accent)', letterSpacing: '0.06em', borderBottom: '3px solid var(--arcade-border)' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '60px', fontSize: '0.5rem', color: 'var(--arcade-muted)', letterSpacing: '0.06em' }}>
                  NO GAMES FOUND...
                </td>
              </tr>
            ) : (
              filtered.map(game => (
                <tr key={game.id}>
                  <td style={{ ...cell, fontSize: '0.42rem', color: 'var(--arcade-text)', maxWidth: '200px' }}>{game.title}</td>
                  <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>
                    {game.genres.slice(0, 2).join(', ')}
                    {game.genres.length > 2 && <span style={{ color: 'var(--arcade-accent)' }}> +{game.genres.length - 2}</span>}
                  </td>
                  <td style={{ ...cell, fontSize: '0.38rem', color: 'var(--arcade-muted)' }}>
                    {game.platforms.slice(0, 2).join(', ')}
                    {game.platforms.length > 2 && <span style={{ color: 'var(--arcade-accent)' }}> +{game.platforms.length - 2}</span>}
                  </td>
                  <td style={{ ...cell, fontSize: '0.42rem', color: game.averageRating >= 8 ? '#22c55e' : game.averageRating >= 6 ? 'var(--arcade-accent)' : '#ef4444' }}>
                    {game.averageRating.toFixed(1)}
                  </td>
                  <td style={{ ...cell, fontSize: '0.4rem', color: 'var(--arcade-muted)' }}>{game.releaseYear}</td>
                  <td style={{ ...cell, fontSize: '0.4rem', color: 'var(--arcade-text)' }}>{game.price != null ? `$${game.price}` : '—'}</td>
                  <td style={{ ...cell }}>
                    <button
                      onClick={() => navigate(adminDetailPath(game.id))}
                      style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '5px 12px', border: '2px solid var(--arcade-border)', background: 'transparent', color: 'var(--arcade-text)', cursor: 'pointer', boxShadow: '2px 2px 0 var(--arcade-shadow)' }}
                    >
                      VIEW →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Game Modal */}
      {showCreate && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' }}
          onClick={closeCreate}
        >
          <div
            style={{ background: 'var(--arcade-bg)', border: '3px solid var(--arcade-border)', boxShadow: '8px 8px 0 var(--arcade-shadow), 12px 12px 0 #000', padding: '32px', width: '100%', maxWidth: '560px', maxHeight: '85vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)', color: 'var(--arcade-h)', textShadow: '2px 2px 0 var(--arcade-h-shadow)', letterSpacing: '0.08em', marginBottom: '28px' }}>
              CREATE GAME
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <div style={fieldLabel}>TITLE *</div>
                <input type="text" value={createForm.title} onChange={e => setCreateForm({ ...createForm, title: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <div style={fieldLabel}>DESCRIPTION</div>
                <textarea value={createForm.description} onChange={e => setCreateForm({ ...createForm, description: e.target.value })}
                  style={{ ...inputStyle, height: 'auto', minHeight: '72px', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={fieldLabel}>RELEASE YEAR *</div>
                  <input type="number" value={createForm.releaseYear} onChange={e => setCreateForm({ ...createForm, releaseYear: e.target.value })} style={inputStyle} placeholder="2024" min={1970} max={2100} step={1} />
                </div>
                <div>
                  <div style={fieldLabel}>PRICE *</div>
                  <input type="number" value={createForm.price} onChange={e => setCreateForm({ ...createForm, price: e.target.value })} style={inputStyle} placeholder="0" min="0" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={fieldLabel}>DEVELOPER</div>
                  <input type="text" value={createForm.developer} onChange={e => setCreateForm({ ...createForm, developer: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <div style={fieldLabel}>PUBLISHER</div>
                  <input type="text" value={createForm.publisher} onChange={e => setCreateForm({ ...createForm, publisher: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div>
                <div style={fieldLabel}>GENRES (comma-separated: RPG, Action)</div>
                <input type="text" value={createForm.genres} onChange={e => setCreateForm({ ...createForm, genres: e.target.value })} style={inputStyle} placeholder="RPG, Action" />
              </div>

              <div>
                <div style={fieldLabel}>PLATFORMS (comma-separated: PC, PlayStation)</div>
                <input type="text" value={createForm.platforms} onChange={e => setCreateForm({ ...createForm, platforms: e.target.value })} style={inputStyle} placeholder="PC, PlayStation" />
              </div>

              <div>
                <div style={fieldLabel}>GAME MODES (comma-separated: Singleplayer, Multiplayer)</div>
                <input type="text" value={createForm.gameModes} onChange={e => setCreateForm({ ...createForm, gameModes: e.target.value })} style={inputStyle} placeholder="Singleplayer" />
              </div>

              <div>
                <div style={fieldLabel}>IMAGE URLS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {createForm.imageUrls.map((url, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={url}
                        onChange={e => {
                          const updated = [...createForm.imageUrls];
                          updated[i] = e.target.value;
                          setCreateForm({ ...createForm, imageUrls: updated });
                        }}
                        style={{ ...inputStyle, flex: 1 }}
                        placeholder="https://..."
                      />
                      {createForm.imageUrls.length > 1 && (
                        <button
                          onClick={() => setCreateForm({ ...createForm, imageUrls: createForm.imageUrls.filter((_, j) => j !== i) })}
                          style={{ fontFamily: FONT, fontSize: '0.42rem', padding: '6px 10px', border: '2px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
                        >×</button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setCreateForm({ ...createForm, imageUrls: [...createForm.imageUrls, ''] })}
                    style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '7px 12px', border: '2px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: 'pointer', alignSelf: 'flex-start', letterSpacing: '0.04em' }}
                  >+ ADD IMAGE</button>
                </div>
              </div>

              {createError && (
                <div style={{ fontFamily: FONT, fontSize: '0.38rem', color: '#ef4444', letterSpacing: '0.04em' }}>
                  ⚠ {createError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button
                  onClick={closeCreate}
                  style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '10px 20px', border: '2px solid var(--arcade-muted)', background: 'transparent', color: 'var(--arcade-muted)', cursor: 'pointer', letterSpacing: '0.04em' }}
                >
                  CANCEL
                </button>
                <button
                  onClick={handleCreate}
                  disabled={creating}
                  style={{ fontFamily: FONT, fontSize: '0.38rem', padding: '10px 20px', border: '2px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: creating ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', boxShadow: '2px 2px 0 #14532d', opacity: creating ? 0.6 : 1 }}
                >
                  {creating ? 'SAVING...' : 'CREATE GAME'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGames;