/* Recover visitors who landed on GitHub Pages' static 404.html. */
(function () {
  'use strict';

  var cfg = window.__404CFG || {};
  var slugs = cfg.slugs || [];
  var indexUrl = cfg.index || '/path-index.json';
  var path = window.location.pathname || '/';

  var I18N = {
    en: {
      title: 'This page does not exist',
      lede: 'The address may be outdated after a site reorganization. Search below, or open a main section.',
      requested: 'Requested URL',
      looking: 'Looking for a close match…',
      redirect: 'Redirecting to a matching page…',
      none: 'No close match for this URL.',
      searchLabel: 'Search notes, projects, and pages',
      searchPh: 'VenusX, TCM LLM, paper title…',
      suggest: 'Popular destinations',
      hits: 'Matching pages',
      empty: 'No matching pages.'
    },
    zh: {
      title: '页面不存在',
      lede: '这个地址可能在站点改版后失效了。可以搜索，或从下面的入口继续浏览。',
      requested: '请求的地址',
      looking: '正在查找相近页面…',
      redirect: '正在跳转到匹配页面…',
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

  function preferZh() {
    if (path.indexOf('/zh/') === 0) return true;
    var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return lang.indexOf('zh') === 0;
  }

  function withSlash(p) {
    if (!p) return '/';
    if (p.charAt(p.length - 1) !== '/' && !/\.[a-z0-9]+$/i.test(p)) return p + '/';
    return p;
  }

  function remap(raw) {
    var next = raw || '/';
    try { next = decodeURIComponent(next); } catch (err) { /* keep raw */ }
    next = next.replace(/\/{2,}/g, '/');
    next = next.replace(/\/index\.html$/i, '/');
    next = next.replace(/\.html$/i, '/');

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
      return (zh || '') + '/notes/#cat-' + cat.toUpperCase();
    });

    if (next.indexOf('#') !== -1) return next;
    return withSlash(next);
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
      .replace(/[:：,，._]+/g, '-')
      .replace(/[^a-z0-9\u4e00-\u9fff-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a) return b.length;
    if (!b) return a.length;
    if (Math.abs(a.length - b.length) > 2) return 99;
    var i, j, prev, cur, tmp;
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

  function pickRedirect(ranked) {
    if (!ranked.length) return null;
    var top = ranked[0];
    if (top.s < 78) return null;
    if (ranked.length > 1 && ranked[1].s >= top.s - 2) return null;
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

  function renderHits(root, items, heading, emptyText) {
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
      clearTimeout(timer);
      timer = setTimeout(run, 160);
    });
  }

  function enhance(entries) {
    var root = document.getElementById('page-404');
    if (!root) {
      report404();
      return;
    }
    var zh = preferZh();
    var i18n = applyI18n(root, zh);
    showPath(root);
    bindSearch(root, entries, i18n, zh);

    if (is404File(path) || isNoise(path)) {
      report404();
      return;
    }

    var ranked = rank(path, entries, 48);
    var dest = pickRedirect(ranked);
    if (dest && go(dest)) {
      setStatus(root, i18n.redirect, 'redirect');
      return;
    }

    if (ranked.length) {
      renderHits(root, ranked.map(function (r) { return r.e; }), i18n.hits);
      setStatus(root, '', '');
    } else {
      setStatus(root, i18n.none, 'none');
    }
    report404();
  }

  if (!is404File(path) && !isNoise(path) && go(remap(path))) return;

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

    if (is404File(path) || isNoise(path)) {
      report404();
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
