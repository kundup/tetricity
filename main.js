
const canvas = document.getElementById("tetricity");
const ctx = canvas.getContext("2d");

let gameover = false;
const tilesize = 15;
const velshapeY = 1;
const row = 30;
const col = 20;
const gameboundary = col * tilesize
let extraspace = gameboundary + 10;
const framegap = 1;
const grid = new Array(row).fill().map(()=> new Array(col). fill(0)); // ** new js feature used to draw grid
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
let ranshape = []
//let ranshape_old = Keylists.at(-1); // ** last element in the array
ranshape.push(getRandomShape(), getRandomShape());

const color = {
backgroundcolor : "black",
frame : "black",
fontendcolor : "white",
L : "#E5ACF6",
F : "#83BAFF",
J :"#F0797A",
I : "#DFC57B",
S : "#9269F3",
N : "#CCE608",
Z : "#53D31F",
O :"#CFD5DB",
T : "#98F5F9",
TN : "#FFFFFF",
TT : "#FE9900",
};

let shapeX = gameboundary / 2 - tilesize;
let shapeY = 0;
let gamescore = 0;

function drawboard(){      

    // whole board; including side area
    ctx.fillStyle = color.backgroundcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
    
    //Score texting
    dealingText(color.fontendcolor, 20, "Score: " + gamescore, extraspace, 100)

    if (gameover){

        dealingText(color.fontendcolor, 22, "Game Over" , gameboundary * 0.3, canvas.height / 2);

    } else {
        
        for (let i = 0; i < row; i++){
            for (let j = 0; j < col; j++){
                if (grid [i][j] !== 0) {
                    ctx.fillStyle = grid[i][j];
                    ctx.fillRect(j * tilesize, i * tilesize, tilesize, tilesize)
    
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
    ctx.strokeStyle = coloroffont;  // Siyah kenarlık
    ctx.strokeText(text, locx, locy);
}

function drawshapes() {        
       
    if (!gameover) {
        for (let i = 0; i < shape[ranshape[1]].length; i++) {
            for (let j = 0; j < shape[ranshape[1]][i].length; j++) {
                if (shape[ranshape[1]][i][j] == 1) { 
                    ctx.fillStyle = color[ranshape[1]]             
                    ctx.fillRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize);
                    
                    ctx.strokeStyle = color.frame;
                    ctx.lineWidth = framegap;
                    ctx.strokeRect(shapeX + j * tilesize, shapeY + i * tilesize, tilesize, tilesize);
                }
            }
        }
    }    
};

function drawEkstraSpace (){

    drawLine(gameboundary, 0, gameboundary, canvas.height, "#34EEF6", 8);
    drawLine(gameboundary, canvas.height/2, canvas.width, canvas.height / 2, "#34EEF6", 8)

    for (let i = 0; i < shape[ranshape[0]].length; i++) {
        for (let j = 0; j < shape[ranshape[0]][i].length; j++) {
            if (shape[ranshape[0]][i][j] == 1) { 
                ctx.fillStyle = color[ranshape[0]]             
                ctx.fillRect(extraspace + 35 + j * tilesize, 325 + i * tilesize  , tilesize, tilesize);
                
                ctx.strokeStyle = color.frame;
                ctx.lineWidth = framegap;
                ctx.strokeRect(extraspace + 35 + j * tilesize, 325 + i * tilesize  , tilesize, tilesize);
            }
        }
    }
    dealingText(color[ranshape[0]], 18, "Next Shape", extraspace, 275)
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
                grid[y + i][x + j] = color[ranshape[1]];
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
        gameover = true        

    } else {
        Placetheshape(Math.floor(shapeX / tilesize), Math.floor(shapeY / tilesize));
        shapeY = 0;
        ranshape.pop()
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
        shapeY += 15;
    }   
});

function drawEveryting(){
    drawboard();
    drawshapes();
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
// game entry screen and choose levels
// visual effects on "gameover"

// issue/bug : when arrowdown to the end, game loop paused and shape out of board -resolved by adjusting vertical speed to tilesize 
// issue/bug : side collision detection should be added to code.

// for the long term improvement add visual affects and organise the game frame
// for the long term improvement add possibility
// publish the game
// magical box




// ** represents : new js function usage