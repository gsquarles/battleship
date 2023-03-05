
import gameBoard from "./factories/gameBoard";
import shipFactory from "./factories/shipFactory";
import player from "./factories/player";
import {playNewGame, renderGrid} from "./gameboardView"
import { createFleet, SHIP_TYPES } from "./helper/helper";
import { elements } from "./base";
import game from "./factories/game";

let game1 = game();
game1.renderFleets();
game1.renderGrids();
game1.autoPlacePlayerShipsEventListener();
game1.addPlayAgainEvent();


