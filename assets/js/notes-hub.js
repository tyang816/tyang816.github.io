/* Notes hub — category chips + filters + year jump + pagination + cards. */
(function (global) {
  'use strict';

  var PAGE_SIZE = 20;

  var I18N = {
    en: {
      searchPlaceholder: 'Search notes…',
      empty: 'No matching notes.',
      fail: 'Failed to load notes index.',
      unknownYear: 'Unknown',
      allYears: 'All years',
      allProceedings: 'All',
      page: 'Page',
      of: 'of',
      prev: 'Prev',
      next: 'Next',
      showing: 'Showing',
      results: 'notes',
      loading: 'Loading notes…'
    },
    zh: {
      searchPlaceholder: '搜索笔记…',
      empty: '没有匹配的笔记。',
      fail: '无法加载笔记索引。',
      unknownYear: '未知',
      allYears: '全部年份',
      allProceedings: '全部',
      page: '第',
      of: '/',
      prev: '上一页',
      next: '下一页',
      showing: '共',
      results: '篇',
      loading: '正在加载笔记…'
    }
  };

  function t(locale, key) {
    return (I18N[locale] || I18N.en)[key];
  }

  function byDateDesc(a, b) {
    return (b.date || '').localeCompare(a.date || '');
  }

  function yearOf(p, locale) {
    return (p.date || '').slice(0, 4) || t(locale, 'unknownYear');
  }

  function formatDate(iso) {
    if (!iso) return '';
    return iso.slice(0, 10);
  }

  function catLabel(cat, locale, catMeta) {
    if (catMeta && catMeta[cat]) {
      return locale === 'zh' ? (catMeta[cat].name_zh || catMeta[cat].name || cat) : (catMeta[cat].name || cat);
    }
    return cat;
  }

  function subjectCategories(cats) {
    return (cats || []).filter(function (c) { return c !== 'zh' && c !== 'en'; });
  }

  function cardHtml(p, locale, catMeta) {
    var cats = subjectCategories(p.categories);
    var primary = cats[0] || '';
    var label = catLabel(primary, locale, catMeta);
    var venue = [p.proceedings, label].filter(Boolean).join(' · ');
    var tags = (p.tags || []).slice(0, 4).join(', ');
    var meta = [formatDate(p.date), tags].filter(Boolean).join(' · ');
    return (
      '<a class="project-card-link" href="' + p.url + '" data-cat="' + primary + '">' +
        (venue ? '<div class="venue">' + venue + '</div>' : '') +
        '<h2>' + (p.title || 'Untitled') + '</h2>' +
        (meta ? '<p>' + meta + '</p>' : '') +
      '</a>'
    );
  }

  function parseCatMeta() {
    var el = document.getElementById('notes-cat-meta');
    if (!el) return {};
    try { return JSON.parse(el.textContent); } catch (e) { return {}; }
  }

  async function boot(locale) {
    locale = locale === 'zh' ? 'zh' : 'en';
    var catMeta = parseCatMeta();
    var searchInput = document.getElementById('notes-search');
    var procLinks = document.getElementById('notes-proc-links');
    var yearLinks = document.getElementById('notes-year-links');
    var statsEl = document.getElementById('notes-stats');
    var resultsEl = document.getElementById('notes-results');
    var pagerRow = document.getElementById('notes-pager-row');
    var pagerEl = document.getElementById('notes-pagination');
    var links = document.querySelectorAll('[data-notes-cat-link]');
    var hubEl = document.getElementById('notes-hub');
    var indexUrl = (hubEl && hubEl.getAttribute('data-index')) || '/notes-index.json';
    var searchUrl = (hubEl && hubEl.getAttribute('data-search-index')) || '/search.json';

    if (searchInput) searchInput.placeholder = t(locale, 'searchPlaceholder');
    if (resultsEl) resultsEl.innerHTML = '<p class="notes-hub-empty">' + t(locale, 'loading') + '</p>';

    var wantLang = locale === 'zh' ? 'zh' : 'en';
    function langFilter(list) {
      return (list || []).filter(function (p) {
        var lang = p.lang || 'en';
        if (lang === 'zh-CN') lang = 'zh';
        return lang === wantLang;
      });
    }

    function buildFuse(list, withContent) {
      if (typeof Fuse === 'undefined') return null;
      var keys = ['title', 'excerpt', 'tags', 'categories', 'proceedings'];
      if (withContent) keys.push('content');
      return new Fuse(list, { keys: keys, threshold: 0.35 });
    }

    var data;
    try {
      var res = await fetch(indexUrl);
      data = langFilter(await res.json());
    } catch (err) {
      if (resultsEl) resultsEl.innerHTML = '<p>' + t(locale, 'fail') + '</p>';
      return;
    }

    // First paint uses the light metadata index; the full-text index
    // (with post content) is fetched lazily when the user searches.
    var fuse = buildFuse(data, false);
    var fullReady = false;
    var fullPromise = null;
    function ensureFullIndex() {
      if (fullReady) return Promise.resolve();
      if (!fullPromise) {
        fullPromise = fetch(searchUrl)
          .then(function (res) { return res.json(); })
          .then(function (full) {
            fuse = buildFuse(langFilter(full), true);
            fullReady = true;
          })
          .catch(function () { fullPromise = null; });
      }
      return fullPromise;
    }

    var activeCat = 'all';
    var activeProc = '';
    var activeYear = '';
    var page = 1;

    function renderProcJump(values) {
      if (!procLinks) return;
      if (activeProc && values.indexOf(activeProc) === -1) activeProc = '';
      procLinks.innerHTML = '';
      function addBtn(value, label) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-proc', value);
        btn.textContent = label;
        if (activeProc === value) btn.classList.add('is-active');
        btn.addEventListener('click', function () {
          activeProc = btn.getAttribute('data-proc') || '';
          page = 1;
          update();
        });
        procLinks.appendChild(btn);
      }
      addBtn('', t(locale, 'allProceedings'));
      values.forEach(function (v) { addBtn(v, v); });
    }

    function filteredList() {
      var q = searchInput ? searchInput.value.trim() : '';
      var base = q && fuse ? fuse.search(q).map(function (r) { return r.item; }) : data.slice();

      return base.filter(function (p) {
        var cats = subjectCategories(p.categories);
        if (activeCat && activeCat !== 'all' && cats.indexOf(activeCat) === -1) return false;
        if (activeProc && (p.proceedings || '') !== activeProc) return false;
        if (activeYear && yearOf(p, locale) !== activeYear) return false;
        return true;
      }).sort(byDateDesc);
    }

    function yearsFrom(list) {
      var set = new Set();
      list.forEach(function (p) { set.add(yearOf(p, locale)); });
      return Array.from(set).sort(function (a, b) { return b.localeCompare(a); });
    }

    function renderYearJump(years) {
      if (!yearLinks) return;
      var html = '<button type="button"' + (!activeYear ? ' class="is-active"' : '') + ' data-year="">' +
        t(locale, 'allYears') + '</button>';
      html += years.map(function (y) {
        return '<button type="button"' + (activeYear === y ? ' class="is-active"' : '') + ' data-year="' + y + '">' + y + '</button>';
      }).join('');
      yearLinks.innerHTML = html;
      yearLinks.querySelectorAll('[data-year]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeYear = btn.getAttribute('data-year') || '';
          page = 1;
          update();
          var block = document.getElementById('notes-year-' + activeYear);
          if (block) block.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else window.scrollTo({ top: resultsEl.offsetTop - 80, behavior: 'smooth' });
        });
      });
    }

    function renderPager(total, totalPages) {
      if (pagerRow) pagerRow.hidden = !total;
      if (!pagerEl) return;
      if (totalPages <= 1) {
        pagerEl.hidden = true;
        pagerEl.innerHTML = '';
        return;
      }
      pagerEl.hidden = false;
      var buttons = '';
      buttons += '<button type="button" class="notes-page-btn" data-page="prev"' + (page <= 1 ? ' disabled' : '') + '>' + t(locale, 'prev') + '</button>';
      var start = Math.max(1, page - 2);
      var end = Math.min(totalPages, page + 2);
      if (start > 1) {
        buttons += '<button type="button" class="notes-page-btn" data-page="1">1</button>';
        if (start > 2) buttons += '<span class="notes-page-ellipsis">…</span>';
      }
      for (var i = start; i <= end; i++) {
        buttons += '<button type="button" class="notes-page-btn' + (i === page ? ' is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
      }
      if (end < totalPages) {
        if (end < totalPages - 1) buttons += '<span class="notes-page-ellipsis">…</span>';
        buttons += '<button type="button" class="notes-page-btn" data-page="' + totalPages + '">' + totalPages + '</button>';
      }
      buttons += '<button type="button" class="notes-page-btn" data-page="next"' + (page >= totalPages ? ' disabled' : '') + '>' + t(locale, 'next') + '</button>';
      pagerEl.innerHTML = buttons;
      pagerEl.querySelectorAll('[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.disabled) return;
          var v = btn.getAttribute('data-page');
          if (v === 'prev') page = Math.max(1, page - 1);
          else if (v === 'next') page = Math.min(totalPages, page + 1);
          else page = parseInt(v, 10) || 1;
          update(false);
          window.scrollTo({ top: resultsEl.offsetTop - 80, behavior: 'smooth' });
        });
      });
    }

    function render(items) {
      if (!resultsEl) return;
      if (!items.length) {
        resultsEl.innerHTML = '<p class="notes-hub-empty">' + t(locale, 'empty') + '</p>';
        if (pagerRow) pagerRow.hidden = true;
        if (pagerEl) { pagerEl.hidden = true; pagerEl.innerHTML = ''; }
        if (statsEl) statsEl.textContent = '';
        return;
      }

      var totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
      if (page > totalPages) page = totalPages;
      var start = (page - 1) * PAGE_SIZE;
      var pageItems = items.slice(start, start + PAGE_SIZE);

      var groups = {};
      pageItems.forEach(function (p) {
        var y = yearOf(p, locale);
        if (!groups[y]) groups[y] = [];
        groups[y].push(p);
      });
      var years = Object.keys(groups).sort(function (a, b) { return b.localeCompare(a); });

      resultsEl.innerHTML = years.map(function (y) {
        var cards = groups[y].map(function (p) { return cardHtml(p, locale, catMeta); }).join('');
        return (
          '<div class="notes-year-block" id="notes-year-' + y + '">' +
            '<h3 class="notes-year-heading">' + y + '</h3>' +
            '<div class="project-grid">' + cards + '</div>' +
          '</div>'
        );
      }).join('');

      if (statsEl) {
        if (locale === 'zh') {
          statsEl.textContent = t(locale, 'showing') + items.length + t(locale, 'results') +
            ' · ' + t(locale, 'page') + page + t(locale, 'of') + totalPages;
        } else {
          statsEl.textContent = t(locale, 'showing') + ' ' + items.length + ' ' + t(locale, 'results') +
            ' · ' + t(locale, 'page') + ' ' + page + ' ' + t(locale, 'of') + ' ' + totalPages;
        }
      }
      renderPager(items.length, totalPages);
    }

    function update(resetPage) {
      if (resetPage !== false) page = 1;
      // Proceedings options: ignore activeProc so chips stay complete
      var savedProc = activeProc;
      activeProc = '';
      var procsBase = filteredList();
      activeProc = savedProc;
      var procSet = new Set();
      procsBase.forEach(function (p) { if (p.proceedings) procSet.add(p.proceedings); });
      renderProcJump(Array.from(procSet).sort());

      // Year jump options should reflect filters except the year filter itself
      var withoutYear = filteredListWithoutYear();
      renderYearJump(yearsFrom(withoutYear));
      var items = filteredList();
      render(items);
    }

    function filteredListWithoutYear() {
      var saved = activeYear;
      activeYear = '';
      var list = filteredList();
      activeYear = saved;
      return list;
    }

    function show(cat) {
      activeCat = cat || 'all';
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-notes-cat-link') === activeCat);
      });
      update();
    }

    // Buttons instead of <a href="#…"> so theme smoothScroll won't scroll the page.
    links.forEach(function (btn) {
      btn.addEventListener('click', function () {
        show(btn.getAttribute('data-notes-cat-link'));
        history.replaceState(null, '', btn.getAttribute('data-hash') || '#cat-all');
      });
    });

    if (searchInput) {
      // Warm up the full-text index as soon as the user heads for the box.
      searchInput.addEventListener('focus', ensureFullIndex);
      searchInput.addEventListener('input', function () {
        update();
        if (!fullReady) ensureFullIndex().then(update);
      });
    }

    var rawHash = location.hash || '#cat-all';
    if (rawHash.indexOf('#year-') === 0) {
      activeYear = rawHash.slice('#year-'.length);
      show('all');
    } else {
      var cat = rawHash.replace('#cat-', '') || 'all';
      show(cat);
    }
  }

  global.NotesHub = { boot: boot, PAGE_SIZE: PAGE_SIZE };
})(typeof window !== 'undefined' ? window : this);
