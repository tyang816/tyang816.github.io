---
title: ICLR-2021 Supervised Contrastive Learning for Pre-trained Language Model Fine-tuning
layout: post
categories: [CL]
tags: [LLM, NLP]
proceedings: ICLR
date: 2021-01-13
lang: en
alt_url: /zh/notes/cl/Supervised-Contrastive-Learning-for-Pre-trained-Language-Model-Fine-tuning/
permalink: /notes/cl/Supervised-Contrastive-Learning-for-Pre-trained-Language-Model-Fine-tuning/
---

> Paper: [Supervised Contrastive Learning for Pre-trained Language Model Fine-tuning](https://openreview.net/forum?id=cu7IUiOhujH)

## SCL: Supervised Contrastive Cross-Entropy

### Abstract

Motivated by the intuition that good generalization requires capturing similarity within a class and distinguishing samples from other classes, the authors propose a supervised contrastive learning (SCL) objective during fine-tuning. Compared with cross-entropy alone, SCL improves RoBERTa-Large scores on GLUE in few-shot settings without special architectures, data augmentation, memory banks, or extra unsupervised data. It is more robust to noise at different levels and generalizes better on related tasks with limited labeled data.

### Introduction

Cross-entropy often generalizes poorly and lacks robustness to noisy labels or adversarial examples.

Fine-tuning NLP models with cross-entropy also tends to be unstable across runs, especially when supervised data are limited. Experiments show that using more iterations during fine-tuning and re-initializing some top layers can stabilize the fine-tuning stage.

The authors hypothesize that similarity-based losses can emphasize important dimensions in a high-dimensional latent representation space, yielding better few-shot performance and more stable fine-tuning.

SCL is applied in the final supervised task; it is not contrastive learning over different augmented views of the same example.

Main contributions:

- A new fine-tuning objective for language models
- Gains of 10.7 points in few-shot settings (20, 100, 1000 examples); see Table 2
- The objective is robust, with gains of about 7 points on parts of GLUE; see Table 3
- Improved generalization when labeled data are very scarce; see Table 7

### Approach

The loss encourages similarity among samples of the same class and contrast against samples of different classes.

For a C-class problem, a training batch has size N with pairs $\{x_i,y_i\}_{i=1,...,N}$; $\Phi(·)\in R^d$ denotes the encoder; $N_{y_i}$ is the number of samples in the batch with label $y_i$; $\tau >0$ is a tunable temperature scaling separation; $y_{i,c}$ is the label indicator and $\hat{y}_{i,c}$ is the predicted probability of class c; $\lambda$ is a scalar weight hyperparameter tuned per downstream task and setting. The overall loss is as follows.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/frm1-frm3.png" alt="avatar" style="zoom:60%;" /></div>

Cross-entropy is combined with a contrastive term; the contrastive part is an InfoNCE-style loss.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/fig1.png" alt="avatar" style="zoom:80%;" /></div>

L2 normalization of embeddings together with temperature $\tau$ improves performance; lower temperature increases the influence of harder-to-separate examples and yields harder negatives.

#### Relationship to Self-Supervised Contrastive Learning

For batch size N, the self-supervised contrastive loss is as follows.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/frm4.png" alt="avatar" style="zoom:60%;" /></div>

In the numerator, $x'_{2_i-1}$ and $x'_{2_i}$ are derived from the original sample $x_i$.

### Experiment

#### GLUE Benchmark Few-shot Learning Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/tab1.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/tab2-fig2.png" alt="avatar" style="zoom:80%;" /></div>

#### Robustness Across Augmented Noisy Training Datasets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/tab3-tab4.png" alt="avatar" style="zoom:80%;" /></div>

#### GLUE Benchmark Full Dataset Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/tab5-tab6.png" alt="avatar" style="zoom:80%;" /></div>

#### Generalization Ability of Task Models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SCL/tab7.png" alt="avatar" style="zoom:80%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
