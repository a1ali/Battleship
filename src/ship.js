const Ship = (posArr) => {
    //position array wil contain div number where the ship is located
    let positionArr = posArr;

    // const removeItemFromArr = (arr, item) => {
    //     let index = arr.indexOf(item);
    //     if (index > -1) {
    //         arr.splice(index, 1);
    //     }
    //     return arr;
    // };

    const isHit = (pos) => {
        if (positionArr.includes(pos)) {
            hit(pos);
            return true;
        }
        return false;
    };

    const hit = (pos) => {
        //remove the position from positionArr
        positionArr = removeItemFromArr(positionArr, pos);
    };

    const isSunk = () => {
        if (positionArr.length === 0) {
            return true;
        }
        return false;
    };

    const getPos = () => positionArr;

    return { isHit, isSunk, getPos, positionArr };
};

const removeItemFromArr = (arr, item) => {
    let index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

export { Ship, removeItemFromArr };
