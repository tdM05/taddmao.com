// Timeline — the whole story, grouped by year. Each year has one or more entries.
// Entries within a year are listed in chronological order (top → bottom).
//
// thread: "other" | "research" | "life"   (drives the colored strand/dot)
// when:   optional season/among-year hint ("summer", "fall", "2019–2023", …)
//
// Add/reorder freely — the spine, year nodes, branch wires and reveal all adapt.

// Two categories only. Research is the accent; everything else is neutral.
// Colours are HEX — VS Code shows a colour swatch you can click to edit.
export const threads = {
  research: { label: "Research", color: "#a7858d" },  // muted slate
  other:    { label: "Other",    color: "#96a0a8" },  // neutral grey
};

// progress-bar colour before it reaches the first edge
export const barStart = "#8fa6b3";

// hex "#rrggbb" -> "r, g, b" (used internally for rgba glows/gradients)
export function rgbParts(hex) {
  const h = (hex || "#000").replace("#", "");
  const s = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(s, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export const timeline = [
  {
    year: "2005",
    entries: [
      { thread: "other", text: "Born in Prince George, BC." },
    ],
  },
  {
    year: "2010",
    entries: [
      { thread: "other", text: "Started playing piano." },
    ],
  },
  {
    year: "2015",
    entries: [
      { thread: "other", text: "Started playing violin." },
    ],
  },
  {
    year: "2019–2023",
    entries: [
      { thread: "other", text: "BC piano & violin provincials — runner-up ×4, honorable mention ×4." },
      {
        thread: "other",
        text: "Fell into 3D art — self-taught in Blender, modelling and texturing from scratch.",
        gallery: [
          { type: "model", model: "frigate", caption: "Halo frigate" },
          { type: "model", model: "gas_mask", caption: "Gas mask" },
          { type: "model", model: "fourth_eye", caption: "The Fourth Eye" },
        ],
      },
    ],
  },
  {
    year: "2022",
    entries: [
      { thread: "research", when: "summer", text: "First research experience — laser-scanning rock analysis at UNBC, under Prof. Wenbo Zheng." },
    ],
  },
  {
    year: "2023",
    entries: [
      { thread: "other", text: "ARCT in Piano (RCM); Violin Level 10; Speech Arts Level 9." },
      { thread: "other", text: "Smithers tour with Orchestra North (violin) — with Roxi Dykstra, Simon Macdonald, Yu Yu Liu." },
      { thread: "research", when: "fall", text: "Started my degree at the University of Toronto (Mathematics)." },
    ],
  },
  {
    year: "2024",
    entries: [
      { thread: "research", text: "Transferred into the Computer Science major stream (Focus in AI)." },
      { thread: "other", when: "summer", text: "Piano soloist — Rachmaninoff Concerto No. 2 with the Prince George Symphony Orchestra." },
      {
        thread: "other",
        when: "summer",
        text: "Intensive traditional-art bootcamp in China — weeks of graphite and charcoal from life.",
        gallery: [
          { type: "image", src: "/final-sketch.jpg", caption: "Still life" },
          { type: "image", src: "/bucket-and-apple.jpg", caption: "Bucket & apple" },
          { type: "image", src: "/fabric.jpg", caption: "Fabric" },
        ],
      },
      { thread: "other", text: "Ontario Music Festivals finalist; North York “Best Diploma Pianist.”" },
    ],
  },
  {
    year: "2025",
    entries: [
      { thread: "other", when: "summer", text: "Worked as a server at King's Cafe in Toronto." },
      { thread: "research", when: "fall", text: "First research course at UofT — multi-agent RL, under Prof. Peter Marbach." },
    ],
  },
  {
    year: "2026",
    entries: [
      { thread: "research", when: "summer", text: "NSERC award with Prof. Xujie Si; submitted a first-author paper; met collaborators at JHU & UPenn." },
      { thread: "research", when: "fall", text: "Merged a lemma into Mathlib; TA for MAT309 (Mathematical Logic)." },
    ],
  },
  {
    year: "Now",
    entries: [
      { thread: "research", text: "Preparing further paper submissions and applying for direct-entry PhD programs." },
    ],
  },
];
