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

function createBlock(imageType, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(document.getElementById(imageType), x * 16, y * 16);
}

// CHEATING IS ILLEGAL
function cheat(cheat) {
    if(cheat) {
        for(var x = 0; x < size.x; x++) {
            for(var y = 0; y < size.y; y++) {
                createBlock(blocks[x][y].bType, x, y);
            }
        }
    }
}

function DEBUG(message, mode) {
    if(debugModeEnabled) {
        switch (mode) {
            case 'error':
                console.error(message);
                break;
            case 'warning':
                console.warn(message);
                break;
            case 'info':
                console.info(message);
                break;
            default:
                console.log(message);
        }
    }
}