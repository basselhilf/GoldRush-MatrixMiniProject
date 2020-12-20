class GoldRush extends Matrix{
    constructor(numRows,numColumns){
        super (numRows,numColumns)
        this.player1={
            mark:1,
            score:0,
            x:0,
            y:0
        }
        this.player2={
            mark:2,
            score:0,
            x:numRows-1,
            y:numColumns-1
        }
        this.freeCells=(this.numColumns*this.numRows)-2
        this.numCoins=10
        this.numWalls=6
        this.coins=[]
        this.walls=[]
        this.generateBoardItem("coins",this.numCoins)
        this.generateBoardItem("walls",this.numWalls)
        this.setGame(this.player1,this.player2)
    }

    getRandom(num){
        return Math.floor(Math.random()*num)
    }

    getRandomLocation(){
        let x = this.getRandom(this.numRows)
        let y= this.getRandom(this.numColumns)
        return{x,y}
    }

    alreadyExist(item){
        const coins = this.coins.find(c=>c.x==item.x&&c.y==item.y)
        const walls = this.walls.find(w=>w.x==item.x&&w.y==item.y)
        return coins&&walls
    }

    isGoodLocation(newItem){
        if(newItem.x == this.player1.x && newItem.y == this.player1.y){
            return false
        } 
        else if(newItem.x == this.player2.x && newItem.y == this.player2.y){
            return false
        }
        if(this.alreadyExist(newItem)){
            return false
        }
        return true
    }

    generateBoardItem(item,num){
        while(this[item].length < num && this[item].length < this.freeCells){
            let newItem = this.getRandomLocation()
            if(this.isGoodLocation(newItem)){
                this[item].push(newItem)
            }
        }
    }

    setItems(items,mark){
        this[items].forEach(i =>{
            this.alter(i.x,i.y,mark)
        })
    }

    removeCoin(x,y){
        const coinIndex = this.coins.findIndex(c => (c.x == x && c.y == y ))
        this.coins.splice(coinIndex , 1)
        this.setItems("coins","C")
    }

    setGame(){
        this.generateMatrix(this.numRows ,this.numColumns)
        this.setItems("coins","C")
        this.setItems("walls","W")
        this.alter(this.player1.x , this.player1.y , this.player1.mark)
        this.alter(this.player2.x , this.player2.y , this.player2.mark)
    }

    ifScores(player){
        if(this.matrix[player.x][player.y] == "C"){
            this.removeCoin(player.x,player.y)
            player.score += 10
        }
    }
    
    isFree(x , y){
        if(this.matrix[x][y] == "C" || this.matrix[x][y] == "." ){
            return true
        }
        return false
    }

    movePlayer(player,direction){
        let currentPlayer = this[`player${player}`]

        if(direction == "up"){
            if(currentPlayer.x > 0 && this.isFree(currentPlayer.x-1,currentPlayer.y)){
                currentPlayer.x--
            }
        }
        else if(direction == "right"){
            if(currentPlayer.y < this.numColumns -1 && this.isFree(currentPlayer.x,currentPlayer.y+1)){
                currentPlayer.y++
            }
        } 
        else if(direction == "down" ){
            if(currentPlayer.x < this.numRows -1 && this.isFree(currentPlayer.x+1,currentPlayer.y)){
                currentPlayer.x++
            }
        } 
        else if(direction == "left" && this.isFree(currentPlayer.x,currentPlayer.y-1)){
           if(currentPlayer.y > 0 ){     
                currentPlayer.y--
            }
        }
        this.ifScores(currentPlayer)
        this.setGame()
        
    }
}