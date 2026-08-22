---
layout: post
title: ICCV-2021 An Empirical Study of Training Self-Supervised Vision Transformers
categories: [CV]
tags: [vision-language]
proceedings: ICCV
date: 2021-04-05
lang: en
alt_url: /zh/notes/cv/An-Empirical-Study-of-Training-Self-Supervised-Vision-Transformers/
permalink: /notes/cv/An-Empirical-Study-of-Training-Self-Supervised-Vision-Transformers/
redirect_from:
  - "/cv/An-Empirical-Study-of-Training-Self-Supervised-Vision-Transformers/"
  - "/CV/An-Empirical-Study-of-Training-Self-Supervised-Vision-Transformers/"
---

> Paper: [An Empirical Study of Training Self-Supervised Vision Transformers](http://arxiv.org/abs/2104.02057)
>
> Code: <https://github.com/facebookresearch/moco-v3>

## MoCo v3: Freezing the patch projection makes training smoother

1. Self-supervised ViT training is unstable; larger batches ought to help, but in practice training gets worse. They inspect gradient backpropagation layer by layer and find that when training yields a large loss, gradients spike; the spike occurs in the first layer—the patch projection.
2. Without modifying the transformer itself, only the beginning or the end can be changed. This highlights the importance of the first step—the tokenization stage—

<HR align=left color=#987cb9 SIZE=1>
