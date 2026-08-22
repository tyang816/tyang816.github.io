---
layout: post
title: NeurIPS-2020 Big Self-Supervised Models are Strong Semi-Supervised Learners
categories: [CV]
tags: [semi-supervised learning]
proceedings: NeurIPS
date: 2020-12-06
lang: en
alt_url: /zh/notes/cv/Big-Self-Supervised-Models-are-Strong-Semi-Supervised-Learners/
permalink: /notes/cv/Big-Self-Supervised-Models-are-Strong-Semi-Supervised-Learners/
redirect_from:
  - "/cv/Big-Self-Supervised-Models-are-Strong-Semi-Supervised-Learners/"
  - "/CV/Big-Self-Supervised-Models-are-Strong-Semi-Supervised-Learners/"
---

> Paper: [Big Self-Supervised Models are Strong Semi-Supervised Learners](https://dl.acm.org/doi/abs/10.5555/3495724.3497589)
>
> Code: <https://github.com/google-research/simclr>

## SimCLR v2 and semi-supervised learning

1. For improvements over SimCLR, the work uses larger models and a deeper projection head; empirically two layers suffice, and it references a momentum encoder.
2. The semi-supervised pipeline first learns a strong representation via self-supervised contrastive learning, then fine-tunes on a small labeled set. After fine-tuning, that model acts as a teacher to generate pseudo-labels so self-training can use more unlabeled data—following the spirit of Google’s 2019 Noisy Student.

   2.1 Noisy Student trains a teacher on ImageNet, generates pseudo-labels, and uses them to train a student model.

<HR align=left color=#987cb9 SIZE=1>

