---
permalink: /zh/projects/venusvaccine/
title: VenusVaccine
layout: default
project: venusvaccine
section: overview
lang: zh-CN
alt_url: /projects/venusvaccine/
author_profile: true
description: VenusVaccine：双注意力免疫原性预测，支撑疫苗靶点筛选（ICLR 2025）。
redirect_from:
- /zh/project/venusvaccine/
---

<header class="project-hero">
  <p class="project-kicker">ICLR 2025</p>
  <h1>VenusVaccine</h1>
  <p class="project-lede">
    双注意力免疫原性预测，支撑疫苗靶点筛选——多模态序列、结构与理化编码，区分保护性与非保护性抗原。
  </p>
  <p class="project-authors">
    Song Li<sup>*</sup>, Yang Tan<sup>*</sup>, Song Ke, Liang Hong, Bingxin Zhou
    <br><span style="font-size:0.9em;">（* 共同一作）</span>
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://openreview.net/forum?id=hWmwL9gizZ" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusVaccine" target="_blank" rel="noopener noreferrer">代码</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusvaccine.png' | relative_url }}" alt="VenusVaccine 概览图" loading="lazy">
  <figcaption>VenusVaccine 通过序列、结构与理化多模态输入上的双注意力，分类保护性抗原。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    VenusVaccine 预测抗原为<strong>保护性</strong>或<strong>非保护性</strong>，支撑从蛋白抗原中筛选疫苗靶点。
    输入融合氨基酸序列、结构衍生 token 与理化描述子，在统一多模态编码器中配合<strong>双注意力</strong>。
  </p>
  <ul>
    <li><strong>Foldseek</strong> 二级结构序列，刻画局部骨架几何。</li>
    <li><strong>ESM3</strong> 结构序列编码，表征三维构象。</li>
    <li><strong>E-descriptors</strong>（5 维）与 <strong>Z-descriptors</strong>（3 维）提供理化上下文。</li>
  </ul>
  <p>
    预训练蛋白质语言模型经轻量<strong>适配器</strong>提供序列骨干特征，支持 ESM、Bert、Ankh 等家族。
    已发布检查点覆盖 <code>Bacteria</code>、<code>Virus</code>、<code>Tumor</code> 三种抗原设定。
  </p>
</section>

<section class="project-section">
  <h2>推理流程</h2>
  <ol>
    <li>获取 PDB（实验或预测，如 ESMFold / AlphaFold）。</li>
    <li>用 <code>pdb2json.py</code> 组装序列、Foldseek、ESM3 与 E/Z 特征。</li>
    <li>运行 <code>infer.py -i input.json -t Bacteria|Virus|Tumor</code> 加载对应检查点。</li>
  </ol>
  <div class="project-callout">
    <p>
      输出含二分类保护性抗原标签与概率分数，便于湿实验前对候选疫苗靶点排序。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 VenusVaccine，请引用：</p>
  <div class="project-cite">
{% raw %}<pre><code>@inproceedings{li2025immunogenicity,
title={Immunogenicity Prediction with Dual Attention Enables Vaccine Target Selection},
author={Song Li and Yang Tan and Song Ke and Liang Hong and Bingxin Zhou},
booktitle={The Thirteenth International Conference on Learning Representations},
year={2025},
url={https://openreview.net/forum?id=hWmwL9gizZ}
}</code></pre>{% endraw %}
  </div>
</section>
