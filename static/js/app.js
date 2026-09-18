/* ============================================================================
   POSTANI TRENER · V3 — app.js
   ----------------------------------------------------------------------------
   Bez animacijskih biblioteka. Nativni scroll, IntersectionObserver za
   otkrivanje sekcija, CSS za sve prijelaze. ~4 kB umjesto ~125 kB vendora.

   Zašto ne ScrollTrigger: paneli su u HTML-u otvoreni (da stranica radi bez
   JS-a) i zatvaraju se pri inicijalizaciji. Stranica se time skrati, a svaki
   sustav koji unaprijed računa scroll-pozicije ostane s krivim brojkama i
   sekcije pri dnu nikad se ne prikažu. IntersectionObserver ne računa ništa
   unaprijed, pa je na ovakvoj stranici jednostavno točniji.

   PRAVILO: sve što JS izračuna već mora biti točno u HTML-u. Bez JS-a je
   stranica potpuna — brojke stoje na pravim vrijednostima, harmonike su
   otvorene, svi linkovi rade.
   Checkout URL se upisuje u HTML pri buildu (content/site.mjs), ne ovdje.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- HEADER */
  var hdr = document.querySelector('[data-hdr]');
  if (hdr) {
    var stuck = false;
    var onScroll = function () {
      var next = window.scrollY > 12;
      if (next !== stuck) { stuck = next; hdr.classList.toggle('is-stuck', stuck); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------- MOBILNI MENU */
  var burger = document.querySelector('[data-burger]');
  var mnav = document.querySelector('[data-mnav]');
  if (burger && mnav) {
    /* Dok je izbornik otvoren, ostatak stranice je iza pune plohe. Bez inerta
       Tab odlazi na linkove koje korisnik ne vidi. */
    var behind = [document.querySelector('main'), document.querySelector('footer'), hdr]
      .filter(Boolean);
    var setBehind = function (on) {
      behind.forEach(function (el) {
        if (el === hdr) return;               /* header ostaje dostupan */
        if (on) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
    };
    var closeMenu = function () {
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      mnav.setAttribute('aria-hidden', 'true');
      setBehind(false);
    };
    var openMenu = function () {
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      mnav.setAttribute('aria-hidden', 'false');
      setBehind(true);
      /* focus() na elementu koji je jos visibility:hidden ne radi — pricekaj frame. */
      requestAnimationFrame(function () {
        var first = mnav.querySelector('a, button');
        if (first) first.focus({ preventScroll: true });
      });
    };
    burger.addEventListener('click', function () {
      if (document.body.classList.contains('menu-open')) { closeMenu(); burger.focus({ preventScroll: true }); }
      else { openMenu(); }
    });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        closeMenu(); burger.focus({ preventScroll: true });
      }
    });
    /* Prelazak na desktop širinu ne smije ostaviti zaključan scroll. */
    var wide = window.matchMedia('(min-width: 960px)');
    var onWide = function (e) { if (e.matches) closeMenu(); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ------------------------------------------------------------- HARMONIKE
     Jedan obrazac za kurikulum, FAQ i pune profile. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-disclosure]'), function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    var startOpen = btn.getAttribute('data-start-open') === 'true';
    var label = btn.querySelector('[data-label-open]');
    var setLabel = function (isOpen) {
      if (!label) return;
      label.textContent = isOpen
        ? label.getAttribute('data-label-close')
        : label.getAttribute('data-label-open');
    };
    var setState = function (open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.setAttribute('data-open', open ? 'true' : 'false');
      setLabel(open);
    };
    setState(startOpen);
    btn.addEventListener('click', function () {
      setState(btn.getAttribute('aria-expanded') !== 'true');
    });
    btn._setState = setState;
  });

  /* Otvori sve / zatvori sve (kurikulum) */
  Array.prototype.forEach.call(document.querySelectorAll('[data-bulk]'), function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('data-bulk') === 'open';
      Array.prototype.forEach.call(document.querySelectorAll('[data-disclosure][data-group="areas"]'), function (btn) {
        if (btn._setState) btn._setState(open);
      });
    });
  });

  /* Duboki link: /kurikulum#nutricionizam otvara to područje */
  function openFromHash() {
    var id = (location.hash || '').replace('#', '');
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    var btn = target.querySelector('[data-disclosure]');
    if (btn && btn._setState && btn.getAttribute('aria-expanded') !== 'true') btn._setState(true);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  /* ----------------------------------------------------------------- VIDEO
     Nikad autoplay. iframe se ubacuje tek na klik — do tada nijedan zahtjev
     prema YouTubeu i nijedan kolačić. */
  var vidBtn = document.querySelector('[data-video-play]');
  if (vidBtn) {
    vidBtn.addEventListener('click', function () {
      var id = vidBtn.getAttribute('data-yt');
      var frame = vidBtn.closest('[data-video-frame]');
      if (!id || !frame) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id)
        + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      iframe.title = vidBtn.getAttribute('data-yt-title') || 'Video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.setAttribute('allowfullscreen', '');
      frame.innerHTML = '';
      frame.appendChild(iframe);
    });
  }

  /* --------------------------------------------------------------- REVEAL */
  var reveals = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  } else {
    /* Elementi s istim data-reveal-group ulaze u nizu, jedan za drugim. */
    var order = {};
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var g = el.getAttribute('data-reveal-group');
        if (g) {
          order[g] = (order[g] || 0);
          el.style.transitionDelay = Math.min(order[g] * 55, 400) + 'ms';
          order[g] += 1;
        }
        el.classList.add('is-in');
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });

    /* Sigurnosna mreža: što je nakon 3 s još skriveno a nalazi se u vidnom
       polju, prikaži. Sadržaj se nikad ne smije izgubiti zbog dekoracije. */
    window.setTimeout(function () {
      Array.prototype.forEach.call(reveals, function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    }, 3000);
  }

  /* --------------------------------------------------------- BROJAČ STATA
     Prava vrijednost je u HTML-u i tamo ostaje. Odbrojavanje kreće od nule
     tek kad element uđe u vidno polje, pa stranica nikad ne piše "0+". */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduced && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        obs.unobserve(el);
        var to = parseFloat(el.getAttribute('data-count'));
        if (!isFinite(to)) return;
        var dur = 1100, t0 = 0;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / dur, 1);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(step);
          else el.textContent = String(to);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  /* ------------------------------------------------------------ HERO ULAZ
     Klasa dolazi iz JS-a: bez JS-a je hero odmah na finalnom mjestu. */
  if (!reduced) {
    var hero = document.querySelector('[data-hero]');
    if (hero) hero.classList.add('hero--in');
  }
})();
