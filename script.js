let gold = 0;
let damage = 1;
let enemyHP = 5;
const enemyNames = ["Goblin", "Orc", "Troll", "Dragon", "Vampire"];
const characters = [];

document.getElementById('enemy').addEventListener('click', function() {
    enemyHP -= damage;
    updateHPBar();
    if (enemyHP <= 0) {
        gold += 5;
        document.getElementById('gold').innerText = gold;
        enemyHP = 5;
        document.getElementById('enemy').src = 'new_enemy.png'; // Change to new enemy image
        document.querySelector('.enemy-name').innerText = enemyNames[Math.floor(Math.random() * enemyNames.length)];
        updateHPBar();
    }
});

document.getElementById('upgrade').addEventListener('click', function() {
    if (gold >= 10) {
        gold -= 10;
        damage += 1;
        document.getElementById('gold').innerText = gold;
    }
});

document.getElementById('empower-warriors').addEventListener('click', function() {
    if (gold >= 25) {
        gold -= 25;
        document.getElementById('gold').innerText = gold;
        // Implement upgrade logic for warriors
    }
});

document.querySelectorAll('.hire-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        if (gold >= 10) {
            gold -= 10;
            document.getElementById('gold').innerText = gold;
            const box = button.parentElement;
            box.querySelector('.character-img').src = 'character.png'; // Change to character image
            box.querySelector('.character-img').style.display = 'block';
            box.querySelector('.character-name').innerText = 'Random Name'; // Change to random name
            box.querySelector('.character-name').style.display = 'block';
            box.querySelector('.character-class').innerText = ['Warrior', 'Mage', 'Assassin', 'Archer'][Math.floor(Math.random() * 4)];
            box.querySelector('.character-class').style.display = 'block';
            box.querySelector('.character-stats').innerText = 'DMG: 5 | Speed: 10';
            box.querySelector('.character-stats').style.display = 'block';
            button.style.display = 'none';
            characters[index] = {
                dmg: 5,
                speed: 10,
                interval: setInterval(() => {
                    enemyHP -= 5;
                    updateHPBar();
                    if (enemyHP <= 0) {
                        gold += 5;
                        document.getElementById('gold').innerText = gold;
                        enemyHP = 5;
                        document.getElementById('enemy').src = 'new_enemy.png'; // Change to new enemy image
                        document.querySelector('.enemy-name').innerText = enemyNames[Math.floor(Math.random() * enemyNames.length)];
                        updateHPBar();
                    }
                }, 5000)
            };
        }
    });
});

function updateHPBar() {
    const hpFill = document.getElementById('hp-fill');
    hpFill.style.width = `${(enemyHP / 5) * 100}%`;
}
