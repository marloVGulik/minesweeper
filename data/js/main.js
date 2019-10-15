var blocks = [];
var canvas = document.getElementById("main");


var surround = [{x : -1, y : -1}, {x : -1, y : 0}, {x : -1, y : 1}, {x : 0, y : -1}, {x : 0, y : 1}, {x : 1, y : -1}, {x : 1, y : 0}, {x : 1, y : 1}];

var size = {x : 10, y : 10};

var bombLoc = [];


var blockTypes = ["notClicked", "empty", "bomb", "1", "2", "3", "4", "5", "6", "7", "8"];

function Init() { // Run to start game
    size.x = prompt("Width");
    size.y = prompt("Height");
    var bombAmount = prompt("Bomb amount");

    //var bombAmount = 10;

    initCanvas(size);
    generateShownGrid(size);
    generateHiddenGrid(size, bombAmount);
}


function initCanvas(size) { // Create canvas and activate click detector
    canvas.width = size.x * 16;
    canvas.height = size.y * 16;

    canvas.addEventListener("click", function(evt){
        var mPos = getMousePos(canvas, evt);
        clickedBlock(Math.floor(mPos.x / 16), Math.floor(mPos.y / 16));
    });
}

function generateShownGrid(size) { // Generates empty grid    
    for(var x = 0; x < size.x; x++) {
        for(var y = 0; y < size.y; y++) {
            createBlock(blockTypes[0], x, y);
        }
    }
}

function generateHiddenGrid(size, bombAmount) {
    // Start with generating the complete grid as empty
    for(var xLoc = 0; xLoc < size.x; xLoc++) {
        var localYLength = [];
        for(var yLoc = 0; yLoc < size.y; yLoc++) {
            localYLength.push(blockTypes[1]);
        }
        blocks.push(localYLength);
    }

    // Generating bombs locations
    var random = [];
    for(var i = 0; i < bombAmount; i++) { // Generate random locations for the bombs
        random.push({});
        random[i].x = Math.floor(Math.random() * size.x);
        random[i].y = Math.floor(Math.random() * size.y);

        bombLoc.forEach(function(savedNumber) {
            console.log("Found double bomb location");
            if(savedNumber.x == random[i].x && savedNumber.y == random[i].y) {
                random[i].x = Math.floor(Math.random() * size.x);
                random[i].y = Math.floor(Math.random() * size.y);
            }
        });
        bombLoc.push(random[i]);
    }

    // Make the blocks around the bomb have numbers
    bombLoc.forEach(function(loc){
        console.log(loc.x + ", " + loc.y);
        blocks[loc.x][loc.y] = blockTypes[2];
        var number = 2;
        surround.forEach(function(surroundNumber) {
            if(loc.x + surroundNumber.x < size.x && loc.y + surroundNumber.y < size.y) {
                if(loc.x + surroundNumber.x >= 0 && loc.y + surroundNumber.y >= 0) {
                    surround.forEach(function(surroundingSurroundNumber) {
                        if(loc.x + surroundingSurroundNumber.x + surroundNumber.x < size.x && loc.y + surroundingSurroundNumber.y + surroundNumber.y < size.y) {
                            if(loc.x + surroundingSurroundNumber.x + surroundNumber.x >= 0 && loc.y + surroundingSurroundNumber.y + surroundNumber.y >= 0) {
                                if(blocks[loc.x + surroundingSurroundNumber.x + surroundNumber.x][loc.y + surroundingSurroundNumber.y + surroundNumber.y] == blockTypes[2]) {
                                    number++;
                                    console.log("Found bomb, increasing number");
                                } else {
                                    console.log("Didn't find a bomb");
                                }
                            } else {
                                console.log("Block out of range");
                            }
                        }
                    });
                    if(blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y] != blockTypes[2]) {
                        blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y] = blockTypes[number];
                    }
                    number = 2;
                }
            }
        });
    });
    console.log(blocks);
}



function createBombBlock(x, y) {
    console.log("Creating bombs...");
    for(var i = 0; i < bombLoc.length; i += 2) {
        if(bombLoc[i] == x) {
            console.log("Found bomb at x " + x + ", bombloc: " + bombLoc[i]);
            if(bombLoc[i + 1] == y) {
                console.log("Found bomb at y " + y + ", bombloc: " + bombLoc[i + 1]);
                blocksY.push(blockTypes[2]);
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
function clickedBlock(x, y, cheat) {
    var cheat = cheat | false;
    console.log("Clicked: " + x + ", " + y);

    if(x < size.x && y < size.y) {
        if(blocks[x][y] == blockTypes[1]) {
            createBlock(blocks[x][y], x, y);
            clickedWhite(x, y);
        }
    }
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
function createBlock(imageType, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(document.getElementById(imageType), x * 16, y * 16);
}

function setBlock(blockType, x, y) {
    blocks[x].push(blockTypes[blockType]);
}
function cheat(cheat) {
    if(cheat) {
        for(var x = 0; x < size.x; x++) {
            for(var y = 0; y < size.y; y++) {
                createBlock(blocks[x][y], x, y);
            }
        }
    }
}