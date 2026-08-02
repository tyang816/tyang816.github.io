---
permalink: /zh/projects/protloca/
title: ProtLOCA
layout: default
project: protloca
section: overview
lang: zh-CN
alt_url: /projects/protloca/
author_profile: true
description: ProtLOCA：仅结构的局部几何对齐，用于蛋白质同源检测（IEEE BIBM 2024）。
redirect_from:
- /zh/project/protloca/
---

<header class="project-hero">
  <p class="project-kicker">IEEE BIBM 2024</p>
  <h1>ProtLOCA</h1>
  <p class="project-lede">
    仅依赖结构的局部几何对齐，用于蛋白质同源检测——追问氨基酸类型嵌入是否总是有益，以及何时几何本身才是更好的线索。
  </p>
  <p class="project-authors">
    Yang Tan, Lirong Zheng, Bozitao Zhong, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://doi.org/10.1109/BIBM62325.2024.10822035" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://arxiv.org/abs/2406.19755" target="_blank" rel="noopener noreferrer">arXiv</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/ProtLOCA" target="_blank" rel="noopener noreferrer">代码</a>
  </div>
</header>

<section class="project-section">
  <h2>方法</h2>
  <p>
    许多结构模型默认注入氨基酸身份。ProtLOCA 表明：对结构对齐而言，序列嵌入<strong>并非总是有益</strong>——序列不相似可共享折叠，序列相似也可能结构偏离，类型特征反而稀释几何信号。
  </p>
  <p>
    因此模型用旋转等变图网络在骨架邻域上编码<strong>仅结构的局部几何</strong>，匹配时不依赖残基类型嵌入。
  </p>
</section>

<section class="project-section">
  <h2>结果</h2>
  <ul>
    <li><strong>CATH 全局匹配</strong>——基于 CATH 的域对相似性标签；在 held-out CATH-aligns 上，ProtLOCA 比常见序列与结构基线更快、更准地匹配结构一致的域。</li>
    <li><strong>局部共有结构配对</strong>——残基级点匹配，突出整体结构不同但功能相同的局部折叠（如 DNA 结合基序）；全局对齐器如 TM-align 常会错过这种局部对应。</li>
  </ul>
  <div class="project-callout">
    <p>
      两组设定共同支持：当推理目标是结构同源而非序列同一性时，宜采用几何优先表征。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 ProtLOCA，请引用：</p>
  <div class="project-cite">
{% raw %}<pre><code>@inproceedings{tan2024protloca,
  title={Protein representation learning with sequence information embedding: Does it always lead to a better performance?},
  author={Tan, Yang and Zheng, Lirong and Zhong, Bozitao and Hong, Liang and Zhou, Bingxin},
  booktitle={2024 IEEE International Conference on Bioinformatics and Biomedicine (BIBM)},
  pages={233--239},
  year={2024},
  organization={IEEE}
}</code></pre>{% endraw %}
  </div>
</section>
