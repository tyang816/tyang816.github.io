---
layout: post
title: CVPR-2019 Unsupervised Embedding Learning via Invariant and Spreading Instance Feature
categories: [CV]
tags: [unsupervised-learning]
proceedings: CVPR
date: 2019-04-03
lang: en
alt_url: /zh/notes/cv/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/
permalink: /notes/cv/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/
redirect_from:
  - "/cv/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/"
  - "/CV/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/"
---


> Paper: [Unsupervised Embedding Learning via Invariant and Spreading Instance Feature](http://arxiv.org/abs/1904.03436)

## InvaSpread: Instance-discrimination surrogate task + NCE loss + end-to-end learning

1. Positive and negative pairs are drawn from a minibatch processed by the same encoder. Without TPU-scale batching, training stays end-to-end and needs no external data structures, which improves speed; in practice, performance improves further when more negatives are available.
2. The paper explains the mathematical rationale behind the instance-wise objective—why it encourages spread-out and invariant representations.
3. It stresses that learning deeper feature embeddings yields better generalization.

<HR align=left color=#987cb9 SIZE=1>
