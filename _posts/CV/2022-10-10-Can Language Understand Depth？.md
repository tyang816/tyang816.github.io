---
layout: post
title: MM-2022 Can Language Understand Depth？
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: MM
date: 2022-10-10
---

> 论文地址：[Can Language Understand Depth？](https://dl.acm.org/doi/10.1145/3503161.3549201)
>
> 论文实现：<https://github.com/Adonis-galaxy/DepthCLIP>

## DepthCLIP：深度估计回归变分类用CLIP

### Abstract

将从CLIP中学习到的语义知识转移到更复杂的量化目标任务中，如利用几何信息进行深度估计，仍然是很难的任务。本文提出应用CLIP于zero-shot深度估计，即DepthCLIP

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DepthCLIP/fig2.png" alt="avatar" style="zoom:60%;" /></div>

把深度估计从回归问题变成一个分类问题，强制把深度距离分成几个大类，用图2上面那些单词来描述远近，并对应数值，文本特征乘以视觉特征得到相似度矩阵

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DepthCLIP/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DepthCLIP/tab3.png" alt="avatar" style="zoom:60%;" /></div>


<HR align=left color=#987cb9 SIZE=1>