---
layout: post
title: Nature Communications-2024 A joint embedding of protein sequence and structure enables robust variant effect predictions
categories: [BI]
tags: [protein, fitness-prediction, PLM]
proceedings: Nature Communications
date: 2024-11-07
---

> 论文地址：[A joint embedding of protein sequence and structure enables robust variant effect predictions](https://www.nature.com/articles/s41467-024-53982-z)
>
> 论文实现：<https://github.com/KULL-Centre/_2023_Blaabjerg_SSEmb>

## SSEmeb：MSA transformer+GVP突变预测

### Abstract

融合了蛋白质结构的图表示和MSA模型，能够有效预测蛋白质突变，同时对下游任务也有帮助，比如预测protein-protein binding sites

### Introduction

操作序列的变化来优化功能是蛋白质工程和设计的基础

高通量的分析方法，通常被称为变异效应的Multiplexed Assay of Variant Effects（MAVE）或Deep Mutational Scanning experiments (DMS)

这里提出SSEmb，将蛋白质信息的多个来源MSA和序列映射到一个单一的表征中

### Results and Discussion

#### Development of the SSEmb model

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/fig1.png" alt="avatar" style /></div>

结合MSA和蛋白质结构的自监督训练方法，训练集CATH 4.2，训练的时候随机mask wt序列的部分子集，限制了MSA Transformer的attention，只能attention在3D蛋白质结构上相邻的氨基酸（stucture-constrained MSA transformer）,GNN用的GVP

#### Validation using multiplexed assays of variant effects

验证集是活性或丰度的，包含容易和困难获取MSA的

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tab1.png" alt="avatar" style /></div>

#### Testing SSEmb on ProteinGym benchamark

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tab2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tabs1.png" alt="avatar" style /></div>

#### Prediction of protein-protein binding sites using embeddings

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/fig2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/tab3.png" alt="avatar" style /></div>

### Methods

#### Multiple sequence alignments

使用的ColabFold，–-diff=512, –-filter-min-enable=64, –-max-seq-id=0.90还增加了–-cov=0.75只生成高覆盖率的序列

#### Subsampling of multiple sequence alignments

MSA的下采样序列为16，发现浅层的MSA比单个或深层的MSA更有效

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SSEmeb/figs3.png" alt="avatar" style /></div>

#### Model training

使用的BERT策略，15%中60%mask，20%对应的MSA一列也全mask，10%随机突变，10%不变

先训练GNN冻住MSA tansformer，然后再finetuneGNN和structure-constrained MSA transformer

#### GEMME protocol

HHblits version 2.0.15，uniref30： -e 1e-10 -i 1 -p 40 -b 1 -B 20000

#### Downstream model for protein-protein binding site prediction

PPBS dataset

<hr align="left" color="#987cb9" size="1">

