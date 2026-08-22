---
layout: post
title: ICML-2024 Feature Reuse and Scaling：Understanding Transfer Learning with Protein Language Models
categories: [BI]
tags: [protein, PLM, transfer learning]
proceedings: ICML
date: 2024-06-21
lang: en
alt_url: /zh/notes/bi/Feature-Reuse-and-Scaling：Understanding-Transfer-Learning-with-Protein-Language-/
permalink: /notes/bi/Feature-Reuse-and-Scaling：Understanding-Transfer-Learning-with-Protein-Language-/
redirect_from:
  - "/bi/Feature-Reuse-and-Scaling：Understanding-Transfer-Learning-with-Protein-Language-/"
  - "/BI/Feature-Reuse-and-Scaling：Understanding-Transfer-Learning-with-Protein-Language-/"
---

> Paper: [Feature Reuse and Scaling：Understanding Transfer Learning with Protein Language Models](https://dl.acm.org/doi/10.5555/3692070.3693161)
>
> Code: <https://github.com/microsoft/protein-transfer>

## protein-transfer: How pretraining depth, scale, and inductive bias shape downstream performance

### Abstract

Representations from protein language models (PLMs) are highly effective, yet little is understood about how features learned during pretraining relate to and help downstream tasks. This paper reports 370 experiments spanning diverse downstream tasks, architectures, model sizes and depths, and pretraining duration. Although nearly all downstream tasks gain over naive sequence representations when using pretrained models, performance on most tasks is largely insensitive to pretraining itself and instead relies on low-level features acquired early in pretraining. These results highlight a mismatch between current PLM pretraining paradigms and how these models are typically applied, motivating improved pretraining methods.

### Introduction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/fig1.png" alt="avatar" style /></div>

Mapping from sequence to function remains poorly understood, and data scarcity makes transfer learning an attractive remedy.

Transfer learning is better studied in domains such as computer vision; the authors therefore synthesize plausible hypotheses for downstream gains and design experiments to test them.

**Feature reuse (Fig. 1c-i)**: A common hypothesis is that masked language modeling (MLM) pretraining learns general biological features of proteins that can be reused across tasks.

**Inductive biases and overparameterization (Fig. 1c-ii)**: Larger pretrained models may align by chance with signals useful for downstream prediction.

**Statistics of pretrained weights (Fig. 1c-iii)**: A major benefit of pretraining may be initializing weights at a reasonable scale.

**Reuse of low-level features (Fig. 1c-iv)**: Only simpler features learned early in pretraining may transfer effectively.

Main contributions:

*   370 experiments providing a broad empirical study
*   Evidence that current MLM training paradigms are a poor fit for biology
*   Systematic evidence that performance on many protein property prediction tasks is largely independent of PLM size or pretraining

### Datasets and Pretrained Models

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/tab1.png" alt="avatar" style /></div>

#### Transfer Learning with Protein Language Models

Two comparably sized protein MLM families trained on UniRef50: ESM and CARP.

### Experimental Setup

#### Baseline and ablations

*   One-hot baseline: amino-acid one-hot representations used directly
*   Random init: randomly initialized weights
*   Stat transfer: to test whether transfer gains come from weight statistics and/or initializing to a reasonable scale, weights are randomly initialized to match the distribution of pretrained PLM weights

#### Scaling experiments

Model size

⚪ denotes CARP; × denotes ESM

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/figa2.png" alt="avatar" style /></div>

Model depth

− denotes CARP; −− denotes ESM

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/figa6.png" alt="avatar" style /></div>

Model checkpoint

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/figa7.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/figa8.png" alt="avatar" style /></div>

### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/fig2.png" alt="avatar" style /></div>

#### Structure Prediction Benefits from Transfer Learning Because It Is Well-Aligned with MLM Pretraining

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/fig3.png" alt="avatar" style /></div>

Transfer learning improves secondary structure prediction; the gains are not explained by inductive bias or weight statistics alone.

#### Many Tasks Benefit from Transfer Learning Despite Lack of Alignment with MLM Pretraining

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/protein-transfer/fig4-fig5.png" alt="avatar" style /></div>

Transfer learning improves over baselines even when the downstream task is not closely aligned with the pretraining objective.

#### Some Tasks Do Not Benefit from MLM Pretraining

<hr align="left" color="#987cb9" size="1">
