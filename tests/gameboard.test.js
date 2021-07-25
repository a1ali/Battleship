import { Gameboard } from "../src/gameboard";
import {Player} from "../src/player"

test('check if all ships have sunk', () => {
    //create new gameboard
    let newGameBoard = Gameboard();
    let player = Player(true);
    //place 2 ships
    newGameBoard.placeShip([22,23], true);
    newGameBoard.placeShip([44,45], true);
    //send attack
    newGameBoard.receiveAttack(22, player);
    //send attack at the same spo, playert
    newGameBoard.receiveAttack(22, player);
    newGameBoard.receiveAttack(23, player);
    newGameBoard.receiveAttack(44, player);
    newGameBoard.receiveAttack(44, player);
    newGameBoard.receiveAttack(45, player);

    //check if all ships have sunk
    expect(newGameBoard.allShipSunk()).toBeTruthy();
    expect(newGameBoard.receiveAttack(44)).toBeFalsy();
})