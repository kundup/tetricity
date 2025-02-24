var canvas = document.getElementById("tetricity");
var ctx = canvas.getContent("2d");

function draw (){
    drawbackground();
    drawboard();
    drawshapes();
};

function update(){    
};

function gameloop(){
    draw();
    update();
};




// todo creat general concept of the game (canvas id, getcontext, etc) - done
// todo create draft for game- first drawing shapes, board and background then updating the shapes and board and countiously drawing them - done
// completing drawing functions
