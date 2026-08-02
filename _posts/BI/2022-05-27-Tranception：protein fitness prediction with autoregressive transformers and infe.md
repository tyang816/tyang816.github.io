---
layout: post
title: ICML-2022 Tranception：protein fitness prediction with autoregressive transformers and inference-time retrieval
categories: [BI]
tags: [protein, PLM, fitness-prediction]
proceedings: ICML
date: 2022-05-27
lang: en
alt_url: /zh/bi/Tranception：protein-fitness-prediction-with-autoregressive-transformers-and-infe/
permalink: /bi/Tranception：protein-fitness-prediction-with-autoregressive-transformers-and-infe/
---

> Paper: [Tranception：protein fitness prediction with autoregressive transformers and inference-time retrieval](http://arxiv.org/abs/2205.13760)
>
> Code: <https://github.com/OATML-Markslab/Tranception>

## Tranception: grouped multi-head attention + MSA retrieval

### Abstract

Deep generative protein models trained on multiple sequence alignments (MSAs) are among the most successful approaches to protein fitness prediction, but their performance depends on having sufficiently large and deep alignments for training, which limits the protein families they can cover; large-scale language models do not face this constraint. The authors propose Tranception, a transformer architecture that combines autoregressive prediction with homologous-sequence retrieval at inference time and achieves state-of-the-art results. They also introduce the ProteinGym benchmark.

### Introduction

Current state-of-the-art methods rely heavily on MSAs, mainly for two purposes:

- As a data collection tool: identify sequences related to a target in large protein databases, then train a model on that related set
- By aligning sequences via modeled insertions, deletions, and substitutions, they define a coordinate system so amino acids at a given position can be compared across the training set

Limitations:

- Models cannot score sequences incompatible with the MSA coordinate system used in training (e.g., insertions and deletions), which narrows applicability
- A large fraction of the proteome lies in regions that cannot be aligned
- Even when alignments exist, protein function can be taxon-specific, and MSA algorithms may fail to retrieve a large enough homolog set for training
- Alignment-based models are sensitive to the MSAs used for training
- Models trained separately on different data subsets do not share information

MLM-based models cannot evaluate full-sequence likelihood, which leads to heuristic scoring of mutational effects—especially for multi-site variants—and they cannot score indels.

Main contributions:

- Tranception, a transformer architecture
- Combining autoregressive prediction with homologous-sequence retrieval at inference to reach SOTA
- The ProteinGym dataset

### Tranception

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Tranception attention

The authors study a new attention mechanism that focuses on contiguous sub-sequences (k-mers) of amino acid tokens: at each layer, attention heads are split into four groups, each applying convolutions with a different kernel size.

#### Grouped ALiBi position encoding

Learnable or sinusoidal positional encodings are replaced with a variant of ALiBi called grouped ALiBi.

#### Data processing and augmentations

The model has 700M parameters and is trained on UniRef100 (~250M sequences).

Maximum sequence length is 1024; if a protein exceeds 1024 residues during training, a random contiguous segment of that length is sampled.

#### Scoring sequences for fitness prediction

The training objective is self-supervised: given tokens 1 through i−1, predict token i.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/frm1.png" alt="avatar" style="zoom:70%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/frm2.png" alt="avatar" style="zoom:70%;" /></div>

For proteins longer than the maximum length, the segment that covers the most mutations is selected for scoring.

### Inference-time retrieval

#### Multiple sequence alignments

At a given position, the amino-acid distribution over MSA sequences summarizes evolutionary constraints: sequences in the MSA are fitness-preserving variants that have not been eliminated by selection.

#### Two modes of inference

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/fig3.png" alt="avatar" style="zoom:70%;" /></div>

Second mode: retrieval inference.

Step one at inference restricts the retrieved MSA:

- Substitutions: the retrieved homolog set is shared for wild-type and mutant sequences—one retrieval per family, amortized over all mutants to be scored
- Insertions and deletions: the retrieved MSA is adjusted per mutant by dropping columns corresponding to deletions and zero-padding columns at insertion sites

Step two:

log P_A is the autoregressive probability; log P_R is the probability from retrieval inference; C is a normalization constant.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/frm3.png" alt="avatar" style="zoom:70%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/frm4.png" alt="avatar" style="zoom:70%;" /></div>

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/tab1-tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/tab3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tranception/tab4.png" alt="avatar" style="zoom:70%;" /></div>


<HR align=left color=#987cb9 SIZE=1>

