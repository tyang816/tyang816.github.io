---
layout: post
title: ICLR-2023 Conditional Antibody Design as 3D Equivariant Graph Translation
categories: [BI]
tags: [protein, antibody, GNN]
proceedings: ICLR
date: 2023-02-02
lang: en
alt_url: /zh/bi/Conditional-Antibody-Design-as-3D-Equivariant-Graph-Translation/
permalink: /bi/Conditional-Antibody-Design-as-3D-Equivariant-Graph-Translation/
---

> Paper: [Conditional Antibody Design as 3D Equivariant Graph Translation](https://openreview.net/forum?id=LFHFQbjxIiP)
>
> Code: <https://github.com/THUNLP-MT/MEAN>

## MEAN: Joint design of CDR sequence and structure from heavy chain, light chain, and antigen via internal and external encoders

### Abstract

Antibody design is valuable for therapeutic applications and biological research, but existing deep learning methods suffer from several limitations: (1) incomplete contextual information for complementarity-determining region (CDR) generation; (2) inability to fully capture the 3D geometry of input structures; and (3) inefficient autoregressive generation that accumulates errors. This work proposes MEAN, which formulates antibody design as a conditional graph translation task with inputs that include the target antigen and antibody light chain. By combining E(3)-equivariant message passing with a novel attention mechanism, MEAN better captures complex geometric relationships and uses multi-round progressive full-shot decoding to jointly generate CDR 1D sequences and 3D structures. MEAN substantially outperforms state-of-the-art methods on sequence and structure modeling, antigen-binding CDR design, and binding affinity optimization, with relative gains of roughly 23% and 34% on antigen-binding CDR design and affinity optimization, respectively.

### Introduction

Antibody design is important for therapeutics and biological research. However, current deep learning–based approaches face major issues:

1. **Incomplete context**: When generating complementarity-determining regions (CDRs), existing methods consider only backbone context from the same antibody chain and omit the target antigen and the other antibody chain. This limitation can prevent capture of properties critical to antibody design, such as binding affinity.
2. **Difficulty capturing full 3D geometry of input structures**: Existing methods often preprocess 3D coordinates into invariant features, which discards orientation-dependent information in feature space and reduces efficiency in describing spatial proximity among residues in the antibody/antigen complex. Moreover, many generative models predict CDR sequences autoregressively one residue at a time, which is inefficient and accumulates error at inference time.

To address these issues, this work casts antibody design as an **E(3)-equivariant graph translation** problem and makes the following main contributions:

1. **New task formulation**: The generation task is extended to conditional generation whose inputs include not only heavy-chain context for the CDRs but also the antigen and light chain.
2. **New model**: An end-to-end **Multi-channel Equivariant Attention Network (MEAN)** is proposed to jointly generate 1D CDR sequences and 3D structures. MEAN operates directly in 3D coordinate space with E(3) equivariance, preserving residue geometry. By alternating between an internal context encoder and an external attention encoder, MEAN uses 3D message passing and equivariant attention to capture long-range, complex spatial interactions among components of the input complex.
3. **Efficient prediction**: A **progressive full-shot decoding** strategy generates CDRs in stages; each round updates both sequence and structure jointly, avoiding error accumulation in conventional autoregressive models and improving inference efficiency.

Experiments show that MEAN significantly outperforms prior state-of-the-art methods on:

* Sequence and structure modeling;
* Antigen-binding CDR design;
* Binding affinity optimization.

Specifically, on antigen-binding CDR design, MEAN achieves roughly a 23% relative improvement over baselines; on affinity optimization, roughly 34%.

### Method

#### Preliminaries, Notations and Task Formulation

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/fig1.png" alt="avatar" style /></div>

Antibodies are Y-shaped proteins composed of two symmetric pairs of chains; each pair consists of one heavy chain and one light chain. Each chain contains constant domains and one variable domain (VH / VL) with three complementarity-determining regions (CDRs). The antigen-binding site lies in the variable domains, especially CDR-H3. The remaining regions are framework regions, which are usually structurally conserved.

**Task definition:**
The antibody design task is to generate CDRs that bind a given antigen. Traditional methods focus on finding suitable CDRs within the heavy-chain framework. Unlike those approaches, this work uses context from the heavy chain together with the antigen and light chain to better control binding properties of the generated antibody.

**Graph representation:**
Each antibody–antigen complex is represented as a graph with three spatially grouped components: heavy chain (VH), light chain (VL), and antigen (VA). In graph G = (V, E), nodes V are residues from the heavy chain, light chain, and antigen; edges E are split into internal edges (E<sub>in</sub>) and external edges (E<sub>ex</sub>). E<sub>in</sub> connects nodes within the same component; E<sub>ex</sub> connects nodes across components.

Each node i has two parts:

* **h<sub>i</sub>**: a trainable feature vector for amino acid type.
* **Z<sub>i</sub>**: a matrix of multiple backbone atom coordinates.

For CDRs to be generated (the CDR region on the heavy chain), they are initialized as masked vectors, with coordinates placed according to flanking residue positions.

**Edge construction:**

* **Internal edges (E<sub>in</sub>):**
  Connect nodes within the same component. An edge is added if the spatial distance between two residues is below threshold c<sub>1</sub>. Adjacent residues are always connected to capture local sequence relationships.
* **External edges (E<sub>ex</sub>):**
  Connect nodes across components when their distance is below threshold c<sub>2</sub> (c<sub>2</sub> > c<sub>1</sub>). These edges model interactions between antibody chains and the antigen, mainly via intermolecular forces.

**Global nodes:**
To let generated CDRs reflect the overall structure of their chain, global nodes are introduced and connected to other nodes within each component. Each global node’s coordinates are the mean of all coordinates in the corresponding chain’s variable domain.

#### MEAN: Multi-Channel Equivariant Attention Network

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/fig2.png" alt="avatar" style /></div>

**Core idea:**
MEAN alternates two modules at each layer to capture geometric and topological information among components of the antibody–antigen complex:

1. **Internal Context Encoder:**
   Handles interactions within the same component and captures intra-component structure.
2. **External Attention Encoder:**
   Handles cross-component interactions and captures antibody–antigen interactions.

Each layer proceeds as follows:

* **Message passing:**
  For each node, MEAN computes E(3)-equivariant messages to neighbors and uses them to update feature vectors and coordinates.
* **Node update:**
  After each layer, node features and coordinates are updated for the next round.

**Internal Context Encoder:**
This encoder mainly updates node states via an E(3)-equivariant graph neural network (EGNN). Feature updates include:

* Computing messages m<sub>ij</sub> to neighbors.
* Updating node features (h<sub>i</sub>) and coordinates (Z<sub>i</sub>) with MLPs.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/frm1-3.png" alt="avatar" style /></div>

(l + 0.5) denotes features and coordinates at this stage that the external attention encoder will further update in the same layer.

**External Attention Encoder:**
This module uses graph attention to model relevance among residues in different components. Unlike standard attention, a new E(3)-equivariant graph attention mechanism is proposed so information is transferred correctly in 3D space. Steps include:

* Computing query (q<sub>i</sub>), key (k<sub>ij</sub>), and value (v<sub>ij</sub>) vectors.
* Computing attention weights α<sub>ij</sub> and updating node features and coordinates.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/frm4-6.png" alt="avatar" style /></div>

**Output module:**
After all message-passing layers, MEAN computes final node features and coordinates and predicts amino acid type per residue. Softmax yields the amino acid probability distribution.

#### Progressive Full-Shot Decoding

**Limitations of conventional methods:**
Methods such as RefineGNN generate CDR sequences autoregressively, so errors accumulate over time. MEAN avoids this with progressive full-shot decoding.

**Full-shot decoding process:**

The core idea of **Progressive Full-Shot Decoding** is to improve quality and efficiency through multiple rounds (rather than a single pass). In each round, the model does not generate amino acids or 3D coordinates one at a time; it **updates all nodes simultaneously**, including CDR amino acid sequence and 3D structure.

**Steps:**

1. **Initial input and first round:**

    * Input is the antibody–antigen graph with heavy chain, light chain, and antigen features. CDR regions start as masked vectors, with coordinates initialized from nearby residues.
    * In the first round, internal and external encoders pass messages over all nodes, updating each residue’s features (amino acid type) and coordinates (3D positions).
2. **Progressive updates:**

    * Each decoding round updates features and coordinates for all CDR residues so the structure gradually refines. The model updates embeddings (h<sub>i</sub>) and coordinates (Z<sub>i</sub>) from the current round’s outputs (amino acid distributions and 3D coordinates).
    * For full-shot updates, the model uses weighted embeddings instead of argmax amino acids to reduce error accumulation at inference. Weighted embeddings sum each amino acid class probability with its embedding vector, avoiding hard-selection mistakes.
3. **Round iteration:**

    * Each round’s output feeds the next round’s input. This feedback loop makes predictions progressively more accurate and stable.
4. **Final output:**

    * The last round outputs the final CDR sequence and 3D structure. After multiple rounds, the model better captures coupling between structure and sequence for more accurate antibodies.

**Loss functions:**

* **Sequence loss (L<sub>seq</sub>):** Cross-entropy between predicted and ground-truth amino acid sequences.

    <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/frm7.png" alt="avatar" style /></div>
* **Structure loss (L<sub>struct</sub>):** Huber loss between predicted and ground-truth coordinates. Huber loss is more robust than MSE for noisy data.

    <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/frm8.png" alt="avatar" style /></div>

The total loss is a weighted sum of sequence loss and λ times structure loss.

### Experiments

#### Sequence and Structure Modeling

**Task:**
Experiments evaluate MEAN’s ability to generate antibody 1D sequences (amino acid sequences) and 3D structures (spatial coordinates). The **SAbDab (Structural Antibody Database)** dataset contains 3,127 antibody–antigen complexes. Each antibody has multiple CDRs; recovery of CDR 1D sequence and 3D structure is the focus.

**Metrics:**

* **Amino Acid Recovery (AAR):** Overlap between predicted and true 1D sequences.
* **Root Mean Square Deviation (RMSD):** Average structural deviation between predicted and true 3D coordinates.

**Setup:**

* **Preprocessing:** Antibodies are clustered by CDR type (CDR-H1, CDR-H2, CDR-H3). MMseqs2 sequence similarity search ensures test CDRs are not too similar to training sequences.
* **Split:** Data are split 8:1:1 into train, validation, and test.

**Results:**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/tab1.png" alt="avatar" style /></div>

MEAN significantly outperforms baselines (e.g., LSTM, RefineGNN) on 1D sequence and 3D structure modeling, with higher AAR and lower RMSD.

#### Antigen-Binding CDR-H3 Design

**Task:**
This experiment evaluates MEAN when designing CDR-H3 for binding a specific antigen. The goal is to generate CDR-H3 sequences that bind the given antigen efficiently and match the true structure.

**Metrics:**

* **Amino Acid Recovery (AAR):** Match between generated and true sequences.
* **TM-score:** Structural similarity between proteins (0–1; higher is more similar).
* **RMSD:** Root-mean-square deviation between generated and true 3D structures.

**Setup:**
The authors select 60 antibody–antigen complexes from **RAbD (Antigen-Antibody Database)** as the test set. Training still uses **SAbDab**, with 1443/32638 cluster/antibody counts for training and 160/339 for validation. Multiple candidate CDR-H3 sequences are generated and compared for binding to the target antigen.

**Results:**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/tab2.png" alt="avatar" style /></div>

MEAN outperforms all other methods on antigen-binding design, including the classic RosettaAD approach. MEAN achieves strong AAR and TM-score; TM-score is close to 0.99, indicating near-complete structural overlap with the ground truth.

#### Affinity Optimization

**Task:**
This experiment assesses MEAN’s ability to improve antibody affinity by jointly optimizing CDR-H3 sequence and structure to strengthen antigen binding.

**Metrics:**

* **ΔΔG (change in binding free energy):** Lower ΔΔG indicates stronger affinity.

**Setup:**
The authors use **SKEMPI V2.0** (Structural Kinetic and Energetic Mutant Protein Interactions). Optimization uses **Iterative Target Augmentation (ITA)**, which generates multiple candidate structures and selects the best antigen–antibody complex.

**Results:**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/fig3.png" alt="avatar" style /></div>

As shown on the right side of Table 2, MEAN substantially improves antibody affinity and yields antibodies with more favorable binding free energy changes (stronger binding) than other methods.

#### CDR-H3 Design with Docked Template

**Task:**
This experiment studies how to design new CDR-H3 using a known antibody–antigen binding template. The goal is to combine a known antibody framework with a docked antigen template to generate new high-affinity CDR-H3 sequences.

**Setup:**
The authors dock antigens with **HDOCK** to obtain antibody–antigen complex templates, then use MEAN to generate new antigen-binding CDR-H3 sequences and evaluate affinity.

**Results:**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/fig4.png" alt="avatar" style /></div>

With docked templates, MEAN generates antibodies with higher affinity than C-RefineGNN and the original antibody. Specifically:

* **Figure:** CDR-H3 sequences designed by MEAN show clear affinity gains over the original structure; optimized antibodies exhibit substantially improved binding.

### Analysis

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MEAN/tab3.png" alt="avatar" style /></div>

Ablation experiments verify whether each MEAN component is necessary:

* Removing global nodes or the attention mechanism hurts performance.
* Using only the heavy chain greatly weakens results, showing that antigen and light-chain context is essential.
* Compared with progressive full-shot decoding, iterative refinement performs worse, confirming the efficiency and quality benefits of progressive full-shot decoding.

<hr align="left" color="#987cb9" size="1">

