---
permalink: /projects/peta/
title: PETA
layout: default
project: peta
section: overview
lang: en
alt_url: /zh/projects/peta/
author_profile: true
redirect_from:
- /pub/peta/
- /project/peta/
description: 'PETA: evaluating the impact of protein transfer learning with sub-word
  tokenization on downstream applications (Journal of Cheminformatics 2024).'
---

<header class="project-hero">
  <p class="project-kicker">Journal of Cheminformatics 2024</p>
  <h1>PETA</h1>
  <p class="project-lede">
    A systematic study of how sub-word tokenization — BPE and Unigram versus per-amino-acid vocabularies — shapes protein pretraining and transfer to downstream applications.
  </p>
  <p class="project-authors">
    Yang Tan, Mingchen Li, Ziyi Zhou, Pan Tan, Huiqun Yu, Guisheng Fan, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://link.springer.com/article/10.1186/s13321-024-00884-3" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/mingchen-li/ProteinPretraining" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/peta.png' | relative_url }}" alt="PETA overview: sub-word tokenization for protein transfer learning" loading="lazy">
  <figcaption>PETA compares per-residue and sub-word protein tokenizers under matched pretraining and fine-tuning protocols.</figcaption>
</figure>

<section class="project-section">
  <h2>Why tokenization matters</h2>
  <p>
    Most protein language models tokenize sequences <strong>one amino acid at a time</strong>.
    That choice is simple and biologically natural, but it ignores a lesson from NLP: <strong>sub-word units</strong> can compress repetitive motifs, change context length, and alter what a Masked LM learns to represent.
  </p>
  <p>
    PETA asks a practical question for transfer learning: when you hold architecture and pretraining budget roughly fixed, how do BPE / Unigram vocabularies of different sizes compare to a classic per-AA tokenizer on real downstream protein tasks?
  </p>
</section>

<section class="project-section">
  <h2>What PETA provides</h2>
  <p>
    The project (also referred to as Venus-PETA in the codebase) releases a family of Masked LM checkpoints and tokenizers on Hugging Face under <code>AI4Protein/deep_*</code>, spanning:
  </p>
  <ul>
    <li><strong>Per-AA baseline</strong> — <code>AI4Protein/deep_base</code> (vocab size 33)</li>
    <li><strong>BPE</strong> — vocab sizes 50 → 3200 (<code>deep_bpe_*</code>)</li>
    <li><strong>Unigram</strong> — vocab sizes 50 → 3200 (<code>deep_unigram_*</code>)</li>
  </ul>
  <p>
    Sub-word models merge frequent residue patterns into multi-letter tokens (e.g. <code>SLG</code>, <code>AK</code>, <code>PF</code>), shortening tokenized length relative to character-level encoding while keeping special start/end tokens for Transformer training.
  </p>
  <div class="project-cite">
<pre><code>from transformers import AutoTokenizer, AutoModelForMaskedLM

tokenizer = AutoTokenizer.from_pretrained("AI4Protein/deep_bpe_3200")
model = AutoModelForMaskedLM.from_pretrained("AI4Protein/deep_bpe_3200")

sequence = "MSLGAKPFGEKKFIEIKGRRM"
print(tokenizer.tokenize(sequence))
# ['M', 'SLG', 'AK', 'PF', 'GE', 'KK', 'FI', 'EI', 'KG', 'RR', 'M']</code></pre>
  </div>
</section>

<section class="project-section">
  <h2>Downstream evaluation</h2>
  <p>
    Beyond releasing pretrained models, PETA packages a fine-tuning harness (<code>peta/train.py</code>) for transfer experiments: choose a dataset split, pooling head (e.g. attention1d), precision, and whether to fine-tune the full backbone or only the head.
    Benchmark dataset archives and split definitions live with the
    <a href="https://github.com/mingchen-li/ProteinPretraining" target="_blank" rel="noopener noreferrer">ProteinPretraining</a>
    repository.
  </p>
  <div class="project-callout">
    <p>
      The takeaway is evaluative rather than a single “best tokenizer forever”: sub-word schemes change sequence compression and inductive bias, and their effect on transfer depends on the task and vocabulary size — PETA supplies the controlled comparison to measure that trade-off.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use PETA, please cite:</p>
  <div class="project-cite">
<pre><code>@article{tan2024peta,
  title={PETA: evaluating the impact of protein transfer learning with sub-word tokenization on downstream applications},
  author={Tan, Yang and Li, Mingchen and Zhou, Ziyi and Tan, Pan and Yu, Huiqun and Fan, Guisheng and Hong, Liang},
  journal={Journal of Cheminformatics},
  volume={16},
  number={1},
  pages={92},
  year={2024},
  publisher={Springer},
  doi={10.1186/s13321-024-00884-3}
}</code></pre>
  </div>
</section>
