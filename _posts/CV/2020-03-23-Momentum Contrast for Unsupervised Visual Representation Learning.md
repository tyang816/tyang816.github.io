---
layout: post
title: CVPR-2020 Momentum Contrast for Unsupervised Visual Representation Learning
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: CVPR
date: 2020-03-23
lang: en
alt_url: /zh/notes/cv/Momentum-Contrast-for-Unsupervised-Visual-Representation-Learning/
permalink: /notes/cv/Momentum-Contrast-for-Unsupervised-Visual-Representation-Learning/
---

> Paper: [Momentum Contrast for Unsupervised Visual Representation Learning](https://ieeexplore.ieee.org/document/9157636/)

## MoCo v1: Contrastive learning as dictionary lookup, with a queue and momentum encoder for a large dictionary

1. Strong writing craft: The first paragraph of the intro contrasts CV and NLP and explains why unsupervised learning has underperformed in CV; the second introduces contrastive learning without heavy detail, summarizes prior methods as dictionary lookup, and proposes MoCo under a unified CV/NLP framing—broadening the paper’s overall scope.
2. Two design constraints are validated: the dictionary should be large, and representations should be consistent.

   A large dictionary forces the model to learn more discriminative features;

   Consistency keeps learning in a shared, semantically aligned encoder space and helps avoid shortcut solutions.
3. The encoder is updated by gradient backpropagation; the momentum encoder is updated with a large momentum coefficient. A queue structure links batch size to dictionary size so the dictionary can be made sufficiently large.

<HR align=left color=#987cb9 SIZE=1>
