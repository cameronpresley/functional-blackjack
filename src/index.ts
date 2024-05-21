import { formatDealer, formatPlayers } from "./formatters";
import { Game } from "./models";
import { createGame } from "./setup";

createGame().tap(
  (game) => playGame(game),
  () => console.log("Failed to create the game :(")
);

function playGame(g: Game): void {
  console.log(formatDealer(g.dealer));
  console.log();
  console.log(formatPlayers(g.players));
}
