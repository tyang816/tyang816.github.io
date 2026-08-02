---
layout: post
title: SIGGRAPH-2022 CLIPasso：Semantically-Aware Object Sketching
categories: [CV]
tags: [contrastive-learning]
proceedings: SIGGRAPH
date: 2022-07-22
lang: en
alt_url: /zh/cv/CLIPasso：Semantically-Aware-Object-Sketching/
permalink: /cv/CLIPasso：Semantically-Aware-Object-Sketching/
---

> Paper: [CLIPasso：Semantically-Aware Object Sketching](https://dl.acm.org/doi/10.1145/3528223.3530068)
>
> Project page: <https://clipasso.github.io/clipasso/>

## CLIPasso: object sketches via geometric and semantic losses

### Abstract

CLIPasso is introduced as a method that renders objects at different levels of abstraction through geometric and semantic simplification. Because sketch generation traditionally depends heavily on sketch datasets for training, CLIP is used to extract semantic information from both sketches and images.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig2.png" alt="avatar" style="zoom:60%;" /></div>

Turning an image into a sketch is very difficult for computers: the system must identify salient features, and abstraction is hard to achieve.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig4.png" alt="avatar" style="zoom:60%;" /></div>

Prior work fixes abstraction in advance—more strokes imply less abstraction, fewer strokes imply more—and models largely reflect whatever sketch data they were trained on. This data-driven pipeline constrains style and form, runs counter to the spirit of image processing, and yields limited diversity.

Escaping supervised sketch data calls for a model with strong semantic understanding; CLIP fits this role. Trained on paired text and images, it captures semantics well, is sensitive to object identity rather than image style, and offers strong zero-shot behavior that can be used directly.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig5.png" alt="avatar" style="zoom:60%;" /></div>

Each stroke is controlled by four points, $s_i=\{p_i^j\}^4_j=1=\{(x_i,y_i)^j\}^4_{j=1}$. The model adjusts these four control points to define the curve; Bézier evaluation then shapes the curve into the final sketch.

CLIP acts as a teacher for distilling the optimized sketch representation.

#### Loss Function

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/frm1.png" alt="avatar" style="zoom:60%;" /></div>

If the target is described as a horse, the sketch features and the original image features should both encode “horse,” yielding the semantic loss $L_s$.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/frm2.png" alt="avatar" style="zoom:60%;" /></div>

Sketch features are pushed to match the original features, but semantic agreement alone is insufficient: two horses can match semantically while the sketch places the head on the wrong side. A geometric term $L_g$ therefore complements the semantic constraint. Features are taken from stages 2–4 of a ResNet-50 backbone rather than the final 2048-D vector; using earlier layers better preserves shape and orientation.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/frm3.png" alt="avatar" style="zoom:60%;" /></div>

#### Optimization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig7.png" alt="avatar" style="zoom:60%;" /></div>

Optimization runs for 2000 iterations but is fast; quality is already apparent after roughly 100 iterations.

#### Stroke Initialization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig8.png" alt="avatar" style="zoom:60%;" /></div>

Initial placement of Bézier control points matters. The authors use saliency-guided initialization: a pretrained vision transformer supplies multi-head self-attention from the last layer (weighted average), and points are sampled in more salient regions.

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig9.png" alt="avatar" style="zoom:60%;" /></div>

Sketches can be produced for uncommon objects as well.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig10.png" alt="avatar" style="zoom:60%;" /></div>

Abstraction level is controlled by the number of strokes initialized at the start.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIPasso/fig11.png" alt="avatar" style="zoom:60%;" /></div>

Compared with other methods, CLIPasso achieves stronger abstract sketches.

### Limitations

Performance drops when the image contains background; a single foreground object works best. The authors segment the object and sketch the foreground, but this two-stage pipeline may not be optimal.

Human sketching is sequential—one stroke after another—whereas CLIPasso generates all strokes jointly.

Using stroke count to control abstraction is both a strength and a limitation: the user must preset the count, and matching a desired abstraction level may require different stroke numbers that are hard to specify in advance. Letting the model decide whether two or three strokes (or more) suffice would be preferable.

<HR align=left color=#987cb9 SIZE=1>
