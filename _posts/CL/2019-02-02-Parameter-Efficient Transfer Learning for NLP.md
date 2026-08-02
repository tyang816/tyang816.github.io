---
layout: post
title: ICML-2019 Parameter-Efficient Transfer Learning for NLP
categories: [CL]
tags: [LLM, NLP]
proceedings: ICML
date: 2019-02-02
lang: en
alt_url: /zh/notes/cl/Parameter-Efficient-Transfer-Learning-for-NLP/
permalink: /notes/cl/Parameter-Efficient-Transfer-Learning-for-NLP/
---

> Paper: [Parameter-Efficient Transfer Learning for NLP](https://proceedings.mlr.press/v97/houlsby19a/houlsby19a.pdf)
>
> Code: <https://github.com/google-research/adapter-bert>

## adapter-bert: Small modules embedded in the transformer

### Abstract

Fine-tuning large pretrained models is a standard transfer-learning approach in NLP, but for many downstream tasks it is parameter-inefficient: each task requires an entirely new model. This work proposes transfer via adapter modules: only a small set of trainable parameters is added per task while the rest of the network stays fixed, enabling heavy parameter reuse. To validate adapters, BERT is adapted to 26 text classification tasks. Experiments show that tuning only a small fraction of parameters can match full fine-tuning of all parameters.

### Adapter tuning for NLP

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/adapter-bert/fig2.png" alt="avatar" style="zoom:80%;" /></div>

Here an adapter is a down-projection FC layer; each transformer block contains two adapters, the remaining layers are frozen, and only the adapters are trained.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/adapter-bert/tab1-tab2.png" alt="avatar" style="zoom:100%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
