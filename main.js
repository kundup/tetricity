var canvas = document.getElementById("tetricity");
var ctx = canvas.getContext("2d");
const color = {backgroundcolor : "black"};

function drawboard(){

    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawshapes() {};

function drawEveryting(){
    drawboard();
    drawshapes();
}

function update() {};

function gameloop(){
    drawEveryting();
    requestAnimationFrame(gameloop);
}

gameloop();





// todo creat general concept of the game (canvas id, getcontext, etc) - done
// todo create draft for game- first drawing shapes, board and background then updating the shapes and board and countiously drawing them - done
// completing drawing board with black background - done
// todo create shapes and draw them pls
