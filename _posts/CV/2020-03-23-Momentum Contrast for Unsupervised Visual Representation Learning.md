---
layout: post
title: CVPR-2020 Momentum Contrast for Unsupervised Visual Representation Learning
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: CVPR
date: 2020-03-23
---

> 论文地址：[Momentum Contrast for Unsupervised Visual Representation Learning](https://ieeexplore.ieee.org/document/9157636/)

## MoCo v1：对比学习方法归纳为字典查询问题，提出队列和动量编码器，大字典来学习

1. 写作技巧高：intro第一段先说明CV和NLP，以及为什么无监督学习在CV做得不好，然后第二段讲对比学习，但不细致讲，讲之前的方法总结为字典查询问题，在CV和NLP大一统的框架下提出了MoCo，提高了论文整体的scope
2. 验证两个约束：字典要大，一致性。

   字典大可以迫使模型去学习更有判别的特征；

   一致性是保证尽量在相似的encoder即语义空间中进行学习，从而避免模型学习到捷径解
3. encoder通过梯度回传更新，momentum encoder通过较大的动量参数更新；通过队列结构解决batch和dic size之间的连接，使得字典可以足够大

<HR align=left color=#987cb9 SIZE=1>
