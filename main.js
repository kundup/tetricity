
const canvas = document.getElementById("tetricity");
const ctx = canvas.getContext("2d");
const tilesize = 15;
const velshapeY = tilesize * 0.1;
const row = 30;
const col = 30;
const framegap = 1;
const grid = new Array(row).fill().map(()=> new Array(col). fill(0)); // ** new js feature used to draw grid
const color = {backgroundcolor : "black", shapecolor : "yellow", frame : "black"};
const shape = {L : [[1,0],[1,0],[1,1]], J : [[0,1],[0,1],[1,1]],
I : [[1],[1],[1],[1]], O : [[1,1],[1,1]], S : [[0,1,1],[1,1,0]], Z : [[1,1,0],[0,1,1]], T : [[1,1,1],[0,1,0]], TT : [[0,1,0],[1,1,1]]};
const Keylists = Object.keys(shape);
let ranshape = Keylists.at(-1); // ** last element in the array
let shapeX = canvas.width / 2 - tilesize
let shapeY = 0;


function drawboard(){

    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for (let i = 0; i < row; i++){
        for (let j = 0; j < col; j++){
            if (grid [i][j] === 1) {
                ctx.fillStyle = color.shapecolor;
                ctx.fillRect (j * tilesize, i * tilesize, tilesize, tilesize)

                ctx.strokeStyle = color.frame;
                ctx.lineWidth = framegap;
                ctx.strokeRect(j * tilesize, i * tilesize, tilesize, tilesize);
            }
        }        

    }
}

function drawshapes() {    
       
    for (let i = 0; i < shape[ranshape].length; i++) {
        for (let j = 0; j < shape[ranshape][i].length; j++) {
            if (shape[ranshape][i][j] == 1) { 
                ctx.fillStyle = color.shapecolor;               
                ctx.fillRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize);
                
                ctx.strokeStyle = color.frame;
                ctx.lineWidth = framegap;
                ctx.strokeRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize);
            }
        }
    }
};

function collisondetection (){
    
    for (let i = 0; i < shape[ranshape].length; i++) {
        for (let j = 0; j < shape[ranshape][i].length; j++){
            if (shape[ranshape][i][j] === 1){
                let newY = (shapeY / tilesize) + i + 1;
                let newX = (shapeX / tilesize) + j;
                if (newY >= row || grid[Math.floor(newY)][Math.floor(newX)] === 1){
                    return true;
                }
            }
        }
    }
    return false;
}

function Placetheshape (x, y){

    for (let i = 0; i < shape[ranshape].length ; i++){
        for (let j = 0; j < shape[ranshape][i].length; j++){
            if (shape[ranshape][i][j] == 1){
                grid[y + i][x + j] = 1
            }
        }
    }
}

function moveshapes(){
    if (!collisondetection()){
        shapeY += velshapeY;
    } else {
        Placetheshape(Math.floor(shapeX / tilesize), Math.floor(shapeY / tilesize));
        shapeY = 0;
        ranshape = Keylists[Math.floor(Math.random() * Keylists.length)];
        shapeX = Math.floor(canvas.width / 2 - tilesize);
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
        let shapeWidth = shape[ranshape][0]. length * tilesize   
        if (shapeX + shapeWidth > canvas.width - shapeWidth) {  
            shapeX = canvas.width - shapeWidth;
        }       
    } else if (event.key === "ArrowDown"){

        shapeY += tilesize * 1.5;
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
// after keydown event, now going through game mechanics keep the shapes in board and go on new shapes - done.
// lets play around the former todo, place the shape somewhere around bottom side.. - done
// lets try to code the collison detection.
// lets gain some points and break the shape
// points mechanism
 

// for the long term improvement add visual affects and organise the game frame
// for the long term improvement add possibility
// for the long term improvment add next shape visuals
// publish the game


// ** represents : new js function usage