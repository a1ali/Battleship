import { createBoard, getCellNum } from "./createBoard";
import { Player } from "./player";
import {game} from "./game"

// let playerArea = document.querySelector(".player1");
// let computerArea = document.querySelector(".player2");

// let player = Player(false);
// let computer = Player(true);
// playerArea.appendChild(createBoard(player));
// computerArea.appendChild(createBoard(computer));
// player.createShipsForComputer();

// let playerBoard = document.getElementById(`${player.whoIs()}-grid`);

let newGame = game();
let computerBoard = document.getElementById(`computer-grid`);


computerBoard.addEventListener("click", (e) => {
    //console.log(e.target.id)
    if (e.target.id !== 'computer-grid') {
        let posId = e.target.id;
        //console.log(posId);
        let posNum = getCellNum(posId)
        newGame.playGame(posNum);  
    }
    // let posId = e.target.id;
    // //console.log(posId);
    // let posNum = getCellNum(posId)
    // newGame.playGame(posNum);
    // player.humanMove(getCellNum(posId), computer);

});
