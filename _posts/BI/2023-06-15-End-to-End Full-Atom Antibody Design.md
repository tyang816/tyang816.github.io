---
layout: post
title: ICML-2023 End-to-End Full-Atom Antibody Design
categories: [BI]
tags: [protein, antibody, GNN]
proceedings: ICML
date: 2023-06-15
lang: en
alt_url: /zh/notes/bi/End-to-End-Full-Atom-Antibody-Design/
permalink: /notes/bi/End-to-End-Full-Atom-Antibody-Design/
redirect_from:
  - "/bi/End-to-End-Full-Atom-Antibody-Design/"
  - "/BI/End-to-End-Full-Atom-Antibody-Design/"
---

> Paper: [End-to-End Full-Atom Antibody Design](https://proceedings.mlr.press/v202/kong23c.html)
>
> Code: <https://github.com/THUNLP-MT/dyMEAN>

## DyMEAN: End-to-end shadow paratope for bridging antibody–antigen design

### Abstract

This work introduces **dynamic Multi-channel Equivariant grAph Network (dyMEAN)**, an **end-to-end**, **full-atom** antibody design method. The main goal is to improve **learning-based antibody design** by addressing two central limitations:

1.  **Limitations of prior methods**:
    *   Existing learning approaches often focus on isolated subtasks in the design pipeline, yielding suboptimal overall solutions or excessive resource use.
    *   Many methods either ignore antibody **framework regions** or **side chains**, and thus fail to capture complete **full-atom geometric** information.
2.  **dyMEAN’s approach**:
    *   **End-to-end modeling**: dyMEAN directly handles inputs with only an **antigen epitope** and an **incomplete antibody sequence**, without a multi-stage pipeline.
    *   **Structural initialization**: structure knowledge is used for an initial structural guess.
    *   **Shadow paratope**: a shadow paratope bridges antigen–antibody interaction information.
    *   **Adaptive multi-channel equivariant encoder**: during full-atom modeling, this encoder adapts to varying **atom counts** across residues while jointly updating **1D sequence and 3D structure**.
    *   **Final docking**: antigen–antibody binding structure is predicted by aligning the shadow paratope.
3.  **Experimental validation**:
    *   Experiments on **epitope-binding CDR-H3 design**, **complex structure prediction**, and **affinity optimization** show the benefits of dyMEAN’s **end-to-end framework and full-atom modeling**.

### Introduction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/fig1.png" alt="avatar" style /></div>

This paper studies **antibody design**, which is important in **therapeutics** and **biology**. Antibody design remains highly challenging because of the high variability of **complementarity-determining regions (CDRs)** and the complexity of antigen–antibody interaction rules.

Although computational methods have made progress, two core issues persist:

1.  **Many pipelines are multi-stage** (structure prediction, docking, CDR generation, side-chain packing), lacking global optimization and leading to suboptimal results or high compute cost.
2.  **Full-atom modeling is often missing**, so antigen–antibody complex structures are described imprecisely.

The authors propose **dyMEAN (dynamic Multi-channel Equivariant grAph Network)**, an **end-to-end full-atom antibody design model**, to address these issues. From an **antigen epitope** and an **incomplete antibody sequence**, the model generates a complete **1D sequence and 3D structure**, and improves design accuracy and **docking** via a **shadow paratope** mechanism and an **E(3)-equivariant** encoder.

**Limitations of existing computational approaches**

1.  Energy-based methods (e.g., Rosetta) optimize antibody structures with statistical energy functions, but expressiveness is limited and antigen–antibody interactions are hard to model accurately.
2.  **Language models (LMs)** trained on antibody **1D sequence** alone lack **3D geometry**, which restricts sequence generation quality.
3.  Deep generative joint sequence–structure design can generate **CDR sequence and 3D structure** together, but still suffers from incomplete contextual modeling.

To overcome these issues, **dyMEAN** is designed with the following properties:

1.  It generates the **full antibody sequence and 3D structure** directly from an **antigen epitope** and **incomplete antibody sequence**, **without a multi-stage pipeline**, reducing error accumulation and compute.

2.  It builds an **initial structure for framework regions** using **conserved residues**.

3.  A **shadow paratope** is created near the epitope such that it:

    *   **Shares** the **hidden states** of the true CDR-H3.
    *   **Optimizes coordinates independently**, so **antibody–antigen interactions do not depend on the initial antibody pose**.

4.  Adaptive multi-channel equivariant encoder

    *   Uses **E(3)-equivariant** updates for **1D sequence and 3D structure** jointly.

    *   Handles **variable atom counts per residue** for **full-atom modeling**.

5.  **Docking** is performed by aligning the real CDR-H3 to the shadow paratope, yielding the final antigen–antibody complex.

### Notations and Definitions

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/fig2.png" alt="avatar" style /></div>

An **antibody** is a **Y-shaped symmetric protein** built from two identical chains, each comprising:

*   **Heavy chain (VH)**
*   **Light chain (VL)**

Each chain contains **multiple constant domains** and **one variable domain**:

*   **Constant domains** are conserved across antibodies.
*   **Variable domains** mediate **antigen-specific binding** and are the main focus of design.

We denote the **variable domains of the heavy (VH) and light (VL) chains** as `$V_H$` and `$V_L$`. Each variable domain alternates **four framework regions (FRs)** and **three complementarity-determining regions (CDRs)**.

The antibody binding site is the **paratope**; the antigen binding site is the **epitope**. Here, **paratope** refers specifically to **CDR-H3**, which dominates antigen binding.

1.  Graph representations of antibody and antigen

    1.  **Epitope graph**: `$G_E(V_E,E_E)$`
    2.  **Antibody graph**: `$G_A(V_A,E_A)$`

2.  Residue features

    1.  Amino acid type `$s_i$`: the residue identity (e.g., Ala, Ser, Glu).
    2.  Multi-channel 3D coordinate matrix `$X_i\in \mathbb{R}^{3\times c_i}$`
        1.  `$c_i$` is the number of atoms in the residue (backbone and side chain).
        2.  Because side chains differ, `$c_i$` is not fixed across amino acids.
        3.  dyMEAN uses a **multi-channel representation** to handle variable atom counts.

3.  Graph edge construction

    1.  dyMEAN builds edges with **k-nearest neighbors (kNN)** using the minimum pairwise atom distance between residues `$v_i$` and `$v_j$`:

        <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm1.png" alt="avatar" style /></div>

        where *p* and *q* index atom coordinates.

4.  Three global nodes are added on the heavy chain, light chain, and antigen epitope.

#### Task Definition

Given **antigen epitope + partial antibody sequence**, predict the **full CDR-H3 sequence and 3D structure** such that the result **docks correctly** to the epitope.

### Our Method: dyMEAN

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/fig3.png" alt="avatar" style /></div>

**Each vertex** (from epitope graph `$G_E$`, antibody graph `$G_A$`, and paratope subgraph `$G_P$`) carries:

*   An **invariant vector** `$h_i\in\mathbb{R}^d$`
*   An **equivariant coordinate matrix** `$X_i\in\mathbb{R}^{3\times c_i}$`

The overall pipeline is:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm2-6.png" alt="avatar" style /></div>

where:

*   **SI (Structural Initialization)**:
    *   From the known **incomplete antibody sequence**, predict initial coordinates `$X_i^{(0)}$` and hidden states `$h_i^{(0)}$`.
*   **SP (Shadow Paratope)**:
    *   Insert a **shadow paratope** `$G_S$` between **epitope** and **paratope**; it shares CDR-H3 hidden states, connects antigen and antibody, and anchors docking.
*   **AME (Adaptive Multi-channel Encoder)**:
    *   Iteratively update **hidden states** `$h_i$` and coordinates `$X_i$` for all vertices.
*   **Prediction**:
    *   Compute the **CDR-H3 amino acid distribution** `$p_i$`.
*   **Docking**:
    *   Complete antibody–antigen binding by **aligning the shadow paratope** `$G_S$`.

#### Structural Initialization with Conserved Residues

In the input, antibody sequence `$\{s_i\}_{i\in V_A,i\notin V_P}$` **lacks CDR-H3** and **3D structure is unknown**. dyMEAN must initialize **antibody hidden states** `$h_i^{(0)}$` and **3D coordinates** `$X_i^{(0)}$`.

**Hidden state initialization** `$h_i^{(0)}$`

Each residue hidden state combines amino acid type and position encoding: `$h_i^{(0)}=f(s_i,r_i)=f_{s_i}+f_{r_i}$`. Missing CDR positions use a special **[MASK]** token.

**3D coordinate initialization** `$X_i^{(0)}$`

Framework regions (FRs) are typically conserved. dyMEAN initializes **3D coordinates** (`$X_i^{(0)}$`) from **framework coordinates in known antibody structures** as follows:

1.  **Align conserved residues**:
    *   Compare the **input antibody sequence** to sequences in a structure database and identify residues conserved across many antibodies.
    *   **Antibody numbering (e.g., IMGT)** is used to find residues with **consistent type in more than 95%** of antibodies.
2.  **Kabsch alignment**:
    *   **Kabsch algorithm** aligns **backbone atoms** of conserved framework residues to obtain average **3D coordinates** for initialization.
3.  **Interpolation and extension**:
    *   Non-conserved framework residues get coordinates by **linear interpolation** between conserved ones; terminal residues use **outward linear extrapolation** from the nearest conserved residue.

**Coordinate normalization**

After initialization, dyMEAN **normalizes coordinates**:

*   **3D translation** so coordinates have **zero mean**.
*   **Per-dimension variance scaling** for consistent scale across antibodies.

This yields a **reasonable initial guess** for **framework regions**, supporting subsequent **shadow paratope** construction and **multi-channel message passing**.

#### E(3)-Invariant Attachment of Shadow Paratope

To strengthen antigen–antibody information exchange, dyMEAN attaches a **Shadow Paratope** near the epitope—a pseudo paratope copy with two roles:

1.  **E(3)-invariant information transfer**: the shadow paratope shares hidden states `$h_i$` and topology with the true paratope, enabling exchange without relying on the antibody’s initial pose.
2.  **Docking anchor**: the shadow paratope is central to docking (see §4.4).

Because only **E(3)-invariant information (hidden states `$h_i$`) is shared—not coordinates `$X_i$`**—3D coordinates and final docked structures are insensitive to initial antibody placement, improving robustness.

**Constructing the shadow paratope**

The shadow paratope is a subgraph `$G_s=(V_S,E_S)$` where:

*   `$V_S$` contains shadow paratope residues.
*   `$E_S$` has two parts:
    *   **Internal edges**: copied from the original paratope.
    *   **External edges**: connect shadow paratope to the epitope.

For epitope residue `$v_i \in V_E$` and shadow paratope vertex `$v_j \in V_S$`, external edges use **kNN distance**:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm7.png" alt="avatar" style /></div>

where `$\varphi_e$` is an **MLP (Multi-Layer Perceptron)** that learns distance features.

**Initializing the shadow paratope**

*   **Hidden vectors** `$h_i$` are copied from the true paratope.
*   **Coordinates** `$X_i$` are drawn from a **standard Gaussian `$N(0, I)$` near the epitope center**, adding early-training randomness without breaking E(3) invariance.

Finally, `$G_S$` is **merged** into `$G_E$` as `$G_E \cup G_S$` for message passing and docking.

#### Adaptive Multi-Channel Equivariant Encoder

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm8-11.png" alt="avatar" style /></div>

**Geometric Relation Extractor** *`$T_R$`*

1.  Channel-wise Euclidean distances: for `$X_i\in\mathbb{R}^{3\times c_i}$` and `$X_j\in\mathbb{R}^{3\times c_j}$`, each channel (atom) uses `$D_{ij}(p, q) = ||X_i(:, p) - X_j(:, q)||_2$`.

2.  Weighted correlation:

    <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm12.png" alt="avatar" style /></div>

    with `$w_{i}\in\mathbb{R}^{c_i\times 1}$`, `$w_{j}\in\mathbb{R}^{c_j\times 1}$`, `$A_{i}\in\mathbb{R}^{c_i\times d}$`, and `$A_{j}\in\mathbb{R}^{c_j\times d}$`.

    The output `$R_{i,j}\in\mathbb{R}^{d\times d}$` has fixed dimension for consistent inputs.

**Geometric Message Scaler**, `$T_S$`

`$T_S$` **scales geometric information** so coordinates from different residues fuse effectively. For coordinates `$X\in\mathbb{R}^{3\times c}$` and non-geometric `$s=\phi_x(m_{ij})\in\mathbb{R}^C$` (C is an upper bound on channel count), `$T_S(X,s)$` is:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm13.png" alt="avatar" style /></div>

where `$s'\in\mathbb{R}^c$` is mean-pooled *s*, window size C−c+1, stride 1, and diag(·) takes matrix diagonals.

**Information exchange between `$G_E$` and `$G_A$`**

**Epitope graph `$G_E$`** and **antibody graph `$G_A$`** are **not directly connected initially**, yet the model must exchange information for **antibody–antigen docking**. dyMEAN routes messages through the **shadow paratope (`$G_S$`)**.

1.  **Stage 1 (Antibody graph `$G_A$`)**
    *   Run **one layer of AME** on **`$G_A$`**.
    *   **Copy hidden vectors `$h_i$` from paratope `$G_P$` to shadow paratope `$G_S$`**, so `$G_S$` carries paratope information.
2.  **Stage 2 (Epitope graph `$G_E$` and shadow paratope `$G_S$`)**
    *   Run **one layer of AME** on **`$G_E \cup G_S$`** to exchange epitope and shadow paratope information.
    *   **Copy hidden vectors from `$G_S$` back to paratope `$G_P$`**, injecting epitope context into the antibody.
3.  **Alternating iterations**
    *   Repeat the two stages for **L layers**, gradually converging cross-molecule information.
    *   Then run **one extra AME layer on `$G_A$`** to propagate updates through the full antibody.

The **Geometric Relation Extractor (TR)** and **Geometric Message Scaler (TS)** satisfy:

*   **TR is `$E(3)$`-invariant**: geometric relations are unchanged under rotation, translation, and reflection.
*   **TS is `$O(3)$`-equivariant**: message passing respects rotations.
*   **Exchange `$G_E ↔ G_A$` via `$G_S$` is `$E(3)$`-invariant**.

#### Prediction, Docking and Training Losses

**Prediction**

dyMEAN uses **progressive full-shot decoding** to predict **CDR-H3 1D sequence** and **3D structure**, refined over T iterations:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm14.png" alt="avatar" style /></div>

An **MLP** predicts CDR-H3 amino acids:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm15.png" alt="avatar" style /></div>

Hidden states `$h_i^{(t)}$` update each round:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm16.png" alt="avatar" style /></div>

where `$f(s_i,r_i)=f_{s_i}+f_{r_i}$` embeds sequence position, `$p_i^{(t)}(j)$` is the probability of amino acid *j* at CDR-H3 position *i*, and `$\phi_d(h_i^{(t)})$` is a memory term.

After each iteration, dyMEAN **recomputes edges** between **`$G_A$` and `$G_E$`** to refresh topology.

**Docking**

After the **final iteration**, dyMEAN docks with the **Kabsch algorithm (Kabsch, 1976)**:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm17-18.png" alt="avatar" style /></div>

*   Shadow paratope `$G_S$` provides a **reference pose for predicted CDR-H3**.

*   **Kabsch alignment** moves CDR-H3 (`$V_P$`) onto shadow paratope (`$V_S$`) to optimize the complex.

**Loss function**

**Cross-entropy** supervises CDR-H3 sequence prediction:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm19.png" alt="avatar" style /></div>

**Huber loss** trains **final 3D coordinates**:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm20.png" alt="avatar" style /></div>

A **chemical bond-length** term is added:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm21.png" alt="avatar" style /></div>

Total structure loss is the sum of coordinate and bond terms.

For **docking quality**, dyMEAN adds **shadow paratope coordinate loss** and **external distance loss**:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/frm22-23.png" alt="avatar" style /></div>

Final docking loss is the sum of both.

### Experiments

dyMEAN is trained on **SAbDab** with **PyTorch distributed** training.

### **2.1. Training hyperparameters**

**Training details**

*   **Optimizer**: Adam
*   **Initial learning rate**: `$1 \times 10^{-3}$`, **exponential decay** to `$1 \times 10^{-4}$`.
*   **Batch size**: 16
*   **Epochs**:
    *   **CDR-H3 design & affinity optimization**: 200
    *   **Complex structure prediction**: 250
*   **Learning rate**: cosine schedule to **reduce overfitting**.

**Masking**

Because CDR-H3 is the main variable region, training uses **dynamic masking**:

*   **Early training**: **90%** of paratope residues remain **unmasked**.
*   **Later training**: masking increases until **all paratope residues are masked**, so the model can generate sequences under missing residues.

**Dataset and baselines**

*   The **48 epitope residues closest to the antibody** are extracted, sufficient to cover binding residues.

*   Because prior **end-to-end full-atom antibody design** methods were scarce, the authors compare to:

    *   **IgFold** (Ruffolo & Gray, 2022): AlphaFold-style antibody structure prediction.
    *   **HDock** (Yan et al., 2020): knowledge-based docking scores.
    *   **RosettaAb** (Adolf-Bryfogle et al., 2018): statistical energy optimization of sequence and structure.
    *   **MEAN** (Kong et al., 2022): equivariant attention graph networks for CDR-H3 generation.
    *   **Diffab** (Luo et al., 2022): diffusion-based CDR generation with side-chain orientation.
    *   **HERN** (Jin et al., 2022): end-to-end design without separate structure prediction, docking, or side-chain packing, but without framework modeling.

#### Epitope-binding CDR-H3 Generation

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/tab1.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/fig4.png" alt="avatar" style /></div>

**Goal**: CDR-H3 is the **most variable** region and sets **binding specificity and affinity** (Raybould et al., 2019). The task is to predict **CDR-H3 1D sequence and 3D structure**.

**Metrics**

*   **Amino Acid Recovery (AAR)**: overlap between generated and native sequence.
*   **Contact AAR (CAAR)**: AAR for CDR-H3 residues within 6.6Å of the epitope (Ramaraj et al., 2012).
*   **TM-score**: global similarity of predicted vs. native CDR-H3 structure (Zhang & Skolnick, 2004).
*   **Local Distance Difference Test (lDDT)**: similarity from **inter-atomic distance matrices** (Mariani et al., 2013).
*   **RMSD**: root-mean-square deviation of CDR-H3 coordinates **without Kabsch alignment**.
*   **DockQ**: composite docking quality (Basu & Wallner, 2016).

**Results**

**Table 1** (CDR-H3 design): dyMEAN achieves **AAR = 43.65%**, **TM-score = 0.9726**, **lDDT = 0.8454**, **DockQ = 0.409**, outperforming baselines on all reported metrics.

#### Complex Structure Prediction

**Goal**: given **CDR-H3 sequence**, predict the **3D structure of the full antibody–antigen complex**.

**Comparison**

Baselines include:

*   **IgFold⇒HDock** (IgFold backbone, then HDock)
*   **IgFold⇒HERN** (HERN docking, Rosetta side chains)
*   **GT⇒HERN** (HERN with ground-truth structure)
*   **dyMEAN** (end-to-end full-atom prediction)

**Results (Table 2)**

**dyMEAN exceeds baselines on all metrics.**

**Even when HERN uses ground-truth antibody structure (GT⇒HERN), dyMEAN remains stronger**, suggesting effective **modeling of antibody–antigen interactions**.

#### Affinity Optimization

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/tab3.png" alt="avatar" style /></div>

**Goal**: optimize sequence to **maximize binding affinity**, measured by **ΔΔG** (lower is better binding).

**Protocol**

*   **GNN-based ΔΔG predictor** (Shan et al., 2022).
*   **FoldX** as an affinity scoring tool.
*   **ΔL** (number of mutated residues) to avoid excessive mutation.

**Results (Table 3)**

**dyMEAN achieves larger ΔΔG improvements than MEAN and DiffAb** with **lower ΔL**.

Compared to **MEAN (ΔΔG = −5.84, ΔL = 5.09)** and DiffAb, dyMEAN shows **stronger affinity optimization**.

### Analysis

**Ablation study**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/tab4.png" alt="avatar" style /></div>

Ablations quantify component contributions.

**Results (Table 4)**

*   **T mainly affects docking; T = 3 is best**.
*   **Removing full-atom modeling sharply hurts performance**—**side-chain conformations matter**.
*   **Removing shadow paratope sharing drops most metrics (except CAAR)**, showing its importance for structure and docking.
*   **Removing learnable channel weights degrades performance**—channel weights act like **attention** over atoms.
*   **Memory helps CDR-H3 design more than complex prediction**: sequence hidden states use memory strongly; **3D coordinates propagate directly**.
*   **`$L_{dist}$` is critical for docking**; coordinates alone may not recover shadow paratope structure early in decoding.

**Multiple CDRs design and full antibody design**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DyMEAN/tab5.png" alt="avatar" style /></div>

**Multiple CDRs design**: generate with CDR-H1, H2, H3 and L1, L2, L3 **all masked**.

**Full antibody design**: generate the **entire antibody including framework regions (FRs)**.

### Limitations

**Data diversity and evaluation metrics**

Deep generative antibody design still struggles partly because **antigen–antibody data lack diversity**.

Analyzing the most frequent single-letter patterns at each CDR-H3 position (matched from **ends toward the center**) reveals a dominant motif **"ARDG\*\*\*DY"**, with many "*" positions as Y.

*   Applying this unigram pattern on the test set yields **AAR = 39.61%**, **CAAR = 26.57%**.

*   **Meaningless unigram patterns dominate train and test**, which may **limit learning of true antigen–antibody interactions**.

*   **After removing the first 4 and last 2 CDR-H3 residues**, dyMEAN’s AAR drops to **31.76%**, showing **frequent unigrams inflate sequence metrics**.

Implications:

1.  **Datasets may need enrichment** (lab data, or interfaces from broader protein complexes).
2.  **Metrics may need refinement**, e.g.:
    *   **Exclude residues predictable from unigrams** to reduce bias.
    *   **Use richer criteria** for plausible antigen–antibody interactions.

**Reliability of computational energy functions**

Ultimately, **binding affinity** determines whether designed candidates are useful. This work uses a **deep learning ΔΔG predictor**. Computational energy methods remain uncertain:

Statistical energy tools include FoldX (Schymkowitz et al., 2005), Rosetta (Alford et al., 2017), and docking score functions (Goodsell et al., 1996).

**Issues**

*   **Reliability is still uncertain**; several correlate poorly with experiment (Ramírez & Caballero, 2016, 2018).
*   Open questions:
    1.  **Can these scores separate weak binders?**
    2.  **Do functions trained on native complexes generalize to deep-learning-generated structures** with different statistics?

**Conclusion**

*   **Without reliable computational affinity scores, wet-lab validation remains necessary**, at higher cost and time.
*   **Future work should build more generalizable affinity predictors** to improve reliability of learning-based antibody design.

<hr align="left" color="#987cb9" size="1"> 
