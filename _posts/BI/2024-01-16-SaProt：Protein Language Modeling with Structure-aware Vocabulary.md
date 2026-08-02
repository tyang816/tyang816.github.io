---
layout: post
title: ICLR-2024 SaProt：Protein Language Modeling with Structure-aware Vocabulary
categories: [BI]
tags: [protein, PLM]
proceedings: ICLR
date: 2024-01-16
lang: en
alt_url: /zh/bi/SaProt：Protein-Language-Modeling-with-Structure-aware-Vocabulary/
permalink: /bi/SaProt：Protein-Language-Modeling-with-Structure-aware-Vocabulary/
---

> Paper: [SaProt: Protein Language Modeling with Structure-aware Vocabulary](https://openreview.net/forum?id=6MRm3G4NiU)
>
> Code: <https://github.com/westlake-repl/SaProt?tab=readme-ov-file>
>
> Zhihu: <https://zhuanlan.zhihu.com/p/664754366>

## SaProt: Protein Language Modeling with Structure-aware Vocabulary

### Abstract

Standard protein language models (PLMs) do not explicitly incorporate structural information. This work adopts Foldseek’s 3D structural vocabulary and pretrains on 40M protein sequences paired with structures using this structure-aware amino-acid vocabulary, demonstrating effectiveness across ten downstream tasks.

### Introduction

Protein structure is often regarded as more informative than sequence alone because it directly determines function. With the breakthrough of AlphaFold2, we now have large-scale predicted structures to leverage. How to use these structures to train powerful, general-purpose representation models is an important research direction.

This paper uses Foldseek to process protein structures, encoding them as one-dimensional discrete tokens and combining them with conventional amino-acid tokens to form a **structure-aware vocabulary**, thereby embedding structural information in the model input and strengthening representations. The pretrained model uses the largest collection of protein structures to date (**roughly 40 million**), trained for **three months on 64 A100 GPUs**, and releases a **650M-parameter model, SaProt.** Experiments show consistent gains over prior sequence-only and structure-aware models across diverse protein tasks.

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/fig1.png" alt="avatar" style="zoom:100%;" /></div>

As outlined above, proteins are first encoded into a one-dimensional structural sequence (Foldseek’s structural alphabet, where each token corresponds to a distinct local structural motif). This structural sequence is residue-aligned with the amino-acid sequence. The **structural vocabulary** and **amino-acid vocabulary** are combined via a Cartesian product (all pairwise combinations), yielding a new **structure-aware vocabulary.** At each position, the residue type and its local structure jointly map to a single token in the expanded vocabulary, and the model is trained with masked language modeling (MLM).

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/fig2.png" alt="avatar" style="zoom:100%;" /></div>

The left and middle panels illustrate two common paradigms for structure-aware modeling: encoding structure as biases added to transformer attention maps (e.g., Evoformer, Uni-Mol), or modeling spatial relationships with graph neural networks (e.g., MIF, GearNet). Loss curves show that when these two approaches are pretrained with MLM on AlphaFold2 (AF2) structures, optimization quickly overfits (very low loss on AF2 structures, while loss on native PDB structures plateaus or even increases).

A plausible explanation is that AF2-predicted structures contain **hidden patterns** that models can exploit when **operating directly on 3D coordinates**, leading to **information leakage**: the model can satisfy the pretraining objective without learning evolutionary signal. The structural vocabulary instead compresses structure into a 1D token sequence, retaining coarse structural information while discarding fine-grained coordinate detail, so the model can benefit from structure without being dominated by AF2-specific artifacts.

#### Zero-shot Mutational Effect Prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab1.png" alt="avatar" style="zoom:100%;" /></div>

#### Supervised Fine-Tuning Tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab2.png" alt="avatar" style="zoom:100%;" /></div>

### Analysis

#### Awareness of Protein Structure

Pretraining on 40 million protein structures yields strong representations. One natural question is whether gains reflect richer structural knowledge versus simply better optimization. SaProt and ESM-2 were compared on residue contact prediction with frozen backbones and only a trainable linear classification head. Results are shown below.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab3.png" alt="avatar" style="zoom:100%;" /></div>

Structural token embeddings enable SaProt to substantially outperform ESM-2, indicating that SaProt encodes rich structural information and excels on structure-centric probes. Embeddings were also visualized on alpha and beta proteins from SCOPe; results are shown below.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/fig5.png" alt="avatar" style="zoom:100%;" /></div>

#### PDB versus AlphaFoldDB

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
