---
layout: post
title: bioRxiv-2023 Ankh：Optimized Protein Language Model Unlocks General-Purpose Modelling
categories: [BI]
tags: [protein, PLM, language-model]
proceedings: bioRxiv
date: 2023-01-16
lang: en
alt_url: /zh/notes/bi/Ankh：Optimized-Protein-Language-Model-Unlocks-General-Purpose-Modelling/
permalink: /notes/bi/Ankh：Optimized-Protein-Language-Model-Unlocks-General-Purpose-Modelling/
---

> Paper: [Ankh：Optimized Protein Language Model Unlocks General-Purpose Modelling](http://biorxiv.org/lookup/doi/10.1101/2023.01.16.524265)
>
> Code: <https://github.com/agemagician/Ankh>
>

## Ankh: tuning a protein language model

### Abstract

As protein language models advance, researchers seek protein-aware optimizations to improve performance. Although scaling models and richer representations have been validated, there is still demand for data-efficient, lower-cost, knowledge-driven optimization. The authors designed more than 20 experiments spanning masking, architecture, and pre-training data, incorporating insights from protein-specific studies to build and interpret the language model. They present Ankh, a general-purpose PLM trained on Google TPU v4 that achieves state-of-the-art results with fewer parameters (<10% pre-training compute, <7% inference compute, <30% embedding dimension). They evaluate on structure and function benchmarks, and further analyze protein variant generation at high-N and one-shot input scales; Ankh learns evolutionary conservation–mutation trends, introduces functional diversity, and preserves key structure–function features.

### Introduction

People often assume a positive link between model size (parameter count) and representational capacity or downstream performance—that larger models learn richer representations. This view can be misleading. One source of confusion comes from observing large language models that, despite vast parameter counts and long training, still show clear learning gradients and are treated as underfitting.

In such cases, models with many parameters underperform relative to expectations, suggesting that scale alone does not determine learning quality or representation richness. Data quality, training recipe, learning rate, and related choices also strongly affect fit and performance.

Large models help but raise the barrier to research innovation and limit scalability; pursuing scale is not the only path—for example, a small, high-quality dataset can outperform a much larger but weaker one.

Ankh is validated in two lines of work: state-of-the-art results on structure and function benchmarks, and analysis of protein engineering under high-N (family-based) and one-shot (single-sequence) settings; second, assessing model performance, optimizing design, and supporting development and deployment.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab1.png" alt="avatar" style="zoom:100%;" /></div>

#### Utmost Computational Efficiency and Utmost Performance

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig1-1.png" alt="avatar" style="zoom:33%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig1-2.png" alt="avatar" style="zoom:33%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig1-3.png" alt="avatar" style="zoom:33%;" /></div>

#### Protein Generation Made Attainable

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### Auto-Regressive Fine-Tuning for High-N Generation

Temperature hyperparameter *t* controls diversity of generations: higher *t* spreads probability across many candidates; lower *t* concentrates mass on the most likely continuations.

They fine-tune on natural MDH proteins, generate 500 sequences per group under three temperature settings, and relate Shannon entropy of the fine-tuning MSA to the three temperatures. Low entropy marks conserved regions that preserve function; high entropy marks regions with lower mutational constraint.

#### Masked Language Modeling (MLM) for One-N Generation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig3.png" alt="avatar" style="zoom:100%;" /></div>

ColabFold with two models and three recycling cycles predicts 3D structures of generated variants. The goal is for MLM-generated sequences to yield predicted structures with low sequence identity to the experimental 3D structure yet low RMSD.

In both settings, the model can produce sequences with RMSD below 1.5 Å while sequence identity falls to about 80%.

#### Knowledge-Guided Optimization in Action

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig4.png" alt="avatar" style="zoom:100%;" /></div>

Knowledge-guided experimentation is defined as exploring protein-specific tasks while varying one independent factor at a time among masking strategy and probability, model architecture, and pre-training dataset.

- **Protein-specific experiments**: Experiments tune the model for protein-related tasks. Proteins are complex biomolecules with distinct structure and function, so designs target those requirements—varying masking strategy and probability, architecture, and pre-training data as needed.
- **Single independent variable**: Holding other factors fixed while changing one variable clarifies its effect on performance. Here, masking strategy and probability, architecture, and pre-training dataset are treated as independent knobs to assess impact on compute efficiency and downstream metrics.

### Discussion

#### Results Interpertation

When applying sequence-context embeddings, choose and design architecture and layers according to task-specific needs for better performance.

#### Results Implications

The work proposes protein-knowledge-guided optimization that tunes software and hardware across the model lifecycle to improve performance, achieving strong results with markedly fewer compute resources.

Performance is often assumed to require larger models and more data, but that link is not absolute; effective optimization can improve models without blindly scaling parameters or datasets.

#### Results Limitation

The paper reports several limitations, including tests of activation functions and dimension changes on optimization.

Because no single model is state of the art on every task metric, the best model per task is carried forward to the next task in their pipeline.

#### Recommendations

Align pre-training data with downstream evaluation sets. Pre-training on UniRef50 outperforms UniRef90, UniRef100, and BFD, attributed to lower redundancy in UniRef50. Redundancy is domain-dependent (e.g., using all available human proteins yields low redundancy for length distributions but high redundancy when predicting binding sites).

#### Future Work

Ankh is an initial optimized general-purpose protein language model, intended as a pre-training foundation for future work targeting high-impact protein modeling tasks with dedicated optimization and analysis (e.g., full atomic-resolution 3D structure prediction, protein generation).

### Methods

#### Self-Supervised Learning

##### Pre-training Datasets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab2.png" alt="avatar" style="zoom:100%;" /></div>

##### Pre-trained Model Encoder-Decoder Transformer

An encoder–decoder architecture was chosen not only for performance but also for compatibility with experimental factors such as masking and architecture.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab11.png" alt="avatar" style="zoom:100%;" /></div>

#### Downstream Tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/fig5.png" alt="avatar" style="zoom:100%;" /></div>

##### Tasks and Datasets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab12.png" alt="avatar" style="zoom:100%;" /></div>

##### Protein Function Prediction

- **Fluorescence Prediction (FluP)**: Regression task predicting green fluorescent protein fluorescence intensity.
- **Solubility Prediction (SolP)**: Binary classification of solubility across diverse proteins.
- **GB1 Fitness Prediction (GB1)**: Regression of GB1 binding fitness after mutations at four positions in the FLIP benchmark.

##### Protein Structure Prediction

- **Contact Prediction (CP)**: Binary prediction of whether residue pairs contact in 3D structure (typically 8 Å threshold).
- **Fold Prediction (FolP)**: Classification of full sequences into 1,194 fold categories.
- **Secondary Structure Prediction (SSP)**: Per-residue classification into secondary structure classes at 3-class and 8-class difficulty; secondary structure carries domain information and is often used with MSAs for evolutionary signal.
- **Embedding-based Annotation Transfer (EAT)**: Annotation transfer traditionally uses homology-based inference (HBI) in sequence space from labeled to unlabeled proteins; embedding-based transfer is now feasible.

##### Protein Localization Prediction

- **Sub-cellular localization prediction (LocP)**: Ten-class subcellular localization.

##### Generation of Novel Protein Sequences

- **High-N (Family-Based Variant Generation)**: Malate dehydrogenase (MDH).
- **One-Shot (Single Sequence Variant Generation)**: Single-chain SARS-CoV-2 nanobody added to CoV-AbDab after June 2022 so generated sequences are unseen during unsupervised training. Seven virtual generation runs used seven nanobodies (Nb-007, F6, Nb 1-23, Nb 1-25, Nb 2-62, Nb 2-65, Nb 2-67), all with experimental structures for comparison to predicted candidates.

#### Downstream Model: ConvBERT

Top supervised heads fall into two main types:

- CNN top layers as in ProtTrans, which work well combined with self-attention.
- Linear layers with activation and softmax.
- A third variant—not shared everywhere—uses max pooling before the supervised head for regression or binary classification.

Task-specific tuning uses different hyperparameters; this work unifies the best settings across tasks for stronger general performance.

#### Variant Generation Model

Family-based autoregressive fine-tuning and single-protein MLM generation.

For autoregressive fine-tuning, the encoder is frozen and only the decoder is trained for 2 epochs: max sequence length 256, max prompt length 20, lr 3e-4, epsilon 1e-8, train batch size 4, eval batch size 8, beam search 10, temperatures 1, 1.5, and 2. Sampling applies temperature first, then beam search.

MLM uses two settings: 50% masking with *t* = 1, and 40% masking with *t* = 1.5, beam search 30.

#### Computational Power (Software & Hardware)

Flax and JAX on TPU.

#### Data & Model Experimentation

##### Masking

- **Masking Strategy**
  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab3.png" alt="avatar" style="zoom:100%;" /></div>
  - Exp1
    - 1-gram mask: each distinct amino acid is masked at least once; e.g., for “*ABCAAAAAAA....A*” of length 20 at 15% masking, mask one A, one B, and one C.
    - Performance improves.
  - Exp2
    - 3-gram mask: e.g., “*ABCDEFG*”; if D is selected, C, D, and E are masked.
    - All downstream tasks degrade.
  - Exp3
    - 1-gram mask with loss only at masked positions; e.g., “*ABCDEFG*” with D and F masked—loss on D and F only, not full-sequence reconstruction.
    - All downstream tasks degrade.
  - Exp4
    - 1-gram span partial demasking/reconstruction: changes input–target mapping; for “ABCDEFG” with C and G masked, input “A, B, [MASK0], D, E, F, [MASK1]” reconstructs “[MASK0], C, [MASK1], G”.
    - Improves over earlier exps.
  - Exp5
    - Exp4 on Exp1-style sequences; e.g., length-20 “*ABCAAAAAAA....A*” with partial mapping; single [MASK0] token maps to 17 input tokens.
    - Performance drops.
  - Exp6
    - Exp4 variant: “*ABCDEFG*” with C, D, E masked → input “*A, B,* [*MASK*0]*, F, G*”, target “[*MASK*0]*,* [*MASK*1]*,* [*MASK*2]”.
    - Not useful.
  - Exp4 is most helpful and is used in subsequent experiments.
- **Masking Probability**
  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab4.png" alt="avatar" style="zoom:100%;" /></div>
  - exp7: 10%
  - exp8: 20%
  - exp9: 30%

##### Architecture

- <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab5.png" alt="avatar" style="zoom:100%;" /></div>
- **Number of Encoder-Decoder layers**
  - For Prot-T5, the decoder did not greatly help downstream tasks, but removing it halves inference cost, so they try encoder-heavy asymmetric stacks.
  - exp10: 54 encoder / 18 decoder
  - exp11: 48 encoder / 24 decoder
  - exp12: 24 encoder / 48 decoder

- **Depth vs. Width Variation layers**
  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab6.png" alt="avatar" style="zoom:100%;" /></div>
  - exp13: embedding 768→1024, 48 encoder / 24 decoder→24 encoder / 12 decoder
- **Activation Function**
  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab7.png" alt="avatar" style="zoom:100%;" /></div>
  - Classic ReLU tested in two configs; prior work used Gated-GELU.
  - exp14
    - 62-layer encoder and 11-layer decoder, embedding dimension 768
  - exp15
    - 48-layer encoder and 24-layer decoder, embedding dimension 768
- **Relative Positional Embedding**
  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab8.png" alt="avatar" style="zoom:100%;" /></div>
  - A simplified relative positional encoding.
  - exp16: embedding dim 32, offset 256
  - exp17: embedding dim 32, offset 64—64 beats default 128 and larger 256
  - exp18: embedding dim 64, offset 64
  - exp19: embedding dim 16, offset 64
  - exp20: embedding dim 64, offset 128
  - exp21: embedding dim 128, offset 256
- **Weight Typing**
  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab9.png" alt="avatar" style="zoom:100%;" /></div>
  - Whether to tie embedding weights.

##### Dataset

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Ankh/tab10.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
