---
layout: post
title: CVPR-2018 A Closer Look at Spatiotemporal Convolutions for Action Recognition
categories: [CV]
tags: [video, action-recognition]
proceedings: CVPR
date: 2018-04-12
lang: en
alt_url: /zh/notes/cv/A-Closer-Look-at-Spatiotemporal-Convolutions-for-Action-Recognition/
permalink: /notes/cv/A-Closer-Look-at-Spatiotemporal-Convolutions-for-Action-Recognition/
---

> Paper: [A Closer Look at Spatiotemporal Convolutions for Action Recognition](https://openaccess.thecvf.com/content_cvpr_2018/papers/Tran_A_Closer_Look_CVPR_2018_paper.pdf)

## R2+1D: Decomposing 3D Networks Helps Training

### Abstract

The authors observe that applying a 2D network to extract features frame by frame on video still performs competitively in action recognition—not dramatically worse than full 3D models. That raises the question of whether mixing 2D convolutions (or using 2D in part of the stack) can work well too, since 2D is much cheaper than 3D.

This paper is experimental: it compares architectures such as 2D-then-3D versus splitting 3D into 1D plus 2D. The main finding is that **decomposing 3D convolution into spatial 2D and temporal 1D gives better accuracy** and is easier to train.

Strong results are reported on Sports-1M, Kinetics-400, UCF101, and HMDB51.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/R2+1D/img1.png" alt="avatar" style="zoom:60%;" /></div>

The authors run ablations over these design choices to see which works best.

a) R2D

- Pure 2D network: each frame in a video clip is processed independently for feature extraction and training.

b) MCx

- Top-heavy design.
- A video clip enters a 3D stack at the bottom to learn spatiotemporal features; upper layers switch to 2D to reduce complexity.

c) rMCx

- Bottom-heavy design.
- A clip is split into frames; 2D convolutions extract per-frame features, then 3D layers fuse them.

d) R3D

- Fully 3D network throughout.

e) R(2+1)D

- Each 3D convolution is replaced by two separate convolutions.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/R2+1D/img2.png" alt="avatar" style="zoom:60%;" /></div>

Apply spatial 2D convolution first, then a projection that keeps the parameter count matched, followed by temporal 1D convolution.

Benefits:

- Two nonlinear stages instead of one, which strengthens the model’s nonlinear capacity.

  Figure 3

- Learning a raw 3D kernel directly is harder to optimize; the factorized form trains more easily.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/R2+1D/table2.png" alt="avatar" style="zoom:60%;" /></div>

Ablation results: pure 2D is cheapest; adding 3D increases cost, but hybrid designs achieve the best performance.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/R2+1D/table5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/R2+1D/table6.png" alt="avatar" style="zoom:50%;" /></div>

On Kinetics-400, RGB-only and flow-only R(2+1)D each outperform I3D, but the two-stream combination falls short of I3D.

The same pattern appears on UCF101 and HMDB51—even the flow stream can trail I3D, which is hard to reconcile. The authors suggest I3D was pretrained on ImageNet plus Kinetics whereas they use Kinetics only; in practice, however, the I3D paper also reports Kinetics-only pretraining and still beats these numbers.

Where R(2+1)D clearly wins is optimization stability and efficiency: with 112×112 inputs, it is much more GPU-friendly.

<HR align=left color=#987cb9 SIZE=1>
