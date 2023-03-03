/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "elements": () => (/* binding */ elements)
/* harmony export */ });
const elements = {
    p1Gameboard: document.querySelector('.p1-gameboard'),
    p2Gameboard: document.querySelector('.p2-gameboard'),
    p1Grid: document.querySelector('.p1-grid'),
    p2Grid: document.querySelector('.p2-grid'),
    infoContainer: document.querySelector('.infoContainer'),
    infoText: document.querySelector('.infoText'),
    playAgainBtn: document.querySelector('.playAgain'),
}

/***/ }),

/***/ "./src/factories/game.js":
/*!*******************************!*\
  !*** ./src/factories/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/gameBoard */ "./src/factories/gameBoard.js");
/* harmony import */ var _factories_shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/shipFactory */ "./src/factories/shipFactory.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/player */ "./src/factories/player.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./src/base.js");
/* harmony import */ var _gameboardView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gameboardView */ "./src/gameboardView.js");
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helper/helper */ "./src/helper/helper.js");







//Init
function game(){
    //create players
    const p1 = (0,_factories_player__WEBPACK_IMPORTED_MODULE_2__["default"])('human');
    const p2 = (0,_factories_player__WEBPACK_IMPORTED_MODULE_2__["default"])('computer');

    //create boards
    const p1Board = (0,_factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const p2Board = (0,_factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
    //reset game
    function resetGame(){
        p1.resetFleet();
        p2.resetFleet();
        p1Board.reset();
        p2Board.reset();
    };

    //ctrlAttack function for eventListeners
    function ctrlAttack(e){
        const cell = e.target;
        if(cell.classList.contains('grid-cell')){
            //1. Get coords from board
            const y = cell.dataset.y;
            const x = cell.dataset.x;

            //2.Check if cell has been attacked
            const boardCell = p2Board.getBoard()[y][x];
            if(boardCell !== 'miss' && boardCell !== 'hit'){
                //3. Makes attack for p1 'human and p2 'computer
                p1.attack(y, x, p2Board);
                p2.autoAttack(p1Board);
                

                //4.Update Grids after attack
                updateGrids();
            }
            //5. Check if all ships are sunk
            if(p1Board.areAllShipsSunk() || p2Board.areAllShipsSunk()){
                let winner = '';
                if(p1Board.areAllShipsSunk()){
                    winner = 'Computer wins!';
                    console.log(winner)
                } else if(p2Board.areAllShipsSunk()){
                    winner = 'You win!';
                    console.log(winner);
                }
                //6. Disable eventListeners for attack
                _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid.removeEventListener('click',ctrlAttack);
                //Display Winner / Play again button
                (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderWinner)(winner);
            }
        }
    }

    //Adding Event Listeners to grids for ctrlAttack
    function addGridEventListener(){
        if(p2.getType === 'human'){
            _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.addEventListener('click', ctrlAttack);
            _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid.addEventListener('click', ctrlAttack);
        }else{
            _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid.addEventListener('click', ctrlAttack);
        }
    }
    function renderGrids(){
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderGrid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderGrid)(p2Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid);
    }
    function updateGrids(){
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.updateGrid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.updateGrid)(p2Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid);
    }
    function renderFleets(){
        const fleet1 = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_5__.createFleet)(_helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES);
        const fleet2 = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_5__.createFleet)(_helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES);
        p1Board.autoPlaceFleet(fleet1);
        p2Board.autoPlaceFleet(fleet2);
    }



    return {
        ctrlAttack,
        renderGrids,
        renderFleets,
        addGridEventListener
    }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);

/***/ }),

/***/ "./src/factories/gameBoard.js":
/*!************************************!*\
  !*** ./src/factories/gameBoard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/helper */ "./src/helper/helper.js");

function gameBoard(){
    //creating a 10x10 board, coords board[row][col]
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    let placedShips = [];
    function areAllShipsArePlaced(){
        if(placedShips.length === _helper_helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES.length){
            return true;
        }else{
            return false;
        }
    }

    function adjustCoords(y0, x0, i, direction){
        //Default is horizontal
        let x = x0 +i;
        let y = y0;
        if(direction === 'vertical'){
            x = x0;
            y = y0 + i;
        }
        return [y,x];
    }

    function checkValid(length, direction, y0, x0){
        let cells = [];
        for(let i = 0; i < length; i++){
            const [y,x] = adjustCoords(y0, x0, i, direction);
            if(y < 10 && x < 10){
                cells.push(board[y][x]);
            }else{
                return false;
            }
        }
        return cells.every((cell) => cell === null);
    }
    function placeShip(ship, y0, x0){
        const direction = ship.getDirection();
        //Check if valid spot
        const valid = checkValid(ship.length, direction, y0, x0);
        if(valid){
            for(let i = 0; i < ship.length; i++){
                const [y,x] = adjustCoords(y0, x0, i, direction);
                //places ship with index
                board[y][x] = {ship, index: i};
            }
            //adds it to placed ships
            placedShips.push(ship);
            return valid;
        }else{
            return valid;
        }
    }
    function autoPlace(ship){
        const [y, x] = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_0__.randCoords)();
        const randomNum = Math.floor(Math.random() * 10) + 1;
        if(randomNum > 5) ship.changeDirection();
        const placed = placeShip(ship, y, x);
        if(!placed) autoPlace(ship);
    }
    function autoPlaceFleet(fleet){
        for(const ship in fleet){
            autoPlace(fleet[ship]);
        }
    }

    function recieveAttack(y,x){
        //Determines if attack hit ship
        if(board[y][x] === null){
            //records missed shot
            board[y][x] = 'miss';
        }
        else if(board[y][x].ship){
            //calls hit function on correct ship
            board[y][x].ship.hit(board[y][x].index);
            //Records attacked cell with 'hit' (prevents future .ship.hit)
            board[y][x] = 'hit';
        }
        return board[y][x];
    }
  const areAllShipsSunk = () => placedShips.every((ship) => ship.isSunk());

  const reset = () => {
    board = Array(10).fill(null).map(() => Array(10).fill(null));
    placedShips = [];
  }
    return{
        getBoard,
        areAllShipsArePlaced,
        placeShip,
        autoPlaceFleet,
        recieveAttack,
        areAllShipsSunk,
        reset
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/helper */ "./src/helper/helper.js");


function player(type = 'human'){
    let fleet = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_0__.createFleet)(_helper_helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES);

    const getType = () => type;
    const getFleet = () => fleet;
    //Attacks enemy board at cords [y][x]
    const attack = (y, x, enemyBoard) => enemyBoard.recieveAttack(y, x);
    
    const autoAttack = (enemyBoard) =>{
        const [y,x] = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_0__.randCoords)();
        const cell = enemyBoard.getBoard()[y][x];
        if(cell === 'miss' || cell === 'hit'){
            //tries again until valid cell is hit
            autoAttack(enemyBoard);
        }else{
            //Attacks valid cell
            enemyBoard.recieveAttack(y,x);
        }
    }
    const resetFleet = () => (fleet = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_0__.createFleet)(_helper_helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES));

    return{
        getType,
        getFleet,
        attack,
        autoAttack,
        resetFleet,
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);


/***/ }),

/***/ "./src/factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/helper */ "./src/helper/helper.js");

function shipFactory(type){
    const id = type;
    const length = _helper_helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_LENGTH[type];
    let direction = 'horizontal';
    function getDirection(){
        return direction;
    }
    function changeDirection(){
        if(direction === 'horizontal'){
            direction = 'vertical'
        }else{
            direction = 'horizontal';
        }
    }

    //hit
    const hits = Array(length).fill(null);
    const hit = (i) =>(hits[i] = 'hit');
    const getHits = () => hits;

    //isSunk Method
    const isSunk = () => hits.every((h) => h === 'hit');
    
    return {id, length, getDirection, changeDirection, hit, getHits, isSunk};
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);

/***/ }),

/***/ "./src/gameboardView.js":
/*!******************************!*\
  !*** ./src/gameboardView.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid),
/* harmony export */   "renderWinner": () => (/* binding */ renderWinner),
/* harmony export */   "updateGrid": () => (/* binding */ updateGrid)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/base.js");


function renderGrid(gameboard, playersGrid) {
  const board = gameboard.getBoard();
  const length = board.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let status = board[i][j];
      if (status === null) {
        status = 'blank';
      } else if (status.ship) {
        status = status.ship.id;
      }
      
      const cell = document.createElement('div');
      cell.classList.add('grid-cell', `cell-${i}-${j}`, status);
      cell.dataset.y = i;
      cell.dataset.x = j;
      
      playersGrid.appendChild(cell);
    }
  }
}

function updateGrid(gameboard, playersGrid){
  const board = gameboard.getBoard();
  const length = board.length;
  for(let i = 0; i < length; i++){
    for(let j = 0; j < length; j++){
      if(board[i][j] === 'hit'){
        const cell = playersGrid.querySelector(`[data-y = "${i}"][data-x = "${j}"]`);
        cell.innerText = 'x';
        cell.classList.add('hit');
        if(cell.classList.contains('carrier')){
          cell.style.backgroundColor = 'blue';
        } else if(cell.classList.contains('battleship')){
          cell.style.backgroundColor = 'yellow'
        } else if(cell.classList.contains('cruiser')){
          cell.style.backgroundColor = 'green'
        } else if(cell.classList.contains('submarine')){
          cell.style.backgroundColor = 'red'
        }else if(cell.classList.contains('destroyer')){
          cell.style.backgroundColor = 'orange'
        }
      }else if(board[i][j] === 'miss'){
        const cell = playersGrid.querySelector(`[data-y = "${i}"][data-x = "${j}"]`);
        cell.innerText = 'm';
        cell.classList.add('miss');
        cell.classList.remove('blank');
        
      }
    }
  }
}
function renderWinner(winner){
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.infoContainer.style.display = 'flex';
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.infoText.textContent = `${winner.toUpperCase()}`;
}

function clearGrid(grid) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

/***/ }),

/***/ "./src/helper/helper.js":
/*!******************************!*\
  !*** ./src/helper/helper.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SHIP_LENGTH": () => (/* binding */ SHIP_LENGTH),
/* harmony export */   "SHIP_TYPES": () => (/* binding */ SHIP_TYPES),
/* harmony export */   "createFleet": () => (/* binding */ createFleet),
/* harmony export */   "randCoords": () => (/* binding */ randCoords)
/* harmony export */ });
/* harmony import */ var _factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/shipFactory */ "./src/factories/shipFactory.js");


const SHIP_TYPES = [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer'
]

const SHIP_LENGTH = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
}

const rand = (size = 10) => Math.floor(Math.random() * size);
const randCoords = (size = 10) => [rand(size), rand(size)];

function createFleet(types){
    //Creates an object of ships
    const fleet = {};
    types.forEach((type) => (fleet[type] = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(type)));
    return fleet;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/gameBoard */ "./src/factories/gameBoard.js");
/* harmony import */ var _factories_shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/shipFactory */ "./src/factories/shipFactory.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
/* harmony import */ var _gameboardView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboardView */ "./src/gameboardView.js");
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helper/helper */ "./src/helper/helper.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base */ "./src/base.js");
/* harmony import */ var _factories_game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factories/game */ "./src/factories/game.js");









let game1 = (0,_factories_game__WEBPACK_IMPORTED_MODULE_6__["default"])();
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMOEM7QUFDSTtBQUNWO0FBQ0U7QUFDZ0I7QUFDeEI7QUFDRTs7QUFFcEMsWUFBWSwyREFBSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7Ozs7Ozs7QUFPbEM7O0FBRUE7QUFDQSx1REFBdUQ7OztBQUd2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkVmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hlbHBlci9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVsZW1lbnRzID0ge1xuICAgIHAxR2FtZWJvYXJkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucDEtZ2FtZWJvYXJkJyksXG4gICAgcDJHYW1lYm9hcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMi1nYW1lYm9hcmQnKSxcbiAgICBwMUdyaWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMS1ncmlkJyksXG4gICAgcDJHcmlkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucDItZ3JpZCcpLFxuICAgIGluZm9Db250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvQ29udGFpbmVyJyksXG4gICAgaW5mb1RleHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvVGV4dCcpLFxuICAgIHBsYXlBZ2FpbkJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXlBZ2FpbicpLFxufSIsImltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4uL2ZhY3Rvcmllcy9nYW1lQm9hcmRcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi4vZmFjdG9yaWVzL3NoaXBGYWN0b3J5XCI7XG5pbXBvcnQgcGxheWVyIGZyb20gXCIuLi9mYWN0b3JpZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBlbGVtZW50cyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkLCB1cGRhdGVHcmlkLCByZW5kZXJXaW5uZXIgfSBmcm9tIFwiLi4vZ2FtZWJvYXJkVmlld1wiO1xuaW1wb3J0IHsgY3JlYXRlRmxlZXQsIFNISVBfVFlQRVMgfSBmcm9tIFwiLi4vaGVscGVyL2hlbHBlclwiO1xuXG4vL0luaXRcbmZ1bmN0aW9uIGdhbWUoKXtcbiAgICAvL2NyZWF0ZSBwbGF5ZXJzXG4gICAgY29uc3QgcDEgPSBwbGF5ZXIoJ2h1bWFuJyk7XG4gICAgY29uc3QgcDIgPSBwbGF5ZXIoJ2NvbXB1dGVyJyk7XG5cbiAgICAvL2NyZWF0ZSBib2FyZHNcbiAgICBjb25zdCBwMUJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gICAgY29uc3QgcDJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICAgIFxuICAgIC8vcmVzZXQgZ2FtZVxuICAgIGZ1bmN0aW9uIHJlc2V0R2FtZSgpe1xuICAgICAgICBwMS5yZXNldEZsZWV0KCk7XG4gICAgICAgIHAyLnJlc2V0RmxlZXQoKTtcbiAgICAgICAgcDFCb2FyZC5yZXNldCgpO1xuICAgICAgICBwMkJvYXJkLnJlc2V0KCk7XG4gICAgfTtcblxuICAgIC8vY3RybEF0dGFjayBmdW5jdGlvbiBmb3IgZXZlbnRMaXN0ZW5lcnNcbiAgICBmdW5jdGlvbiBjdHJsQXR0YWNrKGUpe1xuICAgICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICAgIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwnKSl7XG4gICAgICAgICAgICAvLzEuIEdldCBjb29yZHMgZnJvbSBib2FyZFxuICAgICAgICAgICAgY29uc3QgeSA9IGNlbGwuZGF0YXNldC55O1xuICAgICAgICAgICAgY29uc3QgeCA9IGNlbGwuZGF0YXNldC54O1xuXG4gICAgICAgICAgICAvLzIuQ2hlY2sgaWYgY2VsbCBoYXMgYmVlbiBhdHRhY2tlZFxuICAgICAgICAgICAgY29uc3QgYm9hcmRDZWxsID0gcDJCb2FyZC5nZXRCb2FyZCgpW3ldW3hdO1xuICAgICAgICAgICAgaWYoYm9hcmRDZWxsICE9PSAnbWlzcycgJiYgYm9hcmRDZWxsICE9PSAnaGl0Jyl7XG4gICAgICAgICAgICAgICAgLy8zLiBNYWtlcyBhdHRhY2sgZm9yIHAxICdodW1hbiBhbmQgcDIgJ2NvbXB1dGVyXG4gICAgICAgICAgICAgICAgcDEuYXR0YWNrKHksIHgsIHAyQm9hcmQpO1xuICAgICAgICAgICAgICAgIHAyLmF1dG9BdHRhY2socDFCb2FyZCk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvLzQuVXBkYXRlIEdyaWRzIGFmdGVyIGF0dGFja1xuICAgICAgICAgICAgICAgIHVwZGF0ZUdyaWRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLzUuIENoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xuICAgICAgICAgICAgaWYocDFCb2FyZC5hcmVBbGxTaGlwc1N1bmsoKSB8fCBwMkJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKXtcbiAgICAgICAgICAgICAgICBsZXQgd2lubmVyID0gJyc7XG4gICAgICAgICAgICAgICAgaWYocDFCb2FyZC5hcmVBbGxTaGlwc1N1bmsoKSl7XG4gICAgICAgICAgICAgICAgICAgIHdpbm5lciA9ICdDb21wdXRlciB3aW5zISc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbm5lcilcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocDJCb2FyZC5hcmVBbGxTaGlwc1N1bmsoKSl7XG4gICAgICAgICAgICAgICAgICAgIHdpbm5lciA9ICdZb3Ugd2luISc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbm5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vNi4gRGlzYWJsZSBldmVudExpc3RlbmVycyBmb3IgYXR0YWNrXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucDJHcmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjdHJsQXR0YWNrKTtcbiAgICAgICAgICAgICAgICAvL0Rpc3BsYXkgV2lubmVyIC8gUGxheSBhZ2FpbiBidXR0b25cbiAgICAgICAgICAgICAgICByZW5kZXJXaW5uZXIod2lubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQWRkaW5nIEV2ZW50IExpc3RlbmVycyB0byBncmlkcyBmb3IgY3RybEF0dGFja1xuICAgIGZ1bmN0aW9uIGFkZEdyaWRFdmVudExpc3RlbmVyKCl7XG4gICAgICAgIGlmKHAyLmdldFR5cGUgPT09ICdodW1hbicpe1xuICAgICAgICAgICAgZWxlbWVudHMucDFHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3RybEF0dGFjayk7XG4gICAgICAgICAgICBlbGVtZW50cy5wMkdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHJsQXR0YWNrKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlbGVtZW50cy5wMkdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHJsQXR0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJHcmlkcygpe1xuICAgICAgICByZW5kZXJHcmlkKHAxQm9hcmQsIGVsZW1lbnRzLnAxR3JpZCk7XG4gICAgICAgIHJlbmRlckdyaWQocDJCb2FyZCwgZWxlbWVudHMucDJHcmlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlR3JpZHMoKXtcbiAgICAgICAgdXBkYXRlR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICB1cGRhdGVHcmlkKHAyQm9hcmQsIGVsZW1lbnRzLnAyR3JpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckZsZWV0cygpe1xuICAgICAgICBjb25zdCBmbGVldDEgPSBjcmVhdGVGbGVldChTSElQX1RZUEVTKTtcbiAgICAgICAgY29uc3QgZmxlZXQyID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUyk7XG4gICAgICAgIHAxQm9hcmQuYXV0b1BsYWNlRmxlZXQoZmxlZXQxKTtcbiAgICAgICAgcDJCb2FyZC5hdXRvUGxhY2VGbGVldChmbGVldDIpO1xuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjdHJsQXR0YWNrLFxuICAgICAgICByZW5kZXJHcmlkcyxcbiAgICAgICAgcmVuZGVyRmxlZXRzLFxuICAgICAgICBhZGRHcmlkRXZlbnRMaXN0ZW5lclxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJpbXBvcnQgeyByYW5kQ29vcmRzLCBTSElQX1RZUEVTIH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcbmZ1bmN0aW9uIGdhbWVCb2FyZCgpe1xuICAgIC8vY3JlYXRpbmcgYSAxMHgxMCBib2FyZCwgY29vcmRzIGJvYXJkW3Jvd11bY29sXVxuICAgIGxldCBib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIGxldCBwbGFjZWRTaGlwcyA9IFtdO1xuICAgIGZ1bmN0aW9uIGFyZUFsbFNoaXBzQXJlUGxhY2VkKCl7XG4gICAgICAgIGlmKHBsYWNlZFNoaXBzLmxlbmd0aCA9PT0gU0hJUF9UWVBFUy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRqdXN0Q29vcmRzKHkwLCB4MCwgaSwgZGlyZWN0aW9uKXtcbiAgICAgICAgLy9EZWZhdWx0IGlzIGhvcml6b250YWxcbiAgICAgICAgbGV0IHggPSB4MCAraTtcbiAgICAgICAgbGV0IHkgPSB5MDtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKXtcbiAgICAgICAgICAgIHggPSB4MDtcbiAgICAgICAgICAgIHkgPSB5MCArIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt5LHhdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWQobGVuZ3RoLCBkaXJlY3Rpb24sIHkwLCB4MCl7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgW3kseF0gPSBhZGp1c3RDb29yZHMoeTAsIHgwLCBpLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgaWYoeSA8IDEwICYmIHggPCAxMCl7XG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChib2FyZFt5XVt4XSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsID09PSBudWxsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHkwLCB4MCl7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNoaXAuZ2V0RGlyZWN0aW9uKCk7XG4gICAgICAgIC8vQ2hlY2sgaWYgdmFsaWQgc3BvdFxuICAgICAgICBjb25zdCB2YWxpZCA9IGNoZWNrVmFsaWQoc2hpcC5sZW5ndGgsIGRpcmVjdGlvbiwgeTAsIHgwKTtcbiAgICAgICAgaWYodmFsaWQpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGNvbnN0IFt5LHhdID0gYWRqdXN0Q29vcmRzKHkwLCB4MCwgaSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAvL3BsYWNlcyBzaGlwIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICBib2FyZFt5XVt4XSA9IHtzaGlwLCBpbmRleDogaX07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2FkZHMgaXQgdG8gcGxhY2VkIHNoaXBzXG4gICAgICAgICAgICBwbGFjZWRTaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhdXRvUGxhY2Uoc2hpcCl7XG4gICAgICAgIGNvbnN0IFt5LCB4XSA9IHJhbmRDb29yZHMoKTtcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgICAgaWYocmFuZG9tTnVtID4gNSkgc2hpcC5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcGxhY2VkID0gcGxhY2VTaGlwKHNoaXAsIHksIHgpO1xuICAgICAgICBpZighcGxhY2VkKSBhdXRvUGxhY2Uoc2hpcCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF1dG9QbGFjZUZsZWV0KGZsZWV0KXtcbiAgICAgICAgZm9yKGNvbnN0IHNoaXAgaW4gZmxlZXQpe1xuICAgICAgICAgICAgYXV0b1BsYWNlKGZsZWV0W3NoaXBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soeSx4KXtcbiAgICAgICAgLy9EZXRlcm1pbmVzIGlmIGF0dGFjayBoaXQgc2hpcFxuICAgICAgICBpZihib2FyZFt5XVt4XSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAvL3JlY29yZHMgbWlzc2VkIHNob3RcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdID0gJ21pc3MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYm9hcmRbeV1beF0uc2hpcCl7XG4gICAgICAgICAgICAvL2NhbGxzIGhpdCBmdW5jdGlvbiBvbiBjb3JyZWN0IHNoaXBcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdLnNoaXAuaGl0KGJvYXJkW3ldW3hdLmluZGV4KTtcbiAgICAgICAgICAgIC8vUmVjb3JkcyBhdHRhY2tlZCBjZWxsIHdpdGggJ2hpdCcgKHByZXZlbnRzIGZ1dHVyZSAuc2hpcC5oaXQpXG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9ICdoaXQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2FyZFt5XVt4XTtcbiAgICB9XG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHBsYWNlZFNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgcGxhY2VkU2hpcHMgPSBbXTtcbiAgfVxuICAgIHJldHVybntcbiAgICAgICAgZ2V0Qm9hcmQsXG4gICAgICAgIGFyZUFsbFNoaXBzQXJlUGxhY2VkLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGF1dG9QbGFjZUZsZWV0LFxuICAgICAgICByZWNpZXZlQXR0YWNrLFxuICAgICAgICBhcmVBbGxTaGlwc1N1bmssXG4gICAgICAgIHJlc2V0XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkOyIsImltcG9ydCB7IFNISVBfVFlQRVMsIHJhbmRDb29yZHMsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcblxuZnVuY3Rpb24gcGxheWVyKHR5cGUgPSAnaHVtYW4nKXtcbiAgICBsZXQgZmxlZXQgPSBjcmVhdGVGbGVldChTSElQX1RZUEVTKTtcblxuICAgIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlO1xuICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4gZmxlZXQ7XG4gICAgLy9BdHRhY2tzIGVuZW15IGJvYXJkIGF0IGNvcmRzIFt5XVt4XVxuICAgIGNvbnN0IGF0dGFjayA9ICh5LCB4LCBlbmVteUJvYXJkKSA9PiBlbmVteUJvYXJkLnJlY2lldmVBdHRhY2soeSwgeCk7XG4gICAgXG4gICAgY29uc3QgYXV0b0F0dGFjayA9IChlbmVteUJvYXJkKSA9PntcbiAgICAgICAgY29uc3QgW3kseF0gPSByYW5kQ29vcmRzKCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBlbmVteUJvYXJkLmdldEJvYXJkKClbeV1beF07XG4gICAgICAgIGlmKGNlbGwgPT09ICdtaXNzJyB8fCBjZWxsID09PSAnaGl0Jyl7XG4gICAgICAgICAgICAvL3RyaWVzIGFnYWluIHVudGlsIHZhbGlkIGNlbGwgaXMgaGl0XG4gICAgICAgICAgICBhdXRvQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vQXR0YWNrcyB2YWxpZCBjZWxsXG4gICAgICAgICAgICBlbmVteUJvYXJkLnJlY2lldmVBdHRhY2soeSx4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZXNldEZsZWV0ID0gKCkgPT4gKGZsZWV0ID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUykpO1xuXG4gICAgcmV0dXJue1xuICAgICAgICBnZXRUeXBlLFxuICAgICAgICBnZXRGbGVldCxcbiAgICAgICAgYXR0YWNrLFxuICAgICAgICBhdXRvQXR0YWNrLFxuICAgICAgICByZXNldEZsZWV0LFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjtcbiIsImltcG9ydCB7IFNISVBfTEVOR1RIIH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcbmZ1bmN0aW9uIHNoaXBGYWN0b3J5KHR5cGUpe1xuICAgIGNvbnN0IGlkID0gdHlwZTtcbiAgICBjb25zdCBsZW5ndGggPSBTSElQX0xFTkdUSFt0eXBlXTtcbiAgICBsZXQgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIGZ1bmN0aW9uIGdldERpcmVjdGlvbigpe1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGFuZ2VEaXJlY3Rpb24oKXtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpe1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJ1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaGl0XG4gICAgY29uc3QgaGl0cyA9IEFycmF5KGxlbmd0aCkuZmlsbChudWxsKTtcbiAgICBjb25zdCBoaXQgPSAoaSkgPT4oaGl0c1tpXSA9ICdoaXQnKTtcbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICAgIC8vaXNTdW5rIE1ldGhvZFxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdHMuZXZlcnkoKGgpID0+IGggPT09ICdoaXQnKTtcbiAgICBcbiAgICByZXR1cm4ge2lkLCBsZW5ndGgsIGdldERpcmVjdGlvbiwgY2hhbmdlRGlyZWN0aW9uLCBoaXQsIGdldEhpdHMsIGlzU3Vua307XG59XG5leHBvcnQgZGVmYXVsdCBzaGlwRmFjdG9yeTsiLCJpbXBvcnQgeyBlbGVtZW50cyB9IGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdyaWQoZ2FtZWJvYXJkLCBwbGF5ZXJzR3JpZCkge1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBsZW5ndGggPSBib2FyZC5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBzdGF0dXMgPSBib2FyZFtpXVtqXTtcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgc3RhdHVzID0gJ2JsYW5rJztcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNoaXApIHtcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzLnNoaXAuaWQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJywgYGNlbGwtJHtpfS0ke2p9YCwgc3RhdHVzKTtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC54ID0gajtcbiAgICAgIFxuICAgICAgcGxheWVyc0dyaWQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkKGdhbWVib2FyZCwgcGxheWVyc0dyaWQpe1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBsZW5ndGggPSBib2FyZC5sZW5ndGg7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgZm9yKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKXtcbiAgICAgIGlmKGJvYXJkW2ldW2pdID09PSAnaGl0Jyl7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBwbGF5ZXJzR3JpZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15ID0gXCIke2l9XCJdW2RhdGEteCA9IFwiJHtqfVwiXWApO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICd4JztcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcnJpZXInKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XG4gICAgICAgIH0gZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlc2hpcCcpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnXG4gICAgICAgIH0gZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnY3J1aXNlcicpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbidcbiAgICAgICAgfSBlbHNlIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWJtYXJpbmUnKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICB9ZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZGVzdHJveWVyJykpe1xuICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSdcbiAgICAgICAgfVxuICAgICAgfWVsc2UgaWYoYm9hcmRbaV1bal0gPT09ICdtaXNzJyl7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBwbGF5ZXJzR3JpZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15ID0gXCIke2l9XCJdW2RhdGEteCA9IFwiJHtqfVwiXWApO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdtJztcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYmxhbmsnKTtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyV2lubmVyKHdpbm5lcil7XG4gIGVsZW1lbnRzLmluZm9Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgZWxlbWVudHMuaW5mb1RleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXIudG9VcHBlckNhc2UoKX1gO1xufVxuXG5mdW5jdGlvbiBjbGVhckdyaWQoZ3JpZCkge1xuICB3aGlsZSAoZ3JpZC5maXJzdENoaWxkKSB7XG4gICAgZ3JpZC5yZW1vdmVDaGlsZChncmlkLmZpcnN0Q2hpbGQpO1xuICB9XG59IiwiaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuLi9mYWN0b3JpZXMvc2hpcEZhY3RvcnlcIjtcblxuZXhwb3J0IGNvbnN0IFNISVBfVFlQRVMgPSBbXG4gICAgJ2NhcnJpZXInLFxuICAgICdiYXR0bGVzaGlwJyxcbiAgICAnY3J1aXNlcicsXG4gICAgJ3N1Ym1hcmluZScsXG4gICAgJ2Rlc3Ryb3llcidcbl1cblxuZXhwb3J0IGNvbnN0IFNISVBfTEVOR1RIID0ge1xuICAgIGNhcnJpZXI6IDUsXG4gICAgYmF0dGxlc2hpcDogNCxcbiAgICBjcnVpc2VyOiAzLFxuICAgIHN1Ym1hcmluZTogMyxcbiAgICBkZXN0cm95ZXI6IDIsXG59XG5cbmNvbnN0IHJhbmQgPSAoc2l6ZSA9IDEwKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbmV4cG9ydCBjb25zdCByYW5kQ29vcmRzID0gKHNpemUgPSAxMCkgPT4gW3JhbmQoc2l6ZSksIHJhbmQoc2l6ZSldO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxlZXQodHlwZXMpe1xuICAgIC8vQ3JlYXRlcyBhbiBvYmplY3Qgb2Ygc2hpcHNcbiAgICBjb25zdCBmbGVldCA9IHt9O1xuICAgIHR5cGVzLmZvckVhY2goKHR5cGUpID0+IChmbGVldFt0eXBlXSA9IHNoaXBGYWN0b3J5KHR5cGUpKSk7XG4gICAgcmV0dXJuIGZsZWV0O1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgZ2FtZUJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lQm9hcmRcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9mYWN0b3JpZXMvc2hpcEZhY3RvcnlcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllclwiO1xuaW1wb3J0IHtyZW5kZXJHcmlkfSBmcm9tIFwiLi9nYW1lYm9hcmRWaWV3XCJcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBTSElQX1RZUEVTIH0gZnJvbSBcIi4vaGVscGVyL2hlbHBlclwiO1xuaW1wb3J0IHsgZWxlbWVudHMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgZ2FtZSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZVwiO1xuXG5sZXQgZ2FtZTEgPSBnYW1lKCk7XG5nYW1lMS5yZW5kZXJGbGVldHMoKTtcbmdhbWUxLnJlbmRlckdyaWRzKCk7XG5nYW1lMS5hZGRHcmlkRXZlbnRMaXN0ZW5lcigpO1xuLypjb25zdCBib2FyZCA9IGdhbWVCb2FyZCgpO1xuY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KCdjYXJyaWVyJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeSgnc3VibWFyaW5lJyk7XG5ib2FyZC5wbGFjZVNoaXAoY2FycmllciwgMiwwKTtcbmJvYXJkLnBsYWNlU2hpcChzdWJtYXJpbmUsIDYsNik7XG5jb25zb2xlLmxvZyhib2FyZC5nZXRCb2FyZCgpKTtcbmNvbnN0IHBsYXllckdyaWQgPSBlbGVtZW50cy5wMUdyaWQ7XG5jb25zdCBlbmVteUdyaWQgPSBlbGVtZW50cy5wMkdyaWQ7XG5jb25zdCBlbmVteUJvYXJkID0gZ2FtZUJvYXJkKCk7XG5jb25zdCBmbGVldCA9IGNyZWF0ZUZsZWV0KFNISVBfVFlQRVMpO1xuZW5lbXlCb2FyZC5hdXRvUGxhY2VGbGVldChmbGVldCk7XG5yZW5kZXJHcmlkKGJvYXJkLCBwbGF5ZXJHcmlkKTtcbnJlbmRlckdyaWQoZW5lbXlCb2FyZCwgZW5lbXlHcmlkKTsqL1xuXG5cblxuXG5cblxuLypsZXQgZ3JpZENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuXG5jb25zdCBnYW1lMSA9IGdhbWUoKTtcbnBsYXllckdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnYW1lMS5jdHJsQXR0YWNrKTsqL1xuXG5cbi8qZ3JpZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKXtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICAgIGNlbGwuYXBwZW5kKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ3gnO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHhDb3JkID0gY2VsbC5kYXRhc2V0Lng7XG4gICAgICAgICAgICBjb25zdCB5Q29yZCA9IGNlbGwuZGF0YXNldC55O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYm9hcmQuZ2V0Qm9hcmQoKVt5Q29yZF1beENvcmRdKTtcbiAgICAgICAgICAgIGJvYXJkLnJlY2lldmVBdHRhY2soeUNvcmQsIHhDb3JkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgaWYoYm9hcmQuYXJlQWxsU2hpcHNTdW5rKCkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbGwgc3VuayBnYW1lIG92ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==