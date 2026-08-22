---
layout: post
title: CVPR-2017 Quo Vadis, Action Recognition? A New Model and the Kinetics Dataset
categories: [CV]
tags: [vision-language, video, action-recognition]
proceedings: CVPR
date: 2017-05-22
lang: en
alt_url: /zh/notes/cv/Quo-Vadis,-Action-Recognition-A-New-Model-and-the-Kinetics-Dataset/
permalink: /notes/cv/Quo-Vadis,-Action-Recognition-A-New-Model-and-the-Kinetics-Dataset/
redirect_from:
  - "/cv/Quo-Vadis,-Action-Recognition-A-New-Model-and-the-Kinetics-Dataset/"
  - "/CV/Quo-Vadis,-Action-Recognition-A-New-Model-and-the-Kinetics-Dataset/"
---

> Paper: [Quo Vadis, Action Recognition? A New Model and the Kinetics Dataset](http://ieeexplore.ieee.org/document/8099985/)
>
> From Figure 1 in the paper, it is hard to tell what is actually happening—whether a kiss occurred or not—and what happens next is difficult to predict from a single video frame; only with context can one predict well.
>
> Even the Kinetics dataset suffers from this limitation: predicting a frame in the middle of a clip can still work very well, which suggests models may not need strong temporal modeling to perform well.
>
> To this day, there is still no widely accepted way to build a dataset that forces models to learn temporal structure for long, complex videos and generalize across tasks.

## Kinetics and I3D: New Data and a New Model for Video Understanding

### Abstract

The video community lacked strong datasets, making it hard to understand and identify better architectures. This paper introduces the large-scale Kinetics dataset and the I3D model, reaching 80.2% on HMDB-51 and 98% on UCF-101—essentially saturating both benchmarks.

The key in I3D is the **I**, i.e., the **Inflate** operation. The authors argue that good pretrained weights matter a lot; prior work relied on 2D networks, so the focus became **expanding 2D into 3D without changing the overall network design**.

### Introduction

ImageNet’s impact is not only enabling deep network training; critically, it allows direct feature extraction from pretrained networks.

Deep learning has succeeded in segmentation, prediction, action assessment, classification, and more, but the recipe of large-scale pretraining followed by transfer to small video datasets had not been demonstrated as clearly—largely because no large video dataset existed.

After building a new dataset, a common first step is to benchmark prior state-of-the-art methods. That serves two purposes:

- Inspect strengths and weaknesses of earlier approaches.
- Validate the new dataset. Newly collected data may carry bias that makes it too easy or too hard, discouraging adoption.

The authors combine two-stream and convolutional designs and no longer compare against purely traditional pipelines.

### Model & Related Work

From 2017 onward, video understanding had no consensus on whether 2D, 3D, or Transformers were best.

Main options at the time:

- 2D networks plus temporal modules (e.g., LSTM)
- Plus optical flow
- 3D networks

After extensive comparisons, the authors propose Two-Stream Inflated 3D ConvNets (I3D):

- Two-stream is used because it clearly improves accuracy.
- Inflation is used because earlier 3D nets had too many parameters; inflation lets one reuse deep, strong 2D backbones (VGG, Inception, ResNet, etc.) without requiring huge amounts of video data for training from scratch.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/I3D/I3D-img1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/I3D/I3D-img2.png" alt="avatar" style="zoom:60%;" /></div>

a) LSTM:

- Extract features frame by frame, run an LSTM for temporal modeling, and classify from the final state.
- Intuitive in theory, but performance is typically modest.

b) 3D-ConvNet:

- Clip a video segment and feed it end-to-end for joint spatiotemporal learning with 3D kernels (e.g., 3×3×3). Stack 3D conv and 3D pooling, then operate on the resulting representation.
- With enough data, results can be strong.

c) Two-Stream:

- Precompute optical flow, which encodes temporal motion; learn the mapping between actions and flow while the CNN itself does little explicit temporal modeling.
- Two 2D streams: spatial (one or more RGB frames, scene context) and temporal (flow images, motion); fuse features for prediction.

d) 3D-Fused Two-Stream:

- Combines (b) and (c), replacing two-stream averaging with a 3D ConvNet.

e) Two-Stream 3D-ConvNet:

- Two-stream 3D conv nets with late fusion by weighted averaging.

#### The New Two-Stream 3D-ConvNet

##### Inflating 2D ConvNets into 3D

**Brutally** convert a 2D network to 3D: each **2D** conv becomes **3D**, each 2D pooling layer becomes 3D. No custom 3D architecture design is required.

##### Bootsrapping 3D filters from 3D Filters

How to transfer 2D pretrained weights into 3D?

When validating initialization, one can feed the same input to the original and inflated models. The authors replicate the same image **N** times along time to form a pseudo-video. Matching outputs requires scaling the 3D model’s response by **1/N**.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/I3D/I3D-img3.png" alt="avatar" style="zoom:60%;" /></div>

The authors find it works best **not to downsample along time**: although a 3×3 conv might naively become 3×3×3, they use **1×3×3** kernels and change stride from 2×2 to **1×2×2**, so temporal length is preserved at the output. Temporal downsampling is applied only in later blocks.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/I3D/I3D-img4.png" alt="avatar" style="zoom:60%;" /></div>

Whether the temporal or spatial stream is weaker or stronger, fusion consistently yields large gains.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/I3D/I3D-img5.png" alt="avatar" style="zoom:60%;" /></div>

End-to-end fine-tuning usually performs better.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/I3D/I3D-img6.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

