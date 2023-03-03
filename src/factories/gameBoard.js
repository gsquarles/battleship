import { randCoords, SHIP_TYPES } from "../helper/helper";
function gameBoard(){
    //creating a 10x10 board, coords board[row][col]
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    let placedShips = [];
    function areAllShipsArePlaced(){
        if(placedShips.length === SHIP_TYPES.length){
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
        const [y, x] = randCoords();
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
export default gameBoard;