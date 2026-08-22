---
layout: post
title: arXiv-2022 Holistic Evaluation of Language Models
categories: [CL]
tags: [LLM, NLP]
proceedings: arXiv
date: 2022-11-09
lang: en
alt_url: /zh/notes/cl/Holistic-Evaluation-of-Language-Models/
permalink: /notes/cl/Holistic-Evaluation-of-Language-Models/
redirect_from:
  - "/cl/Holistic-Evaluation-of-Language-Models/"
  - "/CL/Holistic-Evaluation-of-Language-Models/"
---

> Paper: [Holistic Evaluation of Language Models](http://arxiv.org/abs/2211.09110)
>

## HELM: Holistic Evaluation of Language Models

### Summary

- InstructGPT performs best overall.
- Open-source models still lag behind closed-source models to a noticeable degree.
- Larger models are generally better; only above roughly 50B parameters can a model perform well in a given domain.
- Prompting helps current models, but performance is highly sensitive to prompt design.

### Abstract

Language models have become the foundation of modern NLP systems, yet evaluation of their capabilities, limitations, and risks remains insufficient. The work first taxonomizes potential application scenarios and evaluation criteria; evaluates seven dimensions (accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency); benchmarks 30 language models across 42 application scenarios; and covers 96% of the scenario space.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig4.png" alt="avatar" style="zoom:100%;" /></div>

### Core Scenarios

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig8.png" alt="avatar" style="zoom:100%;" /></div>

For each setting: what task, what domain the data comes from, who constructed it, when it was collected, and so on.

#### Taxonomy

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/tab1.png" alt="avatar" style="zoom:100%;" /></div>

Many tasks are not fully labeled even in academic benchmarks; there are many relatively niche tasks.

Languages are mainly English and Chinese.

#### Question answering

One form is open-ended QA; another is closed-set QA (choose from a given list of answers).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig11.png" alt="avatar" style="zoom:100%;" /></div>

See the paper for specific datasets.

#### Information retrieval

Given a query q and a corpus C, return top-k documents—essentially a ranking problem.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig12.png" alt="avatar" style="zoom:100%;" /></div>

Ranking uses a point-wise approach: concatenate passage c with query q and score the probability that the passage contains an answer to the query; the model’s probability of outputting “yes” is used as the score.

#### Summarization

Sequence-to-sequence generation.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig13.png" alt="avatar" style="zoom:100%;" /></div>

The focus is abstractive ability rather than extractive copying, which also makes evaluation harder.

Abstraction and extraction are partly in tension: less extraction can hurt factual faithfulness; the goal is to keep generated content as correct as possible.

#### Sentiment analysis

User reviews of products.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig14.png" alt="avatar" style="zoom:100%;" /></div>

#### Toxicity detection

Some utterances are acceptable in one cultural context but not in another; the task is to judge whether text is toxic.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig15.png" alt="avatar" style="zoom:100%;" /></div>

#### Miscellaneous text classification

Various heterogeneous text classification tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig16.png" alt="avatar" style="zoom:100%;" /></div>

### General Metrics

Metrics should not be tied to a single scenario, so the framework mainly uses perturbation-based evaluation.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/tab2-tab3.png" alt="avatar" style="zoom:100%;" /></div>

#### Accuracy

**General**: exact match, quasi-exact match, F1

**Information Retrieval**: RR@K, NDCG@K

**summarization**: ROUGE-2

**Language**: BPB

**Reasoning**: F1, exact match

#### Calibration and uncertainty

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig17.png" alt="avatar" style="zoom:100%;" /></div>

Predicted probabilities should be meaningfully calibrated.

Select by accuracy and then evaluate calibration.

#### Robustness

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig18.png" alt="avatar" style="zoom:100%;" /></div>

Outputs should stay correct under input transformations—for example, local robustness (models trained on modern English applied to archaic English), and adversarial robustness (adversarial examples designed to mislead the model).

#### Fairness

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig19.png" alt="avatar" style="zoom:100%;" /></div>

Vary attributes of the speaker or subject (e.g., race or gender) and check whether model outputs remain fair.

#### Bias and stereotypes

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig20.png" alt="avatar" style="zoom:100%;" /></div>

Whether the model erases or over-emphasizes certain groups.

#### Toxicity

Evaluated with the Perspective API.

#### Efficiency

Power consumption and carbon emissions.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig22.png" alt="avatar" style="zoom:100%;" /></div>

Validity of predictions (in the efficiency sense used in HELM).

### Models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/tab5.png" alt="avatar" style="zoom:100%;" /></div>

### Adaptation via prompting

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig23-tab7.png" alt="avatar" style="zoom:100%;" /></div>

### Experiments and results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig24.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig26.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig28.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig29.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/fig32.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELM/tab8.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
