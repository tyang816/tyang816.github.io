---
layout: post
title: arXiv-2025 Prot42：a Novel Family of Protein Language Models for Target-aware Protein Binder Generation
categories: [BI]
tags: [GNN, protein, protein-design]
proceedings: arXiv
date: 2025-04-06
lang: en
alt_url: /zh/bi/Prot42：a-Novel-Family-of-Protein-Language-Models-for-Target-aware-Protein-Binder-Generation/
permalink: /bi/Prot42：a-Novel-Family-of-Protein-Language-Models-for-Target-aware-Protein-Binder-Generation/
---

> Paper: [Prot42: a Novel Family of Protein Language Models for Target-aware Protein Binder Generation](https://arxiv.org/abs/2504.04453)
>
> Code: <https://huggingface.co/inceptionai>

## Prot42: pretrained GPT for binder design

### Abstract

This paper addresses a central challenge in protein engineering: **traditional methods are complex, time-consuming, and resource-intensive**. Although recent generative AI has made breakthroughs, most approaches still rely on **the three-dimensional structure of the target protein and explicit binding-site information**, as in AlphaProteo and RFdiffusion. These models face severe bottlenecks when structural information is unavailable.

To overcome this limitation, the authors introduce **Prot42**, a new family of **Protein Language Models (pLMs)** pretrained on large-scale unlabeled protein sequences. Using an **advanced autoregressive decoder architecture** inspired by decoder-only models in natural language processing, Prot42 captures **evolutionary, structural, and functional** features of proteins.

A standout feature of Prot42 is support for input sequences up to **8192 amino acid residues**, far beyond mainstream models such as ProtBert and ESM-1b, which are typically capped at roughly 1024 residues. This enables Prot42 to model large proteins and multi-domain sequences for more complex biomolecular settings.

The paper further demonstrates two practical applications:

1. **Generation of high-affinity protein binders**
2. **Generation of sequence-specific DNA-binding proteins**

The models are publicly available on Hugging Face as an efficient, accurate, and scalable toolkit for rapid protein engineering tasks.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Protein binders—including **antibodies** and **engineered proteins**—play critical roles in **biotechnology** and **therapeutic applications**, from **diagnostics** to **targeted drug delivery**. Classical **experimental** routes to generate specific binders suffer from **high resource consumption** and **combinatorial complexity**. In recent years, **structure-driven computational methods** such as **AlphaProteo** and **RFdiffusion** have emerged as promising alternatives, achieving **higher experimental success rates** with substantially fewer candidates to screen. Nevertheless, these methods share a key limitation: they **depend on the target’s three-dimensional structure** and **explicit binding-site information**, which becomes a bottleneck for targets lacking structural data.

**Protein language models** (pLMs) offer another viable path, operating primarily at the sequence level and learning representations of **evolutionary relationships** and **structural properties** from **large-scale unlabeled protein sequence data**. Prior work shows that pLMs outperform traditional approaches based on **physicochemical** or **statistical features** on tasks such as **functional annotation**, **structure prediction**, and **de novo sequence generation**. Current pLMs, however, face two major constraints: **limited maximum sequence length** and **lack of native generative capability**. Models such as **ESM-1b** and **ProtBert** excel at representation learning but **cannot generate new sequences** and typically handle at most about **1024 amino acids**, limiting their effectiveness on complex proteins and binding-interface modeling. Foundation models such as **Evo-2** support **million-token context windows** but target **DNA modeling**, not protein-level generation, so a need remains for **dedicated protein generative models**.

In this work, the authors present **Prot42**, a new **protein language model family** built on a **decoder-only autoregressive architecture** inspired by recent NLP advances such as **LLaMA**. They pretrain two Prot42 variants with **500M** and **1.1B** parameters, initially supporting up to **1024** amino acid residues. Through **continuous pretraining**, they extend the context length to **8192**, enabling the model to capture **long-range dependencies** essential for modeling **large proteins**, **multi-domain complexes**, and **complex molecular interactions**. This enriched representation is critical for **generating high-affinity protein binders** and for **discovering new biomolecular interactions**.

They describe Prot42’s **model architecture**, **pretraining strategy**, and **context-length extension mechanism**, and report gains in **sequence modeling accuracy**. **Perplexity** is used as the evaluation metric to verify predictive performance on longer sequences. To demonstrate utility, they focus on two applications: **protein binder generation** and **sequence-specific DNA-binding protein generation**. Results indicate that Prot42 has strong **generative capability** and can push the frontier of **computational protein design** toward **fast**, **accurate**, and **scalable protein engineering**.

As a capability illustration, Figure 1 shows an example in which the model generates a high-affinity binder targeting the **insulin receptor (InsR) α subunit**, compared with the natural binder **insulin** (PDB ID 4oga).

### 3 Methodology

This section describes how Prot42 is used to implement, for the first time, an **instruction-tuning** approach that generates **high-affinity, long-sequence protein binders** directly from **target protein sequences**, **without any structural information** or auxiliary task objectives.

A **novel multimodal strategy** integrates **Gene42 genomic embeddings** with **Prot42 protein embeddings** to further extend the model toward **sequence-specific DNA-binding proteins**. The approach removes reliance on **explicit structural constraints** or **predefined binding motifs**, highlighting how computational models can adapt to diverse molecular contexts when designing functional binders.

#### 3.1 Data Preparation

Training uses the **UniRef50** dataset of **63.2 million** amino acid sequences, tokenized with a **vocabulary of 20 standard amino acids**. An **X token** denotes ambiguous or rare residues.

Each sequence is capped at **1024 tokens**; longer sequences are discarded. This yields a **filtered subset of 57.1 million sequences** with an initial **token packing density of 27%**. To improve compute utilization, **variable sequence length (VSL) packing** maximizes token occupancy within a fixed context window.

This reduces the dataset to **16.2 million packed sequences** while achieving **96% packing efficiency**, substantially improving computational efficiency while preserving sequence diversity and integrity.

The following model variants were trained with the configurations below.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/tab1.png" alt="avatar" style="zoom:100%;" /></div>

#### 3.2 Model Architecture and Pretraining

Prot42 is a **LLaMA-based decoder-only autoregressive Transformer**. Two main models were trained: **Prot42-B** (500M parameters) and **Prot42-L** (1.1B parameters).

Hyperparameters were chosen via **maximal update parametrization (μP)**: a small **81M-parameter model** was trained for hyperparameter search, then settings were **μ-transferred** to the 500M and 1.1B models.

During training, each batch contained **1 million tokens** in total; learning rate followed **linear warm-up plus cosine decay**. All training ran on **Cerebras CS-2** hardware.

##### Continuous Pretraining for a Larger Context Length

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/tab2.png" alt="avatar" style="zoom:100%;" /></div>

Prot42-L was continuously extended from a 1024-length model to support **8192 residues** by **gradually increasing maximum sequence length (MSL)**.

Training schedule:

1. The first 10% of steps use MSL = 1024;
2. Later stages use increasing MSL: 2048 → 4096 → 8192;
3. Each stage keeps the **effective token count** fixed at 1M.

Data splits are given in Table 2, with MSL, sample counts, steps, and mean effective length recorded per stage. The final stage reached a maximum effective sequence length of 5324.

##### Model Evaluation using Validation Perplexity

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig2.png" alt="avatar" style="zoom:60%;" /></div>

**Perplexity (PPL)** is the standard metric for autoregressive model quality. Models with context lengths from 1K to 8K were evaluated on a validation set. Results show:

- All models have higher PPL at 1024 tokens (9–10);
- PPL drops to about 6.5 at 2048 tokens;
- The **8K model reaches the lowest PPL of 5.1 at full context**, indicating better modeling of long-range dependencies;
- Continued improvement from 4096 to 8192 tokens highlights strong long-sequence modeling.

##### Embeddings Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Protein sequences from the **PEER benchmark and UniProt annotations** were used to predict 10 **subcellular localization** classes (e.g., nucleus, mitochondrion, plasma membrane).

Each protein was embedded as a 32×2048 tensor, **mean-pooled** to a global representation, and visualized with **t-SNE**, showing clear separation of localization classes.

Results indicate that Prot42-L embeddings are biologically meaningful and useful for downstream tasks such as **functional prediction**, **drug target discovery**, and **synthetic biology design**.

#### 3.3 Protein Binder Generation

Proteins rarely act in isolation; they interact and bind to form networks that drive cellular processes. Designing proteins that **bind a target specifically** is a fundamental problem in molecular biology with broad applications in therapeutics, synthetic biology, and related fields.

Let the target amino acid sequence be $x = (x_1, x_2, ..., x_n) \in \mathcal{X}$, where $x_i$ is the $i$-th residue of the target; let the binder sequence be $y = (y_1, y_2, ..., y_m) \in \mathcal{Y}$, a sequence that binds the target. The goal is to model the conditional distribution $p(y | x)$—the probability of binder sequence $y$ given target $x$.

The authors use a **sequence-to-sequence** model inspired by machine translation. Training uses a dataset of protein–protein pairs $\mathcal{B} = \{(x_i, y_i)\}$; each pair $(x, y) \in \mathcal{B}$ is concatenated as $s = (x_1, ..., x_n, \texttt{[SEP]}, y_1, ..., y_m)$. **[SEP]** is a special delimiter between target and binder.

Training optimizes the following autoregressive loss:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm1.jpg" alt="avatar" style="zoom:60%;" /></div>

Here θ denotes model parameters; the loss starts predicting from the first binder token after the target and [SEP].

At **inference**, the model conditions on target sequence $x$, followed by [SEP] and an initial methionine (**“M”**), consistent with training data where sequences typically start with methionine.

Binder sequence $y$ is generated autoregressively according to:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm2.png" alt="avatar" style="zoom:60%;" /></div>

To ensure **diversity and quality**, the authors use **stochastic sampling** with temperature scaling, nucleus (top-p) sampling, and top-k filtering. For token $i$, the sampling probability is:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm3.png" alt="avatar" style="zoom:60%;" /></div>

Here $T$ is temperature; $z_i$ is the logit for the current token; $V' \subseteq V$ is the candidate subset after top-k and top-p filtering.

The full generation process is:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm4.png" alt="avatar" style="zoom:60%;" /></div>

where $\hat{Y} = (y_1, y_2, ..., y_m)$ is the generated binder and $M_p$ denotes the Prot42 model.

Figure 4 illustrates a case where the target is **VEGF-A** (vascular endothelial growth factor A), chain V used as the binding target. The model learns $p(y \mid x)$ and autoregressively generates $\hat{Y}$.

At inference, the VEGF-A sequence is fed in, decoding starts with [SEP] and “M”, and each residue is sampled as above.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig4.png" alt="avatar" style="zoom:100%;" /></div>

Structurally, the figure shows the binding region between generated binder and target and reports **binding affinity $A(\hat{Y}, X)$** for quantitative assessment.

#### 3.4 DNA Sequence-specific Binders Generation

Beyond protein–protein interactions, designing proteins that bind specific DNA sequences is important for **gene regulation** and **genome engineering**.

Given a dataset $\mathcal{D}$ of DNA–protein pairs, the goal is to generate a protein sequence $\hat{X}$ that binds a given DNA sequence. A pair can be written as $(X_d^{(1)}, X_d^{(2)}, X_p) \in \mathcal{D}$, where:

- $X_d^{(1)} = (d_1^{(1)}, d_2^{(1)}, ..., d_n^{(1)})$ and $X_d^{(2)} = (d_1^{(2)}, d_2^{(2)}, ..., d_n^{(2)})$ are length-$n$ DNA strands from vocabulary $\mathcal{V}_d$, representing the forward and reverse strands.
- $X_p = (p_1, p_2, ..., p_m)$ is a protein sequence of $m$ amino acid tokens.

DNA model $M_d$ encodes DNA into latent representations:

- $H_d^{(1)} = (h_1^{(1)}, ..., h_n^{(1)})$ from $X_d^{(1)}$
- $H_d^{(2)} = (h_1^{(2)}, ..., h_n^{(2)})$ from $X_d^{(2)}$, where each $h_t^{(i)} \in \mathbb{R}^{1408}$ is an embedding from the DNA model.

Protein model $M_p$ encodes $X_p$ as $E_p = (e_1, e_2, ..., e_m), \quad e_i \in \mathbb{R}^{2048}$.

To inject DNA context into protein generation, DNA representations are projected from 1408 to 2048 dimensions:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm5.png" alt="avatar" style="zoom:60%;" /></div>

Integration uses **cross-attention** to fuse DNA information with protein embeddings. Attention scores are computed as:

$A = \text{Softmax}\left(\frac{QK^\top}{\sqrt{2048}}\right)$

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm6.png" alt="avatar" style="zoom:60%;" /></div>

- Query $Q = \theta_q (H_d^{(1)} \oplus H_d^{(2)})$
- Key and value $K = \theta_k E_p$, $V = \theta_v E_p$

Here $\oplus$ denotes concatenation; $\theta_q, \theta_k, \theta_v \in \mathbb{R}^{2048 \times 2048}$ are trainable.

This yields DNA-modulated protein features: $C_p = A V, \quad E_p' = E_p + C_p$

where $C_p$ is fused context and $E_p'$ feeds the protein decoder.

Protein generation remains autoregressive: each token depends on prior tokens and DNA context. The output distribution is $p_t = \text{Softmax}(\theta_h e_t' + \theta_c C_t), \quad \hat{p}_t = \arg\max_j (p_{t,j})$.

with learnable $\theta_h, \theta_c$; the final protein sequence is:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/frm7.png" alt="avatar" style="zoom:60%;" /></div>

At inference, both DNA strands are encoded and passed to $M_p$; generation starts from a fixed **“M”** token so the model focuses on binding-site prediction.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig5.png" alt="avatar" style="zoom:80%;" /></div>

Figure 5 shows DNA strands C = ACCTGACGCGA and D = TTCGCGTCAGG; Prot42 generates a binding protein compared with a known DNA-binding protein (PDB ID: 8TAC). Structural visualization shows effective DNA–protein matching in three dimensions.

### 4 Experimental Evaluation

#### 4.1 Evaluation on PEER Benchmarks

On the PEER benchmark (Protein sEquence undERstanding), Prot42 was evaluated on 14 downstream tasks, including:

- **Functional prediction** (fluorescence, stability, enzyme activity, solubility)
- **Subcellular localization**
- **Structure-related tasks** (contact maps, fold classification, secondary structure)
- **Protein–protein and protein–small-molecule interaction prediction**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/tab3.png" alt="avatar" style="zoom:100%;" /></div>

**Summary:**

- Prot42 performs strongly on **function prediction**, reaching best results on stability, enzyme activity, and solubility.
- On **subcellular localization**, accuracy matches or slightly exceeds ESM-1b and related models.
- On **structure tasks** (contact maps, secondary structure), results are competitive.
- **Interaction prediction** tasks also show reliable performance.

For protein–ligand tasks, **Chem42** chemical embeddings were integrated to further improve predictions.

#### 4.2 Protein Binders generation

This task compares Prot42 with structure-dependent methods such as **AlphaProteo** for designing binding proteins.

Targets include BHRF1 (EBV anti-apoptotic protein), SARS-CoV-2 RBD, IL-7Rα, PD-L1, TrkA, IL-17A, and TNF-α.

Protocol:

- Train on high-confidence pairs from STRING (score ≥ 90%);
- Cap target and binder length at 250;
- After fine-tuning, generate 500 binder candidates per target;
- Predict target–binder complexes with Boltz-1;
- Score with **PRODIGY**: **binding free energy (ΔG)**, **dissociation constant (Kd)**, interface area, contact residues, polarity distribution, etc.

Key results:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig6.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig7-8.png" alt="avatar" style="zoom:100%;" /></div>

- Prot42 generated high-affinity binders with **nanomolar (nM) Kd** across all targets;
- Kd values for most targets outperform AlphaProteo *in silico* results;
- Standout performance on TrkA, PD-L1, and VEGF-A;
- Example structures include SARS-CoV-2 RBD binders docking key sites (e.g., E484–E505);
- Generated binders may serve as competitive inhibitors to block infection.

#### 4.3 DNA Sequence-specific Binders Generation

This experiment uses **922 DNA–protein pairs** from the **PDIdb 2010** dataset.

Data include structures such as PDB IDs 1TUP, 1JJ6, 1A1F, and 8TAC, with the goal of generating proteins that recognize specific DNA sequences.

Validation:

- **DeepPBS** assesses binding specificity of generated proteins to target DNA;
- DeepPBS uses structural, physicochemical, and geometric context to predict position weight matrices (PWMs), indirectly measuring binding capability.

Results:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Prot42/fig9.png" alt="avatar" style="zoom:80%;" /></div>

- Prot42 binders dock accurately in the DNA major groove;
- Binding pose and shape closely match reference proteins;
- Figure 9 shows multiple successful three-dimensional complexes.

<hr align="left" color="#987cb9" size="1">
