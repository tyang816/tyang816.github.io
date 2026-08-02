---
layout: post
title: IJCNLP-2017 A parallel corpus of Python functions and documentation strings for automated code documentation and code generation
categories: [SE]
tags: [code-generation, code-documentation]
proceedings: IJCNLP
date: 2017-11-02
lang: en
alt_url: /zh/se/A-parallel-corpus-of-Python-functions-and-documentation-strings-for-automated-co/
permalink: /se/A-parallel-corpus-of-Python-functions-and-documentation-strings-for-automated-co/
---

> Paper: [A parallel corpus of Python functions and documentation strings for automated code documentation and code generation](https://aclanthology.org/I17-2053/)
>
> Code: <https://github.com/EdinburghNLP/code-docstring-corpus>

## code-docstring-corpus: a Python code–docstring generation dataset

### Abstract

The authors present a large, diverse parallel corpus of Python functions and documentation strings, and experiment with data augmentation methods to increase the volume of training data.

### Introduction

#### Existing corpora

Some existing corpora—such as the DJANGO dataset and the Project Euler dataset—are human annotated and yield high-precision examples, but at the cost of expensive annotation and small (from hundreds to fewer than 20,000 examples), homogeneous datasets.

Other corpora match user-generated descriptions with code snippets mined from public websites such as StackOverflow or IFTTT. These datasets can be very large (>100k) but are typically highly noisy.

Still other resources are tailored to specific domains.

Each of these corpora has limitations. For example, the DJANGO and Project Euler corpora use pseudocode rather than genuine natural language as code descriptions, which makes code snippets and descriptions structurally similar and easy to align. In the Magic the Gathering and Hearthstone corpora, code snippets are duplicated, and most examples are either boilerplate or align with specific keywords in the description in only a limited way.

#### Our proposal

The authors therefore propose a code corpus in which each example includes a docstring; they extract only top-level functions and attach metadata (repository owner, repository name, etc.) so that contextual relationship graphs can be reconstructed.

### Dataset

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/code-docstring-corpus/fig1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/code-docstring-corpus/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/code-docstring-corpus/tab2.png" alt="avatar" style="zoom:50%;" /></div>

### Baseline results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/code-docstring-corpus/tab3.png" alt="avatar" style="zoom:60%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
