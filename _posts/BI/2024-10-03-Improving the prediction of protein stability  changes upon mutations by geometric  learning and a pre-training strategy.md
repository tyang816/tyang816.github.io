---
layout: post
title: Nature Computational Science-2025 Improving the prediction of protein stability  changes upon mutations by geometric  learning and a pre-training strategy
categories: [BI]
tags: [GNN, protein, fitness-prediction]
proceedings: Nature Computational Science
date: 2024-10-03
lang: en
alt_url: /zh/bi/Improving-the-prediction-of-protein-stability--changes-upon-mutations-by-geometric--learning-and-a-pre-training-strategy/
permalink: /bi/Improving-the-prediction-of-protein-stability--changes-upon-mutations-by-geometric--learning-and-a-pre-training-strategy/
---

> Paper: [Improving the prediction of protein stability  changes upon mutations by geometric  learning and a pre-training strategy](https://www.nature.com/articles/s43588-024-00716-2)
>
> Code: <https://github.com/Gonglab-THU/GeoStab>

## GeoStab: PLM + GAT + ranking-based learning for stability mutations

### Abstract

**What was proposed**: The paper introduces a model suite called GeoStab-suite, comprising three geometry-learning-based models: GeoFitness, GeoDDG, and GeoDTm. They are designed to predict, respectively, the fitness score of proteins after mutation,

$\Delta\Delta G$ (change in free energy), and $\Delta T_{m}$ (change in melting temperature).

**How the data challenge is addressed**:

- **GeoFitness** uses a dedicated loss function that enables supervised training on the large, inconsistently labeled (multi-labeled) fitness data in deep mutational scanning (DMS) databases.
- **GeoDDG and GeoDTm** reuse the GeoFitness encoder as a **pre-training module** to mitigate their own scarcity of training data.

**How effective the strategy is**: This pre-training strategy, together with data augmentation, substantially improves model performance and generalization.

**Key results**: On benchmark tests, GeoDDG and GeoDTm achieve Spearman correlation coefficients that are **at least 30% and 70% higher**, respectively, than other state-of-the-art methods.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GeoStab/fig1.png" alt="avatar" style="zoom:40%;" /></div>

Accurate prediction of mutational effects is essential for protein engineering and design. Protein fitness is defined as the ability of a protein to perform a specific function, but in different experimental settings it is typically quantified by different readouts (e.g., enzyme activity, peptide binding affinity, and protein stability). A major goal of protein design and engineering is to improve fitness and thereby enhance performance in biotechnology and biopharmaceutical processes. Among fitness-related metrics, protein stability has attracted considerable attention and is usually assessed by two quantities, `ΔG` and `T_m`.

`ΔG` denotes the change in unfolding free energy at room temperature and describes thermodynamic stability; `T_m` is the melting temperature and reflects how well a protein maintains its folded state under temperature fluctuations. Understanding stability helps obtain engineered proteins that remain active under harsh bioprocessing or production conditions and clarifies the role of human genetic variants in the etiology of many diseases.

Methods for predicting protein fitness can be developed and refined using **deep mutational scanning (DMS)** databases, which contain more than 3,000,000 measurements of fitness after mutation. However, the multi-labeled nature of DMS data hinders training a single unified predictive model. Existing approaches mainly adopt two strategies to circumvent this obstacle. One strategy, as in ECNet and SESNet, trains a separate model for each definition of fitness. Therefore, before practical prediction, additional fitness data with the same meaning as the target property must be used to retrain these models. This strategy can perform well but sacrifices ease of use. The other strategy trains models with masked language modeling objectives, as in RFjoint, MSA Transformer, and the ESM family, which entirely bypasses the need for fitness labels. This yields a unified model for fast prediction at the cost of reduced performance. A robust approach that produces a unified fitness predictor with satisfactory accuracy remains lacking.

Unlike multi-labeled fitness data, stability changes upon mutation are defined by two well-specified metrics, `ΔΔG` and `ΔT_m`, and accumulated experimental data have enabled development of corresponding predictors. In recent years, substantial effort has been devoted to `ΔΔG` prediction. Current methods fall mainly into **mechanistic predictors, machine-learning predictors, and deep-learning predictors**. Yet when evaluated on the newly released benchmark S669, they do not show a clear advantage over traditional approaches. A key issue is limited training data (on the order of 10,000 examples), which easily leads to overfitting for deep models with millions of parameters. Moreover, available experiments are biased toward a few hotspot protein families, specific target amino-acid substitutions, and/or destabilizing mutations. One manifestation of this bias is that most current predictors fail to reproduce the **anti-symmetry** of `ΔΔG`: swapping mutant and wild-type states should flip the sign of the predicted value. Compared with `ΔΔG` prediction, work on `ΔT_m` prediction is relatively sparse. Existing models such as AUTO-MUTE and HoTMuSiC use physicochemical properties or statistical potentials as features together with machine-learning methods. To our knowledge, no deep-learning approach exists in this area, likely because `ΔT_m` data are far scarcer than `ΔΔG` data. Beyond the same challenges as `ΔΔG` prediction, `ΔT_m` prediction lacks established open-source benchmark datasets, which impedes fair comparison of model performance.

In this work, we first describe GeoFitness, a geometry-learning-based model for protein fitness prediction. Specifically, we design a **special loss function** that allows training a **unified model on multi-labeled fitness data** from DMS databases. The resulting model avoids the need for retraining before use while outperforming other top methods such as ECNet. Furthermore, by reusing the geometric encoder of GeoFitness, we develop two downstream models, GeoDDG and GeoDTm, to predict `ΔΔG` and `ΔT_m` after protein mutation, respectively.

We address limited data for `ΔΔG` and `ΔT_m` prediction through two strategies: expanding training data via collection, and inheriting the geometric encoder of GeoFitness pre-trained on the DMS database. The latter is especially important because fitness data for protein variants exceed the combined `ΔΔG` and `ΔT_m` corpora by at least an order of magnitude, and biological links between fitness and stability are strong; it greatly improves performance and generalization. On benchmark test sets (`ΔΔG` on S669; `ΔT_m` on S571 assembled in this study), GeoDDG and GeoDTm achieve Spearman correlations with experiment that are at least 30% and 70% higher than other leading methods.

### 2 Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GeoStab/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### Overview of the prediction models

The **GeoStab-suite** comprises three standalone programs—GeoFitness, GeoDDG, and GeoDTm. All of them aggregate information from protein sequence and structure in a **geometry-learning-based encoder** for prediction. The geometric encoder uses a **graph attention (GAT)** neural architecture in which nodes (one-dimensional) represent amino-acid residues and edges (two-dimensional) reflect residue–residue interactions (Fig. 2a).

- **GeoFitness** is a unified model that predicts the fitness landscape over all single mutants of a protein (Fig. 2b).
- **GeoDDG** and **GeoDTm** reuse the pre-trained information extractor from GeoFitness to predict `ΔΔG` and `ΔT_m` for proteins with arbitrary numbers of mutations (Fig. 2c).

Structural information can come from experimental structures in the Protein Data Bank (PDB) or from sequence-only prediction with AlphaFold2. We therefore train two versions of GeoDDG and GeoDTm, denoted **‘-3D’** and **‘-Seq’**: the ‘-3D’ variants rely on experimental structures, whereas the ‘-Seq’ variants require only sequence at inference time.

#### Evaluation of protein fitness prediction by GeoFitness

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GeoStab/fig3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GeoStab/fig4.png" alt="avatar" style="zoom:100%;" /></div>

To facilitate training, we convert multi-labeled fitness data into **relative rankings** of all available mutations at each independent site for each protein. GeoFitness is thus a general fitness predictor that does not require retraining on target-specific fitness data before prediction—i.e., it supports **zero-shot prediction**.

- **Comparison with unsupervised models**: We first compared GeoFitness with unified models that do not use fitness labels (RFjoint, MSA Transformer, ESM-1b, ESM-1v, and ESM-2). As shown in Fig. 3, **GeoFitness clearly outperforms these unsupervised models**, achieving higher Spearman correlations on nearly all proteins in the DMS database, indicating that supervised use of fitness data substantially improves performance.
- **Comparison with supervised models**: We then evaluated against ECNet and SESNet, top methods that train a separate model per protein. Although this comparison is unfavorable to our approach, GeoFitness still performs better on more than half of the test proteins (Figs. 3 and 4a). Averaged over the full DMS database, the general GeoFitness model achieves a Spearman correlation (0.62) slightly above per-protein ECNet (0.59) and SESNet (0.57) models.
- **Generalization**: When switching from the default random split to a harder position-based split, GeoFitness’s advantage over ECNet increases further. Ten-fold cross-validation for zero-shot prediction on unseen proteins shows acceptable performance even under this stringent setting (median Spearman 0.35), supporting broad applicability.
- **Ablation study**: Ablations of GeoFitness show contributions from architecture and data augmentation; **data augmentation (enrichment from MaveDB) contributes more**, increasing the mean Spearman correlation by 0.16.

#### Evaluation of `ΔΔG` prediction by GeoDDG

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GeoStab/tab1.png" alt="avatar" style="zoom:100%;" /></div>

GeoDDG uses a weight-shared module to process sequence and structure for wild-type and mutant proteins and takes their difference as the prediction, which **naturally enforces anti-symmetry**.

- **Performance on S669**: We evaluated GeoDDG-Seq and GeoDDG-3D on the S669 benchmark with strict removal of redundancy between training and test sets. As in Table 1, **GeoDDG-Seq and GeoDDG-3D outperform other methods on all metrics within their respective categories (sequence-based / structure-based)**. For Spearman correlation, relative gains over the second-best method are **36.4%** (0.60 vs 0.44) and **32.6%** (0.61 vs 0.46). GeoDDG is also the only method in this evaluation with mean absolute error (MAE) below 1 kcal mol⁻¹.
- **Performance with limited data**: To probe the method, we retrained GeoDDG on the smaller S2648 set (GeoDDG-LE). Performance drops slightly but **still leads all other methods by a large margin**, showing reliable models even with limited training data.
- **Ablation study**: Ablations for GeoDDG (Extended Data Figs. 1 and 2) show that among all improvements, the **pre-training strategy** yields the largest gain (+0.07 Spearman for GeoDDG-Seq, +0.06 for GeoDDG-3D), supporting pre-training on large fitness corpora as an effective way to overcome long-standing data scarcity in `ΔΔG` prediction.

#### Evaluation of `ΔT_m` prediction by GeoDTm

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GeoStab/tab2.png" alt="avatar" style="zoom:100%;" /></div>

Unlike `ΔΔG` prediction, no established benchmark existed for `ΔT_m`. We curated **S571**, a test set without redundancy relative to available training data, to enable fair evaluation.

- **Performance on S571**: We evaluated GeoDTm-Seq and GeoDTm-3D on S571 against AUTO-MUTE and HoTMuSiC. As in Table 2, **GeoDTm-3D outperforms other structure-based methods on all metrics**. Notably, Spearman correlation rises from 0.30 to 0.51—a **relative improvement of over 70%**.
- **Ablation study**: Ablations for GeoDTm (Extended Data Fig. 3) again highlight pre-training: in both variants, **pre-training contributes most**, improving Spearman correlation by 0.09, further showing that pre-training on related data reduces overfitting and improves generalization.

### Discussion

Understanding mutational effects is central to protein design and engineering, and computational methods that learn and predict these effects accurately and efficiently are in high demand. Despite continued architectural innovation, **insufficient and inefficient use of data** has become a bottleneck for further gains. In fitness prediction, abundant DMS data enable deep learning, but mishandling of multi-labeled data forces a trade-off between predictive power and usability. For `ΔΔG` and `ΔT_m`, definitions are clear and labels are single-valued, yet **limited scale and bias** in the data prevent training deep models without overfitting. A systematic review even argued that average accuracy of `ΔΔG` predictors on S669 has not improved over the past 15 years. For `ΔT_m`, the situation is worse because objective benchmarks comparable to S669 were missing, making fair assessment impossible.

Here we use a differentiable ranking algorithm to build a **soft Spearman correlation loss**, allowing a unified neural network to be trained on all DMS data regardless of multi-label structure. This loss enables full supervised use of DMS for GeoFitness, yielding higher accuracy than leading models on target fitness landscapes without strict retraining on large same-type datasets before use. Because stability is biologically related to fitness, we use the **GeoFitness geometric encoder pre-trained on fitness data** to guide `ΔΔG` and `ΔT_m` prediction. Ablations show **pre-training** improves Spearman correlation by 0.07/0.06 and 0.09 for `ΔΔG` and `ΔT_m`, respectively, mitigating limited-data effects and improving generalization.

At present, GeoFitness is trained only on **single-point mutation** data from DMS. Incorporating **multi-point mutations** and explicit **epistatic effects** between sites could further improve GeoFitness and better capture general mutational effects, benefiting downstream stability prediction and other scarce-data tasks such as predicting luminescence and expression of variants.

To further improve stability prediction, we collected, cleaned, and manually verified data from ProThermDB and ThermoMutDB, producing large open datasets: **S8754** for `ΔΔG` and **S4346** for `ΔT_m`. Ablations confirm positive effects of data augmentation on GeoDDG and GeoDTm. We also built benchmark **S571** for fair `ΔT_m` evaluation. S8754, S4346, and S571 are freely available and may benefit the broader stability-prediction community.

GeoFitness, GeoDDG, and GeoDTm all rely on a **geometric encoder**—a geometry-learning architecture that jointly processes sequence and structure and supports anti-symmetric predictions when integrated with downstream heads. Evaluations (Tables 1 and 2) show structure helps stability prediction (structure-based models usually beat sequence-based ones), but experimental structures are often unavailable. We therefore provide GeoDDG/GeoDTm-3D and GeoDDG/GeoDTm-Seq, taking structure from experiments or AlphaFold2, respectively. In practice, use **‘-3D’** when reliable experimental structures exist; use **‘-Seq’** when only sequence is known.

Notably, **‘-Seq’ performance is very close to ‘-3D’** in our stability predictors (Tables 1 and 2), suggesting that careful use of accurate AlphaFold2 structures as spatial constraints (e.g., edge embeddings here) can effectively support downstream tasks such as stability prediction, consistent with prior findings.

We have deployed a **web server** for GeoStab-suite (GeoFitness, GeoDDG, and GeoDTm). We hope GeoStab-suite will be a useful tool for researchers in protein science.

### Methods

#### **Protein fitness database and dataset**

- **MaveDB**: MaveDB is an open database for large-scale mutational effect data. We selected 52 DMS studies on single-point mutation effects.
- **DeepSequence dataset**: We also filtered DMS data from the DeepSequence dataset, collected single-point mutations, and excluded overlap with MaveDB, yielding 22 DMS datasets.
- **Train/validation/test splits**: The DMS data used here comprise ~300,000 entries from 74 proteins. For each protein, available DMS data were randomly split 7:1:2 into training, validation, and test sets. Training data across proteins were merged as the composite training set for GeoFitness. Notably, these DMS labels **do not overlap** with protein stability datasets, in particular the `ΔΔG`/`ΔT_m` benchmarks, so large-scale DMS pre-training does not leak information into downstream `ΔΔG`/`ΔT_m` training or evaluation.

#### Protein stability database and dataset

- **ProThermDB**: A thermodynamic database of protein mutants, an upgraded successor to ProTherm, with ~31,500 stability entries.
- **ThermoMutDB**: A manually curated thermodynamic database of protein mutants with ~15,000 stability entries.
- **S2648**: A `ΔΔG` dataset of 2,648 single-point mutations in 131 proteins from ProTherm, widely used for training `ΔΔG` predictors.
- **S669**: A `ΔΔG` benchmark of 669 single-point mutations in 94 proteins with <25% sequence similarity to S2648 proteins; commonly used for fair evaluation of `ΔΔG` methods.
- **S461**: A cleaner subset of S669 with 461 single-point mutations and corrected labels, also used as an auxiliary benchmark.
- **S8754**: **Training set for `ΔΔG` constructed in this work**, with 8,754 single-point mutations in 301 proteins. Data were collected from ProThermDB and ThermoMutDB, carefully cleaned, merged, and manually verified for unique, high-confidence entries. After removing redundancy with S669, this is the **largest `ΔΔG` training set** used here.
- **M1261**: A dataset **generated in this work** to evaluate **multi-point** `ΔΔG` prediction: 792 double and 469 triple-or-higher mutations in 133 proteins.
- **S571**: **Benchmark test set for `ΔT_m` methods built in this work**, with 571 single-point mutations in 37 proteins. Data were cleaned similarly to S8754 and deduplicated against the commonly used training set S1626 for fair evaluation.
- **S4346**: **Training set for `ΔT_m` constructed in this work**, with 4,346 single-point mutations in 349 proteins. After removing overlap with S571, this is the **largest `ΔT_m` training set** used here.

#### Information processing in the geometric learning-based model architecture

As in Fig. 2a, the geometric encoder uses GAT with nodes and edges to process sequence- and structure-derived features.

- **Sequence features**: From the large protein language model **ESM-2**. Each GAT node is initialized mainly by the ESM-2 embedding of the corresponding residue.
- **Structure features**: Each edge is initialized by the **relative geometric relationship** between a pair of residues in the 3D structure.
- **Fusion and update**: At each layer, node and edge embeddings are fused and updated through operations including multi-head attention.
- **Anti-symmetry**: In GeoDDG and GeoDTm (Fig. 2c), wild-type and mutant features are processed by the **same weight-shared** network; swapping inputs should flip the sign of the difference between outputs, **naturally enforcing permutation anti-symmetry**.

#### Training details

- **Datasets**: DMS data for training, validation, and testing GeoFitness; S8754 for GeoDDG training and S669 for testing; S4346 for GeoDTm training and S571 for testing. Redundancy between train and test was removed with strict criteria (proteins with >25% sequence identity to any test protein were excluded from training).
- **Structure sources**: Two GeoDDG/GeoDTm variants: experimental wild-type structures (GeoDDG-3D/GeoDTm-3D) and AlphaFold2-predicted wild-type structures (GeoDDG-Seq/GeoDTm-Seq).
- **Feature generation**: ESM-2 layer-33 650M model for per-residue token embeddings; FoldX to predict mutant structures from wild-type structures.
- **Loss functions**:
  - For GeoFitness, multi-label DMS fitness is converted to **relative rankings** of all possible mutations at each site; optimization uses a **differentiable soft Spearman correlation** loss for gradient-based training.
  - For GeoDDG and GeoDTm, a **joint loss** combines soft Spearman correlation with mean squared error (m.s.e.) between predictions and experiments.
- **Fine-tuning**: When training GeoDDG and GeoDTm, parameters of the inherited pre-trained geometric encoder are frozen initially for fast optimization of other parameters; in a subsequent fine-tuning stage, all parameters are allowed small adjustments.

<hr align="left" color="#987cb9" size="1">
