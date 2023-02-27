import player from "../factories/player";
import gameBoard from "../factories/gameBoard";

//set up
const player1 = player('human');
const enemy = player('computer');
const playerBoard = gameBoard();
const enemyBoard = gameBoard();

describe("Player Type", () =>{
    test('human type', () =>{
        const actual = player1.getType();
        expect(actual).toBe('human');
    })
    test('computer type', () =>{
        const actual = enemy.getType();
        expect(actual).toBe('computer');
    })
})
describe("Player Attack", () =>{
    test('attack enemy board', () => {
        player1.attack(2, 3, enemyBoard);
        const actual = enemyBoard.getBoard()[2][3];
        expect(actual).toBe('miss');
    })
})
describe("auto attack", () =>{
    test('attack enemy board', () =>{
        enemy.autoAttack(playerBoard);
        const actual = playerBoard.getBoard().flat().every((cell) => cell === null);
        expect(actual).toBe(false);
    })
})
describe("reset fleets", () =>{
    test('fleets are equal with NO reset', () =>{
        const fleet1 = player1.getFleet();
        const fleet2 = player1.getFleet();
        
        const actual = fleet1 === fleet2;
        expect(actual).toBe(true);
    })
    test('fleets are not equal after reset', () =>{
        const fleet1 = player1.getFleet();
        player1.resetFleet();
        const fleet2 = player1.getFleet();
        const actual = fleet1 === fleet2;
        expect(actual).toBe(false);
    })
})