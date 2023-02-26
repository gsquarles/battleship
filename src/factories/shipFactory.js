function shipFactory(length){
    return {
        length: length,
        numOfHits: 0,
        sunk: false,
        hit : function(){
            this.numOfHits++;
        },
        isSunk: function(){
            if(this.numOfHits === this.length){
                this.sunk = true;
            }
        }
    }
}
export default shipFactory;