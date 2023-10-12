# Tabtastic

**Tabtastic** is a Firefox add-on and Chrome extension that helps you wrangle your current open tabs by ordering them by domain and URL, and closing any duplicates. Perfect for the tab hoarders.

## Purpose

During web research I tend to open several tabs, sometimes I end up with several duplicate tabs opened or tabs that are from the same domain scattered all over. The goal of this project is to help solve those problems via a Firefox add-on/Chrome extension.

## Give it a Try

- Firefox Add-on available at <https://addons.mozilla.org/en-US/firefox/addon/tabtastic/>
- Chrome Web Store Extension <https://chrome.google.com/webstore/detail/tabtastic/gdehoijkpffgonmbbeonbicfbffkglhn>

## 🏁 Road Map

- [x] create icon (**must** be `png` since Chrome doesn't support `svg` see [#4](https://github.com/amerikan/tabtastic/issues/4))
- [x] sorts all open tab based on domain
- [x] eliminates duplicates
- [x] port over as Chrome extension (see current workaround [#1](https://github.com/amerikan/tabtastic/issues/1))

## Development

**Requires**: node, firefox or chrome

### Dependencies

Install dependencies:

```sh
npm i
```

### Start up

Run extension in firefox:

```sh
npm run start:firefox
```

Run extension in chrome:

```sh
npm run start:chrome
```

The add-on/extension will install temporarily and will watch for changes made.

### Debugging

- monitor logs in the terminal where you ran start script
- for in Firefox you can use console in dev tools
- for Chrome see tips <https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#logs>, `console.log`'s don't seem to display, only `console.error`'s.

#### Build Release

For now versions should be manually bumped in `package.json` and `manifest.json`.

Then run:

```sh
npm run build:firefox
```

and/or

```sh
npm run build:chrome
```
