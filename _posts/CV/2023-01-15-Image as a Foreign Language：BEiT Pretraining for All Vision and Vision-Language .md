---
layout: post
title: CVPR-2023 Image as a Foreign Language：BEiT Pretraining for All Vision and Vision-Language Tasks
categories: [CV]
tags: [vision-language]
proceedings: CVPR
date: 2023-01-15
lang: en
alt_url: /zh/notes/cv/Image-as-a-Foreign-Language：BEiT-Pretraining-for-All-Vision-and-Vision-Language-/
permalink: /notes/cv/Image-as-a-Foreign-Language：BEiT-Pretraining-for-All-Vision-and-Vision-Language-/
redirect_from:
  - "/cv/Image-as-a-Foreign-Language：BEiT-Pretraining-for-All-Vision-and-Vision-Language-/"
  - "/CV/Image-as-a-Foreign-Language：BEiT-Pretraining-for-All-Vision-and-Vision-Language-/"
---

> Paper: [Image as a Foreign Language：BEiT Pretraining for All Vision and Vision-Language Tasks](https://openaccess.thecvf.com/content/CVPR2023/papers/Wang_Image_as_a_Foreign_Language_BEiT_Pretraining_for_Vision_and_CVPR_2023_paper.pdf)
>
> Code: <https://aka.ms/beit-3>

## BEIT-3: Multimodal Masked Language Model

### Abstract

The work introduces multi-way transformers and applies masked language modeling to images (“Imglish”), text (English), and image–text pairs treated as parallel sentences.

### Introduction: The Big Convergence

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/fig1.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/tab1.png" alt="avatar" style="zoom:80%;" /></div>

Language, vision, and multimodal learning are moving toward a unified foundation-model paradigm; this paper aims to advance that unified-framework line further. The convergence is driven mainly by three trends:

- Transformers have spread from NLP into CV and multimodal modeling. For vision–language tasks, dual-encoder models suit fast retrieval, encoder–decoder stacks suit generation, and fusion-encoder designs are strong for joint image–text encoding. Even so, most foundation models still need architectural or interface tweaks to match downstream input–output formats.
- Masked modeling transfers well across modalities. Stacking many auxiliary losses hurts efficiency, and balancing their weights is hard—some objectives complement each other while others compete, which makes tuning largely manual. The authors therefore rely on a single MLM objective: every modality is a sequence of tokens, and an image paired with text can be read as parallel sentences (sentence 1 followed by sentence 2).
- Scaling model and data capacity: only a sufficiently large model can cover diverse tasks, so parameters are pushed to the billion scale while pretraining still draws on public data resources.

### BEIT-3: A General-Purpose Multimodal Foundation Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/fig2.png" alt="avatar" style="zoom:80%;" /></div>

Architecturally the model follows VLMO: early multi-head self-attention is shared across modalities, while the feed-forward networks (FFNs) are modality-specific. Pretraining masks either the image or the text—both are cloze-style prediction tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/fig3.png" alt="avatar" style="zoom:80%;" /></div>

Adaptation to downstream tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/tab2-tab3.png" alt="avatar" style="zoom:80%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/tab4.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/tab5-tab6.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/tab7.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BEIT-3/tab8-tab9.png" alt="avatar" style="zoom:80%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
