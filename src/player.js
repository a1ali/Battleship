import { Gameboard } from "./gameboard";
import { msg, clearMsg } from "./type";

const Player = (ai) => {
    let attacks = [];
    let board = Gameboard();
    let win = false;

    const createShipsForComputer = () => {
        board.placeShip(board.generateCarrier(), ai);
        board.placeShip(board.generateBattleship(), ai);
        board.placeShip(board.generateDestroyer(), ai);
        board.placeShip(board.generateSubmarine(), ai);
        board.placeShip(board.generatePatrolBoat(), ai);
    };

    const deployFleet = (arr) => {
        board.placeShip(arr, false);
    };

    if (ai) {
        createShipsForComputer();
    }

    const computerMove = (enemy) => {
        if (ai && !enemy.board.allShipSunk() && !board.allShipSunk()) {
            let attackPosition = getRandomLoc(enemy);
            enemy.board.receiveAttack(attackPosition, enemy);
            enemy.attacks.push(attackPosition);
            if (enemy.board.allShipSunk()) {
                clearMsg();
                msg("Defeat! The enemy has destroyed our fleet!");
            }
        }
    };

    const getRandomLoc = (enemy) => {
        let randomLoc = Math.floor(Math.random() * 100) + 1;
        while (enemy.attacks.includes(randomLoc)) {
            randomLoc = Math.floor(Math.random() * 100) + 1;
        }
        return randomLoc;
    };

    const humanMove = (pos, enemy) => {
        if (!ai && !enemy.board.allShipSunk() && !board.allShipSunk()) {
            if (
                !enemy.attacks.includes(pos) &&
                enemy.board.receiveAttack(pos, enemy)
            ) {
                enemy.attacks.push(pos);

                if (enemy.board.allShipSunk()) {
                    clearMsg();
                    msg("Victory! The enemy has been defeated.");
                }
                return true;
            }
        }
    };

    const whoIs = () => {
        if (ai) {
            return "computer";
        }
        return "player";
    };

    let name = whoIs();

    return {
        computerMove,
        humanMove,
        getRandomLoc,
        name,
        attacks,
        board,
        createShipsForComputer,
        deployFleet,
    };
};

export { Player };
