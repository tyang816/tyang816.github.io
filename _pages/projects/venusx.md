---
permalink: /projects/venusx/
title: VenusX
layout: default
project: venusx
section: overview
lang: en
alt_url: /zh/projects/venusx/
author_profile: true
redirect_from:
- /pub/venusx/
- /project/venusx/
description: 'VenusX: Unlocking Fine-Grained Functional Understanding of Proteins
  (ICLR 2026).'
---

<header class="project-hero">
  <p class="project-kicker">ICLR 2026</p>
  <h1>VenusX</h1>
  <p class="project-lede">
    A large-scale benchmark for fine-grained protein functional annotation and pairing at residue, fragment, and domain levels.
  </p>
  <p class="project-authors">
    Yang Tan, Wenrui Gou, Bozitao Zhong, Huiqun Yu, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://openreview.net/forum?id=zcmL592XRG" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusX" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/collections/AI4Protein/venusx-dataset" target="_blank" rel="noopener noreferrer">Dataset</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/venusx/leaderboard/' | relative_url }}">Leaderboard</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusx.png' | relative_url }}" alt="VenusX framework: residue, fragment, and pairwise functional tasks" loading="lazy">
  <figcaption>VenusX evaluates fine-grained functional understanding across residue, fragment, and pairwise similarity settings.</figcaption>
</figure>

<section class="project-section">
  <h2>What VenusX evaluates</h2>
  <p>
    Global protein labels and whole-sequence embeddings tell only part of the story. VenusX asks models to resolve function where biology actually happens — at local sites, fragments, and matched substructures — through three complementary tasks:
  </p>
  <ul>
    <li><strong>Residue-level binary classification</strong> — identify functionally important residues (active sites, binding sites, conserved sites, motifs, domains, and related annotations).</li>
    <li><strong>Fragment-level multi-class classification</strong> — assign biological roles to sequence fragments under family-aware splits.</li>
    <li><strong>Pairwise functional similarity scoring</strong> — match functionally related proteins or fragments without requiring explicit function labels at inference time.</li>
  </ul>
  <p>
    Together these tasks stress local resolution, transfer across families, and unsupervised functional pairing — capabilities that sequence- and structure-aware protein models often claim but rarely measure jointly.
  </p>
</section>

<section class="project-section">
  <h2>Why fine-grained understanding matters</h2>
  <p>
    Many protein benchmarks reward global competence: fold-level retrieval, whole-protein function prediction, or mutation effects aggregated over a sequence.
    Those signals are valuable, but they can mask weak local grounding. A model may retrieve the right family while missing catalytic residues, confuse motif boundaries, or fail to pair fragments that share a biochemical role.
  </p>
  <p>
    VenusX makes that gap explicit. Cross-family residue tasks remain difficult even for strong pretrained baselines, while mixed-family settings and some fragment/pairwise regimes look much easier.
    The contrast argues for evaluation that separates in-distribution annotation from out-of-family local transfer — and for models that are more robust and interpretable at subprotein resolution.
  </p>
</section>

<section class="project-section">
  <h2>Dataset &amp; splits</h2>
  <p>
    Datasets are released as a Hugging Face collection:
    <a href="https://huggingface.co/collections/AI4Protein/venusx-dataset" target="_blank" rel="noopener noreferrer">AI4Protein/venusx-dataset</a>.
    Naming follows task × annotation × split (for example, <code>VenusX_Res_Act_MF50</code> for residue-level active-site identification under a mixed-family, 50% fragment-similarity partition).
  </p>
  <ul>
    <li><strong>Cross-family</strong> — out-of-distribution residue evaluation; train and test families are disjoint.</li>
    <li><strong>Mixed-family</strong> — in-distribution residue evaluation with families shared across splits.</li>
    <li><strong>MF50</strong> — fragment multi-class splits clustered at 50% fragment similarity.</li>
    <li><strong>F50 / P50</strong> — pairwise functional similarity at fragment (F50) or protein (P50) level.</li>
  </ul>
  <p>
    Annotations draw primarily from InterPro (and related sources such as BioLiP / SAbDab for selected binding and epitope settings). Structures support sequence–structure baselines where applicable.
  </p>
</section>

<section class="project-section">
  <h2>Key findings</h2>
  <div class="project-callout">
    <p>
      Structure-aware models (e.g. SaProt) often lead difficult <strong>cross-family residue</strong> and <strong>fragment MF50</strong> settings, while strong sequence PLMs (Ankh, ESM2) can dominate easier <strong>mixed-family</strong> residue tasks.
      Pairwise F50 active-site matching is led by structure-aware / alignment methods such as ESM-IF and Foldseek.
      Full curated tables and tabs live on the <a href="{{ '/projects/venusx/leaderboard/' | relative_url }}">leaderboard page</a>; the interactive board remains at
      <a href="https://ai4protein.github.io/venusx/" target="_blank" rel="noopener noreferrer">ai4protein.github.io/venusx</a>.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Get started</h2>
  <ol>
    <li>Clone <a href="https://github.com/ai4protein/VenusX" target="_blank" rel="noopener noreferrer">ai4protein/VenusX</a> and create the conda env from <code>environment.yaml</code> (or <code>requirements.txt</code>).</li>
    <li>Download the relevant split from the <a href="https://huggingface.co/collections/AI4Protein/venusx-dataset" target="_blank" rel="noopener noreferrer">VenusX dataset collection</a>.</li>
    <li>Train residue token classifiers with <a href="https://github.com/ai4protein/VenusX/blob/main/script/example/train/train_token_cls.sh" target="_blank" rel="noopener noreferrer"><code>script/example/train/train_token_cls.sh</code></a>.</li>
    <li>Train fragment multi-class models with <a href="https://github.com/ai4protein/VenusX/blob/main/script/example/train/train_fragment_cls.sh" target="_blank" rel="noopener noreferrer"><code>script/example/train/train_fragment_cls.sh</code></a>.</li>
    <li>Compute embeddings / pairwise scores via scripts under <a href="https://github.com/ai4protein/VenusX/tree/main/script/example/embedding" target="_blank" rel="noopener noreferrer"><code>script/example/embedding</code></a>.</li>
  </ol>
  <p>
    VenusX is also integrated into <a href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">VenusFactory2</a>
    (<a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">web playground</a>).
  </p>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use VenusX, please cite:</p>
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
