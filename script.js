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
    characters.forEach(character => {
        character.hp = character.maxHp;
    });
    alert("All characters healed!");
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

function goToVillage() {
    document.getElementById('village').style.display = 'block';
    document.getElementById('forest').style.display = 'none';
    document.getElementById('questBoard').style.display = 'none';
    document.getElementById('blacksmith').style.display = 'none';
}

function adventure() {
    let enemy = {
        maxHp: Math.floor(Math.random() * 6) + 5,
        damage: Math.floor(Math.random() * 3) + 1
    };
    displayEnemy(enemy);
    // Battle logic here
}

function displayEnemy(enemy) {
    let enemiesDiv = document.getElementById('enemies');
    enemiesDiv.innerHTML = `<div>Enemy: HP: ${enemy.maxHp}, Damage: ${enemy.damage}</div>`;
}

function acceptQuest() {
    let quest = {
        enemiesToKill: Math.floor(Math.random() * 3) + 3,
        reward: Math.floor(Math.random() * 50) + 50
    };
    alert(`Quest accepted! Kill ${quest.enemiesToKill} enemies to earn ${quest.reward} gold.`);
}

function upgradeWeapon() {
    characters.forEach(character => {
        character.damage += 1;
    });
    gold -= 100; // Assuming upgrade costs 100 gold
    alert("Weapon upgraded!");
}

// Create initial characters
for (let i = 0; i < 5; i++) {
    createCharacter();
}
