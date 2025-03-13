const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 32;
const mapWidth = 25;
const mapHeight = 18;

let player = {
    x: Math.floor(mapWidth / 2),
    y: Math.floor(mapHeight / 2),
    color: 'blue'
};

let map = generateMap();

function generateMap() {
    let map = [];
    for (let y = 0; y < mapHeight; y++) {
        let row = [];
        for (let x = 0; x < mapWidth; x++) {
            row.push(Math.random() > 0.8 ? 1 : 0); // 20% kans op een muur
        }
        map.push(row);
    }
    return map;
}

function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            ctx.fillStyle = map[y][x] === 1 ? 'gray' : 'black';
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (player.y > 0 && map[player.y - 1][player.x] === 0) player.y--;
            break;
        case 'ArrowDown':
            if (player.y < mapHeight - 1 && map[player.y + 1][player.x] === 0) player.y++;
            break;
        case 'ArrowLeft':
            if (player.x > 0 && map[player.y][player.x - 1] === 0) player.x--;
            break;
        case 'ArrowRight':
            if (player.x < mapWidth - 1 && map[player.y][player.x + 1] === 0) player.x++;
            break;
    }
});

gameLoop();
