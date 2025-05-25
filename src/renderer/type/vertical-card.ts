import { poppinsFontSVG } from '../constants';
import { Theme } from '../theme/awesome-card';

interface Props {
  username: string;
  anime: { title: string; episode: number; url: string; watched_at: string; small_cover?: string }[];
  color: Theme;
  border: boolean;
  userPfp?: string;
  lastAnimeCover?: string;
  isManga?: boolean;
  showBg?: boolean; // new flag
  cardTitle?: string;
  fontSize?: number;
  isRounded?: boolean;
}

export const renderVertical = ({
  username,
  anime,
  color,
  border,
  userPfp,
  lastAnimeCover,
  isManga,
  showBg = true,
  cardTitle,
  fontSize,
  isRounded = true,
}: Props) => {
  const itemCount = anime.length || 1;
  const baseHeight = 130; // header + padding
  const perItemHeight = 48; // per anime/manga entry
  const totalHeight = baseHeight + perItemHeight * itemCount;

  const animeList = anime.length
    ? `<ul style="list-style:none;padding:0;margin:0;">
        ${anime
          .map((a, idx) => {
            return `<li style="margin-bottom:8px;display:flex;align-items:center;gap:10px;">
                <div style="flex:1;">
                  <a href="${a.url}" target="_blank" style="color:#${color.primaryText};text-decoration:none;font-weight:bold;font-size:${fontSize || 14}px;vertical-align:middle;">${a.title}</a>
                  <span style="color:#${color.secondaryText};font-size:13px;"> (Ep. ${a.episode})</span>
                  <div style="color:#${color.accent};font-size:11px;">${new Date(a.watched_at).toLocaleString()}</div>
                </div>
              </li>`;
          })
          .join('')}
      </ul>`
    : `<div style="color:#${color.secondaryText};">No recent anime found.</div>`;

  // Use background color for overlay tint
  const overlayColor = `#${color.background}E6`;
  const useBgImage = showBg && lastAnimeCover;
  const isBase64 = lastAnimeCover?.startsWith('data:');
  const bgImageSVG = useBgImage && !isBase64
    ? `<image href="${lastAnimeCover}" x="0" y="0" width="340" height="${totalHeight}" preserveAspectRatio="xMidYMid slice" crossOrigin="anonymous" />`
    : '';

  const renderedSVG = `
  <svg width="340" height="${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="rounded-corners">
        <rect width="340" height="${totalHeight}" rx="${isRounded ? 16 : 0}" ry="${isRounded ? 16 : 0}" />
      </clipPath>
    </defs>
    ${bgImageSVG}
    <foreignObject width="100%" height="100%" ${isRounded ? 'clip-path="url(#rounded-corners)"' : ''}>
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${poppinsFontSVG}
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          .container {
            width: 340px;
            height: ${totalHeight}px;
            font-family: Poppins, Arial, Helvetica, sans-serif;
            padding: 0;
            border: ${border ? "3px solid #"+color.accent : "1px solid rgba(0, 0, 0, 0.2)"};
            border-radius: ${isRounded ? '16px' : '0'};
            overflow: hidden;
            position: relative;
            background: ${useBgImage ? `url('${lastAnimeCover}') center/cover no-repeat` : `#${color.background}`};
          }
          .overlay {
            position: absolute;
            inset: 0;
            background: ${useBgImage ? overlayColor : `#${color.background}`};
            z-index: 0;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 18px 18px 8px 18px;
            position: relative;
            z-index: 1;
          }
          .pfp {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 2px solid #${color.accent};
            background: #fff;
            object-fit: cover;
          }
          .username {
            font-size: ${fontSize ? fontSize + 6 : 22}px;
            font-weight: bold;
            color: #${color.primaryText};
            text-align: left;
            line-height: 1.2;
            text-shadow: 0 2px 8px #0005;
          }
          .anime-list {
            margin: 0 18px;
            margin-top: 10px;
            padding: 16px 18px 18px 18px;
            border-radius: 12px;
            background: #${color.background}E6;
            box-shadow: 0 2px 12px #0002;
            z-index: 1;
            position: relative;
          }
          ul { margin-top: 0; }
          li { margin-bottom: 10px; }
        </style>
        <div class="container">
          ${useBgImage && isBase64 ? `<div class="overlay"></div>` : ''}
          <div class="header">
            ${userPfp ? `<img class="pfp" src="${userPfp}" alt="pfp"/>` : ''}
            <div class="username">${cardTitle ? cardTitle : `${username}'s<br/>Recently ${isManga === true ? 'Read' : 'Watched'}`}</div>
          </div>
          <div class="anime-list">
            ${animeList}
          </div>
        </div>
      </div>
    </foreignObject>
  </svg>
`;

  return renderedSVG;
};
