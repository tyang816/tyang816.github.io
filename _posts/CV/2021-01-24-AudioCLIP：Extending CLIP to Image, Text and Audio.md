---
layout: post
title: GCPR-2021 AudioCLIP：Extending CLIP to Image, Text and Audio
categories: [CV]
tags: [vision-language, transformer, contrastive-learning]
proceedings: GCPR
date: 2021-01-24
lang: en
alt_url: /zh/cv/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/
permalink: /cv/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/
---

> Paper: [AudioCLIP：Extending CLIP to Image, Text and Audio](http://arxiv.org/abs/2106.13043)
>
> Code: <https://github.com/AndreyGuzhov/AudioCLIP>

## AudioCLIP: tri-modal contrastive learning on video data

### Abstract

Adds audio as a third modality alongside text and image, integrating the ESResNeXt audio model into the CLIP framework using audio datasets.

### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AudioCLIP/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Several video datasets provide aligned text, image, and audio within each clip; the architecture follows CLIP and incorporates all three modalities. Because the modalities are paired, contrastive learning is straightforward.

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AudioCLIP/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AudioCLIP/tab4.png" alt="avatar" style="zoom:60%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
