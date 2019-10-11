var blocksY = [];
var blocks = [];
var canvas = document.getElementById("main");

var size = {};

var bombLoc = [];


var blockTypes = ["notClicked", "1", "2", "3", "empty", "bomb"];

function Init() {
    var width = prompt("Width");
    var height = prompt("Height");
    var bombAmount = prompt("Bomb amount");

    size.x = width;
    size.y = height;

    initCanvas(width, height);
    generate(width, height, bombAmount);
}


function initCanvas(width, height) {
    canvas.width = width * 16;
    canvas.height = height * 16;

    canvas.addEventListener("click", function(evt){
        var mPos = getMousePos(canvas, evt);
        clickedBlock(Math.floor(mPos.x / 16), Math.floor(mPos.y / 16));
    })
}

function generate(width, height, bombAmount) {
    console.log("Generating " + bombAmount + " bombs");
    
    for(var i = 0; i < bombAmount; i++) {
        var randomX = Math.floor(Math.random() * width);
        var randomY = Math.floor(Math.random() * height);
        bombLoc.push(randomX);
        bombLoc.push(randomY);
        console.log("PLaced bomb on " + randomX + ", " + randomY);
    }
    
    for(var x = 0; x < width; x++) {
        blocksY = [];
        for(var y = 0; y < height; y++) {
            createBlock(blockTypes[0], x, y);
            blocksY.push(blockTypes[4]);
            createBombBlock(x, y);
        }


        blocks.push(blocksY);
    } 
    
    // for(var i = 0; i < bombAmount; i++) {
    //     console.log("Placing bomb on " + bombLoc[i] + ", " + bombLoc[i + 1]);
    //     blocks[bombLoc[i]][bombLoc[i + 1]] = blockTypes[5];
    // }

    console.log(blocks);
}

function createBlock(imageType, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(document.getElementById(imageType), x * 16, y * 16);
}

function createBombBlock(x, y) {
    console.log("Creating bombs...");
    for(var i = 0; i < bombLoc.length; i += 2) {
        if(bombLoc[i] == x) {
            console.log("Found bomb at x " + x + ", bombloc: " + bombLoc[i]);
            if(bombLoc[i + 1] == y) {
                console.log("Found bomb at y " + y + ", bombloc: " + bombLoc[i + 1]);
                blocksY.push(blockTypes[5]);
                console.log("Put bomb at " + x + ", " + y);
            }
        }
    }
}

// Choose block type
function chooseBlockType(x, y) {


    blocks[x][y] = blockTypes[Math.floor(Math.random() * 5 + 1)];
    console.log(blocks[x][y]);
}

// Change clicked block
function clickedBlock(x, y) {
    console.log("Clicked: " + x + ", " + y);

    if(x < size.x && y < size.y) {
        if(blocks[x][y] == blockTypes[4]) {
            createBlock(blocks[x][y], x, y);
            clickedWhite(x, y);
        }
    }
    createBlock(blocks[x][y], x, y);
}
function clickedWhite(x, y) {
    for(var xMin = 0; xMin < size.x; xMin++) {
        for(var yMin = 0; yMin < size.y; yMin++) {
            createBlock(blocks[xMin][yMin], xMin, yMin);
            if(blocks[xMin][yMin] != blockTypes[4]) {
                yMin = size.y;
            }
        }
        for(var yMax = 0; yMax < size.y; yMax++) {
            createBlock(blocks[xMin][yMax], xMin, yMax);
            if(blocks[xMin][yMax] != blockTypes[4]) {
                yMax = size.y;
            }
        }
    }
    for(var xMax = 0; xMax < size.x; xMax++) {
        for(var yMin = 0; yMin < size.y; yMin++) {
            createBlock(blocks[xMax][yMin], xMax, yMin);
            if(blocks[xMax][yMin] != blockTypes[4]) {
                yMin = size.y;
            }
        }
        for(var yMax = 0; yMax < size.y; yMax++) {
            createBlock(blocks[xMax][yMax], xMax, yMax);
            if(blocks[xMax][yMax] != blockTypes[4]) {
                yMax = size.y;
            }
        }
    }
}

// HELPER FUNC
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}