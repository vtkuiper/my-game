// Karakter constructor
function Character(name) {
    this.name = name;
    this.hp = 10;
    this.maxHp = 10;
    this.damage = 2;
    this.kills = 0;
    this.rank = "Bronze";
    this.image = `https://picsum.photos/60/60?random=${Math.floor(Math.random() * 1000)}`;  // Random image
    this.foodGatheringProgress = 0;  // Laadbalk voor voedselverzameling
    this.isResting = false; // Controleert of het karakter rust
    this.foodBar = null;  // Houdt de foodbalk bij
    this.section = null; // Houdt bij waar de karakter zich bevindt (resting, food, fighting)
}

// Enemy constructor
function Enemy(name) {
    this.name = name;
    this.hp = 5;
    this.damage = 2;
    this.image = `https://picsum.photos/60/60?random=${Math.floor(Math.random() * 1000)}`;  // Random image
}

// Genereer een random naam voor karakters
function generateRandomName() {
    const names = ['Axel', 'Lena', 'Finn', 'Sophie', 'Kai', 'Emma'];
    return names[Math.floor(Math.random() * names.length)];
}

// Maak een nieuw karakter
function createCharacter() {
    const name = generateRandomName();
    const character = new Character(name);
    characters.push(character);
    updateCharacterList();
}

// Maak een nieuwe vijand aan
function createEnemy() {
    const name = 'Enemy ' + Math.floor(Math.random() * 1000);
    const enemy = new Enemy(name);
    enemies.push(enemy);
    updateEnemyList();
}

// Werk de lijst van beschikbare karakters bij
function updateCharacterList() {
    const charListContainer = document.getElementById('character-list');
    charListContainer.innerHTML = ''; // Verwijder de huidige lijst

    characters.forEach((character, index) => {
        const charDiv = document.createElement('div');
        charDiv.classList.add('character');
        charDiv.setAttribute('draggable', true);
        charDiv.setAttribute('id', 'character-' + index);
        charDiv.setAttribute('ondragstart', 'drag(event)');

        charDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <div class="character-info">
                <p><strong>${character.name}</strong></p>
                <p>HP: ${character.hp}/${character.maxHp}</p>
                <p>Damage: ${character.damage}</p>
                <p>Rank: ${character.rank}</p>
            </div>
        `;
        charListContainer.appendChild(charDiv);
    });
}

// Werk de lijst van vijanden bij
function updateEnemyList() {
    const enemyListContainer = document.getElementById('enemy-characters');
    enemyListContainer.innerHTML = ''; // Verwijder de huidige lijst

    enemies.forEach((enemy, index) => {
        const enemyDiv = document.createElement('div');
        enemyDiv.classList.add('enemy');
        enemyDiv.setAttribute('id', 'enemy-' + index);

        enemyDiv.innerHTML = `
            <img src="${enemy.image}" alt="${enemy.name}" />
            <div class="enemy-info">
                <p><strong>${enemy.name}</strong></p>
                <p>HP: ${enemy.hp}</p>
                <p>Damage: ${enemy.damage}</p>
            </div>
        `;
        enemyListContainer.appendChild(enemyDiv);
    });
}

// Start de gevechten tussen karakters en vijanden
function startFight(characterIndex, enemyIndex) {
    const character = characters[characterIndex];
    const enemy = enemies[enemyIndex];

    // Simuleer een gevecht
    const fightInterval = setInterval(() => {
        // Karakter doet schade aan vijand
        enemy.hp -= character.damage;
        if (enemy.hp <= 0) {
            alert(`${character.name} heeft ${enemy.name} verslagen!`);
            character.kills++;
            enemies.splice(enemyIndex, 1); // Verwijder de vijand
            updateEnemyList();
            clearInterval(fightInterval);
        }

        // Vijand doet schade aan karakter
        character.hp -= enemy.damage;
        if (character.hp <= 0) {
            alert(`${enemy.name} heeft ${character.name} verslagen!`);
            characters.splice(characterIndex, 1); // Verwijder het karakter
            updateCharacterList();
            clearInterval(fightInterval);
        }

    }, 1000); // Elke seconde een aanval
}

// Functies voor drag-and-drop 
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    if (event.target.classList.contains('section')) {
        // Verplaats het karakter naar de sectie
        event.target.appendChild(draggedElement);

        // Als het naar de Fighting sectie gaat, start gevecht
        if (event.target.id === 'fighting') {
            const characterIndex = characters.findIndex(char => 'character-' + characters.indexOf(char) === draggedElement.id);
            const enemyIndex = Math.floor(Math.random() * enemies.length);  // Kies een vijand om tegen te vechten
            startFight(characterIndex, enemyIndex);
        }
    }
}

// Start de game door een karakter en een vijand te maken
const characters = [];
const enemies = [];

// Voeg een karakter en vijand toe voor testen
createCharacter();
createEnemy();
