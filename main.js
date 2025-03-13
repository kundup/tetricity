const canvas = document.getElementById("tetricity");
const ctx = canvas.getContext("2d");

let gameover = false;
const tilesize = 15;
let velshapeY = 1;
const row = 30;
const col = 14;
const col2 = 10;
const gameboundary = col * tilesize
let extraspace = gameboundary + 10;
const framegap = 1;
const grid = new Array(row).fill().map(()=> new Array(col). fill(0)); // ** new js feature used to draw grid
const grid2 = new Array (row).fill().map (()=> new Array (col2).fill(0)); // for extraspace crreating the new grid
const shape = {
L : [[1,0],[1,0],[1,1]],
F : [[1,1],[1,0],[1,0]],
J : [[0,1],[0,1],[1,1]],
I : [[1],[1],[1],[1]],
O : [[1,1],[1,1]], 
S : [[0,1,1],[1,1,0]],
N : [[0,1],[1,1],[1,0]], 
Z : [[1,1,0],[0,1,1]], 
T : [[1,1,1],[0,1,0]], 
TN : [[1,0],[1,1],[0,1]],
TT : [[0,1,0],[1,1,1]],
};
const Keylists = Object.keys(shape);
let ranshape = [getRandomShape(), getRandomShape()]
//let ranshape_old = Keylists.at(-1); // ** last element in the array


const color = {
backgroundcolor : "black",
frame : "black",
fontendcolor : "white",
L : "rgba(229, 172, 246, 1)",
F : "#0DC2FF",
J :"#F0797A",
I : "#FFE138",
S : "#F538FF",
N : "#CCE608",
Z : "#53D31F",
O :"#CFD5DB",
T : "#98F5F9",
TN : "#FFFFFF",
TT : "#FE9900",
};

let shapeX = gameboundary / 2;
let shapeY = 45;
let gamescore = 0;
let target_score = 40;

// level design
let gameLevel = 1;

// image files
// let brickimage = new Image();
// let tetrisimage = new Image();
let background = new Image();
background.src = "background.png"
// brickimage.src = "wall.png";
// tetrisimage.src = "tetris.png";

//ghost constant
ghostconst = getGhostPosition() 



function backGround(){
    ctx.drawImage (background, -5, 0, 300, 488);
}

function drawboard(){     
    
    // whole board; including side area
    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    backGround();

    //Score texting
    dealingText(color.fontendcolor, 15, gamescore, 270, 61);
    //dealingText("red", 16, "Game Level: " + gameLevel, extraspace, 160);

    if (gameover){

        dealingText(color.fontendcolor, 22, "Game Over" , gameboundary * 0.20 , canvas.height / 2);

    } else {
        
        for (let i = 0; i < row; i++){
            for (let j = 0; j < col; j++){
                if (grid [i][j] !== 0) {
                    ctx.fillStyle = grid[i][j] || "black";
                    ctx.fillRect(j * tilesize, i * tilesize, tilesize, tilesize)
                    
                    ctx.fillStyle = "rgba(255,255,255,0.9)";
                    ctx.fillRect(j * tilesize, i * tilesize, tilesize, tilesize / 4);
                    
                    ctx.strokeStyle = color.frame;
                    ctx.lineWidth = framegap;
                    ctx.strokeRect(j * tilesize, i * tilesize, tilesize, tilesize);
                }
            } 
        }
    }    
}

function drawLine(x1, y1, x2, y2, color, width) {

    ctx.beginPath();
    ctx.moveTo(x1, y1); 
    ctx.lineTo(x2, y2);  
    ctx.strokeStyle = color;  
    ctx.lineWidth = width; 
    ctx.stroke();  
}

function dealingText (coloroffont, fontsize, text, locx, locy){  
       
    ctx.fillStyle = coloroffont;
    ctx.font = `${fontsize}px 'Courier New', monospace`;
    ctx.textalign = "center";
    ctx.fillText (text, locx , locy);    

    ctx.lineWidth = 2;
    ctx.strokeStyle = coloroffont;  
    ctx.strokeText(text, locx, locy);
}

function drawshapes() {    
    //ghostPosY = getGhostPosition()
    for (let i = 0; i < shape[ranshape[1]].length; i++) {
        for (let j = 0; j < shape[ranshape[1]][i].length; j++) {
            if (shape[ranshape[1]][i][j] == 1) {
                //drawGhost(shapeX + j * tilesize, ghostPosY + i * tilesize);
                ctx.fillStyle = color[ranshape[1]];             
                ctx.fillRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize);
                ctx.fillStyle = "rgba(255,255,255,0.9)"; // half-transparent
                ctx.fillRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize / 4);
                ctx.strokeStyle = color.frame;
                ctx.lineWidth = framegap;
                ctx.strokeRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize);
            }
        }
    }       
}

function drawEkstraSpace (){

    //drawLine(gameboundary, 0, gameboundary, canvas.height, "yellow", 8);
    //drawLine(gameboundary, canvas.height/2, canvas.width, canvas.height / 2, "#34EEF6", 8)
    
    // grid2[14].fill(1); // use a grid to place bricks
    // grid2 [0].fill(1);
    // grid2[5].fill(1);
    // grid2 [grid2.length -3].fill(1);
    // for (let i = 0; i < row; i++){
    //     for (let j = 0; j < col2; j++){
    //         if (grid2[i][j] === 1) {
    //             let x = j * 16 + gameboundary + 4
    //             let y = i * 16 
    //             ctx.drawImage(tetrisimage, x, y, 16, 16)
    //         }
    //     }
    // }
    for (let i = 0; i < shape[ranshape[0]].length; i++) {
        for (let j = 0; j < shape[ranshape[0]][i].length; j++) {
            if (shape[ranshape[0]][i][j] == 1) {

                ctx.fillStyle = color[ranshape[0]]             
                ctx.fillRect(235 + j * tilesize, 92 + i * tilesize  , tilesize, tilesize);
                
                ctx.fillStyle = "rgba(255,255,255,0.6)";
                ctx.fillRect(235 + j * tilesize, 92 + i * tilesize  , tilesize, tilesize / 4);
                                
                ctx.strokeStyle = color.frame;
                ctx.lineWidth = framegap;
                ctx.strokeRect(235 + j * tilesize, 92 + i * tilesize  , tilesize, tilesize);
            }
        }
    }
    //dealingText(color[ranshape[0]], 18, "Next Shape", extraspace, 280)
}

function drawGhost (){   

    ghostPosY = getGhostPosition();
    //cnsole.log(ghostPosY);
    for (let i = 0; i < shape[ranshape[1]].length; i++) {
        for (let j = 0; j < shape[ranshape[1]][i].length; j++) {
            if (shape[ranshape[1]][i][j] == 1) {              
           
                ctx.globalAlpha = 0.15;
                ctx.fillStyle = "white";
                ctx.fillRect (shapeX + j * tilesize, ghostPosY + i * tilesize, tilesize, tilesize);
                ctx.strokeStyle = "white";
                ctx.lineWidth = framegap;
                ctx.strokeRect(shapeX + j * tilesize, ghostPosY + i * tilesize, tilesize, tilesize);
                ctx.globalAlpha = 1;        
            }
        }
     }
 }

function getGhostPosition () {
          
    let ghostY = 45;        
    while (!collisionGhostDetection(ghostY)) {
        ghostY += tilesize;
    }
    console.log (ghostY)
    return ghostY; 

}

 // Adjust to stop at the correct position

function collisionGhostDetection(y) {
    for (let i = 0; i < shape[ranshape[1]].length; i++) {
        for (let j = 0; j < shape[ranshape[1]][i].length; j++) {
            if (shape[ranshape[1]][i][j] === 1) {
                let newY = Math.floor(y / tilesize) + i + 1;
                let newX = Math.floor(shapeX / tilesize) + j;
                if (newY >= row || grid[newY][newX] !== 0) {
                    
                    return true;
                    
                }
            }
        }
    }
    return false;
}

function getRandomShape (){

    return Keylists[Math.floor(Math.random() * Keylists.length)];
}

function collisondetection (){

    for (let i = 0; i < shape[ranshape[1]].length; i++) {
        for (let j = 0; j < shape[ranshape[1]][i].length; j++){
            if (shape[ranshape[1]][i][j] === 1){
                let newY = (shapeY / tilesize) + i + 1;
                let newX = (shapeX / tilesize) + j;
                if (newY >= row || grid[Math.floor(newY)][Math.floor(newX)] !== 0){
                    return true;
                }                
            }
        }
    }
    return false;
}

function Placetheshape (x, y){

    for (let i = 0; i < shape[ranshape[1]].length ; i++){
        for (let j = 0; j < shape[ranshape[1]][i].length; j++){
            if (shape[ranshape[1]][i][j] == 1){
                grid[y + i][x + j] = color[ranshape[1]]
            } 
        }
    }
    clearFullRows();
}

function clearFullRows() {

    for (let i = row - 1; i >= 0; i--) {
        let rowfull = true;

        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 0){
                rowfull = false;
                break
            } 
        }
        if (rowfull){
             
            grid.splice(i, 1);  
            grid.unshift(new Array(col).fill(0));  
            gamescore += 10;
            if (gamescore >= target_score) {
                gameLevel += 1;
                velshapeY *= 1.2;
                target_score += 40;
            }   
            i++;
        }        
        // if (grid[i].every(cell => cell !== 0)) {  
        //     grid.splice(i, 1);  
        //     grid.unshift(new Array(col).fill(0));  
        //     gamescore += 10;  
        //     i++;  
        // }
    }
}

function moveshapes(){
    if (!collisondetection()){
        shapeY += velshapeY;                    
    } else if ( shapeY <= 50) {
        gameover = true;
    } else {
        Placetheshape(Math.floor(shapeX / tilesize), Math.floor(shapeY / tilesize));
        shapeY = 45;
        ranshape.pop();
        ranshape.unshift(getRandomShape());
        shapeX = Math.floor(gameboundary / 2 - tilesize);
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
        let shapeWidth = shape[ranshape[1]][0]. length * tilesize   
        if (shapeX + shapeWidth >= gameboundary) {  
            shapeX = gameboundary - shapeWidth;
        }       
    } else if (event.key === "ArrowDown"){
                
        if (!collisondetection()){
            shapeY += tilesize;
        }
        
        if (shapeY >= canvas.height + shape[ranshape[1]].length * tilesize){
            shapeY = canvas.height + shape[ranshape[1]].length * tilesize
        }
    }   
});

function drawEveryting(){   
    
    drawboard()
    if (!gameover){
        drawshapes();
        drawGhost()
    }    
    drawEkstraSpace();    
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
// lets try to code the collison detection.- done
// color the shapes - done
// lets gain some points and break the shape -done
// end the game -done
// "n" shape will be added -done
// write the code again with for loop at clearfullrows function -done
// points mechanism shown on the board -now canvas width reshaped with extraspace; still in progress (mechanics done)
// next shape visuals -done
// make the code much simplier - in progress
// game entry screen and choose levels - in progress
// visual effects on "gameover"
// restart button
// ghost shape

// issue/bug : when arrowdown to the end, game loop paused and shape out of board -resolved by adjusting vertical speed to tilesize 
// issue/bug : side collision detection should be added to code.

// for the long term improvement add visual affects and organise the game frame
// for the long term improvement add possibility
// publish the game
// magical box




// ** represents : new js function usage
