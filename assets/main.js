/* MANTL revamp — tiny progressive-enhancement JS (no dependencies) */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up for [data-count]
  var nums = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && nums.length) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute('data-count')),
            suffix = el.getAttribute('data-suffix') || '', dec = (target % 1 !== 0) ? 1 : 0,
            start = null, dur = 1100;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * ease).toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toFixed(dec) + suffix;
        }
        requestAnimationFrame(step);
        io2.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io2.observe(el); });
  }

  // Demo form handler (no backend) — replace action with real endpoint on launch
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = f.querySelector('.form-msg');
      if (msg) {
        msg.hidden = false;
        f.querySelectorAll('input,select,textarea,button').forEach(function (i) { i.disabled = true; });
      }
    });
  });
})();
