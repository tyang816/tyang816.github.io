---
layout: post
title: ECCV-2022 CDS：Contrastive Deep Supervision
categories: [CV]
tags: [contrastive-learning]
proceedings: ECCV
date: 2022-07-12
lang: en
alt_url: /zh/notes/cv/Contrastive-Deep-Supervision/
permalink: /notes/cv/Contrastive-Deep-Supervision/
---

> Paper: [Contrastive Deep Supervision](https://www.ecva.net/papers/eccv_2022/papers_ECCV/papers/136860001.pdf)
>
> Code: <https://github.com/ArchipLab-LinfengZhang/contrastive-deep-supervision>

## CDS: Contrastive learning at intermediate layers

### Abstract

Conventional deep training supervises only the final layer and backpropagates from there, which often makes optimization of intermediate layers difficult. Recent work attaches auxiliary classifiers to intermediate layers and optimizes shallow parts of the network via supervised task losses on those heads. That objective conflicts with the usual pattern in which shallow layers encode low-level features and deeper layers encode task-specific semantics. This paper proposes contrastive deep supervision and evaluates it on nine datasets and eleven model architectures.

### Introduction

As large-scale datasets have grown, deep neural networks have become the dominant models, yet supervision is typically applied only at the final layer. Deep supervision optimizes intermediate layers directly by attaching several auxiliary classifiers that are trained in alignment with the original final classifier.

Shallow layers tend to learn low-level features, whereas the last stages learn high-level, task-related semantic features. Deep supervision forces shallow layers toward task-specific knowledge, which goes against the natural progression of feature extraction and may not be the most effective way to supervise intermediate representations.

The authors argue that contrastive learning can provide better supervision for intermediate layers. In contrastive learning, two augmented views of the same image form a positive pair and images from different sources form negatives, so the network learns invariant structure in the data. Invariances under augmentation are often low-level and task-agnostic, and thus transfer across visual tasks; the authors therefore expect this signal to be more suitable for what intermediate layers should learn.

They propose Contrastive Deep Supervision (CDS), which optimizes intermediate layers through contrastive learning, as illustrated in Figure 1.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/fig1.png" alt="avatar" style="zoom:90%;" /></div>

Multiple projection heads are added at intermediate stages, and contrastive learning is performed on those heads. The heads are discarded at inference to avoid extra compute. Whereas deep supervision trains intermediate layers toward task-specific knowledge, CDS targets invariances under data augmentation.

To further improve performance, the authors also use knowledge distillation. Distillation often transfers “critical” knowledge such as attention and relational structure and can improve accuracy; they show that learning augmentation invariance at intermediate layers via contrastive learning pairs well with distillation.

### Methodology

#### Deep Supervision

Let $c$ denote the backbone classifier and $g$ the final classifier. With $f=f_K\circ f_{K-1}\circ ···f_1$ denoting the convolutional stages, an auxiliary classifier $g_i$ is attached after each stage, yielding $K$ classifiers in total:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm1.png" alt="avatar" style="zoom:60%;" /></div>

CE denotes cross-entropy loss. The deep supervision objective is:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm2.png" alt="avatar" style="zoom:60%;" /></div>

When optimizing deep supervision for intermediate layers, the authors follow the idea of distilling intermediate features in knowledge distillation: they apply a KL divergence between intermediate feature-map vectors and the final-layer vector and minimize it, treating the last layer as teacher and intermediate layers as students:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm3.png" alt="avatar" style="zoom:60%;" /></div>

#### Contrastive Deep Supervision

For $N$ images $\{x_1,x_2,...,x_n\}$, data augmentation yields $2N$ views; $x_i$ and $x_{i+N}$ are positive pairs. Let $z=c(x)$ denote the output of a normalized projection head.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm4.png" alt="avatar" style="zoom:60%;" /></div>

The main difference from deep supervision is that auxiliary classifiers there are trained with cross-entropy, whereas here they are trained with a contrastive loss.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm5.png" alt="avatar" style="zoom:60%;" /></div>

##### Semi-supervised Learning

In the semi-supervised setting, unlabeled data are trained with contrastive learning only, while labeled data use the CDS loss.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm6.png" alt="avatar" style="zoom:60%;" /></div>

##### Knowledge Distillation

Knowledge distillation distills both the projection outputs at corresponding intermediate layers of student and teacher and the final task outputs.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm7.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/frm9.png" alt="avatar" style="zoom:60%;" /></div>

#### Other Details and Tricks

##### Design of Projection Heads

A typical projection head is two fully connected layers with ReLU, but that is too simple for intermediate layers; the authors therefore add convolutional layers before the nonlinear projection.

##### Contrastive Learning

The method is presented as a general contrastive learning framework with room for further improvement.

##### Negative Samples

The number of negatives strongly affects contrastive learning. Many prior methods rely on large batch sizes, momentum encoders, or memory banks. CDS does not require these mechanisms because the supervised loss helps prevent contrastive learning from collapsing to trivial solutions.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/tab1-tab3.png" alt="avatar" style="zoom:90%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/tab4-tab6.png" alt="avatar" style="zoom:90%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/tab7-fig3.png" alt="avatar" style="zoom:90%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/tab8.png" alt="avatar" style="zoom:90%;" /></div>

### Discussion

#### Contrastive Deep Supervision as a Regularizer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/fig4-fig5.png" alt="avatar" style="zoom:90%;" /></div>

Contrastive learning at intermediate layers acts like regularization and mitigates overfitting; lower expected calibration error (ECE) indicates that predicted probabilities align better with true likelihoods.

#### Comparison with Contrastive Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDS/tab9.png" alt="avatar" style="zoom:90%;" /></div>

Strong results are achieved without large batch sizes and without AutoAugment.

<HR align=left color=#987cb9 SIZE=1>
