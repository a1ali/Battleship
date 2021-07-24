import { Ship } from "../src/ship";

test("check if isHit works fine", () => {
    let newShip = Ship([22, 23, 24, 25]);
    expect(newShip.isHit(23)).toBeTruthy();
    expect(newShip.isHit(22)).toBeTruthy();
    expect(newShip.isHit(25)).toBeTruthy();
    expect(newShip.isHit(33)).toBeFalsy();
    expect(newShip.isHit(24)).toBeTruthy();
    expect(newShip.isHit(24)).toBeFalsy();
});

test("test isSunk", () => {
    let newShip = Ship([22]);
    newShip.isHit(22);
    expect(newShip.isSunk()).toBeTruthy();
});
