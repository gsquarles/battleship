import gameBoard from "../factories/gameBoard";
import shipFactory from "../factories/shipFactory";
import player from "../factories/player";
import { elements } from "../base";
import { renderGrid, updateGrid, renderWinner, playNewGame, startGame, renderPlayer1Grid } from "../gameboardView";
import { createFleet, SHIP_TYPES } from "../helper/helper";

//Init
function game(){
    //create players
    const p1 = player('human');
    const p2 = player('computer');

    //create boards
    const p1Board = gameBoard();
    const p2Board = gameBoard();
    
    //reset game
    function resetGame(){
        p1.resetFleet();
        p2.resetFleet();
        p1Board.reset();
        p2Board.reset();
        currentShipIndex = 0;
        elements.fleetContainer.innerHTML = "Place Carrier";
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
                elements.p2Grid.removeEventListener('click',ctrlAttack);
                //Display Winner / Play again button
                renderWinner(winner);
            }
        }
    }

    //Adding Event Listeners to grids for ctrlAttack
    function addGridEventListener(){
        if(p1Board.areAllShipsArePlaced() === true){
            if(p2.getType === 'human'){
                elements.p1Grid.addEventListener('click', ctrlAttack);
                elements.p2Grid.addEventListener('click', ctrlAttack);
            }else{
                elements.p2Grid.addEventListener('click', ctrlAttack);
            }
        }
    }

    let currentShipIndex = 0;
    let currentShipDirection = 'horizontal';


    function placeCurrentShip(y,x){
        const currentShipType = SHIP_TYPES[currentShipIndex];
        const currentShip = shipFactory(currentShipType);
        
        const isValidPlacement = p1Board.placeShip(currentShip, y, x, currentShipDirection);
        if (isValidPlacement){
            renderPlayer1Grid(p1Board, elements.p1Grid);
            //move on to next ship
            currentShipIndex++;

            if(currentShipIndex < SHIP_TYPES.length){
                console.log(`Placed ${currentShipType}, now placing ${SHIP_TYPES[currentShipIndex]}`);
                elements.fleetContainer.innerHTML = `Placed ${currentShipType}, now placing ${SHIP_TYPES[currentShipIndex]}`;
                
            } else{
                console.log('All Ships Are Placed');
                console.log(p1Board.getBoard());
                addGridEventListener();
                startGame();
            }
        } else {
            console.log('Invalid Placement, please try again');
        }
    }

    
    function renderGrids(){
        renderGrid(p1Board, elements.p1Grid);
        renderGrid(p2Board, elements.p2Grid);
    }
    function renderPlayerGrid(){
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r') {
              currentShipDirection = currentShipDirection === 'horizontal' ? 'vertical' : 'horizontal';
              //console.log('Direction Changed');
              //console.log(currentShipDirection);
            }
          });
        
        elements.p1Grid.addEventListener('click', (e) =>{
            const targetCell = e.target;
            const y = parseInt(targetCell.dataset.y);
            const x = parseInt(targetCell.dataset.x);
            placeCurrentShip(y,x);
        })
    }
    function updateGrids(){
        updateGrid(p1Board, elements.p1Grid);
        updateGrid(p2Board, elements.p2Grid);
    }
    function updateP1Grid(){
        updateGrid(p1Board, elements.p1Grid);
    }
    function renderFleets(){
        p2Board.autoPlaceFleet(p2.getFleet());
    }

    function autoPlacePlayerShips(){
        elements.p1Grid.textContent = '';
        p1Board.autoPlaceFleet(p1.getFleet());
        console.log(p1.getFleet());
        renderGrid(p1Board, elements.p1Grid);
        addGridEventListener();
        startGame();
    }
    function autoPlacePlayerShipsEventListener(){
        elements.autoPlaceBtn.addEventListener('click', autoPlacePlayerShips);
    }

    function playAgain(){
        playNewGame();
        resetGame();
        renderFleets();
        renderGrids();
        
    }

    function addPlayAgainEvent(){
        elements.playAgainBtn.addEventListener('click', playAgain);
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
export default game;