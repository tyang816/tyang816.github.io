---
layout: post
title: ICML-2022 BLIP：Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation
categories: [CV]
tags: [vision-language, transformer, contrastive-learning]
proceedings: ICML
date: 2022-01-24
lang: en
alt_url: /zh/cv/BLIP：Bootstrapping-Language-Image-Pre-training-for-Unified-Vision-Language-Under/
permalink: /cv/BLIP：Bootstrapping-Language-Image-Pre-training-for-Unified-Vision-Language-Under/
---

> Paper: [BLIP：Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation](http://arxiv.org/abs/2201.12086)
>

## BLIP: ALBEF + VLMO + Captioner + Filter

### Abstract

BLIP makes effective use of noisy web data by bootstrapping captions: a captioner generates synthetic captions, a filter removes noisy ones, and the model is trained on cleaner data.

### Introduction

Existing approaches face two main limitations:

- **Model perspective:** Prior work uses either a transformer encoder or an encoder–decoder architecture. Encoder-only models cannot be applied directly to text generation; encoder–decoder models lack a unified framework and cannot perform image–text retrieval in a straightforward way.
- **Data perspective:** Training relies on large-scale web-scraped image–text pairs. Scaling the dataset helps but is not the best solution alone, so the authors propose a captioner and a filter.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BLIP/fig1.png" alt="avatar" style="zoom:70%;" /></div>

Web-scraped data is highly noisy. A captioner module generates captions, and a filter decides which text to use for training.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BLIP/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Images are encoded with one ViT encoder; text is handled by three model variants tied to three objectives. Encoder and decoder components are combined into the MED model, with shared parameters indicated by matching colors in the figure.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BLIP/fig3.png" alt="avatar" style="zoom:100%;" /></div>

The dataset $D$ consists of web-scraped pairs $\{(I_w,T_w)\}$ and manually annotated pairs $\{(I_h,T_h)\}$. The main issue with scraped data is image–text mismatch (shown in red); matched pairs are shown in green.

Parts of the trained MED model are fine-tuned on clean data: ITC and ITM fine-tuning yield the filter; LM fine-tuning yields the captioner. Synthetic data from the captioner is passed through the filter to obtain a cleaner set. The final training set combines filtered, synthetic, and existing real annotations.

### Experiments and Discussions

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BLIP/tab1-tab3.png" alt="avatar" style="zoom:100%;" /></div>

Table 1 shows that larger models and more data both improve results. Using the captioner and filter works well; the captioner and filter need not match the downstream model size (e.g., a base model for training can use large models for captioning and filtering)—they act as a fairly general tool.

Generated captions vary in quality, but filtering is strong enough to retain better-matched image–text pairs.


<HR align=left color=#987cb9 SIZE=1>
