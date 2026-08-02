---
layout: post
title: arXiv-2025 Scaling unlocks broader generation and deeper functional understanding of proteins
categories: [BI]
tags: [GNN, protein, protein-design, transformer]
proceedings: arXiv
date: 2025-04-15
lang: en
alt_url: /zh/notes/bi/Scaling-unlocks-broader-generation-and-deeper-functional-understanding-of-proteins/
permalink: /notes/bi/Scaling-unlocks-broader-generation-and-deeper-functional-understanding-of-proteins/
---

> Paper: [Scaling unlocks broader generation and deeper functional understanding of proteins](https://www.biorxiv.org/content/10.1101/2025.04.15.649055v1.full.pdf)
>
> Code: <https://github.com/Profluent-AI/progen3>

## ProGen3: MoE + GLM + CLM for protein design

### Abstract

Generative protein language models (Protein Language Models, PLMs) are powerful tools for bespoke protein design, with broad applications in medicine, agriculture, and industry. Although prior work has trained ever-larger language models, **optimal training data distributions** and **how model scale affects generated protein sequences** remain insufficiently studied.

This paper introduces the **ProGen3** family of sparse generative protein language models and derives **compute-optimal scaling laws**, scaling models to **46 billion parameters** and pretraining on **1.5 trillion amino-acid tokens**. ProGen3 is pretrained on samples from the curated **Profluent Protein Atlas v1 (PPA-1)**, which contains **3.4 billion full-length protein sequences**.

The authors conduct the first **systematic wet-lab evaluation of how model scale affects generated protein sequences**, finding that **larger models produce expressible proteins from a broader set of protein families**.

Moreover, both computationally and experimentally, **larger models respond more strongly when aligned to experimental data**, yielding substantial gains in **protein fitness prediction** and **sequence generation**.

Overall, the work shows that **large PLMs trained on high-quality data at scale—such as ProGen3-46B—** can serve as strong foundation models that push the frontier of **protein design**.

### 1 Introduction

Proteins play central roles across biological processes, including catalysis, immune regulation, signaling, and molecular transport, with important applications in therapeutics, agriculture, energy, and industry. Functional proteins have long been discovered in nature, while artificial design has often relied on random mutagenesis and experimental screening—methods that are labor-intensive, inefficient, and poorly suited to tailoring function for specific settings.

Recently, falling DNA sequencing costs have enabled collection of large corpora of natural protein sequences. Generative protein language models (PLMs) have emerged as effective tools for learning the distribution of natural sequences, and prior work has demonstrated their ability to design functional proteins in diverse practical settings.

The trajectory of PLMs closely mirrors that of language models in natural language processing (NLP). In NLP, **larger models** are known to transfer better and to reach higher performance with careful model and data scaling. In protein modeling, prior work has shown that PLM embeddings can implicitly capture protein fitness and be exploited in supervised or unsupervised settings.

Nevertheless, several key questions in PLM research remain underexplored:

1. Amid explosive growth in protein sequence data, how to construct an optimal training distribution lacks systematic study;
2. Beyond evaluating embedding-layer representations, it is unclear how **generated sequences themselves** behave as models scale;
3. Although both NLP and protein modeling have explored post-training alignment to user preferences, the effect of **model scale on alignment** has not been studied systematically.

To address these challenges, the authors propose ProGen3—a family of autoregressive protein language models built on a **sparse Mixture-of-Experts (MoE)** architecture that improves training efficiency while preserving performance. To train ProGen3, they construct **Profluent Protein Atlas v1 (PPA-1)**, a high-quality dataset of 3.4 billion full-length proteins, and optimize the training data distribution accordingly.

Under compute constraints, they derive **compute-optimal scaling laws** for sparse models, scale to **46 billion parameters**, and pretrain on **1.5 trillion amino-acid tokens**. They further perform the first systematic wet-lab study of how model scale affects the expressibility and diversity of generated proteins, finding that large models can produce functional sequences across a broader region of protein space.

Finally, the work shows that **alignment to experimental data (e.g., via IRPO)** improves fitness prediction and sequence generation for PLMs at all scales, with **larger models benefiting more**.

### 2 ProGen3

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProGen3/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### 2.1 Architecture

ProGen3 is a family of **autoregressive (AR) protein language models (PLMs)** based on the Transformer architecture with a **sparse Mixture of Experts (MoE)** mechanism. Each forward pass activates roughly 27% of total parameters (Figure 1b). The family spans eight sizes from 112M to 46B parameters; all models use a **context length of 8192 tokens**. Architectural details are in Appendix C.1.

Consistent with analogous work in NLP, sparse models substantially outperform dense models of the same size under a fixed compute budget (Appendix C.2).

A standard AR PLM supports **causal language modeling (CLM)**—generating sequences from N-terminus (amino) to C-terminus (carboxyl), or in reverse from C- to N-terminus. ProGen3 also supports **generalized language modeling (GLM)** for **infill** in the middle of a sequence: target segments are replaced by special sentinel tokens and moved to the sequence end with their sentinels (Figure 1a), enabling local redesign while preserving surrounding context. Details are in Appendix C.3.

#### 2.2 Training Data

ProGen3 pretraining data come from **Profluent Protein Atlas v1 (PPA-1)**, a high-quality dataset of **3.4 billion full-length proteins** totaling roughly **1.1 trillion amino-acid tokens**. PPA-1 integrates diverse genomic and metagenomic sources with multi-stage filtering for generative PLM training; all fragments are excluded so only complete sequences remain. Overall, PPA-1 is comparable in scale and diversity to OMG and similar to ESM3 in sequence count, though ESM3 includes fragments. PPA-1 is much larger than UniRef and BFD; data processing is detailed in Appendix B.

Although protein datasets are growing rapidly, intrinsic bias can still affect training. The authors therefore emphasize **optimizing the training data distribution**, an aspect less studied in prior PLM work (Appendix A.2).

They design four balancing strategies over 50% sequence identity (ID) clusters: **Uniform**, **Square Root**, **Inverse Log**, and **Unmodified**. For a cluster of size *n*, sampling probability is proportional to 1 (**Uniform**), $\sqrt{n}$ (**Square Root**), or $\frac{n}{1 + \log n}$ (**Inverse Log**); **Unmodified** retains the original distribution. Each draw first samples a 50% cluster, then a 90% ID sub-cluster within it, then a sequence uniformly from that sub-cluster.

To measure generalization, they build validation sets with no overlap with training data at 30%, 50%, and 90% ID, each with 2.5M sequences balanced over cluster sizes (1–10, 11–100, 101–1000). Final validation loss is the average over these three sets.

With training fixed at 80B tokens (Figure 1d):

- **Unmodified** performs best near the training distribution (90% ID);
- **Inverse Log** is best farther from training (30%, 50% ID);
- **Uniform** is worst, indicating PLMs still learn important signal from frequent proteins.

All subsequent models are trained with the **Inverse Log** distribution.

#### 2.3 Scaling Up to a 46B Parameter Model

To allocate parameters and data optimally under fixed compute, the authors follow **Kaplan et al.’s scaling laws**, modeling validation loss as a function of parameter count *N* and training tokens *D*:
$$
L(N,D) = \left( AN^{-\alpha/\beta} + BD^{-1} \right)^\beta + C
$$
Fitting yields the approximate optimal parameter–data relation for ProGen3’s sparse architecture (Figure 1e):
$$
N_{\text{opt}}(D) = 2.462 \times 10^{-7} \cdot D^{1.479}
$$
Under a total FLOP budget of $1.1 \times 10^{23}$, theory suggests a 90B-parameter model on 753B tokens with validation loss 1.376. For practical inference hardware, they train **ProGen3-46B** on 1.5T tokens (predicted loss 1.397); the actual result is better (**1.345**), exceeding the compute-optimal frontier.

Increasing warmup steps from 2000 to 10000 also improves stability and may explain the better-than-predicted loss (Appendix C.4).

### 3 Computational and Experimental Analysis of Model Generations

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProGen3/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Earlier sections showed that as pretraining compute scales, PLM validation loss decreases—whether test proteins are close to or far from the training data—indicating **larger models better represent the natural protein distribution**.

However, **the effect of scaling on generation** had been little studied. This section focuses on three ProGen3 models spanning three orders of magnitude in compute:

- **ProGen3-339M**: trained on 200B tokens (1.2 × 10²⁰ FLOPs)
- **ProGen3-3B**: trained on 500B tokens (2.6 × 10²¹ FLOPs)
- **ProGen3-46B**: trained on 1.5T tokens (1.1 × 10²³ FLOPs)

#### 3.1 Larger PLMs generate more diverse proteins that express *in vitro*

##### Generation and filtering pipeline

The authors unconditionally generate protein sequences with **top-p sampling (p = 0.95)** and temperature in [0.5, 1.0]: **4M** sequences from ProGen3-339M, **3M** from ProGen3-3B, and **2M** from ProGen3-46B.

To retain “protein-like” sequences, they apply:

1. **Low-complexity filtering**: drop sequences with >25% low-complexity content (LMs often emit repeats); 95.5% of PPA-1 passes this filter.
2. **Stop token requirement**: valid termination required.
3. **Alignment to natural sequences**: alignment coverage >80% to some PPA-1 natural sequence.

Results:

- Larger models yield **more sequences passing quality filters**;
- Scaling from 339M to 3B **greatly reduces duplicate sequences** (Figure 2a).

##### Structural family coverage: larger models generate richer protein types

Filtered sequences are aligned to representatives of 30% ID clusters in PPA-1. A generated sequence **covers** a cluster if:

- **ID > 30%** to the cluster representative, and
- **alignment coverage > 90%**.

Note: one generated sequence may cover multiple clusters even if cluster representatives are mutually <30% ID.

Findings:

- **Larger models cover more structural clusters** (Figure 2b).
- Clusters covered by small models are largely covered by large models;
- **Large models also hit clusters small models never reach** (Figure 2c).

##### Is generation limited by the training distribution? A perplexity view

To test whether small models could cover large-model clusters with more sampling, the authors compute **mean perplexity** of natural proteins in those clusters:

- High perplexity on natural sequences in a cluster implies the model “does not understand” that cluster and **struggles to generate from it**.

Observations:

- **Large models often generate from clusters where small models have high perplexity**;
- The converse does not hold (Figure 2d);
- Thus **large models subsume small-model generation, but part of their output is out-of-distribution for small models**.

Per-cluster analysis also shows **better performance on smaller clusters as models scale** (Figure 2e), explaining broader coverage.

##### Experimental validation: *in vitro* expression (split-GFP)

To assess whether generated proteins are “realistic,” the authors run **split-GFP expression assays** in *E. coli*, measuring **soluble expression** sensitive to mRNA level and stability, translation efficiency, folding stability (thermodynamic and equilibrium), protease resistance, aggregation propensity, and cytotoxicity.

Split-GFP correlates well with SDS-PAGE and Western blot and suits high-throughput benchmarking of generative models.

##### Experimental design

Clusters are chosen from:

- **42 clusters** hit by all three models;
- **62** only by ProGen3-3B and 46B;
- **45** only by ProGen3-46B (Figure 2f).

For each cluster:

- Two sequences per model: one **40–60%** ID to a PPA-1 natural protein, one **60–80%**;
- Prefer lowest-perplexity generations;
- Controls: two random natural sequences from the cluster;
- Length **75–300** amino acids with structural diversity.

##### Expression results (Figure 2g)

- Mean expression rates are similar across models;
- **Larger models express in more clusters**, indicating stronger generalization;
- For all models, **60–80% ID generations express better than 40–60%**;
- **Generated and natural proteins in the same cluster have similar expression**, supporting fidelity of generations.

#### 3.2 PLMs generate viable proteins outside natural sequence space

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProGen3/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Section 3.1 showed PLMs can generate **expressible proteins** within natural sequence clusters.

This section asks:

> **Can models generate functional proteins where there is no natural reference—outside the natural distribution?**

Criteria:

> Generated sequences with **<30% identity** to any PPA-1 protein or **unalignable** to the atlas.

These sit at the **extreme boundary of generation**—sequence space **without natural anchors**.

**Sample selection**

From prior unconditional generations, samples are stratified by **secondary structure**:

- **mostly-alpha**
- **mostly-beta**
- **mixed alpha/beta**

Ten sequences per structure class per model (ProGen3-339M, 3B, 46B)—**90 total** (Figure 3a; structures from **ESMFold**).

##### Expression assays

All 90 sequences are tested in **split-GFP** in *E. coli* for soluble expression, compared to a well-expressed positive control (Figure 3b).

**Results:**

- Overall expression is **comparable across models**;
- **ProGen3-46B** sequences often show **higher expression** even off the natural manifold;
- **Larger models are more likely to produce structurally stable, well-expressed novel proteins**.

#### 3.3 Larger PLMs are better infillers

Beyond de novo **causal generation**, ProGen3 supports **infilling**—reconstructing segments in the middle of known sequences—important for redesigning **active sites, loops, variable regions**, etc., while **preserving scaffold and adding functional mutations**.

To compare infilling across scales:

##### Target proteins

1. **Nine industrial/therapeutic proteins** (100–400 aa) with prior expression precedent in human or common hosts; **two short and two long segments** each, infilled with ProGen3-3B and 46B.
2. **Nine cytosolic *E. coli* proteins** (100–300 aa); **one short and one long segment** each, infilled by 3B and 46B.

##### Evaluation

- Two infilled sequences per segment per model;
- Split-GFP soluble expression vs. **full natural protein** baseline.

##### Expression analysis

- **11 of 18** targets are native *E. coli* proteins, which may express better but also **ceiling** or underestimate split-GFP readouts.

##### Observations (Figure 3c)

- **On average, infilled expression is below natural**;
- Several infills **exceed** the original protein, so infilling is not always degrading;
- **ProGen3-46B consistently beats ProGen3-3B** on mean expression and relative expression per segment.

### 4 Aligning Protein Language Models to Laboratory Data

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProGen3/fig4.png" alt="avatar" style="zoom:100%;" /></div>

PLMs are pretrained on evolutionary data; **zero-shot fitness prediction** is a standard generalization benchmark:

- Input mutated sequences; score via model probability/likelihood;
- Compare **log-likelihood** to experimental **fitness** with **Spearman ρ**;
- Data often from **Deep Mutational Scanning (DMS)** benchmarks such as **ProteinGym**.

##### Larger models: lower validation loss but weaker zero-shot fitness

The authors observe:

> **Although larger ProGen3 models (>3B) have better validation loss and sequence diversity,**
>
> **they perform worse on ProteinGym zero-shot prediction (Figure 4a).**

This aligns with prior hypotheses (Weinstein et al.; Gordon et al.):

- Beyond a threshold, **models that fit the natural distribution more tightly can be worse at mutational functional effects**;
- **Covariance structure** in natural evolution may misalign with mutational fitness, creating tension between pretraining (model the distribution) and evaluation (predict function).

**Response: explicit alignment**

Despite weak zero-shot performance, large models may harbor **latent ability** unlockable with the right objective. The authors use **IRPO (Iterative Reasoning Preference Optimization)**:

- IRPO, inspired by LLM alignment, fine-tunes log-likelihood toward **experimentally measured properties**;
- Targets here include **enzyme activity**, **binding**, **organismal fitness**, and **protein stability**.

#### 4.1 Supervised Fitness Prediction

They aim to show:

> **IRPO-aligned PLMs can accurately predict distant mutants using only local training mutations**, improving directed evolution efficiency.

##### Setup (ProteinGym)

- **ProteinGym** DMS assays;
- Assays with **≥3-site** mutations;
- Train on variants within *k* mutations of wild type, minimal *k* such that **>500 sequences**;
- Train/test fitness distributions constrained: **total variation distance < 1**.

This yields **eight assays** spanning diverse functions (Supplementary Table 8).

##### Result 1: train local, predict remote—ProGen3 generalizes strongly

- With <500 single-mutant examples, IRPO-aligned models **rank remote variants many mutations away**;
- Scale helps (Figure 4b, Supplementary Figure 6):
  - **ProGen3-46B (ρ = 0.673)** beats **KERMUT (ρ = 0.628)**;
  - Comparable to **ConFit (ρ = 0.679)**;
- As a **general generative model** without structure or hand-crafted features, ProGen3 matches specialized mutational-effect models;
- IRPO can score substitutions, insertions, and deletions—not substitutions alone.

##### Extension: stability (ΔG)

- **Megascale** stability dataset: ~**800k** single/double mutants across **479 domains**, each with **folding free energy (ΔG)**;
- **FoldSeek easy-cluster** (coverage ≥50%): **5%** clusters held out for validation, **5%** for test;
- Train on **single mutants** only to test generalization.

##### Result 2: large aligned models predict stability without structure

- Aligned ProGen3 improves with scale on stability (Figures 4c–e);
- vs. structure-aware **ProteinDPO** on the same splits:
  - **ProteinDPO: ρ = 0.72**
  - **ProGen3-46B (IRPO): ρ = 0.737**
- On **unseen double mutants**, sequence-only ProGen3 generalizes better:
  - **ProGen3-46B: ρ = 0.820**
  - **ProteinDPO: ρ = 0.468** (Figure 4e)

#### 4.2 Sequence Generation

> After showing IRPO improves fitness and stability prediction, do **aligned models also generate better proteins**?

##### Generation setup

From Section 3.1 natural proteins, **32 structurally diverse prompts** (98–282 aa), longer than Megascale domains (40–72 aa).

For each prompt, **stability-aligned vs. pretrained** models generate:

- **50,000** sequences per model per prompt;
- Quality filters as in Figure 2a;
- Conditioning: first 25% → generate last 75%, or last 25% → generate first 75%;
- **100** lowest-perplexity filtered sequences per (model × prompt) for analysis.

##### In silico stability

1. **ESMFold** structures for generations and natural prompts;
2. **PyRosetta**: 4× MinMover; 4× FastRelax; **5 independent trajectories** per sequence;
3. Record **minimum Rosetta energy** across trajectories;
4. Difference vs. natural minimum—lower difference implies greater stability.

**Results** (Figure 4f):

- **Larger models → more stable generations on average**;
- **IRPO alignment further improves stability for all sizes**;
- Alignment improves both prediction and generation.

##### Wet-lab validation (split-GFP)

Prior work links split-GFP expression to stability.

- Per prompt, **two lowest-perplexity** sequences from pretrained vs. aligned ProGen3-46B;
- Expression normalized to wild-type prompt (Figure 4g);
- **Paired Welch’s t-test** (p < 0.01).

**Results:**

- Of 32 prompts: **8** improved expression after alignment; **3** decreased; **21** no significant change;
- Alignment helps a subset without broadly harming expression.

<hr align="left" color="#987cb9" size="1">
