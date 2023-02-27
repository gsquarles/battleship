import shipFactory from "../factories/shipFactory";

export const SHIP_TYPES = [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer'
]

export const SHIP_LENGTH = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
}

const rand = (size = 10) => Math.floor(Math.random() * size);
export const randCoords = (size = 10) => [rand(size), rand(size)];

export function createFleet(types){
    //Creates an object of ships
    const fleet = {};
    types.forEach((type) => (fleet[type] = shipFactory(type)));
    return fleet;
}