import { Player } from "../src/player";

test('check if get random loc works', () => {
    let computer = Player(true);
    expect(computer.getRandomLoc()).toBeLessThanOrEqual(100);
})