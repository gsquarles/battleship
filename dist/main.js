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
    autoPlaceBtn: document.querySelector('.autoPlaceBtn'),
    placementContainer: document.querySelector('.placementContainer'),
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
        if(p1Board.areAllShipsArePlaced() === true){
            if(p2.getType === 'human'){
                _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.addEventListener('click', ctrlAttack);
                _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid.addEventListener('click', ctrlAttack);
            }else{
                _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid.addEventListener('click', ctrlAttack);
            }
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
        const fleet2 = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_5__.createFleet)(_helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES);
        p2Board.autoPlaceFleet(fleet2);
    }

    function autoPlacePlayerShips(){
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.textContent = '';
        const fleet1 = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_5__.createFleet)(_helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES);
        p1Board.autoPlaceFleet(fleet1);
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderGrid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
        addGridEventListener();
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.startGame)();
    }
    function autoPlacePlayerShipsEventListener(){
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.autoPlaceBtn.addEventListener('click', autoPlacePlayerShips);
    }

    function playAgain(){
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.playNewGame)();
        resetGame();
        renderFleets();
        renderGrids();  
    }

    function addPlayAgainEvent(){
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.playAgainBtn.addEventListener('click', playAgain);
    }





    return {
        ctrlAttack,
        renderGrids,
        renderFleets,
        addGridEventListener,
        addPlayAgainEvent,
        resetGame, 
        autoPlacePlayerShipsEventListener,
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
/* harmony export */   "playNewGame": () => (/* binding */ playNewGame),
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid),
/* harmony export */   "renderWinner": () => (/* binding */ renderWinner),
/* harmony export */   "startGame": () => (/* binding */ startGame),
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
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.infoContainer.classList.toggle('hide');
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.infoText.textContent = `${winner.toUpperCase()}`;
}
function startGame(){
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.placementContainer.classList.toggle('hide');
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('hide');
}

function playNewGame(){
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.infoContainer.classList.toggle('hide');
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.p1Grid.textContent = '';
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.p2Grid.textContent = '';
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('hide');
  _base__WEBPACK_IMPORTED_MODULE_0__.elements.placementContainer.classList.toggle('hide');
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
game1.autoPlacePlayerShipsEventListener();
game1.addPlayAgainEvent();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsd0VBQXFDO0FBQ3ZDLEVBQUUsK0VBQTRDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VtRDs7QUFFNUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQSwyQ0FBMkMsa0VBQVc7QUFDdEQ7QUFDQTs7Ozs7O1VDMUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTDhDO0FBQ0k7QUFDVjtBQUNlO0FBQ0c7QUFDeEI7QUFDRTs7QUFFcEMsWUFBWSwyREFBSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYmFzZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRWaWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVscGVyL2hlbHBlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZWxlbWVudHMgPSB7XG4gICAgcDFHYW1lYm9hcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMS1nYW1lYm9hcmQnKSxcbiAgICBwMkdhbWVib2FyZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAyLWdhbWVib2FyZCcpLFxuICAgIHAxR3JpZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAxLWdyaWQnKSxcbiAgICBwMkdyaWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMi1ncmlkJyksXG4gICAgaW5mb0NvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9Db250YWluZXInKSxcbiAgICBpbmZvVGV4dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9UZXh0JyksXG4gICAgcGxheUFnYWluQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheUFnYWluJyksXG4gICAgYXV0b1BsYWNlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0b1BsYWNlQnRuJyksXG4gICAgcGxhY2VtZW50Q29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2VtZW50Q29udGFpbmVyJyksXG59IiwiaW1wb3J0IGdhbWVCb2FyZCBmcm9tIFwiLi4vZmFjdG9yaWVzL2dhbWVCb2FyZFwiO1xuaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuLi9mYWN0b3JpZXMvc2hpcEZhY3RvcnlcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4uL2ZhY3Rvcmllcy9wbGF5ZXJcIjtcbmltcG9ydCB7IGVsZW1lbnRzIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQsIHVwZGF0ZUdyaWQsIHJlbmRlcldpbm5lciwgcGxheU5ld0dhbWUsIHN0YXJ0R2FtZSB9IGZyb20gXCIuLi9nYW1lYm9hcmRWaWV3XCI7XG5pbXBvcnQgeyBjcmVhdGVGbGVldCwgU0hJUF9UWVBFUyB9IGZyb20gXCIuLi9oZWxwZXIvaGVscGVyXCI7XG5cbi8vSW5pdFxuZnVuY3Rpb24gZ2FtZSgpe1xuICAgIC8vY3JlYXRlIHBsYXllcnNcbiAgICBjb25zdCBwMSA9IHBsYXllcignaHVtYW4nKTtcbiAgICBjb25zdCBwMiA9IHBsYXllcignY29tcHV0ZXInKTtcblxuICAgIC8vY3JlYXRlIGJvYXJkc1xuICAgIGNvbnN0IHAxQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgICBjb25zdCBwMkJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gICAgXG4gICAgLy9yZXNldCBnYW1lXG4gICAgZnVuY3Rpb24gcmVzZXRHYW1lKCl7XG4gICAgICAgIHAxLnJlc2V0RmxlZXQoKTtcbiAgICAgICAgcDIucmVzZXRGbGVldCgpO1xuICAgICAgICBwMUJvYXJkLnJlc2V0KCk7XG4gICAgICAgIHAyQm9hcmQucmVzZXQoKTtcbiAgICB9O1xuXG4gICAgLy9jdHJsQXR0YWNrIGZ1bmN0aW9uIGZvciBldmVudExpc3RlbmVyc1xuICAgIGZ1bmN0aW9uIGN0cmxBdHRhY2soZSl7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbCcpKXtcbiAgICAgICAgICAgIC8vMS4gR2V0IGNvb3JkcyBmcm9tIGJvYXJkXG4gICAgICAgICAgICBjb25zdCB5ID0gY2VsbC5kYXRhc2V0Lnk7XG4gICAgICAgICAgICBjb25zdCB4ID0gY2VsbC5kYXRhc2V0Lng7XG5cbiAgICAgICAgICAgIC8vMi5DaGVjayBpZiBjZWxsIGhhcyBiZWVuIGF0dGFja2VkXG4gICAgICAgICAgICBjb25zdCBib2FyZENlbGwgPSBwMkJvYXJkLmdldEJvYXJkKClbeV1beF07XG4gICAgICAgICAgICBpZihib2FyZENlbGwgIT09ICdtaXNzJyAmJiBib2FyZENlbGwgIT09ICdoaXQnKXtcbiAgICAgICAgICAgICAgICAvLzMuIE1ha2VzIGF0dGFjayBmb3IgcDEgJ2h1bWFuIGFuZCBwMiAnY29tcHV0ZXJcbiAgICAgICAgICAgICAgICBwMS5hdHRhY2soeSwgeCwgcDJCb2FyZCk7XG4gICAgICAgICAgICAgICAgcDIuYXV0b0F0dGFjayhwMUJvYXJkKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIC8vNC5VcGRhdGUgR3JpZHMgYWZ0ZXIgYXR0YWNrXG4gICAgICAgICAgICAgICAgdXBkYXRlR3JpZHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vNS4gQ2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXG4gICAgICAgICAgICBpZihwMUJvYXJkLmFyZUFsbFNoaXBzU3VuaygpIHx8IHAyQm9hcmQuYXJlQWxsU2hpcHNTdW5rKCkpe1xuICAgICAgICAgICAgICAgIGxldCB3aW5uZXIgPSAnJztcbiAgICAgICAgICAgICAgICBpZihwMUJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKXtcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyID0gJ0NvbXB1dGVyIHdpbnMhJztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2lubmVyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihwMkJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKXtcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyID0gJ1lvdSB3aW4hJztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2lubmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy82LiBEaXNhYmxlIGV2ZW50TGlzdGVuZXJzIGZvciBhdHRhY2tcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wMkdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgICAgIC8vRGlzcGxheSBXaW5uZXIgLyBQbGF5IGFnYWluIGJ1dHRvblxuICAgICAgICAgICAgICAgIHJlbmRlcldpbm5lcih3aW5uZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9BZGRpbmcgRXZlbnQgTGlzdGVuZXJzIHRvIGdyaWRzIGZvciBjdHJsQXR0YWNrXG4gICAgZnVuY3Rpb24gYWRkR3JpZEV2ZW50TGlzdGVuZXIoKXtcbiAgICAgICAgaWYocDFCb2FyZC5hcmVBbGxTaGlwc0FyZVBsYWNlZCgpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGlmKHAyLmdldFR5cGUgPT09ICdodW1hbicpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnAxR3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnAyR3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucDJHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3RybEF0dGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICBcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyR3JpZHMoKXtcbiAgICAgICAgcmVuZGVyR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICByZW5kZXJHcmlkKHAyQm9hcmQsIGVsZW1lbnRzLnAyR3JpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUdyaWRzKCl7XG4gICAgICAgIHVwZGF0ZUdyaWQocDFCb2FyZCwgZWxlbWVudHMucDFHcmlkKTtcbiAgICAgICAgdXBkYXRlR3JpZChwMkJvYXJkLCBlbGVtZW50cy5wMkdyaWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJGbGVldHMoKXtcbiAgICAgICAgY29uc3QgZmxlZXQyID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUyk7XG4gICAgICAgIHAyQm9hcmQuYXV0b1BsYWNlRmxlZXQoZmxlZXQyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhdXRvUGxhY2VQbGF5ZXJTaGlwcygpe1xuICAgICAgICBlbGVtZW50cy5wMUdyaWQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgY29uc3QgZmxlZXQxID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUyk7XG4gICAgICAgIHAxQm9hcmQuYXV0b1BsYWNlRmxlZXQoZmxlZXQxKTtcbiAgICAgICAgcmVuZGVyR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICBhZGRHcmlkRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICBzdGFydEdhbWUoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXV0b1BsYWNlUGxheWVyU2hpcHNFdmVudExpc3RlbmVyKCl7XG4gICAgICAgIGVsZW1lbnRzLmF1dG9QbGFjZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF1dG9QbGFjZVBsYXllclNoaXBzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5QWdhaW4oKXtcbiAgICAgICAgcGxheU5ld0dhbWUoKTtcbiAgICAgICAgcmVzZXRHYW1lKCk7XG4gICAgICAgIHJlbmRlckZsZWV0cygpO1xuICAgICAgICByZW5kZXJHcmlkcygpOyAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUGxheUFnYWluRXZlbnQoKXtcbiAgICAgICAgZWxlbWVudHMucGxheUFnYWluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheUFnYWluKTtcbiAgICB9XG5cblxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGN0cmxBdHRhY2ssXG4gICAgICAgIHJlbmRlckdyaWRzLFxuICAgICAgICByZW5kZXJGbGVldHMsXG4gICAgICAgIGFkZEdyaWRFdmVudExpc3RlbmVyLFxuICAgICAgICBhZGRQbGF5QWdhaW5FdmVudCxcbiAgICAgICAgcmVzZXRHYW1lLCBcbiAgICAgICAgYXV0b1BsYWNlUGxheWVyU2hpcHNFdmVudExpc3RlbmVyLFxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJpbXBvcnQgeyByYW5kQ29vcmRzLCBTSElQX1RZUEVTIH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcbmZ1bmN0aW9uIGdhbWVCb2FyZCgpe1xuICAgIC8vY3JlYXRpbmcgYSAxMHgxMCBib2FyZCwgY29vcmRzIGJvYXJkW3Jvd11bY29sXVxuICAgIGxldCBib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIGxldCBwbGFjZWRTaGlwcyA9IFtdO1xuICAgIGZ1bmN0aW9uIGFyZUFsbFNoaXBzQXJlUGxhY2VkKCl7XG4gICAgICAgIGlmKHBsYWNlZFNoaXBzLmxlbmd0aCA9PT0gU0hJUF9UWVBFUy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRqdXN0Q29vcmRzKHkwLCB4MCwgaSwgZGlyZWN0aW9uKXtcbiAgICAgICAgLy9EZWZhdWx0IGlzIGhvcml6b250YWxcbiAgICAgICAgbGV0IHggPSB4MCAraTtcbiAgICAgICAgbGV0IHkgPSB5MDtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKXtcbiAgICAgICAgICAgIHggPSB4MDtcbiAgICAgICAgICAgIHkgPSB5MCArIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt5LHhdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWQobGVuZ3RoLCBkaXJlY3Rpb24sIHkwLCB4MCl7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgW3kseF0gPSBhZGp1c3RDb29yZHMoeTAsIHgwLCBpLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgaWYoeSA8IDEwICYmIHggPCAxMCl7XG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChib2FyZFt5XVt4XSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsID09PSBudWxsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHkwLCB4MCl7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNoaXAuZ2V0RGlyZWN0aW9uKCk7XG4gICAgICAgIC8vQ2hlY2sgaWYgdmFsaWQgc3BvdFxuICAgICAgICBjb25zdCB2YWxpZCA9IGNoZWNrVmFsaWQoc2hpcC5sZW5ndGgsIGRpcmVjdGlvbiwgeTAsIHgwKTtcbiAgICAgICAgaWYodmFsaWQpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGNvbnN0IFt5LHhdID0gYWRqdXN0Q29vcmRzKHkwLCB4MCwgaSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAvL3BsYWNlcyBzaGlwIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICBib2FyZFt5XVt4XSA9IHtzaGlwLCBpbmRleDogaX07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2FkZHMgaXQgdG8gcGxhY2VkIHNoaXBzXG4gICAgICAgICAgICBwbGFjZWRTaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhdXRvUGxhY2Uoc2hpcCl7XG4gICAgICAgIGNvbnN0IFt5LCB4XSA9IHJhbmRDb29yZHMoKTtcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgICAgaWYocmFuZG9tTnVtID4gNSkgc2hpcC5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcGxhY2VkID0gcGxhY2VTaGlwKHNoaXAsIHksIHgpO1xuICAgICAgICBpZighcGxhY2VkKSBhdXRvUGxhY2Uoc2hpcCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF1dG9QbGFjZUZsZWV0KGZsZWV0KXtcbiAgICAgICAgZm9yKGNvbnN0IHNoaXAgaW4gZmxlZXQpe1xuICAgICAgICAgICAgYXV0b1BsYWNlKGZsZWV0W3NoaXBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soeSx4KXtcbiAgICAgICAgLy9EZXRlcm1pbmVzIGlmIGF0dGFjayBoaXQgc2hpcFxuICAgICAgICBpZihib2FyZFt5XVt4XSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAvL3JlY29yZHMgbWlzc2VkIHNob3RcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdID0gJ21pc3MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYm9hcmRbeV1beF0uc2hpcCl7XG4gICAgICAgICAgICAvL2NhbGxzIGhpdCBmdW5jdGlvbiBvbiBjb3JyZWN0IHNoaXBcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdLnNoaXAuaGl0KGJvYXJkW3ldW3hdLmluZGV4KTtcbiAgICAgICAgICAgIC8vUmVjb3JkcyBhdHRhY2tlZCBjZWxsIHdpdGggJ2hpdCcgKHByZXZlbnRzIGZ1dHVyZSAuc2hpcC5oaXQpXG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9ICdoaXQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2FyZFt5XVt4XTtcbiAgICB9XG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHBsYWNlZFNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgcGxhY2VkU2hpcHMgPSBbXTtcbiAgfVxuICAgIHJldHVybntcbiAgICAgICAgZ2V0Qm9hcmQsXG4gICAgICAgIGFyZUFsbFNoaXBzQXJlUGxhY2VkLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGF1dG9QbGFjZUZsZWV0LFxuICAgICAgICByZWNpZXZlQXR0YWNrLFxuICAgICAgICBhcmVBbGxTaGlwc1N1bmssXG4gICAgICAgIHJlc2V0XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkOyIsImltcG9ydCB7IFNISVBfVFlQRVMsIHJhbmRDb29yZHMsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcblxuZnVuY3Rpb24gcGxheWVyKHR5cGUgPSAnaHVtYW4nKXtcbiAgICBsZXQgZmxlZXQgPSBjcmVhdGVGbGVldChTSElQX1RZUEVTKTtcblxuICAgIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlO1xuICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4gZmxlZXQ7XG4gICAgLy9BdHRhY2tzIGVuZW15IGJvYXJkIGF0IGNvcmRzIFt5XVt4XVxuICAgIGNvbnN0IGF0dGFjayA9ICh5LCB4LCBlbmVteUJvYXJkKSA9PiBlbmVteUJvYXJkLnJlY2lldmVBdHRhY2soeSwgeCk7XG4gICAgXG4gICAgY29uc3QgYXV0b0F0dGFjayA9IChlbmVteUJvYXJkKSA9PntcbiAgICAgICAgY29uc3QgW3kseF0gPSByYW5kQ29vcmRzKCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBlbmVteUJvYXJkLmdldEJvYXJkKClbeV1beF07XG4gICAgICAgIGlmKGNlbGwgPT09ICdtaXNzJyB8fCBjZWxsID09PSAnaGl0Jyl7XG4gICAgICAgICAgICAvL3RyaWVzIGFnYWluIHVudGlsIHZhbGlkIGNlbGwgaXMgaGl0XG4gICAgICAgICAgICBhdXRvQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vQXR0YWNrcyB2YWxpZCBjZWxsXG4gICAgICAgICAgICBlbmVteUJvYXJkLnJlY2lldmVBdHRhY2soeSx4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZXNldEZsZWV0ID0gKCkgPT4gKGZsZWV0ID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUykpO1xuXG4gICAgcmV0dXJue1xuICAgICAgICBnZXRUeXBlLFxuICAgICAgICBnZXRGbGVldCxcbiAgICAgICAgYXR0YWNrLFxuICAgICAgICBhdXRvQXR0YWNrLFxuICAgICAgICByZXNldEZsZWV0LFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjtcbiIsImltcG9ydCB7IFNISVBfTEVOR1RIIH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcbmZ1bmN0aW9uIHNoaXBGYWN0b3J5KHR5cGUpe1xuICAgIGNvbnN0IGlkID0gdHlwZTtcbiAgICBjb25zdCBsZW5ndGggPSBTSElQX0xFTkdUSFt0eXBlXTtcbiAgICBsZXQgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIGZ1bmN0aW9uIGdldERpcmVjdGlvbigpe1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGFuZ2VEaXJlY3Rpb24oKXtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpe1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJ1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaGl0XG4gICAgY29uc3QgaGl0cyA9IEFycmF5KGxlbmd0aCkuZmlsbChudWxsKTtcbiAgICBjb25zdCBoaXQgPSAoaSkgPT4oaGl0c1tpXSA9ICdoaXQnKTtcbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICAgIC8vaXNTdW5rIE1ldGhvZFxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdHMuZXZlcnkoKGgpID0+IGggPT09ICdoaXQnKTtcbiAgICBcbiAgICByZXR1cm4ge2lkLCBsZW5ndGgsIGdldERpcmVjdGlvbiwgY2hhbmdlRGlyZWN0aW9uLCBoaXQsIGdldEhpdHMsIGlzU3Vua307XG59XG5leHBvcnQgZGVmYXVsdCBzaGlwRmFjdG9yeTsiLCJpbXBvcnQgeyBlbGVtZW50cyB9IGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdyaWQoZ2FtZWJvYXJkLCBwbGF5ZXJzR3JpZCkge1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBsZW5ndGggPSBib2FyZC5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBzdGF0dXMgPSBib2FyZFtpXVtqXTtcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgc3RhdHVzID0gJ2JsYW5rJztcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNoaXApIHtcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzLnNoaXAuaWQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJywgYGNlbGwtJHtpfS0ke2p9YCwgc3RhdHVzKTtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC54ID0gajtcbiAgICAgIFxuICAgICAgcGxheWVyc0dyaWQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkKGdhbWVib2FyZCwgcGxheWVyc0dyaWQpe1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBsZW5ndGggPSBib2FyZC5sZW5ndGg7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgZm9yKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKXtcbiAgICAgIGlmKGJvYXJkW2ldW2pdID09PSAnaGl0Jyl7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBwbGF5ZXJzR3JpZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15ID0gXCIke2l9XCJdW2RhdGEteCA9IFwiJHtqfVwiXWApO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICd4JztcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcnJpZXInKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XG4gICAgICAgIH0gZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlc2hpcCcpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnXG4gICAgICAgIH0gZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnY3J1aXNlcicpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbidcbiAgICAgICAgfSBlbHNlIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWJtYXJpbmUnKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICB9ZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZGVzdHJveWVyJykpe1xuICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSdcbiAgICAgICAgfVxuICAgICAgfWVsc2UgaWYoYm9hcmRbaV1bal0gPT09ICdtaXNzJyl7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBwbGF5ZXJzR3JpZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15ID0gXCIke2l9XCJdW2RhdGEteCA9IFwiJHtqfVwiXWApO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdtJztcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYmxhbmsnKTtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyV2lubmVyKHdpbm5lcil7XG4gIGVsZW1lbnRzLmluZm9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBlbGVtZW50cy5pbmZvVGV4dC50ZXh0Q29udGVudCA9IGAke3dpbm5lci50b1VwcGVyQ2FzZSgpfWA7XG59XG5leHBvcnQgZnVuY3Rpb24gc3RhcnRHYW1lKCl7XG4gIGVsZW1lbnRzLnBsYWNlbWVudENvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGVsZW1lbnRzLnAyR2FtZWJvYXJkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXlOZXdHYW1lKCl7XG4gIGVsZW1lbnRzLmluZm9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBlbGVtZW50cy5wMUdyaWQudGV4dENvbnRlbnQgPSAnJztcbiAgZWxlbWVudHMucDJHcmlkLnRleHRDb250ZW50ID0gJyc7XG4gIGVsZW1lbnRzLnAyR2FtZWJvYXJkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZWxlbWVudHMucGxhY2VtZW50Q29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn1cbmZ1bmN0aW9uIGNsZWFyR3JpZChncmlkKSB7XG4gIHdoaWxlIChncmlkLmZpcnN0Q2hpbGQpIHtcbiAgICBncmlkLnJlbW92ZUNoaWxkKGdyaWQuZmlyc3RDaGlsZCk7XG4gIH1cbn0iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4uL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeVwiO1xuXG5leHBvcnQgY29uc3QgU0hJUF9UWVBFUyA9IFtcbiAgICAnY2FycmllcicsXG4gICAgJ2JhdHRsZXNoaXAnLFxuICAgICdjcnVpc2VyJyxcbiAgICAnc3VibWFyaW5lJyxcbiAgICAnZGVzdHJveWVyJ1xuXVxuXG5leHBvcnQgY29uc3QgU0hJUF9MRU5HVEggPSB7XG4gICAgY2FycmllcjogNSxcbiAgICBiYXR0bGVzaGlwOiA0LFxuICAgIGNydWlzZXI6IDMsXG4gICAgc3VibWFyaW5lOiAzLFxuICAgIGRlc3Ryb3llcjogMixcbn1cblxuY29uc3QgcmFuZCA9IChzaXplID0gMTApID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNpemUpO1xuZXhwb3J0IGNvbnN0IHJhbmRDb29yZHMgPSAoc2l6ZSA9IDEwKSA9PiBbcmFuZChzaXplKSwgcmFuZChzaXplKV07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldCh0eXBlcyl7XG4gICAgLy9DcmVhdGVzIGFuIG9iamVjdCBvZiBzaGlwc1xuICAgIGNvbnN0IGZsZWV0ID0ge307XG4gICAgdHlwZXMuZm9yRWFjaCgodHlwZSkgPT4gKGZsZWV0W3R5cGVdID0gc2hpcEZhY3RvcnkodHlwZSkpKTtcbiAgICByZXR1cm4gZmxlZXQ7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVCb2FyZFwiO1xuaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyXCI7XG5pbXBvcnQge3BsYXlOZXdHYW1lLCByZW5kZXJHcmlkfSBmcm9tIFwiLi9nYW1lYm9hcmRWaWV3XCJcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBTSElQX1RZUEVTIH0gZnJvbSBcIi4vaGVscGVyL2hlbHBlclwiO1xuaW1wb3J0IHsgZWxlbWVudHMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgZ2FtZSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZVwiO1xuXG5sZXQgZ2FtZTEgPSBnYW1lKCk7XG5nYW1lMS5yZW5kZXJGbGVldHMoKTtcbmdhbWUxLnJlbmRlckdyaWRzKCk7XG5nYW1lMS5hdXRvUGxhY2VQbGF5ZXJTaGlwc0V2ZW50TGlzdGVuZXIoKTtcbmdhbWUxLmFkZFBsYXlBZ2FpbkV2ZW50KCk7XG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9