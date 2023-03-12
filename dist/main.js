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
    
      
      // event listener for mouseout
      function handleCellMouseOut(e) {
        // remove class from all preview cells
        const previewCells = document.querySelectorAll('.ship-preview');
        for (const cell of previewCells) {
          cell.classList.remove('ship-preview');
        }
      }
      function getShipDirection() {
        return currentShipDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      
    function renderPlayerGrid(){
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r') {
              currentShipDirection = currentShipDirection === 'horizontal' ? 'vertical' : 'horizontal';
              console.log('direction changed');
            }
          });
        _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.addEventListener('mouseover', (e)=>{
            const targetCell  = e.target;
            const y = parseInt(targetCell.dataset.y);
            const x = parseInt(targetCell.dataset.x);
      
            // get ship length and direction
            const currentShipType = _helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_TYPES[currentShipIndex];
            const currentShipLength = _helper_helper__WEBPACK_IMPORTED_MODULE_5__.SHIP_LENGTH[currentShipType];
            const currentShipDirection = getShipDirection();
      
            // calculate cells that ship will occupy
            const occupiedCells = [];
            for (let i = 0; i < currentShipLength; i++) {
            if (currentShipDirection === 'vertical') {
                occupiedCells.push({y, x: x + i});
            } else {
                occupiedCells.push({y: y + i, x});
            }
            }
      
            // add class to preview cells
            for (const cell of occupiedCells) {
            const previewCell = document.querySelector(`.cell-${cell.y}-${cell.x}`);
            if (previewCell) {
                previewCell.classList.add('ship-preview');
            }
            }  
          })
          _base__WEBPACK_IMPORTED_MODULE_3__.elements.p1Grid.addEventListener('mouseout', ()=>{
            // remove class from all preview cells
            const previewCells = document.querySelectorAll('.ship-preview');
            for (const cell of previewCells) {
            cell.classList.remove('ship-preview');
            }
            
          })
        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsd0VBQXFDO0FBQ3ZDOztBQUVPO0FBQ1AsRUFBRSwwRUFBdUM7QUFDekMsRUFBRSw4REFBMkI7QUFDN0IsRUFBRSw4REFBMkI7QUFDN0IsRUFBRSx3RUFBcUM7QUFDdkMsRUFBRSwrRUFBNEM7QUFDOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoR21EOztBQUU1QztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPOztBQUVBO0FBQ1A7QUFDQTtBQUNBLDJDQUEyQyxrRUFBVztBQUN0RDtBQUNBOzs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMOEM7QUFDSTtBQUNWO0FBQ2U7QUFDRztBQUN4QjtBQUNFOztBQUVwQyxZQUFZLDJEQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkVmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hlbHBlci9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVsZW1lbnRzID0ge1xuICAgIHAxR2FtZWJvYXJkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucDEtZ2FtZWJvYXJkJyksXG4gICAgcDJHYW1lYm9hcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMi1nYW1lYm9hcmQnKSxcbiAgICBwMUdyaWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wMS1ncmlkJyksXG4gICAgcDJHcmlkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucDItZ3JpZCcpLFxuICAgIGluZm9Db250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvQ29udGFpbmVyJyksXG4gICAgaW5mb1RleHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvVGV4dCcpLFxuICAgIHBsYXlBZ2FpbkJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXlBZ2FpbicpLFxuICAgIGF1dG9QbGFjZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dG9QbGFjZUJ0bicpLFxuICAgIHBsYWNlbWVudENvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYWNlbWVudENvbnRhaW5lcicpLFxuICAgIGZsZWV0Q29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxlZXRDb250YWluZXInKSxcbn0iLCJpbXBvcnQgZ2FtZUJvYXJkIGZyb20gXCIuLi9mYWN0b3JpZXMvZ2FtZUJvYXJkXCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4uL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi4vZmFjdG9yaWVzL3BsYXllclwiO1xuaW1wb3J0IHsgZWxlbWVudHMgfSBmcm9tIFwiLi4vYmFzZVwiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCwgdXBkYXRlR3JpZCwgcmVuZGVyV2lubmVyLCBwbGF5TmV3R2FtZSwgc3RhcnRHYW1lLCByZW5kZXJQbGF5ZXIxR3JpZCB9IGZyb20gXCIuLi9nYW1lYm9hcmRWaWV3XCI7XG5pbXBvcnQgeyBjcmVhdGVGbGVldCwgU0hJUF9UWVBFUywgU0hJUF9MRU5HVEggfSBmcm9tIFwiLi4vaGVscGVyL2hlbHBlclwiO1xuXG4vL0luaXRcbmZ1bmN0aW9uIGdhbWUoKXtcbiAgICAvL2NyZWF0ZSBwbGF5ZXJzXG4gICAgY29uc3QgcDEgPSBwbGF5ZXIoJ2h1bWFuJyk7XG4gICAgY29uc3QgcDIgPSBwbGF5ZXIoJ2NvbXB1dGVyJyk7XG5cbiAgICAvL2NyZWF0ZSBib2FyZHNcbiAgICBjb25zdCBwMUJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gICAgY29uc3QgcDJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICAgIFxuICAgIC8vcmVzZXQgZ2FtZVxuICAgIGZ1bmN0aW9uIHJlc2V0R2FtZSgpe1xuICAgICAgICBwMS5yZXNldEZsZWV0KCk7XG4gICAgICAgIHAyLnJlc2V0RmxlZXQoKTtcbiAgICAgICAgcDFCb2FyZC5yZXNldCgpO1xuICAgICAgICBwMkJvYXJkLnJlc2V0KCk7XG4gICAgICAgIGN1cnJlbnRTaGlwSW5kZXggPSAwO1xuICAgICAgICBlbGVtZW50cy5mbGVldENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlBsYWNlIENhcnJpZXJcIjtcbiAgICB9O1xuXG4gICAgLy9jdHJsQXR0YWNrIGZ1bmN0aW9uIGZvciBldmVudExpc3RlbmVyc1xuICAgIGZ1bmN0aW9uIGN0cmxBdHRhY2soZSl7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbCcpKXtcbiAgICAgICAgICAgIC8vMS4gR2V0IGNvb3JkcyBmcm9tIGJvYXJkXG4gICAgICAgICAgICBjb25zdCB5ID0gY2VsbC5kYXRhc2V0Lnk7XG4gICAgICAgICAgICBjb25zdCB4ID0gY2VsbC5kYXRhc2V0Lng7XG5cbiAgICAgICAgICAgIC8vMi5DaGVjayBpZiBjZWxsIGhhcyBiZWVuIGF0dGFja2VkXG4gICAgICAgICAgICBjb25zdCBib2FyZENlbGwgPSBwMkJvYXJkLmdldEJvYXJkKClbeV1beF07XG4gICAgICAgICAgICBpZihib2FyZENlbGwgIT09ICdtaXNzJyAmJiBib2FyZENlbGwgIT09ICdoaXQnKXtcbiAgICAgICAgICAgICAgICAvLzMuIE1ha2VzIGF0dGFjayBmb3IgcDEgJ2h1bWFuIGFuZCBwMiAnY29tcHV0ZXJcbiAgICAgICAgICAgICAgICBwMS5hdHRhY2soeSwgeCwgcDJCb2FyZCk7XG4gICAgICAgICAgICAgICAgcDIuYXV0b0F0dGFjayhwMUJvYXJkKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIC8vNC5VcGRhdGUgR3JpZHMgYWZ0ZXIgYXR0YWNrXG4gICAgICAgICAgICAgICAgdXBkYXRlR3JpZHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vNS4gQ2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXG4gICAgICAgICAgICBpZihwMUJvYXJkLmFyZUFsbFNoaXBzU3VuaygpIHx8IHAyQm9hcmQuYXJlQWxsU2hpcHNTdW5rKCkpe1xuICAgICAgICAgICAgICAgIGxldCB3aW5uZXIgPSAnJztcbiAgICAgICAgICAgICAgICBpZihwMUJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKXtcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyID0gJ0NvbXB1dGVyIHdpbnMhJztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2lubmVyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihwMkJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKXtcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyID0gJ1lvdSB3aW4hJztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2lubmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy82LiBEaXNhYmxlIGV2ZW50TGlzdGVuZXJzIGZvciBhdHRhY2tcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wMkdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgICAgIC8vRGlzcGxheSBXaW5uZXIgLyBQbGF5IGFnYWluIGJ1dHRvblxuICAgICAgICAgICAgICAgIHJlbmRlcldpbm5lcih3aW5uZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9BZGRpbmcgRXZlbnQgTGlzdGVuZXJzIHRvIGdyaWRzIGZvciBjdHJsQXR0YWNrXG4gICAgZnVuY3Rpb24gYWRkR3JpZEV2ZW50TGlzdGVuZXIoKXtcbiAgICAgICAgaWYocDFCb2FyZC5hcmVBbGxTaGlwc0FyZVBsYWNlZCgpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGlmKHAyLmdldFR5cGUgPT09ICdodW1hbicpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnAxR3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnAyR3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0cmxBdHRhY2spO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucDJHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3RybEF0dGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3VycmVudFNoaXBJbmRleCA9IDA7XG4gICAgbGV0IGN1cnJlbnRTaGlwRGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuXG5cbiAgICBmdW5jdGlvbiBwbGFjZUN1cnJlbnRTaGlwKHkseCl7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwVHlwZSA9IFNISVBfVFlQRVNbY3VycmVudFNoaXBJbmRleF07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gc2hpcEZhY3RvcnkoY3VycmVudFNoaXBUeXBlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlzVmFsaWRQbGFjZW1lbnQgPSBwMUJvYXJkLnBsYWNlU2hpcChjdXJyZW50U2hpcCwgeSwgeCwgY3VycmVudFNoaXBEaXJlY3Rpb24pO1xuICAgICAgICBpZiAoaXNWYWxpZFBsYWNlbWVudCl7XG4gICAgICAgICAgICByZW5kZXJQbGF5ZXIxR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICAgICAgLy9tb3ZlIG9uIHRvIG5leHQgc2hpcFxuICAgICAgICAgICAgY3VycmVudFNoaXBJbmRleCsrO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50U2hpcEluZGV4IDwgU0hJUF9UWVBFUy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQbGFjZWQgJHtjdXJyZW50U2hpcFR5cGV9LCBub3cgcGxhY2luZyAke1NISVBfVFlQRVNbY3VycmVudFNoaXBJbmRleF19YCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZmxlZXRDb250YWluZXIuaW5uZXJIVE1MID0gYFBsYWNlZCAke2N1cnJlbnRTaGlwVHlwZX0sIG5vdyBwbGFjaW5nICR7U0hJUF9UWVBFU1tjdXJyZW50U2hpcEluZGV4XX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBbGwgU2hpcHMgQXJlIFBsYWNlZCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHAxQm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgICAgICAgICAgICAgYWRkR3JpZEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICBzdGFydEdhbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIFBsYWNlbWVudCwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgZnVuY3Rpb24gcmVuZGVyR3JpZHMoKXtcbiAgICAgICAgcmVuZGVyR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICByZW5kZXJHcmlkKHAyQm9hcmQsIGVsZW1lbnRzLnAyR3JpZCk7XG4gICAgfVxuICAgIFxuICAgICAgXG4gICAgICAvLyBldmVudCBsaXN0ZW5lciBmb3IgbW91c2VvdXRcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZUNlbGxNb3VzZU91dChlKSB7XG4gICAgICAgIC8vIHJlbW92ZSBjbGFzcyBmcm9tIGFsbCBwcmV2aWV3IGNlbGxzXG4gICAgICAgIGNvbnN0IHByZXZpZXdDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXByZXZpZXcnKTtcbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHByZXZpZXdDZWxscykge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1wcmV2aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGdldFNoaXBEaXJlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50U2hpcERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICAgIH1cbiAgICAgIFxuICAgIGZ1bmN0aW9uIHJlbmRlclBsYXllckdyaWQoKXtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdyJykge1xuICAgICAgICAgICAgICBjdXJyZW50U2hpcERpcmVjdGlvbiA9IGN1cnJlbnRTaGlwRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlyZWN0aW9uIGNoYW5nZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudHMucDFHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKT0+e1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2VsbCAgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZUludCh0YXJnZXRDZWxsLmRhdGFzZXQueSk7XG4gICAgICAgICAgICBjb25zdCB4ID0gcGFyc2VJbnQodGFyZ2V0Q2VsbC5kYXRhc2V0LngpO1xuICAgICAgXG4gICAgICAgICAgICAvLyBnZXQgc2hpcCBsZW5ndGggYW5kIGRpcmVjdGlvblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXBUeXBlID0gU0hJUF9UWVBFU1tjdXJyZW50U2hpcEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwTGVuZ3RoID0gU0hJUF9MRU5HVEhbY3VycmVudFNoaXBUeXBlXTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwRGlyZWN0aW9uID0gZ2V0U2hpcERpcmVjdGlvbigpO1xuICAgICAgXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgY2VsbHMgdGhhdCBzaGlwIHdpbGwgb2NjdXB5XG4gICAgICAgICAgICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2hpcERpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaCh7eSwgeDogeCArIGl9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKHt5OiB5ICsgaSwgeH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICAvLyBhZGQgY2xhc3MgdG8gcHJldmlldyBjZWxsc1xuICAgICAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIG9jY3VwaWVkQ2VsbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGwtJHtjZWxsLnl9LSR7Y2VsbC54fWApO1xuICAgICAgICAgICAgaWYgKHByZXZpZXdDZWxsKSB7XG4gICAgICAgICAgICAgICAgcHJldmlld0NlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcC1wcmV2aWV3Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICBcbiAgICAgICAgICB9KVxuICAgICAgICAgIGVsZW1lbnRzLnAxR3JpZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpPT57XG4gICAgICAgICAgICAvLyByZW1vdmUgY2xhc3MgZnJvbSBhbGwgcHJldmlldyBjZWxsc1xuICAgICAgICAgICAgY29uc3QgcHJldmlld0NlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcHJldmlldycpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHByZXZpZXdDZWxscykge1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXByZXZpZXcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBlbGVtZW50cy5wMUdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT57XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDZWxsID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQodGFyZ2V0Q2VsbC5kYXRhc2V0LnkpO1xuICAgICAgICAgICAgY29uc3QgeCA9IHBhcnNlSW50KHRhcmdldENlbGwuZGF0YXNldC54KTtcbiAgICAgICAgICAgIHBsYWNlQ3VycmVudFNoaXAoeSx4KTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlR3JpZHMoKXtcbiAgICAgICAgdXBkYXRlR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICB1cGRhdGVHcmlkKHAyQm9hcmQsIGVsZW1lbnRzLnAyR3JpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVAxR3JpZCgpe1xuICAgICAgICB1cGRhdGVHcmlkKHAxQm9hcmQsIGVsZW1lbnRzLnAxR3JpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckZsZWV0cygpe1xuICAgICAgICBwMkJvYXJkLmF1dG9QbGFjZUZsZWV0KHAyLmdldEZsZWV0KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF1dG9QbGFjZVBsYXllclNoaXBzKCl7XG4gICAgICAgIGVsZW1lbnRzLnAxR3JpZC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBwMUJvYXJkLmF1dG9QbGFjZUZsZWV0KHAxLmdldEZsZWV0KCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhwMS5nZXRGbGVldCgpKTtcbiAgICAgICAgcmVuZGVyR3JpZChwMUJvYXJkLCBlbGVtZW50cy5wMUdyaWQpO1xuICAgICAgICBhZGRHcmlkRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICBzdGFydEdhbWUoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXV0b1BsYWNlUGxheWVyU2hpcHNFdmVudExpc3RlbmVyKCl7XG4gICAgICAgIGVsZW1lbnRzLmF1dG9QbGFjZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF1dG9QbGFjZVBsYXllclNoaXBzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5QWdhaW4oKXtcbiAgICAgICAgcGxheU5ld0dhbWUoKTtcbiAgICAgICAgcmVzZXRHYW1lKCk7XG4gICAgICAgIHJlbmRlckZsZWV0cygpO1xuICAgICAgICByZW5kZXJHcmlkcygpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQbGF5QWdhaW5FdmVudCgpe1xuICAgICAgICBlbGVtZW50cy5wbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5QWdhaW4pO1xuICAgIH1cblxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGN0cmxBdHRhY2ssXG4gICAgICAgIHJlbmRlckdyaWRzLFxuICAgICAgICByZW5kZXJGbGVldHMsXG4gICAgICAgIGFkZEdyaWRFdmVudExpc3RlbmVyLFxuICAgICAgICBhZGRQbGF5QWdhaW5FdmVudCxcbiAgICAgICAgcmVzZXRHYW1lLCBcbiAgICAgICAgYXV0b1BsYWNlUGxheWVyU2hpcHNFdmVudExpc3RlbmVyLFxuICAgICAgICBwbGFjZUN1cnJlbnRTaGlwLFxuICAgICAgICB1cGRhdGVQMUdyaWQsXG4gICAgICAgIHJlbmRlclBsYXllckdyaWRcbiAgICAgICAgXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBnYW1lOyIsImltcG9ydCB7IHJhbmRDb29yZHMsIFNISVBfVFlQRVMgfSBmcm9tIFwiLi4vaGVscGVyL2hlbHBlclwiO1xuZnVuY3Rpb24gZ2FtZUJvYXJkKCl7XG4gICAgLy9jcmVhdGluZyBhIDEweDEwIGJvYXJkLCBjb29yZHMgYm9hcmRbcm93XVtjb2xdXG4gICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwobnVsbCkubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gICAgbGV0IHBsYWNlZFNoaXBzID0gW107XG4gICAgZnVuY3Rpb24gYXJlQWxsU2hpcHNBcmVQbGFjZWQoKXtcbiAgICAgICAgaWYocGxhY2VkU2hpcHMubGVuZ3RoID09PSBTSElQX1RZUEVTLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGp1c3RDb29yZHMoeTAsIHgwLCBpLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgcmV0dXJuIFt5MCwgeDAgKyBpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW3kwICsgaSwgeDBdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1ZhbGlkKGxlbmd0aCwgZGlyZWN0aW9uLCB5MCwgeDApe1xuICAgICAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IFt5LHhdID0gYWRqdXN0Q29vcmRzKHkwLCB4MCwgaSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIGlmKHkgPCAxMCAmJiB4IDwgMTApe1xuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goYm9hcmRbeV1beF0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxscy5ldmVyeSgoY2VsbCkgPT4gY2VsbCA9PT0gbnVsbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwLCB5MCwgeDAsIGRpcmVjdGlvbil7XG4gICAgICAgIC8vY29uc3QgZGlyZWN0aW9uID0gc2hpcC5nZXREaXJlY3Rpb24oKTtcbiAgICAgICAgLy9DaGVjayBpZiB2YWxpZCBzcG90XG4gICAgICAgIGNvbnN0IHZhbGlkID0gY2hlY2tWYWxpZChzaGlwLmxlbmd0aCwgZGlyZWN0aW9uLCB5MCwgeDApO1xuICAgICAgICBpZih2YWxpZCl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgW3kseF0gPSBhZGp1c3RDb29yZHMoeTAsIHgwLCBpLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIC8vcGxhY2VzIHNoaXAgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgIGJvYXJkW3ldW3hdID0ge3NoaXAsIGluZGV4OiBpfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vYWRkcyBpdCB0byBwbGFjZWQgc2hpcHNcbiAgICAgICAgICAgIHBsYWNlZFNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF1dG9QbGFjZShzaGlwKXtcbiAgICAgICAgY29uc3QgW3ksIHhdID0gcmFuZENvb3JkcygpO1xuICAgICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzaGlwLmdldERpcmVjdGlvbigpO1xuICAgICAgICBpZihyYW5kb21OdW0gPiA1KSBzaGlwLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICBjb25zdCBwbGFjZWQgPSBwbGFjZVNoaXAoc2hpcCwgeSwgeCwgZGlyZWN0aW9uKTtcbiAgICAgICAgaWYoIXBsYWNlZCkgYXV0b1BsYWNlKHNoaXApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdXRvUGxhY2VGbGVldChmbGVldCl7XG4gICAgICAgIGZvcihjb25zdCBzaGlwIGluIGZsZWV0KXtcbiAgICAgICAgICAgIGF1dG9QbGFjZShmbGVldFtzaGlwXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNpZXZlQXR0YWNrKHkseCl7XG4gICAgICAgIC8vRGV0ZXJtaW5lcyBpZiBhdHRhY2sgaGl0IHNoaXBcbiAgICAgICAgaWYoYm9hcmRbeV1beF0gPT09IG51bGwpe1xuICAgICAgICAgICAgLy9yZWNvcmRzIG1pc3NlZCBzaG90XG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9ICdtaXNzJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGJvYXJkW3ldW3hdLnNoaXApe1xuICAgICAgICAgICAgLy9jYWxscyBoaXQgZnVuY3Rpb24gb24gY29ycmVjdCBzaGlwXG4gICAgICAgICAgICBib2FyZFt5XVt4XS5zaGlwLmhpdChib2FyZFt5XVt4XS5pbmRleCk7XG4gICAgICAgICAgICAvL1JlY29yZHMgYXR0YWNrZWQgY2VsbCB3aXRoICdoaXQnIChwcmV2ZW50cyBmdXR1cmUgLnNoaXAuaGl0KVxuICAgICAgICAgICAgYm9hcmRbeV1beF0gPSAnaGl0JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmRbeV1beF07XG4gICAgfVxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiBwbGFjZWRTaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgYm9hcmQgPSBBcnJheSgxMCkuZmlsbChudWxsKS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIHBsYWNlZFNoaXBzID0gW107XG4gIH1cbiAgICByZXR1cm57XG4gICAgICAgIGdldEJvYXJkLFxuICAgICAgICBhcmVBbGxTaGlwc0FyZVBsYWNlZCxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBhdXRvUGxhY2VGbGVldCxcbiAgICAgICAgcmVjaWV2ZUF0dGFjayxcbiAgICAgICAgYXJlQWxsU2hpcHNTdW5rLFxuICAgICAgICByZXNldFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGdhbWVCb2FyZDsiLCJpbXBvcnQgeyBTSElQX1RZUEVTLCByYW5kQ29vcmRzLCBjcmVhdGVGbGVldCB9IGZyb20gXCIuLi9oZWxwZXIvaGVscGVyXCI7XG5cbmZ1bmN0aW9uIHBsYXllcih0eXBlID0gJ2h1bWFuJyl7XG4gICAgbGV0IGZsZWV0ID0gY3JlYXRlRmxlZXQoU0hJUF9UWVBFUyk7XG5cbiAgICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTtcbiAgICBjb25zdCBnZXRGbGVldCA9ICgpID0+IGZsZWV0O1xuICAgIC8vQXR0YWNrcyBlbmVteSBib2FyZCBhdCBjb3JkcyBbeV1beF1cbiAgICBjb25zdCBhdHRhY2sgPSAoeSwgeCwgZW5lbXlCb2FyZCkgPT4gZW5lbXlCb2FyZC5yZWNpZXZlQXR0YWNrKHksIHgpO1xuICAgIFxuICAgIGNvbnN0IGF1dG9BdHRhY2sgPSAoZW5lbXlCb2FyZCkgPT57XG4gICAgICAgIGNvbnN0IFt5LHhdID0gcmFuZENvb3JkcygpO1xuICAgICAgICBjb25zdCBjZWxsID0gZW5lbXlCb2FyZC5nZXRCb2FyZCgpW3ldW3hdO1xuICAgICAgICBpZihjZWxsID09PSAnbWlzcycgfHwgY2VsbCA9PT0gJ2hpdCcpe1xuICAgICAgICAgICAgLy90cmllcyBhZ2FpbiB1bnRpbCB2YWxpZCBjZWxsIGlzIGhpdFxuICAgICAgICAgICAgYXV0b0F0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0F0dGFja3MgdmFsaWQgY2VsbFxuICAgICAgICAgICAgZW5lbXlCb2FyZC5yZWNpZXZlQXR0YWNrKHkseCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzZXRGbGVldCA9ICgpID0+IChmbGVldCA9IGNyZWF0ZUZsZWV0KFNISVBfVFlQRVMpKTtcblxuICAgIHJldHVybntcbiAgICAgICAgZ2V0VHlwZSxcbiAgICAgICAgZ2V0RmxlZXQsXG4gICAgICAgIGF0dGFjayxcbiAgICAgICAgYXV0b0F0dGFjayxcbiAgICAgICAgcmVzZXRGbGVldCxcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7XG4iLCJpbXBvcnQgeyBTSElQX0xFTkdUSCB9IGZyb20gXCIuLi9oZWxwZXIvaGVscGVyXCI7XG5mdW5jdGlvbiBzaGlwRmFjdG9yeSh0eXBlKXtcbiAgICBjb25zdCBpZCA9IHR5cGU7XG4gICAgY29uc3QgbGVuZ3RoID0gU0hJUF9MRU5HVEhbdHlwZV07XG4gICAgbGV0IGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uKCl7XG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKXtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCdcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2hpdFxuICAgIGNvbnN0IGhpdHMgPSBBcnJheShsZW5ndGgpLmZpbGwobnVsbCk7XG4gICAgY29uc3QgaGl0ID0gKGkpID0+KGhpdHNbaV0gPSAnaGl0Jyk7XG4gICAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHM7XG5cbiAgICAvL2lzU3VuayBNZXRob2RcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiBoaXRzLmV2ZXJ5KChoKSA9PiBoID09PSAnaGl0Jyk7XG4gICAgXG4gICAgcmV0dXJuIHtpZCwgbGVuZ3RoLCBnZXREaXJlY3Rpb24sIGNoYW5nZURpcmVjdGlvbiwgaGl0LCBnZXRIaXRzLCBpc1N1bmt9O1xufVxuZXhwb3J0IGRlZmF1bHQgc2hpcEZhY3Rvcnk7IiwiaW1wb3J0IHsgZWxlbWVudHMgfSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHcmlkKGdhbWVib2FyZCwgcGxheWVyc0dyaWQpIHtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgbGVuZ3RoID0gYm9hcmQubGVuZ3RoO1xuXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBzdGF0dXMgPSBib2FyZFtpXVtqXTtcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgc3RhdHVzID0gJ2JsYW5rJztcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNoaXApIHtcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzLnNoaXAuaWQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJywgYGNlbGwtJHtpfS0ke2p9YCwgc3RhdHVzKTtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC54ID0gajtcbiAgICAgIFxuICAgICAgcGxheWVyc0dyaWQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQbGF5ZXIxR3JpZChnYW1lYm9hcmQsIHBsYXllcnNHcmlkKSB7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gIGNvbnN0IGxlbmd0aCA9IGJvYXJkLmxlbmd0aDtcblxuICBwbGF5ZXJzR3JpZC5pbm5lckhUTUwgPSAnJztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgbGV0IHN0YXR1cyA9IGJvYXJkW2ldW2pdO1xuICAgICAgaWYgKHN0YXR1cyA9PT0gbnVsbCkge1xuICAgICAgICBzdGF0dXMgPSAnYmxhbmsnO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc2hpcCkge1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMuc2hpcC5pZDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnLCBgY2VsbC0ke2l9LSR7an1gLCBzdGF0dXMpO1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnggPSBqO1xuICAgICAgXG4gICAgICBwbGF5ZXJzR3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWQoZ2FtZWJvYXJkLCBwbGF5ZXJzR3JpZCl7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gIGNvbnN0IGxlbmd0aCA9IGJvYXJkLmxlbmd0aDtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspe1xuICAgICAgaWYoYm9hcmRbaV1bal0gPT09ICdoaXQnKXtcbiAgICAgICAgY29uc3QgY2VsbCA9IHBsYXllcnNHcmlkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXkgPSBcIiR7aX1cIl1bZGF0YS14ID0gXCIke2p9XCJdYCk7XG4gICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ3gnO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucygnY2FycmllcicpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgICAgfSBlbHNlIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYXR0bGVzaGlwJykpe1xuICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdydcbiAgICAgICAgfSBlbHNlIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcnVpc2VyJykpe1xuICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJ1xuICAgICAgICB9IGVsc2UgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Ym1hcmluZScpKXtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICAgIH1lbHNlIGlmKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZXN0cm95ZXInKSl7XG4gICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJ1xuICAgICAgICB9XG4gICAgICB9ZWxzZSBpZihib2FyZFtpXVtqXSA9PT0gJ21pc3MnKXtcbiAgICAgICAgY29uc3QgY2VsbCA9IHBsYXllcnNHcmlkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXkgPSBcIiR7aX1cIl1bZGF0YS14ID0gXCIke2p9XCJdYCk7XG4gICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1xcdTIwMjInO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdibGFuaycpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXaW5uZXIod2lubmVyKXtcbiAgZWxlbWVudHMuaW5mb0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGVsZW1lbnRzLmluZm9UZXh0LnRleHRDb250ZW50ID0gYCR7d2lubmVyLnRvVXBwZXJDYXNlKCl9YDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEdhbWUoKXtcbiAgZWxlbWVudHMucGxhY2VtZW50Q29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZWxlbWVudHMucDJHYW1lYm9hcmQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheU5ld0dhbWUoKXtcbiAgZWxlbWVudHMuaW5mb0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGVsZW1lbnRzLnAxR3JpZC50ZXh0Q29udGVudCA9ICcnO1xuICBlbGVtZW50cy5wMkdyaWQudGV4dENvbnRlbnQgPSAnJztcbiAgZWxlbWVudHMucDJHYW1lYm9hcmQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBlbGVtZW50cy5wbGFjZW1lbnRDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufVxuIiwiaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuLi9mYWN0b3JpZXMvc2hpcEZhY3RvcnlcIjtcblxuZXhwb3J0IGNvbnN0IFNISVBfVFlQRVMgPSBbXG4gICAgJ2NhcnJpZXInLFxuICAgICdiYXR0bGVzaGlwJyxcbiAgICAnY3J1aXNlcicsXG4gICAgJ3N1Ym1hcmluZScsXG4gICAgJ2Rlc3Ryb3llcidcbl1cblxuZXhwb3J0IGNvbnN0IFNISVBfTEVOR1RIID0ge1xuICAgIGNhcnJpZXI6IDUsXG4gICAgYmF0dGxlc2hpcDogNCxcbiAgICBjcnVpc2VyOiAzLFxuICAgIHN1Ym1hcmluZTogMyxcbiAgICBkZXN0cm95ZXI6IDIsXG59XG5cbmNvbnN0IHJhbmQgPSAoc2l6ZSA9IDEwKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbmV4cG9ydCBjb25zdCByYW5kQ29vcmRzID0gKHNpemUgPSAxMCkgPT4gW3JhbmQoc2l6ZSksIHJhbmQoc2l6ZSldO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxlZXQodHlwZXMpe1xuICAgIC8vQ3JlYXRlcyBhbiBvYmplY3Qgb2Ygc2hpcHNcbiAgICBjb25zdCBmbGVldCA9IHt9O1xuICAgIHR5cGVzLmZvckVhY2goKHR5cGUpID0+IChmbGVldFt0eXBlXSA9IHNoaXBGYWN0b3J5KHR5cGUpKSk7XG4gICAgcmV0dXJuIGZsZWV0O1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgZ2FtZUJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lQm9hcmRcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9mYWN0b3JpZXMvc2hpcEZhY3RvcnlcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllclwiO1xuaW1wb3J0IHtwbGF5TmV3R2FtZSwgcmVuZGVyR3JpZH0gZnJvbSBcIi4vZ2FtZWJvYXJkVmlld1wiXG5pbXBvcnQgeyBjcmVhdGVGbGVldCwgU0hJUF9UWVBFUyB9IGZyb20gXCIuL2hlbHBlci9oZWxwZXJcIjtcbmltcG9ydCB7IGVsZW1lbnRzIH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IGdhbWUgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVcIjtcblxubGV0IGdhbWUxID0gZ2FtZSgpO1xuZ2FtZTEucmVuZGVyRmxlZXRzKCk7XG5nYW1lMS5yZW5kZXJHcmlkcygpO1xuZ2FtZTEuYXV0b1BsYWNlUGxheWVyU2hpcHNFdmVudExpc3RlbmVyKCk7XG5nYW1lMS5hZGRQbGF5QWdhaW5FdmVudCgpO1xuZ2FtZTEucmVuZGVyUGxheWVyR3JpZCgpO1xuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9