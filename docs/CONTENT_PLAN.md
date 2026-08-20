# taddmao.com — Content Plan & Working Notes

> Source-of-truth for the site rebuild. Purpose, structure, copy, and open
> questions. Update this as decisions are made so nothing is lost.

Last updated: 2026-08-19

---

## 1. Purpose & positioning

**Primary (short-term) audience:** PhD admissions committees — Tadd is applying
for **direct-entry PhD programs in November 2026** (currently entering 4th year,
UofT, double major Math + CS, grad April 2027).

**But NOT the only purpose.** The site is a long-lived personal home. So:
research-first framing, but keep the human/creative dimension (music, art, apps).
Positioning in one line:

> **A researcher in AI verification who is also a pianist/violinist and artist.**

NOT "programmer, musician, artist" (current tagline — undersells him).

### Research vision (the differentiator — build the Research page around this)
CORRECTED from Tadd's own notes (`grad-school/my_interests/`). The "verification
won't be replaced by AI" idea is a minor corollary, NOT the motivation. The real
thesis:

> **Can we trust AI? Concretely: how do I know — 100%, not 99.9% — that the AI did
> exactly what I asked (not "kind of", not "that plus extra stuff")?** Tadd's
> interest is in **verifying** AI, not building it.

**Motivation (his words, distilled):**
- AI today is confidently, unaccountably wrong — and dishonest about it. Being
  unable to answer is fine; being confidently wrong with zero accountability is not.
- As AI is embedded into ever more (safety-critical) domains, "we're mostly sure it's
  fine" is not good enough. We should *know what to expect before* scaling, not
  scale-then-recover. Industry optimizes benchmarks/users, not assurance.
- People have no *reason* to trust AI. A trustworthy checker gives one.

**The mechanism / why verification:** if we can verify with 100% certainty a set of
facts A1..An, we get real certainty. In math (the faithfulness frontier), this makes
correctness checkable. In messier settings we may not verify "the sun is yellow," but
we *can* verify a source exists, a claim is consistent with what's cited, and the
reasoning is valid — those facts are still 100% verified. This reframes alignment so
that responsibility **shifts to the human** ("if something breaks, it's provably in
what the human specified"), rather than a vague hope the AI followed the spec. It also
cuts the huge manual-checking effort, and lets us decide *how much* to trust AI via
the checker rather than trusting the AI directly.

**The intellectual arc (his stated progression):**
math faithfulness (the AAAI paper) → formal verification of real-world facts /
provenance & attribution → getting an LLM to generate the faithfulness *spec* from a
vague human prompt (ratifiable intent).

**Positioning (from his field map):** this independently reinvents the core of the
**Guaranteed Safe AI** agenda (world model + safety spec + verifier → auditable proof
certificate). He sits in the **formal camp** (crisp checkable object → prove/disprove),
not the statistical camp (conformal prediction, LLM-as-judge). Advisor **Xujie Si**
sits at the center of this map.

**PUBLIC vs PRIVATE — important:**
- `grad-school/my_interests/field_map.md` is a **PRIVATE strategy doc** (target
  professors to email, honest caveats, white-space strategy). **Do NOT publish it or
  its contents.** It informs framing only.
- The public Research page presents a measured, confident version of the vision above
  — WITHOUT the ranty tone, the target-professor list, or "nobody owns this" strategy
  talk. Cite Guaranteed Safe AI as aligned related work; don't claim to have founded a
  field.

---

## 2. Site structure (planned)

Current pages: Home, Music, Art, Apps.
Planned new/changed:

- **Home** — reframed: name + "Math & CS @ University of Toronto · AI verification
  researcher", short positioning line, headshot, links (GitHub, email, CV).
  Keep the musician/artist line as secondary human texture.
- **Research** (NEW, highest priority) — vision + publications + current projects +
  research experience. The centerpiece for PhD apps.
- **CV** — link to a PDF (public version = NO phone number). Build an academic CV.
- **Music** — keep; add competition results/awards (see below).
- **Art** — keep as-is (already rebuilt with real content).
- **Apps** — keep; maybe surface the more technical projects.
- **About** (optional) — could fold into Home; headshot + short bio + the
  "well-rounded" narrative.

Nav currently: Home / Music / Art / Apps (PageButtons component). Will need to add
Research (and CV link).

---

## 3. Research content

### Publications / papers (status-labeled honestly)

1. **"Does the Proof Prove It That Way? Faithful Formalization of Euclid's Elements
   Proofs"** — **Tadd Mao (first author)**, Tianjun Zhong, Dhruva Arekar, Yuming
   Feng, One An, Jiani Huang, Xujie Si, Ziyang Li.
   - Status: **Preprint on arXiv; under review at AAAI-27** (double-blind — see note).
   - arXiv: https://arxiv.org/abs/2608.15432
   - What it is: Distinguishes formal proofs that merely *compile* from those that
     are **faithful** to the natural-language argument. Defines 5 necessary
     conditions for faithfulness; introduces **Pistis**, an agentic, oracle-guided
     Lean proof-search whose core **OrderDecompose** does faithfulness-preserving
     divide-and-conquer (tracks citation dependencies, blocks unfaithful shortcuts).
     Applied to Euclid's Elements Books 1–3: compiles 33× faster than prior work,
     preferred 2.89× (human reviewers) / 5.2× (LLM judge) as often.
   - Done during **summer 2025 NSERC USRA** with **Prof. Xujie Si (UofT)**, in
     collaboration with **Ziyang Li (JHU)** who co-supervised.

2. **Theory-level faithfulness metric** (with the JHU group / Ziyang Li).
   - Status: **In submission — targeting ICLR (deadline ~end of September 2026).**
   - One-liner: Current faithfulness metrics naively use llm-as-judge approaches and are limited to statement level. At a high level we argue first that theory level faithfulness is necessary to measure faithfulness and that our approach more accurate to grouth truth human expert annotations.

3. **Multi-agent RL** (with Prof. Peter Marbach, UofT; co-author Kirill, UofT undergrad).
   - Status: **In preparation — targeting an October 2026 conference.**
   - We compare in which setting centralized (one network controlling all agents) or decentralized (one network for each agent) is better in a MARL environment. Things like reward variances, the number of tasks agents keep track of, and agent-communication under finite budget to provide justification as to when we should use what approach (dec or cem).

### Current / ongoing research
- **CSC494 research project course (2026–27)** continuing with **Prof. Xujie Si**:
  formalizing the elements, **building a benchmark for judging axiom quality**, and
  working toward **formalizing common sense**.

### ⚠️ THREE DISTINCT RESEARCH THREADS (corrected 2026-08-20 — important)
Tadd has 3 *separate* research efforts; do NOT conflate them:
1. **JHU/UPenn collaboration** (separate group, own meetings). **Ziyang Li (JHU) was
   effectively Tadd's main advisor here**, + UPenn coauthors (Jiani Huang, etc.),
   with Xujie Si also involved. THE AAAI PAPER belongs to this thread, as does the
   eventual **ICLR faithfulness-metric** paper. This is collaborative research,
   distinct from #2.
2. **Tadd's own direction with Xujie Si (UofT)** — NSERC USRA → CSC494. His personal
   agenda: formalizing ALL of Euclid's Elements, axiom-quality benchmark, common sense.
3. **Multi-Agent RL with Peter Marbach (UofT)** — the ROP, ongoing.
→ CV "Research Experience" is now split into these 3 (+ laser scanning). Website
should reflect the same separation.

### ⚠️ FUNDING — integrity note
- **Tadd's personal award = NSERC USRA** (list in Honors). ✅
- The **Amazon Research Award (Fall 2025)** and **Amazon Nova AI Challenge: Trusted
  Software Agents (2026)** are the GROUP/PI's (Ziyang's) funding for the AAAI paper —
  acknowledged in the paper, but **NOT Tadd's personal awards. Do NOT list them in
  Tadd's Honors.** (Paper acknowledgements text on file.)
- Color/SOP-only detail (not CV): methodology used Claude Code heavily; ablations
  alone cost a few thousand USD.

### Past research experience
- **NSERC USRA, UofT, Summer 2025** — Prof. Xujie Si (the AAAI work). (NSERC is also a paid reward (12k$ cad) so this really is work)
- **Multi-Agent RL Research, UofT, Aug 2025–Apr 2026** — Prof. Peter Marbach. (ROP research course)
- **Laser Scanning Research Assistant, UNBC, Summer 2022** — Dr. Wenbo Zheng.
  Built the lab's first laser-scanning accuracy metric (custom MATLAB); wrote an
  onboarding guide.

### Teaching
- **TA for MAT309 (Mathematical Logic), University of Toronto.** Thematically
  on-brand (logic ↔ formal verification) — worth highlighting, not burying. I also am teaching marking and invigilating

---

## 4. Facts / credentials

- Full legal name (ACORN): **Tadd Yuchi Mao**. Goes by **Tadd Mao** (matches paper
  + site) — use "Tadd Mao" on public materials unless a formal doc needs the middle.
- **CONFIRMED from ACORN:**
  - **Mathematics Major** — started 2023 Summer (i.e., entered in Math).
  - **Computer Science Major** — started 2024 Summer, **with Focus in Artificial
    Intelligence (ASFOC1689K)**. → describe as "CS Major (Focus in AI) & Math Major".
    This confirms the story: entered Math, added CS in 2nd year.
- **UNCONFIRMED — degree name:** Likely **Honours B.Sc. (H.B.Sc.)** — UofT A&S 4-yr
  major degrees are normally granted as Honours BSc, but NOT verified from ACORN
  program page. CV currently says "H.B.Sc." — **Tadd to confirm via transcript /
  Graduation & Convocation**; safe fallback is plain "B.Sc."
- **GPA 3.99/4.0**, UofT, Sep 2023 – Apr 2027. Canadian citizen.
- **MAT309 TA:** confirmed **Fall 2026**.
- Selected grades: Theory of Computation 99%, Abstract Math 97%, Group Theory 97%,
  Advanced Calculus 94%, ML 90%.
- Relevant coursework: Mathematical Logic, ML, AI, Real Analysis, Groups &
  Symmetries, Complex Variables, Probability & Stats, ODEs, Data Structures &
  Algorithms, Theory of Computation.

### Honors & awards — CORRECTED against official transcript (2026-08-19)
- **Dean's List Scholar** — 2024, 2025, 2026 (annual; all three completed years).
  ⚠️ The old resume said "Dean's List **with High Honours**, 6 terms incl. Winter
  2023" — that is an OVERCLAIM / impossible (started Fall 2023). Transcript says
  plain "Dean's List Scholar." USE THE TRANSCRIPT VERSION everywhere.
- Innis College Exceptional Achievement Award (2024). (College = **Innis**, confirmed.)
- Later Life Learning Scholarship (2025).
- NSERC USRA (2025) — list as an award too.

### Transcript-verified highlights (use these — they're strong + true)
- **MAT309 Intro Math Logic = 100%** (perfect). Same course he now TAs; logic ↔
  verification. HEADLINE detail.
- Other A+ / marks: Theory of Comp 99, Abstract Math 97, Groups & Symmetry 97,
  Advanced Calc 94, Real Analysis 94, Linear Algebra II 91, ML 90, AI (CSC384) 90,
  Computer Graphics 94, Computer Organization 90, STA237 93, CSC148 93.
- **CSC494 (Fall 2026) official title:** "Auto-formalization of Euclid's Elements,
  supervised by X. Si." Use this exact title.
- Degree program on transcript: **"Bachelor's Degree Program" — NOT labeled
  "Honours."** See timeline note below re: degree name.
- 4th-year (in-progress) courses, all on-brand: Knowledge Representation & Reasoning
  (CSC486), Computational Linguistics (CSC485), Programming Languages (CSC324),
  Topology (MAT327), Graph Theory (MAT332), Natural Language Computing (CSC401),
  Neural Nets & Deep Learning (CSC413), Nonlinear Optimization (APM462), Algorithms
  (CSC373).

### Timeline — CONFIRMED by Tadd (2026-08-19)
- **ROP CSC299Y1 (w/ Marbach, multi-agent RL) = 2025 Fall–2026 Winter = 3rd year**
  (on transcript, final grade 96/A+).
- **NSERC USRA = Summer 2026** (AAAI/formalization work w/ Si). NOT on transcript —
  it's a research internship, not a course. (arXiv id 2608 = Aug 2026, consistent.)
- **CSC494 (w/ Si) = Fall 2026 = 4th year (current).**
- Correct bio order: Prince George → entered UofT in **Math** → added **CS (AI
  focus) in 2nd year** → **ROP w/ Marbach in 3rd year** → **NSERC w/ Si summer 2026**
  → **4th year: CSC494 w/ Si** + applying to direct PhD.
- (Earlier confusion where Claude read NSERC as Summer 2025 from the transcript was
  WRONG — NSERC isn't on the transcript. Fixed to Summer 2026 in CV.)

### Degree name — CONFIRMED: H.B.Sc. (A&S Academic Calendar, HBA/HBSc Requirements)
The official A&S degree-requirements page is explicit:
- HBSc = 20.0 credits + program combo + breadth + **cumulative GPA ≥ 1.85**.
- Plain BSc is ONLY the fallback for final GPA **1.5–1.84**.
- Two Majors both in Science areas (Math + CS) → **HBSc**.
Tadd: 3.99 GPA, CS Major + Math Major → **Honours Bachelor of Science (H.B.Sc.)**.
CV wording "H.B.Sc." is CORRECT. LOCKED — no change.

### Skills (from resume)
- Languages: Python, C/C++, Java, R, MATLAB. (Also Lean — used in the AAAI work.)
- Frameworks: PyTorch, TensorFlow, Scikit-learn, OpenGL, React.
- Tools: Slurm, CUDA, Linux/Unix, Git, Jupyter.
- Natural languages: English, French, Mandarin.

---

## 5. Apps / projects (technical — reinforce CS depth)
- **★ Mathlib contribution (Lean 4) — TOP HIGHLIGHT.** Authored & merged a lemma
  (`Int.closure_eq_zmultiples`) into Mathlib (community core formal-math library);
  wrote the proof independently and refined it through **community review + design
  discussion (Zulip)**. Merged May 2026. Author handle: tdM05.
  PR: https://github.com/leanprover-community/mathlib4/pull/39435
  → Most relevant project for a formal-verification PhD (real merged Lean proof in
  the flagship library). Lead the Projects section with this; also surface on the
  website (Research/Apps).
  Detail-level note: keep CV description tight — venue + independence + community
  collaboration are the signal; the specific lemma (gcd/subgroup Bézout identity) is
  a footnote the PR link carries. Don't overstate the collaboration.
- **Dr. Mario** — reimplemented in **MIPS assembly**, custom audio + difficulty.
  github.com/tdM05/DrMario. (Already on site; has no video.)
- **Full Stack Chef** — 5-person team, Spoonacular API, clean architecture / SOLID /
  design patterns. github.com/tdM05/FullStackChef. (Already on site.)
- **Food Companion** — MediHacks; Kotlin Android front-end; automates patient diet
  plans. devpost + YouTube. (Already on site, with video.)
- **Tadd's Museum** — interactive 3D museum in Unreal Engine 5; assets sculpted in
  Blender. (Already on site, with video.)
- Others on resume (maybe not all needed on site): RAID 4 simulator (C), "AI that
  predicts student learning ability" (Neural Net / IRT / KNN, >75% acc).

---

## 6. Music (keep — human dimension + real accomplishments)
- Already on site: **Rachmaninoff Piano Concerto No. 2, Mvt I** performed as piano
  soloist with the **PGSO** (video embedded). Vivaldi "Summer" with PGYSO. BC Piano
  Provincials submission (Moonlight Sonata I & II, Liszt Ernani paraphrase).
- **NEW awards to add** (first year of university, 2024):
  - **2nd place, OMFA Provincial Finals Concerto Class, Ages 17–18** (2024).
    (Ontario Music Festivals Association virtual finals.)
  - **North York Music Festival:** **"2024 Best Diploma Pianist"** award + trophy +
    **$100 scholarship**. No Dr. Rea Beaumont was my uoft prof at the time (she is uoft prof in piano)
- Instruments: **pianist and violinist**. (oh btw violin I used to play for prince george symphony orchestra, in my hometown prince george, BC.)

---

## 7. Art (DONE — already rebuilt with real content)
- Traditional sketches (China art bootcamp): Fabric, Bucket and Apple, Final Sketch.
- Digital paintings: Cave of Zalarous, Phoenix, Yone book-cover fan art, Portrait on
  iPad, The Abstract, Yoda's motto, Easy.
- 3D models (Three.js): Halo Frigate, The Fourth Eye, Gas Mask.

---

## 8. Links / contact
- Email: **taddmao [at] gmail [dot] com** (obfuscated; phone REMOVED — spam calls).
- GitHub: **github.com/tdM05**
- LinkedIn: **OMIT** — outdated; not useful for academic PhD apps anyway.
- Google Scholar: **not yet** (paper not indexed). Add later.
- ORCID: **not now** (Tadd's call).
- arXiv author page: will exist once indexed.

---

## 9. Assets on hand
- **Headshot:** `public/headshot.jpg` (clean, professional, neutral bg — good for
  academic use). NOTE: currently a large file — compress before final.
- Art images + 3D models already in `public/`.

---

## 10. Open questions for Tadd
1. **ICLR faithfulness-metric paper:** need a 1–2 sentence plain description
   (what it measures / why it matters). done (btw don't wanna reveal too much)
2. **CV:** OK to build an academic-style CV (Publications first)? Public PDF will
   have NO phone number — confirm. yes but let's discuss first
3. **LinkedIn exact URL?** (resume shows `linkedin.com/taddmao` which looks
   incomplete.) no that should be fine.
4. **Multi-agent RL repo link** to include? no not open source yet.
5. **How much of the "in prep / in submission" work to show** vs. hold back? (Lean
   toward showing with honest status labels.) probably vague descriptions of interests.
6. **Create ORCID?** (optional). prob not now.
7. Any **other awards/scholarships** not on the resume? (e.g., entrance scholarships,
   NSERC USRA value.). done.

---

## 10b. LOCKED DECISIONS (from discussion 2026-08-19)

**Papers — how to present (honesty is critical for committees):**
1. **AAAI paper** — Tadd is **first author**. Present prominently, full 8-author
   string as on arXiv, with arXiv link. Status: "preprint; under review at AAAI-27."
2. **ICLR faithfulness metric** — **NOT submitted yet, keep VAGUE.** Present only as
   a research *interest/direction*, not a listed paper. No link. Don't reveal too
   much / don't oversell.
3. **Multi-agent RL** — **in progress, not open source, don't oversell.** Present as
   an ongoing interest/direction, brief. No link.
   → NET: Only the AAAI paper is a real "publication" entry. The other two are
   folded into "research interests / tentative directions," described briefly.

**Research page framing:** keep it BRIEF. It's primarily his **research interests +
some tentative plans**, not a padded publication list. Do NOT oversell in-progress
work.

**Projects/Apps:** REMOVE the weak coursework-level ones (AI-predicts-student-learning,
RAID-4 sim). Keep the stronger showcase projects already on the site.

**Bio (approved outline — Tadd's story):** From **Prince George, BC**. Accepted to
UofT in **Math**, switched into **CS in second year**, got interested in research →
did an **ROP in third year** (Marbach, multi-agent RL), explored other areas, and in
**fourth year** did his **NSERC** (Xujie Si, the AAAI work) while continuing the ROP
research. Now **applying to direct-entry PhD programs**. Keep warm but concise.

**Music additions:** OMFA 2nd place (concerto, 17–18, 2024); North York "2024 Best
Diploma Pianist" + trophy + $100 scholarship. Note: **Dr. Rea Beaumont was his UofT
piano professor** (not the festival organizer). Violin: played for the **Prince George
Symphony Orchestra** in his hometown.

**LinkedIn:** omit. **CV:** discuss before building (still open). **Vision tone:**
decide later ("not now").

---

## 11. Double-blind / preprint policy note (IMPORTANT)
- The AAAI paper is under **double-blind** review. The preprint is already public
  on arXiv, so listing it on the site adds ~no new de-anonymization risk.
- **Do:** list as "preprint / under review at AAAI-27" with the arXiv link;
  describe neutrally.
- **Don't:** run an aggressive promo push (social blasts, contacting reviewers)
  timed to the review window. A CV-style listing is standard passive dissemination.
- **Action item:** double-check the exact AAAI-27 CFP anonymity/prior-publication
  clause to be 100% safe. (Claude could not recite exact wording from memory.)
