---
layout: post
title: ACEBench：Who Wins the Match Point in Tool Usage
categories: [CL]
tags: [Agent, LLM, NLP]
proceedings: arXiv
date: 2025-09-08
lang: en
alt_url: /zh/cl/ACEBench：Who-Wins-the-Match-Point-in-Tool-Usage/
permalink: /cl/ACEBench：Who-Wins-the-Match-Point-in-Tool-Usage/
---

> Paper: [ACEBench：Who Wins the Match Point in Tool Usage](https://arxiv.org/abs/2501.12851)
>
> Code: <https://github.com/chenchen0103/ACEBench>

## ACEBench: Evaluating LLM Tool Use

### Abstract

Large language models (LLMs) have shown substantial potential in decision-making and reasoning, especially when integrated with diverse tools to solve complex problems. However, existing benchmarks for evaluating LLM tool use suffer from several limitations:

1. **Limited evaluation scenarios**: They often lack assessment in realistic multi-turn conversational contexts.
2. **Narrow evaluation dimensions**: They provide insufficient fine-grained analysis of how LLMs use tools.
3. **Evaluation dependencies**: They rely on LLMs or live API execution for evaluation, which incurs significant overhead.

To address these challenges, the authors introduce **ACEBench**, a comprehensive benchmark for evaluating LLM tool use. ACEBench partitions data into three main types according to the evaluation methodology: **Normal**, **Special**, and **Agent**.

- **Normal** evaluates tool use in basic scenarios.
- **Special** evaluates tool use under ambiguous or incomplete instructions.
- **Agent** evaluates tool use through multi-agent interaction to simulate realistic, multi-turn dialogue.

The authors conduct extensive experiments with ACEBench, analyze a wide range of LLMs in depth, and perform a finer-grained examination of error causes across data types.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/tab1.png" alt="avatar" style="zoom:100%;" /></div>

Large language models (LLMs), such as GPT-4, have achieved strong performance on many natural language processing tasks. Research shows that integrating tools can substantially extend LLM capabilities, particularly in specialized domains such as mathematics, programming, and reasoning. On one hand, tool integration can enhance LLM abilities across multiple domains—for example, ToolTransformer improves LLMs’ ability to solve complex problems by leveraging tools. On the other hand, the tool-use paradigm can improve response robustness and generation transparency, thereby increasing explainability and user trust and improving system adaptability. As the field evolves, comprehensively evaluating all aspects of tool use—especially in complex settings—has become essential.

Although several studies focus on evaluating tool use, existing tool-use benchmarks still have notable drawbacks. **First, current benchmarks lack multi-turn dialogue evaluation in realistic scenarios.** For example, multi-turn dialogues in BFCL and HammerBench are composed from predefined fixed content. **Second, existing tool-use benchmarks lack fine-grained evaluation and personalized data assessment.** **Moreover, many benchmarks neglect evaluation of special cases**, or use overly simplistic evaluation methods. Real-world user instructions are not always perfect, and models’ ability to recognize and handle such issues is also critical for assessment. **Finally, evaluation is costly**, because many studies rely on advanced large models for scoring.

To address these limitations, the authors propose **ACEBench**, a comprehensive tool-use benchmark comprising the following categories:

- **Normal**: Consists of fixed question–answer pairs covering diverse scenarios, including single-turn dialogue, multi-turn dialogue, and personalized data. It also includes evaluation of atomic-level capabilities.
- **Special**: Includes imperfect instructions, such as those with incomplete parameters, incorrectly formatted parameters, or questions unrelated to the capabilities of candidate functions.
- **Agent**: Covers realistic scenarios by abstractly constructing multi-turn, multi-step tool-calling settings. Depending on whether the user participates in the dialogue, cases are divided into multi-turn and multi-step variants.

The authors note that these three data types cover most scenarios of LLM tool use.

The main contributions of the paper are as follows:

- **Comprehensive benchmark evaluation**: A comprehensive benchmark for evaluating LLM tool use that spans diverse scenarios, finer-grained evaluation perspectives, evaluation under imperfect instructions, and more stable evaluation metrics.
- **Sandbox environment and automated evaluation system**: An end-to-end automated evaluation system, plus a sandbox construction scheme for multi-turn, multi-step tool calling abstracted from real-world scenarios.
- **Extensive experimental validation**: Extensive experiments showing that the benchmark enables more comprehensive and discriminative analysis and clearer assessment of LLM tool use.

### 3 ACEBench

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### 3.1 Dataset

The authors built parallel Chinese and English versions of the dataset, ensuring equal distribution of data types across both. The final dataset contains 2,000 annotated instances.

##### 3.1.1 Data Construction

Normal and Special data are generated automatically by LLMs, whereas Agent data is constructed by experts. **Construction of Normal and Special data**: The authors use a fully automated, LLM-based generation pipeline designed for Normal and Special data, as shown in Figure 1(a).

- **(1) API synthesis**: Real APIs from diverse real-world scenarios are used as references during construction to improve realism. To ensure data stability, synthetic APIs are used to build the evaluation dataset, guided by real APIs. A self-evolution approach builds a hierarchical API context tree so that generated APIs cover a broad range of domains and functions. The process first extracts relevant information from technical documentation to guide API generation; as the process proceeds, the context tree expands, ultimately ensuring depth and breadth of the generated APIs.
- **(2) Dialogue construction**: Two dialogue generation pipelines are used. From the constructed API pool, three to six candidate APIs are selected for each evaluation instance. In most cases, APIs are chosen randomly; for instances requiring specific functionality (e.g., similar APIs or multi-turn scenarios), advanced methods including graph-based sampling are used. Simple cases or cases with predefined functionality use template-based generation. For more complex scenarios, a multi-agent dialogue pipeline simulates real-world interaction with three agents (user, assistant, and tool).

**Construction of Agent data**: The authors implement a carefully curated, human-expert-built framework for Agent data generation, as shown in Figure 1(b).

- **(1) Scenario construction**: By systematically abstracting real-world interaction scenarios (e.g., food delivery and telecom operations), the authors design functional modules with explicit business semantics and specify core state variables (e.g., order status, account balance) and inherent attribute sets for each scenario.
- **(2) Sandbox environment construction**: An isolated sandbox is built with three core components: standardized functional interfaces with explicit input/output specifications and preconditions, a dynamic attribute management system for real-time state transition monitoring, and an execution monitoring module that records the invocation process.
- **(3) Question design**: Based on predefined multi-turn dialogue specifications tailored to different scenarios, domain experts systematically design dialogue questions through an iterative annotation process.

##### 3.1.2 Multi-Stage Data Verification

To address issues such as answer mismatch or ambiguous standards, the authors implement a multi-stage verification pipeline.

- **Automated quality inspection**:
  - Data first pass through a rule-based quality inspection module that evaluates four dimensions: **clarity of API definitions, executability of function calls, dialogue accuracy, and consistency of data samples**.
  - Data then enter a model-based quality verification module that uses **LLMs** to detect semantic errors and employs a **voting mechanism** to ensure consistent evaluation.
- **Human quality inspection**: In preliminary evaluation, data remaining after automated inspection are scored by three LLMs to assist human experts in filtering. Valid data are retained, while potentially problematic data are placed in an error candidate pool. Flagged entries undergo a **two-step expert review process**:
  - Two experts independently evaluate and propose revisions; a third expert integrates feedback and revises problem statements, API definitions, and answers.
  - Revised data are re-evaluated and manually verified, with three rounds of refinement to ensure high dataset quality.

##### 3.1.3 Data Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig2-fig3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig4.png" alt="avatar" style="zoom:50%;" /></div>

To demonstrate the breadth and comprehensiveness of ACEBench, the authors provide a detailed analysis of the distribution of test cases.

- **Domain of APIs**: ACEBench APIs span 8 major domains and 68 subdomains, covering many aspects of daily life, including technology, finance, entertainment, society, health, culture, and environment. The benchmark provides a rich set of 4,538 APIs in Chinese and English. The distribution of these APIs is shown in Figure 2.
- **Data composition**: ACEBench comprises three types of test samples—Normal, Agent, and Special—each subdivided into several subcategories. The data composition is shown in Figure 3, illustrating comprehensive coverage of tool-use ability from simple single-turn tool calls to complex multi-turn interaction involving users and the environment. Scenarios include multi-step interaction with the environment as well as cases where tool invocation is infeasible.
- **Number of turns and arguments**: Test data in ACEBench cover a wide range of complexity. The authors count dialogue turns and the number of parameters in invoked APIs and visualize them in Figure 4. Results show dialogue turns ranging from 1 to 8, covering most real-world scenarios.

#### 3.2 Eval

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig5.png" alt="avatar" style="zoom:100%;" /></div>

##### 3.2.1 Normal Evaluation

As shown on the left of Figure 5, Normal data are evaluated by comparing model function-call outputs to ground truth using AST parsing. When multiple valid answers exist, a candidate answer pool is used; matching any candidate in the pool counts as correct. Evaluation uses accuracy ($1=$ exact match, $0=$ no match).

##### 3.2.2 Special Evaluation

As shown in the center of Figure 5, Special data evaluation focuses on models’ **problem identification** ability. Specifically, the model must: (1) detect and warn about missing parameters, (2) accurately locate incorrect parameters, and (3) recognize mismatches between the task and available functions. For each case, accuracy is 1 if identification is correct, otherwise 0.

##### 3.2.3 Agent Evaluation

As shown on the right of Figure 5, Agent ability is evaluated by assessing models’ **proficiency** in using tools during human–machine interaction; **gpt-4o** is used as a user simulator during testing. Two metrics are used:

- **End-to-end accuracy**: Evaluated by comparing instance attributes of the corresponding class with the target. If all attributes match exactly, accuracy is 1; otherwise 0.
- **Process accuracy**: Determined by consistency between the actual function-call process and the ideal process. It is expressed as $\frac{n}{m}$, where $m$ is the ideal function-call process and $n$ is the degree of match between the actual and ideal processes.

##### 3.2.4 Overall Accuracy

Overall accuracy is computed as a weighted sum of accuracies on Normal, Special, and Agent data, with weights proportional to the square root of each type’s sample size.

### 4 Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/tab4.png" alt="avatar" style="zoom:50%;" /></div>

**Experimental setup**: The evaluation covers seven closed-source LLMs, including the GPT-4 family, Qwen-Max, Gemini-1.5-Pro, Claude-3.5-Sonnet, and Doubao-Pro-32K. Several open-source language models are also evaluated, such as the Qwen2.5 series, Llama3 series, Phi-3-Mini, Deepseek-V3, and DeepSeek-Coder-V2. Four tool-learning-enhanced models are assessed as well: Hammer2.1-3B, Hammer2.1-7B, xLAM-7B-r, and Watt-Tool-8B.

#### 4.1 Main results and analysis

Comprehensive results on the Chinese and English datasets are presented in Table 2. The authors draw the following key conclusions:

- **General conclusion on model performance**:
  - Overall top performance is still dominated by closed-source models, such as the GPT-4 family.
  - However, the gap between certain open-source models (e.g., Qwen2.5-Coder-32B-Instruct, Qwen2.5-72B-Instruct, and DeepSeek-V3) and closed-source models is gradually narrowing. This trend suggests that open-source models are steadily catching up, driven by advances in model architecture and training methods.
- **Loss of generalization in fine-tuned models**:
  - As shown in Figure 3, models fine-tuned on specific datasets—such as Watt-Tool-8B, XLAM-7B, and Hammer2.1-7B—exhibit a marked drop on Special data.
  - This decline is mainly attributed to fine-tuning improving performance on targeted tasks while potentially reducing generalization, making models less effective on new or broader instruction-following tasks.
- **Performance limitations of large models in complex tasks**:
  - As shown in Table 4, most models achieve end-to-end accuracy below 50% on Agent data tasks.
  - This is because completing such tasks in dynamic environments that simulate real-world multi-turn interaction requires more than executing individual tool operations. Models must integrate contextual information during tool use and account for dependencies between tool calls, which substantially increases task complexity.
  - Moreover, these tasks require advanced reasoning and adaptability; even large models may struggle to maintain consistency over long interactions and to respond to the evolving nature of the task.

#### 4.2 Error Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/tab5.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig6-fig7.png" alt="avatar" style="zoom:100%;" /></div>

**Error analysis on Normal data**:

- As shown in Figure 6, among error types on Normal data, **param value error** dominates across models. This highlights difficulty in generating specific values, possibly due to limited contextual understanding and the complexity of value distributions.
- **Output format error** is the second most common error, indicating room to improve generation of code that follows predefined format and syntax rules.
- By contrast, **function name** and **param type** errors are relatively rare, suggesting strong performance in matching function calls and handling data types.

**Error analysis on Special data**:

- As shown in Table 5, the authors identify two main types of model errors:
- The first is **Error Detection**, where the model fails entirely to detect problems in the user instruction or cannot identify problems in the required output format.
- The second is **Error Correction**, where the model detects a problem but provides unclear feedback—for example, noting that something is wrong without specifying which parameter value is incorrect or what key information is missing.
- Results show that most errors in special scenarios arise from error detection failures.

**Error analysis on Agent data**:

- The analysis identifies three main causes of Agent errors.
- **First, function call errors**: Occur when the model fails to select an appropriate function or fails to supply parameters that meet specifications.
- **Second, rule violations**: Occur when the model ignores predefined scenario rules, skips necessary steps, or breaks critical task logic.
- **Finally, information mismanagement**: Stems from the model’s inability to correctly record or process contextual information across multi-turn interaction, leading to outputs that deviate from expectations.

#### 4.3 Further Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/tab6.png" alt="avatar" style="zoom:50%;" /></div>

**Scaling law**:

- The authors evaluate Qwen2.5-Coder (3B, 7B, 14B, 32B) and Qwen2.5-Instruct (3B, 7B, 14B, 32B, 72B) on ACEBench.
- As shown in Figure 7, results indicate that performance improves substantially across tasks as model size increases, with especially strong gains on complex tasks.
- However, as model size continues to grow, the rate of improvement begins to slow, particularly between 32B and 72B models. This suggests that while increasing parameters initially yields substantial gains, marginal benefits from further scaling decrease.

**Impact of prompting strategies**:

- Prompt design has a significant effect on language model performance. The authors test three strategies:

  1. **Standard Prompt**: A comprehensive template designed to reduce interference from insufficient information.

     <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig23.png" alt="avatar" style="zoom:100%;" /></div>

  2. **Condensed Prompt**: A compact version retaining core instructions, testing performance under reduced but sufficient guidance.

     <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig25.png" alt="avatar" style="zoom:100%;" /></div>

  3. **Minimal Prompt**: A highly abbreviated form (e.g., keywords), assessing the model’s ability to infer the task from ultra-concise input.

     <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ACEBench/fig26.png" alt="avatar" style="zoom:100%;" /></div>

- Results in Table 6 show that models using the standard prompt template achieve the highest overall accuracy. This is attributed to strict format specifications in the standard prompt, which effectively reduce interference from irrelevant factors.

- These empirical findings offer key insights for future prompt engineering: standardizing function-calling prompts with explicit format requirements can significantly improve execution accuracy.

<hr align="left" color="#987cb9" size="1">

