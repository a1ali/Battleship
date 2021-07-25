import { Ship } from "./ship";
import { cellHit, cellMiss, putShipOnBoard } from "./createBoard";

const Gameboard = () => {
    let ships = [];
    let missedAttackArr = [];
    let placesHit = [];
    let occupiedPlaces = [];

    const placeShip = (shipPosArr, ai) => {
        let newShip = Ship(shipPosArr);
        ships.push(newShip);
        putShipOnBoard(shipPosArr, ai);
        shipPosArr.forEach((element) => {
            occupiedPlaces.push(element);
        });
    };

    const receiveAttack = (position, player) => {
        if (
            !missedAttackArr.includes(position) &&
            !placesHit.includes(position) &&
            !allShipSunk()
        ) {
            let hit = false;
            //check each ship if the attack hit
            for (let i = 0; i < ships.length; i++) {
                if (ships[i].isHit(position)) {
                    //change grid color;
                    hit = true;
                    placesHit.push(position);
                    cellHit(position, player);
                    break;
                }
            }
            if (!hit) {
                missedAttackArr.push(position);
                cellMiss(position, player);
                //mark div as miss
            }
            return true;
        } else {
            return false;
        }
    };

    const allShipSunk = () => {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    };

    const randomIntFromInterval = (min, max) => {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const randNum = () => {
        //get a random number between 1-99 with the second digit only being from 1-5
        let start = randomIntFromInterval(1, 5);
        let yPos = randomIntFromInterval(1, 9);
        return parseInt(`${yPos}${start}`);
    };

    const randArr = (board) => {
        //generate an array of length 5 in which the elements do not overlap with other ships
        let start = randNum();
        let arrShip = [];

        while (true) {
            if (!occupiedPlaces.includes(start)) {
                arrShip.push(start);
                start += 1;
                if (arrShip.length === 5) {
                    break;
                }
            } else {
                arrShip = [];
                start = randNum();
            }
        }
        return arrShip;
    };

    const generateCarrier = () => {
        let arr = randArr();
        return arr;
    };

    const generateBattleship = () => {
        let arr = randArr();
        return arr.slice(1, 5);
    };

    const generateDestroyer = () => {
        let arr = randArr();
        return arr.slice(1, 4);
    };

    const generateSubmarine = () => {
        let arr = randArr();
        return arr.slice(1, 4);
    };

    const generatePatrolBoat = () => {
        let arr = randArr();
        return arr.slice(1, 3);
    };

    return {
        placeShip,
        receiveAttack,
        allShipSunk,
        ships,
        occupiedPlaces,
        generateCarrier,
        generateBattleship,
        generateDestroyer,
        generateSubmarine,
        generatePatrolBoat,
    };
};

export { Gameboard };
