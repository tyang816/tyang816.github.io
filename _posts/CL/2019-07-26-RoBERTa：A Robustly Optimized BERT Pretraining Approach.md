---
layout: post
title: arXiv-2019 RoBERTa：A Robustly Optimized BERT Pretraining Approach
categories: [CL]
tags: [LLM, NLP]
proceedings: arXiv
date: 2019-07-26
lang: en
alt_url: /zh/notes/cl/RoBERTa：A-Robustly-Optimized-BERT-Pretraining-Approach/
permalink: /notes/cl/RoBERTa：A-Robustly-Optimized-BERT-Pretraining-Approach/
redirect_from:
  - "/cl/RoBERTa：A-Robustly-Optimized-BERT-Pretraining-Approach/"
  - "/CL/RoBERTa：A-Robustly-Optimized-BERT-Pretraining-Approach/"
---

> Paper: [RoBERTa: A Robustly Optimized BERT Pretraining Approach](http://arxiv.org/abs/1907.11692)
>
> Code: <https://github.com/pytorch/fairseq>

## RoBERTa: An Improved BERT

### Abstract

BERT pretraining is expensive and is often carried out on private datasets of varying size; hyperparameter choices strongly affect final results. This paper presents a replication study of BERT, measuring the impact of key hyperparameters and training data scale, and shows that BERT is substantially undertrained and that performance can still be improved.

### Introduction

The authors find that BERT is clearly undertrained and propose an improved recipe for training BERT-style models, called RoBERTa, which matches or exceeds all published BERT models. The main changes include:

*   Training longer, with larger batches, over more data
*   Removing the next sentence prediction (NSP) objective
*   Training on longer sequences
*   Dynamically changing the masking pattern applied to training data

### Training Procedure Analysis

#### Static vs Dynamic Masking

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab1.png" alt="avatar" style /></div>

*   Original static masking:

    *   In BERT, each training example is masked once when the data is prepared (so the same masks repeat every epoch); every subsequent training step uses the same mask. This is the original static masking—a single fixed mask per example, as in the original BERT setup.
*   Modified static masking:

    *   During preprocessing, the dataset is duplicated 10 times, each copy with a different mask (40 epochs total, so each mask pattern is seen for 4 epochs). This is equivalent to training the original corpus for 40 epochs with 10 distinct static masks.
*   Dynamic masking:

    *   Masking is not applied at preprocessing time; masks are generated dynamically whenever input is fed to the model, so the mask changes from step to step.

#### Model Input Format and NSP

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab2.png" alt="avatar" style /></div>

Compared with original BERT, removing the NSP loss keeps downstream performance the same or slightly better. Thus it is possible to train as in the original BERT implementation—dropping only the NSP loss term while still using the SEGMENT-PAIR input format.

*   SEGMENT-PAIR + NSP:

    *   The input has two segments, each a contiguous span of sentences from the same or different documents; the total number of tokens in both segments is at most 512. Pretraining includes MLM and NSP. This is the original BERT setup.
*   SENTENCE-PAIR + NSP:

    *   The input also has two parts, each a single sentence from the same or a different document; the two sentences contain fewer than 512 tokens in total. Because these inputs are much shorter than 512 tokens, batch size is increased so that the total number of tokens per step stays similar to SEGMENT-PAIR + NSP. Pretraining includes MLM and NSP.
*   FULL-SENTENCES:

    *   The input is a single span (not two segments)—contiguous sentences from one or more documents, with at most 512 tokens. Inputs may cross document boundaries; when they do, a document-boundary token is inserted at the end of the preceding document. Pretraining does not include NSP.
*   DOC-SENTENCES:

    *   The input is a single span, constructed like FULL-SENTENCES but without crossing document boundaries: contiguous sentences from a single document, at most 512 tokens. Samples taken near the end of a document can be shorter than 512 tokens; in those cases batch size is increased dynamically so total tokens per step match FULL-SENTENCES. Pretraining does not include NSP.

#### Training with large batches

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab3.png" alt="avatar" style /></div>

#### Text Encoding

*   Char-level: the original BERT approach, obtained by heuristic stemming over the input text.
*   Bytes-level: unlike char-level, bytes-level uses bytes rather than Unicode characters as the basic subword units, so any input text can be encoded without introducing UNK tokens.

### RoBERTa

RoBERTa is trained with dynamic masking, FULL-SENTENCES without NSP loss, larger mini-batches, and larger byte-level BPE (the same text encoding used in GPT-2; BERT previously used character-level units). Additional details include a larger pretraining corpus and more training steps.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab4.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab5.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab6.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RoBERTa/tab7.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

