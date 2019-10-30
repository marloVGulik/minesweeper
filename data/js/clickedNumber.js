function clickedNumber(x, y) {
    if(blocks[x][y].bType != blockTypes[1] || blocks[x][y].bType != blockTypes[2] && !blocks[x][y].isClicked) {
        score -= blocks[x][y].bType * -1;
        blocks[x][y].isClicked = true;
        createBlock(blocks[x][y].bType, x, y);
        DEBUG(`score: ${score}, ${blocks[x][y].bType}`, 'warning');
    } else {
        DEBUG(`Block at this location is not a number, or already clicked`, 'error');
    }
}