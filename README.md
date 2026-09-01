# Blueprint Builds — site files

A static, no-build site: three files, deployable to GitHub Pages as-is.

```
index.html
css/style.css
js/main.js
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (or use an existing one).
2. Add these three files/folders to the repo root, keeping the folder structure
   (`css/style.css` and `js/main.js` must stay in their subfolders — the HTML
   links to them by that path).
3. Commit and push.
4. In the repo: **Settings → Pages → Build and deployment → Source** → select
   **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
5. GitHub gives you a URL like `https://yourusername.github.io/repo-name/`
   within a minute or two.

No build step, no dependencies to install — it's plain HTML/CSS/JS plus
Google Fonts loaded from a CDN link in `<head>`.

## What's already built for you

- Responsive layout, mobile nav, keyboard-accessible interactive diagram
- Hero: an animated SVG blueprint of a PC tower that draws itself in on load,
  labeling each part (CPU, RAM, GPU, storage, PSU, cooling)
- "Anatomy" section: a click-through body diagram (CPU = brain, GPU = eyes,
  RAM = short-term memory, etc.) built with radio inputs, so it works with no
  JavaScript at all
- A three-column build comparison table (Sketch / Draft / Final) with a
  row per part, ready for your actual parts and prices
- Scroll-triggered animated stat counters, sticky nav, smooth-scroll anchors

## What's on you (the research)

Every spot that needs your actual content is marked `<!-- EDIT: ... -->` in
`index.html` — 42 of them. Search the file for `EDIT` to find them all.
They fall into a few groups:

- **Brand**: business name (nav + footer), contact email
- **Founder note**: the "Why buy from me" paragraph and your years in business
- **Stats**: years building, machines shipped, turnaround time
  (`data-count="6"` etc. — change the number in `data-count`, the on-page
  number updates itself)
- **Build table**: every `[Your CPU pick] — $[price]` style placeholder
  across the three tiers (Processor, Graphics, Memory, Storage, Motherboard,
  Power supply, Cooling) and the `$[XXX]` totals

Nothing about the parts themselves or their prices is filled in — that's
your research to drop in.

## Customizing the look

Colors, fonts, and spacing are all CSS variables at the top of
`css/style.css` (`:root { ... }`) — change a value there and it updates
everywhere it's used.
