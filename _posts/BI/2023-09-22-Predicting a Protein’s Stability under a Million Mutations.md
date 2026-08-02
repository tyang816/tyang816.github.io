---
layout: post
title: NeurIPS-2023 Predicting a Protein’s Stability under a Million Mutations
categories: [BI]
tags: [protein, fitness-prediction]
proceedings: NeurIPS
date: 2023-09-22
lang: en
alt_url: /zh/notes/bi/Predicting-a-Protein’s-Stability-under-a-Million-Mutations/
permalink: /notes/bi/Predicting-a-Protein’s-Stability-under-a-Million-Mutations/
---

> Paper: [Predicting a Protein’s Stability under a Million Mutations](https://openreview.net/forum?id=YWSOpYjyG4&referrer=%5Bthe%20profile%20of%20Adam%20Klivans%5D(%2Fprofile%3Fid%3D~Adam_Klivans1))
>
> Code: <https://github.com/jozhang97/MutateEverything>

## Mutate Everything: large backbones with per-site MLP heads for massive mutation scoring

### Abstract

Stabilizing proteins is a foundational step in protein engineering. Yet, because natural proteins have evolved under selective pressure, identifying a small set of mutations that improve thermodynamic stability is highly challenging. Deep learning has recently become a powerful tool for finding promising mutations, but existing methods are computationally expensive because the number of model forward passes scales with the number of mutations queried.

The main contribution is a **simple, parallel decoding algorithm** called “Mutate Everything.” It predicts the effect of all single- and double-point mutations in **one forward pass**, and can extend to higher-order mutations with minimal extra compute. The method is built on ESM2 and AlphaFold, neither of which was originally trained for thermodynamic stability prediction. It is trained on the Mega-Scale cDNA proteolysis dataset and achieves state-of-the-art performance on single- and higher-order mutation prediction on S669, ProTherm, and ProteinGym.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/fig1.png" alt="avatar" style="zoom:100%;" /></div>

**Protein engineering** changes the **sequence** of natural **proteins** to improve their properties for **industrial** and **pharmaceutical** applications. **Evolution**, however, optimizes many traits in the **native environment** at once, so proteins often sit at **marginal thermodynamic stability** (roughly 5–15 kcal/mol). That margin means natural proteins frequently **lose function** when moved to more demanding **industrial settings**. Repurposing a natural protein for **biotechnology** therefore usually begins with **mutations** that are **non-deleterious** and **stabilize structure**. Only after the fold is **stabilized** do downstream **engineering goals**—which may require mutations that **reduce stability**—become practical to pursue.

Historically, stabilization was bottlenecked by lengthy **laboratory characterization** of rationally designed candidates or by the complexity of building and screening **directed-evolution libraries**.

High-throughput experiments have driven **explosive growth** in **biological data**, enabling **deep learning** to accelerate identification of **stabilizing mutations**. Successful stabilization often requires **multiple mutations**, not a single change. Most existing frameworks do not fully account for **epistatic interactions** when several mutations co-occur. Accelerating **protein engineering** therefore hinges on efficiently exploring **higher-order mutations** (combinations of simultaneous point changes) and their epistatic landscape. Because higher-order mutants are **combinatorial**, exhaustive search quickly becomes **computationally infeasible**.

Prior models for thermodynamic stability build **embeddings** or **representations** from the input sequence. This work’s **decoder** uses those representations and a **linear network** to form a representation for each possible **single mutation**. **Mutation-level** representations are **aggregated** for **higher-order mutants** and passed to a lightweight **MLP head** to predict ΔΔG. Because mutation-level representations are computed once, the model scales to millions of (higher-order) mutants at low cost for aggregation and the MLP head. Under a fixed compute budget, it evaluates millions more candidates than prior methods.

Mutate Everything estimates all **single- and double-mutation** effects for one protein on a single GPU in seconds, with the potential to score single and double mutants across the ~20,000 proteins in the human proteome. To the authors’ knowledge, it is the first tool that makes proteome-scale **double-mutant** analysis **tractable**. The approach can be paired with any model that produces sequence representations. In the paper, **AlphaFold** serves as the **backbone**, **fine-tuned** on experimentally measured ΔΔG labels, yielding the first accurate AlphaFold-based stability predictor.

The authors evaluate on **ProTherm**, **S669**, and **ProteinGym**. On the ProTherm higher-order subset (PTMul), the model reaches **Spearman ρ = 0.53**, versus 0.50 for the next-best method. On S669 single mutants, it reaches 0.56, improving on the previous best of 0.53. On ProteinGym, Mutate Everything raises the best Spearman correlation from 0.48 to 0.49. The method makes searching for the most stabilizing **double mutations** computationally feasible and prioritizes stabilizing mutants on the cDNA proteolysis double-mutant split (cDNA2), even though only ~3% of labeled mutants in that dataset are stabilizing.

### 3 Preliminary

#### Problem Setup

The goal is to predict how **thermodynamic stability** of protein *w* changes when a set of mutations (M₁,…,M_N) is introduced, as a real-valued **ΔΔG ∈ ℝ**. Each mutation set may be a single change or a **higher-order** combination.

Existing paradigms struggle to scale to very large mutation sets (e.g., millions). Models that handle higher-order mutants typically **take the wild-type protein and the mutant sequence and predict the stability difference** between them. For a small protein (e.g., 75 residues), enumerating all single and double mutants can exceed one million sequences, requiring over one million independent evaluations and rankings—prohibitively slow. This paper’s core idea is **one forward pass** through a fine-tuned **backbone**, then **parallel decoding** of all mutants with a lightweight **decoder**.

#### Feature Extraction

To mitigate scarce experimental labels, the authors **fine-tune AlphaFold** and other pretrained models. AlphaFold’s **Evoformer** captures co-evolution and residue–residue coupling; its **Structure Module** encodes 3D structure cues such as solvent accessibility and inter-residue distances. The paper argues these features correlate strongly with stability and how mutations perturb it.

### 4 Methodology

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/fig2.png" alt="avatar" style="zoom:100%;" /></div>

For a mutation $μ=(p,t)$ that changes position *p* to amino acid *t*, the model computes a latent **mutation representation** $z(μ)∈R^d$ capturing the mutational effect. It decomposes as $z(μ)=f^t(x_p)+h^t$. Sequence-dependent features $f^t∈{f^A,...,f^Y}$ project the site feature $x_p$ according to the mutant amino acid type. Sequence-independent features $h^t∈{h^A,...h^Y}$ are embeddings for each amino acid (A, C, …, Y). Intuitively, $f^t$ encodes local context and $h^t$ encodes the incoming residue type. Together they represent an amino-acid substitution.

#### Decoding single mutations

**Decoding** maps the mutation representation *z(μ)* to a scalar **ΔΔG** (change in thermodynamic stability).

A **lightweight linear head** *g*₁ performs this mapping by learning from *z(μ)* to ΔΔG.

#### Decoding higher-order mutations

Figure 2c illustrates higher-order decoding. The model **sums** the representations of each constituent single mutation.

The aggregated vector passes through a lightweight **decoder head** *g* (similar in spirit to the single-mutation head but with separate parameters) to predict the stability change for the higher-order mutant.

For *K* > 1, the authors use a useful trick: the head predicts a **residual** relative to the **sum of predicted ΔΔG values for the constituent single mutants**. The model thus learns deviations from additivity, capturing nonlinear epistasis. See Table 5d in the paper for empirical results.

#### Decoding a million mutations in one forward pass

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/fig3.png" alt="avatar" style="zoom:100%;" /></div>

This section is the efficiency core: scoring millions of ΔΔG values at once (Figure 3). The key idea is to precompute **mutation features** for every site mutating to all 20 amino acids, then **reuse** them for all queries.

Steps:

1. For a sequence of length *L*, compute representations for all *L×20* single mutants, forming *Z = { z((p,t)) : p ∈ [1,…,L], t ∈ AA }* where **AA** is the 20 amino acids. Each position’s feature *x_l* expands to 20 mutant representations (including the wild-type identity at that site).
2. For a given protein, **backbone feature extraction** and this **mutation expansion** run **once**.
3. To score any mutation set (single- or higher-order), **index** the precomputed *Z* for the relevant single mutants, **sum** their representations, and proceed in parallel for many sets. For *K* = 2 (doubles), the paper uses an **outer-summation** for parallelism; for *K* > 2, a **gather** operation.
4. The lightweight decoder *g* computes ΔΔG in parallel for each aggregated mutant representation.

#### Training

The objective is **Huber loss**, a compromise between MSE and MAE that is less sensitive to **outliers** than MSE alone.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/frm1.png" alt="avatar" style="zoom:100%;" /></div>

A practical benefit is that losses for all labeled mutants of a protein can be updated in **one backpropagation** pass, unlike pipelines that backprop per mutant. Training uses single- and double-mutant data, averaging ~2,000 mutants per protein.

Only ~3% of double mutants in the training data are **stabilizing** (ΔΔG < −0.5 kcal/mol). To avoid underfitting these rare positives, the authors **subsample** **non-stabilizing** doubles so their count is at most 8× the number of labeled stabilizing doubles, improving recognition of stabilizing combinations.

### 5 Results

#### 5.1 Implementation Details

The main **feature extractor** is **AlphaFold**, implemented with **OpenFold**. **MSAs** are from **ColabFold**. Sequence features from Evoformer and the Structure Module are aggregated as decoder input. An **adapter** maps backbone hidden size to *D* = 128. Amino-acid projection and the single-mutation decoder use linear layers; the higher-order decoder uses a 2-layer MLP on aggregated embeddings, followed by a 3-layer MLP for ΔΔG.

Training data come from the **cDNA display proteolysis dataset**: noisy ΔΔG measurements for >100,000 single and double mutants across 100 mini-proteins from high-throughput proteolysis screening with **NGS**. Proteins highly similar to any benchmark sequence are removed from training (**MMseqs2**).

Training **fine-tunes** the pretrained backbone on single mutants for **20 epochs**, then jointly on singles and doubles for 100 epochs with a cosine schedule (10 warmup epochs). Batch size is 3 proteins because of AlphaFold memory. Learning rate is 3×10⁻⁴ with weight decay 0.5. Total training takes ~6 hours on 3 A100 GPUs.

#### 5.2 Finding Stabilizing Double Mutations

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/tab1.png" alt="avatar" style="zoom:100%;" /></div>

This section tests prioritization of **stabilizing mutations** on **cDNA2**, the validation split of the cDNA double-mutant set: 18 mini-proteins and 22,000 double mutants. Validation proteins share at most 36% identity with the cDNA training set. Only 198 mutants (~0.8%) are stabilizing (ΔΔG < −0.5 kcal/mol).

Table 1 compares methods on stabilizing mutants. **Normalized discounted cumulative gain (nDCG)** scores ranked lists using experimental ΔΔG and rank position. **Detection precision (DetPr)** is the fraction of experimentally stabilizing mutants among the top *K* = 30 predictions.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/frm4.png" alt="avatar" style="zoom:50%;" /></div>

Figure 4 reports runtime on a 317-residue protein on an A100. The dashed line marks the transition from scoring singles to doubles. Mutate Everything predicts all single and double ΔΔG values in **one forward pass**. With ESM2 as backbone, runtime is 0.6 s; with AlphaFold, 12.1 s. **PROSTATA** with the same ESM2 backbone must feed wild-type and mutant sequences separately; scoring all doubles takes 306 hours at batch size 768 (~1.5 days on an 8-GPU node). Mutate Everything’s runtime is **essentially constant** in the number of mutants scored.

#### 5.3 Higher-order Mutation Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/tab2.png" alt="avatar" style="zoom:100%;" /></div>

This section evaluates **higher-order** stability changes on **ProTherm**, a database of experimental ΔΔG and Δ*T*<sub>m</sub> for literature mutants. The **ProTherm Multiple (PTMul)** subset contains 858 higher-order ΔΔG entries; after removing 4 duplicates and 8 ambiguous cases, 846 remain (536 doubles, 183 triples). PTMul proteins share at most 35% identity with the training set.

Table 2 reports PTMul results. **Additive baselines** sum predicted ΔΔG for individual changes, isolating the model’s ability to learn **epistasis** (non-additive combinatorial effects). Mutate Everything reaches Spearman *r*<sub>s</sub> = 0.53 (state of the art); the additive baseline is 0.50. Table 6 breaks down performance on doubles versus >2 mutations.

#### 5.4 Single Mutation Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/tab3.png" alt="avatar" style="zoom:100%;" /></div>

The authors also benchmark **single-mutant** ΔΔG on **S669**, designed to reduce leakage and enable fair comparison. They additionally evaluate the common **reverse** setup: input the mutant sequence and predict ΔΔG for reverting to wild type (labels are negated wild-type→mutant ΔΔG). S669 spans 94 proteins and 669 mutants; sequences share at most 30% identity with training.

Table 3 compares to prior work. Mutate Everything reaches Spearman 0.56 (state of the art), versus 0.53 previously.

#### 5.5 Generalization to other Phenotypes

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/tab4.png" alt="avatar" style="zoom:100%;" /></div>

The stability predictor also generalizes to other **phenotypes**. **ProteinGym substitutions** covers 87 proteins and 1.6M mutation sets with generic **fitness** labels (activity, growth, expression, etc.), with up to 20 substitutions per set; 14 proteins include higher-order mutants. **ProteinGym-Stability** holds 7 proteins and 26,000 mutants whose fitness correlates with thermodynamic stability (thermal stability, abundance, expression). ProteinGym sequences share at most 45% identity with training. Proteins are truncated to 2,000 residues for memory.

#### 5.6 Ablation Studies

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MutateEverthing/tab5.png" alt="avatar" style="zoom:100%;" /></div>

Table 5 ablates architectural choices. Core design is evaluated on S669; multi-mutation-specific choices on cDNA2.

- **Backbone (Table 5a):** Compares feature extractors for single-mutant stability. ESM2 is sequence-only; MSA-Transformer and AlphaFold take sequence plus MSA. ESM2 and MSA-Transformer use masked language modeling; AlphaFold also trains on structure prediction. MSA input helps; AlphaFold architecture and pretraining help further. Pretrained AlphaFold performs best.
- **Backbone optimization (Table 5c):** Fine-tuning vs freezing AlphaFold during stability fine-tuning; fine-tuning improves performance.
- **Aggregation (Table 5b):** Ablates how higher-order representations are combined. When using outer product and flatten, head width is reduced for dimension control. On doubles, product and sum aggregations are similar; the authors choose **summation** for easier extension to more mutations.
- **Higher-order modeling (Table 5d):** The direct model predicts ΔΔG outright. Product and sum models learn how singles interact; the multi-mutation head outputs an additive bias or multiplicative scale relative to the sum of single-mutant ΔΔG. Learning an **additive bias** (sum model) works best among the three.

<hr align="left" color="#987cb9" size="1">
