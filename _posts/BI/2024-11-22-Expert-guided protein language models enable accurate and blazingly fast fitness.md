---
layout: post
title: Bioinformatics-2024 Expert-guided protein language models enable accurate and blazingly fast fitness prediction
categories: [BI]
tags: [protein, fitness-prediction, PLM]
proceedings: Bioinformatics
date: 2024-11-22
lang: en
alt_url: /zh/notes/bi/Expert-guided-protein-language-models-enable-accurate-and-blazingly-fast-fitness/
permalink: /notes/bi/Expert-guided-protein-language-models-enable-accurate-and-blazingly-fast-fitness/
redirect_from:
  - "/bi/Expert-guided-protein-language-models-enable-accurate-and-blazingly-fast-fitness/"
  - "/BI/Expert-guided-protein-language-models-enable-accurate-and-blazingly-fast-fitness/"
---

> Paper: [Expert-guided protein language models enable accurate and blazingly fast fitness prediction](https://academic.oup.com/bioinformatics/article/40/11/btae621/7907184)
>
> Code: <https://github.com/jschlensok/vespag>

## VespaG: FNN + PLM representations trained on GEMME-labeled data

### Abstract

**Motivation**: Wet-lab annotation of protein mutation effects remains costly, motivating **VespaG**, a fast predictor of amino-acid mutational effects that feeds PLM embeddings into a minimally deep model.

**Results**: To mitigate sparsity in experimental training data, the authors built a large GEMME-based dataset of **39 million single-amino-acid variants**. On the **ProteinGym benchmark** (217 multiplex mutational-effect assays covering ~2.5 million variants), VespaG achieved a **mean Spearman correlation of 0.48 ± 0.02**, and can predict all mutations across the human or *Drosophila* proteome on a **standard laptop** (12-core CPU, 16 GB RAM) in **under 30 minutes**.

### Introduction

**Computational models** can help researchers interpret functional impacts of protein variants and prioritize mutations for experimental follow-up. A central challenge is **sparsity of experimental data**. Many supervised ML methods excel on specific datasets but are often tuned to variants already characterized by MAVE assays or linked to disease. That focus yields highly correlated predictions across methods on the small set of proteins with assays, yet **poor agreement on all possible mutations in the human proteome**. These approaches are also sensitive to **noise and uncertainty** in the data.

Among the most successful unsupervised methods, **GEMME (Global Epistatic Model for Mutational Effects)** explicitly models the evolutionary history of protein sequences. GEMME relies on multiple sequence alignments (MSAs), scoring site sensitivity to mutations along a phylogenetic tree topology and the number of substitutions required for adaptation. It uses only a few biologically meaningful parameters and remains robust when input MSAs have low diversity.

In this work, the authors present **VespaG**, which **optimizes prediction speed** by bypassing expensive masked-token reconstruction and instead mapping pLM embeddings directly to the full mutational landscape. They use the evolutionary model GEMME as a teacher to train a relatively simple deep network (~660k free parameters), avoiding the need to compute log-odds ratios. VespaG addresses scarce experimental training data while sidestepping noise and inconsistency inherent in assays.

### Materials and methods

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig1.png" alt="avatar" style /></div>

#### Comparison to state-of-the-art methods

GEMME, ESM2, TranceptEVE L, PoET, and others on ProteinGym.

#### Method development

##### Datasets

To generate training data, the authors built a primary dataset from the **human proteome** and additional datasets from **fruit fly (*Drosophila melanogaster*)**, ***Escherichia coli***, and **viruses** (e.g., influenza, HIV). Each dataset was constructed as follows:

1.  Download reference proteomes from **UniProt** (The UniProt Consortium 2023), retaining one protein sequence per gene.
2.  Remove proteins shorter than 25 amino acids or longer than 1024 amino acids.
3.  Apply two deduplication steps: first remove proteins redundant with test data, then remove within-dataset redundancy.

Training and validation splits used an 80/20 ratio to avoid leakage. To address scarce experimental labels, the authors adopted **GEMME**. For each protein in the training set, they retrieved and aligned homologous sequences using an **MMseqs2**-based MSA generation strategy. GEMME then computed mutational-effect scores from the resulting MSAs.

GEMME produces a full substitution matrix for each input sequence of size **L × 20**, where L is protein length. Scores range from −10 to +2. **GEMME scores** served as pseudo–ground truth to train **VespaG**.

##### Model Specifications

All models use only embeddings extracted from pretrained pLMs. Specifically, two pretrained pLMs were used:

1.  **ProtT5-XL-U50**: An **encoder–decoder** transformer pretrained on the **Big Fantastic Database** and fine-tuned on **UniRef50** (Elnaggar et al., 2022).
2.  **ESM-2-T36-3B-UR50**: A **BERT-style encoder** with 3 billion parameters, trained on all sequences in **UniRef50** clusters plus representative chains sampled from UniRef90 (Lin et al., 2023).

Neither pLM has a length limit at inference, so full protein sequences can be processed. The authors downloaded encoder weights from **HuggingFace** and extracted embeddings from the last hidden layer. **ProtT5** yields 1024-dimensional per-residue embeddings; **ESM-2** yields 2560-dimensional embeddings. Extraction details are in the GitHub repository.

The pLMs were not fine-tuned; pretrained embeddings were used directly for variant-effect prediction.

Five architectures were evaluated for mutational-effect prediction:

1.  **Linear regression (LinReg)**: Feedforward neural network (FNN) with no hidden layers.
2.  **VespaG**: FNN with one hidden layer of 256 units.
3.  **FNN\_2\_layer**: FNN with two hidden layers.
4.  **Convolutional neural network (CNN)**: One 1D convolutional layer and two hidden fully connected layers.
5.  **Ensemble of FNN and CNN**: Best model per architecture, with outputs averaged.

### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig2.png" alt="avatar" style /></div>

VespaG is a feedforward neural network (FNN) with one hidden layer of 256 units, taking sequence embeddings from the protein language model (pLM) ESM-2 as input.

#### VespaG integrating complementary strengths

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig3.png" alt="avatar" style /></div>

The authors compared VespaG with GEMME and ESM-2 in depth and found:

*   **On viral proteins, VespaG outperforms ESM-2 (Δρ = 0.140, P < 10⁻⁴) but remains below GEMME (Δρ = −0.048, P < 10⁻⁴).**
*   **On specific proteins (e.g., yeast ubiquitin and bacterial proteins), predictions exceed GEMME, especially for identifying highly mutation-sensitive residues.**

Moreover, VespaG does not depend on MSAs, improving generalization when input data are limited and avoiding GEMME’s instability when MSA quality is poor.

#### VespaG generalizing across multiple organisms

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig4.png" alt="avatar" style /></div>

*   **Improvements over teacher model GEMME**

    *   VespaG surpasses GEMME on some proteins (e.g., yeast ubiquitin RL40A), and is more accurate than GEMME for highly sensitive residues such as G75 and G76.
    *   GEMME’s evolutionary-pressure assumptions can mispredict on certain proteins, whereas VespaG’s deep learning better captures complex relationships between mutations and function.
*   **Generalization across species**

    *   The study trained on proteins from different species (human, fruit fly, *E. coli*, viruses, etc.) to assess transfer.
    *   Human proteins (5,000), fruit fly proteins (4,000), *E. coli* proteins (2,000), and various viral proteins (1,500).

Results show good cross-species generalization; viral-protein performance is lower but still better than ESM-2.

**VespaG can adapt to new protein datasets without retraining**, whereas GEMME is limited by input MSA quality.

#### VespaG predictions blazingly fast

VespaG offers substantial speed advantages over other state-of-the-art methods:

*   On a standard laptop (Intel i7-1355U, 12 cores, 1.3 GB RAM):

    *   **5.7 seconds** for 73 proteins versus **1.27 hours** for GEMME.
    *   With high-performance CPU/GPU, VespaG completes the human proteome in **under 1 minute**; GEMME needs **90 minutes**.

Compared with other methods:

*   VespaG inference is **~10⁵-fold** (~100,000×) faster than ESM-2.
*   **~10³-fold** (~1,000×) faster than GEMME and VESPA.

With the same compute budget, VespaG can predict all single mutants in the human proteome in **30 minutes**, while GEMME completes only 25 proteins.

### Discussion

#### VespaG reached SOTA despite its simplicity

VespaG’s strong performance shows that a relatively shallow network (~660k trainable parameters) can effectively leverage information from unsupervised methods such as GEMME.

Core advantages include:

*   **Strong generalization**: VespaG exploits sequence representations learned by pretrained PLMs, enabling transfer across organisms without bespoke input generation or training pipelines.
*   **Beyond classical evolutionary conservation**: pLM embeddings compensate for GEMME’s limits on generalization, especially when proteins deviate from typical conservation trends (e.g., yeast ubiquitin).
*   **Viral proteins**: Although VespaG lags on viral proteins relative to other taxa, it still beats ESM-2 and SaProt, suggesting supervised learning helps overcome pLM limitations on viral sequences.

#### Saving resources as criterion

**Very fast inference**: VespaG cuts compute time and resource use versus other SOTA methods—for example, predicting mutations across the human proteome on a consumer CPU in under 30 minutes, while GEMME on the same hardware handles only 25 proteins.

**Compute-friendly deployment**:

*   VespaG does not require expensive GPUs and runs much faster than alternatives even on modest hardware (Intel i7-1355U, 12 cores, 16 GB RAM).
*   Versus 5.35 days of ESM-2 inference, VespaG reduces runtime by five orders of magnitude (100,000×), far exceeding speedups over MSA-based methods such as GEMME and VESPA.

#### Gain of speed at the expense of interpretability?

*   GEMME’s strength is two simple, interpretable parameters (conservation within the family and mutational distance); VespaG learns these relationships implicitly. Although less intuitive, it provides **finer-grained confidence** that is valuable for researchers.
*   VespaG quantifies mutational-effect strength rather than binary impact/no-impact labels.
*   In practice, MSAs or phylogenetic trees can still be used to contextualize VespaG predictions.

#### Interpretable models of variant effects?

*   Despite balancing speed and accuracy, **more biologically interpretable models** are still needed to link predictions to molecular or mechanistic explanations.
*   Future directions:

    *   **Incorporate GEMME intermediates** (e.g., evolutionary distance) to help pLMs learn mutational effects more accurately.
    *   **Characterize functional change**: combine VespaG with phenotype-specific predictors (e.g., stability) for more complete protein-design assessment.
    *   **Improve viral-protein performance**: pLMs underperform on viral proteins, possibly due to lower sequence diversity; virus-specific fine-tuning may help.

<hr align="left" color="#987cb9" size="1">
