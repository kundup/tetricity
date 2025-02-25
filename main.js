var canvas = document.getElementById("tetricity");
var ctx = canvas.getContext("2d");
const color = {backgroundcolor : "black"};
const shape = {L : [[1,0],[1,0],[1,1]], J : [[0,1],[0,1],[1,1]],
I : [[1],[1],[1],[1]], O : [[1,1],[1,1]], S : [[0,1,1],[1,1,0]], Z : [[1,1,0],[0,1,1]], T : [[1,1,1],[0,1,0]]};

function drawboard(){

    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawshapes() {
    ctx.fillStyle = "red";
    for (let i = 0; i < shape.L.length; i++) {
        for (let j = 0; j < shape.L[i].length; j++) {
            if (shape.L[i][j] == 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }


};

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
// todo create shapes and draw them pls - L shape drawn
// todo now automate the drawing of shapes - in this case we need to create a function that will draw the shapes
