---
layout: post
title: NAACL-2022 MoEBERT：from BERT to Mixture-of-Experts via Importance-Guided Adaptation
categories: [CL]
tags: [LLM, NLP]
proceedings: NAACL
date: 2022-07-29
lang: en
alt_url: /zh/notes/cl/MoEBERT：from-BERT-to-Mixture-of-Experts-via-Importance-Guided-Adaptation/
permalink: /notes/cl/MoEBERT：from-BERT-to-Mixture-of-Experts-via-Importance-Guided-Adaptation/
redirect_from:
  - "/cl/MoEBERT：from-BERT-to-Mixture-of-Experts-via-Importance-Guided-Adaptation/"
  - "/CL/MoEBERT：from-BERT-to-Mixture-of-Experts-via-Importance-Guided-Adaptation/"
---

> Paper: [MoEBERT：from BERT to Mixture-of-Experts via Importance-Guided Adaptation](https://aclanthology.org/2022.naacl-main.116/)
>
> Code: <https://github.com/SimiaoZuo/MoEBERT>

## MoEBERT: MoE + distillation

### Abstract

Small compressed models are typically trained via knowledge distillation, but performance often drops substantially. This work proposes MoE-BERT to improve both model quality and inference speed. MoE-BERT is initialized by adapting the FFN into multiple experts, and a layer-wise distillation method is introduced to train MoE-BERT.

### Introduction

Distillation methods fall into two categories: task-agnostic and task-specific.

- **Task-agnostic:** pre-train the student, then fine-tune on downstream tasks.
- **Task-specific:** initialize from a pre-trained model and fine-tune.

This work focuses mainly on task-specific distillation.

Training MoE models from scratch is difficult and parameter-heavy, so the authors adopt a MoE architecture on top of a pre-trained model for fine-tuning, improving inference speed while preserving representation quality.

For example, BERT-base has FFN hidden size 3072; replacing it with 4 experts yields 768 dimensions per expert.

To adapt the FFN into experts, they propose an importance-based method. Empirically, some FFN neurons contribute more to performance than others; removing them causes large performance drops. This property can be quantified with importance scores. Important neurons are shared across experts; the remaining neurons are distributed evenly.

### Background

#### Backbone: Transformer

The FFN consists of two fully connected layers and an activation function.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm1.png" alt="avatar" style="zoom:60%;" /></div>

#### Mixture-of-Experts Models

$a_t$ is the $t$-th row of the attention output $A$; $l$ is the layer index.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm2.png" alt="avatar" style="zoom:60%;" /></div>

There are many ways to compute $p_i$, e.g., with a fully connected routing matrix.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm3.png" alt="avatar" style="zoom:60%;" /></div>

This approach collapses when all inputs are routed to the same expert.

To mitigate this, prior work uses heuristics such as adding Gaussian noise, capping the maximum number of tokens routed to an expert, introducing load-balancing losses, or using linear assignment.

Related work removes the gate entirely and uses a hash function to assign tokens to experts in advance, so $p_i = 1/K$.

Each token activates only $K$ experts, typically with $K \ll N$.

### Method

#### Importance-Guided Adaptation of Pre-trained Language Models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/fig1.png" alt="avatar" style="zoom:80%;" /></div>

Randomly splitting the FFN across experts works poorly, so they adopt importance scores (originally used in model pruning). For a dataset $D$ with sample pairs $\{(x,y)\}$, the score is defined as follows:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm4.1.png" alt="avatar" style="zoom:60%;" /></div>

Here $w_j^1 \in \mathbb{R}^d$ is the $j$-th column of $W_1$, and $w_j^2 \in \mathbb{R}^d$ is the $j$-th row of $W_2$.

The importance score in Eq. (4) reflects the change in loss if neuron $j$ were removed.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm4.2.png" alt="avatar" style="zoom:60%;" /></div>

The approximation is based on a first-order Taylor expansion of $L_w$ at $w = 0$.

After computing $I_j$ for all columns, they are sorted and the top-$s$ are selected. Each expert then receives columns $\{w_{(1)}^1, \ldots, w_{s}^1, w_{(s+e)}^1, w_{(s+e+N)}^1, \ldots\}$.

#### Layer-wise Distillation

Transformer layer distillation loss:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm5.png" alt="avatar" style="zoom:60%;" /></div>

Prediction layer distillation loss:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm6.png" alt="avatar" style="zoom:60%;" /></div>

Layer-wise distillation loss:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm7.png" alt="avatar" style="zoom:60%;" /></div>

#### Model Training

Experts are trained with a random hashing strategy: each token is pre-assigned to a random expert, and this assignment is fixed during training and inference. This routing scheme is compared against other routing strategies.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/frm8.png" alt="avatar" style="zoom:60%;" /></div>

### Experiments

#### Datasets

GLUE and question answering.

#### Implementation Details

BERT-base serves as both student and teacher. The pre-trained weights are transferred to the MoE model first, then layer-wise task-specific knowledge distillation is applied. There are 4 experts with hidden size 768; top-512 neurons are selected for sharing.

#### Main Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/tab1.png" alt="avatar" style="zoom:100%;" /></div>

#### Ablation Study

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/tab2-fig2.png" alt="avatar" style="zoom:100%;" /></div>

Sharing too many dimensions can also hurt performance by reducing expert diversity.

#### Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/fig3-fig4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MoEBERT/tab4.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
