---
layout: post
title: OpenAI-2019 Language Models are Unsupervised Multitask Learners
categories: [CL]
tags: [LLM, NLP]
proceedings: OpenAI
date: 2019-07-06
lang: en
alt_url: /zh/notes/cl/Language-Models-are-Unsupervised-Multitask-Learners/
permalink: /notes/cl/Language-Models-are-Unsupervised-Multitask-Learners/
---

> Paper: [Language Models are Unsupervised Multitask Learners](https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
>
> The GPT authors had bet on a decoder-only architecture and saw promising results, but within months BERT—a bidirectional encoder trained on more data at larger scale—pulled ahead. Having already committed to the decoder line, they could hardly concede that the encoder-at-scale recipe had invalidated their earlier work, so they kept scaling the decoder. Even after going bigger, they still struggled to match BERT. The natural question was: what next?
>
> **Takeaway from GPT-2:** Engineering can follow one path relentlessly, but research should stay flexible—when scaling alone stalls, reframing the problem often matters as much as scaling further.

## GPT-2: The Second Chapter in the NLP Pre-training Series

### Abstract

Scale text to millions of tokens and models to billions of parameters, yet gains over BERT remain modest. The paper therefore shifts emphasis and makes **zero-shot** learning the central selling point.

### Introduction

1. The dominant paradigm still collects a dataset per task and trains task-specific predictors, largely because current models generalize poorly across tasks.
2. Multi-task training (multiple datasets and possibly multiple objectives) looks attractive, but the mainstream pipeline remains pre-training plus supervised fine-tuning—which still leaves two problems:
   - Every new task requires fine-tuning and retraining (or adapting) the model.
   - Labeled data must be gathered for each task, so cost grows as the task set expands.
3. Under a **zero-shot** setup, competitive results become plausible and the contribution feels fresh: engineering can stay on one track, but the research framing cannot.

### Model

GPT-1 tailored inputs to downstream tasks with special tokens such as start, separator, and end markers; the model could learn to use them during fine-tuning even though they were absent at pre-training time.

Zero-shot downstream use forbids such task-specific tuning, and unfamiliar symbols at inference time confuse the model. **Inputs must therefore look more like natural language**, which motivates **prompts**—for example, patterns like “translate to French, English text, French text.”

### Dataset

Prompt-based training requires corpora that already contain the relevant structure—for instance, text that includes English–French translation exchanges.

They start from Common Crawl, which is huge but noisy and hard to use directly. They instead mine **Reddit**: users submit links they care about, and posts with at least three comments (karma) are kept as a crude quality filter—content the community deemed worth discussing.

### Experiment

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT2-img1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT2-img2.png" alt="avatar" style="zoom:60%;" /></div>

Performance continues to improve as model size increases.

<HR align=left color=#987cb9 SIZE=1>
