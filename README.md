# Tabtastic

**Tabtastic** is a free Firefox add-on that helps you wrangle your current open tabs.

## Purpose

During research I tend to open several tabs, sometimes I end up with duplicate tabs opened or tabs that are from the same domain scattered all over. The goal of this project is to help solve those problems via a Firefox add-on.

## 🏁 Road Map

⚠️ UNDER ACTIVE DEVELOPMENT

- [x] create icon
- [x] sorts all open tab based on domain
- [x] eliminates duplicates
- [ ] grouped by day
- [ ] port over as chrome extension

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

- monitor logs in terminal
- in Firefox you can use console in dev tools
- in Chrome see tips <https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#logs>
