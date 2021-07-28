import { createBoard, getCellNum } from "./createBoard";
import { Player } from "./player";
import { game } from "./game";

let newGame = game();
let computerBoard = document.getElementById(`computer-grid`);

computerBoard.addEventListener("click", (e) => {
    if (e.target.id !== "computer-grid") {
        let posId = e.target.id;
        let posNum = getCellNum(posId);
        newGame.playGame(posNum);
    }
});
