---
permalink: /projects/ses-adapter/
title: SES-Adapter
layout: default
project: ses-adapter
section: overview
lang: en
alt_url: /zh/projects/ses-adapter/
author_profile: true
redirect_from:
- /pub/ses-adapter/
- /project/ses-adapter/
description: 'SES-Adapter: simple, efficient, and scalable structure-aware adapters
  that boost protein language models (JCIM 2024).'
---

<header class="project-hero">
  <p class="project-kicker">Journal of Chemical Information and Modeling 2024</p>
  <h1>SES-Adapter</h1>
  <p class="project-lede">
    A simple, efficient, and scalable structure-aware adapter for protein language models —
    serialize structure, attend across modalities, and fine-tune faster with stronger downstream accuracy.
  </p>
  <p class="project-authors">
    Yang Tan, Mingchen Li, Bingxin Zhou, Bozitao Zhong, Lirong Zheng, Pan Tan, Ziyi Zhou, Huiqun Yu, Guisheng Fan, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://pubs.acs.org/doi/10.1021/acs.jcim.4c00689" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/SES-Adapter" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/ses-adapter.png' | relative_url }}" alt="SES-Adapter overview: structure serialization with cross-modal attention on PLMs" loading="lazy">
  <figcaption>SES-Adapter injects serialized structural tokens into a PLM via cross-modal attention without redesigning the backbone.</figcaption>
</figure>

<section class="project-section">
  <h2>Motivation</h2>
  <p>
    Sequence-only protein language models (PLMs) already transfer well, but many property labels — localization, function, solubility, annotation — still benefit from <strong>3D context</strong>.
    Full structure-aware pretraining is expensive; heavy fusion architectures can be hard to scale across heterogeneous PLM families.
  </p>
  <p>
    SES-Adapter treats structure as a lightweight <strong>adapter</strong>: keep the frozen (or lightly updated) PLM, serialize geometric information into a parallel token stream, and let <strong>cross-modal attention</strong> mix structure with sequence embeddings during fine-tuning.
  </p>
</section>

<section class="project-section">
  <h2>Method in brief</h2>
  <p>
    Given a PDB / AlphaFold structure aligned to the sequence, SES-Adapter:
  </p>
  <ol>
    <li><strong>Serializes</strong> local structural context into discrete structure tokens (compatible with multiple structure tokenizers, including an ESM3 structure-tokenizer path in the repo).</li>
    <li>Runs the PLM to obtain residue embeddings.</li>
    <li>Applies <strong>cross-modal attention</strong> between structure tokens and PLM states so geometry can steer representations for the downstream head.</li>
  </ol>
  <p>
    The design is intentionally <em>simple</em> (adapter-style, not a new foundation model), <em>efficient</em> (faster wall-clock fine-tuning), and <em>scalable</em> across PLM backbones and dataset formats (JSON or Hugging Face CSV configs).
  </p>
</section>

<section class="project-section">
  <h2>Benchmark scope</h2>
  <p>
    Evaluation covers <strong>9 PLMs</strong> (including ESM2, ProtBert, ProtT5, and Ankh families) × <strong>9 datasets</strong> × <strong>4 task types</strong>:
  </p>
  <ul>
    <li><strong>Localization</strong></li>
    <li><strong>Function</strong></li>
    <li><strong>Solubility</strong></li>
    <li><strong>Annotation</strong></li>
  </ul>
  <div class="project-callout">
    <p>
      Versus vanilla PLM fine-tuning, SES-Adapter improves downstream performance by up to <strong>+11%</strong> (average <strong>+3%</strong>),
      accelerates training by up to <strong>+1034%</strong> (average <strong>+362%</strong>),
      and converges roughly <strong>2×</strong> faster.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Using the code</h2>
  <p>
    The
    <a href="https://github.com/tyang816/SES-Adapter" target="_blank" rel="noopener noreferrer">tyang816/SES-Adapter</a>
    repository ships dataset configs, training scripts, and metric helpers (accuracy, F1, MCC, AUROC, Spearman, and multi-label <code>f1_max</code>).
    Point a JSON/CSV config at your train/valid/test splits (or a Hugging Face dataset id), choose a PLM backbone, and run <code>train.py</code> — see the <code>scripts/</code> folder for examples.
  </p>
  <p>
    Hardware note from the README: a <strong>24&nbsp;GB</strong> GPU (e.g. RTX 3090) is a practical baseline; memory demand mainly tracks the chosen PLM size.
  </p>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use SES-Adapter, please cite:</p>
  <div class="project-cite">
<pre><code>@article{tan2024ses-adapter,
  title={Simple, Efficient, and Scalable Structure-Aware Adapter Boosts Protein Language Models},
  author={Tan, Yang and Li, Mingchen and Zhou, Bingxin and Zhong, Bozitao and Zheng, Lirong and Tan, Pan and Zhou, Ziyi and Yu, Huiqun and Fan, Guisheng and Hong, Liang},
  journal={Journal of Chemical Information and Modeling},
  volume={64},
  number={16},
  pages={6338-6349},
  year={2024},
  publisher={American Chemical Society},
  doi={10.1021/acs.jcim.4c00689}
}</code></pre>
  </div>
</section>
