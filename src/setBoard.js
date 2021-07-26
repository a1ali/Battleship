const playerStartBoard = document.querySelector(".player1-start");
const carrier = document.querySelector(".carrier-container");
const battleship = document.querySelector(".battleship-container");
const destroyer = document.querySelector(".destroyer-container");
const sub = document.querySelector(".sub-container");
const patrolBoar = document.querySelector(".patrol-container");

export function createStartBoard(playerBoard) {
    playerStartBoard.appendChild(playerBoard);
}

export function createEventListeners() {
    carrier.addEventListener("mousedown", clickEvent);
    carrier.addEventListener("dragstart", dragStart);
    carrier.addEventListener("dragend", dragEnd);

    battleship.addEventListener("dragstart", dragStart);
    battleship.addEventListener("dragend", dragEnd);

    destroyer.addEventListener("dragstart", dragStart);
    destroyer.addEventListener("dragend", dragEnd);

    sub.addEventListener("dragstart", dragStart);
    sub.addEventListener("dragend", dragEnd);

    patrolBoar.addEventListener("dragstart", dragStart);
    patrolBoar.addEventListener("dragend", dragEnd);

    // let startBoard = document.querySelector(".player-grid");
    for (let i = 1; i <= 100; i++) {
        let cell = document.getElementById(`${i}-player`);
        cell.addEventListener("dragover", dragOver);
        cell.addEventListener("dragenter", dragEnter);
        cell.addEventListener("dragleave", dragLeave);
        cell.addEventListener("drop", dragDrop);
    }
}

let item = null;
let cell = null;
let cellIndex = "hello";
let shipChar = null;

function clickEvent(e) {
    //console.log(e.target.classList[1])
    cellIndex = e.target.classList[1].split("")[0];
    //console.log(cellIndex)
    cellIndex = parseInt(cellIndex);
    shipChar = e.target.classList[1].split("")[1];
    //console.log(shipChar)
}

function dragStart(e) {
    //console.log("start");
    item = e.target;
    cell = e;
    //console.log(e)
    this.className += " hold";
    setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd(name) {
    //console.log(this.id);
    this.className = this.id;
}

function dragOver(e) {
    e.preventDefault();
    // console.log(e)
}

function dragEnter(e) {
    e.preventDefault();
    this.className += " hovered";
}
function dragLeave() {
    this.className = "grids";
}
function dragDrop(e) {
    e.preventDefault();
    // console.log(e.target.id);
    // console.log(cellIndex)
    // console.log(this.id.split('-')[0])
    let idIndex = parseInt(this.id.split("-")[0]);
    //console.log(idIndex)
    changeCellColor(cellIndex, idIndex, shipChar);
}

function changeCellColor(cellIndex, id, shipType) {
    let shipLength = {
        c: 5,
        b: 4,
        d: 3,
        s: 3,
        p: 2,
    };
    let start = (id - cellIndex) + 1;
    let length = shipLength[shipType];
    let firstDigit = parseInt(start.toString().split("")[0]);
    let secondDigit = parseInt(start.toString().split("")[1]);

    if (
        (length == 5 && secondDigit > 5) ||
        (length == 5 && isNaN(secondDigit) && firstDigit > 5)
    ) {
        if (!isNaN(secondDigit)) {
            start = parseInt(`${firstDigit}6`);
        }
        else {
            start = 6;
        }
    }

    if (cellIndex == 1 && secondDigit == 0 || secondDigit === 0 && firstDigit === 1) {
        start = parseInt(`${firstDigit - 1}6`);
    }
    //start = clampCarr(cellIndex, id, shipLength, shipType );
    for (let i = start; i < length + start; i++) {
        let cell = document.getElementById(`${i}-player`);
        cell.style.backgroundColor = "#595959";
    }
}

// function clampCarr(cellIndex ,id, shipLength, shipType) {
//     let start = (id - cellIndex) + 1;
//     let length = shipLength[shipType];
//     let firstDigit = parseInt(start.toString().split("")[0]);
//     let secondDigit = parseInt(start.toString().split("")[1]);
//     if (
//         (length == 5 && secondDigit > 5) ||
//         (length == 5 && isNaN(secondDigit) && firstDigit > 5)
//     ) {
//         if (!isNaN(secondDigit)) {
//             start = parseInt(`${firstDigit}6`);
//         }
//         else {
//             start = 6;
//         }
//     }

//     if (cellIndex == 1 && secondDigit == 0 || secondDigit === 0 && firstDigit === 1) {
//         start = parseInt(`${firstDigit - 1}6`);
//     }

//     return start;
// }


