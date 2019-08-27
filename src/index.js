import game from "./Game";
import Engine from "./Engine";

game.start();

let engine = new Engine(1000 / 60, game.update.bind(game), game.render.bind(game))

engine.start();

