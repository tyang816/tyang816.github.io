---
layout: post
title: Nature Machine Intelligence-2023 Structure-inducing pre-training for generalizable representation learning
categories: [BI]
tags: [pre-training, PLM]
proceedings: Nature Machine Intelligence
date: 2023-06-01
lang: en
alt_url: /zh/notes/bi/Structure-inducing-pre-training/
permalink: /notes/bi/Structure-inducing-pre-training/
redirect_from:
  - "/bi/Structure-inducing-pre-training/"
  - "/BI/Structure-inducing-pre-training/"
---

> Paper: [Structure-inducing pre-training](https://www.nature.com/articles/s42256-023-00647-z)
>
> Code: https://github.com/mmcdermott/structure_inducing_pre-training

## SIPT: A general structure-inducing pre-training framework

### Abstract

This work analyzes how to strengthen structure awareness in the latent space of each sample during pre-training—specifically, how to impose distance or geometric constraints on embeddings—and proposes a pre-training framework. Experiments span three data modalities and ten fine-tuning tasks.

### Introduction

In NLP, fully assessing the sentiment of a text is an inter-sample task, whereas recognizing entities within a sentence is an intra-sample task. In biomedicine, inter-sample tasks are more common than intra-sample ones.

Some existing methods ignore geometric losses over the full sample space; others apply relatively shallow constraints, such as auxiliary classification pre-training objectives, or deeper contrastive losses based on data augmentation or denoising.

Motivated by these observations, the pre-training objective is designed in two steps:

- A denoising objective that exploits intra-sample relations in the language model
- A loss that regularizes the geometry of each sample’s latent space to reflect domain-specific graph structure from pre-training

The main contributions are threefold:

- Through comprehensive evaluation, showing that current pre-training objectives lack explicit, deep structural constraints
- A pre-training framework that addresses this gap
- Theoretical results for the framework

### Results

#### General PT problem formulation

Models such as BERT require pre-training before fine-tuning when downstream tasks are unknown, whereas GPT-style pre-training can be applied directly to downstream generation.

#### Defining explicit and deep structural constraints

The central hypothesis is that most NLP-derived pre-training methods do not impose explicit, deep constraints on the geometry of the latent space (per sample). To substantiate this claim, explicit versus deep structural constraints are defined as follows.

##### Definition 1 explicit versus implicit structural constraints

Explicit constraints allow one to directly infer relationships between two samples, for example distance.

##### Definition 2 deep versus shallow structural constraints

This concerns how much information a pre-training objective must use to impose structural constraints.

For example, if the pre-training loss is classification over a label set $y$, representations can be mapped to classes to induce structure. If $y_i = y_j$, the relative distance between samples $z_i$ and $z_j$ should be small.

Such approaches are shallow: each class is embedded at a single point in space, and all samples of that class are pulled toward that point. Moreover, distance-based constraints of this kind can be satisfied in a very low-dimensional space, which indicates the constraint is shallow.

Contrastive learning pulls noisy variants toward the original sample and pushes them away from others. Although this smooths the noise process in representation space, it is an implicit constraint: one cannot infer how distances between two samples are constrained. Compared with classification-based constraints, contrastive methods are deeper, because noise-induced relations among samples are not necessarily captured in a low-dimensional subspace.

#### Existing PT method constraints

To show that existing methods rarely combine depth and explicitness in structural constraints, the authors surveyed more than 90 pre-training methods (Extended Data Fig. 1 and supplementary material).

These methods seldom use both deep and explicit constraints. Most fall into one of the following:

- No inter-sample pre-training objective (e.g., text generation models)
- Explicit but shallow supervised pre-training objectives, such as BERT’s NSP, ALBERT’s sentence-order prediction (SOP), or other multi-task objectives
- Implicit but deep unsupervised or self-supervised contrastive objectives, such as contrastive sentence embedding loss or noising- and augmentation-based methods

Four works use explicit and deep constraints: Knowledge Embedding and Pre-trained LanguagE Representation (KEPLER), Contrastive Knowledge-aware GNN (CK-GNN), XLM-K, and WebFormer. All can be described as inter-sample graph alignment, constraining pair embeddings on a pre-training graph that reflects relations; however, these approaches are not fully general.

#### Structure-inducing PT

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SIPT/fig1.png" alt="avatar" style="zoom:80%;" /></div>

#### Datasets and tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SIPT/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SIPT/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SIPT/tab3.png" alt="avatar" style="zoom:100%;" /></div>

### Methods

multi-similarity loss

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SIPT/frm1.png" alt="avatar" style="zoom:80%;" /></div>

contrastive loss

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SIPT/frm2.png" alt="avatar" style="zoom:80%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
