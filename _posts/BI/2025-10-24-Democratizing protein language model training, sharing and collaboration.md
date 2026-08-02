---
layout: post
title: Nature Biotechnology-2025 Democratizing protein language model training, sharing and collaboration
categories: [BI]
tags: [protein]
proceedings: Nature Biotechnology
date: 2025-10-24
lang: en
alt_url: /zh/bi/Democratizing-protein-language-model-training,-sharing-and-collaboration/
permalink: /bi/Democratizing-protein-language-model-training,-sharing-and-collaboration/
---

> Paper: [Democratizing protein language model training, sharing and collaboration](https://www.nature.com/articles/s41587-025-02859-7)
>
> Code: <https://github.com/westlake-repl/SaProtHub>

## SaProtHub: A platform for training, fine-tuning, sharing, and collaborating on SaProt

### Abstract

Training and deploying large-scale protein language models (PLMs) typically requires deep machine learning expertise—an obstacle for researchers outside the field. SaprotHub addresses this challenge by providing an intuitive platform that facilitates model training and prediction as well as storage and sharing. The authors present **ColabSaprot**, a framework built on Google Colab that has the potential to power hundreds of protein training and prediction applications, enabling researchers to collaboratively build and share customized models.

### 1 Main

##### Introduction and background

Proteins underpin nearly all biological processes and sit at the center of medicine and biotechnology. Despite this centrality, deciphering protein structure and function remains a formidable challenge. This landscape has recently been reshaped by two breakthroughs: the success of **AlphaFold2**, which opened a new era in structural biology by predicting structures at experimental accuracy; and, in parallel, **large-scale protein language models (PLMs)** driving unprecedented advances in functional prediction.

This progress is powered by a family of strong PLMs that excel across diverse tasks. Yet for researchers without extensive machine learning (ML) expertise, leveraging these advanced models entails significant technical barriers. These challenges span the entire workflow—from model selection and data preprocessing to training and evaluating models with billions of parameters. This complexity creates a critical bottleneck that limits broad adoption and innovation among those who would benefit most.

**ColabFold** addressed a similar accessibility gap in structure prediction by deploying AlphaFold2 on Google Colab, effectively democratizing its use. Despite that success, a key gap remains: ColabFold **does not support** the more complex task of **custom model training** for **functional prediction**.

##### Solution: ColabSaprot, SaprotHub, and OPMC

To bridge this gap, the authors introduce **ColabSaprot and SaprotHub**, a platform designed for protein function prediction. Built on Google Colab, ColabSaprot enables researchers without ML expertise to train task-specific PLMs through an intuitive interface. Critically, the platform supports a broad range of prediction tasks, ensuring utility well beyond single-task applications.

Complementing this user-friendly platform, the authors present the **Open Protein Modeling Consortium (OPMC)**, an initiative aimed at fostering a community-driven collaborative ecosystem for protein language modeling. The OPMC framework lets researchers share customized models, fine-tune peers’ contributions, or apply them directly to their own research. This creates a **virtuous cycle of sharing, refinement, and application** that accelerates collective progress in the field. As the first platform integrated with OPMC, SaprotHub represents an initial step toward this community-centered vision for AI development.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProtHub/fig1.png" alt="avatar" style="zoom:100%;" /></div>

##### Three core contributions

This work delivers three key contributions:

1. A foundational PLM named **Saprot** (Fig. 1a, b).
2. **ColabSaprot** (Fig. 2a–c), which uses an **adapter learning technique** to enable easy training (or fine-tuning) and inference of Saprot on Colab.
3. **SaprotHub**, a community repository for storing, sharing, searching, and collaboratively developing fine-tuned Saprot models (Fig. 2d).

By combining an advanced PLM, Colab-based cloud computing, and adapter-based fine-tuning, the platform addresses several critical challenges: the difficulty of sharing and collectively using large PLMs, the risk of **catastrophic forgetting** in continual learning, and the need to protect proprietary biological data when sharing results.

##### 1. Saprot: A structure-aware foundation model

The authors first developed **Saprot**, a state-of-the-art large-scale PLM that underpins ColabSaprot and SaprotHub. Saprot introduces a novel protein alphabet and representation scheme that differs from conventional amino acid (AA) sequences or explicit three-dimensional (3D) coordinate structures.

This alphabet is **structure-aware (SA)**: each “letter” jointly encodes AA type and local geometric structure. Formally, the SA alphabet (SAA) is defined as `$SAA = \mathcal{V} \times \mathcal{F}$`, the Cartesian product of $\mathcal{V}$ (20 AAs) and $\mathcal{F}$ (20 structural (3Di) letters) (Fig. 1a). These 3Di tokens are derived from protein 3D structures via **Foldseek discretization**. SAA comprises all combinations of AA (uppercase) and 3Di tokens (lowercase) (e.g., Aa, Ap, Ac, …, Ya, Yp, Yy), allowing proteins to be represented as sequences of SA tokens that capture both primary and tertiary structure (Fig. 1b and Methods).

Despite its compactness, SAA successfully addresses scalability and overfitting when training on large AlphaFold2-generated atomic structures. The “AA + structure token” sequence representation (Fig. 1b) has gained increasing attention in follow-on work as a promising paradigm for protein representation.

Saprot uses a bidirectional Transformer architecture (Fig. 1b). It is pretrained to reconstruct partially masked tokens in SA token sequences. The model was trained from scratch on **40 million protein SA sequences** filtered from AlphaFold’s 214 million proteins at 50% identity. Saprot is offered in three sizes: **35M, 650M, and 1.3B** (M, million; B, billion). The 650M model (used in most evaluations) was trained for 3 months on 64 NVIDIA A100 80-GB GPUs, with compute comparable to ESM-2 (650M).

After pretraining, Saprot serves as a general-purpose foundation PLM with strong performance across protein prediction tasks, including supervised regression and classification at protein or residue level, **zero-shot mutational effect prediction**, and **protein sequence design** (Fig. 1c, d).

Fig. 1d shows Saprot’s **superior performance** over two prominent PLMs—ESM-2 and ProtBert—on 14 distinct protein prediction tasks. On tasks where structure is available (indicated in purple, blue, and red), Saprot consistently outperforms both baselines. Even without structural data (green tasks), Saprot remains competitive with ESM-2 under fine-tuning.

Notably, Saprot **substantially outperforms ESM-2** on three zero-shot mutational effect prediction benchmarks: Mega-scale (0.574 vs 0.478), ProteinGym (0.457 vs 0.414), and ClinVar (0.909 vs 0.862). Moreover, although Saprot is trained with a masked language modeling objective (not optimized specifically for generation), it performs effectively on protein sequence design while achieving **16× faster inference than ProteinMPNN** (Fig. 1e). Recent work has further demonstrated Saprot across protein engineering, de novo design, fitness and stability prediction, molecular understanding, fast sensitive structure search, and drug–target interaction prediction. This versatility across tasks supports SaprotHub’s vision of community collaboration.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProtHub/fig2.png" alt="avatar" style="zoom:100%;" /></div>

##### 2. ColabSaprot: An easy-to-use training and prediction platform

The authors next developed the **ColabSaprot platform** by integrating Saprot into Google Colab infrastructure to support PLM training and prediction. ColabSaprot enables seamless deployment and execution of diverse task-specific trained Saprot models **without environment setup or code debugging**. Researchers can launch training sessions **in just a few clicks** (Fig. 2a). ColabSaprot is designed to host all tasks within the original Saprot framework, supporting direct prediction for zero-shot mutational effect prediction (single-site, multi-site, and full-sequence single-site saturation mutagenesis) and protein sequence design (de novo sequence generation given a backbone structure).

For supervised training tasks (a particular focus of this work), users can fine-tune ColabSaprot on their own experimental data. The authors implement **parameter-efficient fine-tuning (PEFT)** by integrating **lightweight adapter networks** into ColabSaprot (Fig. 2b).

During training, **only adapter parameters are updated** while Saprot backbone weights remain frozen, achieving accuracy comparable to full fine-tuning of Saprot. This design improves learning efficiency and establishes a collaborative, centralized framework that lets biologists fine-tune task-specific Saprot within the research community, especially via cloud environments (Fig. 2c–f).

With adapters and the ColabSaprot interface, researchers can easily store and exchange retrained models on SaprotHub by loading or uploading adapter networks rather than full pretrained models. Because adapters contain far fewer parameters (**roughly 1% of the full Saprot model**), this approach **greatly reduces storage, communication, and management overhead on SaprotHub**, enabling accessibility, co-development, shared use, and open sharing of models (Fig. 2b–d).

Several key features were developed to streamline workflows. The ColabSaprot interface supports sequence and structure inputs, automated dataset handling (including efficient large-file upload), real-time training monitoring with loss visualization, automatic saving and evaluation of best checkpoints, checkpoint resume, and numerous safety checks to minimize user error. For GPU memory efficiency, **adaptive batch sizing** is implemented via **gradient accumulation**. The platform also offers customizable settings so researchers can modify code and tune training parameters for specific needs.

##### 3. SaprotHub: A community for collaboration and sharing

Finally, the authors developed **SaprotHub**, a platform with an **integrated search engine** that provides a central hub for the biology community to share and collaboratively develop peer-retrained Saprot models (Fig. 2d). Model storage, sharing, search, **continual learning**, and **multi-model aggregation** are implemented through the ColabSaprot interface.

Specifically, SaprotHub offers three key advantages:

1. **Secure sharing**: Researchers can share trained models on SaprotHub **without exposing private data**, promoting knowledge transfer and potentially establishing a new paradigm for collaborative research (Fig. 2c).
2. **Continual learning**: Researchers can use shared models contributed by peers on SaprotHub to perform **continual training** on their own datasets. This is especially valuable when **data are limited**, because fine-tuning from a stronger pretrained model often yields better predictions (Fig. 2f). Fine-tuned models can be contributed back to the hub via one-click upload of adapter networks, reinforcing the collaborative ecosystem.
3. **Model aggregation**: As the SaprotHub community grows, it accumulates multiple models for diverse protein prediction tasks. A **model aggregation mechanism** (Fig. 2c) lets users **improve prediction performance** by combining multiple existing models (Fig. 2e).

##### Wet-lab validation and user study

Saprot and SaprotHub have attracted community attention and demonstrated utility through **multiple wet-lab validations**.

- A commercial biotech team (T.Z.) used ColabSaprot for zero-shot single-site mutational effect prediction on a **xylanase**; among 20 experimentally validated variants, **13 showed enhanced enzyme activity**, with R59S improving activity 2.55-fold.
- The X.C. lab used ColabSaprot for zero-shot single-site mutational effect prediction on **TDG** variants; among 20 predicted mutations validated in HeLa cells, **17 showed enhanced editing efficiency**, with three replacements achieving nearly twofold efficiency.
- Another OPMC member fine-tuned Saprot to predict brighter **GFP** variants; experimental validation showed **7 of the top 9 double-site variants** with **enhanced fluorescence**, one reaching **more than eightfold** wild-type intensity.
- The J. Zheng lab shared an **eYFP** fluorescence prediction model trained on 100,000 experimentally validated variants, achieving Spearman correlation ρ = 0.94 on an independent test set—near experimental accuracy.
- The authors have received additional feedback from community researchers reporting positive wet-lab results with ColabSaprot.

The authors also conducted a **user study** recruiting **12 biology researchers without ML backgrounds** and comparing their performance to an AI expert. Results show that with ColabSaprot and SaprotHub, biology researchers can train and use state-of-the-art PLMs **at performance comparable to the AI expert** (Fig. 2g, h).

Notably, in some settings—such as the eYFP fitness prediction task (Fig. 2g)—**biologists using existing models on SaprotHub achieved higher prediction accuracy than the AI expert**. This gain reflects training of shared models on larger or higher-quality datasets, highlighting the potential of model sharing within the scientific community—a central argument of this paper.

##### Conclusion and vision

ColabSaprot and SaprotHub enable biology researchers—even without extensive AI expertise—to train and share sophisticated PLMs for diverse prediction tasks. The platform empowers the broader protein research community to contribute and exchange PLMs, fostering collaborative research and knowledge sharing through peer-trained models.

Saprot and ColabSaprot have been open-sourced, providing a framework for other PLMs to build their own model hubs. Importantly, ColabSaprot and SaprotHub are only a first step in this evolution; OPMC members have already extended the ecosystem by **integrating additional state-of-the-art PLMs**, including ProTrek, ESM-2, ESM-1b, ProtBert, and ProtT5, democratizing access to diverse PLMs for biologists worldwide.

This community-wide engagement aligns with OPMC’s vision to motivate and facilitate open, collaborative PLM development through SaprotHub. The authors view SaprotHub as a catalyst for OPMC to drive innovation and collaboration in the field.

### 2 Methods

##### 1. Constructing SA protein sequences

The **SA vocabulary** jointly encodes residue and structural information. Given a protein `$P$`, its primary sequence is `$(S_{1}, S_{2}, ..., S_{n})$`, where `$s_{i}$` is the residue at position `$i$`. The authors use **Foldseek**, a fast and accurate protein structure alignment tool, to encode 3D structure as discrete, residue-like structural tokens. This yields a structural alphabet `$\mathcal{F}$`, with protein `$P$` represented as `$(f_{1}, f_{2}, ..., f_{n})$`, where `$f_{j} \in \mathcal{F}$` is the 3Di token at residue `$j$`.

Following Foldseek’s default configuration, the size of `$\mathcal{F}$` (i.e., `$m$`) is set to 20. Residue and structure tokens at each site are combined into an **SA protein sequence** `$P=(s_{1}f_{1}, s_{2}f_{2}, ..., s_{n}f_{n})$`, where `$s_{i}f_{i} \in \mathcal{V} \times \mathcal{F}$` is an SA token that naturally fuses residue and geometric information.

SA token protein sequences can be fed to a standard Transformer encoder as input. The authors also introduce a **mask token ‘#’** for residue and structure alphabets, yielding `‘$s_{i}\#$’` and `‘$\#f_{i}$’` forms when only residue or only structure information is available. The SA vocabulary size is therefore `$21 \times 21 = 441$`.

##### 2. Model architecture and pretraining of Saprot

Saprot follows the same network architecture and parameter scales as ESM-2, inspired by BERT. The main difference is the **embedding layer**: Saprot uses 441 SA tokens instead of 20 AA tokens. This near-identical architecture enables straightforward comparison with ESM models.

Saprot is pretrained with the same **masked language modeling (MLM)** objective as ESM-2 and BERT. For a protein sequence `$P=(s_{1}f_{1}, s_{2}f_{2}, ..., s_{n}f_{n})$`, input and output can be written as: input `$(s_{1}f_{1}, ..., \#f_{i}, ..., s_{n}f_{n}) \rightarrow$` output `$s_{i}f_{i}$` (Fig. 1b). Because 3Di tokens in AlphaFold2-predicted structures may be inaccurate in some regions, `‘$\#f_{i}$’` is made visible during training to reduce over-reliance on predicted structure.

AlphaFold2 (AF2) predictions include pLDDT confidence scores. The authors apply special handling for **low-confidence regions** (pLDDT below 70). During pretraining, when such regions are selected for MLM prediction, `‘$s_{i}\#$’` is used as the prediction target while the input SA sequence is masked with ‘##’ tokens. When low-confidence regions are not selected for MLM, `‘$s_{i}\#$’` is used in the input so the model relies on residue context rather than unreliable structure. The same treatment is applied in downstream tasks, with regions where pLDDT is below 70 represented by `‘$s_{i}\#$’` tokens.

Saprot 35M and 650M undergo standard from-scratch pretraining as described. In contrast, **Saprot 1.3B** uses an efficient strategy that **architecturally stacks two identical 33-layer Saprot 650M models**. Initialization copies pretrained 650M parameters into the lower (layers 1–33) and upper (layers 34–66) stacks of the 1.3B model. After initialization, Saprot 1.3B follows the same training protocol as 35M and 650M, **except** that 30% of proteins in each batch are converted to pure AA format `$(s_{1}\#, s_{2}\#, ..., s_{n}\#)$` to strengthen handling of proteins without structural information.

##### 3. Processing the pretraining dataset

The authors follow ESM-2’s procedure to generate identity-filtered protein sequences, then obtain AF2 structures from the AlphaFold DB. Proteins without structures in AlphaFold DB are removed, yielding a set of roughly **40 million structures**. Foldseek encodes these as 3Di tokens, and SA sequences are built by combining residue and 3Di tokens. These datasets train all three Saprot sizes.

##### 4. Hyperparameters for pretraining

Following ESM-2 and BERT, 15% of SA tokens are masked per batch. In 80% of cases, SA token `$s_{i}f_{i}$` is replaced by `$\#f_{i}$`; in 10% by a random token; and 10% are left unchanged.

Optimization uses AdamW with `$\beta_{1}=0.9$`, `$\beta_{2}=0.98$` (note: the Methods section does not state `$\beta_{2}$`, but the fine-tuning section on page 9 specifies `$\beta_{2}=0.98$`), and `$L_{2}$` weight decay 0.01. Learning rate warms from 0 to `$4 \times 10^{-4}$` over the first 2,000 steps and linearly decays to `$4 \times 10^{-5}$` between steps 150,000 and 1.5 million. Total training spans roughly 3 million steps. Sequences are truncated to 1,024 tokens; batch size is 512 sequences. Mixed-precision training is used.

##### 5. Descriptions of baseline models

Saprot is compared against several prominent PLMs.

- **Supervised learning tasks**: ESM-2 (650M), ProtBert (BFD), MIF-ST, GearNet, and ESM-3 40. ESM-2 (650M) is the primary baseline because its architecture, size, and training recipe are closest to Saprot.
- **Zero-shot mutational effect prediction**: ESM-2 (including 15B), ProtBert, ESM-1v, Tranception L (without MSA retrieval), MSA Transformer, EVE, and ESM-3.
- **Protein inverse folding**: ProteinMPNN.

##### 6. Formula for the zero-shot mutation effect prediction task

Prior PLMs (e.g., ESM) predict mutational effects using the **log odds ratio** at mutated positions:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProtHub/frm1.png" alt="avatar" style="zoom:50%;" /></div>

where `$T$` denotes all mutations and `$s_t$` is the residue type in mutant (mt) and wild-type (wt) sequences.

The authors slightly adapt this formula for SAA in Saprot: the probability assigned to each residue is the sum of probabilities over all tokens containing that residue type:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProtHub/frm2.png" alt="avatar" style="zoom:50%;" /></div>

where `$f \in \mathcal{F}$` is a 3Di token and `$s_t f$` is an SA token in SAA.

##### 7. Zero-shot mutational effect prediction tasks and datasets

- **ProteinGym**: A broad deep mutational scanning benchmark. Evaluation uses the substitution branch with provided structures and Spearman rank correlation.
- **ClinVar**: A public repository of human genetic variants and clinical significance. Analysis is restricted to reliability ratings of one star or higher and excludes proteins longer than 1,024 residues. Evaluation uses area under the ROC curve (AUC).
- **Mega-scale**: Thermodynamic folding stability of protein domains measured via cDNA display proteolysis. Spearman rank correlation is used.

For each mutational dataset, **wild-type structures** are provided for all variants because AF2 cannot reliably distinguish structural changes from single substitutions.

##### 8. Supervised fine-tuning tasks and datasets

- **Fine-tuning Saprot with AF2 structures**: **Thermostability** from FLIP and **localization prediction** from DeepLoc (ten-class subcellular localization and binary localization).
- **Fine-tuning Saprot with PDB structures**: **Metal-ion binding** and tasks from **ProteinShake** (structural class prediction, structural similarity prediction, and binding site detection).
- **Fine-tuning Saprot without structure**: When structure is unavailable, 3Di tokens are masked in SA sequences. Tasks include **fluorescence** and **stability** from TAPE, **AAV** from FLIP, and **$\beta$-lactamase** landscape prediction from PEER.

##### 9. Data split

Prior work often splits datasets by sequence identity. ProteinShake argues that structure is more conserved than sequence, so **structure-based splitting** provides a stricter test of generalization.

Accordingly, the authors adopt structure-based splitting in most evaluations, quantified with **LDDT** as in ProteinShake. For structure-containing datasets, the default **70% LDDT** threshold recommended by ProteinShake is used. For sequence-only tasks, original literature splits are retained.

##### 10. Protein inverse folding

To use Saprot for inverse folding, the backbone is encoded as 3Di tokens `$(f_{1}, f_{2}, ..., f_{n})$`. All residue portions of SA tokens are masked, forming `$(\#f_{1}, \#f_{2}, ..., \#f_{n})$`, which is input to Saprot to predict residue distributions at all positions. Unlike ProteinMPNN’s autoregressive generation, **Saprot predicts all residues in one forward pass**.

Two Saprot variants are evaluated: one pretrained with AF2 structures and one further fine-tuned on the **CATH dataset**. CATH (also used for ProteinMPNN) is split 80:10:10 for train, validation, and test.

##### 11. Hyperparameters for fine-tuning tasks

Fine-tuning uses AdamW with `$\beta_{1}=0.9$`, `$\beta_{2}=0.98$`, and `$L_{2}$` weight decay 0.01. Batch size is 64 for all datasets. Learning rate is `$5 \times 10^{-5}$` for tasks with AF2 or PDB structure and `$1 \times 10^{-5}$` for structure-free tasks.

##### 12. Adapter learning

Adapter learning has recently been adopted in protein research. This work integrates it with Google Colab to build a platform for fine-tuning, sharing, continual retraining, and collaboration via SaprotHub.

Among adapter types (Houlsby, Pfeiffer, Compacter, LoRA), the authors chose **LoRA** for comparable results with fewer parameters. By integrating learnable low-rank matrices into each Saprot block while freezing the backbone, LoRA enables parameter-efficient fine-tuning and model sharing.

##### 13. Community-wide collaboration

To assess benefits of collaboration:

- **Model aggregation** (Fig. 2e): Training data are randomly split into five subsets and a model is trained on each (simulating models shared by different researchers). For **regression** (e.g., thermostability), final predictions are the **mean** of model outputs. For **classification** (e.g., subcellular localization), **majority voting** is used.
- **Continual learning** (Fig. 2f): The authors sample 100, 200, and 500 training instances (simulating private data). Two base models are fine-tuned (adapters only): official Saprot (blue) and a shared SaprotHub model (orange). Continuing from an existing well-trained model (orange) **significantly outperforms** training from scratch (blue).

##### 14. ColabSaprot notebooks

ColabSaprot comprises three key components:

1. **Model training**: Rapid environment setup, data handling, and efficient Saprot fine-tuning. Four base models (Saprot 35M, 650M, custom fine-tuned, community shared) and advanced hyperparameter options are provided.
2. **Prediction**: Broad tasks (protein-level, residue-level, protein–protein interaction, zero-shot mutational effects, protein design) using community or locally fine-tuned models. ColabSaprot also supports **ensembling (aggregation)** to improve accuracy.
3. **Model sharing, search, and collaboration**: Researchers contribute model weights (especially adapters) to SaprotHub. A dedicated search engine helps locate models for continual learning, direct application, or aggregation.

##### 15. User study

ColabSaprot-v1 was evaluated on eight protein prediction tasks with **12 participants** from biology backgrounds **without coding or ML project experience**. Tasks covered supervised fine-tuning, zero-shot mutational effect prediction, and protein inverse folding.

For comparison, an **AI expert** (a third-year PhD student specializing in ML) performed the same tasks using the Saprot codebase on GitHub.

Twelve participants were assigned tasks (e.g., 10 split into two groups of five for six supervised fine-tuning tasks). Supervised fine-tuning used five public datasets and a proprietary eYFP fitness dataset. To reduce training time, training sets were randomly subsampled to 1,000 examples.

On the eYFP task, biology participants used pretrained models on SaprotHub for **continual learning**, whereas the AI expert used base Saprot 650M.

##### 16. Experimental validation on xylanase

Validation proceeded as follows:

1. Obtain structure of Mth protein (XP_069217686.1) with **AlphaFold3**.
2. Derive SA sequence with Foldseek or ColabSaprot.
3. Run **zero-shot (single-site) mutational effect prediction** on the full SA sequence with ColabSaprot (650M).
4. Select top 20 variants (excluding A15G and I13P in the signal peptide).
5. **Construct mutants**: gene synthesis, site-directed mutagenesis, transformation, and screening in *P. pastoris*.
6. **Enzyme activity assay**: induce xylanase in BMMY medium with fed-batch fermentation; measure activity via the 3,5-dinitrosalicylic acid (DNS) method; assess optimal temperature and thermostability.

##### 17. Experimental validation on GFP variants

This task aimed to design brighter avGFP variants as part of the 2024 Critical Assessment of Protein Engineering (CAPE) competition.

1. **Data preparation**: CAPE organizers provided 140,000 GFP variants with fitness scores and four wild-type GFP structures. OPMC members generated 3Di tokens with Foldseek and converted them to SA tokens.
2. **Model fine-tuning**: **Full-parameter fine-tuning** of **Saprot (35M)**.
3. **Variant prediction and validation**: A library of 5 million avGFP double mutants was generated by random mutagenesis; the fine-tuned Saprot model predicted fitness. Top nine variants were selected for experimental validation.
4. **Experimental validation**: Performed at a robotic biofoundry in Shenzhen synthetic biology infrastructure: expression in *E. coli* BL21(DE3), IPTG induction, measurement of `$OD_{600}$` and GFP fluorescence (excitation 488 nm, emission 520 nm).

##### 18. Experimental validation of TDG variants

The X.C. lab used **ColabSaprot v1 (650M)** for **zero-shot single-site mutational effect prediction** on TDG, inputting AA sequence only (all structure tokens masked). Top 20 variants were experimentally validated. Variants were cloned into PCMV plasmids fused to SpCas9(D10A) (as TSBE2). Validation followed prior protocols.

<hr align="left" color="#987cb9" size="1">
