class Renderer{
    constructor(){}
    renderBoard(board){
        const source=$("#board-template").html()
        const template = Handlebars.compile(source)
        const newHTML=template({board})
        $("#board-container").empty().append(newHTML)
    }
}