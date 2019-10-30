function clickedWhite(x, y) {
    for(var xS = 0; xS < size.x; xS++) {
        for(var yS = 0; yS < size.y; yS++) {    
            DEBUG(`Finding shortest route to ${x}, ${y} from ${xS}, ${yS}`, 'info');
            if(blocks[xS][yS].bType == blockTypes[1]) {
                findPath(xS, yS, x, y);
            } else {
                DEBUG(`Block at ${xS}, ${yS} is not white`, 'info');
            }
        }
    }
}


// HELPER FUNC
function findPath(xS, yS, xF, yF) {
    var startPos = {x : xS, y : yS};
    var foundPath = false;
    var maxTries = 30;
    var tryNumber = 0;

    while(!foundPath && maxTries > tryNumber) {
        var differences = [];
        var diffLoc = [];
        for(var i = 0; i < smallSurround.length; i++) {
            if(insideBounds({x : smallSurround[i].x + xS, y : smallSurround[i].y + yS})) {
                if(blocks[xS + smallSurround[i].x][yS + smallSurround[i].y].bType == blockTypes[1]) {
                    var diff = {};
                    diff.x = difference(xS + smallSurround[i].x, xF);
                    diff.y = difference(yS + smallSurround[i].y, yF);

                    var dLoc = {};
                    dLoc.x = xS + smallSurround[i].x;
                    dLoc.y = yS + smallSurround[i].y;
                    
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

        DEBUG(`Moving main position to ${bestLoc.x}, ${bestLoc.y}`, 'info');
        xS = bestLoc.x;
        yS = bestLoc.y;

        DEBUG(`To go: ${difference(xS, xF)}, ${difference(yS, yF)}`, 'info');
        if(xS == xF && yS == yF) {
            DEBUG(`Reached block ${xF}, ${yF}`, 'info');
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
        DEBUG(`Try ${tryNumber}`, 'info');
    }
}
