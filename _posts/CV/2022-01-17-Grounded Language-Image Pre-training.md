---
layout: post
title: CVPR-2022 Grounded Language-Image Pre-trainin
categories: [CV]
tags: [LLM, NLP, vision-language]
proceedings: CVPR
date: 2022-01-17
lang: en
alt_url: /zh/cv/Grounded-Language-Image-Pre-training/
permalink: /cv/Grounded-Language-Image-Pre-training/
---

> Paper: [Grounded Language-Image Pre-trainin](https://openaccess.thecvf.com/content/CVPR2022/papers/Li_Grounded_Language-Image_Pre-Training_CVPR_2022_paper.pdf)
>
> Code: <https://github.com/microsoft/GLIP>

## GLIP: detection + grounding

### Abstract

Object detection and phrase grounding are combined for pre-training. The benefits are: (1) learning from both detection and grounding data to improve the task; (2) exploiting large-scale image–text pairs by generating grounding boxes through self-training, so the learned representations are semantically rich. On COCO and LVIS, zero-shot performance without seeing images during training reaches very high accuracy.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIP/fig1.png" alt="avatar" style="zoom:60%;" /></div>

At inference, given category labels that are turned into a sentence, GLIP detects the corresponding objects from that sentence—or, as in grounding, one can provide a sentence directly.

### Grounded Language Image Pre-training

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIP/fig2-fig3.png" alt="avatar" style="zoom:60%;" /></div>

Unlike CLIP’s two-branch similarity computation, GLIP performs fusion in between.

#### Unified Formulation

##### object detection

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIP/frm2.png" alt="avatar" style="zoom:60%;" /></div>

An image backbone produces region embeddings, followed by a classification head $W$; NMS filters bounding boxes before the loss is computed.

##### detection as phrase grounding

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIP/frm3.png" alt="avatar" style="zoom:60%;" /></div>

Matching scores encode how image regions align with words in the sentence.

Similarity between text embeddings and image embeddings yields the final region–word alignment scores $S_{ground}$.

##### Equivalence between detection and grounding

With small modifications, the two views are unified: the second dimension of $T\in \{0,1\}^{N\times c}$ in Eq. 2 is extended to match that of $S_{ground}\in R^{N\times M}$ in Eq. 3, because the number of tokens $M$ is always greater than the number of categories $c$; positive and negative matches are then computed.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIP/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIP/tab2.png" alt="avatar" style="zoom:60%;" /></div>

Pre-training datasets differ across methods, so comparisons are not strictly fair, but GLIP clearly performs very well.

<HR align=left color=#987cb9 SIZE=1>
