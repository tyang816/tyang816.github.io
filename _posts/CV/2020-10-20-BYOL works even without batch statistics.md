---
layout: post
title: arXiv-2020 BYOL works even without batch statistics
categories: [CV]
tags: [vision-language, transformer, contrastive-learning]
proceedings: arXiv
date: 2020-10-20
lang: en
alt_url: /zh/notes/cv/BYOL-works-even-without-batch-statistics/
permalink: /notes/cv/BYOL-works-even-without-batch-statistics/
redirect_from:
  - "/cv/BYOL-works-even-without-batch-statistics/"
  - "/CV/BYOL-works-even-without-batch-statistics/"
---

> Paper: [BYOL works even without batch statistics](http://arxiv.org/abs/2010.10241)

## BYOL v2: On Batch Norm Not Being Unique to BYOL

1. Through extensive ablation experiments, the authors identify edge cases and explanations. When SimCLR omits batch norm in both the projector and the encoder, SimCLR also fails. This shows that without normalization, not only BYOL but SimCLR fails as well—even with negative samples, training does not succeed. That argues batch norm is not acting as an implicit source of negative samples.
2. The main conclusion is that batch norm primarily stabilizes training and prevents representation collapse. They also note that with a sufficiently good initialization, training can proceed without batch norm.

<HR align=left color=#987cb9 SIZE=1>
