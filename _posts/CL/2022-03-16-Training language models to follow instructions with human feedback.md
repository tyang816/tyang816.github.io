---
layout: post
title: OpenAI-2022 Training language models to follow instructions with human feedback
categories: [CL]
tags: [LLM, NLP, transformer]
proceedings: OpenAI
date: 2022-03-16
lang: en
alt_url: /zh/notes/cl/Training-language-models-to-follow-instructions-with-human-feedback/
permalink: /notes/cl/Training-language-models-to-follow-instructions-with-human-feedback/
redirect_from:
  - "/cl/Training-language-models-to-follow-instructions-with-human-feedback/"
  - "/CL/Training-language-models-to-follow-instructions-with-human-feedback/"
---

> Paper: [Training language models to follow instructions with human feedback](http://arxiv.org/abs/2203.02155)

## InstructGPT: GPT-3 + RLHF

### Abstract

Scaling up language models does not automatically make them better at following user intent. They can still produce untruthful, toxic, or unhelpful responses—the model is not aligned with users. The remedy is to align the model with human intent via fine-tuning with human feedback. The authors build a dataset from labeler-written prompts and prompts submitted through the OpenAI API together with human-written demonstrations, and fine-tune GPT-3 on it. They also collect a dataset of ranked model outputs and further fine-tune with reinforcement learning to obtain InstructGPT. A 1.3B-parameter InstructGPT model is preferred over 175B GPT-3, with substantial reductions in toxicity and untruthfulness, without regressing on public NLP benchmarks.

### Introduction

Large models support prompting, but they can still exhibit unwanted behavior: hallucinating facts, generating toxic text, or failing to follow user instructions. A likely cause is a mismatch in the training objective—next-token prediction is not the same as producing helpful, safe answers that follow human instructions. This is objective misalignment for language models.

The desired behavior is for language models to be more helpful for solving tasks, truthful rather than fabricating facts, and harmless.

The approach is reinforcement learning from human feedback (RLHF).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/InstructGPT/fig2.png" alt="avatar" style="zoom:80%;" /></div>

- Step 1: Sample prompts; labelers write desired outputs; fine-tune GPT-3 with supervised learning. Generative labeling is expensive.
- Step 2: Sample prompts, generate answers, have humans rank them, and train a reward model.
- Step 3: Optimize the SFT model further using scores from the RM.

Main findings:

- Labelers prefer InstructGPT outputs over GPT-3.
- InstructGPT is more truthful than GPT-3.
- InstructGPT produces less toxic text than GPT-3.
- The original pretraining objective is still used for InstructGPT, avoiding the usual drop in performance on other tasks after narrow QA fine-tuning.
- Annotations are subjective; held-out labelers who did not contribute training data still prefer InstructGPT over GPT-3.
- Fine-tuning on public data still favors the authors’ own data—fine-tuning is sensitive to the dataset.
- Not every question can be labeled, yet the model still shows some generalization.
- InstructGPT still makes simple mistakes.

### Methods and experimental details

#### Dataset

Labelers wrote many prompts, including: **plain**—arbitrary questions; **few-shot**—instructions with follow-up query/answer pairs; **user-based**—use cases resembling OpenAI API applications. The first Instruct model was trained on this data, deployed in a playground for user feedback, and further prompts were collected with constraints (e.g., 200 prompts per user), splitting train/validation/test by user.

Three datasets were built from these prompts:

- Labeler-written answers for SFT: 13k training examples.
- Rankings for RM training: 33k training examples.
- Prompts for RL fine-tuning with PPO: 31k.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/InstructGPT/tab1-tab2.png" alt="avatar" style="zoom:100%;" /></div>

#### models

##### Supervised fine-tuning (SFT)

GPT-3 is fine-tuned for 16 epochs; one epoch already overfits, but overfitting is acceptable here because this model initializes later stages.

##### Reward modeling (RM)

Remove the unembedding layer after the SFT model; instead of softmax, add a linear layer projecting to a scalar (linear layer with output dimension 1).

They use a 6B RM; 175B was unstable and the loss diverged.

Rankings are converted to scalar values with a pairwise ranking loss.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/InstructGPT/frm1.png" alt="avatar" style="zoom:80%;" /></div>

Here $r_{\theta}(x,y)$ is the reward model output; the first response receives a higher reward than the second. With $k=9$, there are $C_9^2=36$ pairs, but only 9 forward/backward passes are needed, so larger $k$ saves compute.

##### Reinforcement learning (RL)

The RL environment uses PPO.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/InstructGPT/frm2.png" alt="avatar" style="zoom:80%;" /></div>

The policy / current state is the model; actions are token generations.

$\pi_{\phi}^{RL}$ is the model being learned; $\phi$ are the learned parameters; $\pi^{SFT}$ is the supervised model used for initialization. $D_{pretrain}$ is the pretraining data distribution. $x$ is fixed; sampled $y$ changes as the model updates, so the data distribution shifts with the policy. $r_{\theta}$ learns from human rankings to provide online feedback.

The second term is a regularizer: a KL penalty with coefficient $\beta$ to limit deviation from the reference policy.

The third term is the original language-model objective; $\gamma$ controls how much to stay close to pretraining data. The first two terms fit the new dataset, but pretraining data should not be discarded; $\gamma \neq 0$ yields PPO-ptx.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/InstructGPT/fig1.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/InstructGPT/fig3.png" alt="avatar" style="zoom:80%;" /></div>

### Discussion

#### Implications for alignment research

Model alignment costs relatively little compared to pretraining because the sample count is small.

#### Limitations

Training data comes from 40 contract labelers; about 90% is English. The model is not fully safe, and the appropriate degree of alignment remains open.


<HR align=left color=#987cb9 SIZE=1>
