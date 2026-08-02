---
layout: post
title: Bioinformatics Advances-2021 Light attention predicts protein location from the language of life
categories: [BI]
tags: [protein, localization, PLM]
proceedings: Bioinformatics Advances
date: 2021-11-09
lang: en
alt_url: /zh/bi/Light-attention-predicts-protein-location-from-the-language-of-life/
permalink: /bi/Light-attention-predicts-protein-location-from-the-language-of-life/
---

> Paper: [Light attention predicts protein location from the language of life](https://academic.oup.com/bioinformaticsadvances/article/doi/10.1093/bioadv/vbab035/6432029)
>
> Code: <https://github.com/HannesStark/protein-localization>

## LA-ProtT5: Language-model representations and attention for protein localization

### Abstract

Knowing where proteins act in the cell is important for characterizing biological processes, but most proteins still lack such annotations. Current expert-designed pipelines rely on MSA information or machine learning predictors; building MSAs and hand-crafted features is comparatively expensive. This work uses embeddings from protein language models for localization prediction without MSAs and reports state-of-the-art performance.

### Introduction

#### Prediction bridges gap between proteins with and without location annotations

In molecular biology, the standard predictive tool is homology-based inference (HBI), which transfers annotations from annotated similar proteins to unannotated ones; however, HBI is unreliable or unavailable for most proteins.

Machine learning methods are less accurate in some settings but applicable to most proteins—for example, when MSAs are used as input—but as databases grow, the computational cost of MSAs becomes substantial.

#### Protein language models better represent sequences

The authors predict protein localization using representations from protein language models without MSAs, via a Light Attention (LA) mechanism.

### Methods

#### Data

The standard DeepLoc benchmark and a new setHARD constructed from Swiss-Prot.

#### Models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LA-ProtT5/tab1.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LA-ProtT5/fig1.png" alt="avatar" style="zoom:80%;" /></div>

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LA-ProtT5/fig2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LA-ProtT5/fig3.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LA-ProtT5/tab2.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LA-ProtT5/fig4.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
