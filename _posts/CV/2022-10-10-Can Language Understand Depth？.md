---
layout: post
title: MM-2022 Can Language Understand Depth？
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: MM
date: 2022-10-10
lang: en
alt_url: /zh/notes/cv/Can-Language-Understand-Depth？/
permalink: /notes/cv/Can-Language-Understand-Depth？/
redirect_from:
  - "/cv/Can-Language-Understand-Depth？/"
  - "/CV/Can-Language-Understand-Depth？/"
---

> Paper: [Can Language Understand Depth?](https://dl.acm.org/doi/10.1145/3503161.3549201)
>
> Code: <https://github.com/Adonis-galaxy/DepthCLIP>

## DepthCLIP: reframing depth estimation from regression to classification with CLIP

### Abstract

Transferring semantic knowledge learned from CLIP to more complex quantitative target tasks—such as depth estimation that relies on geometric cues—remains difficult. This work applies CLIP to zero-shot depth estimation, termed DepthCLIP.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DepthCLIP/fig2.png" alt="avatar" style="zoom:60%;" /></div>

Depth estimation is cast from regression to classification: depth is partitioned into coarse bins, described with the near/far language prompts in Figure 2 and tied to numeric values; similarity is obtained from the product of text and visual features.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DepthCLIP/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DepthCLIP/tab3.png" alt="avatar" style="zoom:60%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
