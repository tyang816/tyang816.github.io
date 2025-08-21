---
layout: post
title: ICML-2019 Parameter-Efficient Transfer Learning for NLP
categories: [CL]
tags: [LLM, NLP]
proceedings: ICML
date: 2019-02-02
---

> 论文地址：[Parameter-Efficient Transfer Learning for NLP](https://proceedings.mlr.press/v97/houlsby19a/houlsby19a.pdf)
>
> 论文实现：<https://github.com/google-research/adapter-bert>

## adapter-bert：小组件嵌入transformer

### Abstract

NLP 中微调大规模预训练模型是常用的迁移方式，但是许多下游任务重，微调是参数无效的：每个任务都需要一个完全新的模型。提出使用 adaptor 模块进行迁移：针对每个任s务仅添加少量可训练参数，之前网络的参数固定，参数高度复用。为了证明 adaptor 的有效性，将 BERT 迁移至 26 个不同的文本分类任务。实验证明作者的方法可以仅调整少量参数，并获得和调整所有参数的微调方法同样的效果

### Adapter tuning for NLP

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/adapter-bert/fig2.png" alt="avatar" style="zoom:80%;" /></div>

这里的adapter就是一个下采样的FC层，一个transformer block里面加了两个adapter，其他层都是锁住的，只学习了adapter

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/adapter-bert/tab1-tab2.png" alt="avatar" style="zoom:100%;" /></div>


<HR align=left color=#987cb9 SIZE=1>