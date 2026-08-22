---
layout: post
title: Journal of Systems and Software-2022 Automatic source code summarization with graph attention networks
categories: [SE]
tags: [code-summarization, GNN]
proceedings: Journal of Systems and Software
date: 2022-06-01
lang: en
alt_url: /zh/notes/se/Automatic-source-code-summarization-with-graph-attention-networks/
permalink: /notes/se/Automatic-source-code-summarization-with-graph-attention-networks/
redirect_from:
  - "/se/Automatic-source-code-summarization-with-graph-attention-networks/"
  - "/SE/Automatic-source-code-summarization-with-graph-attention-networks/"
---

> Paper: [Automatic source code summarization with graph attention networks](https://linkinghub.elsevier.com/retrieve/pii/S0164121222000279)
>
> Code: <https://github.com/sjj0403/GSCS>

## GSCS: fusing semantic and structural encoders

### Abstract

This paper proposes GSCS, which exploits both semantic and structural information of code blocks. Graph attention networks (GAT) operate on the AST with multi-head attention; an RNN is also used to obtain semantic features.

### Introduction

Source code has intricate nested structure and cannot be treated as plain text. Existing models also struggle to leverage structural information effectively. For example, structure-based traversal (SBT) introduces many parentheses and unnecessary redundancy; Tree-LSTM and ConvGNN do not account for the context of AST nodes—in other words, each node in an AST has local attributes, but the two approaches above treat them without that distinction (e.g., `a+b` and `b+a` are handled equivalently).

The authors argue that GAT can automatically learn and assign weights to neighbors, making it a better choice than Tree-LSTM and ConvGNN.

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/fig1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/fig2-fig4.png" alt="avatar" style="zoom:100%;" /></div>

### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/tab2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/tab4-tab5.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
