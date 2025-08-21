---
layout: post
title: ICLR-2021 An Image is Worth 16x16 Words：Transformers for Image Recognition at Scale
categories: [CV]
tags: [vision-language, transformer]
proceedings: ICLR
date: 2021-01-13
---

> 论文地址：[An Image is Worth 16x16 Words:Transformers for Image Recognition at Scale](https://openreview.net/forum?id=YicbFdNTTy)

## ViT，打破了NLP和CV的壁垒，同时在多模态领域也挖坑

1. 将图片分割为16x16的各个patch，视作一个个的词，然后输入transformer结构中
2. 在数据量足够大的情况下效果很好，能够学习到全局特征，并且暂时没有看到性能瓶颈

Comment: Fine-tuning code and pre-trained models are available at https://github.com/google-research/vision_transformer. ICLR camera-ready version with 2 small modifications: 1) Added a discussion of CLS vs GAP classifier in the appendix, 2) Fixed an error in exaFLOPs computation in Figure 5 and Table 6 (relative performance of models is basically not affected)

<HR align=left color=#987cb9 SIZE=1>
