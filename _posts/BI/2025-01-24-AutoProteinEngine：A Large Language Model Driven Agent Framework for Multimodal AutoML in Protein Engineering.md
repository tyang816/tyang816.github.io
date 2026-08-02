---
layout: post
title: COLING-2025 AutoProteinEngine：A Large Language Model Driven Agent Framework for Multimodal AutoML in Protein Engineering
categories: [BI]
tags: [protein, Agent]
proceedings: COLING
date: 2025-01-24
lang: en
alt_url: /zh/notes/bi/AutoProteinEngine：A-Large-Language-Model-Driven-Agent-Framework-for-Multimodal-AutoML-in-Protein-Engineering/
permalink: /notes/bi/AutoProteinEngine：A-Large-Language-Model-Driven-Agent-Framework-for-Multimodal-AutoML-in-Protein-Engineering/
---

> Paper: [AutoProteinEngine：A Large Language Model Driven Agent Framework for Multimodal AutoML in Protein Engineering](https://aclanthology.org/2025.coling-industry.36/)
>
> Code: <https://github.com/tsynbio/AutoPE>

## AutoPE: An Agent for Automatically Training PLM Models

### Abstract

Protein engineering is essential for biomedical applications, but traditional approaches are often inefficient and resource-intensive. Although deep learning (DL) models show great promise, training or applying them remains challenging for biologists without specialized computational expertise. To address this gap, the authors propose **AutoProteinEngine (AutoPE)**, a **large language model (LLM)–driven agent framework** designed for multimodal automated machine learning (AutoML) in protein engineering. A key innovation of AutoPE is that it lets biologists without a deep learning background interact with DL models through natural language, substantially lowering the technical barrier for protein engineering tasks.

The framework uniquely combines LLMs with AutoML to:

- **Handle both protein sequence and graph modalities** and perform model selection.
- **Automate hyperparameter optimization**.
- **Automatically retrieve data** from protein databases.

Evaluated on two real-world protein engineering tasks, AutoPE achieves substantial gains over conventional **zero-shot** and **manual fine-tuning** baselines. Overall, AutoPE bridges deep learning and biologists’ domain knowledge, enabling researchers to leverage DL effectively without extensive programming skills.

### 1 Introduction

Protein engineering focuses on designing and optimizing proteins with specific functions and plays a critical role in biomedical areas such as **drug discovery, enzyme optimization, and biomaterials design**. However, classical methods—including directed evolution and rational design—often suffer from **low efficiency, limited success rates, and high resource demands**.

Deep learning models exemplified by the **ESM** and **AlphaFold** families have greatly improved efficiency and accuracy on tasks such as protein structure prediction. Yet for biologists who lack professional programming and machine learning expertise, **training or fine-tuning these complex DL models is a major hurdle**. Concrete difficulties include:

- **Complex model architectures**: Effective modification and interpretation require a solid understanding of DL principles.
- **Difficult hyperparameter optimization**: Tuning hyperparameters for best performance depends heavily on ML experience and intuition.
- **Specialized data preprocessing**: Feeding protein data into models typically requires dedicated preprocessing pipelines.
- **Multimodal data**: Protein data can appear as **sequences** and **graphs**, which further complicates training and optimization.

Although **automated machine learning (AutoML)** aims to reduce the human effort needed to train DL models, **existing AutoML frameworks still expect users to have substantial deep learning and programming knowledge**, limiting adoption among biologists without computational backgrounds. Moreover, general-purpose frameworks often **lack domain knowledge specific to protein engineering** and struggle to handle protein sequence and graph data effectively.

To meet these challenges, the authors propose an **LLM-based agent framework** tailored to multimodal AutoML for protein engineering. Leveraging the **conversational interaction** capabilities of LLMs lowers the learning curve and aims to bridge DL models and biologists’ domain expertise, making protein engineering workflows more efficient and accessible.

### 2 Methods

#### 2.1 LLM-driven AutoML

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AutoPE/fig1.png" alt="avatar" style="zoom:100%;" /></div>

This is the core of the AutoPE framework: an AutoML module driven by a large language model (LLM) that automates tasks in protein engineering.

- **Interaction**: Users (e.g., biologists) need not have deep computational expertise; they **describe protein engineering tasks in natural language**, such as “I need to train a model to predict mutations for a given protein sequence.”
- **Task validation**: The LLM first assesses whether the user’s request falls within AutoPE’s scope (e.g., protein stability prediction, protein–protein interaction prediction). If the description is unclear or out of scope, the system **clarifies or refines the request through dialogue**.
- **Task planning**: Once validated, the LLM **devises an action plan** covering data preprocessing, model selection, configuration, and related steps. It uses **retrieval-augmented generation (RAG)** to pull information from relevant literature so the plan incorporates protein-engineering domain knowledge.
- **Data preprocessing**: If user-provided data are incomplete, a **data retrieval module** is activated to supplement records from online databases such as PDB (Protein Data Bank) and UniProt. The LLM automatically constructs database queries suited to the task.
- **Model selection and configuration**: Following the plan, AutoPE selects and configures models from a predefined library (e.g., ESM family, AlphaFold). For multimodal inputs in **sequence** and **graph** form, AutoPE uses a **late fusion scheme** to combine embeddings from different modalities and exploit complementary information.
- **Model training**: The LLM optimizes a general training pipeline while incorporating model-specific details. This includes choosing loss functions, setting batch size and learning rate according to model and dataset scale, and applying **early stopping** and **model checkpointing** to mitigate overfitting. The LLM also applies task-relevant data augmentation, such as random mutations on sequence data.

#### 2.2 Auto Hyperparameter Optimization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AutoPE/fig2.png" alt="avatar" style="zoom:100%;" /></div>

To further improve performance and usability, AutoPE includes an automatic hyperparameter optimization (HPO) module.

- **Core algorithms**: The module combines two stages:
  1. **Tree-structured Parzen Estimator (TPE)**: TPE models the probability of configurations that yield good performance, efficiently exploring the hyperparameter space and focusing on regions likely to improve results.
  2. **Asynchronous Successive Halving Algorithm (ASHA)**: ASHA acts as a scheduler that **terminates underperforming trials early** and **reallocates compute** to more promising configurations.
- **Interaction and interpretability**: Before HPO starts, AutoPE interacts with the user to confirm hyperparameter settings, allowing researchers to inject domain knowledge. During optimization, the system provides **natural-language feedback**, translating numeric metrics such as MSE or F1-score into easy-to-read summaries and improving interpretability. Users can also allocate compute via natural-language instructions, e.g., specifying the number of GPUs per trial.

#### 2.3 Auto Data Retrieval

This module streamlines acquisition of data required for protein engineering tasks.

- **Natural-language queries**: Users can state data needs in natural language, e.g., “**I need sequence and structure data for human insulin**.”
- **Query generation**: The LLM parses the request, identifies key elements (protein name: insulin; species: human; data types: sequence and structure), and **automatically builds structured queries** for UniProt and PDB. For example, a PDB query might be `molecule: {insulin} AND organism: {Homo sapiens}`.
- **Interactive feedback and flexibility**: If an initial search returns no hits, the LLM guides **interactive dialogue**, suggesting alternatives such as related structures from other mammals. The system also offers an **editable table interface** for manual entry or verification of retrieved data, which is useful for integrating private or unpublished records.
- **Result summarization**: After data collection, the LLM produces a detailed **summary** covering sources of retrieved sequences, PDB IDs and resolutions of relevant structures, key UniProt annotations, and any gaps or potential issues in the data.

### 3 Experiments

#### 3.1 Dataset

To evaluate AutoPE, the authors chose two proteins for a classification task and a regression task, respectively.

- **Classification (Brazzein protein)**:
  - **Source**: Brazzein is a high-intensity sweet protein.
  - **Composition**: 435 Brazzein mutant entries with single- and multi-point mutations and corresponding relative sweetness measurements.
  - **Labeling**: Mutants were labeled **sweet** or **not sweet** using a relative sweetness threshold of 100 (equivalent to sucrose sweetness).
- **Regression (STM1221 protein)**:
  - **Source**: STM1221 is a wild-type enzyme that specifically removes acetyl groups from target proteins.
  - **Composition**: 234 enzyme activity scores under diverse mutations, measured by wet-lab experiments; continuous labels for predicting activity across mutations.
- **Split**: Each dataset was randomly split into **80% training** and **20% test**, with five-fold cross-validation.

#### 3.2 Experiment Design and Implementation

Experiments compare AutoPE against **zero-shot inference** and **manual fine-tuning**.

- **Zero-shot inference**:
  - Uses a pretrained protein language model (ESM) to extract features **without task-specific fine-tuning**.
  - Serves as a baseline for assessing AutoPE’s generalization.
  - After feature extraction, traditional ML algorithms such as logistic regression and k-nearest neighbors (KNN) predict functional scores.
- **Manual fine-tuning**:
  - Improves task performance by manually fine-tuning a pretrained protein language model.
  - Custom changes include **adding a self-attention layer** to capture medium- and long-range dependencies in protein sequences and better recognize complex mutations.
  - Hyperparameter search was performed manually by an **ML engineer with three years of experience in deep learning and protein engineering**.
- **Evaluation metrics**:
  - **Classification**: **F1-score** (balances precision and recall), **ROC-AUC** (overall discriminative ability), and **SRCC** (rank preservation).
  - **Regression**: **MSE** (mean squared error between predictions and ground truth), **MAE** (mean absolute error, less sensitive to outliers), and **R²** (explained variance).
- **Implementation details**:
  - The LLM used in AutoPE is **TourSynbio-7B**.
  - All experiments ran on **eight NVIDIA 4090 GPUs**.

#### 3.3 Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AutoPE/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AutoPE/tab2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AutoPE/fig3.png" alt="avatar" style="zoom:50%;" /></div>

**Classification results (Table 1 and Figure 3)**:

- **AutoPE performs strongly**, achieving excellent results across metrics; its ROC curve lies closest to the upper-left corner.
- Ablation studies confirm the **effectiveness of the auto-HPO module**. AutoPE with HPO achieves the highest F1-score (0.7306) and SRCC (0.4621).
- Compared with manual fine-tuning, manual tuning attains the highest accuracy but a lower F1-score, suggesting **possible overfitting**. AutoPE with HPO achieves the **best trade-off** between high accuracy (0.8908) and top F1-score and SRCC, indicating stronger robustness and generalization.

**Regression results (Table 2)**:

- AutoPE again excels on all metrics.
- AutoPE with HPO achieves the **lowest RMSE (0.3488) and MAE (0.1999)** and the **highest R² (0.6805)**, indicating the strongest explanation of variance in the target.
- Although manual fine-tuning is competitive on RMSE, AutoPE with HPO **consistently outperforms it on every metric**.

<hr align="left" color="#987cb9" size="1">
