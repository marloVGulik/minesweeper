// Change clicked block
function clickedBlock(x, y, cheat) {
    var cheat = cheat | false;
    DEBUG(`Clicked ${x}, ${y}`, 'info');


    if(blocks[x][y].bType == blockTypes[1]) {
        DEBUG(`Block is white`, 'warn');
        blocks[x][y].isClicked = true;
        clickedWhite(x, y);
    }

    blocks[x][y].isClicked = true;
    createBlock(blocks[x][y].bType, x, y);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

