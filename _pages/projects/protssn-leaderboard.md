---
permalink: /projects/protssn/leaderboard/
title: ProtSSN Leaderboard
layout: default
project: protssn
section: leaderboard
lang: en
alt_url: /zh/projects/protssn/
author_profile: true
redirect_from:
- /pub/protssn/leaderboard/
- /project/protssn/leaderboard/
description: ProtSSN model variants, ProteinGym context, and selected downstream applications.
---

<header class="project-hero">
  <p class="project-kicker">ProtSSN · Models &amp; benchmarks</p>
  <h1>Leaderboard</h1>
  <p class="project-lede">
    Checkpoint catalog, ProteinGym context for the ensemble result, and selected downstream adoptions.
    Live Substitution rankings evolve—always check ProteinGym for the current board.
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">Live ProteinGym</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/protssn/' | relative_url }}">Overview</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/tyang816/ProtSSN" target="_blank" rel="noopener noreferrer">Hugging Face</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/ProtSSN" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<section class="project-section">
  <h2>Model variants</h2>
  <p class="lb-note">
    Nine EGNN adapters on ESM2 (<code>k</code> = Cα neighbors, <code>h</code> = GNN hidden size).
    Params follow the project README. Recommended single checkpoint: <strong>k20_h512</strong>; ensemble all nine for best reported ProteinGym score.
  </p>
  <div class="project-table-wrap">
    <table class="project-table">
      <thead>
        <tr>
          <th>Version</th>
          <th>Params</th>
          <th>Checkpoint</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>k10_h512</td>
          <td class="num">148M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k10_h512.pt" target="_blank" rel="noopener noreferrer">protssn_k10_h512.pt</a></td>
        </tr>
        <tr>
          <td>k10_h768</td>
          <td class="num">160M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k10_h768.pt" target="_blank" rel="noopener noreferrer">protssn_k10_h768.pt</a></td>
        </tr>
        <tr>
          <td>k10_h1280</td>
          <td class="num">184M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k10_h1280.pt" target="_blank" rel="noopener noreferrer">protssn_k10_h1280.pt</a></td>
        </tr>
        <tr class="is-highlight">
          <td>k20_h512</td>
          <td class="num">148M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k20_h512.pt" target="_blank" rel="noopener noreferrer">protssn_k20_h512.pt</a> · recommended</td>
        </tr>
        <tr>
          <td>k20_h768</td>
          <td class="num">160M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k20_h768.pt" target="_blank" rel="noopener noreferrer">protssn_k20_h768.pt</a></td>
        </tr>
        <tr>
          <td>k20_h1280</td>
          <td class="num">184M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k20_h1280.pt" target="_blank" rel="noopener noreferrer">protssn_k20_h1280.pt</a></td>
        </tr>
        <tr>
          <td>k30_h512</td>
          <td class="num">148M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k30_h512.pt" target="_blank" rel="noopener noreferrer">protssn_k30_h512.pt</a></td>
        </tr>
        <tr>
          <td>k30_h768</td>
          <td class="num">160M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k30_h768.pt" target="_blank" rel="noopener noreferrer">protssn_k30_h768.pt</a></td>
        </tr>
        <tr>
          <td>k30_h1280</td>
          <td class="num">184M</td>
          <td><a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/protssn_k30_h1280.pt" target="_blank" rel="noopener noreferrer">protssn_k30_h1280.pt</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    Bundle download: <a href="https://huggingface.co/tyang816/ProtSSN/resolve/main/ProtSSN.zip" target="_blank" rel="noopener noreferrer">ProtSSN.zip</a>
    (all checkpoints, training history, and configs). Hub page:
    <a href="https://huggingface.co/tyang816/ProtSSN" target="_blank" rel="noopener noreferrer">huggingface.co/tyang816/ProtSSN</a>.
  </p>
</section>

<section class="project-section">
  <h2>ProteinGym</h2>
  <p class="lb-note">
    Snapshot from the project README (Dec 2023): ensemble ProtSSN Spearman ≈ <strong>0.449</strong> on ProteinGym v1.0.
    Compare current baselines on the live board.
  </p>
  <div class="project-table-wrap">
    <table class="project-table">
      <thead>
        <tr>
          <th>Setting</th>
          <th>Metric</th>
          <th>Score</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr class="is-highlight">
          <td>Ensemble ProtSSN</td>
          <td>Spearman</td>
          <td class="num">~0.449</td>
          <td>ProteinGym v1.0 · README, Dec 2023 · MSA-free</td>
        </tr>
        <tr>
          <td>Single model</td>
          <td>—</td>
          <td class="num">k20_h512</td>
          <td>Recommended default for one-GPU inference</td>
        </tr>
        <tr>
          <td>Stability sets</td>
          <td>DTm / DDG</td>
          <td class="num">paper</td>
          <td>Structure–stability correlation evaluations</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="project-callout">
    <p>
      Honest context: later methods such as
      <a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a>
      lead ProteinGym <strong>Substitution</strong> when MSA retrieval is available.
      ProtSSN remains a strong MSA-free sequence–structure baseline and a practical end-to-end scorer when alignments are shallow, costly, or undesirable.
    </p>
  </div>
  <p>
    Live leaderboard: <a href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">proteingym.org/benchmarks</a>.
  </p>
</section>

<section class="project-section">
  <h2>Selected applications</h2>
  <p class="lb-note">From the ProtSSN README applications table.</p>
  <div class="project-table-wrap">
    <table class="project-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Venue</th>
          <th>Application</th>
          <th>Reference</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="num">2026</td>
          <td><em>Nature</em></td>
          <td>Guided single-site mutagenesis (e.g. L349K) in CytoTape monomer redesign</td>
          <td><a href="https://www.nature.com/articles/s41586-026-10156-9" target="_blank" rel="noopener noreferrer">Zheng et al.</a></td>
        </tr>
        <tr>
          <td class="num">2025</td>
          <td><em>Acta Pharm. Sin. B</em></td>
          <td>Structure-aware zero-shot scorer on 905 small-scale assays (VenusMutHub)</td>
          <td><a href="https://doi.org/10.1016/j.apsb.2025.03.028" target="_blank" rel="noopener noreferrer">Zhang et al.</a></td>
        </tr>
        <tr>
          <td class="num">2025</td>
          <td>ProteinGym / VenusFactory2</td>
          <td>Zero-shot mutation scoring via leaderboard and web server</td>
          <td><a href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">VenusFactory2</a> · <a href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">arXiv:2603.27303</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
