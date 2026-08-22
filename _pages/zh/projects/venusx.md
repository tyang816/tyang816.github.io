---
permalink: /zh/projects/venusx/
title: VenusX
layout: default
project: venusx
section: overview
lang: zh-CN
alt_url: /projects/venusx/
author_profile: true
description: VenusX：解锁蛋白质细粒度功能理解（ICLR 2026）。
redirect_from:
- /zh/pub/venusx/
- /zh/project/venusx/
---

<header class="project-hero">
  <p class="project-kicker">ICLR 2026</p>
  <h1>VenusX</h1>
  <p class="project-lede">
    大规模基准，面向残基、片段与结构域层面的细粒度蛋白质功能注释与配对。
  </p>
  <p class="project-authors">
    Yang Tan, Wenrui Gou, Bozitao Zhong, Huiqun Yu, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://openreview.net/forum?id=zcmL592XRG" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusX" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/collections/AI4Protein/venusx-dataset" target="_blank" rel="noopener noreferrer">数据集</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/venusx/leaderboard/' | relative_url }}">排行榜</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusx.png' | relative_url }}" alt="VenusX：残基、片段与成对功能任务框架" loading="lazy">
  <figcaption>VenusX 在残基、片段与成对相似性设定下评估细粒度功能理解。</figcaption>
</figure>

<section class="project-section">
  <h2>方法：评测什么</h2>
  <p>
    全局蛋白标签与全序列嵌入只讲述部分故事。VenusX 要求模型在生物学真正发生的位置——局部位点、片段与匹配的子结构——解析功能，包含三类互补任务：
  </p>
  <ul>
    <li><strong>残基级二分类</strong>——识别功能重要残基（活性位点、结合位点、保守位点、基序、结构域等）。</li>
    <li><strong>片段级多分类</strong>——在家族感知划分下为序列片段赋予生物学角色。</li>
    <li><strong>成对功能相似性评分</strong>——匹配功能相关的蛋白或片段，推理时无需显式功能标签。</li>
  </ul>
</section>

<section class="project-section">
  <h2>结果要点</h2>
  <p>
    许多基准奖励全局能力；这些信号有价值，却可能掩盖局部 grounding 不足。
    VenusX 将该差距显性化：跨家族残基任务对强预训练基线仍难，而混合家族与部分片段 / 成对设定则容易得多。
  </p>
  <div class="project-callout">
    <p>
      结构感知模型（如 SaProt）常领先困难的<strong>跨家族残基</strong>与<strong>片段 MF50</strong>；强序列 PLM（Ankh、ESM2）可主导较易的<strong>混合家族</strong>残基任务。
      成对 F50 活性位点匹配由 ESM-IF、Foldseek 等结构感知 / 对齐方法领先。
      完整表格见英文
      <a href="{{ '/projects/venusx/leaderboard/' | relative_url }}">排行榜页</a>；交互榜单见
      <a href="https://ai4protein.github.io/venusx/" target="_blank" rel="noopener noreferrer">ai4protein.github.io/venusx</a>。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>数据与相关工作</h2>
  <p>
    数据集以 Hugging Face collection 发布：
    <a href="https://huggingface.co/collections/AI4Protein/venusx-dataset" target="_blank" rel="noopener noreferrer">AI4Protein/venusx-dataset</a>。
    划分含跨家族、混合家族、MF50、F50 / P50；注释主要来自 InterPro（及 BioLiP / SAbDab 等选定设定）。
    VenusX 亦集成于
    <a href="{{ '/zh/projects/venusfactory2/' | relative_url }}">VenusFactory2</a>。
  </p>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 VenusX，请引用：</p>
  <div class="project-cite">
{% raw %}<pre><code>@inproceedings{tan2026venusx,
   title={{VenusX}: Unlocking Fine-Grained Functional Understanding of Proteins},
   author={Yang Tan and Wenrui Gou and Bozitao Zhong and Huiqun Yu and Liang Hong and Bingxin Zhou},
   booktitle={The Fourteenth International Conference on Learning Representations},
   year={2026},
   url={https://openreview.net/forum?id=zcmL592XRG}
}</code></pre>{% endraw %}
  </div>
</section>
