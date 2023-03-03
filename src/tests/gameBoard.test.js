import gameBoard from "../factories/gameBoard";
import shipFactory from "../factories/shipFactory";

describe('GameBoard', ()=>{
    describe('board', ()=>{
        const board = gameBoard();
        test('empty board', ()=>{
            const actual = board.getBoard().every((square) => square === null);
            const expected = false;
            expect(actual).toBe(expected);
        })
        test('board row has 10', () =>{
            const actual = board.getBoard().length;
            const expected = 10;
            expect(actual).toBe(expected);
        })
        test('board col is 10', () =>{
            const actual = board.getBoard()[0].length;
            const expected = 10;
            expect(actual).toBe(expected);
        })
    })
    describe("Place Horizonal Ship", () => {
        const board = gameBoard();
        const ship = shipFactory('cruiser');
        board.placeShip(ship, 3, 2);
        test("place ship at starter coord w/ index 0", () =>{
            const actual = board.getBoard()[3][2];
            expect(actual).toEqual({ship, index: 0})
            //expect(actual).toEqual(null);
        })
        test("place ship at starter coord w/ index 1", () =>{
            const actual = board.getBoard()[3][3];
            expect(actual).toEqual({ship, index: 1})
        })
        test("place ship at starter coord w/ index 2", () =>{
            const actual = board.getBoard()[3][4];
            expect(actual).toEqual({ship, index: 2})
        })
    })
    describe("Place Vertical Ship", () =>{
        const board = gameBoard();
        const ship = shipFactory('cruiser');
        ship.changeDirection();
        board.placeShip(ship, 3, 2);
        test("place ship at starter cord w/ index 0", () =>{
            const actual = board.getBoard()[3][2];
            expect(actual).toEqual({ship, index: 0});
        })
        test("place ship at starter cord w/ index 1", () =>{
            const actual = board.getBoard()[4][2];
            expect(actual).toEqual({ship, index: 1});
        })
        test("place ship at starter cord w/ index 2", () =>{
            const actual = board.getBoard()[5][2];
            expect(actual).toEqual({ship, index: 2});
        })
    })
    describe("Not placed out of bounds ship", ()=> {
        const board = gameBoard();
        const ship = shipFactory('carrier');
        test("Ship is out of bounds horizontal", () => {
            board.placeShip(ship, 7, 7); // [7,7] [7,8] [7,9] [7,10] [7,11]
            const actual = board.getBoard()[7][7];
            expect(actual).toBe(null);
        })
        test("Ship is out of bound vertical", () =>{
            ship.changeDirection();
            board.placeShip(ship, 7, 7);
            const actual = board.getBoard()[7][7];
            expect(actual).toBe(null);
        })
    })
    describe("Ship is not colliding with others", () =>{
        const board = gameBoard();
        const carrier = shipFactory('carrier');
        const battleship = shipFactory('battleship');
        test("collision with ship", () =>{
            board.placeShip(carrier, 2, 0);
            board.placeShip(battleship, 2, 0);
            const actual = board.getBoard()[2][0];
            expect(actual).toEqual({ship: carrier, index: 0});
        })
        test("collision w/ ship in 1 place", () =>{
            battleship.changeDirection();
            board.placeShip(battleship, 0, 2);
            const actual = board.getBoard()[0][2];
            expect(actual).toBe(null);
        })
    })
    describe("All Ships are placed", () =>{
        const board = gameBoard();
        const carrier = shipFactory('carrier');
        const battleship = shipFactory('battleship');
        const cruiser = shipFactory('cruiser');
        const submarine = shipFactory('submarine');
        const destroyer = shipFactory('destroyer');
        test("No ships placed", () => {
            const actual = board.areAllShipsArePlaced();
            expect(actual).toBe(false);
        })
        test("Some ships are placed", ()=> {
            board.placeShip(carrier, 0, 0);
            board.placeShip(battleship, 1, 0);
            board.placeShip(cruiser, 3, 0);
            const actual = board.areAllShipsArePlaced();
            expect(actual).toBe(false);
        })
        test('All Ships are placed', () =>{
            board.placeShip(submarine, 4, 0);
            board.placeShip(destroyer, 5, 0);
            const actual = board.areAllShipsArePlaced();
            expect(actual).toBe(true);
        })
    })
    describe("recieve attack", () =>{
        const board = gameBoard();
        const carrier = shipFactory('carrier');
        const battleship = shipFactory('battleship');
        board.placeShip(carrier, 2, 0); // [2,0] [2,1] [2,2] [2,3] [2,4]
        battleship.changeDirection();
        board.placeShip(battleship, 3, 2); // [3,2] [3,3] [3,4] [3,5]
        board.recieveAttack(0,0);
        test("attack a carrier at index 0", () => {
            board.recieveAttack(2,0);
            const actual = carrier.getHits();
            expect(actual).toEqual(['hit',null, null, null, null]);
        })
        test("attack a carrier at index 4", () => {
            board.recieveAttack(2,4);
            const actual = carrier.getHits();
            expect(actual).toEqual(['hit', null, null, null, 'hit']);
        })
        test('miss', () =>{
            const actual = board.getBoard()[0][0];
            expect(actual).toBe('miss');
        })
        test('hit at cell (2,0)', () =>{
            const actual = board.getBoard()[2][0];
            expect(actual).toBe('hit');
        })
        test('hit at cell (2,4)', () =>{
            const actual = board.getBoard()[2][4];
            expect(actual).toBe('hit');
        })
    })
    describe('Are all ships sunk', () =>{
        const board = gameBoard();
        const submarine = shipFactory('submarine');
        const destroyer = shipFactory('destroyer');
        board.placeShip(submarine, 2, 2);
        destroyer.changeDirection();
        board.placeShip(destroyer, 6,6);
        test('No ships sunk', () =>{
            const actual = board.areAllShipsSunk();
            expect(actual).toBe(false);
        })
        test('1 ship has sunk', ()=>{
            board.recieveAttack(2,2);
            board.recieveAttack(2,3);
            board.recieveAttack(2,4);
            const actual = board.areAllShipsSunk();
            expect(actual).toBe(false);
        })
        test('All ships have sunk', () => {
            board.recieveAttack(6,6);
            board.recieveAttack(7,6);
            const actual = board.areAllShipsSunk();
            expect(actual).toBe(true);
        })
    })
    /*todo("Auto Place Fleet", () =>{

    })*/

})

