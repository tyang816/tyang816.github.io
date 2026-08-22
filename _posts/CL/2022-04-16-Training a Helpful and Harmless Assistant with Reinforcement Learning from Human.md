---
layout: post
title: arXiv-2022 Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback
categories: [CL]
tags: [LLM, NLP, transformer]
proceedings: arXiv
date: 2022-04-16
lang: en
alt_url: /zh/notes/cl/Training-a-Helpful-and-Harmless-Assistant-with-Reinforcement-Learning-from-Human/
permalink: /notes/cl/Training-a-Helpful-and-Harmless-Assistant-with-Reinforcement-Learning-from-Human/
redirect_from:
  - "/cl/Training-a-Helpful-and-Harmless-Assistant-with-Reinforcement-Learning-from-Human/"
  - "/CL/Training-a-Helpful-and-Harmless-Assistant-with-Reinforcement-Learning-from-Human/"
---

> Paper: [Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback](https://arxiv.org/pdf/2204.05862.pdf)
>
> Code: <https://github.com/anthropics/hh-rlhf>

## hh-rlhf: preference models + human-feedback fine-tuning

### Abstract

Fine-tuning language models with RLHF is very effective. Alignment training against human behavior improves performance on nearly all natural-language evaluations, especially tasks such as Python coding and summarization. The authors also run iterative online training: each week they refresh the model and RL policy with new human feedback, which improves data and model quality. Models tuned with an RL reward show an approximately linear relationship with the square root of KL divergence.

### Introduction

The trained model should be helpful, truthful, and harmless.

They run separate helpfulness and harmlessness tasks, both with labeled data. For helpfulness, annotators ask the model plain-text tasks such as Q&A, writing, document editing, and brainstorming. For harmlessness, annotators try to elicit rule-breaking outputs (e.g., robbing a bank, insults). Because these tasks can be psychologically stressful, the two tasks alternate to ease annotator burden. Annotators mainly choose which of two responses is better or worse.

Helpfulness and harmlessness often conflict: a clever but harmful suggestion is “helpful” yet toxic; a bland safe reply is harmless but useless. In practice, training on both datasets together still works reasonably well.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Figure 1 shows large gains from online training; explicitly modeling “do no harm” matters.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Aligning smaller models hurts performance on other tasks; at larger scale, alignment helps more than it hurts.

#### Contribution

- Collected a multi-turn dialogue dataset.
- Small models pay a heavy alignment tax—other capabilities drop after alignment; helpfulness and harmlessness partially conflict.

#### Related Work

LaMDA labeled some data and fine-tuned.

InstructGPT includes a supervised step with human-labeled data. This work uses RL directly (plus context distillation, closer to a prompting technique), adds a harmlessness objective, uses a 6B reward model, and crucially runs online training.

### Data Collection

Humans have rich intuitions that are easy to express in language but hard to formalize (helpfulness and harm are hard to write as formulas), so human feedback in natural dialogue captures those preferences.

#### Task Specification and Crowdworkers

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig6.png" alt="avatar" style="zoom:100%;" /></div>

They randomly audit whether annotators write good prompts. Better prompts yield better interaction with the AI, rather than judging label quality alone—simpler and more intuitive (meta-annotators review annotator prompts).

Annotators cover both helpfulness and harmlessness without extra constraints, preserving diversity.

Concrete setup:

- Annotators hold at least a U.S. master’s degree.
- The top 20 performers produced ~80% of the data, paid by volume.
- Top workers share a channel for ongoing feedback.
- Additional workers on Upwork, paid hourly, enabling longer dialogues.

Annotators are not permanent; to save cost they do not verify factual correctness of model outputs, which somewhat weakens truthfulness.

#### Helpfulness and Harmlessness (Red Teaming) Datasets

Joint training on both objectives can encourage conflicting behaviors; future work may address this.

#### Models Deployed to the Feedback Interface and Associated Data Distributions

- HHH Context-Distilled 52B Language Model: context-distilled baseline, the initial deployed model.
- Rejection Sampling (RS): on samples from the above model, train a 52B preference model (reward) to score generations; draw k candidates (e.g., k=16) and pick the best.
- RLHF-Finetuned Models: continue labeling and fine-tuning.

The final stage mostly iterates fine-tuning on already tuned models; multiple models may deploy in parallel because fine-tuning does not always beat the pre-RL checkpoint.

Data split by deployment stage:

- Raw data: 42k helpful dialogues, 42k harmfulness dialogues.
- After rejection sampling: 52k helpful and 2k harmlessness dialogues.
- Online data: 22k helpful; no new harmlessness collection in that bucket.

#### Comparing Models with Elo Scores

Elo compares two models: win rate when A beats B, or how often A’s output is preferred over B’s—higher is better.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/frm2.1.png" alt="avatar" style="zoom:60%;" /></div>

#### Preference Modeling for Helpfulness and Harmlessness

#### Models and Training Setup

Preference models (PM) are trained from 13M to 52B parameters in three stages:

- General text pretraining.
- Preference model pretraining (PMP)
  - LR 1e-3; contrastive data from StackExchange, Reddit, and Wikipedia; context 1024.
- Fine-tuning on human feedback
  - LR 1e-5; window 2048.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig7.png" alt="avatar" style="zoom:100%;" /></div>

Performance scales roughly linearly with data on a log scale; larger models win at the same data size; helpfulness data is more diverse.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig8.png" alt="avatar" style="zoom:100%;" /></div>

On multi-turn dialogues, more turns correlate with lower PM accuracy.

#### Calibration of Preference Models and Implications for RL

Calibration asks whether predicted scores match true win rates.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig9.png" alt="avatar" style="zoom:100%;" /></div>

Score differences on a batch map through Δ to probabilities; agreement with the black reference line means predicted preferences align with human win rates. Helpfulness estimates are relatively accurate.

PM scores matter because they are the RL signal—better calibration means better training.

When both samples are strong, human and model scores compress; online retraining helps separate high-quality responses again.

### Reinforcement Learning from Human Feedback

#### Training Setup

- Train the preference model on pairwise comparisons first.
- Train an RL policy to generate outputs the PM scores highly.

They use PPO to maximize PM reward while staying close to the initial policy.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/frm4.1.png" alt="avatar" style="zoom:60%;" /></div>

Here $\lambda_{KL}=0.001$; larger values destabilize training. $D_{KL}$ stays &lt;100, so the KL term may shrink and matter less later.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/frm4.2.png" alt="avatar" style="zoom:60%;" /></div>

For answers A and B, they use the probability that A beats B as reward, following prior RLHF practice.

Training dialogues come from existing labels or generation via few-shot prompting: ten high-quality seed queries from the largest model to expand the set. 137k labeled, 369k generated.

#### Robustness Experiments

Focus on PM robustness: scores should track humans, but distribution shift hurts, especially when both answers are good.

Split labels in half; train train-PM and test-PM. If RL guided by train-PM also rises on test-PM, the PM generalizes; if not, the policy overfits the trainer.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig4.png" alt="avatar" style="zoom:100%;" /></div>

After a point, higher train PM scores barely lift test PM—signs of overfitting.

#### An Approximately Linear Relation Between $\sqrt{D_{KL}}$ and Reward

When updates stay small, reward relates linearly to $\sqrt{D_{KL}}$, useful for estimating how much data and model scale are needed for a given quality gain.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig13.png" alt="avatar" style="zoom:100%;" /></div>

More data improves test-PM scores as well.

#### Tension Between Helpfulness and Harmlessness in RLHF Training

On medical questions, the model may over-refuse (“I don’t know”), over-optimizing harmlessness at the expense of helpfulness.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig14.png" alt="avatar" style="zoom:100%;" /></div>

The two datasets differ in distribution; without a better fix, oversample helpfulness data.

#### Iterated Online RLHF

PM calibration and robustness degrade in high-score regions; refresh the preference model with iterated online RLHF:

- Find the best RLHF policy, collect new labels, retrain so the PM is accurate on high-scoring outputs.
- Mix new and old data to retrain the PM.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig15.png" alt="avatar" style="zoom:100%;" /></div>

Overall PM scores improve across iterations.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/hh-rlhf/fig16.png" alt="avatar" style="zoom:100%;" /></div>

Mixing online and legacy data yields somewhat more accurate model answers.

<HR align=left color=#987cb9 SIZE=1>
