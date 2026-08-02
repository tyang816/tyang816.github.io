---
layout: post
title: ICLR-2025 Boltzmann-Aligned Inverse Folding Model as a Predictor of Mutational Effects on Protein-Protein Interactions
categories: [BI]
tags: [protein, fitness-prediction, PPI]
proceedings: ICLR
date: 2025-01-23
lang: en
alt_url: /zh/notes/bi/Boltzmann-Aligned-Inverse-Folding-Model-as-a-Predictor-of-Mutational-Effects-on-Protein-Protein-Interactions/
permalink: /notes/bi/Boltzmann-Aligned-Inverse-Folding-Model-as-a-Predictor-of-Mutational-Effects-on-Protein-Protein-Interactions/
---

> Paper: [Boltzmann-Aligned Inverse Folding Model as a Predictor of Mutational Effects on Protein-Protein Interactions](https://openreview.net/forum?id=lzdFImKK8w)
>
> Code: <https://github.com/aim-uofa/BA-DDG>

## BA-DDG: Unbound States and Inverse Folding Models for PPI Binding Free Energy Changes

### Abstract

Predicting changes in binding free energy (`$\Delta\Delta G$`) in protein–protein interactions is essential for understanding and modulating these interactions, especially in drug design. Because experimental `$\Delta\Delta G$` data are scarce, existing methods focus heavily on pretraining while overlooking the importance of alignment. In this work, the authors propose Boltzmann Alignment, a technique to transfer knowledge from pretrained inverse folding models to `$\Delta\Delta G$` prediction.

They first analyze the thermodynamic definition of `$\Delta\Delta G$` and introduce the Boltzmann distribution to relate energy to the conformational distribution of proteins. The conformational distribution itself is difficult to handle directly. They therefore use Bayes’ theorem to avoid direct estimation and instead estimate `$\Delta\Delta G$` using **log-likelihoods** from protein inverse folding models. Compared with prior inverse-folding-based approaches, this method **explicitly accounts for the unbound state of the protein complex** in the `$\Delta\Delta G$` thermodynamic cycle, introducing a physical inductive bias and achieving state-of-the-art (SoTA) performance under both unsupervised and supervised settings.

On SKEMPI v2, the method reaches Spearman correlation coefficients of **0.3201** and **0.5134** under **unsupervised** and **supervised** settings, respectively, clearly exceeding previously reported bests (0.2632 and 0.4324). The authors also demonstrate utility for binding energy prediction, protein docking, and antibody optimization.

### 1 Introduction

Protein–protein interactions (PPIs) underlie diverse and critical biological functions in all organisms. High-fidelity computational modeling of these interactions is indispensable. Binding can be quantified by the binding free energy (ΔG), the difference in Gibbs free energy between bound and unbound states. Predicting changes in binding free energy (ΔΔG)—mutational effects—is crucial for controlling PPIs. Accurate `$\Delta\Delta G$` prediction helps identify mutations that strengthen or weaken binding, guiding efficient protein design, accelerating therapeutic development, and deepening mechanistic understanding.

Deep learning has shown great promise for protein modeling and has shifted the paradigm for computational `$\Delta\Delta G$` prediction. Progress notwithstanding, the task remains severely limited by **scarce labeled experimental data**. **Pretraining** on large unlabeled corpora has therefore become a dominant strategy. Recent work observes that structure prediction and inverse folding models can implicitly capture protein energy landscapes.

Pretraining-based pipelines are effective, but they often rely on supervised fine-tuning (SFT) alone and neglect alignment. SFT can cause catastrophic forgetting of general knowledge from unsupervised pretraining, leaving room to improve knowledge transfer. In other biological tasks, researchers have adapted large language model (LLM) alignment techniques such as direct preference optimization (DPO) to inject experimental adaptivity into generative models. The authors argue that applying these alignment methods directly to `$\Delta\Delta G$` prediction is insufficient because they **lack the physical inductive bias required for energy-related biological tasks**.

This paper introduces **Boltzmann Alignment**, a new technique to transfer knowledge from pretrained inverse folding models to `$\Delta\Delta G$` prediction.

- The method analyzes the thermodynamic definition of `$\Delta\Delta G$` and uses the **Boltzmann distribution** to connect energy with conformational distributions, highlighting the potential of pretrained probabilistic models.
- Because conformational distributions are hard to evaluate directly, the authors use **Bayes’ theorem** to avoid direct estimation and estimate `$\Delta\Delta G$` via **log-likelihoods** from inverse folding models.
- This derivation offers a principled explanation for the prior observation that inverse folding log-likelihoods correlate strongly with binding energy.
- Unlike earlier inverse folding approaches, the method **explicitly models the unbound state of the complex**, aligning fine-tuning of inverse folding models with statistical thermodynamics.

Contributions:

- **Boltzmann Alignment** introduces physical inductive bias via the Boltzmann distribution and a thermodynamic cycle, transferring pretrained inverse folding knowledge to `$\Delta\Delta G$` prediction.
- On SKEMPI v2, the method achieves SoTA **unsupervised** and **supervised** Spearman correlations of **0.3201** and **0.5134**, surpassing prior reported values of 0.2632 and 0.4324.
- Ablations show gains over previous inverse-folding-based methods and other alignment techniques.
- The approach extends to **binding energy prediction, protein–protein docking, and antibody optimization**.

### 3 Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### 3.1 Boltzmann Alignment

For a complex of chains A and B, binding free energy `$\Delta G$` is the difference between Gibbs free energies of the bound state `$G_{bnd}$` and unbound state `$G_{unbnd}$`. Under the **Boltzmann distribution**, `$\Delta G$` can be written as:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm2.png" alt="avatar" style="zoom:100%;" /></div>

Here $k_{B}$ is Boltzmann’s constant and T is temperature. `$p_{bnd}$` and `$p_{unbnd}$` are the conditional probabilities that conformations lie in the bound (`$\mathcal{X}_{bnd}$`) and unbound (`$\mathcal{X}_{unbnd}$`) ensembles given sequence `$S_{AB}$`, i.e., `$p(\mathcal{X}_{bnd}|S_{AB})$` and `$p(\mathcal{X}_{unbnd}|S_{AB})$`.

Direct estimation of `$p(\mathcal{X}|S)$` is extremely difficult because current structure predictors do not provide faithful probabilistic interpretations. The authors apply **Bayes’ theorem**:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm3.png" alt="avatar" style="zoom:100%;" /></div>

Substituting into the expression for `$\Delta G$` cancels sequence-dependent terms such as p(SAB), linking `$\Delta G$` to **sequence-conditional probabilities** `$p(S|\mathcal{X})$` that inverse folding models predict directly.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm4-5.png" alt="avatar" style="zoom:100%;" /></div>

ΔΔG is defined as the difference between mutant (mut) and wild-type (wt) `$\Delta G$`: `$\Delta\Delta G = \Delta G^{mut} - \Delta G^{wt}$`.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm6-7.png" alt="avatar" style="zoom:100%;" /></div>

They further assume **backbone structures are unchanged by mutation**, i.e., `$\mathcal{X}_{bnd}^{mut} \approx \mathcal{X}_{bnd}^{wt}$` and `$\mathcal{X}_{unbnd}^{mut} \approx \mathcal{X}_{unbnd}^{wt}$`. Under this assumption, structure-related terms `$p(\mathcal{X})$` cancel, yielding a `$\Delta\Delta G$` expression that depends only on sequence likelihoods:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm8.png" alt="avatar" style="zoom:100%;" /></div>

#### 3.2 Probability Estimation

- **Bound state probability**: In `$\Delta\Delta G$` prediction, the bound backbone `$\mathcal{X}_{bnd}$` is usually known. The complex structure and sequence can be fed to an inverse folding model to evaluate `$p_{\theta}(S_{AB}|\mathcal{X}_{bnd})$`.

- **Unbound state probability**: Unbound structures are typically unspecified. The authors approximate the unbound state as chains A and B being far apart with negligible interaction. The probability is approximated as the **product of single-chain probabilities**—evaluate each chain independently and multiply:

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm9.png" alt="avatar" style="zoom:100%;" /></div>

- **Unsupervised BA-Cycle**: Plugging these estimates into the final `$\Delta\Delta G$` formula yields a training-free (**unsupervised**) scorer named **BA-Cycle**, using a pretrained inverse folding model (e.g., ProteinMPNN).

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm10.png" alt="avatar" style="zoom:100%;" /></div>

- **Comparison with prior work**: Prior inverse-folding `$\Delta\Delta G$` predictors did not explicitly include the unbound term `$p_{unbnd}$` in the thermodynamic cycle and only compared bound-state probability differences.

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm11.png" alt="avatar" style="zoom:100%;" /></div>

#### 3.3 Supervision

**Training objective**: BA-DDG minimizes error against labeled `$\Delta\Delta G$` while **preserving distributional knowledge from pretraining**.

**Loss**: The authors use a two-term loss `$L_{Boltzmann} $`:

1. **Prediction error**: Measures gap between predictions and labels.
2. **Distribution penalty**: KL divergence between the fine-tuned model `$p_{\theta}$` and the reference pretrained model `$p_{ref}$`, mitigating **catastrophic forgetting** during fine-tuning.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm12.png" alt="avatar" style="zoom:100%;" /></div>

During training, inverse folding parameters `$\theta$` and the physical term `$k_B T$` are optimized jointly.

### 4 Experiments

#### 4.1 Benchmark

- **Dataset**: **SKEMPI v2**, with 7,085 amino-acid mutations and thermodynamic labels across 348 protein complexes. To avoid leakage, the authors use **3-fold cross-validation split by structure**, ensuring unique complexes per fold.
- **Metrics**: Seven metrics in total.
  - **Five global metrics**: Pearson, Spearman, RMSE, MAE, and AUROC.
  - **Two per-structure metrics**: Group mutations by parent structure, compute Pearson and Spearman per group, and report the mean—often more relevant in practice.
- **Baselines**: BA-Cycle (unsupervised) and BA-DDG (supervised) are compared against strong prior methods.
  - **Unsupervised baselines**: Classical empirical energy functions (Rosetta, FoldX), sequence/evolution models (ESM-1v, MSA Transformer), and structure-pretrained models (ESM-IF, RDE-Linear).
  - **Supervised baselines**: End-to-end models (DDGPred) and pretrained models fine-tuned on `$\Delta\Delta G$` labels (RDE-Network, Prompt-DDG, ProMIM).

#### 4.2 Main Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/tab1.png" alt="avatar" style="zoom:100%;" /></div>

**Performance**: Table 1 shows **BA-DDG outperforming all baselines on every metric**. Gains are especially large on per-structure correlation, suggesting more reliable practical use. The unsupervised **BA-Cycle** matches classical empirical energy functions and exceeds all other unsupervised learning baselines.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/fig2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/fig3.png" alt="avatar" style="zoom:100%;" /></div>

**Visualization**: Scatter plots (Fig. 2) and distribution plots (Fig. 3) show BA-DDG with better overall correlation and per-structure performance than representative methods such as RDE-Network and Prompt-DDG.

#### 4.3 Ablation Study

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/tab2.png" alt="avatar" style="zoom:100%;" /></div>

- **Thermodynamic cycle**: Table 2 compares unsupervised BA-Cycle to conventional inverse folding usage without the cycle (ignoring unbound `$p_{unbnd}$`, e.g., raw ProteinMPNN). **BA-Cycle clearly wins**, showing that explicit thermodynamic cycling matters.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/tab3.png" alt="avatar" style="zoom:100%;" /></div>

- **Supervision**: Table 3 compares Boltzmann supervision with SFT and DPO. **Boltzmann supervision is best across metrics**, validating the approach.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/tab4.png" alt="avatar" style="zoom:100%;" /></div>

- **Predicted structures at inference**: In practice, only sequences may be available. Using AlphaFold3-predicted structures slightly lowers performance (Table 4), but the drop is small, indicating the method **does not strictly require crystal structures** when accurate predicted structures exist.

#### 4.4 Application

##### 4.4.1 Binding Energy Prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/fig4.png" alt="avatar" style="zoom:100%;" /></div>

- **Setup**: Antibody design is critical for cancer, infection, and related therapies. Although the paper does not fully justify cancellation of `$p(\mathcal{X}_{bnd})$` and `$p(\mathcal{X}_{unbnd})$` in Eq. (5), BA-DDG can approximate absolute binding energy (`$\Delta G$`) as:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/frm13.png" alt="avatar" style="zoom:100%;" /></div>

- **Experiment**: Evaluated on an antibody–antigen binding benchmark from DSMBind, on an SAbDab subset of 566 complexes with binding energy labels.

- **Result**: Fig. 4 (left): **BA-DDG reaches Spearman 0.385, outperforming other methods**.

##### 4.4.2 Rigid Protein-Protein Docking

- **Setup**: Docking first generates candidate poses, then selects the most credible. BA-DDG approximates binding free energy (`$\Delta G$`) and can rank poses in diffusion docking. **Lower `$\Delta G$` favors the bound over unbound state and indicates higher-confidence poses**.
- **Experiment**: BA-DDG replaces DiffDock-PP’s confidence model for pose selection in a diffusion docking pipeline.
- **Result**: Fig. 4 (right): Integrating BA-DDG provides a robust way to pick plausible poses; it identifies correct solutions (C-RMSD &lt; 5Å) more effectively than DiffDock-PP’s native confidence model.

##### 4.4.3 Antibody Optimization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BA-DDG/tab5.png" alt="avatar" style="zoom:100%;" /></div>

- **Setup**: BA-DDG is also a structure-based designer like ProteinMPNN. The authors test whether `$\Delta\Delta G$` fine-tuning biases sequences toward higher affinity on a **SARS-CoV-2** human antibody case: 5 beneficial single-point mutations were found among 494 candidates for stronger neutralization. They compare original ProteinMPNN vs. fine-tuned BA-DDG on **normalized per-amino-acid perplexity** and **preference probabilities** for all 494 mutations.
- **Result**: Table 5: For the five known beneficial mutations, **BA-DDG tends to assign lower perplexity and higher preference probability than ProteinMPNN**, suggesting `$\Delta\Delta G$` fine-tuning steers design toward higher-affinity, better-neutralizing antibodies; multi-point results support the same trend.

<hr align="left" color="#987cb9" size="1">
