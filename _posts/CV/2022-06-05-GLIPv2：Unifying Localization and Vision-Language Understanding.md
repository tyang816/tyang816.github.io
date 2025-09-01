---
layout: post
title: arXiv-2022 GLIPv2：Unifying Localization and Vision-Language Understanding
categories: [CV]
tags: [vision-language, contrastive-learning, object-detection]
proceedings: arXiv
date: 2022-06-05
---

> 论文地址：[GLIPv2：Unifying Localization and Vision-Language Understanding](http://arxiv.org/abs/2206.05836)
>
> 论文实现：<https://github.com/microsoft/GLIP>

## GLIPv2：在GLIP上增加了更多任务和数据集

### Abstratc

基本架构还是GLIP，只是把更多的任务，数据集融合进GLIP，比如分割，检测，VQA，image captioning

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIPv2/fig1.png" alt="avatar" style="zoom:60%;" /></div>

图像还是一个编码器，但是文本就多了很多理解任务，再做deep fusion

### GLIPv2: Unifying Localization and VL Understanding

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIPv2/fig2.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIPv2/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GLIPv2/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
