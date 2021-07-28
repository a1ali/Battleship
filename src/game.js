import { createBoard, getCellNum } from "./createBoard";
import { Player } from "./player";
import { gameStart } from "./setBoard";
import { msg, clearMsg, startMsg } from "./type";

const game = () => {
    let playerArea = document.querySelector(".player1");
    let computerArea = document.querySelector(".player2");
    let playerStartBoard = document.querySelector(".player1-start");
    let gameContainer = document.querySelector(".container");
    let resetButton = document.getElementById("reset");
    let shipPlaces = [];
    let playButton = document.getElementById("play");
    let startScreen = document.querySelector(".gameStartScreen");
    let restartButton = document.getElementById('restart');
    let start = gameStart();
    let player = Player(false);
    let computer = Player(true);

    playerArea.appendChild(createBoard(player));
    computerArea.appendChild(createBoard(computer));
    start.createStartBoard(createBoard(player, 1));

    start.createEventListeners();
    startMsg();

    resetButton.addEventListener("click", () => {
        start.resetBoard();
        start.resetCellsWithShip();
    });

    playButton.addEventListener("click", () => {
        if (start.allShipsplaced()) {
            shipPlaces = start.getCellsWithShip();
            startScreen.style.display = "none";
            gameContainer.style.display = "grid";
            player.deployFleet(shipPlaces);
            clearMsg();
            msg("Choose a location to attack.");
        }
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    })
    const playGame = (position) => {
        if (player.humanMove(position, computer)) {
            computer.computerMove(player);
        }
    };

    return { playGame };
};

export { game };
