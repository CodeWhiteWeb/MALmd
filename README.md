<p align="center">
  <img align="center" width="100" src="assets/logo.png" />

  <h1 align="center">MALmd: MyAnimeList Recently Watched/Read Cards</h1>
  <h3 align="center">Show your 5 most recently watched anime or read manga from MyAnimeList in your GitHub README.</h3>
</p>

<!-- Badges -->
<p align="center">
  <a href="https://github.com/CodeWhiteWeb/MALmd/issues">
    <img src="https://img.shields.io/github/issues/CodeWhiteWeb/MALmd?style=flat-square">
  </a>

  <a href="https://github.com/CodeWhiteWeb/MALmd/pulls">
    <img src="https://img.shields.io/github/issues-pr/CodeWhiteWeb/MALmd?style=flat-square">
  </a>
  
  <a href="https://twitter.com/CodeWhiteWeb1" target="_blank">
    <img alt="Twitter: CodeWhiteWeb1" src="https://img.shields.io/twitter/follow/CodeWhiteWeb1.svg?style=social" />
  </a>
</p>

<!-- Links -->
<p align="center">
  <a href="https://malmd.vercel.app/api" target="_blank">View Demo</a>
  <span> · </span>
  <a href="https://github.com/CodeWhiteWeb/MALmd/issues" target="_blank">Report Bug</a>
</p>

## Features ✨

- Show your 5 most recently watched anime or read manga from MyAnimeList
- Customizable card themes and layout (vertical/horizontal)
- Show/hide background cover image
- User profile picture and anime/manga cover thumbnails
- Easy to embed in your GitHub README

## Usage ⚡️

Copy the markdown below and paste it in your Github Readme, replacing `USERNAME` with your MyAnimeList username.

```md
[![MAL Recently Watched](https://malmd.vercel.app/api?username=USERNAME&type=horizontal&theme=dark)](https://myanimelist.net/profile/USERNAME)
```

## API Scopes (Query Parameters)

| Parameter   | Type    | Default   | Description                                                                                  |
|-------------|---------|-----------|----------------------------------------------------------------------------------------------|
| username    | string  | (none)    | Your MyAnimeList username (required)                                                         |
| type        | string  | vertical  | Card layout: `vertical` or `horizontal`                                                      |
| theme       | string  | default   | Card theme (see below for available themes)                                                  |
| border      | boolean | false     | Show card border: `true` or `false`                                                         |
| manga       | boolean | false     | Show manga stats instead of anime: `true` or `false`                                        |
| bg          | boolean | true      | Show background cover image: `true` (show) or `false` (hide, use theme color background)    |
| count       | number  | 5         | Number of entries to show (1-10)                                                             |
| hide_pfp    | boolean | false     | Hide the user profile picture: `true` or `false`                                            |
| hide_covers | boolean | false     | Hide the small cover images for each entry: `true` or `false`                               |
| title       | string  | (auto)    | Custom card title (overrides default)                                                        |
| font_size   | number  | (auto)    | Font size for card title and entries (in px)                                                 |
| rounded     | boolean | true      | Rounded card corners: `true` (rounded) or `false` (square)                                  |

### Example URLs

**Recently Watched Anime (default):**
```
https://malmd.vercel.app/api?username=USERNAME
```

**Recently Read Manga:**
```
https://malmd.vercel.app/api?username=USERNAME&manga=true
```

**Horizontal Card with Dark Theme:**
```
https://malmd.vercel.app/api?username=USERNAME&type=horizontal&theme=dark
```

**Hide Background Image:**
```
https://malmd.vercel.app/api?username=USERNAME&bg=false
```

**Show 3 entries, no covers, custom title, square corners:**
```
https://malmd.vercel.app/api?username=USERNAME&count=3&hide_covers=true&title=My%20Anime%20History&rounded=false
```

**All Scopes Example:**
```
https://malmd.vercel.app/api?username=USERNAME&type=horizontal&theme=catppuccin_mocha&border=true&manga=true&bg=false
```

## Themes

Available themes (use with `theme` parameter):

- default
- dark
- chartreuse_dark
- radical
- merko
- gruvbox
- tokyonight
- catppuccin
- catppuccin_latte
- catppuccin_frappe
- catppuccin_macchiato
- catppuccin_mocha
- algolia
- monokai
- dracula
- nord
- github
- graywhite
- moonlight
- hackerman
- shadow_red
- shadow_green
- shadow_blue

## Development

Install dependencies:
```sh
pnpm install
```

Run locally:
```sh
npx vercel dev
```

## Contributing 🤝

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/CodeWhiteWeb/MALmd/issues).

## Special Thanks ❤

- Inspired by [AnuragHazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats).
- Huge thanks to [Jikan.moe](https://jikan.moe/) for providing the API!

## Show your support 🌈

Be sure to drop a 🌟 if you like the project!

## Author 🤗

👤 **CodeWhiteWeb**

- Website: https://CodeWhiteWeb.thedev.id
- Twitter: [@CodeWhiteWeb1](https://twitter.com/CodeWhiteWeb1)
- Github: [@CodeWhiteWeb](https://github.com/CodeWhiteWeb)

<div align="center">Made by CodeWhiteWeb with ❤ and TypeScript</div>
