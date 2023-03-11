import { elements } from "./base";

export function renderGrid(gameboard, playersGrid) {
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

export function renderPlayer1Grid(gameboard, playersGrid) {
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

export function updateGrid(gameboard, playersGrid){
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
export function renderWinner(winner){
  elements.infoContainer.classList.toggle('hide');
  elements.infoText.textContent = `${winner.toUpperCase()}`;
}
export function startGame(){
  elements.placementContainer.classList.toggle('hide');
  elements.p2Gameboard.classList.toggle('hide');
}

export function playNewGame(){
  elements.infoContainer.classList.toggle('hide');
  elements.p1Grid.textContent = '';
  elements.p2Grid.textContent = '';
  elements.p2Gameboard.classList.toggle('hide');
  elements.placementContainer.classList.toggle('hide');
}
