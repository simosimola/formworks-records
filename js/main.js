// Formworks — scroll reveal
// IntersectionObserver only. No window scroll listeners (perf + jank ban).
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = (Number(el.dataset.revealIndex) || 0) * 0.06;
      el.style.transitionDelay = delay + 's';
      el.classList.add('is-visible');
      io.unobserve(el);
    });
  }, { threshold: 0.15 });

  els.forEach(function (el, i) {
    el.dataset.revealIndex = i % 6;
    io.observe(el);
  });
})();
