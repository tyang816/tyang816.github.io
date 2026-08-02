---
layout: post
title: arXiv-2025 Evaluating Large Language Models in Scientific Discovery
categories: [CL]
tags: [Agent, LLM, NLP]
proceedings: arXiv
date: 2025-12-17
lang: en
alt_url: /zh/notes/cl/Evaluating-Large-Language-Models-in-Scientific-Discovery/
permalink: /notes/cl/Evaluating-Large-Language-Models-in-Scientific-Discovery/
---

> Paper: [Evaluating Large Language Models in Scientific Discovery](https://)
>
> Code: <https://github.com/HowieHwong/sde-harness>

## SDE-harness: Evaluating scientific problems across eight domains with AI

### Abstract

The abstract concisely highlights current limitations of large language models (LLMs) in scientific evaluation and formally introduces a new evaluation framework: **Scientific Discovery Evaluation (SDE)**.

**1. Limitations of existing benchmarks** Although LLMs are increasingly applied to scientific research, mainstream scientific benchmarks mainly test **decontextualized knowledge**. They overlook the core capabilities that drive scientific discovery: **iterative reasoning, hypothesis generation, and interpretation of observations**.

**2. Construction of the SDE framework** To address these issues, the authors introduce a **scenario-grounded** benchmark spanning **biology, chemistry, materials, and physics**. Domain experts define projects with genuine research value, decompose them into modular research scenarios, and sample validated questions from those scenarios.

**3. Two-level evaluation mechanism** SDE evaluates models at two levels:

- **Question-level**: accuracy on questions tightly tied to specific research scenarios.
- **Project-level**: models simulate end-to-end research—proposing testable hypotheses, designing simulations or experiments, and interpreting results.

**4. Key findings and conclusions** Evaluating state-of-the-art LLMs reveals several important patterns:

- **Performance gap**: models score lower on SDE than on general scientific Q&A benchmarks.
- **Diminishing returns**: scaling model size and strengthening reasoning yield diminishing gains.
- **Shared weaknesses**: top models from different providers show systematic common failure modes.
- **No general “superintelligence”**: performance varies widely across research scenarios, so the “best model” changes from project to project, indicating current LLMs remain far from general scientific “superintelligence”.
- **Potential for serendipity**: despite modest scenario-level scores, LLMs can still show promise across many discovery projects, underscoring the role of **guided exploration and serendipity** in science.

Ultimately, SDE aims to provide a reproducible, discovery-oriented benchmark that charts a path toward LLMs for scientific discovery.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/fig1.png" alt="avatar" style="zoom:100%;" /></div>

**1. Current state: LLMs are accelerating across the scientific discovery pipeline**

The introduction acknowledges progress of LLMs in science. They are beginning to accelerate core stages of discovery—from literature screening and hypothesis generation to computational simulation, code synthesis, and even autonomous experiments.

- **Evolving roles**: LLMs have moved from substitutes for structure–property prediction and simple Q&A to tools with reasoning (thanks to reinforcement learning and inference-time compute scaling) that can supply intuition and insight.
- **Success stories**: Examples include **ChemCrow**, autonomous “co-scientists,” and **Virtual Lab** for nanobody design. By combining language reasoning with domain tools, lab automation, and even embodied systems (e.g., LabOS), these systems show LLMs can assist scientists in human-in-the-loop discovery.

**2. Pain point: evaluation lags application reality**

- Mature domains (Fig. 1a): In code (e.g., SWE-bench Verified), math (e.g., AIME), and tool use, benchmarks are relatively mature, with clear ground truth and strong predictive validity (Fig. 1a radar plots show clear separation of model capabilities).
- Gaps in scientific evaluation (Fig. 1b): Mainstream scientific benchmarks (e.g., GPQA, ScienceQA) consist largely of **decontextualized** Q&A. As in Fig. 1b, items are often loosely tied to specific research domains and may contain noise or irrelevant information.
- **Core claim**: Mastery of static questions does not mean readiness for discovery—**“getting straight A’s in coursework does not make you a great researcher.”** Real evaluation must measure understanding of the **context of research**, reasoning under imperfect evidence, and iterative hypothesis revision.

**3. Solution: the SDE (Scientific Discovery Evaluation) framework**

To address these gaps, the authors propose SDE, a systematic evaluation rooted in real-world research scenarios.

- Tight coupling (Fig. 1c): Unlike traditional benchmarks, SDE uses a hierarchy **Domain** $\rightarrow$ **Project** $\rightarrow$ **Scenario** $\rightarrow$ **Question** (Fig. 1c), so each question is tightly linked to authentic research.
- **Coverage**: biology, chemistry, materials, and physics.
- **Construction logic**: experts define genuine research projects, break them into modular, scientifically grounded “research scenarios,” and build reviewed questions within each scenario.

**4. Evaluation methodology: from “taking exams” to “doing research”**

SDE introduces a two-level scheme to surface true LLM capabilities:

- **Question-level**: accuracy within specific scenarios.
- **Project-level**: the key innovation—models enter a closed discovery loop, autonomously **proposing testable hypotheses, running simulations or experiments, interpreting outcomes, and revising hypotheses**. For example, the artemisinin synthesis pathway project in Fig. 1c includes forward reaction prediction and NMR-based structure inference, among other scenarios.

Longitudinal, fine-grained evaluation of SOTA models released over time shows where current models succeed, fail, and why. The analysis points to future directions: targeted training on **problem formulation**, diverse data sources, integrating computational tools in training, and reinforcement learning tailored to scientific reasoning.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### Question-level evaluations

##### Performance gap in quiz- and discovery-type questions

**1. A construction pipeline beyond traditional benchmarks**

To go beyond conventional scientific Q&A benchmarks whose items are sometimes **assembled opportunistically**, SDE questions follow a distinct collection pipeline (Fig. 1c).

- **Expert-defined scenarios**: In each domain (biology, chemistry, materials, physics), multi-member expert panels defined roughly **10 common research scenarios**—settings where LLMs could plausibly help experts on active projects.
- **Scenario breadth**: Scenarios range from tasks human experts excel at (e.g., decisions from specific experimental observations) to tasks humans cannot handle without tools (e.g., inferring oxidation state and spin of transition-metal complexes from structure alone).

**2. Hybrid generation strategy**

The team combined **semi-automatic generation** with **manual drafting**:

- **Semi-automatically**: Where feasible, questions are sampled from existing benchmark or open datasets and instantiated via templates.
  - *Example*: “Map NMR spectra to molecular structure” uses templated conversion of structured entries.
- **Expert manual drafting**: Otherwise, especially for **experiment-related** scenarios, domain experts write questions by hand.

**3. Strict quality control**

- **Expert review**: Every question underwent panel review.
- **Inclusion criteria**: Only questions with consensus on **validity** and **correctness** were included. In total, SDE contains **1,125** high-quality questions.

**4. Design rationale: rejecting decontextualization**

Binding each question to a concrete **research scenario** ensures correctness reflects progress on **practical scientific discovery projects**, not decontextualized trivia. This also enables LLM comparisons at the same granularity.

**5. Evaluation goals and model selection**

To understand how performance on popular coding, math, and reasoning benchmarks translates to discovery, the study evaluates top models from providers such as OpenAI, Anthropic, Grok, and DeepSeek, using an adapted **`lm-evaluation-harness`** for flexible task types.

**6. The performance gap**

Results are anchored by comparing SDE discovery questions to widely used general scientific Q&A benchmarks.

- **SDE scores**: Top models reach **0.71** in biology (Claude-4.1-opus), **0.60** in chemistry (Claude-4.5-sonnet), **0.75** in materials (GPT-5), and **0.60** in physics (GPT-5), Fig. 2a.
- **General benchmark scores**: The same models reach **0.84** on **MMMU-Pro** and **0.86** on **GPQA-Diamond** (GPT-5), Fig. 2b.
- **Conclusion**: A consistent **performance gap** separates **decontextualized Q&A** from **scenario-grounded discovery questions**—high exam scores do not imply ability to solve real research problems.

##### Reasoning and scaling plateau

On coding and math benchmarks, SOTA performance usually rises with new releases, with **reasoning** as a main driver—equally important for discovery.

**1. Clear benefits of reasoning**

In head-to-head comparisons of otherwise similar models, variants with explicit **test-time reasoning** consistently outperform counterparts without it on SDE questions.

- **DeepSeek case study**: The effect is clearest comparing **DeepSeek-R1** and **DeepSeek-V3.1** (shared base). Fig. 2c shows R1 beats V3.1 on average accuracy across all four domains.
- **Cross-scenario consistency**: Gains span most scenarios. Fig. 2d compares scenario-level scores; most points lie above the parity line, showing improved reasoning for **multi-step derivation** and **evidence integration** translates to higher accuracy in discovery settings.
- **Concrete example**: Judging whether an organic molecule satisfies **Lipinski’s rule of five** (a key oral bioavailability guideline). Fig. 2e shows DeepSeek models jump from **0.65** to **1.00** accuracy when reasoning is enabled.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/fig3.png" alt="avatar" style="zoom:100%;" /></div>

**2. Saturation of reasoning gains**

Despite clear benefits, tracking **gpt-5** at different **reasoning effort** levels shows SDE performance beginning to plateau.

- **Diminishing returns**: Even when models set records on code or math, discovery gains become modest and often within statistical noise. Fig. 3a shows the curve flattening as effort goes from “none” to “high”.
- **Concrete comparisons**: Between “medium” and “high” effort, accuracy barely moves:
  - **Biology**: 0.70 vs 0.69
  - **Chemistry**: 0.53 vs 0.60
  - **Materials**: 0.74 vs 0.75
  - **Physics**: 0.58 vs 0.60
- **Conclusion**: For discovery, scaling **test-time compute**—a dominant industry recipe—shows **diminishing marginal returns** (see Supplementary Fig. 7).

**3. Scaling plateau**

Beyond reasoning, **scaling up** model size is often credited for LLM success.

- **Monotonic gains**: Accuracy increases monotonically as **gpt-5** goes from nano to mini to default large, Fig. 3b.
- **Slowing growth**: Scaling effects also appear to slow over the past year. Fig. 3c shows **gpt-5** vs **o3** improvements are **marginal**; in eight scenarios gpt-5 is substantially worse (accuracy drops > 0.075).
- **Base model convergence**: Stripping out reasoning, gains from **gpt-4o** to **gpt-5** are negligible—pretrained foundation LLMs on discovery tasks may have **converged** over the last 18 months.

**4. Core takeaway**

Reasoning and scaling analyses do not mean progress has stopped; they show **discovery stresses different skills than generic scientific Q&A**: **problem formulation**, **hypothesis refinement**, and **interpretation of imperfect evidence**.

##### **Shared failure modes among top-performing LLMs**

**1. High correlation across models**

- **Observation**: Top models from different providers (**gpt-5, grok-4, deepseek-R1, claude-sonnet-4.5**) have highly correlated accuracy profiles—they excel and fail on the same scenarios (Fig. 3d and Supplementary Fig. 5).
- **Evidence**: Correlation is strongest in **chemistry** and **physics**, where all pairwise **Spearman’s r** and **Pearson’s r** exceed **0.8**.

**2. Converging on the same incorrect answers**

- **Consensus failures**: Top models often collapse to **identical** wrong answers on the hardest items, despite differing overall accuracy (Fig. 3e and Supplementary Fig. 6).
- **Example**: **MOF (metal–organic framework) synthesis**—overall performance is relatively high, yet four questions out of 22 are missed the same way by all four top models.
- **Interpretation**: Aligned errors suggest frontier LLMs share strengths and **systematic shared weaknesses**, likely from similar **pretraining data** and **training objectives** rather than idiosyncratic architecture.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/figs2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/figs9.png" alt="avatar" style="zoom:50%;" /></div>

**3. Practical implication: limits of ensemble strategies**

- **Majority voting ineffective**: Because models err together, simple ensembles (e.g., cross-provider **majority voting**) may **help little** on intrinsically hard items—when every “expert” agrees on the wrong answer, voting cannot fix it (Supplementary Fig. 2 and Fig. 9).
- **Value of SDE design**: Scenario grounding makes these correlations visible and reproducible, exposing not only success but **where and why** models fail on discovery tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/figs11-figs12.png" alt="avatar" style="zoom:50%;" /></div>

**4. SDE-hard: the hardest discovery questions**

- **Construction**: Given consensus failures, the authors curated **86 hardest questions** (two per scenario where top models err most), forming **SDE-hard** (Supplementary Fig. 11 and Fig. 12).
- **Model performance**: Standard LLMs all score below **0.12** on this subset.
- **GPT-5-pro breakthrough**:
  - **Exception**: **gpt-5-pro** stands out despite ~12× inference cost—it answers correctly on **9 questions every other model gets wrong** (Fig. 3f, bottom).
  - **Implication**: GPT-5-pro competes on problems needing **extended reasoning**, characteristic of discovery—yet accuracy still has large headroom, making SDE-hard a strong testbed for high–test-time-compute models.

#### Project-level evaluations

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SDE-harness/fig4.png" alt="avatar" style="zoom:50%;" /></div>

##### Establishing LLM evaluation on the scientific discovery loop

**1. Paradigm shift: from single-turn Q&A to iterative loops**

Traditional Q&A benchmarks score one-shot answers to static queries. Real discovery proceeds via iterative loops of hypothesis, test, interpretation, and revision. The authors introduce **`sde-harness`**, a modular framework that formalizes the closed loop of hypothesis, experiment, and observation (Fig. 4a), with the LLM acting as hypothesis generator in place of a human researcher.

**2. Evaluation focus: capabilities static tests miss**

Beyond per-question accuracy, project-level evaluation requires formulating testable hypotheses, running analysis or simulation, and interpreting results toward end-to-end workflows. **`sde-harness`** isolates abilities static Q&A cannot capture—**maintaining state** across rounds, integrating intermediate evidence, and deciding when to branch or abandon a line of inquiry.

**3. Project structure: eight projects, three ingredients**

The team instantiated eight projects across biology, chemistry, materials, and physics, each aligned with SDE question scenarios. Every project defines:

- **(i) Hypothesis space**: e.g., retrosynthetic routes, metal–ligand complexes with target electronic properties, or symbolic expressions of mathematical relations;
- **(ii) Computational oracle or simulator**: maps hypotheses to observations;
- **(iii) Selection rules**: propagate promising hypotheses across iterations.

**4. Simulating authentic discovery**

**`sde-harness`** orchestrates iterative optimization mimicking real discovery cycles. Transparent update rules show how LLMs revise hypotheses over time, separating **iterative reasoning** from **one-shot generation**.

##### Serendipity in LLM-driven optimizations

**1. Large gains on structured-data projects**

LLM integration helps most on projects with abundant structured open data and coding knowledge: protein design, transition-metal complex (TMC) optimization, organic molecule optimization, crystal design, symbolic regression.

**2. Case study: symbolic regression**

In this physics project, models iteratively discover governing equations of nonlinear dynamical systems from data—structured exploration of hypothesis space plus gradual refinement of symbolic form.

- **Reasoning models**: Reasoning-capable models show more effective discovery dynamics (Fig. 4c). **deepseek-R1** and **gpt-5** converge faster and to lower final error than claude-sonnet-4.5 and gpt-5-chat-latest.
- **Sustained improvement**: They reduce error quickly early and keep refining candidate equations over hundreds of iterations—a better **exploration–exploitation** balance in symbolic hypothesis space.
- **Beyond PySR**: Compared to **PySR**, LLM-guided search shows a large gap—PySR has much lower accuracy and higher normalized MSE (NMSE), especially out-of-distribution (OOD).
- **Why it works**: LLMs propose, edit, and recombine symbolic structure with global knowledge-informed search rather than local operator search alone.

**3. Case study: TMC optimization**

In materials science, models search vast chemical space for target properties.

- **Fast convergence**: For maximum **polarisability**, **gpt-5**, **deepseek-R1**, and **claude-sonnet-4.5** converge quickly—locating optima in a space of 1.37M TMCs in under 10 iterations (recommending fewer than 100 molecules) (Fig. 4b).
  - **claude-sonnet-4.5** shows especially strong convergence speed and robustness across initial sets.
- **Pareto frontier**: When exploring polarisability vs HOMO–LUMO gap:
  - **deepseek-R1** yields the broadest, most balanced coverage of “small gap / high polarisability” and “large gap / low polarisability” (Fig. 4b).
  - **claude-sonnet-4.5** is sensitive to initialization, focusing mainly on “large gap / high polarisability”.
- **Role of reasoning**: In both settings, non-reasoning **gpt-5-chat-latest** underperforms its reasoning-enhanced counterparts—highlighting multi-step derivation and reasoning for TMC optimization.

**Connecting question- and project-level performance.**

##### **Performance on scenarios does not always translate to projects.**

A core SDE feature links question- and project-level evaluation through well-defined research scenarios, enabling analysis of how errors propagate from Q&A to downstream discovery (Fig. 1c).

**1. Positive transfer: item skills support project success**

Often, high scores on scenario questions translate to project success:

- **General pattern**: Top models (**gpt-5**) excel at molecular property prediction, SMILES manipulation, genetic perturbation, protein localization, and algebra—so they are strong on **organic molecule optimization**, **gene editing**, **symbolic regression**, and **protein design** (Fig. 4a, Supplementary Fig. 2).
- **Crystal structure discovery**: Despite skepticism about 3D crystal generation without intrinsic SE(3)-equivariant architectures, top reasoning models produce stable, distinct, novel materials—consistent with skill on **PXRD lattice prediction** (Supplementary Table 3).
- **Shared failure**: Poor performance on quantum information and condensed-matter theory questions maps directly to failure on the **Ising model** project; except **deepseek-R1**, most models cannot beat evolutionary baselines (Supplementary Fig. 19).

**2. Striking exceptions: scenario skill does not transfer**

- **Case 1: weak microscopic knowledge, strong macro optimization (TMC project)**
  - **Observation**: No model reliably answers TMC-specific questions (oxidation state, spin, redox potential).
  - **Reversal**: Yet **gpt-5**, **deepseek-R1**, and **claude-sonnet-4.5** efficiently propose high-polarisability molecules and explore the Pareto frontier over 1.37M TMCs (Fig. 4b).
  - **Implication**: **Rigorous explicit structure–property knowledge is not a strict prerequisite** for LLM-driven discovery; recognizing optimization directions and **serendipitous exploration** may matter more.
- **Case 2: strong on theory items, weak in practice (retrosynthesis project)**
  - **Observation**: Top models score highly on retrosynthesis, mechanism, and forward prediction “exam” questions.
  - **Reversal**: They struggle to produce valid multi-step synthesis routes in the project, failing **validity checks** on molecules or reactions often enough that they cannot beat classical retrosynthesis baselines (Supplementary Table 1).
  - **Serendipity**: **gpt-4o** (older, no test-time reasoning) achieves the best project result, beating **gpt-5-chat** and reasoning **gpt-5**.

##### No single model wins on all projects

**1. No definitive hierarchy**

Across eight SDE projects, there is no fixed ranking of models.

- **Rotating leadership**: Models lead on some projects and lag on others.
- **Visualization**: Fig. 4a bar charts normalized performance for gpt-5-chat-latest, gpt-5, deepseek-R1, and claude-sonnet-4.5—bar heights alternate by project.

**2. Composite nature of discovery**

Variability reflects discovery as a **composite** process integrating interdependent scenarios.

- **Weakest-link effect**: Strong project performance requires competence across constituent scenarios; a weak component injects compound uncertainty and drags overall results.

**3. Absence of reasoning benefits**

Expected gains from strong **reasoning enhancements** vanish on some projects.

- **Examples**: **Retrosynthesis** and **protein design** were expected to favor reasoning models, but results show no consistent advantage—targeted **post-training** may be needed.

**4. Less decisive pre-training advantage**

Pretraining corpus advantages appear less decisive on discovery projects than on static question-level tests.

- **DeepSeek-R1**: Slightly weaker on question-level benchmarks (possibly due to Chinese-centric corpora or data mix), yet ranks top-two on almost every reasoning-favorable project—consistent with strong red bars in Fig. 4a.

**5. Distant to scientific “superintelligence”**

Contemporary models remain far from true scientific “superintelligence”.

- **No generalist**: No single model excels on all eight (already limited) discovery themes.
- **Future direction**: Orchestrating discovery loops should prioritize **balanced knowledge** and learning across diverse scenarios over narrow specialization.

### Discussion

**1. Failure of prevailing evaluation paradigms**

Traditional benchmarks track progress on generic scientific questions, but results show they are **insufficient proxies** for discovery ability.

- **Core gap**: Discovery depends on iterative reasoning, hypothesis generation, and evidence interpretation—not static retrieval alone.
- **SDE value**: SDE ties isolated questions to modular scenarios and evaluates end-to-end research orchestration at project level.

**2. Model limits and plateaus**

Discussion revisits key Results themes:

- **High scores, low transfer**: Top scores on decontextualized benchmarks (e.g., GPQA-Diamond) do not guarantee reasoning in SDE scenarios.
- **Diminishing returns**: **Scaling** and **test-time compute** that drove code and math show **diminishing returns** for discovery.
- **Convergent failures**: Top models from different providers correlate strongly in errors, often agreeing on wrong answers on the hardest items—bottlenecks may lie in shared **pretraining distributions**, not architecture alone.

**3. Nonlinear link between questions and projects**

The relationship between “exams” and “projects” is complex:

- **Knowledge vs exploration**: Project performance is not a linear function of Q&A accuracy—**effective navigation of hypothesis space may matter more than precise microscopic knowledge**.
- **Serendipity**: Identifying optimization directions and enabling “lucky” discoveries can offset fine-grained knowledge gaps.
- **Uneven capabilities**: LLMs shine on structured settings (e.g., TMC optimization) but struggle on tasks needing strict long-horizon planning and validity checking (e.g., retrosynthesis).

**4. Actionable avenues**

The authors propose four directions:

1. **Targeted training over blind scaling**: Shift from undifferentiated scale to training focused on **problem formulation** and **hypothesis generation**.
2. **Diversify data sources**: High cross-model error correlation calls for diverse pretraining data and new **inductive biases** to break shared failure modes.
3. **Integrate tool use**: Hard scenarios need tight coupling of language reasoning with domain simulators and structure builders—training and evaluation must go beyond text accuracy to **executable actions**: tool calls, debugging failed executions, and iterative protocol revision from feedback.
4. **RL for scientific reasoning**: Reasoning enhancements tuned for code/math help little on discovery projects—**RL strategies aimed specifically at scientific reasoning** are a promising frontier.

**5. Limitations and outlook**

- **Bias**: The benchmark reflects contributing experts’ interests and methods; earth science, social science, and others are not yet covered.
- **Reproducibility**: Commercial APIs introduce variance—future work should benchmark more local open models.
- **Safety**: More capable biological AI raises biosafety risks, including jailbreaks and misuse paths.

Despite limitations, SDE offers the first comprehensive evaluation spanning the discovery pipeline and a foundation for richer, more realistic benchmarks.

### Methods

#### **Research scenario and question collection**

SDE is not a pile of items but a structured collaboration across biology, chemistry, materials, and physics.

**1. Core architecture: from project to scenario**

As in **Fig. 1c**, collection follows **Domain** $\rightarrow$ **Project** $\rightarrow$ **Scenario** $\rightarrow$ **Question**:

- **Defining scenarios**:
  - **Source**: Expert panels identify **research scenarios** that recur in real discovery workflows and encode foundational reasoning patterns.
  - **Criteria**: Scenarios come from ongoing or past projects—active scientific interests, not textbook drills.
  - **Modularity**: A scenario is a modular unit of scientific reasoning (e.g., “forward reaction prediction” in chemistry) that builds larger projects.

**2. Question generation: hybrid mode**

After fixing key scenarios, experts used **semi-automatic generation** plus **manual curation**:

- **Semi-automated**:
  - Where structured data exist, sample from benchmarks (e.g., GPQA) or open datasets (e.g., NIST) and convert entries to natural-language Q&A via template scripts.
  - Domain pipelines (e.g., **RDKit**) supply reference answers (e.g., molecular descriptors).
- **Manual curation**:
  - Without public structured records—especially **experimental techniques**—experts write questions from a unified template for consistency with semi-automatic items.

**3. Quality control and validation**

- **Expert review**: Panel review with consensus on **validity** and **correctness** before inclusion.
- **Coverage**: At least five validated questions per scenario to reduce variance.
- **Formats**: Multiple choice and short answer; scoring uses exact match, tolerance thresholds (numerics), or similarity (molecular structures) to limit ambiguity.

**4. Dataset statistics**

SDE comprises **43 research scenarios** and **1,125 questions**:

- **Chemistry (276)**: forward reaction prediction, retrosynthesis, property estimation, NMR structure elucidation, experimental techniques, etc.
- **Materials (486)**: corrosion prediction, materials safety, PXRD system and lattice prediction, MOF synthesis and stability, etc.
- **Biology (200)**: enzymatic reaction prediction, protein localization, GWAS causal genes, CRISPR delivery strategies, etc.
- **Physics (163)**: astrophysics and cosmology, quantum information, condensed matter, computational physics, etc.

#### Research project collection

**1. Project architecture and logic**

- **Multi-scenario integration**: **Eight** projects span biology, chemistry, materials, and physics; each integrates several modular scenarios (e.g., retrosynthesis pathway design involves single-step retrosynthesis, mechanism analysis, and forward prediction).
- **Problem formulation**: Each project is a **search or optimization problem**:
  - **Hypothesis space**: LLMs propose hypotheses (molecular structures, symbolic equations, etc.).
  - **Oracle validation**: Simulators score fitness.
  - **Closed-loop feedback**: Results feed back to refine proposals—the loop in Fig. 4a.

**2. Unified optimization workflow (evolutionary optimization)**

Evaluation standardizes on **evolutionary optimization**:

1. **Initialization**: Cold start from the LLM or warm start from a predefined set.
2. **Mutation, crossover, and de novo proposals**: LLMs generate offspring from sampled parents.
3. **Selection**: Keep top hypotheses by fitness among parents and offspring; repeat until convergence or max oracle calls.

**3. Eight research projects in detail**

**Chemistry**

- **Retrosynthesis pathway design**:
  - **Goal**: Plan routes decomposing targets into commercial **building blocks**.
  - **Constraints**: Each step must obey available reaction templates—a **planning problem**.
  - **Data**: USPTO reactions and Chen et al.
- **Molecule optimization**:
  - **Goal**: Search chemical space for structures with optimal properties (e.g., for drug discovery).

**Materials**

- **TMC optimization**:
  - **Challenge**: Combinatorial explosion in ligand choice.
  - **Task**: Under an evolutionary loop, LLMs propose TMCs with target **HOMO–LUMO gap** and **polarisability**—requiring deep transition-metal chemistry.
- **Crystal structure discovery**:
  - **Challenge**: Candidates must satisfy 3D periodicity, valid coordination, charge neutrality, and thermodynamic stability.
  - **Task**: Implicit crossover and mutation on reference parents to generate novel structures with low energy above the hull.

**Biology**

- **Protein sequence optimization**:
  - **Space**: Sequences with 4–250 mutable sites, 20 amino acids each.
  - **Task**: LLMs optimize sequences for oracle-defined fitness.
- **Gene editing**:
  - **Goal**: Find gene subsets whose perturbation yields target phenotypes.
  - **Task**: LLMs **design new experiments** to propose perturbations and discover phenotypes.

**Physics**

- **Symbolic regression**:
  - **Challenge**: Discover mathematical models from observations.
  - **Task**: Find **symbolic equations** matching simulated experimental error.
- **Solving the Ising model**:
  - **Challenge**: Exponential configuration space.
  - **Task**: Mimic human discovery to infer spin configurations minimizing the Ising **Hamiltonian**.

#### Model evaluation

**1. Question-level**

Accuracy across 43 scenarios.

- **Framework**: Custom **`lm-evaluation-harness`** branch; each scenario has a YAML config loading Hugging Face datasets.
- **Decoding**: **Deterministic decoding** by default (`temperature = 0`, `do_sample = false`) for reproducibility.
  - *Exception*: Some models require specific settings (e.g., `gpt-5` only accepts `temperature = 1`).
- **Prompts and format**: Standard prompts require final answers in XML tags (e.g., `<answer>...</answer>`); regex extraction followed by case- and punctuation-insensitive **exact match** in most cases.
- **Domain-specific scoring**:
  - **Chemistry**: **RDKit** canonicalization and **Tanimoto similarity** for structures; tolerance windows for numerics (e.g., redox potentials).
  - **Materials**: Partial credit within 3 $\mathring{A}$ on lattice regression.
  - **Biology**: Tolerant exact match on descriptors (LogP, molecular weight); weighted partial scores for CRISPR delivery.
  - **Physics**: Symbolic verification (`math-verify`)—equivalent expressions score.
- **Aggregation**: Metrics normalized to [0, 1]. Average per scenario, then arithmetic mean within each domain.

**2. Project-level**

Performance on the full hypothesis–experiment–observation loop.

- **Framework**: **`sde-harness`**.
- **Scoring**: Normalize sub-objective scores and average into one project score (Fig. 4a bar charts).
- **Model subset**: Full projects are costly—evaluation covers **gpt-5-chat-latest, gpt-5, claude-sonnet-4.5**, and **deepseek-R1** (best non-reasoning and reasoning variants).

<hr align="left" color="#987cb9" size="1">
