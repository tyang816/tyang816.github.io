---
layout: post
title: IJCAI-2019 Commit Message Generation for Source Code Changes
categories: [SE]
tags: [code-understanding]
proceedings: IJCAI
date: 2019-08-10
lang: en
alt_url: /zh/notes/se/Commit-Message-Generation-for-Source-Code-Changes/
permalink: /notes/se/Commit-Message-Generation-for-Source-Code-Changes/
---

> Paper: [Commit Message Generation for Source Code Changes](https://www.ijcai.org/proceedings/2019/0552.pdf)

## CoDiSum: Placeholder Structure and Segmented Semantics

### Abstract

Neural machine translation (NMT) approaches are limited because they ignore structural information in code and still struggle to capture out-of-vocabulary (OOV) words.

The authors propose CoDiSum to address both of these issues.

### Introduction

1. Evolution of the field

   1.1 Early work relied on predefined rules and templates—an approach that is tedious and of limited utility.

   1.2 Information retrieval methods followed, mainly reusing commit messages from similar code changes.

   1.3 Recent work adopts NMT models; however, such models still have difficulty predicting OOV words and tend to ignore structural information.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoDiSum/CoDiSum-img1.png" alt="avatar" style="zoom:60%;" /></div>

2. For structural information, the authors propose a structural extraction scheme based on **placeholders**: names of classes, methods, and variables are identified and replaced with placeholders.

3. For semantic information, names of classes, methods, and variables are split into subword units.

### Model

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoDiSum/CoDiSum-img2.png" alt="avatar" style="zoom:60%;" /></div>

The input consists of changed code segments.

#### Modeling Code Structure

Added and deleted code markers (`+`/`-`) are also embedded.

#### Modeling Code Semantics

Semantics are encoded with a bidirectional GRU.

#### Combining Code Structure and Semantics

The authors note that directly concatenating the two representations loses interaction between code structure and code semantics.

At decoding step *i*, if the token is an identifier, the two representations are concatenated to form the global representation; otherwise zeros are padded before concatenation.

Attention is added in the decoder.

### Experiment

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoDiSum/CoDiSum-img3.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
