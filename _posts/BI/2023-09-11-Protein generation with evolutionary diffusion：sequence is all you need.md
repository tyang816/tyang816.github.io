---
layout: post
title: bioRxiv-2023 Protein generation with evolutionary diffusion：sequence is all you need
categories: [BI]
tags: [protein, PLM, protein-design]
proceedings: bioRxiv
date: 2023-09-11
lang: en
alt_url: /zh/notes/bi/Protein-generation-with-evolutionary-diffusion：sequence-is-all-you-need/
permalink: /notes/bi/Protein-generation-with-evolutionary-diffusion：sequence-is-all-you-need/
---

> Paper: [Protein generation with evolutionary diffusion：sequence is all you need](http://biorxiv.org/lookup/doi/10.1101/2023.09.11.556673)
>
> Code: <https://github.com/microsoft/evodiff>
>

## EvoDiff: Protein design with sequence diffusion

### Abstract

Current generative diffusion models can produce seemingly plausible proteins, but state-of-the-art approaches constrain generation to a narrow design space. This work introduces EvoDiff, a general diffusion framework that combines evolutionary data for controllable protein generation. EvoDiff generates high-fidelity, diverse, and structurally plausible proteins spanning natural sequence and functional space. Importantly, it can produce proteins that structure-based models cannot, such as those with disordered regions, while retaining the ability to scaffold functional structural motifs—demonstrating the generality of a sequence-based formulation.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EvoDiff/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Compared with structure, sequence is the more comprehensive search space for protein design.

Function is determined by the ensemble of structural conformations a sequence can adopt and by the chemistry of its amino acids. Not every protein folds into a single static structure; in many cases structure-based design is infeasible because function is not governed by a fixed structure. Examples include intrinsically disordered regions (IDRs), so static structures resolved by X-ray crystallography are an incomplete distillation of the information captured in sequence space. Another limitation is the scarcity of structural data: PDB holds only ~200K entries and does not represent the full breadth of natural sequences.

The proposed approach combines evolution-related data and performs controllable protein sequence generation using sequence alone. It uses a discrete diffusion framework for sequence generation and also trains discrete diffusion models on MSAs to exploit this additional evolutionary layer when generating new single sequences.

EvoDiff-Seq and EvoDiff-MSA are evaluated on a suite of generative tasks (Fig. 1D) to demonstrate controllable protein design.

#### Discrete diffusion models of protein sequence

Two forward processes for diffusion on discrete data modalities are studied to determine which is most effective: EvoDiff-OADM or EvoDiff-D3PM.

EvoDiff sequence models are trained on 42M UniRef50 sequences using the dilated convolutional architecture introduced in the CARP protein masked language model. EvoDiff-OADM reconstructs the test set more accurately than two EvoDiff-D3PM variants based on uniform transition matrices.

EvoDiff MSA models are trained with MSA Transformer on the OpenFold dataset, downsampling MSAs to 512 residues and depth 64 by random sequence sampling (“random”) or greedy maximization of sequence diversity (“Max”). OADM corruption yields the lowest validation perplexity, indicating that OADM models generalize best to new MSAs.

#### Structural plausibility of generated sequences

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EvoDiff/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Each EvoDiff sequence model generates 1000 sequences whose lengths are drawn from the empirical length distribution of the training set; results are compared to the CARP autoregressive model and ESM2’s masked model.

Structures are predicted with OmegaFold, and pLDDT is computed; lower scores often correspond to IDR regions. The authors also define self-consistency perplexity (scPerplexity), computing perplexity for sequences reconstructed from structure with ESM-IF. Because ESM-IF is also trained on UniRef50, the validation set may overlap; ProteinMPNN is used as well.

#### Biological properties of generated sequence distributions

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EvoDiff/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Ideally, generated sequences should capture the natural distribution of sequence, structure, and functional properties while remaining distinct from one another and from natural sequences.

To assess coverage of sequence and functional property distributions, each generated sequence is embedded with ProtT5; this metric is called Fréchet ProtT5 distance (FPD). Qualitatively and quantitatively, EvoDiff-Seq reproduces natural sequence and functional diversity better than sequences predicted from state-of-the-art masked language models (ESM-2) or from structure generated by state-of-the-art structure diffusion (RF diffusion).

To evaluate the distribution of structural properties in generated sequences, three-state secondary structure is computed. EvoDiff-Seq produces proportions of coil and disordered regions more similar to natural sequences, whereas ESM-2 and RFdiffusion both yield helix-rich proteins.

#### Conditional sequence generation for controllable design

The EvoDiff OADM diffusion framework naturally supports conditional generation by fixing some subsequence and replacing the remainder. Because the model is trained to generate proteins under arbitrary decoding orders, this is done by masking and decoding the desired segments. EvoDiff is applied to controllable design in three settings: modulating MSA-encoded evolutionary information, inpainting functional domains, and scaffolding functional structural motifs.

#### Evolution-guided protein generation with EvoDiff-MSA

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EvoDiff/fig4.png" alt="avatar" style="zoom:100%;" /></div>

Query sequences are masked in 250 MSAs randomly chosen from the validation set and regenerated with EvoDiff-MSA; quality is assessed with foldability and self-consistency metrics.

#### Generating intrinsically disordered regions

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EvoDiff/fig5.png" alt="avatar" style="zoom:100%;" /></div>

Up to 30% of eukaryotic proteins contain at least one IDR, and IDRs account for more than 40% of residues in eukaryotic proteomes. IDRs play important and diverse roles in the cell, often promoted directly by lack of structure, as in protein–protein interactions and signal transduction.

Inpainting is used to generate disordered regions, using a computationally predicted IDR dataset that also provides MSAs.

After generating putative IDRs with EvoDiff via inpainting, DR-BERT predicts a disorder score for each residue in both generated and natural sequences.

#### Scaffolding functional motifs with sequence information alone

Given a fixed functional motif (residue identities specified), the authors ask whether a structure-based model is truly necessary for motif scaffolding.

EvoDiff conditional generation fixes the functional motif and supplies only the motif amino acid sequence as conditioning, generating scaffolds for 17 motif-scaffolding problems and decoding the remaining sequence.

There is little correlation between per-problem success rates of EvoDiff and RFdiffusion, and high success on both methods is rare—suggesting that EvoDiff may have strengths orthogonal to RFdiffusion.

### Discussion

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EvoDiff/fig6.png" alt="avatar" style="zoom:100%;" /></div>

EvoDiff is the first deep learning framework to show that diffusion generative modeling can operate at evolutionary scale in protein sequence space. Unlike prior attempts to train diffusion models on protein structure and/or sequence, EvoDiff is trained on a large sample of all natural sequences rather than on smaller structure datasets or sequences from specific protein families. Previous protein generators trained globally on sequence space were either left-to-right autoregressive (LRAR) models or masked language models (MLMs).

The EvoDiff OADM training objective generalizes both LRAR and MLM training. Specifically, the OADM setup generalizes LRAR by considering all possible decoding orders, while the MLM training task corresponds to training on a single step of the OADM diffusion process.


<HR align=left color=#987cb9 SIZE=1>

