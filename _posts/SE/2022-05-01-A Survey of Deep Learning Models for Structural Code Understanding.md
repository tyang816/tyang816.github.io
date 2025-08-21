---
layout: post
title: arXiv-2022 A Survey of Deep Learning Models for Structural Code Understanding
categories: [SE]
tags: [code-understanding]
proceedings: arXiv
date: 2022-05-01
---

> 论文地址：[A Survey of Deep Learning Models for Structural Code Understanding](http://arxiv.org/abs/2205.01293)

## 综述：深度学习结构化代码理解

### Abstract

代码理解的方法和应用数量在不断增加，本文把近几年代码理解的文章分为两组：基于序列和基于图的模型。同时也介绍了一些指标，数据集和下游任务，并对未来的结构化代码理解领域做出建议

### Introduction

代码结构建模：怎么有效地在代码里建模结构信息，怎么对特定的下游任务选择有效的结构信息

代码通用表征学习：怎么学习超越语言限制的代码表征

代码特定任务适应：对下游任务怎么选择特有架构，怎么处理特定任务数据，怎么在few-shot做，迁移学习，跨语言场景中适应模型

### Preliminary

#### Structures in code

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/fig1.png" alt="avatar" style="zoom:60%;" /></div>

词法分析得到NCS，语法分析得到AST，再语义分析和中间代码生成得到CFG和DFG

#### Other structures

##### Intermediate Representation

从编译器中获取比如Static Single Assignment (SSA)，或者Program Dependency Graph (PDG)

##### The Unified Modeling Language

软件系统的UML图

##### Sequence-based models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/fig4.png" alt="avatar" style="zoom:60%;" /></div>

type-1：深度优先遍历

type-2：AST路径

type-3：结构信息添加

type-4：AST部分保留

### Tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab7.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab9.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>