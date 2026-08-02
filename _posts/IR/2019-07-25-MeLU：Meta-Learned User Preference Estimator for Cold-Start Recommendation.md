---
layout: post
title: KDD-2019 MeLU：Meta-Learned User Preference Estimator for Cold-Start Recommendation
categories: [IR]
tags: [meta-learning, recommendation-system]
proceedings: KDD
date: 2019-07-25
lang: en
alt_url: /zh/notes/ir/MeLU：Meta-Learned-User-Preference-Estimator-for-Cold-Start-Recommendation/
permalink: /notes/ir/MeLU：Meta-Learned-User-Preference-Estimator-for-Cold-Start-Recommendation/
---

> Paper: [MeLU: Meta-Learned User Preference Estimator for Cold-Start Recommendation](https://dl.acm.org/doi/10.1145/3292500.3330859)
>
> Code: <https://github.com/hoyeoplee/MeLU>
>
> Further reading: <https://blog.csdn.net/qq_36426650/article/details/109378554>

## MeLU: Meta-Learning for User Cold-Start and Evidence Candidate Selection

### Abstract

Prior recommendation work suffers from two major limitations: (1) poor recommendation quality for users who consume only a few items, and (2) evidence candidates that are insufficient to identify user preferences. The authors propose MeLU to address both issues and introduce an evidence candidate selection strategy that yields customized preference estimates that better discriminate among items. MeLU is evaluated on two benchmark datasets; the proposed model reduces mean absolute error by at least 5.92% compared with two baselines on those datasets.

### Introduction

Collaborative filtering, content-based, and hybrid systems struggle with new users (user cold-start) and new items (item cold-start) because interaction data are scarce. A common workaround—used, for example, by Netflix—is to show new users popular movies and TV programs; these items serve as *evidence candidates*, and the system recommends further content based on what the user selects from that set.

Earlier cold-start approaches include:

- **Popularity-based**: provide recommendation lists via popularity, random exposure, or similar heuristics to collect initial feedback.
- **Evidence candidate**: follow a strategy that first presents a set of candidate items for the user to choose from, then personalize recommendations from the resulting interactions.

Prior systems are constrained by two problems:

- The system should recommend well for new users with very few ratings, but most designs do not target this setting; user profiles often help little. For instance, two unemployed 20-year-old men—one watching horror films and one science fiction—may still receive similar lists because demographic attributes (age, employment status, etc.) are nearly identical.
- Evidence candidates offered by existing systems are unreliable because they tend to be popular items. The authors deliberately choose less popular evidence candidates to improve performance for new users.

Main contributions:

- Introduce MAML-style meta-learning in recommendation to mitigate cold-start.
- First work to identify reliable evidence candidates to improve initial recommendation quality.
- MeLU leverages each user’s distinct item consumption history.
- Validate the system and evidence candidate selection strategy on two datasets and a user study.

### Method

#### User Preference Estimator

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MeLU/fig2.png" alt="avatar" style="zoom:60%;" /></div>

- **Input layer**: discrete features are mapped to continuous space via embeddings (embedding parameters live here); continuous features skip the embedding layer and are concatenated directly with other vectors.
- **Embedding layer**: discrete features are embedded into continuous vectors.
- **Concatenation layer**: feature vectors are concatenated.
- **Decision layer**: user and item vector dimensions need not match, so matrix factorization is replaced by a multilayer neural network.
- **Output layer**: the optimization target (e.g., click-through rate, implicit feedback, dwell time).

#### Meta-Learned User Preference Estimator

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MeLU/fig3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MeLU/alg1.png" alt="avatar" style="zoom:60%;" /></div>

The support set drives local updates (one user, i.e., one task); the query set drives global updates.

The input and embedding layers share parameters $\theta_1$; the decision and output layers share $\theta_2$. Each training round samples a batch of users. For each user (a MAML task), a support set is drawn from their interactions; the support-set loss and its gradients perform local updates. All local updates start from the shared $\theta_1$.

Local updates per user simulate rapid adaptation to a new user. Global updates use query sets resampled for all users; each user yields a query loss, and gradients are computed on the averaged query loss.

#### Evidence Candidate Selection

In the model, a larger average Frobenius norm of user-specific personalization gradients (local update gradients, $||\nabla_{\theta_2^i}L_i(f_{\theta_1},\theta_2^i)||_F$) indicates better separation among user preferences. For gradient computation, $L_1$ is replaced by $L_1/|L_1|$, where $|\cdot|$ denotes the absolute value of the backpropagated unit error.

Beyond large gradients for user discrimination, the method also emphasizes user awareness of items. It combines gradient-based and popularity-based scores: average Frobenius norm and the interaction count for each user–item pair. The former is the Frobenius norm of each user’s local-update gradient (normalized); the latter reflects item popularity—the relative frequency with which the item appears in interactions—indicating how often the user–item pair is observed. Higher Frobenius norm or more frequent interaction suggests stronger user preference and receives a higher score (the product of the two normalized values).

### Experiment

In the released code, support/query split is simple: the last 10 interactions form the query set; all earlier ones form the support set.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MeLU/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Experiments use MovieLens and Book-Crossing.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MeLU/tab2.png" alt="avatar" style="zoom:60%;" /></div>

Results are reported for four recommendation scenarios. PPR and Wide&Deep are a feature-based cold-start method and a memorization–generalization model, respectively. MeLU-1 and MeLU-5 denote one and five local update steps.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MeLU/tab3.png" alt="avatar" style="zoom:60%;" /></div>

Evidence candidate strategies are compared: popularity-based selection may reflect popularity rather than interest; the proposed method can infer preferences from very sparse interactions.

<HR align=left color=#987cb9 SIZE=1>
