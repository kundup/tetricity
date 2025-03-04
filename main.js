
const canvas = document.getElementById("tetricity");
const ctx = canvas.getContext("2d");

const row = 30;
const col = 30;
const grid = new Array(row).fill().map(()=> new Array(col). fill(0)); // ** new js feature used to draw grid
const color = {backgroundcolor : "blue", shapecolor : "yellow"};
const shape = {L : [[1,0],[1,0],[1,1]], J : [[0,1],[0,1],[1,1]],
I : [[1],[1],[1],[1]], O : [[1,1],[1,1]], S : [[0,1,1],[1,1,0]], Z : [[1,1,0],[0,1,1]], T : [[1,1,1],[0,1,0]], TT : [[0,1,0],[1,1,1]]};
const Keylists = Object.keys(shape);
let ranshape = Keylists.at(-1); // ** last element in the array
let ranshapelist = [];
const tilelenght = 15;
const tileheight = 15;
const shapeDown = 40;
let shapeX = canvas.width / 2 - tilelenght
let shapeY = 0;


function drawboard(){
    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for (let i = 0; i < row; i++){
        for (let j = 0; j < col; j++){
            if (grid [i][j] === 1) {
                ctx.fillStyle = color.shapecolor;
                ctx.fillRect (j * tilelenght, i * tileheight, tilelenght, tileheight)
            }
        }        

    }
}

function drawshapes() {    
    ctx.fillStyle = color.shapecolor;   
    for (let i = 0; i < shape[ranshape].length; i++) {
        for (let j = 0; j < shape[ranshape][i].length; j++) {
            if (shape[ranshape][i][j] == 1) {
                ctx.fillRect(shapeX + j * tilelenght, shapeY + i * tileheight, tilelenght, tileheight);
            }
        }
    }
};

function moveshapes(){
    shapeY += 1;
    if (shapeY > canvas.height- 20){
        shapeY = 0;
        ranshape = Keylists[Math.floor(Math.random() * Keylists.length)];
        shapeX = canvas.width / 2 - tilelenght
        
    } 
}

document.addEventListener("keydown", function(event){
    if (event.key === "ArrowLeft"){
        shapeX -= 15;
        if (shapeX <= 0){
            shapeX = 0
        }
    } else if (event.key === "ArrowRight"){
        shapeX += 15;
        let shapeWidth = shape[ranshape][0]. length * tilelenght   
        if (shapeX + shapeWidth > canvas.width - shapeWidth) {  
            shapeX = canvas.width - shapeWidth;
        }       
    } else if (event.key === "ArrowDown"){
        shapeY += shapeDown;        
    }
});

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
// now boundary check for the shapes -done
// now after boundry checked from height, let the new type shapes drop -done
// lets make the shapes move left and right - done
// todo add boundaries -done 
// droppping the shapes by arrowdown - done
// grid drawn as tile map.
// after keydown event, now going through game mechanics keep the shapes in board and go on new shapes.
// for the long term improvement add visual affects
// for the long term improvement add possibility



// ** represents : new js function usage