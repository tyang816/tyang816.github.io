---
layout: post
title: Science-2025 Simulating 500 million years of evolution with a language model
categories: [BI]
tags: [protein, evolution, PLM, generative]
proceedings: Science
date: 2025-01-16
lang: en
alt_url: /zh/notes/bi/Simulating-500-million-years-of-evolution-with-a-language-model/
permalink: /notes/bi/Simulating-500-million-years-of-evolution-with-a-language-model/
---

> Paper: [Simulating 500 million years of evolution with a language model](https://www.science.org/doi/10.1126/science.ads0018)
>
> Code: <https://github.com/evolutionaryscale/esm>

## ESM3: multimodal prompt protein generative model

### Abstract

A multimodal generative language model spans protein sequence, structure, and function. By prompting ESM3 with a chain-of-thought procedure, the authors generated GFP with 58% identity to the nearest natural homolog—a level of divergence that would typically require millions of years of evolution to reach from a distant natural GFP.

### Introduction

ESM3 is a generative masked language model; each modality is trained on discrete tokens. All-to-all modeling over discrete tokens lets ESM3 be prompted with any combination of modalities.

The training corpus comprises 2.78B proteins and 771B tokens. The largest model has 98B parameters. ESM3 is highly responsive to prompts, finding creative solutions under complex prompt combinations. Models at different scales can be aligned by following better prompts, and larger models respond more strongly to alignment.

Validation came from generating a novel GFP, named esmGFP, with 36% similarity to *Aequorea victoria* GFP and 58% similarity to the closest known GFP.

### ESM3

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/fig1.png" alt="avatar" style /></div>

ESM3 is trained with a generative masked language modeling objective. The mask pattern is sampled from a noise schedule rather than being fixed. This supervision factorizes the probability distribution over all possible next-token predictions, so tokens can be generated from any starting point in any order.

Generation begins from a fully masked sequence; tokens can be sampled one at a time or in parallel in arbitrary order until the sequence is fully unmasked.

Masking is independent across sequence, structure, and function tracks, enabling arbitrary combinations, partial conditioning, or incomplete sequences.

For structure, a local structure tokenizer embeds coordinates into a discrete space, processed with an invariant geometric attention mechanism for efficient 3D reasoning. Structure tokens from ESM3 are decoded to coordinates; the tokenizer reconstructs protein structures nearly perfectly (<0.3 Å) at atomic resolution.

ESM3 can be conditioned on tokenized structure, atomic coordinates, or both, augmented with SS8 and SASA tracks. Function is represented per residue as tokenized keyword sets.

The largest ESM3 model is trained on 2.78 billion natural proteins from sequence and structure databases, including predicted structures. In total, this yields 315M protein sequences, 236M protein structures, and 539M proteins with functional annotations—771B unique tokens overall. Three model scales are released: 1.4B, 7B, and 98B; Fig. 1D shows that validation loss decreases with scale.

On single-sequence structure prediction (Table S8), ESM3 98B achieves mean local distance difference test (LDDT) 0.895, exceeding ESMFold (0.865 LDDT). Unconditional generation yields high-quality proteins—mean predicted LDDT (pLDDT) 0.84 and predicted template modeling score (pTM) 0.52—with diversity in both sequence (mean pairwise sequence identity 0.155) and structure (mean pairwise TM-score 0.48), spanning the distribution of known proteins (Fig. 1).

### Programmable design with ESM3

ESM3 accepts diverse prompts over sequence, structure coordinates, SS8, SASA, and functional keywords. Metrics are defined per track:

1. constrained site RMSD (cRMSD): RMSD between generated and prompted coordinates
2. SS3 accuracy: three-class secondary-structure agreement between generated and prompted structure
3. SASA Spearman: correlation between generated and prompted SASA
4. keyword recovery fraction: fraction of InterProScan keywords recovered relative to the prompt

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/fig2.png" alt="avatar" style /></div>

From held-out structures (TM < 0.7 to the training set), the authors evaluated combinations of SS8 and SASA prompts. Generated sequences remain structurally plausible overall (mean pTM 0.85) yet are highly novel relative to the training set (Fig. 2B): structure and sequence are not closely matched to training examples. Prompting with secondary structure on a synthetic protein design benchmark also performed well.

ESM3 can follow complex prompts involving motifs (catalytic centers and ligand binding sites). For each unique motif–scaffold pair, samples are drawn until the prompt constraints are satisfied (cRMSD < 1.5 Å for coordinates; TM > 0.6 for fold-level representative structures; SS3 accuracy > 80% for secondary-structure prompts), with high confidence (pTM > 0.8, pLDDT > 0.8).

Fig. 2C shows that conditioned generations can resemble natural proteins to some degree; motifs can be grafted onto different folds.

Fig. 2D illustrates ESM3’s creativity: starting from native trypsin (PDB 1Y3V), the authors prompted the catalytic triad sequence and coordinates plus functional keywords describing trypsin, but reduced total length by one third (223 to 150 residues). ESM3 preserved the active site (cRMSD 0.73 Å) and overall fold coherence with high designability (pTM 0.84, scTM mean 0.97, std 0.006), even though fold specification came only from functional keywords and sequence length dropped substantially.

### Biological alignment

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/fig3.png" alt="avatar" style /></div>

Fine-tuning aligns the model to the task and improves performance.

The authors built a dataset of partial structure prompts, generated multiple protein sequences per prompt, folded and scored each sequence with ESM3 for consistency with the prompt (cRMSD) and foldability (pTM). High- and low-quality samples were paired to construct a preference dataset; ESM3 was optimized with a preference-tuning loss so that higher-quality samples receive higher likelihood (Appendix A.4).

To verify that tertiary motif scaffolding prompts also yield high-quality scaffolds, they used 46 ligand-binding motifs from held-out data, prompting amino-acid identity, atomic coordinates, and related fields. For each motif task, 1024 prompts were created by permuting residue order, changing positions in the sequence, and varying sequence length. Success was measured as the fraction of tasks solved after 128 generations (scaffold cRMSD < 1.5 Å, pTM > 0.8).

Fig. 3A shows that preference-tuned models roughly double pass rates; Fig. 3B shows that larger models produce more diverse solutions.

### Generating a new fluorescent protein

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/fig4.png" alt="avatar" style /></div>

This case study shows that the base pretrained ESM3 already has sufficient biological fidelity to generate functional proteins.

They directly prompted the 7B ESM3 to generate a 229-residue protein with key chromophore-forming and catalytic positions Thr62, Thr66, Gly67, Arg96, and Glu222, conditioned on the experimental structure of residues 58–71 from 1QY3 (important for energetically favorable chromophore formation), with most other positions masked.

A chain-of-thought protocol generated GFP (Appendix A5.1):

1. Filter scaffolds that resemble the 1QY3 active center locally but differ globally before proceeding.
2. Add generated structure to the original prompt to condition sequence generation on the updated prompt.
3. Run iterative joint optimization alternating sequence and structure.
4. Reject chain-of-thought trajectories that lose active-site coordinates.
5. During iterative joint optimization, sample computational pools of thousands of candidate GFP designs from intermediate and final states (10 draws).
6. Finally, rank designs by sequence similarity to known fluorescent proteins and filter with multiple metrics.

Eighty-eight designs were tested in 96-well plates. A hit in well B8 (highlighted) showed only 36% sequence homology to 1QY3 and 57% to the nearest existing fluorescent protein tagRFP, but was ~50× dimmer than natural GFP.

Starting from the B8 sequence, they continued the chain of thought with the same iterative joint optimization and ranking to improve brightness. A second 96-well plate yielded several designs within the brightness range of natural GFP; the best, well C10 on the second plate (Fig. 4B, right), was named esmGFP.

### Discussion

Protein language models are not trained under explicit physical constraints of evolution, yet they can implicitly model multiple plausible evolutionary trajectories.

## Appendix

### Architecture

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs1.png" alt="avatar" style /></div>

frm\_input

(a) sequence, (b) structure tokens, (c) SS8, (d) quantized SASA, (e) function keyword tokens and (f) residue (InterPro) annotation binary features.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/tabs1.png" alt="avatar" style /></div>

#### Geometric Attention

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs2.png" alt="avatar" style /></div>

#### Structure Tokenizer

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs4.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs5.png" alt="avatar" style /></div>

#### Generation

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs15.png" alt="avatar" style /></div>

#### Multimodal protein editing with ESM3

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM3/figs16.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">
