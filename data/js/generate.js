// Canvas generation
var canvas = document.getElementById("main");
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


// Bomb generation (main)

// Block data
var blocks = [];
// bomb location
var bombLoc = [];

function generateHiddenGrid(size, bombAmount) {
    // Empty old grid
    blocks = [];
    bombLoc = [];

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

        bombLoc.forEach(function(savedNumber) { // Regenerate in case of double bomb location
            if(savedNumber.x == random[i].x && savedNumber.y == random[i].y) {
                DEBUG(`Found double bomb location at, generating new one`, 'error');
                random[i].x = Math.floor(Math.random() * size.x);
                random[i].y = Math.floor(Math.random() * size.y);
            }
        });
        bombLoc.push(random[i]);
    }

    bombLoc.forEach(function(loc) {
        DEBUG(`Creating bomb at: ${loc.x} , ${loc.y}`, "info");
        blocks[loc.x][loc.y].bType = blockTypes[2];
    });
    // Make the blocks around the bomb have numbers
    bombLoc.forEach(function(loc){
        var number = 2;
        surround.forEach(function(surroundNumber) { // Wrong generation
            if(insideBounds({x : loc.x + surroundNumber.x, y : loc.y + surroundNumber.y})) {
                surround.forEach(function(surroundingSurroundNumber) {
                    if(insideBounds({x : loc.x + surroundNumber.x + surroundingSurroundNumber.x, y : loc.y + surroundNumber.y + surroundingSurroundNumber.y})) {
                        if(blocks[loc.x + surroundNumber.x + surroundingSurroundNumber.x][loc.y + surroundNumber.y + surroundingSurroundNumber.y].bType == blockTypes[2]) {
                            number++;
                        }
                    }
                });
                if(blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y].bType != blockTypes[2] && number > 2) { // makes bomb, number cannot be 2
                    blocks[loc.x + surroundNumber.x][loc.y + surroundNumber.y] = {bType : blockTypes[number], isClicked : false};
                } else {
                    DEBUG(`ERROR: BLOCK AT ${loc.x + surroundNumber.x}, ${loc.y + surroundNumber.y} IS OVERWRITTEN`, 'error');
                }
                number = 2;
            }
        });
    });
    DEBUG(blocks, 'info');
}