import shipFactory from "../factories/shipFactory";
describe("Ship Factory",() => {
    describe("Properties", () =>{
        const ship1 = shipFactory('cruiser');
        test("id", () =>{
            expect(ship1.id).toBe('cruiser');
        });
        test('length', () =>{
            expect(ship1.length).toBe(3);
        });
        test('direction', ()=> {
            expect(ship1.getDirection()).toBe('horizontal');
        })
        test('change direction', () =>{
            ship1.changeDirection();
            expect(ship1.getDirection()).toBe('vertical');
        })
    })

    describe("Hit Function", () =>{
        const ship1 = shipFactory('submarine');
        test('no hits', () =>{
            expect(ship1.getHits()).toEqual([null,null,null]);
        })
        test('one hit', () =>{
            ship1.hit(1);
            expect(ship1.getHits()).toEqual([null,'hit', null]);
        })
    })

    describe('isSunk Function', ()=>{
        const ship1 = shipFactory('destroyer');
        test('not sunk', () =>{
            expect(ship1.isSunk()).toBe(false);
        })
        test('one hit but not sunk', () =>{
            ship1.hit(0);
            expect(ship1.isSunk()).toBe(false);
        })
        test('is sunk', () =>{
            ship1.hit(1);
            expect(ship1.isSunk()).toBe(true);
        })
    })
   
})

