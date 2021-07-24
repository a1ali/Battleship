import { Ship } from "./ship";

const Gameboard = () => {
    let ships = [];
    let missedAttackArr = [];

    const placeShip = (shipPosArr) => {
        let newShip = Ship(shipPosArr);
        ships.push(newShip);
    };

    const receiveAttack = (position) => {
        if (!missedAttackArr.includes(position)) {
            let hit = false;
            //check each ship if the attack hit
            for (let i = 0; i < ships.length; i++) {
                if (ships[i].isHit(position)) {
                    //change grid color;
                    hit = true;
                    break;
                }
            }
            if (!hit) {
                missedAttackArr.push(position);
                //mark div as miss
            }
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

    return {placeShip, receiveAttack, allShipSunk}
};

export {Gameboard}
