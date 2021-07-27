import { createBoard, getCellNum } from "./createBoard";
import { Player } from "./player";
import { createStartBoard, createEventListeners } from "./setBoard";



const game = () => {

    let playerArea = document.querySelector(".player1");
    let computerArea = document.querySelector(".player2");
    let playerStartBoard = document.querySelector(".player1-start");
    let gameContainer = document.querySelector(".container");

    let player = Player(false);
    let computer = Player(true);
    //start board 
    createStartBoard(createBoard(player));
    // setTimeout(() => createEventListeners(), 0);
    createEventListeners();
    // playerStartBoard.appendChild(createBoard(player));

    //game board
    //originially gameContainer display is set to none
    playerArea.appendChild(createBoard(player));
    computerArea.appendChild(createBoard(computer));
    // player.createShipsForComputer();

    const playGame = (position) => {
        console.log(position)
        if (player.humanMove(position, computer)) {
            computer.computerMove(player)
        }
        // computer.computerMove(player)
        
    }

    return {playGame}
}

export {game};