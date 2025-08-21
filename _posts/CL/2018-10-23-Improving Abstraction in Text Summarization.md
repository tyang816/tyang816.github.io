---
layout: post
title: ACL-2018 Improving Abstraction in Text Summarization
categories: [CL]
tags: [NLP]
proceedings: ACL
date: 2018-10-23
---

> 论文地址：[Improving Abstraction in Text Summarization](http://arxiv.org/abs/1808.07913)
>

## 分解解码器为上下文网络和预训练模型

### Abstract

在现有方法中还是很少，准确的摘要比如用没有出现在源文档的新短语来衡量依然很低。本文提出两种提高生成摘要的抽象程度的方法，第一种是将解码器分解为一个检索源文档相关信息的上下文网络，和一个预训练模型；第二种是一个新的指标

### Introduction

第一个贡献通过将解码器分解为上下文网络和语言模型来降低解码器的提取和生成的responsibilities，上下文网络负责压缩源文档，语言模型负责生成简明释义

第二个贡献是一个混合目标，它联合优化与ground truth的n-gram重叠，同时鼓励abstraction

### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Base Model and Training Objective

编码器用的biLSTM

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm1.png" alt="avatar" style="zoom:60%;" /></div>

时间注意力上下文分数计算

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm2-frm5.png" alt="avatar" style="zoom:60%;" /></div>

解码时内部注意力（intra-attention）上下文计算

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm6-frm7.png" alt="avatar" style="zoom:60%;" /></div>

计算解码器从输出词表里生成的概率

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm8-frm9.png" alt="avatar" style="zoom:60%;" /></div>

计算从固定词表选择词的概率

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm10.png" alt="avatar" style="zoom:60%;" /></div>

计算从原文档中复制的概率

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm11.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm12.png" alt="avatar" style="zoom:60%;" /></div>

目标函数极大似然估计

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm13.png" alt="avatar" style="zoom:60%;" /></div>

策略学习使用ROUGE-L作为奖励函数，并使用贪婪解码策略作为self-critical baseline

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm14-frm15.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm16.png" alt="avatar" style="zoom:60%;" /></div>

最终的损失是两者混合

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm17.png" alt="avatar" style="zoom:60%;" /></div>

#### Language Model Fusion

这种分解还有一个额外的好处，即通过在一个大规模的文本语料库上对语言模型进行预训练，可以很容易地整合关于流畅性或领域特定风格的外部知识

使用了3层无向LSTM，把最后一层语言模型的LSTM层的hidden state和公式8融合起来

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm18.png" alt="avatar" style="zoom:60%;" /></div>

$g_t$ 是门控函数

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm19-frm21.png" alt="avatar" style="zoom:60%;" /></div>

把公式10的输出分布替换为

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm22.png" alt="avatar" style="zoom:60%;" /></div>

#### Abstract Reward

看原文

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/tab3-fig2.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>