---
layout: post
title: ICML-2020 Graph-based, Self-Supervised Program Repair from Diagnostic Feedback
categories: [SE]
tags: [program-repair, GNN]
proceedings: ICML
date: 2020-07-13
lang: en
alt_url: /zh/se/Graph-based,-Self-Supervised-Program-Repair-from-Diagnostic-Feedback/
permalink: /se/Graph-based,-Self-Supervised-Program-Repair-from-Diagnostic-Feedback/
---

> Paper: [Graph-based, Self-Supervised Program Repair from Diagnostic Feedback](https://dl.acm.org/doi/10.5555/3524938.3525939)
>
> Code: <https://github.com/michiyasunaga/DrRepair>

## DrRepair: Program-feedback graphs and self-supervised training

### Abstract

Program repair is challenging for two reasons: it requires reasoning over and tracking symbols across source code and diagnostic feedback, and labeled datasets for program repair remain relatively small. This paper proposes an approach that addresses both issues. First, it introduces **program-feedback graphs** that link symbols in the source code relevant to repair with diagnostic feedback, and applies a graph neural network on this structure to model the reasoning process. Second, it uses a **self-supervised learning** regime to pretrain the model.

### Introduction

This work studies learning to repair programs from diagnostic feedback (compiler error messages), as shown in Figure 1.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/fig1.png" alt="avatar" style="zoom:60%;" /></div>

*Program-feedback graph*

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/fig2.png" alt="avatar" style="zoom:60%;" /></div>

Whereas prior work relied mainly on end-to-end models or ASTs alone, this paper uses program-feedback graphs to directly connect the symbols involved in program-repair reasoning.

*Self-supervised learning*

The authors collect domain-relevant (programming-competition) correct programs from the web, design a corruption procedure to break programs, and synthesize new **⟨broken program, fixed program⟩** pairs—yielding roughly ten times more training data than the original labeled set.

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Graph structure and graph attention capture long-range dependencies; compared with ASTs, program-feedback graphs are more robust to errors in the source code.

**Program corruption procedure**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab1.png" alt="avatar" style="zoom:60%;" /></div>

- **Syntax**: Randomly delete, insert, or replace operators or punctuation (e.g., `.`, `;`, `()`, `{}`, `[]`, `++`), producing errors such as “expected @@@”.
- **ID-type**: Randomly delete, insert, or replace identifier types (e.g., `int`, `float`, `char`), leading to type conflicts and redeclaration errors.
- **ID-typo**: Randomly delete, insert, or replace an identifier, causing errors such as missing primary expressions and undeclared identifiers.
- **Keyword**: Randomly delete, insert, or replace language keywords or library calls (e.g., `if`, `size()`), yielding other miscellaneous diagnostics.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab3-tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab6.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DrRepair/tab7.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
