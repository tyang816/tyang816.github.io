---
layout: post
title: arXiv-2022 A Survey of Deep Learning Models for Structural Code Understanding
categories: [SE]
tags: [code-understanding]
proceedings: arXiv
date: 2022-05-01
lang: en
alt_url: /zh/se/A-Survey-of-Deep-Learning-Models-for-Structural-Code-Understanding/
permalink: /se/A-Survey-of-Deep-Learning-Models-for-Structural-Code-Understanding/
---

> Paper: [A Survey of Deep Learning Models for Structural Code Understanding](http://arxiv.org/abs/2205.01293)

## Survey: Deep Learning Models for Structural Code Understanding

### Abstract

Methods and applications for code understanding continue to proliferate. This survey groups recent code-understanding work into sequence-based and graph-based models. It also covers metrics, datasets, and downstream tasks, and offers recommendations for future research on structural code understanding.

### Introduction

**Structural modeling of code:** how to represent structural information in code effectively, and how to select structural signals that help a given downstream task.

**General-purpose code representation learning:** how to learn code representations that transfer beyond a single programming language.

**Task-specific adaptation:** how to choose architectures tailored to downstream tasks, handle task-specific data, and adapt models under few-shot learning, transfer learning, and cross-language settings.

### Preliminary

#### Structures in code

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Lexical analysis yields natural code sequences (NCS); syntactic analysis yields abstract syntax trees (AST); semantic analysis and intermediate-code generation further yield control-flow graphs (CFG) and data-flow graphs (DFG).

#### Other structures

##### Intermediate Representation

Examples obtained from compilers include Static Single Assignment (SSA) and Program Dependency Graph (PDG).

##### The Unified Modeling Language

UML diagrams of software systems.

##### Sequence-based models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/A Survey of Deep Learning Models for Structural Code Understanding/fig4.png" alt="avatar" style="zoom:60%;" /></div>

type-1: depth-first traversal

type-2: AST paths

type-3: injection of structural information

type-4: partial retention of the AST

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
