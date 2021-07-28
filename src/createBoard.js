const createBoard = (player, start = 0) => {
    let container = document.createElement("div");
    let numOfCols = 10;
    for (let i = 1; i <= numOfCols * numOfCols; i++) {
        let div = document.createElement("div");
        div.innerText = "";
        div.id = `${i}-${player.name}`;

        //if it is the start board mark the id with start
        if (start == 1) {
            div.id = `${i}-${player.name}-start`;
        }
        div.className = "grids";
        container.appendChild(div);
    }

    let autos = "";
    for (let i = 0; i < numOfCols; i++) {
        autos += "auto ";
    }
    container.className = "grid-container";
    container.style["grid-template-columns"] = autos;
    container.style.display = "grid";
    container.id = `${player.name}-grid`;
    if (start === 1) {
        container.id = `${player.name}-grid-start`;
    }
    return container;
};

const cellHit = (pos, player) => {
    let cell = document.getElementById(`${pos}-${player.name}`);
    cell.style.backgroundColor = "#ff3333";
};

const cellMiss = (pos, player) => {
    let cell = document.getElementById(`${pos}-${player.name}`);
    cell.style.backgroundColor = "#000099";
};

const getCellNum = (id) => {
    return parseInt(id.split("-")[0]);
};

const putShipOnBoard = (posArr, ai) => {
    //!ai allows for only the player board to have colored ships
    //computer ships are not colored and hidden
    if (!ai) {
        posArr.forEach((pos) => {
            let cell = document.getElementById(`${pos}-player`);
            cell.style.backgroundColor = "#595959";
        });
    }
};
export { createBoard, cellHit, cellMiss, getCellNum, putShipOnBoard };
