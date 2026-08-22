---
layout: post
title: NeurIPS-2021 Language models enable zero-shot prediction of the effects of mutations on protein function
categories: [BI]
tags: [protein, PLM, fitness-prediction]
proceedings: NeurIPS
date: 2021-11-10
lang: en
alt_url: /zh/notes/bi/Language-models-enable-zero-shot-prediction-of-the-effects-of-mutations-on-prote/
permalink: /notes/bi/Language-models-enable-zero-shot-prediction-of-the-effects-of-mutations-on-prote/
redirect_from:
  - "/bi/Language-models-enable-zero-shot-prediction-of-the-effects-of-mutations-on-prote/"
  - "/BI/Language-models-enable-zero-shot-prediction-of-the-effects-of-mutations-on-prote/"
---

> Paper: [Language models enable zero-shot prediction of the effects of mutations on protein function](https://proceedings.neurips.cc/paper/2021/hash/f51338d736f95dd42427296047067694-Abstract.html)
>
> Code: <https://github.com/facebookresearch/esm>
>

## ESM-1v: Zero-Shot Prediction of Protein Mutations

### Abstract

Evolutionary information is encoded in protein sequences, and unsupervised models can learn the impact of variants from sequence data alone. Existing approaches fit models to sequences from individual families, which requires training a new model for each prediction task and is highly limiting. This work proposes a zero-shot model instead.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1v/fig1.png" alt="avatar" style="zoom:100%;" /></div>

The functional effects of sequence variants can be measured with deep mutational scanning experiments.

The authors introduce the unsupervised model ESM-1v.

### Zero-Shot Transfer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1v/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Zero-shot learning requires that the model acquire during pretraining all information needed for downstream tasks. Here, the mechanism that enables zero-shot prediction is pretraining protein language models on large databases rich in evolutionary signal. When the database is sufficiently large and diverse, the model can learn sequence patterns spanning the entire tree of life and, in pretraining, capture patterns characteristic of the protein families to which it will be applied—so no additional training is needed at transfer time.

### Method

Amino-acid conservation at a site gauges how strongly a variant may matter: if, relative to the wild type, other amino acids have very low probability at that position, the sequence is conserved there and substitution is unlikely, suggesting that the residue is important for structure and function.

To score how a variant affects protein function, the authors compare, at each masked position, the probability of the mutant amino acid versus the wild-type amino acid and take their log-odds (the log ratio of the two probabilities).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1v/frm1.png" alt="avatar" style="zoom:60%;" /></div>

ESM-1v uses the same architecture as ESM-1b.

- Training: masked language modeling

- Training data: UR90, with 98 million diverse protein sequences—substantially greater in scale and diversity than UR50 used for ESM-1b and MSA Transformer—yielding stronger transfer performance

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1v/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1v/tab2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1v/fig3.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
