---
layout: post
title: ICML-2021 Learning Transferable Visual Models From Natural Language Supervision
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: ICML
date: 2021-02-26
lang: en
alt_url: /zh/notes/cv/Learning-Transferable-Visual-Models-From-Natural-Language-Supervision/
permalink: /notes/cv/Learning-Transferable-Visual-Models-From-Natural-Language-Supervision/
---

> Paper: [Learning Transferable Visual Models From Natural Language Supervision](https://proceedings.mlr.press/v139/radford21a/radford21a.pdf)

## CLIP: Replace unimodal positives with multimodal pairs; use text prompts for transfer learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP/CLIP-img1.png" alt="avatar" style="zoom:60%;" /></div>

### Abstract and Related Work

1. A major reason CLIP is strong is that OpenAI collected **400 million image–text pairs, breaking away from fixed categorical labels**.
2. It fully removes the constraint of categorical labels: neither training nor inference requires a predefined label list. Any image can be queried by feeding the model different text sentences to test whether objects of interest are present, which has spawned many interesting follow-ups.

   2.1 [StyleCLIP](https://openaccess.thecvf.com/content/ICCV2021/papers/Patashnik_StyleCLIP_Text-Driven_Manipulation_of_StyleGAN_Imagery_ICCV_2021_paper.pdf): CLIP + StyleGAN—text edits guide image generation, [code](https://github.com/orpatashnik/StyleCLIP)

   2.2 [CLIPDraw](https://arxiv.org/pdf/2106.14843.pdf): a CLIP pretrained model guides image generation; a few steps of gradient descent suffice to produce sketch-like images

   2.3 [Object detection and segmentation](https://arxiv.org/pdf/2104.13921.pdf): detect novel categories—for example, not only recognizing a toy but also what color it is
3. Pure zero-shot performance was initially too low (11.5%). Even though **category-based pretraining was known to generalize poorly**, few pursued the direction, so people looked for a middle ground between images and text.
4. Examples include learning from Instagram data with hashtags, or from JFT-300 labels (10k+ categories)—all ways to learn visual features from natural language—but most required training at hundred-million to billion scale. That suggests the issue was not the CLIP-style approach itself but insufficient data. They tried eight models spanning two orders of magnitude in scale and found **performance scales positively with scale**.
5. Even after freezing the pretrained backbone (linear probe) and training only a final classification head, results beat ImageNet-trained baselines while remaining compute-efficient.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP/CLIP-img2.png" alt="avatar" style="zoom:60%;" /></div>

1. Why use natural language supervision:

   1.1 **No manual labeling** of categories or heavy data cleaning—only image–text pairs. Because the supervision is free-form text rather than an n-way label, the model’s inputs and outputs have **much higher degrees of freedom**.

   1.2 Training binds images and text together, so the learned representation is genuinely **multimodal**, not purely visual.

2. They built a large dataset (~400M pairs). With so much data, heavy augmentation is unnecessary—they use only random cropping and still struggle to overfit. Scale also makes hyperparameter tuning hard; **temperature** becomes a critical hyperparameter.

3. Human captions for the same image can differ wildly, so **predictive** pretraining (e.g., caption generation) is **slow**. Reframing the task as image–text **matching** is much easier: there is no need to predict text token-by-token, and **training efficiency improves by about 4×**.

4. Whether the projection head is nonlinear or linear barely matters (nonlinear heads helped SimCLR by ~10 points)—possibly because nonlinearity mainly helps unimodal image-only contrastive learning.

5. The visual encoder can be ResNet or Transformer.

### Experiment

1. Prior unsupervised or self-supervised methods mainly studied representation quality—learning features that generalize (e.g., MoCo, SimCLR, DINO)—but downstream use still typically requires labeled fine-tuning. Can we avoid tuning altogether?

2. Zero-shot inference

   Images and text pass through encoders; cosine similarity followed by softmax yields predictions. On ImageNet classification, this means 1000 text prompts—effectively asking the image, one by one, “Is this a dog?”, “Is this a cat?”, and so on.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP/CLIP-img3.png" alt="avatar" style="zoom:60%;" /></div>

3. Prompt templates

   The authors use 80 prompt templates as textual anchors. Wording matters, which later motivated **prompt engineering** and **prompt ensemble** in CLIP.

   3.1 Why prompt engineering or prompt ensemble?

   ① Polysemy: one word, many senses—using a single word as the text input is ambiguous. ② There is no dedicated classification head; training pairs one **sentence** with one **image**, so at inference a **word** (class name) must be expanded into a **sentence** to avoid unnecessary accuracy drops.

   3.2 Prompt engineering

   With more prior knowledge about a dataset, templates can be chosen more carefully to shrink the search space—for example, knowing a benchmark is all animals.

   3.3 Prompt ensemble

   Applying multiple templates and aggregating scores usually improves results.

4. They evaluate transfer on 27 datasets, showing broad applicability. CLIP does well on standard classification benchmarks, but on very hard tasks—counting (complex), tumor classification (domain knowledge)—zero-shot is weak; few-shot comparison is fairer. In practice, full fine-tuning still beats all alternatives by a large margin.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP/CLIP-img4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP/CLIP-img5.png" alt="avatar" style="zoom:60%;" /></div>

5. The authors even compare humans vs. CLIP: volunteers classify 37 fine-grained dog/cat breeds without reference exemplars, alongside one-shot and two-shot human experiments.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP/CLIP-img6.png" alt="avatar" style="zoom:60%;" /></div>

6. They also compare which categories are hard for humans vs. CLIP—classes humans find difficult tend to be hard for CLIP as well.

### Limitation

1. Strong numbers are often vs. ResNet-50; compared with various SOTAs, CLIP still lags by a lot—perhaps needing ~1000× scale. New methods must improve compute and data efficiency.

2. Zero-shot is poor on some datasets (e.g., fine-grained classification) and on abstract or difficult tasks; in many domains CLIP can be near random guessing.

3. At inference, large train–test distribution shift hurts generalization—for example ~88% on MNIST, where a linear baseline can do better.

4. Zero-shot still chooses among a fixed set of categories. A more flexible setup is caption generation (generative models) so the model can produce novel outputs—raising whether a loss could unify contrastive and generative learning.

5. Data efficiency is low: training effectively sees on the order of 12.8 billion image exposures. Reducing data needs may require stronger augmentation, pseudo-labels, or self-supervision.

6. Using ImageNet as the recurring benchmark for downstream evaluation introduces bias—it is not truly zero-shot in the wild.

7. Web-scraped, minimally cleaned data may encode societal biases and enable misuse.

8. Many visual concepts are hard to describe in language; a few downstream examples (few-shot) can help—yet sometimes adding a few labeled images hurts accuracy compared with zero-shot.

<HR align=left color=#987cb9 SIZE=1>
