---
layout: post
title: AAAI-2018 Generative Adversarial Network for Abstractive Text Summarization
categories: [CL]
tags: [NLP]
proceedings: AAAI
date: 2018-02-02
lang: en
alt_url: /zh/notes/cl/Generative-Adversarial-Network-for-Abstractive-Text-Summarization/
permalink: /notes/cl/Generative-Adversarial-Network-for-Abstractive-Text-Summarization/
---

> Paper: [Generative Adversarial Network for Abstractive Text Summarization](https://ojs.aaai.org/index.php/AAAI/article/view/12141)

## GAN for Abstractive Text Summarization

### 1. Summary

*   Three challenges:

    *   Seq2seq models tend to produce trivial, generic summaries and often include high-frequency words.
    *   Generated summaries lack readability and grammatical quality.
    *   Standard seq2seq models mostly use maximum likelihood estimation to predict the next word, which has two drawbacks: ① the loss function differs from the evaluation metric; ② during training the decoder input at each timestep often comes from the ground-truth summary, but at test time each timestep’s input is the decoder’s output from the previous step—this exposure bias leads to error accumulation at test time.
*   The authors argue that GANs sidestep exposure bias and the mismatch between the training objective and task-level metrics.

### 2. Model Architecture

The generator and discriminator are pre-trained separately, then trained jointly.

#### 2.1 Generative Model

    After a bidirectional LSTM encoder produces $h_t$, at each timestep an attention-based LSTM decoder computes hidden state $s_t$ and context vector $c_t$; $s_t$ and $c_t$ are concatenated and passed through fc and softmax layers to obtain per-step predictions.

```math
P_{vocab}(\hat{y_t})=softmax(V'(V[s_t, c_t]+b)+b')
```

#### 2.2 Discriminative Model

    A binary classifier that aims to determine whether an input sequence is human-written or machine-generated. The input is processed by a CNN (because it performs well on text classification).

#### 2.3 Updating model parameters

*   Update the discriminator

```math
\min_{\phi}-E_{Y\sim P_{data}}[\log D_{\phi}(Y)]-E_{Y\sim G_{\theta}}[\log (1-D_{\theta}(Y))]
```

<hr align="left" color="#987cb9" size="1">

