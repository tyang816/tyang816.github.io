---
layout: post
title: AAAI-2017 SeqGAN：Sequence Generative Adversarial Nets with Policy Gradient
categories: [CL]
tags: [LLM, NLP]
proceedings: AAAI
date: 2017-02-04
lang: en
alt_url: /zh/cl/SeqGAN：Sequence-Generative-Adversarial-Nets-with-Policy-Gradient/
permalink: /cl/SeqGAN：Sequence-Generative-Adversarial-Nets-with-Policy-Gradient/
---

> Paper: [SeqGAN: Sequence Generative Adversarial Nets with Policy Gradient](https://dl.acm.org/doi/10.5555/3298483.3298649)
>
> Code: <https://github.com/LantaoYu/SeqGAN>

## SeqGAN: Sequence Generative Adversarial Nets

### 1. Summary

1. The first approach to apply GANs to discrete token sequences.
2. **Exposure bias**: the model generates a sequence iteratively and predicts the next token from its own prior predictions, which may never appear in the training data. This train–test mismatch accumulates error as sequence length grows.
3. GANs can mitigate exposure bias, but two issues remain:

   2.1 GANs are hard to apply to discrete token-sequence generation: small changes in generator \(G\) barely move the discrete vocabulary, so gradients from the loss often fail to train \(G\) and \(D\) jointly.

   2.2 GANs score or optimize only over full sequences, yet balancing present and future reward for partially generated sequences also matters.

> A personal side question this raises: can a well-chosen, task-specific metric steer a subfield—and can a breakthrough on foundational problems pull an entire area forward?

### 2. Reinforcement Learning

SeqGAN draws heavily on reinforcement learning (RL).

The core of RL is learning a good policy through trial and error. The learned object is usually a sequence of decisions whose objective is long-term return—for example, in Go, the current move should consider not only immediate gain but also rewards many steps ahead.

Key RL concepts are **state** \(s\), **action** \(a\), and **reward** \(r\). For word-sequence generation, suppose the sequence is \(Y_{1:T}=(y_1,...,y_t,...,y_T)\). At time step \(t\), the state \(s\) is the tokens generated so far \((y_1,...,y_{t−1})\); the action \(a\) is the choice of the next token \(y_t\). That is the job of the generator \(G_θ(y_t|Y_{1:t−1})\), which picks \(y_t\) from the first \(t-1\) tokens and parameters \(\theta\). After \(y_t\) is fixed, the state updates to \(s'\) corresponding to \((y_1,...,y_t)\), and so on until \((y_1,...,y_t,...,y_T)\) is complete. The sequence-level score is the reward \(r\): if the sequence fools discriminator \(D\), reward is 1; if \(D\) flags it as machine-generated, reward is 0.

Two further concepts are **action-value** and **state-value**. Action-value measures how good it is to take a given action in a state; if every action’s value were known, decisions would be easy. Action-value depends not only on the immediate action but also on the value of subsequent actions. State-value plays an analogous role for how good a state is.

### 3. SeqGAN Mechanism

In SeqGAN, generator \(G\) maximizes expected reward—roughly, choices that yield the highest likely return. The objective is:

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img1.png" alt="avatar" style="zoom: 67%;" />

Here \(J\) is the objective, \(E[]\) expectation, \(R\) the sequence-level reward, \(s\) state, \(\theta\) generator parameters, \(y\) the next token (action), \(G\) the generator, \(D\) the discriminator, and \(Q\) action-value. In words: learn generator parameters \(\theta\) so that from initial state \(s_0\) the policy achieves maximum return \(R_T\), with actions guided by \(Q\).

Action-value computation:

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img2.png" alt="avatar" style="zoom:67%;" />

Action-value comes from discriminator \(D\). Time step \(T\) is the last step; the expression above is \(D\)’s score on a complete sequence. If \(D\) treats the sequence as real text, reward \(R\) is largest.

When generating the \(t\)-th token, the action \(a\) depends on the \(t-1\) tokens already produced (state \(s\)) and what may happen later. SeqGAN uses a model \(G_β\) to sample \(N\) candidate continuations \((Y_{t:T})\), scores the full sentences \((Y_{1:T})\) with \(D\), and applies Monte Carlo (MC) estimation as below:

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img3.png" alt="avatar" style="zoom: 67%;" />

\(G_β\) usually shares parameters with \(G_θ\); a separate \(β\) can be used for speed. The MC roll-out resembles search in board games: optimize not only the current step but combinations of many future steps, exploring this node and successors \((Y_{t:T})\)—the core **roll-out** trick in Monte Carlo tree search.

Action-value differs by time step:
`<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img4.png" alt="avatar" style="zoom:67%;" />`

At the final step \(t=T\), value comes directly from \(D\). At earlier steps, \(G_β\) plus MC sampling produces \(N\) continuations; \(D\) scores them and their mean is the value estimate.

As in standard GAN training, discriminator \(D\) is updated iteratively while generator \(G\) trains.

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img5.png" alt="avatar" style="zoom:67%;" />

This matches the GAN objective: update discriminator parameters \(\phi\) so real data \(P_{data}\) is classified as real and samples from \(G_θ\) as fake.

### 4. Main Training Procedure

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img6.png" alt="avatar" style="zoom: 50%;" />

- The procedure defines base generator \(G_θ\), roll-out generator \(G_β\), discriminator \(D\), and training set \(S\).
- Pre-train generator \(G\) with MLE (maximum likelihood estimation). (lines 2)
- Pre-train discriminator \(D\) on real training data and generator samples. (lines 4–5)
- Adversarial iteration begins. (line 6)
- Train the generator (lines 7–13): at each time step compute \(Q\)—the critical step—using \(D\), roll-out generator \(G_β\), and Monte Carlo tree search for action-value, then apply a policy-gradient update.
- Train the discriminator (lines 14–17): real training data as positives, generator outputs as negatives.

<HR align=left color=#987cb9 SIZE=1>
