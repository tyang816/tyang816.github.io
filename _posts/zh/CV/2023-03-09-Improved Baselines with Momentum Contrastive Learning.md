---
layout: post
title: CVPR-2020 动量对比学习的改进基线（MoCo v2）
categories: [CV]
tags: [vision-language]
proceedings: CVPR
date: 2023-03-09
lang: zh-CN
alt_url: /notes/cv/Improved-Baselines-with-Momentum-Contrastive-Learning/
permalink: /zh/notes/cv/Improved-Baselines-with-Momentum-Contrastive-Learning/
redirect_from:
  - "/2023/03/09/Improved-Baselines-with-Momentum-Contrastive-Learning/"
  - "/zh/cv/Improved-Baselines-with-Momentum-Contrastive-Learning/"
  - "/zh/CV/Improved-Baselines-with-Momentum-Contrastive-Learning/"
---

> 论文地址：[Improved Baselines with Momentum Contrastive Learning](http://arxiv.org/abs/2003.04297)

## MoCo v2：增加none-linear和数据增强策略等取得更好结果

1. 把SimCLR的MLP projection head和更多数据增强拿来用，同时增加了cos学习率，训练更多个epoch，刷新了成绩
2. 相较SimCLR能在更短时间取得更好的结果，同时需要的显卡/内存等更少，更小的batch size

<HR align=left color=#987cb9 SIZE=1>
