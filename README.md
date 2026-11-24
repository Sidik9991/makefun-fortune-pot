# Tuesday — a fortune for a houseplant

An entry for make.fun's **Fortune in a Pot** bounty: one kind, funny fortune for a houseplant, in a single line of at most 120 characters.

![Fortune in a Pot bounty](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9.svg)
![Rank](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9/Sidik9991/makefun-fortune-pot/rank.svg)
![Reward](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9/Sidik9991/makefun-fortune-pot/reward.svg)

Bounty page: [Fortune in a Pot on make.fun](https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9)

## The fortune

> Your newest leaf will unfurl on a Tuesday, and the whole windowsill will pretend not to stare.

## How it works

`main.ts` (Node, no dependencies) holds ten candidate fortunes for a houseplant. Each is scored 0–2 on the judge's five criteria, in the kit's order and weighted 5/4/3/2/1:

1. A fortune for a houseplant, about the plant's own future.
2. Funny in a way a plant lover would laugh at — a small joke that lands.
3. Kind and warm about the plant and its keeper; no doom, no withering, no mockery.
4. The cadence of a prediction, not a slogan or a care instruction.
5. One clean line within 120 characters, no padding.

The highest scorer wins (ties go to the shorter line). The program writes the winner to `/output/entry.txt`, re-reads it, and validates it against the gate — UTF-8, 1–120 characters, not only whitespace, exactly one line — failing loudly on any mismatch.

## Run it

```sh
node main.ts
cat /output/entry.txt
```
