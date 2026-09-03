# teambeam.us — US-1 (deep home, premium multicolour theme)

Type: Space Grotesk (display) · Hanken Grotesk (body) · Space Mono (eyebrow) · Newsreader Italic (accent) · Archivo 800 (wordmark, locked/invariant).
Design: multicolour mesh background, redesigned mega-menu with header CTA, larger premium type scale, dark gradient proof/talk/data panels.
Content: ~3,760-word multi-layer home (intro, problem, Gallup data anchor, method-in-depth, 8-dimension accordion, Day 14/30/60 measurement, who-it's-for segments, 6 offerings, where, tools, principles, 7-Q FAQ), 14 internal links.
SEO/AEO/GEO: canonical .us, hreflang en-US self / en-IN alt / x-default .us, Organization sameAs -> .in + .blog, FAQ + breadcrumb schema.

## Preview
`node build.js` -> serves to `site/`. Open with a static server, or push to a NEW Cloudflare Pages project (build `node build.js`, output `site`).

## State
Ships the HOME only (the depth + design exemplar). Inner pages build in US-2..US-6 and reuse the same helpers (secIntro/secStages/secDimensions/secMeasure/secSegments/secOffers/secDeepFAQ). The `PAGES.length = 0;` line above `run()` limits this to home; removed once inner pages exist. Header CTA currently targets `#talk` (home); switches to `/contact` when that page is built.

## Not carried from India
Fraunces/Mukta fonts, warm palette, sunny wash, INR, +91, Pune address — none present.
