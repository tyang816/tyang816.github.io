---
permalink: /projects/protsolm/
title: ProtSolM
layout: default
project: protsolm
section: overview
lang: en
alt_url: /zh/projects/protsolm/
author_profile: true
redirect_from:
- /pub/protsolm/
- /project/protsolm/
description: 'ProtSolM: protein solubility prediction with multi-modal sequence, structure,
  and feature fusion (IEEE BIBM 2024).'
---

<header class="project-hero">
  <p class="project-kicker">IEEE BIBM 2024</p>
  <h1>ProtSolM</h1>
  <p class="project-lede">
    Protein solubility prediction with multi-modal features —
    fusing sequence, structure, and hand-crafted physicochemical descriptors for more reliable solubility labels.
  </p>
  <p class="project-authors">
    Yang Tan, Jia Zheng, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://ieeexplore.ieee.org/document/10822310" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/ProtSolM" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/datasets/tyang816/ProtSolM_ESMFold_PDB" target="_blank" rel="noopener noreferrer">Dataset</a>
  </div>
</header>

<section class="project-section">
  <h2>What the model does</h2>
  <p>
    ProtSolM predicts protein <strong>solubility</strong> by combining three complementary views:
    sequence context, 3D structure encodings, and explicit physicochemical / structural feature vectors
    (amino-acid composition, GRAVY, secondary-structure composition, hydrogen bonds, exposed-residue fraction, pLDDT, and related signals).
  </p>
  <p>
    The structure pathway builds on pretrained <a href="{{ '/projects/protssn/' | relative_url }}">ProtSSN</a> checkpoints;
    the recommended default for fine-tuning is <strong><code>k20_h512</code></strong>.
  </p>
</section>

<section class="project-section">
  <h2>Benchmarks and data</h2>
  <p>
    Evaluation centers on <strong>PDBSol</strong> with an <strong>ExternalTest</strong> hold-out.
    ESMFold PDBs for both sets are released on Hugging Face
    (<a href="https://huggingface.co/datasets/tyang816/ProtSolM_ESMFold_PDB" target="_blank" rel="noopener noreferrer">tyang816/ProtSolM_ESMFold_PDB</a>);
    labels ship with the repository under <code>data/PDBSol</code> and <code>data/ExternalTest</code>.
  </p>
  <div class="project-callout">
    <p>
      Feature extraction (<code>get_feature.py</code>), fine-tuning (<code>run_ft.py</code>), and evaluation (<code>eval.py</code>) scripts support both the paper splits and custom PDB + CSV datasets.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use ProtSolM, please cite:</p>
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
