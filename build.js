/* teambeam.in generator — zero dependencies. Run: node build.js
 * Phase 1a: shell (header/footer/logo/schema) + home + utility files.
 * All JSON-LD is built from objects via JSON.stringify and re-validated at build end. */
const fs = require('fs');
const path = require('path');
const CFG = require('./theme.config.js');

const ROOT = __dirname, OUT = path.join(ROOT,'site'), ASSETS = path.join(ROOT,'assets');
const BUILD_ID = Date.now();
const YEAR = new Date().getFullYear();

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const attr = s => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');

/* ---- top-level navigation (Phase 1a: anchors to home sections; becomes a full mega-menu with inner pages in 1b) ---- */
/* Pages that exist in this build. Grows every batch, so nav links light up progressively. */
const BUILT = new Set(['/','/what-we-do','/why-teambeam','/who-we-serve',
  '/team-experiences','/impact-csr','/development-facilitation','/offsites-retreats','/beam-occasions','/beam-journeys','/beam-platform','/self-serve-kits','/destinations',
  '/resources','/resources-tools-offsite-roi-calculator','/resources-tools-team-health-snapshot','/resources-tools-idea-generator',
  '/about','/careers','/partnerships','/contact',
  '/why-teambeam-the-method','/why-teambeam-measurement-impact','/why-teambeam-results',
  '/occasions','/volunteer','/privacy','/terms','/accessibility',
  '/destinations-nyc','/destinations-sf-bay','/destinations-la','/destinations-chicago','/destinations-austin','/destinations-boston',
  '/destinations-seattle','/destinations-denver','/destinations-dc','/destinations-atlanta','/destinations-national-parks',
  '/team-experiences-beam-hunts','/team-experiences-beam-arena','/team-experiences-beam-mysteries','/team-experiences-beam-makers','/team-experiences-high-action-tech','/team-experiences-rhythm-music','/team-experiences-culinary',
  '/development-facilitation-assessment-led-development','/development-facilitation-expert-facilitation','/development-facilitation-leadership-team-training','/development-facilitation-strategic-workshops','/development-facilitation-professional-excellence','/development-facilitation-guest-expert-in-residence',
  '/impact-csr-beam-green','/impact-csr-beam-builds','/impact-csr-beam-community','/impact-csr-diy-impact-kits',
  '/self-serve-kits-beam-kits','/self-serve-kits-beam-playbook','/self-serve-kits-beam-certify','/self-serve-kits-offsite-in-a-box',
  '/offsites-retreats-team-programs','/offsites-retreats-executive-experiences','/offsites-retreats-high-energy-scale','/offsites-retreats-sourcing-planning',
  '/beam-platform-planning-assistant','/beam-platform-live-event-app','/beam-platform-client-dashboard','/beam-platform-measurement','/beam-platform-always-on',
  '/who-we-serve-industries-technology','/who-we-serve-industries-financial-services','/who-we-serve-industries-healthcare','/who-we-serve-industries-manufacturing','/who-we-serve-industries-media-entertainment','/who-we-serve-industries-professional-services','/who-we-serve-industries-ecommerce-retail','/who-we-serve-industries-non-profit',
  '/who-we-serve-roles-executives','/who-we-serve-roles-people-hr','/who-we-serve-roles-managers','/who-we-serve-roles-chiefs-of-staff-eas','/who-we-serve-roles-employees',
  '/who-we-serve-moments-onboarding','/who-we-serve-moments-post-merger','/who-we-serve-moments-restructure-reset','/who-we-serve-moments-burnout-recovery','/who-we-serve-moments-sales-kickoff','/who-we-serve-moments-annual-retreat','/who-we-serve-moments-distributed-team-connection','/who-we-serve-moments-milestone-anniversary',
  '/occasions-winter-holiday-season','/occasions-fall-gratitude','/occasions-new-year','/occasions-summer-mid-year','/occasions-spring-season','/occasions-heritage-culture-months','/occasions-national-civic-day','/occasions-employee-appreciation','/occasions-womens-day','/occasions-year-end',
  '/resources-insights']);
const NAVGROUPS = [
  {label:'What we do', slug:'/what-we-do', anchor:'#what', items:[
    ['Team Experiences','/team-experiences'],['Impact & CSR','/impact-csr'],['Development & Facilitation','/development-facilitation'],
    ['Offsites & Retreats','/offsites-retreats'],['Beam Occasions','/beam-occasions'],['Beam Journeys','/beam-journeys'],
    ['The Beam Platform','/beam-platform'],['Self-Serve & Kits','/self-serve-kits']]},
  {label:'How we work', slug:'/why-teambeam', anchor:'#how', items:[
    ['The method','/why-teambeam-the-method'],['Measurement & proof','/why-teambeam-measurement-impact'],['Results','/why-teambeam-results']]},
  {label:"Who it's for", slug:'/who-we-serve', anchor:'#who', items:[
    ['By role','/who-we-serve#roles'],['By industry','/who-we-serve#industries'],['By moment','/who-we-serve#moments']]},
  {label:'Where we go', slug:'/destinations', anchor:'#where', items:[
    ['Signature cities','/destinations#cities'],['National parks','/destinations-national-parks'],['Worldwide','/destinations#worldwide']]},
  {label:'Tools', slug:'/resources', anchor:'#tools', items:[
    ['ROI calculator','/resources-tools-offsite-roi-calculator'],['Team Health Snapshot','/resources-tools-team-health-snapshot'],['Idea Generator','/resources-tools-idea-generator'],['Insights','/resources-insights']]},
  {label:'About', slug:'/about', anchor:'#principles', items:[['Our story','/about'],['Careers','/careers'],['Partners','/partnerships']]}
];
const resolve = (slug,anchor)=> BUILT.has(slug) ? slug : ('/'+(anchor||''));

/* ---- JSON-LD (always via stringify) ---- */
function orgNode(){
  return { '@type':'Organization', name:'TeamBeam Outings', url:CFG.origin, email:CFG.email,
    telephone:CFG.phone,
    address:{'@type':'PostalAddress',streetAddress:'600 California St, 11th Floor',addressLocality:'San Francisco',addressRegion:'CA',postalCode:'94108',addressCountry:'US'},
    geo:{'@type':'GeoCoordinates',latitude:CFG.geo.lat,longitude:CFG.geo.lng},
    areaServed:['United States','Worldwide'],
    description:'TeamBeam Outings designs, delivers and measures corporate team experiences. Diagnostic-first design and Day 14/30/60 measurement. One business, two homes — India and the USA.',
    sameAs:[CFG.homes['in'], CFG.homes.blog, ...Object.values(CFG.social)] };
}
function ld(obj){const s=JSON.stringify(obj);JSON.parse(s);return `<script type="application/ld+json">${s}</script>`;}

/* ---- shell ---- */
function head(p){
  const url = CFG.origin + p.path;
  const inAlt = CFG.homes['in'] + p.path;
  const graph = {'@context':'https://schema.org','@graph':[orgNode(), ...(p.nodes||[])]};
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${attr(p.desc)}">
<meta name="ai-summary" content="${attr(p.ai||p.desc)}">
${p.keywords?`<meta name="keywords" content="${attr(p.keywords)}">`:''}
<link rel="canonical" href="${attr(url)}">
<link rel="alternate" hreflang="en-US" href="${attr(url)}">
<link rel="alternate" hreflang="en-IN" href="${attr(inAlt)}">
<link rel="alternate" hreflang="x-default" href="${attr(url)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#0D2137">
<meta name="geo.region" content="${CFG.geo.region}">
<meta name="geo.placename" content="${CFG.geo.place}">
<meta name="geo.position" content="${CFG.geo.lat};${CFG.geo.lng}">
<meta name="ICBM" content="${CFG.geo.lat}, ${CFG.geo.lng}">
<meta name="twitter:site" content="${CFG.twitter}">
<meta name="twitter:creator" content="${CFG.twitter}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TeamBeam Outings">
<meta property="og:title" content="${attr(p.title)}">
<meta property="og:description" content="${attr(p.desc)}">
<meta property="og:url" content="${attr(url)}">
<meta property="og:image" content="${attr(CFG.origin)}/assets/img/og-default.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(p.title)}">
<meta name="twitter:description" content="${attr(p.desc)}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/Fraunces.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/Mukta-R.woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${BUILD_ID}">
${ld(graph)}
</head>
<body class="${p.body||''}">
<a class="skip" href="#main">Skip to content</a>
${header()}
<main id="main">`;
}

function wordmark(cls){
  return `<a class="brand ${cls||''}" href="/" aria-label="TeamBeam Outings home">
    <span class="brand__mark" aria-hidden="true">&#923;</span>
    <span class="brand__word">TEAM<b>BEAM</b></span>
    <span class="brand__sub">OUTINGS</span>
  </a>`;
}

function header(){
  const link = (l,s,hub)=>`<a href="${BUILT.has(s.split('#')[0])?s:hub}">${esc(l)}</a>`;
  const links = NAVGROUPS.map(g=>{
    const hub = resolve(g.slug,g.anchor);
    const kids = g.items.map(([l,s])=>link(l,s,hub)).join('');
    return `<div class="navitem has-mega">
      <button class="megabtn" aria-expanded="false">${esc(g.label)} <span aria-hidden="true">&#9662;</span></button>
      <div class="mega"><a class="mega__all" href="${hub}">${esc(g.label)} overview</a>${kids}</div>
    </div>`;
  }).join('');
  const drawer = NAVGROUPS.map(g=>{
    const hub = resolve(g.slug,g.anchor);
    const kids = g.items.map(([l,s])=>link(l,s,hub)).join('');
    return `<details><summary>${esc(g.label)}</summary><div class="draw-sub"><a href="${hub}">${esc(g.label)} overview</a>${kids}</div></details>`;
  }).join('');
  return `<header class="nav" id="nav">
  <div class="nav__in">
    ${wordmark()}
    <nav class="nav__links" aria-label="Primary">${links}</nav>
    <div class="nav__right">
      <div class="switch" role="group" aria-label="Choose region">
        <a href="${CFG.homes['in']}" aria-label="India site">IN</a>
        <span class="switch__on" aria-current="true">US</span>
      </div>
      <a class="nav__insights" href="${CFG.homes.blog}">Insights <span aria-hidden="true">&#8599;</span></a>
      <a class="cta cta--sm" href="#talk">Talk to us</a>
    </div>
    <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
  </div>
  <div class="beam" aria-hidden="true"></div>
</header>
<div class="drawer" id="drawer">
  ${drawer}
  <div class="drawer__foot">
    <div class="switch"><a href="${CFG.homes['in']}">India</a><span class="switch__on">United States</span></div>
    <a class="nav__insights" href="${CFG.homes.blog}">Insights <span aria-hidden="true">&#8599;</span></a>
    <a class="cta" href="#talk">Talk to us</a>
  </div>
</div>`;
}

function contactBits(){
  const mail = `<a href="mailto:${CFG.email}">${CFG.email}</a>`;
  const tel = CFG.phone ? ` · <a href="tel:${CFG.phone.replace(/[^+\d]/g,'')}">${esc(CFG.phone)}</a>` : '';
  return mail + tel;
}

function footer(){
  const soc = Object.entries(CFG.social).map(([n,u])=>`<a href="${attr(u)}" rel="noopener" aria-label="${esc(n)}">${esc(n)}</a>`).join('');
  return `</main>
<footer class="foot">
  <div class="foot__beam" aria-hidden="true"></div>
  <div class="foot__strip">
    <div class="switch"><a href="${CFG.homes['in']}">India</a><span class="switch__on">United States</span></div>
    <a class="foot__insights" href="${CFG.homes.blog}">Insights — the thinking behind the method <span aria-hidden="true">&#8599;</span></a>
  </div>
  <div class="foot__grid">
    <div class="foot__brand">
      ${wordmark('brand--foot')}
      <p class="foot__line">Corporate team experiences — designed, delivered and measured. India &amp; worldwide.</p>
      <p class="foot__contact"><a href="mailto:${CFG.email}">${CFG.email}</a><br><a href="tel:${CFG.phone.replace(/[^+\d]/g,'')}">${esc(CFG.phone)}</a></p>
      <p class="foot__addr"><a href="${CFG.mapsUrl}" rel="noopener">${esc(CFG.address)}</a></p>
    </div>
    <nav class="foot__col" aria-label="Explore"><h3>Explore</h3>
      <a href="/what-we-do">What we do</a><a href="/why-teambeam">How we work</a><a href="/who-we-serve">Who it's for</a><a href="/destinations">Where we go</a><a href="/resources">Tools</a></nav>
    <nav class="foot__col" aria-label="What we do"><h3>What we do</h3>
      <a href="/team-experiences">Team Experiences</a><a href="/offsites-retreats">Offsites &amp; Retreats</a><a href="/development-facilitation">Development</a><a href="/impact-csr">Impact &amp; CSR</a><a href="/beam-occasions">Occasions</a><a href="/self-serve-kits">Self-Serve &amp; Kits</a></nav>
    <nav class="foot__col" aria-label="Tools & Company"><h3>Tools &amp; company</h3>
      <a href="/resources-tools-offsite-roi-calculator">ROI calculator</a><a href="/resources-tools-team-health-snapshot">Team Health Snapshot</a><a href="/resources-insights">Insights</a><a href="/about">About</a><a href="/careers">Careers</a><a href="/contact">Contact</a></nav>
  </div>
  <div class="foot__bottom">
    <div class="foot__soc">${soc}</div>
    <div class="foot__law"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/accessibility">Accessibility</a></div>
    <span class="foot__cr">&copy; ${YEAR} TeamBeam Outings · one business, two homes</span>
    <a class="foot__top" href="#top">Back to top &#8593;</a>
  </div>
</footer>
<script>
(function(){
  var b=document.querySelector('.burger'),d=document.getElementById('drawer');
  function close(){d.classList.remove('open');b.classList.remove('open');b.setAttribute('aria-expanded','false');}
  if(b&&d){
    b.addEventListener('click',function(){var o=!d.classList.contains('open');d.classList.toggle('open',o);b.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));});
    d.querySelectorAll('a').forEach(function(l){l.addEventListener('click',close);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  document.querySelectorAll('.megabtn').forEach(function(btn){
    var mega=btn.parentElement;
    btn.addEventListener('click',function(e){e.stopPropagation();var o=btn.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.megabtn[aria-expanded="true"]').forEach(function(x){if(x!==btn){x.setAttribute('aria-expanded','false');x.parentElement.classList.remove('open');}});
      btn.setAttribute('aria-expanded',String(!o));mega.classList.toggle('open',!o);});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.has-mega'))document.querySelectorAll('.megabtn[aria-expanded="true"]').forEach(function(x){x.setAttribute('aria-expanded','false');x.parentElement.classList.remove('open');});});
})();
</script>
</body></html>`;
}

/* ---- home ---- */
function homePage(){
  const nodes = [
    {'@type':'WebSite', name:'TeamBeam Outings', url:CFG.origin+'/'},
    {'@type':'FAQPage', mainEntity:[
      {'@type':'Question',name:'What does TeamBeam Outings do?',acceptedAnswer:{'@type':'Answer',text:'We design, deliver and measure corporate team experiences — team days, offsites and retreats, and occasions — built around a diagnosis of what a team needs, and measured at Day 14, 30 and 60 so the change can be shown.'}},
      {'@type':'Question',name:'How is TeamBeam different from a team-building vendor?',acceptedAnswer:{'@type':'Answer',text:'We read a team before we design for it, and we measure what changed afterwards. The result is a defensible change in how a team works, not just an enjoyable day.'}}
    ]}
  ];
  const off = [
    ['Team experiences','Focused experiences that build the specific thing a team is missing — from a few hours to a full day.'],
    ['Offsites &amp; retreats','Multi-day offsites and retreats, sourced, planned and run end to end, in India and worldwide.'],
    ['Occasions','Marking the moments that matter — inclusively, and with meaning.'],
    ['Delivery modes','In your office, away together, or online — designed for how your team actually works.']
  ];
  const who = [
    ['By role','CXOs and boards · HR and People leaders · team and business-unit leaders.'],
    ['By industry','Technology · financial services · healthcare · manufacturing · GCCs · and more.'],
    ['By moment','Onboarding · offsites · milestones · restructures and resets.']
  ];
  const principles = [
    ['We read before we design.','A day is only useful if it fits the team it is built for.'],
    ['We measure what we deliver.','The change should be something you can show, not something to take on faith.'],
    ['We keep it honest.','No forced fun. Calm, real, and built for grown-ups.'],
    ['One team, wherever you are.','India or the other side of the world — the same practice, the same people.']
  ];
  return head({
    body:'home', path:'/', title:'TeamBeam Outings — corporate team experiences, designed, delivered and measured',
    desc:'TeamBeam Outings designs, delivers and measures corporate team experiences across India and worldwide — team days, offsites and retreats, and occasions, built around what a team needs and measured at Day 14, 30 and 60.',
    ai:'TeamBeam Outings is a corporate team-experience company serving India and worldwide (with a US home at teambeam.us). It designs experiences around a diagnosis of a team\u2019s needs, delivers them, and measures the change at Day 14, 30 and 60.',
    keywords:'corporate team experiences, team offsite India, team building measurement, corporate retreat, team health',
    nodes
  }) + `
  <span id="top"></span>
  <section class="hero">
    <p class="eyebrow">Corporate team experiences · India &amp; worldwide</p>
    <h1 class="hero__h">We build teams.<br>And we <span class="grad">prove it.</span></h1>
    <p class="hero__sub">We design experiences around what a team actually needs, deliver them with care, and measure what changed. One practice, at home in India and across the world.</p>
    <div class="hero__cta"><a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a></div>
  </section>

  ${secNarrative({eyebrow:'The honest problem',h:'You spend the budget. Everyone has an okay time. Then nothing changes.',paras:[
    'It is a familiar story. A team books an outing, people show up, there is food and a few games, and by the next week it is a photo on a group chat. The teams that needed to talk still do not talk. The new joiners still feel like guests.',
    'The problem is not the activity. It is that the activity was never tied to anything, and nobody looked at whether it worked. So the next year you do it again, a little bigger, and hope. That is a great deal of money to spend on hope.'
  ]})}

  ${secNarrative({eyebrow:'A better order of operations',h:'Understand the team first. Then design the day. Then check it worked.',paras:[
    'Before we suggest a single activity, we look at how your team is really doing — where trust is thin, where communication breaks, what the team itself says it needs. That reading shapes everything after.',
    'Then we build a day around it, run it well, and come back at Day 14, 30 and 60 to see what shifted. You end up with proof, not just a good memory. That is the whole idea behind TeamBeam.'
  ]})}

  <section class="strip" id="what">
    <div class="sec-head"><span class="eyebrow">What we do</span><h2>Experiences built around a team, not a catalogue.</h2></div>
    <div class="cards">${off.map(([t,d])=>`<div class="card"><span class="card__edge"></span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </section>

  <section class="strip strip--tint" id="how">
    <div class="sec-head"><span class="eyebrow">How we work</span><h2>A method, not a menu.</h2>
      <p class="lead">We read a team before we design for it, and we measure what moved afterwards — at Day 14, 30 and 60. That is the whole difference between a good day and a change that holds.</p></div>
    <div class="method">${['Scan','Design','Build','Deliver','Measure'].map(s=>`<span>${s}</span>`).join('')}</div>
  </section>

  ${secFeatureList({eyebrow:'What we read',h:'The eight dimensions of a healthy team.',lead:'Underneath every experience is a reading of the team across eight dimensions. It is the vocabulary that turns \u201cthe team feels off\u201d into something you can design for — and measure.',items:[
    {h:'Trust',p:'Whether people can admit a mistake, ask for help, and disagree without it costing them.'},
    {h:'Communication',p:'Whether the important things get said — including the hard ones — and whether they land.'},
    {h:'Alignment',p:'Whether everyone is genuinely pointed at the same thing, not just busy.'},
    {h:'Collaboration',p:'Whether people build on each other\u2019s work or run in parallel lanes.'},
    {h:'Decision-making',p:'Whether the team can decide and stay decided, rather than reopening everything.'},
    {h:'Energy',p:'Whether the team has the capacity to engage, or is running on empty.'},
    {h:'Belonging',p:'Whether people feel part of the team or adjacent to it.'},
    {h:'Leadership',p:'Whether the people leading create the conditions the other seven need.'}
  ]})}

  <section class="strip" id="who">
    <div class="sec-head"><span class="eyebrow">Who it's for</span><h2>For the people who carry the team.</h2></div>
    <div class="cards cards--3">${who.map(([t,d])=>`<div class="card"><span class="card__edge"></span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </section>

  <section class="proof" id="proof">
    <div class="proof__in">
      <h2>You will know it worked.</h2>
      <p>We read team health before and after an experience, and again weeks later, so the change is something you can put in front of a board — not something you have to argue for. Proof is the point, not the postscript.</p>
    </div>
  </section>

  <section class="strip" id="where">
    <div class="sec-head"><span class="eyebrow">Where we go</span><h2>From your office to the other side of the world.</h2>
      <p class="lead">We run experiences in your workplace, at destinations across India, and anywhere your team can gather.</p></div>
    <div class="chips">${CFG.destinations.slice(0,10).map(d=>`<span>${esc(d)}</span>`).join('')}<span class="chips__more">and worldwide</span></div>
  </section>

  <section class="strip strip--tint" id="tools">
    <div class="sec-head"><span class="eyebrow">Tools</span><h2>Think it through before you talk to us.</h2>
      <p class="lead">A set of free tools to size the opportunity and shape the brief — an ROI view, a team-health self-check, and an idea generator. No sign-up.</p></div>
    <div class="cards cards--3">
      <a class="card" href="/resources-tools-offsite-roi-calculator"><span class="card__edge"></span><h3>ROI calculator</h3><p>Size the cost of a disengaged team, and what a measured change is worth.</p><span class="card__link">Open &rarr;</span></a>
      <a class="card" href="/resources-tools-team-health-snapshot"><span class="card__edge"></span><h3>Team Health Snapshot</h3><p>A short self-check across the eight dimensions of a healthy team.</p><span class="card__link">Take it &rarr;</span></a>
      <a class="card" href="/resources-tools-idea-generator"><span class="card__edge"></span><h3>Idea Generator</h3><p>A starting point for the kind of experience your team needs.</p><span class="card__link">Try it &rarr;</span></a>
    </div>
  </section>

  <section class="principles" id="principles">
    <div class="sec-head"><span class="eyebrow">About us</span><h2>The principles we hold to.</h2></div>
    <div class="principles__grid">${principles.map(([t,d])=>`<div class="pr"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </section>

  ${secBlog({h:'The thinking behind the method.',links:[{t:'The eight dimensions of a healthy team',href:'/the-eight-dimensions-of-a-healthy-team/'},{t:'Why measurement changes the conversation',href:'/why-measurement-changes-the-conversation/'}]})}

  ${secUS({})}

  ${secRelated({eyebrow:'Explore',h:'Where to go next.',links:[
    {h:'How we work',p:'The method, the measurement, and the proof you can put in front of a board.',href:'/why-teambeam',linkText:'The method'},
    {h:'What we do',p:'Eight ways to bring a team together, held up by one method.',href:'/what-we-do',linkText:'All offerings'},
    {h:"Who it's for",p:'By role, by industry, and by the moment your team is in.',href:'/who-we-serve',linkText:'See who'}
  ]})}

  <section class="talk" id="talk">
    <div class="talk__in">
      <span class="eyebrow">Talk to us</span>
      <h2>Tell us what you're trying to change.</h2>
      <p>Not what activity you want — what you want to be different afterwards. We will take it from there.</p>
      <p class="talk__contact">${contactBits()}</p>
      <p class="talk__addr">Visit us at <a href="${CFG.mapsUrl}" rel="noopener">${esc(CFG.address)}</a></p>
      <a class="cta" href="mailto:${CFG.email}">Write to us</a>
    </div>
  </section>` + footer();
}

/* ---- 404 ---- */
function notFound(){
  return head({path:'/404', title:'Page not found — TeamBeam Outings', desc:'That page could not be found.'}) + `
  <section class="hero"><p class="eyebrow">404</p><h1 class="hero__h">That page has wandered off.</h1>
  <p class="hero__sub">Let us point you back.</p>
  <div class="hero__cta"><a class="cta" href="/">Home</a><a class="cta cta--ghost" href="${CFG.homes.blog}">Insights &#8599;</a></div></section>` + footer();
}

/* ---- section renderers (shared page system) ---- */
const stripTags = s => String(s).replace(/<[^>]+>/g,'');
function secHero(h){return `<span id="top"></span><section class="subhero"><p class="eyebrow">${esc(h.eyebrow)}</p><h1>${h.h}</h1>${h.sub?`<p class="subhero__sub">${h.sub}</p>`:''}${h.cta?`<div class="hero__cta">${h.cta}</div>`:''}</section>`;}
function secLead(o){return `<section class="strip narrow"><p class="biglead">${o.t}</p></section>`;}
function secCards(o){const cards=o.cards.map(c=>`<div class="card"><span class="card__edge"></span><h3>${c.h}</h3><p>${c.p}</p>${c.link?`<a class="card__link" href="${c.link}">${c.linkText||'Explore'} <span aria-hidden="true">&rarr;</span></a>`:''}</div>`).join('');return `<section class="strip${o.tint?' strip--tint':''}"${o.id?` id="${o.id}"`:''}>${(o.eyebrow||o.h)?`<div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}${o.lead?`<p class="lead">${o.lead}</p>`:''}</div>`:''}<div class="cards${o.cols===3?' cards--3':''}">${cards}</div></section>`;}
function secSteps(o){const steps=o.steps.map((s,i)=>`<div class="step"><span class="step__n">0${i+1}</span><h3>${s.h}</h3><p>${s.p}</p></div>`).join('');return `<section class="strip strip--tint"${o.id?` id="${o.id}"`:''}><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow)}</span><h2>${o.h}</h2>${o.lead?`<p class="lead">${o.lead}</p>`:''}</div><div class="steps">${steps}</div></section>`;}
function secSchedule(o){const c=o.items.map(x=>`<div class="card sched"><span class="card__edge"></span><span class="sched__day">${esc(x.day)}</span><h3>${x.h}</h3><p>${x.p}</p></div>`).join('');return `<section class="strip"${o.id?` id="${o.id}"`:''}><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow)}</span><h2>${o.h}</h2>${o.lead?`<p class="lead">${o.lead}</p>`:''}</div><div class="cards cards--3">${c}</div></section>`;}
function secProof(o){return `<section class="proof"><div class="proof__in"><h2>${o.h}</h2><p>${o.p}</p></div></section>`;}
function secFaq(o){const items=o.items.map(f=>`<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('');return `<section class="strip faqsec"><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow||'Common questions')}</span><h2>${o.h||'Things people ask'}</h2></div><div class="faqs">${items}</div></section>`;}
function secCTA(o){return `<section class="talk" id="talk"><div class="talk__in"><span class="eyebrow">${esc(o.eyebrow||'Talk to us')}</span><h2>${o.h}</h2>${o.p?`<p>${o.p}</p>`:''}<p class="talk__contact">${contactBits()}</p><div class="hero__cta" style="justify-content:center">${o.cta}</div></div></section>`;}
function secRaw(o){return o.html;}
function secProse(o){return `<section class="strip narrow prose-sec">${(o.eyebrow||o.h)?`<div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}</div>`:''}${o.blocks.map(b=>`${b.h?`<h3>${esc(b.h)}</h3>`:''}${b.p?`<p>${b.p}</p>`:''}`).join('')}</section>`;}
function secNarrative(o){return `<section class="strip narrow"${o.id?` id="${o.id}"`:''}><div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}</div><div class="narr">${o.paras.map(p=>`<p>${p}</p>`).join('')}</div></section>`;}
function secFeatureList(o){return `<section class="strip${o.tint?' strip--tint':''}"${o.id?` id="${o.id}"`:''}><div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}${o.lead?`<p class="lead">${o.lead}</p>`:''}</div><div class="flist">${o.items.map(it=>`<div class="fitem"><h3>${it.h}</h3><p>${it.p}</p></div>`).join('')}</div></section>`;}
const BLOG_SLUGS=new Set(['the-leadership-team-sets-the-weather','employee-appreciation-that-lands','marking-holidays-inclusively','onboarding-at-scale-belong-faster','cxo-the-retention-math','hr-proving-roi-of-culture-spend','gccs-one-company-two-continents','technology-teams-safety-and-retention','post-merger-two-cultures-one-team','sales-teams-what-they-actually-need','why-measurement-changes-the-conversation','what-day-14-30-60-tells-you','diagnostic-first-design-follows-evidence','the-eight-dimensions-of-a-healthy-team','trust-inside-a-team','human-layer-becomes-the-differentiator','what-ai-changes-about-team-work']);
function blogFix(href){ if(typeof href==='string'){ const s=href.replace(/^\//,'').replace(/\/$/,''); if(BLOG_SLUGS.has(s)) return CFG.homes.blog+'/'+s+'/'; } return href; }
function secRelated(o){return `<section class="strip related"><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow||'Keep reading')}</span>${o.h?`<h2>${o.h}</h2>`:''}</div><div class="cards cards--3">${o.links.map(l=>`<a class="card" href="${blogFix(l.href)}"><span class="card__edge"></span><h3>${l.h}</h3><p>${l.p}</p><span class="card__link">${l.linkText||'Explore'} &rarr;</span></a>`).join('')}</div></section>`;}
function secPull(o){return `<section class="strip"><blockquote class="pull">${o.quote}${o.cite?`<cite>${esc(o.cite)}</cite>`:''}</blockquote></section>`;}
function secUS(o){return `<section class="strip"><a class="xmodule xmodule--us" href="${CFG.homes['in']}"><span class="xmodule__eyebrow">Team in India, or a capability center there?</span><span class="xmodule__h">${o.h||'teambeam.in is our home there — one company, two continents, one method.'}</span><span class="xmodule__go">Visit the India site &rarr;</span></a></section>`;}
function secBlog(o){const links=(o.links||[]).map(l=>`<a class="xmodule__link" href="${CFG.homes.blog}${l.href}">${esc(l.t)} <span aria-hidden="true">&#8599;</span></a>`).join('');return `<section class="strip"><div class="xmodule xmodule--blog"><div><span class="xmodule__eyebrow">Insights</span><span class="xmodule__h">${o.h||'The thinking behind the method.'}</span>${links?`<div class="xmodule__links">${links}</div>`:''}</div><a class="cta cta--ghost" href="${CFG.homes.blog}">Read the insights &#8599;</a></div></section>`;}
const R={hero:secHero,lead:secLead,cards:secCards,steps:secSteps,schedule:secSchedule,proof:secProof,faq:secFaq,cta:secCTA,raw:secRaw,prose:secProse,narrative:secNarrative,featurelist:secFeatureList,related:secRelated,pull:secPull,usmodule:secUS,blogmodule:secBlog};
function renderPage(p){
  const nodes=[...(p.nodes||[])];
  const faq=p.sections.find(s=>s.type==='faq');
  if(faq) nodes.push({'@type':'FAQPage',mainEntity:faq.items.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:stripTags(f.a)}}))});
  nodes.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:CFG.origin+'/'},{'@type':'ListItem',position:2,name:p.crumb||p.title,item:CFG.origin+p.path}]});
  return head({...p,nodes})+p.sections.map(s=>R[s.type](s)).join('\n')+footer();
}
const talkCTA = `<a class="cta" href="mailto:${CFG.email}">Write to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`;

/* ---- pages ---- */
const PAGES = [
{
  path:'/what-we-do', crumb:'What we do',
  title:'What we do — team experiences, offsites & development · TeamBeam Outings',
  desc:'From team experiences and offsites to CSR, development and self-serve kits — every format TeamBeam runs, held together by one measured method.',
  ai:'TeamBeam Outings offers team experiences, impact & CSR, development & facilitation, offsites & retreats, occasions, and self-serve kits — all designed around a diagnosis and measured at Day 14/30/60.',
  keywords:'corporate team experiences, offsites, CSR, facilitation, team building India',
  sections:[
    {type:'hero', eyebrow:'What we do', h:'Eight ways to bring a team together. <span class="grad">One method holding them up.</span>',
      sub:'From a two-hour game show to a three-day leadership retreat to a give-back project for your CSR mandate — every format is built around a real goal and checked afterwards.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`},
    {type:'cards', eyebrow:'Everything we do', h:'Pick a format — or tell us the goal and we will point you to it.',
      cards:[
        {h:'Team Experiences',p:'Hunts, game shows, mysteries and makers — genuinely fun, quietly designed.',link:'/team-experiences'},
        {h:'Impact &amp; CSR',p:'Give back together, meet your CSR mandate, and get a report you can file.',link:'/impact-csr'},
        {h:'Development &amp; Facilitation',p:'Turn a good day into a better team, led by facilitators who read the room.',link:'/development-facilitation'},
        {h:'Offsites &amp; Retreats',p:'The whole offsite handled — venue, travel, experiences, debrief.',link:'/offsites-retreats'},
        {h:'Beam Occasions',p:'Mark the moments that matter, in a way people actually enjoy.',link:'/beam-occasions'},
        {h:'Beam Journeys',p:'Explore India together, with the experience built into the trip.',link:'/beam-journeys'},
        {h:'The Beam Platform',p:'The tech that runs the day — and the proof that it worked.',link:'/beam-platform'},
        {h:'Self-Serve &amp; Kits',p:'Our design, your hands — kits, playbooks and facilitator certification.',link:'/self-serve-kits'}
      ]},
    {type:'cards', tint:true, eyebrow:'One method under all of it', h:'The format changes. The care behind it does not.',
      lead:'Whatever you choose, it runs on the same five steps — read the team, design for the real gap, build it, deliver it well, and measure what changed. That is what makes a day a change.',
      cards:[{h:'See how we work',p:'The method, the measurement, and the proof you can take to leadership.',link:'/why-teambeam',linkText:'How we work'}]},
    {type:'faq', h:'Things people ask', items:[
      {q:'How big can a TeamBeam experience be?',a:'Anything from a single team to a full-company event of a couple of thousand people. The run-of-show changes with the size; the planning and the follow-up stay the same.'},
      {q:'How soon can you run something?',a:'A standard in-office experience is usually two to three weeks out. Offsites and residential retreats need more lead time — tell us your date and we will be straight with you.'},
      {q:'Can you help with our CSR requirement?',a:'Yes. Our Impact &amp; CSR work is built to do real good and produce a report your CSR and ESG teams can file.'}
    ]},
    {type:'cta', h:'Tell us what you\u2019re trying to do.', p:'Tell us the goal, and we will design the experience around it.',
      cta:talkCTA}
  ]
},
{
  path:'/why-teambeam', crumb:'How we work',
  title:'How we work — the method, the measurement, the proof · TeamBeam Outings',
  desc:'We understand the team first, design the day around a real goal, run it well, and re-check at Day 14, 30 and 60 — so you get proof, not just a good memory.',
  ai:'TeamBeam works in five steps — Scan, Design, Build, Deliver, Measure — reading a team across eight dimensions before designing, then re-measuring at Day 14, 30 and 60 to prove the change held.',
  keywords:'team building method, measure team building, day 14 30 60, team health, corporate offsite ROI',
  sections:[
    {type:'hero', eyebrow:'How we work', h:'Understand the team first. Then design the day. <span class="grad">Then check it worked.</span>',
      sub:'Before we suggest a single activity, we look at how your team is really doing. That reading shapes everything after — and weeks later, we come back and measure what changed.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/what-we-do">What we do</a>`},
    {type:'steps', eyebrow:'One method under everything', h:'Scan, design, build, deliver, measure.',
      lead:'Five steps run behind every experience, whether it is a small workshop or a thousand-person event.',
      steps:[
        {h:'Scan',p:'We read the team across eight dimensions — trust, communication, alignment and more — before we plan a thing.'},
        {h:'Design',p:'A plan built for your real gap, not a stock package pulled off a shelf.'},
        {h:'Build',p:'We produce every detail end to end, in-house, so nothing is left to chance.'},
        {h:'Deliver',p:'Hosted and run so it actually lands on the day, and people can be present.'},
        {h:'Measure',p:'We re-check at Day 14, 30 and 60 and hand you the proof.'}
      ]},
    {type:'schedule', eyebrow:'The part most skip', h:'We come back and check — on a fixed schedule.',
      lead:'Most companies run a day and hope it worked. We set a baseline before the event, then measure again at three points, so the change is something you can show.',
      items:[
        {day:'Day 14',h:'First signal',p:'A quick check on what actually shifted right after the experience, while it is still fresh.'},
        {day:'Day 30',h:'Is it sticking?',p:'Whether the new habits are holding up once people are back in real work and under pressure.'},
        {day:'Day 60',h:'The proof',p:'The movement, written up in a clear report you can take to leadership.'}
      ]},
    {type:'proof', h:'You get numbers you can show your boss — not just nice photos.',
      p:'A change still visible two months later, after the team has hit normal pressure, is not enthusiasm. It is a different team. That is what we hand you: a measured shift you can defend, not a feeling you have to argue for.'},
    {type:'faq', h:'Things people ask', items:[
      {q:'What does the measurement involve for our people?',a:'Short, light check-ins — a few minutes each at Day 14, 30 and 60. We keep it simple so people actually respond, and you get a clear report at the end.'},
      {q:'Is this just a survey?',a:'No. The reading before the event shapes the design, and the follow-up tracks whether specific things changed. The point is a decision you can act on, not a satisfaction score.'},
      {q:'Do you work outside Pune?',a:'Yes. We are based in Pune and run across the major hubs — Bengaluru, Hyderabad, Mumbai, Chennai, Delhi NCR and more — plus offsites anywhere in India and abroad.'}
    ]},
    {type:'cta', h:'Tell us what you\u2019re trying to change.', p:'Not the activity — what you want to be different afterwards.',
      cta:talkCTA}
  ]
},
{
  path:'/who-we-serve', crumb:"Who it's for",
  title:"Who it's for — roles, industries & moments · TeamBeam Outings",
  desc:'From GCCs and IT to banks and factories, from CHROs to people managers, from onboarding to reorgs — TeamBeam maps to your team, your role and your moment.',
  ai:'TeamBeam serves teams by role (CXO, HR/People, L&D, managers, chiefs of staff, BU leaders), by industry (technology & GCCs, financial services, healthcare, manufacturing, retail, professional services), and by moment (onboarding, burnout recovery, restructure, kickoff, milestones, post-merger).',
  keywords:'team building for GCCs, HR team building India, industry team experiences, onboarding, offsite India',
  sections:[
    {type:'hero', eyebrow:"Who it's for", h:"Built for India's teams — <span class=\"grad\">whatever shape you're in.</span>",
      sub:'Large in-office teams, hybrid setups, fast-growing startups, teams that just merged or just lost half their people to attrition. Whatever your situation, there is a starting point that fits.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/what-we-do">What we do</a>`},
    {type:'cards', id:'roles', eyebrow:'By role', h:'A plan that fits the goal you own.', cols:3,
      lead:'Whatever seat you sit in, you get a plan shaped around what you are accountable for.',
      cards:[
        {h:'CXOs &amp; boards',p:'Retention, culture, and the health of the teams that carry the business.',link:'/who-we-serve-roles-executives',linkText:'Explore'},
        {h:'HR &amp; People leaders',p:'A program you can defend — with a measured change to show for it.',link:'/who-we-serve-roles-people-hr',linkText:'Explore'},
        {h:'People managers',p:'The team you can actually influence, and a way to shift it.',link:'/who-we-serve-roles-managers',linkText:'Explore'},
        {h:'Chiefs of staff &amp; EAs',p:'The whole thing handled end to end, so you can hand it off with confidence.',link:'/who-we-serve-roles-chiefs-of-staff-eas',linkText:'Explore'},
        {h:'Employees',p:'A day that respects your people and is genuinely worth their time.',link:'/who-we-serve-roles-employees',linkText:'Explore'}
      ]},
    {type:'cards', id:'industries', tint:true, eyebrow:'By industry', h:'Every sector has its own pressures.', cols:3,
      lead:'We have built for teams across the sectors that define India\u2019s workforce — each with its own shape and its own stakes.',
      cards:[
        {h:'Technology &amp; GCCs',p:'High-talent, high-mobility teams, and centres that must feel like one company across two continents.',link:'/who-we-serve-industries-technology',linkText:'Explore'},
        {h:'Financial services',p:'High-stakes, high-pressure teams where trust and clear decisions matter most.',link:'/who-we-serve-industries-financial-services',linkText:'Explore'},
        {h:'Healthcare &amp; life sciences',p:'Teams carrying real weight, who need genuine recovery — not just a day off.',link:'/who-we-serve-industries-healthcare',linkText:'Explore'},
        {h:'Manufacturing',p:'Large, layered teams across shifts and sites, brought together with purpose.',link:'/who-we-serve-industries-manufacturing',linkText:'Explore'},
        {h:'Media &amp; entertainment',p:'Creative teams collaborating under constant deadline.',link:'/who-we-serve-industries-media-entertainment',linkText:'Explore'},
        {h:'Professional services',p:'Billable, deadline-driven teams that rarely get the time to become a team.',link:'/who-we-serve-industries-professional-services',linkText:'Explore'},
        {h:'Retail &amp; e-commerce',p:'Fast-moving, seasonal teams that scale up and need to cohere quickly.',link:'/who-we-serve-industries-ecommerce-retail',linkText:'Explore'},
        {h:'Non-profit',p:'Mission-driven teams doing a lot with a little, who need to protect their people.',link:'/who-we-serve-industries-non-profit',linkText:'Explore'}
      ]},
    {type:'cards', id:'moments', eyebrow:'By moment', h:'We map to the moment you\u2019re in.', cols:3,
      lead:'Some experiences are for a specific turning point. We meet the team where it is.',
      cards:[
        {h:'Onboarding a cohort',p:'Make new joiners belong faster, so they contribute sooner and stay longer.',link:'/who-we-serve-moments-onboarding',linkText:'Explore'},
        {h:'Post-merger',p:'Two cultures becoming one team, on purpose rather than by hope.',link:'/who-we-serve-moments-post-merger',linkText:'Explore'},
        {h:'Restructure or reset',p:'Rebuild trust and direction after a change has unsettled everyone.',link:'/who-we-serve-moments-restructure-reset',linkText:'Explore'},
        {h:'Burnout recovery',p:'Real recovery for a team running on empty — rest that actually restores.',link:'/who-we-serve-moments-burnout-recovery',linkText:'Explore'},
        {h:'Sales kickoff',p:'Energy that survives past week one, built on a team worth staying on.',link:'/who-we-serve-moments-sales-kickoff',linkText:'Explore'},
        {h:'The annual retreat',p:'A yearly gathering that leaves people closer, not more exhausted.',link:'/who-we-serve-moments-annual-retreat',linkText:'Explore'},
        {h:'Distributed connection',p:'Building belonging for a team spread across cities and time zones.',link:'/who-we-serve-moments-distributed-team-connection',linkText:'Explore'},
        {h:'Milestones &amp; anniversaries',p:'Mark the moment so it means something, not just another party.',link:'/who-we-serve-moments-milestone-anniversary',linkText:'Explore'}
      ]},
    {type:'cta', h:'Tell us where your team is.', p:'Your role, your industry, your moment — and what you want to be different afterwards.',
      cta:talkCTA}
  ]
}
];

/* ---- offering pages (batch 1d) ---- */
function offering(o){return {path:o.path, crumb:o.crumb, title:o.title, desc:o.desc, ai:o.ai, keywords:o.keywords, sections:[
  {type:'hero', eyebrow:o.eyebrow, h:o.h, sub:o.sub, cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/what-we-do">All offerings</a>`},
  {type:'cards', eyebrow:o.cardsEyebrow||"What\u2019s inside", h:o.cardsH, lead:o.lead, cols:3, cards:o.cards},
  {type:'cta', h:o.ctaH||"Tell us what you\u2019re trying to do.", p:o.ctaP||'Tell us the goal, and we will shape it around your team.', cta:talkCTA}
]};}

PAGES.push(
offering({path:'/team-experiences', crumb:'Team Experiences',
  title:'Team Experiences — hunts, game shows, makers & more · TeamBeam Outings',
  desc:'Genuinely fun team experiences — hunts, game shows, mysteries, makers, music and more — each built around a real goal underneath the fun.',
  ai:'TeamBeam team experiences include hunts, game shows, mysteries, maker sessions, high-action and tech, music, and culinary formats, all designed around a team goal and measured afterwards.',
  keywords:'team building activities India, corporate game show, treasure hunt, team experiences',
  eyebrow:'Team Experiences', h:'Genuinely fun. <span class="grad">Quietly designed.</span>',
  sub:'The kind of day people actually talk about — with a real goal working underneath the fun.',
  cardsH:'Ways to bring a team together',
  cards:[
    {h:'Beam Hunts',p:'City and venue hunts that get a team moving, thinking and laughing together.',link:'/team-experiences-beam-hunts',linkText:'Explore'},
    {h:'Beam Arena',p:'High-energy game shows that light up a full room, from one team to a thousand.',link:'/team-experiences-beam-arena',linkText:'Explore'},
    {h:'Beam Mysteries',p:'Solve-it-together mysteries that reward listening and shared decisions.',link:'/team-experiences-beam-mysteries',linkText:'Explore'},
    {h:'Beam Makers',p:'Build and create something real, together — with something to keep at the end.',link:'/team-experiences-beam-makers',linkText:'Explore'},
    {h:'High-action &amp; tech',p:'Adrenaline and gadgets, for teams that come alive when the stakes feel real.',link:'/team-experiences-high-action-tech',linkText:'Explore'},
    {h:'Rhythm &amp; music',p:'Drumming and music that get a whole group in sync within minutes.',link:'/team-experiences-rhythm-music',linkText:'Explore'},
    {h:'Culinary',p:'Cook and eat together — the oldest team-building there is, done well.',link:'/team-experiences-culinary',linkText:'Explore'}
  ]}),
offering({path:'/impact-csr', crumb:'Impact & CSR',
  title:'Impact & CSR — give back together, file the report · TeamBeam Outings',
  desc:'Do real good as a team, meet your CSR mandate, and get an Impact Report your CSR and ESG teams can file.',
  ai:'TeamBeam Impact & CSR experiences let teams give back through environmental, build and community projects, and produce a filable CSR/ESG impact report.',
  keywords:'corporate CSR activities India, team volunteering, CSR mandate, ESG report',
  eyebrow:'Impact & CSR', h:'Give back together. <span class="grad">And file the report.</span>',
  sub:'Do real good as a team, meet your CSR mandate, and walk away with a report your CSR and ESG teams can file.',
  cardsH:'Ways to give back',
  cards:[
    {h:'Beam Green',p:'Environmental projects a team can see the result of — planting, cleaning, restoring.',link:'/impact-csr-beam-green',linkText:'Explore'},
    {h:'Beam Builds',p:'Build something a community needs, together, in a single focused day.',link:'/impact-csr-beam-builds',linkText:'Explore'},
    {h:'Beam Community',p:'Hands-on community projects matched to your people and your cause.',link:'/impact-csr-beam-community',linkText:'Explore'},
    {h:'DIY Impact Kits',p:'Self-run give-back kits for teams who want to do it in their own time.',link:'/impact-csr-diy-impact-kits',linkText:'Explore'}
  ]}),
offering({path:'/development-facilitation', crumb:'Development & Facilitation',
  title:'Development & Facilitation — turn a good day into a better team · TeamBeam Outings',
  desc:'Facilitator-led development that connects to a real gap — leadership team training, strategic workshops and more.',
  ai:'TeamBeam development and facilitation includes assessment-led development, expert facilitation, leadership team training, strategic workshops and guest experts, tied to a diagnosed gap.',
  keywords:'team facilitation India, leadership team training, strategic offsite, development workshop',
  eyebrow:'Development & Facilitation', h:'Turn a good day <span class="grad">into a better team.</span>',
  sub:'Led by facilitators who read the room — development that connects to a real gap, not a generic workshop.',
  cardsH:'Ways to develop a team',
  cards:[
    {h:'Assessment-led development',p:'Start from a reading of the team, then build the session around what it shows.',link:'/development-facilitation-assessment-led-development',linkText:'Explore'},
    {h:'Expert facilitation',p:'A skilled facilitator to hold a hard conversation and land it well.',link:'/development-facilitation-expert-facilitation',linkText:'Explore'},
    {h:'Leadership team training',p:'Work on the team that sets every other team\u2019s weather.',link:'/development-facilitation-leadership-team-training',linkText:'Explore'},
    {h:'Strategic workshops',p:'Align a group around a direction, and leave with decisions that hold.',link:'/development-facilitation-strategic-workshops',linkText:'Explore'},
    {h:'Professional excellence',p:'Focused skill-building that a team applies the next week, not someday.',link:'/development-facilitation-professional-excellence',linkText:'Explore'},
    {h:'Guest expert in residence',p:'Bring in a specialist voice for a session that needs real depth.',link:'/development-facilitation-guest-expert-in-residence',linkText:'Explore'}
  ]}),
offering({path:'/offsites-retreats', crumb:'Offsites & Retreats',
  title:'Offsites & Retreats — the whole offsite, handled · TeamBeam Outings',
  desc:'Multi-day offsites and retreats — venue, travel, experiences and debrief, planned and run end to end across India and worldwide.',
  ai:'TeamBeam plans and runs offsites and retreats end to end — venue, travel, experiences and debrief — for team programs, executive groups, and large-scale events.',
  keywords:'corporate offsite India, team retreat, offsite planning, executive retreat',
  eyebrow:'Offsites & Retreats', h:'The whole offsite, <span class="grad">handled.</span>',
  sub:'Venue, travel, experiences and debrief — planned and run end to end, so you can be present with your team instead of managing logistics.',
  cardsH:'Ways we run an offsite',
  cards:[
    {h:'Team programs',p:'A focused multi-day program built around what your team needs to shift.',link:'/offsites-retreats-team-programs',linkText:'Explore'},
    {h:'Executive experiences',p:'A considered retreat for a leadership team, run with discretion.',link:'/offsites-retreats-executive-experiences',linkText:'Explore'},
    {h:'High-energy &amp; scale',p:'Large offsites, town-halls and celebrations that hold a big group together.',link:'/offsites-retreats-high-energy-scale',linkText:'Explore'},
    {h:'Sourcing &amp; planning',p:'The venue found, the travel arranged, the run-of-show built — all handled.',link:'/offsites-retreats-sourcing-planning',linkText:'Explore'}
  ]}),
offering({path:'/beam-occasions', crumb:'Beam Occasions',
  title:'Beam Occasions — mark the moments that matter · TeamBeam Outings',
  desc:'A year-round calendar of reasons to bring people together — from new-year resets to year-end celebrations — framed so everyone feels included.',
  ai:'TeamBeam Occasions mark the moments that matter across the year — festivals, appreciation, milestones, new year and year-end — inclusively and secularly, tuned by audience and delivery mode.',
  keywords:'corporate celebrations India, employee appreciation, festival celebration at work, occasions',
  eyebrow:'Beam Occasions', h:'Mark the moments <span class="grad">that matter.</span>',
  sub:'A year-round calendar of reasons to bring people together — framed so everyone feels included, and run so it means something.',
  cardsH:'Occasions across the year',
  cards:[
    {h:'Winter holiday season',p:'Celebration and thanks for the year, framed inclusively for the whole team.',link:'/occasions-winter-holiday-season',linkText:'Explore'},
    {h:'Fall gratitude',p:'The autumn gratitude-and-togetherness moment, marked inclusively.',link:'/occasions-fall-gratitude',linkText:'Explore'},
    {h:'New year',p:'Open the year pointed the same way, with energy that lasts.',link:'/occasions-new-year',linkText:'Explore'},
    {h:'Summer &amp; mid-year',p:'Get everyone outside \u2014 and take stock at the halfway mark.',link:'/occasions-summer-mid-year',linkText:'Explore'},
    {h:'Spring reset',p:'Renewal made visible \u2014 re-energize a team as the season turns.',link:'/occasions-spring-season',linkText:'Explore'},
    {h:'Heritage &amp; culture months',p:'Employee-led culture-sharing, so a diverse team sees itself.',link:'/occasions-heritage-culture-months',linkText:'Explore'},
    {h:'National civic day',p:'A festive summer gathering, inclusive and free of politics.',link:'/occasions-national-civic-day',linkText:'Explore'},
    {h:'Employee appreciation',p:'Recognition that lands because it is specific and genuine.',link:'/occasions-employee-appreciation',linkText:'Explore'},
    {h:'Women\u2019s day &amp; inclusion',p:'Belonging, marked with meaning, not a token gesture.',link:'/occasions-womens-day',linkText:'Explore'},
    {h:'Year-end',p:'Close the year with a gathering that actually feels earned.',link:'/occasions-year-end',linkText:'Explore'}
  ]}),
offering({path:'/beam-journeys', crumb:'Beam Journeys',
  title:'Beam Journeys — explore India together · TeamBeam Outings',
  desc:'Team travel where the journey itself does the work — designed trips across India that bring a team closer.',
  ai:'TeamBeam Journeys are designed team trips across India where travel and shared experience build the team, from signature routes to wilderness and heritage.',
  keywords:'team trip India, corporate travel, team journey, India offsite destinations',
  eyebrow:'Beam Journeys', h:'Explore India together — <span class="grad">with the experience built in.</span>',
  sub:'Team travel where the journey itself does the work — designed trips that bring a team closer while they see somewhere new.',
  cardsH:'Ways to journey together',
  cards:[
    {h:'Signature cities',p:'Our best US cities for gathering a team, chosen for the goal not the guidebook.',link:'/destinations',linkText:'Destinations'},
    {h:'City escapes',p:'A short, sharp change of scene that resets a team in a couple of days.',link:'/destinations-nyc',linkText:'Explore'},
    {h:'The nature reset',p:'National parks and open country, where a team slows down and reconnects.',link:'/destinations-national-parks',linkText:'Explore'},
    {h:'Heritage &amp; ideas',p:'Places with a story, shared as a team rather than through a screen.',link:'/destinations-dc',linkText:'Explore'}
  ]}),
offering({path:'/beam-platform', crumb:'The Beam Platform',
  title:'The Beam Platform — the tech that runs the day and proves it worked · TeamBeam Outings',
  desc:'The system behind every experience — planning, live delivery, and the measurement that turns a day into a report.',
  ai:'The Beam Platform is TeamBeam\u2019s technology for planning, live event delivery, a client dashboard, and the Day 14/30/60 measurement that produces the proof.',
  keywords:'team building platform, event technology, measurement dashboard, team health tracking',
  eyebrow:'The Beam Platform', h:'The tech that runs the day — <span class="grad">and proves it worked.</span>',
  sub:'The system behind every experience: planning, live delivery, and the measurement that turns a good day into a report you can show.',
  cardsH:'What the platform does',
  cards:[
    {h:'Planning assistant',p:'Shapes the brief and the run-of-show, so nothing is left to the day.',link:'/beam-platform-planning-assistant',linkText:'Explore'},
    {h:'Live event app',p:'Runs the experience on the day — scores, prompts and flow, in one place.',link:'/beam-platform-live-event-app',linkText:'Explore'},
    {h:'Client dashboard',p:'Your view of the plan, the day and the results, in one clear place.',link:'/beam-platform-client-dashboard',linkText:'Explore'},
    {h:'Measurement &amp; proof',p:'The Day 14, 30 and 60 reading, written up as a report for leadership.',link:'/beam-platform-measurement',linkText:'Explore'},
    {h:'Always-on',p:'Keeping a team connected between events, not just on the day.',link:'/beam-platform-always-on',linkText:'Explore'}
  ]}),
offering({path:'/self-serve-kits', crumb:'Self-Serve & Kits',
  title:'Self-Serve & Kits — our design, your hands · TeamBeam Outings',
  desc:'Kits, playbooks and facilitator certification, so your own people can run a great session with the structure and debrief built in.',
  ai:'TeamBeam self-serve options include ready-to-run kits, facilitator playbooks, certification, and offsite-in-a-box, so internal teams can deliver a designed experience themselves.',
  keywords:'team building kit, facilitator playbook, run your own offsite, self-serve team building',
  eyebrow:'Self-Serve & Kits', h:'Our design. <span class="grad">Your hands.</span>',
  sub:'Not everything needs us in the room. Kits, playbooks and certification give your own people what they need to run a great session — structure and debrief built in.',
  cardsH:'Ways to run it yourself',
  cards:[
    {h:'Beam Kits',p:'Everything for a specific experience, boxed and ready to run.',link:'/self-serve-kits-beam-kits',linkText:'Explore'},
    {h:'Beam Playbook',p:'The facilitator\u2019s guide — what to say, when, and why it works.',link:'/self-serve-kits-beam-playbook',linkText:'Explore'},
    {h:'Beam Certify',p:'Train your own facilitators to deliver to our standard.',link:'/self-serve-kits-beam-certify',linkText:'Explore'},
    {h:'Offsite in a box',p:'A full day\u2019s structure your team can pick up and run on their own.',link:'/self-serve-kits-offsite-in-a-box',linkText:'Explore'}
  ]})
);

PAGES.push({
  path:'/destinations', crumb:'Where we go',
  title:'Destinations \u2014 where we run team experiences \u00b7 TeamBeam Outings',
  desc:'Signature US cities, the great national parks, and worldwide planning for distributed teams. The right place does half the work.',
  ai:'TeamBeam runs team experiences and offsites across US cities (New York, San Francisco Bay, Los Angeles, Chicago, Austin, Boston, Seattle, Denver, Washington D.C., Atlanta), the national parks, and worldwide for distributed teams.',
  keywords:'team offsite destinations USA, corporate retreat locations US, offsite cities USA, national park team retreat',
  sections:[
    {type:'hero', eyebrow:'Where we go', h:'The right place <span class="grad">does half the work.</span>',
      sub:'Signature cities across the US, the great national parks, and worldwide planning for teams spread across the map. We match the place to the goal, then handle the rest.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/offsites-retreats">Offsites &amp; retreats</a>`},
    {type:'cards', id:'cities', eyebrow:'Signature cities', h:'The cities we return to.', cols:3,
      lead:'From an efficient central hub to a premium client event, these are the US cities we know how to make the most of.',
      cards:[
        {h:'New York',p:'Iconic energy for premium events and city hunts.',link:'/destinations-nyc',linkText:'Explore'},
        {h:'San Francisco Bay',p:'The tech hub for SKOs, onsites and city days.',link:'/destinations-sf-bay',linkText:'Explore'},
        {h:'Los Angeles',p:'Media, coast and creative energy.',link:'/destinations-la',linkText:'Explore'},
        {h:'Chicago',p:'Central, connected and world-class \u2014 the easy all-hands.',link:'/destinations-chicago',linkText:'Explore'},
        {h:'Austin',p:'Culture meets tech, and a great time.',link:'/destinations-austin',linkText:'Explore'},
        {h:'Boston',p:'Heritage and ideas for serious teams.',link:'/destinations-boston',linkText:'Explore'},
        {h:'Seattle',p:'Pacific Northwest tech and the outdoors.',link:'/destinations-seattle',linkText:'Explore'},
        {h:'Denver',p:'A central gateway to the Rockies.',link:'/destinations-denver',linkText:'Explore'},
        {h:'Washington, D.C.',p:'Heritage, gravitas and premium events.',link:'/destinations-dc',linkText:'Explore'},
        {h:'Atlanta',p:'The South\u2019s business hub for scale events.',link:'/destinations-atlanta',linkText:'Explore'}
      ]},
    {type:'cards', id:'nature', tint:true, eyebrow:'The nature reset', h:'The great American outdoors.', cols:3,
      lead:'When a team needs perspective more than a city, the national parks are the most spectacular reset on earth.',
      cards:[
        {h:'National parks',p:'Yosemite, the Grand Canyon, the Tetons and beyond \u2014 the signature nature reset.',link:'/destinations-national-parks',linkText:'Explore'},
        {h:'The Rockies',p:'Denver opens straight into the high country for an adventure retreat.',link:'/destinations-denver',linkText:'Explore'},
        {h:'Pacific Northwest',p:'Seattle\u2019s mountains, forest and water for a nature journey.',link:'/destinations-seattle',linkText:'Explore'}
      ]},
    {type:'cards', id:'worldwide', eyebrow:'Worldwide', h:'Wherever your team can gather.', cols:3,
      lead:'For distributed teams, the destination is often the point of the trip. We find the right place to meet and run the days on the ground.',
      cards:[
        {h:'One place to meet',p:'A central gather-point chosen for your team\u2019s map, not ours.'},
        {h:'Planned end to end',p:'Venue, travel and run-of-show handled, so the reunion is all people feel.'},
        {h:'Run on the ground',p:'Hosted and delivered wherever you land, to the same standard.'}
      ]},
    {type:'cta', h:'Tell us where your team is \u2014 and where it could go.', p:'We will suggest the place that fits the goal, and handle everything after.',
      cta:talkCTA}
  ]
});

const ROITOOL = `
<section class="strip"><div class="tool" id="roi">
  <div class="tool__form">
    <div class="field"><label for="roi-size">Team size</label><input id="roi-size" type="number" min="1" value="50" inputmode="numeric"></div>
    <div class="field"><label for="roi-sal">Average annual salary per person ($)</label><input id="roi-sal" type="number" min="0" step="5000" value="90000" inputmode="numeric"></div>
    <div class="field"><label for="roi-attr">Current annual attrition (%)</label><input id="roi-attr" type="number" min="0" max="100" step="1" value="18" inputmode="numeric"></div>
    <div class="field"><label for="roi-eng">Team engagement today</label><select id="roi-eng"><option value="high">Mostly engaged</option><option value="mixed" selected>Mixed</option><option value="low">Largely checked-out</option></select></div>
    <div class="field"><label for="roi-seat">Roles are mostly…</label><select id="roi-seat"><option value="ind">Individual contributors</option><option value="mix" selected>A mix</option><option value="senior">Senior / specialist</option></select></div>
    <div class="field"><label for="roi-budget">Planned investment per year ($, optional)</label><input id="roi-budget" type="number" min="0" step="5000" value="25000" inputmode="numeric"></div>
  </div>
  <div class="tool__out" id="roi-out" aria-live="polite"></div>
  <details class="tool__assume"><summary>The assumptions behind this</summary><div id="roi-assume"></div></details>
  <p class="tool__note">A model to size the opportunity — not a quote, and not a claim about your business. It uses widely-cited ranges for the cost of turnover and disengagement as adjustable, conservative assumptions, not as published facts about you. Your real numbers will differ, which is exactly why we measure the actual change at Day 14, 30 and 60. Runs in your browser; nothing is saved.</p>
  <div class="hero__cta"><button class="cta cta--ghost" id="roi-copy" type="button">Copy the summary</button><a class="cta" href="/why-teambeam">See how we measure</a></div>
</div></section>
<script>
(function(){
  var ids=['roi-size','roi-sal','roi-attr','roi-eng','roi-seat','roi-budget'];
  var el={}; ids.forEach(function(i){el[i]=document.getElementById(i);});
  var out=document.getElementById('roi-out'), asm=document.getElementById('roi-assume');
  var inr=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  // seniority raises replacement cost; engagement sets the share disengaged and the loss per person
  var REPL={ind:[0.4,0.9],mix:[0.6,1.4],senior:[1.0,2.0]};
  var ENG={high:{share:0.15,loss:[0.10,0.20]},mixed:{share:0.32,loss:[0.14,0.28]},low:{share:0.52,loss:[0.18,0.34]}};
  var ENGLAB={high:'mostly-engaged',mixed:'mixed',low:'largely checked-out'};
  var SCN=[['Conservative',0.05],['Likely',0.10],['Optimistic',0.18]];
  var last='';
  function calc(){
    var n=+el['roi-size'].value||0, sal=+el['roi-sal'].value||0, attr=(+el['roi-attr'].value||0)/100,
        eng=ENG[el['roi-eng'].value]||ENG.mixed, rep=REPL[el['roi-seat'].value]||REPL.mix, budget=+el['roi-budget'].value||0;
    var dep=n*attr;
    var aLow=dep*sal*rep[0], aHigh=dep*sal*rep[1];
    var disN=n*eng.share;
    var dLow=disN*sal*eng.loss[0], dHigh=disN*sal*eng.loss[1];
    var tLow=aLow+dLow, tHigh=aHigh+dHigh, tMid=(tLow+tHigh)/2;
    var html='<div class="roi-grid">'+
      '<div class="stat"><span class="stat__k">Attrition — replacing regretted leavers</span><span class="stat__v">'+inr.format(aLow)+' &ndash; '+inr.format(aHigh)+'</span></div>'+
      '<div class="stat"><span class="stat__k">Disengagement — lost productivity (~'+Math.round(disN)+' people)</span><span class="stat__v">'+inr.format(dLow)+' &ndash; '+inr.format(dHigh)+'</span></div></div>'+
      '<div class="stat stat--total"><span class="stat__k">Estimated annual cost of the status quo</span><span class="stat__v grad">'+inr.format(tLow)+' &ndash; '+inr.format(tHigh)+'</span></div>';
    html+='<p class="roi-sub">What recovering part of that is worth each year:</p><div class="roi-scn">';
    SCN.forEach(function(s){ html+='<div class="scn"><span class="scn__k">'+s[0]+' ('+(s[1]*100)+'%)</span><span class="scn__v">'+inr.format(tMid*s[1])+'</span></div>'; });
    html+='</div>';
    var likely=tMid*0.10;
    if(budget>0){
      var pct=tMid>0?Math.max(0,Math.min(100,budget/tMid*100)):0;
      html+='<p class="tool__read">Your investment of '+inr.format(budget)+' pays for itself if it recovers about <b>'+pct.toFixed(1)+'%</b> of the estimated cost. At the <b>likely</b> case ('+inr.format(likely)+' a year), it '+(likely>=budget?'more than covers itself.':'is well on the way to covering itself.')+'</p>';
    }
    out.innerHTML=html;
    last='TeamBeam ROI estimate — team of '+n+', '+ENGLAB[el['roi-eng'].value]+'.\\n'
      +'Estimated annual cost of the status quo: '+inr.format(tLow)+' to '+inr.format(tHigh)+'.\\n'
      +'Value of recovering part of it: Conservative '+inr.format(tMid*0.05)+', Likely '+inr.format(tMid*0.10)+', Optimistic '+inr.format(tMid*0.18)+'.\\n'
      +(budget>0?('Planned investment: '+inr.format(budget)+'.\\n'):'')
      +'A model estimate, not a quote — TeamBeam measures the real change at Day 14/30/60.';
    asm.innerHTML='<ul>'
      +'<li><b>Turnover cost.</b> Replacing a departure is widely estimated at roughly half to twice annual salary depending on seniority (recruiting, ramp-up, lost momentum). We use '+(rep[0]*100)+'\u2013'+(rep[1]*100)+'% here.</li>'
      +'<li><b>Disengagement.</b> Engagement research consistently links checked-out employees to materially lower productivity. We assume about '+Math.round(eng.share*100)+'% of a '+ENGLAB[el['roi-eng'].value]+' team is disengaged, each losing '+(eng.loss[0]*100)+'\u2013'+(eng.loss[1]*100)+'% of salary in output.</li>'
      +'<li><b>Recovery.</b> A measured program is modeled to recover 5\u201318% of the total. All figures are conservative, adjustable assumptions you can weigh — not published statistics about your company.</li></ul>';
  }
  document.getElementById('roi-copy').addEventListener('click',function(){
    if(!last)return; var b=this;
    (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(last):Promise.reject()).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy the summary';},1600);}).catch(function(){b.textContent='Select & copy above';});
  });
  ids.forEach(function(i){el[i].addEventListener('input',calc);el[i].addEventListener('change',calc);});
  calc();
})();
</script>`;

PAGES.push(
{
  path:'/resources', crumb:'Tools',
  title:'Tools — size the opportunity before you talk to us · TeamBeam Outings',
  desc:'Free tools to size the opportunity and shape the brief — an ROI calculator, a team-health self-check, and an idea generator.',
  ai:'TeamBeam offers free planning tools: an ROI calculator that sizes the cost of disengagement and attrition, a Team Health Snapshot self-check across eight dimensions, and an Idea Generator.',
  keywords:'team building ROI calculator, team health check, offsite idea generator, HR tools India',
  sections:[
    {type:'hero', eyebrow:'Tools', h:'Think it through <span class="grad">before you talk to us.</span>',
      sub:'A few tools to size the opportunity and shape the brief. Free, and no sign-up.',
      cta:`<a class="cta" href="/resources-tools-offsite-roi-calculator">Open the ROI calculator</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`},
    {type:'cards', eyebrow:'The tools', h:'Start with a question.', cols:3,
      cards:[
        {h:'ROI calculator',p:'Size what a disengaged, higher-attrition team costs — and what a measured change is worth.',link:'/resources-tools-offsite-roi-calculator',linkText:'Open the calculator'},
        {h:'Team Health Snapshot',p:'A short self-check across the eight dimensions of a healthy team, with the one to focus on.',link:'/resources-tools-team-health-snapshot',linkText:'Take the snapshot'},
        {h:'Idea Generator',p:'A starting point for the kind of experience your team needs, matched to your goal.',link:'/resources-tools-idea-generator',linkText:'Get an idea'}
      ]},
    {type:'cta', h:'Rather just talk it through?', p:'Tell us what you\u2019re trying to change, and we will take it from there.',
      cta:talkCTA}
  ]
},
{
  path:'/resources-tools-offsite-roi-calculator', crumb:'ROI calculator',
  title:'Team ROI calculator — the cost of a disengaged team · TeamBeam Outings',
  desc:'A free calculator that sizes the annual cost of disengagement and attrition on your team, and what a measured improvement could be worth.',
  ai:'The TeamBeam ROI calculator estimates the annual cost of disengagement and regretted attrition for a team, using transparent adjustable assumptions, and shows the potential value of a measured improvement and the break-even on an investment.',
  keywords:'team building ROI calculator India, cost of employee disengagement, attrition cost calculator, offsite ROI',
  sections:[
    {type:'hero', eyebrow:'Tools · ROI calculator', h:'What is a disengaged team <span class="grad">actually costing you?</span>',
      sub:'Put in a few numbers and see the annual cost of disengagement and attrition — and what recovering even part of it is worth. Everything updates as you type.'},
    {type:'raw', html:ROITOOL},
    {type:'faq', h:'About this calculator', items:[
      {q:'Where do the numbers come from?',a:'From transparent, conservative assumptions you can see and weigh — not published statistics. The tool is a way to size the opportunity, not a promise. The real figure is the one we measure at Day 14, 30 and 60.'},
      {q:'Is my data stored?',a:'No. The calculator runs entirely in your browser. Nothing you type is sent or saved.'}
    ]},
    {type:'cta', h:'Now let\u2019s make the number real.', p:'Tell us what you\u2019re trying to change, and we will design for it — and measure it.',
      cta:talkCTA}
  ]
});

const DIMS=[
  ['Trust',['People admit mistakes and ask for help without worrying it will be used against them.','People give each other the benefit of the doubt rather than assuming the worst.']],
  ['Communication',['The important things get said — including the hard ones — and they land.','Bad news reaches the right people early, not after it is too late to act.']],
  ['Alignment',['Everyone could tell you the same top priority right now.','Day-to-day work clearly connects to where the team is trying to go.']],
  ['Collaboration',['People build on each other\u2019s work rather than running in parallel.','Handoffs between people and functions are smooth, not a source of friction.']],
  ['Decision-making',['We make decisions, and they stay made.','It is clear who decides what, so decisions do not stall.']],
  ['Energy',['The team has the capacity to take on what is in front of it.','People are not running on empty or quietly heading for burnout.']],
  ['Belonging',['Everyone feels part of the team, not adjacent to it.','New and quieter voices are heard, not just the loudest few.']],
  ['Leadership',['The people leading create the conditions for the rest to do their best work.','Leaders model the honesty and behaviour they ask for.']]
];
const DIMLINK={Trust:'/trust-inside-a-team/',Belonging:'/onboarding-at-scale-belong-faster/',Leadership:'/the-leadership-team-sets-the-weather/'};
const DIMGUIDE={
  Trust:'Build the safety to be honest before anything else — it is the dimension the other seven lean on.',
  Communication:'Create the habit and the moments for the hard message to be said and heard.',
  Alignment:'Get everyone genuinely pointed the same way; busy and aligned are not the same thing.',
  Collaboration:'Smooth the seams between people and functions who have to work together.',
  'Decision-making':'Make ownership clear so decisions get made and stay made.',
  Energy:'Address the load before you add to it — a tired team needs recovery, not a competition.',
  Belonging:'Make sure everyone, not just the loudest, feels part of it.',
  Leadership:'Work with the team that sets every other team\u2019s weather.'
};
const SNAPSHOT = `
<section class="strip"><div class="tool" id="ths">
  <div class="ths__qs">${DIMS.map(([d,qs])=>`<div class="ths__dim"><div class="ths__dim-h">${d}</div>${qs.map((q,j)=>`<div class="ths__q"><label for="ths-${d.replace(/[^a-z]/gi,'')}-${j}">${q}</label><input id="ths-${d.replace(/[^a-z]/gi,'')}-${j}" class="ths__range" type="range" min="1" max="5" value="3" data-dim="${d}"><div class="ths__scale"><span>Rarely true</span><span>Always true</span></div></div>`).join('')}</div>`).join('')}</div>
  <button class="cta" id="ths-go" type="button">See the snapshot</button>
  <div class="tool__out" id="ths-out" aria-live="polite"></div>
  <p class="tool__note">A structured self-check to get you thinking — not a diagnosis. It is adapted from established team-effectiveness thinking; the full, proper reading is the one we take before we design. It runs in your browser; nothing is saved.</p>
</div></section>
<script>
(function(){
  var LINK=${JSON.stringify(DIMLINK)}, GUIDE=${JSON.stringify(DIMGUIDE)}, BLOG='${CFG.homes.blog}', DEF='/the-eight-dimensions-of-a-healthy-team/';
  var rs=[].slice.call(document.querySelectorAll('.ths__range'));
  var out=document.getElementById('ths-out');
  function band(v){return v>=4?['Strong','b-strong']:v>=3?['Developing','b-dev']:['Fragile','b-frag'];}
  document.getElementById('ths-go').addEventListener('click',function(){
    var agg={};
    rs.forEach(function(r){var d=r.getAttribute('data-dim');(agg[d]=agg[d]||[]).push(+r.value);});
    var dims=Object.keys(agg).map(function(d){var a=agg[d];var avg=a.reduce(function(x,y){return x+y;},0)/a.length;return {d:d,v:avg};});
    var overall=dims.reduce(function(s,x){return s+x.v;},0)/dims.length;
    var sorted=dims.slice().sort(function(a,b){return a.v-b.v;});
    var focus=sorted[0], second=sorted[1], high=sorted[sorted.length-1];
    var ob=band(overall);
    var bars=dims.map(function(x){var bb=band(x.v);return '<div class="bar"><span class="bar__k">'+x.d+'</span><div class="bar__track"><div class="bar__fill" style="width:'+(x.v/5*100)+'%"></div></div><span class="bar__band '+bb[1]+'">'+bb[0]+'</span></div>';}).join('');
    var link=BLOG+(LINK[focus.d]||DEF);
    out.innerHTML='<div class="stat stat--total"><span class="stat__k">Overall team health</span><span class="stat__v grad">'+overall.toFixed(1)+' / 5 · '+ob[0]+'</span></div>'+
      '<div class="bars">'+bars+'</div>'+
      '<p class="tool__read">Your team looks strongest on <b>'+high.d+'</b>. The two dimensions worth attention first are <b>'+focus.d.toLowerCase()+'</b> and <b>'+second.d.toLowerCase()+'</b>. '+(GUIDE[focus.d]||'')+'</p>'+
      '<div class="hero__cta"><a class="cta" href="'+link+'">Read about '+focus.d.toLowerCase()+' &#8599;</a><a class="cta cta--ghost" href="mailto:${CFG.email}">Talk to us</a></div>';
    out.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();
</script>`;

const IDEA = `
<section class="strip"><div class="tool" id="idea">
  <div class="tool__form">
    <div class="field"><label for="idea-size">Team size</label><input id="idea-size" type="number" min="1" value="30" inputmode="numeric"></div>
    <div class="field"><label for="idea-mode">Where</label><select id="idea-mode"><option value="office">In our office / a venue nearby</option><option value="away">Away together</option><option value="online">Online, across cities</option></select></div>
    <div class="field"><label for="idea-goal">What are you trying to do?</label><select id="idea-goal"><option value="trust">Build trust</option><option value="communication">Improve communication</option><option value="reenergise">Re-energise a tired team</option><option value="celebrate">Celebrate a milestone</option><option value="onboard">Onboard new joiners</option><option value="giveback">Give back / CSR</option></select></div>
    <div class="field"><label for="idea-energy">Energy</label><select id="idea-energy"><option value="calm">Calm and reflective</option><option value="balanced" selected>Balanced</option><option value="high">High and lively</option></select></div>
  </div>
  <button class="cta" id="idea-go" type="button">Suggest something</button>
  <div class="tool__out" id="idea-out" aria-live="polite"></div>
  <p class="tool__note">A starting point, not a fixed menu. Tell us the goal and we design around your actual team.</p>
</div></section>
<script>
(function(){
  var OFF={
    trust:['Development & Facilitation','/development-facilitation','A facilitated session that builds the safety to be honest, cemented by a shared experience.'],
    communication:['Development & Facilitation','/development-facilitation','A workshop that surfaces where communication breaks, with practice that carries back to work.'],
    reenergise:['Team Experiences','/team-experiences','A high-spirit experience designed to restore a tired team, not drain it further.'],
    celebrate:['Beam Occasions','/beam-occasions','An occasion built around the milestone, framed so everyone feels part of it.'],
    onboard:['Team Experiences','/team-experiences','An experience that helps new joiners belong faster, so they contribute sooner.'],
    giveback:['Impact & CSR','/impact-csr','A give-back project that does real good and produces a report you can file.']
  };
  var MODE={office:'run in your workplace or a venue in your city — half a day, no travel.',away:'taken off-site — a day trip nearby or a full residential offsite.',online:'live-hosted online with kits posted to every home, for a team across cities.'};
  var out=document.getElementById('idea-out');
  document.getElementById('idea-go').addEventListener('click',function(){
    var mode=document.getElementById('idea-mode').value, goal=document.getElementById('idea-goal').value, n=+document.getElementById('idea-size').value||0;
    var o=OFF[goal]||OFF.reenergise;
    var second = mode==='away' ? ['Offsites & Retreats','/offsites-retreats','Since you are going away, we can handle the whole offsite — venue, travel and run-of-show.'] : ['How we measure','/why-teambeam','Whatever we run, we read the team first and measure the change at Day 14, 30 and 60.'];
    function card(t,l,p){return '<a class="card" href="'+l+'"><span class="card__edge"></span><h3>'+t+'</h3><p>'+p+'</p><span class="card__link">Explore &rarr;</span></a>';}
    out.innerHTML='<p class="tool__read">For a team of about '+n+', we\\u2019d '+MODE[mode]+'</p>'+
      '<div class="cards cards--3">'+card(o[0],o[1],o[2])+card(second[0],second[1],second[2])+'</div>'+
      '<div class="hero__cta"><a class="cta" href="mailto:${CFG.email}">Talk to us about this</a></div>';
    out.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();
</script>`;

PAGES.push(
{
  path:'/resources-tools-team-health-snapshot', crumb:'Team Health Snapshot',
  title:'Team Health Snapshot — a quick eight-dimension self-check · TeamBeam Outings',
  desc:'A short, free self-check across the eight dimensions of a healthy team — trust, communication, alignment and more — that shows the one to focus on first.',
  ai:'The TeamBeam Team Health Snapshot is a quick self-assessment across eight dimensions (trust, communication, alignment, collaboration, decision-making, energy, belonging, leadership) that highlights a team\u2019s strongest dimension and the one to focus on.',
  keywords:'team health check, team assessment, eight dimensions of a team, team self-assessment India',
  sections:[
    {type:'hero', eyebrow:'Tools · Team Health Snapshot', h:'Where is your team <span class="grad">actually strong?</span>',
      sub:'Rate your team on eight quick statements and see where it stands — and the one dimension worth attention first.'},
    {type:'raw', html:SNAPSHOT},
    {type:'cta', h:'Want the real reading?', p:'This is a self-check. Before we design anything, we read your team properly across these eight dimensions.',
      cta:talkCTA}
  ]
},
{
  path:'/resources-tools-idea-generator', crumb:'Idea Generator',
  title:'Idea Generator — the right experience for your team · TeamBeam Outings',
  desc:'Tell us your team size, where you want to gather, and what you are trying to do — and get a starting point matched to the goal.',
  ai:'The TeamBeam Idea Generator suggests experience directions based on team size, delivery mode (in-office, away, online) and goal (build trust, improve communication, re-energize, celebrate, onboard, give back).',
  keywords:'team building ideas India, offsite ideas, team activity suggestions, corporate event ideas',
  sections:[
    {type:'hero', eyebrow:'Tools · Idea Generator', h:'Not sure where to start? <span class="grad">Start here.</span>',
      sub:'Tell us the shape of your team and what you are trying to do, and we will point you to the right kind of experience.'},
    {type:'raw', html:IDEA},
    {type:'cta', h:'Like where this is going?', p:'Tell us the goal and we will design the real thing around your team.',
      cta:talkCTA}
  ]
});

const CONTACTCARD = `
<section class="strip"><div class="contactcard">
  <div class="contactcard__row"><span class="eyebrow">Email</span><a class="contactcard__big" href="mailto:${CFG.email}">${CFG.email}</a></div>
  <div class="contactcard__row"><span class="eyebrow">Call</span><a class="contactcard__big" href="tel:${CFG.phone.replace(/[^+\d]/g,'')}">${esc(CFG.phone)}</a></div>
  <div class="contactcard__row"><span class="eyebrow">Visit</span><a class="contactcard__addr" href="${CFG.mapsUrl}" rel="noopener">${esc(CFG.address)}</a></div>
  <div class="contactcard__row"><span class="eyebrow">In the United States</span><a class="contactcard__addr" href="${CFG.homes.us}">teambeam.us — our home there</a></div>
</div></section>`;

PAGES.push(
{
  path:'/about', crumb:'About',
  title:'About — one business, two homes, one idea · TeamBeam Outings',
  desc:'TeamBeam Outings designs, delivers and measures corporate team experiences across India and worldwide, with a home in the USA. Understand the team first; measure what changed.',
  ai:'TeamBeam Outings is a corporate team-experience company operating as one business with two homes — teambeam.in (India and worldwide) and teambeam.us (USA). It works diagnostic-first and measures outcomes at Day 14, 30 and 60.',
  keywords:'about TeamBeam, corporate team building company India, team experience company Pune',
  sections:[
    {type:'hero', eyebrow:'About', h:'One business. Two homes. <span class="grad">One idea.</span>',
      sub:'We design, deliver and measure corporate team experiences — in India and worldwide, with a home in the USA at teambeam.us.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`},
    {type:'lead', t:'We built TeamBeam because most team events are forgotten by Friday, and nobody can say if they helped. We wanted to do it the other way around — understand the team first, build the day around a real goal, and come back afterwards to see what changed.'},
    {type:'cards', eyebrow:'What makes us us', h:'A few things we do differently.', cols:3,
      cards:[
        {h:'Diagnostic-first',p:'We read the team before we design anything, so the day fits the real gap.'},
        {h:'Measured',p:'We check at Day 14, 30 and 60, so you get proof rather than a memory.'},
        {h:'No forced fun',p:'Calm, real and built for grown-ups. Every minute has a point.'},
        {h:'One team worldwide',p:'India or the USA, the same practice and the same people, wherever you gather.'}
      ]},
    {type:'cta', h:'Want to work with us?', p:'Tell us what you\u2019re trying to change, and we will take it from there.',
      cta:talkCTA}
  ]
},
{
  path:'/careers', crumb:'Careers',
  title:'Careers — do work that leaves a team different · TeamBeam Outings',
  desc:'We hire for craft over credentials — facilitators, experience designers and operators who can read a room and pull off a flawless day. See what we look for and how to apply.',
  ai:'TeamBeam hires facilitators, experience designers, and operations & logistics people, valuing craft over credentials. Candidates apply by email to start@teambeam.in.',
  keywords:'TeamBeam careers, facilitator jobs India, experience designer, event operations jobs Pune',
  sections:[
    {type:'hero', eyebrow:'Careers', h:'Do work that leaves a team <span class="grad">different from how it arrived.</span>',
      sub:'We hire for craft over credentials — people who can read a room, hold a group, and pull off a flawless day.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Working%20with%20TeamBeam">Send us a note</a><a class="cta cta--ghost" href="/about">About us</a>`},
    {type:'lead', t:'We care less about your titles than what you can do in a room. If you love designing a moment, reading the energy, and getting out of the way at the right time, we should talk — whatever your background.'},
    {type:'cards', eyebrow:'Where we hire', h:'The people who make the day work.', cols:3,
      cards:[
        {h:'Facilitators',p:'Read a room in real time, hold a group so people feel safe, and know when to say less.'},
        {h:'Experience designers',p:'Turn a real goal into a run-of-show that lands, down to the last detail.'},
        {h:'Operations &amp; logistics',p:'Make the impossible day happen quietly — venues, travel, kit, timing.'},
        {h:'Guest experts',p:'Specialist voices for sessions that need genuine depth.'}
      ]},
    {type:'cta', eyebrow:'How to apply', h:'Tell us what you\u2019re great at.',
      p:'A short note about what you do and a moment you are proud of goes a long way. No forms, no fuss.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Careers%20%E2%80%94%20I%27d%20like%20to%20work%20with%20TeamBeam">Write to ${CFG.email}</a>`}
  ]
},
{
  path:'/partnerships', crumb:'Partnerships',
  title:'Partnerships — venues, experiences & specialists · TeamBeam Outings',
  desc:'We work with venues, experience providers and specialists who share our standard. See what we look for in a partner and how to work with us.',
  ai:'TeamBeam partners with venues, experience providers, specialist facilitators and suppliers who meet its standard of reliability and quality. Partners apply by email to start@teambeam.in.',
  keywords:'TeamBeam partnerships, venue partner, experience provider, corporate event vendors India',
  sections:[
    {type:'hero', eyebrow:'Partners', h:'Great days need <span class="grad">great partners.</span>',
      sub:'Venues, experience providers and specialists who share our standard — measured, reliable, and genuinely good at what they do.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Partnership%20with%20TeamBeam">Partner with us</a><a class="cta cta--ghost" href="/what-we-do">What we do</a>`},
    {type:'lead', t:'We are selective, because our name is on the day. What we look for is simple: you are excellent at one thing, you are dependable when it matters, and you care about the people in the room as much as we do.'},
    {type:'cards', eyebrow:'Who we work with', h:'Ways to partner.', cols:3,
      cards:[
        {h:'Venue partners',p:'Spaces and properties across India and worldwide that make an offsite effortless.'},
        {h:'Experience partners',p:'Providers with a genuinely good activity we can design a real goal into.'},
        {h:'Specialist facilitators',p:'Independent facilitators who deliver to a high, consistent standard.'},
        {h:'Suppliers',p:'Production, travel and logistics partners who make the complex look calm.'}
      ]},
    {type:'cta', eyebrow:'Work with us', h:'Tell us what you do best.',
      p:'Send a short note about your space, service or specialism, and where you operate.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Partnership%20%E2%80%94%20let%27s%20work%20together">Write to ${CFG.email}</a>`}
  ]
},
{
  path:'/contact', crumb:'Contact',
  title:'Contact — tell us what you\u2019re trying to change · TeamBeam Outings',
  desc:'Talk to TeamBeam Outings. Email, call, or visit us in Pune — and find our US home at teambeam.us. Tell us the goal, and we will design around it.',
  ai:'Contact TeamBeam Outings by email (start@teambeam.in), phone (+91 75175 00777), or at Futura, Magarpatta, Hadapsar, Pune 411013. US enquiries: teambeam.us.',
  keywords:'contact TeamBeam, team building enquiry Pune, corporate offsite contact India',
  sections:[
    {type:'hero', eyebrow:'Contact', h:'Tell us what you\u2019re <span class="grad">trying to change.</span>',
      sub:'Not the activity you want — what you want to be different afterwards. We will take it from there. No hard sell, just a real conversation about your team.'},
    {type:'raw', html:CONTACTCARD},
    {type:'cta', h:'Start the conversation.', p:'A line about your team and your goal is all we need to begin.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Let%27s%20talk%20about%20our%20team">Write to us</a>`}
  ]
});

const LEGAL_UPDATED = 'This statement was last reviewed in ' + new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'}) + '.';
PAGES.push(
{
  path:'/why-teambeam-the-method', crumb:'The method',
  title:'The method — scan, design, build, deliver, measure · TeamBeam Outings',
  desc:'The five steps behind every TeamBeam experience — read the team, design for the real gap, build it, deliver it well, and measure what changed.',
  ai:'TeamBeam\u2019s method has five steps: Scan (read the team across eight dimensions), Design (build for the real gap), Build (produce end to end), Deliver (host and run it), Measure (re-check at Day 14, 30 and 60).',
  keywords:'team building method, diagnostic team building, scan design build deliver measure',
  sections:[
    {type:'hero', eyebrow:'How we work · The method', h:'Five steps behind <span class="grad">every experience.</span>',
      sub:'The same method runs behind a small workshop and a thousand-person event. It is what turns a good day into a change that holds.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam-measurement-impact">Measurement &amp; proof</a>`},
    {type:'lead', t:'Most team events are chosen backwards — an activity is booked, then everyone hopes it fits. We reverse the order. We read the team first, and every step after follows from what we find.'},
    {type:'steps', eyebrow:'The five steps', h:'In order, and for a reason.',
      steps:[
        {h:'Scan',p:'We read the team across eight dimensions — trust, communication, alignment and more — before we plan a thing.'},
        {h:'Design',p:'We design for the specific gap the reading reveals, not a package pulled off a shelf.'},
        {h:'Build',p:'We produce every detail end to end, in-house, so nothing is left to chance on the day.'},
        {h:'Deliver',p:'We host and run it so it lands, and so your people can simply be present.'},
        {h:'Measure',p:'We re-check at Day 14, 30 and 60, and hand you the proof of what changed.'}
      ]},
    {type:'faq', h:'About the method', items:[
      {q:'Why read the team before designing?',a:'Because the activity a team enjoys and the thing a team needs are often different. Reading first is what makes the design fit — and what makes the result measurable.'},
      {q:'Does this work at scale?',a:'Yes. The run-of-show changes with the size, but the five steps are the same for a single team and a full-company event.'}
    ]},
    {type:'cta', h:'Tell us what you\u2019re trying to change.', p:'We will read the team, then design for it.', cta:talkCTA}
  ]
},
{
  path:'/why-teambeam-measurement-impact', crumb:'Measurement & proof',
  title:'Measurement & proof — Day 14, 30 and 60 · TeamBeam Outings',
  desc:'We set a baseline before an experience, then measure again at Day 14, 30 and 60 — so the change is something you can show, not something to take on faith.',
  ai:'TeamBeam measures team health before an experience and again at Day 14, 30 and 60, producing a report that shows what changed and whether it held.',
  keywords:'measure team building, team building ROI, day 14 30 60, team health measurement India',
  sections:[
    {type:'hero', eyebrow:'How we work · Measurement & proof', h:'The part most skip: <span class="grad">we come back.</span>',
      sub:'Most companies run a day and hope it worked. We set a baseline before, then measure again on a fixed schedule — so you get proof rather than a memory.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam-the-method">The method</a>`},
    {type:'schedule', eyebrow:'The schedule, every time', h:'Three readings after the day.',
      lead:'The day is the intervention. What is still true weeks later is the result. So we read at three points, and the shape of the curve tells us what happened.',
      items:[
        {day:'Day 14',h:'First signal',p:'What actually shifted right after the experience, once the glow has settled.'},
        {day:'Day 30',h:'Is it sticking?',p:'Whether the change holds once the team is back under real pressure.'},
        {day:'Day 60',h:'The proof',p:'Whether it has become the new normal — written up as a report for leadership.'}
      ]},
    {type:'cards', eyebrow:'What we read', h:'Eight dimensions of a healthy team.', cols:3,
      lead:'We read the same eight dimensions before and after. We keep how the reading is taken to ourselves; what matters is that the change is real, and visible over time.',
      cards:[
        {h:'Trust · Communication',p:'Whether people can be honest, and whether the important things travel.'},
        {h:'Alignment · Collaboration',p:'Whether the team is pointed the same way and building on each other.'},
        {h:'Decision-making · Energy',p:'Whether decisions stick, and whether the team has the capacity to act.'},
        {h:'Belonging · Leadership',p:'Whether people feel part of it, and whether leaders set the right conditions.'}
      ]},
    {type:'proof', h:'Numbers you can show your boss — not just nice photos.',
      p:'A change still visible two months later, after normal pressure, is not enthusiasm. It is a different team. That is what we hand you: a measured shift you can defend.'},
    {type:'cta', h:'Make the change measurable.', p:'Tell us the goal, and we will show you what moved.', cta:talkCTA}
  ]
},
{
  path:'/why-teambeam-results', crumb:'Results',
  title:'Results — a change you can put in front of a board · TeamBeam Outings',
  desc:'Not photos — a measured shift in how a team works, and a clear report that explains it. Here is what results with TeamBeam look like.',
  ai:'TeamBeam results are presented as a measured movement in team health across eight dimensions, written up in a report leadership can act on — not just event photos.',
  keywords:'team building results, prove an offsite worked, team health report',
  sections:[
    {type:'hero', eyebrow:'How we work · Results', h:'A change you can <span class="grad">put in front of a board.</span>',
      sub:'Not photos, and not a feeling you have to argue for — a measured shift in how a team works, and a report that explains it.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam-measurement-impact">How we measure</a>`},
    {type:'cards', eyebrow:'What you get', h:'Proof, in a form you can use.', cols:3,
      cards:[
        {h:'A movement',p:'A before-and-after across the dimensions that mattered for your goal.'},
        {h:'A report',p:'Written up clearly, so it belongs on the same slide as the numbers.'},
        {h:'A next step',p:'A read on what to reinforce next — so each experience makes the next one sharper.'}
      ]},
    {type:'proof', h:'The result is what is still true in two months.',
      p:'We would rather show you a smaller change that held than a big day that faded. That is the whole point of measuring: to know the difference.'},
    {type:'cta', h:'Let\u2019s make it real.', p:'Tell us what you want to be different, and we will design and measure for it.', cta:talkCTA}
  ]
},
{
  path:'/occasions', crumb:'Occasions',
  title:'Occasions — a year-round calendar of reasons to gather · TeamBeam Outings',
  desc:'From new-year resets to year-end celebrations, festivals to appreciation days — a year-round calendar of reasons to bring your team together, framed so everyone feels included.',
  ai:'TeamBeam Occasions cover the year — festivals of light and colour, appreciation days, women\u2019s day, national and heritage days, new year and year-end — marked inclusively and secularly.',
  keywords:'corporate occasions calendar India, festival celebration at work, employee appreciation day, year-end party',
  sections:[
    {type:'hero', eyebrow:'Occasions', h:'Mark the moments <span class="grad">that matter.</span>',
      sub:'A year-round calendar of reasons to bring people together — framed so everyone feels included, and run so it means something.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/beam-occasions">Beam Occasions</a>`},
    {type:'cards', eyebrow:'Across the year', h:'Reasons to gather, all year long.', cols:3,
      cards:[
        {h:'Winter holiday season',p:'Celebration and thanks for the year, framed inclusively for the whole team.',link:'/occasions-winter-holiday-season',linkText:'Explore'},
        {h:'Fall gratitude',p:'The autumn gratitude-and-togetherness moment, marked inclusively.',link:'/occasions-fall-gratitude',linkText:'Explore'},
        {h:'New year',p:'Open the year pointed the same way, with energy that lasts.',link:'/occasions-new-year',linkText:'Explore'},
        {h:'Summer &amp; mid-year',p:'Get everyone outside \u2014 and take stock at the halfway mark.',link:'/occasions-summer-mid-year',linkText:'Explore'},
        {h:'Spring reset',p:'Renewal made visible \u2014 re-energize a team as the season turns.',link:'/occasions-spring-season',linkText:'Explore'},
        {h:'Heritage &amp; culture months',p:'Employee-led culture-sharing, so a diverse team sees itself.',link:'/occasions-heritage-culture-months',linkText:'Explore'},
        {h:'National civic day',p:'A festive summer gathering, inclusive and free of politics.',link:'/occasions-national-civic-day',linkText:'Explore'},
        {h:'Employee appreciation',p:'Recognition that lands because it is specific and genuine.',link:'/occasions-employee-appreciation',linkText:'Explore'},
        {h:'Women\u2019s day &amp; inclusion',p:'Belonging, marked with meaning, not a token gesture.',link:'/occasions-womens-day',linkText:'Explore'},
        {h:'Year-end',p:'Close the year with a gathering that actually feels earned.',link:'/occasions-year-end',linkText:'Explore'}
      ]},
    {type:'cta', h:'Which moment is coming up?', p:'Tell us the occasion, and we will make it one people remember.', cta:talkCTA}
  ]
},
{
  path:'/volunteer', crumb:'Volunteer',
  title:'Volunteer — give back with your team · TeamBeam Outings',
  desc:'Ways for your team to give back — employee volunteering and CSR projects that do real good and produce a report you can file.',
  ai:'TeamBeam runs employee volunteering and give-back projects as part of its Impact & CSR work, producing a filable report.',
  keywords:'employee volunteering India, corporate volunteering, CSR team activity',
  sections:[
    {type:'hero', eyebrow:'Volunteer', h:'Give back — <span class="grad">together.</span>',
      sub:'Bring your team to a project that does real good, and walk away with a report your CSR and ESG teams can file.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/impact-csr">Impact &amp; CSR</a>`},
    {type:'lead', t:'The best give-back days are the ones a team can see the result of. We match your people to a cause and a project that fits, run it well, and document the impact.'},
    {type:'cta', h:'Want to give back with your team?', p:'Tell us your cause and your numbers, and we will build the day.', cta:talkCTA}
  ]
},
{
  path:'/privacy', crumb:'Privacy',
  title:'Privacy · TeamBeam Outings',
  desc:'How TeamBeam Outings handles the limited personal information you share with us.',
  ai:'TeamBeam Outings privacy statement: the site collects minimal information; personal data shared by email is used only to respond to enquiries.',
  sections:[
    {type:'hero', eyebrow:'Privacy', h:'Your information, handled simply.',
      sub:'We keep this short because we keep it minimal.'},
    {type:'prose', blocks:[
      {h:'What we collect',p:'This website does not use sign-up forms. If you email or call us, we receive what you choose to share — your name, contact details, and what you tell us about your team. The site may use privacy-respecting analytics to understand traffic; it is not used to track you across the web.'},
      {h:'How we use it',p:'Only to respond to your enquiry and, if you become a client, to plan and run your experience. We do not sell your information, and we do not share it except with the partners needed to deliver what you have asked for.'},
      {h:'Your rights',p:'You can ask us what we hold about you, to correct it, or to delete it. Write to <a href="mailto:'+CFG.email+'">'+CFG.email+'</a> and we will act on it.'},
      {h:'Retention',p:'We keep enquiry information only as long as needed to help you, then remove it.'},
      {p:LEGAL_UPDATED+' This is a plain-language summary; if you need a formal policy for procurement, write to us and we will provide one.'}
    ]}
  ]
},
{
  path:'/terms', crumb:'Terms',
  title:'Terms · TeamBeam Outings',
  desc:'The terms for using the TeamBeam Outings website.',
  ai:'TeamBeam Outings website terms of use.',
  sections:[
    {type:'hero', eyebrow:'Terms', h:'Using this website.'},
    {type:'prose', blocks:[
      {h:'This site',p:'This website is provided for information about TeamBeam Outings and our services. We work to keep it accurate, but we do not warrant that everything is complete or current at all times.'},
      {h:'Our content',p:'The text, design and marks on this site — including the TeamBeam name and logo — belong to us. Please do not reproduce them without permission.'},
      {h:'Engaging us',p:'Nothing on this site is a binding offer. Any work we do together is governed by the specific proposal and agreement we share with you.'},
      {p:LEGAL_UPDATED+' Questions? Write to <a href="mailto:'+CFG.email+'">'+CFG.email+'</a>.'}
    ]}
  ]
},
{
  path:'/accessibility', crumb:'Accessibility',
  title:'Accessibility · TeamBeam Outings',
  desc:'Our commitment to keeping the TeamBeam Outings website usable for everyone.',
  ai:'TeamBeam Outings accessibility statement: the site targets WCAG 2.2 AA, with keyboard navigation, sufficient contrast and semantic structure.',
  sections:[
    {type:'hero', eyebrow:'Accessibility', h:'Built to be usable by everyone.',
      sub:'We want this site to work well for every visitor, however they browse.'},
    {type:'prose', blocks:[
      {h:'What we aim for',p:'We build to the WCAG 2.2 AA standard — sufficient colour contrast, full keyboard navigation, visible focus, meaningful structure for screen readers, and text that scales and reflows on any device.'},
      {h:'If something is not working',p:'Accessibility is never finished. If you hit a barrier on this site, please tell us at <a href="mailto:'+CFG.email+'">'+CFG.email+'</a> and we will fix it.'},
      {p:LEGAL_UPDATED}
    ]}
  ]
});

/* ---- X-Leaves: sub-format builder + Team Experiences pages ---- */
function subformat(o){
  return {path:o.slug, crumb:o.name,
    title:o.name+' — '+o.tagline+' · TeamBeam Outings',
    desc:o.desc, ai:o.ai, keywords:o.keywords,
    sections:[
      {type:'hero', eyebrow:o.eyebrow, h:o.h, sub:o.sub, cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="${o.parent}">${o.parentName}</a>`},
      {type:'narrative', eyebrow:'What it is', h:o.whatH, paras:o.what},
      {type:'cards', eyebrow:'What\u2019s inside', h:o.insideH, cols:3, cards:o.inside},
      {type:'featurelist', tint:true, eyebrow:'Good for', h:o.goodH, lead:o.goodLead, items:o.good},
      {type:'faq', h:'About '+o.name, items:o.faq},
      {type:'related', eyebrow:'Related', h:'Keep exploring.', links:o.related},
      {type:'cta', h:o.ctaH||('Want '+o.name+' for your team?'), p:o.ctaP||'Tell us the goal, and we will shape it around your team — and measure what changed.', cta:talkCTA}
    ]};
}
const TE_PARENT={parent:'/team-experiences', parentName:'All team experiences'};
const teRel=(a,b)=>[
  {h:'All team experiences',p:'The full family of formats.',href:'/team-experiences',linkText:'Team experiences'},
  a,{h:'How we work',p:'Every format runs on the same method.',href:'/why-teambeam',linkText:'The method'}
];
PAGES.push(
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-beam-hunts', name:'Beam Hunts', tagline:'city and venue hunts for teams',
  desc:'Beam Hunts — city and venue treasure hunts that get a team moving, thinking and laughing together, designed and measured by TeamBeam.',
  ai:'Beam Hunts are TeamBeam city, venue, themed and virtual treasure hunts that get teams moving and collaborating, suited to breaking silos and welcoming new joiners.',
  keywords:'corporate treasure hunt India, team scavenger hunt, city hunt team building, office treasure hunt',
  eyebrow:'Team Experiences · Beam Hunts', h:'Beam Hunts <span class="grad">get a team moving.</span>',
  sub:'City and venue hunts that get people out of their chairs, mixing across the usual lines, and solving things together.',
  whatH:'The oldest trick, done properly.', what:[
    'A hunt sounds simple, and that is the point — it lowers the guard instantly. People who never talk end up in a team, racing a clock, and forget to be self-conscious. Underneath the fun, a hunt quietly forces the things good teams do: split the work, trust each other, decide fast.',
    'We design the trail around your goal, not a generic route. Whether that is breaking silos, welcoming a new cohort, or just a genuinely good day, the hunt is shaped to produce it.'],
  insideH:'Ways to run a hunt.',
  inside:[
    {h:'City hunts',p:'A neighbourhood becomes the board — landmarks, clues and local colour.'},
    {h:'Venue hunts',p:'Contained to your office, hotel or offsite space when time is tight.'},
    {h:'Themed hunts',p:'Built around a story or your company, for extra hook.'},
    {h:'Virtual hunts',p:'For a distributed team, played live across cities at once.'}],
  goodH:'When a hunt is the right call.', goodLead:'Hunts are our go-to when the goal is movement, mixing and momentum.',
  good:[
    {h:'Breaking silos',p:'Mixed teams mean people meet colleagues they would never otherwise work with.'},
    {h:'Welcoming new joiners',p:'A cohort bonds faster chasing a clue than sitting through an induction.'},
    {h:'A genuine lift',p:'When a team just needs a good, energising day out that still means something.'}],
  faq:[{q:'How big can a hunt be?',a:'From a single team to several hundred people split into groups, in a city or a venue. We scale the trail and the logistics to the number.'},
    {q:'How long does it take?',a:'Most run two to three hours, and slot neatly into a half-day or into a larger offsite.'}],
  related:teRel({h:'Beam Mysteries',p:'Solve-it-together mysteries, for teams that like a puzzle.',href:'/team-experiences-beam-mysteries',linkText:'Mysteries'})})),
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-beam-arena', name:'Beam Arena', tagline:'high-energy game shows for teams',
  desc:'Beam Arena — high-energy game shows that light up a full room, from one team to a thousand, designed and measured by TeamBeam.',
  ai:'Beam Arena is TeamBeam\u2019s high-energy game-show format for large groups, kickoffs and celebrations, scalable from one team to over a thousand people.',
  keywords:'corporate game show India, large group team building, kickoff entertainment, big room team event',
  eyebrow:'Team Experiences · Beam Arena', h:'Beam Arena <span class="grad">fills the room.</span>',
  sub:'High-energy game shows that hold a whole hall — buzzers, big screens, and a whole company on its feet.',
  whatH:'Energy that actually scales.', what:[
    'Most activities fall apart at scale — but a game show is built for it. Beam Arena turns a room of hundreds into teams, gives everyone a stake, and keeps the energy high from the first buzzer to the last. It is the answer when you need a big group to feel like one.',
    'It looks like pure entertainment, and it is genuinely fun. But the format rewards the right things — quick collaboration, shared risk, and cheering for each other — so the energy has somewhere useful to go.'],
  insideH:'Ways to run the Arena.',
  inside:[
    {h:'Quiz-show format',p:'Classic rounds, buzzers and a host who keeps a big room moving.'},
    {h:'Big-screen spectacle',p:'Production values that make a hall feel like a live show.'},
    {h:'Custom rounds',p:'Questions and challenges built around your company and moment.'},
    {h:'Hybrid',p:'On-stage and on-screen together, for rooms and remote joiners at once.'}],
  goodH:'When the Arena fits.', goodLead:'Arena is our answer for scale and energy.',
  good:[
    {h:'Sales kickoffs',p:'Open the year with a room that is genuinely up, not politely clapping.'},
    {h:'All-hands & celebrations',p:'Turn a big gathering into an event people actually remember.'},
    {h:'Large teams',p:'When hundreds of people need to feel like one team for an evening.'}],
  faq:[{q:'How many people can play?',a:'From a single team to well over a thousand. The format is built to scale without losing energy.'},
    {q:'Do you host it?',a:'Yes. A professional host and full production run the show so it lands from the first minute.'}],
  related:teRel({h:'Rhythm & music',p:'Another way to get a big group in sync fast.',href:'/team-experiences-rhythm-music',linkText:'Rhythm & music'})})),
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-beam-mysteries', name:'Beam Mysteries', tagline:'solve-it-together mysteries for teams',
  desc:'Beam Mysteries — solve-it-together mysteries and escape challenges that reward listening and shared decisions, designed and measured by TeamBeam.',
  ai:'Beam Mysteries are TeamBeam murder-mystery and escape-style formats where teams solve a case together, building collaboration, listening and decision-making.',
  keywords:'murder mystery team building, escape room corporate, problem solving team activity India',
  eyebrow:'Team Experiences · Beam Mysteries', h:'Beam Mysteries <span class="grad">make a team think together.</span>',
  sub:'Solve-it-together mysteries and escape challenges where the only way through is to listen, share and decide as one.',
  whatH:'A puzzle only a team can crack.', what:[
    'A good mystery is impossible alone — the clues are scattered across people, and the answer only appears when everyone shares what they hold. That is exactly the muscle real teams need: listening, combining, and committing to a call together under a clock.',
    'It rewards the quiet person with the key detail as much as the loud one, which makes it quietly inclusive. And it is genuinely gripping, so people lean in without being told to.'],
  insideH:'Ways to run a mystery.',
  inside:[
    {h:'Murder mystery',p:'A story to unravel, with roles, clues and a satisfying reveal.'},
    {h:'Escape challenges',p:'Locked-room style puzzles against the clock, in teams.'},
    {h:'Case files',p:'A layered investigation that rewards method and collaboration.'},
    {h:'Custom cases',p:'Built around your company or theme for extra hook.'}],
  goodH:'When a mystery fits.', goodLead:'Mysteries are our pick when the goal is how a team works, not just whether it bonds.',
  good:[
    {h:'Collaboration',p:'The format forces people to combine what only they each know.'},
    {h:'Decision-making',p:'Teams practise committing to a call together under pressure.'},
    {h:'Listening',p:'The quiet voice with the key clue finally gets heard.'}],
  faq:[{q:'Is it competitive or collaborative?',a:'Both — teams compete to solve it, but within each team the only way to win is to collaborate. That balance is the point.'},
    {q:'Can it be run indoors?',a:'Yes, it is ideal for an office, a hotel or an offsite room. No special venue needed.'}],
  related:teRel({h:'Beam Makers',p:'Build something together, for teams that prefer making to solving.',href:'/team-experiences-beam-makers',linkText:'Makers'})})),
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-beam-makers', name:'Beam Makers', tagline:'build-and-create experiences for teams',
  desc:'Beam Makers — build and create something real together, with something to keep at the end, designed and measured by TeamBeam.',
  ai:'Beam Makers are TeamBeam build-and-create formats (build challenges, art and craft, charity builds) that produce a tangible outcome and reward collaboration.',
  keywords:'team building make create India, build challenge corporate, art team activity, charity build team',
  eyebrow:'Team Experiences · Beam Makers', h:'Beam Makers <span class="grad">leave something behind.</span>',
  sub:'Build and create something real, together — with a result you can point to at the end.',
  whatH:'The satisfaction of a finished thing.', what:[
    'There is a particular kind of bonding that comes from making something with your hands, as a group, and seeing it finished. Beam Makers use that — build challenges, craft, or a piece created for a cause — to bring a team together around a shared, tangible outcome.',
    'It suits teams that would rather do than compete, and moments where you want something lasting to come out of the day, not just a memory.'],
  insideH:'Ways to make.',
  inside:[
    {h:'Build challenges',p:'Structures, machines or contraptions, against a brief and a clock.'},
    {h:'Art & craft',p:'A collaborative piece the whole team contributes to.'},
    {h:'Charity builds',p:'Make something a community needs — bonding and giving back at once.'},
    {h:'Custom makes',p:'Tied to your product, brand or occasion.'}],
  goodH:'When making fits.', goodLead:'Makers are our pick when you want collaboration and a keepsake.',
  good:[
    {h:'Collaboration',p:'A shared object forces real coordination, not parallel effort.'},
    {h:'A tangible outcome',p:'People leave with proof they built something together.'},
    {h:'Mixed energy',p:'Engaging for quieter teams who dislike high-octane competition.'}],
  faq:[{q:'Do we keep what we make?',a:'Usually, yes — or it goes to a cause, if it is a charity build. Either way there is a real result at the end.'},
    {q:'Is it messy or complicated?',a:'We handle all the materials and setup. Your team just makes; we manage the rest.'}],
  related:teRel({h:'Impact & CSR',p:'Turn the making into a give-back project with a report.',href:'/impact-csr',linkText:'Impact & CSR'})})),
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-high-action-tech', name:'High-action & tech', tagline:'adrenaline and gadget experiences for teams',
  desc:'High-action & tech experiences — adrenaline and gadgets for teams that come alive when the stakes feel real, designed and measured by TeamBeam.',
  ai:'TeamBeam High-action & tech experiences combine outdoor challenges and technology (drones, VR, tech games) for teams energised by real stakes.',
  keywords:'high energy team building India, adventure corporate activity, tech team building, adrenaline team event',
  eyebrow:'Team Experiences · High-action & tech', h:'High-action & tech <span class="grad">for teams that want the stakes.</span>',
  sub:'Adrenaline and gadgets — for teams that come alive when something is genuinely on the line.',
  whatH:'When a real challenge builds real trust.', what:[
    'Some teams bond over a puzzle; others need to feel their heart rate. High-action and tech experiences give a team a genuine challenge — physical, competitive or technical — where relying on each other is not a metaphor. Trust built under real stakes tends to stick.',
    'We match the intensity to the group, so it is a thrill rather than a threat, and design it so the whole team has a real part regardless of fitness or nerve.'],
  insideH:'Ways to raise the stakes.',
  inside:[
    {h:'Outdoor challenges',p:'Physical, team-against-the-course experiences in the open.'},
    {h:'Tech games',p:'Gadget-driven challenges that reward quick coordination.'},
    {h:'Drone & VR',p:'Newer formats that put a modern, memorable spin on the day.'},
    {h:'Competitions',p:'Team-versus-team stakes, with a clock and a scoreboard.'}],
  goodH:'When high-action fits.', goodLead:'This is our pick for teams that thrive on energy and edge.',
  good:[
    {h:'Energy',p:'A genuine jolt for a team that has gone flat.'},
    {h:'Trust under pressure',p:'Relying on each other when it actually counts.'},
    {h:'Competitive cultures',p:'Sales and other teams that love to win.'}],
  faq:[{q:'What about mixed fitness?',a:'We scale every challenge so everyone has a real, safe part. The point is the shared experience, never leaving people out.'},
    {q:'Is it safe?',a:'Yes — safety is managed by trained staff, and we match intensity to the group rather than the other way round.'}],
  related:teRel({h:'Denver &amp; the Rockies',p:'A destination built for adventure experiences.',href:'/destinations-denver',linkText:'Denver'})})),
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-rhythm-music', name:'Rhythm & music', tagline:'drumming and music experiences for teams',
  desc:'Rhythm & music experiences — drumming and music-making that get a whole group in sync within minutes, designed and measured by TeamBeam.',
  ai:'TeamBeam Rhythm & music experiences use drum circles and collaborative music to synchronise large groups quickly and include everyone.',
  keywords:'drum circle team building India, music team activity, rhythm team building, inclusive team experience',
  eyebrow:'Team Experiences · Rhythm & music', h:'Rhythm & music <span class="grad">gets a room in sync.</span>',
  sub:'Drumming and music-making that pull a whole group into time together — within minutes, with no skill required.',
  whatH:'Sync you can hear.', what:[
    'There is something almost unfair about rhythm: put instruments in a few hundred hands and, within minutes, a room that arrived as strangers is playing as one. It is the fastest, most literal way to make a large group feel aligned — and it needs zero musical skill to work.',
    'It is also genuinely inclusive. Everyone can keep a beat, so nobody is left on the sidelines, which makes it a rare activity that works across every kind of team.'],
  insideH:'Ways to make sound together.',
  inside:[
    {h:'Drum circles',p:'The classic — hundreds of drums, one groove, led by a facilitator.'},
    {h:'Music-making',p:'Building a piece together from scratch, part by part.'},
    {h:'Body percussion',p:'No instruments needed — the group becomes the rhythm.'},
    {h:'Finale performances',p:'A crescendo the whole room creates together.'}],
  goodH:'When rhythm fits.', goodLead:'Rhythm is our pick when you need fast sync and full inclusion.',
  good:[
    {h:'Large groups',p:'It scales to a hall and still feels personal.'},
    {h:'Inclusion',p:'Everyone can take part, whatever their language or role.'},
    {h:'Energy & alignment',p:'A literal, felt experience of a group moving as one.'}],
  faq:[{q:'Do we need musical ability?',a:'None at all. The whole point is that anyone can do it, and a room of beginners sounds remarkable within minutes.'},
    {q:'How big can it be?',a:'From a team to a full auditorium. It is one of the few activities that gets more powerful the larger it gets.'}],
  related:teRel({h:'Beam Arena',p:'Another format built to move a big room.',href:'/team-experiences-beam-arena',linkText:'Beam Arena'})})),
subformat(Object.assign({},TE_PARENT,{slug:'/team-experiences-culinary', name:'Culinary', tagline:'cook-and-eat experiences for teams',
  desc:'Culinary experiences — cook and eat together, the oldest team-building there is, done well and designed for a goal by TeamBeam.',
  ai:'TeamBeam Culinary experiences (cook-offs, team kitchens, mixology) use cooking and eating together to build collaboration and mark celebrations.',
  keywords:'cooking team building India, corporate cook-off, team kitchen activity, culinary team event',
  eyebrow:'Team Experiences · Culinary', h:'Culinary <span class="grad">brings a team to the table.</span>',
  sub:'Cook and eat together — the oldest team-building there is, designed around a real goal and done well.',
  whatH:'Nobody argues at a shared table.', what:[
    'Cooking together is disarming. There is a task, a deadline, and a delicious reward, and somewhere in the chopping and plating a team relaxes into working smoothly without noticing. Then everyone sits down and eats what they made, which is its own kind of bonding.',
    'It suits collaboration and celebration equally, and it is a gentle, inclusive option for teams who would rather create than compete.'],
  insideH:'Ways to get cooking.',
  inside:[
    {h:'Team cook-offs',p:'Kitchens race a brief and a clock, then everyone tastes the results.'},
    {h:'Guided kitchens',p:'A chef leads the whole team through a shared menu.'},
    {h:'Mixology',p:'Cocktails and mocktails, for a lighter, celebratory session.'},
    {h:'Cuisine journeys',p:'Cooking a regional or themed menu together.'}],
  goodH:'When culinary fits.', goodLead:'Cooking is our pick for warm collaboration and celebration.',
  good:[
    {h:'Collaboration',p:'A shared dish needs coordination, hand-offs and trust.'},
    {h:'Celebration',p:'A natural, warm way to mark a milestone or a good year.'},
    {h:'Inclusive energy',p:'Gentle and engaging for teams who dislike loud competition.'}],
  faq:[{q:'What about dietary needs?',a:'Fully accommodated — we plan menus around your team\u2019s requirements so everyone takes part and eats well.'},
    {q:'Indoors or out?',a:'Either — a professional kitchen, a venue, or an outdoor setup at an offsite. We arrange it.'}],
  related:teRel({h:'Beam Occasions',p:'Cooking makes a warm, inclusive celebration.',href:'/beam-occasions',linkText:'Occasions'})}))
);

/* ---- X-Insights: insights hub linking to teambeam.blog ---- */
const B = CFG.homes.blog;
const insCard=(h,p,slug)=>({h,p,link:B+slug,linkText:'Read on the blog'});
PAGES.push({
  path:'/resources-insights', crumb:'Insights',
  title:'Insights — the thinking behind the method · TeamBeam Outings',
  desc:'The thinking behind how we work — team health, measurement, roles, moments and the human layer of work. Read in full on teambeam.blog.',
  ai:'TeamBeam publishes insights on team health, measurement, the eight dimensions, roles and moments, and the human layer of work as AI reshapes it. The full articles live on teambeam.blog.',
  keywords:'team health insights India, team building research, measurement thinking, TeamBeam blog',
  sections:[
    {type:'hero', eyebrow:'Insights', h:'The thinking <span class="grad">behind the method.</span>',
      sub:'How we think about team health, measurement, and the human layer of work — for the people who decide. The full pieces live on our knowledge site, teambeam.blog.',
      cta:`<a class="cta" href="${B}">Read the insights &#8599;</a><a class="cta cta--ghost" href="#talk">Talk to us</a>`},
    {type:'narrative', eyebrow:'Why we publish', h:'We would rather teach than pitch.',paras:[
      'The best way to earn the trust of the people who decide on team investment is to be genuinely useful to them — so we write about how to think about team health, measurement and the human layer of work, without a sales pitch on every line.',
      'The full library lives on teambeam.blog, our knowledge site. Here are some of the pieces worth starting with.']},
    {type:'cards', eyebrow:'Measurement & method', h:'How we know it worked.', cols:3, cards:[
      insCard('Why measurement changes the conversation','Turning a day out into a defensible investment.','/why-measurement-changes-the-conversation/'),
      insCard('What a Day 14 / 30 / 60 follow-up tells you','Separating what stuck from what faded.','/what-day-14-30-60-tells-you/'),
      insCard('Diagnostic-first: design follows evidence','Why we read the team before we design.','/diagnostic-first-design-follows-evidence/')]},
    {type:'cards', tint:true, eyebrow:'Team health', h:'What a healthy team is made of.', cols:3, cards:[
      insCard('The eight dimensions of a healthy team','The vocabulary that makes team health improvable.','/the-eight-dimensions-of-a-healthy-team/'),
      insCard('Trust inside a team','The dimension everything else rests on.','/trust-inside-a-team/'),
      insCard('The leadership team sets the weather','Why the top team matters most of all.','/the-leadership-team-sets-the-weather/')]},
    {type:'cards', eyebrow:'For the people who decide', h:'Written to your problem.', cols:3, cards:[
      insCard('For the CXO: the retention math','The recoverable cost hiding off the slide.','/cxo-the-retention-math/'),
      insCard('For the HR leader: proving ROI on culture','Evidence in the room\u2019s own currency.','/hr-proving-roi-of-culture-spend/'),
      insCard('GCCs: one company, two continents','The seam where a centre is won or lost.','/gccs-one-company-two-continents/')]},
    {type:'cards', tint:true, eyebrow:'Moments & the human layer', h:'The when, and the why-now.', cols:3, cards:[
      insCard('Onboarding at scale','Making new joiners belong faster.','/onboarding-at-scale-belong-faster/'),
      insCard('Post-merger: two cultures, one team','Dissolving the us-and-them line.','/post-merger-two-cultures-one-team/'),
      insCard('As AI absorbs task-work, the human layer wins','Why connection becomes the differentiator.','/human-layer-becomes-the-differentiator/')]},
    {type:'blogmodule', h:'The full library lives on teambeam.blog.', links:[{t:'What AI changes about team work',href:'/what-ai-changes-about-team-work/'},{t:'Sales teams: what they actually need',href:'/sales-teams-what-they-actually-need/'}]},
    {type:'cta', h:'Like how we think? See how we work.', p:'The insights are the thinking; the method is how we put it to work for your team.', cta:`<a class="cta" href="/why-teambeam">How we work</a><a class="cta cta--ghost" href="mailto:${CFG.email}">Talk to us</a>`}
  ]
});

/* ---- X-Leaves: occasions ---- */
function occLeaf(o){
  return {path:o.slug, crumb:o.name, title:o.title, desc:o.desc, ai:o.ai, keywords:o.keywords,
    sections:[
      {type:'hero', eyebrow:'Occasions · '+o.name, h:o.h, sub:o.sub, cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/occasions">All occasions</a>`},
      {type:'narrative', eyebrow:'The value under it', h:o.valH, paras:o.val},
      {type:'cards', eyebrow:'Ways to mark it', h:o.waysH, cols:3, cards:o.ways},
      {type:'faq', h:'About marking '+o.name, items:o.faq},
      {type:'related', eyebrow:'Related', h:'Keep exploring.', links:[
        {h:'All occasions',p:'A year-round calendar of reasons to gather.',href:'/occasions',linkText:'Occasions'},
        {h:'Beam Occasions',p:'How we run occasions, by audience and mode.',href:'/beam-occasions',linkText:'Beam Occasions'},
        o.rel||{h:'Marking holidays inclusively',p:'The value under the festival.',href:'/marking-holidays-inclusively/',linkText:'Read the insight'}]},
      {type:'cta', h:o.ctaH, p:'Tell us the occasion and your team, and we will make it one people remember.', cta:talkCTA}
    ]};
}
PAGES.push(
occLeaf({slug:'/occasions-winter-holiday-season', name:'the winter holiday season',
  title:'The winter holiday season — marking it inclusively at work · TeamBeam Outings',
  desc:'Marking the winter holiday season at work inclusively — celebration, reflection and appreciation for the year, framed so the whole team feels it, with no religious specifics. By TeamBeam.',
  ai:'TeamBeam marks the winter holiday season inclusively and secularly — as a season of celebration, reflection and appreciation for the year, with holiday parties in any mode, kits for remote teams, and client and partner appreciation.',
  keywords:'inclusive holiday party, company holiday celebration, winter holiday season at work, remote holiday party',
  h:'A season of celebration <span class="grad">and thanks.</span>',
  sub:'The end of the year is a natural time to celebrate together and appreciate a year of work — framed inclusively, so the whole team feels it is for them, whatever they do or do not celebrate.',
  valH:'The value under the season.', val:[
    'The end of the calendar year carries a widely shared spirit of celebration, reflection, and appreciation. We treat it exactly that way — a season of togetherness and thanks for the year completed, framed inclusively rather than around any single religious or cultural tradition.',
    'Done well, it is one of the warmest moments of the year to bring people together. Done carelessly, it quietly signals whose holidays are the default. We help you do the first — a celebration that gathers everyone, in the office, away together, or shipped to a remote team.'],
  waysH:'Ways to mark the season.',
  ways:[
    {h:'An inclusive holiday party',p:'A celebration built on togetherness and thanks, open to the whole team, in any mode.'},
    {h:'Shipped to remote teams',p:'A holiday kit delivered to doorsteps, so distributed people feel it too.'},
    {h:'Client &amp; partner appreciation',p:'Year-end gatherings that thank the people outside the building.'},
    {h:'Give-back',p:'Pairing the celebration with a community project to close the year with meaning.'}],
  faq:[{q:'How do we keep it inclusive?',a:'By marking the shared spirit of celebration, reflection and appreciation rather than any one tradition, and making sure everyone is welcomed in, not asked to perform.'},
    {q:'Can remote teams take part?',a:'Yes. We ship holiday kits and run the celebration online, so a distributed team feels the season as much as an in-office one.'}],
  ctaH:'Planning the holiday season?'}),

occLeaf({slug:'/occasions-fall-gratitude', name:'the fall gratitude season',
  title:'The fall gratitude season — appreciation gatherings at work · TeamBeam Outings',
  desc:'Marking the fall gratitude-and-togetherness moment at work — appreciation gatherings for employees, clients and partners, plus give-back, framed simply around thankfulness. By TeamBeam.',
  ai:'TeamBeam marks the fall gratitude season inclusively and secularly — appreciation gatherings for employees, clients and partners around thankfulness and togetherness, plus community give-back.',
  keywords:'Thanksgiving at work, fall appreciation event, gratitude gathering team, company thank-you event',
  h:'Gratitude, <span class="grad">and gathering.</span>',
  sub:'Autumn brings a natural turn toward gratitude and coming together — the ideal moment to genuinely appreciate the people who matter, employees, clients and partners alike.',
  valH:'The value under the season.', val:[
    'As the year turns toward its close, fall carries a widely shared, secular spirit of gratitude and gathering. It is a moment that invites reflection on the year and genuine appreciation for the people who made it — framed simply around thankfulness and togetherness.',
    'That makes it one of the most natural moments to say a real thank-you: to a team that has carried the year, and to the clients and partners who chose to work with you. We help you make it specific and warm rather than a form email.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'A gratitude gathering',p:'A warm get-together built around thanks for the year so far.'},
    {h:'Employee appreciation',p:'Recognition that is specific and genuine, not a generic round of applause.'},
    {h:'Client &amp; partner thanks',p:'A gesture that reminds the people outside the building they are valued.'},
    {h:'Give-back',p:'A community project that turns gratitude outward, together.'}],
  faq:[{q:'Is this a religious occasion?',a:'No. We frame it around the secular, widely shared spirit of gratitude and gathering, so it welcomes the whole team.'},
    {q:'What makes appreciation land?',a:'Specificity. Thanks that names what a person actually did, delivered warmly, beats any generic gesture.'}],
  ctaH:'Marking the gratitude season?'}),

occLeaf({slug:'/occasions-new-year', name:'the new year',
  title:'The new year — a team kickoff that builds momentum · TeamBeam Outings',
  desc:'Open the new year with a kickoff that reconnects people after the break, sets the tone, and gets the whole team facing the same direction — energy that lasts past January. By TeamBeam.',
  ai:'TeamBeam marks the new year as a team kickoff: reconnecting people after the break, setting the tone, and aligning the whole team for the year ahead, turning shared fresh-start energy into momentum.',
  keywords:'new year kickoff, company kickoff event, team alignment new year, start of year offsite',
  h:'Open the year <span class="grad">pointed the same way.</span>',
  sub:'The new year is the rare moment when the whole team is thinking about fresh starts at once. A kickoff turns that shared energy into momentum instead of a quiet first week back.',
  valH:'The value under the moment.', val:[
    'The new year is the one time the entire team is naturally thinking about fresh starts at the same moment. That shared energy is too good to waste on a slow first week back at the desk.',
    'A kickoff turns it into momentum — reconnecting people after the break, setting the tone for how the team wants to work, and getting everyone aligned and energized for what is ahead. It is the difference between drifting into the year and starting it on purpose.'],
  waysH:'Ways to open the year.',
  ways:[
    {h:'A kickoff gathering',p:'Reconnect the team after the break and set the tone for the year.'},
    {h:'Alignment on the year',p:'Get everyone facing the same direction before the work ramps up.'},
    {h:'Sales kickoff',p:'A working SKO that sends a revenue team out sharp and aligned.'},
    {h:'A shared reset',p:'A clean, energizing start that carries past January.'}],
  faq:[{q:'When should we run it?',a:'The first few weeks of January, while the fresh-start energy is real. The sooner you turn it into alignment, the longer the momentum lasts.'},
    {q:'Is this just a party?',a:'It can include celebration, but the point is momentum — reconnecting and aligning the team so the year starts on purpose.'}],
  ctaH:'Opening the new year?'}),

occLeaf({slug:'/occasions-summer-mid-year', name:'summer & the mid-year',
  title:'Summer & the mid-year — getting the team outside · TeamBeam Outings',
  desc:'Mark summer and the mid-year moment together — team olympics, field days, cookouts, outdoor experiences and onsites, with a quiet chance to reconnect and take stock. By TeamBeam.',
  ai:'TeamBeam marks summer and the mid-year as a team-gathering season — team olympics, field days, cookouts, outdoor experiences and onsites — paired with a mid-year moment to reconnect and take stock.',
  keywords:'summer team building, company field day, team olympics, mid-year offsite, corporate cookout',
  h:'Get everyone <span class="grad">outside.</span>',
  sub:'Summer is the classic team-gathering season — the cookout, the field day, the team olympics. It is also the mid-year mark: a natural moment to reconnect and check in on the year.',
  valH:'The value under the season.', val:[
    'Summer is peak team-gathering season for a reason. The weather, the lighter mood, and the long days make it the natural time for the relaxed, outdoor, genuinely fun gatherings that bond a team without trying too hard.',
    'It also lands at the mid-year mark, which gives it a quiet second purpose: a chance to pause, reconnect, and take stock of how the year is going before the final push. Fun and reflection, in the same sunny moment.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'Team olympics &amp; field day',p:'The classic outdoor gathering that bonds a team by simply having fun.'},
    {h:'Cookout &amp; social',p:'A relaxed, easy get-together that needs no forcing.'},
    {h:'Outdoor experiences',p:'Challenges and adventures that use the long days and good weather.'},
    {h:'A mid-year check-in',p:'A light moment to reconnect and take stock before the second half.'}],
  faq:[{q:'Does it have to be athletic?',a:'No. We design summer gatherings so everyone can join comfortably — the point is shared fun, not competition or fitness.'},
    {q:'Can we tie in a mid-year reset?',a:'Yes. Summer is a natural moment to pause and take stock, so we often pair the fun with a light reconnect on the year.'}],
  ctaH:'Planning a summer gathering?'}),

occLeaf({slug:'/occasions-spring-season', name:'the spring season',
  title:'The spring season — a fresh-start team reset · TeamBeam Outings',
  desc:'Mark the spring renewal — outdoor experiences and a spring reset to re-energize a team and shake off the winter, a secular moment of fresh starts. By TeamBeam.',
  ai:'TeamBeam marks spring as a secular fresh-start season — outdoor experiences and a spring reset to re-energize a team after the winter, harnessing the season\u2019s natural sense of renewal.',
  keywords:'spring team reset, outdoor team building spring, team re-energize, seasonal offsite',
  h:'Renewal, <span class="grad">made visible.</span>',
  sub:'Spring is renewal made visible — longer days, warmer air, and the natural urge to get outside. It is an ideal moment to re-energize a team and shake off the winter.',
  valH:'The value under the season.', val:[
    'Spring carries an unmistakable sense of renewal. After the indoor months, the season\u2019s energy pulls people outdoors and lifts the collective mood — a natural, secular moment of fresh starts that a team can harness.',
    'It is often the perfect time for a mid-stretch reset: a chance to re-energize after the winter grind, reconnect as a team, and take advantage of the weather with something outdoors. The season does half the work; the experience does the rest.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'A spring reset',p:'A re-energizing gathering that shakes off the winter and lifts the mood.'},
    {h:'Outdoor experiences',p:'Get the team outside now that the weather turns, and let the season do half the work.'},
    {h:'A fresh-start check-in',p:'Use the renewal feeling to reconnect and re-point the team.'},
    {h:'Give-back outdoors',p:'A community or environmental project that fits the season.'}],
  faq:[{q:'Why spring for a reset?',a:'The season\u2019s natural renewal energy and better weather make it an easy, low-effort moment to re-energize and reconnect a team.'},
    {q:'Does it need to be outdoors?',a:'It works best outside, using the weather — but we design for your team and your climate, indoors or out.'}],
  ctaH:'Planning a spring reset?'}),

occLeaf({slug:'/occasions-heritage-culture-months', name:'heritage & culture months',
  title:'Heritage & culture months — culture-sharing at work · TeamBeam Outings',
  desc:'Mark the calendar of cultural-heritage months with employee-led culture-sharing experiences, so a diverse workforce sees itself represented and valued. By TeamBeam.',
  ai:'TeamBeam marks the calendar of cultural-heritage months with inclusive, employee-led culture-sharing experiences, so a diverse workforce learns about one another and people see their own background represented at work.',
  keywords:'heritage month at work, cultural celebration workplace, culture sharing team, belonging DEI experience',
  h:'A year of <span class="grad">seeing each other.</span>',
  sub:'The calendar of cultural-heritage months is an invitation, across the year, for a diverse workforce to see itself represented — through culture-sharing led by the people who choose to share their own heritage.',
  valH:'The value under it.', val:[
    'Across the year, the calendar of cultural-heritage months offers a recurring opportunity: for a diverse team to learn about one another, and for people to see their own background represented and valued at work. Treated well, it is one of the most genuine belonging-builders there is.',
    'The key is that it is led by the people who choose to share, not imposed or performed. We help you create the space and the format, so the sharing is authentic and comfortable — and so no one is put on the spot to represent anyone but themselves.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'Employee-led sharing',p:'Space for people who choose to share their own heritage, on their own terms.'},
    {h:'Culture experiences',p:'Food, story and craft that let a team learn about one another.'},
    {h:'Belonging conversations',p:'Genuine dialogue that builds the sense of being seen at work.'},
    {h:'A year-round rhythm',p:'A light, recurring calendar rather than a single box-ticking event.'}],
  faq:[{q:'How do we avoid tokenism?',a:'By making it employee-led and optional — real sharing from people who want to, not a performance assigned to them. We design the space so it stays authentic.'},
    {q:'Isn\u2019t this a lot to run?',a:'It works best as a light, recurring rhythm across the year rather than one big event, which we help you set up and sustain.'}],
  ctaH:'Marking a heritage month?'}),

occLeaf({slug:'/occasions-national-civic-day', name:'the national civic day',
  title:'The national civic day — a festive summer gathering · TeamBeam Outings',
  desc:'Mark a national civic day as a festive summer gathering — inclusive celebrations and outdoor experiences, kept free of political content. By TeamBeam.',
  ai:'TeamBeam marks a national civic day as a festive, inclusive summer gathering — outdoor experiences and celebration of togetherness and good weather, kept free of political content.',
  keywords:'company summer celebration, civic day event, inclusive team gathering summer, outdoor company event',
  h:'A festive <span class="grad">summer gathering.</span>',
  sub:'A national civic day lands in the heart of summer — a natural, festive moment to gather the team outdoors. We mark it as a celebration of togetherness, kept inclusive and free of political content.',
  valH:'The value under the day.', val:[
    'A national civic day arrives at the height of summer, and for most teams it functions as exactly that — a warm, festive moment to gather, get outside, and enjoy the season together. We treat it that way: a celebration of togetherness and good weather, not a political statement.',
    'Kept inclusive and light, it is one of the easiest gatherings of the year to get right. We design it so everyone feels welcome to join, whatever their views or background.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'An outdoor celebration',p:'A festive summer gathering built on togetherness and good weather.'},
    {h:'Team experiences',p:'Games, hunts and challenges that use the long summer day.'},
    {h:'A relaxed social',p:'An easy get-together that needs no agenda beyond enjoying the season.'},
    {h:'Give-back',p:'A community project that turns the day toward something shared.'}],
  faq:[{q:'How do you keep it apolitical?',a:'We frame it purely as a festive summer gathering — togetherness and good weather — with no political content, so the whole team feels welcome.'},
    {q:'What if the team is distributed?',a:'We can run it in-office, away together, or online, and ship a kit so remote people share in the moment.'}],
  ctaH:'Planning a summer civic-day gathering?'}),

occLeaf({slug:'/occasions-employee-appreciation', name:'employee appreciation',
  title:'Employee appreciation — recognition that lands · TeamBeam Outings',
  desc:'A dedicated moment to recognize the people who make everything happen — sincere, specific and warm, the kind of thanks that makes people want to stay. By TeamBeam.',
  ai:'TeamBeam runs employee appreciation as sincere, specific recognition paired with a shared experience — the kind of thanks that supports retention, rather than a generic certificate.',
  keywords:'employee appreciation day, staff recognition event, team appreciation, retention recognition',
  h:'Thanks that <span class="grad">actually lands.</span>',
  sub:'A dedicated moment to recognize the people who make everything happen — sincere, specific and warm, the kind of thanks that makes people want to stay.',
  valH:'The value under it.', val:[
    'Appreciation is the quiet engine of retention — people stay where they feel valued. A dedicated appreciation moment, done sincerely, is one of the highest-return things a company can do, and one of the most commonly botched.',
    'We help you make it real: recognition that is specific rather than generic, an experience the team enjoys together, and the warm, human feeling that a certificate in a queue never delivers.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'Specific recognition',p:'Thanks that names what a person actually did, not a generic round of applause.'},
    {h:'A shared experience',p:'An enjoyable team moment that carries the appreciation, not just words.'},
    {h:'Peer appreciation',p:'Space for the team to recognize each other, not only leadership.'},
    {h:'A lasting gesture',p:'Something warm that outlasts the day itself.'}],
  faq:[{q:'What makes appreciation actually work?',a:'Specificity and sincerity. Recognition that names the real contribution, delivered warmly, lands far better than a generic gesture.'},
    {q:'Does it help retention?',a:'People stay where they feel valued. A genuine appreciation moment is a low-cost, high-return way to signal that — and we measure whether it moved the team.'}],
  ctaH:'Planning an appreciation moment?'}),

occLeaf({slug:'/occasions-womens-day', name:'women\u2019s day & inclusion',
  title:'Women\u2019s Day & inclusion — more than a token gesture · TeamBeam Outings',
  desc:'Mark Women\u2019s Day and inclusion with meaning — celebrate the women on your team, surface real conversation about support and equity, and commit to something that lasts. By TeamBeam.',
  ai:'TeamBeam marks Women\u2019s Day and inclusion meaningfully — celebrating the women on a team, surfacing genuine conversation about support and equity, and committing to change that outlasts the day, rather than a token gesture.',
  keywords:'International Women\u2019s Day at work, inclusion event, DEI belonging, women in the workplace event',
  h:'More than <span class="grad">a token gesture.</span>',
  sub:'A meaningful moment to celebrate the women on your team, recognize their contribution, and back it with real conversation and commitment.',
  valH:'The value under it.', val:[
    'Women\u2019s Day done badly is a flower and a forgettable email. Done well, it is a genuine moment to celebrate the women on your team, surface real conversations about support and equity, and commit to something that lasts beyond the day.',
    'The same holds for inclusion more broadly: the moments only matter if they are honest and lead somewhere. We help you mark them with substance — celebration and real dialogue, not a token gesture.'],
  waysH:'Ways to mark it.',
  ways:[
    {h:'Genuine celebration',p:'Recognize and celebrate the women on the team, specifically and sincerely.'},
    {h:'Real conversation',p:'Space for honest dialogue about support, equity and belonging.'},
    {h:'A lasting commitment',p:'Something concrete that outlives the day, not a one-off gesture.'},
    {h:'Inclusion, more broadly',p:'A format that extends the same honesty to belonging across the team.'}],
  faq:[{q:'How do we avoid it feeling like a token?',a:'By pairing celebration with genuine conversation and a concrete commitment that lasts beyond the day. Substance is what separates it from a gesture.'},
    {q:'Can it connect to our wider inclusion work?',a:'Yes. We design it to lead somewhere — into ongoing belonging conversations rather than a single date on the calendar.'}],
  ctaH:'Marking Women\u2019s Day or inclusion?'}),

occLeaf({slug:'/occasions-year-end', name:'the year-end',
  title:'Year-end — a celebration that feels earned · TeamBeam Outings',
  desc:'Close the year with a gathering that thanks the whole company, recognizes what you achieved, and lets people enjoy each other before the break. By TeamBeam.',
  ai:'TeamBeam runs year-end celebrations that thank the whole company, recognize the year\u2019s achievements, and let people enjoy each other\u2019s company before the break, however the year went.',
  keywords:'year-end celebration, company end of year party, annual recognition event, holiday party company',
  h:'A close that <span class="grad">feels earned.</span>',
  sub:'However the year went, ending it together matters. A year-end celebration is the moment to thank the whole company, recognize what you achieved, and let people enjoy each other before the break.',
  valH:'The value under it.', val:[
    'A year is a lot of shared effort, and closing it together is how a team acknowledges that. However the year went, a genuine year-end gathering thanks the whole company, marks what was achieved, and gives people a moment to simply enjoy each other before the break.',
    'Done well, it sends the team into the new year feeling recognized and connected rather than merely finished. We design it so the celebration feels earned, not obligatory.'],
  waysH:'Ways to close the year.',
  ways:[
    {h:'A whole-company gathering',p:'A celebration that brings everyone together to mark the year completed.'},
    {h:'Recognition',p:'Genuine acknowledgment of what the team achieved, named specifically.'},
    {h:'Time to connect',p:'Space for people to enjoy each other before the break, no agenda required.'},
    {h:'Any mode',p:'In-office, away together, or online with a kit, so distributed teams are included.'}],
  faq:[{q:'What if it was a hard year?',a:'Ending together still matters — arguably more. We frame it honestly: thanks for the effort and connection, rather than forced cheer.'},
    {q:'How is this different from a holiday party?',a:'The winter holiday season is about the season\u2019s inclusive spirit; the year-end is specifically about closing your company\u2019s year with recognition. They often combine, and we design either way.'}],
  ctaH:'Closing the year?'})
);

/* ---- X-Leaves: who-we-serve leaves ---- */
function wsLeaf(o){
  return {path:o.slug, crumb:o.name, title:o.title, desc:o.desc, ai:o.ai, keywords:o.keywords,
    sections:[
      {type:'hero', eyebrow:o.eyebrow, h:o.h, sub:o.sub, cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/who-we-serve">Who it\u2019s for</a>`},
      {type:'narrative', eyebrow:o.narrEyebrow||'The pressure here', h:o.pressH, paras:o.press},
      {type:'cards', eyebrow:'What fits', h:o.fitH, cols:3, cards:o.fit},
      {type:'faq', h:o.faqH||'About these teams', items:o.faq},
      {type:'related', eyebrow:'Related', h:'Keep exploring.', links:o.related},
      {type:'cta', h:o.ctaH, p:o.ctaP||'Tell us the goal, and we will design for the pressure your world actually puts on teams.', cta:talkCTA}
    ]};
}
const wsInd=(a,b)=>[
  {h:'Who it\u2019s for',p:'By role, industry and moment.',href:'/who-we-serve',linkText:'Who it\u2019s for'},
  a,b||{h:'How we work',p:'We read the team before we design.',href:'/why-teambeam',linkText:'The method'}
];
PAGES.push(
wsLeaf({slug:'/who-we-serve-industries-technology', name:'Technology & GCCs',
  title:'Team experiences for technology & GCC teams · TeamBeam Outings',
  desc:'Team experiences for technology and GCC teams — high-talent, high-mobility groups, and centres that must feel like one company across two continents. By TeamBeam.',
  ai:'TeamBeam works with technology companies and global capability centres (GCCs), where retention is fragile and delivery depends on psychological safety, building trust, belonging and connection across continents.',
  keywords:'team building for tech companies India, GCC team building, engineering team offsite, IT team experiences',
  eyebrow:'Who it\u2019s for · Technology & GCCs', h:'For teams whose people <span class="grad">can leave tomorrow.</span>',
  sub:'High-talent, high-mobility technology teams — and GCCs that have to feel like one company across two continents.',
  pressH:'Two hard things at once.', press:[
    'Technology teams live with a specific double pressure: skilled people who can change jobs in a single conversation, and work that only goes well when it is safe to be honest — to flag the bug, question the design, admit what you do not know. Retention and delivery both hang on the same soft foundations: trust, belonging and safety.',
    'For a GCC, add distance. A centre reporting to a parent on another continent has to feel like one company across time zones and cultures, or it quietly becomes a place work is sent to rather than a place decisions are made. That seam is where we do our most valuable work.'],
  fitH:'What fits a tech or GCC team.',
  fit:[
    {h:'Trust & safety work',p:'The candour that good engineering and honest pipelines depend on.'},
    {h:'GCC connection',p:'Making the centre feel like one company with the parent, on purpose.'},
    {h:'Distributed connection',p:'Building belonging across cities and time zones.'},
    {h:'Retention-focused offsites',p:'A team people would take a pay cut to stay on.'}],
  faq:[{q:'Do you understand the GCC model?',a:'Deeply — it is the story our whole business is built around. A GCC is one company across two continents, which is exactly how we operate ourselves.'},
    {q:'Can you work with distributed engineering teams?',a:'Yes, in-office, online or hybrid. Distributed teams need connection built deliberately, and that is a strength of ours.'}],
  related:wsInd({h:'GCCs: one company, two continents',p:'The thinking behind this work.',href:'/gccs-one-company-two-continents/',linkText:'Read the insight'},{h:'Technology teams',p:'More on tech-team dynamics.',href:'/technology-teams-safety-and-retention/',linkText:'Read the insight'}),
  ctaH:'Building a technology team?'}),
wsLeaf({slug:'/who-we-serve-industries-financial-services', name:'Financial services',
  title:'Team experiences for financial services teams · TeamBeam Outings',
  desc:'Team experiences for financial services and fintech teams — high-stakes, high-pressure groups where trust and clear decisions matter most. By TeamBeam.',
  ai:'TeamBeam works with financial services and fintech teams, where high pressure and high stakes make trust, clear decision-making and honest communication decisive.',
  keywords:'team building financial services India, BFSI team offsite, fintech team building, bank team experiences',
  eyebrow:'Who it\u2019s for · Financial services', h:'For teams where <span class="grad">the stakes are always high.</span>',
  sub:'Banking, insurance and fintech teams — high-pressure, high-consequence, and utterly dependent on trust and clear decisions.',
  pressH:'Pressure exposes the cracks.', press:[
    'Financial services teams operate under constant, real stakes. That pressure is exactly what makes the soft dimensions decisive: whether people trust each other enough to raise a concern, whether decisions get made cleanly and stay made, whether the hard message reaches the right person in time. Under pressure, weak trust and muddy decision rights cost real money.',
    'These teams rarely get the space to work on any of that. We build it in — deliberately, and measured, so the investment is defensible to a leadership that thinks in numbers.'],
  fitH:'What fits a financial services team.',
  fit:[
    {h:'Trust under pressure',p:'The safety to raise a concern before it becomes a loss.'},
    {h:'Decision-making',p:'Clean decisions that stay made, with clear ownership.'},
    {h:'High-stakes facilitation',p:'A neutral hand for the conversations that matter most.'},
    {h:'Recovery',p:'Genuine reset for teams running hot for too long.'}],
  faq:[{q:'Our teams are always busy — how does this fit?',a:'We design around the reality that time is scarce and stakes are high, and we measure the return so the time is defensible.'},
    {q:'Can you handle confidentiality?',a:'Yes. We work with senior and sensitive teams routinely, with the discretion that requires.'}],
  related:wsInd({h:'For the CXO: the retention math',p:'What weak team health costs.',href:'/cxo-the-retention-math/',linkText:'Read the insight'}),
  ctaH:'Building a financial services team?'}),
wsLeaf({slug:'/who-we-serve-industries-healthcare', name:'Healthcare & life sciences',
  title:'Team experiences for healthcare & life sciences teams · TeamBeam Outings',
  desc:'Team experiences for healthcare and life sciences teams — groups carrying real weight who need genuine recovery, not just a day off. By TeamBeam.',
  ai:'TeamBeam works with healthcare and life sciences teams, focusing on genuine recovery from burnout, trust, and sustaining people who carry heavy responsibility.',
  keywords:'team building healthcare India, hospital team offsite, pharma team building, life sciences team experiences',
  eyebrow:'Who it\u2019s for · Healthcare & life sciences', h:'For teams that carry <span class="grad">real weight.</span>',
  sub:'Healthcare and life sciences teams — carrying genuine responsibility, and needing recovery that actually restores.',
  pressH:'Rest is not the same as recovery.', press:[
    'Healthcare and life sciences teams carry a weight most teams do not. The risk is not disengagement so much as depletion — good people running on empty, and a culture where admitting you are struggling feels unsafe. A pizza lunch does not touch that. Real recovery does.',
    'We design for genuine restoration and for the trust that lets people be honest about how they are doing, so the team can sustain the work rather than burn through its people.'],
  fitH:'What fits a healthcare team.',
  fit:[
    {h:'Real recovery',p:'Restoration for a depleted team, not a token day off.'},
    {h:'Trust & safety',p:'A culture where struggling can be admitted, not hidden.'},
    {h:'Belonging',p:'Keeping people who could burn out and leave.'},
    {h:'Quiet, considered days',p:'Calm experiences that suit teams under real strain.'}],
  faq:[{q:'Our people are exhausted — is a high-energy day right?',a:'Often not. For a depleted team we design for genuine recovery, not more stimulation. The reading comes first.'},
    {q:'Can you work around shift patterns?',a:'Yes. We design around the realities of clinical and lab schedules.'}],
  related:wsInd({h:'Onboarding & belonging',p:'On helping people belong and stay.',href:'/onboarding-at-scale-belong-faster/',linkText:'Read the insight'}),
  ctaH:'Building a healthcare team?'}),
wsLeaf({slug:'/who-we-serve-industries-manufacturing', name:'Manufacturing',
  title:'Team experiences for manufacturing teams · TeamBeam Outings',
  desc:'Team experiences for manufacturing teams — large, layered groups across shifts and sites, brought together with purpose. By TeamBeam.',
  ai:'TeamBeam works with manufacturing teams — large, multi-shift, multi-site groups — building connection and communication across levels and locations.',
  keywords:'team building manufacturing India, factory team offsite, plant team building, automotive team experiences',
  eyebrow:'Who it\u2019s for · Manufacturing', h:'For teams spread across <span class="grad">shifts and sites.</span>',
  sub:'Large, layered manufacturing teams — across floors, shifts and locations — brought together with purpose.',
  pressH:'Distance runs through the team.', press:[
    'A manufacturing team is rarely in one room. It is spread across shifts that never overlap, sites that rarely meet, and levels — floor, supervisor, management — that can feel like different worlds. That structural distance quietly erodes communication and belonging, and it takes deliberate effort to bridge.',
    'We design experiences that bring layers and locations together, build communication across the gaps, and give a large, dispersed workforce a felt sense of being one team.'],
  fitH:'What fits a manufacturing team.',
  fit:[
    {h:'Across-level connection',p:'Bringing floor, supervisors and management together as one.'},
    {h:'Scale',p:'Experiences that hold a large workforce, not just a head office.'},
    {h:'Communication',p:'Bridging the gaps between shifts and sites.'},
    {h:'Appreciation',p:'Recognising a workforce that is easy to take for granted.'}],
  faq:[{q:'Can you handle very large numbers?',a:'Yes — scale is a strength of ours, and manufacturing often needs it. We design for the whole workforce, not just the office.'},
    {q:'How do you reach shift workers?',a:'We design around shift patterns so nobody is left out, including across multiple sites.'}],
  related:wsInd({h:'High-energy & scale',p:'How we run large gatherings.',href:'/offsites-retreats-high-energy-scale',linkText:'At scale'}),
  ctaH:'Building a manufacturing team?'}),
wsLeaf({slug:'/who-we-serve-industries-media-entertainment', name:'Media & entertainment',
  title:'Team experiences for media & entertainment teams · TeamBeam Outings',
  desc:'Team experiences for media and entertainment teams — creative groups collaborating under constant deadline. By TeamBeam.',
  ai:'TeamBeam works with media and entertainment teams, where creative collaboration under constant deadline strains alignment and trust.',
  keywords:'team building media India, creative team offsite, entertainment team building, agency team experiences',
  eyebrow:'Who it\u2019s for · Media & entertainment', h:'For creative teams <span class="grad">always on a deadline.</span>',
  sub:'Media, entertainment and creative teams — collaborating hard, under constant time pressure, with strong personalities in the mix.',
  pressH:'Creativity needs safety and space.', press:[
    'Creative teams do their best work when it is safe to share a half-formed idea and when strong personalities can disagree without it turning personal. But constant deadlines squeeze out exactly the conditions creativity needs — the space to think, the trust to be wrong, the alignment to pull the same way.',
    'We design experiences that restore those conditions: rebuilding trust and psychological safety, aligning a group that has been heads-down, and giving a creative team room to breathe.'],
  fitH:'What fits a creative team.',
  fit:[
    {h:'Psychological safety',p:'The freedom to float the risky idea and disagree well.'},
    {h:'Alignment',p:'Pulling a heads-down team back onto the same page.'},
    {h:'Reset & space',p:'Room to think for a team that never stops shipping.'},
    {h:'Collaboration',p:'Working across strong personalities without friction.'}],
  faq:[{q:'Our team is skeptical of team building.',a:'Good — so are we, of the bad kind. Creative teams see through forced fun instantly. We design something they will actually respect.'},
    {q:'Can it be genuinely creative?',a:'Yes. We lean into makers, music and design formats that a creative team enjoys on its own terms.'}],
  related:wsInd({h:'Beam Makers',p:'Build and create together.',href:'/team-experiences-beam-makers',linkText:'Beam Makers'}),
  ctaH:'Building a creative team?'}),
wsLeaf({slug:'/who-we-serve-industries-professional-services', name:'Professional services',
  title:'Team experiences for professional services teams · TeamBeam Outings',
  desc:'Team experiences for professional services teams — billable, deadline-driven groups that rarely get the time to become a team. By TeamBeam.',
  ai:'TeamBeam works with professional services and consulting teams, where billable pressure leaves little time to build the team itself, straining trust and belonging.',
  keywords:'team building professional services India, consulting team offsite, law firm team building, advisory team experiences',
  eyebrow:'Who it\u2019s for · Professional services', h:'For teams too busy <span class="grad">to become a team.</span>',
  sub:'Consulting, legal and advisory teams — brilliant individuals, billable to the hilt, who rarely get the space to become a real team.',
  pressH:'When every hour is billable.', press:[
    'Professional services runs on billable hours, which quietly punishes anything that is not client work — including the time it takes to become a team. So you get rooms full of talented individuals who deliver brilliantly and never quite cohere, with thin trust and weak belonging masked by sheer capability.',
    'We make the case, and the time, worth it: focused experiences that build the trust and connection these teams never get to, designed and measured so the non-billable time defends itself.'],
  fitH:'What fits a professional services team.',
  fit:[
    {h:'Trust & belonging',p:'The connection billable pressure never leaves time for.'},
    {h:'Efficient formats',p:'High-value experiences that respect scarce time.'},
    {h:'Retention',p:'Keeping the talented people every rival is trying to hire.'},
    {h:'Leadership alignment',p:'Getting partners genuinely pulling the same way.'}],
  faq:[{q:'We can barely spare the time.',a:'We know. We design high-value, time-efficient experiences and measure the return, so the hours off the clock are justified.'},
    {q:'Can you work with partnerships?',a:'Yes — including the particular dynamics of aligning a group of partners.'}],
  related:wsInd({h:'Proving the ROI of culture spend',p:'Making the case defensible.',href:'/hr-proving-roi-of-culture-spend/',linkText:'Read the insight'}),
  ctaH:'Building a professional services team?'}),
wsLeaf({slug:'/who-we-serve-industries-ecommerce-retail', name:'Retail & e-commerce',
  title:'Team experiences for retail & e-commerce teams · TeamBeam Outings',
  desc:'Team experiences for retail and e-commerce teams — fast-moving, seasonal groups that scale up and need to cohere quickly. By TeamBeam.',
  ai:'TeamBeam works with retail and e-commerce teams, fast-moving and seasonal, helping them onboard and cohere quickly and sustain energy through peaks.',
  keywords:'team building retail India, e-commerce team offsite, D2C team building, retail team experiences',
  eyebrow:'Who it\u2019s for · Retail & e-commerce', h:'For teams that scale up <span class="grad">fast.</span>',
  sub:'Retail, e-commerce and D2C teams — fast-moving, seasonal, and needing to cohere quickly, again and again.',
  pressH:'Speed leaves connection behind.', press:[
    'Retail and e-commerce move fast and swell for peaks — which means teams are constantly onboarding, scaling and reshaping. In that churn, the slow work of building trust and belonging gets left behind, and you end up with capable groups of near-strangers powering through a season together.',
    'We help these teams cohere quickly: onboarding cohorts into belonging fast, sustaining energy through the peaks, and giving a fast-changing team a stable sense of who it is.'],
  fitH:'What fits a retail team.',
  fit:[
    {h:'Fast onboarding',p:'New joiners belonging quickly, before the peak hits.'},
    {h:'Energy through peaks',p:'Sustaining a team running flat out for a season.'},
    {h:'Cohesion at speed',p:'A stable identity for a fast-changing group.'},
    {h:'Appreciation',p:'Recognising teams that carry the heaviest loads.'}],
  faq:[{q:'Our team changes constantly.',a:'That is exactly what we design for — fast belonging and cohesion for teams that are always onboarding and scaling.'},
    {q:'Can you handle seasonal peaks?',a:'Yes — including timing experiences to prepare for, or recover from, the busiest stretches.'}],
  related:wsInd({h:'Onboarding at scale',p:'Making new joiners belong faster.',href:'/onboarding-at-scale-belong-faster/',linkText:'Read the insight'}),
  ctaH:'Building a retail or e-commerce team?'}),
wsLeaf({slug:'/who-we-serve-industries-non-profit', name:'Non-profit',
  title:'Team experiences for non-profit teams · TeamBeam Outings',
  desc:'Team experiences for non-profit teams — mission-driven groups doing a lot with a little, who need to protect their people. By TeamBeam.',
  ai:'TeamBeam works with non-profit teams, mission-driven and resource-constrained, focusing on protecting people from burnout while sustaining purpose.',
  keywords:'team building non profit India, NGO team offsite, mission driven team, non profit team experiences',
  eyebrow:'Who it\u2019s for · Non-profit', h:'For teams doing a lot <span class="grad">with a little.</span>',
  sub:'Mission-driven teams — rich in purpose, short on resources, and at real risk of burning out the very people who care most.',
  pressH:'Purpose is not a substitute for care.', press:[
    'Non-profit teams are powered by belief, which is a strength and a trap. People who care deeply give until they are empty, and a culture of mission can make it feel selfish to admit you are struggling. The result is high purpose and high burnout at once — losing exactly the people the mission depends on.',
    'We design for these teams with respect for the constraints: genuine recovery, the trust to be honest about capacity, and connection that renews the shared purpose rather than exhausting it.'],
  fitH:'What fits a non-profit team.',
  fit:[
    {h:'Protecting people',p:'Real recovery for teams at risk of burning out.'},
    {h:'Honest capacity',p:'A culture where admitting you are stretched is safe.'},
    {h:'Renewed purpose',p:'Reconnecting a team to why it started.'},
    {h:'Resource-aware design',p:'Meaningful experiences that respect a tight budget.'}],
  faq:[{q:'We do not have a big budget.',a:'We understand, and we design accordingly — including self-serve options. Meaningful does not have to mean expensive.'},
    {q:'Our people feel guilty spending on themselves.',a:'A common and costly belief. We frame the work as protecting the mission by protecting the people who carry it.'}],
  related:wsInd({h:'Impact & CSR',p:'The give-back side of what we do.',href:'/impact-csr',linkText:'Impact & CSR'}),
  ctaH:'Building a mission-driven team?'})
);

PAGES.push(
wsLeaf({slug:'/who-we-serve-roles-executives', name:'Executives & boards',
  title:'For CXOs & boards — team health as business risk · TeamBeam Outings',
  desc:'For CXOs and boards — team experiences that treat retention, culture and team health as the business questions they are. By TeamBeam.',
  ai:'TeamBeam works with CXOs and boards, framing team health as a driver of retention and performance, and measuring it so it belongs on the same slide as the numbers.',
  keywords:'team building for CXOs, executive team health, board culture, retention strategy India',
  eyebrow:'Who it\u2019s for · Executives & boards', h:'The number that\u2019s <span class="grad">never on the slide.</span>',
  sub:'For the people accountable for the whole thing — where team health quietly drives retention, performance and risk.',
  pressH:'The recoverable cost hiding in plain sight.', press:[
    'Every leader knows roughly what it costs to lose good people, and almost none put it on a slide — because the cause has always felt unmeasurable, so it felt unmanageable. It is not. People rarely leave over pay alone; they leave teams they do not feel part of, and that is a lever you can actually pull.',
    'We work with executives to treat team health as what it is — a driver of retention and performance — and we measure it, so the investment belongs on the same slide as the numbers it affects.'],
  fitH:'What fits an executive agenda.',
  fit:[
    {h:'Leadership team work',p:'The top team whose health cascades to everyone below.'},
    {h:'Retention-focused programs',p:'Addressing the belonging that pay cannot buy.'},
    {h:'Measured proof',p:'A change you can defend to a board, not a feeling.'},
    {h:'Culture at scale',p:'Moving the whole organisation, not one team.'}],
  faq:[{q:'How do we know it worked?',a:'We measure team health before and weeks after, and hand you a report you can take to the board. Proof is the point.'},
    {q:'Is this a soft cost?',a:'We treat it as a retention and performance lever with a measurable return, precisely so it does not read as soft.'}],
  related:wsInd({h:'For the CXO: the retention math',p:'The number nobody puts on a slide.',href:'/cxo-the-retention-math/',linkText:'Read the insight'},{h:'The leadership team sets the weather',p:'Why the top team matters most.',href:'/the-leadership-team-sets-the-weather/',linkText:'Read the insight'}),
  ctaH:'On the leadership team?'}),
wsLeaf({slug:'/who-we-serve-roles-people-hr', name:'HR & People leaders',
  title:'For HR & People leaders — a program you can defend · TeamBeam Outings',
  desc:'For HR and People leaders — team experiences designed and measured so you can prove the ROI of culture spend. By TeamBeam.',
  ai:'TeamBeam works with HR and People leaders, providing measured team experiences that produce defensible evidence of change for budget reviews and boards.',
  keywords:'team building for HR India, CHRO culture program, prove ROI team building, people leader tools',
  eyebrow:'Who it\u2019s for · HR & People leaders', h:'A program you can <span class="grad">actually defend.</span>',
  sub:'For the People leader asked to justify culture spend in a language finance respects — with tools that were never built to speak it.',
  pressH:'Evidence in the room\u2019s own currency.', press:[
    'You walk into a budget review with photos, feedback scores, and a real story about a team that came back closer — and it gets waved off. Not because you are wrong, but because it is in a currency the room does not accept. Finance is not against culture; it is against spend it cannot reason about.',
    'We give you a before, an after, and a change that held a month later — evidence that survives a review. It turns a soft cost into a program you can defend, and a win you can point to.'],
  fitH:'What fits a People leader.',
  fit:[
    {h:'Measured programs',p:'A documented change, not an anecdote.'},
    {h:'Board-ready proof',p:'A curve you can put in front of leadership.'},
    {h:'Diagnostic-first design',p:'Development aimed at the real gap, so it lands.'},
    {h:'A partner who gets it',p:'We think about ROI the way you have to.'}],
  faq:[{q:'Will this help me defend the budget?',a:'That is the point. We produce evidence of change designed to survive a budget review and land with a board.'},
    {q:'Can you work across many teams?',a:'Yes — from a single team to a company-wide program, with a consistent way of measuring throughout.'}],
  related:wsInd({h:'Proving the ROI of culture spend',p:'The thinking behind this.',href:'/hr-proving-roi-of-culture-spend/',linkText:'Read the insight'},{h:'The ROI calculator',p:'Size the opportunity yourself.',href:'/resources-tools-offsite-roi-calculator',linkText:'Open the tool'}),
  ctaH:'Leading People or HR?'}),
wsLeaf({slug:'/who-we-serve-roles-managers', name:'People managers',
  title:'For people managers — shifting the team you can actually influence · TeamBeam Outings',
  desc:'For people managers — team experiences that move the team you can actually influence, designed around what it needs. By TeamBeam.',
  ai:'TeamBeam works with people managers to develop the team directly in their control, targeting the specific dimension it needs and giving them something concrete to run.',
  keywords:'team building for managers India, manager team development, first time manager team, people manager tools',
  eyebrow:'Who it\u2019s for · People managers', h:'The team you can <span class="grad">actually influence.</span>',
  sub:'For the manager who cannot change the whole company, but can absolutely change the team in front of them.',
  pressH:'Your circle of real control.', press:[
    'Big culture initiatives come and go over a manager\u2019s head. But the team you lead is genuinely yours to shape — its trust, its communication, whether people feel they belong. That is the most direct lever most managers have, and it is often the least supported.',
    'We help you use it: a clear reading of where your team is, an experience built for the specific thing it needs, and something you can point to afterward. Practical help for the team actually in your control.'],
  fitH:'What fits a manager.',
  fit:[
    {h:'Targeted experiences',p:'Aimed at your team\u2019s specific gap, not a generic day.'},
    {h:'Right-sized budgets',p:'Options that work at a single-team scale.'},
    {h:'Practical support',p:'Something concrete to run, with the debrief built in.'},
    {h:'Self-serve tools',p:'A snapshot and idea generator to start on your own.'}],
  faq:[{q:'I have a small budget.',a:'We have options for exactly that — from single-team experiences to self-serve kits you can run yourself.'},
    {q:'Where do I start?',a:'Try the free Team Health Snapshot to see where your team stands, then talk to us about the one dimension worth moving.'}],
  related:wsInd({h:'Team Health Snapshot',p:'See where your team stands.',href:'/resources-tools-team-health-snapshot',linkText:'Take the snapshot'}),
  ctaH:'Managing a team?'}),
wsLeaf({slug:'/who-we-serve-roles-chiefs-of-staff-eas', name:'Chiefs of staff & EAs',
  title:'For chiefs of staff & EAs — the whole thing handled · TeamBeam Outings',
  desc:'For chiefs of staff and executive assistants — team experiences and offsites handled end to end, so you can hand it off with confidence. By TeamBeam.',
  ai:'TeamBeam works with chiefs of staff and EAs, handling team experiences and offsites end to end so they can delegate with confidence.',
  keywords:'offsite planning chief of staff, EA team event India, executive assistant offsite, corporate event handled',
  eyebrow:'Who it\u2019s for · Chiefs of staff & EAs', h:'Hand it off <span class="grad">with confidence.</span>',
  sub:'For the person who ends up owning the offsite — and needs it to be brilliant, without it eating their month.',
  pressH:'The offsite always lands on your desk.', press:[
    'Somehow the team day, the offsite, the leadership retreat all end up with you — on top of everything else. Done badly, it consumes weeks and you spend the day running it instead of enjoying a job well done. Done well, you hand over a clear brief and it comes back handled.',
    'That is what we are for. We take the whole thing — venue, travel, design, delivery, and the proof afterward — so you can delegate it and trust it will be excellent.'],
  fitH:'What fits a chief of staff or EA.',
  fit:[
    {h:'End-to-end handling',p:'Venue, travel, run-of-show and delivery, all managed.'},
    {h:'A single point of contact',p:'One partner who owns the detail, not ten vendors.'},
    {h:'Executive-grade discretion',p:'Especially for leadership offsites.'},
    {h:'Proof to report up',p:'Evidence the investment worked, for the people you serve.'}],
  faq:[{q:'How much of my time will this take?',a:'As little as you want. Give us the goal and the constraints, and we handle the rest — with clear check-ins, not constant demands.'},
    {q:'Can you handle complex logistics?',a:'Yes — multiple locations, senior groups, tight timelines. That is exactly what sourcing & planning is for.'}],
  related:wsInd({h:'Sourcing & planning',p:'The whole offsite, handled.',href:'/offsites-retreats-sourcing-planning',linkText:'Sourcing & planning'}),
  ctaH:'Planning an offsite for your leaders?'}),
wsLeaf({slug:'/who-we-serve-roles-employees', name:'Employees',
  title:'For employees — a day that respects your time · TeamBeam Outings',
  desc:'For employees and team members — team experiences that are genuinely good, never forced, and actually worth your time. By TeamBeam.',
  ai:'TeamBeam designs team experiences that respect employees\u2019 time and intelligence, avoiding forced fun and building genuine connection.',
  keywords:'good team building experience, not forced fun team day, employee team experience India',
  eyebrow:'Who it\u2019s for · Employees', h:'A day that <span class="grad">respects your time.</span>',
  sub:'For the people who will actually be in the room — because the best sign an experience worked is that the team wanted to be there.',
  pressH:'Nobody wants another forced-fun day.', press:[
    'Most people have sat through team building that felt like a chore — a day away from real work, doing something slightly embarrassing, that changed nothing. It is no wonder teams are skeptical. We are too. That kind of day disrespects the people it is meant to help.',
    'We design the opposite: experiences with a real point, run with care, that people are glad they came to. Genuine connection, never forced fun. The team leaves closer because it wanted to, not because it was told to.'],
  fitH:'What makes a day worth it.',
  fit:[
    {h:'No forced fun',p:'Calm, real, and built for grown-ups.'},
    {h:'A real point',p:'Every minute is there for a reason.'},
    {h:'Genuine inclusion',p:'Everyone has a real part, whoever they are.'},
    {h:'Run with care',p:'Facilitated so people can simply be present.'}],
  faq:[{q:'Will this be cringe?',a:'No. Avoiding exactly that is a design principle for us. We build days that people respect and enjoy on their own terms.'},
    {q:'Do we have to do embarrassing things?',a:'Never anything forced. We design so everyone can take part comfortably, and nobody is put on the spot.'}],
  related:wsInd({h:'What we do',p:'Every format we run.',href:'/what-we-do',linkText:'What we do'}),
  ctaH:'Want a day people are glad they came to?'}),
wsLeaf({slug:'/who-we-serve-moments-onboarding', name:'Onboarding a cohort',
  title:'Onboarding — making new hires belong faster · TeamBeam Outings',
  desc:'For onboarding moments — experiences that help a cohort of new hires belong faster, so they contribute sooner and stay longer. By TeamBeam.',
  ai:'TeamBeam designs onboarding experiences that build belonging for cohorts of new hires, accelerating contribution and improving retention.',
  keywords:'onboarding team building India, new hire cohort experience, belonging onboarding, remote onboarding',
  eyebrow:'Who it\u2019s for · Onboarding', h:'Make new joiners <span class="grad">belong faster.</span>',
  sub:'For the moment a cohort arrives — where the difference between competence and belonging decides who stays.',
  pressH:'The part onboarding forgets.', press:[
    'Most onboarding is very good at teaching people how the company works, and much worse at making them feel part of it. The systems get covered; belonging is left to chance. And belonging is what decides whether a new hire contributes sooner and stays longer.',
    'At scale, the accidents that used to build belonging stop happening. We design them back in — experiences that turn a cohort into a group, so new people speak up in week three instead of month three.'],
  fitH:'What fits onboarding.',
  fit:[
    {h:'Cohort experiences',p:'Turning a list of new names into a real group.'},
    {h:'Belonging by design',p:'The conditions that make people feel part of it, on purpose.'},
    {h:'Distributed onboarding',p:'Belonging built for cohorts who never share a room.'},
    {h:'Measured',p:'A read on whether the cohort actually feels connected.'}],
  faq:[{q:'Does this work for remote hires?',a:'Yes — belonging matters most, and is hardest, for people who never share a room. We design specifically for that.'},
    {q:'When should we run it?',a:'Early — the first weeks are when belonging forms or fails to. We help you time it well.'}],
  related:wsInd({h:'Onboarding at scale',p:'The thinking behind this.',href:'/onboarding-at-scale-belong-faster/',linkText:'Read the insight'}),
  ctaH:'Onboarding a cohort?'}),
wsLeaf({slug:'/who-we-serve-moments-post-merger', name:'Post-merger',
  title:'Post-merger — two cultures, one team · TeamBeam Outings',
  desc:'For post-merger moments — experiences that turn two cultures into one team, on purpose rather than by hope. By TeamBeam.',
  ai:'TeamBeam designs post-merger experiences that dissolve the us-and-them line and build trust and belonging across two merging cultures.',
  keywords:'post merger integration team India, culture integration, M&A team building, merger offsite',
  eyebrow:'Who it\u2019s for · Post-merger', h:'Two cultures, <span class="grad">one team.</span>',
  sub:'For the long stretch after a deal closes — when the org chart is merged but the people are still two teams.',
  pressH:'The line the town hall cannot erase.', press:[
    'A merger is legal on day one and cultural for a long time after. Six months in, you can still see the line — people describe which company they came from, and a reasonable call from the other side reads as a power move. The value in the deal depends on those two teams becoming one, and that does not happen by announcement.',
    'We dissolve the line the only way it dissolves: real shared experience across it, so the two sides discover they can rely on each other. We start at the seams that matter most, and with the leadership team above all.'],
  fitH:'What fits a post-merger moment.',
  fit:[
    {h:'Cross-boundary experiences',p:'The two sides doing real work together, not sitting through a town hall.'},
    {h:'Leadership integration',p:'Because the line at the top cascades down.'},
    {h:'Trust-building',p:'Discovering the other side is competent and decent.'},
    {h:'Measured',p:'A read on whether the us-and-them line is actually fading.'}],
  faq:[{q:'When should we start?',a:'Sooner than most do. The longer the line sits, the harder it hardens. We help you begin at the seams that matter.'},
    {q:'Do we integrate everyone at once?',a:'No — that forces it and breeds resentment. We start where the two sides most have to work together.'}],
  related:wsInd({h:'Post-merger: two cultures, one team',p:'The thinking behind this.',href:'/post-merger-two-cultures-one-team/',linkText:'Read the insight'}),
  ctaH:'Integrating after a merger?'}),
wsLeaf({slug:'/who-we-serve-moments-restructure-reset', name:'Restructure or reset',
  title:'Restructure or reset — rebuilding after change · TeamBeam Outings',
  desc:'For restructures and resets — experiences that rebuild trust and direction after a change has unsettled everyone. By TeamBeam.',
  ai:'TeamBeam designs restructure-and-reset experiences that rebuild trust, clarity and direction after organisational change.',
  keywords:'restructure team building India, reorg reset, change management team, rebuild team after change',
  eyebrow:'Who it\u2019s for · Restructure or reset', h:'Rebuild after <span class="grad">the ground shifted.</span>',
  sub:'For the aftermath of a restructure — when roles have changed, trust is shaken, and the team needs a new footing.',
  pressH:'Change leaves a team unsettled.', press:[
    'A restructure gets the boxes and lines right, and leaves the human part unaddressed. People are unsure of their place, wary of new colleagues, and quietly grieving the old setup. Productivity dips not because anyone is incapable, but because the trust and clarity a team runs on have been shaken.',
    'We help a team find its footing again — rebuilding trust across new lines, restoring clarity about direction and roles, and giving people a way to move forward together rather than looking back.'],
  fitH:'What fits a reset.',
  fit:[
    {h:'Trust rebuilding',p:'Across new teams and reporting lines.'},
    {h:'Clarity & direction',p:'Re-aligning a group after the plan changed.'},
    {h:'Acknowledgement',p:'Space to process the change, not pretend it did not happen.'},
    {h:'A fresh start',p:'A genuine reset that people can rally around.'}],
  faq:[{q:'Is it too soon after the change?',a:'Usually not — the sooner a team can find its footing, the less the dip costs. We design sensitively for where people actually are.'},
    {q:'What if morale is low?',a:'That is exactly the moment this helps. We meet the team honestly and rebuild from there, rather than papering over it.'}],
  related:wsInd({h:'Development & facilitation',p:'Facilitated help through change.',href:'/development-facilitation',linkText:'Development'}),
  ctaH:'Resetting after a restructure?'}),
wsLeaf({slug:'/who-we-serve-moments-burnout-recovery', name:'Burnout recovery',
  title:'Burnout recovery — rest that actually restores · TeamBeam Outings',
  desc:'For burnout recovery — experiences that give a depleted team genuine recovery, not just a day off. By TeamBeam.',
  ai:'TeamBeam designs burnout-recovery experiences focused on genuine restoration and psychological safety for depleted teams, not superficial perks.',
  keywords:'burnout recovery team India, team reset burnout, exhausted team offsite, recovery retreat',
  eyebrow:'Who it\u2019s for · Burnout recovery', h:'Rest that <span class="grad">actually restores.</span>',
  sub:'For a team running on empty — where the real need is recovery, and a pizza lunch does not touch it.',
  pressH:'Recovery is not a day off.', press:[
    'A burnt-out team does not need more stimulation; it needs genuine recovery — and the two are easy to confuse. A high-energy day can leave an exhausted team more depleted. What restores people is space, permission to slow down, and the safety to be honest about how they are really doing.',
    'We design for that: calm, considered experiences that give a team room to breathe, and the trust to admit where they are, so they can sustain the work rather than break under it.'],
  fitH:'What fits a depleted team.',
  fit:[
    {h:'Genuine restoration',p:'Space and calm, not more noise.'},
    {h:'Psychological safety',p:'Making it safe to admit you are stretched.'},
    {h:'Considered pacing',p:'A day designed around a tired team, not against it.'},
    {h:'Quiet destinations',p:'Somewhere that helps a team exhale.'}],
  faq:[{q:'Should it be low-key?',a:'For a genuinely depleted team, usually yes. We design for recovery, not for another demand on their energy.'},
    {q:'Can it prevent burnout, not just treat it?',a:'Yes — measuring energy and belonging over time helps you catch depletion before it becomes burnout.'}],
  related:wsInd({h:'National parks',p:'A destination built for a reset.',href:'/destinations-national-parks',linkText:'National parks'}),
  ctaH:'Is your team running on empty?'}),
wsLeaf({slug:'/who-we-serve-moments-sales-kickoff', name:'Sales kickoff',
  title:'Sales kickoff — energy that survives past week one · TeamBeam Outings',
  desc:'For sales kickoffs — energy that survives past week one, built on a team worth staying on, and measured. By TeamBeam.',
  ai:'TeamBeam designs sales kickoffs that build durable connection and trust, not just a short-lived motivational spike, and measures whether the lift held.',
  keywords:'sales kickoff India, SKO event, sales team offsite, kickoff energy that lasts',
  eyebrow:'Who it\u2019s for · Sales kickoff', h:'Energy that survives <span class="grad">past week one.</span>',
  sub:'For the kickoff that has to do more than light a room for a night — it has to build a team the sellers want to stay on.',
  pressH:'The kickoff high fades fast.', press:[
    'Manufactured energy has a short half-life; the kickoff high is often gone by the second bad week of the quarter. What actually keeps a seller in their seat is quieter — a team where losing is survivable in front of your peers, because sales is mostly losing.',
    'We design kickoffs that bring the energy and build the connection under it, so the lift lasts. And because sales culture rewards the individual, we work in the trust that lets a rep say a deal is slipping early — worth more than any pep talk.'],
  fitH:'What fits a kickoff.',
  fit:[
    {h:'High-energy openings',p:'A room that is genuinely up, at scale.'},
    {h:'Durable connection',p:'A team worth staying on, past the applause.'},
    {h:'Honest culture',p:'The trust that makes pipeline conversations real.'},
    {h:'Measured lift',p:'A read on whether the energy actually held.'}],
  faq:[{q:'Can you handle a big, high-energy room?',a:'Yes — our Beam Arena format is built for exactly that, and we pair the energy with real connection so it lasts.'},
    {q:'How do we make it more than a good night?',a:'By building the trust and belonging underneath the energy, and measuring whether the lift survived the quarter.'}],
  related:wsInd({h:'Sales teams: what they actually need',p:'The thinking behind this.',href:'/sales-teams-what-they-actually-need/',linkText:'Read the insight'},{h:'Beam Arena',p:'The high-energy format.',href:'/team-experiences-beam-arena',linkText:'Beam Arena'}),
  ctaH:'Planning a sales kickoff?'}),
wsLeaf({slug:'/who-we-serve-moments-annual-retreat', name:'The annual retreat',
  title:'The annual retreat — closer, not more exhausted · TeamBeam Outings',
  desc:'For the annual retreat — a yearly gathering that leaves people closer, not more exhausted, and that you can prove worked. By TeamBeam.',
  ai:'TeamBeam designs annual retreats with a real arc and genuine downtime so teams leave closer rather than exhausted, and measures the outcome.',
  keywords:'annual retreat India, company offsite, yearly team retreat, annual offsite planning',
  eyebrow:'Who it\u2019s for · The annual retreat', h:'A retreat that isn\u2019t <span class="grad">exhausting.</span>',
  sub:'For the once-a-year gathering that too often crams so much in that people come back needing a rest from the retreat.',
  pressH:'The retreat that wears people out.', press:[
    'The annual retreat carries a lot of hope and a packed agenda — and often sends people home more tired than they arrived, having done everything except actually connect. A good retreat has an arc and real downtime, not a wall-to-wall schedule.',
    'We design the whole thing around a goal, with genuine space built in, so people leave closer rather than depleted. And we measure it, so the biggest team investment of the year is one you can prove worked.'],
  fitH:'What fits an annual retreat.',
  fit:[
    {h:'A real arc',p:'A retreat that goes somewhere, not a list of sessions.'},
    {h:'Genuine downtime',p:'The space where the best connection actually happens.'},
    {h:'End-to-end handling',p:'Venue, travel and run-of-show, all managed.'},
    {h:'Measured',p:'Proof that the year\u2019s big gathering was worth it.'}],
  faq:[{q:'How do we avoid overloading the agenda?',a:'By designing around a goal and protecting downtime as part of the plan. Less, done well, beats more, done frantically.'},
    {q:'Can you run the whole thing?',a:'Yes — from sourcing the venue to running the days to measuring the outcome.'}],
  related:wsInd({h:'Offsites & Retreats',p:'The whole retreat, handled.',href:'/offsites-retreats',linkText:'Offsites'}),
  ctaH:'Planning your annual retreat?'}),
wsLeaf({slug:'/who-we-serve-moments-distributed-team-connection', name:'Distributed connection',
  title:'Distributed connection — belonging across distance · TeamBeam Outings',
  desc:'For distributed teams — experiences that build belonging and connection across cities and time zones. By TeamBeam.',
  ai:'TeamBeam designs experiences that build connection and belonging for distributed and remote teams, deliberately replacing the accidental bonding co-location provides.',
  keywords:'distributed team building India, remote team connection, hybrid team experience, virtual team building',
  eyebrow:'Who it\u2019s for · Distributed connection', h:'Belonging built <span class="grad">across distance.</span>',
  sub:'For teams spread across cities and time zones — where the connection a shared office gave for free has to be built on purpose.',
  pressH:'Distance removes the accidental glue.', press:[
    'Co-located teams get connection for free — the corridor chat, the shared lunch, the after-work drink. Distributed teams get none of that, and it does not reduce how much connection matters; it just means it has to be designed. A productive remote team can still be a set of strangers, which shows up later as fragile retention and hidden problems.',
    'We build the belonging deliberately — live-hosted online experiences, periodic gatherings, and a connecting thread between them — so a team that rarely shares a room still feels like one.'],
  fitH:'What fits a distributed team.',
  fit:[
    {h:'Online experiences',p:'Genuinely good, live-hosted, not awkward video calls.'},
    {h:'Gather-point offsites',p:'Periodic in-person time, planned and run for you.'},
    {h:'Always-on connection',p:'A thread that keeps belonging warm between events.'},
    {h:'Measured',p:'A read on whether a distributed team actually feels connected.'}],
  faq:[{q:'Can online really build belonging?',a:'Done well, yes — but it has to be designed, not a call with an icebreaker. We build online experiences that genuinely connect.'},
    {q:'Should we still meet in person sometimes?',a:'Where possible, yes — and we plan and run the gather-point. Distributed does not have to mean never together.'}],
  related:wsInd({h:'Delivery modes',p:'In-office, away, or online.',href:'/beam-platform-always-on',linkText:'Always-on'}),
  ctaH:'Leading a distributed team?'}),
wsLeaf({slug:'/who-we-serve-moments-milestone-anniversary', name:'Milestones & anniversaries',
  title:'Milestones & anniversaries — mark it so it matters · TeamBeam Outings',
  desc:'For milestones and anniversaries — experiences that mark the moment so it means something, not just another party. By TeamBeam.',
  ai:'TeamBeam designs milestone and anniversary experiences that give a moment genuine meaning and shared story, rather than a generic celebration.',
  keywords:'company anniversary event India, milestone celebration team, founders day, work anniversary',
  eyebrow:'Who it\u2019s for · Milestones & anniversaries', h:'Mark it so it <span class="grad">means something.</span>',
  sub:'For the moments worth marking — an anniversary, a milestone, a founding day — done so people feel it, not just attend it.',
  pressH:'A party is not the same as meaning.', press:[
    'A milestone deserves more than a generic party that could be for anyone. The moments that land are the ones built around the actual story — what the team came through, what it achieved, who made it happen — so people leave feeling genuinely proud and part of something, not just fed.',
    'We design celebrations with meaning at the centre: the shared story, real recognition, and an experience the team will remember, at whatever scale the moment deserves.'],
  fitH:'What fits a milestone.',
  fit:[
    {h:'Story at the centre',p:'Built around what the team actually came through.'},
    {h:'Real recognition',p:'Specific and genuine, not a blanket thank-you.'},
    {h:'Celebration at scale',p:'From a team to a whole company, with real production.'},
    {h:'A memory that lasts',p:'A moment people are proud they were part of.'}],
  faq:[{q:'How do we make it more than a party?',a:'By anchoring it in your actual story and marking it with genuine recognition. The meaning is the design, not the catering.'},
    {q:'Can you handle a large celebration?',a:'Yes — from an intimate team milestone to a full-company anniversary, end to end.'}],
  related:wsInd({h:'Beam Occasions',p:'Marking the moments that matter.',href:'/beam-occasions',linkText:'Occasions'}),
  ctaH:'Marking a milestone?'})
);

/* ---- X-Leaves: Offsites + Beam Platform pages ---- */
const OR_PARENT={parent:'/offsites-retreats', parentName:'All offsites & retreats'};
const orRel=(a)=>[
  {h:'All offsites & retreats',p:'The full range of multi-day work.',href:'/offsites-retreats',linkText:'Offsites'},
  a,{h:'Where we go',p:'Destinations for your offsite, in India and worldwide.',href:'/destinations',linkText:'Destinations'}
];
const BP_PARENT={parent:'/beam-platform', parentName:'The Beam Platform'};
const bpRel=(a)=>[
  {h:'The Beam Platform',p:'The whole system behind every experience.',href:'/beam-platform',linkText:'The platform'},
  a,{h:'Measurement & proof',p:'How the platform turns a day into a report.',href:'/why-teambeam-measurement-impact',linkText:'How we measure'}
];
PAGES.push(
subformat(Object.assign({},OR_PARENT,{slug:'/offsites-retreats-team-programs', name:'Team programs', tagline:'a multi-day program built around a real goal',
  desc:'Team programs — a focused multi-day offsite built around what your team actually needs to shift, designed and measured by TeamBeam.',
  ai:'TeamBeam team programs are multi-day offsites designed around a specific team-development goal, with a diagnosis first and measurement after.',
  keywords:'team offsite program India, multi day team retreat, team development offsite',
  eyebrow:'Offsites · Team programs', h:'A multi-day offsite <span class="grad">with a point.</span>',
  sub:'A focused program built around the specific thing your team needs to shift — not a generic getaway with a workshop bolted on.',
  whatH:'An arc, not an agenda.', what:[
    'A good multi-day offsite has a shape: it starts where the team actually is, moves it somewhere on purpose, and lands the change so it survives the trip home. We design the whole arc around a real goal — the dimension your team most needs to move — and weave the experiences, the work and the downtime around it.',
    'Because the goal is defined up front, we can measure whether the program moved it, weeks later. A team program is the fullest expression of how we work.'],
  insideH:'What a program includes.',
  inside:[
    {h:'A goal and a reading',p:'We start from what the team needs, not a template.'},
    {h:'A designed arc',p:'Experiences and sessions sequenced to build toward the goal.'},
    {h:'The whole trip handled',p:'Venue, travel and run-of-show, so you can be present.'},
    {h:'Measured follow-up',p:'A re-read at Day 14, 30 and 60 to prove the shift.'}],
  goodH:'When a program fits.', goodLead:'Team programs are our pick when a team needs real change, not just a break.',
  good:[
    {h:'A specific goal',p:'When there is a clear thing you want different afterwards.'},
    {h:'A team ready to invest',p:'A few days is enough to move something that matters.'},
    {h:'Proof required',p:'Leaders who need to show the offsite worked.'}],
  faq:[{q:'How many days?',a:'Usually two to four. We scope it to the goal and tell you honestly what the change needs.'},
    {q:'Is it all work?',a:'No — the downtime is part of the design. The best change happens in the spaces between the sessions.'}],
  related:orRel({h:'Executive experiences',p:'A program shaped for a leadership team.',href:'/offsites-retreats-executive-experiences',linkText:'Executive'})})),
subformat(Object.assign({},OR_PARENT,{slug:'/offsites-retreats-executive-experiences', name:'Executive experiences', tagline:'a considered retreat for leadership teams',
  desc:'Executive experiences — a considered, discreet retreat for a leadership team, designed and measured by TeamBeam.',
  ai:'TeamBeam executive experiences are discreet, high-touch retreats for leadership teams, focused on trust, alignment and decisions.',
  keywords:'executive retreat India, leadership offsite, C-suite team retreat, board offsite',
  eyebrow:'Offsites · Executive experiences', h:'A retreat that matches <span class="grad">the seriousness of the room.</span>',
  sub:'A considered, discreet offsite for a leadership team — where the setting, the facilitation and the discretion all meet the stakes.',
  whatH:'The top team needs a different kind of care.', what:[
    'Working with an executive team is different. The stakes are higher, the discretion required is greater, and the honesty is harder to reach because power makes vulnerability costly. An executive experience is designed for exactly that — a setting worthy of the group, facilitation skilled enough to reach the real conversation, and total discretion.',
    'Because whatever is true of the top team becomes true of the company, this is the highest-leverage offsite you can run.'],
  insideH:'What we attend to.',
  inside:[
    {h:'The right setting',p:'Somewhere that matches the seriousness and earns the time.'},
    {h:'Skilled facilitation',p:'Reaching the real conversation, safely, among senior people.'},
    {h:'Trust & alignment',p:'The health of the team, not just the business plan.'},
    {h:'Discretion',p:'Handled quietly, start to finish.'}],
  goodH:'When to run one.', goodLead:'Executive experiences are our pick for leadership teams at consequential moments.',
  good:[
    {h:'A new or changed top team',p:'After a merger, reshuffle or new joiners.'},
    {h:'Before a defining year',p:'Getting aligned before you set everyone else\u2019s direction.'},
    {h:'A stuck dynamic',p:'When something at the top needs to be worked through.'}],
  faq:[{q:'How is it different from a strategy offsite?',a:'A strategy offsite works on the plan; an executive experience works on the team behind it — its trust, alignment and decisions. Often the two sit together.'},
    {q:'How discreet is it?',a:'Entirely. Executive work is handled with the confidentiality it requires.'}],
  related:orRel({h:'Leadership team training',p:'Focused development for the top team.',href:'/development-facilitation-leadership-team-training',linkText:'Leadership'})})),
subformat(Object.assign({},OR_PARENT,{slug:'/offsites-retreats-high-energy-scale', name:'High-energy & scale', tagline:'large offsites, town-halls and celebrations',
  desc:'High-energy & scale — large offsites, town-halls, kickoffs and celebrations that hold a big group together, designed and run by TeamBeam.',
  ai:'TeamBeam high-energy and scale offsites run large gatherings — all-hands, town-halls, sales kickoffs, holiday parties, milestones — that keep a big group energised and connected.',
  keywords:'large corporate offsite India, all hands event, sales kickoff, company celebration at scale',
  eyebrow:'Offsites · High-energy & scale', h:'Make a big group <span class="grad">feel like one team.</span>',
  sub:'Large offsites, all-hands, kickoffs and celebrations — designed and run so hundreds of people feel connected, not just co-located.',
  whatH:'Scale is a design problem.', what:[
    'Most experiences fall apart when the group gets large — energy leaks, people disengage, and a big event becomes a series of small disconnected ones. Doing scale well is a specific craft: a run-of-show that keeps a whole room in it, formats built to include everyone, and production that holds the energy from start to finish.',
    'We design large gatherings so a company of hundreds leaves feeling like one team, and so the event does real work, not just fills a day.'],
  insideH:'What we run at scale.',
  inside:[
    {h:'All-hands & town-halls',p:'A big gathering that actually lands, not just informs.'},
    {h:'Sales kickoffs',p:'Energy that survives past week one, built on real connection.'},
    {h:'Milestones & anniversaries',p:'Marking the moment so a whole company feels it.'},
    {h:'Holiday & appreciation events',p:'Celebrations that mean something, at scale.'}],
  goodH:'When scale is the challenge.', goodLead:'High-energy & scale is our pick when the group is large and the energy must hold.',
  good:[
    {h:'Whole-company gatherings',p:'When hundreds need to feel like one team.'},
    {h:'Kickoffs and launches',p:'Openings that set the tone for a year.'},
    {h:'Celebrations',p:'Milestones that deserve real production.'}],
  faq:[{q:'How large can you go?',a:'Well into the thousands. Scale is a specific strength of ours, and the design changes with the number.'},
    {q:'Can it still be meaningful, not just loud?',a:'Yes — that is the whole point. We build in the moments of real connection so the energy has somewhere to go.'}],
  related:orRel({h:'Beam Arena',p:'The game-show format built for big rooms.',href:'/team-experiences-beam-arena',linkText:'Beam Arena'})})),
subformat(Object.assign({},OR_PARENT,{slug:'/offsites-retreats-sourcing-planning', name:'Sourcing & planning', tagline:'the whole offsite, handled',
  desc:'Sourcing & planning — the venue found, the travel arranged, the run-of-show built, so you can be present with your team. By TeamBeam.',
  ai:'TeamBeam sourcing and planning handles offsite logistics end to end — venue, travel, run-of-show — so internal teams do not have to.',
  keywords:'offsite planning India, corporate event management, venue sourcing team offsite, offsite logistics',
  eyebrow:'Offsites · Sourcing & planning', h:'You be present. <span class="grad">We handle the rest.</span>',
  sub:'The venue found, the travel arranged, the run-of-show built — so the person who would normally run the offsite gets to actually take part in it.',
  whatH:'The unglamorous work that makes the day.', what:[
    'Behind every good offsite is a mountain of logistics — venues compared, contracts negotiated, travel booked, timings sequenced, contingencies planned. Usually that falls on one internal person who then spends the offsite running it instead of being in it. Sourcing & planning takes all of that off your plate.',
    'We find the right place for your goal and budget, arrange the travel, build the run-of-show, and manage the day, so your people simply arrive and take part.'],
  insideH:'What we handle.',
  inside:[
    {h:'Venue sourcing',p:'The right place for your goal, group and budget, negotiated.'},
    {h:'Travel & logistics',p:'Getting everyone there and back without the headache.'},
    {h:'Run-of-show',p:'The full day sequenced and timed, with contingencies.'},
    {h:'On-the-day management',p:'Someone running it so you do not have to.'}],
  goodH:'When to hand it over.', goodLead:'Sourcing & planning is our pick when you want the offsite handled end to end.',
  good:[
    {h:'Stretched internal teams',p:'When no one has time to plan it properly.'},
    {h:'The person who always runs it',p:'So they can finally take part instead.'},
    {h:'Complex logistics',p:'Multiple locations, large groups, tight timelines.'}],
  faq:[{q:'Can you just do the logistics?',a:'Yes — you can take sourcing and planning on its own, or paired with the experiences and facilitation. Your call.'},
    {q:'Do you work with our preferred venues?',a:'Of course. We can source fresh options or work with places you already like.'}],
  related:orRel({h:'Team programs',p:'The full designed program, with logistics included.',href:'/offsites-retreats-team-programs',linkText:'Team programs'})})),
subformat(Object.assign({},BP_PARENT,{slug:'/beam-platform-planning-assistant', name:'Planning assistant', tagline:'shapes the brief and the run-of-show',
  desc:'The Beam Platform planning assistant shapes the brief and the run-of-show, so nothing is left to the day. By TeamBeam.',
  ai:'The Beam Platform planning assistant helps shape the brief and run-of-show for a team experience, so planning is structured rather than ad hoc.',
  keywords:'event planning tool, offsite run of show, team experience planning, beam platform',
  eyebrow:'Beam Platform · Planning', h:'The plan, <span class="grad">before the day.</span>',
  sub:'The part of the platform that shapes the brief and builds the run-of-show — so the day is designed, not improvised.',
  whatH:'Good days are planned twice.', what:[
    'The difference between a smooth experience and a scramble is almost always the planning. The Beam Platform\u2019s planning layer captures the goal, shapes the brief, and builds a run-of-show detailed enough that everyone knows what happens when — long before anyone arrives.',
    'It is the quiet backbone that lets the day feel effortless.'],
  insideH:'What it does.',
  inside:[
    {h:'Captures the goal',p:'What you want different afterwards, front and centre.'},
    {h:'Shapes the brief',p:'Turning a goal into a clear plan.'},
    {h:'Builds the run-of-show',p:'The day sequenced and timed, with contingencies.'},
    {h:'Aligns everyone',p:'One shared plan, so nothing is a surprise.'}],
  goodH:'Why it matters.', goodLead:'Planning is where a good day is won.',
  good:[
    {h:'Complex days',p:'Where a lot has to happen in the right order.'},
    {h:'Large groups',p:'Where improvisation does not scale.'},
    {h:'Clear accountability',p:'Everyone working from the same plan.'}],
  faq:[{q:'Do we use the tool ourselves?',a:'We run it for you as part of designing your experience. You see the plan through the client dashboard.'},
    {q:'Is this the whole platform?',a:'No — it is the planning layer. The live app, dashboard and measurement complete it.'}],
  related:bpRel({h:'Live event app',p:'What runs the day the plan describes.',href:'/beam-platform-live-event-app',linkText:'Live app'})})),
subformat(Object.assign({},BP_PARENT,{slug:'/beam-platform-live-event-app', name:'Live event app', tagline:'runs the experience on the day',
  desc:'The Beam Platform live event app runs the experience on the day — scores, prompts and flow, in one place. By TeamBeam.',
  ai:'The Beam Platform live event app runs team experiences on the day, handling scoring, prompts and flow in one place.',
  keywords:'live event app team building, game scoring app, corporate event app, beam platform',
  eyebrow:'Beam Platform · Live app', h:'The day, <span class="grad">running smoothly.</span>',
  sub:'The part of the platform that runs the experience live — scores, prompts, timing and flow, in one place, so the day just works.',
  whatH:'Where the plan meets the room.', what:[
    'On the day, a hundred small things have to happen at the right moment — a round starts, scores update, a prompt appears, the flow moves on. The live app holds all of that in one place, so the facilitator can focus on the people, not the mechanics.',
    'It is what lets a large, complex experience feel seamless from the inside.'],
  insideH:'What it runs.',
  inside:[
    {h:'Scoring & leaderboards',p:'Live, accurate, and visible when it should be.'},
    {h:'Prompts & flow',p:'The right thing on screen at the right moment.'},
    {h:'Timing',p:'Keeping a big room moving without dragging.'},
    {h:'Hybrid support',p:'On-site and remote joiners together.'}],
  goodH:'Why it matters.', goodLead:'The live app is what makes a complex day feel effortless.',
  good:[
    {h:'Large events',p:'Where manual would break down.'},
    {h:'Fast-moving formats',p:'Game shows and challenges that need real-time flow.'},
    {h:'Hybrid groups',p:'In-room and remote, kept in sync.'}],
  faq:[{q:'Do participants need to install anything?',a:'Usually it is web-based and effortless to join. We handle the setup so the experience is frictionless.'},
    {q:'What if the wifi fails?',a:'We plan for it — the day is designed with contingencies so a connection hiccup never derails it.'}],
  related:bpRel({h:'Client dashboard',p:'Your window into the plan, the day and the results.',href:'/beam-platform-client-dashboard',linkText:'Dashboard'})})),
subformat(Object.assign({},BP_PARENT,{slug:'/beam-platform-client-dashboard', name:'Client dashboard', tagline:'your view of the plan, the day and the results',
  desc:'The Beam Platform client dashboard gives you one clear view of the plan, the day and the results. By TeamBeam.',
  ai:'The Beam Platform client dashboard gives clients a single view of the plan, the live day and the measured results.',
  keywords:'client dashboard team building, event results dashboard, team health dashboard, beam platform',
  eyebrow:'Beam Platform · Dashboard', h:'Everything in <span class="grad">one clear place.</span>',
  sub:'Your single window into it all — the plan before, the day as it happens, and the results after.',
  whatH:'No chasing for updates.', what:[
    'Working with a partner should not mean waiting for email updates and wondering where things stand. The client dashboard puts the whole engagement in front of you — the agreed plan, the live day, and the measured results afterwards — so you always know exactly where things are.',
    'It is transparency by default, and it is where the measurement lands as a report you can use.'],
  insideH:'What you see.',
  inside:[
    {h:'The plan',p:'The agreed brief and run-of-show, in one place.'},
    {h:'The day',p:'How the experience is unfolding, live.'},
    {h:'The results',p:'The Day 14, 30 and 60 reading as it comes in.'},
    {h:'The report',p:'The written outcome, ready for leadership.'}],
  goodH:'Why it matters.', goodLead:'The dashboard is transparency and proof in one place.',
  good:[
    {h:'People leaders',p:'Who need the evidence to hand.'},
    {h:'Busy sponsors',p:'Who want the picture without the chasing.'},
    {h:'Multi-event programs',p:'Where a shared view keeps everything joined up.'}],
  faq:[{q:'Who can access it?',a:'Whoever you choose on your side. We set up access so the right people have the view they need.'},
    {q:'Is our data private?',a:'Yes. Your dashboard is yours; we treat everything on it with care and confidentiality.'}],
  related:bpRel({h:'Measurement',p:'The reading that fills the results view.',href:'/beam-platform-measurement',linkText:'Measurement'})})),
subformat(Object.assign({},BP_PARENT,{slug:'/beam-platform-measurement', name:'Measurement', tagline:'the Day 14/30/60 reading, as a report',
  desc:'The Beam Platform measurement layer reads team health at Day 14, 30 and 60 and turns it into a report for leadership. By TeamBeam.',
  ai:'The Beam Platform measurement layer captures team-health readings before and at Day 14, 30 and 60, and produces a leadership report.',
  keywords:'team health measurement platform, day 14 30 60, team building measurement, impact report',
  eyebrow:'Beam Platform · Measurement', h:'The part most skip: <span class="grad">the proof.</span>',
  sub:'The layer that reads team health before and after — at Day 14, 30 and 60 — and turns it into a report you can show.',
  whatH:'Where a day becomes evidence.', what:[
    'Most team experiences end when everyone goes home. Ours keep going, quietly, through the measurement layer — a baseline before, then readings at fourteen, thirty and sixty days, so the change can be seen over time rather than assumed on the day.',
    'The output is a clear report: what moved, and whether it held. It is the reason we can say we prove it.'],
  insideH:'How it works.',
  inside:[
    {h:'A baseline',p:'A reading before the experience, so there is a before.'},
    {h:'Three follow-ups',p:'Day 14, 30 and 60 — glow, pressure, and new normal.'},
    {h:'The curve',p:'The shape of the change, which tells you what happened.'},
    {h:'The report',p:'A clear write-up for leadership.'}],
  goodH:'Why it matters.', goodLead:'Measurement is the whole difference between a memory and a result.',
  good:[
    {h:'Budgets to defend',p:'Evidence that survives a review.'},
    {h:'Boards to convince',p:'A curve, not a claim.'},
    {h:'Programs to steer',p:'Knowing what to reinforce next.'}],
  faq:[{q:'Is this the same as the free Snapshot?',a:'No. The Snapshot is a quick public self-check. This is the proper, tracked measurement built into how we deliver.'},
    {q:'What does it ask of our people?',a:'Short, light check-ins at each point — a few minutes each — designed for real response rates.'}],
  related:bpRel({h:'Measurement & proof',p:'The thinking behind the cadence.',href:'/why-teambeam-measurement-impact',linkText:'How we measure'})})),
subformat(Object.assign({},BP_PARENT,{slug:'/beam-platform-always-on', name:'Always-on', tagline:'keeping a team connected between events',
  desc:'The Beam Platform always-on layer keeps a team connected between events, not just on the day. By TeamBeam.',
  ai:'The Beam Platform always-on layer sustains team connection and light engagement between experiences, so momentum does not fade.',
  keywords:'always on team engagement, continuous team connection, between events engagement, beam platform',
  eyebrow:'Beam Platform · Always-on', h:'Connection that <span class="grad">outlasts the day.</span>',
  sub:'The layer that keeps a team connected between experiences — so the momentum from a great day does not quietly fade by the next month.',
  whatH:'The gap between events is where things slip.', what:[
    'A single great experience creates a lift, but lifts fade if nothing sustains them. The always-on layer keeps a light thread of connection running between events — small, low-effort touchpoints that keep a team engaged and keep the momentum from an experience alive until the next one.',
    'It turns team development from an occasional event into something continuous.'],
  insideH:'What it does.',
  inside:[
    {h:'Light touchpoints',p:'Small, regular nudges that keep connection warm.'},
    {h:'Momentum',p:'Sustaining the lift from an experience rather than losing it.'},
    {h:'A continuous thread',p:'Team development between events, not just at them.'},
    {h:'Signal over time',p:'A sense of how the team is doing between readings.'}],
  goodH:'Why it matters.', goodLead:'Always-on is our pick when you want continuity, not one-off events.',
  good:[
    {h:'Ongoing programs',p:'Where you want momentum sustained between sessions.'},
    {h:'Distributed teams',p:'Who need a connecting thread across distance.'},
    {h:'Long-term culture work',p:'Where change is a habit, not an event.'}],
  faq:[{q:'Is this heavy for our people?',a:'No — it is deliberately light. The point is a warm thread, not another thing on the to-do list.'},
    {q:'Does it replace real experiences?',a:'No. It sustains them. Always-on keeps momentum between the experiences that create it.'}],
  related:bpRel({h:'The Beam Platform',p:'How always-on fits the whole system.',href:'/beam-platform',linkText:'The platform'})}))
);

/* ---- X-Leaves: Impact/CSR + Self-Serve pages ---- */
const IC_PARENT={parent:'/impact-csr', parentName:'All Impact & CSR'};
const icRel=(a)=>[
  {h:'All Impact & CSR',p:'The full range of give-back work.',href:'/impact-csr',linkText:'Impact & CSR'},
  a,{h:'Volunteer with your team',p:'Ways to give back, and the report you can file.',href:'/volunteer',linkText:'Volunteer'}
];
const SS_PARENT={parent:'/self-serve-kits', parentName:'All Self-Serve & Kits'};
const ssRel=(a)=>[
  {h:'All Self-Serve & Kits',p:'Run a great session with your own people.',href:'/self-serve-kits',linkText:'Self-Serve'},
  a,{h:'How we work',p:'The method behind every kit and playbook.',href:'/why-teambeam',linkText:'The method'}
];
PAGES.push(
subformat(Object.assign({},IC_PARENT,{slug:'/impact-csr-beam-green', name:'Beam Green', tagline:'environmental give-back for teams',
  desc:'Beam Green — environmental projects a team can see the result of, from planting to clean-ups to restoration, with a report your CSR and ESG teams can file. By TeamBeam.',
  ai:'Beam Green is TeamBeam\u2019s environmental CSR format: tree planting, restoration, clean-ups and waste projects, delivered with a filable impact report.',
  keywords:'environmental CSR India, corporate tree planting, beach clean up team, ESG team activity',
  eyebrow:'Impact & CSR · Beam Green', h:'Give back to the planet — <span class="grad">and see the result.</span>',
  sub:'Environmental projects a team can point to afterwards — planting, cleaning, restoring — with a report your CSR and ESG teams can file.',
  whatH:'Real impact, not a token gesture.', what:[
    'The best environmental days are the ones a team can see the result of by the time they leave. Beam Green is built around visible, real impact — trees in the ground, a stretch of coast cleaned, a habitat restored — so people leave having genuinely done something, not just posed for a photo.',
    'And because CSR and ESG mandates need evidence, every project produces a report your teams can file — what was done, where, and the measurable outcome.'],
  insideH:'Ways to go green.',
  inside:[
    {h:'Planting & restoration',p:'Trees, habitats and green spaces a team helps bring back.'},
    {h:'Clean-ups',p:'Coast, lake or neighbourhood — visible, satisfying, immediate.'},
    {h:'Water & waste',p:'Projects around water bodies and waste that leave a lasting mark.'},
    {h:'Green builds',p:'Building something sustainable a community will use.'}],
  goodH:'When Beam Green fits.', goodLead:'Beam Green is our pick when impact needs to be visible and filable.',
  good:[
    {h:'A CSR mandate',p:'Real give-back with the documentation your teams need.'},
    {h:'ESG reporting',p:'A measurable environmental outcome to point to.'},
    {h:'Teams who want to do good',p:'People who would rather help than compete for a day.'}],
  faq:[{q:'Do we get a report?',a:'Yes. Every Beam Green project comes with an impact report your CSR and ESG teams can file — what was done, where, and the outcome.'},
    {q:'Can it be combined with a team day?',a:'Yes. Many teams pair the give-back with a shorter experience so the day does double duty.'}],
  related:icRel({h:'Beam Builds',p:'Build something a community needs, together.',href:'/impact-csr-beam-builds',linkText:'Beam Builds'})})),
subformat(Object.assign({},IC_PARENT,{slug:'/impact-csr-beam-builds', name:'Beam Builds', tagline:'build for communities, together',
  desc:'Beam Builds — build something a community needs in a single focused day, bonding and giving back at once, with a report to file. By TeamBeam.',
  ai:'Beam Builds is TeamBeam\u2019s build-for-community CSR format: assembling or constructing something a community needs in a day, with an impact report.',
  keywords:'corporate build project India, community build CSR, assemble donate team, give back team building',
  eyebrow:'Impact & CSR · Beam Builds', h:'Build something <span class="grad">a community needs.</span>',
  sub:'A team builds or assembles something a community genuinely needs, in a single focused day — bonding and giving back in the same breath.',
  whatH:'The best build serves someone.', what:[
    'There is a particular satisfaction in building something with your team and then handing it to someone who needed it. Beam Builds channels that — assembling bikes or wheelchairs, constructing a facility, putting together equipment — into a day that bonds the team through the work and gives back through the result.',
    'It is give-back and team-building at once, and like all our CSR work, it comes with a report you can file.'],
  insideH:'Ways to build.',
  inside:[
    {h:'Assembly builds',p:'Bikes, wheelchairs, kits — assembled by teams, donated to a cause.'},
    {h:'Facility builds',p:'Constructing or refurbishing something a community will use.'},
    {h:'Equipment drives',p:'Building and packing kit for schools, shelters or NGOs.'},
    {h:'Custom builds',p:'Matched to a cause your company cares about.'}],
  goodH:'When Beam Builds fits.', goodLead:'Beam Builds is our pick for hands-on give-back with a tangible result.',
  good:[
    {h:'A CSR day with a keepsake outcome',p:'Something real, handed to someone who needed it.'},
    {h:'Teams who like to make',p:'Building together is its own kind of bonding.'},
    {h:'A cause you already support',p:'We match the build to it.'}],
  faq:[{q:'Where does what we build go?',a:'To a matched cause or community partner. We arrange the recipient and handle logistics, and you get a report on the impact.'},
    {q:'How many can take part?',a:'From a single team to a large group split into build stations. We scale the project to the number.'}],
  related:icRel({h:'Beam Community',p:'Hands-on community projects beyond building.',href:'/impact-csr-beam-community',linkText:'Beam Community'})})),
subformat(Object.assign({},IC_PARENT,{slug:'/impact-csr-beam-community', name:'Beam Community', tagline:'hands-on community projects for teams',
  desc:'Beam Community — hands-on community projects matched to your people and your cause, with a report to file. By TeamBeam.',
  ai:'Beam Community is TeamBeam\u2019s community-engagement CSR format: skilling, mentoring, drives and community events matched to a cause, with an impact report.',
  keywords:'community CSR India, corporate volunteering project, mentoring drive team, social impact team activity',
  eyebrow:'Impact & CSR · Beam Community', h:'Time with a community, <span class="grad">not just for it.</span>',
  sub:'Hands-on community projects — skilling, mentoring, drives, events — matched to your people and a cause you care about.',
  whatH:'The give-back that is about people.', what:[
    'Some of the most meaningful give-back is not about building or planting — it is about time spent with people. Beam Community matches your team to a cause and a project where the impact is human: teaching a skill, mentoring, running a community event, driving a collection.',
    'It tends to move people more than any other format, because the result looks back at you. And it comes with the report your CSR teams need.'],
  insideH:'Ways to engage.',
  inside:[
    {h:'Skilling & teaching',p:'Your team sharing what they know with those who can use it.'},
    {h:'Mentoring',p:'Time and guidance for people who benefit from both.'},
    {h:'Drives & collections',p:'Organising and running a collection for a cause.'},
    {h:'Community events',p:'Putting on an event a community will remember.'}],
  goodH:'When Beam Community fits.', goodLead:'Beam Community is our pick for human, connection-led give-back.',
  good:[
    {h:'A people-first culture',p:'Teams who want their give-back to be personal.'},
    {h:'An ongoing cause',p:'A partner relationship, not a one-off.'},
    {h:'Meaning over spectacle',p:'When depth matters more than scale.'}],
  faq:[{q:'How do you match us to a cause?',a:'We work from what your company and people care about, and connect you with a vetted partner where the project fits.'},
    {q:'Is there a report?',a:'Yes — as with all our CSR work, you get a report on what was done and its impact.'}],
  related:icRel({h:'Beam Green',p:'Environmental give-back with visible impact.',href:'/impact-csr-beam-green',linkText:'Beam Green'})})),
subformat(Object.assign({},IC_PARENT,{slug:'/impact-csr-diy-impact-kits', name:'DIY Impact Kits', tagline:'self-run give-back for distributed teams',
  desc:'DIY Impact Kits — self-run give-back kits for teams who want to do it in their own time, anywhere, with a report to file. By TeamBeam.',
  ai:'TeamBeam DIY Impact Kits are self-run give-back kits shipped to teams, ideal for distributed or remote groups, with guidance and an impact report.',
  keywords:'DIY CSR kit India, remote volunteering kit, distributed team give back, self run CSR',
  eyebrow:'Impact & CSR · DIY Impact Kits', h:'Give back <span class="grad">in your own time.</span>',
  sub:'Self-run give-back kits, shipped to your teams, so a distributed group can do good together without gathering in one place.',
  whatH:'CSR that travels.', what:[
    'Not every team can be in one place for a give-back day — and distributed teams should not miss out on the connection it brings. DIY Impact Kits solve that: everything needed for a meaningful give-back project, shipped to your people, with clear guidance so they can run it themselves, together or in parallel across cities.',
    'It keeps the impact real and the report filable, without the logistics of getting everyone to one location.'],
  insideH:'What is in a kit.',
  inside:[
    {h:'Everything needed',p:'Materials, instructions and the cause, in the box.'},
    {h:'Run-it-yourself guidance',p:'Clear steps so any team can deliver it well.'},
    {h:'Distributed delivery',p:'Kits shipped to homes or offices across cities.'},
    {h:'The report',p:'Collated impact your CSR team can still file.'}],
  goodH:'When DIY kits fit.', goodLead:'DIY Impact Kits are our pick for distributed and remote give-back.',
  good:[
    {h:'Distributed teams',p:'People spread across cities who still want to give back together.'},
    {h:'Remote-first cultures',p:'Give-back that does not depend on gathering.'},
    {h:'Recurring CSR',p:'A repeatable way to keep giving back through the year.'}],
  faq:[{q:'Can a remote team do this together?',a:'Yes — kits ship to every location, and we can run it as a live, shared session so it still feels like one team.'},
    {q:'Do we still get a report?',a:'Yes. We collate the impact across locations into a single report you can file.'}],
  related:icRel({h:'Self-Serve & Kits',p:'The same self-run idea, across all our experiences.',href:'/self-serve-kits',linkText:'Self-Serve'})})),
subformat(Object.assign({},SS_PARENT,{slug:'/self-serve-kits-beam-kits', name:'Beam Kits', tagline:'ready-to-run experience kits',
  desc:'Beam Kits — everything for a specific experience, boxed and ready for your own team to run. By TeamBeam.',
  ai:'Beam Kits are TeamBeam ready-to-run experience kits: materials and a guide for a specific team experience, boxed and shipped for internal teams to deliver themselves.',
  keywords:'team building kit India, ready to run team activity, boxed team experience, self run team building',
  eyebrow:'Self-Serve · Beam Kits', h:'Our experience, <span class="grad">boxed and ready.</span>',
  sub:'Everything needed for a specific experience, in a box — so your own people can run a genuinely good session without us in the room.',
  whatH:'Great design, your hands.', what:[
    'Not everything needs us on site. Beam Kits take one of our experiences and package it — the materials, the structure, and a guide clear enough that anyone can run it well. Your team gets the quality of a designed experience, delivered by your own people, at their own pace.',
    'It is the affordable, repeatable way to bring good team experiences into a company without booking a facilitator every time.'],
  insideH:'What is in a kit.',
  inside:[
    {h:'The materials',p:'Everything the experience needs, packed and shipped.'},
    {h:'A clear guide',p:'Step-by-step, so anyone can run it confidently.'},
    {h:'Themed options',p:'Different experiences for different goals.'},
    {h:'Debrief built in',p:'The reflection that turns an activity into value.'}],
  goodH:'When kits fit.', goodLead:'Beam Kits are our pick for repeatable, in-house experiences.',
  good:[
    {h:'Frequent small sessions',p:'When you want to run experiences regularly, not occasionally.'},
    {h:'Budget-conscious teams',p:'Quality without a facilitator fee each time.'},
    {h:'Distributed offices',p:'Ship the same kit everywhere for a shared experience.'}],
  faq:[{q:'Do we need a trained facilitator?',a:'No — the guide is written so any capable person can run it. For more, Beam Certify trains your people to our standard.'},
    {q:'Can kits be branded to us?',a:'Yes, we can tailor a kit to your company or theme.'}],
  related:ssRel({h:'Beam Playbook',p:'The deeper facilitator\u2019s guide.',href:'/self-serve-kits-beam-playbook',linkText:'Beam Playbook'})})),
subformat(Object.assign({},SS_PARENT,{slug:'/self-serve-kits-beam-playbook', name:'Beam Playbook', tagline:'the facilitator\u2019s guide',
  desc:'Beam Playbook — the facilitator\u2019s guide to running our experiences well: what to say, when, and why it works. By TeamBeam.',
  ai:'Beam Playbook is TeamBeam\u2019s facilitator guide covering run-of-show, prompts, timing and debrief so internal facilitators can deliver experiences to a high standard.',
  keywords:'facilitator playbook India, team building facilitation guide, run of show guide, internal facilitation',
  eyebrow:'Self-Serve · Beam Playbook', h:'What to say, when, <span class="grad">and why it works.</span>',
  sub:'The facilitator\u2019s guide behind our experiences — the run-of-show, the prompts, the timing and the debrief — so your people can deliver to a real standard.',
  whatH:'The craft, written down.', what:[
    'Good facilitation looks effortless because someone thought hard about every moment. Beam Playbook captures that thinking — how to open, when to intervene, what to ask in the debrief, when to say less — so a capable person on your team can deliver an experience the way we would.',
    'It is the difference between running an activity and facilitating one, made available to your own people.'],
  insideH:'What is inside.',
  inside:[
    {h:'Run-of-show',p:'The full sequence, timed, so nothing is left to chance.'},
    {h:'Prompts & scripts',p:'What to say at each turn, and why.'},
    {h:'Reading the room',p:'When to push, when to ease, when to step back.'},
    {h:'The debrief',p:'The questions that turn an experience into a lesson.'}],
  goodH:'When the Playbook fits.', goodLead:'Beam Playbook is our pick for capable internal facilitators.',
  good:[
    {h:'An in-house L&D team',p:'People who facilitate and want to do it better.'},
    {h:'Scaling experiences',p:'Running the same session well across many teams.'},
    {h:'Consistency',p:'A shared standard so every run lands the same way.'}],
  faq:[{q:'Is a playbook enough on its own?',a:'For a capable facilitator, often yes. To build the skill from scratch, Beam Certify adds training and support.'},
    {q:'Does it cover the debrief?',a:'Yes — the debrief is where the value lands, so the Playbook treats it as carefully as the activity.'}],
  related:ssRel({h:'Beam Certify',p:'Train your facilitators to our standard.',href:'/self-serve-kits-beam-certify',linkText:'Beam Certify'})})),
subformat(Object.assign({},SS_PARENT,{slug:'/self-serve-kits-beam-certify', name:'Beam Certify', tagline:'train your own facilitators',
  desc:'Beam Certify — train your own facilitators to deliver TeamBeam experiences to our standard, with ongoing support. By TeamBeam.',
  ai:'Beam Certify is TeamBeam\u2019s facilitator certification program, training internal facilitators to a consistent standard with ongoing support.',
  keywords:'facilitator certification India, train internal facilitators, team building certification, L&D certification',
  eyebrow:'Self-Serve · Beam Certify', h:'Your facilitators, <span class="grad">to our standard.</span>',
  sub:'Train your own people to deliver our experiences consistently and well — with certification and ongoing support, so quality does not depend on us being in the room.',
  whatH:'Build the capability in-house.', what:[
    'For companies that want to run experiences often, the smartest move is to build the skill internally. Beam Certify trains your facilitators to our standard — the craft of reading a room, holding a group, and landing a debrief — and certifies them, so you can deliver quality experiences without booking us each time.',
    'It comes with ongoing support, so your facilitators keep improving rather than drifting.'],
  insideH:'What certification includes.',
  inside:[
    {h:'Facilitator training',p:'The craft, taught and practised until it is usable.'},
    {h:'Certification',p:'A standard your facilitators are measured against.'},
    {h:'The toolkit',p:'Playbooks and kits to deliver with.'},
    {h:'Ongoing support',p:'Refreshers and guidance so the skill keeps growing.'}],
  goodH:'When to certify.', goodLead:'Beam Certify is our pick for building lasting in-house capability.',
  good:[
    {h:'High-volume needs',p:'Companies running experiences across many teams, often.'},
    {h:'L&D functions',p:'Teams whose job is to develop people internally.'},
    {h:'Consistency at scale',p:'One standard, wherever and whoever delivers.'}],
  faq:[{q:'How long does certification take?',a:'It depends on the depth you want. We scope a program to your goals and the number of facilitators.'},
    {q:'What happens after?',a:'Your facilitators are certified and supported. We stay available for refreshers and new formats.'}],
  related:ssRel({h:'Beam Playbook',p:'The guide your certified facilitators run from.',href:'/self-serve-kits-beam-playbook',linkText:'Beam Playbook'})})),
subformat(Object.assign({},SS_PARENT,{slug:'/self-serve-kits-offsite-in-a-box', name:'Offsite in a box', tagline:'a full day\u2019s structure to run yourself',
  desc:'Offsite in a box — a full day\u2019s structure your team can pick up and run on their own: agenda, activities, materials and debrief included. By TeamBeam.',
  ai:'Offsite in a box is a TeamBeam self-run full-day offsite package: agenda, activities, materials and debrief, designed for teams to deliver themselves.',
  keywords:'offsite in a box India, run your own offsite, DIY team offsite, self run offsite kit',
  eyebrow:'Self-Serve · Offsite in a box', h:'A whole offsite, <span class="grad">ready to run.</span>',
  sub:'A full day\u2019s structure your team can pick up and deliver on its own — the agenda, the activities, the materials and the debrief, all designed and packaged.',
  whatH:'The whole day, thought through.', what:[
    'Running your own offsite usually means building the day from scratch and hoping it flows. Offsite in a box removes that: a complete, designed day — the arc, the activities, the timing, the materials, the reflection — packaged so a capable person on your team can run a genuinely good offsite without us.',
    'It is the self-serve version of what we do on site: our design, your delivery, a real day.'],
  insideH:'What is in the box.',
  inside:[
    {h:'A designed agenda',p:'A full day with a real arc, not a list of activities.'},
    {h:'The activities',p:'Chosen and sequenced to build toward a goal.'},
    {h:'All the materials',p:'Everything you need to run it, packed.'},
    {h:'The debrief',p:'The reflection that makes the day worth it.'}],
  goodH:'When it fits.', goodLead:'Offsite in a box is our pick for teams who want to self-run a full day.',
  good:[
    {h:'Budget or timing constraints',p:'A real offsite without a facilitator booking.'},
    {h:'Capable internal leads',p:'Someone who can run the day from a good structure.'},
    {h:'Repeat offsites',p:'A reusable framework you can run again and adapt.'}],
  faq:[{q:'Can we adapt it?',a:'Yes — it is a structure, not a script. We can tailor it to your goal, and your lead can flex it on the day.'},
    {q:'What if we want you there after all?',a:'Then we simply run it for you. Offsite in a box is for when you would rather do it yourselves.'}],
  related:ssRel({h:'Offsites & Retreats',p:'Prefer us to run the whole thing? Here is how.',href:'/offsites-retreats',linkText:'Offsites'})}))
);

/* ---- X-Leaves: Development & Facilitation pages ---- */
const DF_PARENT={parent:'/development-facilitation', parentName:'All development & facilitation'};
const dfRel=(a)=>[
  {h:'All development & facilitation',p:'The full range of facilitated work.',href:'/development-facilitation',linkText:'Development'},
  a,{h:'How we work',p:'We read the team before we design the session.',href:'/why-teambeam',linkText:'The method'}
];
PAGES.push(
subformat(Object.assign({},DF_PARENT,{slug:'/development-facilitation-assessment-led-development', name:'Assessment-led development', tagline:'development built on a reading of the team',
  desc:'Assessment-led development — start from a reading of the team, then design the session around the gap it reveals. By TeamBeam.',
  ai:'TeamBeam assessment-led development reads a team across eight dimensions first, then designs targeted development for the specific gap, and measures the change afterwards.',
  keywords:'assessment led team development India, diagnostic team development, targeted team training',
  eyebrow:'Development · Assessment-led', h:'Development that <span class="grad">starts from evidence.</span>',
  sub:'We read where the team actually is, then build the session around the gap that reading reveals — not a stock curriculum.',
  whatH:'Prescribe after examining, not before.', what:[
    'Generic development treats every team as if it has the same problem. It rarely does. Assessment-led development flips the order: we read the team first, find the one or two dimensions costing it most, and design directly for those. The session fits because it was built to.',
    'It also makes the work measurable. Because we defined what we were trying to move before we started, we can come back and show whether it moved — at Day 14, 30 and 60.'],
  insideH:'How it works.',
  inside:[
    {h:'The reading',p:'A structured look at the team across the eight dimensions, before anything is designed.'},
    {h:'Targeted design',p:'A session built for the specific gap, not a shelf program.'},
    {h:'Facilitated delivery',p:'Run by a facilitator who can hold the real conversation.'},
    {h:'Measured follow-up',p:'A re-read weeks later to confirm what actually changed.'}],
  goodH:'When this fits.', goodLead:'This is our pick when you want development that is aimed, not generic.',
  good:[
    {h:'Teams that tried generic training',p:'And found it did not stick, because it was not built for them.'},
    {h:'Leaders who need proof',p:'A defined goal and a measured result, not a feelgood day.'},
    {h:'A known but unnamed problem',p:'When you can feel something is off but cannot quite name it.'}],
  faq:[{q:'How is the reading taken?',a:'Through a structured, light process we run with the team. We keep the mechanics to ourselves; what you get is a clear picture and a design built on it.'},
    {q:'Is this the same as the free Snapshot?',a:'No. The Snapshot is a quick public self-check. This is the proper reading we do before real development work.'}],
  related:dfRel({h:'Measurement & proof',p:'How we show the development actually worked.',href:'/why-teambeam-measurement-impact',linkText:'How we measure'})})),
subformat(Object.assign({},DF_PARENT,{slug:'/development-facilitation-expert-facilitation', name:'Expert facilitation', tagline:'a skilled facilitator for the conversations that matter',
  desc:'Expert facilitation — a skilled, neutral facilitator to hold a hard conversation, align a group, or resolve a conflict, and land it well. By TeamBeam.',
  ai:'TeamBeam expert facilitation provides a skilled neutral facilitator for hard conversations, alignment sessions, conflict resolution and decision workshops.',
  keywords:'expert facilitation India, team facilitator, meeting facilitation, conflict resolution facilitator',
  eyebrow:'Development · Expert facilitation', h:'The conversation that <span class="grad">needs a steady hand.</span>',
  sub:'Some conversations are too important, or too charged, to run yourself. A skilled, neutral facilitator holds the room so the real thing can be said — and resolved.',
  whatH:'A neutral in the room changes everything.', what:[
    'When a leader facilitates their own hard conversation, people manage their words. When a skilled neutral holds it, the real thing gets said, safely, and actually moves toward a resolution. That neutrality is the whole value — it is why the same discussion goes differently with the right person at the front.',
    'We provide facilitators who can read a room in real time, keep it safe, surface what is unsaid, and get a group to a genuine decision rather than a polite non-answer.'],
  insideH:'Where a facilitator earns their place.',
  inside:[
    {h:'Hard conversations',p:'The discussion everyone has been avoiding, held safely.'},
    {h:'Alignment sessions',p:'Getting a divided group genuinely pointed the same way.'},
    {h:'Conflict resolution',p:'Working through a real tension toward a workable outcome.'},
    {h:'Decision workshops',p:'Reaching a call a group will actually commit to.'}],
  goodH:'When to bring one in.', goodLead:'Expert facilitation is our pick when the stakes or the tension are high.',
  good:[
    {h:'High-stakes decisions',p:'Where a poor process would be costly.'},
    {h:'Simmering tension',p:'When something needs to be aired before it hardens.'},
    {h:'A leader who wants to take part',p:'So they can be in the conversation, not running it.'}],
  faq:[{q:'Is the facilitator neutral?',a:'Yes — that is the point. They hold the process, not a position, which is what lets people be honest.'},
    {q:'Can it be a one-off?',a:'Yes. A single well-facilitated session on the right day can shift something months of meetings could not.'}],
  related:dfRel({h:'Leadership team training',p:'Facilitation focused on the top team.',href:'/development-facilitation-leadership-team-training',linkText:'Leadership'})})),
subformat(Object.assign({},DF_PARENT,{slug:'/development-facilitation-leadership-team-training', name:'Leadership team training', tagline:'work on the team that sets the weather',
  desc:'Leadership team training — work on the executive team whose health cascades through the whole organisation. By TeamBeam.',
  ai:'TeamBeam leadership team training develops the executive team\u2019s trust, alignment and decision-making, because its health cascades to every team below it.',
  keywords:'leadership team development India, executive team training, top team offsite, leadership team building',
  eyebrow:'Development · Leadership team', h:'The team that sets <span class="grad">every other team\u2019s weather.</span>',
  sub:'The executive team is a team too — usually the least examined, and the most consequential. Whatever is true of it becomes true of the organisation beneath it.',
  whatH:'Fix the top, and the rest follows.', what:[
    'If the leadership team does not trust each other, their departments will not either. If it reopens every decision, so will every level below. The top team\u2019s trust, alignment and decision-making cascade downward — which makes it the highest-leverage team in the company to work on, and the hardest, because power makes honesty costly.',
    'We work with executive teams the way we work with any team, but with the discretion and skill senior people need to be genuinely exposed without it being used against them.'],
  insideH:'What we work on.',
  inside:[
    {h:'Trust at the top',p:'The safety for senior people to be honest with each other.'},
    {h:'Real alignment',p:'Not alignment in the room and contradiction outside it.'},
    {h:'Decision rights',p:'Who decides what, so the top team stops relitigating.'},
    {h:'The example they set',p:'Naming the behaviour the rest of the company copies.'}],
  goodH:'When this matters most.', goodLead:'Leadership team work is our highest-leverage engagement.',
  good:[
    {h:'A newly-formed leadership team',p:'A merger, a reshuffle, or new members joining.'},
    {h:'Cascading dysfunction',p:'When patterns at the top are showing up everywhere below.'},
    {h:'Before a big year',p:'Getting the top team right before it sets the tone.'}],
  faq:[{q:'Is this a strategy offsite?',a:'It can sit alongside one, but the focus here is the health of the team itself — trust, alignment, decisions — not the business plan.'},
    {q:'How do you handle seniority and ego?',a:'With discretion and a skilled facilitator. The work only happens if senior people feel safe, and creating that safety is the craft.'}],
  related:dfRel({h:'The leadership team sets the weather',p:'The thinking behind this work.',href:'/the-leadership-team-sets-the-weather/',linkText:'Read the insight'})})),
subformat(Object.assign({},DF_PARENT,{slug:'/development-facilitation-strategic-workshops', name:'Strategic workshops', tagline:'align a group and leave with decisions that hold',
  desc:'Strategic workshops — align a group around a direction and leave with decisions that stay made. Facilitated by TeamBeam.',
  ai:'TeamBeam strategic workshops align a group around direction and priorities and produce decisions that hold, through structured facilitation.',
  keywords:'strategy workshop facilitation India, planning offsite, prioritisation workshop, OKR workshop',
  eyebrow:'Development · Strategic workshops', h:'Leave the room <span class="grad">actually decided.</span>',
  sub:'A structured, facilitated session that gets a group aligned around a direction — and produces decisions that stay made, not reopened next week.',
  whatH:'Alignment you can act on.', what:[
    'Most strategy sessions end in a warm sense of agreement that quietly unravels within days. The difference is process: a well-facilitated workshop surfaces the real disagreements, works them through, and lands on decisions a group will actually commit to, with clear ownership.',
    'We bring the structure and the neutral hand so the leader can take part in the thinking rather than refereeing it.'],
  insideH:'What we run.',
  inside:[
    {h:'Direction-setting',p:'Getting a group genuinely aligned on where it is going.'},
    {h:'Prioritisation',p:'Deciding what matters most when everything feels urgent.'},
    {h:'Goal & OKR sessions',p:'Turning direction into goals people own.'},
    {h:'Planning offsites',p:'A full working session that ends with a real plan.'}],
  goodH:'When to run one.', goodLead:'Strategic workshops are our pick at alignment moments.',
  good:[
    {h:'Start of a planning cycle',p:'Set direction before the year, not after.'},
    {h:'A group pulling apart',p:'When priorities have quietly diverged.'},
    {h:'After a change',p:'Re-aligning once something significant has shifted.'}],
  faq:[{q:'Do you set our strategy?',a:'No — the strategy is yours. We provide the process and facilitation that gets your group to genuine, committed decisions.'},
    {q:'Half-day or multi-day?',a:'Either. We scope it to the decision at hand and tell you honestly what it needs.'}],
  related:dfRel({h:'Offsites & Retreats',p:'Run the workshop as part of a full offsite.',href:'/offsites-retreats',linkText:'Offsites'})})),
subformat(Object.assign({},DF_PARENT,{slug:'/development-facilitation-professional-excellence', name:'Professional excellence', tagline:'focused skills a team applies next week',
  desc:'Professional excellence — focused, practical skill-building a team applies the next week, not someday. By TeamBeam.',
  ai:'TeamBeam professional excellence sessions build practical team skills — communication, feedback, collaboration, presentation — designed for immediate application.',
  keywords:'team skills training India, communication skills workshop, feedback training, professional development team',
  eyebrow:'Development · Professional excellence', h:'Skills a team <span class="grad">uses next week.</span>',
  sub:'Focused, practical capability-building — communication, feedback, collaboration — designed to be applied immediately, not filed away.',
  whatH:'Practical, not theoretical.', what:[
    'A lot of skills training is interesting in the room and gone by Monday. We design for the opposite: a small number of practical skills, practised until they are usable, tied to the real work the team is doing. The test is whether it shows up next week.',
    'We keep it grounded — the everyday capabilities that quietly make a team better: saying the hard thing well, giving feedback that lands, collaborating without friction.'],
  insideH:'What we build.',
  inside:[
    {h:'Communication',p:'Saying the important thing clearly, and making it land.'},
    {h:'Feedback',p:'Giving and receiving it in a way that helps rather than stings.'},
    {h:'Collaboration',p:'Working across people and functions without friction.'},
    {h:'Presence & presentation',p:'Being clear and credible in the room.'}],
  goodH:'When this fits.', goodLead:'Professional excellence is our pick for practical capability lifts.',
  good:[
    {h:'Growing teams',p:'New managers and members who need the everyday skills fast.'},
    {h:'A specific weak spot',p:'When feedback or communication is visibly holding a team back.'},
    {h:'Follow-through cultures',p:'Teams that will actually apply what they practise.'}],
  faq:[{q:'Is this generic training?',a:'No — we tie the skills to your team\u2019s real work so they transfer. The measure is application, not attendance.'},
    {q:'One session or a series?',a:'Either. Some skills land in a focused session; others build better over a short series. We advise honestly.'}],
  related:dfRel({h:'Assessment-led development',p:'Start from a reading to aim the skill-building.',href:'/development-facilitation-assessment-led-development',linkText:'Assessment-led'})})),
subformat(Object.assign({},DF_PARENT,{slug:'/development-facilitation-guest-expert-in-residence', name:'Guest expert in residence', tagline:'a specialist voice for real depth',
  desc:'Guest expert in residence — bring in a specialist voice for a session that needs genuine depth. Curated and run by TeamBeam.',
  ai:'TeamBeam brings in guest experts in residence — specialist speakers and practitioners — for sessions needing genuine depth, as keynotes, masterclasses or fireside formats.',
  keywords:'guest speaker corporate India, expert masterclass team, keynote and workshop, specialist facilitator',
  eyebrow:'Development · Guest expert', h:'When a session needs <span class="grad">a real specialist.</span>',
  sub:'Some topics deserve a genuine expert. We bring in the right specialist voice and build a session around them, so it is depth with a purpose — not a talk that fades.',
  whatH:'Depth, made useful.', what:[
    'A great expert can shift how a team thinks about something. But a keynote alone tends to inspire for a day and evaporate. We pair the right specialist with real facilitation, so the depth turns into something the team actually uses.',
    'We curate the voice to the need — a leadership thinker, a domain specialist, a practitioner with hard-won experience — and design the format around your goal.'],
  insideH:'Formats.',
  inside:[
    {h:'Keynote + workshop',p:'Inspiration followed by a session that puts it to work.'},
    {h:'Masterclass',p:'A deeper, hands-on session on a specific capability.'},
    {h:'Fireside',p:'A candid conversation with a voice worth hearing.'},
    {h:'Residency',p:'A specialist embedded across a program, not just a day.'}],
  goodH:'When to bring one in.', goodLead:'A guest expert is our pick when a topic needs genuine authority.',
  good:[
    {h:'A big theme',p:'A shift the team needs to take seriously.'},
    {h:'Fresh credibility',p:'An outside voice that lands what internal ones cannot.'},
    {h:'A flagship moment',p:'An offsite or event that deserves a memorable centrepiece.'}],
  faq:[{q:'Do you have the experts, or do we?',a:'We curate and bring the right voice for your goal, and build the session around them. If you have someone in mind, we can work with them too.'},
    {q:'Is it just a talk?',a:'Not if we design it well. We wrap the expert in facilitation so the value outlives the applause.'}],
  related:dfRel({h:'Strategic workshops',p:'Pair expert input with a working session.',href:'/development-facilitation-strategic-workshops',linkText:'Strategic workshops'})}))
);

/* ---- X-Leaves: destination builder + flagship pages ---- */
function destination(o){
  return {path:o.slug, crumb:o.name,
    title:o.name+' — team offsites & experiences · TeamBeam Outings',
    desc:o.desc, ai:o.ai, keywords:o.keywords,
    nodes:[{'@type':'Place',name:o.name+' (team destinations)',address:{'@type':'PostalAddress',addressRegion:o.region,addressCountry:'US'}}],
    sections:[
      {type:'hero', eyebrow:'Where we go · USA', h:o.name+' <span class="grad">for teams.</span>', sub:o.tag+'. '+o.subline,
        cta:`<a class="cta" href="#talk">Plan a trip here</a><a class="cta cta--ghost" href="/destinations">All destinations</a>`},
      {type:'narrative', eyebrow:'Why '+o.name, h:o.whyH, paras:o.why},
      {type:'cards', eyebrow:'What we run here', h:'Made for '+o.name+'.', cols:3, cards:o.run},
      {type:'prose', eyebrow:'Getting there & when to go', h:'The practical bit.', blocks:[
        {h:'Getting there',p:o.getting},
        {h:'When to go',p:o.when},
        {h:'How long',p:o.howlong||'Most teams come for one to three days. We will tell you honestly what a given goal needs, and match the length to it.'}]},
      {type:'faq', h:'About '+o.name, items:o.faq},
      {type:'related', eyebrow:'Nearby & related', h:'Keep exploring.', links:[
        {h:'Nearby: '+o.nearName,p:o.nearP,href:o.nearHref,linkText:'Explore'},
        {h:'Offsites & Retreats',p:'The whole trip handled end to end.',href:'/offsites-retreats',linkText:'Offsites'},
        {h:'How we work',p:'The place is chosen to serve the goal.',href:'/why-teambeam',linkText:'The method'}]},
      {type:'usmodule', h:'Gathering a team in India instead? teambeam.in runs destinations there.'},
      {type:'cta', h:'Thinking about '+o.name+'?', p:'Tell us your team and your goal, and we will shape the trip around it.', cta:talkCTA}
    ]};
}
PAGES.push(
destination({slug:'/destinations-nyc', name:'New York', region:'NY',
  tag:'Iconic energy · three major airports', subline:'The city that makes any event feel bigger.',
  desc:'Corporate team experiences and events in New York City — urban offsites, client and partner events, city hunts and premium occasions, designed and measured by TeamBeam.',
  ai:'New York City is a TeamBeam US destination for urban offsites, client and partner events, city hunts across iconic neighborhoods, and premium occasions. Served by three major airports, best in spring and fall.',
  keywords:'corporate events NYC, team building New York, offsite New York City, client event NYC',
  whyH:'New York elevates whatever happens in it.',
  why:[
    'There is nowhere quite like New York for an event that needs energy and prestige. A client dinner becomes a statement, a team hunt becomes an adventure through the world\u2019s most famous streets, and an offsite quietly borrows the city\u2019s ambition. When you want a gathering to feel significant, the address alone does a lot of the work.',
    'It is also unmatched for reach and infrastructure — three major airports, a global business hub, and more world-class venues than anywhere else. For client and partner events especially, where the goal is to impress and to be remembered, few places compete.',
    'The density is the design opportunity. Everything is walkable or a short ride, so a single day can hold a working session, a hunt through iconic neighborhoods, and a standout dinner. We design New York experiences to use that intensity rather than be overwhelmed by it.'],
  run:[
    {h:'City hunts',p:'A hunt through Manhattan and Brooklyn that turns the most famous streets on earth into the venue.'},
    {h:'Client &amp; partner events',p:'Premium gatherings where the address and the room both leave an impression.'},
    {h:'Urban offsites',p:'A full working offsite with the city\u2019s ambition as the backdrop.'},
    {h:'Premium occasions',p:'Milestones and celebrations that use New York to mark the moment.'}],
  getting:'Three major airports — JFK, LaGuardia and Newark — connect New York to essentially everywhere, which makes it easy to gather a distributed team. In the city, most days run on foot and the subway.',
  when:'Spring (April\u2013June) and fall (September\u2013November) are the sweet spots for weather and walking. The holidays bring their own energy for year-end events; midsummer and deep winter still work with the right indoor plan.',
  faq:[{q:'Is New York only for big, flashy events?',a:'No. The city elevates premium client events, but the same density makes intimate leadership offsites and team hunts easy to run. We design for your goal, not the clich\u00e9.'},
    {q:'How do you handle the cost and logistics?',a:'That is exactly what we take off your plate — venues, timing, transport and run-of-show. You and your team feel only the upside of the city, not the friction.'}],
  nearName:'Boston', nearP:'History and ideas a short trip up the Northeast corridor.', nearHref:'/destinations-boston'}),

destination({slug:'/destinations-sf-bay', name:'San Francisco Bay', region:'CA',
  tag:'The tech hub · coast and Sierra within reach', subline:'Where the tech world gets in one room.',
  desc:'Team experiences in the San Francisco Bay Area — sales kickoffs, onsites, city hunts, and easy escapes to the coast and the Sierra, designed and measured by TeamBeam.',
  ai:'The San Francisco Bay Area is a TeamBeam US destination for tech sales kickoffs, onsites and urban experiences, with the Pacific coast, wine country and the Sierra within easy reach for a wilderness leg.',
  keywords:'sales kickoff San Francisco, team offsite Bay Area, onsite SF, tech team building',
  whyH:'The Bay is where the most of your team already is.',
  why:[
    'For a large share of tech companies, the Bay Area is where the most people already live and work — which makes it the path of least resistance for gathering a distributed team. When a meaningful slice of your org is within driving distance, the math for an onsite or a sales kickoff gets easy.',
    'Beyond convenience, the Bay carries a particular energy. There is a reason so much gets built here, and a team picks up some of that ambition just by being in the room. The neighborhoods, the food, and the waterfront make a superb backdrop for urban experiences and hunts.',
    'And when you want to break out of the city, the range is remarkable: the Pacific coast, wine country, and the Sierra are all close enough to bolt a wilderness leg onto a city base. We design Bay Area experiences to use both the urban energy and that easy escape.'],
  run:[
    {h:'Sales kickoffs',p:'A working SKO in the heart of tech, built to align a team and send it out sharp.'},
    {h:'Onsites',p:'The reason to fly a distributed team in — real face time, designed to matter.'},
    {h:'City experiences',p:'Hunts and challenges that use the neighborhoods, the food and the waterfront.'},
    {h:'Coast &amp; Sierra add-on',p:'A wilderness or wine-country leg bolted onto the city base for range.'}],
  getting:'San Francisco (SFO), Oakland (OAK) and San Jose (SJC) airports give the Bay three easy front doors. For much of the tech world, a large share of the team is already within driving distance.',
  when:'September and October are the Bay\u2019s warmest, clearest months. Spring is green and pleasant; summer in the city runs cool and foggy, which surprises visitors but suits indoor working sessions.',
  faq:[{q:'Why the Bay for a sales kickoff?',a:'For many tech orgs it is where the most people already are, so travel time and cost drop — and the city\u2019s energy suits the ambition of an SKO. We design the working days and the connection around your goal.'},
    {q:'Can we add a wilderness leg?',a:'Yes. The coast, wine country and the Sierra are all close enough to add a day or two of nature to a city base. It is one of the Bay\u2019s best features.'}],
  nearName:'National Parks', nearP:'The Sierra and Yosemite are within reach for a nature reset.', nearHref:'/destinations-national-parks'}),

destination({slug:'/destinations-la', name:'Los Angeles', region:'CA',
  tag:'Media, coast and creative energy', subline:'Creative energy, by the coast.',
  desc:'Team experiences in Los Angeles — creative offsites, client events and coastal experiences with year-round sun, designed and measured by TeamBeam.',
  ai:'Los Angeles is a TeamBeam US destination for creative offsites, client events and coastal experiences, built on the city\u2019s media-industry creativity, miles of coastline and year-round weather.',
  keywords:'creative offsite Los Angeles, team building LA, client event Los Angeles, corporate event LA',
  whyH:'Los Angeles runs on creative energy.',
  why:[
    'As the heart of media and entertainment, Los Angeles is a city where storytelling, design and production are the local trade — which makes it a natural fit for creative teams and for offsites that want to feel imaginative rather than corporate.',
    'It is also gloriously varied: beaches, mountains, downtown and distinct neighborhoods all within reach, plus the year-round weather that makes outdoor experiences reliable. For client events, the city carries a certain glamour that leaves an impression.',
    'The challenge in LA is its sprawl — and that is exactly the kind of logistics we take off your plate. We design LA experiences to use the creativity and the coast while quietly handling the geography, so your team only feels the upside.'],
  run:[
    {h:'Creative offsites',p:'A working offsite that feels imaginative, in the city that makes things for a living.'},
    {h:'Client &amp; brand events',p:'Gatherings with a little Hollywood glamour, designed to be remembered.'},
    {h:'Coastal experiences',p:'Beach days and outdoor challenges that use the coastline and the sun.'},
    {h:'Production-grade occasions',p:'Celebrations run with the polish of a city that stages things for a living.'}],
  getting:'LAX is the main gateway, with Burbank, Long Beach and John Wayne easing regional travel. Distances are real here — which is why we plan the day around the geography so your team never feels it.',
  when:'Los Angeles works year-round thanks to reliable weather. Late spring and fall are ideal; even winter stays mild enough for outdoor experiences.',
  faq:[{q:'Isn\u2019t LA hard to get around?',a:'The sprawl is real, and handling it is our job. We cluster the day and manage transport so the distances become invisible and your team just experiences the city.'},
    {q:'Is LA only for creative teams?',a:'No, but it shines for them. Any team that wants an offsite to feel imaginative rather than corporate is well served by the city\u2019s energy and coast.'}],
  nearName:'San Francisco Bay', nearP:'Tech energy and a coast-and-Sierra escape up the coast.', nearHref:'/destinations-sf-bay'}),

destination({slug:'/destinations-chicago', name:'Chicago', region:'IL',
  tag:'Central, connected and world-class', subline:'The central hub that just works.',
  desc:'Team experiences in Chicago — all-hands, city experiences and Lake Michigan retreats, with a central location and one of the world\u2019s busiest airports, designed and measured by TeamBeam.',
  ai:'Chicago is a TeamBeam US destination for all-hands and city experiences, chosen for its roughly central US location, O\u2019Hare\u2019s connectivity, and Lake Michigan retreats within easy reach.',
  keywords:'all-hands Chicago, team offsite Chicago, corporate event Chicago, central US offsite',
  whyH:'For a coast-to-coast team, Chicago is the smart choice.',
  why:[
    'For a company spread from coast to coast, Chicago is frequently the mathematically smart place to gather. O\u2019Hare is one of the world\u2019s most connected airports, the city sits roughly central, and the result is the lowest total travel time and cost for a US-wide group. When the priority is getting everyone there efficiently, Chicago wins.',
    'Crucially, it is no compromise. Chicago is a world-class city — architecture, food, lakefront and culture — that handles big groups beautifully and offers a great urban experience in its own right. And Lake Michigan brings water-and-nature retreats within easy reach.',
    'We design Chicago experiences to make the most of the practicality: gather the company efficiently, then deliver a city or lakefront experience good enough that the central location feels like a bonus, not a trade-off.'],
  run:[
    {h:'All-hands &amp; company gatherings',p:'Bring a coast-to-coast team together with the least total travel.'},
    {h:'City experiences',p:'Architecture, food and lakefront turned into a day a team remembers.'},
    {h:'Lakefront retreats',p:'Water and nature on Lake Michigan, minutes from a world-class downtown.'},
    {h:'Scale events',p:'Big rooms and big groups handled by a city built for them.'}],
  getting:'O\u2019Hare (ORD) and Midway (MDW) make Chicago one of the easiest cities in the country to reach from anywhere, which is much of the point. Downtown is compact and transit-friendly.',
  when:'Late spring through early fall (May\u2013October) is glorious on the lakefront. Winters are famously cold — which is exactly when a warm indoor all-hands makes sense.',
  faq:[{q:'Why Chicago for an all-hands?',a:'Because it minimizes total travel for a US-wide team while still being a genuinely great city. You get efficiency and a real experience, not one at the expense of the other.'},
    {q:'What about the weather?',a:'Summer and early fall are beautiful on the lake. In winter we build the day indoors around the city\u2019s food, culture and architecture, so the season is a non-issue.'}],
  nearName:'Denver', nearP:'A central gateway with the Rockies on its doorstep.', nearHref:'/destinations-denver'}),

destination({slug:'/destinations-austin', name:'Austin', region:'TX',
  tag:'Culture meets tech · fast-growing hub', subline:'Culture, tech, and a great time.',
  desc:'Team experiences in Austin — sales kickoffs, creative offsites and festival hosting in one of America\u2019s fastest-growing hubs, designed and measured by TeamBeam.',
  ai:'Austin is a TeamBeam US destination for sales kickoffs, creative offsites and festival hosting, blending a booming tech scene with live music, food and a famously good-time culture.',
  keywords:'sales kickoff Austin, team offsite Austin, creative offsite Austin, corporate event Austin',
  whyH:'Austin is as good for a kickoff as it is for a good time.',
  why:[
    'Austin has become one of America\u2019s fastest-growing tech hubs without losing the eclectic, music-soaked culture that made it famous. That combination is rare and valuable: a city with the infrastructure for a serious sales kickoff and the soul to make it genuinely fun.',
    'It is a natural for companies that want their events to feel less corporate and more alive. The live-music scene, the food, and the festival energy let you run real working sessions and then drop into a city that knows how to enjoy itself.',
    'Its festival calendar also makes it a prime spot for hosting clients, partners and prospects around a marquee cultural moment. We design Austin experiences to use both sides — the growing business energy and the unmistakable local character.'],
  run:[
    {h:'Sales kickoffs',p:'A serious SKO in a city that makes the celebration afterward effortless.'},
    {h:'Creative offsites',p:'Working days with room to feel alive rather than corporate.'},
    {h:'Festival hosting',p:'Client and partner gatherings built around a marquee cultural moment.'},
    {h:'Food &amp; music experiences',p:'The local trade — live music and great food — turned into a team day.'}],
  getting:'Austin-Bergstrom (AUS) has grown with the city and connects easily to the major hubs. Downtown and the music districts are close and walkable.',
  when:'Spring and fall are ideal. Note the festival calendar — the city fills and prices climb around major events, which is a feature if you are hosting around one and a factor to plan around if you are not.',
  faq:[{q:'Is Austin too casual for a serious event?',a:'Not at all. It has the infrastructure for a proper kickoff or conference — it just also has the culture to make the surrounding hours genuinely enjoyable. We use both.'},
    {q:'Should we tie our event to a festival?',a:'If your goal is hosting clients or partners around a cultural moment, yes — it adds energy and a reason to attend. We plan well ahead for the demand it brings.'}],
  nearName:'Atlanta', nearP:'The South\u2019s business hub, an easy connection away.', nearHref:'/destinations-atlanta'}),

destination({slug:'/destinations-boston', name:'Boston', region:'MA',
  tag:'Heritage and academia · compact and walkable', subline:'History, ideas, and serious teams.',
  desc:'Team experiences in Boston — leadership offsites, heritage journeys and urban experiences in a compact, walkable city of history and ideas, designed and measured by TeamBeam.',
  ai:'Boston is a TeamBeam US destination for leadership offsites, heritage journeys and urban experiences, suited to serious teams by its dense concentration of universities, ideas and founding-era history.',
  keywords:'leadership offsite Boston, team building Boston, heritage journey Boston, corporate event Boston',
  whyH:'Boston has a particular intellectual gravity.',
  why:[
    'Home to a remarkable cluster of universities and research, Boston is a city of ideas — and that earnest, substance-over-flash character suits leadership teams and serious work. An offsite here feels considered rather than showy.',
    'It is also one of America\u2019s most history-rich cities, walkable and compact in a way few US cities are, which makes heritage journeys and urban offsites genuinely easy to run. Everything is close, and the past is everywhere.',
    'We design Boston experiences to lean into that depth — the history and the intellectual energy as a backdrop for leadership work, with the compact geography making multi-part days simple to orchestrate.'],
  run:[
    {h:'Leadership offsites',p:'Considered, substance-first working days for a team that takes its work seriously.'},
    {h:'Heritage journeys',p:'The Freedom Trail and founding-era history turned into a shared team day.'},
    {h:'Campus &amp; ideas experiences',p:'The city\u2019s university energy used as a setting for learning and connection.'},
    {h:'Compact urban offsites',p:'Multi-part days made easy by a city where everything is close.'}],
  getting:'Logan (BOS) sits minutes from downtown, unusually close for a major US airport. The compact core means most of a day happens on foot.',
  when:'Fall is spectacular here, with New England foliage close by. Spring and early summer are lovely; winters are cold but the walkable, indoor-rich core keeps a program moving.',
  faq:[{q:'Why Boston for leadership work?',a:'Its intellectual, substance-over-flash character suits senior teams and considered conversations, and the compact geography makes a layered day easy to run.'},
    {q:'Can we add foliage or coast?',a:'Yes. New England\u2019s foliage and coastline are close, so a heritage or leadership base in the city extends naturally into the region.'}],
  nearName:'New York', nearP:'Iconic energy a short trip down the Northeast corridor.', nearHref:'/destinations-nyc'}),

destination({slug:'/destinations-seattle', name:'Seattle', region:'WA',
  tag:'Pacific Northwest · tech and the outdoors', subline:'Coffee, tech, and the great outdoors.',
  desc:'Team experiences in Seattle — offsites and onsites with mountains, water and forest on every side, easy to extend into a nature journey, designed and measured by TeamBeam.',
  ai:'Seattle is a TeamBeam US destination for offsites and onsites, pairing a major tech presence with mountains, water and evergreen forest that make a nature journey an easy add-on.',
  keywords:'team offsite Seattle, onsite Seattle, nature journey Pacific Northwest, corporate event Seattle',
  whyH:'A serious tech city, wrapped in spectacular nature.',
  why:[
    'Major employers and a deep talent pool make Seattle a practical hub for an offsite or onsite, while the mountains, the Sound and the forests are right there — few cities put genuine wilderness this close to downtown.',
    'It has a distinct Pacific Northwest character: a little more low-key than California, coffee-fueled and outdoorsy, with a creative-technical bent. That temperament suits teams who want substance over flash and an experience grounded in the outdoors.',
    'We design Seattle experiences to use both the urban base and the easy escape — a working offsite in the city, then a leg into the mountains or onto the water, where the connection deepens.'],
  run:[
    {h:'Offsites &amp; onsites',p:'A practical working base in a real tech city, with a deep local talent pool nearby.'},
    {h:'Nature journeys',p:'A leg into the mountains, the forest or onto the Sound where a team truly reconnects.'},
    {h:'Water experiences',p:'The Sound and the lakes turned into a day on and around the water.'},
    {h:'Coffee-and-craft city days',p:'The low-key, creative-technical character of the city, made into an experience.'}],
  getting:'Sea-Tac (SEA) connects Seattle nationally and to Asia. Downtown is compact, and the mountains and water are unusually close for a major city.',
  when:'July through September is the Pacific Northwest at its glorious best — dry, long days and easy access to the outdoors. The green, rainy months have their own calm charm for indoor working sessions.',
  faq:[{q:'Does it rain the whole time?',a:'Summer here is famously dry and beautiful — the best window for pairing a city base with the outdoors. Off-season, we lean on the city\u2019s indoor character and treat a clear day as a bonus.'},
    {q:'How far is real nature?',a:'Close. Mountains, forest and water are all within easy reach of downtown, which is exactly what makes Seattle a great offsite-plus-nature base.'}],
  nearName:'National Parks', nearP:'The Cascades and beyond for a full nature reset.', nearHref:'/destinations-national-parks'}),

destination({slug:'/destinations-denver', name:'Denver', region:'CO',
  tag:'Central gateway to the Rockies', subline:'Your gateway to the Rockies.',
  desc:'Team experiences in Denver — central-hub all-hands and adventure retreats that start in the city and end in the mountains, designed and measured by TeamBeam.',
  ai:'Denver is a TeamBeam US destination for central-hub all-hands and adventure retreats, pairing one of the country\u2019s most connected airports with the Rocky Mountains an hour or two from downtown.',
  keywords:'all-hands Denver, adventure retreat Colorado, team offsite Denver, Rockies retreat',
  whyH:'Both central and spectacular — a rare combination.',
  why:[
    'Denver\u2019s superpower is being both central and spectacular. Its airport is among the most connected in the country and roughly central to the US, making it a genuinely practical place to gather a distributed team — and then the Rocky Mountains are right there, an hour or two from downtown.',
    'That combination is rare. Most easy-to-reach hub cities are flat and forgettable; most spectacular mountain destinations are a pain to get to. Denver gives you both — the convenience of a central hub and the wow of the Rockies in the same trip.',
    'It flexes from a polished central-hub all-hands in the city to a genuine adventure retreat in the mountains. We design Denver experiences to use that gateway quality — gather easily, then head for the high country where the real bonding happens.'],
  run:[
    {h:'Central-hub all-hands',p:'Gather a US-wide team efficiently through one of the country\u2019s best-connected airports.'},
    {h:'Adventure retreats',p:'Start in the city, end in the mountains, where a team genuinely comes together.'},
    {h:'Mountain-town offsites',p:'Working days in the high country, with the Rockies doing the rest.'},
    {h:'Seasonal experiences',p:'Summer trails or winter slopes, matched to the goal and the group.'}],
  getting:'Denver International (DEN) is one of the country\u2019s busiest and most connected airports, and roughly central to the US — which is much of Denver\u2019s appeal. The mountains are an hour or two beyond the city.',
  when:'Summer and early fall are ideal for mountain adventure; winter brings world-class skiing for a very different kind of retreat. The city itself is comfortable year-round.',
  faq:[{q:'Why Denver over another mountain town?',a:'Because it is both easy to reach and close to the mountains. You get a central-hub all-hands and a Rockies adventure in one trip, without the travel pain most mountain destinations bring.'},
    {q:'City or mountains?',a:'Both, usually. We often gather in the city, then move the team up into the high country for the part that does the real bonding.'}],
  nearName:'National Parks', nearP:'The Rockies open straight into the country\u2019s great parks.', nearHref:'/destinations-national-parks'}),

destination({slug:'/destinations-dc', name:'Washington, D.C.', region:'DC',
  tag:'The capital · heritage and gravitas', subline:'Heritage, gravitas, and a great team day.',
  desc:'Team experiences in Washington, D.C. — heritage journeys, conferences and premium events with the gravitas of the capital, designed and measured by TeamBeam.',
  ai:'Washington, D.C. is a TeamBeam US destination for heritage journeys, conferences and premium events, using the monuments, world-class museums and seat-of-government gravitas of the capital.',
  keywords:'heritage journey Washington DC, corporate event DC, conference Washington DC, team building DC',
  whyH:'Few cities carry the weight that DC does.',
  why:[
    'Its monuments, world-class museums and seat-of-government gravitas lend a sense of consequence to whatever happens there — which suits premium events, conferences and gatherings that want to feel significant.',
    'It is also extraordinarily rich for heritage journeys and team days, with much of its best — the Mall, the Smithsonian, the monuments — walkable and, famously, free to enter. A team can have a genuinely meaningful, inexpensive day out among national landmarks.',
    'We design DC experiences to use that gravitas and history: the monumental backdrop for premium events, and the walkable heritage for journeys and hunts, all with the polish a capital city expects.'],
  run:[
    {h:'Heritage journeys',p:'The Mall, the monuments and the Smithsonian turned into a meaningful shared day.'},
    {h:'Conferences &amp; premium events',p:'Gatherings that borrow the capital\u2019s sense of consequence.'},
    {h:'Museum &amp; monument hunts',p:'A walkable, largely free day out among national landmarks.'},
    {h:'Leadership gatherings',p:'Serious conversations in a city that takes ideas seriously.'}],
  getting:'Three airports — Reagan National (DCA), Dulles (IAD) and BWI — serve the capital, with National minutes from downtown. The core is walkable and transit-rich.',
  when:'Spring, especially the cherry-blossom weeks, and fall are the standout seasons. Summer is warm and busy; winter is quiet and well-suited to the indoor museums.',
  faq:[{q:'Is DC expensive for a team day?',a:'Less than you might expect. Much of the city\u2019s best — the monuments and the Smithsonian museums — is free to enter, which makes for a genuinely rich, low-cost heritage day.'},
    {q:'Why DC for a premium event?',a:'The capital lends gravitas. For conferences and gatherings that want to feel significant, the monumental backdrop and the city\u2019s polish do a lot of the work.'}],
  nearName:'New York', nearP:'Iconic energy a short trip up the Northeast corridor.', nearHref:'/destinations-nyc'}),

destination({slug:'/destinations-atlanta', name:'Atlanta', region:'GA',
  tag:'The South\u2019s business hub · the world\u2019s busiest airport', subline:'The South\u2019s business hub.',
  desc:'Team experiences in Atlanta — scale events, all-hands and client gatherings with the world\u2019s busiest airport and Southern hospitality, designed and measured by TeamBeam.',
  ai:'Atlanta is a TeamBeam US destination for scale events, all-hands and client gatherings, pairing Hartsfield-Jackson\u2019s connectivity with deep corporate roots and Southern hospitality.',
  keywords:'all-hands Atlanta, scale event Atlanta, client gathering Atlanta, corporate event Atlanta',
  whyH:'Atlanta runs on connectivity.',
  why:[
    'Hartsfield-Jackson is the world\u2019s busiest airport, which makes Atlanta extraordinarily easy to gather a team into — especially for an East Coast or Southern-heavy org. For a large-scale event or all-hands, that reach is a decisive advantage.',
    'It is also a genuine corporate hub, home to major headquarters and the business capital of the South, with the infrastructure and venues that big events need — wrapped in the warmth and hospitality the region is known for.',
    'We design Atlanta experiences to use both the practical reach and the Southern character: gathering a large team efficiently, then delivering scale events and client gatherings with genuine hospitality.'],
  run:[
    {h:'Scale events &amp; all-hands',p:'Bring a large, spread-out team together through the world\u2019s busiest airport.'},
    {h:'Client gatherings',p:'Business-hub polish and Southern warmth in the same room.'},
    {h:'City experiences',p:'The neighborhoods, food and history of the capital of the South.'},
    {h:'Conferences',p:'The venues and infrastructure that big programs need, easily reached.'}],
  getting:'Hartsfield-Jackson (ATL) is the world\u2019s busiest airport, connecting Atlanta to nearly everywhere — the city\u2019s single biggest advantage for large gatherings. Downtown and Midtown hold the major venues.',
  when:'Spring and fall are the most comfortable seasons. Summers are warm and humid, which the city\u2019s indoor venues handle well for large events.',
  faq:[{q:'Why Atlanta for a large event?',a:'Connectivity. With the world\u2019s busiest airport, it is one of the easiest cities in the country to gather a big, spread-out team into — with the venues and hospitality to match.'},
    {q:'Is there more to it than the airport?',a:'Yes. Atlanta is a real corporate hub and a characterful city, so the days on the ground stand on their own, not just the ease of getting there.'}],
  nearName:'Austin', nearP:'Culture, tech and a great time, an easy connection away.', nearHref:'/destinations-austin'}),

destination({slug:'/destinations-national-parks', name:'National Parks', region:'United States',
  tag:'The signature American nature reset', subline:'Awe, perspective and connection in the country\u2019s greatest landscapes.',
  desc:'National-park team retreats and journeys — Yosemite, the Grand Canyon, the Tetons and beyond. The signature TeamBeam nature reset, designed and measured, accessible by design.',
  ai:'National parks are the signature TeamBeam US nature reset: team retreats and journeys in Yosemite, the Grand Canyon, the Tetons, Yellowstone and the redwoods, pairing awe-inspiring landscape with light facilitation, accessible by design.',
  keywords:'national park team retreat, corporate retreat Yosemite, nature reset team building, wilderness offsite USA',
  whyH:'Something measurable happens to people in awe-inspiring nature.',
  why:[
    'The petty frictions of the workday shrink against the scale of a canyon or an ancient forest; perspective returns; and a team that has been grinding finds room to breathe and to see each other as humans again. America\u2019s national parks are the most spectacular venues on earth for that reset.',
    'It is the antidote to a specific modern problem: teams that are technically connected but spiritually depleted, heads-down for so long they have lost the bigger picture. A few days in a landscape this big does what no conference room can — it lifts the gaze, lowers the temperature, and rebuilds the trust that forms when people share something genuinely awe-inspiring.',
    'We design national-park experiences as the signature TeamBeam nature reset, pairing the landscape\u2019s power with light facilitation that turns the awe into actual clarity and connection. Accessible by design, so it is about shared wonder, not athletic feats — not everyone has to summit anything.'],
  run:[
    {h:'The nature reset',p:'A few days in a landscape big enough to reset how a team sees itself and its work.'},
    {h:'Guided team journeys',p:'Light facilitation that turns awe into clarity, connection and trust.'},
    {h:'Leadership in the wild',p:'Senior teams, away from the noise, thinking at the scale the landscape invites.'},
    {h:'Accessible by design',p:'Built around shared wonder, not athletic feats — everyone belongs on the trip.'}],
  getting:'We run journeys from the Sierra and Yosemite in the West, to the canyons of the Southwest, to Yellowstone and the Tetons in the Mountain West — reached via gateway cities like San Francisco, Denver, Las Vegas and Jackson. We handle every logistic so the only thing your team has to do is look up.',
  when:'Late spring through early fall is the classic window for most parks, when trails and lodges are open and the weather cooperates. We match the park to the season and the goal.',
  howlong:'Two to four days is typical for a nature reset — long enough for the landscape to do its work and for the connection to hold. We will tell you honestly what a given goal needs.',
  faq:[{q:'Do people need to be fit or outdoorsy?',a:'No. We design these to be accessible — the point is shared wonder, not summiting anything. Everyone on the team belongs on the trip.'},
    {q:'Which park is right for us?',a:'It depends on your gateway city, your season and your goal. We match the landscape to all three and handle every logistic so your team just experiences it.'}],
  nearName:'Denver', nearP:'A central gateway city with the Rockies and parks beyond.', nearHref:'/destinations-denver'})
);

/* ---- X-Hubs: deepen hub pages (insert before each page's closing CTA) ---- */
const DEEPEN = {
'/beam-occasions':[
  {type:'related',eyebrow:'Keep exploring',h:'More ways to mark the moment.',links:[
    {h:'The occasions calendar',p:'Every occasion across the year, in one place.',href:'/occasions',linkText:'Occasions'},
    {h:'Milestones & anniversaries',p:'Marking the big moments so they land.',href:'/who-we-serve-moments-milestone-anniversary',linkText:'Milestones'},
    {h:'How we work',p:'Even a celebration is designed and measured.',href:'/why-teambeam',linkText:'The method'}]}
],
'/beam-journeys':[
  {type:'related',eyebrow:'Keep exploring',h:'Plan the journey.',links:[
    {h:'Destinations',p:'India, nearby Asia and worldwide.',href:'/destinations',linkText:'Where we go'},
    {h:'Offsites & Retreats',p:'The whole trip handled end to end.',href:'/offsites-retreats',linkText:'Offsites'},
    {h:'How we work',p:'The place is chosen to serve the goal.',href:'/why-teambeam',linkText:'The method'}]}
],
'/what-we-do':[
  {type:'narrative',eyebrow:'One idea under eight offerings',h:'The format is the easy part.',paras:[
    'Teams rarely drift because they picked the wrong activity. They drift because trust thins, decisions stall, or new people never quite belong. The eight things we run are just different doors into the same work — giving a team what it is actually missing.',
    'So we do not start from a catalogue. We start from your team, and let the format follow. A hunt, a retreat, a give-back day and a leadership session can each be the right answer, for very different reasons.']},
  {type:'blogmodule',h:'The thinking behind what we do.',links:[{t:'The eight dimensions of a healthy team',href:'/the-eight-dimensions-of-a-healthy-team/'},{t:'Diagnostic-first: design should follow evidence',href:'/diagnostic-first-design-follows-evidence/'}]},
  {type:'related',h:'Where to go next.',links:[
    {h:'How we work',p:'The method that holds all eight offerings up.',href:'/why-teambeam',linkText:'The method'},
    {h:"Who it's for",p:'By role, industry and the moment your team is in.',href:'/who-we-serve',linkText:'See who'},
    {h:'Tools',p:'Size the opportunity before you talk to us.',href:'/resources',linkText:'Open the tools'}]}
],
'/why-teambeam':[
  {type:'narrative',eyebrow:'Why the order matters',h:'Design should follow evidence, not habit.',paras:[
    'Most team building is chosen backwards — pick the activity, then hope it fits. It is the equivalent of prescribing before examining. Sometimes it works by luck; often it produces a pleasant day that changes nothing.',
    'Reading the team first is what makes the design fit and the result measurable. You cannot prove a change you never defined, which is why diagnosis and measurement are two ends of the same idea.']},
  {type:'blogmodule',h:'More on measurement.',links:[{t:'Why measurement changes the conversation',href:'/why-measurement-changes-the-conversation/'},{t:'What a Day 14 / 30 / 60 follow-up tells you',href:'/what-day-14-30-60-tells-you/'}]},
  {type:'related',h:'Go deeper.',links:[
    {h:'The method',p:'Scan, design, build, deliver, measure — in order, and for a reason.',href:'/why-teambeam-the-method',linkText:'The method'},
    {h:'Measurement & proof',p:'The Day 14 / 30 / 60 schedule, and what we read.',href:'/why-teambeam-measurement-impact',linkText:'How we measure'},
    {h:'Results',p:'A change you can put in front of a board.',href:'/why-teambeam-results',linkText:'See results'}]}
],
'/who-we-serve':[
  {type:'narrative',eyebrow:'The same dimensions, different pressure',h:'Every team is the same underneath — and different on top.',paras:[
    'Trust, communication, alignment and belonging matter for every team. What changes is the pressure each role, industry and moment puts on them. A trading floor and a factory floor can need very different days to reach the same place.',
    'So we map to your situation — the seat you sit in, the sector you are in, and the moment your team is living through — and design for the pressure that is actually on it.']},
  {type:'usmodule',h:'A GCC or a US-headquartered team? teambeam.us is our home there — one company, two continents.'},
  {type:'related',h:'Explore.',links:[
    {h:'What we do',p:'Eight formats, matched to the goal you own.',href:'/what-we-do',linkText:'All offerings'},
    {h:'How we work',p:'Read the team first, then design for it.',href:'/why-teambeam',linkText:'The method'},
    {h:'Where we go',p:'The right setting for your team and your moment.',href:'/destinations',linkText:'Destinations'}]}
],
'/destinations':[
  {type:'narrative',eyebrow:'Why place does half the work',h:'The right setting lowers everyone\u2019s guard.',paras:[
    'People behave differently out of the building. A change of place quiets the hierarchy, loosens the routine, and makes the honest conversation a little easier to have. That is not a holiday perk — it is part of the design.',
    'We match the place to the goal: somewhere calm for a team that needs to reset, somewhere lively for one that needs energy, somewhere close for a quick shift, and somewhere further when the trip itself is the point.']},
  {type:'usmodule',h:'Gathering a team in the United States? teambeam.us runs it on the ground there.'},
  {type:'related',h:'Plan it.',links:[
    {h:'Offsites & Retreats',p:'The whole offsite handled — venue, travel, run-of-show.',href:'/offsites-retreats',linkText:'Offsites'},
    {h:'Beam Journeys',p:'Team travel where the journey does the work.',href:'/beam-journeys',linkText:'Journeys'},
    {h:'How we work',p:'The place is chosen to serve the goal.',href:'/why-teambeam',linkText:'The method'}]}
],
'/resources':[
  {type:'narrative',eyebrow:'Tools, not toys',h:'Numbers you can take into a real conversation.',paras:[
    'These tools will not run your offsite for you. What they will do is help you size the opportunity, spot the dimension that needs attention, and arrive at a conversation with something concrete rather than a vague sense that you should do something.',
    'Each one is a starting point. The real reading — and the real design — comes after, once we understand your specific team.']},
  {type:'blogmodule',h:'The thinking the tools are built on.',links:[{t:'The eight dimensions of a healthy team',href:'/the-eight-dimensions-of-a-healthy-team/'},{t:'Proving the ROI of culture spend',href:'/hr-proving-roi-of-culture-spend/'}]},
  {type:'related',h:'Use them.',links:[
    {h:'ROI calculator',p:'What a disengaged team costs, and what a change is worth.',href:'/resources-tools-offsite-roi-calculator',linkText:'Open'},
    {h:'Team Health Snapshot',p:'A quick read across the eight dimensions.',href:'/resources-tools-team-health-snapshot',linkText:'Take it'},
    {h:'How we work',p:'What happens after the self-check.',href:'/why-teambeam',linkText:'The method'}]}
],
'/about':[
  {type:'pull',quote:'\u201cWe build teams. And we prove it.\u201d That second sentence is the whole company.'},
  {type:'narrative',eyebrow:'How we got here',h:'We were tired of days that felt good and changed nothing.',paras:[
    'TeamBeam grew out of a simple frustration: teams spend real money on events that are forgotten by Friday, and nobody can say whether they helped. We wanted to run the other experiment — understand the team, design for a real goal, and measure what actually changed.',
    'Today we do that as one business with two homes: teambeam.in for India and the world, and teambeam.us for the United States. Same method, same standard, wherever your team sits.']},
  {type:'usmodule',h:'In the United States? teambeam.us is our home there — the same practice, the same people.'},
  {type:'related',h:'Explore.',links:[
    {h:'What we do',p:'Eight ways to bring a team together.',href:'/what-we-do',linkText:'All offerings'},
    {h:'How we work',p:'The method behind every one of them.',href:'/why-teambeam',linkText:'The method'},
    {h:'Careers',p:'Do work that leaves a team different.',href:'/careers',linkText:'Join us'}]}
]
};
PAGES.forEach(p=>{ if(DEEPEN[p.path]){ const cta=p.sections.pop(); p.sections.push.apply(p.sections, DEEPEN[p.path]); p.sections.push(cta); }});

/* ---- build ---- */
function cp(src,dst){fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);}
function write(rel,html){const f=path.join(OUT,rel,'index.html');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html);}
function writeFile(rel,txt){const f=path.join(OUT,rel);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,txt);}

function run(){
  fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
  write('', homePage());
  PAGES.forEach(p=>write(p.path.replace(/^\//,''), renderPage(p)));
  writeFile('404.html', notFound());
  // assets
  cp(path.join(ASSETS,'styles.css'), path.join(OUT,'assets','styles.css'));
  ['fonts','img'].forEach(d=>{const dir=path.join(ASSETS,d); if(fs.existsSync(dir)) fs.readdirSync(dir).forEach(f=>cp(path.join(dir,f),path.join(OUT,'assets',d,f)));});
  if(fs.existsSync(path.join(ROOT,'site.webmanifest.src'))) {}
  // manifest (from assets/img if placed) — write directly
  writeFile('site.webmanifest', fs.readFileSync(path.join(ASSETS,'img','site.webmanifest'),'utf8'));
  // sitemap / robots / feeds
  const urls = ['/'].concat(PAGES.map(p=>p.path));
  writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`+
    urls.map(u=>`  <url><loc>${CFG.origin}${u}</loc>\n    <xhtml:link rel="alternate" hreflang="en-US" href="${CFG.origin}${u}"/>\n    <xhtml:link rel="alternate" hreflang="en-IN" href="${CFG.homes['in']}${u}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${CFG.origin}${u}"/>\n  </url>`).join('\n')+`\n</urlset>\n`);
  writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${CFG.origin}/sitemap.xml\n`);
  writeFile('_headers', `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: SAMEORIGIN\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: geolocation=(), microphone=(), camera=()\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
  writeFile('_redirects', `# URL-preservation redirects go here as pages are added. One hop, 301.\n`);

  // validation gate
  let checked=0, errors=[];
  (function scan(dir){fs.readdirSync(dir,{withFileTypes:true}).forEach(e=>{const fp=path.join(dir,e.name);
    if(e.isDirectory())return scan(fp); if(!e.name.endsWith('.html'))return;
    const html=fs.readFileSync(fp,'utf8');
    [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach((m,i)=>{checked++;try{JSON.parse(m[1]);}catch(err){errors.push(fp+' #'+i+': '+err.message);}});
  });})(OUT);
  console.log('Pages: '+ (urls.length+1) + ' (home, 404)');
  console.log('Fonts: '+ (fs.existsSync(path.join(OUT,'assets','fonts'))?fs.readdirSync(path.join(OUT,'assets','fonts')).length:0));
  console.log('JSON-LD blocks: '+checked+ (errors.length?' — ERRORS':' — ALL VALID'));
  if(errors.length){console.error(errors.join('\n'));process.exit(1);}
  console.log('Build OK -> /site');
}
run();
