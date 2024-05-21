import { Card, Dealer, Player, Rank, Suite } from "./models";
import { Points, scoreHand } from "./rules";

export function formatDealer(dealer: Dealer): string {
  return [
    "Dealer is showing:",
    dealer.value.value.slice(1).map(formatCard).join(","),
  ].join("\n");
}

export function formatScore(score: Points): string {
  if (score.tag === "hard") {
    return `${score.value}`;
  }
  return `${score.value[0]}/${score.value[1]}`;
}
export function formatPlayers(players: Player[]): string {
  return players
    .map((p, index) => {
      return (
        [
          `Player ${index + 1} has: ${formatScore(scoreHand(p.value))}`,
          p.value.value.map(formatCard).join(","),
        ].join("\n") + "\n"
      );
    })
    .join("\n");
}

export function formatCard(card: Card): string {
  const formatSuite = (s: Suite): string => {
    switch (s) {
      case "Clubs":
        return "♣️";
      case "Hearts":
        return "♥️";
      case "Spades":
        return "♠️";
      case "Diamonds":
        return "♦️";
    }
  };
  const formatRank = (r: Rank): string => {
    switch (r) {
      case "Ace":
        return "A";
      case "Jack":
        return "J";
      case "Queen":
        return "Q";
      case "King":
        return "K";
      default:
        return `${r}`;
    }
  };
  return `${formatRank(card.rank)}${formatSuite(card.suite)}`;
}
