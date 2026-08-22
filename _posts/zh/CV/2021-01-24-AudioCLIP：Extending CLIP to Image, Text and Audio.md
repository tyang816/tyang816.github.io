---
layout: post
title: GCPR-2021 AudioCLIP：将 CLIP 扩展至图像、文本与音频
categories: [CV]
tags: [vision-language, transformer, contrastive-learning]
proceedings: GCPR
date: 2021-01-24
lang: zh-CN
alt_url: /notes/cv/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/
permalink: /zh/notes/cv/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/
redirect_from:
  - "/2021/01/24/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/"
  - "/zh/cv/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/"
  - "/zh/CV/AudioCLIP：Extending-CLIP-to-Image,-Text-and-Audio/"
---

> 论文地址：[AudioCLIP：Extending CLIP to Image, Text and Audio](http://arxiv.org/abs/2106.13043)
>
> 论文实现：<https://github.com/AndreyGuzhov/AudioCLIP>

## AudioCLIP：视频数据三种模态对比学习

### Abstract

在文本和图片的基础上加上了audio这个模态，使用音频集数据集将ESResNeXt音频模型合并到CLIP框架中

### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AudioCLIP/fig1.png" alt="avatar" style="zoom:60%;" /></div>

找了一些视频的数据集，视频里是存在文本，图片和音频三种模态的，就仿照CLIP的结构全加进来就行，这些数据都是成对出现的，所以很好做对比学习

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AudioCLIP/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AudioCLIP/tab4.png" alt="avatar" style="zoom:60%;" /></div>


<HR align=left color=#987cb9 SIZE=1>