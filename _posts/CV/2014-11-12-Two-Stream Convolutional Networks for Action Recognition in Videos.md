---
layout: post
title: NeurIPS-2014 Two-Stream Convolutional Networks for Action Recognition in Videos
categories: [CV]
tags: [video, action-recognition]
proceedings: NeurIPS
date: 2014-11-12
lang: en
alt_url: /zh/notes/cv/Two-Stream-Convolutional-Networks-for-Action-Recognition-in-Videos/
permalink: /notes/cv/Two-Stream-Convolutional-Networks-for-Action-Recognition-in-Videos/
redirect_from:
  - "/cv/Two-Stream-Convolutional-Networks-for-Action-Recognition-in-Videos/"
  - "/CV/Two-Stream-Convolutional-Networks-for-Action-Recognition-in-Videos/"
---

> Paper: [Two-Stream Convolutional Networks for Action Recognition in Videos](https://proceedings.neurips.cc/paper/2014/hash/00ec53c4682d36f5c4359f4ae7bd7ba1-Abstract.html)

## Two-Stream ConvNets: Spatial + Temporal — A Landmark for Video Understanding

Neural networks initially struggled to learn useful object representations. This work instead feeds **optical flow**—motion features extracted by classical methods—into the network to learn the mapping. **Supplying such priors can substantially boost network performance.**

### Abstract

1. Learn appearance (spatial) and motion (temporal) information.
2. Contributions:

   2.1 Propose a two-stream architecture with large accuracy gains.

   2.2 Strong performance even with limited training data.

   2.3 Mitigate data scarcity via multitask learning: train the backbone on two datasets jointly.

### Introduction

1. Temporal cues in video provide important signals for recognition, and video naturally enables rich **data augmentation**.
2. Naively feeding raw video into a network works poorly—often worse than hand-crafted features. Classical pipelines rely on **optical flow** to capture motion well, motivating a two-stream design with **late fusion** over logits.
3. The design is inspired by processing in the human brain.

### Related Work

1. Spatio-temporal features evolved into 3D networks; dense point trajectories evolved into the two-stream approach.
2. Feeding video frames one-by-one into a 2D network versus stacking sequences of frames into a 3D or 2D network for joint spatio-temporal learning yields similarly weak results—about 20 points below traditional methods. This suggests such pipelines fail to capture action and temporal structure and highlighted the importance of explicit motion/temporal modeling.

### Model

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/2StreamConvNet/2StreamConvNet-img1.png" alt="avatar" style="zoom:67%;" />

#### Spatial stream ConvNet

Processes video **frame by frame**; temporal context is largely unused, similar to image classification, yet accuracy is already strong. Static appearance carries strong cues, and fine-tuning a model **pretrained on ImageNet** works very well.

#### Optical flow ConvNet

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/2StreamConvNet/2StreamConvNet-img2.png" alt="avatar" style="zoom:67%;" />

1. For a clip of length L frames, there are L-1 optical-flow fields.
2. Feeding only the flow between two consecutive frames into a 2D network reduces the task to a single-step classification, which the authors argue is too weak. To model temporal structure, they **stack multiple flow maps**—first stacking horizontal displacement, then vertical displacement.

   2.1 Simple direct stacking.

   2.2 Stacking along flow trajectories.

   2.3 Experiments show trajectory-based stacking underperforms stacking anchored at initial pixel locations.

   <img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/2StreamConvNet/2StreamConvNet-img3.png" alt="avatar" style="zoom:67%;" />
3. **Bidirectional optical flow**: this bidirectional setup at least does not hurt accuracy.

### Implementation Details

1. Sample 25 frames at equal intervals regardless of the original clip length.
2. Test-time evaluation uses many crops/views (dataset-dependent).
3. Optical-flow extraction is slow, and dense flow maps are storage-heavy; the authors also propose compression strategies.

### Evaluation

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/2StreamConvNet/2StreamConvNet-img4.png" alt="avatar" style="zoom:67%;" />

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/2StreamConvNet/2StreamConvNet-img5.png" alt="avatar" style="zoom:67%;" />

<HR align=left color=#987cb9 SIZE=1>
