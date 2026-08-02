---
layout: post
title: ACL Demo-2024 LlamaFactory：Unified Efficient Fine-Tuning of 100+ Language Models
categories: [CL]
tags: [LLM, NLP]
proceedings: ACL
date: 2024-08-23
lang: en
alt_url: /zh/notes/cl/LlamaFactory：Unified-Efficient-Fine-Tuning-of-100+-Language-Models/
permalink: /notes/cl/LlamaFactory：Unified-Efficient-Fine-Tuning-of-100+-Language-Models/
---

> Paper: [LlamaFactory：Unified Efficient Fine-Tuning of 100+ Language Models](https://aclanthology.org/2024.acl-demos.38/)
>
> Code: <https://github.com/hiyouga/LLaMA-Factory>

## LlamaFactory: A Framework for Efficient Fine-Tuning of LLMs

### Abstract

Efficient fine-tuning of large models on downstream tasks is critically important. The authors present LlamaFactory, which enables easy fine-tuning of 100+ LLMs through a built-in web UI with little or no coding.

### Introduction

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LlamaFactory/tab1.png "avatar")![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LlamaFactory/tab2.png "avatar")​

Large language models (LLMs) excel at reasoning and a wide range of tasks such as question answering, machine translation, and information extraction. In recent years, LLMs have flourished in the open-source community; for example, Hugging Face’s LLM leaderboard lists more than 5,000 models, making it easier for users to leverage LLM capabilities.

To adapt LLMs to downstream tasks, fine-tuning is required, but updating parameters at extreme scale demands substantial compute, which becomes a key bottleneck. Parameter-efficient fine-tuning techniques (e.g., LoRA, QLoRA) reduce training cost, yet the community offers many disparate methods and lacks a unified framework to support broad adoption and customization.

**LLAMAFACTORY framework**:

*   The authors propose **LLAMAFACTORY**, a unified framework for efficiently fine-tuning more than 100 LLMs.
*   The framework integrates state-of-the-art efficient fine-tuning methods and can fine-tune models with minimal resources and high throughput.
*   It offers two user-friendly modes—command line and a graphical interface (**LLAMABOARD**)—so users can flexibly customize and fine-tune LLMs with almost no code.

**LLAMAFACTORY comprises three core modules:**

1.  **Model Loader**: loads and manages pretrained models.
2.  **Data Worker**: processes and aligns datasets in diverse formats.
3.  **Trainer**: applies efficient fine-tuning methods.

**Implementation**:

*   The framework is built on PyTorch and several open-source libraries (e.g., Transformers and PEFT), providing high-level, out-of-the-box tooling.
*   **LLAMABOARD**, implemented with Gradio, lets users fine-tune LLMs without writing code.

### Efficient Fine-Tuning Techniques

#### Efficient Optimization

**Overview**

Efficient optimization techniques aim to adapt LLM parameters at minimal resource cost. They reduce computational complexity by freezing part of the parameters or introducing low-dimensional adapters.

**Technical details**

1.  **Freeze-tuning**:

    *   Only a small subset of parameters is updated while most layers remain frozen.
    *   Typically only a few parameters in decoder layers—often the last few layers—are trained.
    *   Fewer trainable parameters lowers resource consumption.
2.  **Gradient Low-Rank Projection (GaLore)**:

    *   Projects gradients into a low-dimensional subspace, enabling full-parameter learning while substantially saving memory.
    *   Suited to large-model training: maintains performance with lower memory overhead.
3.  **BAdam**:

    *   A **Block Coordinate Descent (BCD)**-based method that partitions parameters into blocks to improve training efficiency.
    *   Can optimize large parameter sets efficiently.
4.  **Low-Rank Adaptation (LoRA)**:

    *   Freezes all pretrained weights and adds a pair of low-rank matrices to selected layers as trainable adapters.
    *   Combined with quantization (e.g., QLoRA), memory use can be reduced further.
5.  **QLoRA**:

    *   Applies LoRA fine-tuning on quantized weights.
    *   Uses 4-bit quantization and double quantization (e.g., LLM.int8), greatly reducing memory consumption.
6.  **DoRA**:

    *   Decomposes pretrained weights into magnitude and direction components and updates only the direction part to improve performance.
    *   More effective than LoRA alone in complex fine-tuning settings.
7.  **LoRA+**:

    *   An optimization for LoRA that addresses suboptimal low-rank factorization and further improves performance.
8.  **PiSSA (Principal Singular Values and Singular Vectors Adaptation)**:

    *   Initializes adapters from principal components of pretrained weights for faster convergence.

#### Efficient Computation

**Overview**

Efficient computation techniques reduce time or memory during LLM training through hardware-aware optimizations and algorithmic improvements.

**Technical details**

1.  **Mixed Precision Training**:

    *   Trains with mixed precision (e.g., float16 and bfloat16) to lower memory footprint.
    *   Improves compute efficiency with limited impact on model accuracy.
2.  **Activation Checkpointing**:

    *   Stores only some intermediate activations during the forward pass and recomputes the rest in the backward pass to save memory.
3.  **Flash Attention**:

    *   A hardware-friendly attention implementation that cuts I/O overhead in attention layers and speeds up computation.
4.  **S2Attention (Shifted Sparse Attention)**:

    *   For long-context LLMs, uses sparse attention to reduce memory use.
5.  **Quantization**:

    *   Represents weights in lower precision (e.g., 4-bit or 8-bit) to shrink memory requirements.
    *   Supports multiple post-training quantization methods such as GPTQ, AWQ, and AQLM.
6.  **Unsloth**:

    *   Implements LoRA backward passes with the Triton library, reducing FLOPs and accelerating gradient descent.
    *   Improves the efficiency of LoRA fine-tuning.

LLAMAFACTORY integrates the above optimization and computation techniques seamlessly, substantially improving the efficiency of LLM fine-tuning.

### LlamaFactory Framework

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LlamaFactory/fig1.png "avatar")​

#### Model Loader

The **Model Loader** manages model initialization and fine-tuning setup, including:

1.  **Model Initialization**:

    *   Loads pretrained models and tokenizers via Transformers Auto classes (e.g., `AutoModelForCausalLM` and `AutoTokenizer`).
    *   Supports automatic resizing of embedding layers and initialization of new parameters.
    *   Extends context length using scaling factors for RoPE (rotary position embeddings).
2.  **Model Patching**:

    *   Uses monkey patching to add capabilities such as S²Attention.
    *   Natively supports Flash Attention for better compute efficiency.
    *   Optimizes mixture-of-experts (MoE) models under DeepSpeed ZeRO stage-3 to avoid excessive partitioning of dynamic layers.
3.  **Model Quantization**:

    *   Supports 4-bit or 8-bit dynamic quantization (e.g., LLM.int8 and QLoRA double quantization).
    *   Compatible with multiple quantization methods (GPTQ, AWQ, AQLM); fine-tuning of quantized weights is limited to adapter-based methods.
4.  **Adapter Attaching**:

    *   Automatically detects where to insert adapters (e.g., all linear layers) for better convergence.
    *   Supports multiple adapter methods (LoRA, DoRA, PiSSA, etc.).
    *   Can replace the backward pass with Unsloth to speed up training.
5.  **Precision Adaptation**:

    *   Adjusts floating-point precision (e.g., bfloat16 or float16) according to hardware capability.
    *   Keeps all trainable parameters in float32 during mixed-precision training for stability.

#### Data Worker

The **Data Worker** provides a full data-processing pipeline so task-specific data can be normalized into a unified format.

1.  **Dataset Loading**:

    *   Loads local or remote datasets via the Datasets library.
    *   Uses the Arrow format to reduce memory overhead and supports streaming to avoid downloading entire datasets.
2.  **Dataset Aligning**:

    *   Provides a data specification that standardizes diverse formats (e.g., Alpaca, ShareGPT) into a common structure.
3.  **Dataset Merging**:

    *   Offers efficient merging strategies:

        *   Direct concatenation in non-streaming mode.
        *   Interleaved reads in streaming mode to preserve randomness.
4.  **Dataset Preprocessing**:

    *   Supplies multiple chat templates for different models.
    *   By default, loss is computed only on the generation segment; sequence packing reduces training time.

#### Trainer

The **Trainer** is a core module that integrates efficient fine-tuning methods and training mechanics.

1.  **Efficient Training**:

    *   Supports recent efficient fine-tuning methods (LoRA+, GaLore, BAdam, etc.).
    *   Modular design lets different tasks apply these methods flexibly.
    *   Uses trainers from Transformers and TRL for pretraining, instruction tuning, preference optimization, and related objectives.
2.  **Model-Sharing RLHF**:

    *   Proposes an approach so RLHF (reinforcement learning from human feedback) can run on consumer hardware.
    *   By dynamically switching adapters, a single pretrained backbone can serve as policy, value, reference, and reward models.
3.  **Distributed Training**:

    *   Combines DeepSpeed for data parallelism and uses the ZeRO optimizer to reduce memory consumption.

#### Utilities

*   **Model Inference**:

    *   Supports streaming decoding with Transformers and vLLM for high-throughput inference.
    *   Provides an OpenAI-style API for easy integration into applications.
*   **Model Evaluation**:

    *   Supports automatic evaluation on multiple benchmarks (e.g., MMLU, CMMLU, and BLEU).
    *   Includes text similarity metrics and human evaluation utilities.

#### LLAMABOARD: A Unified Interface for LLAMAFACTORY

**LLAMABOARD** is the graphical front end for LLAMAFACTORY, allowing users to customize fine-tuning and evaluation workflows through a web UI without code.

1.  **Easy Configuration**:

    *   Sensible default hyperparameters; users can preview and validate datasets in the UI.
2.  **Monitorable Training**:

    *   Real-time training logs and loss curves for monitoring progress.
3.  **Flexible Evaluation**:

    *   Supports automatic and human evaluation to measure model capability.
4.  **Multilingual Support**:

    *   Localized UI; currently English, Russian, and Chinese.

### Empirical Study

#### Training Efficiency

**Experimental setup**

*   **Dataset**: **PubMed**, with roughly 36 million biomedical records; about 400k tokens were sampled to build the training corpus.
*   **Settings**: learning rate $10^{-5}$, token batch size 512, 8-bit AdamW optimizer, bfloat16 precision, activation checkpointing to reduce memory, Freeze-tuning: only the last 3 decoder layers, GaLore: rank 128 and scale factor 2.0, LoRA/QLoRA: adapters on all linear layers with rank 128 and alpha 256, hardware: single NVIDIA A100 40GB GPU, Flash Attention enabled in all runs; Unsloth additionally enabled for LoRA and QLoRA.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LlamaFactory/tab4.png "avatar")​

*   On Gemma-2B, QLoRA used 5.21 GB memory, throughput 3158.59 tokens/s, and PPL 10.46.
*   On Llama2-13B, GaLore achieved PPL 5.72, better than LoRA and QLoRA, at higher memory cost.

#### Fine-Tuning on Downstream Tasks

**Experimental setup**

*   **Tasks**:

    *   CNN/DM: summarization
    *   XSum: extreme summarization
    *   AdGen: advertisement text generation

*   **Data split**:

    *   2,000 training and 1,000 test examples per task.
    *   Training and test sets are disjoint.

*   **Metrics**:

    *   **ROUGE** (ROUGE-1, ROUGE-2, ROUGE-L) for generation quality.

*   **Settings**:

    *   Learning rate $10^{-5}$, batch size 4, max input length 2048, 8-bit AdamW optimizer, NVIDIA A100 40GB GPU; LoRA and QLoRA adapter settings match the training-efficiency experiment.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LlamaFactory/tab5.png "avatar")​

*   **Best fine-tuning methods**:

    *   LoRA and QLoRA perform best on most tasks and models.
    *   For example, on XSum and AdGen, Llama3-8B with QLoRA achieves the highest ROUGE scores.
*   **Model comparison**:

    *   Llama3-8B is the strongest overall across tasks.
    *   Yi-6B and Mistral-7B are competitive among models of similar size.
*   **Task relevance**:

    *   QLoRA is stable on generation tasks, especially under tight resource constraints.

**Summary**

1.  **Training efficiency**:

    *   QLoRA and LoRA offer much better memory efficiency and throughput than full fine-tuning.
    *   On large models, GaLore achieves lower PPL through gradient optimization.
2.  **Downstream adaptation**:

    *   LoRA and QLoRA adapt strongly, especially for smaller models and resource-limited settings.
    *   Task-specific performance varies; Llama3-8B leads on many benchmarks.
3.  **Effectiveness of LLAMAFACTORY**:

    *   The framework’s efficient fine-tuning methods improve training efficiency and transfer well to downstream tasks, validating its practicality across scenarios.

​

***

​
