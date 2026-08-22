---
layout: post
title: bioRxiv-2023 IgDesign-In vitro validated antibody design against multiple therapeutic antigens using inverse folding
categories: [BI]
tags: [protein, antibody, inverse folding, protein-design]
proceedings: bioRxiv
date: 2023-12-08
lang: en
alt_url: /zh/notes/bi/IgDesign：In-vitro-validated-antibody-design-against-multiple-therapeutic-antigen-(1)/
permalink: /notes/bi/IgDesign：In-vitro-validated-antibody-design-against-multiple-therapeutic-antigen-(1)/
redirect_from:
  - "/bi/IgDesign：In-vitro-validated-antibody-design-against-multiple-therapeutic-antigen-(1)/"
  - "/BI/IgDesign：In-vitro-validated-antibody-design-against-multiple-therapeutic-antigen-(1)/"
---

> Paper: [IgDesign: *In vitro* validated antibody design against multiple therapeutic antigens using inverse folding](http://biorxiv.org/lookup/doi/10.1101/2023.12.08.570889)
>
> Code: <https://github.com/AbSciBio/igdesign>

## IgDesign: Fine-tuning ProteinMPNN + LM-Design for CDR design

### Abstract

Methods for designing antibody CDRs have not yet been validated by *in vitro* experiments. Here the authors propose IgDesign, a deep learning approach, and demonstrate model robustness by designing binders that successfully engage eight therapeutic antigens. The model designs either heavy-chain CDR3 (HCDR3) alone or all three heavy-chain CDRs (HCDR123). For each of the eight antigens, 100 HCDR3 and 100 HCDR123 designs were generated, grafted onto the variable regions of natural antibodies, and screened for antigen binding by surface plasmon resonance (SPR). As a baseline, 100 HCDR3 sequences were drawn from the model training set and paired with native HCDR1 and HCDR2. IgDesign is the first experimentally validated antibody inverse-folding model. It can design antibody binders against diverse therapeutic antigens with high success rates and, in some cases, improve on clinically validated reference antibodies. The data generated in this study can also serve as a benchmark for different antibody–antigen interactions.

### Introduction

IgDesign is an antibody generative method built on LM-Design that can design HCDR3 alone or all three heavy-chain CDRs (HCDR123) for a reference antibody while preserving binding activity.

The baseline can be viewed as a simple random procedure (sampling directly from training data without conditioning on the target structure); comparisons show IgDesign is stronger than this random baseline on most tasks.

### Methods

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgDesign/fig1.png "avatar")​

To assess whether ProteinMPNN can be used for antibody design, the authors first tried IgMPNN, trained on an antibody dataset. IgMPNN is the core antibody-design module in IgDesign, optimized from ProteinMPNN and AbMPNN. The main differences from AbMPNN are: (1) during training, IgMPNN additionally conditions on antigen sequence and antibody framework (FWR) sequence so the model can better generate antibody sequences matched to the antigen; (2) at training time CDR regions are decoded in order (HCDR1 → HCDR2 → HCDR3 → LCDR1 → LCDR2 → LCDR3), but at inference the generation order can be specified flexibly. Within each CDR, the order of amino acid generation is random to increase diversity. These changes make IgMPNN better suited to antibody design.

The CDR design protocol in IgDesign follows the LM-Design combination of a structure encoder and sequence decoder. IgMPNN provides final node embeddings and model logits; maximum-likelihood sampling yields a tokenized sequence. That sequence is fed into the ESM2-3B protein language model, and embeddings are taken from the layer before the final projection head. A bottleneck adapter layer then performs cross-attention with IgMPNN node embeddings as keys and ESM2-3B embeddings as queries and values. The resulting embeddings pass through ESM2-3B’s projection head to obtain logits, which are added to IgMPNN logits to produce the final model output.

IgMPNN is first pretrained on a general protein dataset from PDB (split at 40% sequence similarity), then fine-tuned on antibody–antigen complexes from SAbDab. IgDesign uses this pretrained and fine-tuned IgMPNN as the structure encoder and is further fine-tuned on the same antibody–antigen complex data. For data splits, a 40% sequence-similarity antigen holdout avoids leakage, and all SAbDab structures are removed from the general PDB set to ensure independence. For each antigen, a separate IgMPNN and IgDesign model is trained, and the reference antibody’s HCDR3 sequence is excluded from the training set. All models are trained with Adam at learning rate 10⁻³.

Eight therapeutically relevant antigens were selected from a curated SAbDab subset, each with a reference binder and antibody–antigen complex structure. IgDesign takes 3D backbone coordinates of the antibody–antigen complex, antigen sequence, and antibody FWR sequence as input. At inference, antibody sequence is generated in the order HCDR3 → HCDR1 → HCDR2 → LCDR1 → LCDR2 → LCDR3. For each antigen, IgDesign generated one million candidate sequences and selected the 100 HCDR3 and 100 HCDR123 sequences with lowest cross-entropy loss for *in vitro* evaluation. As a comparison baseline, 100 HCDR3 sequences per antigen were sampled at random from SAbDab, matching the model’s training distribution and paired with native HCDR1 and HCDR2. Each target antigen thus yielded a library of 100 IgDesign HCDR3 designs, 100 IgDesign HCDR123 designs, and 100 SAbDab HCDR3 baselines. Control experiments were also run to verify that SPR could reliably separate known binders from non-binders. Further details are in the appendix.

### Results

#### Amino acid recovery (AAR)

IgMPNN, IgDesign, and ProteinMPNN (baseline) were used to evaluate AAR; ProteinMPNN was additionally evaluated on antibodies not seen in its training set (“ProteinMPNN (Filtered)”). For each antigen, a model trained with that antigen held out was used to compute test-set AAR, with emphasis on single-sample AAR (**1-shot AAR** means picking one random generated sequence per model and computing **amino acid recovery (AAR)**). Comparing mean test-set AAR across the eight antigens, IgMPNN and IgDesign significantly outperformed ProteinMPNN and its filtered variant in all cases (Mann–Whitney U test, *p* < 2e-4).

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgDesign/fig3-4.png "avatar")​

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgDesign/fig5-6.png "avatar")​

#### In vitro binding rates and affinities

**Binding rates:**

*   IgDesign **HCDR3** designs showed significantly higher binding rates on seven of eight antigens compared with SAbDab baseline HCDR3 (Fisher’s test, *p* < 3e-3).
*   IgDesign **HCDR123** designs showed significantly higher binding rates than baseline on four of eight antigens (*p* < 3e-3).
*   Baseline HCDR3 showed binding for only two antigens (CD40 and C5).

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgDesign/fig2.png "avatar")​

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgDesign/tab3-4.png "avatar")​

#### Self-consistency RMSD (scRMSD)

Using affinity data from the SPR dataset for binders and non-binders, the authors assessed how well the common self-consistency RMSD (scRMSD) metric separates binders from non-binders and predicts affinity. scRMSD was computed for HCDR1, HCDR2, HCDR3, HCDR123, and the Fv (variable fragment). Structure prediction and scRMSD used ABodyBuilder2, ABodyBuilder3, and ESMFold. Full results, including distributions and statistics of scRMSD across antigens, design categories, and binding labels, are in the appendix.

The study finds that **scRMSD** helps somewhat in separating binders from non-binders, but the effect is limited by dataset bias and other factors:

1.  **scRMSD for binders vs. non-binders:**

    *   On average, binders had lower scRMSD than non-binders, with statistical significance in some cases (see Tables 6, 9, 12, etc.).
    *   The dataset may nevertheless be biased:

        1.  **Data leakage:** structure predictors may have seen reference antibody sequences during training, biasing scRMSD toward the reference (see Tables 5, 8, 11, etc.).
        2.  **Baseline HCDR3 effects:** SAbDab HCDR3 scRMSD distributions are often higher than inverse-folding-designed HCDR3, possibly because baseline HCDR3 is not structure-conditioned and may appear in structure-predictor training data.
2.  **scRMSD for inverse-folding designs:**

    *   For antibodies designed only by inverse folding, scRMSD distributions are tighter (especially in HCDR3).
    *   In that setting, scRMSD discriminates binders from non-binders less well.
3.  **Affinity and scRMSD:**

    *   Pearson correlation between scRMSD and affinity (*K*<sub>D</sub>) is weak, with inconsistent sign (positive or negative).
    *   The only metric consistently positively correlated is **mean ensemble Fv scRMSD**, but correlation is usually very low (e.g., 0.001 on Ravagalimab).
    *   On the Afasevikumab dataset (only six binders), the maximum correlation for this metric was 0.87, but the sample size is too small.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgDesign/tab5-7.png "avatar")​

### Discussion

IgDesign is an antibody inverse-folding model that combines protein inverse folding (ProteinMPNN, LM-Design), language models (ESM2), antibody-specific context (antigen and FWR sequences), and fine-tuning on antibody–antigen complexes. The work shows IgDesign can reliably design binders against multiple therapeutic antigens, with binding validated by SPR. Although scRMSD is limited for separating binders from non-binders and predicting affinity, the authors stress the need for clearer evaluation protocols and new metrics for antibody design. IgDesign is the first *in vitro*–validated antibody inverse-folding method and illustrates broad potential in antibody development, including optimizing variants and supporting *de novo* design. The authors also release datasets to support community benchmarking and model improvement.

​

***

​
