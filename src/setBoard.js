import { removeItemFromArr } from "./ship";
import { msg, clearMsg } from "./type";

const gameStart = () => {
    const playerStartBoard = document.querySelector(".player1-start");
    const carrier = document.querySelector(".carrier-container");
    const battleship = document.querySelector(".battleship-container");
    const destroyer = document.querySelector(".destroyer-container");
    const sub = document.querySelector(".sub-container");
    const patrolBoar = document.querySelector(".patrol-container");

    function createStartBoard(playerBoard) {
        playerStartBoard.appendChild(playerBoard);
    }

    function createEventListeners() {
        carrier.addEventListener("mousedown", clickEvent);
        carrier.addEventListener("dragstart", dragStart);
        carrier.addEventListener("dragend", dragEnd);

        battleship.addEventListener("mousedown", clickEvent);
        battleship.addEventListener("dragstart", dragStart);
        battleship.addEventListener("dragend", dragEnd);

        destroyer.addEventListener("mousedown", clickEvent);
        destroyer.addEventListener("dragstart", dragStart);
        destroyer.addEventListener("dragend", dragEnd);

        sub.addEventListener("mousedown", clickEvent);
        sub.addEventListener("dragstart", dragStart);
        sub.addEventListener("dragend", dragEnd);

        patrolBoar.addEventListener("mousedown", clickEvent);
        patrolBoar.addEventListener("dragstart", dragStart);
        patrolBoar.addEventListener("dragend", dragEnd);

        // let startBoard = document.querySelector(".player-grid");
        for (let i = 1; i <= 100; i++) {
            let cell = document.getElementById(`${i}-player-start`);
            cell.addEventListener("dragover", dragOver);
            cell.addEventListener("dragenter", dragEnter);
            cell.addEventListener("dragleave", dragLeave);
            cell.addEventListener("drop", dragDrop);
        }
    }

    let item = null;
    let cell = null;
    let cellIndex = "";
    let shipChar = null;
    let placed = false;

    function clickEvent(e) {
        cellIndex = e.target.classList[1].split("")[0];

        cellIndex = parseInt(cellIndex);
        shipChar = e.target.classList[1].split("")[1];
    }

    function dragStart(e) {
        placed = false;
        item = this.id;
        cell = e;
        this.className += " hold";
        setTimeout(() => (this.className = "invisible"), 0);
    }

    function dragEnd() {
        if (!placed) {
            this.className = this.id;
        } else {
            this.className = "invisible";
        }
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }
    function dragLeave() {
        this.className = "grids";
    }
    function dragDrop(e) {
        e.preventDefault();
        let idIndex = parseInt(this.id.split("-")[0]);
        let dragged = document.getElementById(item);
        //if the ship has been placed make the draggable inivisible
        if (changeCellColor(cellIndex, idIndex, shipChar)) {
            dragged.className = "invisible";
            placed = true;
        } else {
            dragged.className = dragged.id;
            placed = false;
        }
    }

    let cellsWithShip = [];
    function changeCellColor(cellIndex, id, shipType) {
        let currShipIndex = [];
        let shipLength = {
            c: 5,
            b: 4,
            d: 3,
            s: 3,
            p: 2,
        };
        let startPos = id - cellIndex + 1;
        let length = shipLength[shipType];

        //make sure that ships are placed properly and a part of the ship does not go onto another row
        if (shipType == "c") {
            startPos = clampCarr(
                cellIndex,
                id,
                shipType,
                shipLength,
                startPos,
                length
            );
        } else if (shipType == "b") {
            startPos = clampBattleship(
                cellIndex,
                id,
                shipType,
                shipLength,
                startPos,
                length
            );
        } else if (shipType == "d") {
            startPos = clampDestroyer(
                cellIndex,
                id,
                shipType,
                shipLength,
                startPos,
                length
            );
        } else if (shipType == "s") {
            startPos = clampDestroyer(
                cellIndex,
                id,
                shipType,
                shipLength,
                startPos,
                length
            );
        } else {
            startPos = clampPatrol(
                cellIndex,
                id,
                shipType,
                shipLength,
                startPos,
                length
            );
        }

        let placed = true;
        //loop through the divs and change the color of the cells to the color of a ship
        for (let i = startPos; i < length + startPos; i++) {
            //if it is not overlapping with another cell
            if (!cellsWithShip.includes(i)) {
                let cell = document.getElementById(`${i}-player-start`);
                cell.style.backgroundColor = "#595959";
                cellsWithShip.push(i);
                currShipIndex.push(i);
            } else {
                //a cell is overlapping with another ships cell
                //remove the coloring that has been done and set placed to false and break
                currShipIndex.forEach((index) => {
                    let overLapCell = document.getElementById(
                        `${index}-player-start`
                    );
                    overLapCell.style.backgroundColor = "#00bfff";
                    cellsWithShip = removeItemFromArr(cellsWithShip, index);
                });
                placed = false;
                break;
            }
        }
        currShipIndex = [];
        if (allShipsplaced()) {
            clearMsg();
            msg("Press play to attack the enemy.");
        }
        if (placed) {
            return true;
        }
        return false;
    }

    function clampCarr(cellIndex, id, shipType, shipLength, startT, lengthT) {
        // clamp right side
        let start = startT;
        let length = lengthT;
        let firstDigit = parseInt(start.toString().split("")[0]);
        let secondDigit = parseInt(start.toString().split("")[1]);
        let idSecondNum = parseInt(id.toString().split("")[1]);
        let idFirstNum = parseInt(id.toString().split("")[0]);

        if (
            (length == 5 && secondDigit > 5) ||
            (length == 5 && isNaN(secondDigit) && firstDigit > 5)
        ) {
            if (!isNaN(secondDigit)) {
                start = parseInt(`${firstDigit}6`);
            } else {
                start = 6;
            }
        }

        // clamp the left side
        if (
            cellIndex > idSecondNum ||
            (isNaN(idSecondNum) && cellIndex > idFirstNum)
        ) {
            console.log("in");
            if (!isNaN(idSecondNum)) {
                start = parseInt(`${idFirstNum}1`);
            } else {
                start = 1;
            }
        }

        if (
            (cellIndex == 1 && secondDigit == 0) ||
            (secondDigit === 0 && firstDigit === 1)
        ) {
            start = parseInt(`${firstDigit - 1}6`);
        }
        return start;
    }

    function clampBattleship(
        cellIndex,
        id,
        shipType,
        shipLength,
        startT,
        lengthT
    ) {
        // clamp right side
        let start = startT;
        let length = lengthT;
        let firstDigit = parseInt(start.toString().split("")[0]);
        let secondDigit = parseInt(start.toString().split("")[1]);
        let idSecondNum = parseInt(id.toString().split("")[1]);
        let idFirstNum = parseInt(id.toString().split("")[0]);

        if (
            (length == 4 && secondDigit > 6) ||
            (length == 4 && isNaN(secondDigit) && firstDigit > 6)
        ) {
            if (!isNaN(secondDigit)) {
                start = parseInt(`${firstDigit}7`);
            } else {
                start = 7;
            }
        }

        // clamp the left side
        if (
            cellIndex > idSecondNum ||
            (isNaN(idSecondNum) && cellIndex > idFirstNum)
        ) {
            console.log("in");
            if (!isNaN(idSecondNum)) {
                start = parseInt(`${idFirstNum}1`);
            } else {
                start = 1;
            }
        }

        if (
            (cellIndex == 1 && secondDigit == 0) ||
            (secondDigit === 0 && firstDigit === 1)
        ) {
            start = parseInt(`${firstDigit - 1}7`);
        }
        return start;
    }

    function clampDestroyer(
        cellIndex,
        id,
        shipType,
        shipLength,
        startT,
        lengthT
    ) {
        // clamp right side
        let start = startT;
        let length = lengthT;
        let firstDigit = parseInt(start.toString().split("")[0]);
        let secondDigit = parseInt(start.toString().split("")[1]);
        let idSecondNum = parseInt(id.toString().split("")[1]);
        let idFirstNum = parseInt(id.toString().split("")[0]);

        if (
            (length == 3 && secondDigit > 7) ||
            (length == 3 && isNaN(secondDigit) && firstDigit > 7)
        ) {
            if (!isNaN(secondDigit)) {
                start = parseInt(`${firstDigit}8`);
            } else {
                start = 8;
            }
        }

        // clamp the left side
        if (
            cellIndex > idSecondNum ||
            (isNaN(idSecondNum) && cellIndex > idFirstNum)
        ) {
            console.log("in");
            if (!isNaN(idSecondNum)) {
                start = parseInt(`${idFirstNum}1`);
            } else {
                start = 1;
            }
        }

        if (
            (cellIndex == 1 && secondDigit == 0) ||
            (secondDigit === 0 && firstDigit === 1)
        ) {
            start = parseInt(`${firstDigit - 1}8`);
        }
        return start;
    }

    function clampPatrol(cellIndex, id, shipType, shipLength, startT, lengthT) {
        // clamp right side
        let start = startT;
        let length = lengthT;
        let firstDigit = parseInt(start.toString().split("")[0]);
        let secondDigit = parseInt(start.toString().split("")[1]);
        let idSecondNum = parseInt(id.toString().split("")[1]);
        let idFirstNum = parseInt(id.toString().split("")[0]);

        if (
            (length == 2 && secondDigit > 8) ||
            (length == 2 && isNaN(secondDigit) && firstDigit > 8)
        ) {
            if (!isNaN(secondDigit)) {
                start = parseInt(`${firstDigit}9`);
            } else {
                start = 9;
            }
        }

        // clamp the left side
        if (
            cellIndex > idSecondNum ||
            (isNaN(idSecondNum) && cellIndex > idFirstNum)
        ) {
            console.log("in");
            if (!isNaN(idSecondNum)) {
                start = parseInt(`${idFirstNum}1`);
            } else {
                start = 1;
            }
        }

        if (
            (cellIndex == 1 && secondDigit == 0) ||
            (secondDigit === 0 && firstDigit === 1)
        ) {
            start = parseInt(`${firstDigit - 1}9`);
        }
        return start;
    }

    function allShipsplaced() {
        let totalCellsUsed = 5 + 4 + 3 + 3 + 2;
        if (cellsWithShip.length == totalCellsUsed) {
            return true;
        } else {
            return false;
        }
    }

    function resetBoard() {
        cellsWithShip.forEach((index) => {
            let cell = document.getElementById(`${index}-player-start`);
            cell.style.backgroundColor = "#00bfff";
        });
        carrier.className = "carrier-container";
        battleship.className = "battleship-container";
        destroyer.className = "destroyer-container";
        sub.className = "sub-container";
        patrolBoar.className = "patrol-container";
    }

    function resetCellsWithShip() {
        cellsWithShip = [];
    }

    function getCellsWithShip() {
        return cellsWithShip;
    }

    return {
        createStartBoard,
        createEventListeners,
        allShipsplaced,
        resetBoard,
        resetCellsWithShip,
        getCellsWithShip,
    };
};
export { gameStart };
