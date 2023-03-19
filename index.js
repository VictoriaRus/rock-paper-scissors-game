import Game from "./classes/Game.js";
import HMACGenerator from "./classes/HMACGenerator.js";
import GameLogic from "./classes/GameLogic.js";
import TableService from "./classes/TableService.js";

const args = process.argv.splice(2);

const tableService = new TableService();
const gameInstance = new Game(tableService);
const gameLogic = new GameLogic();
const hmacGenerator = new HMACGenerator("sha256", 256, "hex");

gameInstance.start(args, "?", "0", "Computer", "You", 4, hmacGenerator, gameLogic);