---
permalink: /projects/prosst/leaderboard/
title: ProSST Leaderboard
layout: default
project: prosst
section: leaderboard
lang: en
alt_url: /zh/projects/prosst/
author_profile: true
redirect_from:
- /pub/prosst/leaderboard/
- /project/prosst/leaderboard/
description: ProSST on ProteinGym — model family, structure vocabulary sizes, and
  relation to VenusREM.
---

<header class="project-hero">
  <p class="project-kicker">ProteinGym · Substitution</p>
  <h1>Leaderboard context</h1>
  <p class="project-lede">
    Official rankings live on the ProteinGym site. This page summarizes which ProSST checkpoints to use and how they relate to the MSA-enhanced follow-up VenusREM.
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym benchmarks</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/prosst/' | relative_url }}">Overview</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/AI4Protein/ProSST-2048" target="_blank" rel="noopener noreferrer">ProSST-2048</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a>
  </div>
</header>

<section class="project-section">
  <h2>Official ProteinGym board</h2>
  <p>
    ProSST is evaluated on the ProteinGym substitution (DMS) benchmark for zero-shot fitness prediction.
    Always treat
    <a href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">proteingym.org/benchmarks</a>
    as the source of truth for Spearman correlations and relative ranking — numbers there are updated by the benchmark maintainers.
  </p>
  <div class="project-callout">
    <p>
      Reproduce ProteinGym scoring with the repo script
      <code>zero_shot/proteingym_benchmark.py</code>
      and a matching structure-token directory (vocab size must match the checkpoint).
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Structure vocabulary sizes</h2>
  <p class="lb-note">
    Released Masked LM checkpoints differ only in the structure-token vocabulary size used at quantization and pretraining.
    Larger vocabs give finer geometric codes; <strong>2048</strong> is the recommended default in the project README.
  </p>
  <div class="project-table-wrap">
    <table class="project-table">
      <thead>
        <tr>
          <th>Checkpoint</th>
          <th>Structure vocab</th>
          <th>Hugging Face</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ProSST-20</td>
          <td class="num">20</td>
          <td><a href="https://huggingface.co/AI4Protein/ProSST-20" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-20</a></td>
          <td>Coarse structure codes</td>
        </tr>
        <tr>
          <td>ProSST-128</td>
          <td class="num">128</td>
          <td><a href="https://huggingface.co/AI4Protein/ProSST-128" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-128</a></td>
          <td>—</td>
        </tr>
        <tr>
          <td>ProSST-512</td>
          <td class="num">512</td>
          <td><a href="https://huggingface.co/AI4Protein/ProSST-512" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-512</a></td>
          <td>—</td>
        </tr>
        <tr>
          <td>ProSST-1024</td>
          <td class="num">1024</td>
          <td><a href="https://huggingface.co/AI4Protein/ProSST-1024" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-1024</a></td>
          <td>—</td>
        </tr>
        <tr class="is-highlight">
          <td>ProSST-2048</td>
          <td class="num">2048</td>
          <td><a href="https://huggingface.co/AI4Protein/ProSST-2048" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-2048</a></td>
          <td>Recommended default</td>
        </tr>
        <tr>
          <td>ProSST-4096</td>
          <td class="num">4096</td>
          <td><a href="https://huggingface.co/AI4Protein/ProSST-4096" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-4096</a></td>
          <td>Finest released vocab</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section class="project-section">
  <h2>Relation to VenusREM</h2>
  <p>
    <a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a> is an MSA-enhanced follow-up that builds on ProSST’s structure-aware modeling.
    On ProteinGym’s Substitution track it has been reported at approximately <strong>0.518</strong> Spearman’s ρ in the
    <a href="https://github.com/ai4protein/ProSST" target="_blank" rel="noopener noreferrer">ProSST README</a>
    project news (approximate / as stated there — confirm against the live ProteinGym board).
  </p>
  <p>
    In short: use <strong>ProSST</strong> when you want a structure-token Masked LM without MSA retrieval;
    use <strong>VenusREM</strong> when MSA retrieval is available and you care about top Substitution-benchmark performance.
    Both are integrated into
    <a href="https://venusfactory.bio/" target="_blank" rel="noopener noreferrer">VenusFactory2</a>.
  </p>
</section>
