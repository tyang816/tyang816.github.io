---
layout: post
title: NeurIPS-2020 Bootstrap your own latent：A new approach to self-supervised Learning
categories: [CV]
tags: [self-supervised learning]
proceedings: NeurIPS
date: 2020-12-06
---

> 论文地址：[Bootstrap your own latent: A new approach to self-supervised Learning](https://papers.nips.cc/paper_files/paper/2020/file/f3ada80d5c4ee70142b17b8192b2958e-Paper.pdf)

## BYOL：不用负样本，把匹配改为预测任务

1. 对比学习中负样本是一个约束，算目标函数如果只用正样本容易使模型学习到捷径解，即让所有相似的物体特征尽可能相似时，我无论什么输入都返回同一个输出，出来的特征都是一样的，算loss都是0，模型根本不学（模型ta）。加上负样本是不光相似的物体要有相似的特征，不相似的物体也要有不相似的特征，因为如果输出都一样，算负样本时loss就会非常大，被迫学习更健壮的特征
2. 前向过程： $f_\theta$  采用梯度更新，  $f_\xi$ 采用动量编码器， $g_\theta$ 和  $q_\theta$ 都是 MLP 层。上面相当于query编码器，下面相当于key编码器。用的目标函数也不一样，算的MSE loss

![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BYOL/BYOL-img1.png)

<HR align=left color=#987cb9 SIZE=1>
