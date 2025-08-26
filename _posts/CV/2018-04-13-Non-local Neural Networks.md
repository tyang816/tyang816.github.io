---
layout: post
title: CVPR-2018 Non-local Neural Networks
categories: [CV]
tags: [convolutional-neural-network]
proceedings: CVPR
date: 2018-04-13
---

> 论文地址：[Non-local Neural Networks](https://openaccess.thecvf.com/content_cvpr_2018/papers/Wang_Non-Local_Neural_Networks_CVPR_2018_paper.pdf)
>
> 论文实现：<https://github.com/facebookresearch/video-nonlocal-net>

## Non-local：自注意力算子

### Abstract

无论是卷积操作还是递归操作都是在一个很局部的区域里进行处理的，作者就指出如果我们不是在局部或者说更多的上下文进行操作肯定对各种任务都有帮助，所以作者提出了一个non-local的算子，是一个即插即用的block，用来建模长距离信息

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Non-local/img2.png" alt="avatar" style="zoom:60%;" /></div>

适配视频理解的标准**自注意力**模块，标准的key,query,value乘积

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Non-local/table2.png" alt="avatar" style="zoom:60%;" /></div>

（a）使用dot-product做自注意力是最好的

（b）先测试了一下加一个non-local block，发现加在res2,3,4效果都是不错的，加在res5效果比较差可能是因为到后面特征图比较小了，这时候做自注意力也没什么东西可以学了，而且提前做这种操作又比较贵，所以放在3，4比较好

（c）测试加几个block好，发现还是越多越好

（d）时间和空间做自注意力一样重要，都做是很好的

（g）既然non-local本身是为了更多的上下文信息，于是发现把时间序列输入变得更长也会持续提升性能

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Non-local/table3.png" alt="avatar" style="zoom:60%;" /></div>

把网络换成res，non-local是真的有效

<HR align=left color=#987cb9 SIZE=1>
