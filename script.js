const tiles = document.querySelectorAll('.tile');
let board = Array(16).fill(null);

function drawBoard() {
    tiles.forEach((tile, index) => {
        tile.textContent = board[index] ? board[index] : '';
        tile.style.backgroundColor = board[index] ? '#eee' : '#ccc';
    });
}

function addRandomTile() {
    let emptyTiles = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
    if (emptyTiles.length > 0) {
        let randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    }
}

function moveTiles(direction) {
    let moved = false;
    if (direction === 'up' || direction === 'down') {
        for (let col = 0; col < 4; col++) {
            let column = [board[col], board[col + 4], board[col + 8], board[col + 12]];
            if (direction === 'down') column.reverse();
            let newColumn = mergeTiles(column);
            if (direction === 'down') newColumn.reverse();
            for (let row = 0; row < 4; row++) {
                if (board[col + row * 4] !== newColumn[row]) moved = true;
                board[col + row * 4] = newColumn[row];
            }
        }
    } else if (direction === 'left' || direction === 'right') {
        for (let row = 0; row < 4; row++) {
            let line = [board[row * 4], board[row * 4 + 1], board[row * 4 + 2], board[row * 4 + 3]];
            if (direction === 'right') line.reverse();
            let newLine = mergeTiles(line);
            if (direction === 'right') newLine.reverse();
            for (let col = 0; col < 4; col++) {
                if (board[row * 4 + col] !== newLine[col]) moved = true;
                board[row * 4 + col] = newLine[col];
            }
        }
    }
    return moved;
}

function mergeTiles(line) {
    let newLine = line.filter(val => val !== null);
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 2;
            newLine[i + 1] = null;
        }
    }
    return newLine.filter(val => val !== null).concat(Array(4 - newLine.filter(val => val !== null).length).fill(null));
}

document.addEventListener('keydown', (event) => {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp': moved = moveTiles('up'); break;
        case 'ArrowDown': moved = moveTiles('down'); break;
        case 'ArrowLeft': moved = moveTiles('left'); break;
        case 'ArrowRight': moved = moveTiles('right'); break;
    }
    if (moved) {
        addRandomTile();
        drawBoard();
    }
});

addRandomTile();
addRandomTile();
drawBoard();
