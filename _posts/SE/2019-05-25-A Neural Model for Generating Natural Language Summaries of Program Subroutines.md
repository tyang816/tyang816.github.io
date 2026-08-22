---
layout: post
title: ICSE-2019 A Neural Model for Generating Natural Language Summaries of Program Subroutines
categories: [SE]
tags: [code-summarization]
proceedings: ICSE
date: 2019-05-25
lang: en
alt_url: /zh/notes/se/A-Neural-Model-for-Generating-Natural-Language-Summaries-of-Program-Subroutines/
permalink: /notes/se/A-Neural-Model-for-Generating-Natural-Language-Summaries-of-Program-Subroutines/
redirect_from:
  - "/se/A-Neural-Model-for-Generating-Natural-Language-Summaries-of-Program-Subroutines/"
  - "/SE/A-Neural-Model-for-Generating-Natural-Language-Summaries-of-Program-Subroutines/"
---

> Paper: [A Neural Model for Generating Natural Language Summaries of Program Subroutines](https://dl.acm.org/doi/10.1109/ICSE.2019.00087)

## ast-attentiongru

### 1. Introduction

1. Code is treated as both a textual token representation and an AST representation; to distinguish these two views, both are fed as input jointly.
2. Two experimental settings are designed: (i) the standard setting, code tokens plus AST; (ii) the challenging setting, AST only, without code tokens.

### 2. Model

The authors propose **ast-attendgru**, an attention-based encoder–decoder architecture. For code representation, they use the token sequence and the structural AST; each branch is encoded separately. The architecture is shown below:

<img src="https://img-blog.csdnimg.cn/2021011920113124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbmcwOTIy,size_16,color_FFFFFF,t_70#pic_center" alt="avatar" style="zoom:50%;" />

**Dataset:** a self-collected Java method corpus—51 million Java methods from 50,000 projects—yielding roughly 2.1M methods after preprocessing.

- baselines:
  - attendgru
  - SBT (ICPC 18)
  - CODE-NN (Iyer 19)

<HR align=left color=#987cb9 SIZE=1>
