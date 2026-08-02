/* Shared TCM catalog browser for /zh/projects/tcm/ (zh) and /projects/tcm/ (en). */
(function (global) {
  'use strict';

  var TCM_CDN = 'https://cdn.jsdelivr.net/gh/tyang816/Awesome-TCM-LLM@main/data/catalog.json';
  var TCM_RAW = 'https://raw.githubusercontent.com/tyang816/Awesome-TCM-LLM/main/data/catalog.json';

  var TYPE_KEYS = {
    news: 'news',
    resource: 'resource',
    dataset: 'dataset',
    model_hf: 'model_hf',
    tool: 'tool',
    kg: 'kg',
    product: 'product',
    benchmark: 'benchmark'
  };

  var I18N = {
    zh: {
      updated: '更新于：',
      empty: '没有匹配的资源。',
      fail: '无法加载目录，请访问',
      type: '类型',
      year: '年份',
      tag: '标签',
      all: '全部',
      hideGeneral: '隐藏通医（非中医主线）',
      searchPlaceholder: '搜索名称 / 机构 / 标签…',
      overview: '概览',
      filter: '筛选与搜索',
      typeLabels: {
        news: '新闻',
        resource: '资源',
        dataset: '数据集',
        model_hf: '模型',
        tool: '工具',
        kg: '知识图谱',
        product: '产品',
        benchmark: '评测'
      }
    },
    en: {
      updated: 'Updated: ',
      empty: 'No matching resources.',
      fail: 'Failed to load catalog. Please visit',
      type: 'Type',
      year: 'Year',
      tag: 'Tag',
      all: 'All',
      hideGeneral: 'Hide general-medical',
      searchPlaceholder: 'Search name / org / tag…',
      overview: 'Overview',
      filter: 'Filter and search',
      typeLabels: {
        news: 'news',
        resource: 'resource',
        dataset: 'dataset',
        model_hf: 'model',
        tool: 'tool',
        kg: 'kg',
        product: 'product',
        benchmark: 'benchmark'
      }
    }
  };

  function t(locale, key) {
    return (I18N[locale] || I18N.zh)[key];
  }

  function typeLabel(locale, type) {
    var labels = (I18N[locale] || I18N.zh).typeLabels;
    return labels[type] || type;
  }

  async function fetchCatalog() {
    var urls = [TCM_CDN, TCM_RAW];
    for (var i = 0; i < urls.length; i++) {
      try {
        var res = await fetch(urls[i], { cache: 'no-cache' });
        if (!res.ok) continue;
        return await res.json();
      } catch (e) { /* try next */ }
    }
    throw new Error('Failed to load catalog.json');
  }

  function flattenItems(payload) {
    return (payload.items || []).filter(function (i) {
      return (i.status || 'published') === 'published' && i.verified_at;
    });
  }

  function linkHtml(links) {
    if (!links) return '';
    return Object.keys(links).filter(function (k) { return links[k]; }).map(function (k) {
      return '<a href="' + links[k] + '" target="_blank" rel="noopener">' + k + '</a>';
    }).join(' · ');
  }

  function displayName(item) {
    if (item.type === 'news') {
      return String(item.summary_zh || item.name || '').replace(/\*\*/g, '');
    }
    return item.name || item.title_zh || item.id;
  }

  function displaySummary(item) {
    if (item.type === 'news') return '';
    if (item.title_zh && item.type === 'dataset') return '';
    return item.summary_zh || item.title_zh || '';
  }

  function render(locale, items) {
    var container = document.getElementById('tcm-results');
    if (!items.length) {
      container.innerHTML = '<p>' + t(locale, 'empty') + '</p>';
      return;
    }
    var byYear = {};
    items.forEach(function (it) {
      var y = String(it.year || String(it.date || '').slice(0, 4) || '—');
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(it);
    });
    var years = Object.keys(byYear).sort(function (a, b) { return b.localeCompare(a); });
    container.innerHTML = years.map(function (y) {
      var lis = byYear[y].map(function (it) {
        var type = typeLabel(locale, it.type);
        var name = displayName(it);
        var summary = displaySummary(it);
        var orgs = (it.orgs || []).join(' / ');
        var tags = (it.tags || []).join(', ');
        var meta = [type, orgs, tags].filter(Boolean).join(' · ');
        var links = linkHtml(it.links);
        return '<li style="margin-bottom:10px;">' +
          '<strong>' + name + '</strong>' +
          (summary ? '<span> — ' + summary + '</span>' : '') +
          (meta ? '<br><span style="opacity:0.75;font-size:0.92em;">' + meta + '</span>' : '') +
          (links ? '<br>' + links : '') +
          '</li>';
      }).join('');
      return '<h2>' + y + '</h2><ul>' + lis + '</ul>';
    }).join('');
  }

  function populateSelect(select, values, allLabel) {
    select.innerHTML = '';
    var all = document.createElement('option');
    all.value = '';
    all.textContent = allLabel;
    select.appendChild(all);
    values.forEach(function (v) {
      var o = document.createElement('option');
      o.value = v;
      o.textContent = v;
      select.appendChild(o);
    });
  }

  function collectFacets(locale, data) {
    var types = new Set();
    var years = new Set();
    var tags = new Set();
    data.forEach(function (p) {
      if (p.type) types.add(typeLabel(locale, p.type));
      if (p.year) years.add(String(p.year));
      (p.tags || []).forEach(function (tg) { if (tg) tags.add(tg); });
    });
    return {
      types: Array.from(types).sort(),
      years: Array.from(years).sort(function (a, b) { return b.localeCompare(a); }),
      tags: Array.from(tags).sort()
    };
  }

  function renderStats(locale, data) {
    var counts = {};
    data.forEach(function (p) {
      var lab = typeLabel(locale, p.type) || 'other';
      counts[lab] = (counts[lab] || 0) + 1;
    });
    document.getElementById('tcm-stats').innerHTML =
      Object.keys(counts).sort().map(function (c) {
        return '<span style="margin-right:12px;">' + c + ' (' + counts[c] + ')</span>';
      }).join('');
  }

  function applyFilters(locale, list) {
    var type = document.getElementById('tcm-filter-type').value;
    var year = document.getElementById('tcm-filter-year').value;
    var tag = document.getElementById('tcm-filter-tag').value;
    var hideGeneral = document.getElementById('tcm-hide-general').checked;
    return list.filter(function (p) {
      var tlabel = typeLabel(locale, p.type);
      if (type && tlabel !== type) return false;
      if (year && String(p.year) !== year) return false;
      if (tag && !(p.tags || []).includes(tag)) return false;
      if (hideGeneral && (p.tags || []).includes('general-medical')) return false;
      return true;
    });
  }

  function applyStaticLabels(locale) {
    var search = document.getElementById('tcm-search');
    if (search) search.placeholder = t(locale, 'searchPlaceholder');
    var hide = document.getElementById('tcm-hide-general-label');
    if (hide) hide.textContent = t(locale, 'hideGeneral');
    var typeLab = document.getElementById('tcm-label-type');
    var yearLab = document.getElementById('tcm-label-year');
    var tagLab = document.getElementById('tcm-label-tag');
    if (typeLab) typeLab.textContent = t(locale, 'type');
    if (yearLab) yearLab.textContent = t(locale, 'year');
    if (tagLab) tagLab.textContent = t(locale, 'tag');
    var ov = document.getElementById('tcm-heading-overview');
    var fl = document.getElementById('tcm-heading-filter');
    if (ov) ov.textContent = t(locale, 'overview');
    if (fl) fl.textContent = t(locale, 'filter');
  }

  async function boot(locale) {
    locale = locale === 'en' ? 'en' : 'zh';
    applyStaticLabels(locale);
    try {
      var payload = await fetchCatalog();
      var data = flattenItems(payload);
      var updated = payload.updated_at || (payload.meta && payload.meta.updated_at) || '';
      document.getElementById('tcm-updated').textContent =
        updated ? (t(locale, 'updated') + updated) : '';
      var fuse = new Fuse(data, {
        keys: ['name', 'title_zh', 'summary_zh', 'orgs', 'tags', 'venue'],
        threshold: 0.35
      });
      var searchInput = document.getElementById('tcm-search');
      var selType = document.getElementById('tcm-filter-type');
      var selYear = document.getElementById('tcm-filter-year');
      var selTag = document.getElementById('tcm-filter-tag');
      var hideGeneral = document.getElementById('tcm-hide-general');
      var facets = collectFacets(locale, data);
      renderStats(locale, data);
      populateSelect(selType, facets.types, t(locale, 'all'));
      populateSelect(selYear, facets.years, t(locale, 'all'));
      populateSelect(selTag, facets.tags, t(locale, 'all'));
      function update() {
        var q = searchInput.value.trim();
        var base = q ? fuse.search(q).map(function (r) { return r.item; }) : data;
        render(locale, applyFilters(locale, base));
      }
      [searchInput, selType, selYear, selTag, hideGeneral].forEach(function (el) {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
      });
      update();
    } catch (err) {
      document.getElementById('tcm-results').innerHTML =
        '<p>' + t(locale, 'fail') +
        ' <a href="https://github.com/tyang816/Awesome-TCM-LLM">Awesome-TCM-LLM</a>.</p>' +
        '<pre>' + err + '</pre>';
    }
  }

  global.TcmCatalog = { boot: boot, I18N: I18N, TYPE_KEYS: TYPE_KEYS };
})(window);
