---
layout: post
title: IJCAI-2021 Graph-Augmented Code Summarization in Computational Notebooks
categories: [SE]
tags: [code-summarization, GNN]
proceedings: IJCAI
date: 2021-07-23
lang: en
alt_url: /zh/se/Graph-Augmented-Code-Summarization-in-Computational-Notebooks/
permalink: /se/Graph-Augmented-Code-Summarization-in-Computational-Notebooks/
---

> Paper: [Graph-Augmented Code Summarization in Computational Notebooks](https://www.ijcai.org/proceedings/2021/717)

## Themisto: An end-to-end system for generating documentation in computational notebooks

1. For Jupyter notebook code cells, three approaches generate comments: (1) HAConvGNN-based; (2) querying online API documentation; (3) using code execution results to prompt users to write their own comments. These methods fall into two categories: describing why a code block was written, and describing what the code block produces.
2. HAConvGNN extends [[LeClair et al, 2020]](http://arxiv.org/abs/2004.02843) by additionally encoding the four neighboring code cells to obtain higher-level attention weights.
3. This is primarily a systems paper; refer to the HAConvGNN work for the underlying model.

<HR align=left color=#987cb9 SIZE=1>

