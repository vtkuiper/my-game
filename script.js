// Game data en variabelen
let characters = [];
let foodAmount = 10;
let enemies = [];
let maxCharacters = 10;
let maxCharactersPerVak = 5;

// Karakter constructor
function Character(name) {
    this.name = name;
    this.hp = 10;
    this.maxHp = 10;
    this.damage = 2;
    this.food = 10;
    this.kills = 0;
    this.rank = "Bronze";
    this.image = `https://picsum.photos/50/50?random=${Math.floor(Math.random() * 1000)}`;  // Random image
}

// Functie om random naam te genereren
function generateRandomName() {
    const names = ['Axel', 'Lena', 'Finn', 'Sophie', 'Kai', 'Emma'];
    return names[Math.floor(Math.random() * names.length)];
}

// Karakter aanmaken
function createCharacter() {
    if (characters.length >= maxCharacters) {
        alert("Maximaal 10 karakters zijn toegestaan.");
        return;
    }

    const name = generateRandomName();
    const character = new Character(name);
    characters.push(character);
    updateCharacterDisplay();
}

// Update weergave van karakters in de secties
function updateCharacterDisplay() {
    updateVak('resting', characters.slice(0, maxCharactersPerVak));
    updateVak('food', characters.slice(maxCharactersPerVak, maxCharactersPerVak * 2));
    updateVak('enemies', characters.slice(maxCharactersPerVak * 2, maxCharactersPerVak * 3));
}

// Update karakters in een vak
function updateVak(vakId, vakCharacters) {
    const vak = document.getElementById(`${vakId}-characters`);
    vak.innerHTML = ''; // Maak de vakken leeg voor de update

    vakCharacters.forEach(character => {
        const charDiv = document.createElement('div');
        charDiv.classList.add('character');
        charDiv.innerHTML = `<img src="${character.image}" alt="${character.name}" />`;
        vak.appendChild(charDiv);
    });
}

// Knop om te rusten (HP herstellen)
document.getElementById('rest-button').addEventListener('click', () => {
    const character = characters[0];
    if (character.food > 0 && character.hp < character.maxHp) {
        character.hp++;
        character.food--;
        updateRestingInfo();
    }
});

// Voedsel verzamelen
function startFoodGathering() {
    const progressBar = document.getElementById('food-progress');
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = `${progress}%`;
        } else {
            clearInterval(interval);
            foodAmount++;
            document.getElementById('food-status').textContent = `Collected 1 food. Total: ${foodAmount}`;
            progress = 0;
            progressBar.style.width = '0%';
        }
    }, 3000);
}

startFoodGathering();

// Enemies genereren
function generateEnemy() {
    const enemy = {
        hp: 5,
        damage: 2,
        kills: 0
    };
    enemies.push(enemy);
    displayEnemies();
}

// Display enemies
function displayEnemies() {
    const enemyContainer = document.getElementById('enemy-info');
    enemyContainer.innerHTML = '';
    enemies.forEach((enemy, index) => {
        const enemyElement = document.createElement('div');
        enemyElement.classList.add('enemy');
        enemyElement.innerHTML = `
            <p>Enemy ${index + 1}</p>
            <p>HP: ${enemy.hp}</p>
            <p>Damage: ${enemy.damage}</p>
        `;
        enemyContainer.appendChild(enemyElement);
    });
}

generateEnemy();  // Maak een vijand aan voor de test
