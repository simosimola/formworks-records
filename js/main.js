// Page transitions between pages (Main -> artist page, artist page -> release
// landing, anything -> 404) via Barba.js. GSAP/SplitText/ScrollTrigger below
// own in-page text animation; the two integrate through Barba's hooks below.
function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// SplitText instances are tracked here so unload() can revert them (restore
// plain, unsplit innerHTML) before Barba replaces the page — SplitText has no
// getAll()-style registry of its own, unlike ScrollTrigger.
var splitInstances = [];

// The header (logo, wordmark, nav) lives outside the Barba container and is
// never re-fetched or re-rendered on navigation, so nothing in its markup
// can be page-specific static HTML anymore — including which nav item is
// "active". This recomputes it on every page view from the entered
// container's data-barba-namespace, since namespace maps 1:1 onto which
// nav item should be highlighted (home/artist/release; 404 highlights none).
function updateActiveNav(container) {
  var namespaceEl = container && container.getAttribute ? container : document.querySelector('[data-barba-namespace]');
  var namespace = namespaceEl && namespaceEl.getAttribute('data-barba-namespace');
  var order = ['home', 'artist', 'release'];
  var activeIndex = order.indexOf(namespace);
  document.querySelectorAll('.nav-strip nav a').forEach(function (a, i) {
    a.classList.toggle('active', i === activeIndex);
  });
}

// Barba swaps the container via AJAX with no full page load, so screen
// readers get no "new page" signal on their own the way a real navigation
// gives one. This maintains a visually-hidden live region and updates it
// with the new page's title on every view, mirroring what a real page load
// would announce.
function announceRouteChange() {
  var region = document.getElementById('route-announcer');
  if (!region) {
    region = document.createElement('div');
    region.id = 'route-announcer';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.className = 'visually-hidden';
    document.body.appendChild(region);
  }
  region.textContent = document.title;
}

// All GSAP setup lives in init() so it can re-run after every Barba page view
// (Barba swaps DOM without a hard reload, so a one-time setup would be bound
// to nodes that no longer exist once the user navigates elsewhere and back).
// unload() reverts/kills the previous page's instances right before Barba
// removes the old container, so nothing leaks or doubles up.
//
// `container` scopes the hero-heading/section-title queries to the specific
// page container Barba just entered. This matters because Barba appends the
// incoming container to the wrapper before the outgoing one is removed, so
// the two briefly coexist in the DOM — an unscoped `document.querySelectorAll`
// can match the outgoing page's (soon-to-be-removed) elements instead of the
// incoming page's. Defaults to `document` for the non-Barba fallback path,
// where there's only ever one container in the document anyway.
function init(container) {
  container = container || document;
  updateActiveNav(container);
  announceRouteChange();
  if (!window.gsap) return;
  var reduced = reducedMotion();

  if (window.SplitText) gsap.registerPlugin(SplitText);

  // Wordmark: letter-by-letter on load, every page — the one constant piece
  // of text animation across the whole site. It lives in the persistent
  // header, outside any Barba container, so it's always found on `document`
  // regardless of which page container is currently active.
  var wordmark = document.querySelector('.wordmark');
  if (wordmark && window.SplitText && !reduced) {
    splitInstances.push(SplitText.create(wordmark, {
      type: 'chars',
      autoSplit: true,
      onSplit: function (self) {
        return gsap.from(self.chars, {
          opacity: 0,
          y: 16,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06
        });
      }
    }));
  }

  // Hero headline: word-by-word on load, homepage only — the one rehearsed
  // focal moment (see DESIGN.md), timed just after the wordmark settles.
  var heroHeading = container.querySelector('.hero-main h1');
  if (heroHeading && window.SplitText && !reduced) {
    splitInstances.push(SplitText.create(heroHeading, {
      type: 'words',
      autoSplit: true,
      onSplit: function (self) {
        return gsap.from(self.words, {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.2,
          delay: 0.45
        });
      }
    }));
  }

  if (!window.ScrollTrigger || reduced) return;
  gsap.registerPlugin(ScrollTrigger);

  // Section titles: a plain fade + slide as each scrolls into view — one
  // shot, not pinned or scrubbed. Everything else on the page (cards, the
  // release panel, the catalog counters) stays statically visible; only
  // the titles themselves animate.
  ScrollTrigger.matchMedia({
    '(prefers-reduced-motion: no-preference)': function () {
      container.querySelectorAll('#artists .section-title, #releases .section-title')
        .forEach(function (title) {
          gsap.from(title, {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          });
        });
    }
  });
}

function unload() {
  splitInstances.forEach(function (s) { s.revert(); });
  splitInstances = [];
  if (!window.ScrollTrigger) return;
  ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
  ScrollTrigger.clearMatchMedia();
}

// Barba's afterEnter hook (registered below) fires on the very first page
// load as well as every subsequent transition, so it's the only init() call
// site needed when Barba is present. The readyState/DOMContentLoaded path
// below is strictly a fallback for the (unexpected) case where Barba failed
// to load at all, so the page doesn't end up with zero animation wiring.
if (!window.barba || !window.gsap) {
  if (document.readyState === 'complete') {
    init(document);
  } else {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  }
}

if (window.barba && window.gsap) {
  var FADE_IN = { opacity: 0, duration: 0.5, ease: 'expo.out' };
  // Entering an artist or release detail page gets a distinct treatment
  // from the generic fade — a small directional slide, evoking "drilling
  // into" a catalog entry rather than just crossfading like every other
  // navigation. This is the specific thing that made blimp.gr's page
  // transitions feel considered rather than generic: different page types
  // get different motion, not one fade for everything.
  var SLIDE_IN = { opacity: 0, x: 32, duration: 0.55, ease: 'expo.out' };

  // Barba v2 deliberately doesn't remove the outgoing container itself
  // (see https://github.com/barbajs/barba/issues/387 — a "wontfix" design
  // decision, cleanup is left to the developer). Without this, the old and
  // new containers pile up as permanent siblings: stale ScrollTriggers,
  // doubled-up SplitText targets, and unscoped DOM queries picking up
  // dead elements instead of the live page.
  function leaveAndRemove(data) {
    if (reducedMotion()) {
      data.current.container.remove();
      return Promise.resolve();
    }
    return gsap.to(data.current.container, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: function () { data.current.container.remove(); }
    });
  }

  barba.init({
    transitions: [
      {
        name: 'to-detail',
        to: { namespace: ['artist', 'release'] },
        leave: leaveAndRemove,
        enter: function (data) {
          return reducedMotion() ? Promise.resolve() : gsap.from(data.next.container, SLIDE_IN);
        }
      },
      {
        name: 'default-fade',
        leave: leaveAndRemove,
        enter: function (data) {
          return reducedMotion() ? Promise.resolve() : gsap.from(data.next.container, FADE_IN);
        }
      }
    ]
  });

  // A destination with a hash (e.g. /index.html#artists — every nav link,
  // every "back to X" link, the hero's "View the roster" button) needs to
  // scroll to that section, not reset to the top. Plain pushState-driven
  // navigation doesn't trigger the browser's native anchor-jump the way a
  // real page load does, so it has to be done by hand — and only once the
  // incoming container is actually in the DOM (afterEnter), since the
  // target element lives inside it.
  barba.hooks.beforeLeave(function () { unload(); });
  barba.hooks.beforeEnter(function () {
    if (!window.location.hash) window.scrollTo(0, 0);
  });
  barba.hooks.afterEnter(function (data) {
    var hash = window.location.hash;
    if (hash) {
      var target = document.querySelector(hash);
      if (target) target.scrollIntoView();
    }
    init(data.next.container);
  });
}
