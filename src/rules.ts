import { Card, Hand } from "./models";

export type Hard = { tag: "hard"; value: number };
export type Soft = { tag: "soft"; value: [number, number] };

export type Points = Hard | Soft;

export function cardToPoints(c: Card): Points {
  switch (c.rank) {
    case "Ace":
      return { tag: "soft", value: [1, 11] };
    case "Jack":
      return { tag: "hard", value: 10 };
    case "Queen":
      return { tag: "hard", value: 10 };
    case "King":
      return { tag: "hard", value: 10 };
    default:
      return { tag: "hard", value: c.rank };
  }
}

function addPoints(a: Points, b: Points): Points {
  if (a.tag === "hard" && b.tag === "hard") {
    return { tag: "hard", value: a.value + b.value };
  }
  if (a.tag === "hard" && b.tag === "soft") {
    const [low, high] = b.value;
    return { tag: "soft", value: [a.value + low, a.value + high] };
  }
  if (a.tag === "soft" && b.tag === "hard") {
    const [low, high] = a.value;
    return { tag: "soft", value: [b.value + low, b.value + high] };
  }
  const [aLow, aHigh] = a.value as [number, number];
  const [bLow, _] = b.value as [number, number];
  return { tag: "soft", value: [aLow + bLow, aHigh + bLow] };
}

export function scoreHand({ value }: Hand): Points {
  return value.map(cardToPoints).reduce(addPoints, { tag: "hard", value: 0 });
}
