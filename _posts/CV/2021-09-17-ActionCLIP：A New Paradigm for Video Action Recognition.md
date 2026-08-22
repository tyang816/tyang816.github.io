---
layout: post
title: arXiv-2021 ActionCLIP：A New Paradigm for Video Action Recognition
categories: [CV]
tags: [video, action-recognition, contrastive-learning]
proceedings: arXiv
date: 2021-09-17
lang: en
alt_url: /zh/notes/cv/ActionCLIP：A-New-Paradigm-for-Video-Action-Recognition/
permalink: /notes/cv/ActionCLIP：A-New-Paradigm-for-Video-Action-Recognition/
redirect_from:
  - "/cv/ActionCLIP：A-New-Paradigm-for-Video-Action-Recognition/"
  - "/CV/ActionCLIP：A-New-Paradigm-for-Video-Action-Recognition/"
---

> Paper: [ActionCLIP：A New Paradigm for Video Action Recognition](https://arxiv.org/pdf/2109.08472.pdf)
>
> Code: <https://github.com/sallymmx/actionclip>

## ActionCLIP: Text-Prompted Video Action Recognition

### Abstract

This paper reframes action recognition from a new angle: within a multimodal learning framework, the task is modeled as video–text matching by leveraging the semantic content of label text rather than mapping labels to discrete class indices. Language supervision strengthens video representations and enables zero-shot transfer. The approach first learns representations from large-scale pre-training on web image–text or video–text data, then uses prompt engineering so that action recognition more closely resembles the pre-training objective, and finally fine-tunes end-to-end on the target dataset.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/fig1.png" alt="avatar" style="zoom:70%;" /></div>

The top half of Figure 1 summarizes prior practice in video action understanding: videos are encoded by a video encoder, the embedding passes through a classification head, and training minimizes supervised loss against numeric labels.

The central limitation is that supervised learning requires labels, yet defining categories and collecting labeled data for video understanding is extremely difficult. In ImageNet, object categories are crisp—an apple is an apple, a banana is a banana—but action understanding admits combinatorially many variants: “open” may mean opening a door, unscrewing a bottle cap, opening a window, and so on. Annotating ever more fine-grained action classes does not scale, so one must move beyond reliance on exhaustive manual labeling.

The bottom half of Figure 1 shows the authors’ design: a video encoder produces features, class names are treated as text to obtain text features, similarities are computed, and training aligns predictions with ground truth. A subtle issue is that the text comes from fixed class labels; with a large batch, multiple samples can share the same label (e.g., several “running” clips), so positives need not lie only on the diagonal of the similarity matrix—the setting is no longer strict one-hot classification. The authors therefore replace cross-entropy with a KL divergence loss.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/fig2.png" alt="avatar" style="zoom:60%;" /></div>

The overall pipeline closely follows CLIP.

- Figure 2b: text prompt templates—wrapping the action name in a sentence at the beginning, middle, and end.
- Figure 2c: temporal embeddings are combined with spatial tokens for the network to learn joint space–time representations.
- Figure 2d: a shift operation inserted in the middle of each block—simple and efficient.
- Figures 2e–g: aggregating multiple features along the temporal dimension into a single video-level representation.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Does a vision–language framework help—in particular, replacing one-hot labels with a language-guided training objective?

Table 1 indicates a gain of about three percentage points.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/tab2.png" alt="avatar" style="zoom:60%;" /></div>

How important is the pre-training stage?

CLIP-based initialization yields strong performance; text-side initialization is less critical because multimodal attention tends to focus on the visual branch—ViT initialization is typically used for the video encoder.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/tab4.png" alt="avatar" style="zoom:50%;" /></div>

Do prompts matter?

On the text side, omitting prompts drops accuracy by only a few tenths of a point; on the video side, the post-network module is clearly beneficial.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ActionCLIP/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Zero-shot performance is strong.

<HR align=left color=#987cb9 SIZE=1>
