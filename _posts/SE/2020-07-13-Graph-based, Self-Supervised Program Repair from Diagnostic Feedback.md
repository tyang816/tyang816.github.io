---
layout: post
title: ICML-2020 Graph-based, Self-Supervised Program Repair from Diagnostic Feedback
categories: [SE]
tags: [program-repair, GNN]
proceedings: ICML
date: 2020-07-13
---

> 论文地址：[Graph-based, Self-Supervised Program Repair from Diagnostic Feedback](https://dl.acm.org/doi/10.5555/3524938.3525939)
>
> 论文实现：<https://github.com/michiyasunaga/DrRepair>

## DrRepair：程序反馈图+自监督训练

### Abstract

程序修复具有挑战性的原因如下：一是它需要跨源代码和诊断反馈进行推理和跟踪符号，二是可用于程序修复的有标记数据集相对较小。本文提出了创新方法解决上述两个问题：一是引入了程序反馈图，将源代码中与程序修复相关的符号与诊断反馈连接起来，然后在上面应用一个图神经网络来建模推理过程；二是采用了一种自监督学习模式来预训练模型

### Introduction

本文考虑了基于诊断反馈（编译器错误信息）来学习修复程序的问题，如图1所示

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/fig1.png" alt="avatar" style="zoom:60%;" /></div>

*Program-feedback graph*

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/fig2.png" alt="avatar" style="zoom:60%;" /></div>

虽然先前的工作都是仅依赖端到端的模型或AST，但本文才用的是程序反馈图直接连接了程序修复推理过程中涉及的符号

*Self-supervised learning*

从网络上收集领域相关（本文是编程竞赛）的正常工作的程序，设计一个处理过程来把程序变破碎，最后生成新样本<破碎程序，固定程序>，收集了比原数据集大十倍的量

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/fig3.png" alt="avatar" style="zoom:60%;" /></div>

用图和图注意力来捕获长距离依赖，同时比AST而言程序反馈图对源代码中的错误更鲁棒

**Program corruption procedure**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab1.png" alt="avatar" style="zoom:60%;" /></div>

- **Syntax**：随机删除、插入或替换操作符/标点符号，如，.；(){}[]“++，报错 “expected @@@”
- **ID-type**：随机删除、插入或替换标识符(ID)类型，如int、float、char，类型冲突和重新声明等错误
- **ID-typo**：随机删除、插入或替换一个标识符，如缺少主表达式和未声明的标识符
- **Keyword**：随机删除、插入或替换程序语言关键字或库函数的使用，如if和size()，其他杂项错误

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab3-tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab6.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab7.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
