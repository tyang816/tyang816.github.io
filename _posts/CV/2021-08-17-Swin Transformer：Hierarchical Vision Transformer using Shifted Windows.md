---
layout: post
title: ICCV-2021 Swin Transformer：Hierarchical Vision Transformer using Shifted Windows
categories: [CV]
tags: [vision-language, transformer]
proceedings: ICCV
date: 2021-08-17
lang: en
alt_url: /zh/notes/cv/Swin-Transformer：Hierarchical-Vision-Transformer-using-Shifted-Windows/
permalink: /notes/cv/Swin-Transformer：Hierarchical-Vision-Transformer-using-Shifted-Windows/
redirect_from:
  - "/cv/Swin-Transformer：Hierarchical-Vision-Transformer-using-Shifted-Windows/"
  - "/CV/Swin-Transformer：Hierarchical-Vision-Transformer-using-Shifted-Windows/"
---

> Paper: [Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://openaccess.thecvf.com/content/ICCV2021/papers/Liu_Swin_Transformer_Hierarchical_Vision_Transformer_Using_Shifted_Windows_ICCV_2021_paper.pdf)

## Swin Transformer: a hierarchical Transformer with Patch Merging and shifted windows

1. ViT patches images and applies global self-attention for global modeling, but this comes at the cost of weaker multi-scale representation. Multi-scale features matter for downstream CV tasks. Swin performs local attention within windows and uses shifted windows to enable cross-window interaction, approximating global modeling while saving memory and achieving strong performance.
2. Toward a unified CV–NLP modeling paradigm, ViT is more general: it relies on little inductive bias and performs well in both domains without extra structure. Swin incorporates more prior knowledge, analogous to the sliding-window design in CNNs.
3. Patch Merging: an operation similar to strided convolution for downsampling feature maps.

   ![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Swin/swin-img1.png)
4. Shifted windows: window-based self-attention together with shifted-window self-attention reduces computation while improving global receptive field.
5. Efficiency of shifted-window attention: masked attention; relative positional encoding instead of absolute positional encoding.

   5.1 After window shifting, the number of patches can increase; patches of inconsistent spatial layout cannot be batched directly, whereas zero-padding implicitly adds unnecessary computation.
   ![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Swin/swin-img2.png)

   5.2 The method partitions and pads regions, applies masked MSA so patches assigned to the same partition do not attend across partition boundaries, then reverses the cyclic shift—avoiding unbounded spatial drift of the feature map.

   ![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Swin/swin-img3.png)

<HR align=left color=#987cb9 SIZE=1>
