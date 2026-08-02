---
layout: post
title: NeurIPS-2021 VLMo：Unified Vision-Language Pre-Training with Mixture-of-Modality-Experts
categories: [CV]
tags: [vision-language, contrastive-learning, transformer]
proceedings: NeurIPS
date: 2021-12-01
lang: en
alt_url: /zh/cv/VLMo：Unified-Vision-Language-Pre-Training-with-Mixture-of-Modality-Experts/
permalink: /cv/VLMo：Unified-Vision-Language-Pre-Training-with-Mixture-of-Modality-Experts/
---

> Paper: [VLMo：Unified Vision-Language Pre-Training with Mixture-of-Modality-Experts](https://openreview.net/forum?id=bydKs84JEyw)
>
> Code: <https://aka.ms/vlmo>

## VLMo: Mixture-of-Modality Experts for Multimodal Learning

### Abstract

The method combines mixture-of-modality experts with staged pre-training.

### Introduction

Two mainstream architectures dominate multimodal learning today:

- **Dual encoders** (e.g., CLIP): cross-modal interaction reduces to cosine similarity between modality-specific representations. This design scales well to large-scale image–text retrieval and has strong commercial appeal, but the interaction is shallow—even CLIP often falls short of state-of-the-art methods on downstream tasks.
- **Fusion encoders**: images and text are encoded separately, then a shared Transformer encoder performs deep cross-modal fusion. They excel on vision–language classification-style tasks, but when the number of image–text pairs is huge, every pair must pass through the fusion stack at inference, which is slow and impractical on web-scale data.

The authors aim to combine the strengths of both paradigms so a single model can operate as a dual encoder or a fusion encoder. They propose **mixture-of-modality experts (MoME)**: each modality has dedicated feed-forward experts, and routing depends on the training objective and inference mode.

Pre-training uses three objectives: **ITC** (image–text contrastive learning), **ITM** (image–text matching), and **MLM** (masked language modeling).

Multimodal corpora are typically much smaller than unimodal image or text pools. The paper therefore adopts **staged pre-training**: first fit the vision expert on image-only data, then the language expert on text-only data, which yields substantial gains before full vision–language fine-tuning.

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VLMo/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Each modality is associated with its own FFN expert (MoME) while sharing other Transformer blocks.

For **ITC**, the model behaves like CLIP (dual towers with contrastive alignment). For **ITM** and **MLM**, it switches to a fusion-encoder layout with cross-modal self-attention.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VLMo/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Pre-training proceeds stage by stage from left to right. During language-only pre-training, the self-attention modules initialized from the vision stage are reused as-is—unusual but effective. In the final stage, all components are unfrozen for end-to-end vision–language fine-tuning.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VLMo/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VLMo/tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VLMo/tab3-tab4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VLMo/tab5-tab6.png" alt="avatar" style="zoom:100%;" /></div>

### Conclusion

Possible directions for future work:

- Scale up VLMo-style pre-training (e.g., BEiT-3 with ViT-G).
- Extend to more downstream vision–language tasks (e.g., VL-BEiT).
- Leverage unimodal pre-training to strengthen multimodal models.
- Apply the idea to speech (WavLM), video (LayoutLMv3), structured knowledge, and general-purpose foundation models (MetaLM).


<HR align=left color=#987cb9 SIZE=1>

