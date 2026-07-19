---
permalink: /zh/notes/
title: "论文笔记"
lang: zh-CN
alt_url: /notes/
layout: default
author_profile: true
description: "谭扬的论文笔记检索页：AI for Biology、蛋白质模型、科学大模型等。"
keywords:
  - 论文笔记
  - AI for Biology
  - 谭扬
---

<span class='anchor' id='notes'></span>

检索与筛选论文笔记（AI for Biology、蛋白质语言模型、科学大模型等）。笔记正文保持原文，不另做批量翻译。

### 分类概览
<div id="notes-stats" style="margin-bottom:8px;"></div>

### 筛选与搜索

<input id="notes-search" type="search" placeholder="搜索笔记..." style="min-width:220px; margin-bottom:8px;">

<div id="notes-filters" style="display:flex; gap:12px; align-items:center; flex-wrap:nowrap; overflow-x:auto; white-space:nowrap;">
  <label>分类 <select id="notes-filter-category"><option value="">全部</option></select></label>
  <label>会议/期刊 <select id="notes-filter-proceedings"><option value="">全部</option></select></label>
  <label>标签 <select id="notes-filter-tag"><option value="">全部</option></select></label>
  <label>起始日期 <input type="date" id="notes-filter-from"></label>
  <label>结束日期 <input type="date" id="notes-filter-to"></label>
</div>

<div id="notes-results"></div>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
<script>
async function fetchIndex(){
  const res = await fetch('{{ '/search.json' | relative_url }}');
  return await res.json();
}
function byDateDesc(a,b){ return (b.date||'').localeCompare(a.date||''); }
function groupByYear(items){
  const groups = {};
  items.forEach(p => {
    const y = (p.date||'').slice(0,4) || '未知';
    if(!groups[y]) groups[y] = [];
    groups[y].push(p);
  });
  const years = Object.keys(groups).sort((a,b)=>b.localeCompare(a));
  years.forEach(y => groups[y].sort(byDateDesc));
  return { years, groups };
}
function render(items){
  const container = document.getElementById('notes-results');
  const { years, groups } = groupByYear(items);
  container.innerHTML = years.map(y => {
    const list = groups[y].map(p => `<li><a href="${p.url}">${p.title}</a></li>`).join('');
    return `<h2>${y}</h2><ul>${list}</ul>`;
  }).join('');
}
function populateSelect(select, values){
  const frag = document.createDocumentFragment();
  values.forEach(v => { const o = document.createElement('option'); o.value = v; o.textContent = v; frag.appendChild(o); });
  select.appendChild(frag);
}
function collectFacets(data){
  const cats = new Set();
  const procs = new Set();
  const tags = new Set();
  data.forEach(p => {
    (p.categories||[]).forEach(c => c && cats.add(c));
    if (p.proceedings) procs.add(p.proceedings);
    (p.tags||[]).forEach(t => t && tags.add(t));
  });
  return { categories: [...cats].sort(), proceedings: [...procs].sort(), tags: [...tags].sort() };
}
function renderCategoryStats(data){
  const counts = {};
  data.forEach(p => (p.categories||[]).forEach(c => { if(!c) return; counts[c] = (counts[c]||0) + 1; }));
  const html = Object.keys(counts).sort().map(c => `<span style="margin-right:12px;">${c} (${counts[c]})</span>`).join('');
  document.getElementById('notes-stats').innerHTML = html || '暂无分类';
}
function applyFilters(list){
  const cat = document.getElementById('notes-filter-category').value;
  const proc = document.getElementById('notes-filter-proceedings').value;
  const tag = document.getElementById('notes-filter-tag').value;
  const from = document.getElementById('notes-filter-from').value;
  const to = document.getElementById('notes-filter-to').value;
  return list.filter(p => {
    if (cat && !(p.categories||[]).includes(cat)) return false;
    if (proc && (p.proceedings||'') !== proc) return false;
    if (tag && !(p.tags||[]).includes(tag)) return false;
    if (from && (p.date||'') < from) return false;
    if (to && (p.date||'') > to + 'T23:59:59') return false;
    return true;
  });
}
async function main(){
  const data = await fetchIndex();
  const fuse = new Fuse(data, { keys: ['title','content','excerpt','tags','categories','proceedings'], threshold: 0.35 });
  const searchInput = document.getElementById('notes-search');
  const selCat = document.getElementById('notes-filter-category');
  const selProc = document.getElementById('notes-filter-proceedings');
  const selTag = document.getElementById('notes-filter-tag');
  const inputs = [searchInput, selCat, selProc, selTag, document.getElementById('notes-filter-from'), document.getElementById('notes-filter-to')];
  const facets = collectFacets(data);
  renderCategoryStats(data);
  populateSelect(selCat, facets.categories);
  populateSelect(selProc, facets.proceedings);
  populateSelect(selTag, facets.tags);
  function update(){
    const q = searchInput.value.trim();
    const base = q ? fuse.search(q).map(r=>r.item) : data;
    render(applyFilters(base));
  }
  inputs.forEach(el => el.addEventListener('input', update));
  render(data);
}
main();
</script>
