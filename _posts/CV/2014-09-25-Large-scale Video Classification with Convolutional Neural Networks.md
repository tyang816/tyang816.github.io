---
layout: post
title: CVPR-2014 Large-scale Video Classification with Convolutional Neural Networks
categories: [CV]
tags: [video]
proceedings: CVPR
date: 2014-09-25
lang: en
alt_url: /zh/cv/Large-scale-Video-Classification-with-Convolutional-Neural-Networks/
permalink: /cv/Large-scale-Video-Classification-with-Convolutional-Neural-Networks/
---


> Paper: [Large-scale Video Classification with Convolutional Neural Networks](https://www.cv-foundation.org/openaccess/content_cvpr_2014/papers/Karpathy_Large-scale_Video_Classification_2014_CVPR_paper.pdf)

## DeepVideo: Among the Earliest Deep Learning Work on Video Understanding

### Abstract

Applying convolutional networks to video classification.

### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepVideo/img1.png" alt="avatar" style="zoom:60%;" /></div>

- **Single Frame:** Treat the task as image classification; a neural network with two fully connected (FC) layers produces the prediction.
- **Late Fusion:** Combine outputs at the network’s final layers, with shared weights across streams before fusion.
- **Early Fusion:** Fuse at the input by stacking five frames together.
- **Slow Fusion:** Extract low-level features first, then gradually merge streams and apply convolutions to combine representations.

In practice, these variants differ little in accuracy. Even after pretraining on one million videos, transfer to the small UCF-101 benchmark still underperformed hand-crafted features, so the authors pursued the approach below.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepVideo/img2.png" alt="avatar" style="zoom:60%;" /></div>

Since 2D convnets struggle to learn temporal structure effectively, the authors set aside explicit temporal modeling and borrowed image-classification tricks—specifically a **multi-resolution convolutional neural network** over the full frame and a cropped region, with weight sharing between the two streams.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepVideo/table1.png" alt="avatar" style="zoom:60%;" /></div>

Gains were modest. Early Fusion was indeed too early and fell below the baseline; Late Fusion also performed poorly.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepVideo/table3.png" alt="avatar" style="zoom:60%;" /></div>

On UCF-101, the best variant reached only about 65.4%, whereas hand-crafted methods already achieved roughly 87%.

<HR align=left color=#987cb9 SIZE=1>

