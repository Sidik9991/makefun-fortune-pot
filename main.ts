// Fortune in a Pot — make.fun bounty entry
// Slug: u-golden-heron-44-fortune-in-a-pot-ded981e9
//
// Writes one kind, funny fortune for a houseplant to /output/entry.txt.
// Candidates are scored 0-2 on the judge's five criteria, in the kit's
// order, weighted 5/4/3/2/1:
//   1. A fortune for a houseplant, about the plant's own future.
//   2. Funny in a way a plant lover would laugh at; a small joke that
//      lands rather than a pun groaned at.
//   3. Kind and warm about the plant and its keeper; no doom, no
//      withering, no mockery.
//   4. Sounds like a fortune, with the cadence of a prediction.
//   5. One clean line within 120 characters, no padding.
// The highest scorer wins; ties go to the shorter line, then to the
// earlier candidate. The winner is re-validated against the gate
// (UTF-8, 1-120 characters, not only whitespace, exactly one line)
// after writing, and any failure aborts loudly.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  scores: [number, number, number, number, number];
};

const WEIGHTS = [5, 4, 3, 2, 1] as const;

const CANDIDATES: Candidate[] = [
  {
    text: "Your newest leaf will unfurl on a Tuesday, and the whole windowsill will pretend not to stare.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    text: "A tall stranger with a watering can will enter your life, and you will pretend you were not thirsty.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    text: "You will soon lean toward the light, and the light, flattered, will lean a little toward you.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    text: "Great growth is coming: one new root, one brave sprout, and a keeper who finally rotates the pot.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    text: "Beware the cat on Thursday. She has plans for your leaves, and none of them are kind.",
    scores: [2, 1, 0, 2, 2],
  },
  {
    text: "You will be watered twice this week and loved constantly, which is the correct ratio.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    text: "Your future holds a bigger pot, a sunnier sill, and a keeper humming slightly off-key.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    text: "Soon you will photosynthesize so smugly that the fern across the room asks for your secret.",
    scores: [2, 2, 1, 2, 2],
  },
  {
    text: "A ladybug will visit at noon, bringing luck, gossip, and absolutely no aphids.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    text: "You will outgrow your pot by spring, and your keeper will brag about it like it was their idea.",
    scores: [2, 2, 2, 2, 1],
  },
];

function weighted(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best: Candidate | null = null;
  for (const c of candidates) {
    if (
      best === null ||
      weighted(c) > weighted(best) ||
      (weighted(c) === weighted(best) && c.text.length < best.text.length)
    ) {
      best = c;
    }
  }
  if (best === null) throw new Error("no candidates to score");
  return best;
}

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`gate fail: ${chars} characters, need 1-120`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate fail: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate fail: entry must be exactly one line");
  }
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  validate(winner.text);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");

  const back = readFileSync("/output/entry.txt", "utf8");
  validate(back);
  if (back !== winner.text) {
    throw new Error("gate fail: /output/entry.txt does not match the winner");
  }

  console.log(
    `winner (${weighted(winner)}/30, ${[...winner.text].length} chars): ${winner.text}`,
  );
}

main();
