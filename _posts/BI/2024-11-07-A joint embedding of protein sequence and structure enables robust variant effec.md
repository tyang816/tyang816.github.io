---
layout: post
title: Nature Communications-2024 A joint embedding of protein sequence and structure enables robust variant effect predictions
categories: [BI]
tags: [protein, fitness-prediction, PLM]
proceedings: Nature Communications
date: 2024-11-07
lang: en
alt_url: /zh/bi/A-joint-embedding-of-protein-sequence-and-structure-enables-robust-variant-effec/
permalink: /bi/A-joint-embedding-of-protein-sequence-and-structure-enables-robust-variant-effec/
---

> Paper: [A joint embedding of protein sequence and structure enables robust variant effect predictions](https://www.nature.com/articles/s41467-024-53982-z)
>
> Code: <https://github.com/KULL-Centre/_2023_Blaabjerg_SSEmb>

## SSEmb: MSA Transformer + GVP for variant effect prediction

### Abstract

The method fuses graph representations of protein structure with MSA-based models to predict protein variants effectively and supports downstream tasks such as protein–protein binding site prediction.

### Introduction

Engineering and design of proteins rest on manipulating sequence variation to improve function.

High-throughput assays, commonly called Multiplexed Assays of Variant Effects (MAVE) or Deep Mutational Scanning (DMS) experiments, measure variant effects at scale.

This work introduces SSEmb, which maps multiple sources of protein information—MSA and sequence—into a single joint representation.

### Results and Discussion

#### Development of the SSEmb model

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/fig1.png" alt="avatar" style /></div>

Self-supervised training combines MSA and protein structure; the training set is CATH 4.2. During training, random subsets of the wild-type sequence are masked. Attention in the MSA Transformer is restricted to amino acids that are neighbors in the 3D structure (structure-constrained MSA Transformer). The GNN uses GVP.

#### Validation using multiplexed assays of variant effects

Validation benchmarks measure activity or abundance and include proteins for which MSAs are easy or difficult to obtain.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tab1.png" alt="avatar" style /></div>

#### Testing SSEmb on the ProteinGym benchmark

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tab2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tabs1.png" alt="avatar" style /></div>

#### Prediction of protein-protein binding sites using embeddings

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/fig2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tab3.png" alt="avatar" style /></div>

### Methods

#### Multiple sequence alignments

MSAs were generated with ColabFold using `--diff=512`, `--filter-min-enable=64`, `--max-seq-id=0.90`, and additionally `--cov=0.75` to retain only high-coverage sequences.

#### Subsampling of multiple sequence alignments

MSAs were subsampled to 16 sequences; shallow MSAs proved more effective than a single sequence or very deep MSAs.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/figs3.png" alt="avatar" style /></div>

#### Model training

A BERT-style scheme masks 15% of positions: 60% masked, 20% with the corresponding MSA column fully masked, 10% randomly mutated, and 10% left unchanged.

Training proceeds in two stages: first the GNN while the MSA Transformer is frozen, then joint finetuning of the GNN and the structure-constrained MSA Transformer.

#### GEMME protocol

HHblits version 2.0.15 on UniRef30: `-e 1e-10 -i 1 -p 40 -b 1 -B 20000`.

#### Downstream model for protein-protein binding site prediction

PPBS dataset.

<hr align="left" color="#987cb9" size="1">

