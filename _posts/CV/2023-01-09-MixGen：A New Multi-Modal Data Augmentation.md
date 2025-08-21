---
layout: post
title: WACV-2023 MixGen：A New Multi-Modal Data Augmentation
categories: [CV]
tags: [vision-language, data-augmentation]
proceedings: WACV
date: 2023-01-09
---

> 论文地址：[MixGen：A New Multi-Modal Data Augmentation](https://openaccess.thecvf.com/content/WACV2023W/Pretrain/papers/Hao_MixGen_A_New_Multi-Modal_Data_Augmentation_WACVW_2023_paper.pdf)
>
> 论文实现：<https://github.com/amazon-science/mix-generation>

## MixGen：图像线性差值和文本拼接做多模态数据增强

### Abstract

提出了MixGen：一种用于视觉-语言表示学习的联合数据增强方法，它通过插值图像和连接文本，生成具有保留语义关系的新的图像文本对。在四个框架下进行了测试，CLIP，ViLT，ALBEF和TCL

### Introduction

图片文本做数据增强时会出现信息丢失或歧义的情况，比如图像反转后，原本描述这个图像的文本可能就不再适合了，所以这种情况下做数据增强是比较困难的。所以需要在保留信息，不改变语义的情况下做数据增强

### MixGen

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/fig1.png" alt="avatar" style="zoom:100%;" /></div>

图片通过线性插值，两个图片叠加，句子直接拼接起来，这样得到新的训练样本，就是数据增强了

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MixGen/tab3.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>