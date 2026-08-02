---
layout: post
title: ICML-2021 ViLT：Vision-and-Language Transformer Without Convolution or Region Supervision
categories: [CV]
tags: [vision-language, contrastive-learning, transformer]
proceedings: ICML
date: 2021-02-05
lang: en
alt_url: /zh/cv/ViLT：Vision-and-Language-Transformer-Without-Convolution-or-Region-Supervision/
permalink: /cv/ViLT：Vision-and-Language-Transformer-Without-Convolution-or-Region-Supervision/
---

> Paper: [ViLT：Vision-and-Language Transformer Without Convolution or Region Supervision](https://proceedings.mlr.press/v139/kim21k.html)
>
> Code: <https://github.com/dandelin/ViLT>
>
> Does not use object-detection region features; the pipeline is simplified. Training is expensive and performance drops slightly, but inference time is greatly reduced.

## ViLT: Extending ViT to Multimodal Learning

### Abstract

Vision-and-language pretraining (VLP) brings large gains on downstream vision-and-language tasks. Methods often invest more compute on the visual side for better results, so most VLP approaches rely heavily on feature extraction—or treat the problem as object detection plus a ResNet-style convolutional backbone. Two main issues: (1) feature extraction dominates time compared with multimodal fusion; (2) expressiveness is limited by embeddings and a fixed visual vocabulary. ViLT is proposed as a minimal design.

### Introduction

Multimodal VLP has progressed quickly with pretrain-then-fine-tune. Models are typically pretrained on image–text pairs with image–text matching and MLM objectives (nearly universal), then fine-tuned on downstream bimodal tasks.

Pixels cannot be fed directly into VLP; pixels and tokens must be embedded into discrete high-level semantic features before the transformer. Hence most work depends on **object detectors** (**because (1) detected regions are naturally discrete, semantic representations; (2) in tasks such as VQA, objects are often tightly coupled to the question**). More object categories generally help image–text alignment.

Object-detection feature extraction is costly, so some work reduces that cost—e.g., Pixel-BERT uses an ImageNet-pretrained ResNet to produce feature maps as a discrete sequence, so compute is only the backbone without a detection head.

Even then an image encoding stage remains and is slow; ViT-inspired patchification is one way to extract features.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Earlier top-performing models used region features (object-centric representations). Grid features drop the detection stage; ViLT is like ViT with the backbone replaced by a learnable linear projection—very fast with competitive results.

Main contributions:

- ViLT is the simplest architecture to date, with large speedups and fewer parameters
- Performance drop without region features or ResNet backbones is small
- First use of image augmentation in VLP

### Background

#### Taxonomy of Vision-and-Language Models

Four categories by (1) relative capacity for image vs. text and parameter balance; (2) how modalities are fused.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### Modality Interaction Schema

Single-stream: concatenate the two sequences and learn cross-modal interaction. Dual-stream: process each modality first, then fuse.

Dual-stream often works better but adds more parameters.

#### Visual Embedding Schema

##### Region Feature

Given an image: backbone, NMS, and RoI head.

##### Grid Feature

Cheaper to use, but still relatively costly and performance drops more.

##### Patch Projection

Patchify the image as in ViT.

### Vision-and-Language Transformer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/fig3.png" alt="avatar" style="zoom:60%;" /></div>

#### Whole Word Masking

WordPiece may split “giraffe” into [gi, ##raf, ##fe]. Masking only the middle subword is too easy—the model can guess from gi and fe without using the image. Masking the whole word forces reconstruction from visual context (e.g., “giraffe”).

#### Image Augmentation

Prior multimodal methods could not use augmentation because features were precomputed and stored on disk; augmentation would require re-extraction.

The authors use RandAugment but omit color jitter and cropping, since those changes would alter the semantics of the paired text.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/tab2.png" alt="avatar" style="zoom:50%;" /></div>

Region-feature models still score best, but ViLT trades accuracy for speed.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/tab3-tab4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLT/tab5.png" alt="avatar" style="zoom:60%;" /></div>

The authors try image masking (MPP) with little benefit here; later work shows tricks that make the idea useful.

### Conclusion and Future Work

**Scalability**: larger models help; **Masked Modeling for Visual Inputs**: image reconstruction; **Augmentation Strategies**: large gains.

<HR align=left color=#987cb9 SIZE=1>

