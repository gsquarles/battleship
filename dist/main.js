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
    fleetContainer: document.querySelector('.fleetContainer'),
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
        currentShipIndex = 0;
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.fleetContainer.innerHTML = "Place Carrier";
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

    let currentShipIndex = 0;
    let currentShipDirection = 'horizontal';


    function placeCurrentShip(y,x){
        const currentShipType = _helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES[currentShipIndex];
        const currentShip = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(currentShipType);
        
        const isValidPlacement = p1Board.placeShip(currentShip, y, x, currentShipDirection);
        if (isValidPlacement){
            (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderPlayer1Grid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
            console.log(currentShip.getDirection());
            //move on to next ship
            currentShipIndex++;

            if(currentShipIndex < _helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES.length){
                console.log(`Placed ${currentShipType}, now placing ${_helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES[currentShipIndex]}`);
                _base__WEBPACK_IMPORTED_MODULE_3__.elements.fleetContainer.innerHTML = `Placed ${currentShipType}, now placing ${_helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES[currentShipIndex]}`;
                
            } else{
                console.log('All Ships Are Placed');
                console.log(p1Board.getBoard());
                addGridEventListener();
                (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.startGame)();
            }
        } else {
            console.log('Invalid Placement, please try again');
        }
    }

    
    function renderGrids(){
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderGrid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.renderGrid)(p2Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid);
    }
    function renderPlayerGrid(){
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r') {
              currentShipDirection = currentShipDirection === 'horizontal' ? 'vertical' : 'horizontal';
              console.log('Direction Changed');
              console.log(currentShipDirection);
            }
          });
        
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.addEventListener('click', (e) =>{
            const targetCell = e.target;
            const y = parseInt(targetCell.dataset.y);
            const x = parseInt(targetCell.dataset.x);
            placeCurrentShip(y,x);
        })
    }
    function updateGrids(){
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.updateGrid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.updateGrid)(p2Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p2Grid);
    }
    function updateP1Grid(){
        (0,_gameboardView__WEBPACK_IMPORTED_MODULE_4__.updateGrid)(p1Board, _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid);
    }
    function renderFleets(){
        p2Board.autoPlaceFleet(p2.getFleet());
    }

    function autoPlacePlayerShips(){
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.textContent = '';
        p1Board.autoPlaceFleet(p1.getFleet());
        console.log(p1.getFleet());
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
        placeCurrentShip,
        updateP1Grid,
        renderPlayerGrid
        
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

    function adjustCoords(y0, x0, i, direction) {
        if (direction === 'horizontal') {
          return [y0, x0 + i];
        } else {
          return [y0 + i, x0];
        }
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
    function placeShip(ship, y0, x0, direction){
        //const direction = ship.getDirection();
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
        const direction = ship.getDirection();
        if(randomNum > 5) ship.changeDirection();
        const placed = placeShip(ship, y, x, direction);
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
/* harmony export */   "renderPlayer1Grid": () => (/* binding */ renderPlayer1Grid),
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

function renderPlayer1Grid(gameboard, playersGrid) {
  const board = gameboard.getBoard();
  const length = board.length;

  playersGrid.innerHTML = '';

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
        cell.innerText = '\u2022';
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
game1.renderPlayerGrid();




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0w4QztBQUNJO0FBQ1Y7QUFDZTtBQUNHO0FBQ3hCO0FBQ0U7O0FBRXBDLFlBQVksMkRBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYmFzZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRWaWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVscGVyL2hlbHBlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZWxlbWVudHMgPSB7XG4gICAgcDFHYW1lYm9hcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMS1nYW1lYm9hcmQnKSxcbiAgICBwMkdhbWVib2FyZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAyLWdhbWVib2FyZCcpLFxuICAgIHAxR3JpZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAxLWdyaWQnKSxcbiAgICBwMkdyaWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMi1ncmlkJyksXG4gICAgaW5mb0NvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9Db250YWluZXInKSxcbiAgICBpbmZvVGV4dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9UZXh0JyksXG4gICAgcGxheUFnYWluQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheUFnYWluJyksXG4gICAgYXV0b1BsYWNlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0b1BsYWNlQnRuJyksXG4gICAgcGxhY2VtZW50Q29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2VtZW50Q29udGFpbmVyJyksXG4gICAgZmxlZXRDb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGVldENvbnRhaW5lcicpLFxufSIsImltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4uL2ZhY3Rvcmllcy9nYW1lQm9hcmRcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi4vZmFjdG9yaWVzL3NoaXBGYWN0b3J5XCI7XG5pbXBvcnQgcGxheWVyIGZyb20gXCIuLi9mYWN0b3JpZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBlbGVtZW50cyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkLCB1cGRhdGVHcmlkLCByZW5kZXJXaW5uZXIsIHBsYXlOZXdHYW1lLCBzdGFydEdhbWUsIHJlbmRlclBsYXllcjFHcmlkIH0gZnJvbSBcIi4uL2dhbWVib2FyZFZpZXdcIjtcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBTSElQX1RZUEVTIH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcblxuLy9Jbml0XG5mdW5jdGlvbiBnYW1lKCl7XG4gICAgLy9jcmVhdGUgcGxheWVyc1xuICAgIGNvbnN0IHAxID0gcGxheWVyKCdodW1hbicpO1xuICAgIGNvbnN0IHAyID0gcGxheWVyKCdjb21wdXRlcicpO1xuXG4gICAgLy9jcmVhdGUgYm9hcmRzXG4gICAgY29uc3QgcDFCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICAgIGNvbnN0IHAyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgICBcbiAgICAvL3Jlc2V0IGdhbWVcbiAgICBmdW5jdGlvbiByZXNldEdhbWUoKXtcbiAgICAgICAgcDEucmVzZXRGbGVldCgpO1xuICAgICAgICBwMi5yZXNldEZsZWV0KCk7XG4gICAgICAgIHAxQm9hcmQucmVzZXQoKTtcbiAgICAgICAgcDJCb2FyZC5yZXNldCgpO1xuICAgICAgICBjdXJyZW50U2hpcEluZGV4ID0gMDtcbiAgICAgICAgZWxlbWVudHMuZmxlZXRDb250YWluZXIuaW5uZXJIVE1MID0gXCJQbGFjZSBDYXJyaWVyXCI7XG4gICAgfTtcblxuICAgIC8vY3RybEF0dGFjayBmdW5jdGlvbiBmb3IgZXZlbnRMaXN0ZW5lcnNcbiAgICBmdW5jdGlvbiBjdHJsQXR0YWNrKGUpe1xuICAgICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICAgIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwnKSl7XG4gICAgICAgICAgICAvLzEuIEdldCBjb29yZHMgZnJvbSBib2FyZFxuICAgICAgICAgICAgY29uc3QgeSA9IGNlbGwuZGF0YXNldC55O1xuICAgICAgICAgICAgY29uc3QgeCA9IGNlbGwuZGF0YXNldC54O1xuXG4gICAgICAgICAgICAvLzIuQ2hlY2sgaWYgY2VsbCBoYXMgYmVlbiBhdHRhY2tlZFxuICAgICAgICAgICAgY29uc3QgYm9hcmRDZWxsID0gcDJCb2FyZC5nZXRCb2FyZCgpW3ldW3hdO1xuICAgICAgICAgICAgaWYoYm9hcmRDZWxsICE9PSAnbWlzcycgJiYgYm9hcmRDZWxsICE9PSAnaGl0Jyl7XG4gICAgICAgICAgICAgICAgLy8zLiBNYWtlcyBhdHRhY2sgZm9yIHAxICdodW1hbiBhbmQgcDIgJ2NvbXB1dGVyXG4gICAgICAgICAgICAgICAgcDEuYXR0YWNrKHksIHgsIHAyQm9hcmQpO1xuICAgICAgICAgICAgICAgIHAyLmF1dG9BdHRhY2socDFCb2FyZCk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvLzQuVXBkYXRlIEdyaWRzIGFmdGVyIGF0dGFja1xuICAgICAgICAgICAgICAgIHVwZGF0ZUdyaWRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLzUuIENoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xuICAgICAgICAgICAgaWYocDFCb2FyZC5hcmVBbGxTaGlwc1N1bmsoKSB8fCBwMkJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKXtcbiAgICAgICAgICAgICAgICBsZXQgd2lubmVyID0gJyc7XG4gICAgICAgICAgICAgICAgaWYocDFCb2FyZC5hcmVBbGxTaGlwc1N1bmsoKSl7XG4gICAgICAgICAgICAgICAgICAgIHdpbm5lciA9ICdDb21wdXRlciB3aW5zISc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbm5lcilcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocDJCb2FyZC5hcmVBbGxTaGlwc1N1bmsoKSl7XG4gICAgICAgICAgICAgICAgICAgIHdpbm5lciA9ICdZb3Ugd2luISc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbm5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vNi4gRGlzYWJsZSBldmVudExpc3RlbmVycyBmb3IgYXR0YWNrXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucDJHcmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjdHJsQXR0YWNrKTtcbiAgICAgICAgICAgICAgICAvL0Rpc3BsYXkgV2lubmVyIC8gUGxheSBhZ2FpbiBidXR0b25cbiAgICAgICAgICAgICAgICByZW5kZXJXaW5uZXIod2lubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQWRkaW5nIEV2ZW50IExpc3RlbmVycyB0byBncmlkcyBmb3IgY3RybEF0dGFja1xuICAgIGZ1bmN0aW9uIGFkZEdyaWRFdmVudExpc3RlbmVyKCl7XG4gICAgICAgIGlmKHAxQm9hcmQuYXJlQWxsU2hpcHNBcmVQbGFjZWQoKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBpZihwMi5nZXRUeXBlID09PSAnaHVtYW4nKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wMUdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHJsQXR0YWNrKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wMkdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHJsQXR0YWNrKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnAyR3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnRTaGlwSW5kZXggPSAwO1xuICAgIGxldCBjdXJyZW50U2hpcERpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcblxuXG4gICAgZnVuY3Rpb24gcGxhY2VDdXJyZW50U2hpcCh5LHgpe1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcFR5cGUgPSBTSElQX1RZUEVTW2N1cnJlbnRTaGlwSW5kZXhdO1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHNoaXBGYWN0b3J5KGN1cnJlbnRTaGlwVHlwZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpc1ZhbGlkUGxhY2VtZW50ID0gcDFCb2FyZC5wbGFjZVNoaXAoY3VycmVudFNoaXAsIHksIHgsIGN1cnJlbnRTaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGlzVmFsaWRQbGFjZW1lbnQpe1xuICAgICAgICAgICAgcmVuZGVyUGxheWVyMUdyaWQocDFCb2FyZCwgZWxlbWVudHMucDFHcmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTaGlwLmdldERpcmVjdGlvbigpKTtcbiAgICAgICAgICAgIC8vbW92ZSBvbiB0byBuZXh0IHNoaXBcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwSW5kZXgrKztcblxuICAgICAgICAgICAgaWYoY3VycmVudFNoaXBJbmRleCA8IFNISVBfVFlQRVMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUGxhY2VkICR7Y3VycmVudFNoaXBUeXBlfSwgbm93IHBsYWNpbmcgJHtTSElQX1RZUEVTW2N1cnJlbnRTaGlwSW5kZXhdfWApO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZsZWV0Q29udGFpbmVyLmlubmVySFRNTCA9IGBQbGFjZWQgJHtjdXJyZW50U2hpcFR5cGV9LCBub3cgcGxhY2luZyAke1NISVBfVFlQRVNbY3VycmVudFNoaXBJbmRleF19YDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWxsIFNoaXBzIEFyZSBQbGFjZWQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwMUJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgICAgIGFkZEdyaWRFdmVudExpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgc3RhcnRHYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBQbGFjZW1lbnQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIGZ1bmN0aW9uIHJlbmRlckdyaWRzKCl7XG4gICAgICAgIHJlbmRlckdyaWQocDFCb2FyZCwgZWxlbWVudHMucDFHcmlkKTtcbiAgICAgICAgcmVuZGVyR3JpZChwMkJvYXJkLCBlbGVtZW50cy5wMkdyaWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJQbGF5ZXJHcmlkKCl7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAncicpIHtcbiAgICAgICAgICAgICAgY3VycmVudFNoaXBEaXJlY3Rpb24gPSBjdXJyZW50U2hpcERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RpcmVjdGlvbiBDaGFuZ2VkJyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnRzLnAxR3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PntcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZUludCh0YXJnZXRDZWxsLmRhdGFzZXQueSk7XG4gICAgICAgICAgICBjb25zdCB4ID0gcGFyc2VJbnQodGFyZ2V0Q2VsbC5kYXRhc2V0LngpO1xuICAgICAgICAgICAgcGxhY2VDdXJyZW50U2hpcCh5LHgpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVHcmlkcygpe1xuICAgICAgICB1cGRhdGVHcmlkKHAxQm9hcmQsIGVsZW1lbnRzLnAxR3JpZCk7XG4gICAgICAgIHVwZGF0ZUdyaWQocDJCb2FyZCwgZWxlbWVudHMucDJHcmlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlUDFHcmlkKCl7XG4gICAgICAgIHVwZGF0ZUdyaWQocDFCb2FyZCwgZWxlbWVudHMucDFHcmlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyRmxlZXRzKCl7XG4gICAgICAgIHAyQm9hcmQuYXV0b1BsYWNlRmxlZXQocDIuZ2V0RmxlZXQoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXV0b1BsYWNlUGxheWVyU2hpcHMoKXtcbiAgICAgICAgZWxlbWVudHMucDFHcmlkLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHAxQm9hcmQuYXV0b1BsYWNlRmxlZXQocDEuZ2V0RmxlZXQoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHAxLmdldEZsZWV0KCkpO1xuICAgICAgICByZW5kZXJHcmlkKHAxQm9hcmQsIGVsZW1lbnRzLnAxR3JpZCk7XG4gICAgICAgIGFkZEdyaWRFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIHN0YXJ0R2FtZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdXRvUGxhY2VQbGF5ZXJTaGlwc0V2ZW50TGlzdGVuZXIoKXtcbiAgICAgICAgZWxlbWVudHMuYXV0b1BsYWNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXV0b1BsYWNlUGxheWVyU2hpcHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXlBZ2Fpbigpe1xuICAgICAgICBwbGF5TmV3R2FtZSgpO1xuICAgICAgICByZXNldEdhbWUoKTtcbiAgICAgICAgcmVuZGVyRmxlZXRzKCk7XG4gICAgICAgIHJlbmRlckdyaWRzKCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFBsYXlBZ2FpbkV2ZW50KCl7XG4gICAgICAgIGVsZW1lbnRzLnBsYXlBZ2FpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlBZ2Fpbik7XG4gICAgfVxuXG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3RybEF0dGFjayxcbiAgICAgICAgcmVuZGVyR3JpZHMsXG4gICAgICAgIHJlbmRlckZsZWV0cyxcbiAgICAgICAgYWRkR3JpZEV2ZW50TGlzdGVuZXIsXG4gICAgICAgIGFkZFBsYXlBZ2FpbkV2ZW50LFxuICAgICAgICByZXNldEdhbWUsIFxuICAgICAgICBhdXRvUGxhY2VQbGF5ZXJTaGlwc0V2ZW50TGlzdGVuZXIsXG4gICAgICAgIHBsYWNlQ3VycmVudFNoaXAsXG4gICAgICAgIHVwZGF0ZVAxR3JpZCxcbiAgICAgICAgcmVuZGVyUGxheWVyR3JpZFxuICAgICAgICBcbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IHsgcmFuZENvb3JkcywgU0hJUF9UWVBFUyB9IGZyb20gXCIuLi9oZWxwZXIvaGVscGVyXCI7XG5mdW5jdGlvbiBnYW1lQm9hcmQoKXtcbiAgICAvL2NyZWF0aW5nIGEgMTB4MTAgYm9hcmQsIGNvb3JkcyBib2FyZFtyb3ddW2NvbF1cbiAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbChudWxsKS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgICBsZXQgcGxhY2VkU2hpcHMgPSBbXTtcbiAgICBmdW5jdGlvbiBhcmVBbGxTaGlwc0FyZVBsYWNlZCgpe1xuICAgICAgICBpZihwbGFjZWRTaGlwcy5sZW5ndGggPT09IFNISVBfVFlQRVMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkanVzdENvb3Jkcyh5MCwgeDAsIGksIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICByZXR1cm4gW3kwLCB4MCArIGldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbeTAgKyBpLCB4MF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWQobGVuZ3RoLCBkaXJlY3Rpb24sIHkwLCB4MCl7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgW3kseF0gPSBhZGp1c3RDb29yZHMoeTAsIHgwLCBpLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgaWYoeSA8IDEwICYmIHggPCAxMCl7XG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChib2FyZFt5XVt4XSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsID09PSBudWxsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHkwLCB4MCwgZGlyZWN0aW9uKXtcbiAgICAgICAgLy9jb25zdCBkaXJlY3Rpb24gPSBzaGlwLmdldERpcmVjdGlvbigpO1xuICAgICAgICAvL0NoZWNrIGlmIHZhbGlkIHNwb3RcbiAgICAgICAgY29uc3QgdmFsaWQgPSBjaGVja1ZhbGlkKHNoaXAubGVuZ3RoLCBkaXJlY3Rpb24sIHkwLCB4MCk7XG4gICAgICAgIGlmKHZhbGlkKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBjb25zdCBbeSx4XSA9IGFkanVzdENvb3Jkcyh5MCwgeDAsIGksIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgLy9wbGFjZXMgc2hpcCB3aXRoIGluZGV4XG4gICAgICAgICAgICAgICAgYm9hcmRbeV1beF0gPSB7c2hpcCwgaW5kZXg6IGl9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9hZGRzIGl0IHRvIHBsYWNlZCBzaGlwc1xuICAgICAgICAgICAgcGxhY2VkU2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYXV0b1BsYWNlKHNoaXApe1xuICAgICAgICBjb25zdCBbeSwgeF0gPSByYW5kQ29vcmRzKCk7XG4gICAgICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNoaXAuZ2V0RGlyZWN0aW9uKCk7XG4gICAgICAgIGlmKHJhbmRvbU51bSA+IDUpIHNoaXAuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHBsYWNlZCA9IHBsYWNlU2hpcChzaGlwLCB5LCB4LCBkaXJlY3Rpb24pO1xuICAgICAgICBpZighcGxhY2VkKSBhdXRvUGxhY2Uoc2hpcCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF1dG9QbGFjZUZsZWV0KGZsZWV0KXtcbiAgICAgICAgZm9yKGNvbnN0IHNoaXAgaW4gZmxlZXQpe1xuICAgICAgICAgICAgYXV0b1BsYWNlKGZsZWV0W3NoaXBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soeSx4KXtcbiAgICAgICAgLy9EZXRlcm1pbmVzIGlmIGF0dGFjayBoaXQgc2hpcFxuICAgICAgICBpZihib2FyZFt5XVt4XSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAvL3JlY29yZHMgbWlzc2VkIHNob3RcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdID0gJ21pc3MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYm9hcmRbeV1beF0uc2hpcCl7XG4gICAgICAgICAgICAvL2NhbGxzIGhpdCBmdW5jdGlvbiBvbiBjb3JyZWN0IHNoaXBcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdLnNoaXAuaGl0KGJvYXJkW3ldW3hdLmluZGV4KTtcbiAgICAgICAgICAgIC8vUmVjb3JkcyBhdHRhY2tlZCBjZWxsIHdpdGggJ2hpdCcgKHByZXZlbnRzIGZ1dHVyZSAuc2hpcC5oaXQpXG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9ICdoaXQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2FyZFt5XVt4XTtcbiAgICB9XG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHBsYWNlZFNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgcGxhY2VkU2hpcHMgPSBbXTtcbiAgfVxuICAgIHJldHVybntcbiAgICAgICAgZ2V0Qm9hcmQsXG4gICAgICAgIGFyZUFsbFNoaXBzQXJlUGxhY2VkLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGF1dG9QbGFjZUZsZWV0LFxuICAgICAgICByZWNpZXZlQXR0YWNrLFxuICAgICAgICBhcmVBbGxTaGlwc1N1bmssXG4gICAgICAgIHJlc2V0XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkOyIsImltcG9ydCB7IFNISVBfVFlQRVMsIHJhbmRDb29yZHMsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcblxuZnVuY3Rpb24gcGxheWVyKHR5cGUgPSAnaHVtYW4nKXtcbiAgICBsZXQgZmxlZXQgPSBjcmVhdGVGbGVldChTSElQX1RZUEVTKTtcblxuICAgIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlO1xuICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4gZmxlZXQ7XG4gICAgLy9BdHRhY2tzIGVuZW15IGJvYXJkIGF0IGNvcmRzIFt5XVt4XVxuICAgIGNvbnN0IGF0dGFjayA9ICh5LCB4LCBlbmVteUJvYXJkKSA9PiBlbmVteUJvYXJkLnJlY2lldmVBdHRhY2soeSwgeCk7XG4gICAgXG4gICAgY29uc3QgYXV0b0F0dGFjayA9IChlbmVteUJvYXJkKSA9PntcbiAgICAgICAgY29uc3QgW3kseF0gPSByYW5kQ29vcmRzKCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBlbmVteUJvYXJkLmdldEJvYXJkKClbeV1beF07XG4gICAgICAgIGlmKGNlbGwgPT09ICdtaXNzJyB8fCBjZWxsID09PSAnaGl0Jyl7XG4gICAgICAgICAgICAvL3RyaWVzIGFnYWluIHVudGlsIHZhbGlkIGNlbGwgaXMgaGl0XG4gICAgICAgICAgICBhdXRvQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vQXR0YWNrcyB2YWxpZCBjZWxsXG4gICAgICAgICAgICBlbmVteUJvYXJkLnJlY2lldmVBdHRhY2soeSx4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZXNldEZsZWV0ID0gKCkgPT4gKGZsZWV0ID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUykpO1xuXG4gICAgcmV0dXJue1xuICAgICAgICBnZXRUeXBlLFxuICAgICAgICBnZXRGbGVldCxcbiAgICAgICAgYXR0YWNrLFxuICAgICAgICBhdXRvQXR0YWNrLFxuICAgICAgICByZXNldEZsZWV0LFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjtcbiIsImltcG9ydCB7IFNISVBfTEVOR1RIIH0gZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcbmZ1bmN0aW9uIHNoaXBGYWN0b3J5KHR5cGUpe1xuICAgIGNvbnN0IGlkID0gdHlwZTtcbiAgICBjb25zdCBsZW5ndGggPSBTSElQX0xFTkdUSFt0eXBlXTtcbiAgICBsZXQgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIGZ1bmN0aW9uIGdldERpcmVjdGlvbigpe1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGFuZ2VEaXJlY3Rpb24oKXtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpe1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJ1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaGl0XG4gICAgY29uc3QgaGl0cyA9IEFycmF5KGxlbmd0aCkuZmlsbChudWxsKTtcbiAgICBjb25zdCBoaXQgPSAoaSkgPT4oaGl0c1tpXSA9ICdoaXQnKTtcbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICAgIC8vaXNTdW5rIE1ldGhvZFxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdHMuZXZlcnkoKGgpID0+IGggPT09ICdoaXQnKTtcbiAgICBcbiAgICByZXR1cm4ge2lkLCBsZW5ndGgsIGdldERpcmVjdGlvbiwgY2hhbmdlRGlyZWN0aW9uLCBoaXQsIGdldEhpdHMsIGlzU3Vua307XG59XG5leHBvcnQgZGVmYXVsdCBzaGlwRmFjdG9yeTsiLCJpbXBvcnQgeyBlbGVtZW50cyB9IGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdyaWQoZ2FtZWJvYXJkLCBwbGF5ZXJzR3JpZCkge1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBsZW5ndGggPSBib2FyZC5sZW5ndGg7XG5cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgbGV0IHN0YXR1cyA9IGJvYXJkW2ldW2pdO1xuICAgICAgaWYgKHN0YXR1cyA9PT0gbnVsbCkge1xuICAgICAgICBzdGF0dXMgPSAnYmxhbmsnO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc2hpcCkge1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMuc2hpcC5pZDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnLCBgY2VsbC0ke2l9LSR7an1gLCBzdGF0dXMpO1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnggPSBqO1xuICAgICAgXG4gICAgICBwbGF5ZXJzR3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclBsYXllcjFHcmlkKGdhbWVib2FyZCwgcGxheWVyc0dyaWQpIHtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgbGVuZ3RoID0gYm9hcmQubGVuZ3RoO1xuXG4gIHBsYXllcnNHcmlkLmlubmVySFRNTCA9ICcnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgc3RhdHVzID0gYm9hcmRbaV1bal07XG4gICAgICBpZiAoc3RhdHVzID09PSBudWxsKSB7XG4gICAgICAgIHN0YXR1cyA9ICdibGFuayc7XG4gICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zaGlwKSB7XG4gICAgICAgIHN0YXR1cyA9IHN0YXR1cy5zaGlwLmlkO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcsIGBjZWxsLSR7aX0tJHtqfWAsIHN0YXR1cyk7XG4gICAgICBjZWxsLmRhdGFzZXQueSA9IGk7XG4gICAgICBjZWxsLmRhdGFzZXQueCA9IGo7XG4gICAgICBcbiAgICAgIHBsYXllcnNHcmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR3JpZChnYW1lYm9hcmQsIHBsYXllcnNHcmlkKXtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgbGVuZ3RoID0gYm9hcmQubGVuZ3RoO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgIGZvcihsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKyl7XG4gICAgICBpZihib2FyZFtpXVtqXSA9PT0gJ2hpdCcpe1xuICAgICAgICBjb25zdCBjZWxsID0gcGxheWVyc0dyaWQucXVlcnlTZWxlY3RvcihgW2RhdGEteSA9IFwiJHtpfVwiXVtkYXRhLXggPSBcIiR7an1cIl1gKTtcbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSAneCc7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJyaWVyJykpe1xuICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnO1xuICAgICAgICB9IGVsc2UgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZXNoaXAnKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93J1xuICAgICAgICB9IGVsc2UgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2NydWlzZXInKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nXG4gICAgICAgIH0gZWxzZSBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc3VibWFyaW5lJykpe1xuICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgfWVsc2UgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc3Ryb3llcicpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnXG4gICAgICAgIH1cbiAgICAgIH1lbHNlIGlmKGJvYXJkW2ldW2pdID09PSAnbWlzcycpe1xuICAgICAgICBjb25zdCBjZWxsID0gcGxheWVyc0dyaWQucXVlcnlTZWxlY3RvcihgW2RhdGEteSA9IFwiJHtpfVwiXVtkYXRhLXggPSBcIiR7an1cIl1gKTtcbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSAnXFx1MjAyMic7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2JsYW5rJyk7XG4gICAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldpbm5lcih3aW5uZXIpe1xuICBlbGVtZW50cy5pbmZvQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZWxlbWVudHMuaW5mb1RleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXIudG9VcHBlckNhc2UoKX1gO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xuICBlbGVtZW50cy5wbGFjZW1lbnRDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBlbGVtZW50cy5wMkdhbWVib2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5TmV3R2FtZSgpe1xuICBlbGVtZW50cy5pbmZvQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZWxlbWVudHMucDFHcmlkLnRleHRDb250ZW50ID0gJyc7XG4gIGVsZW1lbnRzLnAyR3JpZC50ZXh0Q29udGVudCA9ICcnO1xuICBlbGVtZW50cy5wMkdhbWVib2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGVsZW1lbnRzLnBsYWNlbWVudENvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59XG4iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4uL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeVwiO1xuXG5leHBvcnQgY29uc3QgU0hJUF9UWVBFUyA9IFtcbiAgICAnY2FycmllcicsXG4gICAgJ2JhdHRsZXNoaXAnLFxuICAgICdjcnVpc2VyJyxcbiAgICAnc3VibWFyaW5lJyxcbiAgICAnZGVzdHJveWVyJ1xuXVxuXG5leHBvcnQgY29uc3QgU0hJUF9MRU5HVEggPSB7XG4gICAgY2FycmllcjogNSxcbiAgICBiYXR0bGVzaGlwOiA0LFxuICAgIGNydWlzZXI6IDMsXG4gICAgc3VibWFyaW5lOiAzLFxuICAgIGRlc3Ryb3llcjogMixcbn1cblxuY29uc3QgcmFuZCA9IChzaXplID0gMTApID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNpemUpO1xuZXhwb3J0IGNvbnN0IHJhbmRDb29yZHMgPSAoc2l6ZSA9IDEwKSA9PiBbcmFuZChzaXplKSwgcmFuZChzaXplKV07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldCh0eXBlcyl7XG4gICAgLy9DcmVhdGVzIGFuIG9iamVjdCBvZiBzaGlwc1xuICAgIGNvbnN0IGZsZWV0ID0ge307XG4gICAgdHlwZXMuZm9yRWFjaCgodHlwZSkgPT4gKGZsZWV0W3R5cGVdID0gc2hpcEZhY3RvcnkodHlwZSkpKTtcbiAgICByZXR1cm4gZmxlZXQ7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVCb2FyZFwiO1xuaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyXCI7XG5pbXBvcnQge3BsYXlOZXdHYW1lLCByZW5kZXJHcmlkfSBmcm9tIFwiLi9nYW1lYm9hcmRWaWV3XCJcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBTSElQX1RZUEVTIH0gZnJvbSBcIi4vaGVscGVyL2hlbHBlclwiO1xuaW1wb3J0IHsgZWxlbWVudHMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgZ2FtZSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZVwiO1xuXG5sZXQgZ2FtZTEgPSBnYW1lKCk7XG5nYW1lMS5yZW5kZXJGbGVldHMoKTtcbmdhbWUxLnJlbmRlckdyaWRzKCk7XG5nYW1lMS5hdXRvUGxhY2VQbGF5ZXJTaGlwc0V2ZW50TGlzdGVuZXIoKTtcbmdhbWUxLmFkZFBsYXlBZ2FpbkV2ZW50KCk7XG5nYW1lMS5yZW5kZXJQbGF5ZXJHcmlkKCk7XG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=