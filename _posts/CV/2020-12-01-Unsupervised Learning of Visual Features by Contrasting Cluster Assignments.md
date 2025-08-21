---
layout: post
title: NeurIPS-2020 Unsupervised Learning of Visual Features by Contrasting Cluster Assignments
categories: [CV]
tags: [unsupervised-learning, contrastive-learning]
proceedings: NeurIPS
date: 2020-12-01
---

> 论文地址：[Unsupervised Learning of Visual Features by Contrasting Cluster Assignments](https://papers.neurips.cc/paper_files/paper/2020/file/70feb62b69f16e0238f741fab228fec2-Paper.pdf)

## SwAV：对比学习+聚类，借助先验不和大量负样本比，跟聚类中心比

1.  聚类的相关工作有：deep cluster等，留待看
2.  相较于上万的负样本，与3000个聚类中心比更小

    2.1 前向过程    `$x_1$` 数据增强得到 `$x_1,x_2$`；通过编码器得到 `$z_1,z_2$`；`$z$` 和聚类中心 `$c$` 通过clustering方法生成目标 `$q_1,q_2$` ；`$z_1,z_2$` 相似，按道理可以互相作预测，即 `$z_1 \cdot c$` 可以去预测 `$q_2$` ，反之亦然
3.  聚类中心有明确的语义含义，而先前抽取的有的负样本还可能是正样本，也可能类别不均衡不够有效
4.  新的正样本提取方法(Multi-crop)，增加view的情况下尽可能减少计算量

    4.1 方法    原本是从256x256的图片裁剪出2张224x224的图片，改为裁剪出2x160+4x96合计6张图片。因为原本的裁剪方法更多是关注于整体特征，这样可以关注整体+局部特征，效果更好，提点明显，也比较通用

<hr align="left" color="#987cb9" size="1">

