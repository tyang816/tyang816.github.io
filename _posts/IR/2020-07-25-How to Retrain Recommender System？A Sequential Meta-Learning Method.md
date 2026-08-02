---
layout: post
title: SIGIR-2020 How to Retrain Recommender System？A Sequential Meta-Learning Method
categories: [IR]
tags: [meta-learning, recommendation-system]
proceedings: SIGIR
date: 2020-07-25
lang: en
alt_url: /zh/ir/How-to-Retrain-Recommender-System？A-Sequential-Meta-Learning-Method/
permalink: /ir/How-to-Retrain-Recommender-System？A-Sequential-Meta-Learning-Method/
---

> Paper: [How to Retrain Recommender System？A Sequential Meta-Learning Method](https://dl.acm.org/doi/10.1145/3397271.3401167)
>
> Code: <https://github.com/zyang1580/SML>

## SML: Sequential Training and Knowledge Transfer via CNN

### Abstract

Production recommender systems must be retrained periodically on newly collected interaction data to refresh the model. Because historical data are often voluminous, full retraining is prohibitively time-consuming. This paper studies retraining mechanisms for recommender models. The authors argue that retraining on all historical data is unnecessary—those data have already been used—while training only on new data risks overfitting: the new slice is small, carries limited information, and typically induces only mild shifts in long-term user preferences. They therefore propose **learning to transfer past training experience rather than replaying past data**, implemented via a neural transfer component optimized for “future” recommendation accuracy evaluated in the next time period.

Experiments on two real-world datasets show large speedups over retraining while achieving better recommendation quality.

### Introduction

Three common retraining strategies:

- **Fine-tuning:** update only on new data. It is still time- and memory-intensive, underuses long-term preference signals, and tends to overfit.

- **Sample-based retraining:** train on samples drawn from both historical and new data. Balancing long-term preferences with fresh information requires careful sampling; information loss from subsampling usually yields worse results than using all historical data.

- **Full retraining:** strongest accuracy in general, but the most resource-intensive.

Each approach has trade-offs, yet none articulates an explicit retraining objective. An effective retraining procedure should therefore target a clear goal.

Although full-data retraining is often optimal, the authors argue it is unnecessary: prior training already distills “knowledge” from history. A knowledge-transfer retraining scheme should match full retraining without touching historical data again.

Their retraining method rests on two ideas:

- Build a **knowledge transfer component** that maps knowledge learned from historical training onto the current period. They design a CNN-based transfer module: previous model parameters are fixed inputs; the current-period model parameters are trainable.

- **Optimize the transfer module for future recommendation performance.** Beyond standard training on newly collected data, they further train the transfer CNN using data from the *next* time period. This can be viewed as an instance of meta-learning: each period’s retraining is a task; current-period new data form the training set; the following period’s data act as the test set.

Main contributions:

- Highlight the need for principled retraining in recommender systems and formulate sequential retraining as an optimization objective.

- Propose a retraining method that uses only new data yet remains effective by optimizing future recommendation performance.

- Empirical evaluation on two real-world datasets.

### Problem Formulation

Treat each retraining episode as a task: given past data and model parameters, produce an updated model and evaluate it on the next period’s data. Full retraining uses all data, initializes from $W_{t-1}$, and is costly—runtime grows with the amount of history. It also lacks explicit optimization for the next-period holdout $D_{t+1}$.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/frm1.png" alt="avatar" style="zoom:60%;" /></div>

The paper instead trains using only new data $D_t$ starting from $W_{t-1}$, aiming for strong performance on $D_{t+1}$.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/frm2.png" alt="avatar" style="zoom:60%;" /></div>

Unlike standard meta-learning, tasks form a **sequence**: the next period can be addressed only after the previous one completes.

### Method

#### Model Overview

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/fig2.png" alt="avatar" style="zoom:60%;" /></div>

The framework has three parts:

1. The model from the previous period, $W_{t-1}$.
2. A candidate model $\hat{W_{t}}$ learned from current-period data $D_t$.
3. A transfer component that combines knowledge-bearing $W_{t-1}$ and $\hat{W_{t}}$ into the deployed recommender $W_t$.

Retraining proceeds in two steps:

1. Obtain $\hat{W_{t}}$ by minimizing a standard recommendation loss $L_r(\hat{W_{t}}|D_t)$.

2. Obtain $W_t$ as the output of the transfer component.

   <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/frm3.png" alt="avatar" style="zoom:60%;" /></div>

#### Transfer Design

Because $W_t$, $W_{t-1}$, and $\hat{W_{t}}$ share the same shape, one could use a weighted sum—but that is expressively weak and cannot model cross-dimensional interactions.

An MLP is a universal approximator in theory, yet it does not emphasize **within-dimension** interactions among parameters. For matrix factorization, parameters are user embeddings; $W_t - W_{t-1}$ captures interest drift, and element-wise products such as $W_{t-1} \odot \hat{W_{t}}$ reflect the relative importance of short- versus long-term interests—patterns an MLP does not encode by design.

The authors therefore seek a transfer module that stresses dimensional relationships between $W_{t-1}$ and $\hat{W_{t}}$ and captures interactions across dimensions, and adopt a **CNN** for this role.

**Stack layer**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/frm4.png" alt="avatar" style="zoom:60%;" /></div>

The three parameter tensors are stacked like image channels; element-wise products are normalized.

**Convolution layers**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/frm5.png" alt="avatar" style="zoom:60%;" /></div>

$F_j$ is a 1×3 one-dimensional filter; $H^0_{:,m}$ is the $m$-th column of vector $H^0$; $\langle\cdot,\cdot\rangle$ denotes the inner product; GELU is the Gaussian Error Linear Unit activation, analogous to ReLU.

For example, a filter $[-1, 1, 0]$ can encode the difference between $W_{t-1}$ and $\hat{W_{t}}$; $[1, 1, 1]$ emphasizes features salient in both $W_{t-1}$ and $\hat{W_{t}}$. One-dimensional filters are used because parameter dimensions have no meaningful order.

**Full-connected and output layers**

The stack is followed by fully connected and output layers.

### Sequential Training

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/alg1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/alg2.png" alt="avatar" style="zoom:50%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Accuracy is slightly lower in some settings; this is not the paper’s main selling point.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/tab2.png" alt="avatar" style="zoom:60%;" /></div>

Compared with fine-tuning, training time is substantially reduced.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/fig5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SML/fig6.png" alt="avatar" style="zoom:50%;" /></div>

Ablations over CNN filters and depth, and recall under different recommendation settings.

<HR align=left color=#987cb9 SIZE=1>

