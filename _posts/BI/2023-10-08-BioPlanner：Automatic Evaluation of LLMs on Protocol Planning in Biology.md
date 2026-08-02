---
layout: post
title: EMNLP-2023 BioPlanner：Automatic Evaluation of LLMs on Protocol Planning in Biology
categories: [BI]
tags: [Agent, LLM]
proceedings: EMNLP
date: 2023-10-08
lang: en
alt_url: /zh/notes/bi/BioPlanner：Automatic-Evaluation-of-LLMs-on-Protocol-Planning-in-Biology/
permalink: /notes/bi/BioPlanner：Automatic-Evaluation-of-LLMs-on-Protocol-Planning-in-Biology/
---

> Paper: [BioPlanner：Automatic Evaluation of LLMs on Protocol Planning in Biology](https://openreview.net/forum?id=pMCRGmB7Rv)
>
> Code: <https://github.com/bioplanner/bioplanner>

## BioPlanner: AI-Generated Biological Experiment Protocols and Pseudocode

### Abstract

Automatically generating precise scientific experimental protocols is a critical step toward scientific automation. However, although large language models (LLMs) excel on many tasks, they struggle with the **multi-step reasoning and long-horizon planning** required to design scientific experiments. Moreover, evaluating the accuracy of generated protocols is inherently difficult: correct descriptions can take many forms, assessment demands expert knowledge, and protocols often cannot be executed automatically for verification.

To address these issues, the authors propose a **framework for automatically evaluating protocol-planning tasks**. They introduce **BIOPROT**, a dataset of biology laboratory protocols together with corresponding pseudocode representations. The approach uses one LLM to translate natural-language protocols into pseudocode, then evaluates another LLM’s ability to reconstruct that pseudocode given only a high-level description and a list of available pseudocode functions.

The paper evaluates **GPT-3** and **GPT-4** on this task and analyzes their robustness. To demonstrate the utility of the pseudocode representation, they retrieve existing pseudocode to generate accurate new protocols and **successfully execute one model-generated protocol** in a real biology laboratory.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Traditional biological research is **time-consuming, labor-intensive, and highly prone to human error**. Robotic laboratory automation can improve accuracy, reproducibility, and scalability, enabling more scientific breakthroughs and faster translation from research to application.

An important step toward automated biological research is **automatic generation of laboratory protocols**—precise step-by-step instructions for carrying out an experiment to achieve a specific goal—which can later be converted into robot code. The authors note that LLMs encode substantial latent scientific knowledge and may therefore be able to produce accurate scientific protocols, as has been shown in chemistry. Yet, apart from **manual evaluation**, no clear method exists for assessing the accuracy of machine-generated scientific protocols. Without mature evaluation metrics, progress in scientific automation remains challenging.

They argue that evaluating laboratory protocols is difficult for two main reasons.

- **First, protocols are highly sensitive to small details**; minor changes in instructions can lead to very different outcomes. When comparing generated protocols to reference answers, metrics based on n-gram overlap (e.g., BLEU) or contextual embeddings (e.g., BERTScore) may fail to capture subtle but critical differences such as **the order of operations or relationships between substances**.
- **Second, the same protocol can be described correctly at different levels of granularity**. For example, the same technique (e.g., sequencing library preparation) may be summarized in a single sentence or elaborated over multiple paragraphs. This variability in granularity makes it hard to evaluate the accuracy of LLM-generated protocols.

The study therefore proposes an **automated method to evaluate language models’ ability to write biology protocols**. Inspired by robotic planning, the approach gives a controller agent a closed set of permitted actions. Using GPT-4, the model first automatically generates a set of protocol-specific pseudofunctions, then converts the written protocol into pseudocode (see Figure 1).

Here, a “**teacher**” model produces the allowed action set and the correct step-by-step pseudocode answer. With access to this privileged information, the authors can evaluate a “**student**” model that must solve the task from scratch. In this way, they measure how well language models generate protocols when given only appropriate pseudocode functions and a brief protocol description.

In practice, this approach automatically reframes scientific protocol writing as a series of **multiple-choice questions** (selecting a pseudofunction from a given set)—a form of evaluation that is **far more robust** than assessing free-form natural language generation. This paradigm enables rapid measurement of GPT-3.5 and GPT-4’s protocol knowledge with minimal human intervention and can serve as a general method for evaluating and improving models’ long-horizon planning on open-ended tasks in the future.

To support this, they introduce **BIOPROT**, a new dataset of publicly available biology laboratory protocols with corresponding protocol-specific pseudocode. The dataset was reviewed by domain experts and supports evaluation on diverse tasks such as next-step prediction or full protocol generation. The authors further demonstrate its utility by automatically designing and successfully executing a laboratory experiment using GPT-4 and the action space defined in BIOPROT.

In summary, the contributions are:

- Proposing to evaluate protocol generation on **pseudocode** rather than free-text instructions.
- Introducing the **BIOPROT dataset**, a human-reviewed collection of open-access biology protocols.
- Evaluating **GPT-4**’s ability to accurately convert natural-language protocols into pseudocode.
- Defining a set of **tasks and metrics** for protocol-generation evaluation.
- Evaluating several LLMs on these tasks, providing **objective measures** of their ability to generate biological experiments.
- **Automatically generating a biology experiment and successfully executing it in the laboratory**.

### 3 The BIOPROT dataset

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/fig2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab1.png" alt="avatar" style="zoom:60%;" /></div>

#### 3.1 A Dataset of Protocols for Biology

The authors collected public experimental protocols from **Protocols.io**, a platform for developing and sharing reproducible methods. The database contains more than 9,000 public protocols spanning diverse scientific domains and complexity levels. Each protocol includes (i) a title, (ii) a description, and (iii) step-by-step instructions. To obtain a set of biology-relevant, reproducible, and sufficiently challenging protocols, they applied both automatic and manual filtering. The final dataset contains **100 protocols**, averaging 12.5 steps per protocol.

#### 3.2 Translating Protocols to Pseudocode

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab2.png" alt="avatar" style="zoom:70%;" /></div>

Because evaluating planning problems in natural language is very difficult, prior work often relied on human evaluation. To address this, the authors use **GPT-4** to “translate” free-text protocols into pseudocode.

GPT-4 is assigned two tasks:

1. **Define a set of pseudofunctions sufficient to execute the protocol**
2. **Convert protocol steps into pseudocode using only those pseudofunctions**.

They use a one-shot example prompt and an **automatic feedback loop**. The loop provides error signals when, for example: the generated code is not valid Python pseudocode, pseudofunctions are undefined, functions or pseudocode lack parameters, or numeric parameters in the pseudocode lack units. Finally, GPT-4 is prompted to check its own pseudofunctions and pseudocode for possible errors or omissions.

#### 3.3 Manual Verification

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab3.png" alt="avatar" style="zoom:60%;" /></div>

The generated pseudofunctions and pseudocode underwent **manual review for accuracy**. A competent laboratory scientist evaluated the original natural-language protocol and the generated pseudocode line by line. The scientist confirmed:

1. Whether the original natural-language protocol is reasonable
2. Whether the title and description are sufficient for a competent scientist to attempt the protocol without detailed steps
3. Whether the pseudocode is accurate

Based on the review, the authors edited the generated pseudocode as needed. Across 100 protocols, **59 generated protocols were fully accurate without any edits**. Many protocols requiring edits involved only minor changes. The most common error was **missing units on numbers**. More serious errors typically involved:

1. Missing key details required to complete a step successfully
2. Failure to explain the composition of a reagent used in the protocol (e.g., a buffer)

These corrected protocols constitute the **BIOPROT** dataset. The authors argue that even without manual editing, LLMs with an error-checking loop can create a largely accurate pseudocode dataset of biology protocols, enabling self-evaluation.

#### 3.4 Machine-generated Descriptions

For some downstream tasks, high-quality protocol descriptions are essential because they indicate what the protocol steps should contain. However, original descriptions on Protocols.io do not always meet this bar. The authors therefore use GPT-4 to **generate new protocol descriptions that provide high-level overviews** based on detailed protocol steps. The dataset ultimately includes both these machine-generated descriptions and the original descriptions.

### 4 Metrics and evaluation

##### Next Step Prediction

In this task, given a protocol’s title, description, a set of allowed pseudofunctions, and partially completed pseudocode, the model must correctly identify the pseudofunction corresponding to the next protocol step. Evaluation considers both the predicted **function** and **function parameters**.

- **Function-level accuracy**: The authors report the percentage of correct function assignments, i.e., **accuracy**.

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/frm1.png" alt="avatar" style="zoom:50%;" /></div>

- **Parameter-level accuracy**:

  - First, **precision** and **recall** are computed for the correctness of parameter **names**.

  - For parameters with correct names, **BLEU** is used to assess the accuracy of parameter **values**.

  - The authors also introduce **SciBERTScore**, which encodes predicted and gold parameter values with a SciBERT sentence encoder and computes their average cosine similarity. Inspired by BERTScore, this metric uses a SciBERT encoder better suited to scientific text.

  - Parameter-level metrics are **computed only when the function is predicted correctly**, to avoid double-penalizing model errors.

    <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/frm2.png" alt="avatar" style="zoom:50%;" /></div>

##### Protocol Generation

In this task, given a protocol’s title, description, and allowed pseudofunctions, the model must generate the corresponding **full pseudocode**. This is harder than next-step prediction because it requires planning the entire protocol execution. Evaluation again targets predicted functions and their parameters.

- **Function-level evaluation**: Two aspects are measured: **(i) whether the correct functions are invoked**, and **(ii) whether they are used in the correct order**.
  - For the former, the authors report **precision** and **recall** of function calls (including repeated calls to the same function).
  - For the latter, they use **Levenshtein distance (Ld)** between the predicted and gold function sequences. Levenshtein distance is an edit distance counting insertions, deletions, or substitutions needed to transform one sequence into another; each function call is treated as a symbol. They report **normalized Levenshtein distance (Ldn)**.
- **Parameter-level evaluation**: The same metrics as in next-step prediction.

##### Function Retrieval

This approach can potentially assemble new protocols by combining steps from existing protocols in the dataset, provided the model can identify which steps a given protocol requires. In this task, given a protocol’s title and description and a large pool of pseudofunctions, the model must identify the subset of functions needed to execute the protocol.

- **Task setup**: The pseudofunction set shown to the model includes not only the gold functions for the current protocol but also distractors from **(i) random protocols** or **(ii) nearest-neighbor protocols**. Distractors from nearest neighbors make the task harder because their functions may be more similar to the correct ones.
- **Evaluation metrics**: **Precision** and **recall** measure retrieval performance.

### 5 Experiments

#### 5.1 Implementation details

The authors primarily evaluate **GPT-3.5** and **GPT-4** from the OpenAI API. For nearest-neighbor protocol retrieval, they use embeddings of all protocol descriptions from the `text-embedding-ada-002` model.

They evaluate models on the tasks in Section 4 under several settings:

- **Shuffled**: Pseudofunctions may be provided in the order they were generated in the original protocol or in randomly shuffled order. The original order often aligns with their order of appearance in the protocol, which can cue the model. Shuffling input functions increases task difficulty.
- **Feedback**: The model may access an error loop that detects undefined functions and Python syntax errors. Prior work has found such feedback loops helpful for planning and reasoning tasks.

#### 5.2 Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab5.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab6.png" alt="avatar" style="zoom:50%;" /></div>

- **Next-step prediction**: Results (Table 4) show that **GPT-4 consistently outperforms GPT-3.5** at predicting the correct next step, while GPT-3.5 performs better on function parameters. Performance drops when input functions are shuffled, likely because unshuffled order acts as a hint.
- **Protocol generation**: On full protocol generation (Table 5), the largest gap appears in **Levenshtein distance**, where GPT-4 clearly beats GPT-3.5. Although both models select correct functions similarly (comparable precision and recall), **GPT-4 orders functions better**. Shuffling input functions again consistently hurts performance.
- **Function retrieval**: Results (Table 6) show GPT-4 outperforming GPT-3.5. Overall performance on this task is **relatively poor**. One possible reason is ambiguity in the gold answer. For example, `Mix` and `MixSubstance` are semantically equivalent but syntactically different; choosing a function from a non-query protocol is counted wrong. This also explains why distractors from nearest-neighbor protocols hurt more than those from random protocols.

#### 5.3 Using GPT-4 as an evaluator

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/tab8.png" alt="avatar" style="zoom:60%;" /></div>

The authors experiment with GPT-4 as an evaluator. They provide GPT-4 with the protocol description, allowed pseudofunctions, gold pseudocode, and model-predicted pseudocode, and ask which pseudocode better matches the description. Results (Table 8) show that **GPT-4 identifies the gold protocol only slightly above chance**. It is unclear whether this is because machine-generated protocols are already largely correct or because GPT-4 cannot distinguish correct from incorrect protocols. Note that prior work has found GPT evaluators tend to prefer longer, more fluent text rather than more correct text.

#### 5.4 Using GPT-4-Generated Descriptions

The authors observe that some original protocol descriptions lack sufficient detail to support protocol reconstruction. They therefore use GPT-4 to generate brief pseudo-descriptions from natural-language protocol steps. Using GPT-4-generated descriptions yields **modest gains** on next-step prediction and full protocol generation.

#### 5.5 Real-World Validation

To verify that BIOPROT can support generation of accurate new protocols, the authors design an end-to-end protocol creation pipeline. They build a Toolformer-like LLM agent using GPT-4 with chain-of-thought (CoT) reasoning and access to a tool for searching protocols in the BIOPROT database. The agent is prompted to retrieve relevant protocols for a new target, extract pseudofunctions from retrieved protocols, and generate a new protocol using only those functions. With this setup they create two experiments: (1) overnight culture of *E. coli* colonies and preparation of glycerol stocks; (2) culture of symbiotic algae (*Symbiodinium*), DNA extraction, and agarose gel electrophoresis.

#### 5.6 Real-World Validation Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BioPlanner/fig3.png" alt="avatar" style="zoom:60%;" /></div>

The model successfully generated two new protocols using pseudofunctions from the database. A scientist reviewed both and judged them **accurate and sufficient for a qualified laboratory scientist to follow**.

The authors executed the first *E. coli* protocol in the laboratory. They followed the model’s instructions and parameter values exactly, and **the experiment succeeded**. After storage at −80°C, cells remained viable, as confirmed by successful subsequent culture on nutrient agar (Figure 3). This indicates that **the LLM-generated protocol was correct**.

<hr align="left" color="#987cb9" size="1">
