let gold = 0;
let damage = 1;

document.getElementById('enemy').addEventListener('click', function() {
    let enemy = document.getElementById('enemy');
    let hp = parseInt(enemy.getAttribute('data-hp')) || 5;
    hp -= damage;
    if (hp <= 0) {
        gold += 5;
        document.getElementById('gold').innerText = gold;
        enemy.setAttribute('data-hp', 5);
        enemy.src = 'new_enemy.png'; // Change to new enemy image
        document.querySelector('.enemy-name').innerText = 'New Enemy Name'; // Change to new enemy name
    } else {
        enemy.setAttribute('data-hp', hp);
    }
});

document.getElementById('upgrade').addEventListener('click', function() {
    if (gold >= 10) {
        gold -= 10;
        damage += 1;
        document.getElementById('gold').innerText = gold;
    }
});
