---
layout: post
title: CVPR-2016 Convolutional Two-Stream Network Fusion for Video Action Recognition
categories: [CV]
tags: [video, action-recognition]
proceedings: CVPR
date: 2016-04-20
lang: en
alt_url: /zh/notes/cv/Convolutional-Two-Stream-Network-Fusion-for-Video-Action-Recognition/
permalink: /notes/cv/Convolutional-Two-Stream-Network-Fusion-for-Video-Action-Recognition/
---


> Paper: [Convolutional Two-Stream Network Fusion for Video Action Recognition](http://ieeexplore.ieee.org/document/7780582/)

## How to Fuse the Two Streams: Early Fusion Works Slightly Better

### Abstract

The paper explores a range of ways to fuse the optical-flow and spatial streams—temporal versus spatial fusion, and the layer at which fusion is performed—and identifies a comparatively strong fusion design.

### Approach

#### Spatial fusion

Once temporal and spatial streams are available, how to relate channel responses at the same pixel location:

- Max fusion: take the maximum at corresponding locations
- Concatenation fusion: concatenate along channels
- Conv fusion: stack the two maps and apply a convolution
- Sum fusion: element-wise addition
- Bilinear fusion: outer product of the feature maps, then a weighted average over all dimensions

#### Where to fuse the networks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Convolutional Two-Stream Network Fusion for Video Action Recognition/img2.png" alt="avatar" style="zoom:60%;" /></div>

- Run spatial and temporal streams separately and fuse at Conv4
- Run them separately, incorporate the spatial stream for merging while preserving the full spatial stream, then fuse again at the end

#### Temporal fusion

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Convolutional Two-Stream Network Fusion for Video Action Recognition/img3.png" alt="avatar" style="zoom:60%;" /></div>

- 2D pooling
- 3D pooling
- 3D conv + 3D pooling

#### Proposed architecture

Joint spatiotemporal learning plus temporal learning

The two final classification heads are combined with a weighted average to obtain the final prediction.

#### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Convolutional Two-Stream Network Fusion for Video Action Recognition/table5.png" alt="avatar" style="zoom:60%;" /></div>

On very small datasets, very deep networks are prone to overfitting. Adopting early fusion yields a clear improvement on HMDB51.

<HR align=left color=#987cb9 SIZE=1>

