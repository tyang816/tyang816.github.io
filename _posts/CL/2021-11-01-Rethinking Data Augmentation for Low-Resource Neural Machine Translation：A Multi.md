---
layout: post
title: EMNLP-2021 Rethinking Data Augmentation for Low-Resource Neural Machine Translation：A Multi-Task Learning Approach
categories: [CL]
tags: [LLM, NLP]
proceedings: EMNLP
date: 2021-11-01
lang: en
alt_url: /zh/notes/cl/Rethinking-Data-Augmentation-for-Low-Resource-Neural-Machine-Translation：A-Multi/
permalink: /notes/cl/Rethinking-Data-Augmentation-for-Low-Resource-Neural-Machine-Translation：A-Multi/
redirect_from:
  - "/cl/Rethinking-Data-Augmentation-for-Low-Resource-Neural-Machine-Translation：A-Multi/"
  - "/CL/Rethinking-Data-Augmentation-for-Low-Resource-Neural-Machine-Translation：A-Multi/"
---


> Paper: [Rethinking Data Augmentation for Low-Resource Neural Machine Translation：A Multi-Task Learning Approach](https://aclanthology.org/2021.emnlp-main.669)

## MTL DA: data augmentation reduces decoder-side prefix information and shifts focus to the encoder

### Abstract

In neural machine translation, data augmentation (DA) is often used to create additional training examples when parallel data are scarce. Many such methods aim to generate new sentences containing rare words so that the empirical distribution better matches the true data distribution.

This paper proposes a multi-task DA method that generates new sentence pairs. During training, these augmented sentences serve as auxiliary tasks in a multi-task framework. The goal is to supply new context when target-side prefix information is insufficient to predict the next word, thereby strengthening the encoder and encouraging the decoder to rely more on encoder representations.

### Introduction

Many approaches address low-resource settings, including transfer learning from high-resource languages, use of linguistic annotations, multilingual systems, and data augmentation to synthesize extra parallel sentences.

Data augmentation is widely viewed as a remedy for train–test distribution mismatch: training on augmented data can broaden empirical support without relying entirely on out-of-distribution examples.

This work introduces a distinct DA framework that produces additional parallel sentences that may be impossible under the true data distribution yet systematically improve NMT quality. To avoid harmful inference from out-of-distribution synthetic data, the authors adopt a simple multi-task learning setup. The framework requires no elaborate preprocessing pipelines, no extra trained systems, and no additional data beyond the augmented pairs.

### Multi-Task Learning approach and auxiliary tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MTL DA/table1.png" alt="avatar" style="zoom:60%;" /></div>

#### swap

The target-side word order is randomly permuted: only $(1-\alpha)\cdot t$ of the tokens keep their original positions. This mainly forces the model to rely less on target-side prefix information when predicting.

#### token

A random subset of $\alpha\cdot t$ tokens is replaced with UNK. When generating new words, this reduces the informativeness of the target prefix and pushes the model to attend more to the encoder—an effective idea for mitigating posterior collapse in autoencoders.

#### source

The target sentence is replaced by a copy of the source sentence. Producing the correct output then requires checking encoder representations and copying from the source; some prior work argues this hurts training and that only reverse copying helps, but the MTL framework can still exploit such synthetic data.

#### reverse

The target sentence is reversed, again with the aim of encouraging the encoder to capture more information.

#### mono

Target words are reordered to enforce monotonic alignment with source words, again emphasizing encoder-side reasoning.

#### replace

Randomly selected source–target aligned word pairs (fraction $\alpha\cdot t$) are replaced with random entries from bilingual lexicons mined from the training corpus. Such transforms often introduce words that are hard to produce from target-language prefix alone, forcing the model to notice source tokens.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MTL DA/table2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MTL DA/table3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MTL DA/table4.png" alt="avatar" style="zoom:60%;" /></div>

Gains are larger on in-domain text, suggesting the method works well for domain-specific vocabulary.

<HR align=left color=#987cb9 SIZE=1>
