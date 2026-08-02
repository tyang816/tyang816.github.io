---
layout: post
title: ACL-2019 Improving Robustness of Neural Machine Translation with Multi-task Learning
categories: [CL]
tags: [LLM, NLP]
proceedings: ACL
date: 2019-08-01
lang: en
alt_url: /zh/cl/Improving-Robustness-of-Neural-Machine-Translation-with-Multi-task-Learning/
permalink: /cl/Improving-Robustness-of-Neural-Machine-Translation-with-Multi-task-Learning/
---

> Paper: [Improving Robustness of Neural Machine Translation with Multi-task Learning](https://aclanthology.org/W19-5368)

## Multi-task Transformer: noisy encoder and clean, target decoders

### Abstract

Neural machine translation performs well on clean in-domain text, but its quality drops sharply when text is full of grammatical errors, typos, or other noise. The authors propose a Transformer-based multi-task learning method to improve robustness to noise.

### Introduction

Real-world data—especially in social media—often contains noise such as spelling errors, grammatical mistakes, or lexical variation. People can recognize such noise with little difficulty, but neural machine translation struggles. Building a robust NMT system is therefore important.

This work uses two decoders, each with a different learning objective:

*   First decoder:
    *   Reads the encoder output
    *   Denoising decoder: maps a noisy sentence to the corresponding clean sentence

*   Second decoder:
    *   Reads the encoder output and the first decoder’s output
    *   Translation decoder: given the noisy sentence and the clean sentence, generates the target translation

This framework should benefit in two ways:

*   Because the model is trained on noisy text, it should **generalize better to noisy text**
*   The translation decoder can use the recovered clean sentence while **preserving certain kinds of noise** (e.g., emojis) by also conditioning on the original noisy sentence

### Multi-task Transformer

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Multi-task Transformer/img1.png" alt="avatar" style /></div>

#### Detailed Architecture

The data are triplets `$T=\{t_n,t_c,t_t\}$`, where `$t_n$` is the noisy sentence, `$t_c$` is the clean sentence, and `$t_t$` is the target translation.

Given encoder attention scores and denoising-decoder attention scores, the final attention context is

```math
A_t=W[A_n:A_c]+b
```

#### Two Phase Beam Search

Decoding uses a two-stage beam search to obtain the final translation.

For an input sentence `$t_n$`, the denoising decoder produces `$N_{beam}$` outputs. Each output consists of a denoising hypothesis `$\hat{t}_c$`, its probability `$P(\hat{t}_c|x_n;\theta)$`, and the corresponding hidden matrix `$M_c$`. For each hypothesis from the first decoder, the second decoder also produces `$N_{beam}$` tuples; each tuple includes a translation hypothesis `$\hat{t}_t$` and its probability `$P(\hat{t}_t|t_n,\hat{t}_c;\theta)$`.

At the end of the second stage, there are `$N_{beam}\times N_{beam}$` translation hypotheses, ranked by the score defined below:

```math
\mathcal{L}(\theta)=\lambda \log P(t_c|t_n;\theta)+(1-\lambda)\log P(t_t|t_n,t_c;\theta)
```

### Training Triple Generation

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Multi-task Transformer/img2.png" alt="avatar" style /></div>

Training requires triplets, but such data are scarce and insufficient to train a large model. The authors use back-translation to synthesize triplets. Their procedure only requires one of the three components to be available. They focus on French-to-English translation; the scarcest resource in the corpus is noisy text.

##### Clean fr & Clean en

This is the most common type of parallel corpus. An NMT model trained on TED and MTNT is used to generate noisy text. An MTNT tag is prepended to each sentence before feeding it into this NMT model. Ideally, besides noise from incomplete translation, the translated French sentences should exhibit a noise distribution similar to MTNT.

##### Noisy fr & Clean en

Such parallel text appears in the MTNT training data. Even when manually translated English contains some “noise” (e.g., emojis), it is treated as clean English.

##### Clean fr

A pipeline uses monolingual data to make back-translation more practical. Sentences are first translated into English and then back into French. As above, both NMT models are trained on TED and MTNT data, with an MTNT tag added at the start of each sentence in both directions. Off-the-shelf NMT models can also be used to generate clean English text.

### Experiments

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Multi-task Transformer/table1.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

