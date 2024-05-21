import {
  Card,
  Dealer,
  Deck,
  Game,
  Hand,
  Player,
  ranks,
  suites,
} from "./models";
import { Option } from "./option";
import { range, shuffle } from "./util";

function createDeck(): Deck {
  const cards: Card[] = [];
  for (const r of ranks) {
    for (const s of suites) {
      cards.push({ rank: r, suite: s });
    }
  }
  return { tag: "deck", value: cards };
}

function shuffleDeck({ value }: Deck): Deck {
  return {
    tag: "deck",
    value: shuffle(value),
  };
}

function draw({ value }: Deck): Option<{ card: Card; deck: Deck }> {
  if (!value.length) {
    return Option.none();
  }
  return Option.some({
    card: value[0],
    deck: { tag: "deck", value: value.slice(1) },
  });
}

function drawHand(deck: Deck): Option<{ hand: Hand; deck: Deck }> {
  const state = { hand: [] as Card[], deck: deck };

  const updateState = (
    result: { card: Card; deck: Deck },
    state: { hand: Card[] }
  ) => ({
    hand: state.hand.concat(result.card),
    deck: result.deck,
  });

  return Option.some(state)
    .bind((s) => draw(s.deck).map((t) => updateState(t, s)))
    .bind((s) => draw(s.deck).map((t) => updateState(t, s)))
    .map((s) => ({
      hand: { tag: "hand", value: s.hand },
      deck: s.deck,
    }));
}

function createDealer(deck: Deck): Option<{ dealer: Dealer; deck: Deck }> {
  return drawHand(deck).map((s) => ({
    dealer: { tag: "dealer", value: s.hand },
    deck: s.deck,
  }));
}

function createPlayer(deck: Deck): Option<{ player: Player; deck: Deck }> {
  return drawHand(deck).map((s) => ({
    player: { tag: "player", value: s.hand },
    deck: s.deck,
  }));
}

function createPlayers(
  deck: Deck,
  playerCount: number
): Option<{ players: Player[]; deck: Deck }> {
  const updateState = (input: { player: Player; deck: Deck }, state: any) => {
    return { players: state.players.concat(input.player), deck: input.deck };
  };

  const state = Option.some({ players: [] as Player[], deck: deck });

  return range(playerCount).reduce((acc, _) => {
    return acc.bind((state) =>
      createPlayer(state.deck).map((r) => updateState(r, state))
    );
  }, state);
}

export function createGame(): Option<Game> {
  return Option.some(createDeck())
    .map(shuffleDeck)
    .bind(createDealer)
    .bind((state) => {
      return createPlayers(state.deck, 4).map((t) => ({
        deck: t.deck,
        players: t.players,
        dealer: state.dealer,
      }));
    });
}
