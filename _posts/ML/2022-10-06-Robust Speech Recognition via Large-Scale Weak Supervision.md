---
layout: post
title: OpenAI-2022 Robust Speech Recognition via Large-Scale Weak Supervision
categories: [ML]
tags: [speech-recognition, transformer]
proceedings: NeurIPS
date: 2022-10-06
lang: en
alt_url: /zh/notes/ml/Robust-Speech-Recognition-via-Large-Scale-Weak-Supervision/
permalink: /notes/ml/Robust-Speech-Recognition-via-Large-Scale-Weak-Supervision/
redirect_from:
  - "/ml/Robust-Speech-Recognition-via-Large-Scale-Weak-Supervision/"
  - "/ML/Robust-Speech-Recognition-via-Large-Scale-Weak-Supervision/"
---

> Paper: [Robust Speech Recognition via Large-Scale Weak Supervision](https://cdn.openai.com/papers/whisper.pdf)
>
> Blog: <https://openai.com/blog/whisper/>
>
> Code: <https://github.com/openai/whisper>

## Whisper: Speech recognition with Transformers at scale

### Abstract

The authors study the effect of large-scale training on speech transcripts collected from the web. Scaling data to 680,000 hours with multilingual, multitask supervised training yields strong performance; on standard benchmarks, zero-shot transfer to other domains reaches state-of-the-art levels.

### Introduction

Recent approaches rely on unsupervised pre-training, where abundant temporal structure in speech supports auxiliary tasks. The advantages are:

- Data are easy to collect without manual labeling or heavy cleaning
- Very large corpora can be assembled with fewer copyright concerns

This yields a strong encoder but not necessarily a strong decoder; supervised data are still needed for fine-tuning, which is cumbersome—doing without fine-tuning would be preferable. Prior pre-training for ASR often predicts intermediate representations such as speech units; converting those to text still requires another step, so fine-tuning remains necessary in practice.

Fine-tuning also tends to overfit the training distribution, hurting generalization. A central weakness of unsupervised pipelines is thus a good encoder paired with a weak decoder; a practical speech system should work out of the box.

Supervised learning on multiple datasets beats a single dataset, but combining seven supervised corpora still totals only about 5,000 hours—far below the ~1 million hours used in unsupervised work. Relaxing labeling requirements unlocks much larger data.

The authors scraped roughly 10,000 hours from YouTube (video plus subtitles as labels); trading off scale and quality in this regime is a sensible design choice.

They scale weakly supervised data to 680,000 hours in a system called Whisper, improving both diversity and coverage: 117,000 hours span 96 languages, and 125,000 hours are non-English speech paired with English translation labels. When the model is sufficiently large, joint multilingual multitask training helps.

### Approach

#### Data Processing

Unlike many speech systems, the model predicts raw text without normalization—direct surface forms rather than a canonicalized transcript—so no inverse text normalization (lowercasing, removing punctuation, expanding contractions, etc.) is required at decode time. At sufficient data scale, all such variants appear in training.

Web audio spans highly diverse conditions: environments, recording setups, microphones, and languages (acoustic diversity).

Text quality is more uneven. An automatic filter removes low-quality transcripts. Mixing human annotations with outputs from existing ASR systems hurts performance; filtering relies largely on simple rules.

They detect the language of the audio and the text (CLD2); mismatches are dropped unless the text is English, because translation is also trained. Deduplication removes pairs with overly similar transcripts.

Audio is segmented into 30-second chunks with aligned text as training examples. Segments with no speech are included (with downsampling) so the model can distinguish speech vs. non-speech. Sources with very high error rates—often half-finished transcripts or misaligned audio-text—are removed.

Training splits are scrubbed of test-set leakage.

#### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig1.png" alt="avatar" style="zoom:100%;" /></div>

A full encoder–decoder Transformer with a byte-level BPE tokenizer.

#### Multitask Format

Core ASR maps a segment to text, but systems also need voice activity, speaker identity, and related cues. Pipelines often chain single-task models; here one model handles transcription, translation, detection, and more.

Multitask control is shown on the left of Figure 1; the lower panel uses prompting: task identity is encoded via special token sequences. With some probability the model conditions on prior text; otherwise it transcribes from scratch. Language-related branches include same-language transcription and translation; further branches emit timestamps or not. Another branch handles non-speech (VAD).

Unlike BERT-style heads per task, everything is next-token prediction with a single loss; when one task underperforms, targeted fine-tuning is harder.

#### Training Details

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/tab1.png" alt="avatar" style="zoom:100%;" /></div>

Training uses FP16 and dynamic loss scaling for 2–3 epochs without overfitting.

### Experiments

#### Zero-shot Evaluation

ASR benchmarks are evaluated without training on their official training sets.

#### Evaluation Metrics

WER.

Raw WER can be pessimistic (e.g., capitalization mismatches count as errors), so transcripts are normalized for leaderboard comparison; deployed systems need not use that normalization.

#### English Speech Recognition

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/tab2.png" alt="avatar" style="zoom:50%;" /></div>

Human error rate is about 5.8%; LibriSpeech leaderboard models reach ~1.4% on clean speech—raising questions about real-world utility. Figure 2 shows supervised models degrade when the test domain shifts, whereas Whisper generalizes better; yellow markers indicate human WER.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/tab3.png" alt="avatar" style="zoom:50%;" /></div>

As training data scale increases, error rate decreases roughly proportionally.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig4.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/tab4.png" alt="avatar" style="zoom:50%;" /></div>

Translation results.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig6.png" alt="avatar" style="zoom:100%;" /></div>

Long-form transcription compared against commercial systems; performance is broadly on par.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig7.png" alt="avatar" style="zoom:80%;" /></div>

Quality is close to professional human transcription.

### Analysis and Ablations

#### Model Scaling

Weak labels support huge datasets, but very large models can memorize label noise.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig8.png" alt="avatar" style="zoom:100%;" /></div>

Overall quality improves with parameters, though some error types rise; gains largely plateau around 700M parameters.

#### Dataset Scaling

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/tab6.png" alt="avatar" style="zoom:80%;" /></div>

As data grow, English saturates around 50k hours while other languages still benefit.

#### Multitask and Multilingual Transfer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig9.png" alt="avatar" style="zoom:80%;" /></div>

With sufficient training time, multilingual multitask training is slightly better.

#### Text Normalization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Whispser/fig10.png" alt="avatar" style="zoom:80%;" /></div>

### Limitations and Future Work

#### Improved decoding strategies

Larger models make sharper lexical choices at decode time.

#### Increase Training Data For Lower-Resource Languages

Some languages remain data-poor.

#### Tuning Architecture, Regularization, and Augmentation

Architecture changes, regularization, and data augmentation are open directions.

#### Adding Auxiliary Training Object

Additional auxiliary objectives could be explored.

### Conclusion

Understanding of weakly supervised speech training is still incomplete, but at sufficient scale performance is very strong: after pre-training, zero-shot use is practical.

<HR align=left color=#987cb9 SIZE=1>
