---
layout: post
title: Cell Systems-2024 Convolutions are competitive with transformers for protein sequence pretraining
categories: [BI]
tags: [protein, PLM, CNN, transformer]
proceedings: Cell Systems
date: 2024-03-20
---

> 论文地址：[Convolutions are competitive with transformers for protein sequence pretraining](https://www.cell.com/cell-systems/fulltext/S2405-4712(24)00029-2)
>
> 论文实现：<https://github.com/microsoft/protein-sequence-models/tree/main>

## CARP: 卷积掩码网络预训练蛋白质语言模型

### Abstract

CNN能和transformer取得具有竞争力的结果，在很多下游任务上比如结构预测，zero-shot突变预测，out-of-domain生成上都取得很好效果

### Introduction and backgroud

Transformer的主要问题是计算内存和输入序列成平方关系的复杂度增长，并且在训练的时候有着明显的长度限制，比如ESM最大长度1022，但Uniref50有42M序列，其中有1.1M，即2.6%是超过了1022，并且里面包含了很多人类感兴趣的蛋白，比如SARS-Cov-2 spike gylcoprotein和*Streptococcus pyogenes* CRISPR-associated endonuclease Cas9

使用March 2020 release of UniRef50训练了CARP(**C**onvolutional **A**utoencoding **R**epresentations of **P**roteins)

### Convolutional Protein Seuqence Mask Language Models

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/fig1.png" alt="avatar" style /></div>

15%mask，其中80%替换为mask token，10%随机选择氨基酸，10%不变

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/fig2.png" alt="avatar" style /></div>

### Downstream Tasks

#### Protein Structure

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/tab1.png" alt="avatar" style /></div>

#### Zero-shot Mutation Effect Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/fig3.png" alt="avatar" style /></div>

#### Out-of-Domain Fitness Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/tab2-tab3.png" alt="avatar" style /></div>

#### In-Domain Property Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/tab4.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

