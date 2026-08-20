// Timeline nodes — the "construction" that replaces a prose bio.
// Each node: year, title, desc, optional tags, optional media, optional link.
// media types: { type: "image", src, alt } | { type: "video", youtube } | null
// Placeholders included; edit/add freely.

export const timeline = [
  {
    year: "2023",
    title: "Prince George → Toronto",
    desc: "Entered the University of Toronto in Mathematics.",
    media: null,
    tags: ["Math"],
  },
  {
    year: "2024",
    title: "Into Computer Science",
    desc: "Added the CS major (Focus in AI). Got hooked on research.",
    media: null,
    tags: ["CS · AI"],
  },
  {
    year: "2025",
    title: "First research — multi-agent RL",
    desc:
      "ROP with Prof. Peter Marbach: when is centralized vs. decentralized control better in multi-agent systems?",
    media: null,
    tags: ["Reinforcement learning"],
  },
  {
    year: "2026 · summer",
    title: "NSERC — formalizing mathematics",
    desc:
      "Faithful formalization of Euclid's Elements in Lean, with Prof. Xujie Si. First-authored an AAAI-27 submission.",
    media: null,
    tags: ["Lean", "NSERC", "AAAI-27"],
    link: { href: "https://arxiv.org/abs/2608.15432", text: "arXiv" },
  },
  {
    year: "2026 · fall",
    title: "Mathlib & CSC494",
    desc:
      "Merged a proof into Mathlib; continuing the formalization work as a project course.",
    media: null,
    tags: ["Mathlib"],
    link: { href: "https://github.com/leanprover-community/mathlib4/pull/39435", text: "PR #39435" },
  },
  {
    year: "next",
    title: "Applying — direct PhD",
    desc: "AI verification. Trust what's proven, not what's claimed.",
    media: null,
    tags: [],
  },
];
