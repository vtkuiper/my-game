// Game data en variabelen
let characters = [];
let enemies = [];
let maxCharacters = 10;
let maxCharactersPerSection = 5;
let gold = 0;
let food = 0;

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

// Genereer een random naam voor karakters en vijanden
function generateRandomName() {
    const names = ['Axel', 'Lena', 'Finn', 'Sophie', 'Kai', 'Emma', 'Enemy1', 'Enemy2'];
    return names[Math.floor(Math.random() * names.length)];
}

// Maak een nieuw karakter
function createCharacter() {
    if (characters.length >= maxCharacters) {
        alert("Je kunt maximaal 10 karakters hebben.");
        return;
    }

    const name = generateRandomName();
    const character = new Character(name);
    characters.push(character);
    updateCharacterList();
}

// Maak een vijand aan
function createEnemy() {
    const name = generateRandomName();
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

        let foodBarHTML = '';
        if (character.foodBar) {
            foodBarHTML = `
                <div class="food-bar">
                    <div class="food-bar-fill" style="width: ${character.foodBar.progress}%"></div>
                </div>
            `;
        }

        charDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <div class="character-info">
                <p><strong>${character.name}</strong></p>
                <p>HP: ${character.hp}/${character.maxHp}</p>
                <p>Damage: ${character.damage}</p>
                <p>Rank: ${character.rank}</p>
                ${foodBarHTML}
            </div>
        `;
        charListContainer.appendChild(charDiv);
    });
}

// Werk de lijst van vijanden bij
function updateEnemyList() {
    const enemyListContainer = document.getElementById('enemy');
    enemyListContainer.innerHTML = ''; // Verwijder de huidige lijst

    enemies.forEach((enemy) => {
        const enemyDiv = document.createElement('div');
        enemyDiv.classList.add('enemy');

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

// Karakters die in de fighting sectie staan gaan de vijanden bevechten
function startFighting() {
    const fightingSection = document.getElementById('fighting').children;

    Array.from(fightingSection).forEach((charDiv, index) => {
        const character = characters[index];
        const enemy = enemies[index];
        
        if (enemy && character) {
            // Vechtlogica
            enemy.hp -= character.damage;  // Karakter schade aan vijand
            character.hp -= enemy.damage;  // Vijand schade aan karakter
            
            if (enemy.hp <= 0) {
                enemies.splice(index, 1);  // Verwijder de vijand als die dood is
            }

            if (character.hp <= 0) {
                characters.splice(index, 1);  // Verwijder het karakter als die dood is
            }

            updateCharacterList();
            updateEnemyList();
        }
    });
}

createCharacter();
createEnemy();
createEnemy(); // Maak een vijand aan en een karakter

startFighting(); // Start gevechten
