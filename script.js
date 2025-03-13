let characters = [];
let gold = 0;

function createCharacter() {
    let character = {
        maxHp: Math.floor(Math.random() * 11) + 10,
        damage: Math.floor(Math.random() * 5) + 1,
        level: 1,
        kills: 0
    };
    characters.push(character);
    displayCharacters();
}

function displayCharacters() {
    let charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = '';
    characters.forEach((character, index) => {
        charactersDiv.innerHTML += `<div>Character ${index + 1}: HP: ${character.maxHp}, Damage: ${character.damage}, Level: ${character.level}</div>`;
    });
}

function heal() {
    // Heal logic here
}

function goToForest() {
    document.getElementById('village').style.display = 'none';
    document.getElementById('forest').style.display = 'block';
}

function showQuestBoard() {
    document.getElementById('village').style.display = 'none';
    document.getElementById('questBoard').style.display = 'block';
}

function visitBlacksmith() {
    document.getElementById('village').style.display = 'none';
    document.getElementById('blacksmith').style.display = 'block';
}

function adventure() {
    let enemy = {
        maxHp: Math.floor(Math.random() * 6) + 5,
        damage: Math.floor(Math.random() * 3) + 1
    };
    // Battle logic here
}

function acceptQuest() {
    // Quest logic here
}

function upgradeWeapon() {
    // Upgrade logic here
}

// Create initial characters
for (let i = 0; i < 5; i++) {
    createCharacter();
}
