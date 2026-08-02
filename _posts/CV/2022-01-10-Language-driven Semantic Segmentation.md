---
layout: post
title: ICLR-2022 Language-driven Semantic Segmentation
categories: [CV]
tags: [LLM, NLP, vision-language]
proceedings: ICLR
date: 2022-01-10
lang: en
alt_url: /zh/notes/cv/Language-driven-Semantic-Segmentation/
permalink: /notes/cv/Language-driven-Semantic-Segmentation/
---

> Paper: [Language-driven Semantic Segmentation](http://arxiv.org/abs/2201.03546)
>
> Code: <https://github.com/isl-org/lang-seg>

## LSeg: Add a text encoder for supervised semantic segmentation

### Abstract

Apply CLIP directly to semantic segmentation: a text encoder computes discrete input label embeddings, and a transformer-based image encoder computes image embeddings. The text encoder maps semantically similar labels (e.g., *cat* and *furry*) into nearby regions of embedding space, which supports generalization to unseen categories.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LSeg/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Figure 1 shows strong segmentation quality and robustness when extra labels are added—highlighting zero-shot capability, including fine-grained distinctions such as *dog* vs. *pet* (subclass vs. superclass).

### Language-Driven Semantic Segmentation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LSeg/fig2.png" alt="avatar" style="zoom:60%;" /></div>

Although CLIP is used, training is fully supervised: cross-entropy loss against ground-truth masks, not CLIP’s contrastive NCE loss. The main idea is to bring language into the segmentation pipeline so the model learns language-aware features.

The text encoder is frozen throughout—CLIP’s pretrained text encoder with no fine-tuning—because semantic segmentation datasets are small; fine-tuning would likely hurt alignment and make optimization harder.

The authors find that initializing the image encoder with ViT pretraining works better than using CLIP’s image encoder weights.

They add spatial regularization blocks after the visual and text features to learn how to fuse and interact them; two blocks help, but four blocks hurt performance, with limited overall impact on metrics.

### Experiment

Datasets: PASCAL-5, COCO-20, and SFF-1000. PASCAL has 20 classes: 5 are treated as seen and 15 as unseen for zero-shot evaluation. COCO splits its 80 classes into groups of 20.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LSeg/tab1-tab2.png" alt="avatar" style="zoom:60%;" /></div>

#### Failure Cases

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LSeg/fig6.png" alt="avatar" style="zoom:60%;" /></div>

Because prediction is essentially similarity matching rather than closed-set classification, the most similar label wins—e.g., a dog can be assigned to *toy* when that category is more similar in embedding space.

<HR align=left color=#987cb9 SIZE=1>
