import { renderTheme, themes } from './theme/awesome-card';
import { renderHorizontal } from './type/horizontal-card';
import { renderVertical } from './type/vertical-card';

export type CardType = 'vertical' | 'horizontal' | undefined;

export interface RenderSVGData {
  username: string;
  anime: { title: string; episode: number; url: string; watched_at: string; small_cover?: string }[];
  userPfp?: string;
  lastAnimeCover?: string;
  isManga?: boolean; // add this flag
  showBg?: boolean; // new flag
  hideCovers?: boolean;
  cardTitle?: string;
  fontSize?: number;
  isRounded?: boolean;
}

export const renderSVG = (
  data: RenderSVGData,
  type: CardType,
  theme: keyof typeof themes,
  border: boolean
) => {
  const { username, anime, userPfp, lastAnimeCover, isManga, showBg, hideCovers, cardTitle, fontSize, isRounded } = data;
  const color = renderTheme(theme);

  switch (type) {
    case 'vertical':
      return renderVertical({ username, anime, color, border, userPfp, lastAnimeCover, isManga, showBg, hideCovers, cardTitle, fontSize, isRounded });
    case 'horizontal':
      return renderHorizontal({ username, anime, color, border, userPfp, lastAnimeCover, isManga, showBg, hideCovers, cardTitle, fontSize, isRounded });
    default:
      return renderVertical({ username, anime, color, border, userPfp, lastAnimeCover, isManga, showBg, hideCovers, cardTitle, fontSize, isRounded });
  }
};
