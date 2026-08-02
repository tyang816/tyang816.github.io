---
permalink: /projects/venusrem/leaderboard/
title: VenusREM Leaderboard
layout: default
project: venusrem
section: leaderboard
lang: en
alt_url: /zh/projects/venusrem/
author_profile: true
redirect_from:
- /pub/venusrem/leaderboard/
- /project/venusrem/leaderboard/
description: VenusREM results on ProteinGym Substitution and related mutation leaderboards.
---

<header class="project-hero">
  <p class="project-kicker">Leaderboard · Mutation effect prediction</p>
  <h1>VenusREM Leaderboard</h1>
  <p class="project-lede">
    Snapshot of VenusREM’s standing on ProteinGym Substitution and how it relates to ProtSSN and ProSST within the same model family.
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym (live)</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/venusrem/' | relative_url }}">Overview</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusREM" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<section class="project-section">
  <h2>ProteinGym Substitution</h2>
  <p class="lb-note">
    As of <strong>April 2025</strong>, VenusREM ranked <strong>1st</strong> on the ProteinGym DMS substitution zero-shot leaderboard
    (<a href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">proteingym.org/benchmarks</a>).
    Aggregates follow ProteinGym’s bias-corrected protocol (e.g. UniProt- and selection-type–aware Spearman), not a plain arithmetic mean over assays.
  </p>
  <div class="project-callout">
    <p>
      Official, continuously updated rankings live on <a href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym</a>.
      Treat numbers on this page as a project snapshot; always confirm against the public leaderboard before citing competitive claims.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Model family comparison</h2>
  <p>
    Conceptual comparison of modalities — not a substitute for ProteinGym’s full baseline table.
  </p>
  <div class="project-table-wrap">
    <table class="project-table">
      <thead>
        <tr>
          <th>Model</th>
          <th>Venue</th>
          <th>Primary modality</th>
          <th>MSA</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="{{ '/projects/protssn/' | relative_url }}">ProtSSN</a></td>
          <td>eLife 2025</td>
          <td>Coords + sequence (EGNN / graph)</td>
          <td>No</td>
          <td>Structure geometry; strong when MSAs are unavailable</td>
        </tr>
        <tr>
          <td><a href="{{ '/projects/prosst/' | relative_url }}">ProSST</a></td>
          <td>NeurIPS 2024</td>
          <td>Local structure tokens + sequence</td>
          <td>Optional (α=0)</td>
          <td>Disentangled sequence–structure attention</td>
        </tr>
        <tr class="is-highlight">
          <td>VenusREM</td>
          <td>ISMB/ECCB 2025</td>
          <td>Structure PLM + retrieved MSA</td>
          <td>Yes (a2m / a3m)</td>
          <td>1st ProteinGym Substitution (2025.04); VenusMutHub</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section class="project-section">
  <h2>Notable claims (context)</h2>
  <p class="lb-note">
    Approximate Spearman-scale context reported around MSA-enhanced ProSST / VenusREM family releases (~0.518 on ProteinGym-style aggregates in contemporaneous notes).
    Prefer the paper tables and the live ProteinGym CSV for exact assay-level values.
  </p>
  <div class="project-table-wrap">
    <table class="project-table">
      <thead>
        <tr>
          <th>Claim</th>
          <th>Context</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        <tr class="is-highlight">
          <td>1st place, Substitution</td>
          <td>ProteinGym zero-shot DMS substitutions</td>
          <td>News · 2025.04.19</td>
        </tr>
        <tr>
          <td>~0.518 Spearman (MSA-enhanced)</td>
          <td>Family / ProSST news mentions; VenusREM builds on this regime</td>
          <td>Release notes · paper</td>
        </tr>
        <tr>
          <td>VenusMutHub</td>
          <td>Complementary mutation-effect hub evaluations</td>
          <td>Paper / project updates</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section class="project-section">
  <h2>Related resources</h2>
  <ul>
    <li><a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM overview</a> — method, wet-lab workflow, citation</li>
    <li><a href="https://huggingface.co/datasets/AI4Protein/VenusREM" target="_blank" rel="noopener noreferrer">Dataset</a> — ProteinGym a2m / a3m homology packs</li>
    <li><a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">VenusFactory2</a> — browser scoring at venusfactory.bio</li>
  </ul>
</section>
