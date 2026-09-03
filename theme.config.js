/* teambeam.us — site & brand config (content/meta).
 * Design tokens live in assets/styles.css :root — cool US palette.
 * US market home. Paired with teambeam.in via reciprocal hreflang; one entity via sameAs. */
module.exports = {
  name: 'TeamBeam Outings',
  origin: 'https://teambeam.us',
  market: 'the USA and worldwide',
  tagline: 'We build teams. And we prove it.',
  email: 'start@teambeam.us',
  phone: '1 (415) 404-9200',                 // rendered as a tel: link
  address: '600 California St, 11th Floor, San Francisco, CA 94108',
  visitName: 'TeamBeam Outings USA',
  mapsUrl: 'https://maps.app.goo.gl/5yr6vE8TrUUSVRmu7',
  geo: { lat: 37.7929, lng: -122.4079, region: 'US-CA', place: 'San Francisco, California' },
  twitter: '@teambeamoutings',
  homes: { in: 'https://teambeam.in', us: 'https://teambeam.us', blog: 'https://teambeam.blog' },
  social: {
    LinkedIn: 'https://www.linkedin.com/company/teambeam',
    Instagram: 'https://www.instagram.com/teambeamoutings',
    X: 'https://x.com/teambeamoutings',
    YouTube: 'https://www.youtube.com/@teambeamoutings',
    Facebook: 'https://www.facebook.com/teambeamoutings'
  },
  // US destinations shown in footer + home teaser
  destinations: ['New York','San Francisco Bay','Los Angeles','Chicago','Austin','Boston','Seattle','Denver','Washington, D.C.','Atlanta','National Parks']
};
