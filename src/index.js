
import gameBoard from "./factories/gameBoard";
import shipFactory from "./factories/shipFactory";
import player from "./factories/player";
import {renderGrid} from "./gameboardView"
import { createFleet, SHIP_TYPES } from "./helper/helper";
import { elements } from "./base";
import game from "./factories/game";

let game1 = game();
game1.renderFleets();
game1.renderGrids();
game1.addGridEventListener();
/*const board = gameBoard();
const carrier = shipFactory('carrier');
const submarine = shipFactory('submarine');
board.placeShip(carrier, 2,0);
board.placeShip(submarine, 6,6);
console.log(board.getBoard());
const playerGrid = elements.p1Grid;
const enemyGrid = elements.p2Grid;
const enemyBoard = gameBoard();
const fleet = createFleet(SHIP_TYPES);
enemyBoard.autoPlaceFleet(fleet);
renderGrid(board, playerGrid);
renderGrid(enemyBoard, enemyGrid);*/






/*let gridCells = document.querySelectorAll('.grid-cell');

const game1 = game();
playerGrid.addEventListener('click', game1.ctrlAttack);*/


/*gridCells.forEach((cell) => {
    cell.addEventListener('click', () =>{
        if(cell.classList.contains('empty')){
            const div = document.createElement('div');
            div.classList.add('miss');
            cell.append(div);
        }
        else{
            cell.innerText = 'x';
            cell.classList.add('hit');
            const xCord = cell.dataset.x;
            const yCord = cell.dataset.y;
            console.log(board.getBoard()[yCord][xCord]);
            board.recieveAttack(yCord, xCord);
            console.log(board.getBoard());
            if(board.areAllShipsSunk() === true){
                console.log('all sunk game over');
            }
        }
    })
})
*/
