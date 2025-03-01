
const canvas = document.getElementById("tetricity");
const ctx = canvas.getContext("2d");
const color = {backgroundcolor : "black"};
const shape = {L : [[1,0],[1,0],[1,1]], J : [[0,1],[0,1],[1,1]],
I : [[1],[1],[1],[1]], O : [[1,1],[1,1]], S : [[0,1,1],[1,1,0]], Z : [[1,1,0],[0,1,1]], T : [[1,1,1],[0,1,0]]};
const s = Object.keys(shape);
let ranshape = s[Math.floor(Math.random() * s.length)];
const shapelenght = 10;
const shapeheight = 10;
let shapeX = canvas.width / 2 - shapelenght
let shapeY = 0;

function drawboard(){

    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawshapes() {
    ctx.fillStyle = "red";    
    for (let i = 0; i < shape[ranshape].length; i++) {
        for (let j = 0; j < shape[ranshape][i].length; j++) {
            if (shape[ranshape][i][j] == 1) {
                ctx.fillRect(shapeX + j * shapelenght, shapeY + i * shapeheight, shapelenght, shapeheight);
            }
        }
    }
};

function moveshapes(){
    shapeY += 1;
}



function drawEveryting(){
    drawboard();
    drawshapes();
}

function gameloop(){
    drawEveryting();
    moveshapes();
    requestAnimationFrame(gameloop);
}

gameloop();





// todo creat general concept of the game (canvas id, getcontext, etc) - done
// todo create draft for game- first drawing shapes, board and background then updating the shapes and board and countiously drawing them - done
// completing drawing board with black background - done
// todo create shapes and draw them pls - L shape drawn and the others are drawn
// todo now automate the drawing of shapes - in this case we need to create a function that will draw the shapes one at a time - done
// lets move the shapes to the center of the board -done
// lets move the shapes down - done 

