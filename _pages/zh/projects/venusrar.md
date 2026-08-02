---
permalink: /zh/projects/venusrar/
title: VenusRAR
layout: default
project: venusrar
section: overview
lang: zh-CN
alt_url: /projects/venusrar/
author_profile: true
description: VenusRAR（Rank-and-Reason）：多智能体协作的零样本蛋白质突变预测（arXiv:2602.00197）。
redirect_from:
- /zh/project/venusrar/
---

<header class="project-hero">
  <p class="project-kicker">智能体 · arXiv 2026</p>
  <h1>VenusRAR</h1>
  <p class="project-lede">
    Rank-and-Reason——两阶段多智能体框架，将 PLM 集成排序转化为可进湿实验的突变短名单，并以生物物理链式思维审计候选。
  </p>
  <p class="project-authors">
    Yang Tan<sup>*</sup>, Yuanxi Yu<sup>*</sup>, Can Wu, Bozitao Zhong, Mingchen Li, Guisheng Fan, Jiankang Zhu, Yafeng Liang, Nanqing Dong, Liang Hong
    <br><span style="font-size:0.9em;">（* 共同一作）</span>
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://arxiv.org/abs/2602.00197" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusRAR" target="_blank" rel="noopener noreferrer">代码</a>
  </div>
</header>

<section class="project-section">
  <h2>问题</h2>
  <p>
    零样本突变预测器常给出统计上自信、却仍违背基本生物物理约束的排序。
    湿实验候选筛选往往依赖专家人工审阅——慢、主观且难扩展。
  </p>
</section>

<section class="project-section">
  <h2>方法：Rank-and-Reason</h2>
  <p>VenusRAR 将流程自动化为两阶段：</p>
  <ul>
    <li><strong>Rank 阶段</strong>——计算专家与虚拟生物学家汇总上下文感知的多模态 PLM 集成信号，ProteinGym 上 Spearman <strong>ρ ≈ 0.551</strong>（相对先前 VenusREM 级基线约 0.518）。</li>
    <li><strong>Reason 阶段</strong>——智能体专家小组以链式思维对照几何与结构约束审计候选，ProteinGym-DMS99 上 Top-5 Hit Rate 最高提升约 <strong>367%</strong>。</li>
  </ul>
  <div class="project-callout">
    <p>
      Cas12i3 核酸酶湿实验验证阳性率 <strong>46.7%</strong>（14/30），含活性提升 <strong>4.23×</strong> 与 <strong>5.05×</strong> 的新突变。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>相关工作</h2>
  <p>
    VenusRAR 位于单模型评分器之上，如
    <a href="{{ '/zh/projects/venusrem/' | relative_url }}">VenusREM</a>、
    <a href="{{ '/zh/projects/prosst/' | relative_url }}">ProSST</a>、
    <a href="{{ '/zh/projects/protssn/' | relative_url }}">ProtSSN</a>：
    先集成其信号，再由 LLM 智能体做生物物理分诊。
    部署可走
    <a href="{{ '/zh/projects/venusfactory2/' | relative_url }}">VenusFactory2</a>。
  </p>
</section>

<section class="project-section">
  <h2>引用</h2>
  <div class="project-cite">
{% raw %}<pre><code>@misc{tan2026venusrar,
  title={Rank-and-Reason: Multi-Agent Collaboration Accelerates Zero-Shot Protein Mutation Prediction},
  author={Tan, Yang and Yu, Yuanxi and Wu, Can and Zhong, Bozitao and Li, Mingchen and Fan, Guisheng and Zhu, Jiankang and Liang, Yafeng and Dong, Nanqing and Hong, Liang},
  year={2026},
  eprint={2602.00197},
  archivePrefix={arXiv},
  primaryClass={q-bio.QM},
  url={https://arxiv.org/abs/2602.00197}
}</code></pre>{% endraw %}
  </div>
</section>
