---
layout: post
title: ICML-2017 Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks
categories: [ML]
tags: [meta-learning]
proceedings: ICML
date: 2017-07-18
lang: en
alt_url: /zh/notes/ml/Model-Agnostic-Meta-Learning-for-Fast-Adaptation-of-Deep-Networks/
permalink: /notes/ml/Model-Agnostic-Meta-Learning-for-Fast-Adaptation-of-Deep-Networks/
redirect_from:
  - "/ml/Model-Agnostic-Meta-Learning-for-Fast-Adaptation-of-Deep-Networks/"
  - "/ML/Model-Agnostic-Meta-Learning-for-Fast-Adaptation-of-Deep-Networks/"
---

> Paper: [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](http://arxiv.org/abs/1703.03400)
>
> Code: <https://github.com/cbfinn/maml>
>
> Blog: <http://bair.berkeley.edu/blog/2017/07/18/learning-to-learn/>
>
> Demo: <https://sites.google.com/view/maml>

## MAML: Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks

### Abstract

A model-agnostic meta-learning approach compatible with any model trained by gradient descent. The main goal is to train across diverse tasks so that, when facing a new task with very few data points, the learned model can be fine-tuned efficiently.

### Introduction

The authors propose a general model-agnostic meta-learning algorithm, with a primary focus on deep neural networks. The key idea is to learn an initialization such that, on a new task, a small number of gradient steps yield strong performance. The learning process can be viewed as maximizing the sensitivity of the new task’s loss with respect to the parameters.

### Model-Agnostic Meta-Learning

#### Meta-Learning Problem Set-Up

In few-shot meta-learning, the objective is to train a model that can adapt quickly to new tasks using only a handful of data points and training iterations. We consider a model $f$ that maps observations $x$ to outputs $a$. During meta-learning, the model is trained to adapt to a large or effectively unbounded set of tasks. Each task $T=\{L(x_1,a_1,...,x_H,a_H),q(x_1),q(x_{t+1}|x_t,a_t),H\}$ consists of a loss function $L$, an initial observation distribution $q(x_1)$, a transition distribution $q(x_{t+1}|x_t,a_t)$, and a horizon $H$.

In the meta-learning setting, we assume a task distribution $p(T)$ over all tasks. A new task is drawn from $p(T)$; the model is trained on $k$ samples and the corresponding loss is computed, then evaluated on held-out samples. Performance is ultimately measured by sampling fresh tasks from $p(T)$.

#### A Model-Agnostic Meta-Learning Algorithm

Prior methods either require the full dataset or combine with nonparametric components at test time. The intuition behind the proposed method is that a subset of the internal parameters is transferable across tasks.

For a parametric model $f_\theta$ with parameters $\theta$, when adapting to a new task $T_i$, the parameters are updated from $\theta$ to $\theta_i'$.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MAML/frm1.png" alt="avatar" style="zoom:60%;" /></div>

The model parameters are trained by optimizing the performance of $f_{\theta'}$ on tasks sampled from $p(T)$ with respect to $\theta$, in an average sense over local optima across tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MAML/frm2.png" alt="avatar" style="zoom:60%;" /></div>

Meta-optimization across tasks is performed with stochastic gradient descent (SGD), updating the model parameters $\theta$ as follows:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MAML/frm3.png" alt="avatar" style="zoom:60%;" /></div>

The full procedure is summarized below.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MAML/alg1.png" alt="avatar" style="zoom:60%;" /></div>

The outer loop updates $\theta$; the inner loop updates each task to obtain the fine-tuned parameters $\theta_i'$.

Note that when $\theta$ is updated in the outer loop, the gradient is not taken directly with respect to $\theta$; instead, performance is assessed indirectly through $\theta_i'$. In other words, we do not care how well $\theta$ itself performs—we care how well $\theta$ performs after a few adaptation steps.

### Experiment

Three main questions:

1. Can MAML truly learn new tasks quickly?
2. Can MAML meta-learn across domains, including supervised regression, classification, and reinforcement learning?
3. Can models learned by MAML keep improving with additional gradient updates?

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MAML/fig2.png" alt="avatar" style="zoom:60%;" /></div>

After roughly ten gradient updates, MAML already captures the underlying pattern, whereas a pretrained model struggles to adapt in the same regime. The analogy is that MAML acts like a coach: what matters is how well the “student” performs after training, not how good the coach is in isolation. A pretrained model is optimized to be strong at initialization, but a few fine-tuning steps need not help—and may even hurt—because the weights are already near a single-task optimum.

<HR align=left color=#987cb9 SIZE=1>
