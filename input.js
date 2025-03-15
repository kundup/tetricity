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

canvas.addEventListener("click", function (event) {

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    console.log(mouseX, mouseY);
    

    if (
        mouseX >= startbutton.x &&
        mouseX <= startbutton.x + startbutton.width &&
        mouseY >= startbutton.y &&
        mouseY <= startbutton.y + startbutton.height
    ) {
        gamestart = true;        
    }  
})
