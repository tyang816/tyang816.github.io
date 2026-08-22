---
layout: post
title: ICLR-2025 ToolACE：Winning the Points of LLM Function Calling
categories: [CL]
tags: [LLM, NLP, Agent]
proceedings: ICLR
date: 2025-01-23
lang: en
alt_url: /zh/notes/cl/ToolACE：Winning-the-Points-of-LLM-Function-Calling/
permalink: /notes/cl/ToolACE：Winning-the-Points-of-LLM-Function-Calling/
redirect_from:
  - "/cl/ToolACE：Winning-the-Points-of-LLM-Function-Calling/"
  - "/CL/ToolACE：Winning-the-Points-of-LLM-Function-Calling/"
---

> Paper: [ToolACE：Winning the Points of LLM Function Calling](https://openreview.net/forum?id=8EB8k6DdCU)
>
> Code: <https://huggingface.co/Team-ACE>

## ToolACE: A Tool Dataset Tailored for LLMs

### Abstract

Function calling greatly expands the application scope of large language models (LLMs), and high-quality, diverse training data is essential for unlocking this capability. However, collecting and annotating real function-calling data is challenging, and existing synthetic pipelines often lack sufficient coverage and accuracy.

To address this, the authors propose **ToolACE**, an automatic agentic pipeline designed to generate **accurate, complex, and diverse** tool-learning data tailored to LLM capabilities.

Core features of ToolACE include:

1. A novel **self-evolution synthesis** process that builds a comprehensive API pool of 26,507 diverse APIs.
2. Dialog generation through interaction among multiple agents, guided by a **complexity evaluator**.
3. A **dual-layer verification system** combining rule-based and model-based checks to ensure data accuracy.

Experiments show that models trained on ToolACE synthetic data achieve state-of-the-art performance with only **8B** parameters, comparable to recent GPT-4 models. The model and part of the data have been released publicly.

### 1 Introduction

Equipping LLMs with external tools has significantly enhanced AI agents’ ability to solve complex real-world tasks. Integrating function calling lets LLMs access up-to-date information, perform precise computations, and use third-party services, unlocking broad potential applications in workflow automation, financial reporting, travel planning, and more.

The paper emphasizes that real-world function calling is often diverse and complex, driven both by the variety of API functionality¹ and the breadth of task scope. APIs are frequently updated to meet diverse user needs, which demands strong **zero-shot generalization**. Moreover, user requests can be complex or ambiguous, leading to scenarios that require **parallel** or **dependent** use of multiple tools, or **multi-turn interactions**. This highlights the importance of managing complex instructions and adapting to varied function-calling settings.

Despite these challenges, current tool-augmented LLMs focus mainly on simple function-calling tasks with limited diversity and complexity. They largely rely on existing public APIs to construct tasks, which constrains zero-shot ability and suits mainly single-turn queries while neglecting harder cases such as dependencies or multi-turn interaction. Furthermore, executing function calls requires precise API selection and parameter configuration, which depends heavily on the quality and accuracy of the underlying data. As data grows more diverse and complex, generating accurate samples with simple pipelines from prior work becomes extremely difficult.

To tackle these issues, the paper presents **ToolACE**, a systematic tool-learning pipeline that automatically synthesizes **accurate, diverse, and complex** function-calling data with **awareness of the target model’s capabilities**.

ToolACE has three core properties:

1. **Evolutionary Diversity**: Exposing LLMs to a wide range of function-calling scenarios improves proficiency and zero-shot tool use. Instead of relying on public APIs, ToolACE introduces **tool self-evolution synthesis (TSS)**. TSS uses a speciation–adaptation–evolution process to generate tools across many domains with varied data types and constraints. The process starts from pretraining data for broad coverage and iteratively expands API-pool diversity through self-evolution and continual updates, enabling more complex data generation.
2. **Self-Guided Complexity**: Instruction-following data should be sufficiently complex to cultivate function-calling skills. LLMs learn more effectively when data complexity slightly exceeds their current ability. ToolACE proposes a **self-guided dialog generation (SDG)** process in which the LLM itself serves as an **evaluator** to modulate complexity. Through multi-agent interaction and a self-guided complication strategy, four types of function-calling data are produced.
3. **Refined Accuracy**: Data accuracy is foundational for effective tool-augmented LLMs. ToolACE employs a **dual-layer verification (DLV)** system that integrates rule-based and model-based checkers to ensure executability and consistency of synthetic data.

ToolACE aims to strengthen LLM function calling and generalization through accurate, complex, and diverse data.

Main **contributions** are summarized as follows:

- A novel automated function-calling data pipeline **ToolACE**, comprising tool self-evolution synthesis, self-guided dialog generation, and dual-layer verification. To the authors’ knowledge, this is the first work to emphasize improving function-calling generalization by synthesizing diverse APIs.
- A **self-guided complication strategy** to generate various types of function-calling dialogs at appropriate complexity. The LLM to be tuned is used as a complexity evaluator to guide the complexity level of generated data. Data quality is ensured by dual-layer verification combining rule and model checkers.
- Experiments on two widely used benchmarks, BFCL and APIBank. An 8B-parameter model trained on ToolACE data substantially outperforms existing open-source LLMs and is comparable to recent GPT-4 models.

### 2 Data Generation Pipeline

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/fig1.png" alt="avatar" style="zoom:80%;" /></div>

#### 2.1 Tool Self-evolution Synthesis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/tab1.png" alt="avatar" style="zoom:80%;" /></div>

API diversity strongly supports diversity in function-calling data. As shown in Table 1, ToolACE builds a comprehensive API pool that exceeds other representative tool-augmented LLMs in both scale and domain coverage, including both real and synthetic APIs.

Beyond collecting real API data, a **tool self-evolution synthesis (TSS)** module synthesizes API definitions with various data types and constraints. The module has three main steps: 1) Speciation, 2) Adaptation, and 3) Evolution.

- **Speciation**:

  - APIs with broad domain coverage let tool-augmented LLMs learn wider use cases from different applications and industries, improving generalization. In the speciation step, a **hierarchical API context tree** is proposed to guide synthesis with plausible API domains and capabilities.

  - LLM **pretraining data** is among the most diverse human corpora available, providing a solid basis for extracting API domains and use cases. Starting from **API-related raw documents** in pretraining data (e.g., technical manuals, API documentation, product specs, user guides, and tutorials), an **agent powered by a frontier LLM** is prompted to extract an API domain and all plausible API capabilities or use cases from each document. Child nodes of the context tree are generated recursively at each step; each node represents a possible API capability (e.g., fetch weather forecast, get stock price, send email).

    fig9

  - Appendix A, Figure 9 shows an example subtree under the entertainment domain.

- **Adaptation**:

  - In adaptation, each API is assigned a domain and diversity level. **A subtree is sampled from the API context tree for each distinct API to obtain unique functionality, so different APIs have different capabilities.** For example, some APIs may cover more nodes and thus have more domain-specific, detailed abilities; others may contain only a single node and focus on a simple, direct purpose.

- **Evolution**:

  - Evolution continuously refines and adjusts APIs based on prior results and new requirements. An LLM is instructed to synthesize new APIs from a sampled API context subtree and an API example. New API definitions are required to be clear and exhaustive.
  - A set of diversity indicators is applied—for example, adding new capabilities or parameters, including extra constraints, mutating parameter types, and updating return schemas—to diversify generated APIs.
  - An API example buffer holding various API examples is maintained. An example is iteratively sampled from the buffer, adapted to the current capability subtree, and used to generate the next generation of APIs.

The TSS module enables efficient generation of diverse API documentation, including nested types such as lists of lists or lists of dictionaries.

#### 2.2 Self-Guided Dialog Generation

The effectiveness of function-calling data is closely tied to LLM capability. Different LLMs acquire different knowledge and skills during pretraining, so the function-calling data they need should differ as well. For instance, a 0.5B LLM may struggle with extremely complex data with long dependencies, whereas a well-trained 70B LLM can easily handle direct queries with clear intent and simple APIs. In both cases the data is **unproductive** for the given LLM, underscoring the need to tailor data generation to model capability.

To ensure generated dialogs fill gaps in a given LLM’s abilities, a **self-guided dialog generation (SDG)** module synthesizes function-calling conversations, as shown in the middle of Figure 1. SDG consists of a **complexity evaluator** and a **multi-agent generator**. Various function-calling dialog types are produced through multi-agent interaction. **The LLM to be tuned** serves as the evaluator to assess the complexity of generated data. Under the evaluator’s guidance, data deemed too easy or too hard is adjusted dynamically.

##### 2.2.1 Multi-Agent Dialog Generation

A multi-agent framework generates four types of function-calling dialogs: **single function calls**, **parallel function calls**, **dependent function calls**, and **non-tool-use dialogs**.

The data generator includes three agents—**user**, **assistant**, and **tool**—each simulated by an LLM. One or more candidate APIs are sampled from the constructed API pool and presented to the agents. Dialogs are generated via role-play among the three agents, each given role assignments and detailed task descriptions to continue the conversation.

- **User Agent**: Mainly proposes requests or provides additional information to the assistant, and adjusts dialog complexity through a **self-guided complication** process.
- **Assistant Agent**: Uses the given APIs to address user queries. Its action space includes calling APIs, requesting more information, summarizing tool feedback, and answering without tools. For data quality, each assistant action is generated multiple times; only responses with consistent decisions across instances are kept. A structured reasoning process designed for function calling is also applied to strengthen tool-call decisions.
- **Tool Agent**: Acts as the API executor, taking tool descriptions and input parameters from the assistant and outputting simulated execution results.

For each function-calling dialog, the user agent first issues a request related to the given API(s). The assistant reviews the request and decides whether to call an API or ask for more information. If a tool call is needed, the tool agent returns simulated results, and the assistant summarizes them for the user. Generation continues as the user agent queries again or responds to the assistant until the target dialog length is reached.

##### 2.2.2 Data Complexity Evaluation

Different LLMs exhibit different knowledge and capabilities, requiring different data to optimize tool-use performance. However, much prior work ignores the link between model ability and training data, leading to poor data efficiency.

In this work, **the LLM to be tuned** (denoted `$M$`) **is used as the evaluator**. The **loss** of `$M$` on a data sample `$(x, y)$` measures complexity, denoted `$H_{\mathcal{M}}(x,y)$`. Complexity is defined as:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/frm1.png" alt="avatar" style="zoom:80%;" /></div>

where `$x$` is the input query and `$y=[t_{1},...,t_{n_{y}}]$` is the response with `$n_{y}$` tokens. `$t_{i}$` is the *i*-th token and `$p$` is the predicted next-token probability. **Higher loss means model `$M$` finds the sample `$(x,y)$` harder to learn.**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/fig2.png" alt="avatar" style="zoom:80%;" /></div>

Results (Figure 2) show that sample loss tends to **correlate positively** with: (1) the number of **candidate APIs**, (2) the number of **APIs actually used**, and (3) **dissimilarity between the user query and API descriptions**. Intuitively, more candidate APIs make correct API selection harder; using more APIs reflects higher query complexity; larger mismatch between query and API descriptions requires more complex reasoning to identify the right function. These findings support using loss as a complexity metric for function calling.

To establish a suitable complexity range for a given LLM, a small prior dataset spanning different complexity levels is created.

- **Lower bound**: If `$M$` can generate a sample correctly, the model already masters the corresponding tool-use case, so the sample is unnecessary for further fine-tuning. Its associated loss serves as a reference **lower bound** on complexity.
- **Upper bound**: Conversely, if loss remains high after fine-tuning, the sample may be too hard for the model to learn; that loss serves as a reference **upper bound**.

The evaluator passes this suitable complexity range, together with the loss of a given sample, to the multi-agent generator as guidance for training data generation.

##### 2.2.3 Self-Guided Complication

After obtaining the current sample’s complexity from the evaluator, the user agent’s instructions are adjusted dynamically.

- If a sample is **too easy** for the LLM, the user agent is instructed to produce a **more complex** query—for example requiring more APIs or diverging further from API descriptions.
- If a sample **exceeds the LLM’s ability**, the user agent is prompted to produce a **simpler** query.

Thus the generation process is continually adjusted to better match the model’s performance level.

#### 2.3 Dual-Layer Data Verification

A key factor in LLM function-calling ability is the **accuracy** and **reliability** of training data. Inconsistent or inaccurate data hinders the model’s ability to interpret and execute functions. Unlike general QA data, whose correctness can be hard to verify, **function-calling data is more verifiable** because a successful call must strictly match the format specified in the API definition.

Based on this insight, an automated **dual-layer verification system (DLV)** verifies synthetic data, as shown on the right of Figure 1. The system comprises a **rule verification layer** and a **model verification layer**, with all outcomes overseen by human experts.

**Rule Verification Layer** The rule layer deploys a **rule checker** that enforces predefined API syntax and structure via curated rules (listed in Appendix B). It covers four aspects: **API definition clarity**, **function-calling executability**, **dialog correctness**, and **data sample consistency**.

For example, to verify executability of function calls, the following steps are applied:

1. Confirm the API name matches a name in the given tool list.
2. Verify all required parameters are provided correctly.
3. Use regular expressions to ensure parameter formats and patterns follow the API documentation.

These steps allow verification of correctness and executability **without actual execution**, improving efficiency and reducing deployment overhead.

**Model Verification Layer** The model layer further uses LLMs to filter errors that rule checkers miss, focusing on **content quality**.

However, feeding an entire sample to an LLM for correctness judgment proved too complex and often yielded poor results. The model verification task is therefore decomposed into several **sub-queries** covering three key aspects:

- **Hallucination Detection**: Identify whether input parameter values in function calls are **fabricated**—not mentioned in the user query or system prompt.
- **Consistency Validation**: Check that responses effectively complete the user’s task and that dialog content respects constraints and instructions in the user query and system prompt.
- **Tool Response Check**: Ensure simulated tool responses are consistent with API definitions.

Each aspect is evaluated by a separate LLM-driven expert agent. Additional verification prompts remove duplicate responses and meaningless tokens from the data.

### 3 Experiment

#### 3.1 Experiment Setup

To validate the method, the authors conduct extensive experiments by training LLMs on the generated data.

- **Base models and training**: In most experiments, the open-source LLM LLaMA3.1-8B-Instruct is trained with supervised fine-tuning (SFT). This model is called **ToolACE-8B**. The data is also validated with other backbone LLMs (e.g., the Qwen family). Due to limited resources, parameter-efficient LoRA training is used.
- **Hyperparameters**: LoRA uses a common configuration with rank 16 and alpha 32 for all modules.
- **Compared models**: ToolACE-8B is compared against state-of-the-art API-based models (e.g., GPT series) and open-source models including fine-tuned function-calling models such as Gorilla-OpenFunctions-v2 and the xLAM series.
- **Benchmarks**: Experiments run on two representative benchmarks: **BFCL** (Yan et al. 2024) and **API-Bank** (Li et al. 2023)—comprehensive, executable function-calling evaluations for LLMs.
- **Ablation studies**: Further ablations assess the impact of data **accuracy**, **diversity**, and **complexity**.

Additional setup details (benchmarks, metrics, training) are in Appendix C.

#### 3.2 Overall Performance Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/tab2-tab3.png" alt="avatar" style="zoom:100%;" /></div>

ToolACE-8B’s function-calling ability is compared with various representative models. Results are summarized in Tables 2 and 3.

- **BFCL**:
  - On BFCL, API-based models (e.g., Claude and GPT-4 series) show clear advantages over open-source models.
  - Open-source models fine-tuned for function calling (e.g., Functionary and xLAM) are competitive but still trail leading models.
  - **ToolACE-8B** **outperforms most API-based and open-source models** on BFCL AST and Exec categories.
  - ToolACE-8B **excels at mitigating hallucination**, scoring 85.37% on Relevance and 83.81% on Irrelevance, showing strong balance between the two.
  - Compared with similarly sized fine-tuned function-calling model xLAM-7b-fc-r, ToolACE-8B **consistently and significantly outperforms** it across all categories.
- **API-Bank**:
  - ToolACE-8B maintains a **substantial edge over all open-source models** on API-Bank and performs **on par with GPT-4** models.

The authors attribute ToolACE’s strong results mainly to synthetic data that is **accurate, diverse, and complex**, strengthening zero-shot function calling.

#### 3.3 Ablation Study

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/fig3-fig4-fig5.png" alt="avatar" style="zoom:80%;" /></div>

##### 3.3.1 Ablation on Accuracy

**Effect of verification**: To assess each layer of the verification system (rule and model checkers), LLaMA3.1-8B-Instruct is trained on three datasets: (1) data without any verification (w.o. dual), (2) data without model checking (w.o. model), (3) data with dual-layer verification (Final).

**Results (Figure 3)**:

- The model trained on "w.o. model" (rule checking only) beats "w.o. dual" (no verification) on executable and overall accuracy, validating **rule checkers**.
- The model trained on "Final" (dual verification) **significantly outperforms** the other two ablations on AST and overall accuracy, highlighting the **necessity of model checkers**.

##### 3.3.2 Ablation on Complexity

**Data sampling**: To study the effect of dataset complexity, complexity is computed and ranked for each sample using Equation (1). The bottom, middle, and top 60,000 instances form three subsets: `$ToolACE_{easy}$`, `$ToolACE_{medium}$`, and `$ToolACE_{hard}$`.

**Effect of complexity (Figure 4)**: LLaMA-3.1-8B-Instruct is trained on these three subsets. **Training on `$ToolACE_{medium}$` shows a slight advantage** over the other two on overall accuracy and tool-use accuracy.

**Conclusion**: This aligns with the hypothesis that **optimal data complexity is critical for LLM training**, because data that is too easy or too hard can prevent models from reaching full performance.

##### 3.3.3 Ablation on Diversity

**Data sampling**: To assess diversity, three subsets are built: `$ToolACE_{low}$`, `$ToolACE_{medium}$`, and `$ToolACE_{high}$`. All APIs are clustered into 30 groups using the API context tree. Three API subsets are formed by selecting APIs from 6, 14, and 30 clusters respectively. About 30,000 instances are randomly sampled from each subset.

**Effect of diversity (Figure 5)**: On BFCL, **higher training diversity correlates positively with overall accuracy**. Gains are especially clear on **irrelevance detection**, suggesting exposure to broader APIs helps the model distinguish subtle differences among APIs and improves irrelevance detection.

#### 3.4 Scaling Performance of Model Size

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/fig6.png" alt="avatar" style="zoom:80%;" /></div>

To study scalability of function-calling ability, experiments use the Qwen-1.5-xB-Chat series (0.5B, 1.8B, 4B, 7B, etc.). Raw models and models fine-tuned on ToolACE are evaluated on BFCL (Figure 6).

**Results**:

- As expected, **larger models** achieve **better function-calling performance** on AST and executable accuracy.
- Smaller raw models (0.5B and 1.8B) show almost no function-calling ability.
- **Fine-tuning on ToolACE substantially improves these models**. Fine-tuned models show **consistent scaling**, highlighting ToolACE’s potential to improve larger LLMs.

#### 3.5 Study on Various Backbone LLMs

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ToolACE/fig7-fig8.png" alt="avatar" style="zoom:80%;" /></div>

To study backbone effects, experiments run on several ~8B models: Qwen1.5-7B-Chat, LLaMA-3-8B-Instruct, and LLaMA-3.1-8B-Instruct. Fine-tuned models are evaluated on BFCL (Figure 7).

**Results**:

- **All models gain substantially after fine-tuning**, demonstrating ToolACE’s effectiveness.
- Raw models differ in function-calling ability due to pretraining corpus differences (e.g., Qwen includes more Chinese dialog data); LLaMA-3.1-8B-Instruct performs best among raw models.
- This **ranking persists after fine-tuning, but gaps narrow**, suggesting ToolACE can enhance function calling for LLMs tuned primarily for other skills such as dialogue.

#### 3.6 Study on General Capabilities

**Goal**: Assess how ToolACE training affects broader LLM capabilities.

**Setup**: Experiments span benchmarks for general ability: MMLU (broad understanding), HumanEval (coding), GSM8K (math), CommonSenseQA (reasoning), and BFCL (function calling).

**Compared models**: Raw LLaMA-3-8B-Instruct, LLaMA-3.1-8B-Instruct, specialized XLAM-7B-fc-r, and GPT-4.

**Results (Figure 8)**:

- ToolACE-8B **substantially outperforms XLAM-7B-fc-r** on most benchmarks, with clear gains on MMLU, GSM8K, and CommonSenseQA.
- Versus GPT-4, ToolACE-8B shows **clear limitations in reasoning and understanding**, largely due to model size and training corpus.
- Compared with raw LLaMA-3.1-8B-Instruct, ToolACE-8B shows **negligible degradation** on some benchmarks while **greatly improving function calling**.

**Conclusion**: ToolACE data **effectively strengthens function calling without harming general LLM capabilities**.

<hr align="left" color="#987cb9" size="1">
