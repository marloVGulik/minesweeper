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

// Drag movement
dragElement(document.getElementById("frame"));
function dragElement(element) { 
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if(document.getElementById(element.id + "Drag")) {
        document.getElementById(element.id + "Drag").onmousedown = dragMD;
    } else {
        document.onmousedown = dragMD;
    }

    function dragMD(e) { 
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDrag;
        document.onmousemove = dragElem;
    }
    function dragElem(e) { 
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    function closeDrag() { 
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Create top image
function topImage(imageFileName) {
    document.getElementById("resetButton").innerHTML = `<img src="data/images/MSIcons/${imageFileName}" alt="${imageFileName}">`
}