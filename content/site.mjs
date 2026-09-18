/* ============================================================================
   POSTANI TRENER · V3 — CENTRALNA KONFIGURACIJA
   ----------------------------------------------------------------------------
   Sve što se mijenja živi ovdje ili u ostalim datotekama u /content.
   Ništa od ovoga nije prepisano ni u jednu komponentu.

   NAJČEŠĆE IZMJENE:
     checkout.url      → pravi Stripe link (jedna linija, cijeli site)
     price.*           → cijena i rok popusta
     video.youtubeId   → prodajni video
     social.*          → mreže
   Nakon izmjene:  node build.mjs
   ========================================================================== */

export const site = {
  /* Ime proizvoda. Klijent ga nije imenovao — ovo je njegov postojeći
     brend (@postani_trener). Preimenovanje = jedna izmjena ovdje. */
  brand: 'Postani trener',

  /* Produkcijski origin. Koristi se za canonical, hreflang, sitemap, OG. */
  origin: 'https://postani-trener-hr.vercel.app',

  /* NOINDEX dok checkout ne postoji (direktiva §10).
     Na dan lansiranja: postavi na false i pokreni build. */
  noindex: true,

  /* ---------------------------------------------------------------------
     CHECKOUT — JEDNO MJESTO ZA CIJELI SITE
     url: null  → svi CTA-ovi vode na `fallbackUrl` (živi profil, radi,
                  ali ne naplaćuje). Nikad prazan gumb, nikad href="#".
     url: 'https://…' → svi CTA-ovi idu na naplatu, u istom tabu.
     --------------------------------------------------------------------- */
  checkout: {
    url: null,
    fallbackUrl: 'https://www.instagram.com/postani_trener/',
  },

  /* ---------------------------------------------------------------------
     CIJENA — klijentom potvrđeno. Godina za 15.9. nije dana, pa se datum
     piše točno kako ga je klijent napisao i NEMA odbrojavanja.
     --------------------------------------------------------------------- */
  price: {
    currency: '€',
    regular: 590,
    current: 490,
    deadlineHr: '15.9.',
    deadlineEn: '15 September',
  },

  /* ---------------------------------------------------------------------
     BROJKE — isključivo klijentove. Ništa se ne izvodi ni ne zaokružuje.
     --------------------------------------------------------------------- */
  stats: [
    { value: 360, suffix: '+', hr: 'educiranih trenera', en: 'trainers educated' },
    { value: 12, suffix: '+', hr: 'stručnjaka i predavača', en: 'experts and lecturers' },
    { value: 70, suffix: '+', hr: 'sati sadržaja', en: 'hours of content' },
    { value: 20, suffix: '+', hr: 'modula', en: 'modules' },
  ],

  /* ---------------------------------------------------------------------
     PRODAJNI VIDEO
     youtubeId: null → sekcija prikazuje uredno označeno rezervirano mjesto.
     Kad stigne ID, ovdje ga upiši: youtubeId: 'dQw4w9WgXcQ'.
     poster: putanja do slike (npr. 'img/video-poster.jpg') ili null.
     --------------------------------------------------------------------- */
  video: {
    youtubeId: null,
    poster: null,
    durationHr: '15–18 min',
    durationEn: '15–18 min',
  },

  /* ---------------------------------------------------------------------
     MREŽE — samo potvrđeni, živi profili. Prazna vrijednost = link se
     uopće ne renderira (nikad izmišljen URL).
     --------------------------------------------------------------------- */
  social: {
    instagram: 'https://www.instagram.com/postani_trener/',
    youtube: 'https://www.youtube.com/@franejercic',
    facebookGroup: null,
    email: null,
  },

  credit: {
    labelHr: 'Izradili',
    labelEn: 'Built by',
    name: 'The Website Labs',
    url: 'https://thewebsitelabs.com',
  },
};

/* Izvedeno — ne diraj. */
export const checkoutHref = site.checkout.url || site.checkout.fallbackUrl;
export const checkoutIsFallback = !site.checkout.url;
