import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameService } from '../../services/gameService';
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
};

const cell: React.CSSProperties = {
  padding: '12px 14px',
  borderBottom: '2px solid var(--arcade-shadow)',
  letterSpacing: '0.02em',
};

type SortKey = 'title' | 'averageRating' | 'releaseYear' | 'price';

const AdminGames: React.FC = () => {
  const { getAll } = useGameService();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll()
      .then((games) => { setAllGames(games); setLoading(false); })
      .catch(() => setLoading(false));
  }, [getAll]);

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
      if (sortBy === 'title')           { va = a.title;            vb = b.title; }
      else if (sortBy === 'averageRating') { va = a.averageRating; vb = b.averageRating; }
      else if (sortBy === 'price')      { va = a.price ?? 0;       vb = b.price ?? 0; }
      else                              { va = a.releaseYear;       vb = b.releaseYear; }
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
          style={{ ...inputBase, flex: 1, minWidth: '200px', padding: '10px 14px', fontSize: '0.42rem' }}
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
    </div>
  );
};

export default AdminGames;
