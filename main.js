const render=new Renderer()
let board

$("#start").on("click",()=>{
    const col = $("#columns").val()
    const row = $("#rows").val()
    board=new GoldRush(row,col)
    render.renderBoard(board)
})

const keyBoard = {
    87: {key: 'w', direction: 'up', player:1}, 
    65: {key: 'a', direction: 'left', player:1}, 
    83: {key: 's', direction: 'down', player:1}, 
    68: {key: 'd', direction: 'right', player:1}, 
    38: {key: 'up-arrow', direction: 'up', player:2}, 
    37: {key: 'left-arrow', direction: 'left', player:2}, 
    40: {key: 'down-arrow', direction: 'down', player:2}, 
    39: {key: 'right-arrow', direction: 'right', player:2}
}

window.addEventListener("keydown", event => {
    if (event.isComposing || keyBoard[event.keyCode]) {
        board.movePlayer(keyBoard[event.keyCode].player, keyBoard[event.keyCode].direction)
        render.renderBoard(board)
    }
})


Handlebars.registerHelper("classifizer" , function(value){
    let elm = ""
    if(value == 1 || value == 2  ){
        elm += `<div class="player${value}"><i class="far fa-dizzy"></i></div>`
    }else if(value == "C"){
        elm += `<div class="coin"><i class="fab fa-bitcoin"></i></div>`
    } else if(value == "W"){
        elm += `<div class="wall"></div>`
    } else {
        elm += ""
    }
    return new Handlebars.SafeString(elm)
})