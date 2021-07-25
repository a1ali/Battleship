import { Gameboard } from "./gameboard";

const Player = (ai) => {
    let attacks = [];
    let board = Gameboard();

    const createShipsForComputer = () => {
        board.placeShip(board.generateCarrier(), ai);
        board.placeShip(board.generateBattleship(), ai);
        board.placeShip(board.generateDestroyer(), ai);
        board.placeShip(board.generateSubmarine(), ai);
        board.placeShip(board.generatePatrolBoat(), ai);
    };

    if (ai) {
        createShipsForComputer();
    }

    const computerMove = (enemy) => {
        if (ai) {
            let attackPosition = getRandomLoc(enemy);
            enemy.board.receiveAttack(attackPosition, enemy);
            enemy.attacks.push(attackPosition);
            if (enemy.board.allShipSunk()) {
                console.log("game over Computer Wins");
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
        if (!ai) {
            if (!enemy.attacks.includes(pos) && enemy.board.receiveAttack(pos, enemy)) {
                enemy.attacks.push(pos);
                // enemy.board.receiveAttack(pos, enemy);
                
                if (enemy.board.allShipSunk()) {
                    console.log("game over player wins");
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
    };
};

export { Player };
