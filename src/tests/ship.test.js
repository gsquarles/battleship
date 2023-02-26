import shipFactory from "../factories/shipFactory";
describe("Testing that ship factory function works",() => {
    it("ship takes an length parameter and the ship object has that length set", () =>{
        let ship1 = shipFactory(3);
        expect(ship1.length).toBe(3);
    })

    it("ship Object has a hits function that adds number of hits", () =>{
        let ship1 = shipFactory(3);
        ship1.hit();
        ship1.hit();
        expect(ship1.numOfHits).toBe(2);
    })

    it("ship isSunk function works", ()=> {
        let ship1 = shipFactory(3);
        ship1.hit();
        ship1.hit();
        ship1.hit();
        ship1.isSunk();
        expect(ship1.sunk).toBe(true);
    })
})