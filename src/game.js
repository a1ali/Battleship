import { createBoard, getCellNum } from "./createBoard";
import { Player } from "./player";




const game = () => {

    let playerArea = document.querySelector(".player1");
    let computerArea = document.querySelector(".player2");

    let player = Player(false);
    let computer = Player(true);
    playerArea.appendChild(createBoard(player));
    computerArea.appendChild(createBoard(computer));
    player.createShipsForComputer();

    const playGame = (position) => {
        console.log(position)
        player.humanMove(position, computer)
        computer.computerMove(player)
        
    }

    return {playGame}
}

export {game};