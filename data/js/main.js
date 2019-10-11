var blocksY = [];
var blocks = [];
var canvas = document.getElementById("main");


var blockTypes = ["notClicked", "1", "2", "3", "empty", "bomb"];

function Init() {
    var width = prompt("Width");
    var height = prompt("Height");

    initCanvas(width, height);
    generate(width, height);
}


function initCanvas(width, height) {
    canvas.width = width * 16;
    canvas.height = height * 16;

    canvas.addEventListener("click", function(evt){
        var mPos = getMousePos(canvas, evt);
        clickedBlock(Math.floor(mPos.x / 16), Math.floor(mPos.y / 16));
    })
}

function generate(width, height) {
    for(var x = 0; x < width; x++) {
        blocks.push(blocksY);
        for(var y = 0; y < height; y++) {
            createBlock(blockTypes[0], x, y);
            chooseBlockType(x, y);
        }
    }
    console.log(blocks);
}

function createBlock(imageType, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(document.getElementById(imageType), x * 16, y * 16);
}

function chooseBlockType(x, y) {
    blocks[x][y] = blockTypes[Math.floor(Math.random() * 5 + 1)];
    console.log(blocks[x][y]);
}
function clickedBlock(x, y) {
    console.log("Clicked: " + x + ", " + y);
    createBlock(blocks[x][y], x, y);
}


// HELPER FUNC
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}