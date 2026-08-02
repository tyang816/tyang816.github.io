---
layout: post
title: CVPR-2018 Non-local Neural Networks
categories: [CV]
tags: [convolutional-neural-network]
proceedings: CVPR
date: 2018-04-13
lang: en
alt_url: /zh/notes/cv/Non-local-Neural-Networks/
permalink: /notes/cv/Non-local-Neural-Networks/
---

> Paper: [Non-local Neural Networks](https://openaccess.thecvf.com/content_cvpr_2018/papers/Wang_Non-Local_Neural_Networks_CVPR_2018_paper.pdf)
>
> Code: <https://github.com/facebookresearch/video-nonlocal-net>

## Non-local: A Self-Attention Operator

### Abstract

Both convolution and recurrence operate on very local neighborhoods. The authors argue that modeling broader context—not just local patches—should help many tasks, and propose a **non-local** operator: a plug-and-play block for long-range dependencies.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Non-local/img2.png" alt="avatar" style="zoom:60%;" /></div>

A standard **self-attention** module adapted for video understanding: the usual key, query, and value product.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Non-local/table2.png" alt="avatar" style="zoom:60%;" /></div>

(a) Dot-product self-attention works best.

(b) Adding one non-local block helps when inserted at res2, res3, or res4; placement at res5 is weaker, likely because feature maps are already small—there is little left for self-attention to exploit—and early insertion is costly, so stages 3 and 4 are a better trade-off.

(c) More non-local blocks generally help; more is better in their sweep.

(d) Temporal and spatial self-attention both matter; using both is strong.

(g) Because non-local blocks aim to capture more context, lengthening the input temporal span keeps improving performance.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Non-local/table3.png" alt="avatar" style="zoom:60%;" /></div>

With ResNet backbones, non-local blocks clearly help.

<HR align=left color=#987cb9 SIZE=1>
