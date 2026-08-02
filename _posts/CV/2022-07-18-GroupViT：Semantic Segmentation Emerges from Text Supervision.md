---
layout: post
title: CVPR-2022 GroupViT：Semantic Segmentation Emerges from Text Supervision
categories: [CV]
tags: [video, vision-language]
proceedings: CVPR
date: 2022-07-18
lang: en
alt_url: /zh/cv/GroupViT：Semantic-Segmentation-Emerges-from-Text-Supervision/
permalink: /cv/GroupViT：Semantic-Segmentation-Emerges-from-Text-Supervision/
---

> Paper: [GroupViT：Semantic Segmentation Emerges from Text Supervision](https://openaccess.thecvf.com/content/CVPR2022/papers/Xu_GroupViT_Semantic_Segmentation_Emerges_From_Text_Supervision_CVPR_2022_paper.pdf)
>
> Code: [https://jerryxu.net/GroupViT](https://jerryxu.net/GroupViT)

## GroupViT: Clustering for unsupervised semantic segmentation

### Abstract

Supervised semantic segmentation relies heavily on annotated segmentation masks. This work brings a grouping mechanism back into the network and trains on simple segmentation-style tasks using only text as the supervision signal.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GroupViT/fig2.png" alt="avatar" style="zoom:60%;" /></div>

The architecture adds grouping blocks and learnable group tokens so that neighboring pixels form segmentation masks; grouping improves as training progresses.

Group tokens resemble the CLS token, but instead of extracting one global image feature, they support segmentation: each region has its own feature representation. The model uses 64 tokens rather than 1, aggregating similar pixels into 61 clusters.

The image is patchified and concatenated with group tokens; after transformer layers, patches are assigned to 61 group tokens. The authors then merge finer-grained groups by adding 8 additional group tokens.

#### Learning from Image-Text Pairs

##### Multi-Label Image-Text Contrastive Loss

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GroupViT/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Training uses prompt learning for multi-label contrastive learning: nouns are sampled at random and turned into sentences via templates.

#### Zero-Shot Transfer to Semantic Segmentation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GroupViT/fig4.png" alt="avatar" style="zoom:60%;" /></div>

The image encoder yields 8 group embeddings; similarity to text features assigns each group to a class, which implies at most eight detectable categories.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GroupViT/tab1-tab3.png" alt="avatar" style="zoom:60%;" /></div>

Using 8 tokens appears to work best.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GroupViT/fig7.png" alt="avatar" style="zoom:60%;" /></div>

Cluster centers clearly act as cluster prototypes and achieve grouping-based segmentation.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GroupViT/tab5.png" alt="avatar" style="zoom:60%;" /></div>

Compared with unsupervised baselines, results improve somewhat, but supervised methods already reach the mid-80s and mid-50s on reported metrics—a large gap remains.

### Limitation and Future Work

- GroupViT still behaves largely like an image encoder: it does not fully exploit dense prediction, and it lacks multi-scale or richer contextual cues.
- Background handling: the authors use a threshold (e.g., a group embedding is assigned to a class only if similarity exceeds 0.9; otherwise it is treated as background). When foreground and background scores are similar, disambiguation is hard. A root cause is that CLIP-style training struggles with ambiguous regions—background is often a mixture of many categories—so the model mainly learns objects with very clear semantics.

<HR align=left color=#987cb9 SIZE=1>

