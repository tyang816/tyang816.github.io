---
layout: post
title: Nature Biotechnology-2024 Multistate and functional protein design using RoseTTAFold sequence space diffusion
categories: [BI]
tags: [protein, diffusion, protein-design]
proceedings: Nature Biotechnology
date: 2024-09-25
lang: en
alt_url: /zh/notes/bi/Multistate-and-functional-protein-design-using-RoseTTAFold-sequence-space-diffus/
permalink: /notes/bi/Multistate-and-functional-protein-design-using-RoseTTAFold-sequence-space-diffus/
---

> Paper: [Multistate and functional protein design using RoseTTAFold sequence space diffusion](https://www.nature.com/articles/s41587-024-02395-w)
>
> Code: <https://github.com/RosettaCommons/protein_generator>

## ProteinGenerator: sequence-diffusion protein generation across diverse design scenarios

### Abstract

Protein denoising diffusion can generate proteins from backbones, but it is limited in producing sequences with sequence-specific properties and functional behavior. To address this challenge, the authors present ProteinGenerator (PG), a RoseTTAFold-based sequence-space diffusion model that jointly generates sequence and structure. Starting from a noisy sequence representation, PG iteratively denoises to produce sequence–structure pairs. They designed thermostable proteins and cage-embedded bioactive peptides such as melittin with diverse amino-acid compositions and internal sequence repeats. By averaging sequence logits across denoising trajectories under different structural constraints, they designed multistate parent–child protein triplets in which the same sequence folds into distinct supersecondary structures when intact as a single chain versus split into two subdomains. PG design trajectories can be guided by experimental sequence–activity data, offering a general route for integrated computational and experimental optimization of protein function.

### Introduction

Protein function arises from the interplay between sequence and structure; designing new protein functions therefore requires reasoning over both jointly. Most existing methods treat structure and sequence separately—for example, generating a backbone and then assigning sequence via inverse folding. Classical approaches such as Rosetta flexible-backbone protein design alternate between sequence and structure, whereas many deep learning pipelines first generate a scaffold and then design sequence (e.g., ProteinMPNN). For the latter class of methods, denoising diffusion probabilistic models (DDPMs) have shown considerable promise in continuous data domains. DDPMs approximate the data distribution by learning to denoise samples corrupted with Gaussian noise and can produce high-quality samples from a Gaussian prior. Although structure-centric methods such as RFdiffusion and Chroma are highly effective, they are limited in generating sequences with explicit sequence-level properties and in recognizing sequences that support multiple folds or functions.

The authors argue that diffusion in sequence space rather than structure space can steer sequence-based features and enable explicit sequence design. Starting from the RoseTTAFold structure-prediction network, which maps input sequence and structure information to output sequence and structure, they adapt RoseTTAFold to sequence-space diffusion by masking PDB protein sequences during training, training denoising while adding a structure-prediction loss to preserve joint understanding of sequence and structure.

### Results

#### Categorical DDPM implementation and fine-tuning

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PG/fig1.png" alt="avatar" style /></div>

Diffusion and data noise are implemented by representing protein sequences as discrete one-hot vectors (for native sequences, the true class is set to 1 and all others to −1), with Gaussian noise N(μ=0, σ=1). To fine-tune RoseTTAFold, protein sequences are noised according to a square-root schedule (noise strength tied to the diffusion time step). Inputs include progressively noised sequences and may optionally include **structural information**; sequence is trained with categorical cross-entropy and structure with FAPE. **Self-conditioning** was found to benefit both training and inference.

PG generates proteins from an **L×20** Gaussian-noise sequence; structure is also initialized. The model can incorporate sequence guidance—activity data, sequence-specific latents, or other experimental readouts—by combining such information with the current prediction **x0** to steer generation toward a restricted sequence space (sequences meeting specified requirements). Some **motifs** (sequence segments) are fixed and not diffused; fixed positions are represented with **additional tokens**. **Secondary structure** (e.g., α-helices, β-sheets) is passed through a **1D track**; pairwise relationships or distances are embedded in the **2D track**; and **3D coordinates** are embedded in the **3D track**. Embeddings from the 1D, 2D, and 3D tracks are integrated in RoseTTAFold via **cross-attention**.

At inference, the model starts from the sequence state **xt** at the current time step, predicts **x0** (the denoised state), then forms **xt−1** by noising **x0**—a stepwise reverse denoising process. Two sampling variants were compared: (1) sample from **q(xt−1 | x0)**, so **xt−1** depends only on denoised **x0**; (2) sample from **q(xt−1 | x0, xt)**, conditioning on both **x0** and **xt**. The first approach (sampling from **x0** alone) proved more effective in practice.

PG readily designs motifs with specified structure; designs agree with AF2-predicted structures at RMSD < 2, motif RMSD < 1, and AF2 pAE < 5. ESM pseudo-perplexity indicates sequence quality comparable to native sequences sampled from UniProt24 and substantially better than for sequences from the 640M-parameter sequence diffusion model EvoDiff.

Wet-lab results:

Unconditional PG generation yields sequence–structure pairs whose amino-acid composition resembles natural proteins (figs7); under AF2 and ESMFold, generated sequences fold to structures consistent with the designed conformations and structurally credible. Proteins of 70–80 residues were generated unconditionally; solubility and monomericity were assessed by size-exclusion chromatography (SEC), fold by circular dichroism (CD), and thermal stability by CD thermal melts.

* Among **42** experimentally tested proteins, **32** were **soluble and monomeric** by SEC, indicating no aggregation and stability in solution.
* **CD** showed the expected designed secondary structure.
* **Thermal stability** assays showed stability up to **95°C**, indicating robust folding at high temperature.

#### Design of rare amino acid enriched proteins

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PG/fig2.png" alt="avatar" style /></div>

A key advantage of sequence-space diffusion is straightforward sequence-based guidance: specific bias functions can steer generated sequences during sampling—for example, amino-acid composition constraints.

To test whether PG can design outside its PDB training distribution, especially proteins enriched in evolutionarily rare residues while maintaining sensible sequence–structure relationships (fig. 2a), the authors designed proteins enriched for residues that are infrequent in evolution but have important **structural or functional roles**: tryptophan, cysteine, valine, histidine, and methionine. Sequence positions were ranked by target **frequency**.

* For the top *N* positions (*N* = desired count of the target residue), sampling **xt−1** applies a **bias** toward those amino acids, yielding proteins with up to **20%** of the target composition (fig. 2b).
* Designs were filtered for high AF2 confidence (pLDDT > 90) and self-consistency (RMSD to the design structure < 2 Å).
* **96** proteins were selected for experimental characterization.

Experimental results (fig. 2e–h):

* **68** designs expressed solubly in **Escherichia coli**.
* Among **cysteine-rich** designs, 4/5 were monomeric by SEC; **tryptophan-rich**, 8/19; **valine-rich**, 19/22; **histidine-rich**, 10/12; all **methionine-rich** designs (10/10) were monomeric.
* **Cysteine-rich proteins** (fig. 2e):

    * Without explicit structural conditioning, designs formed **3–4 disulfide bonds**, verified by mass spectrometry with and without the reducing agent TCEP (50 mM). Disulfide formation indicates oxidoreductive cross-linking between cysteines stabilizing the fold.
* **Tryptophan-rich proteins** (fig. 2f):

    * High absorbance at 280 nm, consistent with tryptophan; CD indicated **helical** structure.
* **Valine-rich proteins** (fig. 2h):

    * CD showed elevated **β-sheet** content, matching valine’s secondary-structure preferences; thermal stability was also favorable.

They further explored generation with prescribed charge composition, isoelectric point, and hydrophobicity (fig. 2d).

#### Design of sequence repeat proteins

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PG/fig3.png" alt="avatar" style /></div>

**Repeat proteins** contain multiple repeated **sequence–structure units** and are widespread in nature, playing roles in **molecular recognition** and **signal transduction**.

Given a **repeat-unit length** and **copy number**, PG applies **repeat symmetry** to the noised sequence distribution at each time step, generating repeat-containing sequences that are denoised into the target repeat architecture (fig. 3a).

Without structural guidance, PG mainly produced **β-solenoid** folds. To diversify architectures, training included **secondary-structure conditioning**, enabling all-α, all-β, and mixed α/β designs (fig. 3b). **Helical caps** were added in some designs to improve stability and reduce aggregation.

Wet-lab results:

**74** capped and **86** uncapped repeat designs were tested experimentally.

* Of **160** repeat proteins, **27** capped and **10** uncapped designs were **soluble and monomeric** by SEC.
* **CD** on eight proteins showed **seven** with the intended secondary structure, validating structural fidelity to the design objective.

**X-ray crystallography** was obtained for a design comprising **five repeat units** built from a **four-helix bundle** asymmetric unit; the structure matched the design at **atomic resolution** (fig. 3c).

#### Design of conditionally active peptide cages for membrane lysis

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PG/fig4.png" alt="avatar" style /></div>

**Conditional activity** means function is triggered by external inputs (signals, chemicals, or environmental changes)—important for therapeutics and biosensors that must act at specific times or locations. For example, drug proteins may activate in response to disease cues, and biosensor proteins may respond to molecular or physical stimuli (fig. 4a).

PG was used to embed **bioactive peptide sequences** in an **inert protein cage** (structurally stable, non-active scaffold) so the peptide retains activity while the cage provides support and protection. A chain segment (typically **N- or C-terminal**) was fixed as the bioactive peptide (not diffused); the remainder of the sequence was **freely diffused** by PG (fig. 4b).

Designs integrated the peptide and predicted credible 3D folds (**pLDDT > 85**, cage **RMSD < 2 Å** vs. AF2).

PG was used to **cage** the bioactive peptide **melittin** and release it under defined conditions, especially upon **protease cleavage** (fig. 4b).

**Melittin**:

* **Melittin** is a pore-forming peptide from bee venom that strongly disrupts cells by forming membrane pores and leaking contents; it must be tightly controlled to avoid off-target damage.
* Researchers designed a protein cage that encapsulates melittin until release is triggered.

**Conditional release**:

* A **conditional release** mechanism uses **protease cleavage** to liberate melittin.
* A **furin cleavage site** was placed adjacent to melittin; furin cuts at a specific motif, so cleavage of a terminal loop releases the peptide.

**Secondary structure conditioning**:

* To preserve melittin function while exposing the cleavage site to protease, **secondary structure conditioning** shaped the cage.
* Melittin was embedded in a **helical bundle** with the **furin site in a loop** for protease accessibility, improving controlled release.

**Multiple constraints**:

* Design faced **multiple constraints**, including:

    * **Embedding melittin in an ordered scaffold** (helical bundle) so it can function when caged.
    * **Placing the furin sequence in a loop** so protease can cleave and release melittin.

**Disorder of melittin**:

* **Melittin** is often **disordered** in isolation and does not adopt a stable fold alone, complicating design because the goal was **helical** structure in the cage.
* Despite this, PG produced solutions in which melittin adopts **helical** structure in the closed design.

**Experimental validation** (fig. 4e,f):

* Thirteen PG designs were tested:

    * **Five** were **soluble and monodisperse** by SEC.
    * **CD** indicated **helical** secondary structure, showing successful folding of melittin in the cage.
    * **Thermal stability** was also favorable.

Fig. 4h summarizes **mass spectrometry** confirming masses against expectations. **Uncleaved** protein mass **18,531 Da** matched expectation; **cleaved** protein **15,558 Da** indicated loss of the caged segment (melittin release); released **melittin** **2,992 Da** also matched expectation.

Fig. 4i shows **conditional red blood cell hemolysis**: whether caged melittin lyses membranes upon activation. **Triton X-100** (positive control) gave the strongest hemolysis signal. **Free melittin** also showed high activity. **Buffer alone** and **furin alone** (negative controls) showed little hemolysis.

#### Scaffolding barcode peptide sequences

Peptide barcoding identifies individual proteins in large libraries during binding assays or SEC; barcodes can be read by mass spectrometry after protease release.

Existing approaches often append a flexible barcode at the **N- or C-terminus**, which can impair **expression** and **solubility**; interpreting unbarcoded behavior typically requires many (5–10) barcode variants. Here, a barcode was embedded at the **C-terminus** with flanking **lysine (Lys)** and **arginine (Arg)** to enable cleavage by **Lys-C protease and trypsin** for barcode release.

**Experimental validation**:

An initial library of **84** barcoded designs was separated by SEC (fig. 4d).

* SEC fractions were analyzed on an **Orbitrap Lumos** to detect barcodes and assign identity.
* As controls, all **84** were expressed and purified individually: **64** expressed, and **48** of those showed expected **monodisperse** elution peaks.
* Comparing SEC elution to mass-spectrometry-reconstructed barcode traces, **73/84** designs performed well in the barcode assay; **58** passed barcode validation, and for **41** designs (**71%**) SEC elution volume agreed with the MS barcode signal.

#### Multistate design

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PG/fig5.png" alt="avatar" style /></div>

**Multistate design** seeks one amino-acid sequence that adopts different conformations under different conditions—the same sequence switches folds in response to external triggers (cleavage, chemical signals, etc.). This is challenging because the **energy landscape** must harbor two or more distinct minima with a **free-energy gap** small enough that a trigger can drive the transition.

RoseTTAFold receives the **same sequence** with different **structural conditioning** rather than different sequences. PG supplies distinct structural constraints so each denoising step yields different **logits**, which are linearly combined before propagating to the next time step.

The goal was a sequence that folds one way as a single connected chain (**parent state**) and differently when proteolytically split into two chains (**child states A and B**) (fig. 5a).

* At each step **xt**, RoseTTAFold predicts the **full parent** and the **cleaved child sequences A and B**.
* Logits from parent and children are **averaged**, then noised to sample **xt−1**.

DSSP features appended to the L×20 representation condition secondary structure, enabling designs that are **α/β** in the parent and **all-α** in the children (fig. 5b).

**72** parent–child triplets were tested; proteins were in the **parent state** when **uncleaved** and transitioned to **child states** after **cleavage**; AF2 structures were highly confident. Four soluble, monodisperse families (**MS1–MS4**) were studied in detail by **CD** and **NMR** (fig. 5c–f).

#### Guidance with experimental data

**Protein Generator (PG)** can incorporate experimental data to optimize function, including in **directed evolution**.

A complete **GB1** (IgG-binding protein) benchmark was used: all combinations at four sites and their activities are known, enabling direct evaluation of designed sequences.

* Classifiers (e.g., MLPs) trained on fitness from prior rounds supply gradients to guide sequence sampling.
* Each round generated **96** designs; three rounds were run.
* PG improved **mean and maximum fitness** each round and outperformed a Bayesian optimization baseline.

### Discussion

**PG** generates diverse proteins under varied sequence constraints, including **amino-acid composition bias**, **repeat symmetry**, **caging of bioactive peptides**, and **multistate design**, illustrating flexibility on complex design tasks.

Strengths:

* **Multistate design** is a particular strength: one sequence folding into two or more structures, as in **parent–child triplets** via **logit averaging** across conditioning trajectories—a capability that is difficult in **structure-space diffusion**, so RFdiffusion is poorly suited to this task.
* **PG** performs deep learning–driven multistate design by jointly searching sequence and structure without a fixed structural prior, extensible to more complex **switchable protein systems** and conditional proteins that change state under external stimuli.

<hr align="left" color="#987cb9" size="1">

