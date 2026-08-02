---
layout: post
title: CVPR-2021 Masked Autoencoders Are Scalable Vision Learners
categories: [CV]
tags: [vision-language, Transformer]
proceedings: CVPR
date: 2021-11-06
lang: en
alt_url: /zh/notes/cv/Masked-Autoencoders-Are-Scalable-Vision-Learners/
permalink: /notes/cv/Masked-Autoencoders-Are-Scalable-Vision-Learners/
---

> Paper: [Masked Autoencoders Are Scalable Vision Learners](http://arxiv.org/abs/2111.06377)

## Self-supervised, generative pre-training with ViT in the spirit of BERT

1. Mask a larger fraction of patches so that the visible patches are less redundant, which makes the pretext task harder and pushes the model toward more robust representations.
2. The encoder processes only unmasked tokens, which speeds up training; a transformer decoder reconstructs the raw pixel values directly, keeping the overall pipeline simple.
3. Techniques introduced in the ViT line of work further stabilize and strengthen training.

<HR align=left color=#987cb9 SIZE=1>
