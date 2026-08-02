---
layout: post
title: WACV-2023 MixGen：A New Multi-Modal Data Augmentation
categories: [CV]
tags: [vision-language, data-augmentation]
proceedings: WACV
date: 2023-01-09
lang: en
alt_url: /zh/notes/cv/MixGen：A-New-Multi-Modal-Data-Augmentation/
permalink: /notes/cv/MixGen：A-New-Multi-Modal-Data-Augmentation/
---

> Paper: [MixGen：A New Multi-Modal Data Augmentation](https://openaccess.thecvf.com/content/WACV2023W/Pretrain/papers/Hao_MixGen_A_New_Multi-Modal_Data_Augmentation_WACVW_2023_paper.pdf)
>
> Code: <https://github.com/amazon-science/mix-generation>

## MixGen: Multimodal Data Augmentation via Image Linear Interpolation and Text Concatenation

### Abstract

The paper proposes MixGen, a joint data-augmentation method for vision–language representation learning that forms new image–text pairs by interpolating images and concatenating captions while preserving their semantic alignment. The approach is evaluated on four frameworks: CLIP, ViLT, ALBEF, and TCL.

### Introduction

Augmenting image–text pairs is difficult because common transforms can drop information or introduce ambiguity—for instance, after flipping an image, its original caption may no longer be appropriate. Effective augmentation therefore requires changes that retain information and do not alter semantics.

### MixGen

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Two images are linearly interpolated (blended), and their corresponding sentences are concatenated to produce new training samples for augmentation.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/tab3.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
