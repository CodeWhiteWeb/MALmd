export interface Theme {
  primaryText: string;    // Main text color (anime title, username)
  secondaryText: string;  // Secondary text color (episode, etc)
  background: string;     // Card background color (hex, no #)
  accent: string;         // Accent color (borders, highlights)
}

export const themes: Record<string, Theme> = {
  default: {
    primaryText: '222831',
    secondaryText: '393e46',
    background: 'fffefe',
    accent: '4c71f2'
  },
  dark: {
    primaryText: 'e0e0e0',
    secondaryText: 'bdbdbd',
    background: '151515',
    accent: '79ff97'
  },
  chartreuse_dark: {
    primaryText: 'ffffff',
    secondaryText: '7fff00',
    background: '000000',
    accent: '00aeff'
  },
  radical: {
    primaryText: 'a9fef7',
    secondaryText: 'fe428e',
    background: '141321',
    accent: 'f8d847'
  },
  merko: {
    primaryText: '68b587',
    secondaryText: 'abd200',
    background: '0a0f0b',
    accent: 'b7d364'
  },
  gruvbox: {
    primaryText: '8ec07c',
    secondaryText: 'fabd2f',
    background: '282828',
    accent: 'fe8019'
  },
  tokyonight: {
    primaryText: '38bdae',
    secondaryText: '70a5fd',
    background: '1a1b27',
    accent: 'bf91f3'
  },
  catppuccin: {
    primaryText: '96cdfb',
    secondaryText: 'd9e0ee',
    background: '161320',
    accent: 'ddb6f2'
  },
  catppuccin_latte: {
    primaryText: '179299',
    secondaryText: '4c4f69',
    background: 'eff1f5',
    accent: '8839ef'
  },
  catppuccin_frappe: {
    primaryText: '81c8be',
    secondaryText: 'c6d0f5',
    background: '303446',
    accent: 'ca9ee6'
  },
  catppuccin_macchiato: {
    primaryText: '8bd5ca',
    secondaryText: 'cad3f5',
    background: '24273a',
    accent: 'c6a0f6'
  },
  catppuccin_mocha: {
    primaryText: '94e2d5',
    secondaryText: 'cdd6f4',
    background: '1e1e2e',
    accent: 'cba6f7'
  },
  algolia: {
    primaryText: '00adfe',
    secondaryText: 'fefefe',
    background: '050f2c',
    accent: '26bb85'
  },
  monokai: {
    primaryText: 'ea1f6a',
    secondaryText: 'cfcfc9',
    background: '272822',
    accent: 'e18905'
  },
  dracula: {
    primaryText: 'f8f8f2',
    secondaryText: '6272a4',
    background: '282a36',
    accent: 'ff79c6'
  },
  nord: {
    primaryText: 'd8dee9',
    secondaryText: '4c566a',
    background: '2e3440',
    accent: '88c0d0'
  },
  github: {
    primaryText: 'ffffff',
    secondaryText: '4c566a',
    background: '0d1117',
    accent: '43c293'
  },
  graywhite: {
    primaryText: '24292e',
    secondaryText: '6e7781',
    background: 'ffffff',
    accent: '24292e'
  },
  moonlight: {
    primaryText: 'f8f8f8',
    secondaryText: 'ff757f',
    background: '222436',
    accent: '599dff'
  },
  hackerman: {
    primaryText: '00b3d6',
    secondaryText: '00b3d6',
    background: '000000',
    accent: '00b3d6'
  },
  shadow_red: {
    primaryText: '9a0000',
    secondaryText: '9a0000',
    background: '151515',
    accent: '4f0000'
  },
  shadow_green: {
    primaryText: '007a00',
    secondaryText: '007a00',
    background: '151515',
    accent: '003d00'
  },
  shadow_blue: {
    primaryText: '00779a',
    secondaryText: '00779a',
    background: '151515',
    accent: '004490'
  }
};

// Accepts theme key (case-insensitive, dashes/underscores interchangeable)
export const renderTheme = (theme: string): Theme => {
  if (!theme) return themes.default;
  const key = theme.toLowerCase().replace(/-/g, '_');
  if (themes[key]) return themes[key];
  return themes.default;
};
