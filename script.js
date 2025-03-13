let character = {
    hp: Math.floor(Math.random() * 11) + 10,
    stamina: Math.floor(Math.random() * 10) + 1,
    damage: Math.floor(Math.random() * 5) + 1,
    level: 1,
    kills: 0
};

function updateCharacter() {
    document.getElementById('hp').innerText = character.hp;
    document.getElementById('stamina').innerText = character.stamina;
    document.getElementById('damage').innerText = character.damage;
    document.getElementById('level').innerText = character.level;
    document.getElementById('kills').innerText = character.kills;
}

function adventure() {
    let enemyHp = Math.floor(Math.random() * 11) + 10;
    let enemyDamage = Math.floor(Math.random() * 5) + 1;
    while (character.hp > 0 && enemyHp > 0) {
        enemyHp -= character.damage;
        character.hp -= enemyDamage;
    }
    if (character.hp <= 0) {
        document.getElementById('log').innerText = "Character is dead!";
        character = null;
    } else {
        character.kills++;
        document.getElementById('log').innerText = "Enemy defeated!";
        if (Math.random() < 0.2) {
            character = {
                hp: Math.floor(Math.random() * 11) + 10,
                stamina: Math.floor(Math.random() * 10) + 1,
                damage: Math.floor(Math.random() * 5) + 1,
                level: 1,
                kills: 0
            };
            document.getElementById('log').innerText += " New character acquired!";
        }
        if (character.kills >= Math.pow(2, character.level - 1)) {
            character.level++;
        }
    }
    updateCharacter();
}

function rest() {
    character.hp += character.stamina;
    updateCharacter();
}

updateCharacter();
