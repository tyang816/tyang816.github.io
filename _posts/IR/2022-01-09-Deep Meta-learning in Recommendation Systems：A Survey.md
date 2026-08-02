---
layout: post
title: ACM Computing Surveys-2022 Deep Meta-learning in Recommendation Systems：A Survey
categories: [IR]
tags: [meta-learning, recommendation-system]
proceedings: ACM Computing Surveys
date: 2022-01-09
lang: en
alt_url: /zh/notes/ir/Deep-Meta-learning-in-Recommendation-Systems：A-Survey/
permalink: /notes/ir/Deep-Meta-learning-in-Recommendation-Systems：A-Survey/
---

> Paper: [Deep Meta-learning in Recommendation Systems: A Survey](https://dl.acm.org/doi/10.1145/3285029)

## Survey: Meta-Learning in Recommendation Systems

### Abstract

Current deep learning approaches to recommendation suffer from data and computational bottlenecks. Meta-learning methods can mitigate scarce-data problems and often yield substantial gains, especially when available data are very limited—for example, in user cold-start or item cold-start settings. This survey reviews existing recommendation scenarios, meta-learning techniques, and forms of meta-knowledge representation, and discusses technical details of how meta-learning improves model generalization in each recommendation setting. The authors also summarize current limitations and highlight directions for future research.

### Introduction

Existing recommendation methods operate on diverse data structures (interaction pairs, sequences, graphs) and are trained from scratch on large datasets under fixed learning algorithms. These approaches are highly demanding in computation and data, yet many practical settings involve scarce data, which limits the effectiveness of recommendation models.

The main idea of meta-learning is to acquire prior knowledge (meta-knowledge) through multi-task training on source tasks and to transfer it quickly to new tasks, achieving strong generalization on unseen tasks—an instance of learning to learn. Because of this rapid adaptability, meta-learning has performed well in image recognition, image segmentation, natural language processing, reinforcement learning, and related areas.

Early meta-learning for recommendation focused mainly on personalized algorithm selection: extracting meta-dataset features and choosing suitable algorithms for different datasets (tasks). In that line of work, meta-learning is defined similarly to research in automated machine learning. Deep meta-learning later became dominant, first targeting insufficient data (cold-start), and subsequently click-through rate (CTR) prediction, online recommendation, and sequential recommendation under meta-learning strategies.

The authors note that although meta-learning has been surveyed in many areas, no recent survey focuses on its role in recommendation systems; this paper is the first meta-learning survey oriented toward recommendation.

The survey is organized along three axes: (1) recommendation scenarios; (2) meta-learning algorithms; (3) meta-knowledge representation. The authors further discuss how work in different recommendation settings leverages meta-learning to extract specific meta-knowledge in forms such as parameter initialization, parametric models, and hyperparameter optimization. They also summarize common task-construction strategies used when applying meta-learning to recommendation.

### Foundations

This section first summarizes representative work and core ideas across categories of meta-learning techniques, then introduces classic recommendation scenarios in the meta-learning literature.

#### Meta-learning

There are three main families: metric-based, model-based, and optimization-based methods.

The following material introduces meta-learning methods; we omit redundant detail here.

#### Recommendation Scenarios

##### Cold-start recommendation

Traditional collaborative filtering and deep learning methods require large amounts of data. Beyond interaction data alone, content-based methods describe users and items using auxiliary content—text, knowledge graphs, social networks, and the like—which reduces reliance on interaction data and can enrich user and item representations. Cold-start can also be viewed as a few-shot setting: only a small number of samples are observed per task; similarly, sparse user–item interactions can be cast as meta-learning tasks.

##### Click-through-rate prediction

Recent CTR models typically comprise an embedding layer and a prediction layer: the embedding layer learns latent representations, and the prediction layer applies a designed model. Under cold-start, however, limited data hinder learning good embeddings, so meta-learning remains applicable in this scenario.

##### Online recommendation

In large-scale production recommender systems, user interaction data are collected continuously in real time, so models must be refreshed periodically to reflect the latest user behavior. Full retraining is prohibitively expensive; meta-learning offers a way to capture up-to-date interaction signals quickly.

##### Point-of-interest recommendation

With the rise of location-based social networks, users share points of interest through check-ins. Compared with recommendations for products, music, and similar items, POI recommendation depends more on discovering spatiotemporal patterns from historical data, because user activity is strongly constrained by geography and time. Data sparsity is pronounced: users must physically visit a POI to share location, so only a small fraction of POIs receive visits.

##### Sequential recommendation

Sequential recommendation methods take sequences of previously interacted items as input and model how user interests evolve over time. Performance drops sharply when historical user information becomes scarce.

### Taxonomy

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/fig1.png" alt="avatar" style="zoom:60%;" /></div>

### Meta-learning task construction for recommendation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/tab4.png" alt="avatar" style="zoom:60%;" /></div>

#### User-specific Task

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/fig2.png" alt="avatar" style="zoom:60%;" /></div>

For user-specific tasks, the support set and query set of a task both come from the same user; different users define different tasks. From a meta-learning perspective, the goal is to train on many user-specific datasets so that meta-knowledge serves as prior knowledge and generalizes well to unseen users.

#### Item-specific Task

Item-specific tasks are analogous to user-specific tasks; see Figure 2b.

#### Time-specific Task

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Tasks are partitioned by time slots: the current time slot typically forms the support set and the next time slot the query set.

#### Sequence-specific Task

Sequence-specific tasks are also built from temporal information, but different users or sessions define different tasks. The first K interactions serve as the training (support) set and the subsequent t−K interactions as the query set; see Figure 3b.

#### Others

Other constructions treat scenarios as tasks—for example, cities as tasks in POI recommendation. In cross-domain recommendation, users are clustered into two overlapping groups; one group is used as the support set and the other as the test set. Each group’s task is to learn an embedding distribution on the source domain that performs well on the target domain.

### Meta-learning Methods for Recommendation Systems

#### Meta-learning in Cold-start Recommendation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/tab5.png" alt="avatar" style="zoom:60%;" /></div>

#### Meta-learning in Online Recommendation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Deep Meta-learning in Recommendation Systems/tab8.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

