---
layout: post
title: NeurIPS-2020 Bootstrap your own latent：A new approach to self-supervised Learning
categories: [CV]
tags: [self-supervised learning]
proceedings: NeurIPS
date: 2020-12-06
lang: en
alt_url: /zh/notes/cv/Bootstrap-your-own-latent：A-new-approach-to-self-supervised-Learning/
permalink: /notes/cv/Bootstrap-your-own-latent：A-new-approach-to-self-supervised-Learning/
---

> Paper: [Bootstrap your own latent: A new approach to self-supervised Learning](https://papers.nips.cc/paper_files/paper/2020/file/f3ada80d5c4ee70142b17b8192b2958e-Paper.pdf)

## BYOL: No negative samples—turn matching into a prediction task

1. In contrastive learning, negative samples provide a necessary constraint. Optimizing with positive pairs alone makes shortcut solutions easy: when similar instances are pushed toward similar features, the model can map every input to the same output so all features collapse, the loss goes to zero, and nothing is learned (representation collapse). Negatives require dissimilar instances to stay apart as well as similar ones to align; identical outputs for everything would incur large loss on negatives and force more discriminative features.
2. Forward pass: $f_\theta$ is updated by gradients; $f_\xi$ is a momentum encoder; $g_\theta$ and $q_\theta$ are MLP layers. The upper branch acts as the query encoder and the lower as the key encoder. The two branches use different targets and are trained with MSE loss.

![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BYOL/BYOL-img1.png)

<HR align=left color=#987cb9 SIZE=1>
