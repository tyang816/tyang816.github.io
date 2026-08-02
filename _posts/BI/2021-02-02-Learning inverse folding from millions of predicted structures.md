---
layout: post
title: ICML-2021 Learning inverse folding from millions of predicted structures
categories: [BI]
tags: [protein, inverse folding, PLM, GNN]
proceedings: ICML
date: 2021-02-02
lang: en
alt_url: /zh/notes/bi/Learning-inverse-folding-from-millions-of-predicted-structures/
permalink: /notes/bi/Learning-inverse-folding-from-millions-of-predicted-structures/
---

> Paper: [Learning inverse folding from millions of predicted structures](https://proceedings.mlr.press/v162/hsu22a.html)
>
> Code: <https://github.com/facebookresearch/esm>

## ESM-IF: additionally training on 12M UniRef50 sequences for inverse folding

### Abstract

The task is to predict protein sequences from backbone atom coordinates. Structures predicted by AlphaFold2 for 12M protein sequences are used as data augmentation. A transformer with invariant geometric input layers achieves 51% native sequence recovery, with 72% recovery for buried residues.

### Introduction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/fig1.png" alt="avatar" style /></div>

Designing novel amino acid sequences that encode proteins with desired properties is known as de novo protein design.

This work mainly asks whether predicted structures can overcome the limited scale of experimental data. AlphaFold2 is applied to predict structures for 12M sequences from UniRef50. Even when the predicted inputs (structures) are lower quality, inverse folding can still learn effectively from the additional target data (sequences).

### Learning inverse folding from predicted structures

Given backbone atom coordinates for N, Cα, and C atoms `$(x_1,...,x_i,...,x_{3n})$`, the goal is to predict the protein sequence `$(y_1,...,y_i,...,y_n)$`, modeled with an autoregressive encoding architecture.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/frm1.png" alt="avatar" style /></div>

#### Data

##### Predicted structures

To choose sequences for structure prediction, MSA Transformer first predicts distograms for MSAs of all UniRef50 sequences; distogram LDDT scores are then used as a proxy for prediction quality to rank candidates. The top 12M sequences with at most 500 amino acids are passed to AlphaFold2.

##### Training and evaluation data

Models are evaluated on a structure-held-out subset of CATH, with an 80/10/10 split at the topology level: 16,153 training, 1,457 validation, and 1,797 test structures. Gene3D topology classification is used to filter out supervised sequences that appear in the training set and MSAs used as input to AlphaFold2.

#### Model architectures

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/tabA.1.png" alt="avatar" style /></div>

GVP learns rotation-equivariant transformations for vector features and rotation-invariant transformations for scalar features. Three model variants are compared: GVP-GNN, GVP-GNN-large, and GVP-Transformer.

In inverse folding, the predicted sequence should be independent of the reference frame of the structural coordinates. For any rotation and translation $T$ of the input coordinates, the model output should be invariant under these transforms, i.e., $p(Y \mid X) = p(Y \mid T X)$.

##### GVP-GNN

Three encoder layers and three decoder layers.

Protein structure is represented as a graph. Node features combine scalar node features derived from dihedral angles and vector node features derived from relative positions of backbone atoms; edge features encode relative positions of nearby amino acids.

During training, a deeper and wider eight-layer GVP-GNN performed better.

##### GVP-Transformer

A GVP-GNN encoder extracts geometric features, which are then fed into a standard autoregressive transformer.

#### Training

##### Combining experimental and predicted data

Each training epoch mixes experimentally determined structures (16K) with a 10% random sample of the 12M predicted set, roughly a 1:80 ratio of experimental to predicted data. For larger models, increasing the fraction of predicted data helps prevent overfitting (Fig. 6b), whereas training on predicted data alone degrades performance.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/fig3.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/figC.1.png" alt="avatar" style /></div>

Predicted input coordinates with AlphaFold2 confidence scores (pLDDT) below 90 are masked, covering about 25% of predicted coordinates (visualized in Fig. 3). A token prepended to each sequence indicates whether the structure is experimental or predicted. For each residue, the AlphaFold2 pLDDT confidence is provided as a feature encoded with Gaussian radial basis functions, yielding a slight gain (Fig. C.1).

##### Span masking

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/fig4.png" alt="avatar" style /></div>

Randomly selected spans of 30 amino acids are masked until masked regions account for 15% of the entire input backbone.

### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/tab1.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/fig5.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/fig6.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/tab2.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/fig7.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-IF/tab3.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">
