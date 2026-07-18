/* AI Musings v2 — interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var on = function (el, ev, fn) { if (el) el.addEventListener(ev, fn); };

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.nav');

    /* ---- Nav dropdowns: hover (200ms close delay) + click ------------- */
    document.querySelectorAll('.nav__dd').forEach(function (dd) {
      var trigger = dd.querySelector('.nav__item');
      var timer;
      var open = function () { clearTimeout(timer); closeAll(dd); dd.classList.add('open'); };
      var close = function () { timer = setTimeout(function () { dd.classList.remove('open'); }, 200); };
      on(dd, 'mouseenter', open);
      on(dd, 'mouseleave', close);
      on(trigger, 'click', function (e) {
        e.stopPropagation();
        clearTimeout(timer);
        var wasOpen = dd.classList.contains('open');
        closeAll();
        dd.classList.toggle('open', !wasOpen);
      });
    });
    function closeAll(except) {
      document.querySelectorAll('.nav__dd.open').forEach(function (d) { if (d !== except) d.classList.remove('open'); });
    }
    on(document, 'click', function () { closeAll(); });

    /* ---- Mobile burger ------------------------------------------------ */
    var burger = document.querySelector('.nav__burger');
    on(burger, 'click', function (e) { e.stopPropagation(); nav.classList.toggle('is-menu-open'); });

    /* ---- Mobile nav accordions (Programs / Connect) ------------------- */
    document.querySelectorAll('.nav__mobile .m-grp').forEach(function (grp) {
      var head = grp.querySelector('.m-grp__h');
      on(head, 'click', function (e) {
        e.stopPropagation();
        var nowOpen = grp.classList.toggle('is-open');
        head.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      });
    });

    /* ---- Register modal ---------------------------------------------- */
    var modal = document.getElementById('reg-modal');
    var openModal = function (e) { if (e) e.preventDefault(); if (modal) { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; } };
    var closeModal = function () { if (modal) { modal.classList.remove('is-open'); document.body.style.overflow = ''; } };
    document.querySelectorAll('[data-open-reg]').forEach(function (b) { on(b, 'click', openModal); });
    document.querySelectorAll('[data-close-reg]').forEach(function (b) { on(b, 'click', closeModal); });
    on(modal, 'click', function (e) { if (e.target === modal) closeModal(); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeAll(); nav && nav.classList.remove('is-menu-open'); } });

    /* ---- Testimonials video: click-to-load facade -------------------- */
    /* The poster is served locally; the YouTube iframe is injected only on
       click. This keeps all third-party YouTube requests off the initial
       page load (faster for users; and headless crawlers no longer hang
       waiting on YouTube's player, which never reaches network-idle). */
    document.querySelectorAll('.rev-play').forEach(function (btn) {
      on(btn, 'click', function () {
        var f = document.createElement('iframe');
        f.src = btn.getAttribute('data-embed') + '?autoplay=1';
        f.title = 'AI Workshop Testimonials';
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        f.allowFullscreen = true;
        btn.replaceWith(f);
      });
    });

    /* ---- Testimonials rotation (3 visible, 6s, 220ms fade) ------------ */
    var quotesEl = document.getElementById('quotes');
    var dataEl = document.getElementById('testimonials-data');
    if (quotesEl && dataEl) {
      var all = JSON.parse(dataEl.textContent);
      var cards = quotesEl.querySelectorAll('.quote');
      var idx = 0, fading = false;
      var paint = function () {
        for (var i = 0; i < cards.length; i++) {
          var q = all[(idx + i) % all.length];
          cards[i].querySelector('.quote__t').textContent = '“' + q.text + '”';
          var nameEl = cards[i].querySelector('.quote__n');
          nameEl.textContent = q.name;
        }
      };
      var rotate = function (dir) {
        if (fading) return;
        fading = true; quotesEl.classList.add('is-fading');
        setTimeout(function () {
          idx = (idx + dir + all.length) % all.length;
          paint(); quotesEl.classList.remove('is-fading'); fading = false;
        }, 220);
      };
      on(document.querySelector('[data-quote-prev]'), 'click', function () { rotate(-1); });
      on(document.querySelector('[data-quote-next]'), 'click', function () { rotate(1); });
      setInterval(function () {
        if (!modal || !modal.classList.contains('is-open')) rotate(1);
      }, 6000);
    }

    /* ---- FAQ accordion (one open at a time) --------------------------- */
    document.querySelectorAll('.faq__q').forEach(function (q) {
      on(q, 'click', function () {
        var item = q.closest('.faq');
        var isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq.is-open').forEach(function (f) { f.classList.remove('is-open'); });
        if (!isOpen) item.classList.add('is-open');
      });
    });

    /* ---- Catalog filter pills ---------------------------------------- */
    var pills = document.querySelectorAll('.filter');
    if (pills.length) {
      pills.forEach(function (p) {
        on(p, 'click', function () {
          pills.forEach(function (x) { x.classList.remove('is-active'); });
          p.classList.add('is-active');
          var f = p.getAttribute('data-filter');
          document.querySelectorAll('[data-lvl]').forEach(function (row) {
            row.style.display = (f === 'all' || row.getAttribute('data-lvl') === f) ? '' : 'none';
          });
        });
      });
    }

    /* ---- Role picker: auto-advance until the first click -------------- */
    var rolesEl = document.getElementById('roles-data');
    if (rolesEl) {
      var roles = JSON.parse(rolesEl.textContent);
      var rBtns = Array.prototype.slice.call(document.querySelectorAll('.role-btn'));
      var f = function (sel) { return document.querySelector(sel); };
      var rIdx = 0, rPaused = false;
      var paintRole = function () {
        var r = roles[rIdx];
        if (!r) return;
        f('[data-role-name]').textContent = r.role;
        f('[data-role-pain]').textContent = '“' + r.pain + '”';
        f('[data-role-leave]').textContent = '→ ' + r.leave;
        f('[data-role-build]').textContent = r.build;
        f('[data-role-start]').textContent = r.start;
        rBtns.forEach(function (b, i) { b.classList.toggle('is-on', i === rIdx); });
      };
      rBtns.forEach(function (b, i) {
        on(b, 'click', function () { rIdx = i; rPaused = true; paintRole(); });
      });
      setInterval(function () {
        if (rPaused) return;
        if (modal && modal.classList.contains('is-open')) return;
        rIdx = (rIdx + 1) % roles.length;
        paintRole();
      }, 3800);
    }

    /* ---- Schedule: refresh from data/cohorts.json --------------------- */
    /* The server-rendered markup is the embedded fallback; this refreshes it
       on load so updating the JSON updates the site without a rebuild. */
    var MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    var el = function (tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text != null) n.textContent = text;
      return n;
    };
    var calChip = function (c, first) {
      var d = new Date(c.date + 'T12:00:00');
      var cal = el('span', 'cal' + (first ? ' cal--dark' : ''));
      cal.appendChild(el('span', 'cal__m', MONTHS[d.getMonth()]));
      cal.appendChild(el('span', 'cal__d', String(d.getDate())));
      return cal;
    };
    var cohortBody = function (c) {
      var b = el('span', 'cohort__b');
      b.appendChild(el('span', 'cohort__n', c.name));
      b.appendChild(el('span', 'cohort__meta', c.dates + ' · ' + c.duration + ' · ' + c.format));
      return b;
    };
    var row = function (c, first, kind) {
      var a = el('a', kind === 'modal' ? 'modal__row' : 'cohort' + (first ? ' is-dark' : ''));
      a.href = c.link; a.target = '_blank'; a.rel = 'noopener';
      a.appendChild(calChip(c, first));
      a.appendChild(cohortBody(c));
      a.appendChild(el('span', kind === 'modal' ? 'modal__tix' : 'cohort__cta', kind === 'modal' ? 'Tixtree ↗' : 'Register →'));
      return a;
    };
    var fill = function (node, open, kind) {
      if (!node) return;
      node.textContent = '';
      open.forEach(function (c, i) { node.appendChild(row(c, i === 0, kind)); });
    };
    fetch('/data/cohorts.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
      if (!Array.isArray(d)) return;
      var today = new Date().toISOString().slice(0, 10);
      var open = d.filter(function (c) {
        return c.status === 'scheduled' && c.link && c.date && c.date >= today;
      }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });

      document.querySelectorAll('[data-cohort-list]').forEach(function (n) { fill(n, open, 'list'); });
      fill(document.querySelector('[data-cohort-modal]'), open, 'modal');

      var blurb = document.querySelector('[data-reg-blurb]');
      if (blurb) {
        blurb.textContent = !open.length ? 'New cohorts are announced monthly — check back soon.'
          : open.length === 1 ? 'One cohort is open for registration on Tixtree.'
          : open.length + ' cohorts are open for registration on Tixtree.';
      }

      document.querySelectorAll('[data-cat-cta]').forEach(function (cta) {
        var lvl = parseInt(cta.getAttribute('data-cat-cta'), 10);
        var nc = open.filter(function (c) { return c.level === lvl; })[0];
        cta.textContent = '';
        cta.appendChild(el('div', 'cat__next', nc ? 'Next: ' + nc.dates : 'Cohorts on request'));
        if (nc) {
          var a = el('a', 'cat__reg', 'Register →');
          a.href = nc.link; a.target = '_blank'; a.rel = 'noopener';
          cta.appendChild(a);
        } else {
          var q = el('a', 'cat__req', 'Request a cohort');
          q.href = '/corporate/';
          cta.appendChild(q);
        }
      });
    }).catch(function () { /* keep the server-rendered fallback */ });
  });
})();
