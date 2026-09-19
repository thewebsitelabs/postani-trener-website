/* ============================================================
   POSTANI TRENER · main.js
   Lenis smooth scroll + GSAP (ScrollTrigger, SplitText)
   ============================================================ */

/* THINKIFIC CHECKOUT: zamijeni ovaj URL i sve tipke rade.
   Thinkific checkout sam vrti Stripe, ne treba nikakav kljuc ni API. */
const CHECKOUT_URL = 'ZAMIJENI-THINKIFIC-CHECKOUT-URL';
document.querySelectorAll('[data-checkout]').forEach(a => { if (CHECKOUT_URL.startsWith('http')) a.href = CHECKOUT_URL; });

(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
  } else {
    document.documentElement.classList.add('no-gsap');
  }

  /* ---------- Checkout gumbi: dok URL nije upisan, ne vode nikamo ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-checkout]');
    if (!a) return;
    if (!CHECKOUT_URL.startsWith('http')) { e.preventDefault(); }
  });

  /* ---------- Lenis ---------- */
  let lenis = null;
  if (!reduced && typeof Lenis !== 'undefined' && hasGsap) {
    lenis = new Lenis({ duration: 1.0, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const stopScroll = () => { if (lenis) lenis.stop(); document.body.style.overflow = 'hidden'; };
  const startScroll = () => { if (lenis) lenis.start(); document.body.style.overflow = ''; };

  /* ---------- Hero ulaz ---------- */
  function heroIn(delay) {
    const els = document.querySelectorAll('[data-hero-reveal]');
    if (!hasGsap || !els.length) return null;
    if (reduced) { gsap.set(els, { clearProps: 'all' }); return null; }
    const tl = gsap.timeline({ delay: delay || 0 });
    els.forEach((el, i) => {
      if (el.dataset.heroReveal === 'chars') {
        const split = new SplitText(el, { type: 'chars,words', mask: 'chars' });
        tl.from(split.chars, { yPercent: 118, stagger: 0.016, duration: 0.95, ease: 'power4.out' }, i * 0.07);
      } else {
        tl.from(el, { y: 38, autoAlpha: 0, duration: 0.85, ease: 'power3.out' }, 0.22 + i * 0.08);
      }
    });
    return tl;
  }

  /* ---------- Loader: brojac 0 do 490, pa se zavjesa razdvoji ---------- */
  const loader = document.getElementById('loader');
  function killLoader() { if (loader && loader.parentNode) loader.remove(); startScroll(); }

  function intro() {
    if (!loader) { heroIn(0.15); return; }
    if (!hasGsap || reduced) { killLoader(); heroIn(0); return; }
    stopScroll();
    const num = loader.querySelector('.loader__num');
    const bar = loader.querySelector('.loader__bar i');
    const c = { v: 0 };
    const failsafe = setTimeout(killLoader, 2600);
    const tl = gsap.timeline({ onComplete: () => { clearTimeout(failsafe); killLoader(); } });
    tl.to(c, {
      v: 490, duration: 1.15, ease: 'power2.inOut',
      onUpdate: () => { if (num) num.textContent = String(Math.round(c.v)); }
    }, 0)
      .to(bar, { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0)
      .to(['.loader__mid', '.loader__bar', '.loader__tag'], { autoAlpha: 0, duration: 0.25, ease: 'power2.in' }, '+=0.12')
      .to('.loader__half--t', { yPercent: -101, duration: 0.72, ease: 'power4.inOut' }, '-=0.05')
      .to('.loader__half--b', { yPercent: 101, duration: 0.72, ease: 'power4.inOut' }, '<')
      .add(heroIn(0), '-=0.5');
  }

  /* ---------- Page transition: plavi panel slijeva udesno ---------- */
  const swipe = document.getElementById('swipe');
  const swipeLine = document.getElementById('swipeLine');

  function resetPanel() {
    if (!swipe || !hasGsap) return;
    gsap.set(swipe, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 });
    if (swipeLine) gsap.set(swipeLine, { x: -4, autoAlpha: 0 });
  }

  function playExit(done) {
    if (!swipe || !hasGsap) { done(); return; }
    const w = window.innerWidth;
    gsap.set(swipe, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1, visibility: 'visible' });
    const tl = gsap.timeline({ onComplete: done });
    if (swipeLine) {
      gsap.set(swipeLine, { x: -4, autoAlpha: 1, visibility: 'visible' });
      tl.to(swipeLine, { x: w + 4, duration: 0.65, ease: 'power4.inOut' }, 0);
    }
    tl.to(swipe, { clipPath: 'inset(0 0% 0 0)', duration: 0.65, ease: 'power4.inOut' }, 0.04);
  }

  function playEnter() {
    if (!swipe || !hasGsap || reduced) { resetPanel(); return; }
    const w = window.innerWidth;
    gsap.set(swipe, { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, visibility: 'visible' });
    const tl = gsap.timeline({ onComplete: resetPanel });
    if (swipeLine) {
      gsap.set(swipeLine, { x: 0, autoAlpha: 1, visibility: 'visible' });
      tl.to(swipeLine, { x: w + 4, duration: 0.7, ease: 'power4.inOut' }, 0);
    }
    tl.to(swipe, { clipPath: 'inset(0 0 0 100%)', duration: 0.7, ease: 'power4.inOut' }, 0.05);
    if (swipeLine) tl.to(swipeLine, { autoAlpha: 0, duration: 0.18 }, 0.62);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-internal]');
    if (!a || !hasGsap || reduced || !swipe) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    e.preventDefault();
    playExit(() => { window.location.href = href; });
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) resetPanel(); });

  /* ---------- Nav ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Fullscreen menu (class-driven, GSAP je samo enhancement) ---------- */
  const menu = document.getElementById('menu');
  const menuBtn = document.getElementById('menuBtn');
  if (menu && menuBtn) {
    const links = menu.querySelectorAll('.menu__links a');
    const foot = menu.querySelector('.menu__foot');
    let open = false;
    let tl = null;

    if (hasGsap) {
      tl = gsap.timeline({
        paused: true,
        onComplete: () => menu.classList.add('is-open'),
        onReverseComplete: () => { menu.classList.remove('is-open'); gsap.set(menu, { visibility: 'hidden' }); }
      })
        .set(menu, { visibility: 'visible' })
        .to(menu, { clipPath: 'inset(0% 0 0% 0)', duration: 0.65, ease: 'power4.inOut' })
        .from(links, { yPercent: 60, autoAlpha: 0, stagger: 0.055, duration: 0.55, ease: 'power3.out' }, '-=0.25')
        .from(foot, { autoAlpha: 0, y: 18, duration: 0.35 }, '-=0.3');
    }

    const setMenu = (state, speed) => {
      open = state;
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        if (!tl) menu.classList.add('is-open');
        stopScroll();
        if (tl) tl.timeScale(1).play();
      } else {
        startScroll();
        if (tl) tl.timeScale(speed || 1.4).reverse();
        else menu.classList.remove('is-open');
      }
    };
    const closeMenu = (speed, refocus) => {
      if (!open) return;
      setMenu(false, speed);
      if (refocus) menuBtn.focus();
    };

    menuBtn.addEventListener('click', () => {
      setMenu(!open);
      if (open && links.length) links[0].focus({ preventScroll: true });
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(2, false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Esc') closeMenu(1.8, true); });
    const desktop = window.matchMedia('(min-width: 901px)');
    const onBp = (e) => { if (e.matches) closeMenu(3, false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBp);
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduced && hasGsap) {
    const dot = document.createElement('div'); dot.className = 'cursor';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    const xd = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2' });
    const yd = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2' });
    const xr = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const yr = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    window.addEventListener('mousemove', (e) => {
      document.body.classList.add('cursor-on');
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY);
    });
    document.addEventListener('mouseover', (e) => {
      ring.classList.toggle('is-hover', !!e.target.closest('a, button, summary, [data-hover]'));
    });
  }

  /* ---------- Video facade: iframe tek na klik (youtube-nocookie) ---------- */
  document.querySelectorAll('.video').forEach((box) => {
    const btn = box.querySelector('.video__play');
    const frame = box.querySelector('.video__frame');
    if (!btn || !frame) return;
    btn.addEventListener('click', () => {
      const id = (box.dataset.yt || '').trim();
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return; // ID jos nije upisan
      const ifr = document.createElement('iframe');
      ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      ifr.title = box.dataset.ytTitle || 'Video';
      ifr.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      ifr.allowFullscreen = true;
      frame.appendChild(ifr);
      btn.remove();
    });
  });

  /* ---------- Slajderi: strelice, povlacenje, scroll-snap. Nikad autoplay ---------- */
  document.querySelectorAll('[data-slider]').forEach((sl) => {
    const rail = sl.querySelector('.rail');
    const prev = sl.querySelector('[data-prev]');
    const next = sl.querySelector('[data-next]');
    if (!rail) return;
    const stepSize = () => {
      const first = rail.firstElementChild;
      if (!first) return 320;
      const gap = parseFloat(getComputedStyle(rail).columnGap || '18') || 18;
      return first.getBoundingClientRect().width + gap;
    };
    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max;
    };
    if (prev) prev.addEventListener('click', () => rail.scrollBy({ left: -stepSize(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => rail.scrollBy({ left: stepSize(), behavior: 'smooth' }));
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    // povlacenje misem
    let down = false, sx = 0, sl0 = 0, moved = 0;
    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      down = true; moved = 0; sx = e.clientX; sl0 = rail.scrollLeft;
      rail.classList.add('is-drag');
    });
    rail.addEventListener('pointermove', (e) => {
      if (!down) return;
      const d = e.clientX - sx;
      moved = Math.abs(d);
      rail.scrollLeft = sl0 - d;
    });
    const up = () => { if (!down) return; down = false; rail.classList.remove('is-drag'); sync(); };
    rail.addEventListener('pointerup', up);
    rail.addEventListener('pointerleave', up);
    rail.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  });

  /* ---------- Profil panel predavaca ---------- */
  const ppanel = document.getElementById('ppanel');
  const pback = document.getElementById('pback');
  if (ppanel && pback) {
    const pImg = ppanel.querySelector('.ppanel__img img');
    const pName = ppanel.querySelector('[data-p-name]');
    const pRole = ppanel.querySelector('[data-p-role]');
    const pLine = ppanel.querySelector('[data-p-line]');
    let last = null;
    let isOn = false;

    const show = (card) => {
      if (isOn) return;
      isOn = true; last = card;
      if (pImg) { pImg.src = card.dataset.img || ''; pImg.alt = card.dataset.alt || ''; }
      if (pName) pName.textContent = card.dataset.name || '';
      if (pRole) pRole.textContent = card.dataset.role || '';
      if (pLine) pLine.textContent = card.dataset.line || '';
      ppanel.setAttribute('aria-hidden', 'false');
      document.body.classList.add('panel-open');
      stopScroll();
      if (hasGsap && !reduced) {
        gsap.set(ppanel, { x: 0, visibility: 'visible' });
        gsap.set(pback, { visibility: 'visible' });
        gsap.to(pback, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
        gsap.fromTo(ppanel, { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 0.62, ease: 'power4.inOut' });
      } else {
        ppanel.classList.add('is-on'); pback.classList.add('is-on');
      }
      const cl = ppanel.querySelector('.ppanel__close');
      if (cl) cl.focus({ preventScroll: true });
    };

    const hide = () => {
      if (!isOn) return;
      isOn = false;
      ppanel.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('panel-open');
      startScroll();
      if (hasGsap && !reduced) {
        gsap.to(pback, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(ppanel, {
          clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: 'power4.inOut',
          onComplete: () => gsap.set([ppanel, pback], { visibility: 'hidden' })
        });
      } else {
        ppanel.classList.remove('is-on'); pback.classList.remove('is-on');
      }
      if (last) last.focus({ preventScroll: true });
    };

    document.querySelectorAll('[data-profile]').forEach((card) => {
      card.addEventListener('click', () => show(card));
    });
    pback.addEventListener('click', hide);
    ppanel.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', hide));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Esc') hide(); });
  }

  /* ---------- Scroll reveals ---------- */
  if (hasGsap && !reduced) {
    document.fonts.ready.then(() => {
      document.querySelectorAll('[data-split]').forEach((el) => {
        const split = new SplitText(el, { type: 'lines', mask: 'lines' });
        gsap.from(split.lines, {
          yPercent: 112, duration: 1, ease: 'power4.out', stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 86%' }
        });
      });
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, {
          y: 0, autoAlpha: 1, duration: 0.95, ease: 'power3.out',
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 90%' }
        });
      });
      gsap.utils.toArray('.reveal-img').forEach((el) => {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 84%' }
        });
      });
      ScrollTrigger.refresh();
    });

    /* parallax na foto bandovima */
    gsap.utils.toArray('.band__img').forEach((el) => {
      gsap.fromTo(el, { yPercent: -9 }, {
        yPercent: 9, ease: 'none',
        scrollTrigger: { trigger: el.closest('.band, .page-hero'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* CRAZY 1: scroll-fill outline naslov */
    gsap.utils.toArray('[data-fill]').forEach((el) => {
      const fill = el.querySelector('span');
      if (!fill) return;
      gsap.fromTo(fill, { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 42%', scrub: true }
      });
    });

    /* traka: brojaci broje jednom na ulasku pa stoje */
    gsap.utils.toArray('.count').forEach((el) => {
      const to = parseFloat(el.dataset.to || '0');
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => gsap.to(obj, {
          v: to, duration: 1.5, ease: 'power3.out',
          onUpdate: () => { el.textContent = String(Math.round(obj.v)); }
        })
      });
    });

    /* stacking sekcija: opacity ide na DJECU kartice */
    const cards = gsap.utils.toArray('.stack__card');
    if (cards.length > 1) {
      gsap.matchMedia().add('(min-width: 901px)', () => {
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.95, ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true }
          });
          gsap.to(card.children, {
            opacity: 0.45, ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true }
          });
        });
      });
    }

    /* footer giant */
    const giant = document.querySelector('.footer__giant');
    if (giant) gsap.from(giant, {
      yPercent: 38, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 40%', scrub: true }
    });
  }

  /* ---------- CRAZY 2: card tilt 3D, samo pointer:fine ---------- */
  if (finePointer && !reduced && hasGsap) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
      gsap.set(el, { transformPerspective: 900, transformOrigin: 'center' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 6); rx(-py * 6);
      });
      el.addEventListener('mouseleave', () => { rx(0); ry(0); });
    });
  }

  /* ---------- CRAZY 3: magnetni gumbi ---------- */
  if (finePointer && !reduced && hasGsap) {
    document.querySelectorAll('.btn, .snav').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ---------- Pauziraj sve sto se vrti izvan viewporta ---------- */
  if ('IntersectionObserver' in window) {
    document.querySelectorAll('[data-pause-offscreen]').forEach((el) => {
      new IntersectionObserver(([e]) => el.classList.toggle('is-off', !e.isIntersecting), { threshold: 0 }).observe(el);
    });
  }

  /* ---------- Reduced motion: finalne vrijednosti odmah ---------- */
  if (reduced) {
    document.querySelectorAll('.count').forEach((el) => { el.textContent = el.dataset.to || el.textContent; });
  }

  /* ---------- Init ---------- */
  resetPanel();
  if (!loader) playEnter();
  window.addEventListener('load', () => { if (hasGsap) ScrollTrigger.refresh(); });
  intro();
})();
