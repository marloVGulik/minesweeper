var blocks = [];
var allClickedBlocks = [];
var canvas = document.getElementById("main");


var surround = [{x : -1, y : -1}, {x : -1, y : 0}, {x : -1, y : 1}, {x : 0, y : -1}, {x : 0, y : 1}, {x : 1, y : -1}, {x : 1, y : 0}, {x : 1, y : 1}];
var smallSurround = [{x : 0, y : 0}, {x : -1, y : -1}, {x : -1, y : 1}, {x : 1, y : -1}, {x : 1, y : 1}];

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
            localYLength.push({bType : blockTypes[1], isClicked : false});
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
        blocks[loc.x][loc.y] = {bType : blockTypes[2], isClicked : false};
        var number = 2;
        surround.forEach(function(surroundNumber) {
            if(loc.x + surroundNumber.x < size.x && loc.y + surroundNumber.y < size.y) {
                if(loc.x + surroundNumber.x >= 0 && loc.y + surroundNumber.y >= 0) {
                    surround.forEach(function(surroundingSurroundNumber) {
                        if(loc.x + surroundingSurroundNumber.x + surroundNumber.x < size.x && loc.y + surroundingSurroundNumber.y + surroundNumber.y < size.y) {
                            if(loc.x + surroundingSurroundNumber.x + surroundNumber.x >= 0 && loc.y + surroundingSurroundNumber.y + surroundNumber.y >= 0) {
                                if(blocks[loc.x + surroundingSurroundNumber.x + surroundNumber.x][loc.y + surroundingSurroundNumber.y + surroundNumber.y].bType == blockTypes[2]) {
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
                        blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y] = {bType : blockTypes[number], isClicked : false};
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

// Choose block type at random
function chooseBlockType(x, y) {
    blocks[x][y] = blockTypes[Math.floor(Math.random() * 5 + 1)];
    console.log(blocks[x][y]);
}

// Change clicked block
function clickedBlock(x, y, cheat) {
    var cheat = cheat | false;
    console.log("Clicked: " + x + ", " + y);


    if(blocks[x][y].bType == blockTypes[1]) {
        console.log("White clicked");
        blocks[x][y].isClicked = true;
        clickedWhite2(x, y);
    }

    blocks[x][y].isClicked = true;
    createBlock(blocks[x][y].bType, x, y);
}

// Clicked white block?
function clickedWhite(x, y) {
    for(var i = 0; i < size.x; i++) {
        for(var j = 0; j < size.y; j++) {
            if(blocks[i][j].bType == blockTypes[1] && blocks[i][j].isClicked == true) {
                smallSurround.forEach(function(loc) {
                    if(i + loc.x < size.x && j + loc.y < size.y) {
                        if(i + loc.x >= 0 && j + loc.y >= 0) {
                            if(blocks[i + loc.x][j + loc.y].isClicked == true) {
                                if(smallSurround.forEach(function(pos) {
                                    console.log("Checking");
                                    if(blocks[i + loc.x + pos.x][j + loc.y + pos.y].bType == blockTypes[1]) {
                                        console.log("Returning true");
                                        return true;
                                    } else {
                                        console.log("Returning false");
                                        return false;
                                    }
                                }) == true) {
                                    console.log("test")
                                    createBlock(blocks[i + loc.x][j + loc.y].bType, i + loc.x, j + loc.y);
                                    blocks[i + loc.x][j + loc.y].isClicked = true;
                                }
                            }
                        }
                    }
                });
            }
        } 
    }
}

function clickedWhite2(x, y) {
    for(var xS = 0; xS < size.x; xS++) {
        for(var yS = 0; yS < size.y; yS++) {
            console.log("Finding shortest route to " + x + ", " + y + " from " + xS + ", " + yS);
            findPath(xS, yS, x, y);
        }
    }
}

// HELPER FUNC
function findPath(xS, yS, xF, yF) {
    var firstrun = true;
    while(xS != xF && yS != yF) {
        var scoreX = difference(xS, xF);
        var scoreY = difference(yS, yF);
        
        if(firstrun) {
            var oldDiffX = difference(xS, xF);
            var oldDiffY = difference(yS, yF);
            firstrun = true;
        }
        
        for(let pos of surround) {
            if(pos.x + xS < size.x && pos.x + xS >= 0 && pos.y + yS < size.y && pos.y + yS >= 0) {
                if(blocks[xS + pos.x][yS + pos.y].bType != blockTypes[1]) {
                    console.log("Number found");
                    break;
                } else {

                    createBlock(blocks[xS + pos.x][yS + pos.y].bType, xS + pos.x, yS + pos.y);
                    blocks[xS + pos.x][yS + pos.y].isClicked = true;

                    var posX = pos.x + xS;
                    var posY = pos.y + yS;
    
                    var diffX = difference(posX, xF);
                    var diffY = difference(posY, yF);
                    //console.log(difference(posX, xF) + ", " + difference(posY, yF));

                    if(diffX < oldDiffX) {
                        console.log("Going good in X direction ");
                        xS += pos.x;
                        var scoreX = difference(xS, xF);
                    } else if(diffY < oldDiffY) {
                        console.log("Going good in Y direction ");
                        yS += pos.y;
                        var scoreY = difference(yS, yF);
                    }
                }
            }
        }
        oldDiffX = difference(xS, xF);
        oldDiffY = difference(yS, yF);
    }
}
function difference(number1, number2) {
    if(number1 - number2 < 0) {
        var returnVal = (number1 - number2) * -1;
        return returnVal;
    } else {
        var returnVal = number1 - number2;
        return returnVal;
    }
}

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

function setBlock(blockType, isClicked, x, y) {
    blocks[x].push(blockTypes[{bType : blockType, isClicked : isClicked}]);
}
function cheat(cheat) {
    if(cheat) {
        for(var x = 0; x < size.x; x++) {
            for(var y = 0; y < size.y; y++) {
                createBlock(blocks[x][y].bType, x, y);
            }
        }
    }
}