---
layout: post
title: ICML-2020 A Simple Framework for Contrastive Learning of Visual Representations
categories: [CV]
tags: [contrastive-learning]
proceedings: ICML
date: 2020-07-01
---

> 论文地址：[A Simple Framework for Contrastive Learning of Visual Representations](https://proceedings.mlr.press/v119/chen20j/chen20j.pdf)
>
> 代码：<https://github.com/google-research/simclr>

## SimCLR：缝合了很多技术，在特征提取后添加MLP层和激活函数，用更多的数据增强策略，大batch_size

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Simple Framework for Contrastive Learning of Visual Representations/img1.png" alt="avatar" style="zoom:60%;" /></div>

1. 同一图片衍生得到的两个图片是正样本，一个mini batch中抽样N，那么正样本N；负样本是其他样本以及数据增强后的样本，即2(N-1)；编码器共享权重
2. simCLR一个重要贡献是在通过h函数提取特征得到z后增加了一个g函数，一层MLP和激活函数，让分类任务提点近10个点。g函数旨在训练的时候用，做下游任务时不用，还是只用特征z就行。同时发现用none-linear(一层MLP和激活函数)提点最大，特征z的维度区别不大，所以可以选择较低的维度(128)
3. 对比学习需要更多的数据增强技术，裁剪/旋转/改变色彩/高斯噪声/高斯模糊/...，以及做了数据增强的消融实验，最有效的是随即裁剪和色彩变换
4. batch size比较大，训练更久，网络特征会比较好，用lars优化器在大batch size下优化

<HR align=left color=#987cb9 SIZE=1>

