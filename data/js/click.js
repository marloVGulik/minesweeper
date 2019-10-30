// Change clicked block
function clickedBlock(x, y, cheat) {
    var cheat = cheat | false;
    DEBUG(`Clicked ${x}, ${y}`, 'info');
    
    if(disarmedBombs.length == bombLoc.length) {
        winState = true;
        document.write(`Your score was ${score}`);
        //var button = document.getElementById("resetButton");
        var button = document.getElementsByTagName("button");
        DEBUG(button, 'error');
        button.style.backgroundImage = 'url("../images/win.png")';
    }

    var clickedBlockType = blocks[x][y].bType;
    if(winState != false) {
        if(!blocks[x][y].isClicked) {
        switch(clickedBlockType) {
                case blockTypes[1]:
                    DEBUG(`Block is white`, 'warning');
                    blocks[x][y].isClicked = true;
                    clickedWhite(x, y);
                    break;
                case blockTypes[2]:
                    DEBUG(`Block is a bomb`, 'warning');
                    blocks[x][y].isClicked = true;
                    clickedBomb(x, y);
                    break;
                default:
                    blocks[x][y].isClicked = true;
                    clickedNumber(x, y);
            }
        }
    }
}
function rightClickedBlock(x, y) {
    DEBUG(`Right-clicked ${x}, ${y}`, 'info');
    if(winState != false) {
        var isClicked = blocks[x][y].isClicked;
        switch (isClicked) {
            case true:
                createBlock(blockTypes[13], x, y);
                blocks[x][y].isClicked = false;
                if(blocks[x][y].bType == blockTypes[2]) {
                    disarmedBombs.splice(disarmedBombs.findIndex(function(element) {
                        if(element.x == x && element.y == y) {
                            return element;
                        }
                    }), 1);
                }
            break;
            case false:
                createBlock(blockTypes[12], x, y);
                blocks[x][y].isClicked = true;
                if(blocks[x][y].bType == blockTypes[2]) {
                    var tempLoc = {};
                    tempLoc.x = x;
                    tempLoc.y = y;
                    disarmedBombs.push(tempLoc);
                }
            break;
        }
        
        DEBUG(disarmedBombs, 'info');
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

