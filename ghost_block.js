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
          
    let ghostY = statingPosY;        
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
