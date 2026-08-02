---
layout: post
title: ICML-2021 Is Space-Time Attention All You Need for Video Understanding
categories: [CV]
tags: [video, vision-language, transformer]
proceedings: ICML
date: 2021-01-09
lang: en
alt_url: /zh/notes/cv/Is-Space-Time-Attention-All-You-Need-for-Video-Understanding/
permalink: /notes/cv/Is-Space-Time-Attention-All-You-Need-for-Video-Understanding/
---

> Paper: [Is Space-Time Attention All You Need for Video Understanding](http://proceedings.mlr.press/v139/bertasius21a/bertasius21a-supp.pdf)

## Timesformer: Detailed Experiments on Adapting ViT to Video Understanding

### Abstract

Adapt the vision transformer to video understanding.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Timesformer/img1.png" alt="avatar" style="zoom:60%;" /></div>

The authors evaluated the five architectures above.

- S
  - Self-attention on spatial feature maps only—the same self-attention used in the image Vision Transformer.

- ST
  - A brute-force variant: self-attention jointly over all three video dimensions, but the representation is too large to fit in GPU memory.
- T+S
  - The main method in this paper: factorize 3D attention by applying temporal self-attention first, then spatial.
- L+G
  - Local attention in small windows first, then global attention, reducing complexity.
- T+W+H
  - Self-attention only along specific axes, decomposing the 3D volume into 1+1+1, which also lowers complexity.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Timesformer/img2.png" alt="avatar" style="zoom:60%;" /></div>

The diagram is very clear: blue patches are the baseline and attend to other patches; green denotes temporal attention; yellow marks local and axis-wise attention; purple marks global and axis-wise attention.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Timesformer/table1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Timesformer/img3.png" alt="avatar" style="zoom:50%;" /></div>

Using 2D-only attention performs relatively well on Kinetics-400 because the dataset is biased toward static content; on Something-Something V2 the results are worse, so the temporal dimension must be modeled.

Joint space–time attention is strong, but cost grows sharply as the number of frames increases; gray entries indicate out-of-memory failures—training is infeasible.

Training time is shorter and inference is faster, though accuracy is not strictly the best; SlowFast with ResNet-101 can exceed 80 on K400.

Scaling up Timesformer also reaches SOTA.

### Conclusion

Four advantages:

- Simple idea
- SOTA on several action recognition benchmarks
- Low training and inference cost
- Can process videos longer than one minute

<HR align=left color=#987cb9 SIZE=1>

