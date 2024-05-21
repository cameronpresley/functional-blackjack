export const ranks = [
  "Ace",
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "Jack",
  "Queen",
  "King",
] as const;
export type Rank = (typeof ranks)[number];
export const suites = ["Hearts", "Clubs", "Spades", "Diamonds"] as const;
export type Suite = (typeof suites)[number];
export type Card = { rank: Rank; suite: Suite };
export type Deck = { tag: "deck"; value: Card[] };
export type Hand = { tag: "hand"; value: Card[] };
export type Player = { tag: "player"; value: Hand };
export type Dealer = { tag: "dealer"; value: Hand };
export type Game = { deck: Deck; dealer: Dealer; players: Player[] };
