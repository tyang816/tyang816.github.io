---
layout: post
title: ICLRw-2023 Enhancing Protein Language Models with Structure-based Encoder and Pre-training
categories: [BI]
tags: [PLM, GNN]
proceedings: ICLRw
date: 2023-03-06
lang: en
alt_url: /zh/notes/bi/Enhancing-Protein-Language-Models-with-Structure-based-Encoder-and-Pre-training/
permalink: /notes/bi/Enhancing-Protein-Language-Models-with-Structure-based-Encoder-and-Pre-training/
---

> Paper: [Enhancing Protein Language Models with Structure-based Encoder and Pre-training](https://openreview.net/forum?id=AAML7ivghpY)
>
> Code: <https://github.com/DeepGraphLearning/GearNet>

## ESM-GearNet: Multi-view contrastive learning with ESM-1b + GearNet

### Abstract

Pre-trained language models can capture intrinsic relationships among amino acids; adding structural information further strengthens PLM performance. This work explores different ways to combine structure encoders with PLM encoders, proposes ESM-GearNet, and pre-trains it with contrastive learning to align whole-protein structures with subsequence-level structure views.

### Introduction

Trained with masked language modeling, existing PLMs capture co-evolution signals well and implicitly capture residue–residue contact information. Because they do not explicitly take protein structure as input, however, whether they capture fine-grained structural features remains an open question.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-GearNet/tab1.png" alt="avatar" style /></div>

### Methods

#### Enhancing Protein Language Models with Protein Structures

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-GearNet/fig1.png" alt="avatar" style /></div>

To avoid substantially changing the learned representations, the authors use smaller learning rates than those used for standalone ESM-1b and GearNet.

#### Pre-training ESM-GearNet with Unlabeled Protein Structures

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-GearNet/fig2.png" alt="avatar" style /></div>

### Experiments

#### Experimental Setup

##### Pre-training dataset

AlphaFold Database v1 and v2: 365K proteome predictions and 440K Swiss-Prot predictions.

##### Downstream datasets

Enzyme Commission (EC) number prediction.

Gene Ontology (GO) term prediction: molecular function (MF), biological process (BP), and cellular component (CC).

##### Training

50 epochs on the AlphaFold Database; 200 epochs on EC and GO prediction.

Multi-view contrastive pre-training: cropped subsequence length 50, mask ratio 15%, InfoNCE temperature 0.07, batch size 256, learning rate 2e-4.

Downstream tasks: batch size 2, learning rate 1e-4, ReduceLROnPlateau scheduler with factor 0.6 and patience 5.

#### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-GearNet/tab2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-GearNet/tab3.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

