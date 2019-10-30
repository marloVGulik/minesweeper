// Helper variables (block surroundings)
var surround = [{x : -1, y : -1}, {x : -1, y : 0}, {x : -1, y : 1}, {x : 0, y : -1}, {x : 0, y : 1}, {x : 1, y : -1}, {x : 1, y : 0}, {x : 1, y : 1}];
var smallSurround = [{x : -1, y : 0}, {x : 1, y : 0}, {x : 0, y : -1}, {x : 0, y : 1}];

// Default screen size
var size = {x : 10, y : 10};

var blockTypes = ["notClicked", "empty", "bomb", "1", "2", "3", "4", "5", "6", "7", "8", "clickedBomb", "flag", "questionMark"];

var debugModeEnabled = true;

var winState;
var disarmedBombs = [];
var score = 0;

function Init() { // Run to start game
    size.x = prompt("Width");
    size.y = prompt("Height");
    var bombAmount = prompt("Bomb amount");

    score = 0;
    disarmedBombs = [];

    initCanvas(size);
    generateShownGrid(size);
    generateHiddenGrid(size, bombAmount);
}

