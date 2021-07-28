import { createBoard, getCellNum } from "./createBoard";
import { Player } from "./player";
// import { createStartBoard, createEventListeners } from "./setBoard";
import { gameStart } from "./setBoard";
import { msg, clearMsg } from "./type";


const game = () => {

    let playerArea = document.querySelector(".player1");
    let computerArea = document.querySelector(".player2");
    let playerStartBoard = document.querySelector(".player1-start");
    let gameContainer = document.querySelector(".container");
    let resetButton = document.getElementById('reset');
    let shipPlaces = [];
    let playButton = document.getElementById('play');
    let startScreen = document.querySelector('.gameStartScreen');
    // let typeLetter = type();

    let start = gameStart();
    let player = Player(false);
    let computer = Player(true);

    playerArea.appendChild(createBoard(player));
    computerArea.appendChild(createBoard(computer));
    //start board 
    //typeLetter.msg('Admiral deploy your fleet by dragging and dropping on to the grid!');
    start.createStartBoard(createBoard(player, 1));
    // setTimeout(() => createEventListeners(), 0);
    start.createEventListeners();

    msg('Admiral, deploy your fleet by dragging and dropping ships on to the grid!');
    //msg('Admiral deploy your fleet by dragging and dropping on to the grid!');
    // playerStartBoard.appendChild(createBoard(player));
    resetButton.addEventListener('click', () => {
        //console.log(start, 'in event')
         start.resetBoard();
         start.resetCellsWithShip();
         //console.log(start);
         //console.log(start.cellsWithShip)
        })

    playButton.addEventListener('click', () => {
        shipPlaces = start.getCellsWithShip();
        //console.log(shipPlaces);
        startScreen.style.display = 'none';
        gameContainer.style.display = 'grid';
        player.deployFleet(shipPlaces);
        clearMsg();
        msg('Choose a location to attack.')
        // playerArea.appendChild(createBoard(player));
        // computerArea.appendChild(createBoard(computer));
        // player.deployFleet(shipPlaces);
    })

    //game board
    //originially gameContainer display is set to none
    // playerArea.appendChild(createBoard(player));
    // computerArea.appendChild(createBoard(computer));
    //player.deployFleet(shipPlaces);

    const playGame = (position) => {
        //console.log(position)
        if (player.humanMove(position, computer)) {
            computer.computerMove(player)
        }
        // computer.computerMove(player)
        
    }

    return {playGame}
}

export {game};