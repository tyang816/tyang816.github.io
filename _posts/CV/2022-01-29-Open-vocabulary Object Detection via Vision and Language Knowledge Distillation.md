---
layout: post
title: ICLR-2022 Open-vocabulary Object Detection via Vision and Language Knowledge Distillation
categories: [CV]
tags: [vision-language, contrastive-learning, object-detection]
proceedings: ICLR
date: 2022-01-29
lang: en
alt_url: /zh/cv/Open-vocabulary-Object-Detection-via-Vision-and-Language-Knowledge-Distillation/
permalink: /cv/Open-vocabulary-Object-Detection-via-Vision-and-Language-Knowledge-Distillation/
---

> Paper: [Open-vocabulary Object Detection via Vision and Language Knowledge Distillation](https://openreview.net/forum?id=lL3lnMbR4WU)
>
> Code: <https://github.com/tensorflow/tpu/tree/master/models/official/detection/projects/vild>

## ViLD: open-vocabulary object detection via CLIP knowledge distillation

### Abstract

Knowledge from a pretrained open-vocabulary image classification model (teacher) is distilled into a two-stage detector (student). The teacher encodes text and target image regions; the student detector is trained so that embeddings of detected box regions align with the text and image embeddings produced by the teacher at inference time.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/fig1.png" alt="avatar" style="zoom:60%;" /></div>

The paper targets open-vocabulary object detection: without collecting extra labels for categories beyond the base set, the model should still detect novel instances (e.g., a yellow rubber duck)—that is, generalize to novel categories at test time.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/fig2.png" alt="avatar" style="zoom:60%;" /></div>

- **Training:**
  - **ViLD-text:** Given an image and base classes, region proposals come from the RPN; conv layers yield region embeddings. Base-class names are turned into prompts and encoded by the text encoder; cross-entropy is computed against the green (base) text embeddings.
  - **ViLD-image:** Cached region proposals (e.g., dice, stop sign) are passed through CLIP to obtain CLIP embeddings; the student is trained so image-side and region embeddings (I and R) stay close—image-side knowledge distillation.
- **Inference:**
  - Given an image and base plus novel (blue) categories, the image branch produces region embeddings; text is encoded and matched via dot products for zero-shot detection.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/fig3.png" alt="avatar" style="zoom:60%;" /></div>

These baselines are Mask R-CNN–style: stage one outputs region proposals (N proposals in the figure); stage two runs a detection head on each proposal to get a region embedding, then a classification head assigns the bounding-box category. The pipeline is essentially box regression plus classification.

- **(a)** Supervised baseline.
- **(b)** CLIP-style fusion: text is injected via prompts, embedded, and matched to the image by dot-product similarity—still trained with full supervision on base categories, with anything outside the base set collapsed into a background class. Vision and language are tied together in the head, but because training uses only base categories (CB), zero-shot performance remains limited.

  - <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/frm2.png" alt="avatar" style="zoom:60%;" /></div>
- **(c)** Image-side distillation: a CLIP-pretrained model supervises the student; labels are no longer manual category IDs but CLIP embeddings, so learning is not confined to base classes and open-vocabulary behavior improves.

  - Sampling N proposals and running CLIP on the fly each step is slow and costly, so the authors precompute proposals with an RPN, store them on disk, and precompute CLIP embeddings—making training much faster.
- **(d)** Combines (b) and (c): cross-entropy on N online inference proposals; L1 loss on M precomputed (cached) proposals.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/tab4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ViLD/tab5,fig4.png" alt="avatar" style="zoom:60%;" /></div>

Results when extending directly to other datasets.

<HR align=left color=#987cb9 SIZE=1>

