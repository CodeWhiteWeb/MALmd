import axios from 'axios';

export interface RecentAnime {
  title: string;
  episode: number;
  url: string;
  watched_at: string;
  small_cover?: string;
}

export interface RecentlyWatchedData {
  username: string;
  anime: RecentAnime[];
  userPfp?: string;
  lastAnimeCover?: string;
}

export interface RecentManga {
  title: string;
  chapter: number;
  url: string;
  read_at: string;
  small_cover?: string;
}

export interface RecentlyReadMangaData {
  username: string;
  manga: RecentManga[];
  userPfp?: string;
  lastMangaCover?: string;
}

async function fetchUserPfp(username: string) {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/users/${encodeURIComponent(username)}`
    );
    return res.data?.data?.images?.jpg?.image_url;
  } catch {
    return undefined;
  }
}

async function fetchPictures(
  type: 'anime' | 'manga',
  mal_id: number
): Promise<{ cover?: string; small?: string }> {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/${type}/${mal_id}/pictures`
    );
    const d = res.data?.data?.[0];
    return {
      cover:
        d?.webp?.image_url || d?.jpg?.large_image_url || d?.jpg?.image_url,
      small:
        d?.webp?.small_image_url ||
        d?.webp?.image_url ||
        d?.jpg?.small_image_url ||
        d?.jpg?.image_url
    };
  } catch {
    return {};
  }
}

export async function fetchRecentlyWatchedAnime(
  username: string,
  count = 5
): Promise<RecentlyWatchedData> {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/users/${encodeURIComponent(username)}/history/anime`
    );
    const data = res.data?.data;
    const userPfp = await fetchUserPfp(username);
    if (!Array.isArray(data) || !data.length)
      return { username, anime: [], userPfp };

    const anime = data.slice(0, count).map((e: any) => ({
      title: e.entry.name,
      episode: e.increment,
      url: e.entry.url,
      watched_at: e.date,
      mal_id: e.entry.mal_id
    }));

    let lastAnimeCover, lastAnimeSmallCover;
    if (anime[0]?.mal_id) {
      for (let i = 0; i < 3; i++) {
        const pics = await fetchPictures('anime', anime[0].mal_id);
        lastAnimeCover = pics.cover;
        lastAnimeSmallCover = pics.small;
        if (lastAnimeCover) break;
        await new Promise(r => setTimeout(r, 300));
      }
    }

    const animeWithCovers = [];
    for (const a of anime) {
      let small_cover = a.mal_id === anime[0]?.mal_id ? lastAnimeSmallCover : undefined;
      if (!small_cover && a.mal_id) {
        const pics = await fetchPictures('anime', a.mal_id);
        small_cover = pics.small;
        await new Promise(r => setTimeout(r, 200));
      }
      animeWithCovers.push({ ...a, small_cover });
    }
    if (!lastAnimeCover)
      lastAnimeCover = animeWithCovers.find(a => a.small_cover)?.small_cover;
    const animeList = animeWithCovers.map(({ mal_id, ...rest }) => rest);
    return { username, anime: animeList, userPfp, lastAnimeCover };
  } catch (e) {
    console.error('fetchRecentlyWatchedAnime error:', e);
    return { username, anime: [] };
  }
}

export async function fetchRecentlyReadManga(
  username: string,
  count = 5
): Promise<RecentlyReadMangaData> {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/users/${encodeURIComponent(username)}/history/manga`
    );
    const data = res.data?.data;
    const userPfp = await fetchUserPfp(username);
    if (!Array.isArray(data) || !data.length)
      return { username, manga: [], userPfp };

    const manga = data.slice(0, count).map((e: any) => ({
      title: e.entry.name,
      chapter: e.increment,
      url: e.entry.url,
      read_at: e.date,
      mal_id: e.entry.mal_id
    }));

    let lastMangaCover, lastMangaSmallCover;
    if (manga[0]?.mal_id) {
      for (let i = 0; i < 3; i++) {
        const pics = await fetchPictures('manga', manga[0].mal_id);
        lastMangaCover = pics.cover;
        lastMangaSmallCover = pics.small;
        if (lastMangaCover) break;
        await new Promise(r => setTimeout(r, 300));
      }
    }

    const mangaWithCovers = [];
    for (const m of manga) {
      let small_cover = m.mal_id === manga[0]?.mal_id ? lastMangaSmallCover : undefined;
      if (!small_cover && m.mal_id) {
        const pics = await fetchPictures('manga', m.mal_id);
        small_cover = pics.small;
        await new Promise(r => setTimeout(r, 200));
      }
      mangaWithCovers.push({ ...m, small_cover });
    }
    if (!lastMangaCover)
      lastMangaCover = mangaWithCovers.find(m => m.small_cover)?.small_cover;
    const mangaList = mangaWithCovers.map(({ mal_id, ...rest }) => rest);
    return { username, manga: mangaList, userPfp, lastMangaCover };
  } catch (e) {
    console.error('fetchRecentlyReadManga error:', e);
    return { username, manga: [] };
  }
}
