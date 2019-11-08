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

var time = {
    update: function() {
        var DT = new Date;
        var displayedTime = {hours : 0, minutes : 0};
        if(DT.getHours() < 10) {
            displayedTime.hours = "0" + DT.getHours();
        } else {
            displayedTime.hours = DT.getHours();
        }
        if(DT.getMinutes() < 10) {
            displayedTime.minutes = "0" + DT.getMinutes();
        } else {
            displayedTime.minutes = DT.getMinutes();
        }
        document.getElementById("timeNumbers").innerHTML = `${displayedTime.hours}:${displayedTime.minutes}`;
    },
    init: function() {
        time.update()
        setInterval(time.update, 1000);
    }
}
// Create random start position
randomStartPos = {x : 0, y : 0};
randomStartPos.x = Math.floor(Math.random() * (window.innerWidth - 300));
randomStartPos.y = Math.floor(Math.random() * (window.innerHeight - 300));
console.log(randomStartPos);
document.getElementById("frame").style.left = `${randomStartPos.x}px`;
document.getElementById("frame").style.top = `${randomStartPos.y}px`;
topImage("happy.png");

// Pre-generate grid
initCanvas(size);
generateShownGrid(size);
generateHiddenGrid(size, 10);



time.init();
function Init() { // Run to start game
    var accepted = false
    do {
        size.x = prompt("Width");
        size.y = prompt("Height");
        if(size.x >= 25 || size.y >= 25) {
            if(confirm(`Are you sure you want it this big? It could cause performance issues.`)) {
                if(size.x <= 100 && size.y <= 60) {
                    accepted = true;
                } else {
                    alert(`Size is still too big, make it at most 100 wide and 60 high`);
                    accepted = false;
                }
            } else {
                alert(`Ok, resetting`);
            }
        } else {
            accepted = true;
        }
    } while (!accepted)
    var bombAmount = prompt("Bomb amount");

    score = 0;
    disarmedBombs = [];
    initCanvas(size);
    generateShownGrid(size);
    generateHiddenGrid(size, bombAmount);
}