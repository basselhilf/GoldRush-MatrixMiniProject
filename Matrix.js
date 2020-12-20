class Matrix{
    constructor(numRows , numColumns){
        this.matrix     = []
        this.numRows    = numRows 
        this.numColumns = numColumns
    }
    generateMatrix(numRows, numColumns) {
        let matrix = []
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push(".")
            }
        }
        this.matrix = matrix
    }
    print(){
        for (let index = 0; index < this.matrix.length; index++) {
            let line = ""
            for (let cells = 0; cells < this.matrix[index].length; cells++) {
                line += `${this.matrix[index][cells]} \t`
            }
            console.log(line);
        }
    }
    get(rowNum, colNum){
        return this.matrix[rowNum][colNum]
    }
    printRow(rowNum){
        for (let index = 0; index < this.matrix[rowNum].length; index++) {
            console.log(this.matrix[rowNum][index])
        }
    }
    alter(rowNum, colNum, newVal){
        this.matrix[rowNum][colNum] = newVal
    }
    findCoordinate(value){
        for (let rowNum = 0; rowNum < this.matrix.length; rowNum++) {
            for(let colNum =0; colNum < this.matrix[rowNum].length; colNum++){
                if(this.matrix[rowNum][colNum] == value){
                    return {x: colNum, y: rowNum}
                }
            }
        }
        return {message:"not found"}
    }
}

