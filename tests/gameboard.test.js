import { Gameboard } from "../src/gameboard";

test('check if all ships have sunk', () => {
    //create new gameboard
    let newGameBoard = Gameboard();
    //place 2 ships
    newGameBoard.placeShip([22,23]);
    newGameBoard.placeShip([44,45]);
    //send attack
    newGameBoard.receiveAttack(22);
    //send attack at the same spot
    newGameBoard.receiveAttack(22);
    newGameBoard.receiveAttack(23);
    newGameBoard.receiveAttack(44);
    newGameBoard.receiveAttack(44);
    newGameBoard.receiveAttack(45);

    //check if all ships have sunk
    expect(newGameBoard.allShipSunk()).toBeTruthy();
    expect(newGameBoard.receiveAttack(44)).toBeFalsy();
})