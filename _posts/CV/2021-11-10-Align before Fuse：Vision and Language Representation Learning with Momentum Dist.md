---
layout: post
title: NeurIPS-2021 Align before Fuse：Vision and Language Representation Learning with Momentum Distillation
categories: [CV]
tags: [vision-language]
proceedings: NeurIPS
date: 2021-11-10
lang: en
alt_url: /zh/cv/Align-before-Fuse：Vision-and-Language-Representation-Learning-with-Momentum-Dist/
permalink: /cv/Align-before-Fuse：Vision-and-Language-Representation-Learning-with-Momentum-Dist/
---

> Paper: [Align before Fuse：Vision and Language Representation Learning with Momentum Distillation](https://openreview.net/forum?id=OJLaKwiXSbx)
>
> Code: <https://github.com/salesforce/ALBEF>

## ALBEF: Contrastive Alignment Before Multimodal Fusion

### Abstract

Large-scale vision–language representation learning has advanced rapidly. Most methods use a single transformer as a multimodal encoder that jointly encodes visual and textual tokens. When a pretrained object detector supplies visual features, those features are often **not aligned** with text (the detector is fixed or pretrained separately, so image and text embeddings can lie far apart in representation space). To align images and text **before** the multimodal encoder (before fusion), the authors add a contrastive learning objective. To learn more robustly from noisy web data, they further use **momentum distillation** for self-training with pseudo-labels.

### ALBEF Pre-training

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/fig1.png" alt="avatar" style="zoom:90%;" /></div>

#### Pre-training Objectives

Image and text features are pulled as close as possible **before** entering the multimodal encoder. The image–text contrastive (ITC) loss follows MoCo.

Image–text matching (ITM) on true pairs can be difficult, but on random negatives it is often trivial—so training for a long time on easy negatives adds little. The recipe therefore selects **hard negatives** (negatives most similar to the positive). Hard negatives are mined from the ITC step: after computing cosine similarity, for each image one takes the text (other than its own) with highest similarity. That text may already describe the image well, yet it is still treated as a negative (hard negative).

The third loss is MLM: given masked text and the image, ALBEF predicts the full text, using visual context.

Each training iteration thus runs the model **twice**: once on original image $I$ and text $T$, and once on $I$ and masked text $T'$.

#### Momentum Distillation

Web-scraped image–text pairs are often **weakly correlated**: many words in the caption may not appear in the image, or many objects in the image may be missing from the text. Contrastive losses then become biased—for example, a “negative” caption may still describe much of the image content; it is not a reliable one-hot ground truth, yet forcing it to be a hard negative hurts ITC.

For MLM, the fill-in-the-blank target may have **alternatives better than the annotated token**.

Using one-hot labels from the web for ITC and MLM is therefore suboptimal. The method adds supervision that is **multi-hot** or comes from another model—self-training via a **momentum model** that produces pseudo-targets (softmax scores rather than one-hot labels).

Concretely, an exponential moving average (EMA) copy of the model generates targets during training. The student is trained to match both the one-hot ground truth and the momentum model’s pseudo-targets, yielding a practical compromise.

For ITC:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/frm1.png" alt="avatar" style="zoom:70%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/frm6.png" alt="avatar" style="zoom:70%;" /></div>

Because $q$ is a softmax distribution rather than a one-hot label, the distillation term uses **KL divergence** instead of cross-entropy.

For MLM:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/frm7.png" alt="avatar" style="zoom:70%;" /></div>

Overall, ALBEF’s pre-training combines **five** loss terms: two for ITC, two for MLM, and one for ITM. ITM itself is a binary ground-truth pairing task with hard negatives, which does not use the momentum model (in tension with soft pseudo-targets for the other objectives).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/fig2.png" alt="avatar" style="zoom:90%;" /></div>

Many candidate tokens score higher than the single ground-truth label, illustrating the benefit of pseudo-targets.

#### Pre-training Datasets

Two web datasets: Conceptual Captions and SBU Captions; two in-domain datasets: COCO and Visual Genome.

### Downstream V+L Tasks

##### Image-Text Retrieval

Image-to-text and text-to-image retrieval are commercially important. Given a gallery, the goal is to retrieve the ground-truth paired item; metrics are typically recall at $R@1$, $R@5$, and $R@10$—whether the true sample appears in the top-$k$ results.

##### Visual Entailment

Given a textual hypothesis and an image, the model decides whether the image **entails**, **contradicts**, or is **neutral** toward the hypothesis—a three-way classification task evaluated by accuracy.

##### Visual Question Answering

Given an image and a question, the model produces an answer. Two setups:

- **Closed-set VQA**: answers come from a fixed set; the task reduces to multi-class classification.
- **Open-set VQA**: answers are generated as free text, usually with a transformer decoder—substantially harder.

##### Natural Language for Visual Reasoning

Decide whether a single sentence describes **both** images in a pair—a binary classification task measured by accuracy.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/tab1.png" alt="avatar" style="zoom:80%;" /></div>

Adding ITC yields clear gains; hard negatives also help, though these tricks matter less when scaling to larger pre-training data.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/tab2-tab3.png" alt="avatar" style="zoom:80%;" /></div>

On image–text retrieval benchmarks, scores are already highly saturated.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ALBEF/tab4.png" alt="avatar" style="zoom:80%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
