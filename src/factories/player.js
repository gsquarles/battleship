import { SHIP_TYPES, randCoords, createFleet } from "../helper/helper";

function player(type = 'human'){
    let fleet = createFleet(SHIP_TYPES);

    const getType = () => type;
    const getFleet = () => fleet;
    //Attacks enemy board at cords [y][x]
    const attack = (y, x, enemyBoard) => enemyBoard.recieveAttack(y, x);
    
    const autoAttack = (enemyBoard) =>{
        const [y,x] = randCoords();
        const cell = enemyBoard.getBoard()[y][x];
        if(cell === 'miss' || cell === 'hit'){
            //tries again until valid cell is hit
            autoAttack(enemyBoard);
        }else{
            //Attacks valid cell
            enemyBoard.recieveAttack(y,x);
        }
    }
    const resetFleet = () => (fleet = createFleet(SHIP_TYPES));

    return{
        getType,
        getFleet,
        attack,
        autoAttack,
        resetFleet,
    }
}
export default player;
