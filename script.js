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
    // Implement the logic to move tiles based on the direction
    // This is a simplified version and needs more logic to handle merging tiles
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': moveTiles('up'); break;
        case 'ArrowDown': moveTiles('down'); break;
        case 'ArrowLeft': moveTiles('left'); break;
        case 'ArrowRight': moveTiles('right'); break;
    }
    addRandomTile();
    drawBoard();
});

addRandomTile();
addRandomTile();
drawBoard();
