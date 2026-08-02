---
layout: post
title: Human Genetics-2021 Embeddings from protein language models predict conservation and variant effects
categories: [BI]
tags: [protein, PLM, fitness-prediction]
proceedings: Human Genetics
date: 2021-12-30
lang: en
alt_url: /zh/bi/Embeddings-from-protein-language-models-predict-conservation-and-variant-effects/
permalink: /bi/Embeddings-from-protein-language-models-predict-conservation-and-variant-effects/
---

> Paper: [Embeddings from protein language models predict conservation and variant effects](https://link.springer.com/10.1007/s00439-021-02411-y)
>
> Code: <https://github.com/Rostlab/VESPA>

## VESPA: conservation prediction, BLOSUM, and PLM embeddings

### Abstract

Single amino acid variants (SAVs). This work uses protein language model representations to predict sequence conservation and SAV impact without multiple sequence alignments (MSAs). Conservation predictions, the BLOSUM62 matrix, and PLM mask-reconstruction probabilities are fed into a logistic regression (LR) ensemble for variant effect score prediction, without further optimization on deep mutational scanning (DMS) data. On a standard benchmark of 39 DMS assays, no single method uniformly dominates the others. Finally, the authors examine binary effect prediction on DMS experiments for four human proteins.

### Introduction

Even with existing assays, several intrinsic limitations remain:

1. In vitro DMS data capture mutational effects on molecular function well but are less sensitive to effects on biological processes (e.g., disease). For example, online resources such as OMIM include disease-related variants, whereas MaveDB does not.
2. Most proteins contain multiple domains and therefore likely carry several distinct molecular functions; each experimental assay typically measures impact on only one of them.
3. In vivo, protein function can be modulated by factors that in vitro experiments cannot reproduce.

In short, in vitro assays provide valuable information, but results—especially when probing disease-related variants—must be interpreted cautiously. Combining diverse experimental approaches with bioinformatics tools is needed for a fuller picture of protein structure and function, alongside in vivo work to better approximate real biological contexts.

The authors analyze experimental data from DMS (Esposito et al., 2019) and PMD (Kappata et al., 1999), using pretrained pLM embeddings to predict how SAVs affect protein function, with emphasis on molecular function. Embeddings from the pretrained PLM are held fixed; a second supervised stage is trained on annotated datasets. Two independent supervised tasks are evaluated: conservation and SAV effects.

The PLM serves first as a static feature encoder; an LR is trained to predict SAVs. The best conservation predictor (ProtT5cons), BLOSUM62 substitution scores, and ProtT5 substitution probabilities are combined in an ensemble. Substitution probabilities alone already correlate with DMS scores; adding the other signals improves performance.

### Methods

#### Data sets

Five datasets are used in total: ConSurf10k for training and evaluating residue-level conservation prediction; Eff10k for training SAV effect prediction; PMD4k and DMS4 as test sets for binary SAV effects; and DMS39 for evaluating regression of continuous effect scores.

##### *ConSurf10k* assessed conservation.

ConSurf-DB contains 89,673 proteins; after filtering for consistency, resolution, residue count, and related criteria, 10,507 proteins remain.

##### *Eff10k* assessed SAV effects.

The SNAP2 development set provides 100,737 binary SAV-effect annotations (neutral: 38,700; effect: 61,037) from 9,594 proteins.

Proteins in the same cluster are assigned to the same cross-validation (CV) fold.

##### *PMD4k* assessed binary SAV effects.

Annotations are extracted from PMD (“no change” → neutral; increased or decreased function → effect), yielding 51,817 binary SAVs (neutral: 13,638; effect: 38,179) from 4,061 proteins.

##### *DMS4* sampled large-scale in vitro DMS experiments annotating binary SAV effects.

Binary labels are derived from four human proteins; variants within the central 95% of the assay score distribution are labeled neutral, and the outer 5% tails are labeled effect (this ratio can be adjusted).

##### *DMS39* collected DMS experiments annotating continuous SAV effects.

A subset of the 43 DMS assays used in DeepSequence.

#### Input features

PLM embeddings, substitution probabilities, and BLOSUM62 substitution scores.

#### Method development

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VESPA/fig1.png" alt="avatar" style /></div>

##### Conservation prediction

PLM embeddings are used as input to train three supervised classifiers: (1) LR; (2) two-layer feed-forward network (FFN) with ReLU; (3) two-layer convolutional neural network (CNN) with window size 7 and ReLU.

The best model is a CNN trained on ProtT5, termed ProtT5cons.

##### Rule-based binary SAV effect prediction

A simple threshold on ProtT5cons conservation scores marks residues with score > 5 as “effect” and others as “neutral.” Predictions are refined using BLOSUM62 substitution scores as in SIFT; this baseline is called BLOSUM62bin. Substitutions less likely than expected (negative BLOSUM62 score) are labeled “effect”; others “neutral.”

The two rule-based classifiers are combined into ProtT5bef: “effect” if ProtT5cons score > 5 and BLOSUM62 substitution score is negative; otherwise “neutral.” This merges position-aware information from ProtT5cons with variant-aware BLOSUM62 signal for binary (effect/neutral) labels without fitting on experimental mutational-effect data.

##### Supervised prediction of SAV effect scores

A balanced LR ensemble is trained with scikit-learn cross-validation on Eff10k.

VESPA < 0.5 → neutral; VESPA ≥ 0.5 → effect.

### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VESPA/fig3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VESPA/fig4.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VESPA/tab1.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VESPA/fig5.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VESPA/fig6.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">
