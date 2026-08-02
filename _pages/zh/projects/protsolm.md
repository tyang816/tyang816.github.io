---
permalink: /zh/projects/protsolm/
title: ProtSolM
layout: default
project: protsolm
section: overview
lang: zh-CN
alt_url: /projects/protsolm/
author_profile: true
description: ProtSolM：多模态序列、结构与特征融合的蛋白质溶解度预测（IEEE BIBM 2024）。
redirect_from:
- /zh/project/protsolm/
---

<header class="project-hero">
  <p class="project-kicker">IEEE BIBM 2024</p>
  <h1>ProtSolM</h1>
  <p class="project-lede">
    多模态特征下的蛋白质溶解度预测——融合序列、结构与手工理化描述子，获得更可靠的溶解度标签。
  </p>
  <p class="project-authors">
    Yang Tan, Jia Zheng, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://ieeexplore.ieee.org/document/10822310" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/ProtSolM" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/datasets/tyang816/ProtSolM_ESMFold_PDB" target="_blank" rel="noopener noreferrer">数据集</a>
  </div>
</header>

<section class="project-section">
  <h2>方法</h2>
  <p>
    ProtSolM 通过三个互补视角预测蛋白质<strong>溶解度</strong>：
    序列上下文、三维结构编码，以及显式理化 / 结构特征向量
    （氨基酸组成、GRAVY、二级结构组成、氢键、暴露残基比例、pLDDT 等相关信号）。
  </p>
  <p>
    结构通路建立在预训练
    <a href="{{ '/zh/projects/protssn/' | relative_url }}">ProtSSN</a>
    检查点之上；微调推荐默认 <strong><code>k20_h512</code></strong>。
  </p>
</section>

<section class="project-section">
  <h2>结果与数据</h2>
  <p>
    评测以 <strong>PDBSol</strong> 为主，并含 <strong>ExternalTest</strong> 留出集。
    两套的 ESMFold PDB 发布于 Hugging Face
    （<a href="https://huggingface.co/datasets/tyang816/ProtSolM_ESMFold_PDB" target="_blank" rel="noopener noreferrer">tyang816/ProtSolM_ESMFold_PDB</a>）；
    标签随仓库提供于 <code>data/PDBSol</code> 与 <code>data/ExternalTest</code>。
  </p>
  <div class="project-callout">
    <p>
      特征提取（<code>get_feature.py</code>）、微调（<code>run_ft.py</code>）与评估（<code>eval.py</code>）脚本同时支持论文划分与自定义 PDB + CSV 数据。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 ProtSolM，请引用：</p>
  <div class="project-cite">
{% raw %}<pre><code>@inproceedings{tan2024protsolm,
  title={Protsolm: Protein solubility prediction with multi-modal features},
  author={Tan, Yang and Zheng, Jia and Hong, Liang and Zhou, Bingxin},
  booktitle={2024 IEEE International Conference on Bioinformatics and Biomedicine (BIBM)},
  pages={223--232},
  year={2024},
  organization={IEEE}
}</code></pre>{% endraw %}
  </div>
</section>
