/* Filter / search / pagination for TCM catalog hubs. */
(function () {
  'use strict';

  var PAGE_SIZE = 12;

  var I18N = {
    en: {
      prev: 'Prev',
      next: 'Next',
      page: 'Page',
      of: 'of',
      showing: 'Showing',
      results: 'resources'
    },
    zh: {
      prev: '上一页',
      next: '下一页',
      page: '第',
      of: '/',
      showing: '共',
      results: '条'
    }
  };

  function t(locale, key) {
    return (I18N[locale] || I18N.en)[key];
  }

  function init(root) {
    if (!root || root.getAttribute('data-hub-ready')) return;
    root.setAttribute('data-hub-ready', '1');

    var locale = root.getAttribute('data-locale') === 'zh' ? 'zh' : 'en';
    var typeNav = root.querySelector('[data-tcm-type-nav]');
    var typeBtns = root.querySelectorAll('[data-tcm-type]');
    var yearNav = root.querySelector('[data-tcm-year-nav]');
    var yearBtns = yearNav ? yearNav.querySelectorAll('[data-tcm-year]') : [];
    var grid = root.querySelector('[data-tcm-grid]');
    var cards = grid ? [].slice.call(grid.querySelectorAll('[data-tcm-card]')) : [];
    var searchInput = root.querySelector('[data-tcm-search]');
    var hideBtn = root.querySelector('[data-tcm-hide-general]');
    var pagerRow = root.querySelector('[data-tcm-pager-row]');
    var pagerEl = root.querySelector('[data-tcm-pagination]');
    var statsEl = root.querySelector('[data-tcm-stats]');
    var emptyEl = root.querySelector('[data-tcm-empty]');
    var blurbTitle = root.querySelector('[data-tcm-blurb-title]');
    var blurbText = root.querySelector('[data-tcm-blurb-text]');
    var anchorEl = typeNav || root.querySelector('.hub-title-row') || root;
    if (!cards.length) return;

    var activeType = 'all';
    var activeYear = 'all';
    var query = '';
    var hideGeneral = true;
    var page = 1;
    var bootstrapped = false;

    function matchCard(card) {
      var typeOk = activeType === 'all' || card.getAttribute('data-type') === activeType;
      var yearOk = activeYear === 'all' || card.getAttribute('data-year') === activeYear;
      var generalOk = !hideGeneral || card.getAttribute('data-general') !== '1';
      var hay = (card.getAttribute('data-search') || card.textContent || '').toLowerCase();
      var searchOk = !query || hay.indexOf(query) !== -1;
      return typeOk && yearOk && generalOk && searchOk;
    }

    function activeTypeBtn() {
      return root.querySelector('[data-tcm-type="' + activeType + '"]');
    }

    function updateBlurb() {
      var btn = activeTypeBtn();
      if (!btn) return;
      if (blurbTitle) blurbTitle.textContent = btn.getAttribute('data-blurb-title') || '';
      if (blurbText) blurbText.textContent = btn.getAttribute('data-blurb') || '';
    }

    function preserveAnchor(fn) {
      var before = anchorEl.getBoundingClientRect().top;
      fn();
      var after = anchorEl.getBoundingClientRect().top;
      var delta = after - before;
      if (delta) window.scrollBy(0, delta);
    }

    function applyFilters(resetPage) {
      if (resetPage !== false) page = 1;

      var run = function () {
        typeBtns.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('data-tcm-type') === activeType);
        });
        yearBtns.forEach(function (b) {
          b.classList.toggle('is-active', (b.getAttribute('data-tcm-year') || 'all') === activeYear);
        });
        if (hideBtn) {
          hideBtn.classList.toggle('is-active', hideGeneral);
          hideBtn.setAttribute('aria-pressed', hideGeneral ? 'true' : 'false');
        }
        updateBlurb();

        var matched = cards.filter(matchCard);
        var total = matched.length;
        var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
        if (page > totalPages) page = totalPages;
        if (page < 1) page = 1;

        var start = (page - 1) * PAGE_SIZE;
        var visible = {};
        matched.slice(start, start + PAGE_SIZE).forEach(function (card) {
          visible[card.getAttribute('href')] = true;
        });

        cards.forEach(function (card) {
          var on = !!visible[card.getAttribute('href')];
          card.classList.toggle('is-filtered-out', !on);
          card.hidden = !on;
          if (bootstrapped) card.classList.add('is-static');
        });

        if (emptyEl) emptyEl.hidden = total > 0;
        renderStats(total, totalPages);
        renderPager(total, totalPages);
      };

      if (bootstrapped) preserveAnchor(run);
      else run();
    }

    function renderStats(total, totalPages) {
      if (!statsEl) return;
      if (!total) {
        statsEl.textContent = '';
        return;
      }
      if (locale === 'zh') {
        statsEl.textContent = t(locale, 'showing') + total + t(locale, 'results') +
          ' · ' + t(locale, 'page') + page + t(locale, 'of') + totalPages;
      } else {
        statsEl.textContent = t(locale, 'showing') + ' ' + total + ' ' + t(locale, 'results') +
          ' · ' + t(locale, 'page') + ' ' + page + ' ' + t(locale, 'of') + ' ' + totalPages;
      }
    }

    function renderPager(total, totalPages) {
      if (pagerRow) pagerRow.hidden = !total;
      if (!pagerEl) return;
      if (totalPages <= 1) {
        pagerEl.innerHTML = '';
        pagerEl.hidden = true;
        return;
      }
      pagerEl.hidden = false;
      var html = '';
      html += '<button type="button" class="notes-page-btn" data-page="prev"' + (page <= 1 ? ' disabled' : '') + '>' + t(locale, 'prev') + '</button>';
      var start = Math.max(1, page - 2);
      var end = Math.min(totalPages, page + 2);
      if (start > 1) {
        html += '<button type="button" class="notes-page-btn" data-page="1">1</button>';
        if (start > 2) html += '<span class="notes-page-ellipsis">…</span>';
      }
      for (var i = start; i <= end; i++) {
        html += '<button type="button" class="notes-page-btn' + (i === page ? ' is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
      }
      if (end < totalPages) {
        if (end < totalPages - 1) html += '<span class="notes-page-ellipsis">…</span>';
        html += '<button type="button" class="notes-page-btn" data-page="' + totalPages + '">' + totalPages + '</button>';
      }
      html += '<button type="button" class="notes-page-btn" data-page="next"' + (page >= totalPages ? ' disabled' : '') + '>' + t(locale, 'next') + '</button>';
      pagerEl.innerHTML = html;
      pagerEl.querySelectorAll('[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.disabled) return;
          var v = btn.getAttribute('data-page');
          if (v === 'prev') page = Math.max(1, page - 1);
          else if (v === 'next') page = page + 1;
          else page = parseInt(v, 10) || 1;
          applyFilters(false);
        });
      });
    }

    if (typeNav) {
      typeNav.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-tcm-type]');
        if (!btn || !typeNav.contains(btn)) return;
        activeType = btn.getAttribute('data-tcm-type') || 'all';
        applyFilters(true);
        history.replaceState(null, '', btn.getAttribute('data-hash') || '#type-all');
      });
    }

    if (yearNav) {
      yearNav.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-tcm-year]');
        if (!btn || !yearNav.contains(btn)) return;
        activeYear = btn.getAttribute('data-tcm-year') || 'all';
        applyFilters(true);
        var hash = activeYear !== 'all'
          ? '#year-' + activeYear
          : (activeType === 'all' ? '#type-all' : '#type-' + activeType);
        history.replaceState(null, '', hash);
      });
    }

    if (hideBtn) {
      hideBtn.addEventListener('click', function () {
        hideGeneral = !hideGeneral;
        applyFilters(true);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        query = searchInput.value.trim().toLowerCase();
        applyFilters(true);
      });
    }

    var raw = location.hash || '#type-all';
    if (raw.indexOf('#year-') === 0) {
      activeYear = raw.slice('#year-'.length) || 'all';
      activeType = 'all';
    } else if (raw.indexOf('#type-') === 0) {
      activeType = raw.slice('#type-'.length) || 'all';
    }
    applyFilters(true);
    bootstrapped = true;
  }

  function boot() {
    document.querySelectorAll('[data-tcm-hub]').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
