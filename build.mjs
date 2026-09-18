/* ============================================================================
   POSTANI TRENER · V3 — generator
   ----------------------------------------------------------------------------
   Čita /content, ispisuje statični HTML u /dist. Bez ovisnosti, bez frameworka.
   Pokretanje:  node build.mjs
   ========================================================================== */

import { mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, checkoutHref, checkoutIsFallback } from './content/site.mjs';
import { trainers, mentor, contributors, rosterComplete } from './content/trainers.mjs';

import { areas, disciplines, lessonsSupplied } from './content/curriculum.mjs';
import { objections, faq } from './content/faq.mjs';
import { copy } from './content/copy.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');

/* Nijedna fotografija nije stigla -> roster je tipografski (masthead), a ne
   zid od dvanaest praznih portretnih okvira. Cim jedna slika postoji, mreza
   se sama prebaci u foto nacin. */
const ROSTER_PHOTO_MODE = trainers.some((t) => t.image);

/* Predavač ima "puni profil" samo ako je stigao stvarni sadržaj. Bez toga se
   NE renderira ni sekcija profila ni gumb koji vodi u prazno — kartica ostaje
   uredan zapis u rosteru. Čim stigne bio/titula, oboje se pojavi samo od sebe. */
const hasProfile = (t) => !!(t.bio || t.specialties || t.credentials);


/* ------------------------------------------------------------------ utils */
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* Za tekst koji SAMI pišemo u /content i koji smije sadržavati <em>/<br>. */
const rich = (s) => String(s ?? '');

/* Čist tekst iz rich stringa — za meta opise i JSON-LD. */
const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/* ------------------------------------------------------------------ rute */
const ROUTES = {
  hr: { home: '/', predavaci: '/predavaci', kurikulum: '/kurikulum', price: '/price' },
  en: { home: '/en', predavaci: '/en/instructors', kurikulum: '/en/curriculum', price: '/en/stories' },
};
const FILES = {
  hr: { home: 'index.html', predavaci: 'predavaci.html', kurikulum: 'kurikulum.html', price: 'price.html' },
  en: { home: 'en/index.html', predavaci: 'en/instructors.html', kurikulum: 'en/curriculum.html', price: 'en/stories.html' },
};
/* Dubina datoteke → relativni prefiks do korijena (statika radi i offline). */
const depth = (file) => (file.includes('/') ? '../' : './');

/* ------------------------------------------------------------------ ikone */
const I = {
  arrow: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowSm: '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cross: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  play: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5z"/></svg>',
  chevron: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  spark: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
};

/* ------------------------------------------------------------- CTA gumbi */
function ctaPrimary(t, { size = '', extra = '' } = {}) {
  const rel = checkoutIsFallback ? ' target="_blank" rel="noopener"' : '';
  return `<a class="btn btn--primary${size ? ' ' + size : ''}${extra ? ' ' + extra : ''}" href="${esc(checkoutHref)}"${rel} data-checkout>${esc(t.ctaPrimary)}${I.arrow}</a>`;
}

/* ------------------------------------------------------------ head / chrome */
function head({ lang, pageKey, title, description, file }) {
  const t = copy[lang];
  const r = depth(file);
  const canonical = site.origin + (ROUTES[lang][pageKey] === '/' ? '/' : ROUTES[lang][pageKey]);
  const og = lang === 'hr' ? 'img/og.jpg' : 'img/og-en.jpg';
  const alt = { hr: site.origin + (ROUTES.hr[pageKey] === '/' ? '/' : ROUTES.hr[pageKey]), en: site.origin + ROUTES.en[pageKey] };
  return `<!doctype html>
<html lang="${lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${site.noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="hr" href="${esc(alt.hr)}">
<link rel="alternate" hreflang="en" href="${esc(alt.en)}">
<link rel="alternate" hreflang="x-default" href="${esc(alt.hr)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.brand)}">
<meta property="og:locale" content="${lang === 'hr' ? 'hr_HR' : 'en_GB'}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(site.origin + '/' + og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(site.origin + '/' + og)}">
<meta name="theme-color" content="#05070d">
<link rel="icon" href="${r}img/favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/woff2" href="${r}fonts/archivo-latin-wdth-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${r}fonts/inter-latin-wght-normal.woff2" crossorigin>
<link rel="stylesheet" href="${r}css/v3.css">
</head>
<body>
<a class="skip" href="#main">${esc(t.skipToContent)}</a>`;
}

function header({ lang, pageKey, file }) {
  const t = copy[lang];
  const r = depth(file);
  const R = ROUTES[lang];
  const other = lang === 'hr' ? 'en' : 'hr';
  const otherHref = ROUTES[other][pageKey];

  const navItem = (n) => {
    if (n.page) {
      const href = R[n.page];
      const cur = n.page === pageKey ? ' aria-current="page"' : '';
      return `<a href="${esc(href)}"${cur}>${esc(n.label)}</a>`;
    }
    const href = pageKey === 'home' ? n.href : `${R.home === '/' ? '/' : R.home}${n.href}`;
    return `<a href="${esc(href)}">${esc(n.label)}</a>`;
  };

  const langSwitch = `<div class="langsw" role="group" aria-label="${esc(lang === 'hr' ? 'Jezik' : 'Language')}">
<span class="is-on" aria-current="true">${lang.toUpperCase()}</span>
<a href="${esc(otherHref)}" hreflang="${other}" lang="${other}" aria-label="${esc(t.otherLangAria)}">${esc(t.otherLangLabel)}</a>
</div>`;

  return `<header class="hdr" data-hdr>
<div class="hdr__in">
<a class="brand" href="${esc(R.home)}">
<span class="brand__mark" aria-hidden="true">PT</span>
<span class="brand__name">Postani trener</span>
</a>
<nav class="nav" aria-label="${esc(lang === 'hr' ? 'Glavna navigacija' : 'Main navigation')}">${t.nav.map(navItem).join('')}</nav>
<div class="hdr__end">
${langSwitch}
${ctaPrimary(t)}
<button class="burger" type="button" data-burger aria-expanded="false" aria-controls="mnav" aria-label="${esc(t.menuOpen)}"><i aria-hidden="true"></i></button>
</div>
</div>
</header>
<div class="mnav" id="mnav" data-mnav aria-hidden="true">
${t.nav.map((n) => {
    const href = n.page ? R[n.page] : (pageKey === 'home' ? n.href : `${R.home === '/' ? '/' : R.home}${n.href}`);
    return `<a class="mnav__item" href="${esc(href)}">${esc(n.label)}</a>`;
  }).join('')}
<div class="mnav__foot">
${ctaPrimary(t, { size: 'btn--lg' })}
<p class="small">${esc(t.ctaPrimaryNote)}</p>
</div>
</div>`;
}

function footer({ lang, pageKey, file }) {
  const t = copy[lang];
  const R = ROUTES[lang];
  const year = 2026;
  const channels = [];
  if (site.social.instagram) channels.push(`<a href="${esc(site.social.instagram)}" target="_blank" rel="noopener">${esc(t.footer.instagram)}</a>`);
  if (site.social.youtube) channels.push(`<a href="${esc(site.social.youtube)}" target="_blank" rel="noopener">${esc(t.footer.youtube)}</a>`);

  return `<footer class="ftr">
<div class="wrap">
<div class="ftr__grid">
<div>
<a class="brand" href="${esc(R.home)}">
<span class="brand__mark" aria-hidden="true">PT</span>
<span class="brand__name">Postani trener</span>
</a>
<p class="ftr__line">${esc(t.footer.line)}</p>
</div>
<div>
<h2>${esc(t.footer.navHeading)}</h2>
<div class="ftr__links">
<a href="${esc(R.home)}">${esc(lang === 'hr' ? 'Početna' : 'Home')}</a>
${t.nav.filter((n) => n.page).map((n) => `<a href="${esc(R[n.page])}">${esc(n.label)}</a>`).join('')}
</div>
</div>
<div>
<h2>${esc(t.footer.channelsHeading)}</h2>
<div class="ftr__links">${channels.join('')}</div>
</div>
</div>
<div class="ftr__bot">
<p>© ${year} ${esc(site.brand)}. ${esc(t.footer.rights)}</p>
<p>${esc(lang === 'hr' ? site.credit.labelHr : site.credit.labelEn)} <a href="${esc(site.credit.url)}" target="_blank" rel="sponsored noopener">${esc(site.credit.name)}</a></p>
</div>
</div>
</footer>`;
}

function tail({ file }) {
  const r = depth(file);
  return `<script src="${r}js/app.js" defer></script>
</body>
</html>`;
}

/* ------------------------------------------------------------- komponente */
function statsBlock(lang) {
  const t = copy[lang];
  return `<section class="section section--tight" aria-labelledby="stats-h">
<div class="wrap">
<h2 class="vh" id="stats-h">${esc(t.stats.eyebrow)}</h2>
<ul class="stats">
${site.stats.map((s) => `<li class="reveal" data-reveal-group="stats">
<p class="v num"><span data-count="${s.value}">${s.value}</span><em>${esc(s.suffix)}</em></p>
<p class="l">${esc(lang === 'hr' ? s.hr : s.en)}</p>
</li>`).join('')}
</ul>
</div>
</section>`;
}

function videoBlock(lang) {
  const t = copy[lang];
  const dur = lang === 'hr' ? site.video.durationHr : site.video.durationEn;
  let inner;
  if (site.video.youtubeId) {
    const poster = site.video.poster
      ? `<img class="vid__poster" src="${esc(depth('index.html') + site.video.poster)}" alt="" width="1600" height="900" loading="lazy" decoding="async">`
      : '';
    inner = `${poster}<button class="vid__play" type="button" data-video-play data-yt="${esc(site.video.youtubeId)}" data-yt-title="${esc(t.video.h2)}">
<i aria-hidden="true">${I.play}</i><span>${esc(t.video.play)}</span>
</button>`;
  } else {
    inner = `<div class="vid__reserved">
<span class="glyph" aria-hidden="true">${I.play}</span>
<span class="tag">${esc(t.video.eyebrow)}</span>
<p class="d4">${esc(t.video.reservedTitle)}</p>
<p>${esc(t.video.reservedBody)}</p>
</div>`;
  }
  const frameCls = site.video.youtubeId ? 'vid__frame' : 'vid__frame vid__frame--reserved';
  return `<section class="section section--tight vid" id="video" aria-labelledby="vid-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.video.eyebrow)}</p>
<h2 class="d2" id="vid-h">${esc(t.video.h2)}</h2>
<p class="lead">${esc(t.video.lead)}</p>
</div>
<div class="${frameCls} reveal" data-video-frame>${inner}</div>
<p class="vid__meta">${esc(dur)}${site.video.youtubeId ? '' : ''}</p>
</div>
</section>`;
}

function trainerCard(tr, lang, { linkTo, samePage = false }) {
  const t = copy[lang];
  const openable = !samePage || hasProfile(tr);
  const href = samePage ? `#${tr.slug}` : (hasProfile(tr) ? `${linkTo}#${tr.slug}` : linkTo);
  /* Sidro živi na kartici kad predavač nema vlastitu sekciju profila. */
  const anchorId = samePage && !hasProfile(tr) ? ` id="${tr.slug}"` : '';
  const media = ROSTER_PHOTO_MODE
    ? `<div class="tcard__media">${tr.image
      ? `<img src="${esc(tr.image.src)}" alt="${esc(tr.image.alt?.[lang] || tr.name)}" width="${tr.image.w || 800}" height="${tr.image.h || 1000}" loading="lazy" decoding="async">`
      : `<span class="tcard__mono" aria-hidden="true">${esc(tr.initials)}</span><span class="mslot__ph" aria-hidden="true"></span>`}</div>`
    : '';
  return `<article class="tcard${ROSTER_PHOTO_MODE ? '' : ' tcard--type'}${openable ? '' : ' tcard--static'} reveal"${anchorId} data-reveal-group="roster">
${media}
<div class="tcard__body">
${ROSTER_PHOTO_MODE ? '' : `<span class="tcard__badge" aria-hidden="true">${esc(tr.initials)}</span>`}
<h3 class="tcard__name">${esc(tr.name)}</h3>
${tr.title ? `<p class="tcard__title">${esc(tr.title[lang])}</p>` : ''}
${tr.oneLine ? `<p class="tcard__line">${esc(tr.oneLine[lang])}</p>` : ''}
${openable ? `<span class="tcard__go">${esc(t.experts.cardCta)}${I.arrowSm}</span>` : ''}
</div>
${openable ? `<a class="tcard__link" href="${esc(href)}"><span class="vh">${esc(tr.name)} — ${esc(t.experts.cardCta)}</span></a>` : ''}
</article>`;
}

function faqBlock(lang, idPrefix, items) {
  return `<div class="faq">
${items.map((f, i) => `<div class="faq__item">
<h3>
<button class="faq__btn" type="button" data-disclosure aria-expanded="false" aria-controls="${idPrefix}-${i}">
<span class="faq__q">${esc(f.q[lang])}</span>
<span class="faq__ico" aria-hidden="true"><i></i></span>
</button>
</h3>
<div class="faq__panel" id="${idPrefix}-${i}" data-open="true"><div><p class="faq__a">${esc(f.a[lang])}</p></div></div>
</div>`).join('')}
</div>`;
}

function areasBlock(lang, { detailed }) {
  const t = copy[lang];
  /* Na /kurikulum podrucja slijede izravno h1 pa moraju biti h2.
     Na naslovnici stoje ispod h2 sekcije pa su h3. */
  const H = detailed ? 'h2' : 'h3';
  return `<div class="areas">
${areas.map((a, i) => `<article class="area" id="${a.slug}">
<${H}>
<button class="area__btn" type="button" data-disclosure data-group="areas" data-start-open="${detailed ? 'true' : 'false'}" aria-expanded="false" aria-controls="area-${a.slug}">
<span class="area__n num">${esc(a.number)}</span>
<span class="area__t">${esc(a.title[lang])}</span>
<span class="area__ico" aria-hidden="true"><i></i></span>
</button>
</${H}>
<div class="area__panel" id="area-${a.slug}" data-open="true"><div>
<div class="area__body">
<div class="area__goal">
<span class="k">${esc(t.curriculum.goalLabel)}</span>
<span class="v">${esc(a.goal[lang])}</span>
${a.body ? `<p class="body-text" style="margin-top:10px">${esc(a.body[lang])}</p>` : ''}
</div>
<div>
${a.topics ? `<span class="k small" style="display:block;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px">${esc(t.curriculum.topicsLabel)}</span>
<ul class="topics">${a.topics[lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
${a.lessons && a.lessons.length
      ? `<${detailed ? 'h3' : 'h4'} class="small" style="margin-top:18px;letter-spacing:.18em;text-transform:uppercase">${esc(copy[lang].kurikulum.lessonsHeading)}</${detailed ? 'h3' : 'h4'}>
<ul class="lessons">${a.lessons.map((l) => `<li><span>${esc(l[lang])}</span>${l.minutes ? `<span class="m">${l.minutes} min</span>` : ''}</li>`).join('')}</ul>`
      : ''}
</div>
</div>
</div></div>
</article>`).join('')}
</div>`;
}

/* ------------------------------------------------------------------ HOME */
function homePage(lang) {
  const t = copy[lang];
  const file = FILES[lang].home;
  const R = ROUTES[lang];
  const title = lang === 'hr'
    ? 'Postani trener — najkompletnija online edukacija za trenere'
    : 'Postani trener — the most complete online education for trainers';
  const description = lang === 'hr'
    ? 'Edukacija koju gradi tim stručnjaka iz treninga, nutricionizma, psihologije, poslovanja i marketinga. 70+ sati sadržaja, 20+ modula, doživotan pristup.'
    : 'An education built by a team of experts in training, nutrition, psychology, business and marketing. 70+ hours of content, 20+ modules, lifetime access. Taught in Croatian.';

  const priceLine = t.invest.deadlineLine
    .replace('{deadline}', lang === 'hr' ? site.price.deadlineHr : site.price.deadlineEn)
    .replace('{regular}', String(site.price.regular))
    .replace('{currency}', site.price.currency);

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Organization',
      name: site.brand, url: site.origin + '/',
      description: plain(description),
      founder: { '@type': 'Person', name: mentor.name },
      sameAs: [site.social.instagram, site.social.youtube].filter(Boolean),
    },
    {
      '@context': 'https://schema.org', '@type': 'Course',
      name: site.brand,
      description: plain(t.hero.lead),
      inLanguage: 'hr',
      provider: { '@type': 'Organization', name: site.brand, url: site.origin + '/' },
      offers: {
        '@type': 'Offer', price: String(site.price.current), priceCurrency: 'EUR',
        category: 'Paid', availability: 'https://schema.org/PreOrder', url: site.origin + '/#investicija',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance', courseMode: 'Online',
        courseWorkload: 'PT70H',
        instructor: { '@type': 'Person', name: mentor.name },
      },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question', name: f.q[lang],
        acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
      })),
    },
  ];

  return `${head({ lang, pageKey: 'home', title, description, file })}
${header({ lang, pageKey: 'home', file })}
<main id="main">

<!-- 01 HERO -->
<section class="hero" id="edukacija" data-hero>
<div class="wrap">
<div class="hero__grid">
<div>
<p class="eyebrow">${esc(t.hero.eyebrow)}</p>
<h1 class="d1">${rich(t.hero.h1)}</h1>
<p class="lead">${esc(t.hero.lead)}</p>
<div class="hero__cta btn-row">
${ctaPrimary(t, { size: 'btn--lg' })}
<a class="btn btn--ghost btn--lg" href="${esc(R.kurikulum)}">${esc(t.ctaProgram)}${I.arrow}</a>
</div>
<p class="cta-note" style="margin-top:14px">${esc(t.ctaPrimaryNote)}</p>
<ul class="hero__ticks">${t.hero.ticks.map((x) => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul>
</div>
<aside class="hero__aside">
${lang === 'en' ? `<p class="small">${esc(t.languageNotice)}</p>` : ''}
<p class="hero__kicker">${esc(t.hero.kicker)}</p>
<p class="hero__scroll"><i aria-hidden="true"></i><span>${esc(lang === 'hr' ? 'Skrolaj' : 'Scroll')}</span></p>
</aside>
</div>
</div>
</section>

<!-- 02 PRODAJNI VIDEO -->
${videoBlock(lang)}

<!-- 03 BROJKE -->
${statsBlock(lang)}

<!-- 04 ISHOD -->
<section class="section" aria-labelledby="out-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.outcome.eyebrow)}</p>
<h2 class="d2" id="out-h">${rich(t.outcome.h2)}</h2>
<p class="lead">${esc(t.outcome.lead)}</p>
</div>
<ul class="outs">
${t.outcome.items.map((it, i) => `<li class="reveal">
<span class="i num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
<h3 class="t">${esc(it.t)}</h3>
<p class="d">${esc(it.d)}</p>
</li>`).join('')}
</ul>
</div>
</section>

<!-- 05 MENTOR -->
<section class="section" id="mentor" aria-labelledby="men-h">
<div class="wrap">
<div class="split split--5-7">
<div class="reveal">
${mentor.image
      ? `<div class="mslot mslot--portrait"><img src="${esc(mentor.image.src)}" alt="${esc(mentor.image.alt?.[lang] || mentor.name)}" width="${mentor.image.w || 1600}" height="${mentor.image.h || 2000}" loading="lazy" decoding="async"></div>`
      : `<div class="mslot mslot--type">
<span class="mslot__ph" aria-hidden="true"></span>
<span class="k">${esc(t.mentor.role)}</span>
<span class="big" aria-hidden="true">${esc(mentor.initials)}</span>
<div class="rows">
<div><b class="num">360+</b><span>${esc(lang === 'hr' ? 'educiranih trenera' : 'trainers educated')}</span></div>
<div><b class="num">1000+</b><span>${esc(lang === 'hr' ? 'klijenata iza sebe' : 'clients behind him')}</span></div>
</div>
</div>`}
</div>
<div class="reveal">
<p class="eyebrow">${esc(t.mentor.eyebrow)}</p>
<h2 class="d2" id="men-h" style="margin-top:16px">${esc(mentor.name)}</h2>
<p class="mentor__role">${esc(mentor.title[lang])}</p>
<p class="lead" style="margin-top:18px">${esc(t.mentor.lead)}</p>
<blockquote class="mentor__quote" style="margin-top:26px">${esc(mentor.bio[lang][0])}</blockquote>
<p class="body-text" style="margin-top:18px">${esc(mentor.bio[lang][1])}</p>
<div class="mentor__facts" style="margin-top:24px">
<span class="chip chip--accent">${esc(lang === 'hr' ? '360+ educiranih trenera' : '360+ trainers educated')}</span>
<span class="chip">${esc(lang === 'hr' ? '1000+ klijenata' : '1,000+ clients')}</span>
</div>
<p style="margin-top:28px"><a class="tlink" href="${esc(R.predavaci)}">${esc(t.mentor.cta)}${I.arrowSm}</a></p>
</div>
</div>
</div>
</section>

<!-- 06 PRIČE POLAZNIKA -->
<section class="section section--tight" aria-labelledby="proof-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.proof.eyebrow)}</p>
<h2 class="d2" id="proof-h">${esc(t.proof.h2)}</h2>
<p class="lead">${esc(t.proof.lead)}</p>
</div>
<div class="reserved reveal" style="margin-top:clamp(26px,3vw,42px)">
<p class="d4">${esc(t.proof.reservedTitle)}</p>
<p>${esc(t.proof.reservedBody)}</p>
<p style="margin-top:6px"><a class="tlink" href="${esc(R.price)}">${esc(t.ctaStories)}${I.arrowSm}</a></p>
</div>
</div>
</section>

<!-- 07 ZA KOGA JEST / NIJE -->
<section class="section" aria-labelledby="fit-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.fit.eyebrow)}</p>
<h2 class="d2" id="fit-h">${rich(t.fit.h2)}</h2>
</div>
<div class="fit">
<div class="fit__col fit__col--yes reveal">
<h3 class="fit__t"><i aria-hidden="true">${I.check}</i>${esc(t.fit.forTitle)}</h3>
<ul class="fit__list">${t.fit.forItems.map((x) => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul>
</div>
<div class="fit__col fit__col--no reveal">
<h3 class="fit__t"><i aria-hidden="true">${I.cross}</i>${esc(t.fit.againstTitle)}</h3>
<ul class="fit__list">${t.fit.againstItems.map((x) => `<li>${I.cross}<span>${esc(x)}</span></li>`).join('')}</ul>
</div>
</div>
<p class="fit__close lead reveal">${esc(t.fit.close)}</p>
</div>
</section>

<!-- 08 ŠTO JE UKLJUČENO -->
<section class="section section--tight" aria-labelledby="inc-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.included.eyebrow)}</p>
<h2 class="d2" id="inc-h">${esc(t.included.h2)}</h2>
<p class="lead">${esc(t.included.lead)}</p>
</div>
<ul class="ledger">
${t.included.items.map((it) => `<li class="reveal" data-reveal-group="ledger">
<span class="k" aria-hidden="true">${I.check}</span>
<h3 class="t">${esc(it.t)}</h3>
<p class="d">${esc(it.d)}</p>
</li>`).join('')}
</ul>
</div>
</section>

<!-- 09 KURIKULUM -->
<section class="section" id="kurikulum" aria-labelledby="cur-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.curriculum.eyebrow)}</p>
<h2 class="d2" id="cur-h">${rich(t.curriculum.h2)}</h2>
<p class="lead">${esc(t.curriculum.lead)}</p>
</div>
${areasBlock(lang, { detailed: false })}
<p style="margin-top:clamp(26px,3vw,40px)"><a class="btn btn--ghost btn--lg" href="${esc(R.kurikulum)}">${esc(t.ctaCurriculum)}${I.arrow}</a></p>
</div>
</section>

<!-- 10 EKSPERTNA MREŽA -->
<section class="section" id="predavaci" aria-labelledby="exp-h">
<div class="wrap">
<div class="split split--6-6">
<div class="reveal">
<p class="eyebrow">${esc(t.experts.eyebrow)}</p>
<h2 class="claim caps" id="exp-h" style="margin-top:18px">${esc(t.experts.claim)}</h2>
<p class="claim-sub">${esc(t.experts.claimSub)}</p>
</div>
<div class="reveal">
${t.experts.body.map((p) => `<p class="body-text">${esc(p)}</p>`).join('')}
<p class="small" style="margin-top:22px;letter-spacing:.18em;text-transform:uppercase">${esc(t.experts.disciplinesLabel)}</p>
<ul class="disciplines">${disciplines[lang].map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
</div>
</div>
<div class="roster">
${trainers.map((tr) => trainerCard(tr, lang, { linkTo: R.predavaci })).join('')}
<a class="roster__more${ROSTER_PHOTO_MODE ? '' : ' roster__more--type'} reveal" data-reveal-group="roster" href="${esc(R.predavaci)}">
<span class="d4">${esc(t.ctaExperts)}</span>
<span class="tcard__go">${esc(lang === 'hr' ? 'Stranica predavača' : 'Lecturers page')}${I.arrowSm}</span>
</a>
</div>
${rosterComplete ? '' : `<p class="roster-note">${esc(t.experts.rosterNote)}</p>`}
</div>
</section>

<!-- 11 RAZLIKA -->
<section class="section" aria-labelledby="gap-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.gap.eyebrow)}</p>
<h2 class="d2" id="gap-h">${rich(t.gap.h2)}</h2>
<p class="lead">${esc(t.gap.lead)}</p>
</div>
<div class="gap2">
<div class="gap2__col gap2__col--with reveal">
<h3 class="gap2__t">${esc(t.gap.withTitle)}</h3>
<ul class="gap2__list">${t.gap.withItems.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
</div>
<div class="gap2__col gap2__col--without reveal">
<h3 class="gap2__t">${esc(t.gap.withoutTitle)}</h3>
<ul class="gap2__list">${t.gap.withoutItems.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
</div>
</div>
<p class="gap2__close reveal">${esc(t.gap.close)}</p>
</div>
</section>

<!-- 12 PRIGOVORI -->
<section class="section section--tight" aria-labelledby="obj-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.objections.eyebrow)}</p>
<h2 class="d2" id="obj-h">${rich(t.objections.h2)}</h2>
</div>
<ul class="objs">
${objections.map((o) => `<li class="reveal"><h3 class="q">${esc(o.q[lang])}</h3><p class="a">${esc(o.a[lang])}</p></li>`).join('')}
</ul>
</div>
</section>

<!-- 13 INVESTICIJA -->
<section class="section section--tight light" id="investicija" aria-labelledby="inv-h">
<div class="wrap">
<div class="invest__grid">
<div class="reveal">
<p class="eyebrow">${esc(t.invest.eyebrow)}</p>
<h2 class="d2" id="inv-h" style="margin-top:16px">${rich(t.invest.h2)}</h2>
<p class="body-text" style="margin-top:20px">${esc(t.invest.body)}</p>
</div>
<div class="invest__card reveal">
<div class="invest__row">
<span class="invest__k">${esc(t.invest.regularLabel)}</span>
<span class="invest__was num">${site.price.regular} ${site.price.currency}</span>
</div>
<div class="invest__row">
<span class="invest__k">${esc(t.invest.currentLabel)}</span>
<span class="invest__now num">${site.price.current} ${site.price.currency}</span>
</div>
<p class="invest__deadline">${esc(priceLine)}</p>
<ul class="invest__incl">${t.invest.includes.map((x) => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul>
<div class="invest__cta">
${ctaPrimary(t, { size: 'btn--lg' })}
${checkoutIsFallback ? `<p class="small">${esc(t.ctaCheckoutFallbackNote)}</p>` : ''}
</div>
</div>
</div>
</div>
</section>

<!-- 14 FAQ -->
<section class="section" id="faq" aria-labelledby="faq-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(t.faqSection.eyebrow)}</p>
<h2 class="d2" id="faq-h">${esc(t.faqSection.h2)}</h2>
</div>
${faqBlock(lang, 'faq', faq)}
</div>
</section>

<!-- 15 FINALE -->
<section class="section finale" aria-labelledby="fin-h">
<div class="wrap">
<h2 class="d2 caps finale__h reveal" id="fin-h">${rich(t.finale.h2)}</h2>
<div class="finale__body reveal">${t.finale.body.map((p) => `<p class="body-text">${esc(p)}</p>`).join('')}</div>
<p class="finale__close reveal">${esc(t.finale.close)}</p>
<div class="btn-row reveal" style="margin-top:32px">
${ctaPrimary(t, { size: 'btn--lg' })}
<a class="btn btn--ghost btn--lg" href="${esc(R.predavaci)}">${esc(t.ctaExperts)}${I.arrow}</a>
</div>
<p class="wordmark" aria-hidden="true">Postani <span>trener</span></p>
</div>
</section>

</main>
${footer({ lang, pageKey: 'home', file })}
${ld.map(jsonld).join('\n')}
${tail({ file })}`;
}

/* ------------------------------------------------------------- PREDAVAČI */
function predavaciPage(lang) {
  const t = copy[lang];
  const p = t.predavaci;
  const file = FILES[lang].predavaci;
  const R = ROUTES[lang];

  const profile = (tr, i) => {
    const hasBio = !!tr.bio;
    return `<article class="profile" id="${tr.slug}">
<div class="wrap">
<div class="profile__grid">
<div class="reveal">
<div class="mslot mslot--portrait">
${tr.image
        ? `<img src="${esc(tr.image.src)}" alt="${esc(tr.image.alt?.[lang] || tr.name)}" width="${tr.image.w || 1600}" height="${tr.image.h || 2000}" loading="lazy" decoding="async">`
        : `<span class="mslot__ph" aria-hidden="true"></span><span class="mslot__mono" aria-hidden="true">${esc(tr.initials)}</span>`}
</div>
</div>
<div class="reveal">
<p class="eyebrow">${esc(tr.featured ? p.mentorEyebrow : p.rosterEyebrow)}</p>
<h2 class="d3 profile__name">${esc(tr.name)}</h2>
${tr.title ? `<p class="profile__title">${esc(tr.title[lang])}</p>` : ''}
${tr.oneLine ? `<p class="lead" style="margin-top:14px">${esc(tr.oneLine[lang])}</p>` : ''}
${tr.specialties ? `<div class="profile__meta"><div><h3>${esc(p.specialtiesLabel)}</h3><ul class="topics">${tr.specialties[lang].map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div></div>` : ''}
${tr.credentials ? `<div class="profile__meta"><div><h3>${esc(p.credentialsLabel)}</h3><ul class="topics">${tr.credentials[lang].map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div></div>` : ''}
${hasBio ? `<div class="disclose">
<button class="disclose__btn" type="button" data-disclosure data-start-open="${tr.featured ? 'true' : 'false'}" aria-expanded="false" aria-controls="bio-${tr.slug}">
<span data-label-open="${esc(p.bioToggleOpen)}" data-label-close="${esc(p.bioToggleClose)}">${esc(tr.featured ? p.bioToggleClose : p.bioToggleOpen)}</span>${I.chevron}
</button>
<div class="disclose__panel" id="bio-${tr.slug}" data-open="true"><div><div class="inner">
${tr.bio[lang].map((x) => `<p class="body-text">${esc(x)}</p>`).join('')}
${tr.links && tr.links.instagram ? `<p style="margin-top:6px"><a class="tlink" href="${esc(tr.links.instagram)}" target="_blank" rel="noopener">Instagram${I.arrowSm}</a></p>` : ''}
</div></div></div>
</div>` : `<p class="profile__pending">${esc(p.bioPending)}</p>`}
</div>
</div>
</div>
</article>`;
  };

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: site.origin + (R.home === '/' ? '/' : R.home) },
        { '@type': 'ListItem', position: 2, name: p.eyebrow, item: site.origin + R.predavaci },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'Person',
      name: mentor.name, jobTitle: mentor.title[lang],
      worksFor: { '@type': 'Organization', name: site.brand, url: site.origin + '/' },
      sameAs: [mentor.links?.instagram].filter(Boolean),
    },
  ];

  return `${head({ lang, pageKey: 'predavaci', title: p.title, description: p.description, file })}
${header({ lang, pageKey: 'predavaci', file })}
<main id="main">

<section class="phero">
<div class="wrap">
<nav class="crumbs" aria-label="${esc(lang === 'hr' ? 'Putanja' : 'Breadcrumb')}">
<a href="${esc(R.home)}">${esc(t.breadcrumbHome)}</a>${I.arrowSm}<span aria-current="page">${esc(p.eyebrow)}</span>
</nav>
<p class="eyebrow">${esc(p.eyebrow)}</p>
<h1 class="d1">${rich(p.h1)}</h1>
<p class="lead">${esc(p.lead)}</p>
</div>
</section>

<section class="section section--top0 section--tight">
<div class="wrap">
<div class="split split--6-6">
<div class="reveal">
${p.body.map((x) => `<p class="body-text">${esc(x)}</p>`).join('')}
<p class="small" style="margin-top:20px">${esc(p.clickHint)}</p>
</div>
<div class="reveal">
<p class="mentor__quote">${esc(p.emphasis)}</p>
</div>
</div>
</div>
</section>

<section class="section section--top0" aria-labelledby="ros-h">
<div class="wrap">
<div class="head reveal">
<p class="eyebrow">${esc(p.rosterEyebrow)}</p>
<h2 class="d2" id="ros-h">${esc(p.rosterH2)}</h2>
</div>
<div class="roster">${trainers.map((tr) => trainerCard(tr, lang, { linkTo: '', samePage: true })).join('')}</div>
${rosterComplete ? '' : `<p class="roster-note">${esc(t.experts.rosterNote)}</p>`}
</div>
</section>

${trainers.filter(hasProfile).length ? `<section class="section section--top0 section--tight">
${trainers.filter(hasProfile).map(profile).join('\n')}
</section>` : ''}

<section class="section section--tight light" aria-labelledby="pcl-h">
<div class="wrap">
<p class="eyebrow">${esc(p.closingEyebrow)}</p>
<h2 class="d2" id="pcl-h" style="margin-top:16px">${rich(p.closingH2)}</h2>
<p class="lead" style="margin-top:20px">${esc(p.closingBody)}</p>
<div class="btn-row" style="margin-top:30px">
${ctaPrimary(t, { size: 'btn--lg' })}
<a class="btn btn--ghost btn--lg" href="${esc(R.kurikulum)}">${esc(t.ctaCurriculum)}${I.arrow}</a>
</div>
<p class="cta-note" style="margin-top:14px">${esc(t.ctaPrimaryNote)}</p>
</div>
</section>

</main>
${footer({ lang, pageKey: 'predavaci', file })}
${ld.map(jsonld).join('\n')}
${tail({ file })}`;
}

/* ------------------------------------------------------------- KURIKULUM */
function kurikulumPage(lang) {
  const t = copy[lang];
  const k = t.kurikulum;
  const file = FILES[lang].kurikulum;
  const R = ROUTES[lang];

  const ld = [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: site.origin + (R.home === '/' ? '/' : R.home) },
      { '@type': 'ListItem', position: 2, name: k.eyebrow, item: site.origin + R.kurikulum },
    ],
  }];

  return `${head({ lang, pageKey: 'kurikulum', title: k.title, description: k.description, file })}
${header({ lang, pageKey: 'kurikulum', file })}
<main id="main">

<section class="phero">
<div class="wrap">
<nav class="crumbs" aria-label="${esc(lang === 'hr' ? 'Putanja' : 'Breadcrumb')}">
<a href="${esc(R.home)}">${esc(t.breadcrumbHome)}</a>${I.arrowSm}<span aria-current="page">${esc(k.eyebrow)}</span>
</nav>
<p class="eyebrow">${esc(k.eyebrow)}</p>
<h1 class="d1">${rich(k.h1)}</h1>
<p class="lead">${esc(k.lead)}</p>
</div>
</section>

<section class="section section--top0">
<div class="wrap">
<div class="split split--5-7 split--sticky">
<nav aria-label="${esc(k.indexLabel)}" class="reveal">
<p class="small" style="letter-spacing:.18em;text-transform:uppercase">${esc(k.indexLabel)}</p>
<ul style="margin-top:16px;display:flex;flex-direction:column">
${areas.map((a) => `<li style="border-bottom:1px solid var(--line)"><a href="#${a.slug}" style="display:grid;grid-template-columns:34px 1fr;gap:8px;padding-block:12px;color:var(--cream-64)"><span class="num" style="color:var(--accent-lift);font-weight:650">${esc(a.number)}</span><span>${esc(a.title[lang])}</span></a></li>`).join('')}
</ul>
<div class="btn-row" style="margin-top:22px">
<button class="tlink" type="button" data-bulk="open">${esc(k.expandAll)}</button>
<button class="tlink" type="button" data-bulk="close">${esc(k.collapseAll)}</button>
</div>
</nav>
<div>
${areasBlock(lang, { detailed: true })}
${lessonsSupplied ? '' : `<div class="reserved" style="margin-top:clamp(28px,3vw,44px)">
<p class="d4">${esc(k.lessonsPendingTitle)}</p>
<p>${esc(k.lessonsPendingBody)}</p>
</div>`}
</div>
</div>
</div>
</section>

<section class="section section--tight light" aria-labelledby="kcl-h">
<div class="wrap">
<h2 class="d2" id="kcl-h">${esc(k.closingH2)}</h2>
<div class="btn-row" style="margin-top:26px">
${ctaPrimary(t, { size: 'btn--lg' })}
<a class="btn btn--ghost btn--lg" href="${esc(R.predavaci)}">${esc(t.ctaExperts)}${I.arrow}</a>
</div>
<p class="cta-note" style="margin-top:14px">${esc(t.ctaPrimaryNote)}</p>
</div>
</section>

</main>
${footer({ lang, pageKey: 'kurikulum', file })}
${ld.map(jsonld).join('\n')}
${tail({ file })}`;
}

/* ----------------------------------------------------------------- PRIČE */
function pricePage(lang) {
  const t = copy[lang];
  const s = t.price;
  const file = FILES[lang].price;
  const R = ROUTES[lang];

  const ld = [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: site.origin + (R.home === '/' ? '/' : R.home) },
      { '@type': 'ListItem', position: 2, name: s.eyebrow, item: site.origin + R.price },
    ],
  }];

  return `${head({ lang, pageKey: 'price', title: s.title, description: s.description, file })}
${header({ lang, pageKey: 'price', file })}
<main id="main">

<section class="phero">
<div class="wrap">
<nav class="crumbs" aria-label="${esc(lang === 'hr' ? 'Putanja' : 'Breadcrumb')}">
<a href="${esc(R.home)}">${esc(t.breadcrumbHome)}</a>${I.arrowSm}<span aria-current="page">${esc(s.eyebrow)}</span>
</nav>
<p class="eyebrow">${esc(s.eyebrow)}</p>
<h1 class="d1">${rich(s.h1)}</h1>
<p class="lead">${esc(s.lead)}</p>
</div>
</section>

<section class="section section--top0">
<div class="wrap">
<div class="reserved reveal">
<p class="d4">${esc(s.reservedTitle)}</p>
${s.reservedBody.map((x) => `<p>${esc(x)}</p>`).join('')}
</div>
<div class="reveal" style="margin-top:clamp(34px,4vw,60px)">
<p class="eyebrow">${esc(s.meanwhile)}</p>
<p class="lead" style="margin-top:14px">${esc(s.meanwhileBody)}</p>
<div class="btn-row" style="margin-top:24px">
<a class="btn btn--ghost btn--lg" href="${esc(R.kurikulum)}">${esc(t.ctaCurriculum)}${I.arrow}</a>
<a class="btn btn--ghost btn--lg" href="${esc(R.predavaci)}">${esc(t.ctaExperts)}${I.arrow}</a>
</div>
</div>
</div>
</section>

<section class="section section--tight light" aria-labelledby="scl-h">
<div class="wrap">
<p class="eyebrow">${esc(t.invest.eyebrow)}</p>
<h2 class="d2" id="scl-h" style="margin-top:16px">${rich(t.invest.h2)}</h2>
<div class="btn-row" style="margin-top:26px">${ctaPrimary(t, { size: 'btn--lg' })}</div>
<p class="cta-note" style="margin-top:14px">${esc(t.ctaPrimaryNote)}</p>
</div>
</section>

</main>
${footer({ lang, pageKey: 'price', file })}
${ld.map(jsonld).join('\n')}
${tail({ file })}`;
}

/* ------------------------------------------------------------ ASSET DOCS */
function assetsDoc() {
  const rows = [];
  rows.push('| Slot | Stranica / sekcija | Motiv | Desktop | Mobitel | Omjer | Min. rezolucija |');
  rows.push('|---|---|---|---|---|---|---|');
  rows.push('| `hero-mentor` | Naslovnica → Mentor | Portret Frane Jerčića, tamno gym/uredničko okruženje, pogled u objektiv | 1600 × 2000 | 800 × 1000 | 4:5 | 1600 px šireg ruba |');
  rows.push('| `video-poster` | Naslovnica → Prodajni video | Kadar iz prodajnog videa ili portret u kadru 16:9 | 1920 × 1080 | 960 × 540 | 16:9 | 1600 px |');
  trainers.forEach((tr) => {
    rows.push(`| \`trainer-${tr.slug}\` | Predavači → ${tr.name} | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |`);
  });
  rows.push('| `og` | Društvene mreže (HR) | Wordmark + naslov, tamna ploha | 1200 × 630 | — | 1.91:1 | 1200 px |');
  rows.push('| `og-en` | Društvene mreže (EN) | Isto, engleski naslov | 1200 × 630 | — | 1.91:1 | 1200 px |');

  return `# Postani trener · V3 — potrebni materijali

Generirano iz \`content/\` pri buildu. Ne uređuj ručno — dodaj podatke u
\`content/trainers.mjs\` i \`content/site.mjs\`, pa pokreni \`node build.mjs\`.

## 1. Fotografije

Sve fotografije idu u \`static/img/\`. Format: **AVIF ili WebP** (uz JPG fallback nije
potreban — svi ciljani preglednici podržavaju WebP). Bez rastezanja, bez lošeg reza
lica; ako lice nije centrirano, postavi \`focus\` u podatkovnoj datoteci.

${rows.join('\n')}

### Kako uključiti sliku predavača

U \`content/trainers.mjs\`, na objektu tog predavača:

\`\`\`js
image: {
  src: 'img/trainer-marino-basic.webp',
  alt: { hr: 'Marino Bašić', en: 'Marino Bašić' },
  w: 1600, h: 2000,
}
\`\`\`

**Mreža ima dva načina i sama bira.** Dok NIJEDAN predavač nema fotografiju, roster
se renderira tipografski (monogram + ime), kao odjavna špica — a ne kao zid od
dvanaest praznih portretnih okvira. Čim prvi \`image\` postoji, ista mreža prelazi u
foto-način i predavači bez slike dobivaju monogram u portretnom okviru.

Nikad se ne koristi tuđa ili stock fotografija uz ime stvarne osobe.

## 2. Tekstualni sadržaj koji još nedostaje

| Što | Gdje se upisuje | Status |
|---|---|---|
| Stripe / checkout URL | \`content/site.mjs\` → \`checkout.url\` | ${site.checkout.url ? 'postavljen' : '**nedostaje** — svi CTA-ovi privremeno vode na Instagram'} |
| YouTube ID prodajnog videa | \`content/site.mjs\` → \`video.youtubeId\` | ${site.video.youtubeId ? 'postavljen' : '**nedostaje** — sekcija prikazuje rezervirano stanje'} |
| Titule i jedna rečenica po predavaču | \`content/trainers.mjs\` → \`title\`, \`oneLine\` | ${rosterComplete ? 'kompletno' : `**nedostaje** za ${contributors.filter((t) => !t.title).length} od ${contributors.length} suradnika`} |
| Pune biografije predavača | \`content/trainers.mjs\` → \`bio\` | ${trainers.filter((t) => t.bio).length}/${trainers.length} zaprimljeno |
| Nazivi i trajanja lekcija | \`content/curriculum.mjs\` → \`areas[].lessons\` | ${lessonsSupplied ? 'zaprimljeno' : '**nedostaje** — prikazana su samo područja i teme'} |
| Priče polaznika | nova datoteka \`content/stories.mjs\` | **nedostaje** — stranica \`/price\` prikazuje pošteno rezervirano stanje |
| Video i pisane recenzije | nova datoteka \`content/stories.mjs\` | **nedostaje** |
| Godina za rok popusta „${site.price.deadlineHr}" | \`content/site.mjs\` → \`price.deadlineHr\` | nepoznata — zato NEMA odbrojavanja |
| Facebook grupa, kontakt e-mail | \`content/site.mjs\` → \`social\` | **nedostaje** — link se ne renderira dok je \`null\` |

## 3. Na dan lansiranja

1. \`content/site.mjs\` → \`checkout.url = 'https://…'\` (jedna linija, svih 8 stranica).
2. \`content/site.mjs\` → \`noindex: false\`.
3. \`node build.mjs\` i deploy.
`;
}

/* ------------------------------------------------------------------ SEO */
function sitemap() {
  const urls = [];
  for (const lang of ['hr', 'en']) {
    for (const key of ['home', 'predavaci', 'kurikulum', 'price']) {
      const loc = site.origin + (ROUTES[lang][key] === '/' ? '/' : ROUTES[lang][key]);
      const alts = ['hr', 'en'].map((l) => {
        const h = site.origin + (ROUTES[l][key] === '/' ? '/' : ROUTES[l][key]);
        return `    <xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`;
      }).join('\n');
      urls.push(`  <url>\n    <loc>${loc}</loc>\n${alts}\n    <changefreq>monthly</changefreq>\n    <priority>${key === 'home' ? '1.0' : '0.8'}</priority>\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

function robots() {
  if (site.noindex) {
    return `# Preview build. Indeksiranje je isključeno dok checkout ne postoji.\n# Na dan lansiranja: content/site.mjs -> noindex: false, pa node build.mjs\nUser-agent: *\nDisallow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`;
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`;
}

/* ------------------------------------------------------------------ MAIN */
const pages = [];
for (const lang of ['hr', 'en']) {
  pages.push([FILES[lang].home, homePage(lang)]);
  pages.push([FILES[lang].predavaci, predavaciPage(lang)]);
  pages.push([FILES[lang].kurikulum, kurikulumPage(lang)]);
  pages.push([FILES[lang].price, pricePage(lang)]);
}

if (existsSync(DIST)) await rm(DIST, { recursive: true, force: true });
await mkdir(path.join(DIST, 'en'), { recursive: true });
await cp(path.join(ROOT, 'static'), DIST, { recursive: true });

for (const [file, html] of pages) {
  const out = path.join(DIST, file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');
}
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(), 'utf8');
await writeFile(path.join(DIST, 'robots.txt'), robots(), 'utf8');
await writeFile(path.join(ROOT, 'ASSETS_REQUIRED.md'), assetsDoc(), 'utf8');

/* Vercel se linka po direktoriju iz kojeg se deploya, a deploya se /dist.
   Build brise /dist, pa se veza na projekt kopira natrag ovdje. */
if (existsSync(path.join(ROOT, '.vercel'))) {
  await cp(path.join(ROOT, '.vercel'), path.join(DIST, '.vercel'), { recursive: true });
}

console.log(`build ok · ${pages.length} pages · checkout=${site.checkout.url ? 'live' : 'fallback(instagram)'} · noindex=${site.noindex}`);
