---
layout: post
title: arXiv-2026 evedesign accessible biosequence design with a unified framework
categories: [BI]
tags: [protein]
proceedings: arXiv
date: 2026-03-17
lang: en
alt_url: /zh/notes/bi/evedesign-accessible-biosequence-design-with-a-unified-framework/
permalink: /notes/bi/evedesign-accessible-biosequence-design-with-a-unified-framework/
redirect_from:
  - "/bi/evedesign-accessible-biosequence-design-with-a-unified-framework/"
  - "/BI/evedesign-accessible-biosequence-design-with-a-unified-framework/"
---

> Paper: [evedesign accessible biosequence design with a unified framework](https://doi.org/10.64898/2026.03.17.712115)
>
> Code: <https://evedesign.bio/>

## evedesign: accessible biosequence design with a unified framework

### Abstract

Machine learning methods for protein engineering rarely interoperate, typically require bespoke workflows, and remain difficult for non-specialists to use. Yet the most important design problems today—conditional design under real-world constraints, multi-objective optimization, and iterative lab-in-the-loop workflows that incorporate experimental data to improve successive design rounds—demand flexible, composable infrastructure that no single tool provides. The authors introduce evedesign, a unified open-source framework that formalizes conditional biosequence design in a method-agnostic way, enabling supervised and unsupervised models to be combined according to standardized specifications for complex multi-objective workflows, and built from the outset to support iterative experimental integration. An interactive web interface (https://evedesign.bio) further enables end-to-end design for a broad scientific audience. Utility is demonstrated in antibody engineering, enzyme design, and discovery of natural enzymes, with an invitation for open-source community contributions.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/tab1.png" alt="avatar" style="zoom:100%;" /></div>

The authors first note that protein engineering holds enormous potential to address critical unmet needs in next-generation therapeutics, sustainable biomanufacturing, biosecurity, pollutant remediation, and climate adaptation. In recent years, machine learning methods for protein design have proliferated, spanning MSA-based methods trained on evolutionary sequences, large language models (LLMs) trained on unaligned protein sequences, inverse-folding models, and de novo 3D structure design models. Although these methods have achieved impressive experimental results, translating them into practical design workflows remains difficult even for experts and continues to require customized, labor-intensive code development.

The team argues that two interconnected gaps limit the practical impact of progress in this field:

- **The first gap is the lack of standardized programmatic interfaces**, which prevents methods from being easily compared, combined, or swapped. This lack of interoperability is especially costly for **conditional design**: in real settings, protein design must satisfy real-world constraints such as thermal stability, pH tolerance, removal of T-cell epitopes, or binding to new targets, and must support iterative lab-in-the-loop workflows that incorporate new experimental data to guide subsequent design rounds. These multi-objective, constraint-driven tasks are central to most real-world design projects, yet existing frameworks are either not model-agnostic or do not generalize beyond monomeric, sequence-based protein models. The interoperability problem also extends to controlled integration of models into agentic systems.
- **The second gap is the absence of an open-source, interactive user interface** that spans the full design workflow from a target protein to orderable DNA sequences while remaining independent of underlying models and pipelines. Although proprietary commercial solutions exist, the lack of open alternatives forces non-computational researchers to rely on isolated tools, limiting reproducibility and accessibility for the broader scientific community.

To address these gaps and align protein design with **FAIR guiding principles** (Findable, Accessible, Interoperable, Reusable), the authors present **evedesign**, a multi-layer open framework comprising three main components:

1. **A standardized model interface** with reference implementations in a Python package;
2. **A REST API and pipeline runner** for executing design jobs via declarative job specifications;
3. **An interactive user interface** covering the full design workflow (publicly available at [https://evedesign.bio](https://evedesign.bio/)).

Finally, the authors emphasize that the framework is intended as a living community resource: its modular architecture allows new models and workflows to be incorporated as the field evolves, keeping evedesign current and highly extensible for both computational and experimental researchers.

### 2 Results and Discussion

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### A unified interface for biomolecular design

The team identifies the core obstacle to practical use of diverse protein design methods as the lack of a common underlying language. evedesign therefore provides a unified interface:

##### Framing design as a conditional modeling problem

The authors frame biomolecular design as a **conditional modeling problem**. Under this framing, users need not worry about the specific format of underlying models; they specify molecular systems composed of individual entities (e.g., protein, DNA or RNA chains, ligands) through a standardized, declarative data structure. For each entity, users may supply any known conditional information, such as primary sequence, 3D structure, homologs, binding partners, post-translational modifications, or oligomeric state. This setup is highly flexible: sequences may be fully specified, partially masked, or fully open for design; structures may include fragments or alternative conformational states. In this paradigm, overall design objectives (e.g., optimizing thermal stability while removing T-cell epitopes) need not be declared explicitly in additional code—they emerge naturally from the models chosen and system-level constraints applied to them.

##### A multi-level instance representation

Once a conditional modeling problem is specified, models act on concrete **instances** (specific realizations of the molecular system, such as a candidate mutant or newly generated sequence). Each instance carries a **multi-level representation** that simultaneously encodes three levels of information: **sequence, positional embeddings, and 3D structure (PDB format)**. Unlike traditional frameworks that force a single fixed representation, this hierarchical scheme lets design outputs flow seamlessly between models that consume different input types. For example, the same pipeline can score designs using both sequence likelihood and 3D structural constraints, or map LLM embeddings to coordinates for structural validation. The instance format also naturally supports **supervised learning workflows for lab-in-the-loop applications**: experimental measurements can be attached directly as labels on instances, while embeddings or likelihoods from unsupervised models can serve as input features for regression models that predict target properties.

##### Three composable operations

To cover diverse design and prediction tasks without writing custom code, the authors propose that all workflows can be expressed by composing **three standardized model operations** (with semantics analogous to general ML frameworks such as scikit-learn, but adapted to multi-level instance representations):

- **Generate**: produce new design instances at the representation level preferred by the model, conditioned on system specifications.
- **Score**: assign a quantitative fitness value (preferably log-likelihood) to each instance, enabling comparison across designs or mutants.
- **Transform**: map instances between representation levels, e.g., predict 3D structure from sequence or compute embeddings from sequence.

Because all operations share the same standardized instance format, **one model’s output can be consumed directly as another model’s input without reformatting**. This enables researchers to assemble complex multi-objective workflows through simple composition.

##### The evedesign software packages

**1. Core Python package (`evedesign`)** This is the foundation of the framework, released under the MIT license.

- **Built-in model implementations**: It implements the standardized interface and includes reference implementations for three key model classes: (i) the new evolutionary method **EVmutation2**; (ii) the protein language model **ESM-2**; (iii) **ProteinMPNN/LigandMPNN** for inverse folding.
- **Utility tooling**: Beyond models, the package bundles general utilities including a multi-entity Gibbs sampler, sequence distance constraints, MMseqs2-based MSA generation, FoldSeek-based 3D template search and mapping, sequence-space analysis, and codon optimization.
- **Open extensibility**: The team actively invites the open-source community to contribute additional model implementations under the shared specification.

**2. Server and job orchestration (`evedesign_server`)** On top of the core package, the team developed the MIT-licensed `evedesign_server` Python package.

- **Architecture and functionality**: It implements a REST API and a lightweight design pipeline execution engine for distributed execution and status tracking of design jobs.
- **Privacy and private deployment**: For users with commercial confidentiality or data privacy requirements, the package allows hosting the full design server backend on their own infrastructure, ensuring sensitive sequences and experimental data never leave the local environment.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/fig2.png" alt="avatar" style="zoom:100%;" /></div>

**3. Interactive frontend (Web UI)** To make the framework accessible to researchers without computational backgrounds, the team built a React-based frontend application.

- **End-to-end no-code experience**: Users can complete the full pipeline from target sequence to codon-optimized nucleotide sequences without writing code or running command-line tools.
- **Rich visualization**: After jobs complete, the UI supports interactive exploration of generated designs in the context of existing 3D structures and evolutionary sequences, with visualizations such as marginal amino-acid frequencies and projections of natural sequence space.

##### EVmutation2: a lightweight evolutionary model for generative design

Although evolutionary models have a strong experimental track record for designing functional proteins that differ substantially from natural sequences, existing methods—including the authors’ prior EVE model—require dedicated training or fine-tuning on individual MSAs. That property makes them too slow for direct use in interactive servers.

To address this, the team developed **EVmutation2**, a new MSA-based evolutionary model tailored for fast generative inference.

Core technical details:

- **Architectural innovation**: EVmutation2 couples an order-invariant autoregressive decoder to compact single- and pair-sequence representations reimplemented from AlphaFold3.
- **Parameter count and attention**: The model is lightweight, with only **14.3M parameters**. It goes beyond BERT-style masked prediction and supports direct sequence sampling. Decoder attention weights are obtained not from full query–key–value computation but from linear projection of the pair representation, encouraging biologically meaningful pairwise interactions while greatly reducing parameter count.
- **Context maximization**: All known tokens are moved into a prefix in random order, maximizing context for designed positions regardless of where they lie in the sequence.
- **Training and performance**: The model is trained on OpenProteinSet with cross-entropy loss to reconstruct randomly masked MSA sequences. Despite its small size, EVmutation2 matches EVE on the ProteinGym benchmark **without per-target fine-tuning**, making it well suited as a general community server model.

#### Case studies: demonstrating evedesign workflows

In the case studies, the authors clarify that the goal is not to claim state-of-the-art (SOTA) performance, but to show that evedesign’s standardized interface, composable operations, and multi-level instance representation can express complex real-world design tasks as coherent, reproducible workflows without custom code. Summaries of the three cases:

##### Unsupervised enzyme design with an evolutionary model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/fig3.png" alt="avatar" style="zoom:100%;" /></div>

To demonstrate generative sequence design with the evolutionary model above, the team reproduced a workflow similar to Russ et al. In that work, Russ et al. used a **Potts model** (a statistical-physics Markov random field) to design diverse functional variants of chorismate mutase (EcCM), a key enzyme in aromatic amino-acid biosynthesis, validated by **high-throughput** in vivo complementation assays.

- **Model construction and validation**: Starting from a natural EcCM homolog MSA obtained with MMseqs2, the team built an EVmutation2 model and showed that zero-shot scores effectively separate functional from non-functional sequences among natural homologs and Russ et al.’s experimental designs (ROCAUC 0.77 and 0.81, respectively; **Figure 3A**), establishing that the model captures functional constraints in this family.
- **Generative design and characterization**: Using evedesign’s `generate` operation with autoregressive sampling, the team produced 1,024 new sequences. These designs reproduced first- and second-order amino-acid statistics of natural sequences ($r=0.98$ and $r=0.96$), indicating preserved co-evolutionary constraints. Log-likelihood scores were comparable to functional natural sequences and Russ et al.’s designs and much higher than non-functional sequences (**Figure 3B**). In sequence space, EVmutation2 designs interpolated the natural distribution defined by MMseqs2 and were on average more similar to EcCM than Russ et al.’s designs (median identity 39% vs. 25%), while still showing meaningful extrapolation beyond the closest natural sequences (**Figure 3C**).
- **Conclusion**: This workflow shows how a fully unsupervised generative pipeline can be assembled and run in evedesign in only a few lines of code.

##### Complementary sequence- and structure-based antibody scoring

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/fig4.png" alt="avatar" style="zoom:100%;" /></div>

To illustrate combining sequence and structure models in one workflow, the authors scored single-residue substitutions in the variable chains of seven clinically relevant antibodies studied previously by Hie et al., who used an ESM-1v ensemble for language-model-guided affinity maturation.

- **Limits of sequence-only models**: Applying evedesign’s `score` operation with ESM-2, the team found that 44 of 54 experimentally beneficial mutations (81.5%) ranked in the top 5% by ESM-2 score (**Figure 4A**), consistent with the original findings. Notably, ESM-2 assigned lower scores to light-chain mutations that reduced or did not affect antigen binding ($p=0.03$, Mann–Whitney U test), a distinction the original ESM-1 ensemble did not capture, though the effect was not significant for heavy-chain mutations. Because unsupervised language models are trained on sequence without structural context, they are not expected to explicitly capture binding-interface effects.
- **Complementary strengths of structure models**: For three antibody–antigen complexes with experimentally determined structures, the team additionally applied ProteinMPNN scoring conditioned on 3D coordinates. ProteinMPNN and ESM-2 scores correlated globally but showed minimal overlap among top-scoring mutations (mean overlap 0.08 in the top 5%; **Figure 4B**). Importantly, ProteinMPNN assigned much lower scores to deleterious and neutral mutations near the interface (within 6 Å of antigen) while ranking the sole beneficial interface mutation highly across all complexes (**Figure 4C, D**).
- **Conclusion**: This divergence highlights a key advantage of the multi-model evedesign framework: sequence- and structure-based scores provide complementary information and can be combined directly to prioritize mutations—especially important for interaction-sensitive applications such as antibody maturation.

##### Supervised discovery of efficient enzyme variants

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/fig5.png" alt="avatar" style="zoom:100%;" /></div>

To demonstrate supervised property prediction in evedesign, the authors reproduced an analysis by Eom et al., who trained a random forest regressor on ESM-1b embeddings over a curated kynureninase (KYNase) kinetics dataset to mine homologs with improved catalytic efficiency from natural sequence databases.

- **Model training**: Using evedesign’s `transform` operation to compute ESM-2 embeddings and attaching experimentally measured $k_{cat}/K_M$ values as training targets via the instance labeling scheme, the team trained an equivalent regressor and recovered cross-validation performance matching the original study (Spearman $\rho = 0.73$ vs. 0.72; **Figure 5A, B**).
- **Database-scale mining**: Ranking 5,676 unlabeled homologs with the `score` operation reproduced key experimental results: the most efficient variant (K3) consistently ranked among the top 10 across random seeds, while less efficient variants ranked progressively lower (**Figure 5C**).
- **Conclusion**: This confirms that evedesign’s supervised workflow generalizes to database-scale, property-guided search without modifying the underlying framework.

### Conclusion

**1. Addressing fragmentation and accessibility barriers** The authors reiterate that evedesign is a unified open-source framework aimed at fragmentation and accessibility barriers that limit the real-world impact of machine learning in protein engineering. By standardizing how models represent molecular systems, exchange designs, and compose into pipelines, evedesign makes **conditional, multi-objective design problems** central to therapeutic development, biosecurity, and sustainable biomanufacturing tractable without bespoke code for each new task—as validated by the three case studies on unsupervised generative design, complementary sequence- and structure-based scoring, and supervised property-guided discovery.

**2. Serving a broad research community** The modular architecture is intentionally designed for a wide audience:

- **Computational biologists and ML researchers**: integrate new models by implementing a small number of Python interface methods while retaining full control of their own code.
- **Experimentalists**: access the same workflows through the interactive interface (https://evedesign.bio), lowering the barrier to entry.
- **Users with data privacy requirements (e.g., commercial or clinical settings)**: the `evedesign_server` package can be self-hosted on private infrastructure so proprietary sequences and experimental data never leave the user’s environment.
- **Transparency and open licensing**: as a FAIR-aligned platform under MIT/AGPLv3 licenses, evedesign provides the transparency required for rigorous ML-guided design.

**3. Future vision and the lab-in-the-loop frontier** Finally, the authors stress that the framework presented here is a **living software foundation**, not a finished product.

- **Feature expansion**: the team plans to expand the model library, including incorporation of *de novo* structure design methods.
- **Lab-in-the-loop**: the declarative job specifications of the pipeline runner and serializable instance format were designed from the outset to support fully iterative lab-in-the-loop workflows in which new experimental data continuously improves the design loop—a capability ad hoc collections of disconnected tools cannot easily accommodate, and whose full realization the authors view as **the field’s most important near-term frontier**.
- **Community co-development**: the authors actively invite community contributions to grow evedesign alongside the diverse methods integrated into the framework.

### Supplementary Figures

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs5.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs6.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs7.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/evedesign/figs8.png" alt="avatar" style="zoom:100%;" /></div>

<hr align="left" color="#987cb9" size="1">
