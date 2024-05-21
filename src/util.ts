export function pairwise<A, B>(as: A[], bs: B[]): { a: A; b: B }[] {
  const items = [];
  for (const a of as) {
    for (const b of bs) {
      items.push({ a, b });
    }
  }
  return items;
}

export function shuffle<T>(ts: T[]): T[] {
  const copy = [...ts];
  const random = Math.random;
  copy.sort(() => random() - random());
  return copy;
}

export function range(length: number, start: number = 0) {
  return Array.from(new Array(length).keys()).map((k) => k + start);
}
