---
layout: post
title: NAACL-2022 CODE-MVP：Learning to Represent Source Code from Multiple Views with Contrastive Pre-Training
categories: [SE]
tags: [code-summarization, transformer, contrastive-learning]
proceedings: NAACL
date: 2022-05-04
lang: en
alt_url: /zh/notes/se/CODE-MVP：Learning-to-Represent-Source-Code-from-Multiple-Views-with-Contrastive-/
permalink: /notes/se/CODE-MVP：Learning-to-Represent-Source-Code-from-Multiple-Views-with-Contrastive-/
redirect_from:
  - "/se/CODE-MVP：Learning-to-Represent-Source-Code-from-Multiple-Views-with-Contrastive-/"
  - "/SE/CODE-MVP：Learning-to-Represent-Source-Code-from-Multiple-Views-with-Contrastive-/"
---

> Paper: [CODE-MVP：Learning to Represent Source Code from Multiple Views with Contrastive Pre-Training](http://arxiv.org/abs/2205.02029)

## CODE-MVP: Multi-View Contrastive Learning

### Abstract

Many methods learn code representations from a single modality—plain text, abstract syntax trees (ASTs), or code graphs—but most focus on only one view and overlook the connections across views. This paper integrates different views of source code together with natural-language comments in a unified multi-view contrastive pre-training framework called Code-MVP. Compilation tools extract multiple code views, and contrastive learning is used to capture complementary information. The approach achieves state-of-the-art results on three downstream tasks across five datasets.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Existing methods represent source code from different views, including code tokens in plain text, abstract syntax trees (ASTs), and control-/data-flow graphs (CFGs/DFGs) of the code; there is also work on training masked language models.

Different views often carry complementary semantic information. For example, source-code tokens (e.g., method-name identifiers) and comments typically convey **lexical** semantics, whereas intermediate structures such as ASTs and CFGs reveal **syntactic** and **execution** information. A program can also be rewritten into functionally equivalent variants, which reflects **functional** information—different surface forms for the same semantics.

Main contributions:

- The first contrastive-learning approach to code representation that combines multiple views: tokens, AST, CFG, and program variants.
- Extensive experiments on code retrieval, code similarity, and defect prediction.

### Multiple Views of Code

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/fig1.png" alt="avatar" style="zoom:60%;" /></div>

The figure above illustrates the process of compiling a program into machine code.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/fig2.png" alt="avatar" style="zoom:60%;" /></div>

The different views used by the authors are shown in Figure 2.

### Code-MVP

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/fig3.png" alt="avatar" style="zoom:60%;" /></div>

#### Multi-View Contrastive Learning

Training uses both paired and unpaired data: paired samples include natural language (NL), whereas unpaired samples do not. Positive and negative samples are constructed separately for these two settings.

##### Multi-View Positive Sampling

The authors design Single-View (for paired and unpaired data) and Dual-View (paired data only, requires NL) strategies.

- Single-View: two different views from the same program form a cross-view positive pair; inputs are $x_i^a=\{<CLS>,s_i^a\}$ and $x_i^b=\{<CLS>,s_i^b\}$.
- Dual-View: an NL-conditioned dual-view contrastive pre-training strategy fixes the NL segment in place; inputs are $x_i^a=\{<CLS>,S_i^{NL},<SEP>,s_i^a\}$ and $x_i^b=\{<CLS>,S_i^{NL},<SEP>,s_i^b\}$.

Many view combinations can be used to build positive pairs; this work considers only the following:

- Single-View: NL vs PL, NL vs PT, PL vs AST, PL vs CFG, PL vs PT
- Dual-View: NL-PL vs NL-AST, NL-PL vs NL-CFG, NL-PL vs NL-PT

##### Multi-View Negative Sampling

Within-batch and cross-batch strategies construct intra-view and inter-view negatives; for each view of each sample there are $2N-2$ negative examples.

#### Pre-Training with Type Inference

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/fig4.png" alt="avatar" style="zoom:60%;" /></div>

Pre-training proceeds in two stages: type inference and multi-view masked language modeling.

#### Overall Training Objective

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/frm5.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/tab3-tab4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/tab5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODE-MVP/tab6.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

