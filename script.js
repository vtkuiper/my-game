let characters = [{
    hp: Math.floor(Math.random() * 11) + 10,
    stamina: Math.floor(Math.random() * 10) + 1,
    damage: Math.floor(Math.random() * 5) + 1,
    level: 1,
    kills: 0
}];

let enemy = {
    hp: Math.floor(Math.random() * 5) + 1,
    stamina: Math.floor(Math.random() * 3) + 1,
    damage: Math.floor(Math.random() * 3) + 1
};

function updateCharacters() {
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = '';
    characters.forEach((character, index) => {
        const characterDiv = document.createElement('div');
        characterDiv.innerHTML = `
            <p>Character ${index + 1}</p>
            <p>HP: <span>${character.hp}</span></p>
            <p>Stamina: <span>${character.stamina}</span></p>
            <p>Damage: <span>${character.damage}</span></p>
            <p>Level: <span>${character.level}</span></p>
            <p>Kills: <span>${character.kills}</span></p>
            <button onclick="fight(${index})" style="display:none;">Fight</button>
            <button onclick="rest(${index})" style="display:none;">Rest</button>
        `;
        charactersDiv.appendChild(characterDiv);
    });
}

function updateEnemy() {
    document.getElementById('enemy-hp').innerText = enemy.hp;
    document.getElementById('enemy-stamina').innerText = enemy.stamina;
    document.getElementById('enemy-damage').innerText = enemy.damage;
}

function goToForest() {
    document.getElementById('location-description').innerText = "You are in the forest.";
    document.querySelector('button[onclick="goToForest()"]').style.display = 'none';
    document.querySelector('button[onclick="rest()"]').style.display = 'none';
    document.querySelector('button[onclick="fight()"]').style.display = 'inline-block';
    document.querySelector('button[onclick="goToVillage()"]').style.display = 'inline-block';
    document.querySelectorAll('button[onclick^="fight"]').forEach(button => button.style.display = 'inline-block');
    document.querySelectorAll('button[onclick^="rest"]').forEach(button => button.style.display = 'none');
}

function goToVillage() {
    document.getElementById('location-description').innerText = "You are in the village.";
    document.querySelector('button[onclick="goToForest()"]').style.display = 'inline-block';
    document.querySelector('button[onclick="rest()"]').style.display = 'inline-block';
    document.querySelector('button[onclick="fight()"]').style.display = 'none';
    document.querySelector('button[onclick="goToVillage()"]').style.display = 'none';
    document.querySelectorAll('button[onclick^="fight"]').forEach(button => button.style.display = 'none');
    document.querySelectorAll('button[onclick^="rest"]').forEach(button => button.style.display = 'inline-block');
}

function fight(index) {
    let character = characters[index];
    while (character.hp > 0 && enemy.hp > 0) {
        enemy.hp -= character.damage;
        character.hp -= enemy.damage;
    }
    if (character.hp <= 0) {
        document.getElementById('log').innerText = `Character ${index + 1} is dead!`;
        characters.splice(index, 1);
    } else {
        character.kills++;
        document.getElementById('log').innerText = "Enemy defeated!";
        if (Math.random() < 0.2 && characters.length < 5) {
            characters.push({
                hp: Math.floor(Math.random() * 11) + 10,
                stamina: Math.floor(Math.random() * 10) + 1,
                damage: Math.floor(Math.random() * 5) + 1,
                level: 1,
                kills: 0
            });
            document.getElementById('log').innerText += " New character acquired!";
        }
        if (character.kills >= Math.pow(2, character.level - 1)) {
            character.level++;
        }
        enemy = {
            hp: Math.floor(Math.random() * 5) + 1,
            stamina: Math.floor(Math.random() * 3) + 1,
            damage: Math.floor(Math.random() * 3) + 1
        };
    }
    updateCharacters();
    updateEnemy();
}

function rest(index) {
    let character = characters[index];
    character.hp += character.stamina;
    updateCharacters();
}

updateCharacters();
updateEnemy();
