---
layout: post
title: Automated Software Engineering-2021 Automating just-in-time comment updating
categories: [SE]
tags: [code-summarization]
proceedings: Automated Software Engineering
date: 2021-01-27
lang: en
alt_url: /zh/notes/se/Automating-just-in-time-comment-updating/
permalink: /notes/se/Automating-just-in-time-comment-updating/
---

> Paper: [Automating just-in-time comment updating](https://dl.acm.org/doi/10.1145/3324884.3416581)

## CUP: A New Tokenizer and Separate Encoders

### Abstract

The task of helping developers update comment text when code changes is termed **Just-in-Time (JIT) Comment Updating**; the authors propose **CUP** for this setting.

They introduce several tailored enhancements: a specialized tokenizer and a joint attention mechanism.

The method outperforms the previous best baseline by 7×.

### Introduction

- Poorly updated comment text can mislead developers and is often useless.
- This approach does not regenerate comments from scratch, so two aspects matter: (1) maintain consistency between old and new comments; (2) the old comment is the basis for the update, so an end-to-end model must learn both the code edit and a representation of the prior code.

  - A new tokenizer and copy mechanism
  - Two encoders—one for the code change and one for the old comment
  - A joint code–comment vocabulary with word embeddings from a pretrained fastText model
  - A joint attention mechanism
- **Data:** 1,496 Java projects on GitHub, yielding 108K samples pairing code comments with their modifications

### Model

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CUP/CUP-img1.png" alt="avatar" style="zoom:50%;" /></div>

#### Data Flattening

- **Tokenization**

  - Remove spaces, retain punctuation, and split compound identifiers; when two adjacent tokens are not separated by whitespace, insert a `<con>` marker.
  - Three common tokenization strategies: leave compound words intact; split them directly; or append a special symbol `</t>` (e.g., `"inputBufer" -> "inputBufer</t>"`). The first fails to remove OOV words, the second loses formatting, and the third cannot handle cases where sub-tokens of a compound word are predicted as independent tokens.
- **Code-change representation**

  - Each edit comprises three segments.
  - <div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CUP/CUP-img2.png" alt="avatar" style="zoom:50%;" /></div>

#### Seq2Seq Model

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CUP/CUP-img3.png" alt="avatar" style="zoom:50%;" /></div>

- Each encoder stacks four layers: embedding, contextual embedding, joint attention, and model layers.
  - **Embedding layer:** shared vocabulary; embeddings initialized from fastText pretraining.

### Data

- 1,496 repositories with at least 500 commits each.
- **Method-level edits:** GumTree is used to derive method-level change structure between two revisions.
- Data-processing details are lengthy; consult the original paper when implementing.

### Experiment

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CUP/CUP-img4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CUP/CUP-img5.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CUP/CUP-img6.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
