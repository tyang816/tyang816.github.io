---
layout: post
title: Bioinformatics-2024 Embedding-based alignment：combining protein language models with dynamic programming alignment to detect structural similarities in the twilight-zone
categories: [BI]
tags: [protein, PLM, alignment]
proceedings: Bioinformatics
date: 2024-01-04
lang: en
alt_url: /zh/bi/Embedding-based-alignment：combining-protein-language-models-with-dynamic-program/
permalink: /bi/Embedding-based-alignment：combining-protein-language-models-with-dynamic-program/
---

> Paper: [Embedding-based alignment：combining protein language models with dynamic programming alignment to detect structural similarities in the twilight-zone](https://academic.oup.com/bioinformatics/article/doi/10.1093/bioinformatics/btad786/7510842)
>
> Code: <https://git.scicore.unibas.ch/schwede/EBA> and <https://git.scicore.unibas.ch/schwede/eba_benchmark>

## EBA: PLM embedding similarity matrix as input to NW and SW

### Abstract

#### Motivation

Protein language models produce high-dimensional per-residue representations that encode semantic information about protein sequences. These embeddings support downstream tasks and can help identify homologous relationships between proteins.

#### Results

The authors propose embedding-based protein sequence alignments (EBA), which can capture structural similarity even in the twilight zone.

### Introduction

In the twilight zone, pairwise signals from standard alignment methods become ambiguous, whereas PLMs establish homology between sequences beyond simple sequence comparison and can reveal additional information.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/fig1.png" alt="avatar" style /></div>

Averaging representations discards much positional information; for example, in Figure 1, proteins with completely different structures and sequences can yield the same Euclidean distance between their averaged embeddings.

This issue can be addressed by increasing computational complexity and explicitly modeling alignment. Because residue-level embeddings are not always directly comparable, an additional step uses the distribution of pairwise residue-embedding distances between the proteins being compared to strengthen the signal in the similarity matrix.

### Materials and Methods

The benchmark uses three pretrained models: ProstT5, ProtT5, and ESM-1B.

#### Average distance

Similarity is computed from averaged vectors (AD).

#### Embedding-based alignment

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/frm1.png" alt="avatar" style /></div>

Here `$d$` is the Euclidean distance; `$r_i$` and `$r_j$` are the embeddings at corresponding positions in the two proteins.

#### Signal enhancement

For a given amino-acid pair (i, j) with similarity score `$SM_{i,j}$`, Z-scores are computed along the same row or column.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/frm2-frm3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/frm4.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/frm5.png" alt="avatar" style /></div>

#### Global and local dynamic alignment

Needleman-Wunsch (NW) and Smith-Waterman (SW) alignments use `$SM_{enh}$` as the scoring matrix. Gap penalties are 0 for NW and 2 for SW. For NW global alignment, the EBA similarity score is normalized as follows:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/frm6.png" alt="avatar" style /></div>

### Benchmark

#### Structural similarity analysis

PISCES is used with sequence identity below 30% and maximum chain length below 75; performance is reported as Spearman correlation with TM-score.

#### CATH annotation transfer analysis

66K CATH domains and 219 test sets; evaluation uses accuracy.

#### SCOP annotation transfer analysis

Protein domain clusters from SCOPe 2.01 at 40% sequence homology yield 12,211 non-redundant domains; data from <https://github.com/steineggerlab/foldseek-analysis>.

#### HOMSTRAD alignment quality

HOMSTRAD provides expert-curated structural alignments of homologous proteins from 1,032 families; data from <https://github.com/steineggerlab/foldseek-analysis>.

### Results

#### EBA captures structural similarity in the twilight zone

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/tab1.png" alt="avatar" style /></div>

#### Length normalization

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/fig2.png" alt="avatar" style /></div>

#### EBA successfully transfers CATH annotations

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/tab2.png" alt="avatar" style /></div>

#### EBA competes with structure-based methods

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/fig3.png" alt="avatar" style /></div>

#### Domain permutation detection

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EBA/fig4.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

