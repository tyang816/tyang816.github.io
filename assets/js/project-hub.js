/* Category + year + search + pagination for /projects/ and /zh/projects/ */
(function () {
  'use strict';

  var PAGE_SIZE = 6;

  var I18N = {
    en: {
      prev: 'Prev',
      next: 'Next',
      page: 'Page',
      of: 'of',
      showing: 'Showing',
      results: 'projects'
    },
    zh: {
      prev: '上一页',
      next: '下一页',
      page: '第',
      of: '/',
      showing: '共',
      results: '个'
    }
  };

  function t(locale, key) {
    return (I18N[locale] || I18N.en)[key];
  }

  function init(root) {
    if (!root || root.getAttribute('data-hub-ready')) return;
    root.setAttribute('data-hub-ready', '1');

    var locale = root.getAttribute('data-locale') === 'zh' ? 'zh' : 'en';
    var catNav = root.querySelector('[data-cat-nav]');
    var catLinks = root.querySelectorAll('[data-cat-link]');
    var yearNav = root.querySelector('[data-year-nav]');
    var yearBtns = yearNav ? yearNav.querySelectorAll('[data-year-link]') : [];
    var grid = root.querySelector('[data-projects-grid]');
    var cards = grid ? [].slice.call(grid.querySelectorAll('.hub-entry[data-cat], .project-card-link[data-cat]')) : [];
    var searchInput = root.querySelector('[data-projects-search]');
    var pagerRow = root.querySelector('[data-projects-pager-row]');
    var pagerEl = root.querySelector('[data-projects-pagination]');
    var statsEl = root.querySelector('[data-projects-stats]');
    var blurbTitle = root.querySelector('[data-cat-blurb-title]');
    var blurbText = root.querySelector('[data-cat-blurb-text]');
    var anchorEl = catNav || root.querySelector('.hub-title-row') || root;
    if (!catLinks.length || !cards.length) return;

    var activeCat = 'all';
    var activeYear = 'all';
    var query = '';
    var page = 1;
    var bootstrapped = false;

    function matchCard(card) {
      var catOk = activeCat === 'all' || card.getAttribute('data-cat') === activeCat;
      var yearOk = activeYear === 'all' || card.getAttribute('data-year') === activeYear;
      var hay = (card.getAttribute('data-search') || card.textContent || '').toLowerCase();
      var searchOk = !query || hay.indexOf(query) !== -1;
      return catOk && yearOk && searchOk;
    }

    function activeCatBtn() {
      return root.querySelector('[data-cat-link="' + activeCat + '"]');
    }

    function updateBlurb() {
      var btn = activeCatBtn();
      if (!btn) return;
      if (blurbTitle) blurbTitle.textContent = btn.getAttribute('data-blurb-title') || '';
      if (blurbText) blurbText.textContent = btn.getAttribute('data-blurb') || '';
    }

    function setFilterValue(name, text, isSet) {
      var box = root.querySelector('[data-hub-filter="' + name + '"]');
      if (!box) return;
      var val = box.querySelector('[data-filter-summary]');
      if (val) val.textContent = text || '';
      box.classList.toggle('is-set', !!isSet);
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
        catLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('data-cat-link') === activeCat);
        });
        yearBtns.forEach(function (b) {
          b.classList.toggle('is-active', (b.getAttribute('data-year-link') || 'all') === activeYear);
        });
        updateBlurb();
        var catBtn = activeCatBtn();
        var yearBtn = root.querySelector('[data-year-link].is-active');
        setFilterValue('cat', catBtn ? catBtn.textContent : '', activeCat !== 'all');
        setFilterValue('year', yearBtn ? yearBtn.textContent : '', activeYear !== 'all');

        var matched = cards.filter(matchCard);
        var total = matched.length;
        var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
        if (page > totalPages) page = totalPages;
        if (page < 1) page = 1;

        var start = (page - 1) * PAGE_SIZE;
        var visible = {};
        matched.slice(start, start + PAGE_SIZE).forEach(function (card) {
          visible[card.getAttribute('href') + '|' + card.getAttribute('data-cat')] = true;
        });

        cards.forEach(function (card) {
          var key = card.getAttribute('href') + '|' + card.getAttribute('data-cat');
          var on = !!visible[key];
          card.classList.toggle('is-filtered-out', !on);
          card.hidden = !on;
          if (bootstrapped) card.classList.add('is-static');
        });

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

    if (catNav) {
      catNav.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-cat-link]');
        if (!btn || !catNav.contains(btn)) return;
        activeCat = btn.getAttribute('data-cat-link') || 'all';
        applyFilters(true);
        history.replaceState(null, '', btn.getAttribute('data-hash') || '#cat-all');
      });
    }

    if (yearNav) {
      yearNav.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-year-link]');
        if (!btn || !yearNav.contains(btn)) return;
        activeYear = btn.getAttribute('data-year-link') || 'all';
        applyFilters(true);
        var hash = activeYear !== 'all'
          ? '#year-' + activeYear
          : (activeCat === 'all' ? '#cat-all' : '#cat-' + activeCat);
        history.replaceState(null, '', hash);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        query = searchInput.value.trim().toLowerCase();
        applyFilters(true);
      });
    }

    var raw = location.hash || '#cat-all';
    if (raw.indexOf('#year-') === 0) {
      activeYear = raw.slice('#year-'.length) || 'all';
      activeCat = 'all';
    } else {
      activeCat = raw.replace('#cat-', '') || 'all';
    }
    applyFilters(true);
    bootstrapped = true;
  }

  function boot() {
    document.querySelectorAll('.project-hub').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
