# teambeam.us — US-1 (home exemplar)

Cool US theme (Archivo + Libre Franklin + IBM Plex Mono), reversed hreflang, US schema, icon-social footer + icon contact block.

## Preview
`node build.js` → serves to `site/`. Open with any static server, or push to a NEW Cloudflare Pages project (build: `node build.js`, output: `site`). Point the teambeam.us domain only when the full site is done.

## State
This build ships the HOME only (the depth/voice exemplar). Inner pages (hubs, destinations, occasions, offerings, tools) are written fresh in US-2…US-6. The line `PAGES.length = 0;` above `run()` is what limits this to home — it is removed once inner pages are authored.

## Not carried from India
Fonts (Fraunces/Mukta), warm palette, sunny wash, INR, +91, Pune address — none present.
