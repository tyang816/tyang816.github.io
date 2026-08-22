---
layout: post
title: ICML-2020 A Simple Framework for Contrastive Learning of Visual Representations
categories: [CV]
tags: [contrastive-learning]
proceedings: ICML
date: 2020-07-01
lang: en
alt_url: /zh/notes/cv/A-Simple-Framework-for-Contrastive-Learning-of-Visual-Representations/
permalink: /notes/cv/A-Simple-Framework-for-Contrastive-Learning-of-Visual-Representations/
redirect_from:
  - "/cv/A-Simple-Framework-for-Contrastive-Learning-of-Visual-Representations/"
  - "/CV/A-Simple-Framework-for-Contrastive-Learning-of-Visual-Representations/"
---

> Paper: [A Simple Framework for Contrastive Learning of Visual Representations](https://proceedings.mlr.press/v119/chen20j/chen20j.pdf)
>
> Code: <https://github.com/google-research/simclr>

## SimCLR: Combining several ideas—MLP and nonlinearity on top of representations, stronger augmentations, and large batch sizes

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Simple Framework for Contrastive Learning of Visual Representations/img1.png" alt="avatar" style="zoom:60%;" /></div>

1. Two augmented views of the same image form a positive pair. With batch size N, there are N positive pairs; negatives are all other samples and their augmented views, i.e. 2(N−1). The encoder weights are shared across views.
2. A key SimCLR design is a projection head g—a single MLP layer plus nonlinearity—applied after the encoder h produces representation z. This head improves linear evaluation by roughly ten percentage points. g is used only during pretraining; downstream tasks use z alone. A one-layer nonlinear MLP works best; the dimension of z matters little, so a smaller dimension (e.g. 128) is sufficient.
3. Contrastive learning benefits from a rich set of augmentations: random crop, rotation, color jitter, Gaussian noise, Gaussian blur, and others. Ablations show random cropping and color transformations are the most effective.
4. Larger batch sizes and longer training yield better representations; LARS is used to stabilize optimization at large batch size.

<HR align=left color=#987cb9 SIZE=1>

