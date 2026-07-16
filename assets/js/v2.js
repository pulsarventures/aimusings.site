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

    /* ---- Register modal ---------------------------------------------- */
    var modal = document.getElementById('reg-modal');
    var openModal = function (e) { if (e) e.preventDefault(); if (modal) { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; } };
    var closeModal = function () { if (modal) { modal.classList.remove('is-open'); document.body.style.overflow = ''; } };
    document.querySelectorAll('[data-open-reg]').forEach(function (b) { on(b, 'click', openModal); });
    document.querySelectorAll('[data-close-reg]').forEach(function (b) { on(b, 'click', closeModal); });
    on(modal, 'click', function (e) { if (e.target === modal) closeModal(); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeAll(); nav && nav.classList.remove('is-menu-open'); } });

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
          // .quote__n = [text node][<span>]; update only the leading text node (no innerHTML).
          var nameEl = cards[i].querySelector('.quote__n');
          nameEl.firstChild.nodeValue = q.name + ' ';
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
  });
})();
