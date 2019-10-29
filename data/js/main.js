var blocks = [];
var allClickedBlocks = [];
var canvas = document.getElementById("main");


var surround = [{x : -1, y : -1}, {x : -1, y : 0}, {x : -1, y : 1}, {x : 0, y : -1}, {x : 0, y : 1}, {x : 1, y : -1}, {x : 1, y : 0}, {x : 1, y : 1}];
var smallSurround = [{x : -1, y : 0}, {x : 1, y : 0}, {x : 0, y : -1}, {x : 0, y : 1}];

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
            if(insideBounds({x : loc.x + surroundNumber.x, y : loc.y + surroundNumber.y})) {
                surround.forEach(function(surroundingSurroundNumber) {
                    if(insideBounds({x : loc.x + surroundNumber.x + surroundingSurroundNumber.x, y : loc.y + surroundNumber.y + surroundingSurroundNumber.y})) {
                        if(blocks[loc.x + surroundingSurroundNumber.x + surroundNumber.x][loc.y + surroundingSurroundNumber.y + surroundNumber.y].bType == blockTypes[2]) {
                            number++;
                        }
                    } else {
                        console.log("Block out of range");
                    }
                });
                if(blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y] != blockTypes[2]) {
                    blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y] = {bType : blockTypes[number], isClicked : false};
                }
                number = 2;
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
        clickedWhite(x, y);
    }

    blocks[x][y].isClicked = true;
    createBlock(blocks[x][y].bType, x, y);
}

// Clicked white block?
function clickedWhite(x, y) {
    for(var xS = 0; xS < size.x; xS++) {
        for(var yS = 0; yS < size.y; yS++) {    
            console.log("Finding shortest route to " + x + ", " + y + " from " + xS + ", " + yS);
            if(blocks[xS][yS].bType == blockTypes[1]) {
                findPath(xS, yS, x, y);
            } else {
                console.log("Block at " + xS + ", " + yS + " is not white");
            }
        }
    }
}

// HELPER FUNC
function findPath(xS, yS, xF, yF) {
    var startPos = {x : xS, y : yS};
    var foundPath = false;
    var maxTries = 30;
    console.log("Max tries : " + maxTries);
    var tryNumber = 0;

    while(!foundPath && maxTries > tryNumber) {
        var differences = [];
        var diffLoc = [];
        for(var i = 0; i < smallSurround.length; i++) {
            if(insideBounds({x : smallSurround[i].x + xS, y : smallSurround[i].y + yS})) {
                if(blocks[xS + smallSurround[i].x][yS + smallSurround[i].y].bType == blockTypes[1]) {
                    console.log("Possible block found");
                    var diff = {};
                    diff.x = difference(xS + smallSurround[i].x, xF);
                    diff.y = difference(yS + smallSurround[i].y, yF);

                    var dLoc = {};
                    dLoc.x = xS + smallSurround[i].x;
                    dLoc.y = yS + smallSurround[i].y;

                    console.log(difference(xS + smallSurround[i].x, xF));
                    differences.push(diff);
                    diffLoc.push(dLoc);
                }
            }
        }
        
        var bestCandidate = {x : 100, y : 100};
        var bestLoc = {};
        for(var i = 0; i < differences.length; i++) {
            
            if(bestCandidate.x > differences[i].x || bestCandidate.y > differences[i].y) {
                bestCandidate = differences[i];
                bestLoc = diffLoc[i];
            }
        }

        console.log("Going to " + bestLoc.x + ", " + bestLoc.y);
        xS = bestLoc.x;
        yS = bestLoc.y;

        console.log("To go: " + difference(xS, xF) + ", " + difference(yS, yF));

        if(xS == xF && yS == yF) {
            console.log("Reached block");
            for(let surroundPos of surround) {
                if(insideBounds({x : surroundPos.x + startPos.x, y : surroundPos.y + startPos.y})) {
                    createBlock(blocks[startPos.x + surroundPos.x][startPos.y + surroundPos.y].bType, startPos.x + surroundPos.x, startPos.y + surroundPos.y);
                    blocks[startPos.x + surroundPos.x][startPos.y + surroundPos.y].isClicked = true;
                }
            }
            blocks[startPos.x][startPos.y].isClicked = true;
            foundPath = true;
        }

        tryNumber++;
        console.log("Try number: " + tryNumber);
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

function insideBounds(pos) {
    if(pos.x < size.x && pos.y < size.y && pos.x >= 0 && pos.y >= 0) {
        return true;
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