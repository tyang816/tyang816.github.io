---
layout: post
title: ICLR-2021 An Image is Worth 16x16 Words：Transformers for Image Recognition at Scale
categories: [CV]
tags: [vision-language, transformer]
proceedings: ICLR
date: 2021-01-13
lang: en
alt_url: /zh/notes/cv/An-Image-is-Worth-16x16-Words：Transformers-for-Image-Recognition-at-Scale/
permalink: /notes/cv/An-Image-is-Worth-16x16-Words：Transformers-for-Image-Recognition-at-Scale/
---

> Paper: [An Image is Worth 16x16 Words:Transformers for Image Recognition at Scale](https://openreview.net/forum?id=YicbFdNTTy)

## ViT breaks the barrier between NLP and CV—and opens opportunities in multimodal learning

1. Split an image into 16×16 patches, treat each patch as a token, and feed the sequence into a Transformer.
2. With enough data, the approach works well: it learns global features, and no clear performance ceiling has emerged so far.

Comment: Fine-tuning code and pre-trained models are available at https://github.com/google-research/vision_transformer. ICLR camera-ready version with 2 small modifications: 1) Added a discussion of CLS vs GAP classifier in the appendix, 2) Fixed an error in exaFLOPs computation in Figure 5 and Table 6 (relative performance of models is basically not affected)

<HR align=left color=#987cb9 SIZE=1>
