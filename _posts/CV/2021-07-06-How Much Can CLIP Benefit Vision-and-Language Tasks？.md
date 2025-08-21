---
layout: post
title: arXiv-2021 How Much Can CLIP Benefit Vision-and-Language Tasks？
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: arXiv
date: 2021-07-06
---

> 论文地址：[How Much Can CLIP Benefit Vision-and-Language Tasks？](http://arxiv.org/abs/2107.06383)
>
> 论文实现：https://github.com/clip-vil/CLIP-ViL

## CLIP-ViL：CLIP在视觉下游任务的实验性文章

### Abstract

实验性文章，把CLIP拿到多模态来初始化还能继续提高下游vision language task的准确度

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/fig2.png" alt="avatar" style="zoom:60%;" /></div>

主要贡献：第一个大规模的用CLIP预训练好的模型当作视觉编码器的初始化参数，在各种下游任务上做empirical study

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/tab4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP-ViL/tab6.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>