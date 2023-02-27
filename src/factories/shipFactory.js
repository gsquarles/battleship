import { SHIP_LENGTH } from "../helper/helper";
function shipFactory(type){
    const id = type;
    const length = SHIP_LENGTH[type];
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
export default shipFactory;