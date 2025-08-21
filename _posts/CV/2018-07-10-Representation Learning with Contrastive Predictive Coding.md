---
layout: post
title: DeepMind-2018 Representation Learning with Contrastive Predictive Coding
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: DeepMind
date: 2018-07-10
---

> 论文地址：[Representation Learning with Contrastive Predictive Coding](http://arxiv.org/abs/1807.03748)

## CPC：预测代理任务，模型可泛用到文本、音频、图片等

1. 通过t时刻前的输入编码器z，经过自回归（RNN/LSTM等）后得到足够好的上下文c_t，可以做预测为pre
2. 正样本就是t时刻后的输入编码器后得到的z，这时候pre就等于query，t时刻后的z就是类似于正样本，就可以做对比学习了

<HR align=left color=#987cb9 SIZE=1>
