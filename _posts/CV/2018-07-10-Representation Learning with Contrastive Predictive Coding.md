---
layout: post
title: DeepMind-2018 Representation Learning with Contrastive Predictive Coding
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: DeepMind
date: 2018-07-10
lang: en
alt_url: /zh/notes/cv/Representation-Learning-with-Contrastive-Predictive-Coding/
permalink: /notes/cv/Representation-Learning-with-Contrastive-Predictive-Coding/
---


> Paper: [Representation Learning with Contrastive Predictive Coding](http://arxiv.org/abs/1807.03748)

## CPC: Predictive proxy tasks; models generalize to text, audio, images, and more

1. An encoder maps inputs up to time *t* to representations *z*; an autoregressive model (RNN/LSTM, etc.) aggregates them into a context *c_t* that is sufficiently informative to support prediction (denoted *pre*).
2. Positive samples are the encoded representations *z* from inputs after time *t*; *pre* acts as the query and the future *z* plays the role of the positive sample, enabling contrastive learning.

<HR align=left color=#987cb9 SIZE=1>
