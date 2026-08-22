---
layout: post
title: ICPC-2018 Deep code comment generation
categories: [SE]
tags: [code-comment]
proceedings: ICPC
date: 2018-05-28
lang: en
alt_url: /zh/notes/se/Deep-code-comment-generation/
permalink: /notes/se/Deep-code-comment-generation/
redirect_from:
  - "/se/Deep-code-comment-generation/"
  - "/SE/Deep-code-comment-generation/"
---

> Paper: [Deep code comment generation](https://ieeexplore.ieee.org/abstract/document/8973050)

## DeepCom: NMT + SBT + type substitution

### Abstract

DeepCom applies NLP techniques to learn from large-scale corpora and generate comments from them. It uses neural networks to analyze structural information in Java methods and evaluates outputs with machine translation metrics.

### Introduction

In software development and maintenance, developers spend about 59% of their time understanding code, which makes code comments important.

Template-based and heuristic approaches suffer from two limitations:

- When identifiers and method names are poorly chosen, it is difficult to extract accurate keywords.
- They rely on retrieving similar code fragments and on how similar those fragments are.

The authors cast comment generation as a variant of neural machine translation (NMT): translating from a programming language into natural language. Unlike Code-NN, which models only comments, they model both code and comments. Relative to conventional machine translation, this task poses additional challenges:

- Code is structured: how to exploit rich structural information to improve existing NMT methods.
- Vocabulary: natural language may use on the order of 30,000 frequent words, whereas code vocabularies of roughly 200,000 tokens are common because of identifiers and similar tokens.

For structure, they traverse the abstract syntax tree (AST) with the structure-based traversal (SBT) method. For vocabulary, they replace concrete tokens with their types or with `<UNK>`.

### Proposed Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepCom/img2.png" alt="avatar" style="zoom:60%;" /></div>

#### Sequence-to-Sequence Model

The encoders are LSTMs with attention.

#### Abstract Syntax Tree with SBT traversal

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepCom/img4.png" alt="avatar" style="zoom:60%;" /></div>

- Starting from the root, a pair of parentheses denotes tree structure; the root node itself is placed immediately after the closing parenthesis, e.g., `(1)1`.

- Next, traverse each subtree of the root and place each subtree’s root inside parentheses, e.g., `(1(2)2(3)3)1`.

- Recurse on each subtree until every node has been visited, yielding a final sequence such as `(1(2(4)4(5)5(6)6)2(3)3)1`.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepCom/table3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepCom/table4.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
