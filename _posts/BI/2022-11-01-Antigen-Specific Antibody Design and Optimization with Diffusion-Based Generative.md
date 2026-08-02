---
layout: post
title: NeurIPS-2022 Antigen-Specific Antibody Design and Optimization with Diffusion-Based Generative Models for Protein Structures
categories: [BI]
tags: [protein, antibody, diffusion, GNN]
proceedings: NeurIPS
date: 2022-11-01
lang: en
alt_url: /zh/notes/bi/Antigen-Specific-Antibody-Design-and-Optimization-with-Diffusion-Based-Generative/
permalink: /notes/bi/Antigen-Specific-Antibody-Design-and-Optimization-with-Diffusion-Based-Generative/
---

> Paper: [Antigen-Specific Antibody Design and Optimization with Diffusion-Based Generative Models for Protein Structures](https://proceedings.neurips.cc/paper_files/paper/2022/hash/3fa7d76a0dc1179f1e98d1bc62403756-Abstract-Conference.html)
>
> Code: <https://github.com/luost26/diffab>

## DiffAb: Diffusion models for joint sequence–structure design, sequence design given structure, and antibody optimization

### Abstract

Antibody–antigen binding is largely determined by the antibody CDR regions. This work introduces a generative model for CDR sequence and structure based on diffusion probabilistic models and equivariant graph neural networks. It supports joint sequence–structure co-design, sequence design given a fixed backbone, and antibody optimization, achieving competitive binding affinity under biophysical energy functions and other protein-design metrics.

### Introduction

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/fig1.png "avatar")​

An antibody comprises two heavy chains and two light chains with similar overall architecture. Six variable regions determine antigen specificity; these are the complementarity-determining regions (CDRs), denoted H1, H2, H3, L1, L2, and L3.

Traditional approaches sample protein sequences and structures from complex biophysical energy functions. They are often slow and prone to local optima.

Existing methods fail to satisfy three key design principles:

*   The model must explicitly generate CDRs matched to the antigen from the antigen’s 3D structure.
*   The model must jointly model amino-acid position and orientation (especially side-chain orientation) to capture antibody–antigen interactions.
*   Beyond de novo design, the method should optimize existing antibodies to improve binding affinity to the antigen.

The authors propose a diffusion-based generative framework that supports **joint CDR sequence–structure generation** conditioned directly on the antigen 3D structure. The model first aggregates information from the antigen and antibody framework, then iteratively updates each CDR residue’s type, position, and orientation. At the final step, a side-chain packing algorithm conditioned on predicted orientations reconstructs the CDR at atomic resolution. A key motivation for diffusion is iterative generation of CDR candidates in sequence–structure space, enabling intervention and constraints during sampling for a broader range of design tasks.

### Methods

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/fig2.png "avatar")​

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/fig3.png "avatar")​

#### Definitions and Notations

Given the antigen structure and antibody framework (Figure 2), the task is to design the CDRs on the framework. For each residue, `$s_i$` denotes amino-acid type, `$x_i\in\mathbb{R}^3$` the `$C_\alpha$` coordinates, and `$O_i\in SO(3)$` the rotation matrix describing side-chain orientation.

#### Diffusion Processes

**Multinomial Diffusion for Amino Acid Types**

At a single diffusion step at time `$t$`, the distribution over amino-acid type `$s_j^t$` is defined as follows:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm1.png "avatar")​

`$\beta_t^{type}$` controls the noise injection rate and increases with `$t$`.

Forward diffusion from initial data to an arbitrary time step:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm2.png "avatar")​

As `$t \to T$`, `$\alpha_t^{type} \to 0$`, so the data gradually approaches a uniform distribution.

The forward process does not depend on context or other inputs; it smooths the true data distribution according to the noise schedule alone.

For the generative (reverse) process at time `$t$`, the distribution over `$s_j^{t-1}$` is:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm3.png "avatar")​

`$F(R^t,C)[j]$` is the neural-network–predicted posterior, conditioned on the CDR state at the current time step and the antigen–antibody framework.

Training minimizes the KL divergence between the generative distribution and the true posterior:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm4.png "avatar")​

`$q(s_j{t-1}|s_jt,s_j^0)$` is the true forward posterior; `$p(s_j{t-1}|Rt,C)$` is the predicted reverse distribution; `$m$` is the number of residues in the CDR.

**Diffusion for Cα Coordinates**

At time step `$t$`:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm5.png "avatar")​

`$\beta_t^{pos}$` is a diffusion rate in `[0, 1]` that increases with `$t$`; `$I$` is the identity matrix (covariance of the noise), so coordinates are gradually smoothed toward a Gaussian.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm6.png "avatar")​

`$\alpha_t^\mathrm{pos}=\prod_{\tau=1}t(1-\beta_\tau^\mathrm{pos})$` measures how much the current distribution retains the initial true data.

Single-step reverse diffusion:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm7-8.png "avatar")​

`$G$` is the network that predicts the noise.

Training minimizes mean squared error (MSE) between the generative and true posterior distributions:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm9.png "avatar")​

**SO(3) Denoising for Amino Acid Orientations**

**SO(3)** (the special orthogonal group in 3D) models residue orientations, ensuring physical consistency and rotational equivariance.

Single-step forward diffusion:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm10.png "avatar")​

`$\mathrm{IG_{SO(3)}}$` is an isotropic Gaussian on SO(3); `$\alpha_t^{ori}$` controls similarity to the initial orientation and decreases with `$t$`. ScaleRot injects noise by scaling rotation angles.

As `$t \to T$`, `$\alpha_t^{ori} \to 0$`, so orientations become fully randomized and approach the uniform distribution on SO(3).

Reverse generative process:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm11.png "avatar")​

`$H$` predicts the orientation posterior; `$\beta_t^{ori}$` controls uncertainty during denoising.

Training minimizes distance between generative and true distributions, using the Frobenius norm between true and predicted orientations:

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm12.png "avatar")​

**The Overall Training Objective**

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm13.png "avatar")​

#### Parameterization with Neural Networks

`$F(R^t,C)$` predicts amino-acid types (discrete); `$G(R^t,C)$` predicts coordinate updates (continuous); `$H(R^t,C)$` predicts orientations (rotation matrices on SO(3)).

Each network takes the current time `$t$`, state `$R^t$` (intermediate diffusion state: types, coordinates, orientations), and context `$C$` (antigen and antibody framework, including framework backbone and antigen 3D structure).

1.  **Equivariance definition**

    For any rotation `$R\in SO(3)$` and translation `$r\in \mathbb{R}^3$`, the networks satisfy

    ​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/frm14-16.png "avatar")​
2.  **Implementing equivariance**

    Graph neural networks or equivariant attention modules encode geometric relationships among residues while keeping outputs consistent under rotation and translation.

#### Sampling Algorithms

Sampling generates CDR sequence and structure in three steps:

1.  **Initialization**: Sample initial states from a uniform distribution (types) or standard normal (coordinates and orientations).
2.  **Iterative denoising**: Starting at `$T$`, reverse the diffusion step by step; at each step the networks predict denoised values and update the state.
3.  **Structure reconstruction**: At `$t=0$`, use predicted coordinates and orientations with a **side-chain packing** algorithm (e.g., Rosetta packing) to place side-chain atoms and obtain a full antibody structure.

### Experiments

#### Sequence-Structure Co-design

**Data curation**: Structures from SAbDab; remove entries worse than 4 Å resolution; discard antibodies targeting non-protein antigens.

**Split**: Cluster antibodies by 50% sequence similarity on **CDR-H3**; manually select **5 clusters** as the test set (**19 antibody–antigen complexes**), including antigens from **SARS-CoV-2, MERS, influenza**, and other pathogens.

Compared with **RAbD** [Adolf-Bryfogle et al., 2018], Rosetta energy–driven antibody design; each method generates **100 samples** per CDR.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/tab1.png "avatar")​

Metrics:

*   **Amino Acid Recovery (AAR)**:

    *   **Definition**: Sequence identity between generated and reference sequences.
    *   **Role**: Measures generative fidelity.
*   **Root-Mean-Square Deviation (RMSD)**:

    *   **Definition**: RMSD of Cα atoms between generated and native structures.
    *   **Role**: Measures geometric similarity to the native structure.
*   **Improved Binding Percentage (IMP)**:

    *   **Definition**: Fraction of generated CDRs whose binding energy to the antigen is lower than the original CDR (binding energy from Rosetta InterfaceAnalyzer).
    *   **Role**: Assesses improvement in binding performance.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/fig4.png "avatar")​

*   Example generated CDR-H3 designs for SARS-CoV-2 RBD (PDB: 7chf) and their binding-energy distributions.
*   Example 1 shows the best complementarity to the antigen and the lowest binding energy (ΔG = −15.45).
*   Example 3 has a shape poorly suited to the antigen; binding energy exceeds that of the native antibody.

#### Fix-Backbone Sequence Design and Structure Prediction

*   Given the CDR backbone, design a new CDR sequence; the model can also predict CDR structure with sequence fixed.
*   Baseline **FixBB**: Rosetta-based sequence design from a fixed CDR backbone.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/tab2-3.png "avatar")​

*   On CDR H1, H2, L1, L2, and L3, DiffAb achieves very high structure-prediction accuracy (RMSD ≤ 1.5 Å).
*   On CDR-H3, accuracy is lower due to higher variability.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/fig5.png "avatar")​

Figure 5a shows prediction accuracy versus CDR-H3 length; shorter loops are predicted more accurately, and accuracy drops for CDR-H3 longer than 10 residues.

#### Antibody Optimization

Optimize existing CDR sequence and structure to strengthen antibody–antigen binding (lower binding energy) while preserving native structure and function as much as possible.

**Forward noising**: Apply `$t$` forward diffusion steps to the native CDR sequence and structure so they move toward a random distribution; **reverse denoising** from `$T-t$` yields optimized CDRs.

CDR-H3 on the test set is optimized **100 times** per antibody (**100 candidate CDRs** each).

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/tab4.png "avatar")​

Table 4 and Figure 5c show that, under Rosetta energy, optimization can yield antibodies with improved binding.

*   **Binding improvement**:

    *   With fewer optimization steps (e.g., `$t=4$`), IMP is higher, indicating substantial binding-energy gains.
*   **Structure preservation**:

    *   RMSD increases with `$t$`; more steps deviate further from the native CDR structure.
*   **Sequence preservation**:

    *   SeqID drops sharply as `$t$` increases; larger `$t$` yields greater sequence divergence from the native CDR.

#### Design Without Bound Antibody Frameworks

Design CDR sequence and structure from antigen information alone when no bound antibody framework is available, mimicking antibody–antigen binding.

*   **Inputs**:

    *   **Antigen structure**: Target antigen 3D structure (no bound framework).
    *   **Antibody template**: Framework template from **docking**.
*   **Docking**:

    *   Dock antibody template to antigen to obtain an initial complex.
    *   Tool: **HDOCK** [Yan et al., 2017].
*   **Example**:

    *   Design antibodies against SARS-CoV-2 Omicron RBD.
    *   Template: anti-influenza antibody (PDB: 3bgf).
    *   Initial CDR-H3 spans residues **A322–A590**.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DiffAb/fig6.png "avatar")​

*   **Structure**:

    *   For SARS-CoV-2 Omicron RBD, generated antibodies are structurally plausible with clear binding interfaces to the antigen.
    *   Figure **6** shows the docked complex and generated CDR-H3 binding mode.
*   **Binding energy**:

    *   Generated antibodies lack a native reference for affinity, but the binding-energy distribution falls in a reasonable range.
    *   ΔG supports the plausibility of generated designs.

***

​
