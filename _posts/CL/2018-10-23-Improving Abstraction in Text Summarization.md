---
layout: post
title: ACL-2018 Improving Abstraction in Text Summarization
categories: [CL]
tags: [NLP]
proceedings: ACL
date: 2018-10-23
lang: en
alt_url: /zh/cl/Improving-Abstraction-in-Text-Summarization/
permalink: /cl/Improving-Abstraction-in-Text-Summarization/
---

> Paper: [Improving Abstraction in Text Summarization](http://arxiv.org/abs/1808.07913)
>

## Decomposing the Decoder into a Context Network and a Pretrained Model

### Abstract

Among existing methods, accurate abstractive summarization—as measured by novel phrases that do not appear in the source document—remains low. This paper proposes two ways to improve the level of abstraction in generated summaries. The first decomposes the decoder into a context network that retrieves relevant information from the source document and a pretrained model; the second is a new metric

### Introduction

The first contribution reduces the decoder’s extractive and generative responsibilities by splitting it into a context network and a language model: the context network compresses the source document, and the language model produces concise paraphrases.

The second contribution is a hybrid objective that jointly optimizes n-gram overlap with ground truth while encouraging abstraction.

### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Base Model and Training Objective

The encoder uses a biLSTM.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm1.png" alt="avatar" style="zoom:60%;" /></div>

Temporal attention context score computation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm2-frm5.png" alt="avatar" style="zoom:60%;" /></div>

Intra-attention context computation during decoding

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm6-frm7.png" alt="avatar" style="zoom:60%;" /></div>

Probability of generating from the output vocabulary

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm8-frm9.png" alt="avatar" style="zoom:60%;" /></div>

Probability of selecting a word from the fixed vocabulary

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm10.png" alt="avatar" style="zoom:60%;" /></div>

Probability of copying from the source document

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm11.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm12.png" alt="avatar" style="zoom:60%;" /></div>

Maximum-likelihood training objective

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm13.png" alt="avatar" style="zoom:60%;" /></div>

Policy learning uses ROUGE-L as the reward and greedy decoding as the self-critical baseline

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm14-frm15.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm16.png" alt="avatar" style="zoom:60%;" /></div>

The final loss is a mixture of the two

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm17.png" alt="avatar" style="zoom:60%;" /></div>

#### Language Model Fusion

An additional benefit of this decomposition is that external knowledge about fluency and domain-specific style can be incorporated easily by pretraining the language model on a large text corpus.

A 3-layer LSTM is used; the hidden state of the last LSTM layer of the language model is fused with Equation (8).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm18.png" alt="avatar" style="zoom:60%;" /></div>

$g_t$ is the gating function

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm19-frm21.png" alt="avatar" style="zoom:60%;" /></div>

Replace the output distribution of Equation (10) with

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/frm22.png" alt="avatar" style="zoom:60%;" /></div>

#### Abstract Reward

See the original paper.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Improving Abstraction in Text Summarization/tab3-fig2.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
