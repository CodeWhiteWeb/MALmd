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

// Helper to fetch and convert image to base64 data URI
async function fetchImageAsDataURI(url?: string, base64?: boolean): Promise<string | undefined> {
  if (!url) return undefined;
  // Only convert to base64 if base64 is true (default: true)
  if (base64 === false) return url;
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const contentType = res.headers['content-type'] || 'image/jpeg';
    const base64str = Buffer.from(res.data, 'binary').toString('base64');
    return `data:${contentType};base64,${base64str}`;
  } catch {
    return undefined;
  }
}

async function fetchUserPfp(username: string, base64?: boolean) {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/users/${encodeURIComponent(username)}`
    );
    const url = res.data?.data?.images?.jpg?.image_url;
    // Only convert to base64 if base64 is true (default: true)
    return base64 === false ? url : await fetchImageAsDataURI(url, true);
  } catch {
    return undefined;
  }
}

// Try to fetch cover image from AniList by title
async function fetchAniListImage(title: string, isManga: boolean = false): Promise<string | undefined> {
  const query = `
    query ($search: String, $type: MediaType) {
      Media(search: $search, type: $type) {
        coverImage {
          extraLarge
          large
          medium
        }
      }
    }
  `;
  try {
    const res = await axios.post('https://graphql.anilist.co', {
      query,
      variables: {
        search: title,
        type: isManga ? 'MANGA' : 'ANIME'
      }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return (
      res.data?.data?.Media?.coverImage?.extraLarge ||
      res.data?.data?.Media?.coverImage?.large ||
      res.data?.data?.Media?.coverImage?.medium
    );
  } catch {
    return undefined;
  }
}

async function fetchPictures(
  type: 'anime' | 'manga',
  mal_id: number,
  title?: string,
  base64?: boolean
): Promise<{ cover?: string; small?: string }> {
  // Try AniList first
  let anilistImg: string | undefined = undefined;
  if (title) {
    anilistImg = await fetchAniListImage(title, type === 'manga');
    if (anilistImg) {
      // Only convert to base64 if base64 is true (default: true)
      if (base64 === false) {
        return { cover: anilistImg, small: anilistImg };
      } else {
        const imgData = await fetchImageAsDataURI(anilistImg, true);
        return { cover: imgData, small: imgData };
      }
    }
  }
  // Fallback to Jikan/MAL
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/${type}/${mal_id}/pictures`
    );
    const d = res.data?.data?.[0];
    const coverUrl =
      d?.webp?.image_url || d?.jpg?.large_image_url || d?.jpg?.image_url;
    const smallUrl =
      d?.webp?.small_image_url ||
      d?.webp?.image_url ||
      d?.jpg?.small_image_url ||
      d?.jpg?.image_url;
    if (base64 === false) {
      return { cover: coverUrl, small: smallUrl };
    } else {
      const [cover, small] = await Promise.all([
        fetchImageAsDataURI(coverUrl, true),
        fetchImageAsDataURI(smallUrl, true)
      ]);
      return { cover, small };
    }
  } catch {
    return {};
  }
}

export async function fetchRecentlyWatchedAnime(
  username: string,
  count = 5,
  base64?: boolean
): Promise<RecentlyWatchedData> {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/users/${encodeURIComponent(username)}/history/anime`
    );
    const data = res.data?.data;
    const userPfp = await fetchUserPfp(username, base64);
    if (!Array.isArray(data) || !data.length)
      return { username, anime: [], userPfp };

    const anime = data.slice(0, count).map((e: any) => ({
      title: e.entry.name,
      episode: e.increment,
      url: e.entry.url,
      watched_at: e.date,
      mal_id: e.entry.mal_id
    }));

    let lastAnimeCover: string | undefined = undefined;
    if (anime[0]?.mal_id) {
      for (let i = 0; i < 3; i++) {
        const pics = await fetchPictures('anime', anime[0].mal_id, anime[0].title, base64);
        lastAnimeCover = pics.cover;
        if (lastAnimeCover) break;
      }
    }

    const animeList = anime.map(({ mal_id, ...rest }) => rest);
    return { username, anime: animeList, userPfp, lastAnimeCover };
  } catch (e) {
    console.error('fetchRecentlyWatchedAnime error:', e);
    return { username, anime: [] };
  }
}

export async function fetchRecentlyReadManga(
  username: string,
  count = 5,
  base64?: boolean
): Promise<RecentlyReadMangaData> {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/users/${encodeURIComponent(username)}/history/manga`
    );
    const data = res.data?.data;
    const userPfp = await fetchUserPfp(username, base64);
    if (!Array.isArray(data) || !data.length)
      return { username, manga: [], userPfp };

    const manga = data.slice(0, count).map((e: any) => ({
      title: e.entry.name,
      chapter: e.increment,
      url: e.entry.url,
      read_at: e.date,
      mal_id: e.entry.mal_id
    }));

    let lastMangaCover: string | undefined = undefined;
    if (manga[0]?.mal_id) {
      for (let i = 0; i < 3; i++) {
        const pics = await fetchPictures('manga', manga[0].mal_id, manga[0].title, base64);
        lastMangaCover = pics.cover;
        if (lastMangaCover) break;
      }
    }

    const mangaList = manga.map(({ mal_id, ...rest }) => rest);
    return { username, manga: mangaList, userPfp, lastMangaCover };
  } catch (e) {
    console.error('fetchRecentlyReadManga error:', e);
    return { username, manga: [] };
  }
}
