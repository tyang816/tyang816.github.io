---
permalink: /projects/venusx/leaderboard/
title: VenusX Leaderboard
layout: default
project: venusx
section: leaderboard
lang: en
alt_url: /zh/projects/venusx/
author_profile: true
redirect_from:
- /pub/venusx/leaderboard/
- /project/venusx/leaderboard/
description: VenusX benchmark leaderboard for residue, fragment, and pairwise functional
  tasks.
---

<header class="project-hero">
  <p class="project-kicker">ICLR 2026 · Benchmark</p>
  <h1>VenusX Leaderboard</h1>
  <p class="project-lede">
    Curated baseline tables for residue-level, fragment-level, and pairwise functional tasks.
    Higher is better unless noted.
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="{{ '/projects/venusx/' | relative_url }}">Overview</a>
    <a class="project-btn project-btn--ghost" href="https://ai4protein.github.io/venusx/" target="_blank" rel="noopener noreferrer">Full interactive board</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusX" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<section class="project-section">
  <p class="lb-note">
    Numbers below are transcribed from the public VenusX board
    (<a href="https://ai4protein.github.io/venusx/" target="_blank" rel="noopener noreferrer">ai4protein.github.io/venusx</a>).
    For the complete interactive view across all annotation tabs, use the full board.
  </p>

  <div data-tabs>
    <div class="project-tabs">
      <button type="button" class="is-active" data-tab="cross-act">Cross · Act</button>
      <button type="button" data-tab="cross-bind">Cross · BindI</button>
      <button type="button" data-tab="cross-evo">Cross · Evo</button>
      <button type="button" data-tab="cross-motif">Cross · Motif</button>
      <button type="button" data-tab="cross-dom">Cross · Dom</button>
      <button type="button" data-tab="mixed-act">Mixed · Act</button>
      <button type="button" data-tab="mf50-act">MF50 · Act</button>
      <button type="button" data-tab="f50-act">F50 · Act</button>
    </div>

    <div class="project-panel is-active" data-panel="cross-act">
      <h2>Residue binary · Cross-family · Active sites</h2>
      <p class="lb-note">Out-of-distribution (cross-family). Metric suite: AUPR / Precision / Recall / F1-Positive / Macro-F1.</p>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUPR</th><th>Precision</th><th>Recall</th><th>F1-Pos</th><th>Macro-F1</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.185</td><td class="num">0.241</td><td class="num">0.072</td><td class="num">0.110</td><td class="num">0.538</td></tr>
            <tr><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.166</td><td class="num">0.190</td><td class="num">0.025</td><td class="num">0.045</td><td class="num">0.507</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">0.156</td><td class="num">0.241</td><td class="num">0.014</td><td class="num">0.026</td><td class="num">0.498</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.143</td><td class="num">0.278</td><td class="num">0.060</td><td class="num">0.098</td><td class="num">0.533</td></tr>
            <tr><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.143</td><td class="num">0.126</td><td class="num">0.031</td><td class="num">0.050</td><td class="num">0.507</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.131</td><td class="num">0.131</td><td class="num">0.020</td><td class="num">0.035</td><td class="num">0.501</td></tr>
            <tr><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.114</td><td class="num">0.132</td><td class="num">0.036</td><td class="num">0.056</td><td class="num">0.510</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.101</td><td class="num">0.019</td><td class="num">0.001</td><td class="num">0.002</td><td class="num">0.485</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="cross-bind">
      <h2>Residue binary · Cross-family · Binding sites (InterPro)</h2>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUPR</th><th>Precision</th><th>Recall</th><th>F1-Pos</th><th>Macro-F1</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.230</td><td class="num">0.634</td><td class="num">0.135</td><td class="num">0.223</td><td class="num">0.599</td></tr>
            <tr><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.182</td><td class="num">0.661</td><td class="num">0.135</td><td class="num">0.224</td><td class="num">0.600</td></tr>
            <tr><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.159</td><td class="num">0.581</td><td class="num">0.108</td><td class="num">0.181</td><td class="num">0.579</td></tr>
            <tr><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.145</td><td class="num">0.437</td><td class="num">0.086</td><td class="num">0.144</td><td class="num">0.559</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.133</td><td class="num">0.525</td><td class="num">0.078</td><td class="num">0.136</td><td class="num">0.556</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.112</td><td class="num">0.416</td><td class="num">0.048</td><td class="num">0.086</td><td class="num">0.530</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">0.095</td><td class="num">0.379</td><td class="num">0.029</td><td class="num">0.053</td><td class="num">0.514</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.040</td><td class="num">0.000</td><td class="num">0.000</td><td class="num">0.000</td><td class="num">0.488</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="cross-evo">
      <h2>Residue binary · Cross-family · Conserved sites</h2>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUPR</th><th>Precision</th><th>Recall</th><th>F1-Pos</th><th>Macro-F1</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.275</td><td class="num">0.387</td><td class="num">0.169</td><td class="num">0.235</td><td class="num">0.595</td></tr>
            <tr><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.274</td><td class="num">0.456</td><td class="num">0.111</td><td class="num">0.178</td><td class="num">0.568</td></tr>
            <tr><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.272</td><td class="num">0.382</td><td class="num">0.172</td><td class="num">0.238</td><td class="num">0.596</td></tr>
            <tr><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.262</td><td class="num">0.403</td><td class="num">0.122</td><td class="num">0.187</td><td class="num">0.572</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.243</td><td class="num">0.482</td><td class="num">0.009</td><td class="num">0.017</td><td class="num">0.489</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.235</td><td class="num">0.374</td><td class="num">0.097</td><td class="num">0.154</td><td class="num">0.555</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">0.227</td><td class="num">0.452</td><td class="num">0.034</td><td class="num">0.062</td><td class="num">0.511</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.101</td><td class="num">0.176</td><td class="num">0.035</td><td class="num">0.058</td><td class="num">0.506</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="cross-motif">
      <h2>Residue binary · Cross-family · Functional motif</h2>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUPR</th><th>Precision</th><th>Recall</th><th>F1-Pos</th><th>Macro-F1</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.456</td><td class="num">0.566</td><td class="num">0.384</td><td class="num">0.457</td><td class="num">0.704</td></tr>
            <tr><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.441</td><td class="num">0.504</td><td class="num">0.350</td><td class="num">0.414</td><td class="num">0.680</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.433</td><td class="num">0.510</td><td class="num">0.432</td><td class="num">0.467</td><td class="num">0.707</td></tr>
            <tr><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.408</td><td class="num">0.485</td><td class="num">0.411</td><td class="num">0.445</td><td class="num">0.695</td></tr>
            <tr><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.394</td><td class="num">0.499</td><td class="num">0.303</td><td class="num">0.377</td><td class="num">0.662</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">0.390</td><td class="num">0.390</td><td class="num">0.365</td><td class="num">0.412</td><td class="num">0.678</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.348</td><td class="num">0.472</td><td class="num">0.231</td><td class="num">0.310</td><td class="num">0.628</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.329</td><td class="num">0.329</td><td class="num">0.453</td><td class="num">0.399</td><td class="num">0.661</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="cross-dom">
      <h2>Residue binary · Cross-family · Functional domain</h2>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUPR</th><th>Precision</th><th>Recall</th><th>F1-Pos</th><th>Macro-F1</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.564</td><td class="num">0.572</td><td class="num">0.444</td><td class="num">0.500</td><td class="num">0.632</td></tr>
            <tr><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.525</td><td class="num">0.548</td><td class="num">0.349</td><td class="num">0.427</td><td class="num">0.594</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.508</td><td class="num">0.588</td><td class="num">0.138</td><td class="num">0.223</td><td class="num">0.501</td></tr>
            <tr><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.506</td><td class="num">0.530</td><td class="num">0.367</td><td class="num">0.433</td><td class="num">0.593</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.470</td><td class="num">0.496</td><td class="num">0.360</td><td class="num">0.417</td><td class="num">0.578</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.468</td><td class="num">0.519</td><td class="num">0.087</td><td class="num">0.149</td><td class="num">0.462</td></tr>
            <tr><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.449</td><td class="num">0.494</td><td class="num">0.280</td><td class="num">0.357</td><td class="num">0.552</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="mixed-act">
      <h2>Residue binary · Mixed-family · Active sites</h2>
      <p class="lb-note">In-distribution (mixed-family). Strong sequence PLMs often lead here.</p>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUPR</th><th>Precision</th><th>Recall</th><th>F1-Pos</th><th>Macro-F1</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.873</td><td class="num">0.862</td><td class="num">0.700</td><td class="num">0.773</td><td class="num">0.883</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.855</td><td class="num">0.826</td><td class="num">0.676</td><td class="num">0.744</td><td class="num">0.868</td></tr>
            <tr><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.852</td><td class="num">0.845</td><td class="num">0.682</td><td class="num">0.755</td><td class="num">0.874</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.764</td><td class="num">0.791</td><td class="num">0.565</td><td class="num">0.659</td><td class="num">0.825</td></tr>
            <tr><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.745</td><td class="num">0.812</td><td class="num">0.511</td><td class="num">0.627</td><td class="num">0.808</td></tr>
            <tr><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.688</td><td class="num">0.818</td><td class="num">0.408</td><td class="num">0.544</td><td class="num">0.767</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.523</td><td class="num">0.735</td><td class="num">0.362</td><td class="num">0.485</td><td class="num">0.736</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">0.465</td><td class="num">0.523</td><td class="num">0.209</td><td class="num">0.329</td><td class="num">0.658</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="mf50-act">
      <h2>Fragment multi-class · MF50 · Active sites</h2>
      <p class="lb-note">Accuracy / Precision / Recall / Macro-F1 / MCC.</p>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>Macro-F1</th><th>MCC</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>SaProt (AF_650M)</td><td>Seq-Structure</td><td class="num">0.928</td><td class="num">0.830</td><td class="num">0.830</td><td class="num">0.825</td><td class="num">0.926</td></tr>
            <tr><td>GVP-GNN</td><td>Structure-only</td><td class="num">0.907</td><td class="num">0.826</td><td class="num">0.833</td><td class="num">0.822</td><td class="num">0.906</td></tr>
            <tr><td>SaProt (AF_35M)</td><td>Seq-Structure</td><td class="num">0.928</td><td class="num">0.810</td><td class="num">0.823</td><td class="num">0.807</td><td class="num">0.926</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">0.891</td><td class="num">0.773</td><td class="num">0.774</td><td class="num">0.764</td><td class="num">0.889</td></tr>
            <tr><td>Ankh (Base)</td><td>Sequence-only</td><td class="num">0.824</td><td class="num">0.661</td><td class="num">0.665</td><td class="num">0.647</td><td class="num">0.821</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">0.819</td><td class="num">0.659</td><td class="num">0.670</td><td class="num">0.647</td><td class="num">0.815</td></tr>
            <tr><td>ESM2 (t33)</td><td>Sequence-only</td><td class="num">0.814</td><td class="num">0.603</td><td class="num">0.634</td><td class="num">0.605</td><td class="num">0.810</td></tr>
            <tr><td>ProtBert</td><td>Sequence-only</td><td class="num">0.736</td><td class="num">0.618</td><td class="num">0.636</td><td class="num">0.609</td><td class="num">0.731</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="project-panel" data-panel="f50-act">
      <h2>Pairwise similarity · F50 · Active sites</h2>
      <p class="lb-note">Metric: AUC (%).</p>
      <div class="project-table-wrap">
        <table class="project-table">
          <thead>
            <tr><th>Model</th><th>Type</th><th>AUC (%)</th></tr>
          </thead>
          <tbody>
            <tr class="is-highlight"><td>ESM-IF</td><td>Seq-Structure</td><td class="num">96.5</td></tr>
            <tr><td>Foldseek (3Di-AA)</td><td>Alignment</td><td class="num">96.1</td></tr>
            <tr><td>Foldseek (3Di)</td><td>Alignment</td><td class="num">96.0</td></tr>
            <tr><td>SaProt (AF2_35M)</td><td>Seq-Structure</td><td class="num">95.8</td></tr>
            <tr><td>TM-align</td><td>Alignment</td><td class="num">94.6</td></tr>
            <tr><td>TM-VEC</td><td>Seq-Structure</td><td class="num">93.6</td></tr>
            <tr><td>ProtT5 (xl-uniref50)</td><td>Seq-Enc-Dec</td><td class="num">91.8</td></tr>
            <tr><td>ProstT5</td><td>Seq-Structure</td><td class="num">90.8</td></tr>
            <tr><td>ProtSSN (k20_h512)</td><td>Seq-Structure</td><td class="num">79.1</td></tr>
            <tr><td>ESM2 (t30)</td><td>Sequence-only</td><td class="num">69.4</td></tr>
            <tr><td>BLAST</td><td>Alignment</td><td class="num">52.9</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<section class="project-section">
  <h2>Submit / reproduce</h2>
  <p>
    Baselines and training scripts are in
    <a href="https://github.com/ai4protein/VenusX" target="_blank" rel="noopener noreferrer">ai4protein/VenusX</a>.
    Datasets:
    <a href="https://huggingface.co/collections/AI4Protein/venusx-dataset" target="_blank" rel="noopener noreferrer">Hugging Face collection</a>.
    Read the <a href="{{ '/projects/venusx/' | relative_url }}">project overview</a> for task definitions and citation.
  </p>
</section>
