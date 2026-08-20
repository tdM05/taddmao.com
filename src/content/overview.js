// Overview — personal fields, each with one or more items.
// Uniform shape: every field = { label, side, items: [...] }.
//   side: "right" = content on the left, label on the right (wires go leftward)
//         "left"  = label on the left, content on the right (Music-style)
// Each item: { title, desc, media?, href?, linkText? }
//   media: { type: "image", src, alt } | { type: "video", youtube } | null
// Add items freely — the connector wires are measured at runtime and just work.

export const fields = [
  {
    label: "RESEARCH",
    side: "right",
    items: [
      {
        title: "First-author paper on AI verification",
        desc:
          "Under review at AAAI-27 — a way to check that a computer-verified proof really matches the human idea behind it.",
        media: null,
        href: "https://arxiv.org/abs/2608.15432",
        linkText: "read the preprint",
      },
      {
        title: "NSERC Undergraduate Student Research Award",
        desc:
          "A competitive national award funding a summer of full-time research (2026).",
        media: null,
        href: null,
        linkText: "with Prof. Xujie Si",
      },
    ],
  },
  {
    label: "MUSIC",
    side: "left",
    items: [
      {
        title: "Rachmaninoff Piano Concerto No. 2",
        desc: "First movement, as piano soloist with orchestra.",
        media: { type: "video", youtube: "QQw3YbyWdOQ" },
        size: "lg",
        href: "https://www.youtube.com/watch?v=QQw3YbyWdOQ",
        linkText: "watch",
      },
      {
        title: "Vivaldi — Summer",
        desc:
          "With the Prince George Youth Symphony Orchestra: the advanced players each performed a movement from Vivaldi's Four Seasons as soloists. This was mine.",
        media: { type: "video", youtube: "X775PDQ1uRE" },
        size: "sm",
        href: "https://www.youtube.com/watch?v=X775PDQ1uRE",
        linkText: "watch",
      },
    ],
  },
  {
    label: "ART",
    side: "right",
    items: [
      {
        title: "Still life — charcoal",
        desc: "Traditional graphite & charcoal, from an intensive art program.",
        media: { type: "image", src: "/final-sketch.jpg", alt: "Charcoal still life of a clay pot, apple, and pear" },
        size: "lg",
        href: null,
        linkText: null,
      },
      {
        title: "Cave of Zalarus — digital painting",
        desc: "A digital environment study.",
        media: { type: "image", src: "/cave-of-zalarus.jpg", alt: "Digital painting looking out from inside a glowing cave" },
        size: "sm",
        href: null,
        linkText: null,
      },
      {
        title: "The Fourth Eye — 3D model",
        desc:
          "A character I designed and sculpted in Blender. Drag to look around.",
        media: { type: "model", model: "fourth_eye" },
        size: "sm",
        href: null,
        linkText: null,
      },
    ],
  },
];
