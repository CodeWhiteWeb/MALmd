import type { VercelRequest, VercelResponse } from '@vercel/node';

import { fetchRecentlyWatchedAnime, fetchRecentlyReadManga } from '../src/fetcher/fetch-data';
import { renderSVG } from '../src/renderer/render-svg';
import { themes } from '../src/renderer/theme/awesome-card';

import type { CardType } from '../src/renderer/render-svg';

interface ResponseQuery {
  type: CardType;
  theme: keyof typeof themes;
  username: string;
  border: boolean;
}

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const { type, theme, username, border, manga, bg, count, hide_pfp, hide_covers, title, font_size, rounded } = req.query as any;

  if (!username) {
    res.status(400).send('Missing username query parameter');
    return;
  }

  // Parse showBg from query (?bg=true or ?bg=false)
  let showBg = true;
  if (typeof bg === 'string') {
    showBg = bg === 'true';
  }

  // Default count: 3 for horizontal, 5 for vertical
  let entryCount = 5;
  if ((type === 'horizontal' || type === 'Horizontal') && (count === undefined || count === null)) {
    entryCount = 3;
  }
  if (typeof count === 'string' && !isNaN(Number(count))) {
    entryCount = Math.max(1, Math.min(10, Number(count)));
  }

  // Parse booleans
  const hidePfp = hide_pfp === 'true' || hide_pfp === true;
  const hideCovers = hide_covers === 'true' || hide_covers === true;
  const cardTitle = typeof title === 'string' ? title : undefined;
  const fontSize = typeof font_size === 'string' && !isNaN(Number(font_size)) ? Number(font_size) : undefined;
  const isRounded = rounded === undefined ? true : (rounded === 'true' || rounded === true);

  try {
    if (manga === 'true' || manga === true) {
      const data = await fetchRecentlyReadManga(username, entryCount);

      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', `public, max-age=600`);
      res.send(
        renderSVG(
          {
            username: data.username,
            anime: data.manga.map(m => ({
              title: m.title,
              episode: m.chapter,
              url: m.url,
              watched_at: m.read_at,
              small_cover: m.small_cover
            })),
            userPfp: hidePfp ? undefined : data.userPfp,
            lastAnimeCover: showBg ? data.lastMangaCover : undefined,
            isManga: true,
            showBg,
            hideCovers,
            cardTitle,
            fontSize,
            isRounded
          },
          (type as CardType) || 'vertical',
          (theme as keyof typeof themes) || 'default',
          border === 'true' || border === true
        )
      );
      return;
    }

    const data = await fetchRecentlyWatchedAnime(username, entryCount);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `public, max-age=600`);
    res.send(
      renderSVG(
        {
          username: data.username,
          anime: data.anime,
          userPfp: hidePfp ? undefined : data.userPfp,
          lastAnimeCover: showBg ? data.lastAnimeCover : undefined,
          isManga: false,
          showBg,
          hideCovers,
          cardTitle,
          fontSize,
          isRounded
        },
        (type as CardType) || 'vertical',
        (theme as keyof typeof themes) || 'default',
        border === 'true' || border === true
      )
    );
  } catch (e) {
    // Log the error for debugging
    // eslint-disable-next-line no-console
    console.error('API Error:', e);

    // Always return a valid SVG, even on error
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(`
      <svg width="400" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#fff3f3"/>
        <text x="20" y="35" font-size="18" fill="#d00">Failed to fetch anime data</text>
      </svg>
    `);
  }
};

export default handler;
