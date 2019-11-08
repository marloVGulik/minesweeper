function clickedBomb(x, y) {
    bombLoc.forEach(function(currentBombLoc) {
        blocks[currentBombLoc.x][currentBombLoc.y].isClicked = true;
        createBlock(blockTypes[2], currentBombLoc.x, currentBombLoc.y);
        winState = false;
    });
    topImage("dead.png");
    createBlock(blockTypes[11], x, y);
}