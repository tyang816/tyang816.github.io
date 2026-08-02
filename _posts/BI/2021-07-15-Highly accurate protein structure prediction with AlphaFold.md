---
layout: post
title: Nature-2021 Highly accurate protein structure prediction with AlphaFold
categories: [BI]
tags: [protein, PLM, structure prediction]
proceedings: Nature
date: 2021-07-15
lang: en
alt_url: /zh/notes/bi/Highly-accurate-protein-structure-prediction-with-AlphaFold/
permalink: /notes/bi/Highly-accurate-protein-structure-prediction-with-AlphaFold/
---

> Paper: [Highly accurate protein structure prediction with AlphaFold](https://www.nature.com/articles/s41586-021-03819-2)

## AlphaFold2: predicting protein structure from amino acid sequence

1. Delivers predictions at near-atomic accuracy; widely regarded as a landmark Nature paper in 2021.
2. **Feature one — multiple sequence alignment (MSA):** Given an input amino-acid segment (e.g., from human sequence), homologous segments from other organisms (fish, chicken, etc.) are retrieved from sequence databases, yielding evolutionary features across aligned sequences. **Feature two — pair representation:** Explicit features for every pair of residues capture relational information between amino acids.

   2.1 The pipeline also queries the PDB for structural templates that encode spatial distance patterns between residues.
3. **Evoformer** extends standard multi-head attention in three ways:

   3.1 **Row-wise attention:** Each row of the MSA is treated as a sequence; projections yield $q$, $k$, and $v$.

   3.2 **Gating:** Attention weights are multiplied by a gate computed via a linear layer and activation.

   3.3 **Pair bias:** When forming the dot product between $q_i$ and $k_j$, the corresponding $(i,j)$ pair representation is added to the attention logits.
4. The 3D structure module uses **relative positional encoding** for residue geometry.
5. The **structure module (decoder)** iteratively refines coordinates: starting from a backbone frame, it deforms residues toward the target fold using the encoder output, pair features, and the current 3D frame; updates are applied in blocks rather than all at once.
6. **Training:**

   6.1 **Noisy student self-distillation** on unlabeled structures: train on labeled PDB data first, run the model on a large unlabeled set, keep high-confidence pseudo-labels, and merge them with the original labels for a second training stage. Injecting noise is critical—without it, a single bad pseudo-label can propagate and amplify error.

   6.2 **Masked language modeling** (BERT-style): randomly mask residues in the sequence and predict them.

<HR align=left color=#987cb9 SIZE=1>

