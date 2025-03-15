const canvas = document.getElementById("tetricity");
const ctx = canvas.getContext("2d");

// game status
let gamestart = false;
let gameover = false;
const startbutton = {x: 60, y: 283, width : 90, height : 60};

const tilesize = 15;
let velshapeY = 1;
const statingPosY = 45;
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
let shapeY = statingPosY;
let gamescore = 0;
let target_score = 40;

// level design
let gameLevel = 1;

// image files
let titlePage = new Image();
let background = new Image();
background.src = "background.png";
titlePage.src = "title_page.png";

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

function drawTitlePage () {

    ctx.drawImage(titlePage, 2, 40, 300, 370);
    ctx.strokeStyle = color.frame;
    ctx.lineWidth = 9;
    ctx.strokeRect(0, 35, 300, 380);    
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

    if (gamestart){        
        if (!collisondetection()){
            shapeY += velshapeY;                    
        } else if ( shapeY <= 50) {
            gameover = true;
        } else {
            Placetheshape(Math.floor(shapeX / tilesize), Math.floor(shapeY / tilesize));
            shapeY = statingPosY;
            ranshape.pop();
            ranshape.unshift(getRandomShape());
            shapeX = Math.floor(gameboundary / 2 - tilesize);
        }
    } else {
        return
    }  
}

function drawEveryting(){
    if (!gamestart){
        drawTitlePage();
    } else {        
        drawboard()    
        if (!gameover){
            drawshapes();
            drawGhost();
        }    
        drawEkstraSpace();
    }          
}

function gameloop(){
    
    drawEveryting();
    moveshapes();       
    requestAnimationFrame(gameloop);
}
gameloop();


