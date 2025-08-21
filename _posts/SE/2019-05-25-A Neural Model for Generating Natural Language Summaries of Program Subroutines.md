---
layout: post
title: ICSE-2019 A Neural Model for Generating Natural Language Summaries of Program Subroutines
categories: [SE]
tags: [code-summarization]
proceedings: ICSE
date: 2019-05-25
---

> 论文地址：[A Neural Model for Generating Natural Language Summaries of Program Subroutines](https://dl.acm.org/doi/10.1109/ICSE.2019.00087)

## ast-attentiongru

### 1. 简介

1. 将代码视作文本的词表示和AST表示，为了区别这两种表示，将他们同时视为输入
2. 设计了两种实验：① 标准实验，代码词+AST；② 挑战实验，没有代码词，只有AST

### 2. 模型

作者提出模型ast-attendgru，使用的attention-based encoder-decoder架构。在表示代码方面，使用了代码的token sequence和代码的结构AST，并且这两个部分分别进行encode，架构图如下：

<img src="https://img-blog.csdnimg.cn/2021011920113124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbmcwOTIy,size_16,color_FFFFFF,t_70#pic_center" alt="avatar" style="zoom:50%;" />

数据集：自己收集的Java method 语料，51 million Java method form 50000 projects，经过处理后得到大约2.1m methods。

- baselines：
  - attendgru
  - SBT (ICPC 18)
  - CODE-NN (Iyer 19)

<HR align=left color=#987cb9 SIZE=1>
