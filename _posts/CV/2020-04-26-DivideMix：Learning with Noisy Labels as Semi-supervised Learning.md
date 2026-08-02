---
layout: post
title: ICLR-2020 DivideMix：Learning with Noisy Labels as Semi-supervised Learning
categories: [CV]
tags: [noisy label, semi-supervised, GMM, MixMatch]
proceedings: ICLR
date: 2020-04-26
lang: en
alt_url: /zh/cv/DivideMix：Learning-with-Noisy-Labels-as-Semi-supervised-Learning/
permalink: /cv/DivideMix：Learning-with-Noisy-Labels-as-Semi-supervised-Learning/
---

> Paper: [DivideMix：Learning with Noisy Labels as Semi-supervised Learning](https://openreview.net/pdf?id=HJgExaVtwr)
>
> Code: <https://github.com/LiJunnan1992/DivideMix>

## DivideMix: Label Noise + Semi-Supervised Training

### Abstract

Deep learning methods are data-hungry, and much work aims to reduce annotation cost when using deep learning. Two prominent directions are learning with noisy labels and semi-supervised learning that exploits unlabeled data. This paper proposes DivideMix, which applies semi-supervised learning techniques to noisy-label learning. DivideMix models the per-sample loss distribution with a mixture model, dynamically partitions training data into a labeled set of likely clean samples and an unlabeled set of likely noisy samples, and trains the model on labeled and unlabeled data in a semi-supervised manner. To avoid confirmation bias, two separate networks are trained jointly; each network uses the dataset partition produced by the other. Experiments on multiple benchmark datasets show substantial improvements over state-of-the-art methods.

### Introduction

Cheap ways to annotate large-scale data—searching commercial engines, downloading tagged media, using machine-generated labels, and similar—often yield noisy labels. Recent work also shows that overfitting on noisy labels hurts generalization.

Existing learning from noisy labels (LNL) methods rely mainly on loss correction, e.g., correcting the loss with a noise transition matrix. Another line uses semi-supervised learning (SSL), e.g., forcing low-entropy predictions on unlabeled data or consistency under input perturbations.

Although LNL and SSL have progressed individually, their connection has not been fully explored. This work proposes DivideMix, which tackles label noise in a semi-supervised way: it discards labels that are very likely wrong and treats noisy samples as unlabeled data to regularize overfitting and improve generalization.

Main contributions:

*   **Co-divide:** Two networks are trained jointly. For each network, a Gaussian mixture model (GMM) is fit dynamically to the per-sample loss distribution, splitting training samples into a labeled set and an unlabeled set. The partition from one network then trains the other. Co-divide keeps the two networks divergent so they filter different error types and avoid confirmation bias in self-training.
*   **SSL stage:** MixMatch is extended with label co-refinement and co-guessing to handle label noise. For labeled samples, ground-truth labels are refined using predictions from the other network. For unlabeled samples, an ensemble of both networks produces reliable label guesses.
*   **Experiments:** DivideMix significantly improves state-of-the-art on multiple benchmarks under different noise types and levels; extensive ablations and qualitative results analyze each component.

### Method

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/fig1.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/alg1.png" alt="avatar" style /></div>

#### Co-divide by Loss Modeling

Neural networks typically fit clean samples faster than noisy ones, which corresponds to lower loss. We need the probability that a sample is clean from its per-sample loss distribution; here a two-component GMM is fit to the losses.

Co-divide splits the training set into clean and noisy subsets. For network A, each sample \(i\) in training set \(D\) is forwarded through A, which outputs a prediction vector. Cross-entropy between the prediction and the label vector is the per-sample loss \(l_i\). Expectation maximization fits a two-component Gaussian mixture model (GMM) to the distribution of all sample losses. For each sample \(i\), the posterior \(p(g \mid l_i)\) (with \(g\) denoting a Gaussian component) is its probability of being clean, written \(\omega_i\). Threshold \(\tau\) separates clean and noisy samples: if \(\omega_i \geq \tau\), sample \(i\) is clean; if \(\omega_i < \tau\), it is noisy. For A, this yields clean set \(\mathcal{X}_B\) and noisy set \(\mathcal{U}_B\) (superscript B because A’s partition is used to train B—hence co-divide). Symmetrically, B yields \(\mathcal{X}_A\) and \(\mathcal{U}_A\).

##### Confidence Penalty for Asymmetric Noise

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/fig2.png" alt="avatar" style /></div>

The first few epochs use standard cross-entropy. Warm-up works for symmetric (uniform random) label noise. For asymmetric (class-conditional) noise, the network quickly overfits noise during warm-up and becomes overconfident (low-entropy), so normalized losses for most samples shrink toward zero (Fig. 2a). A negative entropy term is added to penalize overconfident predictions.

#### MixMatch with Label Co-Refinement and Co-Guessing

#### Co-Refinement

Co-refinement relabels clean samples. For network A, a clean sample and \(m\) rotation-augmented copies are forwarded through the current A; the \(m\) prediction vectors are averaged as the sample’s prediction. A linear combination of the label vector and this prediction, passed through the sharpen function, gives a new label vector valid only for the current epoch. The same applies to B.

#### Co-Guessing

Co-guessing assigns labels to noisy samples (original labels discarded). For A, a noisy sample and \(m\) augmented copies are forwarded through both A and B, producing \(2m\) prediction vectors. Their average, after sharpen, is the label vector for that sample for the current epoch. The same applies to B.

#### MixMatch

MixMatch mixes samples after co-refinement and co-guessing to form the actual training batch. For each input \(x_1\), another sample \(x_2\) is drawn at random from the current batch (clean and noisy subsets), with labels \((p_1, p_2)\). The mixed pair \((x', p')\) is computed as:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/frm5-frm8.png" alt="avatar" style /></div>

If \(x_1\) is from the clean subset, the resulting augmented samples (with computed labels) form set \(\mathcal{X}'\); if from the noisy subset, they form \(\mathcal{U}'\). \(\mathcal{X}'\) and \(\mathcal{U}'\) are the actual inputs for this training step.

### Experiments

Two noise types are evaluated: symmetric and asymmetric. Symmetric noise replaces a percentage of training labels uniformly at random with any other class label.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/tab1.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/tab2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/tab3-tab4.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DivideMix/tab5.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

