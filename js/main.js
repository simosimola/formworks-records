// Keeps the Finder window chrome and sidebar mounted and swaps only the content pane on
// navigation. Every page is also a complete standalone document, so the site works unchanged
// without this script (the back/forward buttons are hidden until it runs).
(function () {
  // Site pages are *.html at the root (and /landing_pages/); anything else (assets, other hosts) is left alone.
  function isPage(p) { return p === '/' || /\.html$/.test(p); }
  function norm(p) { return p === '/' ? '/index.html' : p; }
  var pane = document.getElementById('pane');
  var live = document.getElementById('route-announcer');
  var titleEl = document.querySelector('.titlebar .title');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!pane || !window.fetch || !window.DOMParser || !history.pushState) return;

  var seg = document.querySelector('.seg');
  if (seg) {
    seg.hidden = false;
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.getAttribute('data-act') === 'back') history.back(); else history.forward();
    });
  }

  function setActive(page) {
    document.body.setAttribute('data-page', page || '');
    document.querySelectorAll('.sidebar .item').forEach(function (a) {
      var on = a.getAttribute('data-nav') === page;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function scrollToHash(hash) {
    var target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView(); else pane.scrollTop = 0;
  }

  function load(url, push) {
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var next = doc.getElementById('pane');
        if (!next) { window.location.href = url; return; }
        pane.innerHTML = next.innerHTML;
        document.title = doc.title;
        if (titleEl) titleEl.textContent = doc.title;
        setActive(doc.body.getAttribute('data-page'));
        if (push) history.pushState(null, '', url);
        if (live) live.textContent = doc.title;
        pane.scrollTop = 0;
        var hash = new URL(url, location.href).hash;
        if (hash) scrollToHash(hash);
        if (!reduced) {
          pane.classList.remove('swap');
          void pane.offsetWidth;
          pane.classList.add('swap');
        }
        pane.focus({ preventScroll: true });
      })
      .catch(function () { window.location.href = url; });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || !isPage(u.pathname)) return;
    e.preventDefault();
    if (norm(u.pathname) === norm(location.pathname) && u.search === location.search) {
      if (u.hash) { history.pushState(null, '', u.pathname + u.hash); scrollToHash(u.hash); }
      else { pane.scrollTop = 0; }
      return;
    }
    load(u.pathname + u.search + u.hash, true);
  });

  window.addEventListener('popstate', function () {
    load(location.pathname + location.search + location.hash, false);
  });
})();
