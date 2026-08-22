---
layout: post
title: ICPC-2021 A Multi-Modal Transformer-based Code Summarization Approach for Smart Contracts
categories: [SE]
tags: [transformer, code-summarization]
proceedings: ICPC
date: 2021-03-12
lang: en
alt_url: /zh/notes/se/A-Multi-Modal-Transformer-based-Code-Summarization-Approach-for-Smart-Contracts/
permalink: /notes/se/A-Multi-Modal-Transformer-based-Code-Summarization-Approach-for-Smart-Contracts/
redirect_from:
  - "/se/A-Multi-Modal-Transformer-based-Code-Summarization-Approach-for-Smart-Contracts/"
  - "/SE/A-Multi-Modal-Transformer-based-Code-Summarization-Approach-for-Smart-Contracts/"
---

> Paper: [A Multi-Modal Transformer-based Code Summarization Approach for Smart Contract](https://www.computer.org/csdl/proceedings-article/icpc/2021/140300a001/1tB7vPlB8wo)
>
> Data: <https://zenodo.org/record/4587089#.YEog9-gzYuV>
>
> Code: <https://github.com/yz1019117968/ICPC-21-MMTrans>

## MMTrans: SBT, graph, and joint decoder for smart contract comment generation

### Abstract

The work applies code summarization to smart contracts—the programs executed on blockchains. An SBT sequence encodes global AST structure, graph convolution captures local structure, and a joint decoder generates comments. Both the encoder and decoder rely on Transformer multi-head attention to model long-range dependencies.

### Introduction

Automatic code summarization for smart contracts has received relatively little attention, largely for two reasons: (1) many in-code comments are unusable, which hampers developers’ understanding and learning; and (2) code cloning and duplication are more prevalent than in conventional software. Producing high-quality comments therefore raises two core challenges:

- How to extract semantic information from source code: an AST can be represented in multiple modalities—e.g., SBT sequences and graphs—each emphasizing a different facet of semantics.
- How to capture long-range dependencies among code tokens: SBT sequences supply global AST context, graph convolution supplies local context, and Transformer multi-head attention models dependencies across tokens.

The authors collect 40,932 smart contracts from Etherscan.io, yielding 347,410 method–comment pairs.

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MMTrans/fig1-fig2.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MMTrans/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MMTrans/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
