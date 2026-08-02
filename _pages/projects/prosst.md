---
permalink: /projects/prosst/
title: ProSST
layout: default
project: prosst
section: overview
lang: en
alt_url: /zh/projects/prosst/
author_profile: true
redirect_from:
- /pub/prosst/
- /project/prosst/
description: 'ProSST: Protein Language Modeling with Quantized Structure and Disentangled
  Attention (NeurIPS 2024).'
---

<header class="project-hero">
  <p class="project-kicker">NeurIPS 2024</p>
  <h1>ProSST</h1>
  <p class="project-lede">
    Protein language modeling with quantized structure and disentangled attention —
    a pretrained sequence–structure Transformer for representation learning and zero-shot mutant scoring.
  </p>
  <p class="project-authors">
    Mingchen Li<sup>*</sup>, Yang Tan<sup>*</sup>, Xinzhu Ma, Bozitao Zhong, Huiqun Yu, Ziyi Zhou, Wanli Ouyang, Bingxin Zhou, Pan Tan, Liang Hong
    <br><span style="font-size:0.9em;">(* equal contribution)</span>
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://proceedings.neurips.cc/paper_files/paper/2024/file/3ed57b293db0aab7cc30c44f45262348-Paper-Conference.pdf" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/ProSST" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/AI4Protein/ProSST-2048" target="_blank" rel="noopener noreferrer">Model</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/prosst/leaderboard/' | relative_url }}">Leaderboard</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/prosst.png' | relative_url }}" alt="ProSST overview: structure quantization and disentangled attention over amino-acid and structure tokens">
  <figcaption>ProSST couples discrete structure tokens with amino-acid sequences under a Masked LM objective and disentangled attention.</figcaption>
</figure>

<section class="project-section">
  <h2>What ProSST does</h2>
  <p>
    Most protein language models see only amino-acid sequences. Structure is often injected later — as continuous coordinates, graphs, or hand-crafted features — which can be awkward to scale and hard to fuse with sequence Transformers.
    ProSST instead turns structure into a parallel discrete token stream and pretrains a Masked Language Model that attends over both sequences jointly.
  </p>
  <p>
    The result is a family of Hugging Face checkpoints (<code>ProSST-*</code>) that support zero-shot mutant effect prediction and plug into engineering workflows such as
    <a href="https://venusfactory.bio/" target="_blank" rel="noopener noreferrer">VenusFactory2</a>.
    An MSA-aware follow-up, <a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a>, builds on the same structure-aware foundation and leads ProteinGym’s Substitution track.
  </p>
</section>

<section class="project-section">
  <h2>Structure quantization</h2>
  <p>
    From a PDB (or AlphaFold) structure, a structure quantizer maps local geometric context into discrete structure tokens — analogous to a vocabulary over structural “words.”
    Vocabularies of size <strong>20 / 128 / 512 / 1024 / 2048 / 4096</strong> are released; each residue gets one structure token aligned with its amino acid.
  </p>
  <p>
    Quantization keeps structure in the same discrete modeling regime as sequence tokens, so standard Transformer pretraining applies without continuous coordinate heads.
    In practice, <strong>ProSST-2048</strong> is the recommended default for ProteinGym-style zero-shot scoring.
  </p>
  <div class="project-cite">
<pre><code>from prosst.structure.get_sst_seq import SSTPredictor

predictor = SSTPredictor(structure_vocab_size=2048)  # 20, 128, 512, 1024, 2048, 4096
result = predictor.predict_from_pdb("example.pdb")
# → [407, 998, 1841, 1421, ...]</code></pre>
  </div>
</section>

<section class="project-section">
  <h2>Disentangled attention</h2>
  <p>
    Amino acids and structure tokens carry related but distinct signals. ProSST uses <em>disentangled attention</em> so the model can separate content interactions along the sequence modality and the structure modality, rather than collapsing everything into a single mixed token stream.
  </p>
  <p>
    Intuitively: sequence attention captures evolutionary / chemical patterns in the AA string, while structure attention routes geometric neighborhood information through the quantized tokens.
    Cross-talk still happens — the Masked LM must predict masked residues given both views — but the attention factorization keeps the two sources of evidence easier to learn and ablate.
  </p>
</section>

<section class="project-section">
  <h2>Zero-shot mutant scoring</h2>
  <p>
    Load a checkpoint with Hugging Face Transformers, tokenize the wild-type sequence together with its structure tokens, and score mutants from log-likelihood ratios (see the
    <a href="https://github.com/ai4protein/ProSST/blob/main/zero_shot/score_mutant.ipynb" target="_blank" rel="noopener noreferrer">score_mutant</a>
    notebook and ProteinGym benchmark script in the repo).
  </p>
  <div class="project-cite">
<pre><code>from transformers import AutoModelForMaskedLM, AutoTokenizer

model = AutoModelForMaskedLM.from_pretrained(
    "AI4Protein/ProSST-2048", trust_remote_code=True
)
tokenizer = AutoTokenizer.from_pretrained(
    "AI4Protein/ProSST-2048", trust_remote_code=True
)</code></pre>
  </div>
  <div class="project-callout">
    <p>
      Family checkpoints live under
      <a href="https://huggingface.co/AI4Protein?search_models=ProSST" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-*</a>
      (vocab 20–4096). ProSST is also available through the
      <a href="https://venusfactory.bio/" target="_blank" rel="noopener noreferrer">VenusFactory2</a> web server.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use ProSST, please cite:</p>
  <div class="project-cite">
<pre><code>@inproceedings{li2024prosst,
  title={ProSST: Protein Language Modeling with Quantized Structure and Disentangled Attention},
  author={Li, Mingchen and Tan, Yang and Ma, Xinzhu and Zhong, Bozitao and Yu, Huiqun and Zhou, Ziyi and Ouyang, Wanli and Zhou, Bingxin and Tan, Pan and Hong, Liang},
  booktitle={Advances in Neural Information Processing Systems},
  year={2024}
}</code></pre>
  </div>
</section>
