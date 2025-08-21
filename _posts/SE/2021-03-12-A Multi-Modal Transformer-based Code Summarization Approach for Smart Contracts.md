---
layout: post
title: ICPC-2021 A Multi-Modal Transformer-based Code Summarization Approach for Smart Contracts
categories: [SE]
tags: [transformer, code-summarization]
proceedings: ICPC
date: 2021-03-12
---

> 论文地址：[A Multi-Modal Transformer-based Code Summarization Approach for Smart Contract](https://www.computer.org/csdl/proceedings-article/icpc/2021/140300a001/1tB7vPlB8wo)
>
> 论文数据：<https://zenodo.org/record/4587089#.YEog9-gzYuV>
>
> 论文实现：<https://github.com/yz1019117968/ICPC-21-MMTrans>

## MMTrans：SBT+图+联合解码器生成智能合约注释

### Abstract

将代码摘要生成应用到区块链运行的程序的智能合约（Smart Contracts）上，SBT序列提供AST全局信息，图卷积提供局部信息，然后使用一个联合解码器生成注释，编码器和解码器都采用了transformer的多头注意力机制来获取长距离依赖

### Introduction

目前自动代码摘要生成在智能合约上面还没有很多的关注，主要因为1. 大多代码注释不能用，导致开发者的理解和学习困难；2. 代码克隆和重复现象比其他软件更常见。因此要生成高质量代码注释有以下困难

- 怎么抓取源码的语义信息：AST可以表示为多种模态，如SBT序列和图，每个模式都关注于语义信息的一个不同方面
- 怎么获取代码词元的长距离依赖：SBT序列提供AST全局信息，图卷积提供局部信息，使用transformer多头注意力

收集了来自Etherscan.io上的40,932份智能合约，347,410个*<*method, comment*>* 对

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MMTrans/fig1-fig2.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MMTrans/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MMTrans/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
