---
layout: post
title: ICCV-2015 Learning Spatiotemporal Features with 3D Convolutional Networks
categories: [CV]
tags: [video]
proceedings: ICCV
date: 2015-09-25
lang: en
alt_url: /zh/notes/cv/Learning-Spatiotemporal-Features-with-3D-Convolutional-Networks/
permalink: /notes/cv/Learning-Spatiotemporal-Features-with-3D-Convolutional-Networks/
---

> Paper: [Learning Spatiotemporal Features with 3D Convolutional Networks](https://www.cv-foundation.org/openaccess/content_iccv_2015/papers/Tran_Learning_Spatiotemporal_Features_ICCV_2015_paper.pdf)
>
> Pipelines built on extracted optical flow are a poor fit for real-time use: each new dataset requires recomputing flow, extraction is slow, and inference still needs flow—so latency suffers badly. A method that learns temporal structure directly from data, without modeling time in a separate stage, would be preferable.

## C3D: Feature Extraction with 3D Networks

### Abstract

The authors train a deeper 3D convolutional network on a larger dataset (Sports-1M); the design is relatively simple and intuitive.

### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/C3D/img3.png" alt="avatar" style="zoom:60%;" /></div>

Roughly, they drop one conv layer from each VGG block and change all conv kernels from 3×3 to 3×3×3.

They **extract features** from the final 4096-dimensional layer, train an SVM classifier on them for classification, and obtain strong results with low overhead.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/C3D/table2.png" alt="avatar" style="zoom:60%;" /></div>

Because the pipeline performs spatiotemporal learning end to end, the authors argue that 3D networks are better suited to video understanding than 2D networks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/C3D/table3.png" alt="avatar" style="zoom:60%;" /></div>

On UCF101, performance relative to other work is only average; even with ensembling it is not standout. Training is very long (about a month even at Facebook), so fine-tuning is unfriendly—the authors recommend feature extraction instead and provide Python and MATLAB interfaces that take a video and return a 4096-dimensional feature for downstream tasks.

<HR align=left color=#987cb9 SIZE=1>
