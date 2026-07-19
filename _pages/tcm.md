---
permalink: /tcm/
title: "中医大模型资源 | TCM AI"
lang: zh-CN
alt_url: /tcm-en/
layout: default
author_profile: true
redirect_from:
  - /zh/tcm/
description: "中医大模型（TCM LLM）开源资源导航：论文、模型、评测基准、数据集与产业动态，与 Awesome-TCM-LLM 同源更新。"
seo_description: "Curated Traditional Chinese Medicine LLM resources — open models, benchmarks, datasets, and news. 中医大模型资源列表。"
keywords:
  - 中医大模型
  - TCM LLM
  - Traditional Chinese Medicine
  - benchmark
  - Awesome-TCM-LLM
---

<span class='anchor' id='tcm'></span>

# 中医大模型资源

Curated open resources for Traditional Chinese Medicine LLMs — models, benchmarks, datasets, and news. 本页汇总中医/中医药大模型相关论文、开源权重、评测基准与数据集，便于检索与引用。

<p id="tcm-updated" style="margin:4px 0 12px; opacity:0.8;"></p>
<p style="margin-bottom:16px;">
  数据与 <a href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub Awesome-TCM-LLM</a> 同源维护
  ·
  <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">提交资源</a>
  ·
  <a href="{{ '/tcm-en/' | relative_url }}">English /tcm-en/</a>
  ·
  <a href="{{ '/zh/' | relative_url }}">谭扬主页 /zh/</a>
</p>

### Overview
<div id="tcm-stats" style="margin-bottom:8px;"></div>

### Filter and search

<input id="tcm-search" type="search" placeholder="Search name / org / tag..." style="min-width:220px; margin-bottom:8px;">

<div id="tcm-filters" style="display:flex; gap:12px; align-items:center; flex-wrap:nowrap; overflow-x:auto; white-space:nowrap;">
  <label>Type <select id="tcm-filter-type"><option value="">All</option></select></label>
  <label>Year <select id="tcm-filter-year"><option value="">All</option></select></label>
  <label>Tag <select id="tcm-filter-tag"><option value="">All</option></select></label>
  <label><input type="checkbox" id="tcm-hide-general" checked> Hide general-medical</label>
</div>

<div id="tcm-results" style="margin-top:16px;"></div>

<p style="margin-top:24px; opacity:0.85;">
  觉得有用请在 <a href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a> 点 Star；英文说明见 <a href="{{ '/tcm-en/' | relative_url }}">/tcm-en/</a>。
</p>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
<script>
const TCM_CDN = 'https://cdn.jsdelivr.net/gh/tyang816/Awesome-TCM-LLM@main/data/catalog.json';
const TCM_RAW = 'https://raw.githubusercontent.com/tyang816/Awesome-TCM-LLM/main/data/catalog.json';

const TYPE_LABEL = {
  news: 'news',
  resource: 'resource',
  dataset: 'dataset',
  model_hf: 'model',
  tool: 'tool',
  kg: 'kg',
  product: 'product',
  benchmark: 'benchmark'
};

async function fetchCatalog(){
  for (const url of [TCM_CDN, TCM_RAW]) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;
      return await res.json();
    } catch (e) { /* try next */ }
  }
  throw new Error('Failed to load catalog.json');
}

function flattenItems(payload){
  return (payload.items || []).filter(i => (i.status || 'published') === 'published' && i.verified_at);
}

function linkHtml(links){
  if (!links) return '';
  return Object.entries(links).filter(([,u]) => u).map(([k,u]) =>
    `<a href="${u}" target="_blank" rel="noopener">${k}</a>`
  ).join(' · ');
}

function displayName(item){
  if (item.type === 'news') return (item.summary_zh || item.name || '').replace(/\*\*/g, '');
  return item.name || item.title_zh || item.id;
}

function displaySummary(item){
  if (item.type === 'news') return '';
  if (item.title_zh && item.type === 'dataset') return '';
  return item.summary_zh || item.title_zh || '';
}

function render(items){
  const container = document.getElementById('tcm-results');
  if (!items.length) {
    container.innerHTML = '<p>No matching resources.</p>';
    return;
  }
  const byYear = {};
  items.forEach(it => {
    const y = String(it.year || (it.date || '').slice(0,4) || 'Unknown');
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(it);
  });
  const years = Object.keys(byYear).sort((a,b)=>b.localeCompare(a));
  container.innerHTML = years.map(y => {
    const lis = byYear[y].map(it => {
      const type = TYPE_LABEL[it.type] || it.type;
      const name = displayName(it);
      const summary = displaySummary(it);
      const orgs = (it.orgs || []).join(' / ');
      const tags = (it.tags || []).join(', ');
      const meta = [type, orgs, tags].filter(Boolean).join(' · ');
      const links = linkHtml(it.links);
      return `<li style="margin-bottom:10px;">
        <strong>${name}</strong>
        ${summary ? `<span> — ${summary}</span>` : ''}
        ${meta ? `<br><span style="opacity:0.75;font-size:0.92em;">${meta}</span>` : ''}
        ${links ? `<br>${links}` : ''}
      </li>`;
    }).join('');
    return `<h2>${y}</h2><ul>${lis}</ul>`;
  }).join('');
}

function populateSelect(select, values){
  const frag = document.createDocumentFragment();
  values.forEach(v => {
    const o = document.createElement('option');
    o.value = v; o.textContent = v; frag.appendChild(o);
  });
  select.appendChild(frag);
}

function collectFacets(data){
  const types = new Set();
  const years = new Set();
  const tags = new Set();
  data.forEach(p => {
    if (p.type) types.add(TYPE_LABEL[p.type] || p.type);
    if (p.year) years.add(String(p.year));
    (p.tags || []).forEach(t => t && tags.add(t));
  });
  return {
    types: [...types].sort(),
    years: [...years].sort((a,b)=>b.localeCompare(a)),
    tags: [...tags].sort()
  };
}

function renderStats(data){
  const counts = {};
  data.forEach(p => {
    const t = TYPE_LABEL[p.type] || p.type || 'other';
    counts[t] = (counts[t] || 0) + 1;
  });
  document.getElementById('tcm-stats').innerHTML =
    Object.keys(counts).sort().map(c => `<span style="margin-right:12px;">${c} (${counts[c]})</span>`).join('');
}

function applyFilters(list){
  const type = document.getElementById('tcm-filter-type').value;
  const year = document.getElementById('tcm-filter-year').value;
  const tag = document.getElementById('tcm-filter-tag').value;
  const hideGeneral = document.getElementById('tcm-hide-general').checked;
  return list.filter(p => {
    const tlabel = TYPE_LABEL[p.type] || p.type;
    if (type && tlabel !== type) return false;
    if (year && String(p.year) !== year) return false;
    if (tag && !(p.tags || []).includes(tag)) return false;
    if (hideGeneral && (p.tags || []).includes('general-medical')) return false;
    return true;
  });
}

async function main(){
  const payload = await fetchCatalog();
  const data = flattenItems(payload);
  const updated = payload.updated_at || (payload.meta && payload.meta.updated_at) || '';
  document.getElementById('tcm-updated').textContent = updated ? `Updated: ${updated}` : '';
  const fuse = new Fuse(data, {
    keys: ['name', 'title_zh', 'summary_zh', 'orgs', 'tags', 'venue'],
    threshold: 0.35
  });
  const searchInput = document.getElementById('tcm-search');
  const selType = document.getElementById('tcm-filter-type');
  const selYear = document.getElementById('tcm-filter-year');
  const selTag = document.getElementById('tcm-filter-tag');
  const hideGeneral = document.getElementById('tcm-hide-general');
  const facets = collectFacets(data);
  renderStats(data);
  populateSelect(selType, facets.types);
  populateSelect(selYear, facets.years);
  populateSelect(selTag, facets.tags);
  function update(){
    const q = searchInput.value.trim();
    const base = q ? fuse.search(q).map(r => r.item) : data;
    render(applyFilters(base));
  }
  [searchInput, selType, selYear, selTag, hideGeneral].forEach(el => {
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  update();
}
main().catch(err => {
  document.getElementById('tcm-results').innerHTML =
    `<p>Failed to load catalog. Please visit <a href="https://github.com/tyang816/Awesome-TCM-LLM">Awesome-TCM-LLM</a>.</p><pre>${err}</pre>`;
});
</script>
