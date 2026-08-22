/* Recover visitors who landed on GitHub Pages' static 404.html. */
(function () {
  'use strict';

  var cfg = window.__404CFG || {};
  var slugs = cfg.slugs || [];
  var indexUrl = cfg.index || '/path-index.json';
  var path = window.location.pathname || '/';
  var extra = (window.location.search || '') + (window.location.hash || '');
  var NOTE_CAT = 'cv|bi|cl|ml|se|ir|os';
  var HOME_MS = 2000;
  var homeTimer = null;

  var I18N = {
    en: {
      title: 'This page does not exist',
      lede: 'This address is outdated or was never published. If we cannot recover it, you will be sent back to the homepage.',
      requested: 'Requested URL',
      looking: 'Looking for a matching page…',
      redirect: 'Found a matching page. Redirecting…',
      home: 'Page not found. Returning to the homepage in 2 seconds…',
      none: 'No close match for this URL.',
      searchLabel: 'Search notes, projects, and pages',
      searchPh: 'VenusX, TCM LLM, paper title…',
      suggest: 'Popular destinations',
      hits: 'Matching pages',
      empty: 'No matching pages.'
    },
    zh: {
      title: '页面不存在',
      lede: '这个地址可能是站点改版前的旧链接。能对上的会送到原文，对不上则 2 秒后返回首页。',
      requested: '请求的地址',
      looking: '正在查找匹配页面…',
      redirect: '找到匹配页面，正在跳转…',
      home: '页面不存在，2 秒后返回首页…',
      none: '没有找到足够接近的页面。',
      searchLabel: '搜索笔记、项目和页面',
      searchPh: 'VenusX、中医大模型、论文标题…',
      suggest: '常用入口',
      hits: '匹配页面',
      empty: '没有匹配的页面。'
    }
  };

  function is404File(p) {
    return p === '/404.html' || p === '/404' || p === '/404/';
  }

  function isNoise(p) {
    return /\/(wp-admin|wp-login|xmlrpc|cgi-bin|\.git|wordpress|phpmyadmin)/i.test(p)
      || /\.(php|aspx?|jsp|cgi|env|sql|bak)$/i.test(p);
  }

  // Soft-404 guard: never send crawlers to the homepage.
  function isCrawler() {
    var ua = (navigator.userAgent || '').toLowerCase();
    return /googlebot|adsbot-google|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex(bot|images)|sogou|exabot|facebot|facebookexternalhit|ia_archiver|semrush|ahrefs|dotbot|petalbot|bytespider|applebot|twitterbot|linkedinbot/.test(ua);
  }

  function preferZh() {
    if (path.indexOf('/zh/') === 0) return true;
    var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return lang.indexOf('zh') === 0;
  }

  function notesHub() {
    return preferZh() ? '/zh/notes/' : '/notes/';
  }

  function homeUrl() {
    return preferZh() ? '/zh/' : '/';
  }

  function withSlash(p) {
    if (!p) return '/';
    if (p.charAt(p.length - 1) !== '/' && !/\.[a-z0-9]+$/i.test(p)) return p + '/';
    return p;
  }

  function hyphenate(s) {
    return String(s || '').replace(/\s+/g, '-');
  }

  function remap(raw) {
    var next = raw || '/';
    try { next = decodeURIComponent(next); } catch (err) { /* keep raw */ }
    next = next.replace(/\/{2,}/g, '/');
    next = next.replace(/\/index\.html$/i, '/');
    next = next.replace(/\.html$/i, '/');
    // HTML entities / raw & in slugs (e.g. "Inputs & Outputs")
    var qAt = next.indexOf('?');
    var pathPart = qAt === -1 ? next : next.slice(0, qAt);
    var queryPart = qAt === -1 ? '' : next.slice(qAt);
    pathPart = pathPart.replace(/&amp;/gi, 'and').replace(/&/g, 'and');
    // Explicit permalinks keep fullwidth colons; search/OS often send ASCII.
    pathPart = pathPart.replace(/:/g, '：');
    next = pathPart + queryPart;

    var rules = [
      [/^\/tcm-en(\/.*)?$/i, '/projects/tcm'],
      [/^\/tcm(\/.*)?$/i, '/zh/projects/tcm'],
      [/^\/zh\/tcm(\/.*)?$/i, '/zh/projects/tcm'],
      [/^\/pub(\/.*)?$/i, '/projects'],
      [/^\/project(\/.*)?$/i, '/projects'],
      [/^\/zh\/project(\/.*)?$/i, '/zh/projects'],
      [/^\/zh\/pub(\/.*)?$/i, '/zh/projects']
    ];
    var i, m;
    for (i = 0; i < rules.length; i++) {
      m = next.match(rules[i][0]);
      if (m) {
        next = rules[i][1] + (m[1] || '/');
        break;
      }
    }

    if (/^\/(zh\/)?(categories?|tags?)(\/|$)/i.test(next)) {
      return notesHub();
    }

    // /cv and /cv/ are the resume aliases on the homepage. Leave them alone.
    // Other /bi /cl … roots now have category landings under /notes/.
    m = next.match(new RegExp('^/(zh/)?(' + NOTE_CAT + ')/?$', 'i'));
    if (m && !/^\/cv\/?$/.test(next)) {
      return '/' + (m[1] || '') + 'notes/' + m[2].toLowerCase() + '/';
    }

    // Old Hexo/Jekyll notes: /cv/Title/ or /zh/cv/Title/ (no /notes/ prefix)
    m = next.match(new RegExp('^/(zh/)?(' + NOTE_CAT + ')/(.+)$', 'i'));
    if (m) {
      next = (m[1] || (preferZh() ? 'zh/' : '')) + 'notes/' + m[2].toLowerCase() + '/' + hyphenate(m[3]);
      next = next.charAt(0) === '/' ? next : '/' + next;
    }

    next = next.replace(/^(\/zh)?\/notes\/([A-Za-z]{2})\//, function (_all, zh, cat) {
      return (zh || '') + '/notes/' + cat.toLowerCase() + '/';
    });

    next = next.replace(/^(\/zh)?\/projects\/([^/]+)(\/.*)?$/i, function (all, zh, slug, rest) {
      var lower = slug.toLowerCase();
      if (slugs.indexOf(lower) !== -1) {
        return (zh || '') + '/projects/' + lower + (rest || '/');
      }
      return all;
    });

    m = next.match(/^\/([^/]+)\/?$/);
    if (m && slugs.indexOf(m[1].toLowerCase()) !== -1) {
      next = '/projects/' + m[1].toLowerCase() + '/';
    }

    if (/^(\/zh)?\/projects\/tcm\/items\/?$/.test(next)) {
      next = next.replace(/items\/?$/, '');
    }

    next = next.replace(/^(\/zh)?\/notes\/([a-z]{2})\/?$/, function (_all, zh, cat) {
      return (zh || '') + '/notes/' + cat + '/';
    });

    if (next.indexOf('#') !== -1) return next;
    return withSlash(next);
  }

  function lookupQuery(raw) {
    var q = raw || '/';
    try { q = decodeURIComponent(q); } catch (err) { /* keep raw */ }
    q = q.replace(/\/index\.html$/i, '/');
    var dateM = q.match(/^\/\d{4}\/\d{2}\/\d{2}\/(.+?)\/?$/);
    if (dateM) return '/' + hyphenate(dateM[1]);
    return hyphenate(q);
  }

  function go(next) {
    if (!next) return false;
    var hashIdx = next.indexOf('#');
    var destPath = hashIdx === -1 ? next : next.slice(0, hashIdx);
    var destHash = hashIdx === -1 ? '' : next.slice(hashIdx);
    if (!destHash && (destPath === path || destPath === path + '/')) return false;
    window.__404Redirecting = true;
    window.location.replace(destPath + (window.location.search || '') + destHash);
    return true;
  }

  function cancelHome() {
    if (homeTimer) {
      clearTimeout(homeTimer);
      homeTimer = null;
    }
  }

  function goHome(root, i18n) {
    cancelHome();
    report404();
    if (isCrawler()) {
      if (root) setStatus(root, i18n.none, 'none');
      return;
    }
    if (root) setStatus(root, i18n.home, 'home');
    window.__404Redirecting = true;
    homeTimer = setTimeout(function () {
      window.location.replace(homeUrl());
    }, HOME_MS);
  }

  function report404() {
    if (window.__404Redirecting) return;
    if (typeof window.__report404 === 'function') window.__report404();
  }

  function lastSeg(p) {
    return (p || '').replace(/\/+$/, '').split('/').pop() || '';
  }

  function normSeg(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/&amp;|&/g, '-and-')
      .replace(/[:：,，._？?]+/g, '-')
      .replace(/[^a-z0-9\u4e00-\u9fff-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a) return b.length;
    if (!b) return a.length;
    if (Math.abs(a.length - b.length) > 2) return 99;
    var i, j, prev, cur;
    var row = [];
    for (j = 0; j <= b.length; j++) row[j] = j;
    for (i = 1; i <= a.length; i++) {
      prev = i;
      for (j = 1; j <= b.length; j++) {
        cur = a.charAt(i - 1) === b.charAt(j - 1) ? row[j - 1] : Math.min(row[j - 1], row[j], prev) + 1;
        row[j - 1] = prev;
        prev = cur;
      }
      row[b.length] = prev;
    }
    return row[b.length];
  }

  function scoreEntry(query, entry) {
    var nq = withSlash(query).toLowerCase().replace(/\/+$/, '');
    var nu = (entry.u || '').toLowerCase().replace(/\/+$/, '');
    if (!nu) return 0;
    if (nq === nu) return 100;

    var qs = normSeg(lastSeg(nq));
    var us = normSeg(lastSeg(nu));
    if (qs && qs === us) {
      if (nq.indexOf('/zh/') === 0 && nu.indexOf('/zh/') === 0) return 92;
      if (nq.indexOf('/zh/') !== 0 && nu.indexOf('/zh/') !== 0) return 90;
      return 78;
    }
    if (qs && us && qs.length >= 4 && us.indexOf(qs) !== -1) return 62;
    if (qs && us && us.length >= 4 && qs.indexOf(us) !== -1) return 58;

    var title = (entry.t || '').toLowerCase();
    if (qs && title && title.indexOf(qs) !== -1) return 48;

    if (qs && us && qs.length >= 5 && us.length >= 5 && levenshtein(qs, us) <= 1) return 70;
    return 0;
  }

  function rank(query, entries, minScore) {
    var scored = [];
    var i, s;
    for (i = 0; i < entries.length; i++) {
      s = scoreEntry(query, entries[i]);
      if (s >= minScore) scored.push({ e: entries[i], s: s });
    }
    scored.sort(function (a, b) { return b.s - a.s; });
    return scored;
  }

  function pickRedirect(ranked, zh) {
    if (!ranked.length) return null;
    var preferred = ranked.filter(function (r) {
      var u = r.e.u || '';
      return zh ? u.indexOf('/zh/') === 0 : u.indexOf('/zh/') !== 0;
    });
    var pool = preferred.length ? preferred : ranked;
    var top = pool[0];
    // Crawlers only follow exact slug matches, never fuzzy guesses.
    var minScore = isCrawler() ? 90 : 78;
    if (top.s < minScore) return null;
    if (pool.length > 1 && pool[1].s >= top.s - 2) {
      if (normSeg(lastSeg(top.e.u)) === normSeg(lastSeg(pool[1].e.u))) return top.e.u;
      return null;
    }
    return top.e.u;
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function applyI18n(root, zh) {
    var t = I18N[zh ? 'zh' : 'en'];
    var map = {
      title: t.title,
      lede: t.lede,
      looking: t.looking,
      'search-label': t.searchLabel,
      'suggest-heading': t.suggest
    };
    Object.keys(map).forEach(function (key) {
      var el = root.querySelector('[data-404="' + key + '"]');
      if (el) el.textContent = map[key];
    });
    var input = $('[data-404="search"]', root);
    if (input) input.setAttribute('placeholder', t.searchPh);
    var req = $('[data-404="requested-label"]', root);
    if (req) req.textContent = t.requested;
    if (zh) {
      root.querySelectorAll('a[data-en][data-zh]').forEach(function (a) {
        a.setAttribute('href', a.getAttribute('data-zh'));
      });
    }
    return t;
  }

  function showPath(root) {
    var wrap = $('[data-404="path-wrap"]', root);
    var code = $('[data-404="path"]', root);
    if (code) code.textContent = path + extra;
    if (wrap && !is404File(path)) wrap.hidden = false;
  }

  function setStatus(root, text, kind) {
    var el = $('[data-404="status"]', root);
    if (!el) return;
    if (!text) {
      el.hidden = true;
      el.textContent = '';
      return;
    }
    el.hidden = false;
    el.textContent = text;
    el.setAttribute('data-kind', kind || '');
  }

  function renderHits(root, items, heading) {
    var box = $('[data-404="hits"]', root);
    var head = $('[data-404="hits-heading"]', root);
    if (!box) return;
    box.innerHTML = '';
    if (!items.length) {
      box.hidden = true;
      if (head) head.hidden = true;
      return;
    }
    if (head) {
      head.hidden = false;
      head.textContent = heading;
    }
    items.slice(0, 8).forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.u;
      a.textContent = item.t || item.u;
      var span = document.createElement('span');
      span.textContent = item.u;
      li.appendChild(a);
      li.appendChild(span);
      box.appendChild(li);
    });
    box.hidden = false;
  }

  function searchIndex(entries, q, zh) {
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    var hits = [];
    var i, e, blob, score;
    for (i = 0; i < entries.length; i++) {
      e = entries[i];
      blob = ((e.t || '') + ' ' + (e.u || '')).toLowerCase();
      if (blob.indexOf(q) === -1) continue;
      score = 0;
      if ((e.t || '').toLowerCase().indexOf(q) === 0) score += 20;
      if ((e.u || '').toLowerCase().indexOf(q) !== -1) score += 10;
      if (zh && (e.u || '').indexOf('/zh/') === 0) score += 4;
      if (!zh && (e.u || '').indexOf('/zh/') !== 0) score += 4;
      hits.push({ u: e.u, t: e.t, s: score });
    }
    hits.sort(function (a, b) { return b.s - a.s; });
    return hits;
  }

  function bindSearch(root, entries, i18n, zh) {
    var input = $('[data-404="search"]', root);
    if (!input) return;
    var timer = null;
    function run() {
      var q = input.value;
      if (!q.trim()) {
        renderHits(root, [], i18n.hits);
        return;
      }
      var hits = searchIndex(entries, q, zh);
      if (!hits.length) {
        renderHits(root, [], i18n.hits);
        setStatus(root, i18n.empty, 'none');
        return;
      }
      setStatus(root, '', '');
      renderHits(root, hits, i18n.hits);
    }
    input.addEventListener('input', function () {
      cancelHome();
      clearTimeout(timer);
      timer = setTimeout(run, 160);
    });
  }

  function enhance(entries) {
    var root = document.getElementById('page-404');
    if (!root) {
      goHome(null, I18N[preferZh() ? 'zh' : 'en']);
      return;
    }
    var zh = preferZh();
    var i18n = applyI18n(root, zh);
    showPath(root);
    bindSearch(root, entries, i18n, zh);

    if (is404File(path) || isNoise(path)) {
      return;
    }

    var ranked = rank(lookupQuery(path), entries, 48);
    if (!ranked.length) ranked = rank(path, entries, 48);
    var dest = pickRedirect(ranked, zh);
    if (dest && go(dest)) {
      setStatus(root, i18n.redirect, 'redirect');
      return;
    }

    goHome(root, i18n);
  }

  if (is404File(path)) {
    window.location.replace(preferZh() ? '/zh/' : '/');
    return;
  }
  if (!isNoise(path) && go(remap(path))) return;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var root = document.getElementById('page-404');
    var zh = preferZh();
    var i18n = root ? applyI18n(root, zh) : I18N.en;
    if (root) showPath(root);

    if (isNoise(path)) {
      return;
    }

    if (root) setStatus(root, i18n.looking, 'looking');

    fetch(indexUrl)
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (data) { enhance(Array.isArray(data) ? data : []); })
      .catch(function () {
        enhance([]);
      });
  });
})();
