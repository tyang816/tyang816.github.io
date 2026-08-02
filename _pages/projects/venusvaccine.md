---
permalink: /projects/venusvaccine/
title: VenusVaccine
layout: default
project: venusvaccine
section: overview
lang: en
alt_url: /zh/projects/venusvaccine/
author_profile: true
redirect_from:
- /pub/venusvaccine/
- /project/venusvaccine/
description: 'VenusVaccine: immunogenicity prediction with dual attention for vaccine
  target selection (ICLR 2025).'
---

<header class="project-hero">
  <p class="project-kicker">ICLR 2025</p>
  <h1>VenusVaccine</h1>
  <p class="project-lede">
    Immunogenicity prediction with dual attention enables vaccine target selection —
    multimodal sequence, structure, and physicochemical encoding for protective versus non-protective antigen classification.
  </p>
  <p class="project-authors">
    Song Li<sup>*</sup>, Yang Tan<sup>*</sup>, Song Ke, Liang Hong, Bingxin Zhou
    <br><span style="font-size:0.9em;">(* equal contribution)</span>
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://openreview.net/forum?id=hWmwL9gizZ" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusVaccine" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusvaccine.png' | relative_url }}" alt="VenusVaccine overview figure" loading="lazy">
  <figcaption>VenusVaccine classifies protective antigens via dual attention over sequence, structure, and physicochemical multimodal inputs.</figcaption>
</figure>

<section class="project-section">
  <h2>What the model does</h2>
  <p>
    VenusVaccine predicts whether an antigen is <strong>protective</strong> or <strong>non-protective</strong>, supporting vaccine target selection from protein antigens.
    Inputs combine amino-acid sequence, structure-derived tokens, and physicochemical descriptors in a single multimodal encoder with <strong>dual attention</strong>.
  </p>
  <p>
    Released checkpoints cover three antigen settings — <code>Bacteria</code>, <code>Virus</code>, and <code>Tumor</code> — so the same inference path can be pointed at the matching pathogen type.
  </p>
</section>

<section class="project-section">
  <h2>Multimodal encoding</h2>
  <p>
    Beyond the amino-acid sequence, VenusVaccine consumes structure and property streams that are extracted into a shared JSON feature format:
  </p>
  <ul>
    <li><strong>Foldseek</strong> secondary-structure sequences for local backbone geometry.</li>
    <li><strong>ESM3</strong> structure-sequence encoding of 3D conformation.</li>
    <li><strong>E-descriptors</strong> (5-D) and <strong>Z-descriptors</strong> (3-D) for physicochemical context.</li>
  </ul>
  <p>
    Pretrained protein language models provide sequence backbone features through lightweight <strong>adapters</strong>, with support for ESM, Bert, and Ankh families among others.
  </p>
</section>

<section class="project-section">
  <h2>Inference workflow</h2>
  <ol>
    <li>Obtain a PDB (experimental or predicted, e.g. ESMFold / AlphaFold).</li>
    <li>Convert structures with <code>pdb2json.py</code> to assemble sequence, Foldseek, ESM3, and E/Z features.</li>
    <li>Run <code>infer.py -i input.json -t Bacteria|Virus|Tumor</code> against the matching checkpoint.</li>
  </ol>
  <div class="project-callout">
    <p>
      Outputs include a binary protective-antigen label and a probability score, suitable for ranking candidate vaccine targets before wet-lab follow-up.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use VenusVaccine, please cite:</p>
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
